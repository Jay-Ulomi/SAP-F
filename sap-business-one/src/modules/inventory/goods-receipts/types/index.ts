// Enums
export enum GoodsReceiptType {
  RECEIPT = 'receipt',
  ISSUE = 'issue',
  TRANSFER = 'transfer',
  ADJUSTMENT = 'adjustment',
  RETURN = 'return',
}

export enum GoodsReceiptStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  APPROVED = 'approved',
  POSTED = 'posted',
  CANCELLED = 'cancelled',
}

export enum TransactionType {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
  INTERNAL = 'internal',
}

export enum DocumentType {
  PURCHASE_ORDER = 'purchase_order',
  SALES_ORDER = 'sales_order',
  TRANSFER_ORDER = 'transfer_order',
  MANUAL = 'manual',
  ADJUSTMENT = 'adjustment',
}

// Interfaces
export interface GoodsReceiptItem {
  id: string
  itemCode: string
  itemName: string
  description?: string
  quantity: number
  unitPrice: number
  totalAmount: number
  warehouseCode: string
  locationCode?: string
  batchNumber?: string
  serialNumber?: string
  expiryDate?: Date
  lotNumber?: string
  remarks?: string
}

export interface GoodsReceipt {
  id: string
  documentNumber: string
  type: GoodsReceiptType
  status: GoodsReceiptStatus
  transactionType: TransactionType
  documentType: DocumentType
  referenceDocument?: string
  referenceNumber?: string
  date: Date
  postingDate?: Date
  warehouseCode: string
  warehouseName: string
  locationCode?: string
  locationName?: string
  supplierCode?: string
  supplierName?: string
  customerCode?: string
  customerName?: string
  employeeCode: string
  employeeName: string
  department?: string
  project?: string
  totalQuantity: number
  totalAmount: number
  currency: string
  exchangeRate: number
  remarks?: string
  items: GoodsReceiptItem[]
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
  approvedBy?: string
  approvedDate?: Date
  postedBy?: string
  postedDate?: Date
}

export interface GoodsReceiptFormData {
  type: GoodsReceiptType
  transactionType: TransactionType
  documentType: DocumentType
  referenceDocument?: string
  referenceNumber?: string
  date: Date
  postingDate?: Date
  warehouseCode: string
  locationCode?: string
  supplierCode?: string
  customerCode?: string
  employeeCode: string
  department?: string
  project?: string
  currency: string
  exchangeRate: number
  remarks?: string
  items: Omit<GoodsReceiptItem, 'id' | 'totalAmount'>[]
}

export interface GoodsReceiptStats {
  totalReceipts: number
  totalIssues: number
  totalTransfers: number
  totalAdjustments: number
  totalReturns: number
  pendingApprovals: number
  totalValue: number
  averageProcessingTime: number
}

export interface GoodsReceiptFilters {
  type?: GoodsReceiptType
  status?: GoodsReceiptStatus
  transactionType?: TransactionType
  documentType?: DocumentType
  warehouseCode?: string
  supplierCode?: string
  customerCode?: string
  employeeCode?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface GoodsReceiptListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: GoodsReceiptFilters
}

export interface GoodsReceiptListResponse {
  items: GoodsReceipt[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: GoodsReceiptStats
}
