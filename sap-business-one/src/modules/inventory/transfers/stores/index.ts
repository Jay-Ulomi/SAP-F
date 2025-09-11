import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { transfersApi } from '../api'
import type {
  InventoryTransfer,
  TransferFormData,
  TransferListParams,
  TransferListResponse,
  TransferStats,
  TransferFilters,
} from '../types'

export const useTransfersStore = defineStore('inventoryTransfers', () => {
  // State
  const items = ref<InventoryTransfer[]>([])
  const currentItem = ref<InventoryTransfer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<TransferStats | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<TransferFilters>({})
  const sortBy = ref('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchTransfers = async (params: TransferListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: TransferListResponse = await transfersApi.getTransfers({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch transfers'
      console.error('Error fetching transfers:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchTransfer = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await transfersApi.getTransfer(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch transfer'
      console.error('Error fetching transfer:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createTransfer = async (data: TransferFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await transfersApi.createTransfer(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create transfer'
      console.error('Error creating transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTransfer = async (id: string, data: Partial<TransferFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await transfersApi.updateTransfer(id, data)
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
      error.value = err instanceof Error ? err.message : 'Failed to update transfer'
      console.error('Error updating transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTransfer = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await transfersApi.deleteTransfer(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete transfer'
      console.error('Error deleting transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveTransfer = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const approvedItem = await transfersApi.approveTransfer(id)
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
      error.value = err instanceof Error ? err.message : 'Failed to approve transfer'
      console.error('Error approving transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeTransfer = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const completedItem = await transfersApi.completeTransfer(id)
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = completedItem
      }
      if (currentItem.value?.id === id) {
        currentItem.value = completedItem
      }
      await fetchStats()
      return completedItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete transfer'
      console.error('Error completing transfer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await transfersApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchTransfers()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchTransfers()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<TransferFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchTransfers()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchTransfers()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchTransfers()
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
    fetchTransfers,
    fetchTransfer,
    createTransfer,
    updateTransfer,
    deleteTransfer,
    approveTransfer,
    completeTransfer,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
