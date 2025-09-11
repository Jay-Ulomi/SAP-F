import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  BankStatement,
  StatementFormData,
  StatementFilters,
  StatementPagination,
  StatementStats,
  BankAccount,
  StatementTransaction,
  TransactionFilters,
  TransactionStats,
} from '../types'
import {
  getStatements,
  getStatementById,
  createStatement,
  updateStatement,
  deleteStatement,
  getStatementStats,
  processStatement,
  completeStatement,
  reconcileStatement,
  uploadStatement,
  getBankAccounts,
  getStatementTransactions,
  getTransactionStats,
} from '../api'

export const useStatementsStore = defineStore('statements', () => {
  // State
  const statements = ref<BankStatement[]>([])
  const currentStatement = ref<BankStatement | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<StatementStats | null>(null)
  const pagination = ref<StatementPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<StatementFilters>({})

  // Supporting data
  const bankAccounts = ref<BankAccount[]>([])
  const statementTransactions = ref<StatementTransaction[]>([])
  const transactionStats = ref<TransactionStats | null>(null)

  // Computed
  const totalStatements = computed(() => statements.value.length)
  const totalTransactions = computed(() =>
    statements.value.reduce((sum, s) => sum + s.transactionCount, 0),
  )
  const totalDeposits = computed(() =>
    statements.value.reduce((sum, s) => sum + s.totalDeposits, 0),
  )
  const totalWithdrawals = computed(() =>
    statements.value.reduce((sum, s) => sum + s.totalWithdrawals, 0),
  )
  const pendingStatements = computed(
    () => statements.value.filter((s) => s.status === 'PENDING').length,
  )
  const completedStatements = computed(
    () => statements.value.filter((s) => s.status === 'COMPLETED').length,
  )

  // Actions
  const loadStatements = async (
    newFilters?: StatementFilters,
    newPagination?: Partial<StatementPagination>,
  ) => {
    loading.value = true
    error.value = null
    try {
      const result = await getStatements(
        newFilters || filters.value,
        newPagination || pagination.value,
      )
      statements.value = result.statements
      pagination.value = result.pagination
      if (newFilters) {
        filters.value = newFilters
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load statements'
      console.error('Error loading statements:', err)
    } finally {
      loading.value = false
    }
  }

  const loadStatementById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const statement = await getStatementById(id)
      currentStatement.value = statement
      return statement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load statement'
      console.error('Error loading statement:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createNewStatement = async (data: StatementFormData) => {
    loading.value = true
    error.value = null
    try {
      const newStatement = await createStatement(data)
      statements.value.unshift(newStatement)
      return newStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create statement'
      console.error('Error creating statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingStatement = async (id: string, data: Partial<StatementFormData>) => {
    loading.value = true
    error.value = null
    try {
      const updatedStatement = await updateStatement(id, data)
      const index = statements.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        statements.value[index] = updatedStatement
      }
      if (currentStatement.value?.id === id) {
        currentStatement.value = updatedStatement
      }
      return updatedStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update statement'
      console.error('Error updating statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingStatement = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteStatement(id)
      statements.value = statements.value.filter((s) => s.id !== id)
      if (currentStatement.value?.id === id) {
        currentStatement.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete statement'
      console.error('Error deleting statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    loading.value = true
    error.value = null
    try {
      const statsData = await getStatementStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load stats'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  const processExistingStatement = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedStatement = await processStatement(id)
      const index = statements.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        statements.value[index] = updatedStatement
      }
      if (currentStatement.value?.id === id) {
        currentStatement.value = updatedStatement
      }
      return updatedStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to process statement'
      console.error('Error processing statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeExistingStatement = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedStatement = await completeStatement(id)
      const index = statements.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        statements.value[index] = updatedStatement
      }
      if (currentStatement.value?.id === id) {
        currentStatement.value = updatedStatement
      }
      return updatedStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete statement'
      console.error('Error completing statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reconcileExistingStatement = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedStatement = await reconcileStatement(id)
      const index = statements.value.findIndex((s) => s.id === id)
      if (index !== -1) {
        statements.value[index] = updatedStatement
      }
      if (currentStatement.value?.id === id) {
        currentStatement.value = updatedStatement
      }
      return updatedStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reconcile statement'
      console.error('Error reconciling statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const uploadNewStatement = async (data: any) => {
    loading.value = true
    error.value = null
    try {
      const newStatement = await uploadStatement(data)
      statements.value.unshift(newStatement)
      return newStatement
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to upload statement'
      console.error('Error uploading statement:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Supporting data actions
  const loadBankAccounts = async () => {
    try {
      const accounts = await getBankAccounts()
      bankAccounts.value = accounts
    } catch (err) {
      console.error('Error loading bank accounts:', err)
    }
  }

  const loadStatementTransactions = async (statementId: string, filters?: TransactionFilters) => {
    try {
      const transactions = await getStatementTransactions(statementId, filters)
      statementTransactions.value = transactions
    } catch (err) {
      console.error('Error loading statement transactions:', err)
    }
  }

  const loadTransactionStats = async (statementId: string) => {
    try {
      const stats = await getTransactionStats(statementId)
      transactionStats.value = stats
    } catch (err) {
      console.error('Error loading transaction stats:', err)
    }
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentStatement = () => {
    currentStatement.value = null
  }

  const setFilters = (newFilters: StatementFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setPagination = (newPagination: Partial<StatementPagination>) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  return {
    // State
    statements,
    currentStatement,
    loading,
    error,
    stats,
    pagination,
    filters,
    bankAccounts,
    statementTransactions,
    transactionStats,

    // Computed
    totalStatements,
    totalTransactions,
    totalDeposits,
    totalWithdrawals,
    pendingStatements,
    completedStatements,

    // Actions
    loadStatements,
    loadStatementById,
    createStatement: createNewStatement,
    updateStatement: updateExistingStatement,
    deleteStatement: deleteExistingStatement,
    loadStats,
    processStatement: processExistingStatement,
    completeStatement: completeExistingStatement,
    reconcileStatement: reconcileExistingStatement,
    uploadStatement: uploadNewStatement,
    loadBankAccounts,
    loadStatementTransactions,
    loadTransactionStats,
    clearError,
    clearCurrentStatement,
    setFilters,
    clearFilters,
    setPagination,
  }
})
