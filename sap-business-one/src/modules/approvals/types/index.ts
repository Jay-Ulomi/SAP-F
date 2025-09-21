// Approval Workflow Types

export enum ApprovalType {
  OPEX = 'OPEX',
  FUEL_STAFF = 'FUEL_STAFF',
  FUEL_BULK = 'FUEL_BULK',
  OPEX_UNCONTRACTED = 'OPEX_UNCONTRACTED',
  CAPEX = 'CAPEX'
}

export enum ApprovalStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum ApprovalDocumentType {
  PURCHASE_REQUEST = 'PURCHASE_REQUEST',
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  GOODS_RECEIPT = 'GOODS_RECEIPT',
  GOODS_ISSUE = 'GOODS_ISSUE',
  AP_INVOICE = 'AP_INVOICE',
  AP_CREDIT_MEMO = 'AP_CREDIT_MEMO',
  AR_INVOICE = 'AR_INVOICE',
  AR_CREDIT_MEMO = 'AR_CREDIT_MEMO',
  DELIVERY = 'DELIVERY',
  RETURN = 'RETURN'
}

export enum Department {
  SALES = 'SALES',
  OPERATIONS = 'OPERATIONS',
  HUMAN_RESOURCE = 'HUMAN_RESOURCE',
  FINANCE = 'FINANCE',
  IT = 'IT',
  MARKETING = 'MARKETING'
}

export enum DocumentApprovalStatus {
  DRAFT = 'DRAFT',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

export interface ApprovalRule {
  id: string
  type: ApprovalType
  department: Department
  documentType: ApprovalDocumentType
  initiator: string
  amountFrom: number
  amountTo: number
  approver1?: string
  approver2?: string
  approver3?: string
  approver4?: string
  approver5?: string
  status: ApprovalStatus
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface ApprovalRuleFormData {
  type: ApprovalType
  department: Department
  documentType: ApprovalDocumentType
  initiator: string
  amountFrom: number
  amountTo: number
  approver1?: string
  approver2?: string
  approver3?: string
  approver4?: string
  approver5?: string
  status: ApprovalStatus
}

export interface ApprovalInstance {
  id: string
  ruleId: string
  documentId: string
  documentType: ApprovalDocumentType
  initiatorId: string
  initiatorName: string
  amount: number
  department: Department
  currentLevel: number
  maxLevel: number
  status: DocumentApprovalStatus
  approvals: ApprovalStep[]
  createdAt: string
  updatedAt: string
}

export interface ApprovalStep {
  level: number
  approverId: string
  approverName: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  comments?: string
  approvedAt?: string
  rejectedAt?: string
}

export interface ApprovalAction {
  action: 'APPROVE' | 'REJECT'
  comments?: string
  approverId: string
  approverName: string
}

export interface ApprovalFilters {
  type?: ApprovalType
  department?: Department
  documentType?: ApprovalDocumentType
  status?: ApprovalStatus
  initiator?: string
  search?: string
  amountFrom?: number
  amountTo?: number
}

export interface ApprovalStats {
  totalRules: number
  activeRules: number
  inactiveRules: number
  rulesByType: { type: ApprovalType; count: number }[]
  rulesByDepartment: { department: Department; count: number }[]
  pendingApprovals: number
  approvedToday: number
  rejectedToday: number
}

export interface ApprovalPagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

export interface User {
  id: string
  name: string
  email: string
  department: Department
  role: string
  active: boolean
}

// Document interfaces for approval integration
export interface ApprovableDocument {
  id: string
  type: ApprovalDocumentType
  amount: number
  department: Department
  initiatorId: string
  status: DocumentApprovalStatus
  approvalInstanceId?: string
}

export interface ApprovalHistory {
  id: string
  documentId: string
  documentType: ApprovalDocumentType
  action: string
  approverId: string
  approverName: string
  comments?: string
  timestamp: string
}