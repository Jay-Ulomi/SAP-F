import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { purchaseOrdersApi } from '../api'
import { PurchaseOrderStatus, PurchaseOrderType, OrderPriority } from '../types'
import type {
  PurchaseOrder,
  PurchaseOrderFormData,
  PurchaseOrderFilters,
  PurchaseOrderStatsResponse,
} from '../types'

export const usePurchaseOrdersStore = defineStore('purchaseOrders', () => {
  // State
  const orders = ref<PurchaseOrder[]>([])
  const currentOrder = ref<PurchaseOrder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PurchaseOrderStatsResponse | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<PurchaseOrderFilters>({
    status: undefined,
    type: undefined,
    priority: undefined,
    vendorCode: '',
    department: '',
    costCenter: '',
    projectCode: '',
    search: '',
    orderDateFrom: '',
    orderDateTo: '',
    deliveryDateFrom: '',
    deliveryDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const ordersByStatus = computed(() => {
    return orders.value.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<PurchaseOrderStatus, number>,
    )
  })

  const ordersByType = computed(() => {
    return orders.value.reduce(
      (acc, order) => {
        acc[order.type] = (acc[order.type] || 0) + 1
        return acc
      },
      {} as Record<PurchaseOrderType, number>,
    )
  })

  const ordersByPriority = computed(() => {
    return orders.value.reduce(
      (acc, order) => {
        acc[order.priority] = (acc[order.priority] || 0) + 1
        return acc
      },
      {} as Record<OrderPriority, number>,
    )
  })

  const draftOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.DRAFT),
  )

  const openOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.OPEN),
  )

  const releasedOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.RELEASED),
  )

  const partiallyReceivedOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.PARTIALLY_RECEIVED),
  )

  const fullyReceivedOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.FULLY_RECEIVED),
  )

  const closedOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.CLOSED),
  )

  const cancelledOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.CANCELLED),
  )

  const onHoldOrders = computed(() =>
    orders.value.filter((order) => order.status === PurchaseOrderStatus.ON_HOLD),
  )

  const totalAmount = computed(() =>
    orders.value.reduce((sum, order) => sum + order.totalAmount, 0),
  )

  const averageOrderValue = computed(() => {
    if (orders.value.length === 0) return 0
    return orders.value.reduce((sum, order) => sum + order.totalAmount, 0) / orders.value.length
  })

  // Actions - Core CRUD
  const loadOrders = async (params?: {
    page?: number
    limit?: number
    filters?: PurchaseOrderFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.getOrders(params)
      orders.value = response.data
      pagination.value = response.pagination
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load orders'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadOrder = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.getOrder(id)
      currentOrder.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createOrder = async (data: PurchaseOrderFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.createOrder(data)
      orders.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOrder = async (id: string, data: Partial<PurchaseOrderFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.updateOrder(id, data)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await purchaseOrdersApi.deleteOrder(id)
      orders.value = orders.value.filter((order) => order.id !== id)
      if (currentOrder.value?.id === id) {
        currentOrder.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete order'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const releaseOrder = async (id: string, releasedBy: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.releaseOrder(id, releasedBy)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to release order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const closeOrder = async (id: string, closedBy: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.closeOrder(id, closedBy)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelOrder = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.cancelOrder(id, reason)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const putOnHold = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.putOnHold(id, reason)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to put order on hold'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resumeOrder = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.resumeOrder(id)
      const index = orders.value.findIndex((order) => order.id === id)
      if (index !== -1) {
        orders.value[index] = response.data
      }
      if (currentOrder.value?.id === id) {
        currentOrder.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to resume order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyOrder = async (id: string, newDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.copyOrder(id, newDate)
      orders.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy order'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadOrderStats = async (filters?: PurchaseOrderFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await purchaseOrdersApi.getOrderStats(filters)
      stats.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load order statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const clearCurrentOrder = () => {
    currentOrder.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const setFilters = (newFilters: Partial<PurchaseOrderFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const resetFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      priority: undefined,
      vendorCode: '',
      department: '',
      costCenter: '',
      projectCode: '',
      search: '',
      orderDateFrom: '',
      orderDateTo: '',
      deliveryDateFrom: '',
      deliveryDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    orders,
    currentOrder,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    ordersByStatus,
    ordersByType,
    ordersByPriority,
    draftOrders,
    openOrders,
    releasedOrders,
    partiallyReceivedOrders,
    fullyReceivedOrders,
    closedOrders,
    cancelledOrders,
    onHoldOrders,
    totalAmount,
    averageOrderValue,

    // Actions
    loadOrders,
    loadOrder,
    createOrder,
    updateOrder,
    deleteOrder,
    releaseOrder,
    closeOrder,
    cancelOrder,
    putOnHold,
    resumeOrder,
    copyOrder,
    loadOrderStats,
    clearCurrentOrder,
    clearError,
    setFilters,
    resetFilters,
  }
})
