export enum PaymentStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  POSTED = 'POSTED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

export enum PaymentMethod {
  CASH = 'CASH',
  CHECK = 'CHECK',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  PAYPAL = 'PAYPAL',
  OTHER = 'OTHER',
}

export enum PaymentType {
  CUSTOMER_PAYMENT = 'CUSTOMER_PAYMENT',
  ADVANCE_PAYMENT = 'ADVANCE_PAYMENT',
  PARTIAL_PAYMENT = 'PARTIAL_PAYMENT',
  FULL_PAYMENT = 'FULL_PAYMENT',
  REFUND = 'REFUND',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
}

export enum TaxType {
  SALES_TAX = 'SALES_TAX',
  VAT = 'VAT',
  GST = 'GST',
  EXEMPT = 'EXEMPT',
}

export interface Customer {
  code: string
  name: string
  contactPerson?: string
  email?: string
  phone?: string
  address: CustomerAddress
}

export interface CustomerAddress {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
}

export interface PaymentLineItem {
  id: string
  invoiceId: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  originalAmount: number
  openAmount: number
  paymentAmount: number
  discountAmount: number
  taxAmount: number
  lineTotal: number
  remarks?: string
}

export interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

export interface IncomingPayment {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  paymentDate: string
  postingDate: string
  method: PaymentMethod
  type: PaymentType
  status: PaymentStatus

  // Customer Information
  customerCode: string
  customerName: string
  customerAddress: CustomerAddress
  contactPerson?: string

  // Financial Information
  currency: Currency
  exchangeRate: number
  totalAmount: number
  discountTotal: number
  taxTotal: number
  netAmount: number

  // Line Items
  lineItems: PaymentLineItem[]

  // Tax Information
  taxSummary: TaxSummary[]

  // Additional Information
  reference?: string
  remarks?: string
  project?: string
  salesPerson?: string

  // Payment Details
  checkNumber?: string
  bankAccount?: string
  bankCode?: string
  transactionId?: string
  authorizationCode?: string
  cardType?: string
  cardLastFour?: string

  // System Fields
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt: string

  // Document References
  relatedInvoices?: string[]
  relatedOrders?: string[]
  relatedReturns?: string[]

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

export interface IncomingPaymentFormData {
  customerCode: string
  paymentDate: string
  postingDate: string
  method: PaymentMethod
  type: PaymentType
  currency: Currency
  exchangeRate: number
  reference?: string
  remarks?: string
  project?: string
  salesPerson?: string
  checkNumber?: string
  bankAccount?: string
  bankCode?: string
  transactionId?: string
  authorizationCode?: string
  cardType?: string
  cardLastFour?: string
  lineItems: Omit<PaymentLineItem, 'id' | 'lineTotal'>[]
}

export interface IncomingPaymentResponse {
  success: boolean
  data: IncomingPayment
  message?: string
}

export interface IncomingPaymentListResponse {
  success: boolean
  data: IncomingPayment[]
  total: number
  page: number
  limit: number
  message?: string
}

export interface IncomingPaymentStatsResponse {
  success: boolean
  data: {
    total: number
    draft: number
    open: number
    posted: number
    cancelled: number
    closed: number
    totalAmount: number
    averageAmount: number
    collectionRate: number
  }
  message?: string
}

export interface IncomingPaymentFilters {
  status?: PaymentStatus[]
  method?: PaymentMethod[]
  type?: PaymentType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface IncomingPaymentValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Removed duplicate export - these are already exported from shared types

// All types are already exported above
