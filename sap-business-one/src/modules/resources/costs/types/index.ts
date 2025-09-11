// Resource Costs Types

export enum CostType {
  STANDARD = 'standard',
  ACTUAL = 'actual',
  PLANNED = 'planned',
  BUDGETED = 'budgeted',
}

export enum CostPeriod {
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export interface ResourceCost {
  id: string
  resourceId: string
  resourceCode: string
  resourceName: string
  costType: CostType
  costPeriod: CostPeriod
  standardRate: number
  overtimeRate?: number
  actualRate?: number
  variance: number
  variancePercent: number
  effectiveFrom: string
  effectiveTo?: string
  currency: string
  isActive: boolean
  costBreakdown?: {
    labor?: number
    materials?: number
    overhead?: number
    other?: number
  }
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ResourceCostStats {
  totalCostPerHour: number
  averageCostPerHour: number
  costVariance: number
  costVariancePercent: number
  activeCostRates: number
  costsByType: Record<CostType, number>
}

export interface ResourceCostFormData {
  resourceId: string
  costType: CostType
  costPeriod: CostPeriod
  standardRate: number
  overtimeRate?: number
  actualRate?: number
  effectiveFrom: string
  effectiveTo?: string
  currency: string
  isActive: boolean
  costBreakdown?: {
    labor?: number
    materials?: number
    overhead?: number
    other?: number
  }
}

export interface CostFilters {
  search?: string
  costType?: CostType
  resourceId?: string
}