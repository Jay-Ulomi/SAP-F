// Resource Planning Types

export type PlanType = 'capacity' | 'production' | 'maintenance' | 'utilization'
export type PlanningHorizon = 'short' | 'medium' | 'long'  
export type PlanningUnit = 'hours' | 'days' | 'weeks' | 'months'
export type PlanningStatus = 'draft' | 'active' | 'review' | 'approved' | 'completed' | 'cancelled'

export interface ResourcePlan {
  id: string
  resourceId: string
  resourceCode: string
  resourceName: string
  planType: PlanType
  planningHorizon: PlanningHorizon
  planningUnit: PlanningUnit
  planStart: string
  planEnd: string
  targetCapacity: number
  targetUtilization: number
  targetEfficiency: number
  bufferCapacity?: number
  constraints?: string
  requirements?: string
  allowOvercapacity: boolean
  autoAdjust: boolean
  considerSeasonality: boolean
  priority: number
  status: PlanningStatus
  notes?: string
  actualCapacity?: number
  actualUtilization?: number
  actualEfficiency?: number
  progress?: number
  createdBy: string
  createdAt: string
  lastCalculated?: string
}

export interface ResourcePlanFormData {
  resourceId: string
  planType: PlanType
  planningHorizon: PlanningHorizon
  planningUnit: PlanningUnit
  planStart: string
  planEnd: string
  targetCapacity: number
  targetUtilization: number
  targetEfficiency: number
  bufferCapacity?: number
  constraints?: string
  requirements?: string
  allowOvercapacity: boolean
  autoAdjust: boolean
  considerSeasonality: boolean
  priority: number
  status: PlanningStatus
  notes?: string
}

export interface PlanningStats {
  activePlans: number
  scheduledTasks: number
  optimization: number
  conflicts: number
}