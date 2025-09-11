import { apiClient } from '../../../../shared/api/apiClient'
import type {
  QuotationFormData,
  QuotationResponse,
  QuotationListResponse,
  QuotationStatsResponse,
  QuotationFilters,
  QuotationValidationResult,
  Customer,
} from '../types'

const QUOTATIONS_BASE_PATH = '/quotations'

// Main Quotations API
const quotationsApi = {
  // CRUD Operations
  get: async (id: string): Promise<QuotationResponse> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (
    filters?: QuotationFilters,
    page = 1,
    limit = 20,
  ): Promise<QuotationListResponse> => {
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

    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: QuotationFormData): Promise<QuotationResponse> => {
    const response = await apiClient.post(QUOTATIONS_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<QuotationFormData>): Promise<QuotationResponse> => {
    const response = await apiClient.put(`${QUOTATIONS_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${QUOTATIONS_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  sendQuotation: async (
    id: string,
    emailData?: { to: string; subject?: string; message?: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/send`, emailData)
    return response.data
  },

  acceptQuotation: async (
    id: string,
    acceptanceData?: { acceptedBy: string; notes?: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/accept`, acceptanceData)
    return response.data
  },

  rejectQuotation: async (
    id: string,
    rejectionData: { rejectedBy: string; reason: string; notes?: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/reject`, rejectionData)
    return response.data
  },

  convertToOrder: async (
    id: string,
    orderData?: { orderDate: string; deliveryDate?: string; remarks?: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(
      `${QUOTATIONS_BASE_PATH}/${id}/convert-to-order`,
      orderData,
    )
    return response.data
  },

  extendValidity: async (id: string, newValidUntil: string): Promise<QuotationResponse> => {
    const response = await apiClient.put(`${QUOTATIONS_BASE_PATH}/${id}/extend-validity`, {
      newValidUntil,
    })
    return response.data
  },

  copyQuotation: async (
    id: string,
    copyData?: { newQuotationDate: string; newValidUntil: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  printQuotation: async (
    id: string,
    format: 'PDF' | 'HTML' = 'PDF',
  ): Promise<{ success: boolean; data: string; message?: string }> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return { success: true, data: URL.createObjectURL(response.data) }
  },

  emailQuotation: async (
    id: string,
    emailData: { to: string; cc?: string; bcc?: string; subject?: string; message?: string },
  ): Promise<QuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  // Analytics & Reports
  getStats: async (): Promise<QuotationStatsResponse> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/stats`)
    return response.data
  },

  validateQuotation: async (data: QuotationFormData): Promise<QuotationValidationResult> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Export
  exportQuotations: async (
    filters?: QuotationFilters,
    format: 'CSV' | 'EXCEL' = 'CSV',
  ): Promise<{ success: boolean; data: string; message?: string }> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    params.append('format', format)

    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/export?${params.toString()}`, {
      responseType: 'blob',
    })
    return { success: true, data: URL.createObjectURL(response.data) }
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
  list: async (
    search?: string,
  ): Promise<{
    success: boolean
    data: Array<{
      itemCode: string
      description: string
      unitPrice: number
      taxCode: string
      taxRate: number
    }>
    message?: string
  }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)

    const response = await apiClient.get(`/items?${params.toString()}`)
    return response.data
  },

  get: async (
    itemCode: string,
  ): Promise<{
    success: boolean
    data: {
      itemCode: string
      description: string
      unitPrice: number
      taxCode: string
      taxRate: number
    }
    message?: string
  }> => {
    const response = await apiClient.get(`/items/${itemCode}`)
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
}

export { quotationsApi, customersApi, itemsApi, taxCodesApi }
