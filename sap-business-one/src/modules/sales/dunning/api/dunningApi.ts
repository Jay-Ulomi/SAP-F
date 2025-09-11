import { apiClient } from '../../../../shared/api/apiClient'
import type {
  Dunning,
  DunningFormData,
  DunningResponse,
  DunningListResponse,
  DunningStatsResponse,
  DunningFilters,
  DunningValidationResult,
  Customer,
} from '../types'

const DUNNING_BASE_PATH = '/dunning'

// Main Dunning API
export const dunningApi = {
  // CRUD Operations
  get: async (id: string): Promise<DunningResponse> => {
    const response = await apiClient.get(`${DUNNING_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (
    filters?: DunningFilters,
    page = 1,
    limit = 20,
  ): Promise<DunningListResponse> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.level?.length) params.append('level', filters.level.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await apiClient.get(`${DUNNING_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: DunningFormData): Promise<DunningResponse> => {
    const response = await apiClient.post(DUNNING_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<DunningFormData>): Promise<DunningResponse> => {
    const response = await apiClient.put(`${DUNNING_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${DUNNING_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  sendLetter: async (
    id: string,
    letterData: { sentBy: string; method: 'EMAIL' | 'POST' | 'FAX' | 'COURIER'; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/send-letter`, letterData)
    return response.data
  },

  acknowledge: async (
    id: string,
    acknowledgmentData: { acknowledgedBy: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/acknowledge`, acknowledgmentData)
    return response.data
  },

  escalate: async (
    id: string,
    escalationData: { escalatedBy: string; nextLevel: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/escalate`, escalationData)
    return response.data
  },

  cancel: async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/cancel`, cancellationData)
    return response.data
  },

  close: async (
    id: string,
    closeData?: { closedBy: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/close`, closeData)
    return response.data
  },

  copy: async (
    id: string,
    copyData?: { newDunningDate: string; newPostingDate: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  createFromOverdueInvoices: async (
    customerCode: string,
    dunningData?: { dunningDate: string; postingDate: string; level: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(
      `${DUNNING_BASE_PATH}/from-overdue-invoices/${customerCode}`,
      dunningData,
    )
    return response.data
  },

  // Additional Actions
  print: async (id: string, format?: string): Promise<{ success: boolean; data?: string; message?: string }> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/print`, { format })
    return response.data
  },

  email: async (
    id: string,
    emailData: { to: string; subject?: string; message?: string },
  ): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  getStats: async (): Promise<DunningStatsResponse> => {
    const response = await apiClient.get(`${DUNNING_BASE_PATH}/stats`)
    return response.data
  },

  validate: async (data: DunningFormData): Promise<DunningValidationResult> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/validate`, data)
    return response.data
  },

  export: async (
    filters?: DunningFilters,
    format: 'csv' | 'excel' | 'pdf' = 'excel',
  ): Promise<{ success: boolean; data?: string; message?: string }> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.level?.length) params.append('level', filters.level.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('format', format)

    const response = await apiClient.get(`${DUNNING_BASE_PATH}/export?${params.toString()}`)
    return response.data
  },

  // Dunning Processing
  processDunning: async (
    id: string,
    processData: { processedBy: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/process`, processData)
    return response.data
  },

  calculateFees: async (
    id: string,
    feeData: { calculatedBy: string; notes?: string },
  ): Promise<DunningResponse> => {
    const response = await apiClient.post(`${DUNNING_BASE_PATH}/${id}/calculate-fees`, feeData)
    return response.data
  },
}

// Supporting APIs
export const customersApi = {
  list: async (search?: string): Promise<{ success: boolean; data: Customer[]; message?: string }> => {
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

export const invoicesApi = {
  list: async (search?: string): Promise<{ success: boolean; data: Array<{ id: string; docNum: string; customerName: string; openAmount: number; dueDate: string }>; message?: string }> => {
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

export const paymentsApi = {
  list: async (search?: string): Promise<{ success: boolean; data: Array<{ id: string; docNum: string; customerName: string }>; message?: string }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/incoming-payments?${params.toString()}`)
    return response.data
  },

  get: async (id: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/incoming-payments/${id}`)
    return response.data
  },
}

export const returnsApi = {
  list: async (search?: string): Promise<{ success: boolean; data: Array<{ id: string; docNum: string; customerName: string }>; message?: string }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/returns?${params.toString()}`)
    return response.data
  },

  get: async (id: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/returns/${id}`)
    return response.data
  },
}

// Export all API services
export {
  dunningApi,
  customersApi,
  invoicesApi,
  paymentsApi,
  returnsApi,
}
