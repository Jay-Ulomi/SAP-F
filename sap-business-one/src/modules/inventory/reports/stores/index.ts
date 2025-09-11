import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { reportsApi } from '../api'
import type {
  InventoryReport,
  ReportFormData,
  ReportListParams,
  ReportListResponse,
  ReportStats,
  ReportFilters,
  ReportTemplate,
} from '../types'

export const useReportsStore = defineStore('inventoryReports', () => {
  // State
  const items = ref<InventoryReport[]>([])
  const currentItem = ref<InventoryReport | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ReportStats | null>(null)
  const templates = ref<ReportTemplate[]>([])

  // Pagination state
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalItems = ref(0)
  const totalPages = ref(0)

  // Filters state
  const filters = ref<ReportFilters>({})
  const sortBy = ref('createdDate')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Computed
  const hasItems = computed(() => items.value.length > 0)

  const paginatedItems = computed(() => items.value)

  // Actions
  const fetchReports = async (params: ReportListParams = {}) => {
    loading.value = true
    error.value = null

    try {
      const response: ReportListResponse = await reportsApi.getReports({
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
      error.value = err instanceof Error ? err.message : 'Failed to fetch reports'
      console.error('Error fetching reports:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchReport = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const item = await reportsApi.getReport(id)
      currentItem.value = item
      return item
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch report'
      console.error('Error fetching report:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createReport = async (data: ReportFormData) => {
    loading.value = true
    error.value = null

    try {
      const newItem = await reportsApi.createReport(data)
      items.value.unshift(newItem)
      totalItems.value += 1
      await fetchStats()
      return newItem
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create report'
      console.error('Error creating report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReport = async (id: string, data: Partial<ReportFormData>) => {
    loading.value = true
    error.value = null

    try {
      const updatedItem = await reportsApi.updateReport(id, data)
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
      error.value = err instanceof Error ? err.message : 'Failed to update report'
      console.error('Error updating report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteReport = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      await reportsApi.deleteReport(id)
      items.value = items.value.filter((item) => item.id !== id)
      totalItems.value -= 1
      if (currentItem.value?.id === id) {
        currentItem.value = null
      }
      await fetchStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete report'
      console.error('Error deleting report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const executeReport = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const execution = await reportsApi.executeReport(id)

      // Update the report status to running
      const index = items.value.findIndex((item) => item.id === id)
      if (index !== -1) {
        items.value[index] = {
          ...items.value[index],
          status: execution.status,
        }
      }
      if (currentItem.value?.id === id) {
        currentItem.value = {
          ...currentItem.value,
          status: execution.status,
        }
      }

      await fetchStats()
      return execution
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to execute report'
      console.error('Error executing report:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchTemplates = async () => {
    try {
      templates.value = await reportsApi.getReportTemplates()
    } catch (err) {
      console.error('Error fetching templates:', err)
    }
  }

  const fetchStats = async () => {
    try {
      stats.value = await reportsApi.getStats()
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    currentPage.value = page
    fetchReports()
  }

  const setItemsPerPage = (limit: number) => {
    itemsPerPage.value = limit
    currentPage.value = 1
    fetchReports()
  }

  // Filter actions
  const setFilters = (newFilters: Partial<ReportFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchReports()
  }

  const clearFilters = () => {
    filters.value = {}
    currentPage.value = 1
    fetchReports()
  }

  // Sort actions
  const setSorting = (field: string, order: 'asc' | 'desc') => {
    sortBy.value = field
    sortOrder.value = order
    fetchReports()
  }

  // Reset state
  const resetState = () => {
    items.value = []
    currentItem.value = null
    loading.value = false
    error.value = null
    stats.value = null
    templates.value = []
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
    templates,
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
    fetchReports,
    fetchReport,
    createReport,
    updateReport,
    deleteReport,
    executeReport,
    fetchTemplates,
    fetchStats,
    setPage,
    setItemsPerPage,
    setFilters,
    clearFilters,
    setSorting,
    resetState,
  }
})
