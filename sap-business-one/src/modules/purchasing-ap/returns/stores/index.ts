import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { purchaseReturnApi } from '../api'
import { PurchaseReturnStatus, ReturnType, ReturnReason } from '../types'
import type {
  PurchaseReturn,
  PurchaseReturnFormData,
  PurchaseReturnFilters,
  PurchaseReturnStats,
  PurchaseReturnPagination,
} from '../types'

export const usePurchaseReturnStore = defineStore('purchaseReturn', () => {
  // State
  const returns = ref<PurchaseReturn[]>([])
  const currentReturn = ref<PurchaseReturn | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<{ data: PurchaseReturnStats } | null>(null)

  // Pagination
  const pagination = ref<PurchaseReturnPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<PurchaseReturnFilters>({
    status: undefined,
    type: undefined,
    returnReason: undefined,
    vendorCode: '',
    warehouseCode: '',
    department: '',
    costCenter: '',
    projectCode: '',
    search: '',
    returnDateFrom: '',
    returnDateTo: '',
    postingDateFrom: '',
    postingDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const returnsByStatus = computed(() => {
    return returns.value.reduce(
      (acc, returnItem) => {
        const status = returnItem.status
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const returnsByType = computed(() => {
    return returns.value.reduce(
      (acc, returnItem) => {
        const type = returnItem.type
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const returnsByReason = computed(() => {
    return returns.value.reduce(
      (acc, returnItem) => {
        const reason = returnItem.returnReason
        acc[reason] = (acc[reason] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const totalAmount = computed(() => {
    return returns.value.reduce((sum, returnItem) => sum + returnItem.totalAmount, 0)
  })

  const averageReturnValue = computed(() => {
    return returns.value.length > 0 ? totalAmount.value / returns.value.length : 0
  })

  const draftReturns = computed(() => {
    return returns.value.filter((returnItem) => returnItem.status === PurchaseReturnStatus.DRAFT)
  })

  const openReturns = computed(() => {
    return returns.value.filter((returnItem) => returnItem.status === PurchaseReturnStatus.OPEN)
  })

  const postedReturns = computed(() => {
    return returns.value.filter((returnItem) => returnItem.status === PurchaseReturnStatus.POSTED)
  })

  const cancelledReturns = computed(() => {
    return returns.value.filter(
      (returnItem) => returnItem.status === PurchaseReturnStatus.CANCELLED,
    )
  })

  const onHoldReturns = computed(() => {
    return returns.value.filter((returnItem) => returnItem.status === PurchaseReturnStatus.ON_HOLD)
  })

  // Actions - Core CRUD
  const loadReturns = async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseReturnFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseReturnApi.getReturns(params)
      returns.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load returns'
      console.error('Error loading returns:', err)
    } finally {
      loading.value = false
    }
  }

  const loadReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const returnItem = await purchaseReturnApi.getReturn(id)
      currentReturn.value = returnItem

      // Update the return in the list if it exists
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = returnItem
      }

      return returnItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load return'
      console.error('Error loading return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createReturn = async (data: PurchaseReturnFormData) => {
    try {
      loading.value = true
      error.value = null

      const newReturn = await purchaseReturnApi.createReturn(data)
      returns.value.unshift(newReturn)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create return'
      console.error('Error creating return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReturn = async (id: string, data: PurchaseReturnFormData) => {
    try {
      loading.value = true
      error.value = null

      const updatedReturn = await purchaseReturnApi.updateReturn(id, data)

      // Update in the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = updatedReturn
      }

      // Update current return if it's the one being edited
      if (currentReturn.value?.id === id) {
        currentReturn.value = updatedReturn
      }

      return updatedReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update return'
      console.error('Error updating return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await purchaseReturnApi.deleteReturn(id)

      // Remove from the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value.splice(index, 1)
      }

      // Update pagination
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      // Clear current return if it's the one being deleted
      if (currentReturn.value?.id === id) {
        currentReturn.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete return'
      console.error('Error deleting return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const postReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const postedReturn = await purchaseReturnApi.postReturn(id)

      // Update in the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = postedReturn
      }

      // Update current return if it's the one being posted
      if (currentReturn.value?.id === id) {
        currentReturn.value = postedReturn
      }

      return postedReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post return'
      console.error('Error posting return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledReturn = await purchaseReturnApi.cancelReturn(id)

      // Update in the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = cancelledReturn
      }

      // Update current return if it's the one being cancelled
      if (currentReturn.value?.id === id) {
        currentReturn.value = cancelledReturn
      }

      return cancelledReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel return'
      console.error('Error cancelling return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const putOnHold = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const onHoldReturn = await purchaseReturnApi.putOnHold(id)

      // Update in the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = onHoldReturn
      }

      // Update current return if it's the one being put on hold
      if (currentReturn.value?.id === id) {
        currentReturn.value = onHoldReturn
      }

      return onHoldReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to put return on hold'
      console.error('Error putting return on hold:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const resumeReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const resumedReturn = await purchaseReturnApi.resumeReturn(id)

      // Update in the list
      const index = returns.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        returns.value[index] = resumedReturn
      }

      // Update current return if it's the one being resumed
      if (currentReturn.value?.id === id) {
        currentReturn.value = resumedReturn
      }

      return resumedReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to resume return'
      console.error('Error resuming return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const copyReturn = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedReturn = await purchaseReturnApi.copyReturn(id)
      returns.value.unshift(copiedReturn)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return copiedReturn
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy return'
      console.error('Error copying return:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const printReturn = async (id: string) => {
    try {
      await purchaseReturnApi.printReturn(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to print return'
      console.error('Error printing return:', err)
      throw err
    }
  }

  const emailReturn = async (id: string, email: string) => {
    try {
      await purchaseReturnApi.emailReturn(id, email)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to email return'
      console.error('Error emailing return:', err)
      throw err
    }
  }

  // Actions - Statistics
  const loadReturnStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseReturnApi.getReturnStats()
      stats.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load return statistics'
      console.error('Error loading return statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Validation
  const validateReturn = async (data: PurchaseReturnFormData) => {
    try {
      return await purchaseReturnApi.validateReturn(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate return'
      console.error('Error validating return:', err)
      throw err
    }
  }

  // Actions - Filter Management
  const updateFilters = (newFilters: Partial<PurchaseReturnFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      returnReason: undefined,
      vendorCode: '',
      warehouseCode: '',
      department: '',
      costCenter: '',
      projectCode: '',
      search: '',
      returnDateFrom: '',
      returnDateTo: '',
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
      loadReturns({ page, limit: pagination.value.limit, filters: filters.value })
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
    loadReturns({ page: 1, limit: newLimit, filters: filters.value })
  }

  // Actions - State Clearing
  const clearCurrentReturn = () => {
    currentReturn.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const clearStore = () => {
    returns.value = []
    currentReturn.value = null
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
      returnReason: undefined,
      vendorCode: '',
      warehouseCode: '',
      department: '',
      costCenter: '',
      projectCode: '',
      search: '',
      returnDateFrom: '',
      returnDateTo: '',
      postingDateFrom: '',
      postingDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    returns,
    currentReturn,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed Properties
    returnsByStatus,
    returnsByType,
    returnsByReason,
    totalAmount,
    averageReturnValue,
    draftReturns,
    openReturns,
    postedReturns,
    cancelledReturns,
    onHoldReturns,

    // Actions - Core CRUD
    loadReturns,
    loadReturn,
    createReturn,
    updateReturn,
    deleteReturn,

    // Actions - Business Logic
    postReturn,
    cancelReturn,
    putOnHold,
    resumeReturn,

    // Actions - Utility
    copyReturn,
    printReturn,
    emailReturn,

    // Actions - Statistics
    loadReturnStats,

    // Actions - Validation
    validateReturn,

    // Actions - Filter Management
    updateFilters,
    clearFilters,

    // Actions - Pagination Controls
    goToPage,
    nextPage,
    previousPage,
    changePageSize,

    // Actions - State Clearing
    clearCurrentReturn,
    clearError,
    clearStore,
  }
})
