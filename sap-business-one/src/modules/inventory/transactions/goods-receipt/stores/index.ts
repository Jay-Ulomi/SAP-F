import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { goodsReceiptApi } from '../api'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptFilters,
  GoodsReceiptStats,
  GoodsReceiptPagination
} from '../types'
import { ReceiptStatus } from '../types'

export const useGoodsReceiptStore = defineStore('goodsReceipt', () => {
  // State
  const receipts = ref<GoodsReceipt[]>([])
  const currentReceipt = ref<GoodsReceipt | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<GoodsReceiptStats | null>(null)
  const pagination = ref<GoodsReceiptPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<GoodsReceiptFilters>({})

  // Computed properties
  const receiptsByStatus = computed(() => {
    const grouped: Record<ReceiptStatus, GoodsReceipt[]> = {
      [ReceiptStatus.DRAFT]: [],
      [ReceiptStatus.PENDING]: [],
      [ReceiptStatus.RECEIVED]: [],
      [ReceiptStatus.CANCELLED]: []
    }

    receipts.value.forEach(receipt => {
      if (receipt.status) {
        grouped[receipt.status].push(receipt)
      }
    })

    return grouped
  })

  const receivedReceipts = computed(() =>
    receipts.value.filter(receipt => receipt.status === ReceiptStatus.RECEIVED)
  )

  const pendingReceipts = computed(() =>
    receipts.value.filter(receipt => receipt.status === ReceiptStatus.PENDING)
  )

  const draftReceipts = computed(() =>
    receipts.value.filter(receipt => receipt.status === ReceiptStatus.DRAFT)
  )

  const totalValue = computed(() =>
    receipts.value.reduce((sum, receipt) => sum + receipt.totalAmount, 0)
  )

  // Actions
  const loadReceipts = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await goodsReceiptApi.getReceipts(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )

      receipts.value = result.receipts
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load receipts'
      console.error('Error loading receipts:', err)
    } finally {
      loading.value = false
    }
  }

  const loadReceiptById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const receipt = await goodsReceiptApi.getReceiptById(id)
      currentReceipt.value = receipt

      return receipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load receipt'
      console.error('Error loading receipt:', err)
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

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create receipt'
      console.error('Error creating receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReceipt = async (id: string, data: Partial<GoodsReceiptFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedReceipt = await goodsReceiptApi.updateReceipt(id, data)

      const index = receipts.value.findIndex(r => r.id === parseInt(id))
      if (index !== -1) {
        receipts.value[index] = updatedReceipt
      }

      if (currentReceipt.value?.id === parseInt(id)) {
        currentReceipt.value = updatedReceipt
      }

      return updatedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update receipt'
      console.error('Error updating receipt:', err)
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

      const index = receipts.value.findIndex(r => r.id === parseInt(id))
      if (index !== -1) {
        receipts.value.splice(index, 1)
      }

      if (currentReceipt.value?.id === parseInt(id)) {
        currentReceipt.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete receipt'
      console.error('Error deleting receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadReceiptStats = async () => {
    try {
      loading.value = true
      error.value = null

      const receiptStats = await goodsReceiptApi.getReceiptStats()
      stats.value = receiptStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load receipt statistics'
      console.error('Error loading receipt statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const completeReceipt = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const completedReceipt = await goodsReceiptApi.completeReceipt(id)

      const index = receipts.value.findIndex(r => r.id === parseInt(id))
      if (index !== -1) {
        receipts.value[index] = completedReceipt
      }

      if (currentReceipt.value?.id === parseInt(id)) {
        currentReceipt.value = completedReceipt
      }

      return completedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete receipt'
      console.error('Error completing receipt:', err)
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

      const index = receipts.value.findIndex(r => r.id === parseInt(id))
      if (index !== -1) {
        receipts.value[index] = cancelledReceipt
      }

      if (currentReceipt.value?.id === parseInt(id)) {
        currentReceipt.value = cancelledReceipt
      }

      return cancelledReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel receipt'
      console.error('Error cancelling receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadReceipts()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadReceipts()
    }
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadReceipts()
    }
  }

  // Filter actions
  const setFilters = (newFilters: GoodsReceiptFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadReceipts()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadReceipts()
  }

  const clearError = () => {
    error.value = null
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
    receivedReceipts,
    pendingReceipts,
    draftReceipts,
    totalValue,

    // Actions
    loadReceipts,
    loadReceiptById,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    loadReceiptStats,
    completeReceipt,
    cancelReceipt,

    // Pagination
    nextPage,
    previousPage,
    setPage,

    // Filters
    setFilters,
    clearFilters,

    // Utils
    clearError
  }
})