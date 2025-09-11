// Service Reports Types

export enum ReportType {
  SERVICE_CALLS = 'service_calls',
  CONTRACTS = 'contracts',
  EQUIPMENT = 'equipment',
  RESPONSE_TIME = 'response_time',
  CUSTOMER_SATISFACTION = 'customer_satisfaction',
  MAINTENANCE = 'maintenance',
  WARRANTY = 'warranty',
  FINANCIAL = 'financial',
  PERFORMANCE = 'performance',
  CUSTOM = 'custom',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  HTML = 'html',
  JSON = 'json',
}

export enum ReportStatus {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
}

export enum ReportFrequency {
  ONCE = 'once',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum ReportCategory {
  OPERATIONAL = 'operational',
  FINANCIAL = 'financial',
  ANALYTICAL = 'analytical',
  COMPLIANCE = 'compliance',
  CUSTOMER = 'customer',
  TECHNICAL = 'technical',
}

export interface ServiceReport {
  id: string
  name: string
  description: string
  type: ReportType
  category: ReportCategory
  status: ReportStatus
  format: ReportFormat
  frequency: ReportFrequency
  parameters: ReportParameters
  schedule?: ReportSchedule
  filters: ReportFilters
  output: ReportOutput
  permissions: ReportPermissions
  createdAt: string
  updatedAt: string
  createdBy: string
  lastRunAt?: string
  lastRunBy?: string
  nextRunAt?: string
  totalRuns: number
  isPublic: boolean
  tags: string[]
}

export interface ReportParameters {
  dateRange: {
    startDate: string
    endDate: string
  }
  customerIds?: string[]
  contractIds?: string[]
  equipmentIds?: string[]
  technicianIds?: string[]
  statusFilters?: string[]
  priorityFilters?: string[]
  typeFilters?: string[]
  customFilters?: Record<string, any>
}

export interface ReportSchedule {
  frequency: ReportFrequency
  dayOfWeek?: number // 0-6 for weekly
  dayOfMonth?: number // 1-31 for monthly
  time: string // HH:MM format
  timezone: string
  enabled: boolean
  endDate?: string
}

export interface ReportFilters {
  search?: string
  type?: ReportType
  category?: ReportCategory
  status?: ReportStatus
  createdBy?: string
  dateFrom?: string
  dateTo?: string
  isPublic?: boolean
  tags?: string[]
}

export interface ReportOutput {
  fileName: string
  fileSize: number
  filePath: string
  downloadUrl: string
  generatedAt: string
  generatedBy: string
  expiresAt?: string
}

export interface ReportPermissions {
  view: string[]
  edit: string[]
  delete: string[]
  run: string[]
  schedule: string[]
}

export interface ServiceReportFormData {
  name: string
  description: string
  type: ReportType
  category: ReportCategory
  format: ReportFormat
  frequency: ReportFrequency
  parameters: ReportParameters
  schedule?: ReportSchedule
  filters: ReportFilters
  permissions: ReportPermissions
  isPublic: boolean
  tags: string[]
}

export interface ServiceReportStats {
  totalReports: number
  activeReports: number
  scheduledReports: number
  completedReports: number
  failedReports: number
  totalRuns: number
  averageRunTime: number
  reportsByType: Record<ReportType, number>
  reportsByCategory: Record<ReportCategory, number>
  reportsByStatus: Record<ReportStatus, number>
  reportsByFormat: Record<ReportFormat, number>
  topUsers: Array<{ userId: string; userName: string; count: number }>
  recentActivity: Array<{
    id: string
    reportName: string
    action: string
    timestamp: string
    user: string
  }>
}

export interface ServiceReportSearchParams extends ReportFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ReportExecution {
  id: string
  reportId: string
  reportName: string
  status: ReportStatus
  startedAt: string
  completedAt?: string
  duration?: number
  parameters: ReportParameters
  output?: ReportOutput
  error?: string
  executedBy: string
  executedByName: string
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  type: ReportType
  category: ReportCategory
  template: string
  parameters: string[]
  isDefault: boolean
  isPublic: boolean
  createdAt: string
  createdBy: string
}
