// A/R Invoices Types and Interfaces

// Enums
export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  CANCELLED = 'CANCELLED',
  OVERDUE = 'OVERDUE',
}

export enum InvoiceType {
  STANDARD = 'STANDARD',
  PROFORMA = 'PROFORMA',
  RECURRING = 'RECURRING',
  ADVANCE = 'ADVANCE',
  RESERVE = 'RESERVE',
}

export enum PaymentTerms {
  IMMEDIATE = 'IMMEDIATE',
  NET_15 = 'NET_15',
  NET_30 = 'NET_30',
  NET_45 = 'NET_45',
  NET_60 = 'NET_60',
  NET_90 = 'NET_90',
  EOM = 'EOM', // End of Month
  COD = 'COD', // Cash on Delivery
}

export enum TaxType {
  INCLUDED = 'INCLUDED',
  EXCLUDED = 'EXCLUDED',
  EXEMPT = 'EXEMPT',
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
  paymentTerms: PaymentTerms
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

export interface InvoiceLineItem {
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
  warehouseCode?: string
  serialNumbers?: string[]
  batchNumbers?: string[]
}

export interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

export interface PaymentInfo {
  paymentMethod: string
  bankAccount?: string
  checkNumber?: string
  creditCardLast4?: string
  paymentDate?: string
  amount: number
}

// Main Interface
export interface ArInvoice {
  id: string
  docNum: string
  customerCode: string
  customerName: string
  customer: Customer
  invoiceDate: string
  dueDate: string
  postingDate: string
  status: InvoiceStatus
  type: InvoiceType
  currency: Currency
  exchangeRate: number

  // Line Items
  lineItems: InvoiceLineItem[]

  // Totals
  subtotal: number
  totalDiscount: number
  totalTax: number
  total: number
  paidAmount: number
  balance: number

  // Tax Information
  taxSummary: TaxSummary[]
  taxType: TaxType

  // Payment Information
  paymentTerms: PaymentTerms
  payments: PaymentInfo[]

  // Additional Information
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string

  // System Fields
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string

  // Document References
  baseDocumentType?: string
  baseDocumentNumber?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
}

// Form Data Interface
export interface ArInvoiceFormData {
  customerCode: string
  invoiceDate: string
  dueDate: string
  postingDate: string
  type: InvoiceType
  currency: Currency
  exchangeRate: number
  paymentTerms: PaymentTerms
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string

  lineItems: Omit<InvoiceLineItem, 'id' | 'lineTotal'>[]
}

// API Response Types
export interface ArInvoiceResponse {
  data: ArInvoice
  message: string
  success: boolean
}

export interface ArInvoiceListResponse {
  data: ArInvoice[]
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
  message: string
  success: boolean
}

export interface ArInvoiceStatsResponse {
  totalInvoices: number
  totalAmount: number
  paidAmount: number
  outstandingAmount: number
  overdueAmount: number
  averageInvoiceValue: number
  averagePaymentDays: number
  invoicesByStatus: Record<InvoiceStatus, number>
  invoicesByType: Record<InvoiceType, number>
  monthlyTrends: Array<{
    month: string
    invoices: number
    amount: number
  }>
}

// Filter and Search Types
export interface ArInvoiceFilters {
  status?: InvoiceStatus[]
  type?: InvoiceType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  amountFrom?: number
  amountTo?: number
  currency?: Currency[]
  overdue?: boolean
}

export interface ArInvoiceValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
  warnings: Record<string, string[]>
}

// Export types for components
export type {
  ArInvoice as default,
  ArInvoiceFormData,
  ArInvoiceFilters,
  Customer,
  InvoiceLineItem,
  TaxSummary,
  PaymentInfo,
}
