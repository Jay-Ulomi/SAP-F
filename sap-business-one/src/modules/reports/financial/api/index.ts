import type { FinancialReport, FinancialReportFormData, FinancialSearchParams } from '../types'

const API_BASE = '/api/financial-reports'

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export const financialReportsApi = {
  // Get all financial reports with pagination and filters
  async getReports(params?: FinancialSearchParams & { page?: number; limit?: number }): Promise<PaginatedResponse<FinancialReport>> {
    const queryParams = new URLSearchParams()
    
    if (params?.search) queryParams.append('search', params.search)
    if (params?.reportType) queryParams.append('reportType', params.reportType)
    if (params?.dateFrom) queryParams.append('dateFrom', params.dateFrom)
    if (params?.dateTo) queryParams.append('dateTo', params.dateTo)
    if (params?.status) queryParams.append('status', params.status)
    if (params?.createdBy) queryParams.append('createdBy', params.createdBy)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    
    const response = await fetch(`${API_BASE}?${queryParams}`)
    if (!response.ok) {
      throw new Error('Failed to fetch reports')
    }
    
    return response.json()
  },

  // Get a single financial report by ID
  async getReport(id: string): Promise<FinancialReport> {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) {
      throw new Error('Failed to fetch report')
    }
    
    return response.json()
  },

  // Create a new financial report
  async createReport(data: FinancialReportFormData): Promise<FinancialReport> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error('Failed to create report')
    }
    
    return response.json()
  },

  // Update an existing financial report
  async updateReport(id: string, data: FinancialReportFormData): Promise<FinancialReport> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    if (!response.ok) {
      throw new Error('Failed to update report')
    }
    
    return response.json()
  },

  // Delete a financial report
  async deleteReport(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error('Failed to delete report')
    }
  },

  // Export a financial report
  async exportReport(id: string, format: 'pdf' | 'excel' | 'csv' = 'pdf'): Promise<Blob> {
    const response = await fetch(`${API_BASE}/${id}/export?format=${format}`)
    
    if (!response.ok) {
      throw new Error('Failed to export report')
    }
    
    return response.blob()
  },

  // Get financial statistics
  async getStats(): Promise<{
    totalRevenue: number
    totalExpenses: number
    netProfit: number
    activeReports: number
    totalAssets?: number
    totalLiabilities?: number
    totalEquity?: number
  }> {
    const response = await fetch(`${API_BASE}/stats`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch statistics')
    }
    
    return response.json()
  },

  // Get chart of accounts
  async getAccounts(): Promise<{
    code: string
    name: string
    category: string
    type: string
    balance: number
    active: boolean
  }[]> {
    const response = await fetch('/api/accounts')
    
    if (!response.ok) {
      throw new Error('Failed to fetch accounts')
    }
    
    return response.json()
  }
}