import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  ProductionOrder, 
  ProductionOrderFormData, 
  ProductionOrderSearchParams,
  ProductionOrderStats 
} from '../types'
import { productionOrdersAPI } from '../api'

export const useProductionOrderStore = defineStore('productionOrder', () => {
  const orders = ref<ProductionOrder[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ProductionOrderStats | null>(null)
  const currentOrder = ref<ProductionOrder | null>(null)

  // Actions
  async function fetchOrders(params?: ProductionOrderSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await productionOrdersAPI.getOrders(params)
      orders.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch orders'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchOrder(id: string): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const order = await productionOrdersAPI.getOrder(id)
      currentOrder.value = order
      
      // Update the order in the list if it exists
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = order
      }
      
      return order
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch order'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<ProductionOrderStats> {
    try {
      const orderStats = await productionOrdersAPI.getOrderStats()
      stats.value = orderStats
      return orderStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function createOrder(data: ProductionOrderFormData): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const newOrder = await productionOrdersAPI.createOrder(data)
      orders.value.unshift(newOrder)
      return newOrder
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create order'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateOrder(id: string, data: Partial<ProductionOrderFormData>): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const updatedOrder = await productionOrdersAPI.updateOrder(id, data)
      
      // Update in the list
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = updatedOrder
      }
      
      // Update current order if it's the same
      if (currentOrder.value?.id === id) {
        currentOrder.value = updatedOrder
      }
      
      return updatedOrder
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update order'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteOrder(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await productionOrdersAPI.deleteOrder(id)
      
      // Remove from the list
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value.splice(index, 1)
      }
      
      // Clear current order if it's the deleted one
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

  // Production order specific actions
  async function releaseOrder(id: string): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const releasedOrder = await productionOrdersAPI.releaseOrder(id)
      
      // Update in the list
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = releasedOrder
      }
      
      // Update current order if it's the same
      if (currentOrder.value?.id === id) {
        currentOrder.value = releasedOrder
      }
      
      return releasedOrder
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to release order'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function startOrder(id: string): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const startedOrder = await productionOrdersAPI.startOrder(id)
      
      // Update in the list
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = startedOrder
      }
      
      // Update current order if it's the same
      if (currentOrder.value?.id === id) {
        currentOrder.value = startedOrder
      }
      
      return startedOrder
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start order'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function completeOrder(id: string): Promise<ProductionOrder> {
    loading.value = true
    error.value = null
    try {
      const completedOrder = await productionOrdersAPI.completeOrder(id)
      
      // Update in the list
      const index = orders.value.findIndex(o => o.id === id)
      if (index !== -1) {
        orders.value[index] = completedOrder
      }
      
      // Update current order if it's the same
      if (currentOrder.value?.id === id) {
        currentOrder.value = completedOrder
      }
      
      return completedOrder
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete order'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getOrderById(id: string): ProductionOrder | undefined {
    return orders.value.find(o => o.id === id)
  }

  function getOrdersByStatus(status: string): ProductionOrder[] {
    return orders.value.filter(o => o.status === status)
  }

  function getOrdersByPriority(priority: string): ProductionOrder[] {
    return orders.value.filter(o => o.priority === priority)
  }

  function getOrdersByItem(itemCode: string): ProductionOrder[] {
    return orders.value.filter(o => o.itemCode === itemCode)
  }

  function getOverdueOrders(): ProductionOrder[] {
    const now = new Date()
    return orders.value.filter(o => 
      new Date(o.dueDate) < now && 
      !['completed', 'cancelled'].includes(o.status)
    )
  }

  function getOrdersCompletionRate(): number {
    if (orders.value.length === 0) return 0
    const totalPlanned = orders.value.reduce((sum, o) => sum + o.plannedQuantity, 0)
    const totalCompleted = orders.value.reduce((sum, o) => sum + o.completedQuantity, 0)
    return totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 0
  }

  return {
    // State
    orders,
    loading,
    error,
    stats,
    currentOrder,
    
    // Actions
    fetchOrders,
    fetchOrder,
    fetchStats,
    createOrder,
    updateOrder,
    deleteOrder,
    releaseOrder,
    startOrder,
    completeOrder,
    
    // Getters
    getOrderById,
    getOrdersByStatus,
    getOrdersByPriority,
    getOrdersByItem,
    getOverdueOrders,
    getOrdersCompletionRate,
  }
})