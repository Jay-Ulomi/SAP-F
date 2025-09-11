import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { leadApi } from '../api'
import type { Lead, LeadFormData, LeadFilters, LeadStats, LeadPagination } from '../types'
import { LeadStatus, LeadPriority, LeadSource } from '../types'

export const useLeadStore = defineStore('lead', () => {
  const leads = ref<Lead[]>([])
  const currentLead = ref<Lead | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<LeadStats | null>(null)
  const pagination = ref<LeadPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<LeadFilters>({})

  const newLeads = computed(() => leads.value.filter((l) => l.status === LeadStatus.NEW))
  const qualifiedLeads = computed(() =>
    leads.value.filter((l) => l.status === LeadStatus.QUALIFIED),
  )
  const convertedLeads = computed(() =>
    leads.value.filter((l) => l.status === LeadStatus.CONVERTED),
  )

  const leadsByPriority = computed(() => {
    const grouped: Record<LeadPriority, Lead[]> = {
      [LeadPriority.LOW]: [],
      [LeadPriority.MEDIUM]: [],
      [LeadPriority.HIGH]: [],
      [LeadPriority.CRITICAL]: [],
    }
    leads.value.forEach((l) => grouped[l.priority]?.push(l))
    return grouped
  })

  const leadsBySource = computed(() => {
    const grouped: Record<LeadSource, Lead[]> = {
      [LeadSource.WEBSITE]: [],
      [LeadSource.REFERRAL]: [],
      [LeadSource.COLD_CALL]: [],
      [LeadSource.TRADE_SHOW]: [],
      [LeadSource.SOCIAL_MEDIA]: [],
      [LeadSource.EMAIL_CAMPAIGN]: [],
      [LeadSource.PARTNER]: [],
      [LeadSource.OTHER]: [],
    }
    leads.value.forEach((l) => grouped[l.source]?.push(l))
    return grouped
  })

  const loadLeads = async (page = 1, limit = 10, newFilters?: LeadFilters) => {
    try {
      loading.value = true
      error.value = null
      if (newFilters) filters.value = newFilters
      const res = await leadApi.getLeads(page, limit, filters.value)
      leads.value = res.leads
      pagination.value = res.pagination
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load leads'
    } finally {
      loading.value = false
    }
  }

  const loadLeadById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      currentLead.value = await leadApi.getLeadById(id)
      return currentLead.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load lead'
      return null
    } finally {
      loading.value = false
    }
  }

  const createLead = async (data: LeadFormData) => {
    try {
      loading.value = true
      error.value = null
      const errs = leadApi.validateLead(data)
      if (errs.length) {
        error.value = errs.join(', ')
        return null
      }
      const lead = await leadApi.createLead(data)
      leads.value.unshift(lead)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      return lead
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create lead'
      return null
    } finally {
      loading.value = false
    }
  }

  const updateLead = async (id: string, data: Partial<LeadFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updated = await leadApi.updateLead(id, data)
      if (updated) {
        const idx = leads.value.findIndex((l) => l.id === id)
        if (idx !== -1) leads.value[idx] = updated
        if (currentLead.value?.id === id) currentLead.value = updated
      }
      return updated
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update lead'
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteLead = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      const ok = await leadApi.deleteLead(id)
      if (ok) {
        leads.value = leads.value.filter((l) => l.id !== id)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
        if (currentLead.value?.id === id) currentLead.value = null
      }
      return ok
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete lead'
      return false
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    try {
      loading.value = true
      error.value = null
      stats.value = await leadApi.getLeadStats()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load stats'
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: LeadFilters) => {
    filters.value = newFilters
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const clearError = () => (error.value = null)

  return {
    leads,
    currentLead,
    loading,
    error,
    stats,
    pagination,
    filters,
    newLeads,
    qualifiedLeads,
    convertedLeads,
    leadsByPriority,
    leadsBySource,
    loadLeads,
    loadLeadById,
    createLead,
    updateLead,
    deleteLead,
    loadStats,
    setFilters,
    setPage,
    clearError,
  }
})
