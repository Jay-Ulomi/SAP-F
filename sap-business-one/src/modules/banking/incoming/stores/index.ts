import { defineStore } from 'pinia'
import { ref } from 'vue'
import { incomingPaymentsApi } from '../api'
import type { IncomingPayment, IncomingPaymentFormData } from '../types'

export const useIncomingPaymentsStore = defineStore('incomingPayments', () => {
  const payments = ref<IncomingPayment[]>([])
  const currentPayment = ref<IncomingPayment | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadPayments = async () => {
    try {
      loading.value = true
      const res = await incomingPaymentsApi.getPayments()
      payments.value = res.payments
    } catch (e) {
      error.value = 'Failed to load payments'
    } finally {
      loading.value = false
    }
  }

  const createPayment = async (data: IncomingPaymentFormData) => {
    try {
      loading.value = true
      const payment = await incomingPaymentsApi.createPayment(data)
      if (payment) {
        payments.value.unshift(payment)
      }
      return payment
    } catch {
      error.value = 'Failed to create payment'
      return null
    } finally {
      loading.value = false
    }
  }

  const updatePayment = async (id: string, data: Partial<IncomingPaymentFormData>) => {
    try {
      loading.value = true
      const updated = await incomingPaymentsApi.updatePayment(id, data)
      if (updated) {
        const idx = payments.value.findIndex((p) => p.id === id)
        if (idx !== -1) payments.value[idx] = updated
        if (currentPayment.value?.id === id) currentPayment.value = updated
      }
      return updated
    } catch {
      error.value = 'Failed to update payment'
      return null
    } finally {
      loading.value = false
    }
  }

  const deletePayment = async (id: string) => {
    try {
      loading.value = true
      const ok = await incomingPaymentsApi.deletePayment(id)
      if (ok) {
        payments.value = payments.value.filter((p) => p.id !== id)
        if (currentPayment.value?.id === id) currentPayment.value = null
      }
      return ok
    } catch {
      error.value = 'Failed to delete payment'
      return false
    } finally {
      loading.value = false
    }
  }

  return {
    payments,
    currentPayment,
    loading,
    error,
    loadPayments,
    createPayment,
    updatePayment,
    deletePayment,
  }
})
