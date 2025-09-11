// Report Type Enums
export enum ReportType {
  OPPORTUNITY_PERFORMANCE = 'OPPORTUNITY_PERFORMANCE',
  PIPELINE_ANALYSIS = 'PIPELINE_ANALYSIS',
  LEAD_CONVERSION = 'LEAD_CONVERSION',
  SALES_FORECAST = 'SALES_FORECAST',
  TEAM_PERFORMANCE = 'TEAM_PERFORMANCE',
  STAGE_ANALYSIS = 'STAGE_ANALYSIS',
  WIN_LOSS_ANALYSIS = 'WIN_LOSS_ANALYSIS',
  REVENUE_TRACKING = 'REVENUE_TRACKING',
}

export enum ReportPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY',
  CUSTOM = 'CUSTOM',
}

export enum ReportFormat {
  PDF = 'PDF',
  EXCEL = 'EXCEL',
  CSV = 'CSV',
  JSON = 'JSON',
}

// Report Configuration Interface
export interface ReportConfig {
  id: string
  name: string
  type: ReportType
  description?: string
  period: ReportPeriod
  customDateRange?: {
    startDate: Date
    endDate: Date
  }
  filters: ReportFilters
  metrics: string[]
  groupBy: string[]
  sortBy: string
  sortOrder: 'ASC' | 'DESC'
  isScheduled: boolean
  scheduleConfig?: ScheduleConfig
  createdAt: Date
  updatedAt: Date
  createdBy: string
}

// Report Filters Interface
export interface ReportFilters {
  opportunityStatus?: string[]
  leadStatus?: string[]
  pipelineId?: string[]
  stageId?: string[]
  assignedTo?: string[]
  source?: string[]
  priority?: string[]
  customerType?: string[]
  amountRange?: {
    min: number
    max: number
  }
  dateRange?: {
    startDate: Date
    endDate: Date
  }
  tags?: string[]
}

// Schedule Configuration Interface
export interface ScheduleConfig {
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY'
  dayOfWeek?: number // 0-6 for weekly
  dayOfMonth?: number // 1-31 for monthly
  time: string // HH:MM format
  recipients: string[]
  format: ReportFormat
  isActive: boolean
}

// Report Data Interfaces
export interface OpportunityMetrics {
  totalOpportunities: number
  totalValue: number
  averageValue: number
  wonOpportunities: number
  lostOpportunities: number
  winRate: number
  averageSalesCycle: number
  pipelineVelocity: number
  conversionRate: number
  forecastAccuracy: number
}

export interface LeadMetrics {
  totalLeads: number
  qualifiedLeads: number
  convertedLeads: number
  leadConversionRate: number
  averageQualificationTime: number
  leadsBySource: Array<{ source: string; count: number; conversionRate: number }>
  leadsByStatus: Array<{ status: string; count: number; percentage: number }>
}

export interface PipelineMetrics {
  stageMetrics: Array<{
    stageId: string
    stageName: string
    opportunityCount: number
    totalValue: number
    averageValue: number
    averageStageTime: number
    conversionRate: number
    dropOffRate: number
  }>
  bottlenecks: Array<{ stageId: string; stageName: string; avgTime: number; reason: string }>
  progressionRates: Array<{ fromStage: string; toStage: string; rate: number }>
}

export interface TeamMetrics {
  memberPerformance: Array<{
    userId: string
    userName: string
    opportunitiesAssigned: number
    opportunitiesWon: number
    opportunitiesLost: number
    totalValue: number
    winRate: number
    averageDealSize: number
    activitiesCompleted: number
  }>
  teamTotals: {
    totalOpportunities: number
    totalValue: number
    teamWinRate: number
    averageDealSize: number
  }
}

export interface RevenueMetrics {
  actualRevenue: number
  forecastRevenue: number
  committedRevenue: number
  bestCaseRevenue: number
  worstCaseRevenue: number
  revenueByPeriod: Array<{
    period: string
    actual: number
    forecast: number
    variance: number
    variancePercentage: number
  }>
  revenueBySource: Array<{ source: string; amount: number; percentage: number }>
  revenueByStage: Array<{ stage: string; amount: number; probability: number }>
}

// Report Data Interface
export interface ReportData {
  id: string
  configId: string
  name: string
  type: ReportType
  generatedAt: Date
  period: {
    startDate: Date
    endDate: Date
  }
  metrics: {
    opportunities?: OpportunityMetrics
    leads?: LeadMetrics
    pipeline?: PipelineMetrics
    team?: TeamMetrics
    revenue?: RevenueMetrics
  }
  charts: ChartData[]
  tables: TableData[]
  summary: ReportSummary
}

// Chart Data Interface
export interface ChartData {
  id: string
  title: string
  type: 'LINE' | 'BAR' | 'PIE' | 'DOUGHNUT' | 'AREA' | 'FUNNEL'
  data: {
    labels: string[]
    datasets: Array<{
      label: string
      data: number[]
      backgroundColor?: string[]
      borderColor?: string[]
      fill?: boolean
    }>
  }
  options?: Record<string, string | number | boolean>
}

// Table Data Interface
export interface TableData {
  id: string
  title: string
  headers: Array<{
    key: string
    label: string
    type?: 'text' | 'number' | 'currency' | 'percentage' | 'date'
  }>
  rows: Record<string, string | number | boolean>[]
  totals?: Record<string, string | number | boolean>
  pagination?: {
    page: number
    limit: number
    total: number
  }
}

// Report Summary Interface
export interface ReportSummary {
  keyInsights: string[]
  recommendations: string[]
  trends: Array<{
    metric: string
    trend: 'UP' | 'DOWN' | 'STABLE'
    changePercentage: number
    description: string
  }>
  alerts: Array<{
    type: 'WARNING' | 'CRITICAL' | 'INFO'
    message: string
    metric: string
    value: number
    threshold: number
  }>
}

// Report Form Data Interface
export interface ReportFormData {
  name: string
  type: ReportType
  description?: string
  period: ReportPeriod
  customDateRange?: {
    startDate: Date
    endDate: Date
  }
  filters: ReportFilters
  metrics: string[]
  groupBy: string[]
  sortBy: string
  sortOrder: 'ASC' | 'DESC'
  isScheduled: boolean
  scheduleConfig?: ScheduleConfig
}

// Report Filters for UI
export interface ReportListFilters {
  search?: string
  type?: ReportType
  period?: ReportPeriod
  createdBy?: string
  isScheduled?: boolean
  dateFrom?: Date
  dateTo?: Date
}

// Report Statistics Interface
export interface ReportStats {
  totalReports: number
  scheduledReports: number
  reportsThisMonth: number
  mostUsedType: ReportType
  averageGenerationTime: number
}

// Report Pagination Interface
export interface ReportPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
