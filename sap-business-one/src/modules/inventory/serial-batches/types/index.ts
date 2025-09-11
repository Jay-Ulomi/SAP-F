// Enums
export enum TrackingType {
  SERIAL = 'serial',
  BATCH = 'batch',
}

export enum SerialBatchStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ISSUED = 'issued',
  RECEIVED = 'received',
  RESERVED = 'reserved',
  EXPIRED = 'expired',
}

export enum SerialBatchLocationType {
  WAREHOUSE = 'warehouse',
  BIN = 'bin',
}

export enum QualityStatus {
  RELEASED = 'released',
  ON_HOLD = 'on_hold',
  REJECTED = 'rejected',
}

// Interfaces
export interface SerialBatchItem {
  id: string
  trackingType: TrackingType
  itemCode: string
  itemName: string
  description?: string
  warehouseCode: string
  warehouseName: string
  locationType: SerialBatchLocationType
  binCode?: string
  binName?: string
  unitOfMeasure: string
  quantity: number
  availableQuantity: number
  committedQuantity: number
  issuedQuantity: number
  unitCost: number
  totalValue: number
  serialNumber?: string
  batchNumber?: string
  lotNumber?: string
  manufactureDate?: Date
  expiryDate?: Date
  admissionDate?: Date
  qualityStatus: QualityStatus
  vendorBatchNumber?: string
  customerBatchNumber?: string
  remarks?: string
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
}

export interface SerialBatchTransaction {
  id: string
  itemId: string
  transactionDate: Date
  documentType: string
  documentNumber: string
  quantity: number
  unitCost: number
  totalValue: number
  warehouseCode: string
  binCode?: string
  remarks?: string
}

export interface SerialBatchFilters {
  trackingType?: TrackingType
  status?: SerialBatchStatus
  warehouseCode?: string
  binCode?: string
  itemCode?: string
  itemGroup?: string
  qualityStatus?: QualityStatus
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface SerialBatchListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: SerialBatchFilters
}

export interface SerialBatchStats {
  totalTrackedItems: number
  totalSerials: number
  totalBatches: number
  expiringSoon: number
  expired: number
  totalValue: number
}

export interface SerialBatchListResponse {
  items: SerialBatchItem[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: SerialBatchStats
}

export interface SerialBatchFormData {
  trackingType: TrackingType
  itemCode: string
  itemName: string
  warehouseCode: string
  locationType: SerialBatchLocationType
  binCode?: string
  unitOfMeasure: string
  quantity: number
  unitCost: number
  serialNumber?: string
  batchNumber?: string
  lotNumber?: string
  manufactureDate?: Date
  expiryDate?: Date
  admissionDate?: Date
  qualityStatus: QualityStatus
  remarks?: string
}
