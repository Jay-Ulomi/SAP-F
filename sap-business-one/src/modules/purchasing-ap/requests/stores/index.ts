import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { purchaseRequestsApi } from '../api'
import { PurchaseRequestStatus, PurchaseRequestType, PurchaseRequestPriority } from '../types'
import type {
  PurchaseRequest,
  PurchaseRequestFormData,
  PurchaseRequestFilters,
  PurchaseRequestStatsResponse,
} from '../types'

export const usePurchaseRequestsStore = defineStore('purchaseRequests', () => {
  // State
  const requests = ref<PurchaseRequest[]>([])
  const currentRequest = ref<PurchaseRequest | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PurchaseRequestStatsResponse | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<PurchaseRequestFilters>({
    status: undefined,
    type: undefined,
    priority: undefined,
    department: '',
    costCenter: '',
    projectCode: '',
    requestedBy: '',
    search: '',
    requestDateFrom: '',
    requestDateTo: '',
    requiredDateFrom: '',
    requiredDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const requestsByStatus = computed(() => {
    return requests.value.reduce(
      (acc, request) => {
        acc[request.status] = (acc[request.status] || 0) + 1
        return acc
      },
      {} as Record<PurchaseRequestStatus, number>,
    )
  })

  const requestsByType = computed(() => {
    return requests.value.reduce(
      (acc, request) => {
        acc[request.type] = (acc[request.type] || 0) + 1
        return acc
      },
      {} as Record<PurchaseRequestType, number>,
    )
  })

  const requestsByPriority = computed(() => {
    return requests.value.reduce(
      (acc, request) => {
        acc[request.priority] = (acc[request.priority] || 0) + 1
        return acc
      },
      {} as Record<PurchaseRequestPriority, number>,
    )
  })

  const draftRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.DRAFT),
  )

  const pendingRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.PENDING),
  )

  const approvedRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.APPROVED),
  )

  const rejectedRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.REJECTED),
  )

  const convertedRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.CONVERTED),
  )

  const cancelledRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.CANCELLED),
  )

  const onHoldRequests = computed(() =>
    requests.value.filter((request) => request.status === PurchaseRequestStatus.ON_HOLD),
  )

  const totalAmount = computed(() =>
    requests.value.reduce((sum, request) => sum + request.totalAmount, 0),
  )

  const averageRequestValue = computed(() => {
    if (requests.value.length === 0) return 0
    return (
      requests.value.reduce((sum, request) => sum + request.totalAmount, 0) / requests.value.length
    )
  })

  // Actions - Core CRUD
  const loadRequests = async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseRequestFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.getRequests(params)
      requests.value = response.data
      pagination.value = response.pagination
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load requests'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadRequest = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.getRequest(id)
      currentRequest.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createRequest = async (data: PurchaseRequestFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.createRequest(data)
      requests.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRequest = async (id: string, data: Partial<PurchaseRequestFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.updateRequest(id, data)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteRequest = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await purchaseRequestsApi.deleteRequest(id)
      requests.value = requests.value.filter((request) => request.id !== id)
      if (currentRequest.value?.id === id) {
        currentRequest.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete request'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const submitRequest = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.submitRequest(id)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveRequest = async (id: string, approval: { approvedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.approveRequest(id, approval)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectRequest = async (id: string, rejection: { rejectedBy: string; reason: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.rejectRequest(id, rejection)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const convertToOrder = async (
    id: string,
    conversion: { orderNumber: string; convertedBy: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.convertToOrder(id, conversion)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to convert request to order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const putOnHold = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.putOnHold(id, reason)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to put request on hold'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resumeRequest = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.resumeRequest(id)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to resume request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelRequest = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.cancelRequest(id, reason)
      const index = requests.value.findIndex((request) => request.id === id)
      if (index !== -1) {
        requests.value[index] = response.data
      }
      if (currentRequest.value?.id === id) {
        currentRequest.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyRequest = async (id: string, newDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.copyRequest(id, newDate)
      requests.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy request'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadRequestStats = async (filters?: PurchaseRequestFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseRequestsApi.getRequestStats(filters)
      stats.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load request statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const clearCurrentRequest = () => {
    currentRequest.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const setFilters = (newFilters: Partial<PurchaseRequestFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      priority: undefined,
      department: '',
      costCenter: '',
      projectCode: '',
      requestedBy: '',
      search: '',
      requestDateFrom: '',
      requestDateTo: '',
      requiredDateFrom: '',
      requiredDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    requests,
    currentRequest,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    requestsByStatus,
    requestsByType,
    requestsByPriority,
    draftRequests,
    pendingRequests,
    approvedRequests,
    rejectedRequests,
    convertedRequests,
    cancelledRequests,
    onHoldRequests,
    totalAmount,
    averageRequestValue,

    // Actions
    loadRequests,
    loadRequest,
    createRequest,
    updateRequest,
    deleteRequest,
    submitRequest,
    approveRequest,
    rejectRequest,
    convertToOrder,
    putOnHold,
    resumeRequest,
    cancelRequest,
    copyRequest,
    loadRequestStats,
    clearCurrentRequest,
    clearError,
    setFilters,
    resetFilters,
  }
})
