import { defineStore } from 'pinia'
import { ref } from 'vue'
import { outgoingPaymentsApi } from '../api'
import type { OutgoingPayment, OutgoingPaymentFormData, OutgoingPaymentFilters } from '../types'

export const useOutgoingPaymentsStore = defineStore('outgoingPayments', () => {
  // State
  const payments = ref<OutgoingPayment[]>([])
  const currentPayment = ref<OutgoingPayment | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<any>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<OutgoingPaymentFilters>({})

  // Actions
  const loadPayments = async (page = 1, limit = 10, newFilters?: OutgoingPaymentFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await outgoingPaymentsApi.getPayments(page, limit, filters.value)
      payments.value = response.payments
      pagination.value = response.pagination
    } catch (err) {
      error.value = 'Failed to load payments'
      console.error('Error loading payments:', err)
    } finally {
      loading.value = false
    }
  }

  const createPayment = async (data: OutgoingPaymentFormData) => {
    try {
      loading.value = true
      error.value = null
      const payment = await outgoingPaymentsApi.createPayment(data)
      if (payment) {
        payments.value.unshift(payment)
      }
      return payment
    } catch (err) {
      error.value = 'Failed to create payment'
      console.error('Error creating payment:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const updatePayment = async (id: string, data: Partial<OutgoingPaymentFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updated = await outgoingPaymentsApi.updatePayment(id, data)
      if (updated) {
        const idx = payments.value.findIndex((p) => p.id === id)
        if (idx !== -1) payments.value[idx] = updated
        if (currentPayment.value?.id === id) currentPayment.value = updated
      }
      return updated
    } catch (err) {
      error.value = 'Failed to update payment'
      console.error('Error updating payment:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  const deletePayment = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      const ok = await outgoingPaymentsApi.deletePayment(id)
      if (ok) {
        payments.value = payments.value.filter((p) => p.id !== id)
        if (currentPayment.value?.id === id) currentPayment.value = null
      }
      return ok
    } catch (err) {
      error.value = 'Failed to delete payment'
      console.error('Error deleting payment:', err)
      return false
    } finally {
      loading.value = false
    }
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

    // Actions
    loadPayments,
    createPayment,
    updatePayment,
    deletePayment,
  }
})
