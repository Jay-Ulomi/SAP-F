import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { paymentTermApi } from '../api'
import type {
  PaymentTerm,
  PaymentTermFormData,
  PaymentTermFilters,
  PaymentTermStats,
  PaymentTermPagination,
} from '../types'
import { PaymentTermType, PaymentMethod, Currency } from '../types'

export const usePaymentTermStore = defineStore('paymentTerms', () => {
  // State
  const paymentTerms = ref<PaymentTerm[]>([])
  const currentPaymentTerm = ref<PaymentTerm | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PaymentTermStats | null>(null)

  // Pagination
  const pagination = ref<PaymentTermPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<PaymentTermFilters>({})

  // Computed Properties
  const paymentTermsByType = computed(() => {
    const grouped: Record<PaymentTermType, PaymentTerm[]> = {
      [PaymentTermType.NET_DAYS]: [],
      [PaymentTermType.END_OF_MONTH]: [],
      [PaymentTermType.FIXED_DATE]: [],
      [PaymentTermType.IMMEDIATE]: [],
      [PaymentTermType.CUSTOM]: [],
    }

    paymentTerms.value.forEach((term) => {
      grouped[term.type].push(term)
    })

    return grouped
  })

  const paymentTermsByMethod = computed(() => {
    const grouped: Record<PaymentMethod, PaymentTerm[]> = {
      [PaymentMethod.BANK_TRANSFER]: [],
      [PaymentMethod.CHECK]: [],
      [PaymentMethod.CASH]: [],
      [PaymentMethod.CREDIT_CARD]: [],
      [PaymentMethod.ELECTRONIC_PAYMENT]: [],
      [PaymentMethod.WIRE_TRANSFER]: [],
      [PaymentMethod.OTHER]: [],
    }

    paymentTerms.value.forEach((term) => {
      grouped[term.paymentMethod].push(term)
    })

    return grouped
  })

  const paymentTermsByCurrency = computed(() => {
    const grouped: Record<Currency, PaymentTerm[]> = {
      [Currency.USD]: [],
      [Currency.EUR]: [],
      [Currency.GBP]: [],
      [Currency.JPY]: [],
      [Currency.CAD]: [],
      [Currency.AUD]: [],
    }

    paymentTerms.value.forEach((term) => {
      grouped[term.currency].push(term)
    })

    return grouped
  })

  const activePaymentTerms = computed(() => paymentTerms.value.filter((term) => term.isActive))

  const defaultPaymentTerms = computed(() => paymentTerms.value.filter((term) => term.isDefault))

  const termsWithDiscount = computed(() =>
    paymentTerms.value.filter((term) => term.discountPercent && term.discountPercent > 0),
  )

  const netDaysTerms = computed(() =>
    paymentTerms.value.filter((term) => term.type === PaymentTermType.NET_DAYS),
  )

  const averageNetDays = computed(() => {
    const termsWithNetDays = paymentTerms.value.filter((term) => term.netDays)
    if (termsWithNetDays.length === 0) return 0
    const total = termsWithNetDays.reduce((sum, term) => sum + (term.netDays || 0), 0)
    return total / termsWithNetDays.length
  })

  const sortedPaymentTerms = computed(() => {
    return [...paymentTerms.value].sort((a, b) => a.sortOrder - b.sortOrder)
  })

  // Actions
  const loadPaymentTerms = async (newFilters?: PaymentTermFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await paymentTermApi.getPaymentTerms(filters.value, {
        page: pagination.value.page,
        limit: pagination.value.limit,
      })

      paymentTerms.value = response.data
      pagination.value.total = response.total
      pagination.value.totalPages = Math.ceil(response.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment terms'
      console.error('Error loading payment terms:', err)
    } finally {
      loading.value = false
    }
  }

  const loadPaymentTerm = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const paymentTerm = await paymentTermApi.getPaymentTerm(id)
      currentPaymentTerm.value = paymentTerm
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load payment term'
      console.error('Error loading payment term:', err)
    } finally {
      loading.value = false
    }
  }

  const createPaymentTerm = async (data: PaymentTermFormData) => {
    try {
      loading.value = true
      error.value = null

      const newPaymentTerm = await paymentTermApi.createPaymentTerm(data)
      paymentTerms.value.unshift(newPaymentTerm)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newPaymentTerm
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create payment term'
      console.error('Error creating payment term:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updatePaymentTerm = async (id: string, data: Partial<PaymentTermFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedPaymentTerm = await paymentTermApi.updatePaymentTerm(id, data)

      // Update in payment terms array
      const index = paymentTerms.value.findIndex((term) => term.id === id)
      if (index !== -1) {
        paymentTerms.value[index] = updatedPaymentTerm
      }

      // Update current payment term if it's the one being edited
      if (currentPaymentTerm.value?.id === id) {
        currentPaymentTerm.value = updatedPaymentTerm
      }

      return updatedPaymentTerm
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update payment term'
      console.error('Error updating payment term:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deletePaymentTerm = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await paymentTermApi.deletePaymentTerm(id)

      // Remove from payment terms array
      const index = paymentTerms.value.findIndex((term) => term.id === id)
      if (index !== -1) {
        paymentTerms.value.splice(index, 1)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      // Clear current payment term if it's the one being deleted
      if (currentPaymentTerm.value?.id === id) {
        currentPaymentTerm.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete payment term'
      console.error('Error deleting payment term:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadPaymentTermStats = async () => {
    try {
      const paymentTermStats = await paymentTermApi.getPaymentTermStats()
      stats.value = paymentTermStats
    } catch (err) {
      console.error('Error loading payment term stats:', err)
    }
  }

  const setDefaultPaymentTerm = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedPaymentTerm = await paymentTermApi.setDefaultPaymentTerm(id)

      // Update in payment terms array
      const index = paymentTerms.value.findIndex((term) => term.id === id)
      if (index !== -1) {
        paymentTerms.value[index] = updatedPaymentTerm
      }

      // Update current payment term if it's the one being updated
      if (currentPaymentTerm.value?.id === id) {
        currentPaymentTerm.value = updatedPaymentTerm
      }

      // Update other terms to remove default flag
      paymentTerms.value.forEach((term) => {
        if (term.id !== id && term.isDefault) {
          term.isDefault = false
        }
      })

      return updatedPaymentTerm
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to set default payment term'
      console.error('Error setting default payment term:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicatePaymentTerm = async (id: string, newCode: string, newName: string) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedPaymentTerm = await paymentTermApi.duplicatePaymentTerm(id, newCode, newName)
      paymentTerms.value.unshift(duplicatedPaymentTerm)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return duplicatedPaymentTerm
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate payment term'
      console.error('Error duplicating payment term:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const setPageSize = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    pagination.value.totalPages = Math.ceil(pagination.value.total / limit)
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page += 1
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page -= 1
    }
  }

  // Filter actions
  const setFilters = (newFilters: PaymentTermFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentPaymentTerm = () => {
    currentPaymentTerm.value = null
  }

  return {
    // State
    paymentTerms,
    currentPaymentTerm,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    paymentTermsByType,
    paymentTermsByMethod,
    paymentTermsByCurrency,
    activePaymentTerms,
    defaultPaymentTerms,
    termsWithDiscount,
    netDaysTerms,
    averageNetDays,
    sortedPaymentTerms,

    // Actions
    loadPaymentTerms,
    loadPaymentTerm,
    createPaymentTerm,
    updatePaymentTerm,
    deletePaymentTerm,
    loadPaymentTermStats,
    setDefaultPaymentTerm,
    duplicatePaymentTerm,

    // Pagination
    setPage,
    setPageSize,
    nextPage,
    previousPage,

    // Filters
    setFilters,
    clearFilters,
    resetPagination,

    // Utility
    clearError,
    clearCurrentPaymentTerm,
  }
})
