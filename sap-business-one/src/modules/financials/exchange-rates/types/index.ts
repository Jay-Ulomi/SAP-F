// Exchange Rate Differences Types

export enum ExchangeRateType {
  SPOT = 'SPOT',
  FORWARD = 'FORWARD',
  HISTORICAL = 'HISTORICAL',
  AVERAGE = 'AVERAGE',
}

export enum CurrencyCode {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
  INR = 'INR',
  BRL = 'BRL',
  MXN = 'MXN',
  KRW = 'KRW',
  SGD = 'SGD',
  HKD = 'HKD',
  SEK = 'SEK',
  NOK = 'NOK',
  DKK = 'DKK',
  PLN = 'PLN',
  CZK = 'CZK',
  HUF = 'HUF',
}

export interface Currency {
  code: CurrencyCode
  name: string
  symbol: string
  isBaseCurrency: boolean
  isActive: boolean
  decimalPlaces: number
  exchangeRateSource: string
}

export interface ExchangeRate {
  id: string
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  rate: number
  rateType: ExchangeRateType
  effectiveDate: string
  expiryDate?: string
  source: string
  isActive: boolean
  createdBy: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface ExchangeRateHistory {
  id: string
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  rate: number
  effectiveDate: string
  source: string
  volume: number
  high: number
  low: number
  open: number
  close: number
}

export interface ExchangeRateDifference {
  id: string
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  transactionDate: string
  postingDate: string
  originalAmount: number
  originalRate: number
  currentRate: number
  difference: number
  differencePercentage: number
  transactionType: 'SALE' | 'PURCHASE' | 'PAYMENT' | 'RECEIPT' | 'ADJUSTMENT'
  documentNumber: string
  documentType: string
  businessPartner: string
  account: string
  isPosted: boolean
  postedDate?: string
  createdBy: string
  createdAt: string
  notes?: string
}

export interface ExchangeRateFormData {
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  rate: number
  rateType: ExchangeRateType
  effectiveDate: string
  expiryDate?: string
  source: string
  notes: string
}

export interface ExchangeRateDifferenceFormData {
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  transactionDate: string
  postingDate: string
  originalAmount: number
  originalRate: number
  currentRate: number
  transactionType: 'SALE' | 'PURCHASE' | 'PAYMENT' | 'RECEIPT' | 'ADJUSTMENT'
  documentNumber: string
  documentType: string
  businessPartner: string
  account: string
  notes: string
}

export interface ExchangeRateFilters {
  baseCurrency?: CurrencyCode
  targetCurrency?: CurrencyCode
  rateType?: ExchangeRateType
  effectiveDate?: string
  expiryDate?: string
  source?: string
  isActive?: boolean
}

export interface ExchangeRateDifferenceFilters {
  baseCurrency?: CurrencyCode
  targetCurrency?: CurrencyCode
  transactionDate?: string
  postingDate?: string
  transactionType?: 'SALE' | 'PURCHASE' | 'PAYMENT' | 'RECEIPT' | 'ADJUSTMENT'
  documentNumber?: string
  businessPartner?: string
  account?: string
  isPosted?: boolean
}

export interface ExchangeRateValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings: string[]
}

export interface ExchangeRateDifferenceValidationResult {
  isValid: boolean
  errors: Record<string, string>
  warnings: string[]
}

export interface ExchangeRateStats {
  totalRates: number
  activeRates: number
  totalDifferences: number
  postedDifferences: number
  unpostedDifferences: number
  totalDifferenceAmount: number
  averageDifferencePercentage: number
  ratesByType: Record<ExchangeRateType, number>
  topCurrencies: Array<{
    currency: CurrencyCode
    transactionCount: number
    totalAmount: number
    averageDifference: number
  }>
}

export interface CurrencyPair {
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  currentRate: number
  previousRate: number
  change: number
  changePercentage: number
  lastUpdated: string
  volume24h: number
  high24h: number
  low24h: number
}

export interface ExchangeRateImport {
  id: string
  fileName: string
  importDate: string
  totalRecords: number
  importedRecords: number
  failedRecords: number
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'
  errors: string[]
  createdBy: string
  createdAt: string
}

export interface ExchangeRateSchedule {
  id: string
  name: string
  description: string
  baseCurrency: CurrencyCode
  targetCurrency: CurrencyCode
  frequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  nextUpdate: string
  isActive: boolean
  source: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ExchangeRatesResponse {
  data: ExchangeRate[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ExchangeRateResponse {
  data: ExchangeRate
}

export interface ExchangeRateHistoryResponse {
  data: ExchangeRateHistory[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ExchangeRateDifferencesResponse {
  data: ExchangeRateDifference[]
  pagination: {
    page: number
    pageSize: number
    total: number
    totalPages: number
  }
}

export interface ExchangeRateStatsResponse {
  data: ExchangeRateStats
}

export interface CurrencyPairsResponse {
  data: CurrencyPair[]
}

export interface ExchangeRateImportsResponse {
  data: ExchangeRateImport[]
}

export interface ExchangeRateSchedulesResponse {
  data: ExchangeRateSchedule[]
}
