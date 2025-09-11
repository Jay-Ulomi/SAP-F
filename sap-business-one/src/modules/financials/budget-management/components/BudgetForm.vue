<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="code" class="block text-sm font-medium text-gray-700 mb-1">
          Budget Code *
        </label>
        <input
          id="code"
          v-model="formData.code"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.code }"
          placeholder="e.g., BUD-2024-001"
        />
        <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Budget Name *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.name }"
          placeholder="e.g., Annual Budget 2024"
        />
        <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
      </div>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
        Description
      </label>
      <textarea
        id="description"
        v-model="formData.description"
        rows="3"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        placeholder="Provide a detailed description of this budget..."
      ></textarea>
    </div>

    <!-- Budget Configuration -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
          Budget Type *
        </label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.type }"
        >
          <option value="">Select Type</option>
          <option v-for="type in budgetTypes" :key="type" :value="type">
            {{ formatBudgetType(type) }}
          </option>
        </select>
        <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
      </div>

      <div>
        <label for="fiscalYear" class="block text-sm font-medium text-gray-700 mb-1">
          Fiscal Year *
        </label>
        <input
          id="fiscalYear"
          v-model.number="formData.fiscalYear"
          type="number"
          required
          min="2000"
          max="2100"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.fiscalYear }"
          placeholder="2024"
        />
        <p v-if="errors.fiscalYear" class="mt-1 text-sm text-red-600">{{ errors.fiscalYear }}</p>
      </div>

      <div>
        <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
          Currency *
        </label>
        <select
          id="currency"
          v-model="formData.currency"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.currency }"
        >
          <option value="">Select Currency</option>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CHF">CHF - Swiss Franc</option>
          <option value="CNY">CNY - Chinese Yuan</option>
        </select>
        <p v-if="errors.currency" class="mt-1 text-sm text-red-600">{{ errors.currency }}</p>
      </div>
    </div>

    <!-- Date Range -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
          Start Date *
        </label>
        <input
          id="startDate"
          v-model="formData.startDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.startDate }"
        />
        <p v-if="errors.startDate" class="mt-1 text-sm text-red-600">{{ errors.startDate }}</p>
      </div>

      <div>
        <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
          End Date *
        </label>
        <input
          id="endDate"
          v-model="formData.endDate"
          type="date"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.endDate }"
        />
        <p v-if="errors.endDate" class="mt-1 text-sm text-red-600">{{ errors.endDate }}</p>
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
import type { Budget, BudgetFormData } from '../types'
import { BudgetType } from '../types'

// Props
interface Props {
  initialData?: Budget
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Emits
const emit = defineEmits<{
  submit: [data: BudgetFormData]
  cancel: []
}>()

// Form data
const formData = ref<BudgetFormData>({
  code: '',
  name: '',
  description: '',
  type: BudgetType.ANNUAL,
  fiscalYear: new Date().getFullYear(),
  startDate: '',
  endDate: '',
  currency: 'USD',
  notes: '',
})

// Validation errors
const errors = ref<Partial<Record<keyof BudgetFormData, string>>>({})

// Available budget types
const budgetTypes = computed(() => Object.values(BudgetType))

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.code.trim() !== '' &&
    formData.value.name.trim() !== '' &&
    formData.value.type &&
    formData.value.fiscalYear > 0 &&
    formData.value.startDate &&
    formData.value.endDate &&
    formData.value.currency &&
    new Date(formData.value.startDate) < new Date(formData.value.endDate)
  )
})

// Validation function
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.code.trim()) {
    errors.value.code = 'Budget code is required'
  }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Budget name is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Budget type is required'
  }

  if (
    !formData.value.fiscalYear ||
    formData.value.fiscalYear < 2000 ||
    formData.value.fiscalYear > 2100
  ) {
    errors.value.fiscalYear = 'Valid fiscal year is required (2000-2100)'
  }

  if (!formData.value.startDate) {
    errors.value.startDate = 'Start date is required'
  }

  if (!formData.value.endDate) {
    errors.value.endDate = 'End date is required'
  }

  if (formData.value.startDate && formData.value.endDate) {
    if (new Date(formData.value.startDate) >= new Date(formData.value.endDate)) {
      errors.value.endDate = 'End date must be after start date'
    }
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
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

// Format budget type for display
const formatBudgetType = (type: BudgetType): string => {
  switch (type) {
    case BudgetType.ANNUAL:
      return 'Annual'
    case BudgetType.QUARTERLY:
      return 'Quarterly'
    case BudgetType.MONTHLY:
      return 'Monthly'
    case BudgetType.PROJECT:
      return 'Project'
    case BudgetType.DEPARTMENT:
      return 'Department'
    case BudgetType.COST_CENTER:
      return 'Cost Center'
    default:
      return type
  }
}

// Initialize form with initial data
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      code: props.initialData.code,
      name: props.initialData.name,
      description: props.initialData.description || '',
      type: props.initialData.type,
      fiscalYear: props.initialData.fiscalYear,
      startDate: props.initialData.startDate,
      endDate: props.initialData.endDate,
      currency: props.initialData.currency,
      notes: props.initialData.notes || '',
    }
  } else {
    // Set default dates for new budget
    const currentYear = new Date().getFullYear()
    formData.value.fiscalYear = currentYear
    formData.value.startDate = `${currentYear}-01-01`
    formData.value.endDate = `${currentYear}-12-31`
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
