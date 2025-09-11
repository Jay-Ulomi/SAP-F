enum OrderStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  RELEASED = 'RELEASED',
  PARTIALLY_DELIVERED = 'PARTIALLY_DELIVERED',
  FULLY_DELIVERED = 'FULLY_DELIVERED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

enum OrderType {
  STANDARD = 'STANDARD',
  DROP_SHIP = 'DROP_SHIP',
  SPECIAL_ORDER = 'SPECIAL_ORDER',
  CONSIGNMENT = 'CONSIGNMENT',
}

enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
}

enum TaxType {
  SALES_TAX = 'SALES_TAX',
  VAT = 'VAT',
  GST = 'GST',
  EXEMPT = 'EXEMPT',
}

interface Customer {
  code: string
  name: string
  contactPerson?: string
  email?: string
  phone?: string
  address: CustomerAddress
}

interface CustomerAddress {
  street: string
  city: string
  state?: string
  postalCode: string
  country: string
}

interface OrderLineItem {
  id: string
  itemCode: string
  itemType: 'INVENTORY' | 'SERVICE'
  description: string
  quantity: number
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
  deliveredQuantity: number
  remainingQuantity: number
  warehouseCode?: string
  remarks?: string
}

interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

interface SalesOrder {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  orderDate: string
  deliveryDate: string
  postingDate: string
  type: OrderType
  status: OrderStatus

  // Customer Information
  customerCode: string
  customerName: string
  customerAddress: CustomerAddress
  contactPerson?: string

  // Financial Information
  currency: Currency
  exchangeRate: number
  subtotal: number
  discountTotal: number
  taxTotal: number
  totalAmount: number

  // Line Items
  lineItems: OrderLineItem[]

  // Tax Information
  taxSummary: TaxSummary[]

  // Additional Information
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string

  // System Fields
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string

  // Document References
  baseDocumentType?: string
  baseDocumentNumber?: string
  relatedQuotationId?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

interface SalesOrderFormData {
  customerCode: string
  orderDate: string
  deliveryDate: string
  postingDate: string
  type: OrderType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  relatedQuotationId?: string
  lineItems: Omit<OrderLineItem, 'id' | 'lineTotal' | 'deliveredQuantity' | 'remainingQuantity'>[]
}

interface SalesOrderResponse {
  success: boolean
  data: SalesOrder
  message?: string
}

interface SalesOrderListResponse {
  success: boolean
  data: SalesOrder[]
  total: number
  page: number
  limit: number
  message?: string
}

interface SalesOrderStatsResponse {
  success: boolean
  data: {
    total: number
    draft: number
    open: number
    released: number
    partiallyDelivered: number
    fullyDelivered: number
    cancelled: number
    closed: number
    totalValue: number
    averageValue: number
    deliveryRate: number
  }
  message?: string
}

interface SalesOrderFilters {
  status?: OrderStatus[]
  type?: OrderType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

interface SalesOrderValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export { OrderStatus, OrderType, Currency, TaxType }

export type {
  Customer,
  CustomerAddress,
  OrderLineItem,
  TaxSummary,
  SalesOrder,
  SalesOrderFormData,
  SalesOrderResponse,
  SalesOrderListResponse,
  SalesOrderStatsResponse,
  SalesOrderFilters,
  SalesOrderValidationResult,
}
