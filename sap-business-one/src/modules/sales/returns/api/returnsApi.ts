import { apiClient } from '../../../../shared/api/apiClient'
import type {
  Return,
  ReturnFormData,
  ReturnResponse,
  ReturnListResponse,
  ReturnStatsResponse,
  ReturnFilters,
  ReturnValidationResult,
  Customer,
} from '../types'

const RETURNS_BASE_PATH = '/returns'

// Main Returns API
const returnsApi = {
  // CRUD Operations
  get: async (id: string): Promise<ReturnResponse> => {
    const response = await apiClient.get(`${RETURNS_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (filters?: ReturnFilters, page = 1, limit = 20): Promise<ReturnListResponse> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await apiClient.get(`${RETURNS_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: ReturnFormData): Promise<ReturnResponse> => {
    const response = await apiClient.post(RETURNS_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<ReturnFormData>): Promise<ReturnResponse> => {
    const response = await apiClient.put(`${RETURNS_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${RETURNS_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  approveReturn: async (
    id: string,
    approvalData: { approvedBy: string; notes?: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/approve`, approvalData)
    return response.data
  },

  rejectReturn: async (
    id: string,
    rejectionData: { rejectedBy: string; reason: string; notes?: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/reject`, rejectionData)
    return response.data
  },

  processReturn: async (
    id: string,
    processData: { processedBy: string; notes?: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/process`, processData)
    return response.data
  },

  cancelReturn: async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/cancel`, cancellationData)
    return response.data
  },

  closeReturn: async (
    id: string,
    closeData?: { closedBy: string; notes?: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/close`, closeData)
    return response.data
  },

  copyReturn: async (
    id: string,
    copyData?: { newReturnDate: string; newPostingDate: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  createFromInvoice: async (
    invoiceId: string,
    returnData?: { returnDate: string; postingDate: string },
  ): Promise<ReturnResponse> => {
    const response = await apiClient.post(
      `${RETURNS_BASE_PATH}/from-invoice/${invoiceId}`,
      returnData,
    )
    return response.data
  },

  // Additional Actions
  print: async (
    id: string,
    format?: string,
  ): Promise<{ success: boolean; data?: string; message?: string }> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/print`, { format })
    return response.data
  },

  email: async (
    id: string,
    emailData: { to: string; subject?: string; message?: string },
  ): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  getStats: async (): Promise<ReturnStatsResponse> => {
    const response = await apiClient.get(`${RETURNS_BASE_PATH}/stats`)
    return response.data
  },

  validate: async (data: ReturnFormData): Promise<ReturnValidationResult> => {
    const response = await apiClient.post(`${RETURNS_BASE_PATH}/validate`, data)
    return response.data
  },

  export: async (
    filters?: ReturnFilters,
    format: 'csv' | 'excel' | 'pdf' = 'excel',
  ): Promise<{ success: boolean; data?: string; message?: string }> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('format', format)

    const response = await apiClient.get(`${RETURNS_BASE_PATH}/export?${params.toString()}`)
    return response.data
  },
}

// Supporting APIs
const customersApi = {
  list: async (
    search?: string,
  ): Promise<{ success: boolean; data: Customer[]; message?: string }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/customers?${params.toString()}`)
    return response.data
  },

  get: async (code: string): Promise<{ success: boolean; data: Customer; message?: string }> => {
    const response = await apiClient.get(`/customers/${code}`)
    return response.data
  },
}

const itemsApi = {
  list: async (search?: string): Promise<Array<{ code: string; name: string; price: number }>> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/items?${params.toString()}`)
    return response.data.success ? response.data.data : []
  },

  get: async (code: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/items/${code}`)
    return response.data
  },
}

const taxCodesApi = {
  list: async (): Promise<{
    success: boolean
    data: Array<{ code: string; name: string; rate: number; type: string }>
    message?: string
  }> => {
    const response = await apiClient.get('/tax-codes')
    return response.data
  },

  get: async (code: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/tax-codes/${code}`)
    return response.data
  },
}

const invoicesApi = {
  list: async (
    search?: string,
  ): Promise<{
    success: boolean
    data: Array<{ id: string; docNum: string; customerName: string }>
    message?: string
  }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/ar-invoices?${params.toString()}`)
    return response.data
  },

  get: async (id: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/ar-invoices/${id}`)
    return response.data
  },
}

const salesOrdersApi = {
  list: async (
    search?: string,
  ): Promise<{
    success: boolean
    data: Array<{ id: string; docNum: string; customerName: string }>
    message?: string
  }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/sales-orders?${params.toString()}`)
    return response.data
  },

  get: async (id: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/sales-orders/${id}`)
    return response.data
  },
}

// Export all API services
export { returnsApi, customersApi, itemsApi, taxCodesApi, invoicesApi, salesOrdersApi }
