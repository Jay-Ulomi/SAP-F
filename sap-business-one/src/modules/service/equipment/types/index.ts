// Equipment Types

export enum EquipmentStatus {
  ACTIVE = 'active',
  IN_SERVICE = 'in_service',
  OUT_OF_SERVICE = 'out_of_service',
  MAINTENANCE = 'maintenance',
  RETIRED = 'retired',
  DISPOSED = 'disposed',
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
  maintenanceInterval: number // in days
  cost: number
  currency: string
  supplier: string
  specifications: EquipmentSpecification[]
  attachments: Attachment[]
  maintenanceHistory: MaintenanceRecord[]
  serviceCalls: ServiceCallReference[]
  notes?: string
  createdAt: string
  updatedAt: string
  createdBy: string
  lastModifiedBy?: string
}

export interface EquipmentSpecification {
  name: string
  value: string
  unit?: string
}

export interface Attachment {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: string
  uploadedBy: string
}

export interface MaintenanceRecord {
  id: string
  date: string
  type: string
  description: string
  performedBy: string
  cost?: number
  notes?: string
  nextDueDate?: string
}

export interface ServiceCallReference {
  id: string
  callNumber: string
  date: string
  status: string
  description: string
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

export interface EquipmentStats {
  totalEquipment: number
  activeEquipment: number
  inServiceEquipment: number
  outOfServiceEquipment: number
  maintenanceDue: number
  underWarranty: number
  totalValue: number
  averageAge: number
  equipmentByType: Record<EquipmentType, number>
  equipmentByStatus: Record<EquipmentStatus, number>
  maintenanceStatus: Record<MaintenanceStatus, number>
  warrantyStatus: Record<WarrantyStatus, number>
  topCustomers: Array<{ customerId: string; customerName: string; count: number }>
}

export interface EquipmentFilters {
  search?: string
  status?: EquipmentStatus
  type?: EquipmentType
  customerId?: string
  contractId?: string
  maintenanceStatus?: MaintenanceStatus
  warrantyStatus?: WarrantyStatus
  location?: string
  manufacturer?: string
  purchaseDateFrom?: string
  purchaseDateTo?: string
  costMin?: number
  costMax?: number
}

export interface EquipmentSearchParams extends EquipmentFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
