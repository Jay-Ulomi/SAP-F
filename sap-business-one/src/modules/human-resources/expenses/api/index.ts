import { api } from '@/shared/api/apiClient'
import type { 
  ExpenseReport, 
  ExpenseReportFormData, 
  ExpenseSearchParams,
  ExpenseReportSearchResponse,
  ExpenseStats
} from '../types'

const BASE_URL = '/hr/expenses'

export const expenseAPI = {
  // Get all expense reports with filtering and pagination
  async getExpenseReports(params?: ExpenseSearchParams): Promise<ExpenseReportSearchResponse> {
    return api.get<ExpenseReportSearchResponse>(`${BASE_URL}/reports`, { params })
  },

  // Get a single expense report by ID
  async getExpenseReport(id: string): Promise<ExpenseReport> {
    return api.get<ExpenseReport>(`${BASE_URL}/reports/${id}`)
  },

  // Create a new expense report
  async createExpenseReport(data: ExpenseReportFormData): Promise<ExpenseReport> {
    return api.post<ExpenseReport>(`${BASE_URL}/reports`, data)
  },

  // Update an expense report
  async updateExpenseReport(id: string, data: Partial<ExpenseReportFormData>): Promise<ExpenseReport> {
    return api.put<ExpenseReport>(`${BASE_URL}/reports/${id}`, data)
  },

  // Delete an expense report
  async deleteExpenseReport(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/reports/${id}`)
  },

  // Submit expense report for approval
  async submitExpenseReport(id: string): Promise<ExpenseReport> {
    return api.patch<ExpenseReport>(`${BASE_URL}/reports/${id}/submit`)
  },

  // Approve expense report
  async approveExpenseReport(id: string, approvedAmount?: number): Promise<ExpenseReport> {
    return api.patch<ExpenseReport>(`${BASE_URL}/reports/${id}/approve`, { approvedAmount })
  },

  // Reject expense report
  async rejectExpenseReport(id: string, reason: string): Promise<ExpenseReport> {
    return api.patch<ExpenseReport>(`${BASE_URL}/reports/${id}/reject`, { reason })
  },

  // Mark expense report as paid
  async markAsPaid(id: string): Promise<ExpenseReport> {
    return api.patch<ExpenseReport>(`${BASE_URL}/reports/${id}/pay`)
  },

  // Upload receipt for expense item
  async uploadReceipt(file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('receipt', file)
    return api.post<{ url: string }>(`${BASE_URL}/receipts/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  // Get expense statistics
  async getExpenseStats(): Promise<ExpenseStats> {
    return api.get<ExpenseStats>(`${BASE_URL}/stats`)
  },

  // Export expense reports
  async exportExpenseReports(params: ExpenseSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    return api.get<Blob>(`${BASE_URL}/reports/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
  }
}