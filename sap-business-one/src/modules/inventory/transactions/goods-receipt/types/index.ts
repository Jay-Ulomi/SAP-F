export interface GoodsReceiptLineItem {
  itemCode: string
  description: string
  quantity: number
  unitPrice: number
  uomCode: string
  accountName: string
  dimension1: string
  dimension2: string
  dimension3: string
  dimension4: string
  warehouse: string
  project: string
  lineTotal: number
}

export interface GoodsReceipt {
  id?: number
  documentNo: string
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  supplier: string
  warehouse: string
  lineItems: GoodsReceiptLineItem[]
  itemsCount: number
  totalAmount: number
  status?: 'Draft' | 'Pending' | 'Received' | 'Cancelled'
  createdAt?: string
  updatedAt?: string
}

export enum ReceiptStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  RECEIVED = 'Received',
  CANCELLED = 'Cancelled'
}

// Form data interface
export interface GoodsReceiptFormData {
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  supplier: string
  warehouse: string
  lineItems: GoodsReceiptLineItem[]
}

// Filters interface
export interface GoodsReceiptFilters {
  search?: string
  status?: ReceiptStatus[]
  supplier?: string
  warehouse?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

// Statistics interface
export interface GoodsReceiptStats {
  totalReceipts: number
  receivedReceipts: number
  pendingReceipts: number
  draftReceipts: number
  cancelledReceipts: number
  totalValue: number
  averageValue: number
}

// Pagination interface
export interface GoodsReceiptPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}