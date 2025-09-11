<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Sales Report Configuration</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Report Name -->
        <div class="col-span-full">
          <label class="block text-sm font-medium text-gray-700 mb-2"> Report Name * </label>
          <input
            v-model="formData.name"
            type="text"
            placeholder="Enter report name..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Report Type -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Report Type * </label>
          <select
            v-model="formData.type"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select report type</option>
            <option v-for="type in Object.values(ReportType)" :key="type" :value="type">
              {{ formatReportType(type) }}
            </option>
          </select>
        </div>

        <!-- Report Period -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Report Period * </label>
          <select
            v-model="formData.period"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select period</option>
            <option v-for="period in Object.values(ReportPeriod)" :key="period" :value="period">
              {{ formatReportPeriod(period) }}
            </option>
          </select>
        </div>

        <!-- Date From -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Date From * </label>
          <input
            v-model="formData.dateFrom"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Date To -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Date To * </label>
          <input
            v-model="formData.dateTo"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <!-- Output Format -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2"> Output Format * </label>
          <select
            v-model="formData.format"
            class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select format</option>
            <option v-for="format in Object.values(ReportFormat)" :key="format" :value="format">
              {{ format }}
            </option>
          </select>
        </div>
      </div>

      <!-- Report Parameters -->
      <div class="border-t border-gray-200 pt-6">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Report Parameters</h4>

        <!-- Dynamic Parameters based on Report Type -->
        <div class="space-y-4">
          <!-- Sales Analysis Parameters -->
          <div
            v-if="formData.type === ReportType.SALES_ANALYSIS"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Customer Details</label
              >
              <input
                v-model="formData.parameters.includeCustomerDetails"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Product Details</label
              >
              <input
                v-model="formData.parameters.includeProductDetails"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Group By</label>
              <select
                v-model="formData.parameters.groupBy"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="customer">Customer</option>
                <option value="product">Product</option>
                <option value="region">Region</option>
                <option value="salesperson">Sales Person</option>
                <option value="month">Month</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                v-model="formData.parameters.sortBy"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="amount">Amount</option>
                <option value="quantity">Quantity</option>
                <option value="date">Date</option>
                <option value="customer">Customer</option>
              </select>
            </div>
          </div>

          <!-- Customer Performance Parameters -->
          <div
            v-if="formData.type === ReportType.CUSTOMER_PERFORMANCE"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Customer Segment</label>
              <select
                v-model="formData.parameters.customerSegment"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Segments</option>
                <option value="enterprise">Enterprise</option>
                <option value="midmarket">Mid-Market</option>
                <option value="small">Small Business</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Credit History</label
              >
              <input
                v-model="formData.parameters.includeCreditHistory"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Payment Terms</label
              >
              <input
                v-model="formData.parameters.includePaymentTerms"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Min Order Value</label>
              <input
                v-model.number="formData.parameters.minOrderValue"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Product Performance Parameters -->
          <div
            v-if="formData.type === ReportType.PRODUCT_PERFORMANCE"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
              <select
                v-model="formData.parameters.productCategory"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="home">Home & Garden</option>
                <option value="sports">Sports & Outdoors</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Inventory Levels</label
              >
              <input
                v-model="formData.parameters.includeInventoryLevels"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Profit Margins</label
              >
              <input
                v-model="formData.parameters.includeProfitMargins"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Min Sales Quantity</label>
              <input
                v-model.number="formData.parameters.minSalesQuantity"
                type="number"
                min="0"
                placeholder="0"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Sales Person Performance Parameters -->
          <div
            v-if="formData.type === ReportType.SALES_PERSON_PERFORMANCE"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Team</label>
              <select
                v-model="formData.parameters.salesTeam"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Teams</option>
                <option value="north">North Region</option>
                <option value="south">South Region</option>
                <option value="east">East Region</option>
                <option value="west">West Region</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Quota Comparison</label
              >
              <input
                v-model="formData.parameters.includeQuotaComparison"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Commission Data</label
              >
              <input
                v-model="formData.parameters.includeCommissionData"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Performance Threshold</label
              >
              <input
                v-model.number="formData.parameters.performanceThreshold"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Regional Analysis Parameters -->
          <div
            v-if="formData.type === ReportType.REGIONAL_ANALYSIS"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Country Data</label
              >
              <input
                v-model="formData.parameters.includeCountryData"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Include City Data</label>
              <input
                v-model="formData.parameters.includeCityData"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Map Visualization</label>
              <input
                v-model="formData.parameters.includeMapVisualization"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Regional Comparison</label
              >
              <select
                v-model="formData.parameters.regionalComparison"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">No Comparison</option>
                <option value="previous_period">Previous Period</option>
                <option value="same_period_last_year">Same Period Last Year</option>
                <option value="budget">Budget vs Actual</option>
              </select>
            </div>
          </div>

          <!-- Trend Analysis Parameters -->
          <div
            v-if="formData.type === ReportType.TREND_ANALYSIS"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Trend Period</label>
              <select
                v-model="formData.parameters.trendPeriod"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Include Forecast</label>
              <input
                v-model="formData.parameters.includeForecast"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Forecast Periods</label>
              <input
                v-model.number="formData.parameters.forecastPeriods"
                type="number"
                min="1"
                max="12"
                placeholder="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Include Seasonality</label
              >
              <input
                v-model="formData.parameters.includeSeasonality"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Advanced Options -->
      <div class="border-t border-gray-200 pt-6">
        <h4 class="text-lg font-medium text-gray-900 mb-4">Advanced Options</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Schedule Report -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Schedule Report</label>
            <input
              v-model="scheduleReport"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-600"
              >Automatically generate this report on a schedule</span
            >
          </div>

          <!-- Schedule Details -->
          <div v-if="scheduleReport">
            <label class="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
            <select
              v-model="scheduleDetails"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>

          <!-- Save as Template -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Save as Template</label>
            <input
              v-model="saveAsTemplate"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-600">Save this configuration for future use</span>
          </div>

          <!-- Template Name -->
          <div v-if="saveAsTemplate">
            <label class="block text-sm font-medium text-gray-700 mb-2">Template Name</label>
            <input
              v-model="templateName"
              type="text"
              placeholder="Enter template name..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          @click="$emit('cancel')"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading || !isValid"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="loading" class="inline-flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isEditing ? 'Updating...' : 'Creating...' }}
          </span>
          <span v-else>{{ isEditing ? 'Update Report' : 'Create Report' }}</span>
        </button>
      </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ReportType, ReportPeriod, ReportFormat } from '../types'
import type { SalesReportRequest } from '../types'

interface Props {
  initialData?: SalesReportRequest
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: SalesReportRequest): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<SalesReportRequest>({
  name: '',
  type: ReportType.SALES_ANALYSIS,
  period: ReportPeriod.MONTHLY,
  dateFrom: '',
  dateTo: '',
  format: ReportFormat.PDF,
  parameters: {},
})

// Advanced options
const scheduleReport = ref(false)
const scheduleDetails = ref('monthly')
const saveAsTemplate = ref(false)
const templateName = ref('')

// Computed properties
const isEditing = computed(() => !!props.initialData)

const isValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.type &&
    formData.value.period &&
    formData.value.dateFrom &&
    formData.value.dateTo &&
    formData.value.format
  )
})

// Methods
const handleSubmit = () => {
  if (!isValid.value) return

  const submitData: SalesReportRequest = {
    ...formData.value,
    parameters: {
      ...formData.value.parameters,
      schedule: scheduleReport.value ? scheduleDetails.value : undefined,
      template: saveAsTemplate.value ? templateName.value : undefined,
    },
  }

  emit('submit', submitData)
}

const formatReportType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReportPeriod = (period: string) => {
  return period.charAt(0).toUpperCase() + period.slice(1).toLowerCase()
}

// Initialize default parameters based on report type
const initializeParameters = (type: ReportType) => {
  const defaultParams: Record<string, any> = {}

  switch (type) {
    case ReportType.SALES_ANALYSIS:
      defaultParams.includeCustomerDetails = true
      defaultParams.includeProductDetails = true
      defaultParams.groupBy = 'customer'
      defaultParams.sortBy = 'amount'
      break
    case ReportType.CUSTOMER_PERFORMANCE:
      defaultParams.customerSegment = ''
      defaultParams.includeCreditHistory = false
      defaultParams.includePaymentTerms = true
      defaultParams.minOrderValue = 0
      break
    case ReportType.PRODUCT_PERFORMANCE:
      defaultParams.productCategory = ''
      defaultParams.includeInventoryLevels = true
      defaultParams.includeProfitMargins = true
      defaultParams.minSalesQuantity = 0
      break
    case ReportType.SALES_PERSON_PERFORMANCE:
      defaultParams.salesTeam = ''
      defaultParams.includeQuotaComparison = true
      defaultParams.includeCommissionData = true
      defaultParams.performanceThreshold = 0
      break
    case ReportType.REGIONAL_ANALYSIS:
      defaultParams.includeCountryData = true
      defaultParams.includeCityData = false
      defaultParams.includeMapVisualization = true
      defaultParams.regionalComparison = ''
      break
    case ReportType.TREND_ANALYSIS:
      defaultParams.trendPeriod = 'monthly'
      defaultParams.includeForecast = true
      defaultParams.forecastPeriods = 3
      defaultParams.includeSeasonality = true
      break
  }

  formData.value.parameters = { ...formData.value.parameters, ...defaultParams }
}

// Watch for type changes to update parameters
watch(
  () => formData.value.type,
  (newType) => {
    if (newType) {
      initializeParameters(newType)
    }
  },
)

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData }
      if (newData.parameters?.schedule) {
        scheduleReport.value = true
        scheduleDetails.value = newData.parameters.schedule
      }
      if (newData.parameters?.template) {
        saveAsTemplate.value = true
        templateName.value = newData.parameters.template
      }
    }
  },
  { immediate: true },
)

// Initialize form
onMounted(() => {
  if (!props.initialData) {
    // Set default dates
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)

    formData.value.dateFrom = firstDay.toISOString().split('T')[0]
    formData.value.dateTo = lastDay.toISOString().split('T')[0]

    // Initialize default parameters
    initializeParameters(formData.value.type)
  }
})
</script>
