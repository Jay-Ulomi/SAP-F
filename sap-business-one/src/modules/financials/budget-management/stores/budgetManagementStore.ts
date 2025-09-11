import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  budgetsApi,
  budgetLinesApi,
  budgetTemplatesApi,
  budgetApprovalsApi,
  budgetRolloversApi,
} from '../api/budgetManagementApi'
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
  BudgetType,
  BudgetStatus,
  BudgetPeriod,
  BudgetLineType,
} from '../types'

export const useBudgetManagementStore = defineStore('budgetManagement', () => {
  // State
  const budgets = ref<Budget[]>([])
  const budgetLines = ref<BudgetLine[]>([])
  const budgetTemplates = ref<BudgetTemplate[]>([])
  const budgetApprovals = ref<BudgetApproval[]>([])
  const budgetRollovers = ref<BudgetRollover[]>([])

  // Current selections
  const currentBudget = ref<Budget | null>(null)
  const currentBudgetLine = ref<BudgetLine | null>(null)
  const currentTemplate = ref<BudgetTemplate | null>(null)

  // Loading and error states
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<BudgetFilters>({})
  const lineFilters = ref<BudgetLineFilters>({})

  // Statistics
  const stats = ref<BudgetStats>({
    totalBudgets: 0,
    activeBudgets: 0,
    draftBudgets: 0,
    closedBudgets: 0,
    totalBudgetAmount: 0,
    totalActualAmount: 0,
    totalVariance: 0,
    averageVariancePercentage: 0,
    budgetsByType: {} as Record<BudgetType, number>,
    budgetsByStatus: {} as Record<BudgetStatus, number>,
    topVarianceBudgets: [],
  })

  // Computed Properties
  const activeBudgets = computed(() =>
    budgets.value.filter((budget) => budget.status === BudgetStatus.ACTIVE),
  )

  const draftBudgets = computed(() =>
    budgets.value.filter((budget) => budget.status === BudgetStatus.DRAFT),
  )

  const closedBudgets = computed(() =>
    budgets.value.filter((budget) => budget.status === BudgetStatus.CLOSED),
  )

  const archivedBudgets = computed(() =>
    budgets.value.filter((budget) => budget.status === BudgetStatus.ARCHIVED),
  )

  const budgetsByType = computed(() => {
    const grouped = budgets.value.reduce(
      (acc, budget) => {
        if (!acc[budget.type]) {
          acc[budget.type] = []
        }
        acc[budget.type].push(budget)
        return acc
      },
      {} as Record<BudgetType, Budget[]>,
    )
    return grouped
  })

  const budgetsByStatus = computed(() => {
    const grouped = budgets.value.reduce(
      (acc, budget) => {
        if (!acc[budget.status]) {
          acc[budget.status] = []
        }
        acc[budget.status].push(budget)
        return acc
      },
      {} as Record<BudgetStatus, Budget[]>,
    )
    return grouped
  })

  const budgetsByFiscalYear = computed(() => {
    const grouped = budgets.value.reduce(
      (acc, budget) => {
        if (!acc[budget.fiscalYear]) {
          acc[budget.fiscalYear] = []
        }
        acc[budget.fiscalYear].push(budget)
        return acc
      },
      {} as Record<number, Budget[]>,
    )
    return grouped
  })

  const budgetLinesByPeriod = computed(() => {
    const grouped = budgetLines.value.reduce(
      (acc, line) => {
        if (!acc[line.period]) {
          acc[line.period] = []
        }
        acc[line.period].push(line)
        return acc
      },
      {} as Record<BudgetPeriod, BudgetLine[]>,
    )
    return grouped
  })

  const budgetLinesByType = computed(() => {
    const grouped = budgetLines.value.reduce(
      (acc, line) => {
        if (!acc[line.lineType]) {
          acc[line.lineType] = []
        }
        acc[line.lineType].push(line)
        return acc
      },
      {} as Record<BudgetLineType, BudgetLine[]>,
    )
    return grouped
  })

  const pendingApprovals = computed(() =>
    budgetApprovals.value.filter((approval) => approval.status === 'PENDING'),
  )

  const approvedBudgets = computed(() =>
    budgetApprovals.value.filter((approval) => approval.status === 'APPROVED'),
  )

  const rejectedBudgets = computed(() =>
    budgetApprovals.value.filter((approval) => approval.status === 'REJECTED'),
  )

  // Actions
  const fetchBudgets = async (page = 1, pageSize = 20, filters?: BudgetFilters) => {
    try {
      loading.value = true
      error.value = null

      if (filters) {
        store.filters = { ...store.filters, ...filters }
      }

      const response = await budgetsApi.getBudgets(page, pageSize, store.filters)
      budgets.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budgets'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.getBudget(id)
      currentBudget.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBudget = async (data: BudgetFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.createBudget(data)
      budgets.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBudget = async (id: string, data: BudgetFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.updateBudget(id, data)
      const index = budgets.value.findIndex((budget) => budget.id === id)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
      if (currentBudget.value?.id === id) {
        currentBudget.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetsApi.deleteBudget(id)
      budgets.value = budgets.value.filter((budget) => budget.id !== id)
      if (currentBudget.value?.id === id) {
        currentBudget.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const activateBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.activateBudget(id)
      const index = budgets.value.findIndex((budget) => budget.id === id)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
      if (currentBudget.value?.id === id) {
        currentBudget.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to activate budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const closeBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.closeBudget(id)
      const index = budgets.value.findIndex((budget) => budget.id === id)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
      if (currentBudget.value?.id === id) {
        currentBudget.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to close budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const archiveBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.archiveBudget(id)
      const index = budgets.value.findIndex((budget) => budget.id === id)
      if (index !== -1) {
        budgets.value[index] = response.data
      }
      if (currentBudget.value?.id === id) {
        currentBudget.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to archive budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const validateBudget = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.validateBudget(id)
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyBudget = async (id: string, newFiscalYear: number) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.copyBudget(id, newFiscalYear)
      budgets.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetLines = async (
    budgetId: string,
    page = 1,
    pageSize = 20,
    filters?: BudgetLineFilters,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (filters) {
        store.lineFilters = { ...store.lineFilters, ...filters }
      }

      const response = await budgetLinesApi.getBudgetLines(
        budgetId,
        page,
        pageSize,
        store.lineFilters,
      )
      budgetLines.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget lines'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBudgetLine = async (budgetId: string, data: BudgetLineFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetLinesApi.createBudgetLine(budgetId, data)
      budgetLines.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create budget line'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateBudgetLine = async (id: string, data: BudgetLineFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetLinesApi.updateBudgetLine(id, data)
      const index = budgetLines.value.findIndex((line) => line.id === id)
      if (index !== -1) {
        budgetLines.value[index] = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update budget line'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteBudgetLine = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetLinesApi.deleteBudgetLine(id)
      budgetLines.value = budgetLines.value.filter((line) => line.id !== id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete budget line'
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkCreateBudgetLines = async (budgetId: string, lines: BudgetLineFormData[]) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetLinesApi.bulkCreateBudgetLines(budgetId, lines)
      budgetLines.value.push(...response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to bulk create budget lines'
      throw err
    } finally {
      loading.value = false
    }
  }

  const bulkUpdateBudgetLines = async (lines: Array<{ id: string; data: BudgetLineFormData }>) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetLinesApi.bulkUpdateBudgetLines(lines)
      response.data.forEach((updatedLine) => {
        const index = budgetLines.value.findIndex((line) => line.id === updatedLine.id)
        if (index !== -1) {
          budgetLines.value[index] = updatedLine
        }
      })
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to bulk update budget lines'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetStats = async (filters?: BudgetFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.getBudgetStats(filters)
      stats.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetComparison = async (budgetIds: string[]) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetsApi.getBudgetComparison(budgetIds)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget comparison'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetTemplates = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetTemplatesApi.getBudgetTemplates()
      budgetTemplates.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget templates'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createBudgetFromTemplate = async (templateId: string, data: BudgetFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetTemplatesApi.createBudgetFromTemplate(templateId, data)
      budgets.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create budget from template'
      throw err
    } finally {
      loading.value = false
    }
  }

  const saveAsTemplate = async (budgetId: string, templateName: string, description?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetTemplatesApi.saveAsTemplate(budgetId, templateName, description)
      budgetTemplates.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to save budget as template'
      throw err
    } finally {
      loading.value = false
    }
  }

  const submitForApproval = async (budgetId: string, approverIds: string[]) => {
    try {
      loading.value = true
      error.value = null

      await budgetApprovalsApi.submitForApproval(budgetId, approverIds)
      // Refresh budget to update status
      await fetchBudget(budgetId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit budget for approval'
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveBudget = async (approvalId: string, comments?: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetApprovalsApi.approveBudget(approvalId, comments)
      // Refresh approvals
      if (currentBudget.value) {
        await fetchBudgetApprovals(currentBudget.value.id)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectBudget = async (approvalId: string, comments: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetApprovalsApi.rejectBudget(approvalId, comments)
      // Refresh approvals
      if (currentBudget.value) {
        await fetchBudgetApprovals(currentBudget.value.id)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject budget'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchBudgetApprovals = async (budgetId: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetApprovalsApi.getBudgetApprovals(budgetId)
      budgetApprovals.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch budget approvals'
      throw err
    } finally {
      loading.value = false
    }
  }

  const fetchPendingApprovals = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetApprovalsApi.getPendingApprovals()
      budgetApprovals.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch pending approvals'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createRollover = async (
    sourceBudgetId: string,
    targetBudgetId: string,
    rolloverPercentage: number,
    notes?: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await budgetRolloversApi.createRollover(
        sourceBudgetId,
        targetBudgetId,
        rolloverPercentage,
        notes,
      )
      budgetRollovers.value.push(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create budget rollover'
      throw err
    } finally {
      loading.value = false
    }
  }

  const executeRollover = async (rolloverId: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetRolloversApi.executeRollover(rolloverId)
      // Refresh budgets after rollover
      await fetchBudgets()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to execute budget rollover'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelRollover = async (rolloverId: string) => {
    try {
      loading.value = true
      error.value = null

      await budgetRolloversApi.cancelRollover(rolloverId)
      budgetRollovers.value = budgetRollovers.value.filter((rollover) => rollover.id !== rolloverId)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel budget rollover'
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetFilters = () => {
    filters.value = {}
    lineFilters.value = {}
  }

  const reset = () => {
    budgets.value = []
    budgetLines.value = []
    budgetTemplates.value = []
    budgetApprovals.value = []
    budgetRollovers.value = []
    currentBudget.value = null
    currentBudgetLine.value = null
    currentTemplate.value = null
    loading.value = false
    error.value = null
    pagination.value = {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
    }
    resetFilters()
  }

  return {
    // State
    budgets,
    budgetLines,
    budgetTemplates,
    budgetApprovals,
    budgetRollovers,
    currentBudget,
    currentBudgetLine,
    currentTemplate,
    loading,
    error,
    pagination,
    filters,
    lineFilters,
    stats,

    // Computed
    activeBudgets,
    draftBudgets,
    closedBudgets,
    archivedBudgets,
    budgetsByType,
    budgetsByStatus,
    budgetsByFiscalYear,
    budgetLinesByPeriod,
    budgetLinesByType,
    pendingApprovals,
    approvedBudgets,
    rejectedBudgets,

    // Actions
    fetchBudgets,
    fetchBudget,
    createBudget,
    updateBudget,
    deleteBudget,
    activateBudget,
    closeBudget,
    archiveBudget,
    validateBudget,
    copyBudget,
    fetchBudgetLines,
    createBudgetLine,
    updateBudgetLine,
    deleteBudgetLine,
    bulkCreateBudgetLines,
    bulkUpdateBudgetLines,
    fetchBudgetStats,
    fetchBudgetComparison,
    fetchBudgetTemplates,
    createBudgetFromTemplate,
    saveAsTemplate,
    submitForApproval,
    approveBudget,
    rejectBudget,
    fetchBudgetApprovals,
    fetchPendingApprovals,
    createRollover,
    executeRollover,
    cancelRollover,
    clearError,
    resetFilters,
    reset,
  }
})
