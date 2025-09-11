// Item Master Data Types

export enum ItemType {
  INVENTORY = 'inventory',
  SERVICE = 'service',
  ASSET = 'asset',
  CONSUMABLE = 'consumable',
}

export enum ItemStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DISCONTINUED = 'discontinued',
  PLANNED = 'planned',
}

export enum ItemGroup {
  RAW_MATERIALS = 'raw_materials',
  FINISHED_GOODS = 'finished_goods',
  SEMI_FINISHED = 'semi_finished',
  SPARE_PARTS = 'spare_parts',
  CONSUMABLES = 'consumables',
  SERVICES = 'services',
}

export enum ValuationMethod {
  FIFO = 'fifo',
  LIFO = 'lifo',
  AVERAGE = 'average',
  STANDARD = 'standard',
}

export enum UnitOfMeasure {
  PIECE = 'piece',
  KILOGRAM = 'kilogram',
  LITER = 'liter',
  METER = 'meter',
  HOUR = 'hour',
  BOX = 'box',
  PALLET = 'pallet',
}

export interface Item {
  id: string
  itemCode: string
  itemName: string
  description?: string
  type: ItemType
  status: ItemStatus
  group: ItemGroup
  unitOfMeasure: UnitOfMeasure
  baseUnitPrice: number
  standardCost: number
  valuationMethod: ValuationMethod
  minStockLevel: number
  maxStockLevel: number
  reorderPoint: number
  reorderQuantity: number
  supplierCode?: string
  supplierName?: string
  barcode?: string
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  taxCode?: string
  glAccount?: string
  warehouseCode?: string
  location?: string
  notes?: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ItemFormData {
  itemCode: string
  itemName: string
  description?: string
  type: ItemType
  status: ItemStatus
  group: ItemGroup
  unitOfMeasure: UnitOfMeasure
  baseUnitPrice: number
  standardCost: number
  valuationMethod: ValuationMethod
  minStockLevel: number
  maxStockLevel: number
  reorderPoint: number
  reorderQuantity: number
  supplierCode?: string
  supplierName?: string
  barcode?: string
  weight?: number
  dimensions?: {
    length?: number
    width?: number
    height?: number
  }
  taxCode?: string
  glAccount?: string
  warehouseCode?: string
  location?: string
  notes?: string
}

export interface ItemStats {
  totalItems: number
  activeItems: number
  inactiveItems: number
  lowStockItems: number
  outOfStockItems: number
  totalValue: number
  averageCost: number
  itemsByType: Record<ItemType, number>
  itemsByGroup: Record<ItemGroup, number>
}

export interface ItemFilters {
  search?: string
  type?: ItemType
  status?: ItemStatus
  group?: ItemGroup
  warehouseCode?: string
  lowStock?: boolean
  outOfStock?: boolean
}

export interface ItemSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ItemFilters
}
