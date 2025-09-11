import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { goodsReceiptApi } from '../api'
import { GoodsReceiptStatus, ReceiptType, QualityStatus } from '../types'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptFilters,
  GoodsReceiptStats,
  GoodsReceiptPagination,
} from '../types'

export const useGoodsReceiptStore = defineStore('goodsReceipt', () => {
  // State
  const receipts = ref<GoodsReceipt[]>([])
  const currentReceipt = ref<GoodsReceipt | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<{ data: GoodsReceiptStats } | null>(null)

  // Pagination
  const pagination = ref<GoodsReceiptPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<GoodsReceiptFilters>({
    status: undefined,
    type: undefined,
    vendorCode: '',
    warehouseCode: '',
    department: '',
    costCenter: '',
    projectCode: '',
    search: '',
    receiptDateFrom: '',
    receiptDateTo: '',
    postingDateFrom: '',
    postingDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const receiptsByStatus = computed(() => {
    return receipts.value.reduce(
      (acc, receipt) => {
        const status = receipt.status
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const receiptsByType = computed(() => {
    return receipts.value.reduce(
      (acc, receipt) => {
        const type = receipt.type
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const totalAmount = computed(() => {
    return receipts.value.reduce((sum, receipt) => sum + receipt.totalAmount, 0)
  })

  const averageReceiptValue = computed(() => {
    return receipts.value.length > 0 ? totalAmount.value / receipts.value.length : 0
  })

  const draftReceipts = computed(() => {
    return receipts.value.filter((receipt) => receipt.status === GoodsReceiptStatus.DRAFT)
  })

  const postedReceipts = computed(() => {
    return receipts.value.filter((receipt) => receipt.status === GoodsReceiptStatus.POSTED)
  })

  const cancelledReceipts = computed(() => {
    return receipts.value.filter((receipt) => receipt.status === GoodsReceiptStatus.CANCELLED)
  })

  const onHoldReceipts = computed(() => {
    return receipts.value.filter((receipt) => receipt.status === GoodsReceiptStatus.ON_HOLD)
  })

  // Actions - Core CRUD
  const loadReceipts = async (params?: {
    page?: number
    limit?: number
    filters?: GoodsReceiptFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await goodsReceiptApi.getReceipts({
        page: params?.page || pagination.value.page,
        limit: params?.limit || pagination.value.limit,
        filters: params?.filters || filters.value,
      })

      receipts.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load goods receipts'
      console.error('Error loading goods receipts:', err)
    } finally {
      loading.value = false
    }
  }

  const loadReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const receipt = await goodsReceiptApi.getReceipt(id)
      currentReceipt.value = receipt

      // Update the receipt in the list if it exists
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = receipt
      }

      return receipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load goods receipt'
      console.error('Error loading goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createReceipt = async (data: GoodsReceiptFormData) => {
    try {
      loading.value = true
      error.value = null

      const newReceipt = await goodsReceiptApi.createReceipt(data)
      receipts.value.unshift(newReceipt)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create goods receipt'
      console.error('Error creating goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReceipt = async (id: string, data: GoodsReceiptFormData) => {
    try {
      loading.value = true
      error.value = null

      const updatedReceipt = await goodsReceiptApi.updateReceipt(id, data)

      // Update in the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = updatedReceipt
      }

      // Update current receipt if it's the one being edited
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = updatedReceipt
      }

      return updatedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update goods receipt'
      console.error('Error updating goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await goodsReceiptApi.deleteReceipt(id)

      // Remove from the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value.splice(index, 1)
      }

      // Clear current receipt if it's the one being deleted
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = null
      }

      // Update pagination
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete goods receipt'
      console.error('Error deleting goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const postReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const postedReceipt = await goodsReceiptApi.postReceipt(id)

      // Update in the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = postedReceipt
      }

      // Update current receipt if it's the one being posted
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = postedReceipt
      }

      return postedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post goods receipt'
      console.error('Error posting goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledReceipt = await goodsReceiptApi.cancelReceipt(id)

      // Update in the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = cancelledReceipt
      }

      // Update current receipt if it's the one being cancelled
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = cancelledReceipt
      }

      return cancelledReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel goods receipt'
      console.error('Error cancelling goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const putOnHold = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const onHoldReceipt = await goodsReceiptApi.putOnHold(id)

      // Update in the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = onHoldReceipt
      }

      // Update current receipt if it's the one being put on hold
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = onHoldReceipt
      }

      return onHoldReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to put goods receipt on hold'
      console.error('Error putting goods receipt on hold:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const resumeReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const resumedReceipt = await goodsReceiptApi.resumeReceipt(id)

      // Update in the list
      const index = receipts.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        receipts.value[index] = resumedReceipt
      }

      // Update current receipt if it's the one being resumed
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = resumedReceipt
      }

      return resumedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to resume goods receipt'
      console.error('Error resuming goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const copyReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedReceipt = await goodsReceiptApi.copyReceipt(id)
      receipts.value.unshift(copiedReceipt)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return copiedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy goods receipt'
      console.error('Error copying goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const printReceipt = async (id: string) => {
    try {
      return await goodsReceiptApi.printReceipt(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to print goods receipt'
      console.error('Error printing goods receipt:', err)
      throw err
    }
  }

  const emailReceipt = async (id: string, email: string) => {
    try {
      return await goodsReceiptApi.emailReceipt(id, email)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to email goods receipt'
      console.error('Error emailing goods receipt:', err)
      throw err
    }
  }

  // Actions - Statistics
  const loadReceiptStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await goodsReceiptApi.getReceiptStats()
      stats.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load goods receipt statistics'
      console.error('Error loading goods receipt statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Validation
  const validateReceipt = async (data: GoodsReceiptFormData) => {
    try {
      return await goodsReceiptApi.validateReceipt(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate goods receipt'
      console.error('Error validating goods receipt:', err)
      throw err
    }
  }

  // Actions - Filters
  const updateFilters = (newFilters: Partial<GoodsReceiptFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const resetFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      vendorCode: '',
      warehouseCode: '',
      department: '',
      costCenter: '',
      projectCode: '',
      search: '',
      receiptDateFrom: '',
      receiptDateTo: '',
      postingDateFrom: '',
      postingDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
    pagination.value.page = 1
  }

  const applyFilters = async () => {
    await loadReceipts({ filters: filters.value, page: 1 })
  }

  // Actions - Pagination
  const goToPage = async (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      await loadReceipts({ page, filters: filters.value })
    }
  }

  const nextPage = async () => {
    if (pagination.value.hasMore) {
      await goToPage(pagination.value.page + 1)
    }
  }

  const previousPage = async () => {
    if (pagination.value.page > 1) {
      await goToPage(pagination.value.page - 1)
    }
  }

  // Actions - State Management
  const clearCurrentReceipt = () => {
    currentReceipt.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const clearReceipts = () => {
    receipts.value = []
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: false,
    }
  }

  return {
    // State
    receipts,
    currentReceipt,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    receiptsByStatus,
    receiptsByType,
    totalAmount,
    averageReceiptValue,
    draftReceipts,
    postedReceipts,
    cancelledReceipts,
    onHoldReceipts,

    // Actions - Core CRUD
    loadReceipts,
    loadReceipt,
    createReceipt,
    updateReceipt,
    deleteReceipt,

    // Actions - Business Logic
    postReceipt,
    cancelReceipt,
    putOnHold,
    resumeReceipt,

    // Actions - Utility
    copyReceipt,
    printReceipt,
    emailReceipt,

    // Actions - Statistics
    loadReceiptStats,

    // Actions - Validation
    validateReceipt,

    // Actions - Filters
    updateFilters,
    resetFilters,
    applyFilters,

    // Actions - Pagination
    goToPage,
    nextPage,
    previousPage,

    // Actions - State Management
    clearCurrentReceipt,
    clearError,
    clearReceipts,
  }
})
