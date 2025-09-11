import { apiClient } from '../../../../shared/api/apiClient'
import type {
  CreditMemo,
  CreditMemoFormData,
  CreditMemoResponse,
  CreditMemoListResponse,
  CreditMemoStatsResponse,
  CreditMemoFilters,
  CreditMemoValidationResult,
  Customer,
} from '../types'

const CREDIT_MEMOS_BASE_PATH = '/credit-memos'
const CUSTOMERS_BASE_PATH = '/customers'

// Credit Memos API
const creditMemosApi = {
  // Get all credit memos with pagination and filters
  getCreditMemos: async (params?: {
    page?: number
    limit?: number
    filters?: CreditMemoFilters
  }): Promise<CreditMemoListResponse> => {
    const response = await apiClient.get(CREDIT_MEMOS_BASE_PATH, { params })
    return response.data
  },

  // Get single credit memo by ID
  getCreditMemo: async (id: string): Promise<CreditMemoResponse> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new credit memo
  createCreditMemo: async (data: CreditMemoFormData): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(CREDIT_MEMOS_BASE_PATH, data)
    return response.data
  },

  // Update existing credit memo
  updateCreditMemo: async (
    id: string,
    data: Partial<CreditMemoFormData>,
  ): Promise<CreditMemoResponse> => {
    const response = await apiClient.put(`${CREDIT_MEMOS_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete credit memo
  deleteCreditMemo: async (id: string): Promise<void> => {
    await apiClient.delete(`${CREDIT_MEMOS_BASE_PATH}/${id}`)
  },

  // Post credit memo (change from draft to open)
  postCreditMemo: async (id: string): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/post`)
    return response.data
  },

  // Cancel credit memo
  cancelCreditMemo: async (id: string, reason: string): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/cancel`, { reason })
    return response.data
  },

  // Copy credit memo
  copyCreditMemo: async (id: string, newDate?: string): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/copy`, { newDate })
    return response.data
  },

  // Print credit memo
  printCreditMemo: async (id: string, format: 'PDF' | 'HTML'): Promise<Blob> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Email credit memo
  emailCreditMemo: async (
    id: string,
    email: string,
    subject?: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/email`, {
      email,
      subject,
      message,
    })
  },

  // Get credit memo statistics
  getCreditMemoStats: async (filters?: CreditMemoFilters): Promise<CreditMemoStatsResponse> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/stats`, {
      params: filters,
    })
    return response.data
  },

  // Validate credit memo data
  validateCreditMemo: async (data: CreditMemoFormData): Promise<CreditMemoValidationResult> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get unapplied credit memos
  getUnappliedCreditMemos: async (params?: {
    page?: number
    limit?: number
    customerCode?: string
  }): Promise<CreditMemoListResponse> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/unapplied`, { params })
    return response.data
  },

  // Apply credit memo to invoice
  applyCreditMemo: async (
    id: string,
    invoiceId: string,
    amount: number,
    notes?: string,
  ): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/apply`, {
      invoiceId,
      amount,
      notes,
    })
    return response.data
  },

  // Unapply credit memo from invoice
  unapplyCreditMemo: async (
    id: string,
    applicationId: string,
    reason: string,
  ): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/${id}/unapply`, {
      applicationId,
      reason,
    })
    return response.data
  },

  // Get available invoices for application
  getAvailableInvoices: async (
    customerCode: string,
  ): Promise<{
    data: Array<{
      id: string
      docNum: string
      invoiceDate: string
      dueDate: string
      total: number
      balance: number
      currency: string
    }>
  }> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/available-invoices`, {
      params: { customerCode },
    })
    return response.data
  },

  // Create credit memo from invoice
  createFromInvoice: async (
    invoiceId: string,
    data: Partial<CreditMemoFormData>,
  ): Promise<CreditMemoResponse> => {
    const response = await apiClient.post(`${CREDIT_MEMOS_BASE_PATH}/from-invoice`, {
      invoiceId,
      ...data,
    })
    return response.data
  },

  // Export credit memos
  exportCreditMemos: async (
    filters?: CreditMemoFilters,
    format: 'CSV' | 'EXCEL' | 'PDF' = 'CSV',
  ): Promise<Blob> => {
    const response = await apiClient.get(`${CREDIT_MEMOS_BASE_PATH}/export`, {
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

export { creditMemosApi, customersApi, itemsApi, taxCodesApi }
