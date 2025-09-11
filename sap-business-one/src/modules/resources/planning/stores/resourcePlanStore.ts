import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ResourcePlan, ResourcePlanFormData } from '../types'
import { planningAPI } from '../api'

export const useResourcePlanStore = defineStore('resourcePlan', () => {
  const plans = ref<ResourcePlan[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchPlans() {
    loading.value = true
    error.value = null
    try {
      const response = await planningAPI.getPlans()
      plans.value = response.items
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch plans'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPlan(id: string): Promise<ResourcePlan | undefined> {
    // For now, find from existing plans since API doesn't have single item endpoint
    const plan = plans.value.find(p => p.id === id)
    if (!plan) {
      // If not found in local state, fetch all and find
      await fetchPlans()
      return plans.value.find(p => p.id === id)
    }
    return plan
  }

  async function createPlan(data: ResourcePlanFormData): Promise<ResourcePlan> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have create endpoint, simulate it
      const newPlan: ResourcePlan = {
        id: `PLAN${String(plans.value.length + 1).padStart(3, '0')}`,
        resourceId: data.resourceId,
        resourceCode: 'RES001',
        resourceName: 'Resource',
        planType: data.planType,
        planningHorizon: data.planningHorizon,
        planningUnit: data.planningUnit,
        planStart: data.planStart,
        planEnd: data.planEnd,
        targetCapacity: data.targetCapacity,
        targetUtilization: data.targetUtilization,
        targetEfficiency: data.targetEfficiency,
        bufferCapacity: data.bufferCapacity,
        constraints: data.constraints,
        requirements: data.requirements,
        allowOvercapacity: data.allowOvercapacity,
        autoAdjust: data.autoAdjust,
        considerSeasonality: data.considerSeasonality,
        priority: data.priority,
        status: data.status,
        notes: data.notes,
        createdBy: 'current-user',
        createdAt: new Date().toISOString(),
      }
      plans.value.push(newPlan)
      return newPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updatePlan(id: string, data: ResourcePlanFormData): Promise<ResourcePlan> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have update endpoint, simulate it
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        const updatedPlan = { ...plans.value[index], ...data }
        plans.value[index] = updatedPlan
        return updatedPlan
      }
      throw new Error('Plan not found')
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deletePlan(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      // Since API doesn't have delete endpoint, simulate it
      plans.value = plans.value.filter(p => p.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getPlanById(id: string): ResourcePlan | undefined {
    return plans.value.find(p => p.id === id)
  }

  function getPlansByResource(resourceId: string): ResourcePlan[] {
    return plans.value.filter(p => p.resourceId === resourceId)
  }

  function getActivePlans(): ResourcePlan[] {
    return plans.value.filter(p => p.status === 'active' || p.status === 'approved')
  }

  function getPlansByType(planType: string): ResourcePlan[] {
    return plans.value.filter(p => p.planType === planType)
  }

  function getPlansByStatus(status: string): ResourcePlan[] {
    return plans.value.filter(p => p.status === status)
  }

  return {
    // State
    plans,
    loading,
    error,
    
    // Actions
    fetchPlans,
    fetchPlan,
    createPlan,
    updatePlan,
    deletePlan,
    
    // Getters
    getPlanById,
    getPlansByResource,
    getActivePlans,
    getPlansByType,
    getPlansByStatus,
  }
})