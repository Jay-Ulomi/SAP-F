import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { salesOrdersApi, customersApi, itemsApi, taxCodesApi } from '../api/salesOrdersApi'
import type {
  SalesOrder,
  SalesOrderFormData,
  SalesOrderFilters,
  SalesOrderStatsResponse,
  Customer,
  OrderStatus,
  OrderType,
  FormType,
} from '../types'
import { OrderStatus, OrderType, FormType } from '../types'

export const useSalesOrdersStore = defineStore('salesOrders', () => {
  // State
  const salesOrders = ref<SalesOrder[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentSalesOrder = ref<SalesOrder | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<SalesOrderStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<SalesOrderFilters>({
    status: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
    formType: [],
  })

  // Computed Properties
  const salesOrdersByStatus = computed(() => {
    const grouped = salesOrders.value.reduce(
      (acc, order) => {
        const status = order.status
        if (!acc[status]) acc[status] = []
        acc[status].push(order)
        return acc
      },
      {} as Record<OrderStatus, SalesOrder[]>,
    )

    return grouped
  })

  const salesOrdersByType = computed(() => {
    const grouped = salesOrders.value.reduce(
      (acc, order) => {
        const type = order.type
        if (!acc[type]) acc[type] = []
        acc[type].push(order)
        return acc
      },
      {} as Record<OrderType, SalesOrder[]>,
    )

    return grouped
  })

  const salesOrdersByFormType = computed(() => {
    const grouped = salesOrders.value.reduce(
      (acc, order) => {
        const formType = order.formType
        if (!acc[formType]) acc[formType] = []
        acc[formType].push(order)
        return acc
      },
      {} as Record<FormType, SalesOrder[]>,
    )

    return grouped
  })

  const itemOrders = computed(() =>
    salesOrders.value.filter((o) => o.formType === FormType.ITEM),
  )

  const serviceOrders = computed(() =>
    salesOrders.value.filter((o) => o.formType === FormType.SERVICE),
  )

  const draftOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.DRAFT),
  )

  const openOrders = computed(() => salesOrders.value.filter((o) => o.status === OrderStatus.OPEN))

  const releasedOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.RELEASED),
  )

  const partiallyDeliveredOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.PARTIALLY_DELIVERED),
  )

  const fullyDeliveredOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.FULLY_DELIVERED),
  )

  const cancelledOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.CANCELLED),
  )

  const closedOrders = computed(() =>
    salesOrders.value.filter((o) => o.status === OrderStatus.CLOSED),
  )

  const totalValue = computed(() => salesOrders.value.reduce((sum, o) => sum + o.totalAmount, 0))

  const averageValue = computed(() =>
    salesOrders.value.length > 0 ? totalValue.value / salesOrders.value.length : 0,
  )

  const deliveryRate = computed(() => {
    if (releasedOrders.value.length === 0) return 0
    return (fullyDeliveredOrders.value.length / releasedOrders.value.length) * 100
  })

  // Actions
  const fetchSalesOrders = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.list(filters.value, page, limit)

      if (response.success) {
        salesOrders.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch sales orders'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchSalesOrder = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.get(id)

      if (response.success) {
        currentSalesOrder.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch sales order'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createSalesOrder = async (data: SalesOrderFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.create(data)

      if (response.success) {
        salesOrders.value.unshift(response.data)
        currentSalesOrder.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create sales order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateSalesOrder = async (id: string, data: Partial<SalesOrderFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.update(id, data)

      if (response.success) {
        const index = salesOrders.value.findIndex((o) => o.id === id)
        if (index !== -1) {
          salesOrders.value[index] = response.data
        }
        if (currentSalesOrder.value?.id === id) {
          currentSalesOrder.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update sales order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteSalesOrder = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.delete(id)

      if (response.success) {
        salesOrders.value = salesOrders.value.filter((o) => o.id !== id)
        if (currentSalesOrder.value?.id === id) {
          currentSalesOrder.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete sales order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.getStats()

      if (response.success) {
        stats.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch stats'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchCustomers = async (search?: string) => {
    try {
      const response = await customersApi.list(search)
      if (response.success) {
        customers.value = response.data
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err)
    }
  }

  const fetchTaxCodes = async () => {
    try {
      const response = await taxCodesApi.list()
      if (response.success) {
        taxCodes.value = response.data
      }
    } catch (err) {
      console.error('Failed to fetch tax codes:', err)
    }
  }

  const fetchItems = async (search?: string) => {
    try {
      const response = await itemsApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch items:', err)
      return []
    }
  }

  const releaseOrder = async (id: string, releaseData?: { releasedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.releaseOrder(id, releaseData)

      if (response.success) {
        // Update the order in the list
        const index = salesOrders.value.findIndex((o) => o.id === id)
        if (index !== -1) {
          salesOrders.value[index] = response.data
        }
        if (currentSalesOrder.value?.id === id) {
          currentSalesOrder.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to release order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const cancelOrder = async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.cancelOrder(id, cancellationData)

      if (response.success) {
        // Update the order in the list
        const index = salesOrders.value.findIndex((o) => o.id === id)
        if (index !== -1) {
          salesOrders.value[index] = response.data
        }
        if (currentSalesOrder.value?.id === id) {
          currentSalesOrder.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to cancel order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const closeOrder = async (id: string, closeData?: { closedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await salesOrdersApi.closeOrder(id, closeData)

      if (response.success) {
        // Update the order in the list
        const index = salesOrders.value.findIndex((o) => o.id === id)
        if (index !== -1) {
          salesOrders.value[index] = response.data
        }
        if (currentSalesOrder.value?.id === id) {
          currentSalesOrder.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to close order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<SalesOrderFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: [],
      type: [],
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      search: '',
      formType: [],
    }
    pagination.value.page = 1
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentSalesOrder = () => {
    currentSalesOrder.value = null
  }

  return {
    // State
    salesOrders,
    customers,
    taxCodes,
    currentSalesOrder,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    salesOrdersByStatus,
    salesOrdersByType,
    salesOrdersByFormType,
    itemOrders,
    serviceOrders,
    draftOrders,
    openOrders,
    releasedOrders,
    partiallyDeliveredOrders,
    fullyDeliveredOrders,
    cancelledOrders,
    closedOrders,
    totalValue,
    averageValue,
    deliveryRate,

    // Actions
    fetchSalesOrders,
    fetchSalesOrder,
    createSalesOrder,
    updateSalesOrder,
    deleteSalesOrder,
    fetchStats,
    fetchCustomers,
    fetchTaxCodes,
    fetchItems,
    releaseOrder,
    cancelOrder,
    closeOrder,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentSalesOrder,
  }
})
