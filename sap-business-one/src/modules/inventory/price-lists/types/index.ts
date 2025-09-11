// Enums
export enum PriceListType {
  SALES = 'sales',
  PURCHASE = 'purchase',
  INVENTORY = 'inventory',
  SPECIAL = 'special',
  PROMOTIONAL = 'promotional',
}

export enum PriceListStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft',
  EXPIRED = 'expired',
}

export enum PriceListCurrency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
}

export enum PriceListScope {
  GLOBAL = 'global',
  WAREHOUSE = 'warehouse',
  CUSTOMER = 'customer',
  VENDOR = 'vendor',
  ITEM_GROUP = 'item_group',
  ITEM_CATEGORY = 'item_category',
}

export enum PriceListPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum PriceListUpdateFrequency {
  MANUAL = 'manual',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
}

export enum PriceListRounding {
  NONE = 'none',
  ROUND_UP = 'round_up',
  ROUND_DOWN = 'round_down',
  ROUND_NEAREST = 'round_nearest',
}

// Interfaces
export interface PriceListItem {
  id: string
  itemCode: string
  itemName: string
  description?: string
  unitOfMeasure: string
  basePrice: number
  unitPrice: number
  discountPercentage?: number
  discountAmount?: number
  finalPrice: number
  minimumQuantity?: number
  maximumQuantity?: number
  effectiveDate: Date
  expiryDate?: Date
  isActive: boolean
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
}

export interface PriceList {
  id: string
  priceListCode: string
  priceListName: string
  description?: string
  type: PriceListType
  status: PriceListStatus
  currency: PriceListCurrency
  scope: PriceListScope
  priority: PriceListPriority
  updateFrequency: PriceListUpdateFrequency
  rounding: PriceListRounding
  effectiveDate: Date
  expiryDate?: Date
  warehouseCode?: string
  warehouseName?: string
  customerCode?: string
  customerName?: string
  vendorCode?: string
  vendorName?: string
  itemGroup?: string
  itemCategory?: string
  totalItems: number
  activeItems: number
  inactiveItems: number
  averagePrice: number
  totalValue: number
  isDefault: boolean
  isSystem: boolean
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
  items: PriceListItem[]
}

export interface PriceListFormData {
  priceListName: string
  description?: string
  type: PriceListType
  status: PriceListStatus
  currency: PriceListCurrency
  scope: PriceListScope
  priority: PriceListPriority
  updateFrequency: PriceListUpdateFrequency
  rounding: PriceListRounding
  effectiveDate: Date
  expiryDate?: Date
  warehouseCode?: string
  customerCode?: string
  vendorCode?: string
  itemGroup?: string
  itemCategory?: string
  isDefault: boolean
  items: Omit<
    PriceListItem,
    | 'id'
    | 'finalPrice'
    | 'isActive'
    | 'createdBy'
    | 'createdDate'
    | 'modifiedBy'
    | 'modifiedDate'
  >[]
}

export interface PriceListStats {
  totalPriceLists: number
  activePriceLists: number
  inactivePriceLists: number
  draftPriceLists: number
  expiredPriceLists: number
  totalItems: number
  averageItemsPerList: number
  totalValue: number
  lastUpdated?: Date
  nextScheduledUpdate?: Date
}

export interface PriceListFilters {
  type?: PriceListType
  status?: PriceListStatus
  currency?: PriceListCurrency
  scope?: PriceListScope
  priority?: PriceListPriority
  warehouseCode?: string
  customerCode?: string
  vendorCode?: string
  itemGroup?: string
  itemCategory?: string
  isDefault?: boolean
  isSystem?: boolean
  effectiveDateFrom?: Date
  effectiveDateTo?: Date
  expiryDateFrom?: Date
  expiryDateTo?: Date
  search?: string
}

export interface PriceListListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: PriceListFilters
}

export interface PriceListListResponse {
  items: PriceList[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: PriceListStats
}

export interface PriceListTemplate {
  id: string
  name: string
  description: string
  type: PriceListType
  scope: PriceListScope
  currency: PriceListCurrency
  rounding: PriceListRounding
  isActive: boolean
  createdBy: string
  createdDate: Date
}

export interface PriceListHistory {
  id: string
  priceListId: string
  priceListCode: string
  action: string
  description: string
  changedBy: string
  changedByName: string
  changedDate: Date
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
}

export interface PriceListValidation {
  isValid: boolean
  errors: string[]
  warnings: string[]
  itemErrors: Record<string, string[]>
}
