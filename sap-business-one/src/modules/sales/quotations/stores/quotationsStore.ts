import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { quotationsApi, customersApi, itemsApi, taxCodesApi } from '../api/quotationsApi'
import type {
  Quotation,
  QuotationFormData,
  QuotationFilters,
  QuotationStatsResponse,
  Customer,
  QuotationStatus,
  QuotationType,
  FormType,
} from '../types'
import { QuotationStatus, QuotationType, FormType } from '../types'

export const useQuotationsStore = defineStore('quotations', () => {
  // State
  const quotations = ref<Quotation[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentQuotation = ref<Quotation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<QuotationStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<QuotationFilters>({
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
  const quotationsByStatus = computed(() => {
    const grouped = quotations.value.reduce(
      (acc, quotation) => {
        const status = quotation.status
        if (!acc[status]) acc[status] = []
        acc[status].push(quotation)
        return acc
      },
      {} as Record<QuotationStatus, Quotation[]>,
    )

    return grouped
  })

  const quotationsByType = computed(() => {
    const grouped = quotations.value.reduce(
      (acc, quotation) => {
        const type = quotation.type
        if (!acc[type]) acc[type] = []
        acc[type].push(quotation)
        return acc
      },
      {} as Record<QuotationType, Quotation[]>,
    )

    return grouped
  })

  const quotationsByFormType = computed(() => {
    const grouped = quotations.value.reduce(
      (acc, quotation) => {
        const formType = quotation.formType
        if (!acc[formType]) acc[formType] = []
        acc[formType].push(quotation)
        return acc
      },
      {} as Record<FormType, Quotation[]>,
    )

    return grouped
  })

  const itemQuotations = computed(() =>
    quotations.value.filter((q) => q.formType === FormType.ITEM),
  )

  const serviceQuotations = computed(() =>
    quotations.value.filter((q) => q.formType === FormType.SERVICE),
  )

  const draftQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.DRAFT),
  )

  const sentQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.SENT),
  )

  const acceptedQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.ACCEPTED),
  )

  const rejectedQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.REJECTED),
  )

  const expiredQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.EXPIRED),
  )

  const convertedQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.CONVERTED_TO_ORDER),
  )

  const cancelledQuotations = computed(() =>
    quotations.value.filter((q) => q.status === QuotationStatus.CANCELLED),
  )

  const totalValue = computed(() => quotations.value.reduce((sum, q) => sum + q.totalAmount, 0))

  const averageValue = computed(() =>
    quotations.value.length > 0 ? totalValue.value / quotations.value.length : 0,
  )

  const conversionRate = computed(() => {
    if (sentQuotations.value.length === 0) return 0
    return (acceptedQuotations.value.length / sentQuotations.value.length) * 100
  })

  // Actions
  const fetchQuotations = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.list(filters.value, page, limit)

      if (response.success) {
        quotations.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch quotations'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchQuotation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.get(id)

      if (response.success) {
        currentQuotation.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch quotation'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createQuotation = async (data: QuotationFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.create(data)

      if (response.success) {
        quotations.value.unshift(response.data)
        currentQuotation.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create quotation'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateQuotation = async (id: string, data: Partial<QuotationFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.update(id, data)

      if (response.success) {
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = response.data
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update quotation'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteQuotation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.delete(id)

      if (response.success) {
        quotations.value = quotations.value.filter((q) => q.id !== id)
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete quotation'
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

      const response = await quotationsApi.getStats()

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
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch items:', err)
      return []
    }
  }

  const sendQuotation = async (
    id: string,
    emailData?: { to: string; subject?: string; message?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.sendQuotation(id, emailData)

      if (response.success) {
        // Update the quotation in the list
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = response.data
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to send quotation'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const acceptQuotation = async (
    id: string,
    acceptanceData?: { acceptedBy: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.acceptQuotation(id, acceptanceData)

      if (response.success) {
        // Update the quotation in the list
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = response.data
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to accept quotation'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const rejectQuotation = async (
    id: string,
    rejectionData: { rejectedBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.rejectQuotation(id, rejectionData)

      if (response.success) {
        // Update the quotation in the list
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = response.data
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to reject quotation'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const convertToOrder = async (
    id: string,
    orderData?: { orderDate: string; deliveryDate?: string; remarks?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await quotationsApi.convertToOrder(id, orderData)

      if (response.success) {
        // Update the quotation in the list
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = response.data
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to convert quotation to order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<QuotationFilters>) => {
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

  const clearCurrentQuotation = () => {
    currentQuotation.value = null
  }

  return {
    // State
    quotations,
    customers,
    taxCodes,
    currentQuotation,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    quotationsByStatus,
    quotationsByType,
    quotationsByFormType,
    itemQuotations,
    serviceQuotations,
    draftQuotations,
    sentQuotations,
    acceptedQuotations,
    rejectedQuotations,
    expiredQuotations,
    convertedQuotations,
    cancelledQuotations,
    totalValue,
    averageValue,
    conversionRate,

    // Actions
    fetchQuotations,
    fetchQuotation,
    createQuotation,
    updateQuotation,
    deleteQuotation,
    fetchStats,
    fetchCustomers,
    fetchTaxCodes,
    fetchItems,
    sendQuotation,
    acceptQuotation,
    rejectQuotation,
    convertToOrder,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentQuotation,
  }
})
