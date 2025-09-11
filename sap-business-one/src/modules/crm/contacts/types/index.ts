// Contact Status Enum
export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PROSPECT = 'PROSPECT',
  LEAD = 'LEAD',
  CANCELLED = 'CANCELLED'
}

// Contact Type Enum
export enum ContactType {
  INDIVIDUAL = 'INDIVIDUAL',
  CORPORATE = 'CORPORATE',
  PARTNER = 'PARTNER',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
  SUPPLIER = 'SUPPLIER'
}

// Contact Source Enum
export enum ContactSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  COLD_CALL = 'COLD_CALL',
  TRADE_SHOW = 'TRADE_SHOW',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  ADVERTISING = 'ADVERTISING',
  PARTNER = 'PARTNER',
  EXISTING_CONTACT = 'EXISTING_CONTACT',
  OTHER = 'OTHER'
}

// Contact Priority Enum
export enum ContactPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Contact Category Enum
export enum ContactCategory {
  SALES = 'SALES',
  MARKETING = 'MARKETING',
  SUPPORT = 'SUPPORT',
  PARTNER = 'PARTNER',
  VENDOR = 'VENDOR',
  CUSTOMER = 'CUSTOMER',
  OTHER = 'OTHER'
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
  CNY = 'CNY'
}

// Contact Address Interface
export interface ContactAddress {
  id: string
  type: 'BILLING' | 'SHIPPING' | 'BOTH'
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  isDefault: boolean
  isVerified: boolean
  verifiedAt?: Date
}

// Contact Communication Interface
export interface ContactCommunication {
  id: string
  type: 'EMAIL' | 'PHONE' | 'MOBILE' | 'FAX' | 'WEBSITE' | 'SOCIAL_MEDIA'
  value: string
  isPrimary: boolean
  isVerified: boolean
  verifiedAt?: Date
  notes?: string
}

// Contact Relationship Interface
export interface ContactRelationship {
  id: string
  type: 'CUSTOMER' | 'VENDOR' | 'PARTNER' | 'EMPLOYEE' | 'CONTRACTOR' | 'OTHER'
  entityId: string
  entityName: string
  entityType: string
  relationshipStrength: 'WEAK' | 'MODERATE' | 'STRONG'
  startDate: Date
  endDate?: Date
  notes?: string
}

// Contact Activity Interface
export interface ContactActivity {
  id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'VISIT' | 'QUOTE' | 'ORDER' | 'COMPLAINT' | 'SUPPORT'
  description: string
  date: Date
  assignedTo: string
  outcome?: string
  nextAction?: string
  nextActionDate?: Date
  notes?: string
}

// Contact Financial Interface
export interface ContactFinancial {
  creditLimit: number
  paymentTerms: string
  currency: Currency
  discountPercentage: number
  creditRating: 'A' | 'B' | 'C' | 'D' | 'E'
  outstandingBalance: number
  lastPaymentDate?: Date
  notes?: string
}

// Contact Statistics Interface
export interface ContactStatistics {
  totalInteractions: number
  lastInteractionDate?: Date
  daysSinceLastInteraction: number
  totalValue: number
  averageInteractionValue: number
  conversionRate: number
  lifetimeValue: number
  notes?: string
}

// Main Contact Interface
export interface Contact {
  id: string
  contactCode: string
  firstName: string
  lastName: string
  companyName?: string
  jobTitle?: string
  department?: string
  type: ContactType
  status: ContactStatus
  source: ContactSource
  priority: ContactPriority
  category: ContactCategory
  addresses: ContactAddress[]
  communications: ContactCommunication[]
  relationships: ContactRelationship[]
  activities: ContactActivity[]
  financial: ContactFinancial
  statistics: ContactStatistics
  website?: string
  description?: string
  notes?: string
  tags: string[]
  assignedTo: string
  leadScore: number
  nextFollowUpDate?: Date
  createdAt: Date
  updatedAt: Date
  convertedAt?: Date
  lastContactDate?: Date
}

// Contact Form Data Interface
export interface ContactFormData {
  contactCode: string
  firstName: string
  lastName: string
  companyName?: string
  jobTitle?: string
  department?: string
  type: ContactType
  status: ContactStatus
  source: ContactSource
  priority: ContactPriority
  category: ContactCategory
  addresses: ContactAddress[]
  communications: ContactCommunication[]
  website?: string
  description?: string
  notes?: string
  tags: string[]
  assignedTo: string
  leadScore: number
  nextFollowUpDate?: Date
}

// Contact Filters Interface
export interface ContactFilters {
  search?: string
  status?: ContactStatus
  type?: ContactType
  category?: ContactCategory
  priority?: ContactPriority
  source?: ContactSource
  assignedTo?: string
  tags?: string[]
  dateFrom?: Date
  dateTo?: Date
}

// Contact Statistics Interface
export interface ContactStats {
  totalContacts: number
  activeContacts: number
  prospectContacts: number
  leadContacts: number
  customerContacts: number
  vendorContacts: number
  partnerContacts: number
  highPriorityContacts: number
  contactsNeedingFollowUp: number
  averageLeadScore: number
  conversionRate: number
  totalValue: number
}

// Contact Pagination Interface
export interface ContactPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
