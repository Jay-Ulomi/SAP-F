<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Currency Pair Selection -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="baseCurrency" class="block text-sm font-medium text-gray-700 mb-1">
          Base Currency *
        </label>
        <select
          id="baseCurrency"
          v-model="formData.baseCurrency"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.baseCurrency }"
        >
          <option value="">Select Base Currency</option>
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
            {{ currency.code }} - {{ currency.name }}
          </option>
        </select>
        <p v-if="errors.baseCurrency" class="mt-1 text-sm text-red-600">
          {{ errors.baseCurrency }}
        </p>
      </div>

      <div>
        <label for="targetCurrency" class="block text-sm font-medium text-gray-700 mb-1">
          Target Currency *
        </label>
        <select
          id="targetCurrency"
          v-model="formData.targetCurrency"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.targetCurrency }"
        >
          <option value="">Select Target Currency</option>
          <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
            {{ currency.code }} - {{ currency.name }}
          </option>
        </select>
        <p v-if="errors.targetCurrency" class="mt-1 text-sm text-red-600">
          {{ errors.targetCurrency }}
        </p>
      </div>
    </div>

    <!-- Transaction Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="transactionType" class="block text-sm font-medium text-gray-700 mb-1">
          Transaction Type *
        </label>
        <select
          id="transactionType"
          v-model="formData.transactionType"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.transactionType }"
        >
          <option value="">Select Transaction Type</option>
          <option value="SALE">Sale</option>
          <option value="PURCHASE">Purchase</option>
          <option value="PAYMENT">Payment</option>
          <option value="RECEIPT">Receipt</option>
          <option value="ADJUSTMENT">Adjustment</option>
        </select>
        <p v-if="errors.transactionType" class="mt-1 text-sm text-red-600">
          {{ errors.transactionType }}
        </p>
      </div>

      <div>
        <label for="originalAmount" class="block text-sm font-medium text-gray-700 mb-1">
          Original Amount *
        </label>
        <input
          id="originalAmount"
          v-model.number="formData.originalAmount"
          type="number"
          step="0.01"
          min="0"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.originalAmount }"
          placeholder="0.00"
        />
        <p v-if="errors.originalAmount" class="mt-1 text-sm text-red-600">
          {{ errors.originalAmount }}
        </p>
      </div>
    </div>

    <!-- Rate Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="originalRate" class="block text-sm font-medium text-gray-700 mb-1">
          Original Rate *
        </label>
        <input
          id="originalRate"
          v-model.number="formData.originalRate"
          type="number"
          step="0.0001"
          min="0"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.originalRate }"
          placeholder="0.0000"
        />
        <p v-if="errors.originalRate" class="mt-1 text-sm text-red-600">
          {{ errors.originalRate }}
        </p>
      </div>

      <div>
        <label for="currentRate" class="block text-sm font-medium text-gray-700 mb-1">
          Current Rate *
        </label>
        <input
          id="currentRate"
          v-model.number="formData.currentRate"
          type="number"
          step="0.0001"
          min="0"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.currentRate }"
          placeholder="0.0000"
        />
        <p v-if="errors.currentRate" class="mt-1 text-sm text-red-600">{{ errors.currentRate }}</p>
      </div>
    </div>

    <!-- Date Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="transactionDate" class="block text-sm font-medium text-gray-700 mb-1">
          Transaction Date *
        </label>
        <input
          id="transactionDate"
          v-model="formData.transactionDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.transactionDate }"
        />
        <p v-if="errors.transactionDate" class="mt-1 text-sm text-red-600">
          {{ errors.transactionDate }}
        </p>
      </div>

      <div>
        <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
          Posting Date *
        </label>
        <input
          id="postingDate"
          v-model="formData.postingDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.postingDate }"
        />
        <p v-if="errors.postingDate" class="mt-1 text-sm text-red-600">{{ errors.postingDate }}</p>
      </div>
    </div>

    <!-- Document Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="documentNumber" class="block text-sm font-medium text-gray-700 mb-1">
          Document Number *
        </label>
        <input
          id="documentNumber"
          v-model="formData.documentNumber"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.documentNumber }"
          placeholder="e.g., INV-001, PO-002"
        />
        <p v-if="errors.documentNumber" class="mt-1 text-sm text-red-600">
          {{ errors.documentNumber }}
        </p>
      </div>

      <div>
        <label for="documentType" class="block text-sm font-medium text-gray-700 mb-1">
          Document Type *
        </label>
        <input
          id="documentType"
          v-model="formData.documentType"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.documentType }"
          placeholder="e.g., Invoice, Purchase Order"
        />
        <p v-if="errors.documentType" class="mt-1 text-sm text-red-600">
          {{ errors.documentType }}
        </p>
      </div>
    </div>

    <!-- Business Partner and Account -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="businessPartner" class="block text-sm font-medium text-gray-700 mb-1">
          Business Partner *
        </label>
        <input
          id="businessPartner"
          v-model="formData.businessPartner"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.businessPartner }"
          placeholder="e.g., ABC Corp, XYZ Ltd"
        />
        <p v-if="errors.businessPartner" class="mt-1 text-sm text-red-600">
          {{ errors.businessPartner }}
        </p>
      </div>

      <div>
        <label for="account" class="block text-sm font-medium text-gray-700 mb-1">
          Account *
        </label>
        <input
          id="account"
          v-model="formData.account"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.account }"
          placeholder="e.g., Accounts Receivable, Accounts Payable"
        />
        <p v-if="errors.account" class="mt-1 text-sm text-red-600">{{ errors.account }}</p>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700 mb-1"> Notes </label>
      <textarea
        id="notes"
        v-model="formData.notes"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Additional notes or comments..."
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
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">{{ props.initialData ? 'Updating...' : 'Creating...' }}</span>
        <span v-else>{{ props.initialData ? 'Update' : 'Create' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ExchangeRateDifference, ExchangeRateDifferenceFormData, Currency } from '../types'
import { CurrencyCode } from '../types'

// Props
interface Props {
  initialData?: ExchangeRateDifference
  loading?: boolean
  currencies?: Currency[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  currencies: () => [],
})

// Emits
const emit = defineEmits<{
  submit: [data: ExchangeRateDifferenceFormData]
  cancel: []
}>()

// Form data
const formData = ref<ExchangeRateDifferenceFormData>({
  baseCurrency: CurrencyCode.USD,
  targetCurrency: CurrencyCode.EUR,
  transactionDate: '',
  postingDate: '',
  originalAmount: 0,
  originalRate: 0,
  currentRate: 0,
  transactionType: 'SALE',
  documentNumber: '',
  documentType: '',
  businessPartner: '',
  account: '',
  notes: '',
})

// Validation errors
const errors = ref<Partial<Record<keyof ExchangeRateDifferenceFormData, string>>>({})

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.baseCurrency &&
    formData.value.targetCurrency &&
    formData.value.transactionDate &&
    formData.value.postingDate &&
    formData.value.originalAmount > 0 &&
    formData.value.originalRate > 0 &&
    formData.value.currentRate > 0 &&
    formData.value.transactionType &&
    formData.value.documentNumber &&
    formData.value.documentType &&
    formData.value.businessPartner &&
    formData.value.account &&
    formData.value.baseCurrency !== formData.value.targetCurrency
  )
})

// Validation function
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.baseCurrency) {
    errors.value.baseCurrency = 'Base currency is required'
  }

  if (!formData.value.targetCurrency) {
    errors.value.targetCurrency = 'Target currency is required'
  }

  if (formData.value.baseCurrency === formData.value.targetCurrency) {
    errors.value.targetCurrency = 'Target currency must be different from base currency'
  }

  if (!formData.value.transactionDate) {
    errors.value.transactionDate = 'Transaction date is required'
  }

  if (!formData.value.postingDate) {
    errors.value.postingDate = 'Posting date is required'
  }

  if (!formData.value.originalAmount || formData.value.originalAmount <= 0) {
    errors.value.originalAmount = 'Original amount must be greater than 0'
  }

  if (!formData.value.originalRate || formData.value.originalRate <= 0) {
    errors.value.originalRate = 'Original rate must be greater than 0'
  }

  if (!formData.value.currentRate || formData.value.currentRate <= 0) {
    errors.value.currentRate = 'Current rate must be greater than 0'
  }

  if (!formData.value.transactionType) {
    errors.value.transactionType = 'Transaction type is required'
  }

  if (!formData.value.documentNumber) {
    errors.value.documentNumber = 'Document number is required'
  }

  if (!formData.value.documentType) {
    errors.value.documentType = 'Document type is required'
  }

  if (!formData.value.businessPartner) {
    errors.value.businessPartner = 'Business partner is required'
  }

  if (!formData.value.account) {
    errors.value.account = 'Account is required'
  }

  return Object.keys(errors.value).length === 0
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    emit('submit', { ...formData.value })
  } catch (error) {
    console.error('Form submission error:', error)
  }
}

// Initialize form with initial data
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      baseCurrency: props.initialData.baseCurrency,
      targetCurrency: props.initialData.targetCurrency,
      transactionDate: props.initialData.transactionDate,
      postingDate: props.initialData.postingDate,
      originalAmount: props.initialData.originalAmount,
      originalRate: props.initialData.originalRate,
      currentRate: props.initialData.currentRate,
      transactionType: props.initialData.transactionType,
      documentNumber: props.initialData.documentNumber,
      documentType: props.initialData.documentType,
      businessPartner: props.initialData.businessPartner,
      account: props.initialData.account,
      notes: props.initialData.notes || '',
    }
  } else {
    // Set default values for new difference
    const today = new Date().toISOString().split('T')[0]
    formData.value.transactionDate = today
    formData.value.postingDate = today
  }
}

// Watch for initial data changes
watch(
  () => props.initialData,
  () => {
    initializeForm()
  },
  { immediate: true },
)

// Initialize form on mount
onMounted(() => {
  initializeForm()
})
</script>
