export enum ReportCategory {
  BALANCE_SHEET = 'BALANCE_SHEET',
  INCOME_STATEMENT = 'INCOME_STATEMENT',
  CASH_FLOW = 'CASH_FLOW',
  TRIAL_BALANCE = 'TRIAL_BALANCE',
  GENERAL_LEDGER = 'GENERAL_LEDGER',
  AGING_REPORT = 'AGING_REPORT',
  COST_CENTER = 'COST_CENTER',
  PROFIT_CENTER = 'PROFIT_CENTER',
  BUDGET_VARIANCE = 'BUDGET_VARIANCE',
  CUSTOM = 'CUSTOM',
}

export enum ReportStatus {
  DRAFT = 'DRAFT',
  GENERATED = 'GENERATED',
  APPROVED = 'APPROVED',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV',
  HTML = 'HTML',
}

export enum ReportPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
}

export interface FinancialReport {
  id: string
  name: string
  description: string
  category: ReportCategory
  status: ReportStatus
  format: ReportFormat
  period: ReportPeriod
  fiscalYear: string
  startDate: string
  endDate: string
  generatedDate?: string
  generatedBy?: string
  approvedDate?: string
  approvedBy?: string
  publishedDate?: string
  publishedBy?: string
  fileUrl?: string
  fileSize?: number
  parameters: ReportParameters
  filters: ReportFilters
  schedule?: ReportSchedule
  isRecurring: boolean
  lastRunDate?: string
  nextRunDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface ReportParameters {
  includeZeroBalances: boolean
  includeClosedAccounts: boolean
  includeAdjustments: boolean
  showComparisons: boolean
  comparisonPeriods: number
  includeCharts: boolean
  includeNotes: boolean
  pageBreak: boolean
  orientation: 'PORTRAIT' | 'LANDSCAPE'
  paperSize: 'A4' | 'LETTER' | 'LEGAL'
  margins: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

export interface ReportFilters {
  accountGroups?: string[]
  costCenters?: string[]
  profitCenters?: string[]
  businessPartners?: string[]
  documentTypes?: string[]
  dateRange?: {
    start: string
    end: string
  }
  amountRange?: {
    min: number
    max: number
  }
  currencies?: string[]
  customFilters?: Record<string, any>
}

export interface ReportSchedule {
  id: string
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  dayOfWeek?: number // 0-6 (Sunday-Saturday)
  dayOfMonth?: number // 1-31
  month?: number // 1-12
  time: string // HH:MM format
  timezone: string
  recipients: string[]
  isActive: boolean
  lastRunDate?: string
  nextRunDate?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  category: ReportCategory
  parameters: ReportParameters
  filters: ReportFilters
  layout: ReportLayout
  isDefault: boolean
  isPublic: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface ReportLayout {
  sections: ReportSection[]
  headers: ReportHeader[]
  footers: ReportFooter[]
  styling: ReportStyling
}

export interface ReportSection {
  id: string
  name: string
  type: 'HEADER' | 'BODY' | 'FOOTER' | 'SUMMARY'
  content: string
  order: number
  isVisible: boolean
  conditions?: string
}

export interface ReportHeader {
  id: string
  type: 'TITLE' | 'COMPANY_INFO' | 'PERIOD_INFO' | 'CUSTOM'
  content: string
  order: number
  alignment: 'LEFT' | 'CENTER' | 'RIGHT'
  isVisible: boolean
}

export interface ReportFooter {
  id: string
  type: 'PAGE_NUMBER' | 'TOTAL' | 'CUSTOM'
  content: string
  order: number
  alignment: 'LEFT' | 'CENTER' | 'RIGHT'
  isVisible: boolean
}

export interface ReportStyling {
  fontFamily: string
  fontSize: number
  lineHeight: number
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  borders: {
    style: 'SOLID' | 'DASHED' | 'DOTTED' | 'NONE'
    width: number
    color: string
  }
  spacing: {
    margin: number
    padding: number
    gap: number
  }
}

export interface ReportData {
  id: string
  reportId: string
  data: any
  metadata: {
    rowCount: number
    columnCount: number
    totalAmount: number
    currency: string
    generatedAt: string
  }
  isProcessed: boolean
  processingTime?: number
  errorMessage?: string
  createdBy: string
  createdAt: string
}

export interface ReportExecution {
  id: string
  reportId: string
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  progress: number
  startTime: string
  endTime?: string
  duration?: number
  errorMessage?: string
  result?: {
    fileUrl: string
    fileSize: number
    recordCount: number
  }
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface FinancialReportFormData {
  name: string
  description: string
  category: ReportCategory
  format: ReportFormat
  period: ReportPeriod
  fiscalYear: string
  startDate: string
  endDate: string
  parameters: Partial<ReportParameters>
  filters: Partial<ReportFilters>
  isRecurring: boolean
  notes: string
}

export interface ReportScheduleFormData {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  dayOfWeek?: number
  dayOfMonth?: number
  month?: number
  time: string
  timezone: string
  recipients: string[]
  isActive: boolean
}

export interface ReportTemplateFormData {
  name: string
  description: string
  category: ReportCategory
  parameters: Partial<ReportParameters>
  filters: Partial<ReportFilters>
  isDefault: boolean
  isPublic: boolean
}

export interface FinancialReportFilters {
  category?: ReportCategory
  status?: ReportStatus
  format?: ReportFormat
  period?: ReportPeriod
  fiscalYear?: string
  dateFrom?: string
  dateTo?: string
  createdBy?: string
  isRecurring?: boolean
}

export interface FinancialReportValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings: string[]
}

export interface FinancialReportStats {
  totalReports: number
  generatedReports: number
  approvedReports: number
  publishedReports: number
  scheduledReports: number
  reportsByCategory: Record<ReportCategory, number>
  reportsByStatus: Record<ReportStatus, number>
  reportsByPeriod: Record<ReportPeriod, number>
  averageGenerationTime: number
  totalFileSize: number
  topReportTemplates: string[]
}

export interface ReportComparison {
  id: string
  name: string
  basePeriod: {
    start: string
    end: string
    data: any
  }
  comparisonPeriod: {
    start: string
    end: string
    data: any
  }
  differences: {
    absolute: number
    percentage: number
    trend: 'INCREASE' | 'DECREASE' | 'STABLE'
  }
  createdBy: string
  createdAt: string
}

export interface ReportExport {
  id: string
  reportId: string
  format: ReportFormat
  fileUrl: string
  fileSize: number
  downloadCount: number
  lastDownloaded?: string
  expiresAt?: string
  createdBy: string
  createdAt: string
}

// API Response Types
export interface FinancialReportsResponse {
  data: FinancialReport[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface FinancialReportResponse {
  data: FinancialReport
  success: boolean
  message?: string
}

export interface ReportExecutionResponse {
  data: ReportExecution
  success: boolean
  message?: string
}

export interface ReportDataResponse {
  data: ReportData
  success: boolean
  message?: string
}

export interface ReportComparisonResponse {
  data: ReportComparison[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface ReportExportResponse {
  data: ReportExport[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
