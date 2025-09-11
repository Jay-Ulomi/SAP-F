// Cost Accounting Types and Interfaces

// Cost Center Types
export enum CostCenterType {
  PRODUCTION = 'Production',
  ADMINISTRATION = 'Administration',
  SALES = 'Sales',
  MARKETING = 'Marketing',
  RESEARCH = 'Research',
  MAINTENANCE = 'Maintenance',
  QUALITY = 'Quality',
  LOGISTICS = 'Logistics',
  IT = 'IT',
  HR = 'Human Resources',
  FINANCE = 'Finance',
  LEGAL = 'Legal',
  OTHER = 'Other',
}

export enum CostCenterStatus {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  SUSPENDED = 'Suspended',
  CLOSED = 'Closed',
}

export enum AllocationMethod {
  DIRECT = 'Direct',
  STEP_DOWN = 'Step Down',
  RECIPROCAL = 'Reciprocal',
  ACTIVITY_BASED = 'Activity Based',
  EQUAL = 'Equal',
  PERCENTAGE = 'Percentage',
  MANUAL = 'Manual',
}

export enum CostDriverType {
  LABOR_HOURS = 'Labor Hours',
  MACHINE_HOURS = 'Machine Hours',
  SQUARE_FEET = 'Square Feet',
  HEADCOUNT = 'Headcount',
  VOLUME = 'Volume',
  WEIGHT = 'Weight',
  DISTANCE = 'Distance',
  TRANSACTIONS = 'Transactions',
  CUSTOM = 'Custom',
}

// Cost Center Interface
export interface CostCenter {
  id: string
  code: string
  name: string
  description?: string
  type: CostCenterType
  status: CostCenterStatus
  parentId?: string
  parentCode?: string
  parentName?: string
  level: number
  path: string[]
  manager?: string
  department?: string
  location?: string
  currency: string
  budgetAmount: number
  actualAmount: number
  varianceAmount: number
  variancePercentage: number
  isAllocated: boolean
  allocationMethod?: AllocationMethod
  costDriver?: CostDriverType
  costDriverValue?: number
  costDriverUnit?: string
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
}

// Cost Center Form Data
export interface CostCenterFormData {
  code: string
  name: string
  description?: string
  type: CostCenterType
  status: CostCenterStatus
  parentId?: string
  manager?: string
  department?: string
  location?: string
  currency: string
  budgetAmount: number
  allocationMethod?: AllocationMethod
  costDriver?: CostDriverType
  costDriverValue?: number
  costDriverUnit?: string
}

// Cost Allocation Interface
export interface CostAllocation {
  id: string
  sourceCostCenterId: string
  sourceCostCenterCode: string
  sourceCostCenterName: string
  targetCostCenterId: string
  targetCostCenterCode: string
  targetCostCenterName: string
  allocationMethod: AllocationMethod
  allocationPercentage: number
  allocationAmount: number
  baseAmount: number
  costDriver?: CostDriverType
  costDriverValue?: number
  period: string
  fiscalYear: string
  isPosted: boolean
  postedDate?: string
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
}

// Cost Allocation Form Data
export interface CostAllocationFormData {
  sourceCostCenterId: string
  targetCostCenterId: string
  allocationMethod: AllocationMethod
  allocationPercentage: number
  allocationAmount: number
  baseAmount: number
  costDriver?: CostDriverType
  costDriverValue?: number
  period: string
  fiscalYear: string
}

// Profit Center Interface
export interface ProfitCenter {
  id: string
  code: string
  name: string
  description?: string
  costCenterId: string
  costCenterCode: string
  costCenterName: string
  manager?: string
  department?: string
  productLine?: string
  region?: string
  currency: string
  revenue: number
  directCosts: number
  allocatedCosts: number
  totalCosts: number
  grossProfit: number
  grossProfitMargin: number
  operatingIncome: number
  operatingMargin: number
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
}

// Cost Analysis Interface
export interface CostAnalysis {
  id: string
  costCenterId: string
  costCenterCode: string
  costCenterName: string
  period: string
  fiscalYear: string
  budgetAmount: number
  actualAmount: number
  varianceAmount: number
  variancePercentage: number
  allocatedAmount: number
  totalAmount: number
  costBreakdown: {
    labor: number
    materials: number
    overhead: number
    depreciation: number
    utilities: number
    maintenance: number
    other: number
  }
  trend: {
    previousPeriod: number
    previousYear: number
    yearToDate: number
  }
  createdDate: string
  modifiedDate: string
}

// Cost Driver Interface
export interface CostDriver {
  id: string
  name: string
  type: CostDriverType
  description?: string
  unit: string
  isActive: boolean
  costCenterId?: string
  costCenterCode?: string
  costCenterName?: string
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
}

// Cost Driver Form Data
export interface CostDriverFormData {
  name: string
  type: CostDriverType
  description?: string
  unit: string
  costCenterId?: string
}

// Cost Center Hierarchy
export interface CostCenterHierarchy {
  id: string
  code: string
  name: string
  type: CostCenterType
  status: CostCenterStatus
  level: number
  children: CostCenterHierarchy[]
  budgetAmount: number
  actualAmount: number
  varianceAmount: number
  isExpanded?: boolean
}

// Filters and Search
export interface CostCenterFilters {
  search?: string
  type?: CostCenterType
  status?: CostCenterStatus
  parentId?: string
  manager?: string
  department?: string
  location?: string
  currency?: string
  isAllocated?: boolean
  allocationMethod?: AllocationMethod
  period?: string
  fiscalYear?: string
}

export interface CostAllocationFilters {
  sourceCostCenterId?: string
  targetCostCenterId?: string
  allocationMethod?: AllocationMethod
  period?: string
  fiscalYear?: string
  isPosted?: boolean
  dateFrom?: string
  dateTo?: string
}

// API Response Types
export interface CostCenterListResponse {
  data: CostCenter[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface CostAllocationListResponse {
  data: CostAllocation[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface ProfitCenterListResponse {
  data: ProfitCenter[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export interface CostAnalysisListResponse {
  data: CostAnalysis[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// Statistics and Reports
export interface CostAccountingStats {
  totalCostCenters: number
  activeCostCenters: number
  totalBudget: number
  totalActual: number
  totalVariance: number
  averageVariancePercentage: number
  allocatedCostCenters: number
  unallocatedCostCenters: number
  topCostCenters: Array<{
    id: string
    code: string
    name: string
    amount: number
    percentage: number
  }>
  costCenterTypes: Record<CostCenterType, number>
  allocationMethods: Record<AllocationMethod, number>
}

// Validation Results
export interface CostCenterValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface CostAllocationValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

// Export all types
export type {
  CostCenter,
  CostCenterFormData,
  CostAllocation,
  CostAllocationFormData,
  ProfitCenter,
  CostAnalysis,
  CostDriver,
  CostDriverFormData,
  CostCenterHierarchy,
  CostCenterFilters,
  CostAllocationFilters,
  CostCenterListResponse,
  CostAllocationListResponse,
  ProfitCenterListResponse,
  CostAnalysisListResponse,
  CostAccountingStats,
  CostCenterValidationResult,
  CostAllocationValidationResult,
}
