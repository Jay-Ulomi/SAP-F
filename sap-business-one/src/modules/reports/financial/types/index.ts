export interface FinancialReport {
  id: string
  name: string
  description?: string
  type: ReportType
  status: ReportStatus
  dateFrom: string
  dateTo: string
  createdAt: string
  updatedAt?: string
  totalAmount: number
  currency: string
  createdBy?: string
  lineItems: FinancialLineItem[]
  notes?: string
}

export interface FinancialLineItem {
  id: string
  accountCode: string
  accountName: string
  description: string
  debitAmount: number
  creditAmount: number
  balance: number
  category: AccountCategory
  subCategory?: string
  reference?: string
  documentNumber?: string
  documentType?: string
  notes?: string
}

export interface FinancialReportFormData {
  name: string
  description?: string
  type: ReportType
  dateFrom: string
  dateTo: string
  currency: string
  lineItems: Omit<FinancialLineItem, 'id'>[]
  notes?: string
}

export interface FinancialSearchParams {
  search?: string
  reportType?: string
  dateFrom?: string
  dateTo?: string
  status?: string
  createdBy?: string
}

export enum ReportType {
  BALANCE_SHEET = 'BALANCE_SHEET',
  PROFIT_LOSS = 'PROFIT_LOSS',
  CASH_FLOW = 'CASH_FLOW',
  BUDGET_VARIANCE = 'BUDGET_VARIANCE',
  GENERAL_LEDGER = 'GENERAL_LEDGER',
  TRIAL_BALANCE = 'TRIAL_BALANCE',
  ACCOUNTS_RECEIVABLE = 'ACCOUNTS_RECEIVABLE',
  ACCOUNTS_PAYABLE = 'ACCOUNTS_PAYABLE'
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export enum AccountCategory {
  ASSETS = 'ASSETS',
  LIABILITIES = 'LIABILITIES',
  EQUITY = 'EQUITY',
  REVENUE = 'REVENUE',
  EXPENSES = 'EXPENSES',
  COGS = 'COGS'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD'
}

export interface Account {
  code: string
  name: string
  category: AccountCategory
  type: string
  balance: number
  active: boolean
}

export interface FinancialStats {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  activeReports: number
  totalAssets?: number
  totalLiabilities?: number
  totalEquity?: number
}