import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { creditMemosApi, customersApi, itemsApi, taxCodesApi } from '../api/creditMemosApi'
import type {
  CreditMemo,
  CreditMemoFormData,
  CreditMemoFilters,
  CreditMemoStatsResponse,
  Customer,
  CreditMemoStatus,
  CreditMemoType,
  FormType,
} from '../types'
import { CreditMemoStatus, CreditMemoType, FormType } from '../types'

export const useCreditMemosStore = defineStore('creditMemos', () => {
  // State
  const creditMemos = ref<CreditMemo[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentCreditMemo = ref<CreditMemo | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CreditMemoStatsResponse | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<CreditMemoFilters>({
    status: undefined,
    type: undefined,
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    amountFrom: undefined,
    amountTo: undefined,
    currency: undefined,
    unapplied: false,
    formType: [],
  })

  // Computed Properties
  const creditMemosByStatus = computed(() => {
    return creditMemos.value.reduce(
      (acc, memo) => {
        acc[memo.status] = (acc[memo.status] || 0) + 1
        return acc
      },
      {} as Record<CreditMemoStatus, number>,
    )
  })

  const creditMemosByType = computed(() => {
    return creditMemos.value.reduce(
      (acc, memo) => {
        acc[memo.type] = (acc[memo.type] || 0) + 1
        return acc
      },
      {} as Record<CreditMemoType, number>,
    )
  })

  const creditMemosByFormType = computed(() => {
    const grouped = creditMemos.value.reduce(
      (acc, memo) => {
        const formType = memo.formType
        if (!acc[formType]) acc[formType] = []
        acc[formType].push(memo)
        return acc
      },
      {} as Record<FormType, CreditMemo[]>,
    )

    return grouped
  })

  const itemCreditMemos = computed(() =>
    creditMemos.value.filter((m) => m.formType === FormType.ITEM),
  )

  const serviceCreditMemos = computed(() =>
    creditMemos.value.filter((m) => m.formType === FormType.SERVICE),
  )

  const draftCreditMemos = computed(() =>
    creditMemos.value.filter((memo) => memo.status === CreditMemoStatus.DRAFT),
  )

  const openCreditMemos = computed(() =>
    creditMemos.value.filter((memo) => memo.status === CreditMemoStatus.OPEN),
  )

  const appliedCreditMemos = computed(() =>
    creditMemos.value.filter((memo) => memo.status === CreditMemoStatus.APPLIED),
  )

  const partiallyAppliedCreditMemos = computed(() =>
    creditMemos.value.filter((memo) => memo.status === CreditMemoStatus.PARTIALLY_APPLIED),
  )

  const unappliedCreditMemos = computed(() =>
    creditMemos.value.filter((memo) => memo.remainingAmount > 0),
  )

  const totalUnapplied = computed(() =>
    creditMemos.value
      .filter((memo) => memo.remainingAmount > 0)
      .reduce((sum, memo) => sum + memo.remainingAmount, 0),
  )

  const totalApplied = computed(() =>
    creditMemos.value.reduce((sum, memo) => sum + memo.appliedAmount, 0),
  )

  const averageCreditMemoValue = computed(() => {
    if (creditMemos.value.length === 0) return 0
    return creditMemos.value.reduce((sum, memo) => sum + memo.total, 0) / creditMemos.value.length
  })

  // Actions - Credit Memos
  const loadCreditMemos = async (params?: {
    page?: number
    limit?: number
    filters?: CreditMemoFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.getCreditMemos(params)
      creditMemos.value = response.data

      pagination.value = {
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        hasMore: response.pagination.hasMore,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memos'
    } finally {
      loading.value = false
    }
  }

  const loadCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.getCreditMemo(id)
      currentCreditMemo.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCreditMemo = async (data: CreditMemoFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.createCreditMemo(data)
      creditMemos.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCreditMemo = async (id: string, data: Partial<CreditMemoFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.updateCreditMemo(id, data)
      const index = creditMemos.value.findIndex((memo) => memo.id === id)
      if (index !== -1) {
        creditMemos.value[index] = response.data
      }
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await creditMemosApi.deleteCreditMemo(id)
      creditMemos.value = creditMemos.value.filter((memo) => memo.id !== id)
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const postCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.postCreditMemo(id)
      const index = creditMemos.value.findIndex((memo) => memo.id === id)
      if (index !== -1) {
        creditMemos.value[index] = response.data
      }
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelCreditMemo = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.cancelCreditMemo(id, reason)
      const index = creditMemos.value.findIndex((memo) => memo.id === id)
      if (index !== -1) {
        creditMemos.value[index] = response.data
      }
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyCreditMemo = async (id: string, newDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.copyCreditMemo(id, newDate)
      creditMemos.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadCreditMemoStats = async (filters?: CreditMemoFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.getCreditMemoStats(filters)
      stats.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memo statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  const applyCreditMemo = async (id: string, invoiceId: string, amount: number, notes?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.applyCreditMemo(id, invoiceId, amount, notes)
      const index = creditMemos.value.findIndex((memo) => memo.id === id)
      if (index !== -1) {
        creditMemos.value[index] = response.data
      }
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to apply credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const unapplyCreditMemo = async (id: string, applicationId: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.unapplyCreditMemo(id, applicationId, reason)
      const index = creditMemos.value.findIndex((memo) => memo.id === id)
      if (index !== -1) {
        creditMemos.value[index] = response.data
      }
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to unapply credit memo'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getAvailableInvoices = async (customerCode: string) => {
    try {
      const response = await creditMemosApi.getAvailableInvoices(customerCode)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get available invoices'
      throw err
    }
  }

  const createFromInvoice = async (invoiceId: string, data: Partial<CreditMemoFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await creditMemosApi.createFromInvoice(invoiceId, data)
      creditMemos.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create credit memo from invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Supporting Data
  const loadCustomers = async (params?: { page?: number; limit?: number; search?: string }) => {
    try {
      const response = await customersApi.getCustomers(params)
      customers.value = response.data
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customers'
      throw err
    }
  }

  const searchCustomers = async (query: string) => {
    try {
      const response = await customersApi.searchCustomers(query)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search customers'
      throw err
    }
  }

  const searchItems = async (query: string) => {
    try {
      const response = await itemsApi.searchItems(query)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search items'
      throw err
    }
  }

  const loadTaxCodes = async () => {
    try {
      const response = await taxCodesApi.getTaxCodes()
      taxCodes.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load tax codes'
      throw err
    }
  }

  // Utility Actions
  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    creditMemos.value = []
    customers.value = []
    taxCodes.value = []
    currentCreditMemo.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      hasMore: false,
    }
    filters.value = {
      status: undefined,
      type: undefined,
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      amountFrom: undefined,
      amountTo: undefined,
      currency: undefined,
      unapplied: false,
      formType: [],
    }
  }

  return {
    // State
    creditMemos,
    customers,
    taxCodes,
    currentCreditMemo,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    creditMemosByStatus,
    creditMemosByType,
    creditMemosByFormType,
    itemCreditMemos,
    serviceCreditMemos,
    draftCreditMemos,
    openCreditMemos,
    appliedCreditMemos,
    partiallyAppliedCreditMemos,
    unappliedCreditMemos,
    totalUnapplied,
    totalApplied,
    averageCreditMemoValue,

    // Actions - Credit Memos
    loadCreditMemos,
    loadCreditMemo,
    createCreditMemo,
    updateCreditMemo,
    deleteCreditMemo,
    postCreditMemo,
    cancelCreditMemo,
    copyCreditMemo,
    loadCreditMemoStats,
    applyCreditMemo,
    unapplyCreditMemo,
    getAvailableInvoices,
    createFromInvoice,

    // Actions - Supporting Data
    loadCustomers,
    searchCustomers,
    searchItems,
    loadTaxCodes,

    // Utility Actions
    clearError,
    resetState,
  }
})
