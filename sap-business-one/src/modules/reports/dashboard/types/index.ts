// Report Dashboard Types

export interface ReportDashboard {
  id: string
  name: string
  description?: string
  userId: string
  isDefault: boolean
  layout: DashboardLayout
  widgets: DashboardWidget[]
  filters: DashboardFilters
  createdAt: string
  updatedAt?: string
}

export interface DashboardLayout {
  columns: number
  rows: number
  gridSize: 'sm' | 'md' | 'lg'
}

export interface DashboardWidget {
  id: string
  type: WidgetType
  title: string
  position: WidgetPosition
  size: WidgetSize
  config: WidgetConfig
  data?: any
  isLoading: boolean
  error?: string
  refreshInterval?: number
  lastRefresh?: string
}

export interface WidgetPosition {
  x: number
  y: number
}

export interface WidgetSize {
  width: number
  height: number
  minWidth?: number
  minHeight?: number
  maxWidth?: number
  maxHeight?: number
}

export interface WidgetConfig {
  dataSource: DataSource
  chartType?: ChartType
  dateRange?: DateRange
  filters?: Record<string, any>
  groupBy?: string[]
  sortBy?: SortConfig
  displayOptions?: DisplayOptions
}

export interface DataSource {
  type: DataSourceType
  endpoint: string
  method: 'GET' | 'POST'
  parameters?: Record<string, any>
  headers?: Record<string, string>
}

export interface DateRange {
  from: string
  to: string
  preset?: DatePreset
  customRange?: boolean
}

export interface SortConfig {
  field: string
  order: 'asc' | 'desc'
}

export interface DisplayOptions {
  showLegend?: boolean
  showGrid?: boolean
  showTooltips?: boolean
  colorScheme?: ColorScheme
  numberFormat?: NumberFormat
  dateFormat?: string
}

export interface DashboardFilters {
  dateRange?: DateRange
  departments?: string[]
  locations?: string[]
  currencies?: string[]
  customFilters?: Record<string, any>
}

export interface DashboardStats {
  totalReports: number
  activeWidgets: number
  lastUpdated: string
  refreshRate: number
  dataPoints: number
  averageLoadTime: number
}

export interface ReportMetrics {
  totalRevenue: number
  totalExpenses: number
  netProfit: number
  profitMargin: number
  totalOrders: number
  activeCustomers: number
  inventoryValue: number
  cashFlow: number
  accountsReceivable: number
  accountsPayable: number
}

export interface ChartData {
  labels: string[]
  datasets: ChartDataset[]
  metadata?: ChartMetadata
}

export interface ChartDataset {
  label: string
  data: number[]
  backgroundColor?: string | string[]
  borderColor?: string | string[]
  borderWidth?: number
  fill?: boolean
  tension?: number
}

export interface ChartMetadata {
  totalValue?: number
  averageValue?: number
  minValue?: number
  maxValue?: number
  dataCount?: number
  currency?: string
  unit?: string
}

// Enums

export enum WidgetType {
  CHART = 'CHART',
  TABLE = 'TABLE',
  KPI = 'KPI',
  GAUGE = 'GAUGE',
  LIST = 'LIST',
  CALENDAR = 'CALENDAR',
  MAP = 'MAP',
  TEXT = 'TEXT'
}

export enum ChartType {
  LINE = 'LINE',
  BAR = 'BAR',
  COLUMN = 'COLUMN',
  PIE = 'PIE',
  DOUGHNUT = 'DOUGHNUT',
  AREA = 'AREA',
  SCATTER = 'SCATTER',
  RADAR = 'RADAR',
  BUBBLE = 'BUBBLE',
  FUNNEL = 'FUNNEL'
}

export enum DataSourceType {
  SALES = 'SALES',
  FINANCIAL = 'FINANCIAL',
  INVENTORY = 'INVENTORY',
  PURCHASING = 'PURCHASING',
  CRM = 'CRM',
  HR = 'HR',
  PRODUCTION = 'PRODUCTION',
  SERVICE = 'SERVICE',
  CUSTOM = 'CUSTOM',
  REAL_TIME = 'REAL_TIME'
}

export enum DatePreset {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  THIS_WEEK = 'THIS_WEEK',
  LAST_WEEK = 'LAST_WEEK',
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  THIS_QUARTER = 'THIS_QUARTER',
  LAST_QUARTER = 'LAST_QUARTER',
  THIS_YEAR = 'THIS_YEAR',
  LAST_YEAR = 'LAST_YEAR',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS',
  LAST_365_DAYS = 'LAST_365_DAYS',
  CUSTOM = 'CUSTOM'
}

export enum ColorScheme {
  DEFAULT = 'DEFAULT',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  RED = 'RED',
  ORANGE = 'ORANGE',
  PURPLE = 'PURPLE',
  TEAL = 'TEAL',
  RAINBOW = 'RAINBOW',
  MONOCHROME = 'MONOCHROME',
  SAP_BRAND = 'SAP_BRAND'
}

export enum NumberFormat {
  DECIMAL = 'DECIMAL',
  CURRENCY = 'CURRENCY',
  PERCENTAGE = 'PERCENTAGE',
  INTEGER = 'INTEGER',
  ABBREVIATED = 'ABBREVIATED'
}

export enum DashboardTheme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
  AUTO = 'AUTO',
  SAP_HORIZON = 'SAP_HORIZON'
}

// Form Data Interfaces

export interface DashboardFormData {
  name: string
  description?: string
  isDefault: boolean
  layout: DashboardLayout
  theme: DashboardTheme
  widgets: Omit<DashboardWidget, 'id' | 'data' | 'isLoading' | 'error' | 'lastRefresh'>[]
}

export interface WidgetFormData {
  type: WidgetType
  title: string
  position: WidgetPosition
  size: WidgetSize
  config: WidgetConfig
  refreshInterval?: number
}

// Search and Filter Interfaces

export interface DashboardSearchParams {
  search?: string
  userId?: string
  isDefault?: boolean
  dateFrom?: string
  dateTo?: string
  theme?: DashboardTheme
}

export interface ReportSearchParams {
  search?: string
  reportType?: string
  dateFrom?: string
  dateTo?: string
  department?: string
  status?: string
  createdBy?: string
}

// API Response Interfaces

export interface DashboardResponse {
  success: boolean
  data: ReportDashboard
  message?: string
}

export interface DashboardListResponse {
  success: boolean
  data: ReportDashboard[]
  total: number
  page: number
  limit: number
  message?: string
}

export interface WidgetDataResponse {
  success: boolean
  data: ChartData | any[]
  metadata?: ChartMetadata
  message?: string
}

export interface DashboardStatsResponse {
  success: boolean
  data: DashboardStats
  message?: string
}

export interface ReportMetricsResponse {
  success: boolean
  data: ReportMetrics
  message?: string
}

// Export all types
export type {
  ReportDashboard,
  DashboardLayout,
  DashboardWidget,
  WidgetPosition,
  WidgetSize,
  WidgetConfig,
  DataSource,
  DateRange,
  SortConfig,
  DisplayOptions,
  DashboardFilters,
  DashboardStats,
  ReportMetrics,
  ChartData,
  ChartDataset,
  ChartMetadata,
  DashboardFormData,
  WidgetFormData,
  DashboardSearchParams,
  ReportSearchParams,
  DashboardResponse,
  DashboardListResponse,
  WidgetDataResponse,
  DashboardStatsResponse,
  ReportMetricsResponse
}