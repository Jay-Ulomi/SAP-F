import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { campaignApi } from '../api'
import type {
  Campaign,
  CampaignFormData,
  CampaignFilters,
  CampaignStats,
  CampaignPagination
} from '../types'
import { CampaignStatus, CampaignType, CampaignObjective, CampaignChannel } from '../types'

export const useCampaignStore = defineStore('campaign', () => {
  // State
  const campaigns = ref<Campaign[]>([])
  const currentCampaign = ref<Campaign | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CampaignStats | null>(null)
  const pagination = ref<CampaignPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<CampaignFilters>({})

  // Computed properties
  const campaignsByStatus = computed(() => {
    const grouped: Record<CampaignStatus, Campaign[]> = {
      [CampaignStatus.DRAFT]: [],
      [CampaignStatus.ACTIVE]: [],
      [CampaignStatus.PAUSED]: [],
      [CampaignStatus.COMPLETED]: [],
      [CampaignStatus.CANCELLED]: [],
      [CampaignStatus.SCHEDULED]: []
    }
    
    campaigns.value.forEach(campaign => {
      grouped[campaign.status].push(campaign)
    })
    
    return grouped
  })

  const campaignsByType = computed(() => {
    const grouped: Record<CampaignType, Campaign[]> = {
      [CampaignType.EMAIL]: [],
      [CampaignType.SMS]: [],
      [CampaignType.SOCIAL_MEDIA]: [],
      [CampaignType.DIRECT_MAIL]: [],
      [CampaignType.TELEMARKETING]: [],
      [CampaignType.DIGITAL_ADS]: [],
      [CampaignType.EVENT]: [],
      [CampaignType.WEBINAR]: [],
      [CampaignType.OTHER]: []
    }
    
    campaigns.value.forEach(campaign => {
      grouped[campaign.type].push(campaign)
    })
    
    return grouped
  })

  const campaignsByObjective = computed(() => {
    const grouped: Record<CampaignObjective, Campaign[]> = {
      [CampaignObjective.AWARENESS]: [],
      [CampaignObjective.CONSIDERATION]: [],
      [CampaignObjective.CONVERSION]: [],
      [CampaignObjective.RETENTION]: [],
      [CampaignObjective.LOYALTY]: [],
      [CampaignObjective.LEAD_GENERATION]: [],
      [CampaignObjective.SALES]: [],
      [CampaignObjective.BRAND_BUILDING]: []
    }
    
    campaigns.value.forEach(campaign => {
      grouped[campaign.objective].push(campaign)
    })
    
    return grouped
  })

  const activeCampaigns = computed(() => 
    campaigns.value.filter(campaign => campaign.status === CampaignStatus.ACTIVE)
  )

  const draftCampaigns = computed(() => 
    campaigns.value.filter(campaign => campaign.status === CampaignStatus.DRAFT)
  )

  const pendingApprovalCampaigns = computed(() => 
    campaigns.value.filter(campaign => campaign.approvalStatus === 'PENDING')
  )

  const highROICampaigns = computed(() => 
    campaigns.value.filter(campaign => {
      const latestMetrics = campaign.metrics[campaign.metrics.length - 1]
      return latestMetrics && latestMetrics.roi > 5
    })
  )

  // Actions
  const loadCampaigns = async () => {
    try {
      loading.value = true
      error.value = null
      
      const result = await campaignApi.getCampaigns(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )
      
      campaigns.value = result.campaigns
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load campaigns'
      console.error('Error loading campaigns:', err)
    } finally {
      loading.value = false
    }
  }

  const loadCampaignById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const campaign = await campaignApi.getCampaignById(id)
      if (campaign) {
        currentCampaign.value = campaign
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load campaign'
      console.error('Error loading campaign:', err)
    } finally {
      loading.value = false
    }
  }

  const createCampaign = async (data: CampaignFormData) => {
    try {
      loading.value = true
      error.value = null
      
      const newCampaign = await campaignApi.createCampaign(data)
      campaigns.value.unshift(newCampaign)
      
      // Update pagination
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return newCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create campaign'
      console.error('Error creating campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateCampaign = async (id: string, data: Partial<CampaignFormData>) => {
    try {
      loading.value = true
      error.value = null
      
      const updatedCampaign = await campaignApi.updateCampaign(id, data)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = updatedCampaign
      }
      
      // Update current campaign if it's the one being edited
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = updatedCampaign
      }
      
      return updatedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update campaign'
      console.error('Error updating campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteCampaign = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      await campaignApi.deleteCampaign(id)
      
      // Remove from campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value.splice(index, 1)
      }
      
      // Clear current campaign if it's the one being deleted
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = null
      }
      
      // Update pagination
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      
      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete campaign'
      console.error('Error deleting campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateCampaign = async (
    id: string,
    newName: string,
    newDescription?: string
  ) => {
    try {
      loading.value = true
      error.value = null
      
      const duplicatedCampaign = await campaignApi.duplicateCampaign(id, newName, newDescription)
      campaigns.value.unshift(duplicatedCampaign)
      
      // Update pagination
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return duplicatedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate campaign'
      console.error('Error duplicating campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadCampaignStats = async () => {
    try {
      loading.value = true
      error.value = null
      
      const campaignStats = await campaignApi.getCampaignStats()
      stats.value = campaignStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load campaign statistics'
      console.error('Error loading campaign statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Business logic actions
  const activateCampaign = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const activatedCampaign = await campaignApi.activateCampaign(id)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = activatedCampaign
      }
      
      // Update current campaign if it's the one being activated
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = activatedCampaign
      }
      
      return activatedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to activate campaign'
      console.error('Error activating campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const pauseCampaign = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const pausedCampaign = await campaignApi.pauseCampaign(id)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = pausedCampaign
      }
      
      // Update current campaign if it's the one being paused
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = pausedCampaign
      }
      
      return pausedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to pause campaign'
      console.error('Error pausing campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeCampaign = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const completedCampaign = await campaignApi.completeCampaign(id)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = completedCampaign
      }
      
      // Update current campaign if it's the one being completed
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = completedCampaign
      }
      
      return completedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete campaign'
      console.error('Error completing campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveCampaign = async (id: string, approvedBy: string) => {
    try {
      loading.value = true
      error.value = null
      
      const approvedCampaign = await campaignApi.approveCampaign(id, approvedBy)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = approvedCampaign
      }
      
      // Update current campaign if it's the one being approved
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = approvedCampaign
      }
      
      return approvedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve campaign'
      console.error('Error approving campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectCampaign = async (id: string, rejectedBy: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null
      
      const rejectedCampaign = await campaignApi.rejectCampaign(id, rejectedBy, reason)
      
      // Update in campaigns array
      const index = campaigns.value.findIndex(c => c.id === id)
      if (index !== -1) {
        campaigns.value[index] = rejectedCampaign
      }
      
      // Update current campaign if it's the one being rejected
      if (currentCampaign.value?.id === id) {
        currentCampaign.value = rejectedCampaign
      }
      
      return rejectedCampaign
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject campaign'
      console.error('Error rejecting campaign:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadCampaigns()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadCampaigns()
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadCampaigns()
    }
  }

  const setLimit = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    loadCampaigns()
  }

  // Filter actions
  const setFilters = (newFilters: CampaignFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadCampaigns()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadCampaigns()
  }

  const resetPagination = () => {
    pagination.value.page = 1
    loadCampaigns()
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentCampaign = () => {
    currentCampaign.value = null
  }

  return {
    // State
    campaigns,
    currentCampaign,
    loading,
    error,
    stats,
    pagination,
    filters,
    
    // Computed
    campaignsByStatus,
    campaignsByType,
    campaignsByObjective,
    activeCampaigns,
    draftCampaigns,
    pendingApprovalCampaigns,
    highROICampaigns,
    
    // Actions
    loadCampaigns,
    loadCampaignById,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    duplicateCampaign,
    loadCampaignStats,
    activateCampaign,
    pauseCampaign,
    completeCampaign,
    approveCampaign,
    rejectCampaign,
    
    // Pagination
    nextPage,
    previousPage,
    goToPage,
    setLimit,
    
    // Filters
    setFilters,
    clearFilters,
    resetPagination,
    
    // Utilities
    clearError,
    clearCurrentCampaign
  }
})
