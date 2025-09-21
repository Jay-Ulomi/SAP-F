// Service Module Types

export enum ServiceContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended',
  RENEWED = 'renewed',
}

export enum ServiceCallStatus {
  OPEN = 'open',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export enum ServiceCallPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum ServiceCallType {
  REPAIR = 'repair',
  MAINTENANCE = 'maintenance',
  INSTALLATION = 'installation',
  INSPECTION = 'inspection',
  CONSULTATION = 'consultation',
  WARRANTY = 'warranty',
  OTHER = 'other',
}

export enum EquipmentStatus {
  ACTIVE = 'active',
  IN_SERVICE = 'in_service',
  OUT_OF_SERVICE = 'out_of_service',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired',
  DISPOSED = 'disposed',
}

export enum ContractType {
  PREVENTIVE_MAINTENANCE = 'preventive_maintenance',
  BREAK_FIX = 'break_fix',
  FULL_SERVICE = 'full_service',
  WARRANTY = 'warranty',
  SUPPORT = 'support',
  CONSULTING = 'consulting',
}

export enum ResponseTimeUnit {
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks',
}

export enum SLAStatus {
  WITHIN_SLA = 'within_sla',
  SLA_WARNING = 'sla_warning',
  SLA_BREACH = 'sla_breach',
}

export enum EquipmentType {
  SERVER = 'server',
  NETWORK = 'network',
  STORAGE = 'storage',
  SECURITY = 'security',
  PERIPHERAL = 'peripheral',
  MOBILE = 'mobile',
  SOFTWARE = 'software',
  OTHER = 'other',
}

export enum MaintenanceStatus {
  UP_TO_DATE = 'up_to_date',
  DUE_SOON = 'due_soon',
  OVERDUE = 'overdue',
  IN_PROGRESS = 'in_progress',
  NOT_REQUIRED = 'not_required',
}

export enum WarrantyStatus {
  UNDER_WARRANTY = 'under_warranty',
  EXPIRED = 'expired',
  NO_WARRANTY = 'no_warranty',
  EXTENDED = 'extended',
}

export enum BillingFrequency {
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  SEMI_ANNUAL = 'semi_annual',
  ANNUAL = 'annual',
  ONE_TIME = 'one_time',
}

export enum PaymentTerms {
  NET_15 = 'net_15',
  NET_30 = 'net_30',
  NET_45 = 'net_45',
  NET_60 = 'net_60',
  DUE_ON_RECEIPT = 'due_on_receipt',
  PREPAID = 'prepaid',
}

// Service Contract
export interface ServiceContract {
  id: string
  contractNumber: string
  customerId: string
  customerName: string
  type: ContractType
  status: ServiceContractStatus
  title: string
  description: string
  startDate: string
  endDate: string
  renewalDate?: string
  totalValue: number
  currency: string
  billingFrequency: BillingFrequency
  paymentTerms: PaymentTerms
  serviceLevel: string
  responseTime: number
  resolutionTime: number
  coverage: string[]
  exclusions: string[]
  terms: string
  notes?: string
  attachments: Attachment[]
  contacts: ContractContact[]
  equipment: ContractEquipment[]
  billingAddress: Address
  serviceAddress: Address
  createdAt: string
  updatedAt: string
  createdBy: string
  lastModifiedBy?: string
}

export interface CoverageDetails {
  includesLabor: boolean
  includesParts: boolean
  includesTravel: boolean
  responseTime: number
  responseTimeUnit: ResponseTimeUnit
  businessHours: string
  holidays: boolean
  weekends: boolean
  exclusions: string[]
}

export interface ServiceLevel {
  id: string
  name: string
  priority: ServiceCallPriority
  responseTime: number
  responseTimeUnit: ResponseTimeUnit
  resolutionTime: number
  resolutionTimeUnit: ResponseTimeUnit
  availability: string
}

export interface BillingSchedule {
  frequency: 'monthly' | 'quarterly' | 'semi-annually' | 'annually'
  amount: number
  nextBillingDate: string
  paymentMethod: string
  autoRenewal: boolean
}

// Equipment
export interface Equipment {
  id: string
  equipmentNumber: string
  name: string
  description: string
  type: EquipmentType
  status: EquipmentStatus
  manufacturer: string
  model: string
  serialNumber: string
  assetTag?: string
  location: string
  customerId: string
  customerName: string
  contractId?: string
  contractNumber?: string
  purchaseDate: string
  warrantyExpiry?: string
  warrantyStatus: WarrantyStatus
  lastMaintenanceDate?: string
  nextMaintenanceDate?: string
  maintenanceStatus: MaintenanceStatus
  maintenanceInterval: number
  cost: number
  currency: string
  supplier: string
  specifications: EquipmentSpecification[]
  maintenanceHistory: MaintenanceRecord[]
  attachments: Attachment[]
  serviceCalls: ServiceCallReference[]
  notes?: string
  value: number
  depreciatedValue: number
  createdAt: string
  updatedAt: string
  createdBy: string
  lastModifiedBy?: string
}

export interface MaintenanceRecord {
  id: string
  date: string
  type: 'preventive' | 'corrective' | 'inspection'
  description: string
  technician: string
  duration: number
  cost: number
  partsUsed: Part[]
  nextMaintenanceDate?: string
}

export interface Part {
  id: string
  code: string
  name: string
  quantity: number
  unitCost: number
  totalCost: number
}

export interface EquipmentSpecification {
  name: string
  value: string
  unit?: string
}

export interface ServiceCallReference {
  id: string
  callNumber: string
  date: string
  status: string
  description: string
}

export interface ContractContact {
  id: string
  name: string
  title: string
  email: string
  phone: string
  isPrimary: boolean
  department?: string
}

export interface ContractEquipment {
  id: string
  equipmentId: string
  equipmentName: string
  serialNumber: string
  model: string
  location: string
  covered: boolean
  maintenanceSchedule?: string
}

export interface Address {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

// Service Call
export interface ServiceCall {
  id: string
  callNumber: string
  customerId: string
  customerName: string
  contractId?: string
  contractNumber?: string
  equipmentId?: string
  equipmentSerial?: string
  type: ServiceCallType
  status: ServiceCallStatus
  priority: ServiceCallPriority
  subject: string
  description: string
  problemDescription?: string
  resolution?: string
  location: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  assignedTo?: string
  assignedToName?: string
  scheduledDate?: string
  scheduledTime?: string
  actualStartTime?: string
  actualEndTime?: string
  responseTime?: number
  resolutionTime?: number
  slaStatus: SLAStatus
  laborHours?: number
  travelTime?: number
  partsUsed: Part[]
  totalCost: number
  customerSatisfaction?: number
  notes?: string
  attachments: Attachment[]
  activities: ServiceActivity[]
  createdAt: string
  updatedAt: string
  createdBy: string
  closedAt?: string
  closedBy?: string
}

export interface ServiceActivity {
  id: string
  timestamp: string
  type: 'comment' | 'status_change' | 'assignment' | 'work_performed' | 'part_used'
  description: string
  performedBy: string
  performedByName: string
  duration?: number
  details?: Record<string, any>
}

// Response Time Tracking
export interface ResponseTimeMetric {
  id: string
  period: string
  averageResponseTime: number
  medianResponseTime: number
  minResponseTime: number
  maxResponseTime: number
  totalCalls: number
  withinSLA: number
  slaBreaches: number
  slaPercentage: number
  byPriority: ResponseByPriority[]
  byType: ResponseByType[]
  byTechnician: ResponseByTechnician[]
}

export interface ResponseByPriority {
  priority: ServiceCallPriority
  count: number
  averageTime: number
  slaPercentage: number
}

export interface ResponseByType {
  type: ServiceCallType
  count: number
  averageTime: number
  slaPercentage: number
}

export interface ResponseByTechnician {
  technicianId: string
  technicianName: string
  callsHandled: number
  averageResponseTime: number
  averageResolutionTime: number
  slaPercentage: number
  customerSatisfaction: number
}

// Common
export interface Attachment {
  id: string
  name: string
  url: string
  type: string
  size: number
  uploadedAt: string
  uploadedBy: string
}

export interface Customer {
  id: string
  code: string
  name: string
  contact: string
  phone: string
  email: string
  address: string
}

export interface Technician {
  id: string
  name: string
  email: string
  phone: string
  specializations: string[]
  availability: 'available' | 'busy' | 'offline'
  currentCalls: number
}

// Form Data
export interface ServiceContractFormData {
  customerId: string
  type: ContractType
  title: string
  description: string
  startDate: string
  endDate: string
  totalValue: number
  currency: string
  billingFrequency: BillingFrequency
  paymentTerms: PaymentTerms
  serviceLevel: string
  responseTime: number
  resolutionTime: number
  coverage: string[]
  exclusions: string[]
  terms: string
  notes?: string
  billingAddress: Address
  serviceAddress: Address
}

export interface EquipmentFormData {
  name: string
  description: string
  type: EquipmentType
  manufacturer: string
  model: string
  serialNumber: string
  assetTag?: string
  location: string
  customerId: string
  contractId?: string
  purchaseDate: string
  warrantyExpiry?: string
  maintenanceInterval: number
  cost: number
  currency: string
  supplier: string
  specifications: EquipmentSpecification[]
  notes?: string
}

export interface ServiceCallFormData {
  customerId: string
  contractId?: string
  equipmentId?: string
  type: ServiceCallType
  priority: ServiceCallPriority
  subject: string
  description: string
  problemDescription?: string
  location: string
  contactPerson: string
  contactPhone: string
  contactEmail: string
  assignedTo?: string
  scheduledDate?: string
  scheduledTime?: string
}

// Search Parameters
export interface ServiceSearchParams {
  page?: number
  limit?: number
  search?: string
  status?: ServiceContractStatus | ServiceCallStatus | EquipmentStatus
  type?: ContractType | ServiceCallType
  priority?: ServiceCallPriority
  customerId?: string
  technicianId?: string
  dateFrom?: string
  dateTo?: string
  slaStatus?: string
}

export interface ServiceSearchResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Statistics
export interface ServiceStats {
  activeContracts: number
  totalContractValue: number
  openCalls: number
  todaysCalls: number
  averageResponseTime: number
  slaPerformance: number
  equipmentInService: number
  technicianUtilization: number
  customerSatisfaction: number
  monthlyTrend: MonthlyTrend[]
}

export interface MonthlyTrend {
  month: string
  calls: number
  resolved: number
  revenue: number
  slaPercentage: number
}
