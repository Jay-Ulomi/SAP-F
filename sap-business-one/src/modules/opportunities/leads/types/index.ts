// Lead Status Enum
export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  DISQUALIFIED = 'DISQUALIFIED',
  CONVERTED = 'CONVERTED',
  ON_HOLD = 'ON_HOLD',
}

// Lead Source Enum
export enum LeadSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  COLD_CALL = 'COLD_CALL',
  TRADE_SHOW = 'TRADE_SHOW',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  PARTNER = 'PARTNER',
  OTHER = 'OTHER',
}

// Lead Priority Enum
export enum LeadPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Lead Contact Interface
export interface LeadContact {
  id: string
  name: string
  email: string
  phone?: string
  title?: string
  notes?: string
}

// Lead Company Interface
export interface LeadCompany {
  name: string
  industry?: string
  size?: 'SMB' | 'MID_MARKET' | 'ENTERPRISE'
  website?: string
  country?: string
}

// Lead Activity Interface
export interface LeadActivity {
  id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'DEMO' | 'FOLLOW_UP'
  subject: string
  date: Date
  notes?: string
  outcome?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  nextAction?: string
  nextActionDate?: Date
}

// Lead Qualification Interface
export interface LeadQualification {
  budget?: 'YES' | 'NO' | 'UNKNOWN'
  authority?: 'YES' | 'NO' | 'UNKNOWN'
  need?: 'YES' | 'NO' | 'UNKNOWN'
  timeline?: 'IMMEDIATE' | 'SHORT_TERM' | 'MEDIUM_TERM' | 'LONG_TERM'
  score: number // 0 - 100
  notes?: string
}

// Main Lead Interface
export interface Lead {
  id: string
  leadCode: string
  title: string
  description?: string
  status: LeadStatus
  priority: LeadPriority
  source: LeadSource
  assignedTo: string
  company: LeadCompany
  contact: LeadContact
  activities: LeadActivity[]
  tags: string[]
  notes?: string
  createdAt: Date
  updatedAt: Date
  convertedAt?: Date
}

// Lead Form Data Interface
export interface LeadFormData {
  leadCode: string
  title: string
  description?: string
  status: LeadStatus
  priority: LeadPriority
  source: LeadSource
  assignedTo: string
  company: LeadCompany
  contact: LeadContact
  tags: string[]
  notes?: string
}

// Lead Filters Interface
export interface LeadFilters {
  search?: string
  status?: LeadStatus
  priority?: LeadPriority
  source?: LeadSource
  assignedTo?: string
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
}

// Lead Statistics Interface
export interface LeadStats {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  disqualifiedLeads: number
  convertedLeads: number
  conversionRate: number
}

// Lead Pagination Interface
export interface LeadPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
