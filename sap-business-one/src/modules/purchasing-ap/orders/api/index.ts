import { apiClient } from '../../../../shared/api/apiClient'
import type {
  PurchaseOrder,
  PurchaseOrderFormData,
  PurchaseOrderResponse,
  PurchaseOrderListResponse,
  PurchaseOrderStatsResponse,
  PurchaseOrderFilters,
  PurchaseOrderValidationResult,
} from '../types'

const ORDERS_BASE_PATH = '/purchase-orders'

// Purchase Orders API
const purchaseOrdersApi = {
  // Get all orders with pagination and filters
  getOrders: async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseOrderFilters
  }): Promise<PurchaseOrderListResponse> => {
    const response = await apiClient.get(ORDERS_BASE_PATH, { params })
    return response.data
  },

  // Get single order by ID
  getOrder: async (id: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/${id}`)
    return response.data
  },

  // Create new order
  createOrder: async (data: PurchaseOrderFormData): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(ORDERS_BASE_PATH, data)
    return response.data
  },

  // Update existing order
  updateOrder: async (
    id: string,
    data: Partial<PurchaseOrderFormData>,
  ): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.put(`${ORDERS_BASE_PATH}/${id}`, data)
    return response.data
  },

  // Delete order
  deleteOrder: async (id: string): Promise<void> => {
    await apiClient.delete(`${ORDERS_BASE_PATH}/${id}`)
  },

  // Release order
  releaseOrder: async (id: string, releasedBy: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/release`, { releasedBy })
    return response.data
  },

  // Close order
  closeOrder: async (id: string, closedBy: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/close`, { closedBy })
    return response.data
  },

  // Cancel order
  cancelOrder: async (id: string, reason: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/cancel`, { reason })
    return response.data
  },

  // Put order on hold
  putOnHold: async (id: string, reason: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/hold`, { reason })
    return response.data
  },

  // Resume order from hold
  resumeOrder: async (id: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/resume`)
    return response.data
  },

  // Copy order
  copyOrder: async (id: string, newDate?: string): Promise<PurchaseOrderResponse> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/${id}/copy`, { newDate })
    return response.data
  },

  // Print order
  printOrder: async (id: string, format: 'PDF' | 'HTML'): Promise<Blob> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/${id}/print`, {
      params: { format },
      responseType: 'blob',
    })
    return response.data
  },

  // Email order
  emailOrder: async (
    id: string,
    email: string,
    subject?: string,
    message?: string,
  ): Promise<void> => {
    await apiClient.post(`${ORDERS_BASE_PATH}/${id}/email`, {
      email,
      subject,
      message,
    })
  },

  // Get order statistics
  getOrderStats: async (filters?: PurchaseOrderFilters): Promise<PurchaseOrderStatsResponse> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/stats`, {
      params: filters,
    })
    return response.data
  },

  // Validate order data
  validateOrder: async (data: PurchaseOrderFormData): Promise<PurchaseOrderValidationResult> => {
    const response = await apiClient.post(`${ORDERS_BASE_PATH}/validate`, data)
    return response.data
  },

  // Get orders by status
  getOrdersByStatus: async (status: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/status/${status}`)
    return response.data
  },

  // Get orders by type
  getOrdersByType: async (type: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/type/${type}`)
    return response.data
  },

  // Get orders by priority
  getOrdersByPriority: async (priority: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/priority/${priority}`)
    return response.data
  },

  // Get orders by vendor
  getOrdersByVendor: async (vendorCode: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/vendor/${vendorCode}`)
    return response.data
  },

  // Get orders by department
  getOrdersByDepartment: async (department: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/department/${department}`)
    return response.data
  },

  // Get orders by cost center
  getOrdersByCostCenter: async (costCenter: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/cost-center/${costCenter}`)
    return response.data
  },

  // Get orders by project
  getOrdersByProject: async (projectCode: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/project/${projectCode}`)
    return response.data
  },

  // Get orders by date range
  getOrdersByDateRange: async (
    startDate: string,
    endDate: string,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/date-range`, {
      params: { startDate, endDate },
    })
    return response.data
  },

  // Get orders by amount range
  getOrdersByAmountRange: async (
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/amount-range`, {
      params: { minAmount, maxAmount },
    })
    return response.data
  },

  // Search orders
  searchOrders: async (searchTerm: string): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/search`, {
      params: { q: searchTerm },
    })
    return response.data
  },

  // Get orders by multiple filters
  getOrdersByFilters: async (filters: PurchaseOrderFilters): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/filter`, {
      params: filters,
    })
    return response.data
  },

  // Get draft orders
  getDraftOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/draft`)
    return response.data
  },

  // Get open orders
  getOpenOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/open`)
    return response.data
  },

  // Get released orders
  getReleasedOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/released`)
    return response.data
  },

  // Get partially received orders
  getPartiallyReceivedOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/partially-received`)
    return response.data
  },

  // Get fully received orders
  getFullyReceivedOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/fully-received`)
    return response.data
  },

  // Get closed orders
  getClosedOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/closed`)
    return response.data
  },

  // Get orders on hold
  getOrdersOnHold: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/on-hold`)
    return response.data
  },

  // Get cancelled orders
  getCancelledOrders: async (): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/cancelled`)
    return response.data
  },

  // Get orders by status and date range
  getOrdersByStatusAndDateRange: async (
    status: string,
    startDate: string,
    endDate: string,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/status-date-range`, {
      params: { status, startDate, endDate },
    })
    return response.data
  },

  // Get orders by priority and amount range
  getOrdersByPriorityAndAmountRange: async (
    priority: string,
    minAmount: number,
    maxAmount: number,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/priority-amount-range`, {
      params: { priority, minAmount, maxAmount },
    })
    return response.data
  },

  // Get orders by vendor and department
  getOrdersByVendorAndDepartment: async (
    vendorCode: string,
    department: string,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/vendor-department`, {
      params: { vendorCode, department },
    })
    return response.data
  },

  // Get orders by project and cost center
  getOrdersByProjectAndCostCenter: async (
    projectCode: string,
    costCenter: string,
  ): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/project-cost-center`, {
      params: { projectCode, costCenter },
    })
    return response.data
  },

  // Get orders by multiple criteria
  getOrdersByMultipleCriteria: async (criteria: {
    status?: string
    type?: string
    priority?: string
    vendorCode?: string
    department?: string
    costCenter?: string
    projectCode?: string
    startDate?: string
    endDate?: string
    minAmount?: number
    maxAmount?: number
  }): Promise<PurchaseOrderResponse[]> => {
    const response = await apiClient.get(`${ORDERS_BASE_PATH}/multiple-criteria`, {
      params: criteria,
    })
    return response.data
  },
}

export { purchaseOrdersApi }
