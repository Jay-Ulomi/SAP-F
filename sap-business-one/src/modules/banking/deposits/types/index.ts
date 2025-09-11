// Deposit Type Enums
export enum DepositType {
  CASH = 'CASH',
  CHECK = 'CHECK',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  ELECTRONIC_TRANSFER = 'ELECTRONIC_TRANSFER',
  MONEY_ORDER = 'MONEY_ORDER',
  OTHER = 'OTHER',
}

export enum DepositStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  RETURNED = 'RETURNED',
  ON_HOLD = 'ON_HOLD',
  RECONCILED = 'RECONCILED',
}

export enum DepositSource {
  CUSTOMER_PAYMENT = 'CUSTOMER_PAYMENT',
  VENDOR_REFUND = 'VENDOR_REFUND',
  INTEREST = 'INTEREST',
  DIVIDEND = 'DIVIDEND',
  LOAN_PROCEEDS = 'LOAN_PROCEEDS',
  INVESTMENT_RETURN = 'INVESTMENT_RETURN',
  SALE_PROCEEDS = 'SALE_PROCEEDS',
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
  taxId?: string
  creditLimit: number
  currentBalance: number
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

export interface Deposit {
  id: string
  depositNumber: string
  depositDate: Date
  receivedDate: Date
  customerId: string
  customerName: string
  depositType: DepositType
  depositSource: DepositSource
  amount: number
  currency: string
  bankAccountId: string
  bankAccountName: string
  referenceNumber?: string
  description: string
  appliedInvoices: AppliedInvoice[]
  fees: DepositFee[]
  status: DepositStatus
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  processedDate?: Date
  clearedDate?: Date
  reconciledDate?: Date
}

export interface AppliedInvoice {
  id: string
  invoiceId: string
  invoiceNumber: string
  invoiceDate: Date
  originalAmount: number
  appliedAmount: number
  discountAmount: number
  writeOffAmount: number
}

export interface DepositFee {
  id: string
  feeType: string
  description: string
  amount: number
  currency: string
}

export interface DepositBatch {
  id: string
  batchNumber: string
  batchDate: Date
  totalAmount: number
  depositCount: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  deposits: Deposit[]
  createdAt: Date
  updatedAt: Date
}

// Form Data Interfaces
export interface DepositFormData {
  depositDate: Date
  receivedDate: Date
  customerId: string
  depositType: DepositType
  depositSource: DepositSource
  amount: number
  currency: string
  bankAccountId: string
  referenceNumber?: string
  description: string
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
  balance: number
  availableBalance: number
}

// Filter and Search Interfaces
export interface DepositFilters {
  status?: DepositStatus
  depositType?: DepositType
  depositSource?: DepositSource
  customerId?: string
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
export interface DepositStats {
  totalDeposits: number
  totalAmount: number
  pendingDeposits: number
  completedDeposits: number
  failedDeposits: number
  averageDepositAmount: number
  depositsByType: Record<DepositType, number>
  depositsBySource: Record<DepositSource, number>
}

export interface BankAccountStats {
  totalAccounts: number
  totalBalance: number
  activeAccounts: number
  accountsByType: Record<BankAccountType, number>
  accountsByCurrency: Record<string, number>
}

// Pagination Interfaces
export interface DepositPagination {
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
export interface DepositsResponse {
  deposits: Deposit[]
  pagination: DepositPagination
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
