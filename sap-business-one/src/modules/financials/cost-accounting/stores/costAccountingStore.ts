import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  costCentersApi,
  costAllocationsApi,
  profitCentersApi,
  costAnalysisApi,
  costDriversApi,
} from '../api/costAccountingApi'
import type {
  CostCenter,
  CostCenterFormData,
  CostCenterFilters,
  CostCenterValidationResult,
  CostAllocation,
  CostAllocationFormData,
  CostAllocationFilters,
  CostAllocationValidationResult,
  ProfitCenter,
  CostAnalysis,
  CostDriver,
  CostDriverFormData,
  CostAccountingStats,
  CostCenterHierarchy,
} from '../types'
import { CostCenterType, CostCenterStatus, AllocationMethod, CostDriverType } from '../types'

export const useCostAccountingStore = defineStore('costAccounting', () => {
  // State
  const costCenters = ref<CostCenter[]>([])
  const costAllocations = ref<CostAllocation[]>([])
  const profitCenters = ref<ProfitCenter[]>([])
  const costAnalysis = ref<CostAnalysis[]>([])
  const costDrivers = ref<CostDriver[]>([])
  const currentCostCenter = ref<CostCenter | null>(null)
  const currentAllocation = ref<CostAllocation | null>(null)
  const currentProfitCenter = ref<ProfitCenter | null>(null)
  const costCenterHierarchy = ref<CostCenterHierarchy[]>([])

  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<CostCenterFilters>({})
  const allocationFilters = ref<CostAllocationFilters>({})

  // Statistics
  const stats = ref<CostAccountingStats>({
    totalCostCenters: 0,
    activeCostCenters: 0,
    totalBudget: 0,
    totalActual: 0,
    totalVariance: 0,
    averageVariancePercentage: 0,
    allocatedCostCenters: 0,
    unallocatedCostCenters: 0,
    topCostCenters: [],
    costCenterTypes: {} as Record<CostCenterType, number>,
    allocationMethods: {} as Record<AllocationMethod, number>,
  })

  // Computed Properties
  const activeCostCenters = computed(() =>
    costCenters.value.filter((center) => center.status === CostCenterStatus.ACTIVE),
  )

  const inactiveCostCenters = computed(() =>
    costCenters.value.filter((center) => center.status !== CostCenterStatus.ACTIVE),
  )

  const allocatedCostCenters = computed(() =>
    costCenters.value.filter((center) => center.isAllocated),
  )

  const unallocatedCostCenters = computed(() =>
    costCenters.value.filter((center) => !center.isAllocated),
  )

  const costCentersByType = computed(() => {
    const grouped = costCenters.value.reduce(
      (acc, center) => {
        if (!acc[center.type]) {
          acc[center.type] = []
        }
        acc[center.type].push(center)
        return acc
      },
      {} as Record<CostCenterType, CostCenter[]>,
    )

    return grouped
  })

  const costCentersByStatus = computed(() => {
    const grouped = costCenters.value.reduce(
      (acc, center) => {
        if (!acc[center.status]) {
          acc[center.status] = []
        }
        acc[center.status].push(center)
        return acc
      },
      {} as Record<CostCenterStatus, CostCenter[]>,
    )

    return grouped
  })

  const postedAllocations = computed(() =>
    costAllocations.value.filter((allocation) => allocation.isPosted),
  )

  const draftAllocations = computed(() =>
    costAllocations.value.filter((allocation) => !allocation.isPosted),
  )

  const allocationsByMethod = computed(() => {
    const grouped = costAllocations.value.reduce(
      (acc, allocation) => {
        if (!acc[allocation.allocationMethod]) {
          acc[allocation.allocationMethod] = []
        }
        acc[allocation.allocationMethod].push(allocation)
        return acc
      },
      {} as Record<AllocationMethod, CostAllocation[]>,
    )

    return grouped
  })

  const costCenterTypes = computed(() => Object.values(CostCenterType))
  const costCenterStatuses = computed(() => Object.values(CostCenterStatus))
  const allocationMethods = computed(() => Object.values(AllocationMethod))
  const costDriverTypes = computed(() => Object.values(CostDriverType))

  // Actions - Cost Centers
  const fetchCostCenters = async (
    page?: number,
    pageSize?: number,
    newFilters?: CostCenterFilters,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize
      if (newFilters) filters.value = { ...filters.value, ...newFilters }

      const response = await costCentersApi.getCostCenters(
        pagination.value.page,
        pagination.value.pageSize,
        filters.value,
      )

      costCenters.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch cost centers'
      console.error('Error fetching cost centers:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCostCenter = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const costCenter = await costCentersApi.getCostCenter(id)
      currentCostCenter.value = costCenter
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch cost center'
      console.error('Error fetching cost center:', err)
    } finally {
      loading.value = false
    }
  }

  const createCostCenter = async (data: CostCenterFormData): Promise<CostCenter> => {
    try {
      loading.value = true
      error.value = null

      const newCostCenter = await costCentersApi.createCostCenter(data)
      costCenters.value.unshift(newCostCenter)
      pagination.value.total += 1

      return newCostCenter
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create cost center'
      console.error('Error creating cost center:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCostCenter = async (id: string, data: CostCenterFormData): Promise<CostCenter> => {
    try {
      loading.value = true
      error.value = null

      const updatedCostCenter = await costCentersApi.updateCostCenter(id, data)

      // Update in cost centers list
      const index = costCenters.value.findIndex((center) => center.id === id)
      if (index !== -1) {
        costCenters.value[index] = updatedCostCenter
      }

      // Update current cost center if it's the one being edited
      if (currentCostCenter.value?.id === id) {
        currentCostCenter.value = updatedCostCenter
      }

      return updatedCostCenter
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update cost center'
      console.error('Error updating cost center:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCostCenter = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await costCentersApi.deleteCostCenter(id)

      // Remove from cost centers list
      const index = costCenters.value.findIndex((center) => center.id === id)
      if (index !== -1) {
        costCenters.value.splice(index, 1)
        pagination.value.total -= 1
      }

      // Clear current cost center if it's the one being deleted
      if (currentCostCenter.value?.id === id) {
        currentCostCenter.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete cost center'
      console.error('Error deleting cost center:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const validateCostCenter = async (
    data: CostCenterFormData,
  ): Promise<CostCenterValidationResult> => {
    try {
      const result = await costCentersApi.validateCostCenter(data)
      return result
    } catch (err) {
      console.error('Error validating cost center:', err)
      return {
        isValid: false,
        errors: ['Validation failed'],
        warnings: [],
      }
    }
  }

  const fetchCostCenterHierarchy = async () => {
    try {
      const hierarchy = await costCentersApi.getCostCenterHierarchy()
      costCenterHierarchy.value = hierarchy
    } catch (err) {
      console.error('Error fetching cost center hierarchy:', err)
    }
  }

  const fetchCostCenterStats = async (period?: string, fiscalYear?: string) => {
    try {
      const costStats = await costCentersApi.getCostCenterStats(period, fiscalYear)
      stats.value = costStats
    } catch (err) {
      console.error('Error fetching cost center stats:', err)
    }
  }

  const copyCostCenter = async (id: string): Promise<CostCenter> => {
    try {
      loading.value = true
      error.value = null

      const copiedCostCenter = await costCentersApi.copyCostCenter(id)
      costCenters.value.unshift(copiedCostCenter)
      pagination.value.total += 1

      return copiedCostCenter
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy cost center'
      console.error('Error copying cost center:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const toggleCostCenterStatus = async (id: string, status: string): Promise<CostCenter> => {
    try {
      loading.value = true
      error.value = null

      const updatedCostCenter = await costCentersApi.toggleCostCenterStatus(id, status)

      // Update in cost centers list
      const index = costCenters.value.findIndex((center) => center.id === id)
      if (index !== -1) {
        costCenters.value[index] = updatedCostCenter
      }

      // Update current cost center if it's the one being viewed
      if (currentCostCenter.value?.id === id) {
        currentCostCenter.value = updatedCostCenter
      }

      return updatedCostCenter
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to toggle cost center status'
      console.error('Error toggling cost center status:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Cost Allocations
  const fetchCostAllocations = async (
    page?: number,
    pageSize?: number,
    newFilters?: CostAllocationFilters,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize
      if (newFilters) allocationFilters.value = { ...allocationFilters.value, ...newFilters }

      const response = await costAllocationsApi.getCostAllocations(
        pagination.value.page,
        pagination.value.pageSize,
        allocationFilters.value,
      )

      costAllocations.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch cost allocations'
      console.error('Error fetching cost allocations:', err)
    } finally {
      loading.value = false
    }
  }

  const createCostAllocation = async (data: CostAllocationFormData): Promise<CostAllocation> => {
    try {
      loading.value = true
      error.value = null

      const newAllocation = await costAllocationsApi.createCostAllocation(data)
      costAllocations.value.unshift(newAllocation)
      pagination.value.total += 1

      return newAllocation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create cost allocation'
      console.error('Error creating cost allocation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCostAllocation = async (
    id: string,
    data: CostAllocationFormData,
  ): Promise<CostAllocation> => {
    try {
      loading.value = true
      error.value = null

      const updatedAllocation = await costAllocationsApi.updateCostAllocation(id, data)

      // Update in allocations list
      const index = costAllocations.value.findIndex((allocation) => allocation.id === id)
      if (index !== -1) {
        costAllocations.value[index] = updatedAllocation
      }

      // Update current allocation if it's the one being edited
      if (currentAllocation.value?.id === id) {
        currentAllocation.value = updatedAllocation
      }

      return updatedAllocation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update cost allocation'
      console.error('Error updating cost allocation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCostAllocation = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await costAllocationsApi.deleteCostAllocation(id)

      // Remove from allocations list
      const index = costAllocations.value.findIndex((allocation) => allocation.id === id)
      if (index !== -1) {
        costAllocations.value.splice(index, 1)
        pagination.value.total -= 1
      }

      // Clear current allocation if it's the one being deleted
      if (currentAllocation.value?.id === id) {
        currentAllocation.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete cost allocation'
      console.error('Error deleting cost allocation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postCostAllocation = async (id: string): Promise<CostAllocation> => {
    try {
      loading.value = true
      error.value = null

      const postedAllocation = await costAllocationsApi.postCostAllocation(id)

      // Update in allocations list
      const index = costAllocations.value.findIndex((allocation) => allocation.id === id)
      if (index !== -1) {
        costAllocations.value[index] = postedAllocation
      }

      // Update current allocation if it's the one being viewed
      if (currentAllocation.value?.id === id) {
        currentAllocation.value = postedAllocation
      }

      return postedAllocation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post cost allocation'
      console.error('Error posting cost allocation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const runAutomaticAllocation = async (
    period: string,
    fiscalYear: string,
  ): Promise<CostAllocation[]> => {
    try {
      loading.value = true
      error.value = null

      const allocations = await costAllocationsApi.runAutomaticAllocation(period, fiscalYear)

      // Refresh allocations list
      await fetchCostAllocations()

      return allocations
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to run automatic allocation'
      console.error('Error running automatic allocation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Profit Centers
  const fetchProfitCenters = async (page?: number, pageSize?: number, costCenterId?: string) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize

      const response = await profitCentersApi.getProfitCenters(
        pagination.value.page,
        pagination.value.pageSize,
        costCenterId,
      )

      profitCenters.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch profit centers'
      console.error('Error fetching profit centers:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Cost Analysis
  const fetchCostAnalysis = async (
    page?: number,
    pageSize?: number,
    costCenterId?: string,
    period?: string,
    fiscalYear?: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize

      const response = await costAnalysisApi.getCostAnalysis(
        pagination.value.page,
        pagination.value.pageSize,
        costCenterId,
        period,
        fiscalYear,
      )

      costAnalysis.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch cost analysis'
      console.error('Error fetching cost analysis:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Cost Drivers
  const fetchCostDrivers = async (costCenterId?: string) => {
    try {
      const drivers = await costDriversApi.getCostDrivers(costCenterId)
      costDrivers.value = drivers
    } catch (err) {
      console.error('Error fetching cost drivers:', err)
    }
  }

  // Utility Actions
  const clearError = () => {
    error.value = null
  }

  const resetCurrentCostCenter = () => {
    currentCostCenter.value = null
  }

  const resetCurrentAllocation = () => {
    currentAllocation.value = null
  }

  const resetFilters = () => {
    filters.value = {}
    allocationFilters.value = {}
  }

  const resetPagination = () => {
    pagination.value = {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
    }
  }

  return {
    // State
    costCenters,
    costAllocations,
    profitCenters,
    costAnalysis,
    costDrivers,
    currentCostCenter,
    currentAllocation,
    currentProfitCenter,
    costCenterHierarchy,
    loading,
    error,
    pagination,
    filters,
    allocationFilters,
    stats,

    // Computed
    activeCostCenters,
    inactiveCostCenters,
    allocatedCostCenters,
    unallocatedCostCenters,
    costCentersByType,
    costCentersByStatus,
    postedAllocations,
    draftAllocations,
    allocationsByMethod,
    costCenterTypes,
    costCenterStatuses,
    allocationMethods,
    costDriverTypes,

    // Actions - Cost Centers
    fetchCostCenters,
    fetchCostCenter,
    createCostCenter,
    updateCostCenter,
    deleteCostCenter,
    validateCostCenter,
    fetchCostCenterHierarchy,
    fetchCostCenterStats,
    copyCostCenter,
    toggleCostCenterStatus,

    // Actions - Cost Allocations
    fetchCostAllocations,
    createCostAllocation,
    updateCostAllocation,
    deleteCostAllocation,
    postCostAllocation,
    runAutomaticAllocation,

    // Actions - Profit Centers
    fetchProfitCenters,

    // Actions - Cost Analysis
    fetchCostAnalysis,

    // Actions - Cost Drivers
    fetchCostDrivers,

    // Utility Actions
    clearError,
    resetCurrentCostCenter,
    resetCurrentAllocation,
    resetFilters,
    resetPagination,
  }
})
