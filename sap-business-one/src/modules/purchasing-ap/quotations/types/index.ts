// Purchase Quotations Types

export enum PurchaseQuotationStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  RECEIVED = 'RECEIVED',
  EVALUATED = 'EVALUATED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CONVERTED = 'CONVERTED',
  CANCELLED = 'CANCELLED',
}

export enum PurchaseQuotationType {
  MATERIAL = 'MATERIAL',
  SERVICE = 'SERVICE',
  ASSET = 'ASSET',
  EXPENSE = 'EXPENSE',
  CAPITAL = 'CAPITAL',
}

export enum QuotationPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
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

export interface Vendor {
  id: string
  code: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: VendorAddress
  currency: Currency
  taxCode: string
  active: boolean
}

export interface VendorAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface PurchaseQuotationLineItem {
  id: string
  itemCode: string
  itemName: string
  description: string
  quantity: number
  unitPrice: number
  taxCode: string
  taxPercent: number
  taxAmount: number
  lineTotal: number
  accountCode: string
  costCenter: string
  projectCode?: string
  warehouseCode?: string
  deliveryDate: string
  priority: QuotationPriority
  vendorNotes?: string
}

export interface PurchaseQuotation {
  id: string
  docNum: string
  docEntry: number
  quotationNumber: string
  quotationDate: string
  validUntil: string
  type: PurchaseQuotationType
  status: PurchaseQuotationStatus
  priority: QuotationPriority
  currency: Currency
  subtotal: number
  taxTotal: number
  totalAmount: number
  vendorCode: string
  vendorName: string
  vendorContact: string
  vendorEmail: string
  vendorPhone: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  evaluationNotes?: string
  evaluatedBy?: string
  evaluatedDate?: string
  approvedBy?: string
  approvedDate?: string
  convertedToOrder?: string
  convertedDate?: string
  lineItems: PurchaseQuotationLineItem[]
  createdAt: string
  updatedAt: string
}

export interface PurchaseQuotationFormData {
  quotationNumber: string
  quotationDate: string
  validUntil: string
  type: PurchaseQuotationType
  priority: QuotationPriority
  currency: Currency
  vendorCode: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  lineItems: Omit<PurchaseQuotationLineItem, 'id' | 'lineTotal' | 'taxAmount'>[]
}

export interface PurchaseQuotationFilters {
  status?: PurchaseQuotationStatus
  type?: PurchaseQuotationType
  priority?: QuotationPriority
  vendorCode?: string
  department?: string
  costCenter?: string
  projectCode?: string
  search?: string
  quotationDateFrom?: string
  quotationDateTo?: string
  validUntilFrom?: string
  validUntilTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface PurchaseQuotationStats {
  totalQuotations: number
  draftQuotations: number
  sentQuotations: number
  receivedQuotations: number
  evaluatedQuotations: number
  approvedQuotations: number
  totalAmount: number
  averageQuotationValue: number
  quotationsByStatus: { status: PurchaseQuotationStatus; count: number }[]
  quotationsByType: { type: PurchaseQuotationType; count: number }[]
  quotationsByVendor: { vendor: string; count: number; amount: number }[]
  quotationsByDepartment: { department: string; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface PurchaseQuotationPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

// API Response Types
export interface PurchaseQuotationResponse {
  data: PurchaseQuotation
  message: string
  success: boolean
}

export interface PurchaseQuotationListResponse {
  data: PurchaseQuotation[]
  pagination: PurchaseQuotationPagination
  message: string
  success: boolean
}

export interface PurchaseQuotationStatsResponse {
  data: PurchaseQuotationStats
  message: string
  success: boolean
}

export interface PurchaseQuotationValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}
