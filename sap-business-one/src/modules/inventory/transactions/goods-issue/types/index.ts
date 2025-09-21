export interface GoodsIssueLineItem {
  itemCode: string
  description: string
  quantity: number
  unitPrice: number
  uomCode: string
  accountName: string
  dimension1: string
  dimension2: string
  dimension3: string
  dimension4: string
  warehouse: string
  project: string
  lineTotal: number
}

export interface GoodsIssue {
  id?: number
  documentNo: string
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  customer: string
  warehouse: string
  lineItems: GoodsIssueLineItem[]
  itemsCount: number
  totalAmount: number
  status?: 'Draft' | 'Pending' | 'Issued' | 'Cancelled'
  createdAt?: string
  updatedAt?: string
}

export enum IssueStatus {
  DRAFT = 'Draft',
  PENDING = 'Pending',
  ISSUED = 'Issued',
  CANCELLED = 'Cancelled'
}

// Form data interface
export interface GoodsIssueFormData {
  postingDate: string
  documentDate: string
  series: string
  businessPartnerCode: string
  businessPartnerName: string
  customer: string
  warehouse: string
  lineItems: GoodsIssueLineItem[]
}

// Filters interface
export interface GoodsIssueFilters {
  search?: string
  status?: IssueStatus[]
  customer?: string
  warehouse?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

// Statistics interface
export interface GoodsIssueStats {
  totalIssues: number
  issuedGoods: number
  pendingIssues: number
  draftIssues: number
  cancelledIssues: number
  totalValue: number
  averageValue: number
}

// Pagination interface
export interface GoodsIssuePagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}