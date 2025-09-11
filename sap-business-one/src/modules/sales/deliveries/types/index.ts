enum DeliveryStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  RELEASED = 'RELEASED',
  PARTIALLY_DELIVERED = 'PARTIALLY_DELIVERED',
  FULLY_DELIVERED = 'FULLY_DELIVERED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

enum DeliveryType {
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

interface DeliveryLineItem {
  id: string
  itemCode: string
  description: string
  quantity: number
  deliveredQuantity: number
  remainingQuantity: number
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
  warehouseCode?: string
  batchNumber?: string
  serialNumber?: string
  remarks?: string
}

interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

interface Delivery {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  deliveryDate: string
  postingDate: string
  type: DeliveryType
  status: DeliveryStatus

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
  lineItems: DeliveryLineItem[]

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
  relatedOrderId?: string
  relatedQuotationId?: string

  // Delivery Information
  deliveryMethod?: string
  shippingAddress?: CustomerAddress
  trackingNumber?: string
  carrier?: string
  estimatedDeliveryDate?: string
  actualDeliveryDate?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

interface DeliveryFormData {
  customerCode: string
  deliveryDate: string
  postingDate: string
  type: DeliveryType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  relatedOrderId?: string
  relatedQuotationId?: string
  deliveryMethod?: string
  shippingAddress?: CustomerAddress
  trackingNumber?: string
  carrier?: string
  estimatedDeliveryDate?: string
  lineItems: Omit<
    DeliveryLineItem,
    'id' | 'lineTotal' | 'deliveredQuantity' | 'remainingQuantity'
  >[]
}

interface DeliveryResponse {
  success: boolean
  data: Delivery
  message?: string
}

interface DeliveryListResponse {
  success: boolean
  data: Delivery[]
  total: number
  page: number
  limit: number
  message?: string
}

interface DeliveryStatsResponse {
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

interface DeliveryFilters {
  status?: DeliveryStatus[]
  type?: DeliveryType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

interface DeliveryValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export { DeliveryStatus, DeliveryType, Currency, TaxType }

export type {
  Customer,
  CustomerAddress,
  DeliveryLineItem,
  TaxSummary,
  Delivery,
  DeliveryFormData,
  DeliveryResponse,
  DeliveryListResponse,
  DeliveryStatsResponse,
  DeliveryFilters,
  DeliveryValidationResult,
}
