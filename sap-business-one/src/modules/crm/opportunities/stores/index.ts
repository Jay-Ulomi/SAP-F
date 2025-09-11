import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { opportunityApi } from '../api'
import type {
  Opportunity,
  OpportunityFormData,
  OpportunityFilters,
  OpportunityStats,
  OpportunityPagination,
} from '../types'
import { OpportunityStatus, OpportunityType, OpportunityStage, OpportunityPriority } from '../types'

export const useOpportunityStore = defineStore('opportunity', () => {
  // State
  const opportunities = ref<Opportunity[]>([])
  const currentOpportunity = ref<Opportunity | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<OpportunityStats | null>(null)
  const pagination = ref<OpportunityPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<OpportunityFilters>({})

  // Computed properties
  const opportunitiesByStatus = computed(() => {
    const grouped: Record<OpportunityStatus, Opportunity[]> = {
      [OpportunityStatus.LEAD]: [],
      [OpportunityStatus.QUALIFIED]: [],
      [OpportunityStatus.PROPOSAL]: [],
      [OpportunityStatus.NEGOTIATION]: [],
      [OpportunityStatus.CLOSED_WON]: [],
      [OpportunityStatus.CLOSED_LOST]: [],
      [OpportunityStatus.ON_HOLD]: [],
    }

    opportunities.value.forEach((opportunity) => {
      grouped[opportunity.status].push(opportunity)
    })

    return grouped
  })

  const opportunitiesByStage = computed(() => {
    const grouped: Record<OpportunityStage, Opportunity[]> = {
      [OpportunityStage.DISCOVERY]: [],
      [OpportunityStage.QUALIFICATION]: [],
      [OpportunityStage.PROPOSAL]: [],
      [OpportunityStage.NEGOTIATION]: [],
      [OpportunityStage.CLOSING]: [],
      [OpportunityStage.CLOSED]: [],
    }

    opportunities.value.forEach((opportunity) => {
      grouped[opportunity.stage].push(opportunity)
    })

    return grouped
  })

  const opportunitiesByType = computed(() => {
    const grouped: Record<OpportunityType, Opportunity[]> = {
      [OpportunityType.NEW_BUSINESS]: [],
      [OpportunityType.EXISTING_BUSINESS]: [],
      [OpportunityType.UPSELL]: [],
      [OpportunityType.CROSS_SELL]: [],
      [OpportunityType.RENEWAL]: [],
      [OpportunityType.PARTNERSHIP]: [],
    }

    opportunities.value.forEach((opportunity) => {
      grouped[opportunity.type].push(opportunity)
    })

    return grouped
  })

  const openOpportunities = computed(() =>
    opportunities.value.filter(
      (opportunity) =>
        opportunity.status !== OpportunityStatus.CLOSED_WON &&
        opportunity.status !== OpportunityStatus.CLOSED_LOST,
    ),
  )

  const closedWonOpportunities = computed(() =>
    opportunities.value.filter(
      (opportunity) => opportunity.status === OpportunityStatus.CLOSED_WON,
    ),
  )

  const closedLostOpportunities = computed(() =>
    opportunities.value.filter(
      (opportunity) => opportunity.status === OpportunityStatus.CLOSED_LOST,
    ),
  )

  const highPriorityOpportunities = computed(() =>
    opportunities.value.filter(
      (opportunity) =>
        opportunity.priority === OpportunityPriority.HIGH ||
        opportunity.priority === OpportunityPriority.CRITICAL,
    ),
  )

  const opportunitiesThisMonth = computed(() => {
    const now = new Date()
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    return opportunities.value.filter((opportunity) => opportunity.createdAt >= oneMonthAgo)
  })

  const opportunitiesThisQuarter = computed(() => {
    const now = new Date()
    const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
    return opportunities.value.filter((opportunity) => opportunity.createdAt >= threeMonthsAgo)
  })

  const totalPipelineValue = computed(() =>
    opportunities.value.reduce((sum, opportunity) => sum + opportunity.financial.totalValue, 0),
  )

  const weightedPipelineValue = computed(() =>
    opportunities.value.reduce(
      (sum, opportunity) =>
        sum + (opportunity.financial.totalValue * opportunity.financial.probability) / 100,
      0,
    ),
  )

  // Actions
  const loadOpportunities = async () => {
    try {
      loading.value = true
      error.value = null

      const result = await opportunityApi.getOpportunities(
        pagination.value.page,
        pagination.value.limit,
        filters.value,
      )

      opportunities.value = result.opportunities
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load opportunities'
      console.error('Error loading opportunities:', err)
    } finally {
      loading.value = false
    }
  }

  const createOpportunity = async (data: OpportunityFormData) => {
    try {
      loading.value = true
      error.value = null

      const newOpportunity = await opportunityApi.createOpportunity(data)
      opportunities.value.unshift(newOpportunity)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return newOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create opportunity'
      console.error('Error creating opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateOpportunity = async (id: string, data: Partial<OpportunityFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedOpportunity = await opportunityApi.updateOpportunity(id, data)

      const index = opportunities.value.findIndex((o) => o.id === id)
      if (index !== -1) {
        opportunities.value[index] = updatedOpportunity
      }

      if (currentOpportunity.value?.id === id) {
        currentOpportunity.value = updatedOpportunity
      }

      return updatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update opportunity'
      console.error('Error updating opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteOpportunity = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await opportunityApi.deleteOpportunity(id)

      const index = opportunities.value.findIndex((o) => o.id === id)
      if (index !== -1) {
        opportunities.value.splice(index, 1)
      }

      if (currentOpportunity.value?.id === id) {
        currentOpportunity.value = null
      }

      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete opportunity'
      console.error('Error deleting opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateOpportunity = async (
    id: string,
    newOpportunityCode: string,
    newTitle: string,
    newCustomerName: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedOpportunity = await opportunityApi.duplicateOpportunity(
        id,
        newOpportunityCode,
        newTitle,
        newCustomerName,
      )
      opportunities.value.unshift(duplicatedOpportunity)

      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return duplicatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate opportunity'
      console.error('Error duplicating opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadOpportunityStats = async () => {
    try {
      loading.value = true
      error.value = null

      const opportunityStats = await opportunityApi.getOpportunityStats()
      stats.value = opportunityStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load opportunity statistics'
      console.error('Error loading opportunity statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Business logic actions
  const advanceStage = async (id: string, newStage: OpportunityStage) => {
    try {
      loading.value = true
      error.value = null

      const advancedOpportunity = await opportunityApi.advanceStage(id, newStage)

      const index = opportunities.value.findIndex((o) => o.id === id)
      if (index !== -1) {
        opportunities.value[index] = advancedOpportunity
      }

      if (currentOpportunity.value?.id === id) {
        currentOpportunity.value = advancedOpportunity
      }

      return advancedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to advance opportunity stage'
      console.error('Error advancing opportunity stage:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const closeOpportunity = async (id: string, won: boolean) => {
    try {
      loading.value = true
      error.value = null

      const closedOpportunity = await opportunityApi.closeOpportunity(id, won)

      const index = opportunities.value.findIndex((o) => o.id === id)
      if (index !== -1) {
        opportunities.value[index] = closedOpportunity
      }

      if (currentOpportunity.value?.id === id) {
        currentOpportunity.value = closedOpportunity
      }

      return closedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close opportunity'
      console.error('Error closing opportunity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadOpportunities()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadOpportunities()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadOpportunities()
    }
  }

  // Filter actions
  const setFilters = (newFilters: OpportunityFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadOpportunities()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadOpportunities()
  }

  return {
    // State
    opportunities,
    currentOpportunity,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    opportunitiesByStatus,
    opportunitiesByStage,
    opportunitiesByType,
    openOpportunities,
    closedWonOpportunities,
    closedLostOpportunities,
    highPriorityOpportunities,
    opportunitiesThisMonth,
    opportunitiesThisQuarter,
    totalPipelineValue,
    weightedPipelineValue,

    // Actions
    loadOpportunities,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    duplicateOpportunity,
    loadOpportunityStats,
    advanceStage,
    closeOpportunity,

    // Pagination
    nextPage,
    previousPage,
    goToPage,

    // Filters
    setFilters,
    clearFilters,
  }
})
