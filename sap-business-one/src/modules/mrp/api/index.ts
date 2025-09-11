import { api } from '@/shared/api/apiClient'
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
  MRPSearchResponse,
  MRPStats,
  Item,
  Warehouse,
  Supplier,
  Requirement,
  ForecastPeriod
} from '../types'

const BASE_URL = '/mrp'

export const mrpAPI = {
  // MRP Plans
  async getPlans(params?: MRPSearchParams): Promise<MRPSearchResponse<MRPPlan>> {
    const response = await api.get(`${BASE_URL}/plans`, { params })
    return response.data
  },

  async getPlan(id: string): Promise<MRPPlan> {
    const response = await api.get(`${BASE_URL}/plans/${id}`)
    return response.data
  },

  async createPlan(data: MRPPlanFormData): Promise<MRPPlan> {
    const response = await api.post(`${BASE_URL}/plans`, data)
    return response.data
  },

  async updatePlan(id: string, data: Partial<MRPPlanFormData>): Promise<MRPPlan> {
    const response = await api.put(`${BASE_URL}/plans/${id}`, data)
    return response.data
  },

  async deletePlan(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/plans/${id}`)
  },

  async runPlan(id: string): Promise<MRPPlan> {
    const response = await api.post(`${BASE_URL}/plans/${id}/run`)
    return response.data
  },

  async cancelPlan(id: string): Promise<MRPPlan> {
    const response = await api.post(`${BASE_URL}/plans/${id}/cancel`)
    return response.data
  },

  async getPlanRequirements(planId: string, params?: MRPSearchParams): Promise<MRPSearchResponse<Requirement>> {
    const response = await api.get(`${BASE_URL}/plans/${planId}/requirements`, { params })
    return response.data
  },

  // Order Recommendations
  async getRecommendations(params?: MRPSearchParams): Promise<MRPSearchResponse<OrderRecommendation>> {
    const response = await api.get(`${BASE_URL}/recommendations`, { params })
    return response.data
  },

  async getRecommendation(id: string): Promise<OrderRecommendation> {
    const response = await api.get(`${BASE_URL}/recommendations/${id}`)
    return response.data
  },

  async approveRecommendation(id: string, notes?: string): Promise<OrderRecommendation> {
    const response = await api.patch(`${BASE_URL}/recommendations/${id}/approve`, { notes })
    return response.data
  },

  async rejectRecommendation(id: string, reason: string): Promise<OrderRecommendation> {
    const response = await api.patch(`${BASE_URL}/recommendations/${id}/reject`, { reason })
    return response.data
  },

  async implementRecommendation(id: string): Promise<OrderRecommendation> {
    const response = await api.patch(`${BASE_URL}/recommendations/${id}/implement`)
    return response.data
  },

  async bulkApproveRecommendations(ids: string[], notes?: string): Promise<OrderRecommendation[]> {
    const response = await api.patch(`${BASE_URL}/recommendations/bulk-approve`, { ids, notes })
    return response.data
  },

  async bulkRejectRecommendations(ids: string[], reason: string): Promise<OrderRecommendation[]> {
    const response = await api.patch(`${BASE_URL}/recommendations/bulk-reject`, { ids, reason })
    return response.data
  },

  // Forecasts
  async getForecasts(params?: MRPSearchParams): Promise<MRPSearchResponse<Forecast>> {
    const response = await api.get(`${BASE_URL}/forecasts`, { params })
    return response.data
  },

  async getForecast(id: string): Promise<Forecast> {
    const response = await api.get(`${BASE_URL}/forecasts/${id}`)
    return response.data
  },

  async createForecast(data: ForecastFormData): Promise<Forecast> {
    const response = await api.post(`${BASE_URL}/forecasts`, data)
    return response.data
  },

  async updateForecast(id: string, data: Partial<ForecastFormData>): Promise<Forecast> {
    const response = await api.put(`${BASE_URL}/forecasts/${id}`, data)
    return response.data
  },

  async deleteForecast(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/forecasts/${id}`)
  },

  async runForecast(id: string): Promise<Forecast> {
    const response = await api.post(`${BASE_URL}/forecasts/${id}/run`)
    return response.data
  },

  async getForecastPeriods(forecastId: string, params?: { startDate?: string; endDate?: string }): Promise<ForecastPeriod[]> {
    const response = await api.get(`${BASE_URL}/forecasts/${forecastId}/periods`, { params })
    return response.data
  },

  // Scenarios
  async getScenarios(params?: MRPSearchParams): Promise<MRPSearchResponse<MRPScenario>> {
    const response = await api.get(`${BASE_URL}/scenarios`, { params })
    return response.data
  },

  async getScenario(id: string): Promise<MRPScenario> {
    const response = await api.get(`${BASE_URL}/scenarios/${id}`)
    return response.data
  },

  async createScenario(data: ScenarioFormData): Promise<MRPScenario> {
    const response = await api.post(`${BASE_URL}/scenarios`, data)
    return response.data
  },

  async updateScenario(id: string, data: Partial<ScenarioFormData>): Promise<MRPScenario> {
    const response = await api.put(`${BASE_URL}/scenarios/${id}`, data)
    return response.data
  },

  async deleteScenario(id: string): Promise<void> {
    await api.delete(`${BASE_URL}/scenarios/${id}`)
  },

  async runScenario(id: string): Promise<MRPScenario> {
    const response = await api.post(`${BASE_URL}/scenarios/${id}/run`)
    return response.data
  },

  async compareScenarios(scenarioIds: string[]): Promise<any> {
    const response = await api.post(`${BASE_URL}/scenarios/compare`, { scenarioIds })
    return response.data
  },

  // Planning Wizard
  async createPlanFromWizard(data: WizardData): Promise<MRPPlan> {
    const response = await api.post(`${BASE_URL}/wizard/create-plan`, data)
    return response.data
  },

  async validateWizardData(data: Partial<WizardData>): Promise<{ isValid: boolean; errors: string[] }> {
    const response = await api.post(`${BASE_URL}/wizard/validate`, data)
    return response.data
  },

  async getWizardRecommendations(data: Partial<WizardData>): Promise<any> {
    const response = await api.post(`${BASE_URL}/wizard/recommendations`, data)
    return response.data
  },

  // Statistics
  async getStats(): Promise<MRPStats> {
    const response = await api.get(`${BASE_URL}/stats`)
    return response.data
  },

  // Master Data
  async getItems(params?: { search?: string; limit?: number }): Promise<Item[]> {
    const response = await api.get('/inventory/items', { params })
    return response.data
  },

  async getWarehouses(): Promise<Warehouse[]> {
    const response = await api.get('/inventory/warehouses')
    return response.data
  },

  async getSuppliers(params?: { search?: string; limit?: number }): Promise<Supplier[]> {
    const response = await api.get('/business-partners/suppliers', { params })
    return response.data
  },

  // Export
  async exportPlans(params: MRPSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/plans/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  },

  async exportRecommendations(params: MRPSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/recommendations/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  },

  async exportForecasts(params: MRPSearchParams, format: 'pdf' | 'excel' | 'csv'): Promise<Blob> {
    const response = await api.get(`${BASE_URL}/forecasts/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  }
}