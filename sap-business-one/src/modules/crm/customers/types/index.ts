// Customer Status Enum
export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PROSPECT = 'PROSPECT',
  LEAD = 'LEAD',
  CANCELLED = 'CANCELLED'
}

// Customer Type Enum
export enum CustomerType {
  INDIVIDUAL = 'INDIVIDUAL',
  CORPORATE = 'CORPORATE',
  SME = 'SME',
  ENTERPRISE = 'ENTERPRISE',
  PARTNER = 'PARTNER',
  DISTRIBUTOR = 'DISTRIBUTOR'
}

// Customer Industry Enum
export enum CustomerIndustry {
  TECHNOLOGY = 'TECHNOLOGY',
  HEALTHCARE = 'HEALTHCARE',
  FINANCE = 'FINANCE',
  MANUFACTURING = 'MANUFACTURING',
  RETAIL = 'RETAIL',
  EDUCATION = 'EDUCATION',
  CONSTRUCTION = 'CONSTRUCTION',
  TRANSPORTATION = 'TRANSPORTATION',
  ENERGY = 'ENERGY',
  TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
  OTHER = 'OTHER'
}

// Customer Source Enum
export enum CustomerSource {
  WEBSITE = 'WEBSITE',
  REFERRAL = 'REFERRAL',
  COLD_CALL = 'COLD_CALL',
  TRADE_SHOW = 'TRADE_SHOW',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  ADVERTISING = 'ADVERTISING',
  PARTNER = 'PARTNER',
  EXISTING_CUSTOMER = 'EXISTING_CUSTOMER',
  OTHER = 'OTHER'
}

// Customer Priority Enum
export enum CustomerPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
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

// Customer Address Interface
export interface CustomerAddress {
  id: string
  type: 'BILLING' | 'SHIPPING' | 'BOTH'
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
  isDefault: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Customer Contact Interface
export interface CustomerContact {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  mobile?: string
  position?: string
  department?: string
  isPrimary: boolean
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Customer Financial Interface
export interface CustomerFinancial {
  id: string
  creditLimit: number
  paymentTerms: string
  currency: Currency
  taxExemption: boolean
  taxExemptionNumber?: string
  discountPercentage: number
  creditRating: 'A' | 'B' | 'C' | 'D' | 'E'
  createdAt: Date
  updatedAt: Date
}

// Customer Statistics Interface
export interface CustomerStatistics {
  id: string
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  lastOrderDate?: Date
  lastOrderValue?: number
  totalInvoices: number
  outstandingBalance: number
  daysSinceLastOrder?: number
  createdAt: Date
  updatedAt: Date
}

// Customer Activity Interface
export interface CustomerActivity {
  id: string
  type: 'CALL' | 'EMAIL' | 'MEETING' | 'VISIT' | 'QUOTE' | 'ORDER' | 'COMPLAINT' | 'SUPPORT'
  description: string
  date: Date
  duration?: number
  outcome?: string
  nextAction?: string
  nextActionDate?: Date
  assignedTo: string
  createdAt: Date
  updatedAt: Date
}

// Customer Interface
export interface Customer {
  id: string
  customerCode: string
  name: string
  companyName?: string
  type: CustomerType
  status: CustomerStatus
  industry: CustomerIndustry
  source: CustomerSource
  priority: CustomerPriority
  
  // Contact Information
  primaryContact: CustomerContact
  contacts: CustomerContact[]
  
  // Addresses
  addresses: CustomerAddress[]
  
  // Financial Information
  financial: CustomerFinancial
  
  // Statistics
  statistics: CustomerStatistics
  
  // Activities
  activities: CustomerActivity[]
  
  // Additional Information
  website?: string
  description?: string
  notes?: string
  tags: string[]
  
  // CRM Fields
  assignedTo: string
  leadScore: number
  lastActivityDate?: Date
  nextFollowUpDate?: Date
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  convertedAt?: Date
  lastContactDate?: Date
}

// Customer Form Data Interface
export interface CustomerFormData {
  customerCode: string
  name: string
  companyName?: string
  type: CustomerType
  status: CustomerStatus
  industry: CustomerIndustry
  source: CustomerSource
  priority: CustomerPriority
  
  // Contact Information
  primaryContact: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    mobile?: string
    position?: string
    department?: string
  }
  
  // Addresses
  addresses: {
    type: 'BILLING' | 'SHIPPING' | 'BOTH'
    street: string
    city: string
    state?: string
    postalCode: string
    country: string
    isDefault: boolean
  }[]
  
  // Financial Information
  financial: {
    creditLimit: number
    paymentTerms: string
    currency: Currency
    taxExemption: boolean
    taxExemptionNumber?: string
    discountPercentage: number
    creditRating: 'A' | 'B' | 'C' | 'D' | 'E'
  }
  
  // Additional Information
  website?: string
  description?: string
  notes?: string
  tags: string[]
  assignedTo: string
  leadScore: number
}

// Customer Filters Interface
export interface CustomerFilters {
  search?: string
  status?: CustomerStatus[]
  type?: CustomerType[]
  industry?: CustomerIndustry[]
  source?: CustomerSource[]
  priority?: CustomerPriority[]
  assignedTo?: string[]
  dateRange?: {
    start: Date
    end: Date
  }
  creditRating?: string[]
  tags?: string[]
}

// Customer Statistics Interface
export interface CustomerStats {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  prospectCustomers: number
  leadCustomers: number
  totalRevenue: number
  averageRevenue: number
  customersByType: Record<CustomerType, number>
  customersByStatus: Record<CustomerStatus, number>
  customersByIndustry: Record<CustomerIndustry, number>
  customersByPriority: Record<CustomerPriority, number>
}

// Customer Pagination Interface
export interface CustomerPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
