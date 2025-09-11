import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { paymentApi } from '../api'
import type {
  Payment,
  PaymentFormData,
  PaymentFilters,
  PaymentStats,
  PaymentPagination,
} from '../types'
import { PaymentStatus, PaymentMethod, PaymentType, Currency } from '../types'

export const usePaymentStore = defineStore('payments', () => {
  // State
  const payments = ref<Payment[]>([])
  const currentPayment = ref<Payment | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PaymentStats | null>(null)

  // Pagination
  const pagination = ref<PaymentPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<PaymentFilters>({})

  // Computed Properties
  const paymentsByStatus = computed(() => {
    const grouped: Record<PaymentStatus, Payment[]> = {
      [PaymentStatus.PENDING]: [],
      [PaymentStatus.APPROVED]: [],
      [PaymentStatus.PROCESSED]: [],
      [PaymentStatus.COMPLETED]: [],
      [PaymentStatus.FAILED]: [],
      [PaymentStatus.CANCELLED]: [],
      [PaymentStatus.ON_HOLD]: [],
    }

    payments.value.forEach((payment) => {
      grouped[payment.status].push(payment)
    })

    return grouped
  })

  const paymentsByMethod = computed(() => {
    const grouped: Record<PaymentMethod, Payment[]> = {
      [PaymentMethod.BANK_TRANSFER]: [],
      [PaymentMethod.CHECK]: [],
      [PaymentMethod.CASH]: [],
      [PaymentMethod.CREDIT_CARD]: [],
      [PaymentMethod.WIRE_TRANSFER]: [],
      [PaymentMethod.ACH]: [],
      [PaymentMethod.OTHER]: [],
    }

    payments.value.forEach((payment) => {
      grouped[payment.paymentMethod].push(payment)
    })

    return grouped
  })

  const paymentsByType = computed(() => {
    const grouped: Record<PaymentType, Payment[]> = {
      [PaymentType.INVOICE_PAYMENT]: [],
      [PaymentType.CREDIT_MEMO_APPLICATION]: [],
      [PaymentType.ADVANCE_PAYMENT]: [],
      [PaymentType.REFUND]: [],
      [PaymentType.ADJUSTMENT]: [],
    }

    payments.value.forEach((payment) => {
      grouped[payment.paymentType].push(payment)
    })

    return grouped
  })

  const pendingPayments = computed(() =>
    payments.value.filter((payment) => payment.status === PaymentStatus.PENDING),
  )

  const approvedPayments = computed(() =>
    payments.value.filter((payment) => payment.status === PaymentStatus.APPROVED),
  )

  const processedPayments = computed(() =>
    payments.value.filter((payment) => payment.status === PaymentStatus.PROCESSED),
  )

  const completedPayments = computed(() =>
    payments.value.filter((payment) => payment.status === PaymentStatus.COMPLETED),
  )

  const totalAmount = computed(() =>
    payments.value.reduce((sum, payment) => sum + payment.amount, 0),
  )

  const averagePaymentAmount = computed(() => {
    if (payments.value.length === 0) return 0
    return totalAmount.value / payments.value.length
  })

  const paymentsThisMonth = computed(() => {
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    return payments.value.filter((payment) => new Date(payment.paymentDate) >= thisMonth).length
  })

  // Actions
  const loadPayments = async (
    newFilters?: PaymentFilters,
    newPagination?: Partial<PaymentPagination>,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      if (newPagination) {
        pagination.value = { ...pagination.value, ...newPagination }
      }

      const result = await paymentApi.getPayments(filters.value, pagination.value)
      payments.value = result.payments
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payments'
      console.error('Failed to load payments:', err)
    } finally {
      loading.value = false
    }
  }

  const loadPayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.getPayment(id)
      if (payment) {
        currentPayment.value = payment
        return payment
      } else {
        error.value = 'Payment not found'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment'
      console.error('Failed to load payment:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const createPayment = async (paymentData: PaymentFormData) => {
    try {
      loading.value = true
      error.value = null

      const newPayment = await paymentApi.createPayment(paymentData)
      payments.value.unshift(newPayment)
      pagination.value.total += 1

      return newPayment
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create payment'
      console.error('Failed to create payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePayment = async (id: string, paymentData: Partial<PaymentFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedPayment = await paymentApi.updatePayment(id, paymentData)
      if (updatedPayment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = updatedPayment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = updatedPayment
        }

        return updatedPayment
      } else {
        error.value = 'Failed to update payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update payment'
      console.error('Failed to update payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const success = await paymentApi.deletePayment(id)
      if (success) {
        payments.value = payments.value.filter((p) => p.id !== id)
        pagination.value.total -= 1

        if (currentPayment.value?.id === id) {
          currentPayment.value = null
        }

        return true
      } else {
        error.value = 'Failed to delete payment'
        return false
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete payment'
      console.error('Failed to delete payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Business Logic Actions
  const approvePayment = async (id: string, approvalNotes?: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.approvePayment(id, approvalNotes)
      if (payment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = payment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = payment
        }

        return payment
      } else {
        error.value = 'Failed to approve payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve payment'
      console.error('Failed to approve payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const processPayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.processPayment(id)
      if (payment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = payment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = payment
        }

        return payment
      } else {
        error.value = 'Failed to process payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to process payment'
      console.error('Failed to process payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completePayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.completePayment(id)
      if (payment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = payment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = payment
        }

        return payment
      } else {
        error.value = 'Failed to complete payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete payment'
      console.error('Failed to complete payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelPayment = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.cancelPayment(id, reason)
      if (payment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = payment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = payment
        }

        return payment
      } else {
        error.value = 'Failed to cancel payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel payment'
      console.error('Failed to cancel payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const holdPayment = async (id: string, reason?: string) => {
    try {
      loading.value = true
      error.value = null

      const payment = await paymentApi.holdPayment(id, reason)
      if (payment) {
        const index = payments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          payments.value[index] = payment
        }

        if (currentPayment.value?.id === id) {
          currentPayment.value = payment
        }

        return payment
      } else {
        error.value = 'Failed to hold payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to hold payment'
      console.error('Failed to hold payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Utility Actions
  const copyPayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedPayment = await paymentApi.copyPayment(id)
      if (copiedPayment) {
        payments.value.unshift(copiedPayment)
        pagination.value.total += 1
        return copiedPayment
      } else {
        error.value = 'Failed to copy payment'
        return null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy payment'
      console.error('Failed to copy payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Statistics Actions
  const loadPaymentStats = async () => {
    try {
      loading.value = true
      error.value = null

      const paymentStats = await paymentApi.getPaymentStats()
      stats.value = paymentStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment stats'
      console.error('Failed to load payment stats:', err)
    } finally {
      loading.value = false
    }
  }

  // Validation Actions
  const validatePayment = async (paymentData: PaymentFormData) => {
    try {
      const result = await paymentApi.validatePayment(paymentData)
      return result
    } catch (err) {
      console.error('Failed to validate payment:', err)
      return { isValid: false, errors: ['Validation failed'] }
    }
  }

  // Filter Management
  const updateFilters = (newFilters: Partial<PaymentFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  // Pagination Controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadPayments()
    }
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      goToPage(pagination.value.page + 1)
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      goToPage(pagination.value.page - 1)
    }
  }

  const setPageSize = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    loadPayments()
  }

  // State Clearing
  const clearCurrentPayment = () => {
    currentPayment.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const resetStore = () => {
    payments.value = []
    currentPayment.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    }
    filters.value = {}
  }

  return {
    // State
    payments,
    currentPayment,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed Properties
    paymentsByStatus,
    paymentsByMethod,
    paymentsByType,
    pendingPayments,
    approvedPayments,
    processedPayments,
    completedPayments,
    totalAmount,
    averagePaymentAmount,
    paymentsThisMonth,

    // Actions
    loadPayments,
    loadPayment,
    createPayment,
    updatePayment,
    deletePayment,

    // Business Logic Actions
    approvePayment,
    processPayment,
    completePayment,
    cancelPayment,
    holdPayment,

    // Utility Actions
    copyPayment,

    // Statistics Actions
    loadPaymentStats,

    // Validation Actions
    validatePayment,

    // Filter Management
    updateFilters,
    clearFilters,

    // Pagination Controls
    goToPage,
    nextPage,
    previousPage,
    setPageSize,

    // State Management
    clearCurrentPayment,
    clearError,
    resetStore,
  }
})
