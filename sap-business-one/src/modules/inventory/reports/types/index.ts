// Enums
export enum ReportType {
  INVENTORY_SUMMARY = 'inventory_summary',
  STOCK_MOVEMENT = 'stock_movement',
  VALUATION_REPORT = 'valuation_report',
  AGING_ANALYSIS = 'aging_analysis',
  ABC_ANALYSIS = 'abc_analysis',
  TURNOVER_ANALYSIS = 'turnover_analysis',
  COST_ANALYSIS = 'cost_analysis',
  WAREHOUSE_UTILIZATION = 'warehouse_utilization',
  ITEM_PERFORMANCE = 'item_performance',
  CUSTOM_REPORT = 'custom_report',
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
  CUSTOM = 'custom',
}

// Interfaces
export interface ReportParameter {
  id: string
  name: string
  label: string
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'boolean'
  required: boolean
  defaultValue?: any
  options?: { value: any; label: string }[]
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

export interface InventoryReport {
  id: string
  reportName: string
  reportType: ReportType
  category: ReportCategory
  description?: string
  status: ReportStatus
  format: ReportFormat
  frequency: ReportFrequency
  parameters: ReportParameter[]
  filters: Record<string, any>
  dateRange: {
    startDate: Date
    endDate: Date
  }
  warehouseCode?: string
  warehouseName?: string
  locationCode?: string
  locationName?: string
  itemGroup?: string
  itemCategory?: string
  generatedBy: string
  generatedByName: string
  generatedDate?: Date
  filePath?: string
  fileSize?: number
  recordCount?: number
  executionTime?: number
  errorMessage?: string
  scheduledDate?: Date
  lastRunDate?: Date
  nextRunDate?: Date
  isPublic: boolean
  isScheduled: boolean
  recipients: string[]
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
}

export interface ReportFormData {
  reportName: string
  reportType: ReportType
  category: ReportCategory
  description?: string
  format: ReportFormat
  frequency: ReportFrequency
  dateRange: {
    startDate: Date
    endDate: Date
  }
  warehouseCode?: string
  locationCode?: string
  itemGroup?: string
  itemCategory?: string
  filters: Record<string, any>
  isPublic: boolean
  isScheduled: boolean
  recipients: string[]
  scheduledDate?: Date
}

export interface ReportStats {
  totalReports: number
  draftReports: number
  scheduledReports: number
  runningReports: number
  completedReports: number
  failedReports: number
  cancelledReports: number
  totalGeneratedToday: number
  averageExecutionTime: number
  lastGeneratedDate?: Date
  nextScheduledDate?: Date
}

export interface ReportFilters {
  reportType?: ReportType
  category?: ReportCategory
  status?: ReportStatus
  format?: ReportFormat
  frequency?: ReportFrequency
  generatedBy?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface ReportListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ReportFilters
}

export interface ReportListResponse {
  items: InventoryReport[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: ReportStats
}

export interface ReportTemplate {
  id: string
  name: string
  description: string
  reportType: ReportType
  category: ReportCategory
  parameters: ReportParameter[]
  defaultFilters: Record<string, any>
  isSystem: boolean
  isActive: boolean
  createdBy: string
  createdDate: Date
}

export interface ReportExecution {
  id: string
  reportId: string
  reportName: string
  status: ReportStatus
  startTime: Date
  endTime?: Date
  executionTime?: number
  recordCount?: number
  filePath?: string
  fileSize?: number
  errorMessage?: string
  generatedBy: string
  generatedByName: string
}
