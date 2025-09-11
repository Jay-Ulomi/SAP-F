<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Bank Account *</label>
        <select
          v-model="formData.bankAccountId"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Bank Account</option>
          <option value="BA-1">Main Business Checking</option>
          <option value="BA-2">Business Savings</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Statement Date *</label>
        <input
          v-model="formData.statementDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Reconciliation Date *</label>
        <input
          v-model="formData.reconciliationDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Beginning Balance *</label>
        <input
          v-model.number="formData.beginningBalance"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Ending Balance *</label>
        <input
          v-model.number="formData.endingBalance"
          type="number"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="0.00"
        />
      </div>

      <div class="md:col-span-2">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          v-model="formData.notes"
          rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Additional notes for this reconciliation"
        />
      </div>
    </div>

    <!-- Balance Summary -->
    <div class="bg-gray-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-gray-900 mb-3">Balance Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="text-center">
          <p class="text-sm text-gray-500">Beginning Balance</p>
          <p class="text-lg font-semibold text-gray-900">
            ${{ formatNumber(formData.beginningBalance || 0) }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">Ending Balance</p>
          <p class="text-lg font-semibold text-gray-900">
            ${{ formatNumber(formData.endingBalance || 0) }}
          </p>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500">Difference</p>
          <p
            class="text-lg font-semibold"
            :class="
              (formData.endingBalance || 0) - (formData.beginningBalance || 0) >= 0
                ? 'text-green-600'
                : 'text-red-600'
            "
          >
            ${{ formatNumber((formData.endingBalance || 0) - (formData.beginningBalance || 0)) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ reconciliation ? 'Update Reconciliation' : 'Create Reconciliation' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Reconciliation, ReconciliationFormData } from '../types'

interface Props {
  reconciliation?: Reconciliation | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ReconciliationFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<ReconciliationFormData>({
  bankAccountId: '',
  statementDate: new Date(),
  reconciliationDate: new Date(),
  beginningBalance: 0,
  endingBalance: 0,
  notes: '',
})

// Watch for initial data changes
watch(
  () => props.reconciliation,
  (newReconciliation) => {
    if (newReconciliation) {
      formData.value = {
        bankAccountId: newReconciliation.bankAccountId,
        statementDate: newReconciliation.statementDate,
        reconciliationDate: newReconciliation.reconciliationDate,
        beginningBalance: newReconciliation.beginningBalance,
        endingBalance: newReconciliation.endingBalance,
        notes: newReconciliation.notes || '',
      }
    }
  },
  { immediate: true },
)

// Set default dates on mount
onMounted(() => {
  if (!formData.value.statementDate) {
    formData.value.statementDate = new Date()
  }
  if (!formData.value.reconciliationDate) {
    formData.value.reconciliationDate = new Date()
  }
})

// Form submission
const handleSubmit = () => {
  emit('submit', formData.value)
}

// Utility functions
const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
</script>
