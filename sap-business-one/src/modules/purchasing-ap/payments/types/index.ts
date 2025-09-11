export enum PaymentStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  PROCESSED = 'PROCESSED',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  OTHER = 'OTHER',
}

export enum PaymentType {
  INVOICE_PAYMENT = 'INVOICE_PAYMENT',
  CREDIT_MEMO_APPLICATION = 'CREDIT_MEMO_APPLICATION',
  ADVANCE_PAYMENT = 'ADVANCE_PAYMENT',
  REFUND = 'REFUND',
  ADJUSTMENT = 'ADJUSTMENT',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

export interface PaymentLineItem {
  id: string
  invoiceId: string
  invoiceNumber: string
  invoiceAmount: number
  appliedAmount: number
  remainingBalance: number
  discountAmount: number
  taxAmount: number
  description?: string
}

export interface Payment {
  id: string
  paymentNumber: string
  docNum: string
  docEntry: number
  paymentDate: string
  postingDate: string
  dueDate: string
  vendorCode: string
  vendorName: string
  vendorId: string

  // Payment Details
  paymentMethod: PaymentMethod
  paymentType: PaymentType
  status: PaymentStatus
  amount: number
  currency: Currency
  exchangeRate: number

  // Reference Information
  referenceNumber?: string
  checkNumber?: string
  bankAccount?: string
  bankName?: string

  // Applied Invoices
  lineItems: PaymentLineItem[]

  // Financial Information
  totalApplied: number
  totalDiscount: number
  totalTax: number
  netAmount: number

  // Additional Information
  notes?: string
  approvalNotes?: string
  approvalDate?: string
  approvedBy?: string

  // Timestamps
  createdAt: string
  updatedAt: string
  lastActivityDate: string
}

export interface PaymentFormData {
  // Basic Information
  paymentDate: string
  postingDate: string
  dueDate: string
  vendorCode: string
  vendorName: string
  vendorId: string

  // Payment Details
  paymentMethod: PaymentMethod
  paymentType: PaymentType
  amount: number
  currency: Currency
  exchangeRate: number

  // Reference Information
  referenceNumber?: string
  checkNumber?: string
  bankAccount?: string
  bankName?: string

  // Applied Invoices
  lineItems: Omit<PaymentLineItem, 'id'>[]

  // Additional Information
  notes?: string
}

export interface PaymentFilters {
  search?: string
  status?: PaymentStatus[]
  paymentMethod?: PaymentMethod[]
  paymentType?: PaymentType[]
  vendorCode?: string
  vendorName?: string
  currency?: Currency[]
  dateRange?: {
    start: string
    end: string
  }
  amountRange?: {
    min: number
    max: number
  }
}

export interface PaymentStats {
  totalPayments: number
  totalAmount: number
  pendingPayments: number
  processedPayments: number
  completedPayments: number
  failedPayments: number
  averagePaymentAmount: number
  paymentsThisMonth: number
  paymentsThisQuarter: number
  paymentsThisYear: number
}

export interface PaymentPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
