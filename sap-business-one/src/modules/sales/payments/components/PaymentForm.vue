<template>
  <div class="customer-payment-form">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Payment Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="paymentNumber" class="block text-sm font-medium text-gray-700 mb-2">
            Payment Number *
          </label>
          <input
            id="paymentNumber"
            v-model="formData.paymentNumber"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.paymentNumber }"
            placeholder="Enter payment number"
          />
          <div v-if="errors.paymentNumber" class="mt-1 text-sm text-red-600">
            {{ errors.paymentNumber }}
          </div>
        </div>

        <div>
          <label for="paymentDate" class="block text-sm font-medium text-gray-700 mb-2">
            Payment Date *
          </label>
          <input
            id="paymentDate"
            v-model="formData.paymentDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.paymentDate }"
          />
          <div v-if="errors.paymentDate" class="mt-1 text-sm text-red-600">
            {{ errors.paymentDate }}
          </div>
        </div>
      </div>

      <!-- Customer Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-2">
            Customer Code *
          </label>
          <input
            id="customerCode"
            v-model="formData.customerCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.customerCode }"
            placeholder="Enter customer code"
          />
          <div v-if="errors.customerCode" class="mt-1 text-sm text-red-600">
            {{ errors.customerCode }}
          </div>
        </div>

        <div>
          <label for="customerName" class="block text-sm font-medium text-gray-700 mb-2">
            Customer Name *
          </label>
          <input
            id="customerName"
            v-model="formData.customerName"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.customerName }"
            placeholder="Enter customer name"
          />
          <div v-if="errors.customerName" class="mt-1 text-sm text-red-600">
            {{ errors.customerName }}
          </div>
        </div>
      </div>

      <!-- Payment Details -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="amount" class="block text-sm font-medium text-gray-700 mb-2">
            Amount *
          </label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span class="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              id="amount"
              v-model.number="formData.amount"
              type="number"
              step="0.01"
              required
              class="block w-full pl-7 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              :class="{ 'border-red-500': errors.amount }"
              placeholder="0.00"
            />
          </div>
          <div v-if="errors.amount" class="mt-1 text-sm text-red-600">
            {{ errors.amount }}
          </div>
        </div>

        <div>
          <label for="paymentMethod" class="block text-sm font-medium text-gray-700 mb-2">
            Payment Method *
          </label>
          <select
            id="paymentMethod"
            v-model="formData.paymentMethod"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.paymentMethod }"
          >
            <option value="">Select Payment Method</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="online">Online Payment</option>
          </select>
          <div v-if="errors.paymentMethod" class="mt-1 text-sm text-red-600">
            {{ errors.paymentMethod }}
          </div>
        </div>
      </div>

      <!-- Reference and Status -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="reference" class="block text-sm font-medium text-gray-700 mb-2">
            Reference Number
          </label>
          <input
            id="reference"
            v-model="formData.reference"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter reference number"
          />
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
            Status *
          </label>
          <select
            id="status"
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.status }"
          >
            <option value="">Select Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <div v-if="errors.status" class="mt-1 text-sm text-red-600">
            {{ errors.status }}
          </div>
        </div>
      </div>

      <!-- Bank Details (for bank transfer) -->
      <div v-if="formData.paymentMethod === 'bank_transfer'" class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-900">Bank Transfer Details</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="bankName" class="block text-sm font-medium text-gray-700 mb-2">
              Bank Name
            </label>
            <input
              id="bankName"
              v-model="formData.bankDetails.bankName"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter bank name"
            />
          </div>
          <div>
            <label for="accountNumber" class="block text-sm font-medium text-gray-700 mb-2">
              Account Number
            </label>
            <input
              id="accountNumber"
              v-model="formData.bankDetails.accountNumber"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter account number"
            />
          </div>
        </div>
      </div>

      <!-- Check Details (for check) -->
      <div v-if="formData.paymentMethod === 'check'" class="space-y-4 p-4 bg-gray-50 rounded-lg">
        <h4 class="text-sm font-medium text-gray-900">Check Details</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="checkNumber" class="block text-sm font-medium text-gray-700 mb-2">
              Check Number
            </label>
            <input
              id="checkNumber"
              v-model="formData.checkDetails.checkNumber"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter check number"
            />
          </div>
          <div>
            <label for="checkDate" class="block text-sm font-medium text-gray-700 mb-2">
              Check Date
            </label>
            <input
              id="checkDate"
              v-model="formData.checkDetails.checkDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div>
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          id="notes"
          v-model="formData.notes"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter any additional notes"
        ></textarea>
      </div>

      <!-- Form Actions -->
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
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Saving...
          </span>
          <span v-else>{{ isEditing ? 'Update Payment' : 'Create Payment' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

interface PaymentFormData {
  paymentNumber: string
  paymentDate: string
  customerCode: string
  customerName: string
  amount: number
  paymentMethod: string
  status: string
  reference: string
  notes: string
  bankDetails: {
    bankName: string
    accountNumber: string
  }
  checkDetails: {
    checkNumber: string
    checkDate: string
  }
}

interface Props {
  payment?: any
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: PaymentFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<PaymentFormData>({
  paymentNumber: '',
  paymentDate: '',
  customerCode: '',
  customerName: '',
  amount: 0,
  paymentMethod: '',
  status: 'pending',
  reference: '',
  notes: '',
  bankDetails: {
    bankName: '',
    accountNumber: ''
  },
  checkDetails: {
    checkNumber: '',
    checkDate: ''
  }
})

// Form validation errors
const errors = ref<Record<string, string>>({})

// Computed
const isEditing = computed(() => !!props.payment)

// Methods
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.paymentNumber.trim()) {
    errors.value.paymentNumber = 'Payment number is required'
  }

  if (!formData.value.paymentDate) {
    errors.value.paymentDate = 'Payment date is required'
  }

  if (!formData.value.customerCode.trim()) {
    errors.value.customerCode = 'Customer code is required'
  }

  if (!formData.value.customerName.trim()) {
    errors.value.customerName = 'Customer name is required'
  }

  if (!formData.value.amount || formData.value.amount <= 0) {
    errors.value.amount = 'Amount must be greater than 0'
  }

  if (!formData.value.paymentMethod) {
    errors.value.paymentMethod = 'Payment method is required'
  }

  if (!formData.value.status) {
    errors.value.status = 'Status is required'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value })
  }
}

const initializeForm = () => {
  if (props.payment) {
    Object.assign(formData.value, {
      ...props.payment,
      bankDetails: props.payment.bankDetails || {
        bankName: '',
        accountNumber: ''
      },
      checkDetails: props.payment.checkDetails || {
        checkNumber: '',
        checkDate: ''
      }
    })
  } else {
    // Set default date to today
    formData.value.paymentDate = new Date().toISOString().split('T')[0]
  }
}

// Lifecycle
onMounted(() => {
  initializeForm()
})

// Watch for payment prop changes
watch(() => props.payment, () => {
  initializeForm()
}, { deep: true })
</script>

<style scoped>
.customer-payment-form {
  max-width: 100%;
}
</style>