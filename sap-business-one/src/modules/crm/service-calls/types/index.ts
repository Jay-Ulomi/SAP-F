// Service Call Status Enum
export enum ServiceCallStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  CANCELLED = 'CANCELLED',
}

// Service Call Priority Enum
export enum ServiceCallPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Service Call Type Enum
export enum ServiceCallType {
  TECHNICAL_SUPPORT = 'TECHNICAL_SUPPORT',
  BUG_REPORT = 'BUG_REPORT',
  FEATURE_REQUEST = 'FEATURE_REQUEST',
  TRAINING = 'TRAINING',
  CONSULTATION = 'CONSULTATION',
  MAINTENANCE = 'MAINTENANCE',
  INSTALLATION = 'INSTALLATION',
  UPGRADE = 'UPGRADE',
  OTHER = 'OTHER',
}

// Service Call Category Enum
export enum ServiceCallCategory {
  SOFTWARE = 'SOFTWARE',
  HARDWARE = 'HARDWARE',
  NETWORK = 'NETWORK',
  DATABASE = 'DATABASE',
  SECURITY = 'SECURITY',
  USER_ACCESS = 'USER_ACCESS',
  INTEGRATION = 'INTEGRATION',
  REPORTING = 'REPORTING',
  WORKFLOW = 'WORKFLOW',
  OTHER = 'OTHER',
}

// Service Call Source Enum
export enum ServiceCallSource {
  PHONE = 'PHONE',
  EMAIL = 'EMAIL',
  WEB_FORM = 'WEB_FORM',
  SELF_SERVICE = 'SELF_SERVICE',
  WALK_IN = 'WALK_IN',
  REFERRAL = 'REFERRAL',
  OTHER = 'OTHER',
}

// Service Call Resolution Enum
export enum ServiceCallResolution {
  RESOLVED = 'RESOLVED',
  WORKAROUND = 'WORKAROUND',
  DUPLICATE = 'DUPLICATE',
  NOT_AN_ISSUE = 'NOT_AN_ISSUE',
  CANNOT_REPRODUCE = 'CANNOT_REPRODUCE',
  OUT_OF_SCOPE = 'OUT_OF_SCOPE',
  OTHER = 'OTHER',
}

// Currency Enum
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  JPY = 'JPY',
  CAD = 'CAD',
  AUD = 'AUD',
  CHF = 'CHF',
  CNY = 'CNY',
}

// Service Call Contact Interface
export interface ServiceCallContact {
  id: string
  contactId: string
  contactName: string
  contactEmail: string
  contactPhone: string
  role: 'REPORTER' | 'ASSIGNEE' | 'WATCHER' | 'MANAGER'
  isPrimary: boolean
  notes?: string
}

// Service Call Activity Interface
export interface ServiceCallActivity {
  id: string
  type:
    | 'NOTE'
    | 'EMAIL'
    | 'CALL'
    | 'MEETING'
    | 'WORK_LOG'
    | 'STATUS_CHANGE'
    | 'PRIORITY_CHANGE'
    | 'ASSIGNMENT_CHANGE'
  subject: string
  description?: string
  date: Date
  duration?: number // in minutes
  assignedTo?: string
  outcome?: 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'
  nextAction?: string
  nextActionDate?: Date
  notes?: string
}

// Service Call Financial Interface
export interface ServiceCallFinancial {
  totalCost: number
  laborCost: number
  materialCost: number
  travelCost: number
  otherCost: number
  billableAmount: number
  currency: Currency
  billingStatus: 'NOT_BILLABLE' | 'BILLABLE' | 'BILLED' | 'PAID'
  billingNotes?: string
}

// Service Call Timeline Interface
export interface ServiceCallTimeline {
  reportedDate: Date
  assignedDate?: Date
  firstResponseDate?: Date
  resolutionDate?: Date
  closedDate?: Date
  slaTargetDate?: Date
  slaBreachDate?: Date
  estimatedResolutionDate?: Date
  actualResolutionDate?: Date
  totalResolutionTime?: number // in hours
  slaCompliance: 'ON_TIME' | 'BREACHED' | 'NOT_APPLICABLE'
  notes?: string
}

// Service Call SLA Interface
export interface ServiceCallSLA {
  slaLevel: 'STANDARD' | 'PREMIUM' | 'ENTERPRISE' | 'CUSTOM'
  responseTime: number // in hours
  resolutionTime: number // in hours
  businessHours: boolean
  priority: ServiceCallPriority
  category: ServiceCallCategory
  notes?: string
}

// Service Call Form Data Interface
export interface ServiceCallFormData {
  serviceCallCode: string
  title: string
  description: string
  status: ServiceCallStatus
  priority: ServiceCallPriority
  type: ServiceCallType
  category: ServiceCallCategory
  source: ServiceCallSource
  customerId: string
  customerName: string
  assignedTo: string
  contacts: Omit<ServiceCallContact, 'id'>[]
  estimatedHours: number
  actualHours: number
  tags: string[]
  notes: string
}

// Service Call Filters Interface
export interface ServiceCallFilters {
  search?: string
  status?: ServiceCallStatus
  priority?: ServiceCallPriority
  type?: ServiceCallType
  category?: ServiceCallCategory
  source?: ServiceCallSource
  assignedTo?: string
  customerId?: string
  reportedDateFrom?: Date
  reportedDateTo?: Date
  slaCompliance?: 'ON_TIME' | 'BREACHED' | 'NOT_APPLICABLE'
}

// Service Call Pagination Interface
export interface ServiceCallPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// Service Call Statistics Interface
export interface ServiceCallStats {
  totalServiceCalls: number
  openServiceCalls: number
  resolvedServiceCalls: number
  closedServiceCalls: number
  averageResolutionTime: number // in hours
  slaComplianceRate: number // percentage
  totalCost: number
  averageCost: number
  priorityDistribution: Record<ServiceCallPriority, number>
  categoryDistribution: Record<ServiceCallCategory, number>
  statusDistribution: Record<ServiceCallStatus, number>
}

// Main Service Call Interface
export interface ServiceCall {
  id: string
  serviceCallCode: string
  title: string
  description: string
  status: ServiceCallStatus
  priority: ServiceCallPriority
  type: ServiceCallType
  category: ServiceCallCategory
  source: ServiceCallSource
  customerId: string
  customerName: string
  assignedTo: string
  contacts: ServiceCallContact[]
  activities: ServiceCallActivity[]
  financial: ServiceCallFinancial
  timeline: ServiceCallTimeline
  sla: ServiceCallSLA
  estimatedHours: number
  actualHours: number
  tags: string[]
  notes: string
  attachments: string[]
  relatedServiceCalls: string[]
  createdAt: Date
  updatedAt: Date
  createdBy: string
  updatedBy: string
}
