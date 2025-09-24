import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { quotationsApi } from '../api/quotationsApi'
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

      const data = await quotationsApi.getQuotations()
      quotations.value = data
      pagination.value = {
        page,
        limit,
        total: data.length,
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

      const data = await quotationsApi.getQuotation(id)
      currentQuotation.value = data || null
      if (!data) {
        error.value = 'Quotation not found'
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

      const newQuotation = await quotationsApi.createQuotation(data as any)
      quotations.value.unshift(newQuotation)
      currentQuotation.value = newQuotation
      return { success: true, data: newQuotation }
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

      const updatedQuotation = await quotationsApi.updateQuotation(id, data as any)
      if (updatedQuotation) {
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = updatedQuotation
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = updatedQuotation
        }
        return { success: true, data: updatedQuotation }
      } else {
        error.value = 'Failed to update quotation'
        return { success: false, message: 'Failed to update quotation' }
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

      const success = await quotationsApi.deleteQuotation(id)
      if (success) {
        quotations.value = quotations.value.filter((q) => q.id !== id)
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = null
        }
        return { success: true }
      } else {
        error.value = 'Failed to delete quotation'
        return { success: false, message: 'Failed to delete quotation' }
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

      // Mock stats calculation from current quotations
      const total = quotations.value.length
      const draft = quotations.value.filter(q => q.status === 'DRAFT').length
      const sent = quotations.value.filter(q => q.status === 'PENDING').length
      const accepted = quotations.value.filter(q => q.status === 'APPROVED').length

      stats.value = {
        totalQuotations: total,
        draftQuotations: draft,
        sentQuotations: sent,
        acceptedQuotations: accepted,
        totalValue: quotations.value.reduce((sum, q) => sum + q.total, 0),
        conversionRate: sent > 0 ? (accepted / sent) * 100 : 0
      } as any
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchCustomers = async (search?: string) => {
    try {
      // Mock customer data
      customers.value = [
        { id: '1', code: 'CUST001', name: 'Acme Corporation' },
        { id: '2', code: 'CUST002', name: 'TechStart Solutions' },
        { id: '3', code: 'CUST003', name: 'Global Enterprises Ltd' }
      ] as any
    } catch (err) {
      console.error('Failed to fetch customers:', err)
    }
  }

  const fetchTaxCodes = async () => {
    try {
      // Mock tax codes
      taxCodes.value = [
        { code: 'TAX1', name: 'Standard Tax', rate: 10, type: 'Standard' },
        { code: 'TAX2', name: 'Reduced Tax', rate: 5, type: 'Reduced' },
        { code: 'NOTAX', name: 'No Tax', rate: 0, type: 'Exempt' }
      ]
    } catch (err) {
      console.error('Failed to fetch tax codes:', err)
    }
  }

  const fetchItems = async (search?: string) => {
    try {
      // Mock items data
      return [
        { id: '1', code: 'LAPTOP-001', name: 'Business Laptop Pro', price: 1299.99 },
        { id: '2', code: 'MOUSE-002', name: 'Wireless Mouse', price: 29.99 },
        { id: '3', code: 'KEYBOARD-003', name: 'Mechanical Keyboard', price: 89.99 }
      ] as any
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

      // Mock sending - just update status to PENDING
      const quotation = quotations.value.find(q => q.id === id)
      if (quotation) {
        const updatedQuotation = { ...quotation, status: 'PENDING' as any }
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = updatedQuotation
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = updatedQuotation
        }
        return { success: true, data: updatedQuotation }
      } else {
        error.value = 'Quotation not found'
        return { success: false, message: 'Quotation not found' }
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

      // Mock acceptance - just update status to APPROVED
      const quotation = quotations.value.find(q => q.id === id)
      if (quotation) {
        const updatedQuotation = { ...quotation, status: 'APPROVED' as any }
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = updatedQuotation
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = updatedQuotation
        }
        return { success: true, data: updatedQuotation }
      } else {
        error.value = 'Quotation not found'
        return { success: false, message: 'Quotation not found' }
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

      // Mock rejection - just update status to REJECTED
      const quotation = quotations.value.find(q => q.id === id)
      if (quotation) {
        const updatedQuotation = { ...quotation, status: 'REJECTED' as any }
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = updatedQuotation
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = updatedQuotation
        }
        return { success: true, data: updatedQuotation }
      } else {
        error.value = 'Quotation not found'
        return { success: false, message: 'Quotation not found' }
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

      // Mock conversion - update status to show it was converted
      const quotation = quotations.value.find(q => q.id === id)
      if (quotation) {
        const updatedQuotation = { ...quotation, status: 'APPROVED' as any }
        const index = quotations.value.findIndex((q) => q.id === id)
        if (index !== -1) {
          quotations.value[index] = updatedQuotation
        }
        if (currentQuotation.value?.id === id) {
          currentQuotation.value = updatedQuotation
        }
        return { success: true, data: updatedQuotation }
      } else {
        error.value = 'Quotation not found'
        return { success: false, message: 'Quotation not found' }
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
