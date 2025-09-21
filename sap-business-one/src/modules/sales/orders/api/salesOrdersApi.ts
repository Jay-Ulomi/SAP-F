import { apiClient } from '../../../../shared/api/apiClient'
import type {
  SalesOrderFormData,
  SalesOrderResponse,
  SalesOrderListResponse,
  SalesOrderStatsResponse,
  SalesOrderFilters,
  SalesOrderValidationResult,
  Customer,
  FormType,
} from '../types'

const SALES_ORDERS_BASE_PATH = '/sales-orders'

// Main Sales Orders API
const salesOrdersApi = {
  // CRUD Operations
  get: async (id: string): Promise<SalesOrderResponse> => {
    const response = await apiClient.get(`${SALES_ORDERS_BASE_PATH}/${id}`)
    return response.data
  },

  list: async (
    filters?: SalesOrderFilters,
    page = 1,
    limit = 20,
  ): Promise<SalesOrderListResponse> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.formType?.length) params.append('formType', filters.formType.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    if (filters?.search) params.append('search', filters.search)
    params.append('page', page.toString())
    params.append('limit', limit.toString())

    const response = await apiClient.get(`${SALES_ORDERS_BASE_PATH}?${params.toString()}`)
    return response.data
  },

  create: async (data: SalesOrderFormData): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(SALES_ORDERS_BASE_PATH, data)
    return response.data
  },

  update: async (id: string, data: Partial<SalesOrderFormData>): Promise<SalesOrderResponse> => {
    const response = await apiClient.put(`${SALES_ORDERS_BASE_PATH}/${id}`, data)
    return response.data
  },

  delete: async (id: string): Promise<{ success: boolean; message?: string }> => {
    const response = await apiClient.delete(`${SALES_ORDERS_BASE_PATH}/${id}`)
    return response.data
  },

  // Business Actions
  releaseOrder: async (
    id: string,
    releaseData?: { releasedBy: string; notes?: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(`${SALES_ORDERS_BASE_PATH}/${id}/release`, releaseData)
    return response.data
  },

  cancelOrder: async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(
      `${SALES_ORDERS_BASE_PATH}/${id}/cancel`,
      cancellationData,
    )
    return response.data
  },

  closeOrder: async (
    id: string,
    closeData?: { closedBy: string; notes?: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(`${SALES_ORDERS_BASE_PATH}/${id}/close`, closeData)
    return response.data
  },

  copyOrder: async (
    id: string,
    copyData?: { newOrderDate: string; newDeliveryDate: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(`${SALES_ORDERS_BASE_PATH}/${id}/copy`, copyData)
    return response.data
  },

  createFromQuotation: async (
    quotationId: string,
    orderData?: { orderDate: string; deliveryDate: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(
      `${SALES_ORDERS_BASE_PATH}/from-quotation/${quotationId}`,
      orderData,
    )
    return response.data
  },

  printOrder: async (
    id: string,
    format: 'PDF' | 'HTML' = 'PDF',
  ): Promise<{ success: boolean; data: string; message?: string }> => {
    const response = await apiClient.get(`${SALES_ORDERS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return { success: true, data: URL.createObjectURL(response.data) }
  },

  emailOrder: async (
    id: string,
    emailData: { to: string; cc?: string; bcc?: string; subject?: string; message?: string },
  ): Promise<SalesOrderResponse> => {
    const response = await apiClient.post(`${SALES_ORDERS_BASE_PATH}/${id}/email`, emailData)
    return response.data
  },

  // Analytics & Reports
  getStats: async (): Promise<SalesOrderStatsResponse> => {
    const response = await apiClient.get(`${SALES_ORDERS_BASE_PATH}/stats`)
    return response.data
  },

  validateOrder: async (data: SalesOrderFormData): Promise<SalesOrderValidationResult> => {
    const response = await apiClient.post(`${SALES_ORDERS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Export
  exportOrders: async (
    filters?: SalesOrderFilters,
    format: 'CSV' | 'EXCEL' = 'CSV',
  ): Promise<{ success: boolean; data: string; message?: string }> => {
    const params = new URLSearchParams()
    if (filters?.status?.length) params.append('status', filters.status.join(','))
    if (filters?.type?.length) params.append('type', filters.type.join(','))
    if (filters?.formType?.length) params.append('formType', filters.formType.join(','))
    if (filters?.customerCode) params.append('customerCode', filters.customerCode)
    if (filters?.salesPerson) params.append('salesPerson', filters.salesPerson)
    if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom)
    if (filters?.dateTo) params.append('dateTo', filters.dateTo)
    params.append('format', format)

    const response = await apiClient.get(`${SALES_ORDERS_BASE_PATH}/export?${params.toString()}`, {
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

export { salesOrdersApi, customersApi, itemsApi, taxCodesApi }
