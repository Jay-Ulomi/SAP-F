// Enums
export enum GroupType {
  ITEM_GROUP = 'item_group',
  WAREHOUSE = 'warehouse',
  LOCATION = 'location',
}

export enum WarehouseType {
  MAIN = 'main',
  SECONDARY = 'secondary',
  STORAGE = 'storage',
  RETAIL = 'retail',
  PRODUCTION = 'production',
}

export enum LocationType {
  AISLE = 'aisle',
  RACK = 'rack',
  SHELF = 'shelf',
  BIN = 'bin',
  ZONE = 'zone',
}

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  CLOSED = 'closed',
}

// Interfaces
export interface ItemGroup {
  id: string
  groupCode: string
  groupName: string
  description?: string
  parentGroupId?: string
  level: number
  isLeaf: boolean
  itemCount: number
  status: Status
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface Warehouse {
  id: string
  warehouseCode: string
  warehouseName: string
  description?: string
  type: WarehouseType
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  contactInfo?: {
    phone?: string
    email?: string
    manager?: string
  }
  capacity?: {
    totalCapacity: number
    usedCapacity: number
    availableCapacity: number
  }
  status: Status
  isDefault: boolean
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface Location {
  id: string
  locationCode: string
  locationName: string
  description?: string
  warehouseId: string
  warehouseCode: string
  type: LocationType
  parentLocationId?: string
  level: number
  isLeaf: boolean
  capacity?: {
    totalCapacity: number
    usedCapacity: number
    availableCapacity: number
  }
  coordinates?: {
    x?: number
    y?: number
    z?: number
  }
  status: Status
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

// Form Data Interfaces
export interface ItemGroupFormData {
  groupCode: string
  groupName: string
  description?: string
  parentGroupId?: string
  status: Status
}

export interface WarehouseFormData {
  warehouseCode: string
  warehouseName: string
  description?: string
  type: WarehouseType
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  contactInfo?: {
    phone?: string
    email?: string
    manager?: string
  }
  capacity?: {
    totalCapacity: number
  }
  status: Status
  isDefault: boolean
}

export interface LocationFormData {
  locationCode: string
  locationName: string
  description?: string
  warehouseId: string
  type: LocationType
  parentLocationId?: string
  capacity?: {
    totalCapacity: number
  }
  coordinates?: {
    x?: number
    y?: number
    z?: number
  }
  status: Status
}

// Stats Interfaces
export interface GroupsWarehousesStats {
  totalGroups: number
  activeGroups: number
  totalWarehouses: number
  activeWarehouses: number
  totalLocations: number
  activeLocations: number
  totalCapacity: number
  usedCapacity: number
  availableCapacity: number
}

// Filter Interfaces
export interface GroupsWarehousesFilters {
  search?: string
  type?: GroupType
  status?: Status
  warehouseType?: WarehouseType
  locationType?: LocationType
  warehouseId?: string
}

// Search Parameters
export interface GroupsWarehousesSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: GroupsWarehousesFilters
}

// API Response Interfaces
export interface GroupsWarehousesResponse {
  data: (ItemGroup | Warehouse | Location)[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface GroupsWarehousesStatsResponse {
  stats: GroupsWarehousesStats
}
