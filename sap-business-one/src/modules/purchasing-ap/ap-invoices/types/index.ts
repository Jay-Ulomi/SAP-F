// A/P Invoices Types

export enum ApInvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  OVERDUE = 'OVERDUE',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED'
}

export enum ApInvoiceType {
  STANDARD = 'STANDARD',
  RECURRING = 'RECURRING',
  CREDIT_NOTE = 'CREDIT_NOTE',
  DEBIT_NOTE = 'DEBIT_NOTE',
  EXPENSE = 'EXPENSE',
  ASSET = 'ASSET'
}

export enum PaymentTerms {
  NET_30 = 'NET_30',
  NET_15 = 'NET_15',
  NET_60 = 'NET_60',
  NET_90 = 'NET_90',
  COD = 'COD',
  PREPAID = 'PREPAID',
  IMMEDIATE = 'IMMEDIATE'
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  JPY = 'JPY',
  CHF = 'CHF'
}

export enum TaxType {
  SALES_TAX = 'SALES_TAX',
  VAT = 'VAT',
  GST = 'GST',
  HST = 'HST',
  EXEMPT = 'EXEMPT'
}

export interface Vendor {
  id: string
  code: string
  name: string
  contactPerson: string
  email: string
  phone: string
  address: VendorAddress
  paymentTerms: PaymentTerms
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

export interface ApInvoiceLineItem {
  id: string
  itemCode: string
  itemName: string
  description: string
  quantity: number
  unitPrice: number
  discountPercent: number
  discountAmount: number
  taxCode: string
  taxPercent: number
  taxAmount: number
  lineTotal: number
  accountCode: string
  costCenter: string
  projectCode?: string
}

export interface ApInvoice {
  id: string
  docNum: string
  docEntry: number
  vendorCode: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string
  postingDate: string
  dueDate: string
  type: ApInvoiceType
  status: ApInvoiceStatus
  currency: Currency
  exchangeRate: number
  subtotal: number
  discountTotal: number
  taxTotal: number
  totalAmount: number
  paidAmount: number
  remainingAmount: number
  paymentTerms: PaymentTerms
  purchaseOrderNumber?: string
  goodsReceiptNumber?: string
  projectCode?: string
  costCenter?: string
  notes?: string
  approvalNotes?: string
  approvedBy?: string
  approvedDate?: string
  lineItems: ApInvoiceLineItem[]
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

export interface ApInvoiceFormData {
  series?: string
  validTill?: string
  documentDate?: string
  requiredDate?: string
  contactPerson?: string
  referenceNo?: string
  requestType?: string
  remarks?: string
  vendorCode: string
  vendorName: string
  invoiceNumber: string
  invoiceDate: string
  postingDate: string
  dueDate: string
  type: string
  currency: Currency
  exchangeRate: number
  paymentTerms: PaymentTerms
  purchaseOrderNumber?: string
  goodsReceiptNumber?: string
  projectCode?: string
  costCenter?: string
  notes?: string
  freightType?: string
  freightAmount?: number
  lineItems: any[]
  serviceItems: ServiceItem[]
}

export interface ApInvoiceFilters {
  status?: ApInvoiceStatus
  type?: ApInvoiceType
  vendorCode?: string
  search?: string
  paymentTerms?: PaymentTerms
  currency?: Currency
  projectCode?: string
  invoiceDateFrom?: string
  invoiceDateTo?: string
  dueDateFrom?: string
  dueDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface ApInvoiceStats {
  totalInvoices: number
  totalAmount: number
  paidAmount: number
  outstandingAmount: number
  overdueAmount: number
  averageInvoiceValue: number
  invoicesByStatus: { status: ApInvoiceStatus; count: number }[]
  invoicesByVendor: { vendorCode: string; vendorName: string; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface ApInvoicePagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}
