import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { goodsReceiptsApi } from '../api'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptListParams,
  GoodsReceiptListResponse,
  GoodsReceiptStats,
  GoodsReceiptFilters,
} from '../types'

export const useGoodsReceiptsStore = defineStore('goodsReceipts', () => {
  // State
  const items = ref<GoodsReceipt[]>([])
  const currentItem = ref<GoodsReceipt | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<GoodsReceiptStats | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<GoodsReceiptFilters>({})
  const sortBy = ref('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchGoodsReceipts = async (params: GoodsReceiptListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: GoodsReceiptListResponse = await goodsReceiptsApi.getGoodsReceipts({
        page: currentPage.value,
        limit: itemsPerPage.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
        filters: { ...filters.value, ...params.filters },
      })

      items.value = response.items
      totalItems.value = response.total
      totalPages.value = response.totalPages
      stats.value = response.stats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch goods receipts'
      console.error('Error fetching goods receipts:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchGoodsReceipt = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await goodsReceiptsApi.getGoodsReceipt(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch goods receipt'
      console.error('Error fetching goods receipt:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createGoodsReceipt = async (data: GoodsReceiptFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await goodsReceiptsApi.createGoodsReceipt(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create goods receipt'
      console.error('Error creating goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateGoodsReceipt = async (id: string, data: Partial<GoodsReceiptFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await goodsReceiptsApi.updateGoodsReceipt(id, data)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = updatedItem
      }
      if (currentItem.value?.id === id) {
        currentItem.value = updatedItem
      }
      await fetchStats()
      return updatedItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update goods receipt'
      console.error('Error updating goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteGoodsReceipt = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await goodsReceiptsApi.deleteGoodsReceipt(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete goods receipt'
      console.error('Error deleting goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveGoodsReceipt = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const approvedItem = await goodsReceiptsApi.approveGoodsReceipt(id)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = approvedItem
      }
      if (currentItem.value?.id === id) {
        currentItem.value = approvedItem
      }
      await fetchStats()
      return approvedItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve goods receipt'
      console.error('Error approving goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postGoodsReceipt = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const postedItem = await goodsReceiptsApi.postGoodsReceipt(id)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = postedItem
      }
      if (currentItem.value?.id === id) {
        currentItem.value = postedItem
      }
      await fetchStats()
      return postedItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post goods receipt'
      console.error('Error posting goods receipt:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await goodsReceiptsApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchGoodsReceipts()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchGoodsReceipts()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<GoodsReceiptFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchGoodsReceipts()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchGoodsReceipts()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchGoodsReceipts()
  }

  // Reset state
  const resetState = () => {
    items.value = []
    currentItem.value = null
    loading.value = false
    error.value = null
    stats.value = null
    currentPage.value = 1
    totalItems.value = 0
    totalPages.value = 0
    filters.value = {}
    sortBy.value = 'date'
    sortOrder.value = 'desc'
  }

  return {
    // State
    items,
    currentItem,
    loading,
    error,
    stats,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    filters,
    sortBy,
    sortOrder,

    // Computed
    hasItems,
    paginatedItems,

    // Actions
    fetchGoodsReceipts,
    fetchGoodsReceipt,
    createGoodsReceipt,
    updateGoodsReceipt,
    deleteGoodsReceipt,
    approveGoodsReceipt,
    postGoodsReceipt,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
