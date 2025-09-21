// Purchase Returns Types

export enum PurchaseReturnStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  POSTED = 'POSTED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum ReturnType {
  STANDARD = 'STANDARD',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  DAMAGED = 'DAMAGED',
  OVERAGE = 'OVERAGE',
  EXPIRED = 'EXPIRED',
}

export enum ReturnReason {
  DEFECTIVE = 'DEFECTIVE',
  WRONG_ITEM = 'WRONG_ITEM',
  DAMAGED_IN_TRANSIT = 'DAMAGED_IN_TRANSIT',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  OVERDELIVERY = 'OVERDELIVERY',
  CUSTOMER_REQUEST = 'CUSTOMER_REQUEST',
  EXPIRED = 'EXPIRED',
  OTHER = 'OTHER',
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

export interface PurchaseReturnLineItem {
  id: string
  itemCode: string
  itemName: string
  description: string
  originalQuantity: number
  returnQuantity: number
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
  returnReason: ReturnReason
  notes?: string
  goodsReceiptId?: string
  goodsReceiptLineId?: string
}

export interface PurchaseReturn {
  id: string
  docNum: string
  docEntry: number
  returnNumber: string
  returnDate: string
  postingDate: string
  type: ReturnType
  status: PurchaseReturnStatus
  currency: Currency
  subtotal: number
  taxTotal: number
  totalAmount: number
  vendorCode: string
  vendorName: string
  vendorContact: string
  vendorEmail: string
  vendorPhone: string
  goodsReceiptId?: string
  goodsReceiptNumber?: string
  warehouseCode: string
  warehouseName: string
  department: string
  costCenter: string
  projectCode?: string
  returnReason: ReturnReason
  notes?: string
  lineItems: PurchaseReturnLineItem[]
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

export interface PurchaseReturnFormData {
  returnNumber: string
  returnDate: string
  postingDate: string
  validTill?: string
  documentDate?: string
  requiredDate?: string
  vendorCode: string
  vendorName?: string
  contactPerson?: string
  referenceNo?: string
  requestType?: string
  type: string
  currency: Currency
  remarks?: string
  goodsReceiptId?: string
  warehouseCode: string
  department: string
  costCenter: string
  projectCode?: string
  returnReason: ReturnReason
  notes?: string
  freightType?: string
  freightAmount?: number
  lineItems: any[]
  serviceItems: ServiceItem[]
}

export interface PurchaseReturnFilters {
  status?: PurchaseReturnStatus
  type?: ReturnType
  returnReason?: ReturnReason
  vendorCode?: string
  warehouseCode?: string
  department?: string
  costCenter?: string
  projectCode?: string
  search?: string
  returnDateFrom?: string
  returnDateTo?: string
  postingDateFrom?: string
  postingDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface PurchaseReturnStats {
  totalReturns: number
  draftReturns: number
  openReturns: number
  postedReturns: number
  cancelledReturns: number
  totalAmount: number
  averageReturnValue: number
  returnsByStatus: { status: PurchaseReturnStatus; count: number }[]
  returnsByType: { type: ReturnType; count: number }[]
  returnsByReason: { reason: ReturnReason; count: number }[]
  returnsByVendor: { vendor: string; count: number; amount: number }[]
  returnsByWarehouse: { warehouse: string; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface PurchaseReturnPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}
