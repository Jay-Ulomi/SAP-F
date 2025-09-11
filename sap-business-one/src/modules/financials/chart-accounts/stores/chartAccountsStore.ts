import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { chartAccountsApi } from '../api/chartAccountsApi'
import type { ChartAccount, ChartAccountFormData, ChartAccountFilters } from '../types'
import { AccountType } from '../types'

export const useChartAccountsStore = defineStore('chartAccounts', () => {
  // State
  const accounts = ref<ChartAccount[]>([])
  const currentAccount = ref<ChartAccount | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<ChartAccountFilters>({})
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })

  // Computed
  const activeAccounts = computed(() => accounts.value.filter((account) => account.isActive))
  const accountTypes = computed(() => Object.values(AccountType))

  const accountsByType = computed(() => {
    const grouped = accounts.value.reduce(
      (acc, account) => {
        if (!acc[account.accountType]) {
          acc[account.accountType] = []
        }
        acc[account.accountType].push(account)
        return acc
      },
      {} as Record<AccountType, ChartAccount[]>,
    )

    return grouped
  })

  // Actions
  const fetchAccounts = async (
    page?: number,
    pageSize?: number,
    newFilters?: ChartAccountFilters,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize
      if (newFilters) filters.value = { ...filters.value, ...newFilters }

      const response = await chartAccountsApi.getChartAccounts(
        pagination.value.page,
        pagination.value.pageSize,
        filters.value,
      )

      accounts.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch accounts'
      console.error('Error fetching accounts:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchAccount = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const account = await chartAccountsApi.getChartAccount(id)
      currentAccount.value = account
      return account
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch account'
      console.error('Error fetching account:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createAccount = async (data: ChartAccountFormData) => {
    try {
      loading.value = true
      error.value = null

      const newAccount = await chartAccountsApi.createChartAccount(data)
      accounts.value.unshift(newAccount)
      pagination.value.total += 1

      return newAccount
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create account'
      console.error('Error creating account:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateAccount = async (id: string, data: Partial<ChartAccountFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedAccount = await chartAccountsApi.updateChartAccount(id, data)

      // Update in accounts list
      const index = accounts.value.findIndex((acc) => acc.id === id)
      if (index !== -1) {
        accounts.value[index] = updatedAccount
      }

      // Update current account if it's the one being edited
      if (currentAccount.value?.id === id) {
        currentAccount.value = updatedAccount
      }

      return updatedAccount
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update account'
      console.error('Error updating account:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteAccount = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await chartAccountsApi.deleteChartAccount(id)

      // Remove from accounts list
      const index = accounts.value.findIndex((acc) => acc.id === id)
      if (index !== -1) {
        accounts.value.splice(index, 1)
        pagination.value.total -= 1
      }

      // Clear current account if it's the one being deleted
      if (currentAccount.value?.id === id) {
        currentAccount.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete account'
      console.error('Error deleting account:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentAccount = () => {
    currentAccount.value = null
  }

  const resetFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  return {
    // State
    accounts,
    currentAccount,
    loading,
    error,
    filters,
    pagination,

    // Computed
    activeAccounts,
    accountTypes,
    accountsByType,

    // Actions
    fetchAccounts,
    fetchAccount,
    createAccount,
    updateAccount,
    deleteAccount,
    clearError,
    resetCurrentAccount,
    resetFilters,
  }
})
