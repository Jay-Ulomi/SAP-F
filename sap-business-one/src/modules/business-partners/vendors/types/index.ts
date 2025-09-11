// Vendor Master Data Types

export enum VendorStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  BLOCKED = 'BLOCKED',
}

export enum VendorType {
  SUPPLIER = 'SUPPLIER',
  SERVICE_PROVIDER = 'SERVICE_PROVIDER',
  CONTRACTOR = 'CONTRACTOR',
  DISTRIBUTOR = 'DISTRIBUTOR',
  MANUFACTURER = 'MANUFACTURER',
  WHOLESALER = 'WHOLESALER',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  JPY = 'JPY',
  CHF = 'CHF',
}

export enum TaxType {
  SALES_TAX = 'SALES_TAX',
  VAT = 'VAT',
  GST = 'GST',
  HST = 'HST',
  EXEMPT = 'EXEMPT',
}

export interface VendorAddress {
  id: string
  type: 'BILLING' | 'SHIPPING' | 'BOTH'
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  isDefault: boolean
  phone?: string
  fax?: string
}

export interface VendorContact {
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

export interface VendorFinancial {
  currency: Currency
  creditLimit: number
  currentBalance: number
  paymentTerms: string
  discountPercent: number
  taxCode: string
  taxPercent: number
  bankAccount?: string
  bankName?: string
  bankBranch?: string
  swiftCode?: string
  iban?: string
}

export interface VendorStatistics {
  totalOrders: number
  totalInvoices: number
  totalPayments: number
  averageOrderValue: number
  lastOrderDate?: string
  lastInvoiceDate?: string
  lastPaymentDate?: string
  onTimeDeliveryRate: number
  qualityRating: number
}

export interface Vendor {
  id: string
  code: string
  name: string
  type: VendorType
  status: VendorStatus
  taxId: string
  website?: string
  notes?: string

  // Contact Information
  primaryContact: VendorContact
  contacts: VendorContact[]

  // Addresses
  addresses: VendorAddress[]

  // Financial Information
  financial: VendorFinancial

  // Statistics
  statistics: VendorStatistics

  // Metadata
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface VendorFormData {
  code: string
  name: string
  type: VendorType
  status: VendorStatus
  taxId: string
  website?: string
  notes?: string

  // Contact Information
  primaryContact: Omit<VendorContact, 'id'>
  contacts: Omit<VendorContact, 'id'>[]

  // Addresses
  addresses: Omit<VendorAddress, 'id'>[]

  // Financial Information
  financial: VendorFinancial

  // Additional Details
  businessHours?: string
  industry?: string
  companySize?: string
  yearsInBusiness?: number
  specialRequirements?: string
  internalNotes?: string
}

export interface VendorFilters {
  status?: VendorStatus
  type?: VendorType
  currency?: Currency
  search?: string
  country?: string
  state?: string
  city?: string
  paymentTerms?: string
  creditLimitMin?: number
  creditLimitMax?: number
  currentBalanceMin?: number
  currentBalanceMax?: number
}

export interface VendorStats {
  totalVendors: number
  activeVendors: number
  inactiveVendors: number
  suspendedVendors: number
  blockedVendors: number
  totalCreditLimit: number
  totalCurrentBalance: number
  vendorsByStatus: { status: VendorStatus; count: number }[]
  vendorsByType: { type: VendorType; count: number }[]
  vendorsByCountry: { country: string; count: number }[]
  vendorsByCurrency: { currency: Currency; count: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface VendorPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

// API Response Types
export interface VendorResponse {
  data: Vendor
  message: string
  success: boolean
}

export interface VendorListResponse {
  data: Vendor[]
  pagination: VendorPagination
  message: string
  success: boolean
}

export interface VendorStatsResponse {
  data: VendorStats
  message: string
  success: boolean
}

export interface VendorValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}
