// Response Time Types

export enum ResponseTimeStatus {
  EXCELLENT = 'excellent',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
  CRITICAL = 'critical',
}

export enum MetricType {
  RESPONSE_TIME = 'response_time',
  RESOLUTION_TIME = 'resolution_time',
  FIRST_RESPONSE = 'first_response',
  CUSTOMER_SATISFACTION = 'customer_satisfaction',
  SLA_COMPLIANCE = 'sla_compliance',
}

export enum TimeUnit {
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
}

export enum PeriodType {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export interface ResponseTimeMetric {
  id: string
  serviceCallId: string
  serviceCallNumber: string
  customerId: string
  customerName: string
  technicianId: string
  technicianName: string
  metricType: MetricType
  value: number
  unit: TimeUnit
  status: ResponseTimeStatus
  targetValue: number
  actualValue: number
  variance: number
  variancePercentage: number
  slaTarget: number
  slaCompliance: boolean
  measuredAt: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface ResponseTimeStats {
  totalMetrics: number
  averageResponseTime: number
  averageResolutionTime: number
  averageFirstResponse: number
  slaComplianceRate: number
  excellentMetrics: number
  goodMetrics: number
  fairMetrics: number
  poorMetrics: number
  criticalMetrics: number
  metricsByStatus: Record<ResponseTimeStatus, number>
  metricsByType: Record<MetricType, number>
  topPerformers: Array<{
    technicianId: string
    technicianName: string
    averageTime: number
    metricCount: number
  }>
  trends: Array<{
    period: string
    averageTime: number
    metricCount: number
    slaCompliance: number
  }>
}

export interface ResponseTimeFilters {
  search?: string
  status?: ResponseTimeStatus
  metricType?: MetricType
  technicianId?: string
  customerId?: string
  dateFrom?: string
  dateTo?: string
  slaCompliance?: boolean
  period?: PeriodType
}

export interface ResponseTimeSearchParams extends ResponseTimeFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ResponseTimeFormData {
  serviceCallId: string
  metricType: MetricType
  value: number
  unit: TimeUnit
  targetValue: number
  slaTarget: number
  measuredAt: string
  notes?: string
}

export interface ResponseTimeAlert {
  id: string
  metricId: string
  alertType: 'threshold_exceeded' | 'sla_breach' | 'performance_degradation'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  threshold: number
  actualValue: number
  variance: number
  isActive: boolean
  acknowledged: boolean
  acknowledgedBy?: string
  acknowledgedAt?: string
  createdAt: string
  resolvedAt?: string
}

export interface ResponseTimeDashboard {
  overview: {
    totalCalls: number
    averageResponseTime: number
    averageResolutionTime: number
    slaCompliance: number
    customerSatisfaction: number
  }
  trends: Array<{
    period: string
    responseTime: number
    resolutionTime: number
    slaCompliance: number
  }>
  topPerformers: Array<{
    technicianId: string
    technicianName: string
    averageTime: number
    callCount: number
    satisfaction: number
  }>
  alerts: ResponseTimeAlert[]
  recentMetrics: ResponseTimeMetric[]
}

export interface ResponseTimeReport {
  id: string
  name: string
  description: string
  period: PeriodType
  dateRange: {
    startDate: string
    endDate: string
  }
  filters: ResponseTimeFilters
  metrics: ResponseTimeMetric[]
  summary: ResponseTimeStats
  generatedAt: string
  generatedBy: string
}
