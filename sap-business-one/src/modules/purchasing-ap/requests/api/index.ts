import { apiClient } from '../../../../shared/api/apiClient'
import type {
  PurchaseRequest,
  PurchaseRequestFormData,
  PurchaseRequestResponse,
  PurchaseRequestListResponse,
  PurchaseRequestStatsResponse,
  PurchaseRequestFilters,
  PurchaseRequestValidationResult,
} from '../types'

const REQUESTS_BASE_PATH = '/purchase-requests'

// Purchase Requests API
const purchaseRequestsApi = {
  // Get all requests with pagination and filters
  getRequests: async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseRequestFilters
  }): Promise<PurchaseRequestListResponse> => {
    const response = await apiClient.get(REQUESTS_BASE_PATH, { params })
    return response.data
  },

  // Get single request by ID
  getRequest: async (id: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new request
  createRequest: async (data: PurchaseRequestFormData): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(REQUESTS_BASE_PATH, data)
    return response.data
  },

  // Update existing request
  updateRequest: async (
    id: string,
    data: Partial<PurchaseRequestFormData>,
  ): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.put(`${REQUESTS_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete request
  deleteRequest: async (id: string): Promise<void> => {
    await apiClient.delete(`${REQUESTS_BASE_PATH}/${id}`)
  },

  // Submit request for approval
  submitRequest: async (id: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/submit`)
    return response.data
  },

  // Approve request
  approveRequest: async (
    id: string,
    approval: { approvedBy: string; notes?: string },
  ): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/approve`, approval)
    return response.data
  },

  // Reject request
  rejectRequest: async (
    id: string,
    rejection: { rejectedBy: string; reason: string },
  ): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/reject`, rejection)
    return response.data
  },

  // Convert request to purchase order
  convertToOrder: async (
    id: string,
    conversion: { orderNumber: string; convertedBy: string },
  ): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/convert`, conversion)
    return response.data
  },

  // Put request on hold
  putOnHold: async (id: string, reason: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/hold`, { reason })
    return response.data
  },

  // Resume request from hold
  resumeRequest: async (id: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/resume`)
    return response.data
  },

  // Cancel request
  cancelRequest: async (id: string, reason: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/cancel`, { reason })
    return response.data
  },

  // Copy request
  copyRequest: async (id: string, newDate?: string): Promise<PurchaseRequestResponse> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/copy`, { newDate })
    return response.data
  },

  // Print request
  printRequest: async (id: string, format: 'PDF' | 'HTML'): Promise<Blob> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Email request
  emailRequest: async (
    id: string,
    email: string,
    subject?: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(`${REQUESTS_BASE_PATH}/${id}/email`, {
      email,
      subject,
      message,
    })
  },

  // Get request statistics
  getRequestStats: async (filters?: PurchaseRequestFilters): Promise<PurchaseRequestStatsResponse> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/stats`, {
      params: filters,
    })
    return response.data
  },

  // Validate request data
  validateRequest: async (data: PurchaseRequestFormData): Promise<PurchaseRequestValidationResult> => {
    const response = await apiClient.post(`${REQUESTS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get requests by status
  getRequestsByStatus: async (status: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/status/${status}`)
    return response.data
  },

  // Get requests by type
  getRequestsByType: async (type: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/type/${type}`)
    return response.data
  },

  // Get requests by priority
  getRequestsByPriority: async (priority: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/priority/${priority}`)
    return response.data
  },

  // Get requests by department
  getRequestsByDepartment: async (department: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/department/${department}`)
    return response.data
  },

  // Get requests by cost center
  getRequestsByCostCenter: async (costCenter: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/cost-center/${costCenter}`)
    return response.data
  },

  // Get requests by project
  getRequestsByProject: async (projectCode: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/project/${projectCode}`)
    return response.data
  },

  // Get requests by requester
  getRequestsByRequester: async (requestedBy: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/requester/${requestedBy}`)
    return response.data
  },

  // Get requests by date range
  getRequestsByDateRange: async (
    startDate: string,
    endDate: string,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/date-range`, {
      params: { startDate, endDate },
    })
    return response.data
  },

  // Get requests by amount range
  getRequestsByAmountRange: async (
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/amount-range`, {
      params: { minAmount, maxAmount },
    })
    return response.data
  },

  // Search requests
  searchRequests: async (searchTerm: string): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/search`, {
      params: { q: searchTerm },
    })
    return response.data
  },

  // Get requests by multiple filters
  getRequestsByFilters: async (filters: PurchaseRequestFilters): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/filter`, {
      params: filters,
    })
    return response.data
  },

  // Get pending requests for approval
  getPendingApprovalRequests: async (): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/pending-approval`)
    return response.data
  },

  // Get approved requests
  getApprovedRequests: async (): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/approved`)
    return response.data
  },

  // Get converted requests
  getConvertedRequests: async (): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/converted`)
    return response.data
  },

  // Get requests on hold
  getRequestsOnHold: async (): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/on-hold`)
    return response.data
  },

  // Get cancelled requests
  getCancelledRequests: async (): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/cancelled`)
    return response.data
  },

  // Get requests by status and date range
  getRequestsByStatusAndDateRange: async (
    status: string,
    startDate: string,
    endDate: string,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/status-date-range`, {
      params: { status, startDate, endDate },
    })
    return response.data
  },

  // Get requests by priority and amount range
  getRequestsByPriorityAndAmountRange: async (
    priority: string,
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/priority-amount-range`, {
      params: { priority, minAmount, maxAmount },
    })
    return response.data
  },

  // Get requests by department and cost center
  getRequestsByDepartmentAndCostCenter: async (
    department: string,
    costCenter: string,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/department-cost-center`, {
      params: { department, costCenter },
    })
    return response.data
  },

  // Get requests by project and requester
  getRequestsByProjectAndRequester: async (
    projectCode: string,
    requestedBy: string,
  ): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/project-requester`, {
      params: { projectCode, requestedBy },
    })
    return response.data
  },

  // Get requests by multiple criteria
  getRequestsByMultipleCriteria: async (criteria: {
    status?: string
    type?: string
    priority?: string
    department?: string
    costCenter?: string
    projectCode?: string
    requestedBy?: string
    startDate?: string
    endDate?: string
    minAmount?: number
    maxAmount?: number
  }): Promise<PurchaseRequestResponse[]> => {
    const response = await apiClient.get(`${REQUESTS_BASE_PATH}/multiple-criteria`, {
      params: criteria,
    })
    return response.data
  },
}

export { purchaseRequestsApi }
