export interface InventoryTransferLineItem {
  itemCode: string
  description: string
  quantity: number
  uom: string
  unitPrice: number
  fromWarehouse: string
  toWarehouse: string
}

export interface InventoryTransfer {
  id?: string
  documentNo?: string
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  sourceWarehouse: string
  destinationWarehouse: string
  lineItems: InventoryTransferLineItem[]
  status?: 'Draft' | 'Pending' | 'Completed' | 'Cancelled'
  createdAt?: string
  updatedAt?: string
}

export enum TransferStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

// Form data interface
export interface InventoryTransferFormData {
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  sourceWarehouse: string
  destinationWarehouse: string
  lineItems: InventoryTransferLineItem[]
}

// Filters interface
export interface InventoryTransferFilters {
  search?: string
  status?: TransferStatus[]
  sourceWarehouse?: string
  destinationWarehouse?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

// Statistics interface
export interface InventoryTransferStats {
  totalTransfers: number
  completedTransfers: number
  pendingTransfers: number
  draftTransfers: number
  cancelledTransfers: number
  totalValue: number
  averageValue: number
}

// Pagination interface
export interface InventoryTransferPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}