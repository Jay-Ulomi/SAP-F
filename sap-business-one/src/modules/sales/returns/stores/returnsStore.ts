import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  returnsApi,
  customersApi,
  itemsApi,
  taxCodesApi,
  invoicesApi,
  salesOrdersApi,
} from '../api/returnsApi'
import type { Return, ReturnFormData, ReturnFilters, ReturnStatsResponse, Customer } from '../types'
import { ReturnStatus, ReturnType, FormType } from '../types'

export const useReturnsStore = defineStore('returns', () => {
  // State
  const returns = ref<Return[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentReturn = ref<Return | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ReturnStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<ReturnFilters>({
    status: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
    formType: [],
  })

  // Computed Properties
  const returnsByStatus = computed(() => {
    const grouped = returns.value.reduce(
      (acc, ret) => {
        const status = ret.status
        if (!acc[status]) acc[status] = []
        acc[status].push(ret)
        return acc
      },
      {} as Record<ReturnStatus, Return[]>,
    )

    return grouped
  })

  const returnsByType = computed(() => {
    const grouped = returns.value.reduce(
      (acc, ret) => {
        const type = ret.type
        if (!acc[type]) acc[type] = []
        acc[type].push(ret)
        return acc
      },
      {} as Record<ReturnType, Return[]>,
    )

    return grouped
  })

  const returnsByFormType = computed(() => {
    const grouped = returns.value.reduce(
      (acc, ret) => {
        const formType = ret.formType
        if (!acc[formType]) acc[formType] = []
        acc[formType].push(ret)
        return acc
      },
      {} as Record<FormType, Return[]>,
    )

    return grouped
  })

  const itemReturns = computed(() => returns.value.filter((r) => r.formType === FormType.ITEM))

  const serviceReturns = computed(() =>
    returns.value.filter((r) => r.formType === FormType.SERVICE),
  )

  const draftReturns = computed(() => returns.value.filter((r) => r.status === ReturnStatus.DRAFT))

  const openReturns = computed(() => returns.value.filter((r) => r.status === ReturnStatus.OPEN))

  const approvedReturns = computed(() =>
    returns.value.filter((r) => r.status === ReturnStatus.APPROVED),
  )

  const rejectedReturns = computed(() =>
    returns.value.filter((r) => r.status === ReturnStatus.REJECTED),
  )

  const processedReturns = computed(() =>
    returns.value.filter((r) => r.status === ReturnStatus.PROCESSED),
  )

  const cancelledReturns = computed(() =>
    returns.value.filter((r) => r.status === ReturnStatus.CANCELLED),
  )

  const closedReturns = computed(() =>
    returns.value.filter((r) => r.status === ReturnStatus.CLOSED),
  )

  const totalValue = computed(() => returns.value.reduce((sum, r) => sum + r.totalAmount, 0))

  const averageValue = computed(() =>
    returns.value.length > 0 ? totalValue.value / returns.value.length : 0,
  )

  const approvalRate = computed(() => {
    if (openReturns.value.length === 0) return 0
    return (approvedReturns.value.length / openReturns.value.length) * 100
  })

  // Actions
  const fetchReturns = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.list(filters.value, page, limit)

      if (response.success) {
        returns.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch returns'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.get(id)

      if (response.success) {
        currentReturn.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch return'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createReturn = async (data: ReturnFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.create(data)

      if (response.success) {
        returns.value.unshift(response.data)
        currentReturn.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateReturn = async (id: string, data: Partial<ReturnFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.update(id, data)

      if (response.success) {
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.delete(id)

      if (response.success) {
        returns.value = returns.value.filter((r) => r.id !== id)
        if (currentReturn.value?.id === id) {
          currentReturn.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.getStats()

      if (response.success) {
        stats.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch stats'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchCustomers = async (search?: string) => {
    try {
      const response = await customersApi.list(search)
      if (response.success) {
        customers.value = response.data
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err)
    }
  }

  const fetchTaxCodes = async () => {
    try {
      const response = await taxCodesApi.list()
      if (response.success) {
        taxCodes.value = response.data
      }
    } catch (err) {
      console.error('Failed to fetch tax codes:', err)
    }
  }

  const fetchItems = async (search?: string) => {
    try {
      const response = await itemsApi.list(search)
      return response
    } catch (err) {
      console.error('Failed to fetch items:', err)
      return []
    }
  }

  const fetchInvoices = async (search?: string) => {
    try {
      const response = await invoicesApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch invoices:', err)
      return []
    }
  }

  const fetchSalesOrders = async (search?: string) => {
    try {
      const response = await salesOrdersApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch sales orders:', err)
      return []
    }
  }

  const approveReturn = async (
    id: string,
    approvalData: { approvedBy: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.approveReturn(id, approvalData)

      if (response.success) {
        // Update the return in the list
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to approve return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const rejectReturn = async (
    id: string,
    rejectionData: { rejectedBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.rejectReturn(id, rejectionData)

      if (response.success) {
        // Update the return in the list
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to reject return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const processReturn = async (
    id: string,
    processData: { processedBy: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.processReturn(id, processData)

      if (response.success) {
        // Update the return in the list
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to process return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const cancelReturn = async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.cancelReturn(id, cancellationData)

      if (response.success) {
        // Update the return in the list
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to cancel return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const closeReturn = async (id: string, closeData?: { closedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.closeReturn(id, closeData)

      if (response.success) {
        // Update the return in the list
        const index = returns.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          returns.value[index] = response.data
        }
        if (currentReturn.value?.id === id) {
          currentReturn.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to close return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const copyReturn = async (
    id: string,
    copyData?: { newReturnDate: string; newPostingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.copyReturn(id, copyData)

      if (response.success) {
        returns.value.unshift(response.data)
        currentReturn.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to copy return'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const createFromInvoice = async (
    invoiceId: string,
    returnData?: { returnDate: string; postingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.createFromInvoice(invoiceId, returnData)

      if (response.success) {
        returns.value.unshift(response.data)
        currentReturn.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create return from invoice'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<ReturnFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: [],
      type: [],
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      search: '',
      formType: [],
    }
    pagination.value.page = 1
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentReturn = () => {
    currentReturn.value = null
  }

  const exportReturns = async (filters: ReturnFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await returnsApi.export(filters)

      if (response.success) {
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to export returns'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    returns,
    customers,
    taxCodes,
    currentReturn,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    returnsByStatus,
    returnsByType,
    returnsByFormType,
    itemReturns,
    serviceReturns,
    draftReturns,
    openReturns,
    approvedReturns,
    rejectedReturns,
    processedReturns,
    cancelledReturns,
    closedReturns,
    totalValue,
    averageValue,
    approvalRate,

    // Actions
    fetchReturns,
    fetchReturn,
    createReturn,
    updateReturn,
    deleteReturn,
    fetchStats,
    fetchCustomers,
    fetchTaxCodes,
    fetchItems,
    fetchInvoices,
    fetchSalesOrders,
    approveReturn,
    rejectReturn,
    processReturn,
    cancelReturn,
    closeReturn,
    copyReturn,
    createFromInvoice,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentReturn,
    exportReturns,
  }
})
