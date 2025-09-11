import { apiClient } from '../../../../shared/api/apiClient'
import type {
  IncomingPayment,
  IncomingPaymentFormData,
  IncomingPaymentResponse,
  IncomingPaymentListResponse,
  IncomingPaymentStatsResponse,
  IncomingPaymentFilters,
  IncomingPaymentValidationResult,
  Customer,
} from '../types'

const INCOMING_PAYMENTS_BASE_PATH = '/incoming-payments'

// Main Incoming Payments API
export const incomingPaymentsApi = {
  // CRUD Operations
  get: async (id: string): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.get(`${INCOMING_PAYMENTS_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (
    filters?: IncomingPaymentFilters,
    page = 1,
    limit = 20,
  ): Promise<IncomingPaymentListResponse> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.method?.length) params.append('method', filters.method.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await apiClient.get(`${INCOMING_PAYMENTS_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: IncomingPaymentFormData): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(INCOMING_PAYMENTS_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<IncomingPaymentFormData>): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.put(`${INCOMING_PAYMENTS_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${INCOMING_PAYMENTS_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  postPayment: async (
    id: string,
    postData: { postedBy: string; notes?: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/post`, postData)
    return response.data
  },

  cancelPayment: async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/cancel`, cancellationData)
    return response.data
  },

  closePayment: async (
    id: string,
    closeData?: { closedBy: string; notes?: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/close`, closeData)
    return response.data
  },

  copyPayment: async (
    id: string,
    copyData?: { newPaymentDate: string; newPostingDate: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  createFromInvoice: async (
    invoiceId: string,
    paymentData?: { paymentDate: string; postingDate: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(
      `${INCOMING_PAYMENTS_BASE_PATH}/from-invoice/${invoiceId}`,
      paymentData,
    )
    return response.data
  },

  // Additional Actions
  print: async (id: string, format?: string): Promise<{ success: boolean; data?: string; message?: string }> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/print`, { format })
    return response.data
  },

  email: async (
    id: string,
    emailData: { to: string; subject?: string; message?: string },
  ): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  getStats: async (): Promise<IncomingPaymentStatsResponse> => {
    const response = await apiClient.get(`${INCOMING_PAYMENTS_BASE_PATH}/stats`)
    return response.data
  },

  validate: async (data: IncomingPaymentFormData): Promise<IncomingPaymentValidationResult> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/validate`, data)
    return response.data
  },

  export: async (
    filters?: IncomingPaymentFilters,
    format: 'csv' | 'excel' | 'pdf' = 'excel',
  ): Promise<{ success: boolean; data?: string; message?: string }> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.method?.length) params.append('method', filters.method.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('format', format)

    const response = await apiClient.get(`${INCOMING_PAYMENTS_BASE_PATH}/export?${params.toString()}`)
    return response.data
  },

  // Payment Processing
  processPayment: async (
    id: string,
    processData: { processedBy: string; notes?: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/process`, processData)
    return response.data
  },

  reconcilePayment: async (
    id: string,
    reconcileData: { reconciledBy: string; bankStatementId?: string; notes?: string },
  ): Promise<IncomingPaymentResponse> => {
    const response = await apiClient.post(`${INCOMING_PAYMENTS_BASE_PATH}/${id}/reconcile`, reconcileData)
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
  list: async (search?: string): Promise<{ success: boolean; data: Array<{ id: string; docNum: string; customerName: string; openAmount: number }>; message?: string }> => {
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

export const salesOrdersApi = {
  list: async (search?: string): Promise<{ success: boolean; data: Array<{ id: string; docNum: string; customerName: string }>; message?: string }> => {
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
  incomingPaymentsApi,
  customersApi,
  invoicesApi,
  salesOrdersApi,
  returnsApi,
}
