// Budget Management Types

export enum BudgetStatus {
  DRAFT = 'DRAFT',
  ACTIVE = 'ACTIVE',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum BudgetType {
  ANNUAL = 'ANNUAL',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY',
  PROJECT = 'PROJECT',
  DEPARTMENT = 'DEPARTMENT',
  COST_CENTER = 'COST_CENTER',
}

export enum BudgetPeriod {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER',
}

export enum BudgetLineType {
  REVENUE = 'REVENUE',
  EXPENSE = 'EXPENSE',
  CAPITAL = 'CAPITAL',
  TRANSFER = 'TRANSFER',
}

export interface Budget {
  id: string
  code: string
  name: string
  description?: string
  type: BudgetType
  status: BudgetStatus
  fiscalYear: number
  startDate: string
  endDate: string
  currency: string
  totalBudget: number
  totalActual: number
  totalVariance: number
  variancePercentage: number
  createdBy: string
  createdAt: string
  updatedAt: string
  approvedBy?: string
  approvedAt?: string
  notes?: string
}

export interface BudgetLine {
  id: string
  budgetId: string
  accountId: string
  accountCode: string
  accountName: string
  lineType: BudgetLineType
  period: BudgetPeriod
  budgetAmount: number
  actualAmount: number
  variance: number
  variancePercentage: number
  notes?: string
}

export interface BudgetFormData {
  code: string
  name: string
  description: string
  type: BudgetType
  fiscalYear: number
  startDate: string
  endDate: string
  currency: string
  notes: string
}

export interface BudgetLineFormData {
  accountId: string
  lineType: BudgetLineType
  period: BudgetPeriod
  budgetAmount: number
  notes: string
}

export interface BudgetFilters {
  search?: string
  type?: BudgetType
  status?: BudgetStatus
  fiscalYear?: number
  startDate?: string
  endDate?: string
}

export interface BudgetLineFilters {
  budgetId?: string
  accountId?: string
  lineType?: BudgetLineType
  period?: BudgetPeriod
}

export interface BudgetValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings: string[]
}

export interface BudgetLineValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings: string[]
}

export interface BudgetStats {
  totalBudgets: number
  activeBudgets: number
  draftBudgets: number
  closedBudgets: number
  totalBudgetAmount: number
  totalActualAmount: number
  totalVariance: number
  averageVariancePercentage: number
  budgetsByType: Record<BudgetType, number>
  budgetsByStatus: Record<BudgetStatus, number>
  topVarianceBudgets: Array<{
    id: string
    name: string
    variance: number
    variancePercentage: number
  }>
}

export interface BudgetPeriodSummary {
  period: BudgetPeriod
  budgetAmount: number
  actualAmount: number
  variance: number
  variancePercentage: number
}

export interface BudgetComparison {
  budgetId: string
  budgetName: string
  periods: BudgetPeriodSummary[]
  totalBudget: number
  totalActual: number
  totalVariance: number
}

export interface BudgetTemplate {
  id: string
  name: string
  description: string
  type: BudgetType
  defaultCurrency: string
  defaultPeriods: BudgetPeriod[]
  defaultAccounts: Array<{
    accountId: string
    accountCode: string
    accountName: string
    lineType: BudgetLineType
    defaultAmount: number
  }>
}

export interface BudgetApproval {
  id: string
  budgetId: string
  approverId: string
  approverName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  comments?: string
  approvedAt?: string
  rejectedAt?: string
}

export interface BudgetRollover {
  id: string
  sourceBudgetId: string
  targetBudgetId: string
  rolloverDate: string
  rolloverAmount: number
  rolloverPercentage: number
  notes?: string
}

// API Response Types
export interface BudgetsResponse {
  data: Budget[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface BudgetResponse {
  data: Budget
}

export interface BudgetLinesResponse {
  data: BudgetLine[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface BudgetStatsResponse {
  data: BudgetStats
}

export interface BudgetComparisonResponse {
  data: BudgetComparison[]
}

export interface BudgetTemplatesResponse {
  data: BudgetTemplate[]
}

export interface BudgetApprovalsResponse {
  data: BudgetApproval[]
}
