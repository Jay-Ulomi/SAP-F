// Service Calls Types

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

export enum SLAStatus {
  WITHIN_SLA = 'within_sla',
  SLA_WARNING = 'sla_warning',
  SLA_BREACH = 'sla_breach',
}

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

export interface Part {
  id: string
  partNumber: string
  description: string
  quantity: number
  unitCost: number
  totalCost: number
}

export interface Attachment {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: string
  uploadedBy: string
}

export interface ServiceActivity {
  id: string
  timestamp: string
  activity: string
  description: string
  performedBy: string
  performedByName: string
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
  notes?: string
}

export interface ServiceCallStats {
  totalCalls: number
  openCalls: number
  inProgressCalls: number
  resolvedCalls: number
  closedCalls: number
  averageResponseTime: number
  averageResolutionTime: number
  customerSatisfaction: number
  callsByStatus: Record<ServiceCallStatus, number>
  callsByPriority: Record<ServiceCallPriority, number>
  callsByType: Record<ServiceCallType, number>
  slaCompliance: number
}

export interface ServiceCallFilters {
  search?: string
  status?: ServiceCallStatus
  priority?: ServiceCallPriority
  type?: ServiceCallType
  assignedTo?: string
  customerId?: string
  dateFrom?: string
  dateTo?: string
  slaStatus?: SLAStatus
}

export interface ServiceCallSearchParams extends ServiceCallFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
