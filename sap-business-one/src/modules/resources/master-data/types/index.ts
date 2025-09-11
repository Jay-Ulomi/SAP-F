// Resource Master Data Types

export enum ResourceType {
  MACHINE = 'machine',
  LABOR = 'labor',
  TOOL = 'tool',
  FACILITY = 'facility',
  EQUIPMENT = 'equipment',
}

export enum ResourceStatus {
  AVAILABLE = 'available',
  IN_USE = 'in_use',
  MAINTENANCE = 'maintenance',
  UNAVAILABLE = 'unavailable',
  RETIRED = 'retired',
}

export enum ResourceCategory {
  PRODUCTION = 'production',
  ASSEMBLY = 'assembly',
  QUALITY = 'quality',
  PACKAGING = 'packaging',
  MAINTENANCE = 'maintenance',
}

export interface Resource {
  id: string
  resourceCode: string
  resourceName: string
  description?: string
  type: ResourceType
  status: ResourceStatus
  category: ResourceCategory
  groupId?: string
  groupName?: string
  costCenterId?: string
  costCenterName?: string
  departmentId?: string
  departmentName?: string
  locationId?: string
  locationName?: string
  capacityPerDay: number
  capacityUnit: string
  standardCostPerHour: number
  overtimeCostPerHour?: number
  efficiency: number
  utilizationRate: number
  maintenanceSchedule?: string
  nextMaintenanceDate?: string
  specifications?: {
    model?: string
    manufacturer?: string
    serialNumber?: string
    purchaseDate?: string
    warrantyExpiry?: string
  }
  skills?: string[]
  certifications?: string[]
  restrictions?: string[]
  notes?: string
  attachments?: string[]
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ResourceFormData {
  resourceCode: string
  resourceName: string
  description?: string
  type: ResourceType
  status: ResourceStatus
  category: ResourceCategory
  groupId?: string
  costCenterId?: string
  departmentId?: string
  locationId?: string
  capacityPerDay: number
  capacityUnit: string
  standardCostPerHour: number
  overtimeCostPerHour?: number
  efficiency: number
  maintenanceSchedule?: string
  nextMaintenanceDate?: string
  specifications?: {
    model?: string
    manufacturer?: string
    serialNumber?: string
    purchaseDate?: string
    warrantyExpiry?: string
  }
  skills?: string[]
  certifications?: string[]
  restrictions?: string[]
  notes?: string
}

export interface ResourceStats {
  totalResources: number
  availableResources: number
  inUseResources: number
  maintenanceResources: number
  averageUtilization: number
  averageEfficiency: number
  totalCapacity: number
  usedCapacity: number
  resourcesByType: Record<ResourceType, number>
  resourcesByCategory: Record<ResourceCategory, number>
}

export interface ResourceFilters {
  search?: string
  type?: ResourceType
  status?: ResourceStatus
  category?: ResourceCategory
  groupId?: string
  departmentId?: string
  locationId?: string
  minCapacity?: number
  maxCapacity?: number
}

export interface ResourceSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ResourceFilters
}