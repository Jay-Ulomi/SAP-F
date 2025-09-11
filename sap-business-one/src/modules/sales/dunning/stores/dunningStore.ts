import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dunningApi, customersApi, invoicesApi, paymentsApi, returnsApi } from '../api/dunningApi'
import type {
  Dunning,
  DunningFormData,
  DunningFilters,
  DunningStatsResponse,
  Customer,
  DunningStatus,
  DunningLevel,
  DunningType,
} from '../types'
import { DunningStatus, DunningLevel, DunningType } from '../types'

export const useDunningStore = defineStore('dunning', () => {
  // State
  const dunning = ref<Dunning[]>([])
  const customers = ref<Customer[]>([])
  const currentDunning = ref<Dunning | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<DunningStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<DunningFilters>({
    status: [],
    level: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  })

  // Computed Properties
  const dunningByStatus = computed(() => {
    const grouped = dunning.value.reduce(
      (acc, d) => {
        const status = d.status
        if (!acc[status]) acc[status] = []
        acc[status].push(d)
        return acc
      },
      {} as Record<DunningStatus, Dunning[]>,
    )

    return grouped
  })

  const dunningByLevel = computed(() => {
    const grouped = dunning.value.reduce(
      (acc, d) => {
        const level = d.level
        if (!acc[level]) acc[level] = []
        acc[level].push(d)
        return acc
      },
      {} as Record<DunningLevel, Dunning[]>,
    )

    return grouped
  })

  const dunningByType = computed(() => {
    const grouped = dunning.value.reduce(
      (acc, d) => {
        const type = d.type
        if (!acc[type]) acc[type] = []
        acc[type].push(d)
        return acc
      },
      {} as Record<DunningType, Dunning[]>,
    )

    return grouped
  })

  const draftDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.DRAFT),
  )

  const sentDunning = computed(() => dunning.value.filter((d) => d.status === DunningStatus.SENT))

  const acknowledgedDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.ACKNOWLEDGED),
  )

  const partialPaymentDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.PARTIAL_PAYMENT),
  )

  const fullPaymentDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.FULL_PAYMENT),
  )

  const cancelledDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.CANCELLED),
  )

  const closedDunning = computed(() =>
    dunning.value.filter((d) => d.status === DunningStatus.CLOSED),
  )

  const totalAmount = computed(() => dunning.value.reduce((sum, d) => sum + d.totalAmount, 0))

  const averageAmount = computed(() =>
    dunning.value.length > 0 ? totalAmount.value / dunning.value.length : 0,
  )

  const collectionRate = computed(() => {
    if (fullPaymentDunning.value.length === 0) return 0
    return (fullPaymentDunning.value.length / (fullPaymentDunning.value.length + sentDunning.value.length)) * 100
  })

  // Actions
  const fetchDunning = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.list(filters.value, page, limit)

      if (response.success) {
        dunning.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch dunning'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchDunningById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.get(id)

      if (response.success) {
        currentDunning.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch dunning'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createDunning = async (data: DunningFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.create(data)

      if (response.success) {
        dunning.value.unshift(response.data)
        currentDunning.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateDunning = async (id: string, data: Partial<DunningFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.update(id, data)

      if (response.success) {
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteDunning = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.delete(id)

      if (response.success) {
        dunning.value = dunning.value.filter((d) => d.id !== id)
        if (currentDunning.value?.id === id) {
          currentDunning.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete dunning'
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

      const response = await dunningApi.getStats()

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

  const fetchInvoices = async (search?: string) => {
    try {
      const response = await invoicesApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch invoices:', err)
      return []
    }
  }

  const fetchPayments = async (search?: string) => {
    try {
      const response = await paymentsApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch payments:', err)
      return []
    }
  }

  const fetchReturns = async (search?: string) => {
    try {
      const response = await returnsApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch returns:', err)
      return []
    }
  }

  const sendLetter = async (
    id: string,
    letterData: { sentBy: string; method: 'EMAIL' | 'POST' | 'FAX' | 'COURIER'; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.sendLetter(id, letterData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to send letter'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const acknowledge = async (id: string, acknowledgmentData: { acknowledgedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.acknowledge(id, acknowledgmentData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to acknowledge dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const escalate = async (
    id: string,
    escalationData: { escalatedBy: string; nextLevel: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.escalate(id, escalationData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to escalate dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const cancelDunning = async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.cancel(id, cancellationData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to cancel dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const closeDunning = async (id: string, closeData?: { closedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.close(id, closeData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to close dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const copyDunning = async (
    id: string,
    copyData?: { newDunningDate: string; newPostingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.copy(id, copyData)

      if (response.success) {
        dunning.value.unshift(response.data)
        currentDunning.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to copy dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const createFromOverdueInvoices = async (
    customerCode: string,
    dunningData?: { dunningDate: string; postingDate: string; level: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.createFromOverdueInvoices(customerCode, dunningData)

      if (response.success) {
        dunning.value.unshift(response.data)
        currentDunning.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create dunning from overdue invoices'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const processDunning = async (id: string, processData: { processedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.processDunning(id, processData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to process dunning'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const calculateFees = async (id: string, feeData: { calculatedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await dunningApi.calculateFees(id, feeData)

      if (response.success) {
        // Update the dunning in the list
        const index = dunning.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          dunning.value[index] = response.data
        }
        if (currentDunning.value?.id === id) {
          currentDunning.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to calculate fees'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<DunningFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: [],
      level: [],
      type: [],
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    }
    pagination.value.page = 1
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentDunning = () => {
    currentDunning.value = null
  }

  return {
    // State
    dunning,
    customers,
    currentDunning,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    dunningByStatus,
    dunningByLevel,
    dunningByType,
    draftDunning,
    sentDunning,
    acknowledgedDunning,
    partialPaymentDunning,
    fullPaymentDunning,
    cancelledDunning,
    closedDunning,
    totalAmount,
    averageAmount,
    collectionRate,

    // Actions
    fetchDunning,
    fetchDunningById,
    createDunning,
    updateDunning,
    deleteDunning,
    fetchStats,
    fetchCustomers,
    fetchInvoices,
    fetchPayments,
    fetchReturns,
    sendLetter,
    acknowledge,
    escalate,
    cancelDunning,
    closeDunning,
    copyDunning,
    createFromOverdueInvoices,
    processDunning,
    calculateFees,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentDunning,
  }
})
