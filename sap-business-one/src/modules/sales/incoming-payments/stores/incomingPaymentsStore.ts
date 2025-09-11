import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {
  incomingPaymentsApi,
  customersApi,
  invoicesApi,
  salesOrdersApi,
  returnsApi,
} from '../api/incomingPaymentsApi'
import type {
  IncomingPayment,
  IncomingPaymentFormData,
  IncomingPaymentFilters,
  IncomingPaymentStatsResponse,
  Customer,
  PaymentStatus,
  PaymentMethod,
  PaymentType,
} from '../types'
import { PaymentStatus, PaymentMethod, PaymentType } from '../types'

export const useIncomingPaymentsStore = defineStore('incomingPayments', () => {
  // State
  const incomingPayments = ref<IncomingPayment[]>([])
  const customers = ref<Customer[]>([])
  const currentPayment = ref<IncomingPayment | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<IncomingPaymentStatsResponse['data'] | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
  })

  // Filters
  const filters = ref<IncomingPaymentFilters>({
    status: [],
    method: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  })

  // Computed Properties
  const paymentsByStatus = computed(() => {
    const grouped = incomingPayments.value.reduce(
      (acc, payment) => {
        const status = payment.status
        if (!acc[status]) acc[status] = []
        acc[status].push(payment)
        return acc
      },
      {} as Record<PaymentStatus, IncomingPayment[]>,
    )

    return grouped
  })

  const paymentsByMethod = computed(() => {
    const grouped = incomingPayments.value.reduce(
      (acc, payment) => {
        const method = payment.method
        if (!acc[method]) acc[method] = []
        acc[method].push(payment)
        return acc
      },
      {} as Record<PaymentMethod, IncomingPayment[]>,
    )

    return grouped
  })

  const paymentsByType = computed(() => {
    const grouped = incomingPayments.value.reduce(
      (acc, payment) => {
        const type = payment.type
        if (!acc[type]) acc[type] = []
        acc[type].push(payment)
        return acc
      },
      {} as Record<PaymentType, IncomingPayment[]>,
    )

    return grouped
  })

  const draftPayments = computed(() =>
    incomingPayments.value.filter((p) => p.status === PaymentStatus.DRAFT),
  )

  const openPayments = computed(() =>
    incomingPayments.value.filter((p) => p.status === PaymentStatus.OPEN),
  )

  const postedPayments = computed(() =>
    incomingPayments.value.filter((p) => p.status === PaymentStatus.POSTED),
  )

  const cancelledPayments = computed(() =>
    incomingPayments.value.filter((p) => p.status === PaymentStatus.CANCELLED),
  )

  const closedPayments = computed(() =>
    incomingPayments.value.filter((p) => p.status === PaymentStatus.CLOSED),
  )

  const totalAmount = computed(() =>
    incomingPayments.value.reduce((sum, p) => sum + p.totalAmount, 0),
  )

  const averageAmount = computed(() =>
    incomingPayments.value.length > 0 ? totalAmount.value / incomingPayments.value.length : 0,
  )

  const collectionRate = computed(() => {
    if (postedPayments.value.length === 0) return 0
    return (
      (postedPayments.value.length / (postedPayments.value.length + openPayments.value.length)) *
      100
    )
  })

  // Actions
  const fetchIncomingPayments = async (page = 1, limit = 20) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.list(filters.value, page, limit)

      if (response.success) {
        incomingPayments.value = response.data
        pagination.value = {
          page: response.page,
          limit: response.limit,
          total: response.total,
        }
      } else {
        error.value = response.message || 'Failed to fetch incoming payments'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchIncomingPayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.get(id)

      if (response.success) {
        currentPayment.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch incoming payment'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const createIncomingPayment = async (data: IncomingPaymentFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.create(data)

      if (response.success) {
        incomingPayments.value.unshift(response.data)
        currentPayment.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create incoming payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateIncomingPayment = async (id: string, data: Partial<IncomingPaymentFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.update(id, data)

      if (response.success) {
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to update incoming payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const deleteIncomingPayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.delete(id)

      if (response.success) {
        incomingPayments.value = incomingPayments.value.filter((p) => p.id !== id)
        if (currentPayment.value?.id === id) {
          currentPayment.value = null
        }
        return { success: true }
      } else {
        error.value = response.message || 'Failed to delete incoming payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.getStats()

      if (response.success) {
        stats.value = response.data
      } else {
        error.value = response.message || 'Failed to fetch stats'
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  const fetchCustomers = async (search?: string) => {
    try {
      const response = await customersApi.list(search)
      if (response.success) {
        customers.value = response.data
      }
    } catch (err) {
      console.error('Failed to fetch customers:', err)
    }
  }

  const fetchInvoices = async (search?: string) => {
    try {
      const response = await invoicesApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch invoices:', err)
      return []
    }
  }

  const fetchSalesOrders = async (search?: string) => {
    try {
      const response = await salesOrdersApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch sales orders:', err)
      return []
    }
  }

  const fetchReturns = async (search?: string) => {
    try {
      const response = await returnsApi.list(search)
      return response.success ? response.data : []
    } catch (err) {
      console.error('Failed to fetch returns:', err)
      return []
    }
  }

  const postPayment = async (id: string, postData: { postedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.postPayment(id, postData)

      if (response.success) {
        // Update the payment in the list
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to post payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const cancelPayment = async (
    id: string,
    cancellationData: { cancelledBy: string; reason: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.cancelPayment(id, cancellationData)

      if (response.success) {
        // Update the payment in the list
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to cancel payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const closePayment = async (id: string, closeData?: { closedBy: string; notes?: string }) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.closePayment(id, closeData)

      if (response.success) {
        // Update the payment in the list
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to close payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const copyPayment = async (
    id: string,
    copyData?: { newPaymentDate: string; newPostingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.copyPayment(id, copyData)

      if (response.success) {
        incomingPayments.value.unshift(response.data)
        currentPayment.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to copy payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const createFromInvoice = async (
    invoiceId: string,
    paymentData?: { paymentDate: string; postingDate: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.createFromInvoice(invoiceId, paymentData)

      if (response.success) {
        incomingPayments.value.unshift(response.data)
        currentPayment.value = response.data
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to create payment from invoice'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const processPayment = async (
    id: string,
    processData: { processedBy: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.processPayment(id, processData)

      if (response.success) {
        // Update the payment in the list
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to process payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const reconcilePayment = async (
    id: string,
    reconcileData: { reconciledBy: string; bankStatementId?: string; notes?: string },
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await incomingPaymentsApi.reconcilePayment(id, reconcileData)

      if (response.success) {
        // Update the payment in the list
        const index = incomingPayments.value.findIndex((p) => p.id === id)
        if (index !== -1) {
          incomingPayments.value[index] = response.data
        }
        if (currentPayment.value?.id === id) {
          currentPayment.value = response.data
        }
        return { success: true, data: response.data }
      } else {
        error.value = response.message || 'Failed to reconcile payment'
        return { success: false, message: response.message }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  const updateFilters = (newFilters: Partial<IncomingPaymentFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: [],
      method: [],
      type: [],
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      search: '',
    }
    pagination.value.page = 1
  }

  const clearError = () => {
    error.value = null
  }

  const clearCurrentPayment = () => {
    currentPayment.value = null
  }

  return {
    // State
    incomingPayments,
    customers,
    currentPayment,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    paymentsByStatus,
    paymentsByMethod,
    paymentsByType,
    draftPayments,
    openPayments,
    postedPayments,
    cancelledPayments,
    closedPayments,
    totalAmount,
    averageAmount,
    collectionRate,

    // Actions
    fetchIncomingPayments,
    fetchIncomingPayment,
    createIncomingPayment,
    updateIncomingPayment,
    deleteIncomingPayment,
    fetchStats,
    fetchCustomers,
    fetchInvoices,
    fetchSalesOrders,
    fetchReturns,
    postPayment,
    cancelPayment,
    closePayment,
    copyPayment,
    createFromInvoice,
    processPayment,
    reconcilePayment,
    updateFilters,
    clearFilters,
    clearError,
    clearCurrentPayment,
  }
})
