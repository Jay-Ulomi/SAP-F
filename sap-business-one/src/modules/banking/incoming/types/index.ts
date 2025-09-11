// Payment Type Enums
export enum PaymentType {
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

export enum PaymentStatus {
  PENDING = 'PENDING',
  RECEIVED = 'RECEIVED',
  PROCESSING = 'PROCESSING',
  CLEARED = 'CLEARED',
  BOUNCED = 'BOUNCED',
  RETURNED = 'RETURNED',
  CANCELLED = 'CANCELLED',
  RECONCILED = 'RECONCILED',
}

export enum PaymentSource {
  CUSTOMER_PAYMENT = 'CUSTOMER_PAYMENT',
  REFUND = 'REFUND',
  INTEREST = 'INTEREST',
  DIVIDEND = 'DIVIDEND',
  LOAN_REPAYMENT = 'LOAN_REPAYMENT',
  INVESTMENT_RETURN = 'INVESTMENT_RETURN',
  OTHER_INCOME = 'OTHER_INCOME',
}

export enum BankAccountType {
  CHECKING = 'CHECKING',
  SAVINGS = 'SAVINGS',
  MONEY_MARKET = 'MONEY_MARKET',
  CERTIFICATE_OF_DEPOSIT = 'CERTIFICATE_OF_DEPOSIT',
  BUSINESS_CHECKING = 'BUSINESS_CHECKING',
  BUSINESS_SAVINGS = 'BUSINESS_SAVINGS',
}

// Core Interfaces
export interface BankAccount {
  id: string
  accountNumber: string
  accountName: string
  bankName: string
  bankCode: string
  accountType: BankAccountType
  currency: string
  balance: number
  availableBalance: number
  isActive: boolean
  lastReconciliationDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Customer {
  id: string
  customerCode: string
  customerName: string
  contactPerson?: string
  email?: string
  phone?: string
  address?: string
  creditLimit: number
  currentBalance: number
  paymentTerms: string
}

export interface Invoice {
  id: string
  invoiceNumber: string
  customerId: string
  customerName: string
  invoiceDate: Date
  dueDate: Date
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  status: 'OPEN' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE'
}

export interface IncomingPayment {
  id: string
  paymentNumber: string
  paymentDate: Date
  receivedDate: Date
  customerId: string
  customerName: string
  paymentType: PaymentType
  paymentSource: PaymentSource
  amount: number
  currency: string
  bankAccountId: string
  bankAccountName: string
  referenceNumber?: string
  description?: string
  status: PaymentStatus
  clearedDate?: Date
  reconciliationDate?: Date
  appliedInvoices: AppliedInvoice[]
  fees: PaymentFee[]
  notes?: string
  attachments: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface AppliedInvoice {
  invoiceId: string
  invoiceNumber: string
  invoiceDate: Date
  originalAmount: number
  appliedAmount: number
  discountAmount: number
  writeOffAmount: number
}

export interface PaymentFee {
  id: string
  feeType: 'BANK_FEE' | 'PROCESSING_FEE' | 'LATE_FEE' | 'OTHER'
  description: string
  amount: number
  currency: string
}

export interface PaymentBatch {
  id: string
  batchNumber: string
  batchDate: Date
  totalAmount: number
  paymentCount: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  payments: IncomingPayment[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

// Form Data Interfaces
export interface IncomingPaymentFormData {
  paymentDate: Date
  customerId: string
  paymentType: PaymentType
  paymentSource: PaymentSource
  amount: number
  currency: string
  bankAccountId: string
  referenceNumber?: string
  description?: string
  appliedInvoices: AppliedInvoiceFormData[]
  notes?: string
}

export interface AppliedInvoiceFormData {
  invoiceId: string
  appliedAmount: number
  discountAmount: number
  writeOffAmount: number
}

export interface BankAccountFormData {
  accountNumber: string
  accountName: string
  bankName: string
  bankCode: string
  accountType: BankAccountType
  currency: string
  isActive: boolean
}

// Filter and Search Interfaces
export interface PaymentFilters {
  customerId?: string
  paymentType?: PaymentType[]
  paymentSource?: PaymentSource[]
  status?: PaymentStatus[]
  bankAccountId?: string
  dateFrom?: Date
  dateTo?: Date
  amountFrom?: number
  amountTo?: number
  currency?: string
}

export interface BankAccountFilters {
  accountType?: BankAccountType[]
  bankName?: string
  isActive?: boolean
  currency?: string
}

// Statistics and Analytics
export interface PaymentStats {
  totalPayments: number
  totalAmount: number
  pendingPayments: number
  pendingAmount: number
  clearedPayments: number
  clearedAmount: number
  averagePaymentAmount: number
  paymentsByType: Array<{ type: PaymentType; count: number; amount: number }>
  paymentsByStatus: Array<{ status: PaymentStatus; count: number; amount: number }>
  paymentsBySource: Array<{ source: PaymentSource; count: number; amount: number }>
  dailyPayments: Array<{ date: string; count: number; amount: number }>
}

export interface BankAccountStats {
  totalAccounts: number
  totalBalance: number
  activeAccounts: number
  accountsByType: Array<{ type: BankAccountType; count: number; totalBalance: number }>
  accountsByBank: Array<{ bankName: string; count: number; totalBalance: number }>
  reconciliationStatus: Array<{ status: string; count: number; totalBalance: number }>
}

// Pagination and Response
export interface PaymentPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface BankAccountPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// API Response Interfaces
export interface PaymentsResponse {
  payments: IncomingPayment[]
  pagination: PaymentPagination
}

export interface BankAccountsResponse {
  accounts: BankAccount[]
  pagination: BankAccountPagination
}

export interface PaymentStatsResponse {
  stats: PaymentStats
}

export interface BankAccountStatsResponse {
  stats: BankAccountStats
}
