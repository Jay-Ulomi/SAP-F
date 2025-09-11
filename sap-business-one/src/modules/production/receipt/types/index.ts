// Production Receipt Types

export enum ReceiptType {
  PRODUCTION = 'production',
  BYPRODUCT = 'byproduct',
  REWORK = 'rework',
  SCRAP = 'scrap',
}

export enum ReceiptStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  PARTIALLY_RECEIVED = 'partially_received',
  FULLY_RECEIVED = 'fully_received',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum QualityStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ON_HOLD = 'on_hold',
}

export interface ReceiptItem {
  id: string
  itemCode: string
  itemName: string
  plannedQuantity: number
  receivedQuantity: number
  remainingQuantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  binLocation?: string
  batchNumbers?: string[]
  serialNumbers?: string[]
  unitCost: number
  totalCost: number
  qualityStatus: QualityStatus
  expirationDate?: string
  notes?: string
}

export interface ProductionReceipt {
  id: string
  receiptNumber: string
  type: ReceiptType
  status: ReceiptStatus
  productionOrderId?: string
  productionOrderNumber?: string
  itemCode: string
  itemName: string
  plannedQuantity: number
  receivedQuantity: number
  remainingQuantity: number
  warehouseCode: string
  warehouseName: string
  bomCode?: string
  bomVersion?: string
  receiptDate: string
  plannedReceiptDate?: string
  completionDate?: string
  items: ReceiptItem[]
  totalCost: number
  yieldPercentage: number
  scrapQuantity?: number
  scrapReason?: string
  qualityStatus: QualityStatus
  remarks?: string
  attachments?: string[]
  receivedBy?: string
  receivedAt?: string
  approvedBy?: string
  approvedAt?: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface ProductionReceiptFormData {
  receiptNumber?: string
  type: ReceiptType
  status: ReceiptStatus
  productionOrderId?: string
  itemCode: string
  plannedQuantity: number
  warehouseCode: string
  bomCode?: string
  bomVersion?: string
  receiptDate: string
  plannedReceiptDate?: string
  qualityStatus: QualityStatus
  remarks?: string
}

export interface ProductionReceiptStats {
  totalReceipts: number
  draftReceipts: number
  openReceipts: number
  partiallyReceivedReceipts: number
  fullyReceivedReceipts: number
  closedReceipts: number
  cancelledReceipts: number
  pendingQualityReceipts: number
  totalReceivedValue: number
  averageReceiptValue: number
  totalItemsReceived: number
  averageYield: number
  receiptsByType: Record<ReceiptType, number>
  receiptsByStatus: Record<ReceiptStatus, number>
  receiptsByQualityStatus: Record<QualityStatus, number>
  topReceivedItems: Array<{
    itemCode: string
    itemName: string
    totalQuantity: number
    totalValue: number
  }>
}

export interface ProductionReceiptFilters {
  search?: string
  status?: ReceiptStatus
  type?: ReceiptType
  qualityStatus?: QualityStatus
  productionOrderId?: string
  itemCode?: string
  warehouseCode?: string
  receiptDateFrom?: string
  receiptDateTo?: string
  completionDateFrom?: string
  completionDateTo?: string
}

export interface ProductionReceiptSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ProductionReceiptFilters
}