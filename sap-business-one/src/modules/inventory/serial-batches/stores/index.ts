import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serialBatchesApi } from '../api'
import type {
  SerialBatchItem,
  SerialBatchFormData,
  SerialBatchListParams,
  SerialBatchListResponse,
  SerialBatchStats,
  SerialBatchFilters,
} from '../types'

export const useSerialBatchesStore = defineStore('serialBatches', () => {
  const items = ref<SerialBatchItem[]>([])
  const currentItem = ref<SerialBatchItem | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<SerialBatchStats | null>(null)

  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  const filters = ref<SerialBatchFilters>({})
  const sortBy = ref('createdDate')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  const hasItems = computed(() => items.value.length > 0)
  const paginatedItems = computed(() => items.value)

  const fetchSerials = async (params: SerialBatchListParams = {}) => {
    loading.value = true
    error.value = null
    try {
      const response: SerialBatchListResponse = await serialBatchesApi.getSerials({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch serial/batches'
      console.error('Error fetching serial/batches:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchSerial = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const item = await serialBatchesApi.getSerial(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch serial/batch'
      console.error('Error fetching serial/batch:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createSerial = async (data: SerialBatchFormData) => {
    loading.value = true
    error.value = null
    try {
      const newItem = await serialBatchesApi.createSerial(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create serial/batch'
      console.error('Error creating serial/batch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSerial = async (id: string, data: Partial<SerialBatchFormData>) => {
    loading.value = true
    error.value = null
    try {
      const updated = await serialBatchesApi.updateSerial(id, data)
      const index = items.value.findIndex((i) => i.id === id)
      if (index !== -1) items.value[index] = updated
      if (currentItem.value?.id === id) currentItem.value = updated
      await fetchStats()
      return updated
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update serial/batch'
      console.error('Error updating serial/batch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSerial = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await serialBatchesApi.deleteSerial(id)
      items.value = items.value.filter((i) => i.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) currentItem.value = null
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete serial/batch'
      console.error('Error deleting serial/batch:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await serialBatchesApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const setPage = (page: number) => {
    currentPage.value = page
    fetchSerials()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchSerials()
  }

  const setFilters = (newFilters: Partial<SerialBatchFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchSerials()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchSerials()
  }

  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchSerials()
  }

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
    hasItems,
    paginatedItems,
    fetchSerials,
    fetchSerial,
    createSerial,
    updateSerial,
    deleteSerial,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
