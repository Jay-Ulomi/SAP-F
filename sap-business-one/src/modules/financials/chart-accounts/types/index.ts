export interface ChartAccount {
  id: string
  accountCode: string
  accountName: string
  accountType: AccountType
  parentAccount?: string
  level: number
  isActive: boolean
  description?: string
  currency: string
  taxCode?: string
  reconciliationAccount: boolean
  blockedForManualEntry: boolean
  allowReconciliation: boolean
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
}

export enum AccountType {
  ASSET = 'Asset',
  LIABILITY = 'Liability',
  EQUITY = 'Equity',
  REVENUE = 'Revenue',
  EXPENSE = 'Expense',
  COST_OF_GOODS_SOLD = 'Cost of Goods Sold',
}

export interface ChartAccountFormData {
  accountCode: string
  accountName: string
  accountType: AccountType
  parentAccount?: string
  description?: string
  currency: string
  taxCode?: string
  reconciliationAccount: boolean
  blockedForManualEntry: boolean
  allowReconciliation: boolean
}

export interface ChartAccountFilters {
  search?: string
  accountType?: AccountType
  isActive?: boolean
  level?: number
}

export interface ChartAccountListResponse {
  data: ChartAccount[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
