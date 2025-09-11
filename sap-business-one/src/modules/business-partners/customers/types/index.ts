export enum CustomerStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  BLOCKED = 'BLOCKED',
}

export enum CustomerType {
  REGULAR = 'REGULAR',
  PREMIUM = 'PREMIUM',
  WHOLESALE = 'WHOLESALE',
  RETAIL = 'RETAIL',
  DISTRIBUTOR = 'DISTRIBUTOR',
  RESELLER = 'RESELLER',
}

export enum PaymentTerms {
  IMMEDIATE = 'IMMEDIATE',
  NET_15 = 'NET_15',
  NET_30 = 'NET_30',
  NET_45 = 'NET_45',
  NET_60 = 'NET_60',
  NET_90 = 'NET_90',
  END_OF_MONTH = 'END_OF_MONTH',
  END_OF_QUARTER = 'END_OF_QUARTER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

export enum TaxExemption {
  NONE = 'NONE',
  EXEMPT = 'EXEMPT',
  PARTIAL = 'PARTIAL',
  RESELLER = 'RESELLER',
  GOVERNMENT = 'GOVERNMENT',
}

export interface CustomerAddress {
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

export interface CustomerContact {
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

export interface CustomerFinancial {
  creditLimit: number
  currentBalance: number
  availableCredit: number
  paymentTerms: PaymentTerms
  currency: Currency
  taxExemption: TaxExemption
  taxExemptionNumber?: string
  discountPercent: number
  lastPaymentDate?: string
  lastPaymentAmount?: number
}

export interface CustomerStatistics {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  lastOrderDate?: string
  daysSinceLastOrder: number
  returnRate: number
  customerLifetimeValue: number
}

export interface Customer {
  id: string
  customerCode: string
  customerName: string
  companyName?: string
  status: CustomerStatus
  type: CustomerType
  industry?: string
  website?: string
  phone: string
  email: string
  fax?: string

  // Addresses and Contacts
  addresses: CustomerAddress[]
  contacts: CustomerContact[]

  // Financial Information
  financial: CustomerFinancial

  // Statistics
  statistics: CustomerStatistics

  // Additional Information
  notes?: string
  tags: string[]
  assignedSalesRep?: string
  source?: string

  // Timestamps
  createdAt: string
  updatedAt: string
  lastActivityDate?: string
}

export interface CustomerFormData {
  customerCode: string
  customerName: string
  companyName?: string
  status: CustomerStatus
  type: CustomerType
  industry?: string
  website?: string
  phone: string
  email: string
  fax?: string

  // Addresses
  addresses: Omit<CustomerAddress, 'id'>[]

  // Contacts
  contacts: Omit<CustomerContact, 'id'>[]

  // Financial Information
  creditLimit: number
  currentBalance: number
  paymentTerms: PaymentTerms
  currency: Currency
  taxExemption: TaxExemption
  taxExemptionNumber?: string
  discountPercent: number

  // Additional Information
  notes?: string
  tags: string[]
  assignedSalesRep?: string
  source?: string
}

export interface CustomerFilters {
  search?: string
  status?: CustomerStatus[]
  type?: CustomerType[]
  industry?: string[]
  assignedSalesRep?: string[]
  source?: string[]
  hasOutstandingBalance?: boolean
  creditLimitRange?: {
    min: number
    max: number
  }
  lastActivityRange?: {
    from: string
    to: string
  }
  tags?: string[]
}

export interface CustomerStats {
  totalCustomers: number
  activeCustomers: number
  inactiveCustomers: number
  suspendedCustomers: number
  pendingApprovalCustomers: number
  blockedCustomers: number
  totalRevenue: number
  averageCreditLimit: number
  customersWithOutstandingBalance: number
  newCustomersThisMonth: number
  newCustomersThisQuarter: number
  newCustomersThisYear: number
}

export interface CustomerPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
