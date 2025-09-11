// Reconciliation Type Enums
export enum ReconciliationStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  DISCREPANCY = 'DISCREPANCY',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
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
  OTHER = 'OTHER',
}

export enum MatchStatus {
  UNMATCHED = 'UNMATCHED',
  MATCHED = 'MATCHED',
  PARTIALLY_MATCHED = 'PARTIALLY_MATCHED',
  MANUAL_MATCH = 'MANUAL_MATCH',
  DISPUTED = 'DISPUTED',
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

export interface BankStatement {
  id: string
  statementNumber: string
  bankAccountId: string
  bankAccountName: string
  statementDate: Date
  beginningBalance: number
  endingBalance: number
  totalDeposits: number
  totalWithdrawals: number
  totalFees: number
  totalInterest: number
  transactions: BankTransaction[]
  status: ReconciliationStatus
  createdAt: Date
  updatedAt: Date
}

export interface BankTransaction {
  id: string
  transactionDate: Date
  description: string
  referenceNumber?: string
  transactionType: TransactionType
  amount: number
  balance: number
  checkNumber?: string
  payee?: string
  category?: string
  isReconciled: boolean
  matchedTransactionId?: string
  matchStatus: MatchStatus
  notes?: string
}

export interface BookTransaction {
  id: string
  transactionDate: Date
  description: string
  referenceNumber?: string
  transactionType: TransactionType
  amount: number
  accountId: string
  accountName: string
  isReconciled: boolean
  matchedTransactionId?: string
  matchStatus: MatchStatus
  notes?: string
  sourceDocument?: string
  sourceDocumentId?: string
}

export interface Reconciliation {
  id: string
  reconciliationNumber: string
  bankAccountId: string
  bankAccountName: string
  statementDate: Date
  reconciliationDate: Date
  beginningBalance: number
  endingBalance: number
  bookBalance: number
  bankBalance: number
  difference: number
  status: ReconciliationStatus
  bankTransactions: BankTransaction[]
  bookTransactions: BookTransaction[]
  matchedTransactions: MatchedTransaction[]
  unmatchedBankTransactions: BankTransaction[]
  unmatchedBookTransactions: BookTransaction[]
  discrepancies: ReconciliationDiscrepancy[]
  notes?: string
  createdBy: string
  createdAt: Date
  updatedAt: Date
  approvedBy?: string
  approvedAt?: Date
}

export interface MatchedTransaction {
  id: string
  bankTransactionId: string
  bookTransactionId: string
  bankTransaction: BankTransaction
  bookTransaction: BookTransaction
  matchAmount: number
  matchDate: Date
  matchType: 'AUTO' | 'MANUAL'
  confidence: number
  notes?: string
}

export interface ReconciliationDiscrepancy {
  id: string
  type: 'AMOUNT_MISMATCH' | 'MISSING_TRANSACTION' | 'DUPLICATE_TRANSACTION' | 'TIMING_DIFFERENCE'
  description: string
  bankTransactionId?: string
  bookTransactionId?: string
  expectedAmount?: number
  actualAmount?: number
  difference?: number
  status: 'OPEN' | 'INVESTIGATING' | 'RESOLVED' | 'ACCEPTED'
  resolution?: string
  resolvedBy?: string
  resolvedAt?: Date
}

// Form Data Interfaces
export interface ReconciliationFormData {
  bankAccountId: string
  statementDate: Date
  reconciliationDate: Date
  beginningBalance: number
  endingBalance: number
  notes?: string
}

export interface BankStatementFormData {
  bankAccountId: string
  statementDate: Date
  beginningBalance: number
  endingBalance: number
  transactions: BankTransactionFormData[]
}

export interface BankTransactionFormData {
  transactionDate: Date
  description: string
  referenceNumber?: string
  transactionType: TransactionType
  amount: number
  balance: number
  checkNumber?: string
  payee?: string
  category?: string
}

export interface MatchTransactionFormData {
  bankTransactionId: string
  bookTransactionId: string
  matchAmount: number
  matchType: 'AUTO' | 'MANUAL'
  notes?: string
}

// Filter and Search Interfaces
export interface ReconciliationFilters {
  status?: ReconciliationStatus
  bankAccountId?: string
  dateFrom?: Date
  dateTo?: Date
  hasDiscrepancies?: boolean
}

export interface TransactionFilters {
  transactionType?: TransactionType
  matchStatus?: MatchStatus
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
}

// Statistics and Analytics Interfaces
export interface ReconciliationStats {
  totalReconciliations: number
  completedReconciliations: number
  pendingReconciliations: number
  reconciliationsWithDiscrepancies: number
  totalDiscrepancies: number
  resolvedDiscrepancies: number
  averageReconciliationTime: number
  reconciliationsByStatus: Record<ReconciliationStatus, number>
}

export interface TransactionStats {
  totalTransactions: number
  matchedTransactions: number
  unmatchedTransactions: number
  disputedTransactions: number
  totalAmount: number
  matchedAmount: number
  unmatchedAmount: number
  transactionsByType: Record<TransactionType, number>
  transactionsByMatchStatus: Record<MatchStatus, number>
}

// Pagination Interfaces
export interface ReconciliationPagination {
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
export interface ReconciliationsResponse {
  reconciliations: Reconciliation[]
  pagination: ReconciliationPagination
}

export interface TransactionsResponse {
  transactions: (BankTransaction | BookTransaction)[]
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
