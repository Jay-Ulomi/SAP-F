import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { opportunityApi } from '../api'
import type {
  Opportunity,
  OpportunityFormData,
  OpportunityFilters,
  OpportunityStats,
  OpportunityPagination,
  OpportunityStatus,
  OpportunityStage,
  OpportunityType,
  OpportunityPriority,
  OpportunitySource
} from '../types'

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
    hasPrev: false
  })
  const filters = ref<OpportunityFilters>({})

  // Computed properties
  const openOpportunities = computed(() =>
    opportunities.value.filter(opp => 
      opp.status !== OpportunityStatus.CLOSED_WON && 
      opp.status !== OpportunityStatus.CLOSED_LOST
    )
  )

  const closedWonOpportunities = computed(() =>
    opportunities.value.filter(opp => opp.status === OpportunityStatus.CLOSED_WON)
  )

  const closedLostOpportunities = computed(() =>
    opportunities.value.filter(opp => opp.status === OpportunityStatus.CLOSED_LOST)
  )

  const opportunitiesByStage = computed(() => {
    const grouped: Record<OpportunityStage, Opportunity[]> = {
      [OpportunityStage.DISCOVERY]: [],
      [OpportunityStage.QUALIFICATION]: [],
      [OpportunityStage.PROPOSAL]: [],
      [OpportunityStage.NEGOTIATION]: [],
      [OpportunityStage.CLOSING]: [],
      [OpportunityStage.CLOSED]: []
    }

    opportunities.value.forEach(opp => {
      if (grouped[opp.stage]) {
        grouped[opp.stage].push(opp)
      }
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
      [OpportunityType.PARTNERSHIP]: []
    }

    opportunities.value.forEach(opp => {
      if (grouped[opp.type]) {
        grouped[opp.type].push(opp)
      }
    })

    return grouped
  })

  const opportunitiesByPriority = computed(() => {
    const grouped: Record<OpportunityPriority, Opportunity[]> = {
      [OpportunityPriority.LOW]: [],
      [OpportunityPriority.MEDIUM]: [],
      [OpportunityPriority.HIGH]: [],
      [OpportunityPriority.CRITICAL]: []
    }

    opportunities.value.forEach(opp => {
      if (grouped[opp.priority]) {
        grouped[opp.priority].push(opp)
      }
    })

    return grouped
  })

  const opportunitiesBySource = computed(() => {
    const grouped: Record<OpportunitySource, Opportunity[]> = {
      [OpportunitySource.WEBSITE]: [],
      [OpportunitySource.REFERRAL]: [],
      [OpportunitySource.COLD_CALL]: [],
      [OpportunitySource.TRADE_SHOW]: [],
      [OpportunitySource.SOCIAL_MEDIA]: [],
      [OpportunitySource.EMAIL_CAMPAIGN]: [],
      [OpportunitySource.PARTNER]: [],
      [OpportunitySource.EXISTING_CUSTOMER]: [],
      [OpportunitySource.OTHER]: []
    }

    opportunities.value.forEach(opp => {
      if (grouped[opp.source]) {
        grouped[opp.source].push(opp)
      }
    })

    return grouped
  })

  const totalPipelineValue = computed(() =>
    openOpportunities.value.reduce((sum, opp) => sum + opp.financial.totalValue, 0)
  )

  const weightedPipelineValue = computed(() =>
    openOpportunities.value.reduce((sum, opp) => 
      sum + (opp.financial.totalValue * opp.financial.probability / 100), 0
    )
  )

  const averageDealSize = computed(() => {
    if (opportunities.value.length === 0) return 0
    return opportunities.value.reduce((sum, opp) => sum + opp.financial.totalValue, 0) / opportunities.value.length
  })

  const winRate = computed(() => {
    const closed = closedWonOpportunities.value.length + closedLostOpportunities.value.length
    if (closed === 0) return 0
    return (closedWonOpportunities.value.length / closed) * 100
  })

  // Actions
  const loadOpportunities = async (page: number = 1, limit: number = 10, newFilters?: OpportunityFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = newFilters
      }

      const result = await opportunityApi.getOpportunities(page, limit, filters.value)
      opportunities.value = result.opportunities
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load opportunities'
      console.error('Error loading opportunities:', err)
    } finally {
      loading.value = false
    }
  }

  const loadOpportunityById = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const opportunity = await opportunityApi.getOpportunityById(id)
      currentOpportunity.value = opportunity
      return opportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load opportunity'
      console.error('Error loading opportunity:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createOpportunity = async (data: OpportunityFormData) => {
    try {
      loading.value = true
      error.value = null

      const validationErrors = opportunityApi.validateOpportunity(data)
      if (validationErrors.length > 0) {
        error.value = validationErrors.join(', ')
        return null
      }

      const newOpportunity = await opportunityApi.createOpportunity(data)
      opportunities.value.unshift(newOpportunity)
      
      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create opportunity'
      console.error('Error creating opportunity:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updateOpportunity = async (id: string, data: Partial<OpportunityFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedOpportunity = await opportunityApi.updateOpportunity(id, data)
      if (updatedOpportunity) {
        const index = opportunities.value.findIndex(opp => opp.id === id)
        if (index !== -1) {
          opportunities.value[index] = updatedOpportunity
        }
        
        if (currentOpportunity.value?.id === id) {
          currentOpportunity.value = updatedOpportunity
        }
      }

      return updatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update opportunity'
      console.error('Error updating opportunity:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteOpportunity = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const success = await opportunityApi.deleteOpportunity(id)
      if (success) {
        opportunities.value = opportunities.value.filter(opp => opp.id !== id)
        
        // Update pagination
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

        if (currentOpportunity.value?.id === id) {
          currentOpportunity.value = null
        }
      }

      return success
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete opportunity'
      console.error('Error deleting opportunity:', err)
      return false
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    try {
      loading.value = true
      error.value = null

      const statsData = await opportunityApi.getOpportunityStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load statistics'
      console.error('Error loading statistics:', err)
    } finally {
      loading.value = false
    }
  }

  const advanceStage = async (id: string, newStage: OpportunityStage) => {
    try {
      loading.value = true
      error.value = null

      const updatedOpportunity = await opportunityApi.advanceStage(id, newStage)
      if (updatedOpportunity) {
        const index = opportunities.value.findIndex(opp => opp.id === id)
        if (index !== -1) {
          opportunities.value[index] = updatedOpportunity
        }
        
        if (currentOpportunity.value?.id === id) {
          currentOpportunity.value = updatedOpportunity
        }
      }

      return updatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to advance stage'
      console.error('Error advancing stage:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const closeOpportunity = async (id: string, won: boolean) => {
    try {
      loading.value = true
      error.value = null

      const updatedOpportunity = await opportunityApi.closeOpportunity(id, won)
      if (updatedOpportunity) {
        const index = opportunities.value.findIndex(opp => opp.id === id)
        if (index !== -1) {
          opportunities.value[index] = updatedOpportunity
        }
        
        if (currentOpportunity.value?.id === id) {
          currentOpportunity.value = updatedOpportunity
        }
      }

      return updatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close opportunity'
      console.error('Error closing opportunity:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const duplicateOpportunity = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedOpportunity = await opportunityApi.duplicateOpportunity(id)
      if (duplicatedOpportunity) {
        opportunities.value.unshift(duplicatedOpportunity)
        
        // Update pagination
        pagination.value.total += 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      return duplicatedOpportunity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate opportunity'
      console.error('Error duplicating opportunity:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const setFilters = (newFilters: OpportunityFilters) => {
    filters.value = newFilters
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentOpportunity = () => {
    currentOpportunity.value = null
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
    openOpportunities,
    closedWonOpportunities,
    closedLostOpportunities,
    opportunitiesByStage,
    opportunitiesByType,
    opportunitiesByPriority,
    opportunitiesBySource,
    totalPipelineValue,
    weightedPipelineValue,
    averageDealSize,
    winRate,

    // Actions
    loadOpportunities,
    loadOpportunityById,
    createOpportunity,
    updateOpportunity,
    deleteOpportunity,
    loadStats,
    advanceStage,
    closeOpportunity,
    duplicateOpportunity,
    setPage,
    setFilters,
    clearError,
    resetCurrentOpportunity
  }
})
