// Enums
export enum TransferType {
  WAREHOUSE_TO_WAREHOUSE = 'warehouse_to_warehouse',
  LOCATION_TO_LOCATION = 'location_to_location',
  BRANCH_TO_BRANCH = 'branch_to_branch',
  INTERNAL = 'internal',
  EXTERNAL = 'external',
}

export enum TransferStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  IN_TRANSIT = 'in_transit',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum TransferPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TransferReason {
  STOCK_REBALANCING = 'stock_rebalancing',
  CUSTOMER_ORDER = 'customer_order',
  PRODUCTION_NEED = 'production_need',
  MAINTENANCE = 'maintenance',
  DAMAGE_REPLACEMENT = 'damage_replacement',
  SEASONAL_ADJUSTMENT = 'seasonal_adjustment',
  OTHER = 'other',
}

// Interfaces
export interface TransferItem {
  id: string
  itemCode: string
  itemName: string
  description?: string
  quantity: number
  unitPrice: number
  totalAmount: number
  fromWarehouseCode: string
  fromLocationCode?: string
  toWarehouseCode: string
  toLocationCode?: string
  batchNumber?: string
  serialNumber?: string
  expiryDate?: Date
  lotNumber?: string
  remarks?: string
}

export interface InventoryTransfer {
  id: string
  transferNumber: string
  type: TransferType
  status: TransferStatus
  priority: TransferPriority
  reason: TransferReason
  date: Date
  requestedDate?: Date
  expectedDate?: Date
  actualDate?: Date
  fromWarehouseCode: string
  fromWarehouseName: string
  fromLocationCode?: string
  fromLocationName?: string
  toWarehouseCode: string
  toWarehouseName: string
  toLocationCode?: string
  toLocationName?: string
  requestedBy: string
  requestedByName: string
  approvedBy?: string
  approvedByName?: string
  department?: string
  project?: string
  totalQuantity: number
  totalAmount: number
  currency: string
  exchangeRate: number
  shippingMethod?: string
  trackingNumber?: string
  remarks?: string
  items: TransferItem[]
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
  approvedDate?: Date
  completedDate?: Date
}

export interface TransferFormData {
  type: TransferType
  priority: TransferPriority
  reason: TransferReason
  date: Date
  requestedDate?: Date
  expectedDate?: Date
  fromWarehouseCode: string
  fromLocationCode?: string
  toWarehouseCode: string
  toLocationCode?: string
  requestedBy: string
  department?: string
  project?: string
  currency: string
  exchangeRate: number
  shippingMethod?: string
  remarks?: string
  items: Omit<TransferItem, 'id' | 'totalAmount'>[]
}

export interface TransferStats {
  totalTransfers: number
  pendingTransfers: number
  inTransitTransfers: number
  completedTransfers: number
  cancelledTransfers: number
  urgentTransfers: number
  totalValue: number
  averageProcessingTime: number
}

export interface TransferFilters {
  type?: TransferType
  status?: TransferStatus
  priority?: TransferPriority
  reason?: TransferReason
  fromWarehouseCode?: string
  toWarehouseCode?: string
  requestedBy?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface TransferListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: TransferFilters
}

export interface TransferListResponse {
  items: InventoryTransfer[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: TransferStats
}
