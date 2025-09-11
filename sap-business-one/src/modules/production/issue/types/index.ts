// Material Issue Types

export enum IssueType {
  PRODUCTION = 'production',
  MANUAL = 'manual',
  BACKFLUSH = 'backflush',
  CONSUMPTION = 'consumption',
}

export enum IssueStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  PARTIALLY_ISSUED = 'partially_issued',
  FULLY_ISSUED = 'fully_issued',
  CLOSED = 'closed',
  CANCELLED = 'cancelled',
}

export interface IssueItem {
  id: string
  itemCode: string
  itemName: string
  requiredQuantity: number
  issuedQuantity: number
  remainingQuantity: number
  unit: string
  warehouseCode: string
  warehouseName: string
  binLocation?: string
  batchNumbers?: string[]
  serialNumbers?: string[]
  unitCost: number
  totalCost: number
  notes?: string
}

export interface MaterialIssue {
  id: string
  issueNumber: string
  type: IssueType
  status: IssueStatus
  productionOrderId?: string
  productionOrderNumber?: string
  itemCode: string
  itemName: string
  plannedQuantity: number
  issuedQuantity: number
  remainingQuantity: number
  warehouseCode: string
  warehouseName: string
  bomCode?: string
  bomVersion?: string
  issueDate: string
  plannedIssueDate?: string
  dueDate: string
  items: IssueItem[]
  totalCost: number
  remarks?: string
  attachments?: string[]
  issuedBy?: string
  issuedAt?: string
  approvedBy?: string
  approvedAt?: string
  createdBy: string
  createdAt: string
  updatedBy?: string
  updatedAt?: string
}

export interface MaterialIssueFormData {
  issueNumber?: string
  type: IssueType
  status: IssueStatus
  productionOrderId?: string
  itemCode: string
  plannedQuantity: number
  warehouseCode: string
  bomCode?: string
  bomVersion?: string
  issueDate: string
  plannedIssueDate?: string
  dueDate: string
  remarks?: string
}

export interface MaterialIssueStats {
  totalIssues: number
  draftIssues: number
  openIssues: number
  partiallyIssuedIssues: number
  fullyIssuedIssues: number
  closedIssues: number
  cancelledIssues: number
  overdueIssues: number
  totalIssuedValue: number
  averageIssueValue: number
  totalItemsIssued: number
  issuesByType: Record<IssueType, number>
  issuesByStatus: Record<IssueStatus, number>
  topIssuedItems: Array<{
    itemCode: string
    itemName: string
    totalQuantity: number
    totalValue: number
  }>
}

export interface MaterialIssueFilters {
  search?: string
  status?: IssueStatus
  type?: IssueType
  productionOrderId?: string
  itemCode?: string
  warehouseCode?: string
  issueDateFrom?: string
  issueDateTo?: string
  dueDateFrom?: string
  dueDateTo?: string
}

export interface MaterialIssueSearchParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  filters?: MaterialIssueFilters
}