import type {
  Campaign,
  CampaignFormData,
  CampaignFilters,
  CampaignStats,
  CampaignPagination,
} from '../types'
import {
  CampaignStatus,
  CampaignType,
  CampaignObjective,
  CampaignChannel,
  Currency,
} from '../types'

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Email Campaign 2024',
    description: 'Promotional campaign for summer products and services',
    type: CampaignType.EMAIL,
    objective: CampaignObjective.SALES,
    status: CampaignStatus.ACTIVE,
    channels: [CampaignChannel.EMAIL, CampaignChannel.FACEBOOK],
    targetAudience: {
      id: 'ta1',
      name: 'Summer Shoppers',
      description: 'Customers interested in summer products',
      criteria: {
        interests: ['summer', 'outdoor', 'vacation'],
        demographics: ['18-45', 'active lifestyle'],
      },
      estimatedSize: 50000,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    content: [
      {
        id: 'c1',
        type: 'EMAIL',
        title: 'Summer Sale - Up to 50% Off!',
        content: 'Discover amazing summer deals on outdoor gear and vacation essentials...',
        callToAction: 'Shop Now',
        version: 1,
        isActive: true,
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
      },
    ],
    schedule: {
      id: 's1',
      campaignId: '1',
      startDate: new Date('2024-06-01'),
      endDate: new Date('2024-08-31'),
      timeZone: 'UTC',
      frequency: 'WEEKLY',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    budget: {
      id: 'b1',
      campaignId: '1',
      totalBudget: 25000,
      dailyBudget: 500,
      spentAmount: 8500,
      remainingAmount: 16500,
      currency: Currency.USD,
      budgetType: 'DAILY',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
    },
    metrics: [
      {
        id: 'm1',
        campaignId: '1',
        impressions: 125000,
        clicks: 12500,
        conversions: 1250,
        revenue: 62500,
        cost: 8500,
        roi: 7.35,
        ctr: 10.0,
        cpc: 0.68,
        cpm: 68.0,
        conversionRate: 10.0,
        date: new Date('2024-06-15'),
      },
    ],
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    owner: 'Sarah Johnson',
    team: ['Marketing Team', 'Design Team'],
    tags: ['summer', 'email', 'promotion'],
    isActive: true,
    requiresApproval: true,
    approvalStatus: 'APPROVED',
    approvalDate: new Date('2024-05-25'),
    approvedBy: 'Marketing Manager',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-15'),
    launchedAt: new Date('2024-06-01'),
  },
]

// Campaign API service
export const campaignApi = {
  // Get all campaigns with pagination and filters
  async getCampaigns(
    page: number = 1,
    limit: number = 10,
    filters?: CampaignFilters,
  ): Promise<{ campaigns: Campaign[]; pagination: CampaignPagination }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    let filteredCampaigns = [...mockCampaigns]

    // Apply filters
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) =>
            campaign.name.toLowerCase().includes(searchLower) ||
            campaign.description?.toLowerCase().includes(searchLower) ||
            campaign.owner.toLowerCase().includes(searchLower) ||
            campaign.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
        )
      }

      if (filters.status && filters.status.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          filters.status!.includes(campaign.status),
        )
      }

      if (filters.type && filters.type.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          filters.type!.includes(campaign.type),
        )
      }

      if (filters.objective && filters.objective.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          filters.objective!.includes(campaign.objective),
        )
      }

      if (filters.channel && filters.channel.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          campaign.channels.some((channel) => filters.channel!.includes(channel)),
        )
      }

      if (filters.owner && filters.owner.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          filters.owner!.includes(campaign.owner),
        )
      }

      if (filters.dateRange) {
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) =>
            campaign.startDate >= filters.dateRange!.start &&
            (!campaign.endDate || campaign.endDate <= filters.dateRange!.end),
        )
      }

      if (filters.budgetRange) {
        filteredCampaigns = filteredCampaigns.filter(
          (campaign) =>
            campaign.budget.totalBudget >= filters.budgetRange!.min &&
            campaign.budget.totalBudget <= filters.budgetRange!.max,
        )
      }

      if (filters.tags && filters.tags.length > 0) {
        filteredCampaigns = filteredCampaigns.filter((campaign) =>
          campaign.tags.some((tag) => filters.tags!.includes(tag)),
        )
      }
    }

    // Calculate pagination
    const total = filteredCampaigns.length
    const totalPages = Math.ceil(total / limit)
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex)

    return {
      campaigns: paginatedCampaigns,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    }
  },

  // Get campaign by ID
  async getCampaignById(id: string): Promise<Campaign | null> {
    await new Promise((resolve) => setTimeout(resolve, 200))
    return mockCampaigns.find((campaign) => campaign.id === id) || null
  },

  // Create new campaign
  async createCampaign(data: CampaignFormData): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const newCampaign: Campaign = {
      id: `campaign_${Date.now()}`,
      name: data.name,
      description: data.description,
      type: data.type,
      objective: data.objective,
      status: data.status,
      channels: data.channels,
      targetAudience: {
        id: `ta_${Date.now()}`,
        name: data.targetAudience.name,
        description: data.targetAudience.description,
        criteria: data.targetAudience.criteria,
        estimatedSize: data.targetAudience.estimatedSize,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      content: data.content.map((content, index) => ({
        id: `c_${Date.now()}_${index}`,
        type: content.type,
        title: content.title,
        content: content.content,
        mediaUrls: content.mediaUrls,
        callToAction: content.callToAction,
        version: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      schedule: {
        id: `s_${Date.now()}`,
        campaignId: `campaign_${Date.now()}`,
        startDate: data.schedule.startDate,
        endDate: data.schedule.endDate,
        timeZone: data.schedule.timeZone,
        frequency: data.schedule.frequency,
        customSchedule: data.schedule.customSchedule,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      budget: {
        id: `b_${Date.now()}`,
        campaignId: `campaign_${Date.now()}`,
        totalBudget: data.budget.totalBudget,
        dailyBudget: data.budget.dailyBudget,
        spentAmount: 0,
        remainingAmount: data.budget.totalBudget,
        currency: data.budget.currency,
        budgetType: data.budget.budgetType,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      metrics: [],
      startDate: data.schedule.startDate,
      endDate: data.schedule.endDate,
      owner: data.owner,
      team: data.team,
      tags: data.tags,
      isActive: data.status === CampaignStatus.ACTIVE,
      requiresApproval: data.requiresApproval,
      approvalStatus: data.requiresApproval ? 'PENDING' : 'APPROVED',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockCampaigns.push(newCampaign)
    return newCampaign
  },

  // Update campaign
  async updateCampaign(id: string, data: Partial<CampaignFormData>): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const campaignIndex = mockCampaigns.findIndex((campaign) => campaign.id === id)
    if (campaignIndex === -1) {
      throw new Error('Campaign not found')
    }

    const existingCampaign = mockCampaigns[campaignIndex]

    // Only update fields that are provided and maintain existing structure
    const updatedCampaign: Campaign = {
      ...existingCampaign,
      ...(data.name && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.type && { type: data.type }),
      ...(data.objective && { objective: data.objective }),
      ...(data.status && { status: data.status }),
      ...(data.channels && { channels: data.channels }),
      ...(data.owner && { owner: data.owner }),
      ...(data.team && { team: data.team }),
      ...(data.tags && { tags: data.tags }),
      ...(data.requiresApproval !== undefined && { requiresApproval: data.requiresApproval }),
      updatedAt: new Date(),
    }

    mockCampaigns[campaignIndex] = updatedCampaign
    return updatedCampaign
  },

  // Delete campaign
  async deleteCampaign(id: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaignIndex = mockCampaigns.findIndex((campaign) => campaign.id === id)
    if (campaignIndex === -1) {
      throw new Error('Campaign not found')
    }

    mockCampaigns.splice(campaignIndex, 1)
  },

  // Duplicate campaign
  async duplicateCampaign(id: string, newName: string, newDescription?: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500))

    const originalCampaign = mockCampaigns.find((campaign) => campaign.id === id)
    if (!originalCampaign) {
      throw new Error('Campaign not found')
    }

    const duplicatedCampaign: Campaign = {
      ...originalCampaign,
      id: `campaign_${Date.now()}`,
      name: newName,
      description: newDescription || originalCampaign.description,
      status: CampaignStatus.DRAFT,
      schedule: {
        ...originalCampaign.schedule,
        id: `s_${Date.now()}`,
        campaignId: `campaign_${Date.now()}`,
        startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      budget: {
        ...originalCampaign.budget,
        id: `b_${Date.now()}`,
        campaignId: `campaign_${Date.now()}`,
        spentAmount: 0,
        remainingAmount: originalCampaign.budget.totalBudget,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      metrics: [],
      startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      approvalStatus: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    mockCampaigns.push(duplicatedCampaign)
    return duplicatedCampaign
  },

  // Get campaign statistics
  async getCampaignStats(): Promise<CampaignStats> {
    await new Promise((resolve) => setTimeout(resolve, 200))

    const totalCampaigns = mockCampaigns.length
    const activeCampaigns = mockCampaigns.filter((c) => c.status === CampaignStatus.ACTIVE).length
    const draftCampaigns = mockCampaigns.filter((c) => c.status === CampaignStatus.DRAFT).length
    const completedCampaigns = mockCampaigns.filter(
      (c) => c.status === CampaignStatus.COMPLETED,
    ).length
    const pausedCampaigns = mockCampaigns.filter((c) => c.status === CampaignStatus.PAUSED).length

    const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget.totalBudget, 0)
    const totalSpent = mockCampaigns.reduce((sum, c) => sum + c.budget.spentAmount, 0)
    const averageROI =
      mockCampaigns.length > 0
        ? mockCampaigns.reduce((sum, c) => sum + (c.metrics[0]?.roi || 0), 0) / mockCampaigns.length
        : 0

    const totalImpressions = mockCampaigns.reduce(
      (sum, c) => sum + c.metrics.reduce((mSum, m) => mSum + m.impressions, 0),
      0,
    )
    const totalClicks = mockCampaigns.reduce(
      (sum, c) => sum + c.metrics.reduce((mSum, m) => mSum + m.clicks, 0),
      0,
    )
    const totalConversions = mockCampaigns.reduce(
      (sum, c) => sum + c.metrics.reduce((mSum, m) => mSum + m.conversions, 0),
      0,
    )

    const campaignsByType: Record<CampaignType, number> = {
      [CampaignType.EMAIL]: mockCampaigns.filter((c) => c.type === CampaignType.EMAIL).length,
      [CampaignType.SMS]: mockCampaigns.filter((c) => c.type === CampaignType.SMS).length,
      [CampaignType.SOCIAL_MEDIA]: mockCampaigns.filter((c) => c.type === CampaignType.SOCIAL_MEDIA)
        .length,
      [CampaignType.DIRECT_MAIL]: mockCampaigns.filter((c) => c.type === CampaignType.DIRECT_MAIL)
        .length,
      [CampaignType.TELEMARKETING]: mockCampaigns.filter(
        (c) => c.type === CampaignType.TELEMARKETING,
      ).length,
      [CampaignType.DIGITAL_ADS]: mockCampaigns.filter((c) => c.type === CampaignType.DIGITAL_ADS)
        .length,
      [CampaignType.EVENT]: mockCampaigns.filter((c) => c.type === CampaignType.EVENT).length,
      [CampaignType.WEBINAR]: mockCampaigns.filter((c) => c.type === CampaignType.WEBINAR).length,
      [CampaignType.OTHER]: mockCampaigns.filter((c) => c.type === CampaignType.OTHER).length,
    }

    const campaignsByStatus: Record<CampaignStatus, number> = {
      [CampaignStatus.DRAFT]: draftCampaigns,
      [CampaignStatus.ACTIVE]: activeCampaigns,
      [CampaignStatus.PAUSED]: pausedCampaigns,
      [CampaignStatus.COMPLETED]: completedCampaigns,
      [CampaignStatus.CANCELLED]: mockCampaigns.filter((c) => c.status === CampaignStatus.CANCELLED)
        .length,
      [CampaignStatus.SCHEDULED]: mockCampaigns.filter((c) => c.status === CampaignStatus.SCHEDULED)
        .length,
    }

    const campaignsByObjective: Record<CampaignObjective, number> = {
      [CampaignObjective.AWARENESS]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.AWARENESS,
      ).length,
      [CampaignObjective.CONSIDERATION]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.CONSIDERATION,
      ).length,
      [CampaignObjective.CONVERSION]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.CONVERSION,
      ).length,
      [CampaignObjective.RETENTION]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.RETENTION,
      ).length,
      [CampaignObjective.LOYALTY]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.LOYALTY,
      ).length,
      [CampaignObjective.LEAD_GENERATION]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.LEAD_GENERATION,
      ).length,
      [CampaignObjective.SALES]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.SALES,
      ).length,
      [CampaignObjective.BRAND_BUILDING]: mockCampaigns.filter(
        (c) => c.objective === CampaignObjective.BRAND_BUILDING,
      ).length,
    }

    return {
      totalCampaigns,
      activeCampaigns,
      draftCampaigns,
      completedCampaigns,
      pausedCampaigns,
      totalBudget,
      totalSpent,
      averageROI,
      totalImpressions,
      totalClicks,
      totalConversions,
      campaignsByType,
      campaignsByStatus,
      campaignsByObjective,
    }
  },

  // Business logic methods
  async activateCampaign(id: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaign = mockCampaigns.find((c) => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    if (campaign.status !== CampaignStatus.DRAFT && campaign.status !== CampaignStatus.PAUSED) {
      throw new Error('Campaign cannot be activated')
    }

    campaign.status = CampaignStatus.ACTIVE
    campaign.isActive = true
    campaign.updatedAt = new Date()
    campaign.launchedAt = new Date()

    return campaign
  },

  async pauseCampaign(id: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaign = mockCampaigns.find((c) => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    if (campaign.status !== CampaignStatus.ACTIVE) {
      throw new Error('Campaign cannot be paused')
    }

    campaign.status = CampaignStatus.PAUSED
    campaign.isActive = false
    campaign.updatedAt = new Date()

    return campaign
  },

  async completeCampaign(id: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaign = mockCampaigns.find((c) => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    if (campaign.status !== CampaignStatus.ACTIVE && campaign.status !== CampaignStatus.PAUSED) {
      throw new Error('Campaign cannot be completed')
    }

    campaign.status = CampaignStatus.COMPLETED
    campaign.isActive = false
    campaign.updatedAt = new Date()
    campaign.completedAt = new Date()

    return campaign
  },

  async approveCampaign(id: string, approvedBy: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaign = mockCampaigns.find((c) => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    if (campaign.approvalStatus !== 'PENDING') {
      throw new Error('Campaign is not pending approval')
    }

    campaign.approvalStatus = 'APPROVED'
    campaign.approvalDate = new Date()
    campaign.approvedBy = approvedBy
    campaign.updatedAt = new Date()

    return campaign
  },

  async rejectCampaign(id: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 300))

    const campaign = mockCampaigns.find((c) => c.id === id)
    if (!campaign) {
      throw new Error('Campaign not found')
    }

    if (campaign.approvalStatus !== 'PENDING') {
      throw new Error('Campaign is not pending approval')
    }

    campaign.approvalStatus = 'REJECTED'
    campaign.updatedAt = new Date()

    return campaign
  },
}
