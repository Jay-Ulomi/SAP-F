import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apCreditMemoApi } from '../api'
import { ApCreditMemoStatus, ApCreditMemoType, PaymentTerms } from '../types'
import type {
  ApCreditMemo,
  ApCreditMemoFormData,
  ApCreditMemoFilters,
  ApCreditMemoStats,
  ApCreditMemoPagination,
} from '../types'

export const useApCreditMemoStore = defineStore('apCreditMemo', () => {
  // State
  const creditMemos = ref<ApCreditMemo[]>([])
  const currentCreditMemo = ref<ApCreditMemo | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<{ data: ApCreditMemoStats } | null>(null)

  // Pagination
  const pagination = ref<ApCreditMemoPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<ApCreditMemoFilters>({
    status: undefined,
    type: undefined,
    vendorCode: '',
    search: '',
    paymentTerms: undefined,
    currency: undefined,
    projectCode: '',
    creditMemoDateFrom: '',
    creditMemoDateTo: '',
    postingDateFrom: '',
    postingDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const creditMemosByStatus = computed(() => {
    return creditMemos.value.reduce(
      (acc, creditMemo) => {
        const status = creditMemo.status
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const creditMemosByType = computed(() => {
    return creditMemos.value.reduce(
      (acc, creditMemo) => {
        const type = creditMemo.type
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const totalAmount = computed(() => {
    return creditMemos.value.reduce((sum, creditMemo) => sum + creditMemo.totalAmount, 0)
  })

  const appliedAmount = computed(() => {
    return creditMemos.value.reduce((sum, creditMemo) => sum + creditMemo.appliedAmount, 0)
  })

  const outstandingAmount = computed(() => {
    return creditMemos.value.reduce((sum, creditMemo) => sum + creditMemo.remainingAmount, 0)
  })

  const averageCreditMemoValue = computed(() => {
    return creditMemos.value.length > 0 ? totalAmount.value / creditMemos.value.length : 0
  })

  const draftCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.DRAFT)
  })

  const pendingCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.PENDING)
  })

  const approvedCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.APPROVED)
  })

  const appliedCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.APPLIED)
  })

  const partiallyAppliedCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.PARTIALLY_APPLIED)
  })

  const cancelledCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.CANCELLED)
  })

  const rejectedCreditMemos = computed(() => {
    return creditMemos.value.filter((creditMemo) => creditMemo.status === ApCreditMemoStatus.REJECTED)
  })

  // Actions - Core CRUD
  const loadCreditMemos = async (params?: {
    page?: number
    limit?: number
    filters?: ApCreditMemoFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await apCreditMemoApi.getCreditMemos(params)
      creditMemos.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memos'
      console.error('Error loading credit memos:', err)
    } finally {
      loading.value = false
    }
  }

  const loadCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const creditMemo = await apCreditMemoApi.getCreditMemo(id)
      currentCreditMemo.value = creditMemo

      // Update the credit memo in the list if it exists
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = creditMemo
      }

      return creditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memo'
      console.error('Error loading credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createCreditMemo = async (data: ApCreditMemoFormData) => {
    try {
      loading.value = true
      error.value = null

      const newCreditMemo = await apCreditMemoApi.createCreditMemo(data)
      creditMemos.value.unshift(newCreditMemo)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create credit memo'
      console.error('Error creating credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCreditMemo = async (id: string, data: ApCreditMemoFormData) => {
    try {
      loading.value = true
      error.value = null

      const updatedCreditMemo = await apCreditMemoApi.updateCreditMemo(id, data)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = updatedCreditMemo
      }

      // Update current credit memo if it's the one being edited
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = updatedCreditMemo
      }

      return updatedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update credit memo'
      console.error('Error updating credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await apCreditMemoApi.deleteCreditMemo(id)

      // Remove from the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value.splice(index, 1)
      }

      // Update pagination
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      // Clear current credit memo if it's the one being deleted
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete credit memo'
      console.error('Error deleting credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const approveCreditMemo = async (id: string, approvalNotes?: string) => {
    try {
      loading.value = true
      error.value = null

      const approvedCreditMemo = await apCreditMemoApi.approveCreditMemo(id, approvalNotes)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = approvedCreditMemo
      }

      // Update current credit memo if it's the one being approved
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = approvedCreditMemo
      }

      return approvedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve credit memo'
      console.error('Error approving credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectCreditMemo = async (id: string, rejectionNotes: string) => {
    try {
      loading.value = true
      error.value = null

      const rejectedCreditMemo = await apCreditMemoApi.rejectCreditMemo(id, rejectionNotes)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = rejectedCreditMemo
      }

      // Update current credit memo if it's the one being rejected
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = rejectedCreditMemo
      }

      return rejectedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject credit memo'
      console.error('Error rejecting credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const postedCreditMemo = await apCreditMemoApi.postCreditMemo(id)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = postedCreditMemo
      }

      // Update current credit memo if it's the one being posted
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = postedCreditMemo
      }

      return postedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post credit memo'
      console.error('Error posting credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledCreditMemo = await apCreditMemoApi.cancelCreditMemo(id)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = cancelledCreditMemo
      }

      // Update current credit memo if it's the one being cancelled
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = cancelledCreditMemo
      }

      return cancelledCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel credit memo'
      console.error('Error cancelling credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const applyCreditMemo = async (id: string, applyAmount: number) => {
    try {
      loading.value = true
      error.value = null

      const updatedCreditMemo = await apCreditMemoApi.applyCreditMemo(id, applyAmount)

      // Update in the list
      const index = creditMemos.value.findIndex((cm) => cm.id === id)
      if (index !== -1) {
        creditMemos.value[index] = updatedCreditMemo
      }

      // Update current credit memo if it's the one being updated
      if (currentCreditMemo.value?.id === id) {
        currentCreditMemo.value = updatedCreditMemo
      }

      return updatedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to apply credit memo'
      console.error('Error applying credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const copyCreditMemo = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedCreditMemo = await apCreditMemoApi.copyCreditMemo(id)
      creditMemos.value.unshift(copiedCreditMemo)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return copiedCreditMemo
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy credit memo'
      console.error('Error copying credit memo:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const printCreditMemo = async (id: string) => {
    try {
      await apCreditMemoApi.printCreditMemo(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to print credit memo'
      console.error('Error printing credit memo:', err)
      throw err
    }
  }

  const emailCreditMemo = async (id: string, email: string) => {
    try {
      await apCreditMemoApi.emailCreditMemo(id, email)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to email credit memo'
      console.error('Error emailing credit memo:', err)
      throw err
    }
  }

  // Actions - Statistics
  const loadCreditMemoStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await apCreditMemoApi.getCreditMemoStats()
      stats.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load credit memo statistics'
      console.error('Error loading credit memo statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Validation
  const validateCreditMemo = async (data: ApCreditMemoFormData) => {
    try {
      return await apCreditMemoApi.validateCreditMemo(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate credit memo'
      console.error('Error validating credit memo:', err)
      throw err
    }
  }

  // Actions - Filter Management
  const updateFilters = (newFilters: Partial<ApCreditMemoFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      vendorCode: '',
      search: '',
      paymentTerms: undefined,
      currency: undefined,
      projectCode: '',
      creditMemoDateFrom: '',
      creditMemoDateTo: '',
      postingDateFrom: '',
      postingDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
    pagination.value.page = 1
  }

  // Actions - Pagination Controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadCreditMemos({ page, limit: pagination.value.limit, filters: filters.value })
    }
  }

  const nextPage = () => {
    if (pagination.value.hasMore) {
      goToPage(pagination.value.page + 1)
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      goToPage(pagination.value.page - 1)
    }
  }

  const changePageSize = (newLimit: number) => {
    pagination.value.limit = newLimit
    pagination.value.page = 1
    loadCreditMemos({ page: 1, limit: newLimit, filters: filters.value })
  }

  // Actions - State Clearing
  const clearCurrentCreditMemo = () => {
    currentCreditMemo.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const clearStore = () => {
    creditMemos.value = []
    currentCreditMemo.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: false,
    }
    filters.value = {
      status: undefined,
      type: undefined,
      vendorCode: '',
      search: '',
      paymentTerms: undefined,
      currency: undefined,
      projectCode: '',
      creditMemoDateFrom: '',
      creditMemoDateTo: '',
      postingDateFrom: '',
      postingDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    creditMemos,
    currentCreditMemo,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed Properties
    creditMemosByStatus,
    creditMemosByType,
    totalAmount,
    appliedAmount,
    outstandingAmount,
    averageCreditMemoValue,
    draftCreditMemos,
    pendingCreditMemos,
    approvedCreditMemos,
    appliedCreditMemos,
    partiallyAppliedCreditMemos,
    cancelledCreditMemos,
    rejectedCreditMemos,

    // Actions - Core CRUD
    loadCreditMemos,
    loadCreditMemo,
    createCreditMemo,
    updateCreditMemo,
    deleteCreditMemo,

    // Actions - Business Logic
    approveCreditMemo,
    rejectCreditMemo,
    postCreditMemo,
    cancelCreditMemo,
    applyCreditMemo,

    // Actions - Utility
    copyCreditMemo,
    printCreditMemo,
    emailCreditMemo,

    // Actions - Statistics
    loadCreditMemoStats,

    // Actions - Validation
    validateCreditMemo,

    // Actions - Filter Management
    updateFilters,
    clearFilters,

    // Actions - Pagination Controls
    goToPage,
    nextPage,
    previousPage,
    changePageSize,

    // Actions - State Clearing
    clearCurrentCreditMemo,
    clearError,
    clearStore,
  }
})
