// Bank Statement Type Enums
export enum StatementStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  RECONCILED = 'RECONCILED',
}

export enum StatementType {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
  ON_DEMAND = 'ON_DEMAND',
}

export enum TransactionType {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  TRANSFER_IN = 'TRANSFER_IN',
  TRANSFER_OUT = 'TRANSFER_OUT',
  FEE = 'FEE',
  INTEREST = 'INTEREST',
  CHECK = 'CHECK',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD',
  ATM = 'ATM',
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
  lastStatementDate?: Date
  createdAt: Date
  updatedAt: Date
}

export interface StatementTransaction {
  id: string
  transactionDate: Date
  valueDate: Date
  description: string
  referenceNumber?: string
  transactionType: TransactionType
  amount: number
  balance: number
  checkNumber?: string
  payee?: string
  category?: string
  isReconciled: boolean
  notes?: string
  fees?: StatementFee[]
}

export interface StatementFee {
  id: string
  feeType: string
  description: string
  amount: number
  currency: string
}

export interface BankStatement {
  id: string
  statementNumber: string
  bankAccountId: string
  bankAccountName: string
  statementType: StatementType
  statementDate: Date
  periodStart: Date
  periodEnd: Date
  beginningBalance: number
  endingBalance: number
  totalDeposits: number
  totalWithdrawals: number
  totalFees: number
  totalInterest: number
  transactionCount: number
  transactions: StatementTransaction[]
  status: StatementStatus
  filePath?: string
  fileName?: string
  fileSize?: number
  uploadedBy?: string
  uploadedAt?: Date
  processedBy?: string
  processedAt?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface StatementSummary {
  id: string
  statementId: string
  accountId: string
  period: string
  totalTransactions: number
  totalDeposits: number
  totalWithdrawals: number
  netChange: number
  averageDailyBalance: number
  highestBalance: number
  lowestBalance: number
  feeCount: number
  totalFees: number
  interestEarned: number
  createdAt: Date
}

// Form Data Interfaces
export interface StatementFormData {
  bankAccountId: string
  statementType: StatementType
  statementDate: Date
  periodStart: Date
  periodEnd: Date
  beginningBalance: number
  endingBalance: number
  notes?: string
}

export interface StatementUploadFormData {
  bankAccountId: string
  statementType: StatementType
  statementDate: Date
  periodStart: Date
  periodEnd: Date
  file: File
  notes?: string
}

export interface StatementTransactionFormData {
  transactionDate: Date
  valueDate: Date
  description: string
  referenceNumber?: string
  transactionType: TransactionType
  amount: number
  balance: number
  checkNumber?: string
  payee?: string
  category?: string
  notes?: string
}

// Filter and Search Interfaces
export interface StatementFilters {
  status?: StatementStatus
  statementType?: StatementType
  bankAccountId?: string
  dateFrom?: Date
  dateTo?: Date
  periodStart?: Date
  periodEnd?: Date
}

export interface TransactionFilters {
  transactionType?: TransactionType
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
  isReconciled?: boolean
}

// Statistics and Analytics Interfaces
export interface StatementStats {
  totalStatements: number
  totalTransactions: number
  totalDeposits: number
  totalWithdrawals: number
  totalFees: number
  totalInterest: number
  pendingStatements: number
  completedStatements: number
  failedStatements: number
  reconciledStatements: number
  averageStatementPeriod: number
  statementsByType: Record<StatementType, number>
  statementsByStatus: Record<StatementStatus, number>
}

export interface TransactionStats {
  totalTransactions: number
  totalAmount: number
  averageTransactionAmount: number
  transactionsByType: Record<TransactionType, number>
  transactionsByMonth: Record<string, number>
  topPayees: Array<{ payee: string; count: number; totalAmount: number }>
  topCategories: Array<{ category: string; count: number; totalAmount: number }>
}

// Pagination Interfaces
export interface StatementPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface TransactionPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// API Response Interfaces
export interface StatementsResponse {
  statements: BankStatement[]
  pagination: StatementPagination
}

export interface TransactionsResponse {
  transactions: StatementTransaction[]
  pagination: TransactionPagination
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
