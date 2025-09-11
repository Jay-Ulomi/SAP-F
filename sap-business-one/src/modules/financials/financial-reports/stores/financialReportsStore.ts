import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  financialReportsApi,
  reportSchedulesApi,
  reportTemplatesApi,
  reportExecutionsApi,
  reportDataApi,
  reportComparisonsApi,
  reportExportsApi,
} from '../api/financialReportsApi'
import type {
  FinancialReport,
  FinancialReportFormData,
  ReportSchedule,
  ReportScheduleFormData,
  ReportTemplate,
  ReportTemplateFormData,
  FinancialReportFilters,
  FinancialReportStats,
  ReportExecution,
  ReportData,
  ReportComparison,
  ReportExport,
  ReportCategory,
  ReportStatus,
  ReportFormat,
  ReportPeriod,
} from '../types'
import { ReportCategory, ReportStatus, ReportFormat, ReportPeriod } from '../types'

export const useFinancialReportsStore = defineStore('financialReports', () => {
  // State
  const reports = ref<FinancialReport[]>([])
  const schedules = ref<ReportSchedule[]>([])
  const templates = ref<ReportTemplate[]>([])
  const executions = ref<ReportExecution[]>([])
  const reportData = ref<ReportData[]>([])
  const comparisons = ref<ReportComparison[]>([])
  const exports = ref<ReportExport[]>([])

  const currentReport = ref<FinancialReport | null>(null)
  const currentSchedule = ref<ReportSchedule | null>(null)
  const currentTemplate = ref<ReportTemplate | null>(null)
  const currentExecution = ref<ReportExecution | null>(null)

  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<FinancialReportStats | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<FinancialReportFilters>({
    category: undefined,
    status: undefined,
    format: undefined,
    period: undefined,
    fiscalYear: '',
    dateFrom: '',
    dateTo: '',
    createdBy: '',
    isRecurring: undefined,
  })

  // Computed Properties
  const reportsByCategory = computed(() => {
    return reports.value.reduce(
      (acc, report) => {
        acc[report.category] = (acc[report.category] || 0) + 1
        return acc
      },
      {} as Record<ReportCategory, number>,
    )
  })

  const reportsByStatus = computed(() => {
    return reports.value.reduce(
      (acc, report) => {
        acc[report.status] = (acc[report.status] || 0) + 1
        return acc
      },
      {} as Record<ReportStatus, number>,
    )
  })

  const reportsByPeriod = computed(() => {
    return reports.value.reduce(
      (acc, report) => {
        acc[report.period] = (acc[report.period] || 0) + 1
        return acc
      },
      {} as Record<ReportPeriod, number>,
    )
  })

  const activeReports = computed(() =>
    reports.value.filter((report) => report.status !== ReportStatus.ARCHIVED),
  )

  const draftReports = computed(() =>
    reports.value.filter((report) => report.status === ReportStatus.DRAFT),
  )

  const generatedReports = computed(() =>
    reports.value.filter((report) => report.status === ReportStatus.GENERATED),
  )

  const approvedReports = computed(() =>
    reports.value.filter((report) => report.status === ReportStatus.APPROVED),
  )

  const publishedReports = computed(() =>
    reports.value.filter((report) => report.status === ReportStatus.PUBLISHED),
  )

  const scheduledReports = computed(() => reports.value.filter((report) => report.isRecurring))

  const recentReports = computed(() =>
    reports.value
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 10),
  )

  const pendingExecutions = computed(() =>
    executions.value.filter((exec) => exec.status === 'PENDING' || exec.status === 'RUNNING'),
  )

  const completedExecutions = computed(() =>
    executions.value.filter((exec) => exec.status === 'COMPLETED'),
  )

  const failedExecutions = computed(() =>
    executions.value.filter((exec) => exec.status === 'FAILED'),
  )

  const defaultTemplates = computed(() => templates.value.filter((template) => template.isDefault))

  const publicTemplates = computed(() => templates.value.filter((template) => template.isPublic))

  // Actions - Financial Reports
  const loadReports = async (params?: {
    page?: number
    limit?: number
    filters?: FinancialReportFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.getReports(params)
      reports.value = response.data
      pagination.value = {
        page: response.page,
        limit: response.limit,
        total: response.total,
        hasMore: response.hasMore,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reports'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadReport = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.getReport(id)
      currentReport.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createReport = async (data: FinancialReportFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.createReport(data)
      reports.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateReport = async (id: string, data: Partial<FinancialReportFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.updateReport(id, data)
      const index = reports.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reports.value[index] = response.data
      }
      if (currentReport.value?.id === id) {
        currentReport.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteReport = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await financialReportsApi.deleteReport(id)
      reports.value = reports.value.filter((r) => r.id !== id)
      if (currentReport.value?.id === id) {
        currentReport.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const generateReport = async (id: string, parameters?: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.generateReport(id, parameters)
      executions.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveReport = async (id: string, approvedBy: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.approveReport(id, approvedBy)
      const index = reports.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reports.value[index] = response.data
      }
      if (currentReport.value?.id === id) {
        currentReport.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const publishReport = async (id: string, publishedBy: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.publishReport(id, publishedBy)
      const index = reports.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reports.value[index] = response.data
      }
      if (currentReport.value?.id === id) {
        currentReport.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to publish report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const archiveReport = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.archiveReport(id)
      const index = reports.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reports.value[index] = response.data
      }
      if (currentReport.value?.id === id) {
        currentReport.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to archive report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyReport = async (id: string, newName: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.copyReport(id, newName)
      reports.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy report'
      throw err
    } finally {
      loading.value = false
    }
  }

  const validateReport = async (data: FinancialReportFormData) => {
    try {
      error.value = null
      return await financialReportsApi.validateReport(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate report'
      throw err
    }
  }

  const loadReportStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.getReportStats()
      stats.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load report statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  const exportReport = async (id: string, format: string, parameters?: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await financialReportsApi.exportReport(id, format, parameters)
      exports.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to export report'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Report Schedules
  const loadSchedules = async (params?: { page?: number; limit?: number }) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportSchedulesApi.getSchedules(params)
      schedules.value = response.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load schedules'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createSchedule = async (data: ReportScheduleFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportSchedulesApi.createSchedule(data)
      schedules.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateSchedule = async (id: string, data: Partial<ReportScheduleFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportSchedulesApi.updateSchedule(id, data)
      const index = schedules.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        schedules.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteSchedule = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await reportSchedulesApi.deleteSchedule(id)
      schedules.value = schedules.value.filter((s) => s.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleSchedule = async (id: string, isActive: boolean) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportSchedulesApi.toggleSchedule(id, isActive)
      const index = schedules.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        schedules.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to toggle schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Report Templates
  const loadTemplates = async (params?: { page?: number; limit?: number; category?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportTemplatesApi.getTemplates(params)
      templates.value = response.data || []
    } catch (err) {
      loading.value = false
      error.value = err instanceof Error ? err.message : 'Failed to load templates'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createTemplate = async (data: ReportTemplateFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportTemplatesApi.createTemplate(data)
      templates.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create template'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateTemplate = async (id: string, data: Partial<ReportTemplateFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportTemplatesApi.updateTemplate(id, data)
      const index = templates.value.findIndex((t) => t.id === id)
      if (index !== -1) {
        templates.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update template'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteTemplate = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await reportTemplatesApi.deleteTemplate(id)
      templates.value = templates.value.filter((t) => t.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete template'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setDefaultTemplate = async (id: string, category: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportTemplatesApi.setDefaultTemplate(id, category)
      // Update all templates to remove default flag for this category
      templates.value.forEach((template) => {
        if (template.category === category) {
          template.isDefault = template.id === id
        }
      })
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to set default template'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Report Executions
  const loadExecutions = async (params?: { page?: number; limit?: number; status?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportExecutionsApi.getExecutions(params)
      executions.value = response.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load executions'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelExecution = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportExecutionsApi.cancelExecution(id)
      const index = executions.value.findIndex((e) => e.id === id)
      if (index !== -1) {
        executions.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel execution'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getExecutionProgress = async (id: string) => {
    try {
      return await reportExecutionsApi.getExecutionProgress(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to get execution progress'
      throw err
    }
  }

  // Actions - Report Data
  const loadReportData = async (reportId: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportDataApi.getReportData(reportId)
      const index = reportData.value.findIndex((d) => d.reportId === reportId)
      if (index !== -1) {
        reportData.value[index] = response.data
      } else {
        reportData.value.push(response.data)
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load report data'
      throw err
    } finally {
      loading.value = false
    }
  }

  const exportData = async (reportId: string, format: string) => {
    try {
      loading.value = true
      error.value = null

      return await reportDataApi.exportData(reportId, format)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to export data'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Report Comparisons
  const loadComparisons = async (params?: { page?: number; limit?: number }) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportComparisonsApi.getComparisons(params)
      comparisons.value = response.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load comparisons'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createComparison = async (data: any) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportComparisonsApi.createComparison(data)
      comparisons.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create comparison'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteComparison = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await reportComparisonsApi.deleteComparison(id)
      comparisons.value = comparisons.value.filter((c) => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete comparison'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Report Exports
  const loadExports = async (params?: { page?: number; limit?: number; format?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await reportExportsApi.getExports(params)
      exports.value = response.data || []
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load exports'
      throw err
    } finally {
      loading.value = false
    }
  }

  const downloadExport = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      return await reportExportsApi.downloadExport(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to download export'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExport = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await reportExportsApi.deleteExport(id)
      exports.value = exports.value.filter((e) => e.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete export'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility Actions
  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    reports.value = []
    schedules.value = []
    templates.value = []
    executions.value = []
    reportData.value = []
    comparisons.value = []
    exports.value = []
    currentReport.value = null
    currentSchedule.value = null
    currentTemplate.value = null
    currentExecution.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      hasMore: false,
    }
    filters.value = {
      category: undefined,
      status: undefined,
      format: undefined,
      period: undefined,
      fiscalYear: '',
      dateFrom: '',
      dateTo: '',
      createdBy: '',
      isRecurring: undefined,
    }
  }

  return {
    // State
    reports,
    schedules,
    templates,
    executions,
    reportData,
    comparisons,
    exports,
    currentReport,
    currentSchedule,
    currentTemplate,
    currentExecution,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    reportsByCategory,
    reportsByStatus,
    reportsByPeriod,
    activeReports,
    draftReports,
    generatedReports,
    approvedReports,
    publishedReports,
    scheduledReports,
    recentReports,
    pendingExecutions,
    completedExecutions,
    failedExecutions,
    defaultTemplates,
    publicTemplates,

    // Actions - Financial Reports
    loadReports,
    loadReport,
    createReport,
    updateReport,
    deleteReport,
    generateReport,
    approveReport,
    publishReport,
    archiveReport,
    copyReport,
    validateReport,
    loadReportStats,
    exportReport,

    // Actions - Report Schedules
    loadSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    toggleSchedule,

    // Actions - Report Templates
    loadTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    setDefaultTemplate,

    // Actions - Report Executions
    loadExecutions,
    cancelExecution,
    getExecutionProgress,

    // Actions - Report Data
    loadReportData,
    exportData,

    // Actions - Report Comparisons
    loadComparisons,
    createComparison,
    deleteComparison,

    // Actions - Report Exports
    loadExports,
    downloadExport,
    deleteExport,

    // Utility Actions
    clearError,
    resetState,
  }
})
