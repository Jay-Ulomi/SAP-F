// Credit Memos Types and Interfaces

// Enums
export enum FormType {
  ITEM = 'Item',
  SERVICE = 'Service',
}

export enum CreditMemoStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  APPLIED = 'APPLIED',
  CANCELLED = 'CANCELLED',
  PARTIALLY_APPLIED = 'PARTIALLY_APPLIED',
}

export enum CreditMemoType {
  CUSTOMER_RETURN = 'CUSTOMER_RETURN',
  PRICE_ADJUSTMENT = 'PRICE_ADJUSTMENT',
  QUANTITY_ADJUSTMENT = 'QUANTITY_ADJUSTMENT',
  SERVICE_CREDIT = 'SERVICE_CREDIT',
  PROMOTIONAL = 'PROMOTIONAL',
  OTHER = 'OTHER',
}

export enum CreditMemoReason {
  DAMAGED_GOODS = 'DAMAGED_GOODS',
  WRONG_ITEM = 'WRONG_ITEM',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  PRICE_ERROR = 'PRICE_ERROR',
  QUANTITY_ERROR = 'QUANTITY_ERROR',
  CUSTOMER_REQUEST = 'CUSTOMER_REQUEST',
  PROMOTIONAL_OFFER = 'PROMOTIONAL_OFFER',
  SERVICE_ISSUE = 'SERVICE_ISSUE',
  OTHER = 'OTHER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

// Base Interfaces
export interface Customer {
  id: string
  code: string
  name: string
  email?: string
  phone?: string
  address: CustomerAddress
  creditLimit: number
  balance: number
  currency: Currency
}

export interface CustomerAddress {
  street: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface BaseLineItem {
  id: string
  itemCode: string
  description: string
  quantity: number
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
  originalInvoiceId?: string
  originalInvoiceLineId?: string
  returnReason?: CreditMemoReason
}

export interface ItemLineItem extends BaseLineItem {
  itemType: 'INVENTORY'
  warehouseCode: string
  serialNumbers?: string[]
  batchNumbers?: string[]
  binLocation?: string
}

export interface ServiceLineItem extends BaseLineItem {
  itemType: 'SERVICE'
  serviceCategory?: string
  serviceDescription?: string
  billingMethod?: 'HOURLY' | 'FIXED' | 'MILESTONE'
}

export type CreditMemoLineItem = ItemLineItem | ServiceLineItem

export interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

export interface ApplicationInfo {
  invoiceId: string
  invoiceNumber: string
  appliedAmount: number
  appliedDate: string
  appliedBy: string
  notes?: string
}

// Main Interface
export interface CreditMemo {
  id: string
  docNum: string
  customerCode: string
  customerName: string
  customer: Customer
  creditMemoDate: string
  postingDate: string
  status: CreditMemoStatus
  type: CreditMemoType
  formType: FormType
  currency: Currency
  exchangeRate: number

  // Line Items
  lineItems: CreditMemoLineItem[]
  itemLineItems: ItemLineItem[]
  serviceLineItems: ServiceLineItem[]

  // Totals
  subtotal: number
  totalDiscount: number
  totalTax: number
  total: number
  appliedAmount: number
  remainingAmount: number

  // Tax Information
  taxSummary: TaxSummary[]

  // Application Information
  applications: ApplicationInfo[]

  // Additional Information
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  returnAuthorization?: string

  // System Fields
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string

  // Document References
  baseDocumentType?: string
  baseDocumentNumber?: string
  relatedInvoiceId?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
}

// Form Data Interface
export interface CreditMemoFormData {
  customerCode: string
  creditMemoDate: string
  postingDate: string
  type: CreditMemoType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  returnAuthorization?: string
  relatedInvoiceId?: string

  lineItems: Omit<CreditMemoLineItem, 'id' | 'lineTotal'>[]
}

// API Response Types
export interface CreditMemoResponse {
  data: CreditMemo
  message: string
  success: boolean
}

export interface CreditMemoListResponse {
  data: CreditMemo[]
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
  message: string
  success: boolean
}

export interface CreditMemoStatsResponse {
  totalCreditMemos: number
  totalAmount: number
  appliedAmount: number
  remainingAmount: number
  averageCreditMemoValue: number
  creditMemosByStatus: Record<CreditMemoStatus, number>
  creditMemosByType: Record<CreditMemoType, number>
  monthlyTrends: Array<{
    month: string
    creditMemos: number
    amount: number
  }>
}

// Filter and Search Types
export interface CreditMemoFilters {
  status?: CreditMemoStatus[]
  type?: CreditMemoType[]
  formType?: FormType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
  currency?: Currency[]
  unapplied?: boolean
}

export interface CreditMemoValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
  warnings: Record<string, string[]>
}

// Export types for components
export type {
  CreditMemo as default,
  CreditMemoFormData,
  CreditMemoFilters,
  Customer,
  BaseLineItem,
  ItemLineItem,
  ServiceLineItem,
  CreditMemoLineItem,
  TaxSummary,
  ApplicationInfo,
}
