// Opportunity Status Enum
export enum OpportunityStatus {
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
  ON_HOLD = 'ON_HOLD',
}

// Opportunity Type Enum
export enum OpportunityType {
  NEW_BUSINESS = 'NEW_BUSINESS',
  EXISTING_BUSINESS = 'EXISTING_BUSINESS',
  UPSELL = 'UPSELL',
  CROSS_SELL = 'CROSS_SELL',
  RENEWAL = 'RENEWAL',
  PARTNERSHIP = 'PARTNERSHIP',
}

// Opportunity Stage Enum
export enum OpportunityStage {
  DISCOVERY = 'DISCOVERY',
  QUALIFICATION = 'QUALIFICATION',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSING = 'CLOSING',
  CLOSED = 'CLOSED',
}

// Opportunity Priority Enum
export enum OpportunityPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Opportunity Source Enum
export enum OpportunitySource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  COLD_CALL = 'COLD_CALL',
  TRADE_SHOW = 'TRADE_SHOW',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  EMAIL_CAMPAIGN = 'EMAIL_CAMPAIGN',
  PARTNER = 'PARTNER',
  EXISTING_CUSTOMER = 'EXISTING_CUSTOMER',
  OTHER = 'OTHER',
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

// Opportunity Contact Interface
export interface OpportunityContact {
  id: string
  contactId: string
  contactName: string
  contactEmail: string
  contactPhone: string
  role: 'DECISION_MAKER' | 'INFLUENCER' | 'END_USER' | 'TECHNICAL_EVALUATOR' | 'ECONOMIC_BUYER'
  influence: 'HIGH' | 'MEDIUM' | 'LOW'
  notes?: string
}

// Opportunity Product Interface
export interface OpportunityProduct {
  id: string
  productId: string
  productName: string
  productCode: string
  quantity: number
  unitPrice: number
  discount: number
  totalPrice: number
  currency: Currency
  notes?: string
}

// Opportunity Activity Interface
export interface OpportunityActivity {
  id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'DEMO' | 'PROPOSAL' | 'FOLLOW_UP'
  subject: string
  description?: string
  date: Date
  duration: number // in minutes
  outcome: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  nextAction?: string
  nextActionDate?: Date
  notes?: string
}

// Opportunity Financial Interface
export interface OpportunityFinancial {
  totalValue: number
  currency: Currency
  probability: number // percentage
  expectedRevenue: number
  actualRevenue: number
  costOfSale: number
  grossProfit: number
  netProfit: number
  discount: number
  notes?: string
}

// Opportunity Timeline Interface
export interface OpportunityTimeline {
  discoveryDate?: Date
  qualificationDate?: Date
  proposalDate?: Date
  negotiationStartDate?: Date
  expectedCloseDate: Date
  actualCloseDate?: Date
  estimatedDuration: number // in days
  actualDuration?: number // in days
  notes?: string
}

// Main Opportunity Interface
export interface Opportunity {
  id: string
  opportunityCode: string
  title: string
  description?: string
  status: OpportunityStatus
  type: OpportunityType
  stage: OpportunityStage
  priority: OpportunityPriority
  source: OpportunitySource
  customerId: string
  customerName: string
  customerType: 'EXISTING' | 'PROSPECT' | 'PARTNER'
  assignedTo: string
  contacts: OpportunityContact[]
  products: OpportunityProduct[]
  activities: OpportunityActivity[]
  financial: OpportunityFinancial
  timeline: OpportunityTimeline
  tags: string[]
  notes?: string
  attachments: string[]
  relatedOpportunities: string[]
  createdAt: Date
  updatedAt: Date
  closedAt?: Date
  wonAt?: Date
  lostAt?: Date
}

// Opportunity Form Data Interface
export interface OpportunityFormData {
  opportunityCode: string
  title: string
  description?: string
  status: OpportunityStatus
  type: OpportunityType
  stage: OpportunityStage
  priority: OpportunityPriority
  source: OpportunitySource
  customerId: string
  customerName: string
  customerType: 'EXISTING' | 'PROSPECT' | 'PARTNER'
  assignedTo: string
  contacts: OpportunityContact[]
  products: OpportunityProduct[]
  tags: string[]
  notes?: string
}

// Opportunity Filters Interface
export interface OpportunityFilters {
  search?: string
  status?: OpportunityStatus
  type?: OpportunityType
  stage?: OpportunityStage
  priority?: OpportunityPriority
  source?: OpportunitySource
  assignedTo?: string
  customerType?: 'EXISTING' | 'PROSPECT' | 'PARTNER'
  dateFrom?: Date
  dateTo?: Date
  tags?: string[]
  minValue?: number
  maxValue?: number
}

// Opportunity Statistics Interface
export interface OpportunityStats {
  totalOpportunities: number
  openOpportunities: number
  closedWonOpportunities: number
  closedLostOpportunities: number
  totalPipelineValue: number
  weightedPipelineValue: number
  averageDealSize: number
  averageSalesCycle: number
  winRate: number
  conversionRate: number
  opportunitiesThisMonth: number
  opportunitiesThisQuarter: number
  opportunitiesThisYear: number
}

// Opportunity Pagination Interface
export interface OpportunityPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
