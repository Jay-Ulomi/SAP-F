enum FormType {
  ITEM = 'Item',
  SERVICE = 'Service',
}

enum ReturnStatus {
  DRAFT = 'DRAFT',
  OPEN = 'OPEN',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  PROCESSED = 'PROCESSED',
  CANCELLED = 'CANCELLED',
  CLOSED = 'CLOSED',
}

enum ReturnType {
  CUSTOMER_RETURN = 'CUSTOMER_RETURN',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  DAMAGED_GOODS = 'DAMAGED_GOODS',
  WRONG_ITEM = 'WRONG_ITEM',
  WARRANTY_CLAIM = 'WARRANTY_CLAIM',
  OTHER = 'OTHER',
}

enum ReturnReason {
  DEFECTIVE_PRODUCT = 'DEFECTIVE_PRODUCT',
  WRONG_SIZE = 'WRONG_SIZE',
  WRONG_COLOR = 'WRONG_COLOR',
  DAMAGED_IN_TRANSIT = 'DAMAGED_IN_TRANSIT',
  NOT_AS_DESCRIBED = 'NOT_AS_DESCRIBED',
  CHANGED_MIND = 'CHANGED_MIND',
  DUPLICATE_ORDER = 'DUPLICATE_ORDER',
  LATE_DELIVERY = 'LATE_DELIVERY',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  WARRANTY_EXPIRED = 'WARRANTY_EXPIRED',
  OTHER = 'OTHER',
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

interface BaseLineItem {
  id: string
  itemCode: string
  description: string
  quantity: number
  returnedQuantity: number
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
  returnReason: ReturnReason
  returnNotes?: string
  originalInvoiceId?: string
  originalLineItemId?: string
  remarks?: string
}

interface ItemLineItem extends BaseLineItem {
  itemType: 'INVENTORY'
  warehouseCode: string
  batchNumber?: string
  serialNumber?: string
  binLocation?: string
}

interface ServiceLineItem extends BaseLineItem {
  itemType: 'SERVICE'
  serviceCategory?: string
  serviceDescription?: string
  billingMethod?: 'HOURLY' | 'FIXED' | 'MILESTONE'
}

type ReturnLineItem = ItemLineItem | ServiceLineItem

interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

interface Return {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  returnDate: string
  postingDate: string
  type: ReturnType
  status: ReturnStatus
  formType: FormType

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
  lineItems: ReturnLineItem[]
  itemLineItems: ItemLineItem[]
  serviceLineItems: ServiceLineItem[]

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
  relatedInvoiceId?: string
  relatedOrderId?: string

  // Return Information
  returnMethod?: string
  returnAddress?: CustomerAddress
  trackingNumber?: string
  carrier?: string
  estimatedReturnDate?: string
  actualReturnDate?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

interface ReturnFormData {
  customerCode: string
  returnDate: string
  postingDate: string
  type: ReturnType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  relatedInvoiceId?: string
  relatedOrderId?: string
  returnMethod?: string
  returnAddress?: CustomerAddress
  trackingNumber?: string
  carrier?: string
  estimatedReturnDate?: string
  lineItems: Omit<ReturnLineItem, 'id' | 'lineTotal' | 'returnedQuantity'>[]
  serviceItems: Array<{
    sno: string
    description: string
    discount: number
    total: number
    taxCode: string
    taxAmount: number
    dimension1: string
    dimension2: string
    dimension3: string
    dimension4: string
    warehouse: string
    project: string
    returnReason: string
  }>
}

interface ReturnResponse {
  success: boolean
  data: Return
  message?: string
}

interface ReturnListResponse {
  success: boolean
  data: Return[]
  total: number
  page: number
  limit: number
  message?: string
}

interface ReturnStatsResponse {
  success: boolean
  data: {
    total: number
    draft: number
    open: number
    approved: number
    rejected: number
    processed: number
    cancelled: number
    closed: number
    totalValue: number
    averageValue: number
    approvalRate: number
  }
  message?: string
}

interface ReturnFilters {
  status?: ReturnStatus[]
  type?: ReturnType[]
  formType?: FormType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

interface ReturnValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export { FormType, ReturnStatus, ReturnType, ReturnReason, Currency, TaxType }

export type {
  Customer,
  CustomerAddress,
  BaseLineItem,
  ItemLineItem,
  ServiceLineItem,
  ReturnLineItem,
  TaxSummary,
  Return,
  ReturnFormData,
  ReturnResponse,
  ReturnListResponse,
  ReturnStatsResponse,
  ReturnFilters,
  ReturnValidationResult,
}
