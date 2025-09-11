import { apiClient } from '../../../../shared/api/apiClient'
import type {
  ArInvoice,
  ArInvoiceFormData,
  ArInvoiceResponse,
  ArInvoiceListResponse,
  ArInvoiceStatsResponse,
  ArInvoiceFilters,
  ArInvoiceValidationResult,
  Customer,
} from '../types'

const AR_INVOICES_BASE_PATH = '/ar-invoices'
const CUSTOMERS_BASE_PATH = '/customers'

// A/R Invoices API
const arInvoicesApi = {
  // Get all invoices with pagination and filters
  getInvoices: async (params?: {
    page?: number
    limit?: number
    filters?: ArInvoiceFilters
  }): Promise<ArInvoiceListResponse> => {
    const response = await apiClient.get(AR_INVOICES_BASE_PATH, { params })
    return response.data
  },

  // Get single invoice by ID
  getInvoice: async (id: string): Promise<ArInvoiceResponse> => {
    const response = await apiClient.get(`${AR_INVOICES_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new invoice
  createInvoice: async (data: ArInvoiceFormData): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(AR_INVOICES_BASE_PATH, data)
    return response.data
  },

  // Update existing invoice
  updateInvoice: async (
    id: string,
    data: Partial<ArInvoiceFormData>,
  ): Promise<ArInvoiceResponse> => {
    const response = await apiClient.put(`${AR_INVOICES_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete invoice
  deleteInvoice: async (id: string): Promise<void> => {
    await apiClient.delete(`${AR_INVOICES_BASE_PATH}/${id}`)
  },

  // Post invoice (change from draft to open)
  postInvoice: async (id: string): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/post`)
    return response.data
  },

  // Cancel invoice
  cancelInvoice: async (id: string, reason: string): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/cancel`, { reason })
    return response.data
  },

  // Copy invoice
  copyInvoice: async (id: string, newDate?: string): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/copy`, { newDate })
    return response.data
  },

  // Print invoice
  printInvoice: async (id: string, format: 'PDF' | 'HTML'): Promise<Blob> => {
    const response = await apiClient.get(`${AR_INVOICES_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Email invoice
  emailInvoice: async (
    id: string,
    email: string,
    subject?: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/email`, {
      email,
      subject,
      message,
    })
  },

  // Get invoice statistics
  getInvoiceStats: async (filters?: ArInvoiceFilters): Promise<ArInvoiceStatsResponse> => {
    const response = await apiClient.get(`${AR_INVOICES_BASE_PATH}/stats`, {
      params: filters,
    })
    return response.data
  },

  // Validate invoice data
  validateInvoice: async (data: ArInvoiceFormData): Promise<ArInvoiceValidationResult> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get overdue invoices
  getOverdueInvoices: async (params?: {
    page?: number
    limit?: number
    daysPastDue?: number
  }): Promise<ArInvoiceListResponse> => {
    const response = await apiClient.get(`${AR_INVOICES_BASE_PATH}/overdue`, { params })
    return response.data
  },

  // Apply payment to invoice
  applyPayment: async (
    id: string,
    amount: number,
    paymentMethod: string,
    paymentDate: string,
    reference?: string,
  ): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/payment`, {
      amount,
      paymentMethod,
      paymentDate,
      reference,
    })
    return response.data
  },

  // Create recurring invoice schedule
  createRecurringSchedule: async (
    id: string,
    frequency: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY',
    endDate?: string,
    maxOccurrences?: number,
  ): Promise<ArInvoiceResponse> => {
    const response = await apiClient.post(`${AR_INVOICES_BASE_PATH}/${id}/recurring`, {
      frequency,
      endDate,
      maxOccurrences,
    })
    return response.data
  },

  // Export invoices
  exportInvoices: async (
    filters?: ArInvoiceFilters,
    format: 'CSV' | 'EXCEL' | 'PDF' = 'CSV',
  ): Promise<Blob> => {
    const response = await apiClient.get(`${AR_INVOICES_BASE_PATH}/export`, {
      params: { ...filters, format },
      responseType: 'blob',
    })
    return response.data
  },
}

// Customers API (for dropdowns and lookups)
const customersApi = {
  // Get all customers
  getCustomers: async (params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<{ data: Customer[]; total: number }> => {
    const response = await apiClient.get(CUSTOMERS_BASE_PATH, { params })
    return response.data
  },

  // Get customer by code
  getCustomer: async (code: string): Promise<{ data: Customer }> => {
    const response = await apiClient.get(`${CUSTOMERS_BASE_PATH}/${code}`)
    return response.data
  },

  // Search customers
  searchCustomers: async (query: string): Promise<{ data: Customer[] }> => {
    const response = await apiClient.get(`${CUSTOMERS_BASE_PATH}/search`, {
      params: { q: query },
    })
    return response.data
  },
}

// Items API (for line items)
const itemsApi = {
  // Search items
  searchItems: async (
    query: string,
  ): Promise<{
    data: Array<{
      id: string
      code: string
      description: string
      price: number
      taxCode: string
      unitOfMeasure: string
    }>
  }> => {
    const response = await apiClient.get('/items/search', {
      params: { q: query },
    })
    return response.data
  },

  // Get item details
  getItem: async (
    code: string,
  ): Promise<{
    data: {
      id: string
      code: string
      description: string
      price: number
      taxCode: string
      unitOfMeasure: string
      warehouseQuantities: Array<{
        warehouseCode: string
        quantity: number
      }>
    }
  }> => {
    const response = await apiClient.get(`/items/${code}`)
    return response.data
  },
}

// Tax Codes API
const taxCodesApi = {
  // Get all tax codes
  getTaxCodes: async (): Promise<{
    data: Array<{
      code: string
      name: string
      rate: number
      type: 'INPUT' | 'OUTPUT'
    }>
  }> => {
    const response = await apiClient.get('/tax-codes')
    return response.data
  },
}

export { arInvoicesApi, customersApi, itemsApi, taxCodesApi }
