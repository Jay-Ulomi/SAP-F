import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { leadApi } from '../api'
import type { Lead, LeadFormData, LeadFilters, LeadStats, LeadPagination } from '../types'
import { LeadStatus, LeadSource, LeadPriority, LeadType } from '../types'

export const useLeadStore = defineStore('leads', () => {
  // State
  const leads = ref<Lead[]>([])
  const currentLead = ref<Lead | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<LeadStats | null>(null)

  // Pagination
  const pagination = ref<LeadPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<LeadFilters>({})

  // Computed Properties
  const leadsByStatus = computed(() => {
    const grouped: Record<LeadStatus, Lead[]> = {
      [LeadStatus.NEW]: [],
      [LeadStatus.CONTACTED]: [],
      [LeadStatus.QUALIFIED]: [],
      [LeadStatus.PROPOSAL_SENT]: [],
      [LeadStatus.NEGOTIATION]: [],
      [LeadStatus.WON]: [],
      [LeadStatus.LOST]: [],
      [LeadStatus.DISQUALIFIED]: [],
    }

    leads.value.forEach((lead) => {
      grouped[lead.status].push(lead)
    })

    return grouped
  })

  const leadsBySource = computed(() => {
    const grouped: Record<LeadSource, Lead[]> = {
      [LeadSource.WEBSITE]: [],
      [LeadSource.REFERRAL]: [],
      [LeadSource.TRADE_SHOW]: [],
      [LeadSource.SOCIAL_MEDIA]: [],
      [LeadSource.EMAIL_CAMPAIGN]: [],
      [LeadSource.COLD_CALL]: [],
      [LeadSource.PARTNER]: [],
      [LeadSource.ADVERTISING]: [],
      [LeadSource.OTHER]: [],
    }

    leads.value.forEach((lead) => {
      grouped[lead.source].push(lead)
    })

    return grouped
  })

  const leadsByPriority = computed(() => {
    const grouped: Record<LeadPriority, Lead[]> = {
      [LeadPriority.LOW]: [],
      [LeadPriority.MEDIUM]: [],
      [LeadPriority.HIGH]: [],
      [LeadPriority.URGENT]: [],
    }

    leads.value.forEach((lead) => {
      grouped[lead.priority].push(lead)
    })

    return grouped
  })

  const leadsByType = computed(() => {
    const grouped: Record<LeadType, Lead[]> = {
      [LeadType.PROSPECT]: [],
      [LeadType.POTENTIAL_CUSTOMER]: [],
      [LeadType.EXISTING_CUSTOMER]: [],
      [LeadType.PARTNER]: [],
    }

    leads.value.forEach((lead) => {
      grouped[lead.type].push(lead)
    })

    return grouped
  })

  const newLeads = computed(() => leads.value.filter((lead) => lead.status === LeadStatus.NEW))

  const qualifiedLeads = computed(() =>
    leads.value.filter((lead) => lead.status === LeadStatus.QUALIFIED),
  )

  const leadsWithFollowUp = computed(() => leads.value.filter((lead) => lead.nextFollowUpDate))

  const totalEstimatedValue = computed(() =>
    leads.value.reduce((sum, lead) => sum + lead.financial.estimatedValue, 0),
  )

  const averageProbability = computed(() => {
    if (leads.value.length === 0) return 0
    const total = leads.value.reduce((sum, lead) => sum + lead.financial.probability, 0)
    return total / leads.value.length
  })

  const newLeadsThisMonth = computed(() => {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return leads.value.filter((lead) => new Date(lead.createdAt) >= thisMonth).length
  })

  const urgentLeads = computed(() =>
    leads.value.filter((lead) => lead.priority === LeadPriority.URGENT),
  )

  const highValueLeads = computed(() =>
    leads.value.filter((lead) => lead.financial.estimatedValue >= 50000),
  )

  // Actions
  const loadLeads = async (newFilters?: LeadFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await leadApi.getLeads(filters.value, {
        page: pagination.value.page,
        limit: pagination.value.limit,
      })

      leads.value = response.data
      pagination.value.total = response.total
      pagination.value.totalPages = Math.ceil(response.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load leads'
      console.error('Error loading leads:', err)
    } finally {
      loading.value = false
    }
  }

  const loadLead = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const lead = await leadApi.getLead(id)
      currentLead.value = lead
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load lead'
      console.error('Error loading lead:', err)
    } finally {
      loading.value = false
    }
  }

  const createLead = async (data: LeadFormData) => {
    try {
      loading.value = true
      error.value = null

      const newLead = await leadApi.createLead(data)
      leads.value.unshift(newLead)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newLead
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create lead'
      console.error('Error creating lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateLead = async (id: string, data: Partial<LeadFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedLead = await leadApi.updateLead(id, data)

      // Update in leads array
      const index = leads.value.findIndex((lead) => lead.id === id)
      if (index !== -1) {
        leads.value[index] = updatedLead
      }

      // Update current lead if it's the one being edited
      if (currentLead.value?.id === id) {
        currentLead.value = updatedLead
      }

      return updatedLead
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update lead'
      console.error('Error updating lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteLead = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await leadApi.deleteLead(id)

      // Remove from leads array
      const index = leads.value.findIndex((lead) => lead.id === id)
      if (index !== -1) {
        leads.value.splice(index, 1)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      // Clear current lead if it's the one being deleted
      if (currentLead.value?.id === id) {
        currentLead.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete lead'
      console.error('Error deleting lead:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadLeadStats = async () => {
    try {
      const leadStats = await leadApi.getLeadStats()
      stats.value = leadStats
    } catch (err) {
      console.error('Error loading lead stats:', err)
    }
  }

  const convertLeadToCustomer = async (leadId: string) => {
    try {
      loading.value = true
      error.value = null

      const result = await leadApi.convertLeadToCustomer(leadId)

      if (result.success) {
        // Update lead status to won
        const lead = leads.value.find((l) => l.id === leadId)
        if (lead) {
          lead.status = LeadStatus.WON
          lead.updatedAt = new Date().toISOString()
        }
      }

      return result
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to convert lead to customer'
      console.error('Error converting lead to customer:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const scheduleFollowUp = async (leadId: string, followUpDate: string, notes?: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedLead = await leadApi.scheduleFollowUp(leadId, followUpDate, notes)

      // Update in leads array
      const index = leads.value.findIndex((lead) => lead.id === leadId)
      if (index !== -1) {
        leads.value[index] = updatedLead
      }

      // Update current lead if it's the one being updated
      if (currentLead.value?.id === leadId) {
        currentLead.value = updatedLead
      }

      return updatedLead
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to schedule follow-up'
      console.error('Error scheduling follow-up:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const setPageSize = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    pagination.value.totalPages = Math.ceil(pagination.value.total / limit)
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page += 1
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page -= 1
    }
  }

  // Filter actions
  const setFilters = (newFilters: LeadFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentLead = () => {
    currentLead.value = null
  }

  return {
    // State
    leads,
    currentLead,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    leadsByStatus,
    leadsBySource,
    leadsByPriority,
    leadsByType,
    newLeads,
    qualifiedLeads,
    leadsWithFollowUp,
    totalEstimatedValue,
    averageProbability,
    newLeadsThisMonth,
    urgentLeads,
    highValueLeads,

    // Actions
    loadLeads,
    loadLead,
    createLead,
    updateLead,
    deleteLead,
    loadLeadStats,
    convertLeadToCustomer,
    scheduleFollowUp,

    // Pagination
    setPage,
    setPageSize,
    nextPage,
    previousPage,

    // Filters
    setFilters,
    clearFilters,
    resetPagination,

    // Utility
    clearError,
    clearCurrentLead,
  }
})
