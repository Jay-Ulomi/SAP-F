import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { arInvoicesApi, customersApi, itemsApi, taxCodesApi } from '../api/arInvoicesApi'
import type {
  ArInvoice,
  ArInvoiceFormData,
  ArInvoiceFilters,
  ArInvoiceStatsResponse,
  Customer,
  InvoiceStatus,
  InvoiceType,
} from '../types'
import { InvoiceStatus, InvoiceType } from '../types'

export const useArInvoicesStore = defineStore('arInvoices', () => {
  // State
  const invoices = ref<ArInvoice[]>([])
  const customers = ref<Customer[]>([])
  const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])
  const currentInvoice = ref<ArInvoice | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ArInvoiceStatsResponse | null>(null)

  // Pagination
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<ArInvoiceFilters>({
    status: undefined,
    type: undefined,
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    amountFrom: undefined,
    amountTo: undefined,
    currency: undefined,
    overdue: false,
  })

  // Computed Properties
  const invoicesByStatus = computed(() => {
    return invoices.value.reduce(
      (acc, invoice) => {
        acc[invoice.status] = (acc[invoice.status] || 0) + 1
        return acc
      },
      {} as Record<InvoiceStatus, number>,
    )
  })

  const invoicesByType = computed(() => {
    return invoices.value.reduce(
      (acc, invoice) => {
        acc[invoice.type] = (acc[invoice.type] || 0) + 1
        return acc
      },
      {} as Record<InvoiceType, number>,
    )
  })

  const draftInvoices = computed(() =>
    invoices.value.filter((invoice) => invoice.status === InvoiceStatus.DRAFT),
  )

  const openInvoices = computed(() =>
    invoices.value.filter((invoice) => invoice.status === InvoiceStatus.OPEN),
  )

  const paidInvoices = computed(() =>
    invoices.value.filter((invoice) => invoice.status === InvoiceStatus.PAID),
  )

  const overdueInvoices = computed(() =>
    invoices.value.filter((invoice) => invoice.status === InvoiceStatus.OVERDUE),
  )

  const totalOutstanding = computed(() =>
    invoices.value
      .filter((inv) => inv.status === InvoiceStatus.OPEN || inv.status === InvoiceStatus.OVERDUE)
      .reduce((sum, inv) => sum + inv.balance, 0),
  )

  const totalPaid = computed(() => invoices.value.reduce((sum, inv) => sum + inv.paidAmount, 0))

  const averageInvoiceValue = computed(() => {
    if (invoices.value.length === 0) return 0
    return invoices.value.reduce((sum, inv) => sum + inv.total, 0) / invoices.value.length
  })

  // Actions - Invoices
  const loadInvoices = async (params?: {
    page?: number
    limit?: number
    filters?: ArInvoiceFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.getInvoices(params)
      invoices.value = response.data

      pagination.value = {
        page: response.pagination.page,
        limit: response.pagination.limit,
        total: response.pagination.total,
        hasMore: response.pagination.hasMore,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoices'
    } finally {
      loading.value = false
    }
  }

  const loadInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.getInvoice(id)
      currentInvoice.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const createInvoice = async (data: ArInvoiceFormData) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.createInvoice(data)
      invoices.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateInvoice = async (id: string, data: Partial<ArInvoiceFormData>) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.updateInvoice(id, data)
      const index = invoices.value.findIndex((inv) => inv.id === id)
      if (index !== -1) {
        invoices.value[index] = response.data
      }
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await arInvoicesApi.deleteInvoice(id)
      invoices.value = invoices.value.filter((inv) => inv.id !== id)
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const postInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.postInvoice(id)
      const index = invoices.value.findIndex((inv) => inv.id === id)
      if (index !== -1) {
        invoices.value[index] = response.data
      }
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelInvoice = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.cancelInvoice(id, reason)
      const index = invoices.value.findIndex((inv) => inv.id === id)
      if (index !== -1) {
        invoices.value[index] = response.data
      }
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const copyInvoice = async (id: string, newDate?: string) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.copyInvoice(id, newDate)
      invoices.value.unshift(response.data)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy invoice'
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadInvoiceStats = async (filters?: ArInvoiceFilters) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.getInvoiceStats(filters)
      stats.value = response
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoice statistics'
      throw err
    } finally {
      loading.value = false
    }
  }

  const applyPayment = async (
    id: string,
    amount: number,
    paymentMethod: string,
    paymentDate: string,
    reference?: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      const response = await arInvoicesApi.applyPayment(
        id,
        amount,
        paymentMethod,
        paymentDate,
        reference,
      )
      const index = invoices.value.findIndex((inv) => inv.id === id)
      if (index !== -1) {
        invoices.value[index] = response.data
      }
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = response.data
      }
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to apply payment'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Supporting Data
  const loadCustomers = async (params?: { page?: number; limit?: number; search?: string }) => {
    try {
      const response = await customersApi.getCustomers(params)
      customers.value = response.data
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load customers'
      throw err
    }
  }

  const searchCustomers = async (query: string) => {
    try {
      const response = await customersApi.searchCustomers(query)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search customers'
      throw err
    }
  }

  const searchItems = async (query: string) => {
    try {
      const response = await itemsApi.searchItems(query)
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to search items'
      throw err
    }
  }

  const loadTaxCodes = async () => {
    try {
      const response = await taxCodesApi.getTaxCodes()
      taxCodes.value = response.data
      return response.data
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load tax codes'
      throw err
    }
  }

  // Utility Actions
  const clearError = () => {
    error.value = null
  }

  const resetState = () => {
    invoices.value = []
    customers.value = []
    taxCodes.value = []
    currentInvoice.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 20,
      total: 0,
      hasMore: false,
    }
    filters.value = {
      status: undefined,
      type: undefined,
      customerCode: '',
      salesPerson: '',
      dateFrom: '',
      dateTo: '',
      amountFrom: undefined,
      amountTo: undefined,
      currency: undefined,
      overdue: false,
    }
  }

  return {
    // State
    invoices,
    customers,
    taxCodes,
    currentInvoice,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    invoicesByStatus,
    invoicesByType,
    draftInvoices,
    openInvoices,
    paidInvoices,
    overdueInvoices,
    totalOutstanding,
    totalPaid,
    averageInvoiceValue,

    // Actions - Invoices
    loadInvoices,
    loadInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
    postInvoice,
    cancelInvoice,
    copyInvoice,
    loadInvoiceStats,
    applyPayment,

    // Actions - Supporting Data
    loadCustomers,
    searchCustomers,
    searchItems,
    loadTaxCodes,

    // Utility Actions
    clearError,
    resetState,
  }
})
