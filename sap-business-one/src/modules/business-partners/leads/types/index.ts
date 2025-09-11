export enum LeadStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  NEGOTIATION = 'NEGOTIATION',
  WON = 'WON',
  LOST = 'LOST',
  DISQUALIFIED = 'DISQUALIFIED',
}

export enum LeadSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  TRADE_SHOW = 'TRADE_SHOW',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  COLD_CALL = 'COLD_CALL',
  PARTNER = 'PARTNER',
  ADVERTISING = 'ADVERTISING',
  OTHER = 'OTHER',
}

export enum LeadPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum LeadType {
  PROSPECT = 'PROSPECT',
  POTENTIAL_CUSTOMER = 'POTENTIAL_CUSTOMER',
  EXISTING_CUSTOMER = 'EXISTING_CUSTOMER',
  PARTNER = 'PARTNER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

export interface LeadAddress {
  id: string
  type: 'BILLING' | 'SHIPPING' | 'BOTH'
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  phone?: string
  email?: string
}

export interface LeadContact {
  id: string
  firstName: string
  lastName: string
  position: string
  email: string
  phone: string
  mobile?: string
  isPrimary: boolean
  notes?: string
}

export interface LeadFinancial {
  estimatedValue: number
  currency: Currency
  probability: number
  expectedCloseDate?: string
  budget?: number
  decisionMaker?: string
}

export interface LeadActivity {
  id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'PROPOSAL' | 'FOLLOW_UP' | 'OTHER'
  subject: string
  description: string
  date: string
  assignedTo: string
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED'
  notes?: string
}

export interface Lead {
  id: string
  leadCode: string
  companyName: string
  leadName: string
  status: LeadStatus
  source: LeadSource
  priority: LeadPriority
  type: LeadType
  industry?: string
  website?: string
  phone: string
  email: string
  fax?: string

  // Addresses and Contacts
  addresses: LeadAddress[]
  contacts: LeadContact[]

  // Financial Information
  financial: LeadFinancial

  // Activities
  activities: LeadActivity[]

  // Additional Information
  notes?: string
  tags: string[]
  assignedSalesRep?: string
  assignedTo?: string
  campaign?: string

  // Timestamps
  createdAt: string
  updatedAt: string
  lastActivityDate?: string
  nextFollowUpDate?: string
}

export interface LeadFormData {
  leadCode: string
  companyName: string
  leadName: string
  status: LeadStatus
  source: LeadSource
  priority: LeadPriority
  type: LeadType
  industry?: string
  website?: string
  phone: string
  email: string
  fax?: string

  // Addresses
  addresses: Omit<LeadAddress, 'id'>[]

  // Contacts
  contacts: Omit<LeadContact, 'id'>[]

  // Financial Information
  estimatedValue: number
  currency: Currency
  probability: number
  expectedCloseDate?: string
  budget?: number
  decisionMaker?: string

  // Additional Information
  notes?: string
  tags: string[]
  assignedSalesRep?: string
  assignedTo?: string
  campaign?: string
  nextFollowUpDate?: string
}

export interface LeadFilters {
  search?: string
  status?: LeadStatus[]
  source?: LeadSource[]
  priority?: LeadPriority[]
  type?: LeadType[]
  industry?: string[]
  assignedSalesRep?: string[]
  assignedTo?: string[]
  campaign?: string[]
  hasFollowUp?: boolean
  estimatedValueRange?: {
    min: number
    max: number
  }
  expectedCloseDateRange?: {
    from: string
    to: string
  }
  tags?: string[]
}

export interface LeadStats {
  totalLeads: number
  newLeads: number
  contactedLeads: number
  qualifiedLeads: number
  proposalSentLeads: number
  negotiationLeads: number
  wonLeads: number
  lostLeads: number
  disqualifiedLeads: number
  totalEstimatedValue: number
  averageProbability: number
  leadsWithFollowUp: number
  newLeadsThisMonth: number
  newLeadsThisQuarter: number
  newLeadsThisYear: number
}

export interface LeadPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
