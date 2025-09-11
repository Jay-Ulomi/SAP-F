import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  ExpenseReport, 
  ExpenseReportFormData, 
  ExpenseSearchParams,
  ExpenseStats,
  ExpenseStatus,
  ExpenseType
} from '../types'
import { expenseAPI } from '../api'

export const useExpenseStore = defineStore('expense', () => {
  const expenses = ref<ExpenseReport[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ExpenseStats | null>(null)
  const currentExpense = ref<ExpenseReport | null>(null)

  // Actions
  async function fetchExpenses(params?: ExpenseSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await expenseAPI.getExpenseReports(params)
      expenses.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch expense reports'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchExpense(id: string): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const expense = await expenseAPI.getExpenseReport(id)
      currentExpense.value = expense
      
      // Update the expense in the list if it exists
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = expense
      }
      
      return expense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<ExpenseStats> {
    try {
      const expenseStats = await expenseAPI.getExpenseStats()
      stats.value = expenseStats
      return expenseStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function createExpense(data: ExpenseReportFormData): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const newExpense = await expenseAPI.createExpenseReport(data)
      expenses.value.unshift(newExpense)
      return newExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateExpense(id: string, data: Partial<ExpenseReportFormData>): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const updatedExpense = await expenseAPI.updateExpenseReport(id, data)
      
      // Update in the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      
      // Update current expense if it's the same
      if (currentExpense.value?.id === id) {
        currentExpense.value = updatedExpense
      }
      
      return updatedExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteExpense(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await expenseAPI.deleteExpenseReport(id)
      
      // Remove from the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value.splice(index, 1)
      }
      
      // Clear current expense if it's the deleted one
      if (currentExpense.value?.id === id) {
        currentExpense.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Expense-specific actions
  async function submitExpense(id: string): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const updatedExpense = await expenseAPI.submitExpenseReport(id)
      
      // Update in the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      
      // Update current expense if it's the same
      if (currentExpense.value?.id === id) {
        currentExpense.value = updatedExpense
      }
      
      return updatedExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to submit expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function approveExpense(id: string, approvedAmount?: number): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const updatedExpense = await expenseAPI.approveExpenseReport(id, approvedAmount)
      
      // Update in the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      
      // Update current expense if it's the same
      if (currentExpense.value?.id === id) {
        currentExpense.value = updatedExpense
      }
      
      return updatedExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function rejectExpense(id: string, reason: string): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const updatedExpense = await expenseAPI.rejectExpenseReport(id, reason)
      
      // Update in the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      
      // Update current expense if it's the same
      if (currentExpense.value?.id === id) {
        currentExpense.value = updatedExpense
      }
      
      return updatedExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject expense report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function markAsPaid(id: string): Promise<ExpenseReport> {
    loading.value = true
    error.value = null
    try {
      const updatedExpense = await expenseAPI.markAsPaid(id)
      
      // Update in the list
      const index = expenses.value.findIndex(e => e.id === id)
      if (index !== -1) {
        expenses.value[index] = updatedExpense
      }
      
      // Update current expense if it's the same
      if (currentExpense.value?.id === id) {
        currentExpense.value = updatedExpense
      }
      
      return updatedExpense
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to mark expense as paid'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function uploadReceipt(file: File): Promise<string> {
    try {
      const response = await expenseAPI.uploadReceipt(file)
      return response.url
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload receipt'
      throw err
    }
  }

  // Getters
  function getExpenseById(id: string): ExpenseReport | undefined {
    return expenses.value.find(e => e.id === id)
  }

  function getExpensesByStatus(status: ExpenseStatus): ExpenseReport[] {
    return expenses.value.filter(e => e.status === status)
  }

  function getExpensesByEmployee(employeeId: string): ExpenseReport[] {
    return expenses.value.filter(e => e.employeeId === employeeId)
  }

  function getDraftExpenses(): ExpenseReport[] {
    return expenses.value.filter(e => e.status === 'draft')
  }

  function getPendingExpenses(): ExpenseReport[] {
    return expenses.value.filter(e => e.status === 'submitted')
  }

  function getApprovedExpenses(): ExpenseReport[] {
    return expenses.value.filter(e => e.status === 'approved')
  }

  function getRejectedExpenses(): ExpenseReport[] {
    return expenses.value.filter(e => e.status === 'rejected')
  }

  function getTotalExpenseAmount(): number {
    return expenses.value.reduce((sum, e) => sum + e.totalAmount, 0)
  }

  function getAverageExpenseAmount(): number {
    if (expenses.value.length === 0) return 0
    return getTotalExpenseAmount() / expenses.value.length
  }

  function getExpensesByDateRange(dateFrom: string, dateTo: string): ExpenseReport[] {
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo)
    
    return expenses.value.filter(e => {
      const expenseDate = new Date(e.createdAt)
      return expenseDate >= fromDate && expenseDate <= toDate
    })
  }

  return {
    // State
    expenses,
    loading,
    error,
    stats,
    currentExpense,
    
    // Actions
    fetchExpenses,
    fetchExpense,
    fetchStats,
    createExpense,
    updateExpense,
    deleteExpense,
    submitExpense,
    approveExpense,
    rejectExpense,
    markAsPaid,
    uploadReceipt,
    
    // Getters
    getExpenseById,
    getExpensesByStatus,
    getExpensesByEmployee,
    getDraftExpenses,
    getPendingExpenses,
    getApprovedExpenses,
    getRejectedExpenses,
    getTotalExpenseAmount,
    getAverageExpenseAmount,
    getExpensesByDateRange,
  }
})