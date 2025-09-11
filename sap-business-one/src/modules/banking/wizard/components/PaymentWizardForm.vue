<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Wizard Type Selection -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Wizard Type *</label>
      <select
        v-model="formData.wizardType"
        required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      >
        <option value="">Select Wizard Type</option>
        <option value="SINGLE_PAYMENT">Single Payment</option>
        <option value="BATCH_PAYMENT">Batch Payment</option>
        <option value="RECURRING_PAYMENT">Recurring Payment</option>
        <option value="PAYROLL_PAYMENT">Payroll Payment</option>
        <option value="VENDOR_PAYMENT">Vendor Payment</option>
        <option value="CUSTOMER_REFUND">Customer Refund</option>
        <option value="TAX_PAYMENT">Tax Payment</option>
        <option value="LOAN_PAYMENT">Loan Payment</option>
      </select>
    </div>

    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Title *</label>
        <input
          v-model="formData.title"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter payment wizard title"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Priority *</label>
        <select
          v-model="formData.priority"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Priority</option>
          <option value="LOW">Low</option>
          <option value="NORMAL">Normal</option>
          <option value="HIGH">High</option>
          <option value="URGENT">Urgent</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Currency *</label>
        <select
          v-model="formData.currency"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Currency</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CHF">CHF - Swiss Franc</option>
          <option value="CNY">CNY - Chinese Yuan</option>
        </select>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="formData.description"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Enter payment wizard description"
      />
    </div>

    <!-- Wizard Type Information -->
    <div v-if="formData.wizardType" class="bg-blue-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-blue-900 mb-2">Wizard Type Information</h3>
      <div class="text-sm text-blue-800">
        <p v-if="formData.wizardType === 'SINGLE_PAYMENT'">
          Process a single payment to one recipient. Best for one-time payments.
        </p>
        <p v-else-if="formData.wizardType === 'BATCH_PAYMENT'">
          Process multiple payments to different recipients in one batch. Efficient for bulk
          payments.
        </p>
        <p v-else-if="formData.wizardType === 'RECURRING_PAYMENT'">
          Set up automated recurring payments on a schedule. Perfect for subscriptions and regular
          payments.
        </p>
        <p v-else-if="formData.wizardType === 'PAYROLL_PAYMENT'">
          Process employee payroll payments with tax calculations and deductions.
        </p>
        <p v-else-if="formData.wizardType === 'VENDOR_PAYMENT'">
          Process payments to vendors and suppliers with invoice matching.
        </p>
        <p v-else-if="formData.wizardType === 'CUSTOMER_REFUND'">
          Process refunds to customers with proper documentation and approval.
        </p>
        <p v-else-if="formData.wizardType === 'TAX_PAYMENT'">
          Process tax payments to government agencies with proper reporting.
        </p>
        <p v-else-if="formData.wizardType === 'LOAN_PAYMENT'">
          Process loan payments with principal and interest calculations.
        </p>
      </div>
    </div>

    <!-- Priority Information -->
    <div v-if="formData.priority" class="bg-yellow-50 rounded-lg p-4">
      <h3 class="text-sm font-medium text-yellow-900 mb-2">Priority Level</h3>
      <div class="text-sm text-yellow-800">
        <p v-if="formData.priority === 'LOW'">
          Low priority payments can be processed during off-peak hours.
        </p>
        <p v-else-if="formData.priority === 'NORMAL'">
          Normal priority payments will be processed in standard queue.
        </p>
        <p v-else-if="formData.priority === 'HIGH'">
          High priority payments will be processed with expedited handling.
        </p>
        <p v-else-if="formData.priority === 'URGENT'">
          Urgent payments require immediate processing and approval.
        </p>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Notes</label>
      <textarea
        v-model="formData.notes"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder="Additional notes for this payment wizard"
      />
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
        <span v-if="loading">Creating...</span>
        <span v-else>{{ wizard ? 'Update Wizard' : 'Create Wizard' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PaymentWizard, PaymentWizardFormData } from '../types'
import { PaymentWizardType, PaymentPriority, Currency } from '../types'

interface Props {
  wizard?: PaymentWizard | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: PaymentWizardFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<PaymentWizardFormData>({
  wizardType: PaymentWizardType.SINGLE_PAYMENT,
  title: '',
  description: '',
  priority: PaymentPriority.NORMAL,
  currency: Currency.USD,
  notes: '',
})

// Watch for initial data changes
watch(
  () => props.wizard,
  (newWizard) => {
    if (newWizard) {
      formData.value = {
        wizardType: newWizard.wizardType,
        title: newWizard.title,
        description: newWizard.description || '',
        priority: newWizard.priority,
        currency: newWizard.currency,
        notes: newWizard.notes || '',
      }
    }
  },
  { immediate: true },
)

// Form submission
const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>
