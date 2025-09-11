// A/P Credit Memos Types

export enum ApCreditMemoStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  APPLIED = 'APPLIED',
  PARTIALLY_APPLIED = 'PARTIALLY_APPLIED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export enum ApCreditMemoType {
  VENDOR_RETURN = 'VENDOR_RETURN',
  PRICE_ADJUSTMENT = 'PRICE_ADJUSTMENT',
  DISCOUNT = 'DISCOUNT',
  DAMAGED_GOODS = 'DAMAGED_GOODS',
  WRONG_ITEM = 'WRONG_ITEM',
  QUALITY_ISSUE = 'QUALITY_ISSUE',
  OTHER = 'OTHER',
}

export enum PaymentTerms {
  NET_30 = 'NET_30',
  NET_15 = 'NET_15',
  NET_60 = 'NET_60',
  NET_90 = 'NET_90',
  COD = 'COD',
  PREPAID = 'PREPAID',
  IMMEDIATE = 'IMMEDIATE',
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

export interface ApCreditMemoLineItem {
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
  originalInvoiceNumber?: string
  returnReason?: string
}

export interface ApCreditMemo {
  id: string
  docNum: string
  docEntry: number
  vendorCode: string
  vendorName: string
  creditMemoNumber: string
  creditMemoDate: string
  postingDate: string
  type: ApCreditMemoType
  status: ApCreditMemoStatus
  currency: Currency
  exchangeRate: number
  subtotal: number
  discountTotal: number
  taxTotal: number
  totalAmount: number
  appliedAmount: number
  remainingAmount: number
  paymentTerms: PaymentTerms
  originalInvoiceNumber?: string
  purchaseOrderNumber?: string
  goodsReceiptNumber?: string
  projectCode?: string
  costCenter?: string
  notes?: string
  approvalNotes?: string
  approvedBy?: string
  approvedDate?: string
  lineItems: ApCreditMemoLineItem[]
  createdAt: string
  updatedAt: string
}

export interface ApCreditMemoFormData {
  vendorCode: string
  vendorName: string
  creditMemoNumber: string
  creditMemoDate: string
  postingDate: string
  type: ApCreditMemoType
  currency: Currency
  exchangeRate: number
  paymentTerms: PaymentTerms
  originalInvoiceNumber?: string
  purchaseOrderNumber?: string
  goodsReceiptNumber?: string
  projectCode?: string
  costCenter?: string
  notes?: string
  lineItems: Omit<ApCreditMemoLineItem, 'id' | 'lineTotal' | 'taxAmount'>[]
}

export interface ApCreditMemoFilters {
  status?: ApCreditMemoStatus
  type?: ApCreditMemoType
  vendorCode?: string
  search?: string
  paymentTerms?: PaymentTerms
  currency?: Currency
  projectCode?: string
  creditMemoDateFrom?: string
  creditMemoDateTo?: string
  postingDateFrom?: string
  postingDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface ApCreditMemoStats {
  totalCreditMemos: number
  totalAmount: number
  appliedAmount: number
  outstandingAmount: number
  averageCreditMemoValue: number
  creditMemosByStatus: { status: ApCreditMemoStatus; count: number }[]
  creditMemosByVendor: { vendorCode: string; vendorName: string; count: number; amount: number }[]
  creditMemosByType: { type: ApCreditMemoType; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface ApCreditMemoPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}
