// Service Contracts Types

export enum ServiceContractStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  CANCELLED = 'cancelled',
  SUSPENDED = 'suspended',
  RENEWED = 'renewed',
}

export enum ContractType {
  PREVENTIVE_MAINTENANCE = 'preventive_maintenance',
  BREAK_FIX = 'break_fix',
  FULL_SERVICE = 'full_service',
  WARRANTY = 'warranty',
  SUPPORT = 'support',
  CONSULTING = 'consulting',
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

export interface Attachment {
  id: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedAt: string
  uploadedBy: string
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

export interface ServiceContractStats {
  totalContracts: number
  activeContracts: number
  expiredContracts: number
  expiringSoon: number
  totalValue: number
  averageContractValue: number
  contractsByType: Record<ContractType, number>
  contractsByStatus: Record<ServiceContractStatus, number>
  renewalRate: number
  customerSatisfaction: number
}

export interface ServiceContractFilters {
  search?: string
  status?: ServiceContractStatus
  type?: ContractType
  customerId?: string
  startDateFrom?: string
  startDateTo?: string
  endDateFrom?: string
  endDateTo?: string
  valueMin?: number
  valueMax?: number
}

export interface ServiceContractSearchParams extends ServiceContractFilters {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
