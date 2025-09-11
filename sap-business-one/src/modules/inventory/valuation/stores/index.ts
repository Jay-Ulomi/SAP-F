import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { valuationApi } from '../api'
import type {
  InventoryValuation,
  ValuationFormData,
  ValuationListParams,
  ValuationListResponse,
  ValuationStats,
  ValuationFilters,
} from '../types'

export const useValuationStore = defineStore('inventoryValuation', () => {
  // State
  const items = ref<InventoryValuation[]>([])
  const currentItem = ref<InventoryValuation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ValuationStats | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<ValuationFilters>({})
  const sortBy = ref('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchValuations = async (params: ValuationListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: ValuationListResponse = await valuationApi.getValuations({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch valuations'
      console.error('Error fetching valuations:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchValuation = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await valuationApi.getValuation(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch valuation'
      console.error('Error fetching valuation:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createValuation = async (data: ValuationFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await valuationApi.createValuation(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create valuation'
      console.error('Error creating valuation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateValuation = async (id: string, data: Partial<ValuationFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await valuationApi.updateValuation(id, data)
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
      error.value = err instanceof Error ? err.message : 'Failed to update valuation'
      console.error('Error updating valuation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteValuation = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await valuationApi.deleteValuation(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete valuation'
      console.error('Error deleting valuation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveValuation = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const approvedItem = await valuationApi.approveValuation(id)
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
      error.value = err instanceof Error ? err.message : 'Failed to approve valuation'
      console.error('Error approving valuation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeValuation = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const completedItem = await valuationApi.completeValuation(id)
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
      error.value = err instanceof Error ? err.message : 'Failed to complete valuation'
      console.error('Error completing valuation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await valuationApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchValuations()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchValuations()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<ValuationFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchValuations()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchValuations()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchValuations()
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
    fetchValuations,
    fetchValuation,
    createValuation,
    updateValuation,
    deleteValuation,
    approveValuation,
    completeValuation,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
