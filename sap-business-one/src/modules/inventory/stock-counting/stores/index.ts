import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { countingApi } from '../api'
import type {
  StockCounting,
  CountingFormData,
  CountingListParams,
  CountingListResponse,
  CountingStats,
  CountingFilters,
} from '../types'

export const useCountingStore = defineStore('stockCounting', () => {
  // State
  const items = ref<StockCounting[]>([])
  const currentItem = ref<StockCounting | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CountingStats | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<CountingFilters>({})
  const sortBy = ref('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchCountings = async (params: CountingListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: CountingListResponse = await countingApi.getCountings({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch countings'
      console.error('Error fetching countings:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCounting = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await countingApi.getCounting(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch counting'
      console.error('Error fetching counting:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createCounting = async (data: CountingFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await countingApi.createCounting(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create counting'
      console.error('Error creating counting:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCounting = async (id: string, data: Partial<CountingFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await countingApi.updateCounting(id, data)
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
      error.value = err instanceof Error ? err.message : 'Failed to update counting'
      console.error('Error updating counting:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCounting = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await countingApi.deleteCounting(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete counting'
      console.error('Error deleting counting:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postCounting = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const postedItem = await countingApi.postCounting(id)
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
      error.value = err instanceof Error ? err.message : 'Failed to post counting'
      console.error('Error posting counting:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await countingApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchCountings()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchCountings()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<CountingFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchCountings()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchCountings()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchCountings()
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
    fetchCountings,
    fetchCounting,
    createCounting,
    updateCounting,
    deleteCounting,
    postCounting,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
