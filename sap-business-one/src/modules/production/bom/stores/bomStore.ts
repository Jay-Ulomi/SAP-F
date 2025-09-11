import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  BOM, 
  BOMFormData, 
  BOMSearchParams,
  BOMStats 
} from '../types'
import { bomAPI } from '../api'

export const useBOMStore = defineStore('bom', () => {
  const boms = ref<BOM[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<BOMStats | null>(null)
  const currentBOM = ref<BOM | null>(null)

  // Actions
  async function fetchBOMs(params?: BOMSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await bomAPI.getBOMs(params)
      boms.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch BOMs'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchBOM(id: string): Promise<BOM> {
    loading.value = true
    error.value = null
    try {
      const bom = await bomAPI.getBOM(id)
      currentBOM.value = bom
      
      // Update the BOM in the list if it exists
      const index = boms.value.findIndex(b => b.id === id)
      if (index !== -1) {
        boms.value[index] = bom
      }
      
      return bom
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<BOMStats> {
    try {
      const bomStats = await bomAPI.getBOMStats()
      stats.value = bomStats
      return bomStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function createBOM(data: BOMFormData): Promise<BOM> {
    loading.value = true
    error.value = null
    try {
      const newBOM = await bomAPI.createBOM(data)
      boms.value.unshift(newBOM)
      return newBOM
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateBOM(id: string, data: Partial<BOMFormData>): Promise<BOM> {
    loading.value = true
    error.value = null
    try {
      const updatedBOM = await bomAPI.updateBOM(id, data)
      
      // Update in the list
      const index = boms.value.findIndex(b => b.id === id)
      if (index !== -1) {
        boms.value[index] = updatedBOM
      }
      
      // Update current BOM if it's the same
      if (currentBOM.value?.id === id) {
        currentBOM.value = updatedBOM
      }
      
      return updatedBOM
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteBOM(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await bomAPI.deleteBOM(id)
      
      // Remove from the list
      const index = boms.value.findIndex(b => b.id === id)
      if (index !== -1) {
        boms.value.splice(index, 1)
      }
      
      // Clear current BOM if it's the deleted one
      if (currentBOM.value?.id === id) {
        currentBOM.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function copyBOM(id: string, newVersion: string): Promise<BOM> {
    loading.value = true
    error.value = null
    try {
      const copiedBOM = await bomAPI.copyBOM(id, newVersion)
      boms.value.unshift(copiedBOM)
      return copiedBOM
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function approveBOM(id: string): Promise<BOM> {
    loading.value = true
    error.value = null
    try {
      const approvedBOM = await bomAPI.approveBOM(id)
      
      // Update in the list
      const index = boms.value.findIndex(b => b.id === id)
      if (index !== -1) {
        boms.value[index] = approvedBOM
      }
      
      // Update current BOM if it's the same
      if (currentBOM.value?.id === id) {
        currentBOM.value = approvedBOM
      }
      
      return approvedBOM
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve BOM'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getBOMById(id: string): BOM | undefined {
    return boms.value.find(b => b.id === id)
  }

  function getBOMsByStatus(status: string): BOM[] {
    return boms.value.filter(b => b.status === status)
  }

  function getBOMsByType(type: string): BOM[] {
    return boms.value.filter(b => b.type === type)
  }

  function getBOMsByItem(itemCode: string): BOM[] {
    return boms.value.filter(b => b.itemCode === itemCode)
  }

  function getActiveBOMs(): BOM[] {
    return boms.value.filter(b => b.status === 'active')
  }

  function getDraftBOMs(): BOM[] {
    return boms.value.filter(b => b.status === 'draft')
  }

  function getObsoleteBOMs(): BOM[] {
    return boms.value.filter(b => b.status === 'obsolete')
  }

  function getBOMCostAnalysis(): { total: number, average: number, highest: BOM | null, lowest: BOM | null } {
    if (boms.value.length === 0) {
      return { total: 0, average: 0, highest: null, lowest: null }
    }

    const total = boms.value.reduce((sum, b) => sum + b.costing.totalCost, 0)
    const average = total / boms.value.length
    
    const sortedByCost = [...boms.value].sort((a, b) => b.costing.totalCost - a.costing.totalCost)
    const highest = sortedByCost[0]
    const lowest = sortedByCost[sortedByCost.length - 1]

    return {
      total: Math.round(total * 100) / 100,
      average: Math.round(average * 100) / 100,
      highest,
      lowest
    }
  }

  return {
    // State
    boms,
    loading,
    error,
    stats,
    currentBOM,
    
    // Actions
    fetchBOMs,
    fetchBOM,
    fetchStats,
    createBOM,
    updateBOM,
    deleteBOM,
    copyBOM,
    approveBOM,
    
    // Getters
    getBOMById,
    getBOMsByStatus,
    getBOMsByType,
    getBOMsByItem,
    getActiveBOMs,
    getDraftBOMs,
    getObsoleteBOMs,
    getBOMCostAnalysis,
  }
})