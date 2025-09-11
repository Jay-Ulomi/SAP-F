import { apiClient } from '../../../../shared/api/apiClient'
import type {
  Delivery,
  DeliveryFormData,
  DeliveryResponse,
  DeliveryListResponse,
  DeliveryStatsResponse,
  DeliveryFilters,
  DeliveryValidationResult,
  Customer,
} from '../types'

const DELIVERIES_BASE_PATH = '/deliveries'

// Main Deliveries API
const deliveriesApi = {
  // CRUD Operations
  get: async (id: string): Promise<DeliveryResponse> => {
    const response = await apiClient.get(`${DELIVERIES_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (filters?: DeliveryFilters, page = 1, limit = 20): Promise<DeliveryListResponse> => {
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

    const response = await apiClient.get(`${DELIVERIES_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: DeliveryFormData): Promise<DeliveryResponse> => {
    const response = await apiClient.post(DELIVERIES_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<DeliveryFormData>): Promise<DeliveryResponse> => {
    const response = await apiClient.put(`${DELIVERIES_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${DELIVERIES_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  releaseDelivery: async (
    id: string,
    releaseData?: { releasedBy: string; notes?: string },
  ): Promise<DeliveryResponse> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/release`, releaseData)
    return response.data
  },

  cancelDelivery: async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ): Promise<DeliveryResponse> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/cancel`, cancellationData)
    return response.data
  },

  closeDelivery: async (
    id: string,
    closeData?: { closedBy: string; notes?: string },
  ): Promise<DeliveryResponse> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/close`, closeData)
    return response.data
  },

  copyDelivery: async (
    id: string,
    copyData?: { newDeliveryDate: string; newPostingDate: string },
  ): Promise<DeliveryResponse> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  createFromOrder: async (
    orderId: string,
    deliveryData?: { deliveryDate: string; postingDate: string },
  ): Promise<DeliveryResponse> => {
    const response = await apiClient.post(
      `${DELIVERIES_BASE_PATH}/from-order/${orderId}`,
      deliveryData,
    )
    return response.data
  },

  // Additional Actions
  print: async (
    id: string,
    format?: string,
  ): Promise<{ success: boolean; data?: string; message?: string }> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/print`, { format })
    return response.data
  },

  email: async (
    id: string,
    emailData: { to: string; subject?: string; message?: string },
  ): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  getStats: async (): Promise<DeliveryStatsResponse> => {
    const response = await apiClient.get(`${DELIVERIES_BASE_PATH}/stats`)
    return response.data
  },

  validate: async (data: DeliveryFormData): Promise<DeliveryValidationResult> => {
    const response = await apiClient.post(`${DELIVERIES_BASE_PATH}/validate`, data)
    return response.data
  },

  export: async (
    filters?: DeliveryFilters,
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

    const response = await apiClient.get(`${DELIVERIES_BASE_PATH}/export?${params.toString()}`)
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

const quotationsApi = {
  list: async (
    search?: string,
  ): Promise<{
    success: boolean
    data: Array<{ id: string; docNum: string; customerName: string }>
    message?: string
  }> => {
    const params = new URLSearchParams()
    if (search) params.append('search', search)
    const response = await apiClient.get(`/quotations?${params.toString()}`)
    return response.data
  },

  get: async (id: string): Promise<{ success: boolean; data: any; message?: string }> => {
    const response = await apiClient.get(`/quotations/${id}`)
    return response.data
  },
}

// Export all API services
export { deliveriesApi, customersApi, itemsApi, taxCodesApi, salesOrdersApi, quotationsApi }
