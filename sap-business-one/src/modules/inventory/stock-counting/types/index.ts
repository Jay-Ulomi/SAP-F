// Enums
export enum CountingStatus {
  DRAFT = 'draft',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  POSTED = 'posted',
  CANCELLED = 'cancelled',
}

export enum CountingType {
  PERIODIC = 'periodic',
  CYCLE = 'cycle',
  SPOT = 'spot',
  FULL = 'full',
  PARTIAL = 'partial',
}

export enum CountingMethod {
  MANUAL = 'manual',
  BARCODE = 'barcode',
  RFID = 'rfid',
  AUTOMATED = 'automated',
}

export enum CountingFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  ON_DEMAND = 'on_demand',
}

export enum VarianceType {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  ZERO = 'zero',
}

// Interfaces
export interface CountingItem {
  id: string
  itemCode: string
  itemName: string
  description?: string
  warehouseCode: string
  warehouseName: string
  locationCode?: string
  locationName?: string
  binCode?: string
  binName?: string
  unitOfMeasure: string
  systemQuantity: number
  countedQuantity: number
  variance: number
  varianceType: VarianceType
  variancePercentage: number
  unitCost: number
  varianceValue: number
  batchNumber?: string
  serialNumber?: string
  expiryDate?: Date
  lotNumber?: string
  remarks?: string
  countedBy: string
  countedByName: string
  countedDate: Date
  isApproved: boolean
  approvedBy?: string
  approvedByName?: string
  approvedDate?: Date
}

export interface StockCounting {
  id: string
  countingNumber: string
  type: CountingType
  method: CountingMethod
  status: CountingStatus
  frequency: CountingFrequency
  date: Date
  startDate: Date
  endDate: Date
  warehouseCode: string
  warehouseName: string
  locationCode?: string
  locationName?: string
  itemGroup?: string
  itemCategory?: string
  totalItems: number
  countedItems: number
  pendingItems: number
  totalVariance: number
  totalVarianceValue: number
  currency: string
  exchangeRate: number
  performedBy: string
  performedByName: string
  department?: string
  project?: string
  remarks?: string
  items: CountingItem[]
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
  postedDate?: Date
  postedBy?: string
  postedByName?: string
}

export interface CountingFormData {
  type: CountingType
  method: CountingMethod
  frequency: CountingFrequency
  date: Date
  startDate: Date
  endDate: Date
  warehouseCode: string
  locationCode?: string
  itemGroup?: string
  itemCategory?: string
  currency: string
  exchangeRate: number
  performedBy: string
  department?: string
  project?: string
  remarks?: string
  items: Omit<
    CountingItem,
    | 'id'
    | 'variance'
    | 'varianceType'
    | 'variancePercentage'
    | 'varianceValue'
    | 'countedBy'
    | 'countedByName'
    | 'countedDate'
    | 'isApproved'
  >[]
}

export interface CountingStats {
  totalCountings: number
  draftCountings: number
  inProgressCountings: number
  completedCountings: number
  postedCountings: number
  cancelledCountings: number
  totalItemsCounted: number
  totalVarianceValue: number
  averageVariancePercentage: number
  lastCountingDate?: Date
  nextScheduledCounting?: Date
}

export interface CountingFilters {
  type?: CountingType
  method?: CountingMethod
  status?: CountingStatus
  frequency?: CountingFrequency
  warehouseCode?: string
  locationCode?: string
  itemGroup?: string
  itemCategory?: string
  performedBy?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface CountingListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: CountingFilters
}

export interface CountingListResponse {
  items: StockCounting[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: CountingStats
}

export interface CountingTemplate {
  id: string
  name: string
  description: string
  type: CountingType
  method: CountingMethod
  frequency: CountingFrequency
  warehouseCode: string
  locationCode?: string
  itemGroup?: string
  itemCategory?: string
  isActive: boolean
  createdBy: string
  createdDate: Date
}

export interface CountingExecution {
  id: string
  countingId: string
  countingNumber: string
  status: CountingStatus
  startTime: Date
  endTime?: Date
  executionTime?: number
  itemsCounted?: number
  totalVariance?: number
  performedBy: string
  performedByName: string
}
