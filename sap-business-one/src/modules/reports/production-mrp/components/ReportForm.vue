<template>
  <div class="production-mrp-report-form">
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
            <option value="PRODUCTION_ORDERS">Production Orders Report</option>
            <option value="MRP_RECOMMENDATIONS">MRP Recommendations</option>
            <option value="CAPACITY_PLANNING">Capacity Planning Report</option>
            <option value="MATERIAL_REQUIREMENTS">Material Requirements</option>
            <option value="PRODUCTION_SCHEDULE">Production Schedule</option>
            <option value="WORK_CENTER_UTILIZATION">Work Center Utilization</option>
            <option value="BOM_ANALYSIS">BOM Analysis Report</option>
            <option value="SHORTAGE_REPORT">Material Shortage Report</option>
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
          <!-- Work Center Filter -->
          <div>
            <label for="workCenter" class="block text-sm font-medium text-gray-700 mb-2">
              Work Center
            </label>
            <select
              id="workCenter"
              v-model="formData.filters.workCenter"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Work Centers</option>
              <option value="WC001">Assembly Line 1</option>
              <option value="WC002">Assembly Line 2</option>
              <option value="WC003">Packaging Center</option>
              <option value="WC004">Quality Control</option>
            </select>
          </div>

          <!-- Product Line Filter -->
          <div>
            <label for="productLine" class="block text-sm font-medium text-gray-700 mb-2">
              Product Line
            </label>
            <select
              id="productLine"
              v-model="formData.filters.productLine"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Product Lines</option>
              <option value="PL001">Electronics</option>
              <option value="PL002">Automotive</option>
              <option value="PL003">Industrial</option>
              <option value="PL004">Consumer Goods</option>
            </select>
          </div>

          <!-- Order Status Filter -->
          <div>
            <label for="orderStatus" class="block text-sm font-medium text-gray-700 mb-2">
              Order Status
            </label>
            <select
              id="orderStatus"
              v-model="formData.filters.orderStatus"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Status</option>
              <option value="PLANNED">Planned</option>
              <option value="RELEASED">Released</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CLOSED">Closed</option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              id="priority"
              v-model="formData.filters.priority"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <!-- Planning Method -->
          <div v-if="formData.type === 'MRP_RECOMMENDATIONS'">
            <label for="planningMethod" class="block text-sm font-medium text-gray-700 mb-2">
              Planning Method
            </label>
            <select
              id="planningMethod"
              v-model="formData.filters.planningMethod"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Methods</option>
              <option value="MRP">Material Requirements Planning</option>
              <option value="EOQ">Economic Order Quantity</option>
              <option value="REORDER_POINT">Reorder Point</option>
            </select>
          </div>
        </div>

        <!-- Additional Options -->
        <div class="mt-4 space-y-3">
          <div class="flex items-center">
            <input
              id="includeSubItems"
              v-model="formData.filters.includeSubItems"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="includeSubItems" class="ml-2 block text-sm text-gray-700">
              Include sub-assemblies and components
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="showCapacityDetails"
              v-model="formData.filters.showCapacityDetails"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="showCapacityDetails" class="ml-2 block text-sm text-gray-700">
              Show capacity utilization details
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="includeCosts"
              v-model="formData.filters.includeCosts"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="includeCosts" class="ml-2 block text-sm text-gray-700">
              Include cost information
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="groupByResource"
              v-model="formData.filters.groupByResource"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="groupByResource" class="ml-2 block text-sm text-gray-700">
              Group by resource/work center
            </label>
          </div>
        </div>
      </div>

      <!-- Currency and Format -->
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

interface ProductionMRPReportFormData {
  name: string
  description?: string
  type: string
  dateFrom: string
  dateTo: string
  currency: string
  format: string
  filters: {
    workCenter?: string
    productLine?: string
    orderStatus?: string
    priority?: string
    planningMethod?: string
    includeSubItems: boolean
    showCapacityDetails: boolean
    includeCosts: boolean
    groupByResource: boolean
  }
}

interface Props {
  report?: any
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ProductionMRPReportFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<ProductionMRPReportFormData>({
  name: '',
  description: '',
  type: '',
  dateFrom: '',
  dateTo: '',
  currency: 'USD',
  format: 'PDF',
  filters: {
    workCenter: '',
    productLine: '',
    orderStatus: '',
    priority: '',
    planningMethod: '',
    includeSubItems: true,
    showCapacityDetails: false,
    includeCosts: true,
    groupByResource: false
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
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
    
    formData.value.dateFrom = today.toISOString().split('T')[0]
    formData.value.dateTo = nextMonth.toISOString().split('T')[0]
  }
}

// Lifecycle
onMounted(() => {
  initializeForm()
})
</script>

<style scoped>
.production-mrp-report-form {
  max-width: 100%;
}
</style>