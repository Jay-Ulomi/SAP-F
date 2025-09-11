import { apiClient } from '../../../../shared/api/apiClient'
import type {
  PurchaseQuotation,
  PurchaseQuotationFormData,
  PurchaseQuotationResponse,
  PurchaseQuotationListResponse,
  PurchaseQuotationStatsResponse,
  PurchaseQuotationFilters,
  PurchaseQuotationValidationResult,
  Vendor,
} from '../types'

const QUOTATIONS_BASE_PATH = '/purchase-quotations'
const VENDORS_BASE_PATH = '/vendors'

// Purchase Quotations API
const purchaseQuotationsApi = {
  // Get all quotations with pagination and filters
  getQuotations: async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseQuotationFilters
  }): Promise<PurchaseQuotationListResponse> => {
    const response = await apiClient.get(QUOTATIONS_BASE_PATH, { params })
    return response.data
  },

  // Get single quotation by ID
  getQuotation: async (id: string): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new quotation
  createQuotation: async (data: PurchaseQuotationFormData): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(QUOTATIONS_BASE_PATH, data)
    return response.data
  },

  // Update existing quotation
  updateQuotation: async (
    id: string,
    data: Partial<PurchaseQuotationFormData>,
  ): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.put(`${QUOTATIONS_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete quotation
  deleteQuotation: async (id: string): Promise<void> => {
    await apiClient.delete(`${QUOTATIONS_BASE_PATH}/${id}`)
  },

  // Send quotation to vendor
  sendQuotation: async (id: string): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/send`)
    return response.data
  },

  // Evaluate quotation
  evaluateQuotation: async (
    id: string,
    evaluation: { approved: boolean; notes?: string; evaluatedBy: string },
  ): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/evaluate`, evaluation)
    return response.data
  },

  // Approve quotation
  approveQuotation: async (
    id: string,
    approval: { approvedBy: string; notes?: string },
  ): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/approve`, approval)
    return response.data
  },

  // Convert quotation to purchase order
  convertToOrder: async (
    id: string,
    conversion: { orderNumber: string; convertedBy: string },
  ): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/convert`, conversion)
    return response.data
  },

  // Copy quotation
  copyQuotation: async (id: string, newDate?: string): Promise<PurchaseQuotationResponse> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/copy`, { newDate })
    return response.data
  },

  // Print quotation
  printQuotation: async (id: string, format: 'PDF' | 'HTML'): Promise<Blob> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Email quotation
  emailQuotation: async (
    id: string,
    email: string,
    subject?: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(`${QUOTATIONS_BASE_PATH}/${id}/email`, {
      email,
      subject,
      message,
    })
  },

  // Get quotation statistics
  getQuotationStats: async (
    filters?: PurchaseQuotationFilters,
  ): Promise<PurchaseQuotationStatsResponse> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/stats`, {
      params: filters,
    })
    return response.data
  },

  // Validate quotation data
  validateQuotation: async (
    data: PurchaseQuotationFormData,
  ): Promise<PurchaseQuotationValidationResult> => {
    const response = await apiClient.post(`${QUOTATIONS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get quotations by vendor
  getQuotationsByVendor: async (vendorCode: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor/${vendorCode}`)
    return response.data
  },

  // Get quotations by project
  getQuotationsByProject: async (projectCode: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/project/${projectCode}`)
    return response.data
  },

  // Get quotations by department
  getQuotationsByDepartment: async (department: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/department/${department}`)
    return response.data
  },

  // Get quotations by cost center
  getQuotationsByCostCenter: async (costCenter: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/cost-center/${costCenter}`)
    return response.data
  },

  // Get quotations by type
  getQuotationsByType: async (type: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/type/${type}`)
    return response.data
  },

  // Get quotations by priority
  getQuotationsByPriority: async (priority: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/priority/${priority}`)
    return response.data
  },

  // Get quotations by status
  getQuotationsByStatus: async (status: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/status/${status}`)
    return response.data
  },

  // Get quotations by date range
  getQuotationsByDateRange: async (
    startDate: string,
    endDate: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/date-range`, {
      params: { startDate, endDate },
    })
    return response.data
  },

  // Get quotations by amount range
  getQuotationsByAmountRange: async (
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/amount-range`, {
      params: { minAmount, maxAmount },
    })
    return response.data
  },

  // Get quotations by currency
  getQuotationsByCurrency: async (currency: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/currency/${currency}`)
    return response.data
  },

  // Get quotations by search term
  searchQuotations: async (searchTerm: string): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/search`, {
      params: { q: searchTerm },
    })
    return response.data
  },

  // Get quotations by multiple filters
  getQuotationsByFilters: async (
    filters: PurchaseQuotationFilters,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/filter`, {
      params: filters,
    })
    return response.data
  },

  // Get quotations by vendor and date range
  getQuotationsByVendorAndDateRange: async (
    vendorCode: string,
    startDate: string,
    endDate: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-date-range`, {
      params: { vendorCode, startDate, endDate },
    })
    return response.data
  },

  // Get quotations by vendor and amount range
  getQuotationsByVendorAndAmountRange: async (
    vendorCode: string,
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-amount-range`, {
      params: { vendorCode, minAmount, maxAmount },
    })
    return response.data
  },

  // Get quotations by vendor and type
  getQuotationsByVendorAndType: async (
    vendorCode: string,
    type: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-type`, {
      params: { vendorCode, type },
    })
    return response.data
  },

  // Get quotations by vendor and priority
  getQuotationsByVendorAndPriority: async (
    vendorCode: string,
    priority: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-priority`, {
      params: { vendorCode, priority },
    })
    return response.data
  },

  // Get quotations by vendor and status
  getQuotationsByVendorAndStatus: async (
    vendorCode: string,
    status: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-status`, {
      params: { vendorCode, status },
    })
    return response.data
  },

  // Get quotations by vendor and currency
  getQuotationsByVendorAndCurrency: async (
    vendorCode: string,
    currency: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-currency`, {
      params: { vendorCode, currency },
    })
    return response.data
  },

  // Get quotations by vendor and project
  getQuotationsByVendorAndProject: async (
    vendorCode: string,
    projectCode: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-project`, {
      params: { vendorCode, projectCode },
    })
    return response.data
  },

  // Get quotations by vendor and cost center
  getQuotationsByVendorAndCostCenter: async (
    vendorCode: string,
    costCenter: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-cost-center`, {
      params: { vendorCode, costCenter },
    })
    return response.data
  },

  // Get quotations by vendor and department
  getQuotationsByVendorAndDepartment: async (
    vendorCode: string,
    department: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-department`, {
      params: { vendorCode, department },
    })
    return response.data
  },

  // Get quotations by vendor and search term
  getQuotationsByVendorAndSearch: async (
    vendorCode: string,
    searchTerm: string,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-search`, {
      params: { vendorCode, q: searchTerm },
    })
    return response.data
  },

  // Get quotations by vendor and multiple filters
  getQuotationsByVendorAndFilters: async (
    vendorCode: string,
    filters: PurchaseQuotationFilters,
  ): Promise<PurchaseQuotationResponse[]> => {
    const response = await apiClient.get(`${QUOTATIONS_BASE_PATH}/vendor-filters`, {
      params: { vendorCode, ...filters },
    })
    return response.data
  },
}

// Vendors API
const vendorsApi = {
  // Get all vendors with pagination and search
  getVendors: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await apiClient.get(VENDORS_BASE_PATH, { params })
    return response.data
  },

  // Get single vendor by code
  getVendor: async (code: string) => {
    const response = await apiClient.get(`${VENDORS_BASE_PATH}/${code}`)
    return response.data
  },

  // Search vendors
  searchVendors: async (searchTerm: string) => {
    const response = await apiClient.get(`${VENDORS_BASE_PATH}/search`, {
      params: { q: searchTerm },
    })
    return response.data
  },
}

export { purchaseQuotationsApi, vendorsApi }
