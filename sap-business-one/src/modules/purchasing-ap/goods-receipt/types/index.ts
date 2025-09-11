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
  unitPrice: number
  taxCode: string
  taxPercent: number
  taxAmount: number
  lineTotal: number
  accountCode: string
  costCenter: string
  projectCode?: string
  warehouseCode: string
  binLocation?: string
  batchNumber?: string
  serialNumber?: string
  qualityStatus: QualityStatus
  qualityNotes?: string
  vendorNotes?: string
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

export interface GoodsReceiptFormData {
  receiptNumber: string
  receiptDate: string
  postingDate: string
  type: ReceiptType
  currency: Currency
  vendorCode: string
  purchaseOrderId: string
  warehouseCode: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  lineItems: Omit<GoodsReceiptLineItem, 'id' | 'lineTotal' | 'taxAmount'>[]
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
