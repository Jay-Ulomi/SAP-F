import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  Check,
  CheckFormData,
  CheckFilters,
  CheckPagination,
  CheckStats,
  BankAccount,
  Vendor,
  PurchaseOrder,
} from '../types'
import {
  getChecks,
  getCheckById,
  createCheck,
  updateCheck,
  deleteCheck,
  getCheckStats,
  approveCheck,
  printCheck,
  issueCheck,
  cashCheck,
  clearCheck,
  stopCheck,
  voidCheck,
  getBankAccounts,
  getVendors,
  getPurchaseOrders,
} from '../api'

export const useChecksStore = defineStore('checks', () => {
  // State
  const checks = ref<Check[]>([])
  const currentCheck = ref<Check | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<CheckStats | null>(null)
  const pagination = ref<CheckPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<CheckFilters>({})

  // Supporting data
  const bankAccounts = ref<BankAccount[]>([])
  const vendors = ref<Vendor[]>([])
  const purchaseOrders = ref<PurchaseOrder[]>([])

  // Computed
  const totalChecks = computed(() => checks.value.length)
  const totalAmount = computed(() => checks.value.reduce((sum, check) => sum + check.amount, 0))
  const pendingChecks = computed(() => checks.value.filter((c) => c.status === 'PENDING_APPROVAL').length)
  const approvedChecks = computed(() => checks.value.filter((c) => c.status === 'APPROVED').length)
  const issuedChecks = computed(() => checks.value.filter((c) => c.status === 'ISSUED').length)
  const clearedChecks = computed(() => checks.value.filter((c) => c.status === 'CLEARED').length)

  // Actions
  const loadChecks = async (newFilters?: CheckFilters, newPagination?: Partial<CheckPagination>) => {
    loading.value = true
    error.value = null
    try {
      const result = await getChecks(newFilters || filters.value, newPagination || pagination.value)
      checks.value = result.checks
      pagination.value = result.pagination
      if (newFilters) {
        filters.value = newFilters
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load checks'
      console.error('Error loading checks:', err)
    } finally {
      loading.value = false
    }
  }

  const loadCheckById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const check = await getCheckById(id)
      currentCheck.value = check
      return check
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load check'
      console.error('Error loading check:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createNewCheck = async (data: CheckFormData) => {
    loading.value = true
    error.value = null
    try {
      const newCheck = await createCheck(data)
      checks.value.unshift(newCheck)
      return newCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create check'
      console.error('Error creating check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingCheck = async (id: string, data: Partial<CheckFormData>) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await updateCheck(id, data)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update check'
      console.error('Error updating check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deleteCheck(id)
      checks.value = checks.value.filter((c) => c.id !== id)
      if (currentCheck.value?.id === id) {
        currentCheck.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete check'
      console.error('Error deleting check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    loading.value = true
    error.value = null
    try {
      const statsData = await getCheckStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load stats'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  const approveExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await approveCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve check'
      console.error('Error approving check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const printExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await printCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to print check'
      console.error('Error printing check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const issueExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await issueCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to issue check'
      console.error('Error issuing check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cashExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await cashCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cash check'
      console.error('Error cashing check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await clearCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to clear check'
      console.error('Error clearing check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const stopExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await stopCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to stop check'
      console.error('Error stopping check:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const voidExistingCheck = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedCheck = await voidCheck(id)
      const index = checks.value.findIndex((c) => c.id === id)
      if (index !== -1) {
        checks.value[index] = updatedCheck
      }
      if (currentCheck.value?.id === id) {
        currentCheck.value = updatedCheck
      }
      return updatedCheck
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to void check'
      console.error('Error voiding check:', err)
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

  const loadVendors = async () => {
    try {
      const vendorsData = await getVendors()
      vendors.value = vendorsData
    } catch (err) {
      console.error('Error loading vendors:', err)
    }
  }

  const loadPurchaseOrders = async (vendorId?: string) => {
    try {
      const purchaseOrdersData = await getPurchaseOrders(vendorId)
      purchaseOrders.value = purchaseOrdersData
    } catch (err) {
      console.error('Error loading purchase orders:', err)
    }
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentCheck = () => {
    currentCheck.value = null
  }

  const setFilters = (newFilters: CheckFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setPagination = (newPagination: Partial<CheckPagination>) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  return {
    // State
    checks,
    currentCheck,
    loading,
    error,
    stats,
    pagination,
    filters,
    bankAccounts,
    vendors,
    purchaseOrders,

    // Computed
    totalChecks,
    totalAmount,
    pendingChecks,
    approvedChecks,
    issuedChecks,
    clearedChecks,

    // Actions
    loadChecks,
    loadCheckById,
    createCheck: createNewCheck,
    updateCheck: updateExistingCheck,
    deleteCheck: deleteExistingCheck,
    loadStats,
    approveCheck: approveExistingCheck,
    printCheck: printExistingCheck,
    issueCheck: issueExistingCheck,
    cashCheck: cashExistingCheck,
    clearCheck: clearExistingCheck,
    stopCheck: stopExistingCheck,
    voidCheck: voidExistingCheck,
    loadBankAccounts,
    loadVendors,
    loadPurchaseOrders,
    clearError,
    clearCurrentCheck,
    setFilters,
    clearFilters,
    setPagination,
  }
})
