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

    <!-- Rate Information -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="rate" class="block text-sm font-medium text-gray-700 mb-1">
          Exchange Rate *
        </label>
        <input
          id="rate"
          v-model.number="formData.rate"
          type="number"
          step="0.0001"
          min="0"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.rate }"
          placeholder="0.0000"
        />
        <p v-if="errors.rate" class="mt-1 text-sm text-red-600">{{ errors.rate }}</p>
      </div>

      <div>
        <label for="rateType" class="block text-sm font-medium text-gray-700 mb-1">
          Rate Type *
        </label>
        <select
          id="rateType"
          v-model="formData.rateType"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.rateType }"
        >
          <option value="">Select Rate Type</option>
          <option v-for="type in rateTypes" :key="type" :value="type">
            {{ formatRateType(type) }}
          </option>
        </select>
        <p v-if="errors.rateType" class="mt-1 text-sm text-red-600">{{ errors.rateType }}</p>
      </div>

      <div>
        <label for="source" class="block text-sm font-medium text-gray-700 mb-1">
          Source *
        </label>
        <input
          id="source"
          v-model="formData.source"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.source }"
          placeholder="e.g., ECB, Federal Reserve"
        />
        <p v-if="errors.source" class="mt-1 text-sm text-red-600">{{ errors.source }}</p>
      </div>
    </div>

    <!-- Date Range -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="effectiveDate" class="block text-sm font-medium text-gray-700 mb-1">
          Effective Date *
        </label>
        <input
          id="effectiveDate"
          v-model="formData.effectiveDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.effectiveDate }"
        />
        <p v-if="errors.effectiveDate" class="mt-1 text-sm text-red-600">
          {{ errors.effectiveDate }}
        </p>
      </div>

      <div>
        <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">
          Expiry Date
        </label>
        <input
          id="expiryDate"
          v-model="formData.expiryDate"
          type="date"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.expiryDate }"
        />
        <p v-if="errors.expiryDate" class="mt-1 text-sm text-red-600">{{ errors.expiryDate }}</p>
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
import type { ExchangeRate, ExchangeRateFormData, Currency } from '../types'
import { ExchangeRateType, CurrencyCode } from '../types'

// Props
interface Props {
  initialData?: ExchangeRate
  loading?: boolean
  currencies?: Currency[]
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  currencies: () => [],
})

// Emits
const emit = defineEmits<{
  submit: [data: ExchangeRateFormData]
  cancel: []
}>()

// Form data
const formData = ref<ExchangeRateFormData>({
  baseCurrency: CurrencyCode.USD,
  targetCurrency: CurrencyCode.EUR,
  rate: 0,
  rateType: ExchangeRateType.SPOT,
  effectiveDate: '',
  expiryDate: '',
  source: '',
  notes: '',
})

// Validation errors
const errors = ref<Partial<Record<keyof ExchangeRateFormData, string>>>({})

// Available rate types
const rateTypes = computed(() => Object.values(ExchangeRateType))

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.baseCurrency &&
    formData.value.targetCurrency &&
    formData.value.rate > 0 &&
    formData.value.rateType &&
    formData.value.effectiveDate &&
    formData.value.source &&
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

  if (!formData.value.rate || formData.value.rate <= 0) {
    errors.value.rate = 'Exchange rate must be greater than 0'
  }

  if (!formData.value.rateType) {
    errors.value.rateType = 'Rate type is required'
  }

  if (!formData.value.effectiveDate) {
    errors.value.effectiveDate = 'Effective date is required'
  }

  if (formData.value.expiryDate && formData.value.expiryDate <= formData.value.effectiveDate) {
    errors.value.expiryDate = 'Expiry date must be after effective date'
  }

  if (!formData.value.source) {
    errors.value.source = 'Source is required'
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

// Format rate type for display
const formatRateType = (type: ExchangeRateType): string => {
  switch (type) {
    case ExchangeRateType.SPOT:
      return 'Spot'
    case ExchangeRateType.FORWARD:
      return 'Forward'
    case ExchangeRateType.HISTORICAL:
      return 'Historical'
    case ExchangeRateType.AVERAGE:
      return 'Average'
    default:
      return type
  }
}

// Initialize form with initial data
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      baseCurrency: props.initialData.baseCurrency,
      targetCurrency: props.initialData.targetCurrency,
      rate: props.initialData.rate,
      rateType: props.initialData.rateType,
      effectiveDate: props.initialData.effectiveDate,
      expiryDate: props.initialData.expiryDate || '',
      source: props.initialData.source,
      notes: props.initialData.notes || '',
    }
  } else {
    // Set default values for new rate
    formData.value.effectiveDate = new Date().toISOString().split('T')[0]
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
