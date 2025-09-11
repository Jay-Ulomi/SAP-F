import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  ReportDashboard,
  DashboardWidget,
  DashboardFormData,
  WidgetFormData,
  DashboardSearchParams,
  DashboardStats,
  ReportMetrics,
  ChartData,
  DateRange,
  DashboardFilters,
  WidgetDataResponse
} from '../types'
import { dashboardApi, widgetApi, dashboardStatsApi, dataSourceApi } from '../api'

export const useDashboardStore = defineStore('dashboard', () => {
  // State
  const dashboards = ref<ReportDashboard[]>([])
  const currentDashboard = ref<ReportDashboard | null>(null)
  const dashboardStats = ref<DashboardStats | null>(null)
  const reportMetrics = ref<ReportMetrics | null>(null)
  const widgetData = ref<Record<string, any>>({})
  const loading = ref<Record<string, boolean>>({
    dashboards: false,
    currentDashboard: false,
    stats: false,
    metrics: false,
    widgets: false
  })
  const errors = ref<Record<string, string | null>>({
    dashboards: null,
    currentDashboard: null,
    stats: null,
    metrics: null,
    widgets: null
  })

  // Filters
  const globalFilters = ref<DashboardFilters>({
    dateRange: {
      from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      to: new Date().toISOString().split('T')[0],
      preset: 'LAST_30_DAYS'
    }
  })

  // Computed
  const defaultDashboard = computed(() => 
    dashboards.value.find(d => d.isDefault) || dashboards.value[0] || null
  )

  const activeDashboard = computed(() => currentDashboard.value || defaultDashboard.value)

  const dashboardCount = computed(() => dashboards.value.length)

  const isLoading = computed(() => Object.values(loading.value).some(Boolean))

  const hasErrors = computed(() => Object.values(errors.value).some(Boolean))

  // Actions
  const clearError = (key: string) => {
    errors.value[key] = null
  }

  const clearAllErrors = () => {
    Object.keys(errors.value).forEach(key => {
      errors.value[key] = null
    })
  }

  // Dashboard CRUD
  const fetchDashboards = async (params?: DashboardSearchParams) => {
    loading.value.dashboards = true
    errors.value.dashboards = null

    try {
      const response = await dashboardApi.getDashboards(params)
      if (response.success) {
        dashboards.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch dashboards')
      }
    } catch (error) {
      errors.value.dashboards = error instanceof Error ? error.message : 'Failed to fetch dashboards'
      console.error('Error fetching dashboards:', error)
    } finally {
      loading.value.dashboards = false
    }
  }

  const fetchDashboard = async (id: string) => {
    loading.value.currentDashboard = true
    errors.value.currentDashboard = null

    try {
      const response = await dashboardApi.getDashboard(id)
      if (response.success) {
        currentDashboard.value = response.data
        // Initialize widget data loading states
        response.data.widgets.forEach(widget => {
          loading.value[`widget_${widget.id}`] = false
        })
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard')
      }
    } catch (error) {
      errors.value.currentDashboard = error instanceof Error ? error.message : 'Failed to fetch dashboard'
      console.error('Error fetching dashboard:', error)
    } finally {
      loading.value.currentDashboard = false
    }
  }

  const createDashboard = async (data: DashboardFormData) => {
    loading.value.dashboards = true
    errors.value.dashboards = null

    try {
      const response = await dashboardApi.createDashboard(data)
      if (response.success) {
        dashboards.value.unshift(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Failed to create dashboard')
      }
    } catch (error) {
      errors.value.dashboards = error instanceof Error ? error.message : 'Failed to create dashboard'
      console.error('Error creating dashboard:', error)
      throw error
    } finally {
      loading.value.dashboards = false
    }
  }

  const updateDashboard = async (id: string, data: Partial<DashboardFormData>) => {
    loading.value.currentDashboard = true
    errors.value.currentDashboard = null

    try {
      const response = await dashboardApi.updateDashboard(id, data)
      if (response.success) {
        const index = dashboards.value.findIndex(d => d.id === id)
        if (index !== -1) {
          dashboards.value[index] = response.data
        }
        if (currentDashboard.value?.id === id) {
          currentDashboard.value = response.data
        }
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update dashboard')
      }
    } catch (error) {
      errors.value.currentDashboard = error instanceof Error ? error.message : 'Failed to update dashboard'
      console.error('Error updating dashboard:', error)
      throw error
    } finally {
      loading.value.currentDashboard = false
    }
  }

  const deleteDashboard = async (id: string) => {
    loading.value.dashboards = true
    errors.value.dashboards = null

    try {
      const response = await dashboardApi.deleteDashboard(id)
      if (response.success) {
        dashboards.value = dashboards.value.filter(d => d.id !== id)
        if (currentDashboard.value?.id === id) {
          currentDashboard.value = null
        }
      } else {
        throw new Error(response.message || 'Failed to delete dashboard')
      }
    } catch (error) {
      errors.value.dashboards = error instanceof Error ? error.message : 'Failed to delete dashboard'
      console.error('Error deleting dashboard:', error)
      throw error
    } finally {
      loading.value.dashboards = false
    }
  }

  const cloneDashboard = async (id: string, name: string) => {
    loading.value.dashboards = true
    errors.value.dashboards = null

    try {
      const response = await dashboardApi.cloneDashboard(id, name)
      if (response.success) {
        dashboards.value.unshift(response.data)
        return response.data
      } else {
        throw new Error(response.message || 'Failed to clone dashboard')
      }
    } catch (error) {
      errors.value.dashboards = error instanceof Error ? error.message : 'Failed to clone dashboard'
      console.error('Error cloning dashboard:', error)
      throw error
    } finally {
      loading.value.dashboards = false
    }
  }

  const setDefaultDashboard = async (id: string) => {
    try {
      const response = await dashboardApi.setDefaultDashboard(id)
      if (response.success) {
        // Update local state
        dashboards.value.forEach(d => {
          d.isDefault = d.id === id
        })
        return response.data
      } else {
        throw new Error(response.message || 'Failed to set default dashboard')
      }
    } catch (error) {
      console.error('Error setting default dashboard:', error)
      throw error
    }
  }

  // Widget Operations
  const addWidget = async (dashboardId: string, widget: WidgetFormData) => {
    loading.value.widgets = true
    errors.value.widgets = null

    try {
      const response = await widgetApi.addWidget(dashboardId, widget)
      if (response.success) {
        const index = dashboards.value.findIndex(d => d.id === dashboardId)
        if (index !== -1) {
          dashboards.value[index] = response.data
        }
        if (currentDashboard.value?.id === dashboardId) {
          currentDashboard.value = response.data
        }
        return response.data
      } else {
        throw new Error(response.message || 'Failed to add widget')
      }
    } catch (error) {
      errors.value.widgets = error instanceof Error ? error.message : 'Failed to add widget'
      console.error('Error adding widget:', error)
      throw error
    } finally {
      loading.value.widgets = false
    }
  }

  const updateWidget = async (dashboardId: string, widgetId: string, widget: Partial<WidgetFormData>) => {
    loading.value.widgets = true
    errors.value.widgets = null

    try {
      const response = await widgetApi.updateWidget(dashboardId, widgetId, widget)
      if (response.success) {
        const index = dashboards.value.findIndex(d => d.id === dashboardId)
        if (index !== -1) {
          dashboards.value[index] = response.data
        }
        if (currentDashboard.value?.id === dashboardId) {
          currentDashboard.value = response.data
        }
        return response.data
      } else {
        throw new Error(response.message || 'Failed to update widget')
      }
    } catch (error) {
      errors.value.widgets = error instanceof Error ? error.message : 'Failed to update widget'
      console.error('Error updating widget:', error)
      throw error
    } finally {
      loading.value.widgets = false
    }
  }

  const removeWidget = async (dashboardId: string, widgetId: string) => {
    loading.value.widgets = true
    errors.value.widgets = null

    try {
      const response = await widgetApi.removeWidget(dashboardId, widgetId)
      if (response.success) {
        const index = dashboards.value.findIndex(d => d.id === dashboardId)
        if (index !== -1) {
          dashboards.value[index] = response.data
        }
        if (currentDashboard.value?.id === dashboardId) {
          currentDashboard.value = response.data
        }
        // Clear widget data
        delete widgetData.value[widgetId]
        delete loading.value[`widget_${widgetId}`]
      } else {
        throw new Error(response.message || 'Failed to remove widget')
      }
    } catch (error) {
      errors.value.widgets = error instanceof Error ? error.message : 'Failed to remove widget'
      console.error('Error removing widget:', error)
      throw error
    } finally {
      loading.value.widgets = false
    }
  }

  const fetchWidgetData = async (dashboardId: string, widgetId: string, filters?: Record<string, any>) => {
    loading.value[`widget_${widgetId}`] = true
    errors.value[`widget_${widgetId}`] = null

    try {
      const response = await widgetApi.getWidgetData(dashboardId, widgetId, filters)
      if (response.success) {
        widgetData.value[widgetId] = response.data
        
        // Update widget in current dashboard
        if (currentDashboard.value) {
          const widget = currentDashboard.value.widgets.find(w => w.id === widgetId)
          if (widget) {
            widget.data = response.data
            widget.lastRefresh = new Date().toISOString()
            widget.error = undefined
          }
        }
        
        return response.data
      } else {
        throw new Error(response.message || 'Failed to fetch widget data')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch widget data'
      errors.value[`widget_${widgetId}`] = errorMessage
      
      // Update widget error in current dashboard
      if (currentDashboard.value) {
        const widget = currentDashboard.value.widgets.find(w => w.id === widgetId)
        if (widget) {
          widget.error = errorMessage
        }
      }
      
      console.error(`Error fetching data for widget ${widgetId}:`, error)
      throw error
    } finally {
      loading.value[`widget_${widgetId}`] = false
    }
  }

  const refreshWidget = async (dashboardId: string, widgetId: string) => {
    return await fetchWidgetData(dashboardId, widgetId)
  }

  const refreshAllWidgets = async () => {
    if (!currentDashboard.value) return

    const promises = currentDashboard.value.widgets.map(widget =>
      fetchWidgetData(currentDashboard.value!.id, widget.id)
        .catch(error => console.error(`Failed to refresh widget ${widget.id}:`, error))
    )

    await Promise.allSettled(promises)
  }

  // Statistics
  const fetchDashboardStats = async (dashboardId: string) => {
    loading.value.stats = true
    errors.value.stats = null

    try {
      const response = await dashboardStatsApi.getDashboardStats(dashboardId)
      if (response.success) {
        dashboardStats.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch dashboard stats')
      }
    } catch (error) {
      errors.value.stats = error instanceof Error ? error.message : 'Failed to fetch dashboard stats'
      console.error('Error fetching dashboard stats:', error)
    } finally {
      loading.value.stats = false
    }
  }

  const fetchReportMetrics = async (dateRange?: DateRange, filters?: Record<string, any>) => {
    loading.value.metrics = true
    errors.value.metrics = null

    try {
      const response = await dashboardStatsApi.getReportMetrics(dateRange, filters)
      if (response.success) {
        reportMetrics.value = response.data
      } else {
        throw new Error(response.message || 'Failed to fetch report metrics')
      }
    } catch (error) {
      errors.value.metrics = error instanceof Error ? error.message : 'Failed to fetch report metrics'
      console.error('Error fetching report metrics:', error)
    } finally {
      loading.value.metrics = false
    }
  }

  // Filters
  const updateGlobalFilters = (filters: Partial<DashboardFilters>) => {
    globalFilters.value = { ...globalFilters.value, ...filters }
    // Refresh all widgets with new filters
    if (currentDashboard.value) {
      refreshAllWidgets()
    }
  }

  const resetFilters = () => {
    globalFilters.value = {
      dateRange: {
        from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        to: new Date().toISOString().split('T')[0],
        preset: 'LAST_30_DAYS'
      }
    }
  }

  // Utility methods
  const getWidgetById = (widgetId: string): DashboardWidget | undefined => {
    return currentDashboard.value?.widgets.find(w => w.id === widgetId)
  }

  const isWidgetLoading = (widgetId: string): boolean => {
    return loading.value[`widget_${widgetId}`] || false
  }

  const getWidgetError = (widgetId: string): string | null => {
    return errors.value[`widget_${widgetId}`] || null
  }

  const getWidgetData = (widgetId: string): any => {
    return widgetData.value[widgetId]
  }

  // Reset store state
  const $reset = () => {
    dashboards.value = []
    currentDashboard.value = null
    dashboardStats.value = null
    reportMetrics.value = null
    widgetData.value = {}
    Object.keys(loading.value).forEach(key => {
      loading.value[key] = false
    })
    Object.keys(errors.value).forEach(key => {
      errors.value[key] = null
    })
    resetFilters()
  }

  return {
    // State
    dashboards,
    currentDashboard,
    dashboardStats,
    reportMetrics,
    widgetData,
    loading,
    errors,
    globalFilters,

    // Computed
    defaultDashboard,
    activeDashboard,
    dashboardCount,
    isLoading,
    hasErrors,

    // Actions
    clearError,
    clearAllErrors,
    fetchDashboards,
    fetchDashboard,
    createDashboard,
    updateDashboard,
    deleteDashboard,
    cloneDashboard,
    setDefaultDashboard,
    addWidget,
    updateWidget,
    removeWidget,
    fetchWidgetData,
    refreshWidget,
    refreshAllWidgets,
    fetchDashboardStats,
    fetchReportMetrics,
    updateGlobalFilters,
    resetFilters,
    getWidgetById,
    isWidgetLoading,
    getWidgetError,
    getWidgetData,
    $reset
  }
})