// Sales Reports Types and Interfaces

export enum ReportType {
  SALES_ANALYSIS = 'SALES_ANALYSIS',
  CUSTOMER_PERFORMANCE = 'CUSTOMER_PERFORMANCE',
  PRODUCT_PERFORMANCE = 'PRODUCT_PERFORMANCE',
  SALES_PERSON_PERFORMANCE = 'SALES_PERSON_PERFORMANCE',
  REGIONAL_ANALYSIS = 'REGIONAL_ANALYSIS',
  TREND_ANALYSIS = 'TREND_ANALYSIS',
  COMMISSION_REPORTS = 'COMMISSION_REPORTS',
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
  HTML = 'HTML',
}

export interface SalesReport {
  id: string
  name: string
  type: ReportType
  period: ReportPeriod
  format: ReportFormat
  dateFrom: string
  dateTo: string
  generatedAt: string
  generatedBy: string
  status: 'PENDING' | 'GENERATING' | 'COMPLETED' | 'FAILED' | 'CANCELLED'
  downloadUrl?: string
  parameters: Record<string, any>
}

export interface SalesReportRequest {
  name: string
  type: ReportType
  period: ReportPeriod
  dateFrom: string
  dateTo: string
  format: ReportFormat
  parameters: Record<string, any>
}

export interface SalesReportResponse {
  data: SalesReport
  message: string
  success: boolean
}

export interface SalesReportListResponse {
  data: SalesReport[]
  pagination: {
    page: number
    limit: number
    total: number
    hasMore: boolean
  }
  message: string
  success: boolean
}

// All interfaces are already exported above
