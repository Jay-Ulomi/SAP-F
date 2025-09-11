import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  MRPPlan,
  MRPPlanFormData,
  OrderRecommendation,
  Forecast,
  ForecastFormData,
  MRPScenario,
  ScenarioFormData,
  WizardData,
  MRPSearchParams,
  MRPStats,
  Item,
  Warehouse,
  Supplier,
  Requirement,
  ForecastPeriod,
  PlanningStatus,
  RecommendationStatus,
  OrderType,
  ForecastMethod
} from '../types'
import { mrpAPI } from '../api'

export const useMRPStore = defineStore('mrp', () => {
  // State
  const plans = ref<MRPPlan[]>([])
  const recommendations = ref<OrderRecommendation[]>([])
  const forecasts = ref<Forecast[]>([])
  const scenarios = ref<MRPScenario[]>([])
  const requirements = ref<Requirement[]>([])
  const forecastPeriods = ref<ForecastPeriod[]>([])
  
  const items = ref<Item[]>([])
  const warehouses = ref<Warehouse[]>([])
  const suppliers = ref<Supplier[]>([])
  
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<MRPStats | null>(null)
  
  const currentPlan = ref<MRPPlan | null>(null)
  const currentRecommendation = ref<OrderRecommendation | null>(null)
  const currentForecast = ref<Forecast | null>(null)
  const currentScenario = ref<MRPScenario | null>(null)

  // MRP Plans Actions
  async function fetchPlans(params?: MRPSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await mrpAPI.getPlans(params)
      plans.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch MRP plans'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPlan(id: string): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const plan = await mrpAPI.getPlan(id)
      currentPlan.value = plan
      
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        plans.value[index] = plan
      }
      
      return plan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createPlan(data: MRPPlanFormData): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const newPlan = await mrpAPI.createPlan(data)
      plans.value.unshift(newPlan)
      return newPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updatePlan(id: string, data: Partial<MRPPlanFormData>): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const updatedPlan = await mrpAPI.updatePlan(id, data)
      
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        plans.value[index] = updatedPlan
      }
      
      if (currentPlan.value?.id === id) {
        currentPlan.value = updatedPlan
      }
      
      return updatedPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deletePlan(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await mrpAPI.deletePlan(id)
      
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        plans.value.splice(index, 1)
      }
      
      if (currentPlan.value?.id === id) {
        currentPlan.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function runPlan(id: string): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const updatedPlan = await mrpAPI.runPlan(id)
      
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        plans.value[index] = updatedPlan
      }
      
      if (currentPlan.value?.id === id) {
        currentPlan.value = updatedPlan
      }
      
      return updatedPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to run MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function cancelPlan(id: string): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const updatedPlan = await mrpAPI.cancelPlan(id)
      
      const index = plans.value.findIndex(p => p.id === id)
      if (index !== -1) {
        plans.value[index] = updatedPlan
      }
      
      if (currentPlan.value?.id === id) {
        currentPlan.value = updatedPlan
      }
      
      return updatedPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel MRP plan'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPlanRequirements(planId: string, params?: MRPSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await mrpAPI.getPlanRequirements(planId, params)
      requirements.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch requirements'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Recommendations Actions
  async function fetchRecommendations(params?: MRPSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await mrpAPI.getRecommendations(params)
      recommendations.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch recommendations'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchRecommendation(id: string): Promise<OrderRecommendation> {
    loading.value = true
    error.value = null
    try {
      const recommendation = await mrpAPI.getRecommendation(id)
      currentRecommendation.value = recommendation
      return recommendation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch recommendation'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function approveRecommendation(id: string, notes?: string): Promise<OrderRecommendation> {
    loading.value = true
    error.value = null
    try {
      const updatedRecommendation = await mrpAPI.approveRecommendation(id, notes)
      
      const index = recommendations.value.findIndex(r => r.id === id)
      if (index !== -1) {
        recommendations.value[index] = updatedRecommendation
      }
      
      return updatedRecommendation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve recommendation'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function rejectRecommendation(id: string, reason: string): Promise<OrderRecommendation> {
    loading.value = true
    error.value = null
    try {
      const updatedRecommendation = await mrpAPI.rejectRecommendation(id, reason)
      
      const index = recommendations.value.findIndex(r => r.id === id)
      if (index !== -1) {
        recommendations.value[index] = updatedRecommendation
      }
      
      return updatedRecommendation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject recommendation'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function bulkApproveRecommendations(ids: string[], notes?: string): Promise<OrderRecommendation[]> {
    loading.value = true
    error.value = null
    try {
      const updatedRecommendations = await mrpAPI.bulkApproveRecommendations(ids, notes)
      
      updatedRecommendations.forEach(updated => {
        const index = recommendations.value.findIndex(r => r.id === updated.id)
        if (index !== -1) {
          recommendations.value[index] = updated
        }
      })
      
      return updatedRecommendations
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to bulk approve recommendations'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function bulkRejectRecommendations(ids: string[], reason: string): Promise<OrderRecommendation[]> {
    loading.value = true
    error.value = null
    try {
      const updatedRecommendations = await mrpAPI.bulkRejectRecommendations(ids, reason)
      
      updatedRecommendations.forEach(updated => {
        const index = recommendations.value.findIndex(r => r.id === updated.id)
        if (index !== -1) {
          recommendations.value[index] = updated
        }
      })
      
      return updatedRecommendations
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to bulk reject recommendations'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Forecasts Actions
  async function fetchForecasts(params?: MRPSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await mrpAPI.getForecasts(params)
      forecasts.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch forecasts'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createForecast(data: ForecastFormData): Promise<Forecast> {
    loading.value = true
    error.value = null
    try {
      const newForecast = await mrpAPI.createForecast(data)
      forecasts.value.unshift(newForecast)
      return newForecast
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create forecast'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function runForecast(id: string): Promise<Forecast> {
    loading.value = true
    error.value = null
    try {
      const updatedForecast = await mrpAPI.runForecast(id)
      
      const index = forecasts.value.findIndex(f => f.id === id)
      if (index !== -1) {
        forecasts.value[index] = updatedForecast
      }
      
      return updatedForecast
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to run forecast'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchForecastPeriods(forecastId: string, params?: { startDate?: string; endDate?: string }): Promise<ForecastPeriod[]> {
    loading.value = true
    error.value = null
    try {
      const periods = await mrpAPI.getForecastPeriods(forecastId, params)
      forecastPeriods.value = periods
      return periods
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch forecast periods'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Scenarios Actions
  async function fetchScenarios(params?: MRPSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await mrpAPI.getScenarios(params)
      scenarios.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch scenarios'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createScenario(data: ScenarioFormData): Promise<MRPScenario> {
    loading.value = true
    error.value = null
    try {
      const newScenario = await mrpAPI.createScenario(data)
      scenarios.value.unshift(newScenario)
      return newScenario
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create scenario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function runScenario(id: string): Promise<MRPScenario> {
    loading.value = true
    error.value = null
    try {
      const updatedScenario = await mrpAPI.runScenario(id)
      
      const index = scenarios.value.findIndex(s => s.id === id)
      if (index !== -1) {
        scenarios.value[index] = updatedScenario
      }
      
      return updatedScenario
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to run scenario'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Master Data Actions
  async function fetchMasterData(): Promise<void> {
    try {
      const [itemsData, warehousesData, suppliersData] = await Promise.all([
        mrpAPI.getItems({ limit: 1000 }),
        mrpAPI.getWarehouses(),
        mrpAPI.getSuppliers({ limit: 1000 })
      ])
      
      items.value = itemsData
      warehouses.value = warehousesData
      suppliers.value = suppliersData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch master data'
      throw err
    }
  }

  async function fetchStats(): Promise<MRPStats> {
    try {
      const mrpStats = await mrpAPI.getStats()
      stats.value = mrpStats
      return mrpStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  // Planning Wizard Actions
  async function createPlanFromWizard(data: WizardData): Promise<MRPPlan> {
    loading.value = true
    error.value = null
    try {
      const newPlan = await mrpAPI.createPlanFromWizard(data)
      plans.value.unshift(newPlan)
      return newPlan
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create plan from wizard'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getPlanById(id: string): MRPPlan | undefined {
    return plans.value.find(p => p.id === id)
  }

  function getRecommendationById(id: string): OrderRecommendation | undefined {
    return recommendations.value.find(r => r.id === id)
  }

  function getForecastById(id: string): Forecast | undefined {
    return forecasts.value.find(f => f.id === id)
  }

  function getScenarioById(id: string): MRPScenario | undefined {
    return scenarios.value.find(s => s.id === id)
  }

  function getPlansByStatus(status: PlanningStatus): MRPPlan[] {
    return plans.value.filter(p => p.status === status)
  }

  function getRecommendationsByStatus(status: RecommendationStatus): OrderRecommendation[] {
    return recommendations.value.filter(r => r.status === status)
  }

  function getRecommendationsByType(type: OrderType): OrderRecommendation[] {
    return recommendations.value.filter(r => r.type === type)
  }

  function getForecastsByMethod(method: ForecastMethod): Forecast[] {
    return forecasts.value.filter(f => f.method === method)
  }

  function getItemByCode(code: string): Item | undefined {
    return items.value.find(i => i.code === code)
  }

  function getWarehouseByCode(code: string): Warehouse | undefined {
    return warehouses.value.find(w => w.code === code)
  }

  function getSupplierByCode(code: string): Supplier | undefined {
    return suppliers.value.find(s => s.code === code)
  }

  function getTotalRecommendationValue(): number {
    return recommendations.value.reduce((sum, r) => sum + r.totalCost, 0)
  }

  function getPendingRecommendationsCount(): number {
    return recommendations.value.filter(r => r.status === 'pending').length
  }

  return {
    // State
    plans,
    recommendations,
    forecasts,
    scenarios,
    requirements,
    forecastPeriods,
    items,
    warehouses,
    suppliers,
    loading,
    error,
    stats,
    currentPlan,
    currentRecommendation,
    currentForecast,
    currentScenario,
    
    // Actions
    fetchPlans,
    fetchPlan,
    createPlan,
    updatePlan,
    deletePlan,
    runPlan,
    cancelPlan,
    fetchPlanRequirements,
    
    fetchRecommendations,
    fetchRecommendation,
    approveRecommendation,
    rejectRecommendation,
    bulkApproveRecommendations,
    bulkRejectRecommendations,
    
    fetchForecasts,
    createForecast,
    runForecast,
    fetchForecastPeriods,
    
    fetchScenarios,
    createScenario,
    runScenario,
    
    fetchMasterData,
    fetchStats,
    createPlanFromWizard,
    
    // Getters
    getPlanById,
    getRecommendationById,
    getForecastById,
    getScenarioById,
    getPlansByStatus,
    getRecommendationsByStatus,
    getRecommendationsByType,
    getForecastsByMethod,
    getItemByCode,
    getWarehouseByCode,
    getSupplierByCode,
    getTotalRecommendationValue,
    getPendingRecommendationsCount,
  }
})