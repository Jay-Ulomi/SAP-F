import { apiClient } from '../../../../shared/api/apiClient'
import type {
  Budget,
  BudgetFormData,
  BudgetFilters,
  BudgetValidationResult,
  BudgetLine,
  BudgetLineFormData,
  BudgetLineFilters,
  BudgetLineValidationResult,
  BudgetStats,
  BudgetComparison,
  BudgetTemplate,
  BudgetApproval,
  BudgetRollover,
  BudgetsResponse,
  BudgetResponse,
  BudgetLinesResponse,
  BudgetStatsResponse,
  BudgetComparisonResponse,
  BudgetTemplatesResponse,
  BudgetApprovalsResponse,
} from '../types'

const BUDGETS_BASE_PATH = '/budgets'
const BUDGET_LINES_BASE_PATH = '/budget-lines'
const BUDGET_TEMPLATES_BASE_PATH = '/budget-templates'
const BUDGET_APPROVALS_BASE_PATH = '/budget-approvals'
const BUDGET_ROLLOVERS_BASE_PATH = '/budget-rollovers'

// Budget API Services
const budgetsApi = {
  // Get all budgets with pagination and filters
  getBudgets: async (
    page = 1,
    pageSize = 20,
    filters?: BudgetFilters,
  ): Promise<BudgetsResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.search && { search: filters.search }),
      ...(filters?.type && { type: filters.type }),
      ...(filters?.status && { status: filters.status }),
      ...(filters?.fiscalYear && { fiscalYear: filters.fiscalYear.toString() }),
      ...(filters?.startDate && { startDate: filters.startDate }),
      ...(filters?.endDate && { endDate: filters.endDate }),
    })
    return apiClient.get(`${BUDGETS_BASE_PATH}?${params}`)
  },

  // Get budget by ID
  getBudget: async (id: string): Promise<BudgetResponse> => {
    return apiClient.get(`${BUDGETS_BASE_PATH}/${id}`)
  },

  // Create new budget
  createBudget: async (data: BudgetFormData): Promise<BudgetResponse> => {
    return apiClient.post(BUDGETS_BASE_PATH, data)
  },

  // Update budget
  updateBudget: async (id: string, data: BudgetFormData): Promise<BudgetResponse> => {
    return apiClient.put(`${BUDGETS_BASE_PATH}/${id}`, data)
  },

  // Delete budget
  deleteBudget: async (id: string): Promise<void> => {
    return apiClient.delete(`${BUDGETS_BASE_PATH}/${id}`)
  },

  // Activate budget
  activateBudget: async (id: string): Promise<BudgetResponse> => {
    return apiClient.post(`${BUDGETS_BASE_PATH}/${id}/activate`)
  },

  // Close budget
  closeBudget: async (id: string): Promise<BudgetResponse> => {
    return apiClient.post(`${BUDGETS_BASE_PATH}/${id}/close`)
  },

  // Archive budget
  archiveBudget: async (id: string): Promise<BudgetResponse> => {
    return apiClient.post(`${BUDGETS_BASE_PATH}/${id}/archive`)
  },

  // Validate budget
  validateBudget: async (id: string): Promise<BudgetValidationResult> => {
    return apiClient.post(`${BUDGETS_BASE_PATH}/${id}/validate`)
  },

  // Copy budget
  copyBudget: async (id: string, newFiscalYear: number): Promise<BudgetResponse> => {
    return apiClient.post(`${BUDGETS_BASE_PATH}/${id}/copy`, { newFiscalYear })
  },

  // Get budget statistics
  getBudgetStats: async (filters?: BudgetFilters): Promise<BudgetStatsResponse> => {
    const params = new URLSearchParams()
    if (filters?.fiscalYear) params.append('fiscalYear', filters.fiscalYear.toString())
    if (filters?.startDate) params.append('startDate', filters.startDate)
    if (filters?.endDate) params.append('endDate', filters.endDate)

    return apiClient.get(`${BUDGETS_BASE_PATH}/stats?${params}`)
  },

  // Get budget comparison
  getBudgetComparison: async (budgetIds: string[]): Promise<BudgetComparisonResponse> => {
    const params = new URLSearchParams()
    budgetIds.forEach((id) => params.append('budgetIds', id))
    return apiClient.get(`${BUDGETS_BASE_PATH}/comparison?${params}`)
  },
}

// Budget Lines API Services
const budgetLinesApi = {
  // Get budget lines for a specific budget
  getBudgetLines: async (
    budgetId: string,
    page = 1,
    pageSize = 20,
    filters?: BudgetLineFilters,
  ): Promise<BudgetLinesResponse> => {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      ...(filters?.accountId && { accountId: filters.accountId }),
      ...(filters?.lineType && { lineType: filters.lineType }),
      ...(filters?.period && { period: filters.period }),
    })
    return apiClient.get(`${BUDGET_LINES_BASE_PATH}/budget/${budgetId}?${params}`)
  },

  // Get budget line by ID
  getBudgetLine: async (id: string): Promise<{ data: BudgetLine }> => {
    return apiClient.get(`${BUDGET_LINES_BASE_PATH}/${id}`)
  },

  // Create new budget line
  createBudgetLine: async (
    budgetId: string,
    data: BudgetLineFormData,
  ): Promise<{ data: BudgetLine }> => {
    return apiClient.post(`${BUDGET_LINES_BASE_PATH}/budget/${budgetId}`, data)
  },

  // Update budget line
  updateBudgetLine: async (id: string, data: BudgetLineFormData): Promise<{ data: BudgetLine }> => {
    return apiClient.put(`${BUDGET_LINES_BASE_PATH}/${id}`, data)
  },

  // Delete budget line
  deleteBudgetLine: async (id: string): Promise<void> => {
    return apiClient.delete(`${BUDGET_LINES_BASE_PATH}/${id}`)
  },

  // Bulk create budget lines
  bulkCreateBudgetLines: async (
    budgetId: string,
    lines: BudgetLineFormData[],
  ): Promise<{ data: BudgetLine[] }> => {
    return apiClient.post(`${BUDGET_LINES_BASE_PATH}/budget/${budgetId}/bulk`, { lines })
  },

  // Bulk update budget lines
  bulkUpdateBudgetLines: async (
    lines: Array<{ id: string; data: BudgetLineFormData }>,
  ): Promise<{ data: BudgetLine[] }> => {
    return apiClient.put(`${BUDGET_LINES_BASE_PATH}/bulk`, { lines })
  },

  // Validate budget line
  validateBudgetLine: async (id: string): Promise<BudgetLineValidationResult> => {
    return apiClient.post(`${BUDGET_LINES_BASE_PATH}/${id}/validate`)
  },

  // Import budget lines from Excel/CSV
  importBudgetLines: async (budgetId: string, file: File): Promise<{ data: BudgetLine[] }> => {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post(`${BUDGET_LINES_BASE_PATH}/budget/${budgetId}/import`, formData)
  },

  // Export budget lines to Excel/CSV
  exportBudgetLines: async (budgetId: string, format: 'excel' | 'csv' = 'excel'): Promise<Blob> => {
    return apiClient.download(
      `${BUDGET_LINES_BASE_PATH}/budget/${budgetId}/export?format=${format}`,
    )
  },
}

// Budget Templates API Services
const budgetTemplatesApi = {
  // Get all budget templates
  getBudgetTemplates: async (): Promise<BudgetTemplatesResponse> => {
    return apiClient.get(BUDGET_TEMPLATES_BASE_PATH)
  },

  // Get budget template by ID
  getBudgetTemplate: async (id: string): Promise<{ data: BudgetTemplate }> => {
    return apiClient.get(`${BUDGET_TEMPLATES_BASE_PATH}/${id}`)
  },

  // Create budget from template
  createBudgetFromTemplate: async (
    templateId: string,
    data: BudgetFormData,
  ): Promise<BudgetResponse> => {
    return apiClient.post(`${BUDGET_TEMPLATES_BASE_PATH}/${templateId}/create-budget`, data)
  },

  // Save as template
  saveAsTemplate: async (
    budgetId: string,
    templateName: string,
    description?: string,
  ): Promise<{ data: BudgetTemplate }> => {
    return apiClient.post(`${BUDGET_TEMPLATES_BASE_PATH}/save-as-template`, {
      budgetId,
      name: templateName,
      description,
    })
  },
}

// Budget Approvals API Services
const budgetApprovalsApi = {
  // Get budget approvals
  getBudgetApprovals: async (budgetId: string): Promise<BudgetApprovalsResponse> => {
    return apiClient.get(`${BUDGET_APPROVALS_BASE_PATH}/budget/${budgetId}`)
  },

  // Submit budget for approval
  submitForApproval: async (budgetId: string, approverIds: string[]): Promise<void> => {
    return apiClient.post(`${BUDGET_APPROVALS_BASE_PATH}/budget/${budgetId}/submit`, {
      approverIds,
    })
  },

  // Approve budget
  approveBudget: async (approvalId: string, comments?: string): Promise<void> => {
    return apiClient.post(`${BUDGET_APPROVALS_BASE_PATH}/${approvalId}/approve`, { comments })
  },

  // Reject budget
  rejectBudget: async (approvalId: string, comments: string): Promise<void> => {
    return apiClient.post(`${BUDGET_APPROVALS_BASE_PATH}/${approvalId}/reject`, { comments })
  },

  // Get pending approvals for user
  getPendingApprovals: async (): Promise<BudgetApprovalsResponse> => {
    return apiClient.get(`${BUDGET_APPROVALS_BASE_PATH}/pending`)
  },
}

// Budget Rollovers API Services
const budgetRolloversApi = {
  // Create budget rollover
  createRollover: async (
    sourceBudgetId: string,
    targetBudgetId: string,
    rolloverPercentage: number,
    notes?: string,
  ): Promise<{ data: BudgetRollover }> => {
    return apiClient.post(BUDGET_ROLLOVERS_BASE_PATH, {
      sourceBudgetId,
      targetBudgetId,
      rolloverPercentage,
      notes,
    })
  },

  // Get budget rollovers
  getBudgetRollovers: async (budgetId: string): Promise<{ data: BudgetRollover[] }> => {
    return apiClient.get(`${BUDGET_ROLLOVERS_BASE_PATH}/budget/${budgetId}`)
  },

  // Execute rollover
  executeRollover: async (rolloverId: string): Promise<void> => {
    return apiClient.post(`${BUDGET_ROLLOVERS_BASE_PATH}/${rolloverId}/execute`)
  },

  // Cancel rollover
  cancelRollover: async (rolloverId: string): Promise<void> => {
    return apiClient.post(`${BUDGET_ROLLOVERS_BASE_PATH}/${rolloverId}/cancel`)
  },
}

// Export all API services
export { budgetsApi, budgetLinesApi, budgetTemplatesApi, budgetApprovalsApi, budgetRolloversApi }
