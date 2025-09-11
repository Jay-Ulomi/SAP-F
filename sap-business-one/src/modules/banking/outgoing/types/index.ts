// Payment Type Enums
export enum OutgoingPaymentType {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  OTHER = 'OTHER',
}

export enum OutgoingPaymentStatus {
  PENDING = 'PENDING',
  AUTHORIZED = 'AUTHORIZED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
  ON_HOLD = 'ON_HOLD',
}

export enum OutgoingPaymentPurpose {
  VENDOR_PAYMENT = 'VENDOR_PAYMENT',
  SUPPLIER_PAYMENT = 'SUPPLIER_PAYMENT',
  EXPENSE_REIMBURSEMENT = 'EXPENSE_REIMBURSEMENT',
  LOAN_PAYMENT = 'LOAN_PAYMENT',
  TAX_PAYMENT = 'TAX_PAYMENT',
  INSURANCE_PAYMENT = 'INSURANCE_PAYMENT',
  UTILITY_PAYMENT = 'UTILITY_PAYMENT',
  RENT_PAYMENT = 'RENT_PAYMENT',
  SALARY_PAYMENT = 'SALARY_PAYMENT',
  OTHER = 'OTHER',
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

export interface Vendor {
  id: string
  vendorCode: string
  vendorName: string
  contactPerson?: string
  email?: string
  phone?: string
  address?: string
  taxId?: string
  paymentTerms: string
  creditLimit: number
  currentBalance: number
}

export interface PurchaseOrder {
  id: string
  poNumber: string
  vendorId: string
  vendorName: string
  poDate: Date
  dueDate: Date
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  status: 'OPEN' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE'
}

export interface OutgoingPayment {
  id: string
  paymentNumber: string
  paymentDate: Date
  dueDate: Date
  vendorId: string
  vendorName: string
  paymentType: OutgoingPaymentType
  paymentPurpose: OutgoingPaymentPurpose
  amount: number
  currency: string
  bankAccountId: string
  bankAccountName: string
  referenceNumber?: string
  description: string
  status: OutgoingPaymentStatus
  authorizedBy?: string
  authorizedDate?: Date
  processedDate?: Date
  appliedPurchaseOrders: AppliedPurchaseOrder[]
  fees: PaymentFee[]
  notes?: string
  attachments: string[]
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface AppliedPurchaseOrder {
  id: string
  poId: string
  poNumber: string
  poDate: Date
  originalAmount: number
  appliedAmount: number
  discountAmount: number
  writeOffAmount: number
}

export interface PaymentFee {
  id: string
  feeType: string
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
  payments: OutgoingPayment[]
  createdAt: Date
  updatedAt: Date
}

// Form Data Interfaces
export interface OutgoingPaymentFormData {
  paymentDate: Date
  dueDate: Date
  vendorId: string
  paymentType: OutgoingPaymentType
  paymentPurpose: OutgoingPaymentPurpose
  amount: number
  currency: string
  bankAccountId: string
  referenceNumber?: string
  description: string
  appliedPurchaseOrders: AppliedPurchaseOrderFormData[]
  notes?: string
}

export interface AppliedPurchaseOrderFormData {
  poId: string
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
  balance: number
  availableBalance: number
}

// Filter and Search Interfaces
export interface OutgoingPaymentFilters {
  status?: OutgoingPaymentStatus
  paymentType?: OutgoingPaymentType
  paymentPurpose?: OutgoingPaymentPurpose
  vendorId?: string
  bankAccountId?: string
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
}

export interface BankAccountFilters {
  accountType?: BankAccountType
  currency?: string
  isActive?: boolean
}

// Statistics and Analytics Interfaces
export interface OutgoingPaymentStats {
  totalPayments: number
  totalAmount: number
  pendingPayments: number
  completedPayments: number
  failedPayments: number
  averagePaymentAmount: number
  paymentsByType: Record<OutgoingPaymentType, number>
  paymentsByPurpose: Record<OutgoingPaymentPurpose, number>
}

export interface BankAccountStats {
  totalAccounts: number
  totalBalance: number
  activeAccounts: number
  accountsByType: Record<BankAccountType, number>
  accountsByCurrency: Record<string, number>
}

// Pagination Interfaces
export interface OutgoingPaymentPagination {
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
export interface OutgoingPaymentsResponse {
  payments: OutgoingPayment[]
  pagination: OutgoingPaymentPagination
}

export interface BankAccountsResponse {
  accounts: BankAccount[]
  pagination: BankAccountPagination
}

export interface OutgoingPaymentStatsResponse {
  stats: OutgoingPaymentStats
}

export interface BankAccountStatsResponse {
  stats: BankAccountStats
}
