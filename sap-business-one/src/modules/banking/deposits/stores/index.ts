import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Deposit,
  DepositFormData,
  DepositFilters,
  DepositPagination,
  DepositStats,
  BankAccount,
  Customer,
  Invoice,
} from '../types'
import {
  getDeposits,
  getDepositById,
  createDeposit,
  updateDeposit,
  deleteDeposit,
  getDepositStats,
  processDeposit,
  clearDeposit,
  reconcileDeposit,
  getBankAccounts,
  getCustomers,
  getInvoices,
} from '../api'

export const useDepositsStore = defineStore('deposits', () => {
  // State
  const deposits = ref<Deposit[]>([])
  const currentDeposit = ref<Deposit | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<DepositStats | null>(null)
  const pagination = ref<DepositPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<DepositFilters>({})

  // Supporting data
  const bankAccounts = ref<BankAccount[]>([])
  const customers = ref<Customer[]>([])
  const invoices = ref<Invoice[]>([])

  // Computed
  const totalDeposits = computed(() => deposits.value.length)
  const totalAmount = computed(() => deposits.value.reduce((sum, deposit) => sum + deposit.amount, 0))
  const pendingDeposits = computed(() => deposits.value.filter(d => d.status === 'PENDING').length)
  const completedDeposits = computed(() => deposits.value.filter(d => d.status === 'COMPLETED').length)
  const failedDeposits = computed(() => deposits.value.filter(d => d.status === 'FAILED').length)

  // Actions
  const loadDeposits = async (newFilters?: DepositFilters, newPagination?: Partial<DepositPagination>) => {
    loading.value = true
    error.value = null
    try {
      const result = await getDeposits(newFilters || filters.value, newPagination || pagination.value)
      deposits.value = result.deposits
      pagination.value = result.pagination
      if (newFilters) {
        filters.value = newFilters
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load deposits'
      console.error('Error loading deposits:', err)
    } finally {
      loading.value = false
    }
  }

  const loadDepositById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const deposit = await getDepositById(id)
      currentDeposit.value = deposit
      return deposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load deposit'
      console.error('Error loading deposit:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createNewDeposit = async (data: DepositFormData) => {
    loading.value = true
    error.value = null
    try {
      const newDeposit = await createDeposit(data)
      deposits.value.unshift(newDeposit)
      return newDeposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create deposit'
      console.error('Error creating deposit:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingDeposit = async (id: string, data: Partial<DepositFormData>) => {
    loading.value = true
    error.value = null
    try {
      const updatedDeposit = await updateDeposit(id, data)
      const index = deposits.value.findIndex(d => d.id === id)
      if (index !== -1) {
        deposits.value[index] = updatedDeposit
      }
      if (currentDeposit.value?.id === id) {
        currentDeposit.value = updatedDeposit
      }
      return updatedDeposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update deposit'
      console.error('Error updating deposit:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingDeposit = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteDeposit(id)
      deposits.value = deposits.value.filter(d => d.id !== id)
      if (currentDeposit.value?.id === id) {
        currentDeposit.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete deposit'
      console.error('Error deleting deposit:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    loading.value = true
    error.value = null
    try {
      const statsData = await getDepositStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load stats'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  const processExistingDeposit = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedDeposit = await processDeposit(id)
      const index = deposits.value.findIndex(d => d.id === id)
      if (index !== -1) {
        deposits.value[index] = updatedDeposit
      }
      if (currentDeposit.value?.id === id) {
        currentDeposit.value = updatedDeposit
      }
      return updatedDeposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to process deposit'
      console.error('Error processing deposit:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearExistingDeposit = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedDeposit = await clearDeposit(id)
      const index = deposits.value.findIndex(d => d.id === id)
      if (index !== -1) {
        deposits.value[index] = updatedDeposit
      }
      if (currentDeposit.value?.id === id) {
        currentDeposit.value = updatedDeposit
      }
      return updatedDeposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to clear deposit'
      console.error('Error clearing deposit:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reconcileExistingDeposit = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedDeposit = await reconcileDeposit(id)
      const index = deposits.value.findIndex(d => d.id === id)
      if (index !== -1) {
        deposits.value[index] = updatedDeposit
      }
      if (currentDeposit.value?.id === id) {
        currentDeposit.value = updatedDeposit
      }
      return updatedDeposit
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reconcile deposit'
      console.error('Error reconciling deposit:', err)
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

  const loadCustomers = async () => {
    try {
      const customersData = await getCustomers()
      customers.value = customersData
    } catch (err) {
      console.error('Error loading customers:', err)
    }
  }

  const loadInvoices = async (customerId?: string) => {
    try {
      const invoicesData = await getInvoices(customerId)
      invoices.value = invoicesData
    } catch (err) {
      console.error('Error loading invoices:', err)
    }
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentDeposit = () => {
    currentDeposit.value = null
  }

  const setFilters = (newFilters: DepositFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setPagination = (newPagination: Partial<DepositPagination>) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  return {
    // State
    deposits,
    currentDeposit,
    loading,
    error,
    stats,
    pagination,
    filters,
    bankAccounts,
    customers,
    invoices,

    // Computed
    totalDeposits,
    totalAmount,
    pendingDeposits,
    completedDeposits,
    failedDeposits,

    // Actions
    loadDeposits,
    loadDepositById,
    createDeposit: createNewDeposit,
    updateDeposit: updateExistingDeposit,
    deleteDeposit: deleteExistingDeposit,
    loadStats,
    processDeposit: processExistingDeposit,
    clearDeposit: clearExistingDeposit,
    reconcileDeposit: reconcileExistingDeposit,
    loadBankAccounts,
    loadCustomers,
    loadInvoices,
    clearError,
    clearCurrentDeposit,
    setFilters,
    clearFilters,
    setPagination,
  }
})
