<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="code" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Center Code *
        </label>
        <input
          id="code"
          v-model="formData.code"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.code }"
          placeholder="e.g., CC001"
        />
        <p v-if="errors.code" class="mt-1 text-sm text-red-600">{{ errors.code }}</p>
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Center Name *
        </label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.name }"
          placeholder="e.g., Production Department"
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
        placeholder="Brief description of the cost center"
      ></textarea>
    </div>

    <!-- Type and Status -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Center Type *
        </label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.type }"
        >
          <option value="">Select Type</option>
          <option v-for="type in costCenterTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
      </div>

      <div>
        <label for="status" class="block text-sm font-medium text-gray-700 mb-1"> Status * </label>
        <select
          id="status"
          v-model="formData.status"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.status }"
        >
          <option value="">Select Status</option>
          <option v-for="status in costCenterStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
        <p v-if="errors.status" class="mt-1 text-sm text-red-600">{{ errors.status }}</p>
      </div>
    </div>

    <!-- Parent Cost Center -->
    <div>
      <label for="parentId" class="block text-sm font-medium text-gray-700 mb-1">
        Parent Cost Center
      </label>
      <select
        id="parentId"
        v-model="formData.parentId"
        class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
      >
        <option value="">No Parent (Top Level)</option>
        <option v-for="parent in availableParentCostCenters" :key="parent.id" :value="parent.id">
          {{ parent.code }} - {{ parent.name }}
        </option>
      </select>
    </div>

    <!-- Manager and Department -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="manager" class="block text-sm font-medium text-gray-700 mb-1"> Manager </label>
        <input
          id="manager"
          v-model="formData.manager"
          type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="e.g., John Doe"
        />
      </div>

      <div>
        <label for="department" class="block text-sm font-medium text-gray-700 mb-1">
          Department
        </label>
        <input
          id="department"
          v-model="formData.department"
          type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="e.g., Manufacturing"
        />
      </div>
    </div>

    <!-- Location and Currency -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="location" class="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          id="location"
          v-model="formData.location"
          type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="e.g., Building A, Floor 2"
        />
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
        </select>
        <p v-if="errors.currency" class="mt-1 text-sm text-red-600">{{ errors.currency }}</p>
      </div>
    </div>

    <!-- Budget Amount -->
    <div>
      <label for="budgetAmount" class="block text-sm font-medium text-gray-700 mb-1">
        Budget Amount *
      </label>
      <div class="relative">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          {{ formData.currency || '$' }}
        </span>
        <input
          id="budgetAmount"
          v-model.number="formData.budgetAmount"
          type="number"
          step="0.01"
          min="0"
          required
          class="block w-full pl-10 pr-3 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :class="{ 'border-red-500': errors.budgetAmount }"
          placeholder="0.00"
        />
      </div>
      <p v-if="errors.budgetAmount" class="mt-1 text-sm text-red-600">{{ errors.budgetAmount }}</p>
    </div>

    <!-- Allocation Method and Cost Driver -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="allocationMethod" class="block text-sm font-medium text-gray-700 mb-1">
          Allocation Method
        </label>
        <select
          id="allocationMethod"
          v-model="formData.allocationMethod"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select Method</option>
          <option v-for="method in allocationMethods" :key="method" :value="method">
            {{ method }}
          </option>
        </select>
      </div>

      <div>
        <label for="costDriver" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Driver
        </label>
        <select
          id="costDriver"
          v-model="formData.costDriver"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="">Select Cost Driver</option>
          <option v-for="driver in costDriverTypes" :key="driver" :value="driver">
            {{ driver }}
          </option>
        </select>
      </div>
    </div>

    <!-- Cost Driver Value and Unit -->
    <div v-if="formData.costDriver" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label for="costDriverValue" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Driver Value
        </label>
        <input
          id="costDriverValue"
          v-model.number="formData.costDriverValue"
          type="number"
          step="0.01"
          min="0"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="0.00"
        />
      </div>

      <div>
        <label for="costDriverUnit" class="block text-sm font-medium text-gray-700 mb-1">
          Cost Driver Unit
        </label>
        <input
          id="costDriverUnit"
          v-model="formData.costDriverUnit"
          type="text"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          :placeholder="getCostDriverUnitPlaceholder(formData.costDriver)"
        />
      </div>
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
import type { CostCenter, CostCenterFormData } from '../types'
import { CostCenterType, CostCenterStatus, AllocationMethod, CostDriverType } from '../types'

// Props
interface Props {
  initialData?: CostCenter
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

// Emits
const emit = defineEmits<{
  submit: [data: CostCenterFormData]
  cancel: []
}>()

// Form data
const formData = ref<CostCenterFormData>({
  code: '',
  name: '',
  description: '',
  type: CostCenterType.PRODUCTION,
  status: CostCenterStatus.ACTIVE,
  parentId: '',
  manager: '',
  department: '',
  location: '',
  currency: 'USD',
  budgetAmount: 0,
  allocationMethod: undefined,
  costDriver: undefined,
  costDriverValue: undefined,
  costDriverUnit: '',
})

// Validation errors
const errors = ref<Partial<Record<keyof CostCenterFormData, string>>>({})

// Available parent cost centers (mock data for now)
const availableParentCostCenters = ref<Array<{ id: string; code: string; name: string }>>([
  { id: '1', code: 'CC001', name: 'Production' },
  { id: '2', code: 'CC002', name: 'Administration' },
  { id: '3', code: 'CC003', name: 'Sales' },
  { id: '4', code: 'CC004', name: 'Marketing' },
  { id: '5', code: 'CC005', name: 'Research' },
])

// Enums for dropdowns
const costCenterTypes = computed(() => Object.values(CostCenterType))
const costCenterStatuses = computed(() => Object.values(CostCenterStatus))
const allocationMethods = computed(() => Object.values(AllocationMethod))
const costDriverTypes = computed(() => Object.values(CostDriverType))

// Form validation
const isFormValid = computed(() => {
  return (
    formData.value.code.trim() !== '' &&
    formData.value.name.trim() !== '' &&
    formData.value.type &&
    formData.value.status &&
    formData.value.currency &&
    formData.value.budgetAmount > 0
  )
})

// Validation function
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.code.trim()) {
    errors.value.code = 'Cost center code is required'
  }

  if (!formData.value.name.trim()) {
    errors.value.name = 'Cost center name is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Cost center type is required'
  }

  if (!formData.value.status) {
    errors.value.status = 'Status is required'
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
  }

  if (!formData.value.budgetAmount || formData.value.budgetAmount <= 0) {
    errors.value.budgetAmount = 'Budget amount must be greater than 0'
  }

  // Validate cost driver value if cost driver is selected
  if (formData.value.costDriver && formData.value.costDriverValue !== undefined) {
    if (formData.value.costDriverValue <= 0) {
      errors.value.costDriverValue = 'Cost driver value must be greater than 0'
    }
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

// Get cost driver unit placeholder
const getCostDriverUnitPlaceholder = (costDriver?: CostDriverType): string => {
  switch (costDriver) {
    case CostDriverType.LABOR_HOURS:
      return 'hours'
    case CostDriverType.MACHINE_HOURS:
      return 'hours'
    case CostDriverType.SQUARE_FEET:
      return 'sq ft'
    case CostDriverType.HEADCOUNT:
      return 'people'
    case CostDriverType.VOLUME:
      return 'cubic units'
    case CostDriverType.WEIGHT:
      return 'lbs'
    case CostDriverType.DISTANCE:
      return 'miles'
    case CostDriverType.TRANSACTIONS:
      return 'transactions'
    default:
      return 'units'
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
      status: props.initialData.status,
      parentId: props.initialData.parentId || '',
      manager: props.initialData.manager || '',
      department: props.initialData.department || '',
      location: props.initialData.location || '',
      currency: props.initialData.currency,
      budgetAmount: props.initialData.budgetAmount,
      allocationMethod: props.initialData.allocationMethod,
      costDriver: props.initialData.costDriver,
      costDriverValue: props.initialData.costDriverValue,
      costDriverUnit: props.initialData.costDriverUnit || '',
    }
  }
}

// Watch for initial data changes
watch(() => props.initialData, initializeForm, { immediate: true })

// Load available parent cost centers on mount
onMounted(async () => {
  try {
    // In a real app, you'd fetch parent cost centers from the API
    // const parentCenters = await costCentersApi.getCostCenters()
    // availableParentCostCenters.value = parentCenters.data
  } catch (error) {
    console.error('Failed to load parent cost centers:', error)
  }
})
</script>
