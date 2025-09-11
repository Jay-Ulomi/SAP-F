import { apiClient } from '../../../../shared/api/apiClient'
import type {
  CostCenter,
  CostCenterFormData,
  CostCenterListResponse,
  CostCenterFilters,
  CostCenterValidationResult,
  CostAllocation,
  CostAllocationFormData,
  CostAllocationListResponse,
  CostAllocationFilters,
  CostAllocationValidationResult,
  ProfitCenter,
  ProfitCenterListResponse,
  CostAnalysis,
  CostAnalysisListResponse,
  CostDriver,
  CostDriverFormData,
  CostAccountingStats,
  CostCenterHierarchy,
} from '../types'

// API Base Paths
const COST_CENTERS_BASE_PATH = '/cost-centers'
const COST_ALLOCATIONS_BASE_PATH = '/cost-allocations'
const PROFIT_CENTERS_BASE_PATH = '/profit-centers'
const COST_ANALYSIS_BASE_PATH = '/cost-analysis'
const COST_DRIVERS_BASE_PATH = '/cost-drivers'

// Cost Centers API
const costCentersApi = {
  // Get cost centers with pagination and filters
  getCostCenters(
    page: number = 1,
    pageSize: number = 20,
    filters?: CostCenterFilters,
  ): Promise<CostCenterListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.parentId && { parentId: filters.parentId }),
      ...(filters?.manager && { manager: filters.manager }),
      ...(filters?.department && { department: filters.department }),
      ...(filters?.location && { location: filters.location }),
      ...(filters?.currency && { currency: filters.currency }),
      ...(filters?.isAllocated !== undefined && { isAllocated: filters.isAllocated.toString() }),
      ...(filters?.allocationMethod && { allocationMethod: filters.allocationMethod }),
      ...(filters?.period && { period: filters.period }),
      ...(filters?.fiscalYear && { fiscalYear: filters.fiscalYear }),
    })

    return apiClient.get(`${COST_CENTERS_BASE_PATH}?${params}`).then((response) => response.data)
  },

  // Get single cost center by ID
  getCostCenter(id: string): Promise<CostCenter> {
    return apiClient.get(`${COST_CENTERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Create new cost center
  createCostCenter(data: CostCenterFormData): Promise<CostCenter> {
    return apiClient.post(COST_CENTERS_BASE_PATH, data).then((response) => response.data)
  },

  // Update existing cost center
  updateCostCenter(id: string, data: CostCenterFormData): Promise<CostCenter> {
    return apiClient.put(`${COST_CENTERS_BASE_PATH}/${id}`, data).then((response) => response.data)
  },

  // Delete cost center
  deleteCostCenter(id: string): Promise<void> {
    return apiClient.delete(`${COST_CENTERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Validate cost center data
  validateCostCenter(data: CostCenterFormData): Promise<CostCenterValidationResult> {
    return apiClient
      .post(`${COST_CENTERS_BASE_PATH}/validate`, data)
      .then((response) => response.data)
  },

  // Get cost center hierarchy
  getCostCenterHierarchy(): Promise<CostCenterHierarchy[]> {
    return apiClient.get(`${COST_CENTERS_BASE_PATH}/hierarchy`).then((response) => response.data)
  },

  // Get cost center statistics
  getCostCenterStats(period?: string, fiscalYear?: string): Promise<CostAccountingStats> {
    const params = new URLSearchParams()
    if (period) params.append('period', period)
    if (fiscalYear) params.append('fiscalYear', fiscalYear)

    return apiClient
      .get(`${COST_CENTERS_BASE_PATH}/stats?${params}`)
      .then((response) => response.data)
  },

  // Copy cost center
  copyCostCenter(id: string): Promise<CostCenter> {
    return apiClient.post(`${COST_CENTERS_BASE_PATH}/${id}/copy`).then((response) => response.data)
  },

  // Activate/Deactivate cost center
  toggleCostCenterStatus(id: string, status: string): Promise<CostCenter> {
    return apiClient
      .patch(`${COST_CENTERS_BASE_PATH}/${id}/status`, { status })
      .then((response) => response.data)
  },
}

// Cost Allocations API
const costAllocationsApi = {
  // Get cost allocations with pagination and filters
  getCostAllocations(
    page: number = 1,
    pageSize: number = 20,
    filters?: CostAllocationFilters,
  ): Promise<CostAllocationListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.sourceCostCenterId && { sourceCostCenterId: filters.sourceCostCenterId }),
      ...(filters?.targetCostCenterId && { targetCostCenterId: filters.targetCostCenterId }),
      ...(filters?.allocationMethod && { allocationMethod: filters.allocationMethod }),
      ...(filters?.period && { period: filters.period }),
      ...(filters?.fiscalYear && { fiscalYear: filters.fiscalYear }),
      ...(filters?.isPosted !== undefined && { isPosted: filters.isPosted.toString() }),
      ...(filters?.dateFrom && { dateFrom: filters.dateFrom }),
      ...(filters?.dateTo && { dateTo: filters.dateTo }),
    })

    return apiClient
      .get(`${COST_ALLOCATIONS_BASE_PATH}?${params}`)
      .then((response) => response.data)
  },

  // Get single cost allocation by ID
  getCostAllocation(id: string): Promise<CostAllocation> {
    return apiClient.get(`${COST_ALLOCATIONS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Create new cost allocation
  createCostAllocation(data: CostAllocationFormData): Promise<CostAllocation> {
    return apiClient.post(COST_ALLOCATIONS_BASE_PATH, data).then((response) => response.data)
  },

  // Update existing cost allocation
  updateCostAllocation(id: string, data: CostAllocationFormData): Promise<CostAllocation> {
    return apiClient
      .put(`${COST_ALLOCATIONS_BASE_PATH}/${id}`, data)
      .then((response) => response.data)
  },

  // Delete cost allocation
  deleteCostAllocation(id: string): Promise<void> {
    return apiClient.delete(`${COST_ALLOCATIONS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Validate cost allocation data
  validateCostAllocation(data: CostAllocationFormData): Promise<CostAllocationValidationResult> {
    return apiClient
      .post(`${COST_ALLOCATIONS_BASE_PATH}/validate`, data)
      .then((response) => response.data)
  },

  // Post cost allocation
  postCostAllocation(id: string): Promise<CostAllocation> {
    return apiClient
      .post(`${COST_ALLOCATIONS_BASE_PATH}/${id}/post`)
      .then((response) => response.data)
  },

  // Unpost cost allocation
  unpostCostAllocation(id: string): Promise<CostAllocation> {
    return apiClient
      .post(`${COST_ALLOCATIONS_BASE_PATH}/${id}/unpost`)
      .then((response) => response.data)
  },

  // Run automatic cost allocation
  runAutomaticAllocation(period: string, fiscalYear: string): Promise<CostAllocation[]> {
    return apiClient
      .post(`${COST_ALLOCATIONS_BASE_PATH}/auto-allocate`, {
        period,
        fiscalYear,
      })
      .then((response) => response.data)
  },

  // Get allocation preview
  getAllocationPreview(data: CostAllocationFormData): Promise<{
    preview: CostAllocation
    impact: {
      sourceCostCenter: { before: number; after: number }
      targetCostCenter: { before: number; after: number }
    }
  }> {
    return apiClient
      .post(`${COST_ALLOCATIONS_BASE_PATH}/preview`, data)
      .then((response) => response.data)
  },
}

// Profit Centers API
const profitCentersApi = {
  // Get profit centers with pagination
  getProfitCenters(
    page: number = 1,
    pageSize: number = 20,
    costCenterId?: string,
  ): Promise<ProfitCenterListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(costCenterId && { costCenterId }),
    })

    return apiClient.get(`${PROFIT_CENTERS_BASE_PATH}?${params}`).then((response) => response.data)
  },

  // Get single profit center by ID
  getProfitCenter(id: string): Promise<ProfitCenter> {
    return apiClient.get(`${PROFIT_CENTERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Create new profit center
  createProfitCenter(data: Partial<ProfitCenter>): Promise<ProfitCenter> {
    return apiClient.post(PROFIT_CENTERS_BASE_PATH, data).then((response) => response.data)
  },

  // Update existing profit center
  updateProfitCenter(id: string, data: Partial<ProfitCenter>): Promise<ProfitCenter> {
    return apiClient
      .put(`${PROFIT_CENTERS_BASE_PATH}/${id}`, data)
      .then((response) => response.data)
  },

  // Delete profit center
  deleteProfitCenter(id: string): Promise<void> {
    return apiClient.delete(`${PROFIT_CENTERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Get profit center performance report
  getProfitCenterReport(period: string, fiscalYear: string): Promise<ProfitCenter[]> {
    const params = new URLSearchParams({ period, fiscalYear })
    return apiClient
      .get(`${PROFIT_CENTERS_BASE_PATH}/report?${params}`)
      .then((response) => response.data)
  },
}

// Cost Analysis API
const costAnalysisApi = {
  // Get cost analysis with pagination
  getCostAnalysis(
    page: number = 1,
    pageSize: number = 20,
    costCenterId?: string,
    period?: string,
    fiscalYear?: string,
  ): Promise<CostAnalysisListResponse> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(costCenterId && { costCenterId }),
      ...(period && { period }),
      ...(fiscalYear && { fiscalYear }),
    })

    return apiClient.get(`${COST_ANALYSIS_BASE_PATH}?${params}`).then((response) => response.data)
  },

  // Get single cost analysis by ID
  getCostAnalysisById(id: string): Promise<CostAnalysis> {
    return apiClient.get(`${COST_ANALYSIS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Generate cost analysis report
  generateCostAnalysisReport(
    costCenterIds: string[],
    period: string,
    fiscalYear: string,
  ): Promise<CostAnalysis[]> {
    return apiClient
      .post(`${COST_ANALYSIS_BASE_PATH}/generate`, {
        costCenterIds,
        period,
        fiscalYear,
      })
      .then((response) => response.data)
  },

  // Get cost trend analysis
  getCostTrendAnalysis(
    costCenterId: string,
    periods: number = 12,
  ): Promise<{
    periods: string[]
    budget: number[]
    actual: number[]
    variance: number[]
  }> {
    const params = new URLSearchParams({
      costCenterId,
      periods: periods.toString(),
    })

    return apiClient
      .get(`${COST_ANALYSIS_BASE_PATH}/trend?${params}`)
      .then((response) => response.data)
  },
}

// Cost Drivers API
const costDriversApi = {
  // Get cost drivers
  getCostDrivers(costCenterId?: string): Promise<CostDriver[]> {
    const params = new URLSearchParams()
    if (costCenterId) params.append('costCenterId', costCenterId)

    return apiClient.get(`${COST_DRIVERS_BASE_PATH}?${params}`).then((response) => response.data)
  },

  // Get single cost driver by ID
  getCostDriver(id: string): Promise<CostDriver> {
    return apiClient.get(`${COST_DRIVERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Create new cost driver
  createCostDriver(data: CostDriverFormData): Promise<CostDriver> {
    return apiClient.post(COST_DRIVERS_BASE_PATH, data).then((response) => response.data)
  },

  // Update existing cost driver
  updateCostDriver(id: string, data: CostDriverFormData): Promise<CostDriver> {
    return apiClient.put(`${COST_DRIVERS_BASE_PATH}/${id}`, data).then((response) => response.data)
  },

  // Delete cost driver
  deleteCostDriver(id: string): Promise<void> {
    return apiClient.delete(`${COST_DRIVERS_BASE_PATH}/${id}`).then((response) => response.data)
  },

  // Toggle cost driver status
  toggleCostDriverStatus(id: string, isActive: boolean): Promise<CostDriver> {
    return apiClient
      .patch(`${COST_DRIVERS_BASE_PATH}/${id}/status`, { isActive })
      .then((response) => response.data)
  },
}

// Export all API services
export { costCentersApi, costAllocationsApi, profitCentersApi, costAnalysisApi, costDriversApi }
