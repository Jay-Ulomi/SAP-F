import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResourceCost, ResourceCostFormData } from '../types'
import { costsAPI } from '../api'

export const useResourceCostStore = defineStore('resourceCost', () => {
  const costs = ref<ResourceCost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchCosts() {
    loading.value = true
    error.value = null
    try {
      const response = await costsAPI.getCosts()
      costs.value = response.items
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch costs'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCost(id: string): Promise<ResourceCost | undefined> {
    // For now, find from existing costs since API doesn't have single item endpoint
    const cost = costs.value.find(c => c.id === id)
    if (!cost) {
      // If not found in local state, fetch all and find
      await fetchCosts()
      return costs.value.find(c => c.id === id)
    }
    return cost
  }

  async function createCost(data: ResourceCostFormData): Promise<ResourceCost> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have create endpoint, simulate it
      const newCost: ResourceCost = {
        id: `COST${String(costs.value.length + 1).padStart(3, '0')}`,
        ...data,
        resourceCode: 'RES001',
        resourceName: 'Resource',
        variance: 0,
        variancePercent: 0,
        createdBy: 'current-user',
        createdAt: new Date().toISOString(),
      }
      costs.value.push(newCost)
      return newCost
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create cost'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCost(id: string, data: ResourceCostFormData): Promise<ResourceCost> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have update endpoint, simulate it
      const index = costs.value.findIndex(c => c.id === id)
      if (index !== -1) {
        const updatedCost = { ...costs.value[index], ...data }
        costs.value[index] = updatedCost
        return updatedCost
      }
      throw new Error('Cost not found')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update cost'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteCost(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have delete endpoint, simulate it
      costs.value = costs.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete cost'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getCostById(id: string): ResourceCost | undefined {
    return costs.value.find(c => c.id === id)
  }

  function getCostsByResource(resourceId: string): ResourceCost[] {
    return costs.value.filter(c => c.resourceId === resourceId)
  }

  function getActiveCosts(): ResourceCost[] {
    return costs.value.filter(c => c.isActive)
  }

  function getCostsByType(costType: string): ResourceCost[] {
    return costs.value.filter(c => c.costType === costType)
  }

  return {
    // State
    costs,
    loading,
    error,
    
    // Actions
    fetchCosts,
    fetchCost,
    createCost,
    updateCost,
    deleteCost,
    
    // Getters
    getCostById,
    getCostsByResource,
    getActiveCosts,
    getCostsByType,
  }
})