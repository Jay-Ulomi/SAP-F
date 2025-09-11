<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
        <input
          v-model="formData.paymentDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Amount *</label>
        <input
          v-model.number="formData.amount"
          type="number"
          step="0.01"
          min="0"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="0.00"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Payment Type *</label>
        <select
          v-model="formData.paymentType"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select payment type</option>
          <option value="CASH">Cash</option>
          <option value="CHECK">Check</option>
          <option value="BANK_TRANSFER">Bank Transfer</option>
          <option value="CREDIT_CARD">Credit Card</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
        <select
          v-model="formData.currency"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <textarea
        v-model="formData.description"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Payment description"
      />
    </div>

    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ payment ? 'Update Payment' : 'Record Payment' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  payment?: any
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { payment: null, loading: false })
const emit = defineEmits<{ submit: [data: any]; cancel: [] }>()

const formData = ref({
  paymentDate: new Date().toISOString().split('T')[0],
  amount: 0,
  paymentType: '',
  currency: 'USD',
  description: '',
})

const isFormValid = computed(() => {
  return (
    formData.value.paymentDate &&
    formData.value.amount > 0 &&
    formData.value.paymentType &&
    formData.value.currency
  )
})

const handleSubmit = () => {
  if (!isFormValid.value) return
  emit('submit', { ...formData.value })
}
</script>
