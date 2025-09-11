import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { purchaseQuotationsApi, vendorsApi } from '../api'
import { PurchaseQuotationStatus, PurchaseQuotationType, QuotationPriority } from '../types'
import type {
  PurchaseQuotation,
  PurchaseQuotationFormData,
  PurchaseQuotationFilters,
  PurchaseQuotationStatsResponse,
  Vendor,
} from '../types'

export const usePurchaseQuotationsStore = defineStore('purchaseQuotations', () => {
  // State
  const quotations = ref<PurchaseQuotation[]>([])
  const vendors = ref<Vendor[]>([])
  const currentQuotation = ref<PurchaseQuotation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PurchaseQuotationStatsResponse | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<PurchaseQuotationFilters>({
    status: undefined,
    type: undefined,
    priority: undefined,
    vendorCode: '',
    department: '',
    costCenter: '',
    projectCode: '',
    search: '',
    quotationDateFrom: '',
    quotationDateTo: '',
    validUntilFrom: '',
    validUntilTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const quotationsByStatus = computed(() => {
    return quotations.value.reduce(
      (acc, quotation) => {
        acc[quotation.status] = (acc[quotation.status] || 0) + 1
        return acc
      },
      {} as Record<PurchaseQuotationStatus, number>,
    )
  })

  const quotationsByType = computed(() => {
    return quotations.value.reduce(
      (acc, quotation) => {
        acc[quotation.type] = (acc[quotation.type] || 0) + 1
        return acc
      },
      {} as Record<PurchaseQuotationType, number>,
    )
  })

  const quotationsByPriority = computed(() => {
    return quotations.value.reduce(
      (acc, quotation) => {
        acc[quotation.priority] = (acc[quotation.priority] || 0) + 1
        return acc
      },
      {} as Record<QuotationPriority, number>,
    )
  })

  const draftQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.DRAFT),
  )

  const sentQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.SENT),
  )

  const receivedQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.RECEIVED),
  )

  const evaluatedQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.EVALUATED),
  )

  const approvedQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.APPROVED),
  )

  const convertedQuotations = computed(() =>
    quotations.value.filter((quotation) => quotation.status === PurchaseQuotationStatus.CONVERTED),
  )

  const totalAmount = computed(() =>
    quotations.value.reduce((sum, quotation) => sum + quotation.totalAmount, 0),
  )

  const averageQuotationValue = computed(() => {
    if (quotations.value.length === 0) return 0
    return (
      quotations.value.reduce((sum, quotation) => sum + quotation.totalAmount, 0) /
      quotations.value.length
    )
  })

  // Actions - Core CRUD
  const loadQuotations = async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseQuotationFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.getQuotations(params)
      quotations.value = response.data
      pagination.value = response.pagination
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load quotations'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadQuotation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.getQuotation(id)
      currentQuotation.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createQuotation = async (data: PurchaseQuotationFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.createQuotation(data)
      quotations.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateQuotation = async (id: string, data: Partial<PurchaseQuotationFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.updateQuotation(id, data)
      const index = quotations.value.findIndex((quotation) => quotation.id === id)
      if (index !== -1) {
        quotations.value[index] = response.data
      }
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteQuotation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await purchaseQuotationsApi.deleteQuotation(id)
      quotations.value = quotations.value.filter((quotation) => quotation.id !== id)
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const sendQuotation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.sendQuotation(id)
      const index = quotations.value.findIndex((quotation) => quotation.id === id)
      if (index !== -1) {
        quotations.value[index] = response.data
      }
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to send quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const evaluateQuotation = async (
    id: string,
    evaluation: { approved: boolean; notes?: string; evaluatedBy: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.evaluateQuotation(id, evaluation)
      const index = quotations.value.findIndex((quotation) => quotation.id === id)
      if (index !== -1) {
        quotations.value[index] = response.data
      }
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to evaluate quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveQuotation = async (id: string, approval: { approvedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.approveQuotation(id, approval)
      const index = quotations.value.findIndex((quotation) => quotation.id === id)
      if (index !== -1) {
        quotations.value[index] = response.data
      }
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const convertToOrder = async (
    id: string,
    conversion: { orderNumber: string; convertedBy: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.convertToOrder(id, conversion)
      const index = quotations.value.findIndex((quotation) => quotation.id === id)
      if (index !== -1) {
        quotations.value[index] = response.data
      }
      if (currentQuotation.value?.id === id) {
        currentQuotation.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to convert quotation to order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyQuotation = async (id: string, newDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.copyQuotation(id, newDate)
      quotations.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy quotation'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadQuotationStats = async (filters?: PurchaseQuotationFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseQuotationsApi.getQuotationStats(filters)
      stats.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load quotation statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Supporting Data
  const loadVendors = async (params?: { page?: number; limit?: number; search?: string }) => {
    try {
      const response = await vendorsApi.getVendors(params)
      vendors.value = response.data || response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load vendors'
      throw err
    }
  }

  const searchVendors = async (searchTerm: string) => {
    try {
      const response = await vendorsApi.searchVendors(searchTerm)
      return response.data || response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search vendors'
      throw err
    }
  }

  // Actions - Utility
  const clearCurrentQuotation = () => {
    currentQuotation.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const setFilters = (newFilters: Partial<PurchaseQuotationFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      priority: undefined,
      vendorCode: '',
      department: '',
      costCenter: '',
      projectCode: '',
      search: '',
      quotationDateFrom: '',
      quotationDateTo: '',
      validUntilFrom: '',
      validUntilTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    quotations,
    vendors,
    currentQuotation,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    quotationsByStatus,
    quotationsByType,
    quotationsByPriority,
    draftQuotations,
    sentQuotations,
    receivedQuotations,
    evaluatedQuotations,
    approvedQuotations,
    convertedQuotations,
    totalAmount,
    averageQuotationValue,

    // Actions
    loadQuotations,
    loadQuotation,
    createQuotation,
    updateQuotation,
    deleteQuotation,
    sendQuotation,
    evaluateQuotation,
    approveQuotation,
    convertToOrder,
    copyQuotation,
    loadQuotationStats,
    loadVendors,
    searchVendors,
    clearCurrentQuotation,
    clearError,
    setFilters,
    resetFilters,
  }
})
