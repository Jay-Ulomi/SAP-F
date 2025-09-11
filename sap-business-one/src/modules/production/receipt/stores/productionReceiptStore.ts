import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  ProductionReceipt, 
  ProductionReceiptFormData, 
  ProductionReceiptSearchParams,
  ProductionReceiptStats
} from '../types'
import { QualityStatus } from '../types'
import { productionReceiptAPI } from '../api'

export const useProductionReceiptStore = defineStore('productionReceipt', () => {
  const receipts = ref<ProductionReceipt[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ProductionReceiptStats | null>(null)
  const currentReceipt = ref<ProductionReceipt | null>(null)

  // Actions
  async function fetchReceipts(params?: ProductionReceiptSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await productionReceiptAPI.getReceipts(params)
      receipts.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch receipts'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchReceipt(id: string): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const receipt = await productionReceiptAPI.getReceipt(id)
      currentReceipt.value = receipt
      
      // Update the receipt in the list if it exists
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = receipt
      }
      
      return receipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<ProductionReceiptStats> {
    try {
      const receiptStats = await productionReceiptAPI.getReceiptStats()
      stats.value = receiptStats
      return receiptStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function createReceipt(data: ProductionReceiptFormData): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const newReceipt = await productionReceiptAPI.createReceipt(data)
      receipts.value.unshift(newReceipt)
      return newReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateReceipt(id: string, data: Partial<ProductionReceiptFormData>): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const updatedReceipt = await productionReceiptAPI.updateReceipt(id, data)
      
      // Update in the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = updatedReceipt
      }
      
      // Update current receipt if it's the same
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = updatedReceipt
      }
      
      return updatedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteReceipt(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await productionReceiptAPI.deleteReceipt(id)
      
      // Remove from the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value.splice(index, 1)
      }
      
      // Clear current receipt if it's the deleted one
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Production receipt specific actions
  async function receiveItems(id: string, receivedQuantity: number): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const updatedReceipt = await productionReceiptAPI.receiveItems(id, receivedQuantity)
      
      // Update in the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = updatedReceipt
      }
      
      // Update current receipt if it's the same
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = updatedReceipt
      }
      
      return updatedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to receive items'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateQualityStatus(id: string, qualityStatus: QualityStatus): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const updatedReceipt = await productionReceiptAPI.updateQualityStatus(id, qualityStatus)
      
      // Update in the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = updatedReceipt
      }
      
      // Update current receipt if it's the same
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = updatedReceipt
      }
      
      return updatedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update quality status'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function closeReceipt(id: string): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const closedReceipt = await productionReceiptAPI.closeReceipt(id)
      
      // Update in the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = closedReceipt
      }
      
      // Update current receipt if it's the same
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = closedReceipt
      }
      
      return closedReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelReceipt(id: string): Promise<ProductionReceipt> {
    loading.value = true
    error.value = null
    try {
      const cancelledReceipt = await productionReceiptAPI.cancelReceipt(id)
      
      // Update in the list
      const index = receipts.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receipts.value[index] = cancelledReceipt
      }
      
      // Update current receipt if it's the same
      if (currentReceipt.value?.id === id) {
        currentReceipt.value = cancelledReceipt
      }
      
      return cancelledReceipt
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel receipt'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getReceiptById(id: string): ProductionReceipt | undefined {
    return receipts.value.find(r => r.id === id)
  }

  function getReceiptsByStatus(status: string): ProductionReceipt[] {
    return receipts.value.filter(r => r.status === status)
  }

  function getReceiptsByType(type: string): ProductionReceipt[] {
    return receipts.value.filter(r => r.type === type)
  }

  function getReceiptsByQualityStatus(qualityStatus: QualityStatus): ProductionReceipt[] {
    return receipts.value.filter(r => r.qualityStatus === qualityStatus)
  }

  function getReceiptsByProductionOrder(productionOrderId: string): ProductionReceipt[] {
    return receipts.value.filter(r => r.productionOrderId === productionOrderId)
  }

  function getOpenReceipts(): ProductionReceipt[] {
    return receipts.value.filter(r => ['open', 'partially_received'].includes(r.status))
  }

  function getPendingQualityReceipts(): ProductionReceipt[] {
    return receipts.value.filter(r => r.qualityStatus === 'pending')
  }

  function getCompletedReceipts(): ProductionReceipt[] {
    return receipts.value.filter(r => ['fully_received', 'closed'].includes(r.status))
  }

  function getTotalReceivedValue(): number {
    return receipts.value.reduce((sum, r) => sum + r.totalCost, 0)
  }

  function getAverageYield(): number {
    if (receipts.value.length === 0) return 0
    const totalYield = receipts.value.reduce((sum, r) => sum + r.yieldPercentage, 0)
    return Math.round(totalYield / receipts.value.length)
  }

  function getReceiptCompletionRate(): number {
    if (receipts.value.length === 0) return 0
    const totalPlanned = receipts.value.reduce((sum, r) => sum + r.plannedQuantity, 0)
    const totalReceived = receipts.value.reduce((sum, r) => sum + r.receivedQuantity, 0)
    return totalPlanned > 0 ? Math.round((totalReceived / totalPlanned) * 100) : 0
  }

  function getLowYieldReceipts(threshold: number = 85): ProductionReceipt[] {
    return receipts.value.filter(r => r.yieldPercentage < threshold && r.yieldPercentage > 0)
  }

  function getScrapReceipts(): ProductionReceipt[] {
    return receipts.value.filter(r => r.scrapQuantity && r.scrapQuantity > 0)
  }

  return {
    // State
    receipts,
    loading,
    error,
    stats,
    currentReceipt,
    
    // Actions
    fetchReceipts,
    fetchReceipt,
    fetchStats,
    createReceipt,
    updateReceipt,
    deleteReceipt,
    receiveItems,
    updateQualityStatus,
    closeReceipt,
    cancelReceipt,
    
    // Getters
    getReceiptById,
    getReceiptsByStatus,
    getReceiptsByType,
    getReceiptsByQualityStatus,
    getReceiptsByProductionOrder,
    getOpenReceipts,
    getPendingQualityReceipts,
    getCompletedReceipts,
    getTotalReceivedValue,
    getAverageYield,
    getReceiptCompletionRate,
    getLowYieldReceipts,
    getScrapReceipts,
  }
})