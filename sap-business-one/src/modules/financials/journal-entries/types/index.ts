export interface JournalEntry {
  id: string
  entryNumber: string
  reference: string
  postingDate: string
  dueDate?: string
  memo: string
  status: JournalEntryStatus
  type: JournalEntryType
  currency: string
  exchangeRate: number
  totalDebit: number
  totalCredit: number
  isBalanced: boolean
  isPosted: boolean
  postedDate?: string
  createdDate: string
  modifiedDate: string
  createdBy: string
  modifiedBy: string
  lineItems: JournalEntryLine[]
}

export interface JournalEntryLine {
  id: string
  accountId: string
  accountCode: string
  accountName: string
  debitAmount: number
  creditAmount: number
  memo?: string
  taxCode?: string
  taxAmount: number
  lineNumber: number
}

export enum JournalEntryStatus {
  DRAFT = 'Draft',
  PENDING_APPROVAL = 'Pending Approval',
  APPROVED = 'Approved',
  POSTED = 'Posted',
  VOIDED = 'Voided',
}

export enum JournalEntryType {
  GENERAL = 'General',
  ADJUSTING = 'Adjusting',
  CLOSING = 'Closing',
  OPENING = 'Opening',
  RECURRING = 'Recurring',
}

export interface JournalEntryFormData {
  reference: string
  postingDate: string
  dueDate?: string
  memo: string
  type: JournalEntryType
  currency: string
  exchangeRate: number
  lineItems: JournalEntryLineFormData[]
}

export interface JournalEntryLineFormData {
  accountId: string
  debitAmount: number
  creditAmount: number
  memo?: string
  taxCode?: string
  taxAmount: number
}

export interface JournalEntryFilters {
  search?: string
  status?: JournalEntryStatus
  type?: JournalEntryType
  dateFrom?: string
  dateTo?: string
  isPosted?: boolean
}

export interface JournalEntryListResponse {
  data: JournalEntry[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface JournalEntryValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface AccountBalance {
  accountId: string
  accountCode: string
  accountName: string
  currentBalance: number
  currency: string
}
