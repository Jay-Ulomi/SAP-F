import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { itemApi } from '../api'
import type {
  Item,
  ItemFormData,
  ItemStats,
  ItemSearchParams,
  ItemFilters,
} from '../types'

export const useItemsStore = defineStore('items', () => {
  // State
  const items = ref<Item[]>([])
  const currentItem = ref<Item | null>(null)
  const stats = ref<ItemStats | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalItems = ref(0)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const filters = ref<ItemFilters>({})
  const sortBy = ref('itemCode')
  const sortOrder = ref<'asc' | 'desc'>('asc')

  // Computed
  const paginatedItems = computed(() => items.value)
  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
  const hasItems = computed(() => items.value.length > 0)
  const activeItems = computed(() => items.value.filter((item) => item.status === 'active'))
  const inactiveItems = computed(() => items.value.filter((item) => item.status === 'inactive'))
  const lowStockItems = computed(() => items.value.filter((item) => {
    // Mock current stock calculation
    const currentStock = Math.floor(Math.random() * 200)
    return currentStock <= item.reorderPoint
  }))

  // Actions
  const fetchItems = async (params: ItemSearchParams = {}) => {
    loading.value = true
    error.value = null
    
    try {
      const searchParams = {
        page: currentPage.value,
        limit: itemsPerPage.value,
        sortBy: sortBy.value,
        sortOrder: sortOrder.value,
        filters: filters.value,
        ...params,
      }

      const response = await itemApi.getItems(searchParams)
      items.value = response.items
      totalItems.value = response.total
      currentPage.value = response.page
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch items'
      console.error('Error fetching items:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchItemById = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const item = await itemApi.getItemById(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch item'
      console.error('Error fetching item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createItem = async (data: ItemFormData) => {
    loading.value = true
    error.value = null
    
    try {
      const newItem = await itemApi.createItem(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create item'
      console.error('Error creating item:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateItem = async (id: string, data: Partial<ItemFormData>) => {
    loading.value = true
    error.value = null
    
    try {
      const updatedItem = await itemApi.updateItem(id, data)
      if (updatedItem) {
        const index = items.value.findIndex((item) => item.id === id)
        if (index !== -1) {
          items.value[index] = updatedItem
        }
        if (currentItem.value?.id === id) {
          currentItem.value = updatedItem
        }
        await fetchStats()
      }
      return updatedItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update item'
      console.error('Error updating item:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteItem = async (id: string) => {
    loading.value = true
    error.value = null
    
    try {
      const success = await itemApi.deleteItem(id)
      if (success) {
        items.value = items.value.filter((item) => item.id !== id)
        totalItems.value -= 1
        if (currentItem.value?.id === id) {
          currentItem.value = null
        }
        await fetchStats()
      }
      return success
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete item'
      console.error('Error deleting item:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      const statsData = await itemApi.getItemStats()
      stats.value = statsData
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const searchItems = async (query: string) => {
    loading.value = true
    error.value = null
    
    try {
      const searchResults = await itemApi.searchItems(query)
      return searchResults
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search items'
      console.error('Error searching items:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  const getItemsByGroup = async (group: string) => {
    try {
      return await itemApi.getItemsByGroup(group)
    } catch (err) {
      console.error('Error fetching items by group:', err)
      return []
    }
  }

  const getLowStockItems = async () => {
    try {
      return await itemApi.getLowStockItems()
    } catch (err) {
      console.error('Error fetching low stock items:', err)
      return []
    }
  }

  // Filter and pagination actions
  const setFilters = (newFilters: ItemFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchItems()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchItems()
  }

  const setPage = (page: number) => {
    currentPage.value = page
    fetchItems()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchItems()
  }

  const setSorting = (by: string, order: 'asc' | 'desc') => {
    sortBy.value = by
    sortOrder.value = order
    fetchItems()
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentItem = () => {
    currentItem.value = null
  }

  return {
    // State
    items,
    currentItem,
    stats,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    filters,
    sortBy,
    sortOrder,

    // Computed
    paginatedItems,
    totalPages,
    hasItems,
    activeItems,
    inactiveItems,
    lowStockItems,

    // Actions
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
    fetchStats,
    searchItems,
    getItemsByGroup,
    getLowStockItems,
    setFilters,
    clearFilters,
    setPage,
    setItemsPerPage,
    setSorting,
    clearError,
    resetCurrentItem,
  }
})
