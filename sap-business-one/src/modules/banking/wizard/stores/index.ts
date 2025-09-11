import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  PaymentWizard,
  PaymentWizardFormData,
  PaymentWizardFilters,
  PaymentWizardPagination,
  PaymentWizardStats,
  PaymentStep,
  PaymentWizardStep,
} from '../types'
import {
  getPaymentWizards,
  getPaymentWizardById,
  createPaymentWizard,
  updatePaymentWizard,
  deletePaymentWizard,
  getPaymentWizardStats,
  startPaymentWizard,
  completePaymentWizard,
  approvePaymentWizard,
  getPaymentSteps,
  getPaymentWizardSteps,
} from '../api'

export const usePaymentWizardStore = defineStore('paymentWizard', () => {
  // State
  const wizards = ref<PaymentWizard[]>([])
  const currentWizard = ref<PaymentWizard | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PaymentWizardStats | null>(null)
  const pagination = ref<PaymentWizardPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<PaymentWizardFilters>({})

  // Supporting data
  const paymentSteps = ref<PaymentStep[]>([])
  const wizardSteps = ref<PaymentWizardStep[]>([])

  // Computed
  const totalWizards = computed(() => wizards.value.length)
  const activeWizards = computed(
    () => wizards.value.filter((w) => w.status === 'IN_PROGRESS').length,
  )
  const completedWizards = computed(
    () => wizards.value.filter((w) => w.status === 'COMPLETED').length,
  )
  const pendingApprovalWizards = computed(
    () => wizards.value.filter((w) => w.status === 'PENDING_APPROVAL').length,
  )
  const totalAmount = computed(() => wizards.value.reduce((sum, w) => sum + w.totalAmount, 0))

  // Actions
  const loadWizards = async (
    newFilters?: PaymentWizardFilters,
    newPagination?: Partial<PaymentWizardPagination>,
  ) => {
    loading.value = true
    error.value = null
    try {
      const result = await getPaymentWizards(
        newFilters || filters.value,
        newPagination || pagination.value,
      )
      wizards.value = result.wizards
      pagination.value = result.pagination
      if (newFilters) {
        filters.value = newFilters
      }
      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment wizards'
      console.error('Error loading payment wizards:', err)
    } finally {
      loading.value = false
    }
  }

  const loadWizardById = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const wizard = await getPaymentWizardById(id)
      currentWizard.value = wizard
      return wizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment wizard'
      console.error('Error loading payment wizard:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createNewWizard = async (data: PaymentWizardFormData) => {
    loading.value = true
    error.value = null
    try {
      const newWizard = await createPaymentWizard(data)
      wizards.value.unshift(newWizard)
      return newWizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create payment wizard'
      console.error('Error creating payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateExistingWizard = async (id: string, data: Partial<PaymentWizardFormData>) => {
    loading.value = true
    error.value = null
    try {
      const updatedWizard = await updatePaymentWizard(id, data)
      const index = wizards.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        wizards.value[index] = updatedWizard
      }
      if (currentWizard.value?.id === id) {
        currentWizard.value = updatedWizard
      }
      return updatedWizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update payment wizard'
      console.error('Error updating payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteExistingWizard = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      await deletePaymentWizard(id)
      wizards.value = wizards.value.filter((w) => w.id !== id)
      if (currentWizard.value?.id === id) {
        currentWizard.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete payment wizard'
      console.error('Error deleting payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    loading.value = true
    error.value = null
    try {
      const statsData = await getPaymentWizardStats()
      stats.value = statsData
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load stats'
      console.error('Error loading stats:', err)
    } finally {
      loading.value = false
    }
  }

  const startWizard = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedWizard = await startPaymentWizard(id)
      const index = wizards.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        wizards.value[index] = updatedWizard
      }
      if (currentWizard.value?.id === id) {
        currentWizard.value = updatedWizard
      }
      return updatedWizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start payment wizard'
      console.error('Error starting payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeWizard = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedWizard = await completePaymentWizard(id)
      const index = wizards.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        wizards.value[index] = updatedWizard
      }
      if (currentWizard.value?.id === id) {
        currentWizard.value = updatedWizard
      }
      return updatedWizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete payment wizard'
      console.error('Error completing payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const approveWizard = async (id: string) => {
    loading.value = true
    error.value = null
    try {
      const updatedWizard = await approvePaymentWizard(id)
      const index = wizards.value.findIndex((w) => w.id === id)
      if (index !== -1) {
        wizards.value[index] = updatedWizard
      }
      if (currentWizard.value?.id === id) {
        currentWizard.value = updatedWizard
      }
      return updatedWizard
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve payment wizard'
      console.error('Error approving payment wizard:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Supporting data actions
  const loadPaymentSteps = async () => {
    try {
      const steps = await getPaymentSteps()
      paymentSteps.value = steps
    } catch (err) {
      console.error('Error loading payment steps:', err)
    }
  }

  const loadWizardSteps = async (wizardId: string) => {
    try {
      const steps = await getPaymentWizardSteps(wizardId)
      wizardSteps.value = steps
    } catch (err) {
      console.error('Error loading wizard steps:', err)
    }
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentWizard = () => {
    currentWizard.value = null
  }

  const setFilters = (newFilters: PaymentWizardFilters) => {
    filters.value = newFilters
  }

  const clearFilters = () => {
    filters.value = {}
  }

  const setPagination = (newPagination: Partial<PaymentWizardPagination>) => {
    pagination.value = { ...pagination.value, ...newPagination }
  }

  return {
    // State
    wizards,
    currentWizard,
    loading,
    error,
    stats,
    pagination,
    filters,
    paymentSteps,
    wizardSteps,

    // Computed
    totalWizards,
    activeWizards,
    completedWizards,
    pendingApprovalWizards,
    totalAmount,

    // Actions
    loadWizards,
    loadWizardById,
    createWizard: createNewWizard,
    updateWizard: updateExistingWizard,
    deleteWizard: deleteExistingWizard,
    loadStats,
    startWizard,
    completeWizard,
    approveWizard,
    loadPaymentSteps,
    loadWizardSteps,
    clearError,
    clearCurrentWizard,
    setFilters,
    clearFilters,
    setPagination,
  }
})
