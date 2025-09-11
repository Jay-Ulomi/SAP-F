import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  deliveriesApi,
  customersApi,
  itemsApi,
  taxCodesApi,
  salesOrdersApi,
  quotationsApi,
} from '../api/deliveriesApi'
import type {
  Delivery,
  DeliveryFormData,
  DeliveryFilters,
  DeliveryStatsResponse,
  Customer,
  DeliveryStatus,
  DeliveryType,
} from '../types'
import { DeliveryStatus, DeliveryType } from '../types'

export const useDeliveriesStore = defineStore('deliveries', () => {
  // State
  const deliveries = ref<Delivery[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentDelivery = ref<Delivery | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<DeliveryStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<DeliveryFilters>({
    status: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  })

  // Computed Properties
  const deliveriesByStatus = computed(() => {
    const grouped = deliveries.value.reduce(
      (acc, delivery) => {
        const status = delivery.status
        if (!acc[status]) acc[status] = []
        acc[status].push(delivery)
        return acc
      },
      {} as Record<DeliveryStatus, Delivery[]>,
    )

    return grouped
  })

  const deliveriesByType = computed(() => {
    const grouped = deliveries.value.reduce(
      (acc, delivery) => {
        const type = delivery.type
        if (!acc[type]) acc[type] = []
        acc[type].push(delivery)
        return acc
      },
      {} as Record<DeliveryType, Delivery[]>,
    )

    return grouped
  })

  const draftDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.DRAFT),
  )

  const openDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.OPEN),
  )

  const releasedDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.RELEASED),
  )

  const partiallyDeliveredDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.PARTIALLY_DELIVERED),
  )

  const fullyDeliveredDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.FULLY_DELIVERED),
  )

  const cancelledDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.CANCELLED),
  )

  const closedDeliveries = computed(() =>
    deliveries.value.filter((d) => d.status === DeliveryStatus.CLOSED),
  )

  const totalValue = computed(() => deliveries.value.reduce((sum, d) => sum + d.totalAmount, 0))

  const averageValue = computed(() =>
    deliveries.value.length > 0 ? totalValue.value / deliveries.value.length : 0,
  )

  const deliveryRate = computed(() => {
    if (releasedDeliveries.value.length === 0) return 0
    return (fullyDeliveredDeliveries.value.length / releasedDeliveries.value.length) * 100
  })

  // Actions
  const fetchDeliveries = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.list(filters.value, page, limit)

      if (response.success) {
        deliveries.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch deliveries'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchDelivery = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.get(id)

      if (response.success) {
        currentDelivery.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch delivery'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createDelivery = async (data: DeliveryFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.create(data)

      if (response.success) {
        deliveries.value.unshift(response.data)
        currentDelivery.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateDelivery = async (id: string, data: Partial<DeliveryFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.update(id, data)

      if (response.success) {
        const index = deliveries.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          deliveries.value[index] = response.data
        }
        if (currentDelivery.value?.id === id) {
          currentDelivery.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteDelivery = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.delete(id)

      if (response.success) {
        deliveries.value = deliveries.value.filter((d) => d.id !== id)
        if (currentDelivery.value?.id === id) {
          currentDelivery.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete delivery'
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

      const response = await deliveriesApi.getStats()

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
      return response
    } catch (err) {
      console.error('Failed to fetch items:', err)
      return []
    }
  }

  const fetchSalesOrders = async (search?: string) => {
    try {
      const response = await salesOrdersApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch sales orders:', err)
      return []
    }
  }

  const fetchQuotations = async (search?: string) => {
    try {
      const response = await quotationsApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch quotations:', err)
      return []
    }
  }

  const releaseDelivery = async (
    id: string,
    releaseData?: { releasedBy: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.releaseDelivery(id, releaseData)

      if (response.success) {
        // Update the delivery in the list
        const index = deliveries.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          deliveries.value[index] = response.data
        }
        if (currentDelivery.value?.id === id) {
          currentDelivery.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to release delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const cancelDelivery = async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.cancelDelivery(id, cancellationData)

      if (response.success) {
        // Update the delivery in the list
        const index = deliveries.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          deliveries.value[index] = response.data
        }
        if (currentDelivery.value?.id === id) {
          currentDelivery.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to cancel delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const closeDelivery = async (id: string, closeData?: { closedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.closeDelivery(id, closeData)

      if (response.success) {
        // Update the delivery in the list
        const index = deliveries.value.findIndex((d) => d.id === id)
        if (index !== -1) {
          deliveries.value[index] = response.data
        }
        if (currentDelivery.value?.id === id) {
          currentDelivery.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to close delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const copyDelivery = async (
    id: string,
    copyData?: { newDeliveryDate: string; newPostingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.copyDelivery(id, copyData)

      if (response.success) {
        deliveries.value.unshift(response.data)
        currentDelivery.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to copy delivery'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const createFromOrder = async (
    orderId: string,
    deliveryData?: { deliveryDate: string; postingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await deliveriesApi.createFromOrder(orderId, deliveryData)

      if (response.success) {
        deliveries.value.unshift(response.data)
        currentDelivery.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create delivery from order'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<DeliveryFilters>) => {
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
    }
    pagination.value.page = 1
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentDelivery = () => {
    currentDelivery.value = null
  }

  return {
    // State
    deliveries,
    customers,
    taxCodes,
    currentDelivery,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    deliveriesByStatus,
    deliveriesByType,
    draftDeliveries,
    openDeliveries,
    releasedDeliveries,
    partiallyDeliveredDeliveries,
    fullyDeliveredDeliveries,
    cancelledDeliveries,
    closedDeliveries,
    totalValue,
    averageValue,
    deliveryRate,

    // Actions
    fetchDeliveries,
    fetchDelivery,
    createDelivery,
    updateDelivery,
    deleteDelivery,
    fetchStats,
    fetchCustomers,
    fetchTaxCodes,
    fetchItems,
    fetchSalesOrders,
    fetchQuotations,
    releaseDelivery,
    cancelDelivery,
    closeDelivery,
    copyDelivery,
    createFromOrder,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentDelivery,
  }
})
