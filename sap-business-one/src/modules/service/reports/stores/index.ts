import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceAPI } from '../../api'
import type {
  ServiceReport,
  ServiceReportFormData,
  ServiceReportSearchParams,
  ServiceReportStats,
  ServiceReportFilters,
  ServiceStats,
  ResponseTimeMetric,
} from '../types'
import { ReportType, ReportCategory, ReportStatus, ReportFormat, ReportFrequency } from '../types'

export const useServiceReportsStore = defineStore('serviceReports', () => {
  // State
  const reports = ref<ServiceReport[]>([])
  const currentReport = ref<ServiceReport | null>(null)
  const stats = ref<ServiceReportStats | null>(null)
  const serviceStats = ref<ServiceStats | null>(null)
  const responseMetrics = ref<ResponseTimeMetric | null>(null)
  const loading = ref(false)
  const metricsLoading = ref(false)
  const error = ref<string | null>(null)
  const metricsError = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ServiceReportFilters>({})

  // Computed properties
  const slaPerformanceStatus = computed(() => {
    if (!stats.value) return 'unknown'
    const slaPercentage = stats.value.slaPerformance
    if (slaPercentage >= 95) return 'excellent'
    if (slaPercentage >= 85) return 'good'
    if (slaPercentage >= 75) return 'fair'
    return 'poor'
  })

  const customerSatisfactionStatus = computed(() => {
    if (!stats.value) return 'unknown'
    const satisfaction = stats.value.customerSatisfaction
    if (satisfaction >= 4.5) return 'excellent'
    if (satisfaction >= 4.0) return 'good'
    if (satisfaction >= 3.5) return 'fair'
    return 'poor'
  })

  const monthlyTrends = computed(() => {
    if (!stats.value?.monthlyTrend) return []
    return stats.value.monthlyTrend.sort((a, b) => a.month.localeCompare(b.month))
  })

  const totalMonthlyRevenue = computed(() => {
    if (!stats.value?.monthlyTrend) return 0
    return stats.value.monthlyTrend.reduce((sum, trend) => sum + trend.revenue, 0)
  })

  const averageSLAPerformance = computed(() => {
    if (!serviceStats.value?.monthlyTrend || serviceStats.value.monthlyTrend.length === 0) return 0
    const totalSLA = serviceStats.value.monthlyTrend.reduce(
      (sum, trend) => sum + trend.slaPercentage,
      0,
    )
    return totalSLA / serviceStats.value.monthlyTrend.length
  })

  // Stats calculation for reports
  const calculateStats = () => {
    const reportsList = reports.value
    const totalReports = reportsList.length
    const activeReports = reportsList.filter((report) => report.status === 'completed').length
    const scheduledReports = reportsList.filter((report) => report.status === 'scheduled').length
    const completedReports = reportsList.filter((report) => report.status === 'completed').length
    const failedReports = reportsList.filter((report) => report.status === 'failed').length

    const totalRuns = reportsList.reduce((sum, report) => sum + report.totalRuns, 0)
    const averageRunTime = 0 // Would be calculated from actual execution data

    const reportsByType: Record<string, number> = {}
    const reportsByCategory: Record<string, number> = {}
    const reportsByStatus: Record<string, number> = {}
    const reportsByFormat: Record<string, number> = {}

    reportsList.forEach((report) => {
      reportsByType[report.type] = (reportsByType[report.type] || 0) + 1
      reportsByCategory[report.category] = (reportsByCategory[report.category] || 0) + 1
      reportsByStatus[report.status] = (reportsByStatus[report.status] || 0) + 1
      reportsByFormat[report.format] = (reportsByFormat[report.format] || 0) + 1
    })

    // Mock top users and recent activity
    const topUsers = [
      { userId: 'user1', userName: 'John Doe', count: 15 },
      { userId: 'user2', userName: 'Jane Smith', count: 12 },
      { userId: 'user3', userName: 'Mike Johnson', count: 8 },
    ]

    const recentActivity = reportsList.slice(0, 5).map((report) => ({
      id: report.id,
      reportName: report.name,
      action: 'created',
      timestamp: report.createdAt,
      user: report.createdBy,
    }))

    stats.value = {
      totalReports,
      activeReports,
      scheduledReports,
      completedReports,
      failedReports,
      totalRuns,
      averageRunTime,
      reportsByType,
      reportsByCategory,
      reportsByStatus,
      reportsByFormat,
      topUsers,
      recentActivity,
    }
  }

  // Actions
  const loadStats = async () => {
    try {
      loading.value = true
      error.value = null

      const serviceStats = await serviceAPI.getServiceStats()
      stats.value = serviceStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load service statistics'
      console.error('Error loading service statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const loadResponseMetrics = async (period: string = 'monthly') => {
    try {
      metricsLoading.value = true
      metricsError.value = null

      const metrics = await serviceAPI.getResponseTimeMetrics(period)
      responseMetrics.value = metrics
    } catch (err) {
      metricsError.value = err instanceof Error ? err.message : 'Failed to load response metrics'
      console.error('Error loading response metrics:', err)
    } finally {
      metricsLoading.value = false
    }
  }

  const exportServiceData = async (format: 'pdf' | 'excel' | 'csv' = 'excel') => {
    try {
      loading.value = true
      error.value = null

      const blob = await serviceAPI.exportServiceCalls({}, format)
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `service-report-${new Date().toISOString().split('T')[0]}.${format === 'excel' ? 'xlsx' : format}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to export service data'
      console.error('Error exporting service data:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const refreshData = async () => {
    await Promise.all([loadStats(), loadResponseMetrics()])
  }

  // Reports CRUD operations
  const fetchReports = async (params?: ServiceReportSearchParams) => {
    loading.value = true
    error.value = null
    try {
      // Mock API call - in real app, this would call the actual API
      const mockReports: ServiceReport[] = [
        {
          id: '1',
          name: 'Monthly Service Calls Report',
          description: 'Comprehensive report of all service calls for the month',
          type: ReportType.SERVICE_CALLS,
          category: ReportCategory.OPERATIONAL,
          status: ReportStatus.COMPLETED,
          format: ReportFormat.PDF,
          frequency: ReportFrequency.MONTHLY,
          parameters: {
            dateRange: {
              startDate: '2024-01-01',
              endDate: '2024-01-31',
            },
          },
          schedule: {
            frequency: ReportFrequency.MONTHLY,
            dayOfMonth: 1,
            time: '09:00',
            timezone: 'UTC',
            enabled: true,
          },
          filters: {},
          output: {
            fileName: 'service_calls_2024_01.pdf',
            fileSize: 1024000,
            filePath: '/reports/service_calls_2024_01.pdf',
            downloadUrl: '/api/reports/download/service_calls_2024_01.pdf',
            generatedAt: '2024-02-01T09:00:00Z',
            generatedBy: 'user1',
          },
          permissions: {
            view: ['user1', 'user2'],
            edit: ['user1'],
            delete: ['user1'],
            run: ['user1', 'user2'],
            schedule: ['user1'],
          },
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-02-01T09:00:00Z',
          createdBy: 'user1',
          lastRunAt: '2024-02-01T09:00:00Z',
          lastRunBy: 'user1',
          nextRunAt: '2024-03-01T09:00:00Z',
          totalRuns: 12,
          isPublic: false,
          tags: ['monthly', 'service-calls'],
        },
      ]

      reports.value = mockReports
      pagination.value = {
        page: 1,
        limit: 10,
        total: mockReports.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      }
      calculateStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch reports'
    } finally {
      loading.value = false
    }
  }

  const createReport = async (data: ServiceReportFormData) => {
    // Mock implementation
    console.log('Creating report:', data)
  }

  const updateReport = async (id: string, data: ServiceReportFormData) => {
    // Mock implementation
    console.log('Updating report:', id, data)
  }

  const deleteReport = async (id: string) => {
    // Mock implementation
    console.log('Deleting report:', id)
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  return {
    // State
    reports,
    currentReport,
    stats,
    serviceStats,
    responseMetrics,
    loading,
    metricsLoading,
    error,
    metricsError,
    pagination,
    filters,

    // Computed
    slaPerformanceStatus,
    customerSatisfactionStatus,
    monthlyTrends,
    totalMonthlyRevenue,
    averageSLAPerformance,

    // Actions
    loadStats,
    loadResponseMetrics,
    exportServiceData,
    refreshData,
    fetchReports,
    createReport,
    updateReport,
    deleteReport,
    setPage,
  }
})
