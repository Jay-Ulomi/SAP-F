// Enums
export enum ValuationMethod {
  FIFO = 'fifo',
  LIFO = 'lifo',
  WEIGHTED_AVERAGE = 'weighted_average',
  STANDARD_COST = 'standard_cost',
  MOVING_AVERAGE = 'moving_average',
  SPECIFIC_IDENTIFICATION = 'specific_identification',
}

export enum ValuationStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  APPROVED = 'approved',
  CANCELLED = 'cancelled',
}

export enum ValuationType {
  PERIODIC = 'periodic',
  CONTINUOUS = 'continuous',
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  ADJUSTMENT = 'adjustment',
}

export enum ValuationFrequency {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly',
  ON_DEMAND = 'on_demand',
}

// Interfaces
export interface ValuationItem {
  id: string
  itemCode: string
  itemName: string
  description?: string
  warehouseCode: string
  warehouseName: string
  locationCode?: string
  locationName?: string
  quantityOnHand: number
  unitCost: number
  totalValue: number
  valuationMethod: ValuationMethod
  lastValuationDate?: Date
  previousUnitCost?: number
  previousTotalValue?: number
  variance?: number
  variancePercentage?: number
  batchNumber?: string
  serialNumber?: string
  expiryDate?: Date
  lotNumber?: string
  remarks?: string
}

export interface InventoryValuation {
  id: string
  valuationNumber: string
  type: ValuationType
  status: ValuationStatus
  method: ValuationMethod
  frequency: ValuationFrequency
  date: Date
  effectiveDate: Date
  periodStart: Date
  periodEnd: Date
  warehouseCode?: string
  warehouseName?: string
  locationCode?: string
  locationName?: string
  totalItems: number
  totalQuantity: number
  totalValue: number
  previousTotalValue?: number
  variance?: number
  variancePercentage?: number
  currency: string
  exchangeRate: number
  performedBy: string
  performedByName: string
  approvedBy?: string
  approvedByName?: string
  department?: string
  project?: string
  remarks?: string
  items: ValuationItem[]
  createdBy: string
  createdDate: Date
  modifiedBy?: string
  modifiedDate?: Date
  approvedDate?: Date
  completedDate?: Date
}

export interface ValuationFormData {
  type: ValuationType
  method: ValuationMethod
  frequency: ValuationFrequency
  date: Date
  effectiveDate: Date
  periodStart: Date
  periodEnd: Date
  warehouseCode?: string
  locationCode?: string
  currency: string
  exchangeRate: number
  performedBy: string
  department?: string
  project?: string
  remarks?: string
  items: Omit<ValuationItem, 'id' | 'totalValue' | 'variance' | 'variancePercentage'>[]
}

export interface ValuationStats {
  totalValuations: number
  pendingValuations: number
  inProgressValuations: number
  completedValuations: number
  approvedValuations: number
  cancelledValuations: number
  totalInventoryValue: number
  averageValuationTime: number
  lastValuationDate?: Date
  nextScheduledValuation?: Date
}

export interface ValuationFilters {
  type?: ValuationType
  status?: ValuationStatus
  method?: ValuationMethod
  frequency?: ValuationFrequency
  warehouseCode?: string
  locationCode?: string
  performedBy?: string
  dateFrom?: Date
  dateTo?: Date
  search?: string
}

export interface ValuationListParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: ValuationFilters
}

export interface ValuationListResponse {
  items: InventoryValuation[]
  total: number
  page: number
  limit: number
  totalPages: number
  stats: ValuationStats
}
