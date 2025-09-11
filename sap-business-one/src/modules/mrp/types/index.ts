export enum PlanningStatus {
  DRAFT = 'draft',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum RequirementType {
  SAFETY_STOCK = 'safety_stock',
  CUSTOMER_DEMAND = 'customer_demand',
  PRODUCTION_ORDER = 'production_order',
  TRANSFER_ORDER = 'transfer_order',
  FORECAST = 'forecast'
}

export enum OrderType {
  PURCHASE_ORDER = 'purchase_order',
  PRODUCTION_ORDER = 'production_order',
  TRANSFER_ORDER = 'transfer_order'
}

export enum RecommendationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  IMPLEMENTED = 'implemented'
}

export enum ForecastMethod {
  MOVING_AVERAGE = 'moving_average',
  EXPONENTIAL_SMOOTHING = 'exponential_smoothing',
  LINEAR_REGRESSION = 'linear_regression',
  SEASONAL_DECOMPOSITION = 'seasonal_decomposition'
}

export enum ScenarioStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

// MRP Planning
export interface MRPPlan {
  id: string
  name: string
  description?: string
  status: PlanningStatus
  startDate: string
  endDate: string
  planningHorizon: number
  bucketSize: 'daily' | 'weekly' | 'monthly'
  includeForecasts: boolean
  includeSafetyStock: boolean
  createdAt: string
  updatedAt: string
  runBy: string
  completedAt?: string
  results?: PlanningResults
}

export interface PlanningResults {
  totalItems: number
  itemsWithShortage: number
  recommendationsGenerated: number
  totalValue: number
  processingTime: number
}

export interface MRPPlanFormData {
  name: string
  description?: string
  startDate: string
  endDate: string
  planningHorizon: number
  bucketSize: 'daily' | 'weekly' | 'monthly'
  includeForecasts: boolean
  includeSafetyStock: boolean
}

// Requirements
export interface Requirement {
  id: string
  planId: string
  itemCode: string
  itemName: string
  warehouseCode: string
  warehouseName: string
  type: RequirementType
  date: string
  quantity: number
  remainingQuantity: number
  priority: number
  sourceDocumentType?: string
  sourceDocumentNumber?: string
  customerCode?: string
  customerName?: string
}

// Recommendations
export interface OrderRecommendation {
  id: string
  planId: string
  itemCode: string
  itemName: string
  warehouseCode: string
  warehouseName: string
  type: OrderType
  recommendedQuantity: number
  recommendedDate: string
  dueDate: string
  supplierCode?: string
  supplierName?: string
  leadTime: number
  unitCost: number
  totalCost: number
  status: RecommendationStatus
  reason: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  notes?: string
  createdAt: string
  approvedBy?: string
  approvedAt?: string
  implementedAt?: string
}

// Forecasts
export interface Forecast {
  id: string
  itemCode: string
  itemName: string
  warehouseCode?: string
  warehouseName?: string
  method: ForecastMethod
  periodType: 'daily' | 'weekly' | 'monthly'
  startDate: string
  endDate: string
  accuracy: number
  mape: number
  mad: number
  parameters: Record<string, any>
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface ForecastPeriod {
  id: string
  forecastId: string
  date: string
  predictedQuantity: number
  confidence: number
  actualQuantity?: number
  variance?: number
}

export interface ForecastFormData {
  itemCode: string
  warehouseCode?: string
  method: ForecastMethod
  periodType: 'daily' | 'weekly' | 'monthly'
  startDate: string
  endDate: string
  parameters: Record<string, any>
}

// Scenarios
export interface MRPScenario {
  id: string
  name: string
  description?: string
  status: ScenarioStatus
  baselineDate: string
  parameters: ScenarioParameters
  results?: ScenarioResults
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface ScenarioParameters {
  planningHorizon: number
  safetyStockMultiplier: number
  leadTimeBuffer: number
  lotSizingRules: Record<string, any>
  demandAdjustments: DemandAdjustment[]
  supplyAdjustments: SupplyAdjustment[]
}

export interface DemandAdjustment {
  itemCode: string
  adjustmentType: 'percentage' | 'absolute'
  adjustmentValue: number
  effectiveDate: string
  expiryDate?: string
}

export interface SupplyAdjustment {
  supplierCode: string
  itemCode?: string
  leadTimeAdjustment: number
  capacityAdjustment?: number
  effectiveDate: string
  expiryDate?: string
}

export interface ScenarioResults {
  totalCost: number
  totalOrders: number
  serviceLevel: number
  inventoryTurnover: number
  shortage: number
  excess: number
  comparisonToBaseline?: ScenarioComparison
}

export interface ScenarioComparison {
  costDifference: number
  costDifferencePercent: number
  serviceLevel: number
  serviceLevelDifference: number
}

export interface ScenarioFormData {
  name: string
  description?: string
  status: ScenarioStatus
  baselineDate: string
  parameters: ScenarioParameters
}

// Planning Wizard
export interface PlanningWizardStep {
  id: string
  title: string
  description: string
  isCompleted: boolean
  isActive: boolean
  isOptional: boolean
}

export interface WizardData {
  planningScope: {
    itemCodes: string[]
    warehouseCodes: string[]
    includeAll: boolean
  }
  planningPeriod: {
    startDate: string
    endDate: string
    bucketSize: 'daily' | 'weekly' | 'monthly'
  }
  demandSources: {
    customerOrders: boolean
    forecasts: boolean
    safetyStock: boolean
    transferOrders: boolean
  }
  supplyParameters: {
    leadTimeBuffer: number
    safetyStockMultiplier: number
    minimumOrderQuantity: boolean
    lotSizing: 'lot_for_lot' | 'fixed_order_quantity' | 'economic_order_quantity'
  }
  constraints: {
    supplierCapacity: boolean
    productionCapacity: boolean
    warehouseCapacity: boolean
    budgetConstraints: boolean
    maxBudget?: number
  }
  notifications: {
    emailNotifications: boolean
    emailAddresses: string[]
    notifyOnCompletion: boolean
    notifyOnErrors: boolean
  }
}

// Search and Filter interfaces
export interface MRPSearchParams {
  page?: number
  limit?: number
  search?: string
  status?: PlanningStatus | RecommendationStatus | ScenarioStatus
  dateFrom?: string
  dateTo?: string
  itemCode?: string
  warehouseCode?: string
  supplierCode?: string
  type?: OrderType | RequirementType
}

export interface MRPSearchResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Statistics
export interface MRPStats {
  activePlans: number
  totalRecommendations: number
  pendingRecommendations: number
  implementedRecommendations: number
  totalValue: number
  averageAccuracy: number
  serviceLevel: number
  inventoryTurnover: number
}

// Common interfaces
export interface Item {
  code: string
  name: string
  unitOfMeasure: string
  standardCost: number
  leadTime: number
  safetyStock: number
  minimumOrderQuantity: number
}

export interface Warehouse {
  code: string
  name: string
  location: string
}

export interface Supplier {
  code: string
  name: string
  leadTime: number
  reliability: number
}