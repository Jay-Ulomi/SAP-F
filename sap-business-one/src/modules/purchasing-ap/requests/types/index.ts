// Purchase Requests Types

export enum PurchaseRequestStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CONVERTED = 'CONVERTED',
  CANCELLED = 'CANCELLED',
  ON_HOLD = 'ON_HOLD',
}

export enum PurchaseRequestPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum PurchaseRequestType {
  MATERIAL = 'MATERIAL',
  SERVICE = 'SERVICE',
  ASSET = 'ASSET',
  EXPENSE = 'EXPENSE',
  CAPITAL = 'CAPITAL',
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

export interface PurchaseRequestLineItem {
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
  requestedDate: string
  priority: PurchaseRequestPriority
}

export interface PurchaseRequest {
  id: string
  docNum: string
  docEntry: number
  requestNumber: string
  requestDate: string
  requiredDate: string
  type: PurchaseRequestType
  status: PurchaseRequestStatus
  priority: PurchaseRequestPriority
  currency: Currency
  subtotal: number
  taxTotal: number
  totalAmount: number
  requestedBy: string
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  approvalNotes?: string
  approvedBy?: string
  approvedDate?: string
  convertedToOrder?: string
  convertedDate?: string
  lineItems: PurchaseRequestLineItem[]
  createdAt: string
  updatedAt: string
}

export interface PurchaseRequestFormData {
  requestNumber: string
  requestDate: string
  requiredDate: string
  type: PurchaseRequestType
  priority: PurchaseRequestPriority
  currency: Currency
  department: string
  costCenter: string
  projectCode?: string
  notes?: string
  lineItems: Omit<PurchaseRequestLineItem, 'id' | 'lineTotal' | 'taxAmount'>[]
}

export interface PurchaseRequestFilters {
  status?: PurchaseRequestStatus
  type?: PurchaseRequestType
  priority?: PurchaseRequestPriority
  department?: string
  costCenter?: string
  projectCode?: string
  requestedBy?: string
  search?: string
  requestDateFrom?: string
  requestDateTo?: string
  requiredDateFrom?: string
  requiredDateTo?: string
  minAmount?: number
  maxAmount?: number
}

export interface PurchaseRequestStats {
  totalRequests: number
  pendingRequests: number
  approvedRequests: number
  convertedRequests: number
  totalAmount: number
  averageRequestValue: number
  requestsByStatus: { status: PurchaseRequestStatus; count: number }[]
  requestsByPriority: { priority: PurchaseRequestPriority; count: number }[]
  requestsByDepartment: { department: string; count: number; amount: number }[]
  requestsByType: { type: PurchaseRequestType; count: number; amount: number }[]
  monthlyTrend: { month: string; count: number; amount: number }[]
}

export interface PurchaseRequestPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

// API Response Types
export interface PurchaseRequestResponse {
  data: PurchaseRequest
  message: string
  success: boolean
}

export interface PurchaseRequestListResponse {
  data: PurchaseRequest[]
  pagination: PurchaseRequestPagination
  message: string
  success: boolean
}

export interface PurchaseRequestStatsResponse {
  data: PurchaseRequestStats
  message: string
  success: boolean
}

export interface PurchaseRequestValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}
