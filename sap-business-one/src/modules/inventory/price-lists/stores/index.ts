import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { priceListsApi } from '../api'
import type {
  PriceList,
  PriceListFormData,
  PriceListListParams,
  PriceListListResponse,
  PriceListStats,
  PriceListFilters,
} from '../types'

export const usePriceListsStore = defineStore('priceLists', () => {
  // State
  const items = ref<PriceList[]>([])
  const currentItem = ref<PriceList | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PriceListStats | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<PriceListFilters>({})
  const sortBy = ref('createdDate')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchPriceLists = async (params: PriceListListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: PriceListListResponse = await priceListsApi.getPriceLists({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch price lists'
      console.error('Error fetching price lists:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchPriceList = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await priceListsApi.getPriceList(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch price list'
      console.error('Error fetching price list:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createPriceList = async (data: PriceListFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await priceListsApi.createPriceList(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create price list'
      console.error('Error creating price list:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePriceList = async (id: string, data: Partial<PriceListFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await priceListsApi.updatePriceList(id, data)
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
      error.value = err instanceof Error ? err.message : 'Failed to update price list'
      console.error('Error updating price list:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePriceList = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await priceListsApi.deletePriceList(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete price list'
      console.error('Error deleting price list:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await priceListsApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchPriceLists()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchPriceLists()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<PriceListFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchPriceLists()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchPriceLists()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchPriceLists()
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
    sortBy.value = 'createdDate'
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
    fetchPriceLists,
    fetchPriceList,
    createPriceList,
    updatePriceList,
    deletePriceList,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
