// Campaign Status Enum
export enum CampaignStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
}

// Campaign Type Enum
export enum CampaignType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  DIRECT_MAIL = 'DIRECT_MAIL',
  TELEMARKETING = 'TELEMARKETING',
  DIGITAL_ADS = 'DIGITAL_ADS',
  EVENT = 'EVENT',
  WEBINAR = 'WEBINAR',
  OTHER = 'OTHER',
}

// Campaign Objective Enum
export enum CampaignObjective {
  AWARENESS = 'AWARENESS',
  CONSIDERATION = 'CONSIDERATION',
  CONVERSION = 'CONVERSION',
  RETENTION = 'RETENTION',
  LOYALTY = 'LOYALTY',
  LEAD_GENERATION = 'LEAD_GENERATION',
  SALES = 'SALES',
  BRAND_BUILDING = 'BRAND_BUILDING',
}

// Campaign Channel Enum
export enum CampaignChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  FACEBOOK = 'FACEBOOK',
  INSTAGRAM = 'INSTAGRAM',
  LINKEDIN = 'LINKEDIN',
  TWITTER = 'TWITTER',
  GOOGLE_ADS = 'GOOGLE_ADS',
  DIRECT_MAIL = 'DIRECT_MAIL',
  TELEPHONE = 'TELEPHONE',
  WEBSITE = 'WEBSITE',
  MOBILE_APP = 'MOBILE_APP',
}

// Currency Enum
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
  JPY = 'JPY',
  CHF = 'CHF',
  CNY = 'CNY',
}

// Campaign Target Audience Interface
export interface CampaignTargetAudience {
  id: string
  name: string
  description?: string
  criteria: {
    ageRange?: { min: number; max: number }
    location?: string[]
    interests?: string[]
    behavior?: string[]
    demographics?: string[]
  }
  estimatedSize: number
  createdAt: Date
  updatedAt: Date
}

// Campaign Content Interface
export interface CampaignContent {
  id: string
  type: 'EMAIL' | 'SMS' | 'SOCIAL_POST' | 'LANDING_PAGE' | 'BANNER'
  title: string
  content: string
  mediaUrls?: string[]
  callToAction?: string
  version: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Campaign Performance Metrics Interface
export interface CampaignMetrics {
  id: string
  campaignId: string
  impressions: number
  clicks: number
  conversions: number
  revenue: number
  cost: number
  roi: number
  ctr: number
  cpc: number
  cpm: number
  conversionRate: number
  date: Date
}

// Campaign Schedule Interface
export interface CampaignSchedule {
  id: string
  campaignId: string
  startDate: Date
  endDate?: Date
  timeZone: string
  frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
  customSchedule?: {
    daysOfWeek?: number[]
    timeOfDay?: string
    intervals?: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Campaign Budget Interface
export interface CampaignBudget {
  id: string
  campaignId: string
  totalBudget: number
  dailyBudget?: number
  spentAmount: number
  remainingAmount: number
  currency: Currency
  budgetType: 'TOTAL' | 'DAILY' | 'LIFETIME'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Campaign Interface
export interface Campaign {
  id: string
  name: string
  description?: string
  type: CampaignType
  objective: CampaignObjective
  status: CampaignStatus
  channels: CampaignChannel[]

  // Target Audience
  targetAudience: CampaignTargetAudience

  // Content
  content: CampaignContent[]

  // Schedule
  schedule: CampaignSchedule

  // Budget
  budget: CampaignBudget

  // Performance
  metrics: CampaignMetrics[]

  // Campaign Details
  startDate: Date
  endDate?: Date
  owner: string
  team: string[]
  tags: string[]

  // Settings
  isActive: boolean
  requiresApproval: boolean
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvalDate?: Date
  approvedBy?: string

  // Timestamps
  createdAt: Date
  updatedAt: Date
  launchedAt?: Date
  completedAt?: Date
}

// Campaign Form Data Interface
export interface CampaignFormData {
  name: string
  description?: string
  type: CampaignType
  objective: CampaignObjective
  status: CampaignStatus
  channels: CampaignChannel[]

  // Target Audience
  targetAudience: {
    name: string
    description?: string
    criteria: {
      ageRange?: { min: number; max: number }
      location?: string[]
      interests?: string[]
      behavior?: string[]
      demographics?: string[]
    }
    estimatedSize: number
  }

  // Content
  content: {
    type: 'EMAIL' | 'SMS' | 'SOCIAL_POST' | 'LANDING_PAGE' | 'BANNER'
    title: string
    content: string
    mediaUrls?: string[]
    callToAction?: string
  }[]

  // Schedule
  schedule: {
    startDate: Date
    endDate?: Date
    timeZone: string
    frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'CUSTOM'
    customSchedule?: {
      daysOfWeek?: number[]
      timeOfDay?: string
      intervals?: string
    }
  }

  // Budget
  budget: {
    totalBudget: number
    dailyBudget?: number
    currency: Currency
    budgetType: 'TOTAL' | 'DAILY' | 'LIFETIME'
  }

  // Campaign Details
  owner: string
  team: string[]
  tags: string[]
  requiresApproval: boolean
}

// Campaign Filters Interface
export interface CampaignFilters {
  search?: string
  status?: CampaignStatus[]
  type?: CampaignType[]
  objective?: CampaignObjective[]
  channel?: CampaignChannel[]
  owner?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  budgetRange?: {
    min: number
    max: number
  }
  tags?: string[]
}

// Campaign Statistics Interface
export interface CampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  draftCampaigns: number
  completedCampaigns: number
  pausedCampaigns: number
  totalBudget: number
  totalSpent: number
  averageROI: number
  totalImpressions: number
  totalClicks: number
  totalConversions: number
  campaignsByType: Record<CampaignType, number>
  campaignsByStatus: Record<CampaignStatus, number>
  campaignsByObjective: Record<CampaignObjective, number>
}

// Campaign Pagination Interface
export interface CampaignPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
