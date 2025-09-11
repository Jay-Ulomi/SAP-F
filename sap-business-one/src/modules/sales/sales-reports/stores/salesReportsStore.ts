import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { salesReportsApi } from '../api/salesReportsApi'
import type {
  SalesReport,
  SalesReportRequest,
  SalesReportResponse,
  SalesReportListResponse,
} from '../types'

export const useSalesReportsStore = defineStore('salesReports', () => {
  // State
  const reports = ref<SalesReport[]>([])
  const currentReport = ref<SalesReport | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination state
  const currentPage = ref(1)
  const pageSize = ref(20)
  const total = ref(0)
  const hasMore = ref(false)

  // Filters
  const filters = ref({
    type: '',
    period: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  })

  // Report generation state
  const generatingReports = ref<Set<string>>(new Set())
  const scheduledReports = ref<SalesReport[]>([])
  const reportTemplates = ref<
    Array<{
      id: string
      name: string
      type: string
      description: string
      parameters: Record<string, any>
    }>
  >([])

  // Analytics state
  const analytics = ref<{
    totalReports: number
    totalGenerated: number
    averageGenerationTime: number
    popularTypes: Array<{ type: string; count: number }>
    recentActivity: Array<{ date: string; count: number }>
  }>({
    totalReports: 0,
    totalGenerated: 0,
    averageGenerationTime: 0,
    popularTypes: [],
    recentActivity: [],
  })

  // Computed properties
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)
  const errorMessage = computed(() => error.value)

  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))
  const canLoadMore = computed(() => hasMore.value && !loading.value)

  const reportsByType = computed(() => {
    const grouped: Record<string, SalesReport[]> = {}
    reports.value.forEach((report) => {
      if (!grouped[report.type]) {
        grouped[report.type] = []
      }
      grouped[report.type].push(report)
    })
    return grouped
  })

  const recentReports = computed(() => {
    return [...reports.value]
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
      .slice(0, 5)
  })

  const pendingReports = computed(() => {
    return reports.value.filter(
      (report) => report.status === 'PENDING' || report.status === 'GENERATING',
    )
  })

  // Actions
  const setError = (message: string | null) => {
    error.value = message
  }

  const clearError = () => {
    error.value = null
  }

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }

  // Fetch reports
  const fetchReports = async (params?: { page?: number; limit?: number; reset?: boolean }) => {
    try {
      setLoading(true)
      clearError()

      const page = params?.page || currentPage.value
      const limit = params?.limit || pageSize.value

      const response = await salesReportsApi.getSalesReports({
        page,
        limit,
        ...filters.value,
      })

      if (params?.reset) {
        reports.value = response.data
      } else {
        reports.value = [...reports.value, ...response.data]
      }

      total.value = response.pagination.total
      hasMore.value = response.pagination.hasMore
      currentPage.value = page
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch reports'
      setError(errorMessage)
      console.error('Error fetching reports:', err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch single report
  const fetchReport = async (id: string) => {
    try {
      setLoading(true)
      clearError()

      const response = await salesReportsApi.getSalesReport(id)
      currentReport.value = response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch report'
      setError(errorMessage)
      console.error('Error fetching report:', err)
    } finally {
      setLoading(false)
    }
  }

  // Create report
  const createReport = async (data: SalesReportRequest) => {
    try {
      setLoading(true)
      clearError()

      const response = await salesReportsApi.createSalesReport(data)
      reports.value.unshift(response.data)
      total.value++

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create report'
      setError(errorMessage)
      console.error('Error creating report:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Update report
  const updateReport = async (id: string, data: Partial<SalesReportRequest>) => {
    try {
      setLoading(true)
      clearError()

      const response = await salesReportsApi.updateSalesReport(id, data)

      const index = reports.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reports.value[index] = response.data
      }

      if (currentReport.value?.id === id) {
        currentReport.value = response.data
      }

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update report'
      setError(errorMessage)
      console.error('Error updating report:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Delete report
  const deleteReport = async (id: string) => {
    try {
      setLoading(true)
      clearError()

      await salesReportsApi.deleteSalesReport(id)

      reports.value = reports.value.filter((r) => r.id !== id)
      total.value--

      if (currentReport.value?.id === id) {
        currentReport.value = null
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete report'
      setError(errorMessage)
      console.error('Error deleting report:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Generate report
  const generateReport = async (data: SalesReportRequest) => {
    try {
      setLoading(true)
      clearError()

      const response = await salesReportsApi.generateReport(data)
      const report = response.data

      // Add to reports list if it's new
      if (!reports.value.find((r) => r.id === report.id)) {
        reports.value.unshift(report)
        total.value++
      }

      // Track generation status
      generatingReports.value.add(report.id)

      return report
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate report'
      setError(errorMessage)
      console.error('Error generating report:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Download report
  const downloadReport = async (id: string, format: string) => {
    try {
      clearError()

      const blob = await salesReportsApi.downloadReport(id, format)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report-${id}.${format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to download report'
      setError(errorMessage)
      console.error('Error downloading report:', err)
      throw err
    }
  }

  // Get report status
  const getReportStatus = async (id: string) => {
    try {
      const status = await salesReportsApi.getReportStatus(id)

      // Update report status in local state
      const report = reports.value.find((r) => r.id === id)
      if (report) {
        report.status = status.status as 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
      }

      // Remove from generating set if completed
      if (status.status === 'COMPLETED' || status.status === 'FAILED') {
        generatingReports.value.delete(id)
      }

      return status
    } catch (err) {
      console.error('Error getting report status:', err)
      throw err
    }
  }

  // Cancel report generation
  const cancelReportGeneration = async (id: string) => {
    try {
      await salesReportsApi.cancelReportGeneration(id)
      generatingReports.value.delete(id)

      // Update report status
      const report = reports.value.find((r) => r.id === id)
      if (report) {
        report.status = 'CANCELLED'
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to cancel report'
      setError(errorMessage)
      console.error('Error cancelling report:', err)
      throw err
    }
  }

  // Schedule report
  const scheduleReport = async (data: SalesReportRequest & { schedule: string }) => {
    try {
      setLoading(true)
      clearError()

      const response = await salesReportsApi.scheduleReport(data)
      scheduledReports.value.push(response.data)

      return response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to schedule report'
      setError(errorMessage)
      console.error('Error scheduling report:', err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Fetch scheduled reports
  const fetchScheduledReports = async () => {
    try {
      const reports = await salesReportsApi.getScheduledReports()
      scheduledReports.value = reports
    } catch (err) {
      console.error('Error fetching scheduled reports:', err)
    }
  }

  // Fetch report templates
  const fetchReportTemplates = async () => {
    try {
      const templates = await salesReportsApi.getReportTemplates()
      reportTemplates.value = templates
    } catch (err) {
      console.error('Error fetching report templates:', err)
    }
  }

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const data = await salesReportsApi.getReportAnalytics()
      analytics.value = data
    } catch (err) {
      console.error('Error fetching analytics:', err)
    }
  }

  // Update filters
  const updateFilters = (newFilters: Partial<typeof filters.value>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1
    fetchReports({ page: 1, reset: true })
  }

  // Reset filters
  const resetFilters = () => {
    filters.value = {
      type: '',
      period: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    }
    currentPage.value = 1
    fetchReports({ page: 1, reset: true })
  }

  // Load more reports
  const loadMore = async () => {
    if (canLoadMore.value) {
      await fetchReports({ page: currentPage.value + 1 })
    }
  }

  // Refresh data
  const refresh = async () => {
    await fetchReports({ page: 1, reset: true })
    await fetchAnalytics()
  }

  return {
    // State
    reports,
    currentReport,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    hasMore,
    filters,
    generatingReports,
    scheduledReports,
    reportTemplates,
    analytics,

    // Computed
    isLoading,
    hasError,
    errorMessage,
    totalPages,
    canLoadMore,
    reportsByType,
    recentReports,
    pendingReports,

    // Actions
    setError,
    clearError,
    setLoading,
    fetchReports,
    fetchReport,
    createReport,
    updateReport,
    deleteReport,
    generateReport,
    downloadReport,
    getReportStatus,
    cancelReportGeneration,
    scheduleReport,
    fetchScheduledReports,
    fetchReportTemplates,
    fetchAnalytics,
    updateFilters,
    resetFilters,
    loadMore,
    refresh,
  }
})
