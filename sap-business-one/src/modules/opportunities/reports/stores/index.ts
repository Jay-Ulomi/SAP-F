import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { reportsApi } from '../api'
import type {
  ReportConfig,
  ReportData,
  ReportFormData,
  ReportListFilters,
  ReportStats,
  ReportPagination,
} from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

export const useReportsStore = defineStore('reports', () => {
  const reports = ref<ReportConfig[]>([])
  const currentReport = ref<ReportConfig | null>(null)
  const currentReportData = ref<ReportData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ReportStats | null>(null)
  const pagination = ref<ReportPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ReportListFilters>({})

  const scheduledReports = computed(() => reports.value.filter((r) => r.isScheduled))
  const reportsByType = computed(() => {
    const grouped: Record<ReportType, ReportConfig[]> = {
      [ReportType.OPPORTUNITY_PERFORMANCE]: [],
      [ReportType.PIPELINE_ANALYSIS]: [],
      [ReportType.LEAD_CONVERSION]: [],
      [ReportType.SALES_FORECAST]: [],
      [ReportType.TEAM_PERFORMANCE]: [],
      [ReportType.STAGE_ANALYSIS]: [],
      [ReportType.WIN_LOSS_ANALYSIS]: [],
      [ReportType.REVENUE_TRACKING]: [],
    }
    reports.value.forEach((r) => grouped[r.type]?.push(r))
    return grouped
  })

  const loadReports = async (page = 1, limit = 10, newFilters?: ReportListFilters) => {
    try {
      loading.value = true
      error.value = null
      if (newFilters) filters.value = newFilters
      const res = await reportsApi.getReports(page, limit, filters.value)
      reports.value = res.reports
      pagination.value = res.pagination
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load reports'
    } finally {
      loading.value = false
    }
  }

  const loadReportById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      currentReport.value = await reportsApi.getReportById(id)
      return currentReport.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load report'
      return null
    } finally {
      loading.value = false
    }
  }

  const createReport = async (data: ReportFormData) => {
    try {
      loading.value = true
      error.value = null
      const errs = reportsApi.validateReport(data)
      if (errs.length) {
        error.value = errs.join(', ')
        return null
      }
      const report = await reportsApi.createReport(data)
      reports.value.unshift(report)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      return report
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create report'
      return null
    } finally {
      loading.value = false
    }
  }

  const updateReport = async (id: string, data: Partial<ReportFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updated = await reportsApi.updateReport(id, data)
      if (updated) {
        const idx = reports.value.findIndex((r) => r.id === id)
        if (idx !== -1) reports.value[idx] = updated
        if (currentReport.value?.id === id) currentReport.value = updated
      }
      return updated
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update report'
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteReport = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      const ok = await reportsApi.deleteReport(id)
      if (ok) {
        reports.value = reports.value.filter((r) => r.id !== id)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
        if (currentReport.value?.id === id) currentReport.value = null
      }
      return ok
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete report'
      return false
    } finally {
      loading.value = false
    }
  }

  const generateReport = async (configId: string) => {
    try {
      loading.value = true
      error.value = null
      currentReportData.value = await reportsApi.generateReport(configId)
      return currentReportData.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to generate report'
      return null
    } finally {
      loading.value = false
    }
  }

  const exportReport = async (reportId: string, format: ReportFormat) => {
    try {
      loading.value = true
      error.value = null
      const blob = await reportsApi.exportReport(reportId, format)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `report-${reportId}.${format.toLowerCase()}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)

      return true
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to export report'
      return false
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    try {
      loading.value = true
      error.value = null
      stats.value = await reportsApi.getReportStats()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load stats'
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: ReportListFilters) => {
    filters.value = newFilters
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const clearError = () => (error.value = null)

  const clearCurrentReportData = () => (currentReportData.value = null)

  return {
    reports,
    currentReport,
    currentReportData,
    loading,
    error,
    stats,
    pagination,
    filters,
    scheduledReports,
    reportsByType,
    loadReports,
    loadReportById,
    createReport,
    updateReport,
    deleteReport,
    generateReport,
    exportReport,
    loadStats,
    setFilters,
    setPage,
    clearError,
    clearCurrentReportData,
  }
})
