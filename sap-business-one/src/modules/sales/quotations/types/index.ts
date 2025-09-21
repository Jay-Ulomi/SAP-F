enum FormType {
  ITEM = 'Item',
  SERVICE = 'Service',
}

enum QuotationStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
  EXPIRED = 'EXPIRED',
  CONVERTED_TO_ORDER = 'CONVERTED_TO_ORDER',
  CANCELLED = 'CANCELLED',
}

enum QuotationType {
  STANDARD = 'STANDARD',
  SPECIAL_PRICING = 'SPECIAL_PRICING',
  VOLUME_DISCOUNT = 'VOLUME_DISCOUNT',
  PROMOTIONAL = 'PROMOTIONAL',
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
  unitPrice: number
  discount: number
  discountType: 'PERCENTAGE' | 'AMOUNT'
  taxCode: string
  taxRate: number
  lineTotal: number
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

type QuotationLineItem = ItemLineItem | ServiceLineItem

interface TaxSummary {
  taxCode: string
  taxRate: number
  taxableAmount: number
  taxAmount: number
}

interface Quotation {
  id: string
  docNum: string
  docEntry: number

  // Basic Information
  quotationDate: string
  validUntil: string
  postingDate: string
  type: QuotationType
  status: QuotationStatus
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
  lineItems: QuotationLineItem[]
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
  relatedOpportunityId?: string

  // Approval Workflow
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED'
  approvedBy?: string
  approvedAt?: string
  approvalNotes?: string
}

interface QuotationFormData {
  customerCode: string
  quotationDate: string
  validUntil: string
  postingDate: string
  type: QuotationType
  currency: Currency
  exchangeRate: number
  salesPerson?: string
  reference?: string
  remarks?: string
  project?: string
  relatedOpportunityId?: string
  lineItems: Omit<QuotationLineItem, 'id' | 'lineTotal'>[]
}

interface QuotationResponse {
  success: boolean
  data: Quotation
  message?: string
}

interface QuotationListResponse {
  success: boolean
  data: Quotation[]
  total: number
  page: number
  limit: number
  message?: string
}

interface QuotationStatsResponse {
  success: boolean
  data: {
    total: number
    draft: number
    sent: number
    accepted: number
    rejected: number
    expired: number
    converted: number
    cancelled: number
    totalValue: number
    averageValue: number
    conversionRate: number
  }
  message?: string
}

interface QuotationFilters {
  status?: QuotationStatus[]
  type?: QuotationType[]
  formType?: FormType[]
  customerCode?: string
  salesPerson?: string
  dateFrom?: string
  dateTo?: string
  search?: string
}

interface QuotationValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export { FormType, QuotationStatus, QuotationType, Currency, TaxType }

export type {
  Customer,
  CustomerAddress,
  BaseLineItem,
  ItemLineItem,
  ServiceLineItem,
  QuotationLineItem,
  TaxSummary,
  Quotation,
  QuotationFormData,
  QuotationResponse,
  QuotationListResponse,
  QuotationStatsResponse,
  QuotationFilters,
  QuotationValidationResult,
}
