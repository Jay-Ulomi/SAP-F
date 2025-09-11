import { apiClient } from '../../../../shared/api/apiClient'
import type {
  FinancialReport,
  FinancialReportFormData,
  ReportSchedule,
  ReportScheduleFormData,
  ReportTemplate,
  ReportTemplateFormData,
  FinancialReportFilters,
  FinancialReportResponse,
  FinancialReportsResponse,
  ReportExecutionResponse,
  ReportDataResponse,
  ReportComparisonResponse,
  ReportExportResponse,
  FinancialReportValidationResult,
  FinancialReportStats,
  ReportComparison,
  ReportExport,
} from '../types'

const FINANCIAL_REPORTS_BASE_PATH = '/financial-reports'
const REPORT_SCHEDULES_BASE_PATH = '/report-schedules'
const REPORT_TEMPLATES_BASE_PATH = '/report-templates'
const REPORT_EXECUTIONS_BASE_PATH = '/report-executions'
const REPORT_DATA_BASE_PATH = '/report-data'
const REPORT_COMPARISONS_BASE_PATH = '/report-comparisons'
const REPORT_EXPORTS_BASE_PATH = '/report-exports'

// Financial Reports API
const financialReportsApi = {
  // Get all reports with pagination and filters
  getReports: async (params?: {
    page?: number
    limit?: number
    filters?: FinancialReportFilters
  }): Promise<FinancialReportsResponse> => {
    const response = await apiClient.get(FINANCIAL_REPORTS_BASE_PATH, { params })
    return response.data
  },

  // Get report by ID
  getReport: async (id: string): Promise<FinancialReportResponse> => {
    const response = await apiClient.get(`${FINANCIAL_REPORTS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new report
  createReport: async (data: FinancialReportFormData): Promise<FinancialReportResponse> => {
    const response = await apiClient.post(FINANCIAL_REPORTS_BASE_PATH, data)
    return response.data
  },

  // Update existing report
  updateReport: async (
    id: string,
    data: Partial<FinancialReportFormData>,
  ): Promise<FinancialReportResponse> => {
    const response = await apiClient.put(`${FINANCIAL_REPORTS_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete report
  deleteReport: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${FINANCIAL_REPORTS_BASE_PATH}/${id}`)
    return response.data
  },

  // Generate report
  generateReport: async (id: string, parameters?: any): Promise<ReportExecutionResponse> => {
    const response = await apiClient.post(
      `${FINANCIAL_REPORTS_BASE_PATH}/${id}/generate`,
      parameters,
    )
    return response.data
  },

  // Approve report
  approveReport: async (id: string, approvedBy: string): Promise<FinancialReportResponse> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/${id}/approve`, {
      approvedBy,
    })
    return response.data
  },

  // Publish report
  publishReport: async (id: string, publishedBy: string): Promise<FinancialReportResponse> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/${id}/publish`, {
      publishedBy,
    })
    return response.data
  },

  // Archive report
  archiveReport: async (id: string): Promise<FinancialReportResponse> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/${id}/archive`)
    return response.data
  },

  // Copy report
  copyReport: async (id: string, newName: string): Promise<FinancialReportResponse> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/${id}/copy`, { newName })
    return response.data
  },

  // Validate report configuration
  validateReport: async (
    data: FinancialReportFormData,
  ): Promise<FinancialReportValidationResult> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get report statistics
  getReportStats: async (): Promise<FinancialReportStats> => {
    const response = await apiClient.get(`${FINANCIAL_REPORTS_BASE_PATH}/stats`)
    return response.data
  },

  // Export report to different format
  exportReport: async (
    id: string,
    format: string,
    parameters?: any,
  ): Promise<ReportExportResponse> => {
    const response = await apiClient.post(`${FINANCIAL_REPORTS_BASE_PATH}/${id}/export`, {
      format,
      parameters,
    })
    return response.data
  },
}

// Report Schedules API
const reportSchedulesApi = {
  // Get all schedules
  getSchedules: async (params?: { page?: number; limit?: number }): Promise<any> => {
    const response = await apiClient.get(REPORT_SCHEDULES_BASE_PATH, { params })
    return response.data
  },

  // Get schedule by ID
  getSchedule: async (id: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_SCHEDULES_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new schedule
  createSchedule: async (data: ReportScheduleFormData): Promise<any> => {
    const response = await apiClient.post(REPORT_SCHEDULES_BASE_PATH, data)
    return response.data
  },

  // Update existing schedule
  updateSchedule: async (id: string, data: Partial<ReportScheduleFormData>): Promise<any> => {
    const response = await apiClient.put(`${REPORT_SCHEDULES_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete schedule
  deleteSchedule: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${REPORT_SCHEDULES_BASE_PATH}/${id}`)
    return response.data
  },

  // Activate/deactivate schedule
  toggleSchedule: async (id: string, isActive: boolean): Promise<any> => {
    const response = await apiClient.patch(`${REPORT_SCHEDULES_BASE_PATH}/${id}/toggle`, {
      isActive,
    })
    return response.data
  },

  // Get next run date
  getNextRunDate: async (id: string): Promise<{ nextRunDate: string }> => {
    const response = await apiClient.get(`${REPORT_SCHEDULES_BASE_PATH}/${id}/next-run`)
    return response.data
  },
}

// Report Templates API
const reportTemplatesApi = {
  // Get all templates
  getTemplates: async (params?: {
    page?: number
    limit?: number
    category?: string
  }): Promise<any> => {
    const response = await apiClient.get(REPORT_TEMPLATES_BASE_PATH, { params })
    return response.data
  },

  // Get template by ID
  getTemplate: async (id: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_TEMPLATES_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new template
  createTemplate: async (data: ReportTemplateFormData): Promise<any> => {
    const response = await apiClient.post(REPORT_TEMPLATES_BASE_PATH, data)
    return response.data
  },

  // Update existing template
  updateTemplate: async (id: string, data: Partial<ReportTemplateFormData>): Promise<any> => {
    const response = await apiClient.put(`${REPORT_TEMPLATES_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete template
  deleteTemplate: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${REPORT_TEMPLATES_BASE_PATH}/${id}`)
    return response.data
  },

  // Set as default template
  setDefaultTemplate: async (id: string, category: string): Promise<any> => {
    const response = await apiClient.post(`${REPORT_TEMPLATES_BASE_PATH}/${id}/set-default`, {
      category,
    })
    return response.data
  },

  // Copy template
  copyTemplate: async (id: string, newName: string): Promise<any> => {
    const response = await apiClient.post(`${REPORT_TEMPLATES_BASE_PATH}/${id}/copy`, { newName })
    return response.data
  },
}

// Report Executions API
const reportExecutionsApi = {
  // Get all executions
  getExecutions: async (params?: {
    page?: number
    limit?: number
    status?: string
  }): Promise<any> => {
    const response = await apiClient.get(REPORT_EXECUTIONS_BASE_PATH, { params })
    return response.data
  },

  // Get execution by ID
  getExecution: async (id: string): Promise<ReportExecutionResponse> => {
    const response = await apiClient.get(`${REPORT_EXECUTIONS_BASE_PATH}/${id}`)
    return response.data
  },

  // Cancel execution
  cancelExecution: async (id: string): Promise<any> => {
    const response = await apiClient.post(`${REPORT_EXECUTIONS_BASE_PATH}/${id}/cancel`)
    return response.data
  },

  // Get execution progress
  getExecutionProgress: async (id: string): Promise<{ progress: number; status: string }> => {
    const response = await apiClient.get(`${REPORT_EXECUTIONS_BASE_PATH}/${id}/progress`)
    return response.data
  },
}

// Report Data API
const reportDataApi = {
  // Get report data
  getReportData: async (reportId: string): Promise<ReportDataResponse> => {
    const response = await apiClient.get(`${REPORT_DATA_BASE_PATH}/${reportId}`)
    return response.data
  },

  // Get processed data
  getProcessedData: async (reportId: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_DATA_BASE_PATH}/${reportId}/processed`)
    return response.data
  },

  // Export data
  exportData: async (reportId: string, format: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_DATA_BASE_PATH}/${reportId}/export`, {
      params: { format },
    })
    return response.data
  },
}

// Report Comparisons API
const reportComparisonsApi = {
  // Get all comparisons
  getComparisons: async (params?: {
    page?: number
    limit?: number
  }): Promise<ReportComparisonResponse> => {
    const response = await apiClient.get(REPORT_COMPARISONS_BASE_PATH, { params })
    return response.data
  },

  // Get comparison by ID
  getComparison: async (id: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_COMPARISONS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new comparison
  createComparison: async (data: any): Promise<any> => {
    const response = await apiClient.post(REPORT_COMPARISONS_BASE_PATH, data)
    return response.data
  },

  // Delete comparison
  deleteComparison: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${REPORT_COMPARISONS_BASE_PATH}/${id}`)
    return response.data
  },
}

// Report Exports API
const reportExportsApi = {
  // Get all exports
  getExports: async (params?: {
    page?: number
    limit?: number
    format?: string
  }): Promise<ReportExportResponse> => {
    const response = await apiClient.get(REPORT_EXPORTS_BASE_PATH, { params })
    return response.data
  },

  // Get export by ID
  getExport: async (id: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_EXPORTS_BASE_PATH}/${id}`)
    return response.data
  },

  // Download export
  downloadExport: async (id: string): Promise<any> => {
    const response = await apiClient.get(`${REPORT_EXPORTS_BASE_PATH}/${id}/download`, {
      responseType: 'blob',
    })
    return response.data
  },

  // Delete export
  deleteExport: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${REPORT_EXPORTS_BASE_PATH}/${id}`)
    return response.data
  },
}

// Export all API services
export {
  financialReportsApi,
  reportSchedulesApi,
  reportTemplatesApi,
  reportExecutionsApi,
  reportDataApi,
  reportComparisonsApi,
  reportExportsApi,
}
