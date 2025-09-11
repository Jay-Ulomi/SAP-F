// Resource Capacities Types

export enum CapacityType {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum CapacityUnit {
  HOURS = 'hours',
  PIECES = 'pieces',
  UNITS = 'units',
  TONS = 'tons',
  CYCLES = 'cycles',
}

export enum PlanningStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface ResourceCapacity {
  id: string
  resourceId: string
  resourceCode: string
  resourceName: string
  resourceType: string
  periodStart: string
  periodEnd: string
  capacityType: CapacityType
  totalCapacity: number
  availableCapacity: number
  allocatedCapacity: number
  utilizationRate: number
  capacityUnit: CapacityUnit
  workingDays: string[]
  workingHoursPerDay: number
  shiftPattern?: string
  efficiency: number
  overCapacityAllowed: boolean
  maxOverCapacity?: number
  priority: number
  status: PlanningStatus
  notes?: string
  allocations?: Array<{
    id: string
    orderNumber: string
    orderType: string
    allocatedCapacity: number
    plannedStart: string
    plannedEnd: string
    status: string
  }>
  restrictions?: string[]
  lastCalculated: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ResourceCapacityFormData {
  resourceId: string
  periodStart: string
  periodEnd: string
  capacityType: CapacityType
  totalCapacity: number
  capacityUnit: CapacityUnit
  workingDays: string[]
  workingHoursPerDay: number
  shiftPattern?: string
  efficiency: number
  overCapacityAllowed: boolean
  maxOverCapacity?: number
  priority: number
  status: PlanningStatus
  notes?: string
  restrictions?: string[]
}

export interface ResourceCapacityStats {
  totalCapacities: number
  totalCapacityHours: number
  totalAllocatedHours: number
  totalAvailableHours: number
  averageUtilization: number
  overAllocatedCapacities: number
  underUtilizedCapacities: number
  capacitiesByType: Record<CapacityType, number>
  capacitiesByStatus: Record<PlanningStatus, number>
}

export interface CapacityFilters {
  search?: string
  resourceId?: string
  capacityType?: CapacityType
  status?: PlanningStatus
  periodStart?: string
  periodEnd?: string
  minUtilization?: number
  maxUtilization?: number
  overAllocated?: boolean
}

export interface CapacitySearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: CapacityFilters
}