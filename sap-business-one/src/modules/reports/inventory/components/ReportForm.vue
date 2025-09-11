<template>
  <div class="inventory-report-form">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Report Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="reportName" class="block text-sm font-medium text-gray-700 mb-2">
            Report Name *
          </label>
          <input
            id="reportName"
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.name }"
            placeholder="Enter report name"
          />
          <div v-if="errors.name" class="mt-1 text-sm text-red-600">
            {{ errors.name }}
          </div>
        </div>

        <div>
          <label for="reportType" class="block text-sm font-medium text-gray-700 mb-2">
            Report Type *
          </label>
          <select
            id="reportType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.type }"
          >
            <option value="">Select Report Type</option>
            <option value="STOCK_STATUS">Stock Status Report</option>
            <option value="STOCK_MOVEMENT">Stock Movement Report</option>
            <option value="INVENTORY_VALUATION">Inventory Valuation</option>
            <option value="REORDER_REPORT">Reorder Report</option>
            <option value="ABC_ANALYSIS">ABC Analysis</option>
            <option value="AGING_REPORT">Aging Report</option>
          </select>
          <div v-if="errors.type" class="mt-1 text-sm text-red-600">
            {{ errors.type }}
          </div>
        </div>
      </div>

      <!-- Description -->
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="description"
          v-model="formData.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter report description"
        ></textarea>
      </div>

      <!-- Date Range -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="dateFrom" class="block text-sm font-medium text-gray-700 mb-2">
            Date From *
          </label>
          <input
            id="dateFrom"
            v-model="formData.dateFrom"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.dateFrom }"
          />
          <div v-if="errors.dateFrom" class="mt-1 text-sm text-red-600">
            {{ errors.dateFrom }}
          </div>
        </div>

        <div>
          <label for="dateTo" class="block text-sm font-medium text-gray-700 mb-2">
            Date To *
          </label>
          <input
            id="dateTo"
            v-model="formData.dateTo"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.dateTo }"
          />
          <div v-if="errors.dateTo" class="mt-1 text-sm text-red-600">
            {{ errors.dateTo }}
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h4 class="text-sm font-medium text-gray-900 mb-4">Report Filters</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Warehouse Filter -->
          <div>
            <label for="warehouse" class="block text-sm font-medium text-gray-700 mb-2">
              Warehouse
            </label>
            <select
              id="warehouse"
              v-model="formData.filters.warehouse"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Warehouses</option>
              <option value="WH001">Main Warehouse</option>
              <option value="WH002">Secondary Warehouse</option>
              <option value="WH003">Distribution Center</option>
            </select>
          </div>

          <!-- Item Group Filter -->
          <div>
            <label for="itemGroup" class="block text-sm font-medium text-gray-700 mb-2">
              Item Group
            </label>
            <select
              id="itemGroup"
              v-model="formData.filters.itemGroup"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Groups</option>
              <option value="RAW_MATERIALS">Raw Materials</option>
              <option value="FINISHED_GOODS">Finished Goods</option>
              <option value="SEMI_FINISHED">Semi-Finished</option>
              <option value="SPARE_PARTS">Spare Parts</option>
            </select>
          </div>

          <!-- Item Status Filter -->
          <div>
            <label for="itemStatus" class="block text-sm font-medium text-gray-700 mb-2">
              Item Status
            </label>
            <select
              id="itemStatus"
              v-model="formData.filters.itemStatus"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="DISCONTINUED">Discontinued</option>
            </select>
          </div>
        </div>

        <!-- Additional Options -->
        <div class="mt-4 space-y-3">
          <div class="flex items-center">
            <input
              id="includeZeroStock"
              v-model="formData.filters.includeZeroStock"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="includeZeroStock" class="ml-2 block text-sm text-gray-700">
              Include items with zero stock
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="showOnlyLowStock"
              v-model="formData.filters.showOnlyLowStock"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="showOnlyLowStock" class="ml-2 block text-sm text-gray-700">
              Show only items below reorder point
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="groupByCategory"
              v-model="formData.filters.groupByCategory"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="groupByCategory" class="ml-2 block text-sm text-gray-700">
              Group by item category
            </label>
          </div>
        </div>
      </div>

      <!-- Currency -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            id="currency"
            v-model="formData.currency"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="USD">USD - US Dollar</option>
            <option value="EUR">EUR - Euro</option>
            <option value="GBP">GBP - British Pound</option>
            <option value="JPY">JPY - Japanese Yen</option>
          </select>
        </div>

        <div>
          <label for="format" class="block text-sm font-medium text-gray-700 mb-2">
            Output Format
          </label>
          <select
            id="format"
            v-model="formData.format"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="PDF">PDF</option>
            <option value="EXCEL">Excel</option>
            <option value="CSV">CSV</option>
          </select>
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
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
            </svg>
            Generating...
          </span>
          <span v-else>{{ isEditing ? 'Update Report' : 'Generate Report' }}</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface InventoryReportFormData {
  name: string
  description?: string
  type: string
  dateFrom: string
  dateTo: string
  currency: string
  format: string
  filters: {
    warehouse?: string
    itemGroup?: string
    itemStatus?: string
    includeZeroStock: boolean
    showOnlyLowStock: boolean
    groupByCategory: boolean
  }
}

interface Props {
  report?: any
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: InventoryReportFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<InventoryReportFormData>({
  name: '',
  description: '',
  type: '',
  dateFrom: '',
  dateTo: '',
  currency: 'USD',
  format: 'PDF',
  filters: {
    warehouse: '',
    itemGroup: '',
    itemStatus: '',
    includeZeroStock: false,
    showOnlyLowStock: false,
    groupByCategory: false
  }
})

// Form validation errors
const errors = ref<Record<string, string>>({})

// Computed
const isEditing = computed(() => !!props.report)

// Methods
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Report name is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Report type is required'
  }

  if (!formData.value.dateFrom) {
    errors.value.dateFrom = 'Start date is required'
  }

  if (!formData.value.dateTo) {
    errors.value.dateTo = 'End date is required'
  }

  if (formData.value.dateFrom && formData.value.dateTo) {
    if (new Date(formData.value.dateFrom) > new Date(formData.value.dateTo)) {
      errors.value.dateTo = 'End date must be after start date'
    }
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = () => {
  if (validateForm()) {
    emit('submit', { ...formData.value })
  }
}

const initializeForm = () => {
  if (props.report) {
    Object.assign(formData.value, props.report)
  } else {
    // Set default dates
    const today = new Date()
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
    
    formData.value.dateFrom = firstOfMonth.toISOString().split('T')[0]
    formData.value.dateTo = today.toISOString().split('T')[0]
  }
}

// Lifecycle
onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.inventory-report-form {
  max-width: 100%;
}

.form-section {
  background: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}
</style>