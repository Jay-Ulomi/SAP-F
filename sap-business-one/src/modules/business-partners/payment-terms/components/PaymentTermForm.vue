<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="bg-white rounded-lg shadow p-6">
      <h3 class="text-base font-medium text-gray-900 mb-4">Payment Term Information</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Code *</label>
          <input
            v-model="formData.code"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="NET30"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Net 30 Days"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            v-model="formData.type"
            required
            @change="handleTypeChange"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Type</option>
            <option value="NET_DAYS">Net Days</option>
            <option value="END_OF_MONTH">End of Month</option>
            <option value="FIXED_DATE">Fixed Date</option>
            <option value="IMMEDIATE">Immediate</option>
            <option value="CUSTOM">Custom</option>
          </select>
        </div>

        <div v-if="formData.type === 'NET_DAYS'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Net Days *</label>
          <input
            v-model="formData.netDays"
            type="number"
            min="1"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="30"
          />
        </div>

        <div v-if="formData.type === 'FIXED_DATE'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date *</label>
          <input
            v-model="formData.dueDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
          <select
            v-model="formData.paymentMethod"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Method</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="CHECK">Check</option>
            <option value="CASH">Cash</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="ELECTRONIC_PAYMENT">Electronic Payment</option>
            <option value="WIRE_TRANSFER">Wire Transfer</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
          <select
            v-model="formData.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
            <option value="CAD">CAD - Canadian Dollar</option>
            <option value="AUD">AUD - Australian Dollar</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input
            v-model="formData.sortOrder"
            type="number"
            min="0"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="1"
          />
        </div>
      </div>

      <!-- Discount Section -->
      <div v-if="formData.type === 'NET_DAYS'" class="mt-6 pt-6 border-t border-gray-200">
        <h4 class="text-sm font-medium text-gray-900 mb-3">Early Payment Discount</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Discount Days</label>
            <input
              v-model="formData.discountDays"
              type="number"
              min="1"
              :max="formData.netDays"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="10"
            />
            <p class="text-xs text-gray-500 mt-1">Days within which discount applies</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Discount Percent</label>
            <input
              v-model="formData.discountPercent"
              type="number"
              min="0"
              max="100"
              step="0.01"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="2.00"
            />
            <p class="text-xs text-gray-500 mt-1">Percentage discount (0-100)</p>
          </div>
        </div>
      </div>

      <!-- Status Section -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <h4 class="text-sm font-medium text-gray-900 mb-3">Status & Settings</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <input
              v-model="formData.isActive"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Active</label>
          </div>

          <div class="flex items-center">
            <input
              v-model="formData.isDefault"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Default Payment Term</label>
          </div>
        </div>
      </div>

      <!-- Description and Notes -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="formData.description"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Payment due within 30 days of invoice date"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Additional notes or instructions"
            ></textarea>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="handleCancel"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="props.loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.loading ? 'Saving...' : isEdit ? 'Update Payment Term' : 'Create Payment Term' }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { PaymentTermType, PaymentMethod, Currency } from '../types'
import type { PaymentTerm, PaymentTermFormData } from '../types'

interface Props {
  paymentTerm?: PaymentTerm | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: PaymentTermFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  paymentTerm: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const isEdit = computed(() => !!props.paymentTerm)

// Form data
const formData = reactive<PaymentTermFormData>({
  code: '',
  name: '',
  description: '',
  type: PaymentTermType.NET_DAYS,
  netDays: 30,
  discountDays: undefined,
  discountPercent: undefined,
  dueDate: '',
  paymentMethod: PaymentMethod.BANK_TRANSFER,
  currency: Currency.USD,
  isActive: true,
  isDefault: false,
  sortOrder: 1,
  notes: '',
})

// Methods
const handleTypeChange = () => {
  // Reset type-specific fields when type changes
  if (formData.type !== PaymentTermType.NET_DAYS) {
    formData.netDays = undefined
    formData.discountDays = undefined
    formData.discountPercent = undefined
  }

  if (formData.type !== PaymentTermType.FIXED_DATE) {
    formData.dueDate = ''
  }
}

const resetForm = () => {
  formData.code = ''
  formData.name = ''
  formData.description = ''
  formData.type = PaymentTermType.NET_DAYS
  formData.netDays = 30
  formData.discountDays = undefined
  formData.discountPercent = undefined
  formData.dueDate = ''
  formData.paymentMethod = PaymentMethod.BANK_TRANSFER
  formData.currency = Currency.USD
  formData.isActive = true
  formData.isDefault = false
  formData.sortOrder = 1
  formData.notes = ''
}

// Watch for payment term changes to populate form
watch(
  () => props.paymentTerm,
  (paymentTerm) => {
    if (paymentTerm) {
      // Populate form with payment term data
      formData.code = paymentTerm.code
      formData.name = paymentTerm.name
      formData.description = paymentTerm.description || ''
      formData.type = paymentTerm.type
      formData.netDays = paymentTerm.netDays
      formData.discountDays = paymentTerm.discountDays
      formData.discountPercent = paymentTerm.discountPercent
      formData.dueDate = paymentTerm.dueDate || ''
      formData.paymentMethod = paymentTerm.paymentMethod
      formData.currency = paymentTerm.currency
      formData.isActive = paymentTerm.isActive
      formData.isDefault = paymentTerm.isDefault
      formData.sortOrder = paymentTerm.sortOrder
      formData.notes = paymentTerm.notes || ''
    } else {
      // Reset form for new payment term
      resetForm()
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  try {
    // Validate required fields
    if (!formData.code.trim()) {
      alert('Payment term code is required')
      return
    }
    if (!formData.name.trim()) {
      alert('Payment term name is required')
      return
    }
    if (
      formData.type === PaymentTermType.NET_DAYS &&
      (!formData.netDays || formData.netDays <= 0)
    ) {
      alert('Net days must be greater than 0 for Net Days payment terms')
      return
    }
    if (formData.type === PaymentTermType.FIXED_DATE && !formData.dueDate) {
      alert('Due date is required for Fixed Date payment terms')
      return
    }
    if (
      formData.discountPercent &&
      (formData.discountPercent < 0 || formData.discountPercent > 100)
    ) {
      alert('Discount percentage must be between 0 and 100')
      return
    }
    if (formData.discountDays && formData.discountDays <= 0) {
      alert('Discount days must be greater than 0')
      return
    }
    if (formData.discountDays && formData.netDays && formData.discountDays >= formData.netDays) {
      alert('Discount days must be less than net days')
      return
    }
    if (formData.sortOrder && formData.sortOrder < 0) {
      alert('Sort order cannot be negative')
      return
    }

    emit('submit', { ...formData })
  } catch (error) {
    console.error('Form submission error:', error)
    alert('An error occurred while submitting the form')
  }
}

const handleCancel = () => {
  emit('cancel')
}
</script>
