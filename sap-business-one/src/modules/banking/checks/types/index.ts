// Check Type Enums
export enum CheckType {
  BUSINESS_CHECK = 'BUSINESS_CHECK',
  PERSONAL_CHECK = 'PERSONAL_CHECK',
  CASHIERS_CHECK = 'CASHIERS_CHECK',
  CERTIFIED_CHECK = 'CERTIFIED_CHECK',
  TRAVELERS_CHECK = 'TRAVELERS_CHECK',
  MONEY_ORDER = 'MONEY_ORDER',
  OTHER = 'OTHER',
}

export enum CheckStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PRINTED = 'PRINTED',
  ISSUED = 'ISSUED',
  CASHED = 'CASHED',
  CLEARED = 'CLEARED',
  STOPPED = 'STOPPED',
  VOIDED = 'VOIDED',
  RETURNED = 'RETURNED',
  EXPIRED = 'EXPIRED',
}

export enum CheckPurpose {
  VENDOR_PAYMENT = 'VENDOR_PAYMENT',
  SUPPLIER_PAYMENT = 'SUPPLIER_PAYMENT',
  EMPLOYEE_PAYROLL = 'EMPLOYEE_PAYROLL',
  EXPENSE_REIMBURSEMENT = 'EXPENSE_REIMBURSEMENT',
  LOAN_PAYMENT = 'LOAN_PAYMENT',
  TAX_PAYMENT = 'TAX_PAYMENT',
  INSURANCE_PAYMENT = 'INSURANCE_PAYMENT',
  UTILITY_PAYMENT = 'UTILITY_PAYMENT',
  RENT_PAYMENT = 'RENT_PAYMENT',
  DIVIDEND_PAYMENT = 'DIVIDEND_PAYMENT',
  REFUND = 'REFUND',
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

export interface Check {
  id: string
  checkNumber: string
  checkDate: Date
  dueDate: Date
  vendorId: string
  vendorName: string
  checkType: CheckType
  checkPurpose: CheckPurpose
  amount: number
  currency: string
  bankAccountId: string
  bankAccountName: string
  referenceNumber?: string
  description: string
  appliedPurchaseOrders: AppliedPurchaseOrder[]
  fees: CheckFee[]
  status: CheckStatus
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  approvedBy?: string
  approvedAt?: Date
  printedAt?: Date
  issuedAt?: Date
  cashedAt?: Date
  clearedAt?: Date
  stoppedAt?: Date
  voidedAt?: Date
  returnedAt?: Date
  expiredAt?: Date
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

export interface CheckFee {
  id: string
  feeType: string
  description: string
  amount: number
  currency: string
}

export interface CheckBatch {
  id: string
  batchNumber: string
  batchDate: Date
  totalAmount: number
  checkCount: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  checks: Check[]
  createdAt: Date
  updatedAt: Date
}

// Form Data Interfaces
export interface CheckFormData {
  checkDate: Date
  dueDate: Date
  vendorId: string
  checkType: CheckType
  checkPurpose: CheckPurpose
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
export interface CheckFilters {
  status?: CheckStatus
  checkType?: CheckType
  checkPurpose?: CheckPurpose
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
export interface CheckStats {
  totalChecks: number
  totalAmount: number
  pendingChecks: number
  approvedChecks: number
  issuedChecks: number
  cashedChecks: number
  clearedChecks: number
  stoppedChecks: number
  voidedChecks: number
  averageCheckAmount: number
  checksByType: Record<CheckType, number>
  checksByPurpose: Record<CheckPurpose, number>
}

export interface BankAccountStats {
  totalAccounts: number
  totalBalance: number
  activeAccounts: number
  accountsByType: Record<BankAccountType, number>
  accountsByCurrency: Record<string, number>
}

// Pagination Interfaces
export interface CheckPagination {
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
export interface ChecksResponse {
  checks: Check[]
  pagination: CheckPagination
}

export interface BankAccountsResponse {
  accounts: BankAccount[]
  pagination: BankAccountPagination
}

// Currency enum for form dropdowns
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
  JPY = 'JPY',
  CHF = 'CHF',
  CNY = 'CNY',
}
