// Resource Groups Types

export enum GroupType {
  PRODUCTION = 'production',
  MAINTENANCE = 'maintenance',
  QUALITY = 'quality',
  LOGISTICS = 'logistics',
  SUPPORT = 'support',
}

export enum GroupStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PLANNING = 'planning',
}

export interface ResourceGroup {
  id: string
  groupCode: string
  groupName: string
  description?: string
  type: GroupType
  status: GroupStatus
  parentGroupId?: string
  parentGroupName?: string
  departmentId?: string
  departmentName?: string
  costCenterId?: string
  costCenterName?: string
  totalResources: number
  availableResources: number
  totalCapacity: number
  usedCapacity: number
  efficiency: number
  standardCostPerHour: number
  overtimeCostPerHour?: number
  shiftPattern?: string
  workingDays?: string[]
  operatingHours?: {
    start: string
    end: string
  }
  resources?: Array<{
    id: string
    code: string
    name: string
    type: string
    status: string
  }>
  restrictions?: string[]
  notes?: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ResourceGroupFormData {
  groupCode: string
  groupName: string
  description?: string
  type: GroupType
  status: GroupStatus
  parentGroupId?: string
  departmentId?: string
  costCenterId?: string
  standardCostPerHour: number
  overtimeCostPerHour?: number
  shiftPattern?: string
  workingDays?: string[]
  operatingHours?: {
    start: string
    end: string
  }
  restrictions?: string[]
  notes?: string
}

export interface ResourceGroupStats {
  totalGroups: number
  activeGroups: number
  totalResources: number
  availableResources: number
  totalCapacity: number
  usedCapacity: number
  averageEfficiency: number
  groupsByType: Record<GroupType, number>
}

export interface ResourceGroupFilters {
  search?: string
  type?: GroupType
  status?: GroupStatus
  departmentId?: string
  parentGroupId?: string
  minResources?: number
  maxResources?: number
}

export interface ResourceGroupSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ResourceGroupFilters
}