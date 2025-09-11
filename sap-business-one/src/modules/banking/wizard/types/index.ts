// Payment Wizard Type Enums
export enum PaymentWizardStatus {
  DRAFT = 'DRAFT',
  IN_PROGRESS = 'IN_PROGRESS',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentWizardType {
  SINGLE_PAYMENT = 'SINGLE_PAYMENT',
  BATCH_PAYMENT = 'BATCH_PAYMENT',
  RECURRING_PAYMENT = 'RECURRING_PAYMENT',
  PAYROLL_PAYMENT = 'PAYROLL_PAYMENT',
  VENDOR_PAYMENT = 'VENDOR_PAYMENT',
  CUSTOMER_REFUND = 'CUSTOMER_REFUND',
  TAX_PAYMENT = 'TAX_PAYMENT',
  LOAN_PAYMENT = 'LOAN_PAYMENT',
}

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  WIRE_TRANSFER = 'WIRE_TRANSFER',
  ACH = 'ACH',
  CHECK = 'CHECK',
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  ELECTRONIC_FUNDS_TRANSFER = 'ELECTRONIC_FUNDS_TRANSFER',
}

export enum PaymentPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export enum ApprovalStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  REQUIRES_REVIEW = 'REQUIRES_REVIEW',
}

// Core Interfaces
export interface PaymentWizard {
  id: string
  wizardNumber: string
  wizardType: PaymentWizardType
  title: string
  description?: string
  status: PaymentWizardStatus
  priority: PaymentPriority
  totalAmount: number
  currency: string
  paymentCount: number
  completedPayments: number
  failedPayments: number
  createdBy: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  approvedBy?: string
  approvedAt?: Date
  notes?: string
}

export interface PaymentStep {
  id: string
  stepNumber: number
  title: string
  description: string
  isRequired: boolean
  isCompleted: boolean
  isSkippable: boolean
  validationRules?: string[]
  estimatedTime?: number // in minutes
}

export interface PaymentWizardStep {
  id: string
  wizardId: string
  stepId: string
  stepNumber: number
  title: string
  description: string
  isCompleted: boolean
  completedAt?: Date
  data?: Record<string, any>
  validationErrors?: string[]
}

export interface PaymentWizardFormData {
  wizardType: PaymentWizardType
  title: string
  description?: string
  priority: PaymentPriority
  currency: string
  notes?: string
}

export interface PaymentWizardFilters {
  status?: PaymentWizardStatus
  wizardType?: PaymentWizardType
  priority?: PaymentPriority
  createdBy?: string
  dateFrom?: Date
  dateTo?: Date
  amountMin?: number
  amountMax?: number
}

// Statistics and Analytics Interfaces
export interface PaymentWizardStats {
  totalWizards: number
  activeWizards: number
  completedWizards: number
  failedWizards: number
  totalAmount: number
  averageWizardAmount: number
  averageCompletionTime: number
  wizardsByType: Record<PaymentWizardType, number>
  wizardsByStatus: Record<PaymentWizardStatus, number>
  wizardsByPriority: Record<PaymentPriority, number>
}

// Pagination Interfaces
export interface PaymentWizardPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

// API Response Interfaces
export interface PaymentWizardsResponse {
  wizards: PaymentWizard[]
  pagination: PaymentWizardPagination
}

// Currency enum for form dropdowns
export enum Currency {
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CAD = 'CAD',
  AUD = 'AUD',
  JPY = 'JPY',
  CHF = 'CHF',
  CNY = 'CNY',
}
