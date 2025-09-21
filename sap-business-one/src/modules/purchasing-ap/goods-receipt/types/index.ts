// Goods Receipt POs Types

export enum GoodsReceiptStatus {
  DRAFT = 'DRAFT',
  POSTED = 'POSTED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum ReceiptType {
  FULL = 'FULL',
  PARTIAL = 'PARTIAL',
  OVER_RECEIPT = 'OVER_RECEIPT',
}

export enum QualityStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  QUARANTINE = 'QUARANTINE',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  JPY = 'JPY',
  CHF = 'CHF',
}

export enum TaxType {
  SALES_TAX = 'SALES_TAX',
  VAT = 'VAT',
  GST = 'GST',
  HST = 'HST',
  EXEMPT = 'EXEMPT',
}

export interface Vendor {
  id: string
  code: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: VendorAddress
  currency: Currency
  taxCode: string
  active: boolean
}

export interface VendorAddress {
  street: string
  city: string
  state: string
  country: string
  postalCode: string
}

export interface PurchaseOrder {
  id: string
  docNum: string
  orderNumber: string
  orderDate: string
  deliveryDate: string
  vendorCode: string
  vendorName: string
  totalAmount: number
  currency: Currency
  status: string
}

export interface GoodsReceiptLineItem {
  id: string
  itemCode: string
  itemName: string
  description: string
  orderedQuantity: number
  receivedQuantity: number
  quantity?: number // for UI compatibility
  unitPrice: number
  discount?: number // for UI compatibility
  taxCode: string
  taxPercent: number
  taxAmount: number
  lineTotal: number
  accountCode: string
  costCenter: string
  projectCode?: string
  warehouseCode: string
  warehouse?: string // for UI compatibility
  binLocation?: string
  batchNumber?: string
  serialNumber?: string
  qualityStatus: QualityStatus
  qualityNotes?: string
  vendorNotes?: string
  uom?: string // unit of measure for UI
  dimension1?: string // for UI dimensions
  dimension2?: string
  dimension3?: string
  dimension4?: string
}

export interface GoodsReceipt {
  id: string
  docNum: string
  docEntry: number
  receiptNumber: string
  receiptDate: string
  postingDate: string
  type: ReceiptType
  status: GoodsReceiptStatus
  currency: Currency
  subtotal: number
  taxTotal: number
  totalAmount: number
  vendorCode: string
  vendorName: string
  vendorContact: string
  vendorEmail: string
  vendorPhone: string
  purchaseOrderId: string
  purchaseOrderNumber: string
  warehouseCode: string
  warehouseName: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  qualityNotes?: string
  lineItems: GoodsReceiptLineItem[]
  createdAt: string
  updatedAt: string
}

export interface ServiceItem {
  description: string
  discount: number
  totalLC: number
  taxCode: string
  dimension1?: string
  dimension2?: string
  dimension3?: string
  dimension4?: string
  warehouse?: string
}

export interface GoodsReceiptFormData {
  series: string
  postingDate: string
  dueDate: string
  documentDate?: string
  vendorCode: string
  vendorName: string
  contactPerson: string
  referenceNo: string
  requestType: string
  type: string
  currency: string
  remarks?: string
  receiptNumber: string
  receiptDate: string
  purchaseOrderId: string
  warehouseCode: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  freightType?: string
  freightAmount?: number
  lineItems: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>[]
  serviceItems: ServiceItem[]
}

export interface GoodsReceiptFilters {
  status?: GoodsReceiptStatus
  type?: ReceiptType
  vendorCode?: string
  warehouseCode?: string
  department?: string
  costCenter?: string
  projectCode?: string
  search?: string
  receiptDateFrom?: string
  receiptDateTo?: string
  postingDateFrom?: string
  postingDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface GoodsReceiptStats {
  totalReceipts: number
  draftReceipts: number
  postedReceipts: number
  cancelledReceipts: number
  totalAmount: number
  averageReceiptValue: number
  receiptsByStatus: { status: GoodsReceiptStatus; count: number }[]
  receiptsByType: { type: ReceiptType; count: number }[]
  receiptsByVendor: { vendor: string; count: number; amount: number }[]
  receiptsByWarehouse: { warehouse: string; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface GoodsReceiptPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}
