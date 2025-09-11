enum DunningLevel {
  LEVEL_1 = 'LEVEL_1',
  LEVEL_2 = 'LEVEL_2',
  LEVEL_3 = 'LEVEL_3',
  FINAL_NOTICE = 'FINAL_NOTICE',
  LEGAL_ACTION = 'LEGAL_ACTION',
}

enum DunningStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  ACKNOWLEDGED = 'ACKNOWLEDGED',
  PARTIAL_PAYMENT = 'PARTIAL_PAYMENT',
  FULL_PAYMENT = 'FULL_PAYMENT',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

enum DunningType {
  OVERDUE_INVOICE = 'OVERDUE_INVOICE',
  PARTIAL_PAYMENT = 'PARTIAL_PAYMENT',
  DISPUTED_AMOUNT = 'DISPUTED_AMOUNT',
  CREDIT_LIMIT_EXCEEDED = 'CREDIT_LIMIT_EXCEEDED',
  PAYMENT_TERMS_VIOLATION = 'PAYMENT_TERMS_VIOLATION',
}

enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
}

interface Customer {
  code: string
  name: string
  contactPerson?: string
  email?: string
  phone?: string
  address: CustomerAddress
  creditLimit: number
  paymentTerms: string
}

interface CustomerAddress {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
}

interface DunningLineItem {
  id: string
  invoiceId: string
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  originalAmount: number
  openAmount: number
  overdueDays: number
  dunningFee: number
  interestAmount: number
  totalAmount: number
  remarks?: string
}

interface Dunning {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  dunningDate: string
  postingDate: string
  level: DunningLevel
  type: DunningType
  status: DunningStatus

  // Customer Information
  customerCode: string
  customerName: string
  customerAddress: CustomerAddress
  contactPerson?: string

  // Financial Information
  currency: Currency
  exchangeRate: number
  subtotal: number
  dunningFees: number
  interestTotal: number
  totalAmount: number

  // Line Items
  lineItems: DunningLineItem[]

  // Dunning Information
  previousDunningId?: string
  nextDunningDate?: string
  escalationDate?: string
  legalActionDate?: string

  // Communication
  letterSentDate?: string
  letterSentBy?: string
  letterMethod?: 'EMAIL' | 'POST' | 'FAX' | 'COURIER'
  acknowledgmentDate?: string
  acknowledgmentNotes?: string

  // Additional Information
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string

  // System Fields
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt: string

  // Document References
  relatedInvoices?: string[]
  relatedPayments?: string[]
  relatedReturns?: string[]

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

export interface DunningFormData {
  customerCode: string
  dunningDate: string
  postingDate: string
  level: DunningLevel
  type: DunningType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  previousDunningId?: string
  nextDunningDate?: string
  escalationDate?: string
  legalActionDate?: string
  letterMethod?: 'EMAIL' | 'POST' | 'FAX' | 'COURIER'
  lineItems: Omit<DunningLineItem, 'id' | 'totalAmount'>
}

export interface DunningResponse {
  success: boolean
  data: Dunning
  message?: string
}

export interface DunningListResponse {
  success: boolean
  data: Dunning[]
  total: number
  page: number
  limit: number
  message?: string
}

export interface DunningStatsResponse {
  success: boolean
  data: {
    total: number
    draft: number
    sent: number
    acknowledged: number
    partialPayment: number
    fullPayment: number
    cancelled: number
    closed: number
    totalAmount: number
    averageAmount: number
    collectionRate: number
  }
  message?: string
}

export interface DunningFilters {
  status?: DunningStatus[]
  level?: DunningLevel[]
  type?: DunningType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface DunningValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export { DunningLevel, DunningStatus, DunningType, Currency }

export type {
  Customer,
  CustomerAddress,
  DunningLineItem,
  Dunning,
  DunningFormData,
  DunningResponse,
  DunningListResponse,
  DunningStatsResponse,
  DunningFilters,
  DunningValidationResult,
}
