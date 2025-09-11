// Service Module Types

export enum ServiceContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended',
  RENEWED = 'renewed'
}

export enum ServiceCallStatus {
  OPEN = 'open',
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  ON_HOLD = 'on_hold',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
  CANCELLED = 'cancelled'
}

export enum ServiceCallPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export enum ServiceCallType {
  REPAIR = 'repair',
  MAINTENANCE = 'maintenance',
  INSTALLATION = 'installation',
  INSPECTION = 'inspection',
  CONSULTATION = 'consultation',
  WARRANTY = 'warranty',
  OTHER = 'other'
}

export enum EquipmentStatus {
  ACTIVE = 'active',
  IN_SERVICE = 'in_service',
  OUT_OF_SERVICE = 'out_of_service',
  UNDER_REPAIR = 'under_repair',
  DECOMMISSIONED = 'decommissioned',
  LOST = 'lost'
}

export enum ContractType {
  WARRANTY = 'warranty',
  SERVICE_AGREEMENT = 'service_agreement',
  MAINTENANCE = 'maintenance',
  SUPPORT = 'support',
  SUBSCRIPTION = 'subscription'
}

export enum ResponseTimeUnit {
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days',
  WEEKS = 'weeks'
}

// Service Contract
export interface ServiceContract {
  id: string
  contractNumber: string
  customerId: string
  customerName: string
  type: ContractType
  status: ServiceContractStatus
  startDate: string
  endDate: string
  renewalDate?: string
  value: number
  currency: string
  description?: string
  coverageDetails: CoverageDetails
  equipment: string[]
  serviceLevels: ServiceLevel[]
  billingSchedule: BillingSchedule
  contactPerson: string
  contactEmail: string
  contactPhone: string
  notes?: string
  attachments: Attachment[]
  createdAt: string
  updatedAt: string
  createdBy: string
  lastServiceDate?: string
  nextServiceDate?: string
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
  serialNumber: string
  name: string
  model: string
  manufacturer: string
  category: string
  status: EquipmentStatus
  customerId: string
  customerName: string
  location: string
  installationDate: string
  warrantyExpiration?: string
  contractId?: string
  contractNumber?: string
  lastServiceDate?: string
  nextServiceDate?: string
  specifications: Record<string, any>
  maintenanceHistory: MaintenanceRecord[]
  attachments: Attachment[]
  notes?: string
  value: number
  depreciatedValue: number
  createdAt: string
  updatedAt: string
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
  slaStatus: 'within_sla' | 'sla_warning' | 'sla_breach'
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
  status: ServiceContractStatus
  startDate: string
  endDate: string
  value: number
  currency: string
  description?: string
  coverageDetails: CoverageDetails
  equipment: string[]
  contactPerson: string
  contactEmail: string
  contactPhone: string
  notes?: string
}

export interface EquipmentFormData {
  serialNumber: string
  name: string
  model: string
  manufacturer: string
  category: string
  status: EquipmentStatus
  customerId: string
  location: string
  installationDate: string
  warrantyExpiration?: string
  contractId?: string
  specifications: Record<string, any>
  notes?: string
  value: number
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