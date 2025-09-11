import { apiClient } from '../../../../shared/api/apiClient'
import type {
  SalesReport,
  SalesReportRequest,
  SalesReportResponse,
  SalesReportListResponse,
} from '../types'

const BASE_PATH = '/sales-reports'

// Main API service
const salesReportsApi = {
  // Get all sales reports
  async getSalesReports(params?: {
    page?: number
    limit?: number
    type?: string
    period?: string
    dateFrom?: string
    dateTo?: string
    search?: string
  }): Promise<SalesReportListResponse> {
    const response = await apiClient.get(BASE_PATH, { params })
    return response.data
  },

  // Get sales report by ID
  async getSalesReport(id: string): Promise<SalesReportResponse> {
    const response = await apiClient.get(`${BASE_PATH}/${id}`)
    return response.data
  },

  // Create new sales report
  async createSalesReport(data: SalesReportRequest): Promise<SalesReportResponse> {
    const response = await apiClient.post(BASE_PATH, data)
    return response.data
  },

  // Update sales report
  async updateSalesReport(
    id: string,
    data: Partial<SalesReportRequest>,
  ): Promise<SalesReportResponse> {
    const response = await apiClient.put(`${BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete sales report
  async deleteSalesReport(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`${BASE_PATH}/${id}`)
    return response.data
  },

  // Generate report
  async generateReport(data: SalesReportRequest): Promise<SalesReportResponse> {
    const response = await apiClient.post(`${BASE_PATH}/generate`, data)
    return response.data
  },

  // Download report
  async downloadReport(id: string, format: string): Promise<Blob> {
    const response = await apiClient.get(`${BASE_PATH}/${id}/download`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Get report status
  async getReportStatus(id: string): Promise<{ status: string; progress?: number }> {
    const response = await apiClient.get(`${BASE_PATH}/${id}/status`)
    return response.data
  },

  // Cancel report generation
  async cancelReportGeneration(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`${BASE_PATH}/${id}/cancel`)
    return response.data
  },

  // Schedule report
  async scheduleReport(
    data: SalesReportRequest & { schedule: string },
  ): Promise<SalesReportResponse> {
    const response = await apiClient.post(`${BASE_PATH}/schedule`, data)
    return response.data
  },

  // Get scheduled reports
  async getScheduledReports(): Promise<SalesReport[]> {
    const response = await apiClient.get(`${BASE_PATH}/scheduled`)
    return response.data
  },

  // Update report schedule
  async updateReportSchedule(
    id: string,
    schedule: string,
  ): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put(`${BASE_PATH}/${id}/schedule`, { schedule })
    return response.data
  },

  // Delete report schedule
  async deleteReportSchedule(id: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.delete(`${BASE_PATH}/${id}/schedule`)
    return response.data
  },

  // Get report templates
  async getReportTemplates(): Promise<
    Array<{
      id: string
      name: string
      type: string
      description: string
      parameters: Record<string, any>
    }>
  > {
    const response = await apiClient.get(`${BASE_PATH}/templates`)
    return response.data
  },

  // Save report as template
  async saveAsTemplate(id: string, name: string): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.post(`${BASE_PATH}/${id}/template`, { name })
    return response.data
  },

  // Get report history
  async getReportHistory(params?: {
    page?: number
    limit?: number
    type?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<SalesReportListResponse> {
    const response = await apiClient.get(`${BASE_PATH}/history`, { params })
    return response.data
  },

  // Export report data
  async exportReportData(id: string, format: string): Promise<Blob> {
    const response = await apiClient.get(`${BASE_PATH}/${id}/export`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Get report analytics
  async getReportAnalytics(params?: {
    type?: string
    period?: string
    dateFrom?: string
    dateTo?: string
  }): Promise<{
    totalReports: number
    totalGenerated: number
    averageGenerationTime: number
    popularTypes: Array<{ type: string; count: number }>
    recentActivity: Array<{ date: string; count: number }>
  }> {
    const response = await apiClient.get(`${BASE_PATH}/analytics`, { params })
    return response.data
  },
}

// Export all API services
export { salesReportsApi }
