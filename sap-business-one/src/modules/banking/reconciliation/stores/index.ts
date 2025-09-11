import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Reconciliation,
  ReconciliationFormData,
  ReconciliationFilters,
  ReconciliationPagination,
  ReconciliationStats,
  BankAccount,
  BankTransaction,
  BookTransaction,
  MatchedTransaction,
  TransactionFilters,
} from '../types'
import {
  getReconciliations,
  getReconciliationById,
  createReconciliation,
  updateReconciliation,
  deleteReconciliation,
  getReconciliationStats,
  startReconciliation,
  completeReconciliation,
  approveReconciliation,
  matchTransactions,
  unmatchTransactions,
  getBankAccounts,
  getBankTransactions,
  getBookTransactions,
} from '../api'

export const useReconciliationStore = defineStore('reconciliation', () => {
  // State
  const reconciliations = ref<Reconciliation[]>([])
  const currentReconciliation = ref<Reconciliation | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ReconciliationStats | null>(null)
  const pagination = ref<ReconciliationPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ReconciliationFilters>({})

  // Supporting data
  const bankAccounts = ref<BankAccount[]>([])
  const bankTransactions = ref<BankTransaction[]>([])
  const bookTransactions = ref<BookTransaction[]>([])
  const matchedTransactions = ref<MatchedTransaction[]>([])

  // Computed
  const totalReconciliations = computed(() => reconciliations.value.length)
  const completedReconciliations = computed(
    () => reconciliations.value.filter((r) => r.status === 'COMPLETED').length,
  )
  const pendingReconciliations = computed(
    () => reconciliations.value.filter((r) => r.status === 'IN_PROGRESS').length,
  )
  const reconciliationsWithDiscrepancies = computed(
    () => reconciliations.value.filter((r) => r.discrepancies.length > 0).length,
  )

  // Actions
  const loadReconciliations = async (
    newFilters?: ReconciliationFilters,
    newPagination?: Partial<ReconciliationPagination>,
  ) => {
    loading.value = true
    error.value = null
    try {
      const result = await getReconciliations(
        newFilters || filters.value,
        newPagination || pagination.value,
      )
      reconciliations.value = result.reconciliations
      pagination.value = result.pagination
      if (newFilters) {
        filters.value = newFilters
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reconciliations'
      console.error('Error loading reconciliations:', err)
    } finally {
      loading.value = false
    }
  }

  const loadReconciliationById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const reconciliation = await getReconciliationById(id)
      currentReconciliation.value = reconciliation
      return reconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load reconciliation'
      console.error('Error loading reconciliation:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createNewReconciliation = async (data: ReconciliationFormData) => {
    loading.value = true
    error.value = null
    try {
      const newReconciliation = await createReconciliation(data)
      reconciliations.value.unshift(newReconciliation)
      return newReconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create reconciliation'
      console.error('Error creating reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingReconciliation = async (
    id: string,
    data: Partial<ReconciliationFormData>,
  ) => {
    loading.value = true
    error.value = null
    try {
      const updatedReconciliation = await updateReconciliation(id, data)
      const index = reconciliations.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reconciliations.value[index] = updatedReconciliation
      }
      if (currentReconciliation.value?.id === id) {
        currentReconciliation.value = updatedReconciliation
      }
      return updatedReconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update reconciliation'
      console.error('Error updating reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingReconciliation = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteReconciliation(id)
      reconciliations.value = reconciliations.value.filter((r) => r.id !== id)
      if (currentReconciliation.value?.id === id) {
        currentReconciliation.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete reconciliation'
      console.error('Error deleting reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    loading.value = true
    error.value = null
    try {
      const statsData = await getReconciliationStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load stats'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  const startExistingReconciliation = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedReconciliation = await startReconciliation(id)
      const index = reconciliations.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reconciliations.value[index] = updatedReconciliation
      }
      if (currentReconciliation.value?.id === id) {
        currentReconciliation.value = updatedReconciliation
      }
      return updatedReconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start reconciliation'
      console.error('Error starting reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeExistingReconciliation = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedReconciliation = await completeReconciliation(id)
      const index = reconciliations.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reconciliations.value[index] = updatedReconciliation
      }
      if (currentReconciliation.value?.id === id) {
        currentReconciliation.value = updatedReconciliation
      }
      return updatedReconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete reconciliation'
      console.error('Error completing reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveExistingReconciliation = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedReconciliation = await approveReconciliation(id)
      const index = reconciliations.value.findIndex((r) => r.id === id)
      if (index !== -1) {
        reconciliations.value[index] = updatedReconciliation
      }
      if (currentReconciliation.value?.id === id) {
        currentReconciliation.value = updatedReconciliation
      }
      return updatedReconciliation
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve reconciliation'
      console.error('Error approving reconciliation:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const matchExistingTransactions = async (
    bankTransactionId: string,
    bookTransactionId: string,
  ) => {
    loading.value = true
    error.value = null
    try {
      const matchedTransaction = await matchTransactions(bankTransactionId, bookTransactionId)
      matchedTransactions.value.push(matchedTransaction)
      return matchedTransaction
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to match transactions'
      console.error('Error matching transactions:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const unmatchExistingTransactions = async (
    bankTransactionId: string,
    bookTransactionId: string,
  ) => {
    loading.value = true
    error.value = null
    try {
      await unmatchTransactions(bankTransactionId, bookTransactionId)
      matchedTransactions.value = matchedTransactions.value.filter(
        (mt) =>
          mt.bankTransactionId !== bankTransactionId || mt.bookTransactionId !== bookTransactionId,
      )
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to unmatch transactions'
      console.error('Error unmatching transactions:', err)
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

  const loadBankTransactions = async (bankAccountId: string, filters?: TransactionFilters) => {
    try {
      const transactions = await getBankTransactions(bankAccountId, filters)
      bankTransactions.value = transactions
    } catch (err) {
      console.error('Error loading bank transactions:', err)
    }
  }

  const loadBookTransactions = async (bankAccountId: string, filters?: TransactionFilters) => {
    try {
      const transactions = await getBookTransactions(bankAccountId, filters)
      bookTransactions.value = transactions
    } catch (err) {
      console.error('Error loading book transactions:', err)
    }
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentReconciliation = () => {
    currentReconciliation.value = null
  }

  const setFilters = (newFilters: ReconciliationFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setPagination = (newPagination: Partial<ReconciliationPagination>) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  return {
    // State
    reconciliations,
    currentReconciliation,
    loading,
    error,
    stats,
    pagination,
    filters,
    bankAccounts,
    bankTransactions,
    bookTransactions,
    matchedTransactions,

    // Computed
    totalReconciliations,
    completedReconciliations,
    pendingReconciliations,
    reconciliationsWithDiscrepancies,

    // Actions
    loadReconciliations,
    loadReconciliationById,
    createReconciliation: createNewReconciliation,
    updateReconciliation: updateExistingReconciliation,
    deleteReconciliation: deleteExistingReconciliation,
    loadStats,
    startReconciliation: startExistingReconciliation,
    completeReconciliation: completeExistingReconciliation,
    approveReconciliation: approveExistingReconciliation,
    matchTransactions: matchExistingTransactions,
    unmatchTransactions: unmatchExistingTransactions,
    loadBankAccounts,
    loadBankTransactions,
    loadBookTransactions,
    clearError,
    clearCurrentReconciliation,
    setFilters,
    clearFilters,
    setPagination,
  }
})
