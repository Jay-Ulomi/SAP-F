import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResourceCapacity, ResourceCapacityFormData } from '../types'
import { capacitiesAPI } from '../api'

export const useResourceCapacityStore = defineStore('resourceCapacity', () => {
  const capacities = ref<ResourceCapacity[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchCapacities() {
    loading.value = true
    error.value = null
    try {
      const response = await capacitiesAPI.getCapacities()
      capacities.value = response.items
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch capacities'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchCapacity(id: string): Promise<ResourceCapacity | undefined> {
    // For now, find from existing capacities since API doesn't have single item endpoint
    const capacity = capacities.value.find(c => c.id === id)
    if (!capacity) {
      // If not found in local state, fetch all and find
      await fetchCapacities()
      return capacities.value.find(c => c.id === id)
    }
    return capacity
  }

  async function createCapacity(data: ResourceCapacityFormData): Promise<ResourceCapacity> {
    loading.value = true
    error.value = null
    try {
      const newCapacity = await capacitiesAPI.createCapacity(data)
      capacities.value.push(newCapacity)
      return newCapacity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create capacity'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateCapacity(id: string, data: ResourceCapacityFormData): Promise<ResourceCapacity> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have update endpoint, simulate it
      const index = capacities.value.findIndex(c => c.id === id)
      if (index !== -1) {
        const updatedCapacity = { ...capacities.value[index], ...data }
        capacities.value[index] = updatedCapacity
        return updatedCapacity
      }
      throw new Error('Capacity not found')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update capacity'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteCapacity(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have delete endpoint, simulate it
      capacities.value = capacities.value.filter(c => c.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete capacity'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getCapacityById(id: string): ResourceCapacity | undefined {
    return capacities.value.find(c => c.id === id)
  }

  function getCapacitiesByResource(resourceId: string): ResourceCapacity[] {
    return capacities.value.filter(c => c.resourceId === resourceId)
  }

  function getActiveCapacities(): ResourceCapacity[] {
    return capacities.value.filter(c => c.status === 'active')
  }

  return {
    // State
    capacities,
    loading,
    error,
    
    // Actions
    fetchCapacities,
    fetchCapacity,
    createCapacity,
    updateCapacity,
    deleteCapacity,
    
    // Getters
    getCapacityById,
    getCapacitiesByResource,
    getActiveCapacities,
  }
})