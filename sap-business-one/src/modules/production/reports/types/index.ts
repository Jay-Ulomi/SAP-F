// Production Reports Types

export enum ReportType {
  PRODUCTION_OVERVIEW = 'production_overview',
  EFFICIENCY_ANALYSIS = 'efficiency_analysis',
  COST_ANALYSIS = 'cost_analysis',
  QUALITY_REPORT = 'quality_report',
  RESOURCE_UTILIZATION = 'resource_utilization',
  MATERIAL_CONSUMPTION = 'material_consumption',
  PRODUCTION_VARIANCE = 'production_variance',
  SCRAP_ANALYSIS = 'scrap_analysis',
}

export enum ReportPeriod {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  THIS_WEEK = 'this_week',
  LAST_WEEK = 'last_week',
  THIS_MONTH = 'this_month',
  LAST_MONTH = 'last_month',
  THIS_QUARTER = 'this_quarter',
  LAST_QUARTER = 'last_quarter',
  THIS_YEAR = 'this_year',
  LAST_YEAR = 'last_year',
  CUSTOM = 'custom',
}

export enum ReportFormat {
  PDF = 'pdf',
  EXCEL = 'excel',
  CSV = 'csv',
  JSON = 'json',
}

export interface ProductionOverview {
  totalOrders: number
  completedOrders: number
  inProgressOrders: number
  delayedOrders: number
  totalValue: number
  averageLeadTime: number
  onTimeDeliveryRate: number
  capacityUtilization: number
  ordersByStatus: Record<string, number>
  ordersByType: Record<string, number>
  dailyProduction: Array<{
    date: string
    orders: number
    value: number
    quantity: number
  }>
}

export interface EfficiencyAnalysis {
  overallEfficiency: number
  resourceEfficiency: Record<string, number>
  machineUptime: number
  setupTime: number
  runTime: number
  idleTime: number
  cycleTime: number
  throughput: number
  oeeScore: number
  efficiencyTrends: Array<{
    date: string
    efficiency: number
    uptime: number
    quality: number
  }>
}

export interface CostAnalysis {
  totalCost: number
  materialCost: number
  laborCost: number
  overheadCost: number
  costPerUnit: number
  costVariance: number
  budgetVariance: number
  costByCategory: Record<string, number>
  costTrends: Array<{
    date: string
    actual: number
    budget: number
    variance: number
  }>
}

export interface QualityReport {
  qualityScore: number
  defectRate: number
  reworkRate: number
  scrapRate: number
  yieldRate: number
  customerComplaints: number
  qualityTrends: Array<{
    date: string
    score: number
    defects: number
    rework: number
  }>
  defectsByCategory: Record<string, number>
  qualityByProduct: Array<{
    product: string
    score: number
    defectRate: number
  }>
}

export interface ResourceUtilization {
  totalResources: number
  activeResources: number
  utilizationRate: number
  resourcesByType: Record<string, number>
  utilizationByResource: Array<{
    resource: string
    type: string
    utilization: number
    capacity: number
    efficiency: number
  }>
  capacityPlanning: Array<{
    date: string
    capacity: number
    demand: number
    utilization: number
  }>
}

export interface MaterialConsumption {
  totalConsumption: number
  consumptionByMaterial: Array<{
    material: string
    planned: number
    actual: number
    variance: number
    cost: number
  }>
  consumptionTrends: Array<{
    date: string
    planned: number
    actual: number
    variance: number
  }>
  wasteAnalysis: Array<{
    material: string
    waste: number
    wasteRate: number
    cost: number
  }>
}

export interface ProductionVariance {
  quantityVariance: number
  timeVariance: number
  costVariance: number
  variancesByOrder: Array<{
    order: string
    plannedQuantity: number
    actualQuantity: number
    plannedTime: number
    actualTime: number
    plannedCost: number
    actualCost: number
  }>
  varianceTrends: Array<{
    date: string
    quantityVariance: number
    timeVariance: number
    costVariance: number
  }>
}

export interface ScrapAnalysis {
  totalScrap: number
  scrapRate: number
  scrapCost: number
  scrapByReason: Record<string, number>
  scrapByProduct: Array<{
    product: string
    scrap: number
    scrapRate: number
    cost: number
  }>
  scrapTrends: Array<{
    date: string
    scrap: number
    rate: number
    cost: number
  }>
}

export interface ProductionReport {
  id: string
  name: string
  type: ReportType
  period: ReportPeriod
  dateFrom: string
  dateTo: string
  filters?: Record<string, any>
  data: 
    | ProductionOverview 
    | EfficiencyAnalysis 
    | CostAnalysis 
    | QualityReport 
    | ResourceUtilization 
    | MaterialConsumption 
    | ProductionVariance 
    | ScrapAnalysis
  generatedAt: string
  generatedBy: string
}

export interface ReportTemplate {
  id: string
  name: string
  type: ReportType
  description: string
  parameters: Array<{
    name: string
    type: 'string' | 'number' | 'date' | 'select' | 'multiselect'
    label: string
    required: boolean
    options?: string[]
    defaultValue?: any
  }>
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ReportSchedule {
  id: string
  name: string
  reportType: ReportType
  period: ReportPeriod
  schedule: string // Cron expression
  recipients: string[]
  format: ReportFormat
  parameters: Record<string, any>
  isActive: boolean
  lastRun?: string
  nextRun: string
  createdBy: string
  createdAt: string
}

export interface ReportFilters {
  search?: string
  type?: ReportType
  period?: ReportPeriod
  dateFrom?: string
  dateTo?: string
  generatedBy?: string
}

export interface ReportSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ReportFilters
}