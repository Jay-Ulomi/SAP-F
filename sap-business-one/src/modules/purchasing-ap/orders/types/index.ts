// Purchase Orders Types

export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  RELEASED = 'RELEASED',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  FULLY_RECEIVED = 'FULLY_RECEIVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum PurchaseOrderType {
  MATERIAL = 'MATERIAL',
  SERVICE = 'SERVICE',
  ASSET = 'ASSET',
  EXPENSE = 'EXPENSE',
  CAPITAL = 'CAPITAL',
}

export enum OrderPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
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

export interface PurchaseOrderLineItem {
  id: string
  itemCode: string
  itemName: string
  description: string
  quantity: number
  unitPrice: number
  taxCode: string
  taxPercent: number
  taxAmount: number
  lineTotal: number
  accountCode: string
  costCenter: string
  projectCode?: string
  warehouseCode?: string
  deliveryDate: string
  priority: OrderPriority
  receivedQuantity: number
  remainingQuantity: number
  vendorNotes?: string
}

export interface PurchaseOrder {
  id: string
  docNum: string
  docEntry: number
  orderNumber: string
  orderDate: string
  deliveryDate: string
  type: PurchaseOrderType
  status: PurchaseOrderStatus
  priority: OrderPriority
  currency: Currency
  subtotal: number
  taxTotal: number
  totalAmount: number
  vendorCode: string
  vendorName: string
  vendorContact: string
  vendorEmail: string
  vendorPhone: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  approvalNotes?: string
  approvedBy?: string
  approvedDate?: string
  releasedBy?: string
  releasedDate?: string
  closedBy?: string
  closedDate?: string
  lineItems: PurchaseOrderLineItem[]
  createdAt: string
  updatedAt: string
}

export interface PurchaseOrderFormData {
  orderNumber: string
  orderDate: string
  deliveryDate: string
  type: PurchaseOrderType
  priority: OrderPriority
  currency: Currency
  vendorCode: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  lineItems: Omit<
    PurchaseOrderLineItem,
    'id' | 'lineTotal' | 'taxAmount' | 'receivedQuantity' | 'remainingQuantity'
  >[]
}

export interface PurchaseOrderFilters {
  status?: PurchaseOrderStatus
  type?: PurchaseOrderType
  priority?: OrderPriority
  vendorCode?: string
  department?: string
  costCenter?: string
  projectCode?: string
  search?: string
  orderDateFrom?: string
  orderDateTo?: string
  deliveryDateFrom?: string
  deliveryDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface PurchaseOrderStats {
  totalOrders: number
  draftOrders: number
  openOrders: number
  releasedOrders: number
  partiallyReceivedOrders: number
  fullyReceivedOrders: number
  closedOrders: number
  totalAmount: number
  averageOrderValue: number
  ordersByStatus: { status: PurchaseOrderStatus; count: number }[]
  ordersByType: { type: PurchaseOrderType; count: number }[]
  ordersByVendor: { vendor: string; count: number; amount: number }[]
  ordersByDepartment: { department: string; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface PurchaseOrderPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

// API Response Types
export interface PurchaseOrderResponse {
  data: PurchaseOrder
  message: string
  success: boolean
}

export interface PurchaseOrderListResponse {
  data: PurchaseOrder[]
  pagination: PurchaseOrderPagination
  message: string
  success: boolean
}

export interface PurchaseOrderStatsResponse {
  data: PurchaseOrderStats
  message: string
  success: boolean
}

export interface PurchaseOrderValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}
