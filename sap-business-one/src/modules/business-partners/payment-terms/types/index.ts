export enum PaymentTermType {
  NET_DAYS = 'NET_DAYS',
  END_OF_MONTH = 'END_OF_MONTH',
  FIXED_DATE = 'FIXED_DATE',
  IMMEDIATE = 'IMMEDIATE',
  CUSTOM = 'CUSTOM',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  ELECTRONIC_PAYMENT = 'ELECTRONIC_PAYMENT',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  OTHER = 'OTHER',
}

export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

export interface PaymentTerm {
  id: string
  code: string
  name: string
  description?: string
  type: PaymentTermType
  netDays?: number
  discountDays?: number
  discountPercent?: number
  dueDate?: string
  paymentMethod: PaymentMethod
  currency: Currency
  isActive: boolean
  isDefault: boolean
  sortOrder: number
  notes?: string
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string
}

export interface PaymentTermFormData {
  code: string
  name: string
  description?: string
  type: PaymentTermType
  netDays?: number
  discountDays?: number
  discountPercent?: number
  dueDate?: string
  paymentMethod: PaymentMethod
  currency: Currency
  isActive: boolean
  isDefault: boolean
  sortOrder: number
  notes?: string
}

export interface PaymentTermFilters {
  search?: string
  type?: PaymentTermType[]
  paymentMethod?: PaymentMethod[]
  currency?: Currency[]
  isActive?: boolean
  isDefault?: boolean
  hasDiscount?: boolean
  netDaysRange?: {
    min: number
    max: number
  }
}

export interface PaymentTermStats {
  totalPaymentTerms: number
  activePaymentTerms: number
  defaultPaymentTerms: number
  netDaysTerms: number
  endOfMonthTerms: number
  fixedDateTerms: number
  immediateTerms: number
  customTerms: number
  termsWithDiscount: number
  averageNetDays: number
  mostUsedCurrency: Currency
  mostUsedPaymentMethod: PaymentMethod
}

export interface PaymentTermPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
