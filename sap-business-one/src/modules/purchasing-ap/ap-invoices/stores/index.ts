import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apInvoiceApi } from '../api'
import { ApInvoiceStatus, ApInvoiceType, PaymentTerms } from '../types'
import type {
  ApInvoice,
  ApInvoiceFormData,
  ApInvoiceFilters,
  ApInvoiceStats,
  ApInvoicePagination,
} from '../types'

export const useApInvoiceStore = defineStore('apInvoice', () => {
  // State
  const invoices = ref<ApInvoice[]>([])
  const currentInvoice = ref<ApInvoice | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<{ data: ApInvoiceStats } | null>(null)

  // Pagination
  const pagination = ref<ApInvoicePagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasMore: false,
  })

  // Filters
  const filters = ref<ApInvoiceFilters>({
    status: undefined,
    type: undefined,
    vendorCode: '',
    search: '',
    paymentTerms: undefined,
    currency: undefined,
    projectCode: '',
    invoiceDateFrom: '',
    invoiceDateTo: '',
    dueDateFrom: '',
    dueDateTo: '',
    minAmount: undefined,
    maxAmount: undefined,
  })

  // Computed Properties
  const invoicesByStatus = computed(() => {
    return invoices.value.reduce(
      (acc, invoice) => {
        const status = invoice.status
        acc[status] = (acc[status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const invoicesByType = computed(() => {
    return invoices.value.reduce(
      (acc, invoice) => {
        const type = invoice.type
        acc[type] = (acc[type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
  })

  const totalAmount = computed(() => {
    return invoices.value.reduce((sum, invoice) => sum + invoice.totalAmount, 0)
  })

  const paidAmount = computed(() => {
    return invoices.value.reduce((sum, invoice) => sum + invoice.paidAmount, 0)
  })

  const outstandingAmount = computed(() => {
    return invoices.value.reduce((sum, invoice) => sum + invoice.remainingAmount, 0)
  })

  const overdueAmount = computed(() => {
    return invoices.value
      .filter(
        (invoice) =>
          new Date(invoice.dueDate) < new Date() && invoice.status !== ApInvoiceStatus.PAID,
      )
      .reduce((sum, invoice) => sum + invoice.remainingAmount, 0)
  })

  const averageInvoiceValue = computed(() => {
    return invoices.value.length > 0 ? totalAmount.value / invoices.value.length : 0
  })

  const draftInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.DRAFT)
  })

  const pendingInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.PENDING)
  })

  const approvedInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.APPROVED)
  })

  const paidInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.PAID)
  })

  const partiallyPaidInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.PARTIALLY_PAID)
  })

  const overdueInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.OVERDUE)
  })

  const cancelledInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.CANCELLED)
  })

  const rejectedInvoices = computed(() => {
    return invoices.value.filter((invoice) => invoice.status === ApInvoiceStatus.REJECTED)
  })

  // Actions - Core CRUD
  const loadInvoices = async (params?: {
    page?: number
    limit?: number
    filters?: ApInvoiceFilters
  }) => {
    try {
      loading.value = true
      error.value = null

      const response = await apInvoiceApi.getInvoices(params)
      invoices.value = response.data
      pagination.value = response.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoices'
      console.error('Error loading invoices:', err)
    } finally {
      loading.value = false
    }
  }

  const loadInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const invoice = await apInvoiceApi.getInvoice(id)
      currentInvoice.value = invoice

      // Update the invoice in the list if it exists
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = invoice
      }

      return invoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoice'
      console.error('Error loading invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createInvoice = async (data: ApInvoiceFormData) => {
    try {
      loading.value = true
      error.value = null

      const newInvoice = await apInvoiceApi.createInvoice(data)
      invoices.value.unshift(newInvoice)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create invoice'
      console.error('Error creating invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateInvoice = async (id: string, data: ApInvoiceFormData) => {
    try {
      loading.value = true
      error.value = null

      const updatedInvoice = await apInvoiceApi.updateInvoice(id, data)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = updatedInvoice
      }

      // Update current invoice if it's the one being edited
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = updatedInvoice
      }

      return updatedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update invoice'
      console.error('Error updating invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await apInvoiceApi.deleteInvoice(id)

      // Remove from the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value.splice(index, 1)
      }

      // Update pagination
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      // Clear current invoice if it's the one being deleted
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete invoice'
      console.error('Error deleting invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Business Logic
  const approveInvoice = async (id: string, approvalNotes?: string) => {
    try {
      loading.value = true
      error.value = null

      const approvedInvoice = await apInvoiceApi.approveInvoice(id, approvalNotes)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = approvedInvoice
      }

      // Update current invoice if it's the one being approved
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = approvedInvoice
      }

      return approvedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to approve invoice'
      console.error('Error approving invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const rejectInvoice = async (id: string, rejectionNotes: string) => {
    try {
      loading.value = true
      error.value = null

      const rejectedInvoice = await apInvoiceApi.rejectInvoice(id, rejectionNotes)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = rejectedInvoice
      }

      // Update current invoice if it's the one being rejected
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = rejectedInvoice
      }

      return rejectedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to reject invoice'
      console.error('Error rejecting invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const postedInvoice = await apInvoiceApi.postInvoice(id)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = postedInvoice
      }

      // Update current invoice if it's the one being posted
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = postedInvoice
      }

      return postedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post invoice'
      console.error('Error posting invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const cancelledInvoice = await apInvoiceApi.cancelInvoice(id)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = cancelledInvoice
      }

      // Update current invoice if it's the one being cancelled
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = cancelledInvoice
      }

      return cancelledInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel invoice'
      console.error('Error cancelling invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const recordPayment = async (id: string, paymentAmount: number) => {
    try {
      loading.value = true
      error.value = null

      const updatedInvoice = await apInvoiceApi.recordPayment(id, paymentAmount)

      // Update in the list
      const index = invoices.value.findIndex((i) => i.id === id)
      if (index !== -1) {
        invoices.value[index] = updatedInvoice
      }

      // Update current invoice if it's the one being updated
      if (currentInvoice.value?.id === id) {
        currentInvoice.value = updatedInvoice
      }

      return updatedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to record payment'
      console.error('Error recording payment:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Actions - Utility
  const copyInvoice = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedInvoice = await apInvoiceApi.copyInvoice(id)
      invoices.value.unshift(copiedInvoice)

      // Update pagination
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return copiedInvoice
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy invoice'
      console.error('Error copying invoice:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const printInvoice = async (id: string) => {
    try {
      await apInvoiceApi.printInvoice(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to print invoice'
      console.error('Error printing invoice:', err)
      throw err
    }
  }

  const emailInvoice = async (id: string, email: string) => {
    try {
      await apInvoiceApi.emailInvoice(id, email)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to email invoice'
      console.error('Error emailing invoice:', err)
      throw err
    }
  }

  // Actions - Statistics
  const loadInvoiceStats = async () => {
    try {
      loading.value = true
      error.value = null

      const response = await apInvoiceApi.getInvoiceStats()
      stats.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoice statistics'
      console.error('Error loading invoice statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Actions - Validation
  const validateInvoice = async (data: ApInvoiceFormData) => {
    try {
      return await apInvoiceApi.validateInvoice(data)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to validate invoice'
      console.error('Error validating invoice:', err)
      throw err
    }
  }

  // Actions - Filter Management
  const updateFilters = (newFilters: Partial<ApInvoiceFilters>) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1 // Reset to first page when filters change
  }

  const clearFilters = () => {
    filters.value = {
      status: undefined,
      type: undefined,
      vendorCode: '',
      search: '',
      paymentTerms: undefined,
      currency: undefined,
      projectCode: '',
      invoiceDateFrom: '',
      invoiceDateTo: '',
      dueDateFrom: '',
      dueDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
    pagination.value.page = 1
  }

  // Actions - Pagination Controls
  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
      loadInvoices({ page, limit: pagination.value.limit, filters: filters.value })
    }
  }

  const nextPage = () => {
    if (pagination.value.hasMore) {
      goToPage(pagination.value.page + 1)
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      goToPage(pagination.value.page - 1)
    }
  }

  const changePageSize = (newLimit: number) => {
    pagination.value.limit = newLimit
    pagination.value.page = 1
    loadInvoices({ page: 1, limit: newLimit, filters: filters.value })
  }

  // Actions - State Clearing
  const clearCurrentInvoice = () => {
    currentInvoice.value = null
  }

  const clearError = () => {
    error.value = null
  }

  const clearStore = () => {
    invoices.value = []
    currentInvoice.value = null
    loading.value = false
    error.value = null
    stats.value = null
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
      hasMore: false,
    }
    filters.value = {
      status: undefined,
      type: undefined,
      vendorCode: '',
      search: '',
      paymentTerms: undefined,
      currency: undefined,
      projectCode: '',
      invoiceDateFrom: '',
      invoiceDateTo: '',
      dueDateFrom: '',
      dueDateTo: '',
      minAmount: undefined,
      maxAmount: undefined,
    }
  }

  return {
    // State
    invoices,
    currentInvoice,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed Properties
    invoicesByStatus,
    invoicesByType,
    totalAmount,
    paidAmount,
    outstandingAmount,
    overdueAmount,
    averageInvoiceValue,
    draftInvoices,
    pendingInvoices,
    approvedInvoices,
    paidInvoices,
    partiallyPaidInvoices,
    overdueInvoices,
    cancelledInvoices,
    rejectedInvoices,

    // Actions - Core CRUD
    loadInvoices,
    loadInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,

    // Actions - Business Logic
    approveInvoice,
    rejectInvoice,
    postInvoice,
    cancelInvoice,
    recordPayment,

    // Actions - Utility
    copyInvoice,
    printInvoice,
    emailInvoice,

    // Actions - Statistics
    loadInvoiceStats,

    // Actions - Validation
    validateInvoice,

    // Actions - Filter Management
    updateFilters,
    clearFilters,

    // Actions - Pagination Controls
    goToPage,
    nextPage,
    previousPage,
    changePageSize,

    // Actions - State Clearing
    clearCurrentInvoice,
    clearError,
    clearStore,
  }
})
