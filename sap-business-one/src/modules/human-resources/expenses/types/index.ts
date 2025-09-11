// Expense Management Types

export enum ExpenseStatus {
  DRAFT = 'draft',
  SUBMITTED = 'submitted',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PAID = 'paid',
  CANCELLED = 'cancelled',
}

export enum ExpenseType {
  TRAVEL = 'travel',
  ACCOMMODATION = 'accommodation',
  MEALS = 'meals',
  TRANSPORTATION = 'transportation',
  OFFICE_SUPPLIES = 'office_supplies',
  TRAINING = 'training',
  OTHER = 'other',
}

export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  CHECK = 'check',
  COMPANY_CARD = 'company_card',
}

export interface ExpenseItem {
  id: string
  expenseReportId: string
  date: string
  category: ExpenseType
  description: string
  amount: number
  currency: string
  paymentMethod: PaymentMethod
  receiptUrl?: string
  receiptNumber?: string
  vendorName?: string
  projectCode?: string
  departmentCode?: string
  notes?: string
  isPersonal: boolean
}

export interface ExpenseReport {
  id: string
  reportNumber: string
  employeeId: string
  employeeName: string
  departmentCode: string
  departmentName: string
  title: string
  description?: string
  status: ExpenseStatus
  totalAmount: number
  approvedAmount?: number
  currency: string
  submittedDate?: string
  approvedDate?: string
  approvedBy?: string
  rejectedDate?: string
  rejectedBy?: string
  rejectionReason?: string
  paidDate?: string
  paidBy?: string
  items: ExpenseItem[]
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface ExpenseReportFormData {
  title: string
  description?: string
  employeeId?: string
  departmentCode?: string
  currency: string
  items: Omit<ExpenseItem, 'id' | 'expenseReportId'>[]
}

export interface ExpenseSearchParams {
  search?: string
  employeeId?: string
  departmentCode?: string
  status?: ExpenseStatus
  type?: ExpenseType
  dateFrom?: string
  dateTo?: string
  minAmount?: number
  maxAmount?: number
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface ExpenseStats {
  totalExpenses: number
  totalAmount: number
  pendingApproval: number
  approvedThisMonth: number
  rejectedThisMonth: number
  averageExpenseAmount: number
  topCategories: Array<{
    category: ExpenseType
    count: number
    amount: number
  }>
  monthlyTrend: Array<{
    month: string
    count: number
    amount: number
  }>
}

export interface ExpenseReportSearchResponse {
  items: ExpenseReport[]
  total: number
  page: number
  limit: number
  totalPages: number
}