<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ isEditing ? 'Edit Report' : 'Create Report' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
          <!-- Report Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Report Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Report Name -->
              <div class="md:col-span-2">
                <label for="reportName" class="block text-sm font-medium text-gray-700 mb-1">
                  Report Name *
                </label>
                <input
                  id="reportName"
                  v-model="formData.reportName"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter report name"
                />
              </div>

              <!-- Report Type -->
              <div>
                <label for="reportType" class="block text-sm font-medium text-gray-700 mb-1">
                  Report Type *
                </label>
                <select
                  id="reportType"
                  v-model="formData.reportType"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="inventory_summary">Inventory Summary</option>
                  <option value="stock_movement">Stock Movement</option>
                  <option value="valuation_report">Valuation Report</option>
                  <option value="aging_analysis">Aging Analysis</option>
                  <option value="abc_analysis">ABC Analysis</option>
                  <option value="turnover_analysis">Turnover Analysis</option>
                  <option value="cost_analysis">Cost Analysis</option>
                  <option value="warehouse_utilization">Warehouse Utilization</option>
                  <option value="item_performance">Item Performance</option>
                  <option value="custom_report">Custom Report</option>
                </select>
              </div>

              <!-- Category -->
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  id="category"
                  v-model="formData.category"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="operational">Operational</option>
                  <option value="financial">Financial</option>
                  <option value="analytical">Analytical</option>
                  <option value="compliance">Compliance</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <!-- Format -->
              <div>
                <label for="format" class="block text-sm font-medium text-gray-700 mb-1">
                  Format *
                </label>
                <select
                  id="format"
                  v-model="formData.format"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="html">HTML</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <!-- Frequency -->
              <div>
                <label for="frequency" class="block text-sm font-medium text-gray-700 mb-1">
                  Frequency *
                </label>
                <select
                  id="frequency"
                  v-model="formData.frequency"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <!-- Description -->
              <div class="md:col-span-3">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter report description"
                />
              </div>
            </div>
          </div>

          <!-- Date Range -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Date Range</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Start Date -->
              <div>
                <label for="startDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  id="startDate"
                  :value="formatDateForInput(formData.dateRange.startDate)"
                  @input="handleDateInput($event, 'startDate')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- End Date -->
              <div>
                <label for="endDate" class="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  id="endDate"
                  :value="formatDateForInput(formData.dateRange.endDate)"
                  @input="handleDateInput($event, 'endDate')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Filters</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Warehouse Code -->
              <div>
                <label for="warehouseCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Warehouse Code
                </label>
                <input
                  id="warehouseCode"
                  v-model="formData.warehouseCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter warehouse code"
                />
              </div>

              <!-- Location Code -->
              <div>
                <label for="locationCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Location Code
                </label>
                <input
                  id="locationCode"
                  v-model="formData.locationCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter location code"
                />
              </div>

              <!-- Item Group -->
              <div>
                <label for="itemGroup" class="block text-sm font-medium text-gray-700 mb-1">
                  Item Group
                </label>
                <input
                  id="itemGroup"
                  v-model="formData.itemGroup"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter item group"
                />
              </div>

              <!-- Item Category -->
              <div>
                <label for="itemCategory" class="block text-sm font-medium text-gray-700 mb-1">
                  Item Category
                </label>
                <input
                  id="itemCategory"
                  v-model="formData.itemCategory"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter item category"
                />
              </div>
            </div>
          </div>

          <!-- Schedule Settings -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Schedule Settings</h3>

            <div class="space-y-4">
              <!-- Is Public -->
              <div class="flex items-center">
                <input
                  id="isPublic"
                  v-model="formData.isPublic"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="isPublic" class="ml-2 block text-sm text-gray-900">
                  Make this report public
                </label>
              </div>

              <!-- Is Scheduled -->
              <div class="flex items-center">
                <input
                  id="isScheduled"
                  v-model="formData.isScheduled"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="isScheduled" class="ml-2 block text-sm text-gray-900">
                  Schedule this report
                </label>
              </div>

              <!-- Scheduled Date -->
              <div v-if="formData.isScheduled">
                <label for="scheduledDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Scheduled Date
                </label>
                <input
                  id="scheduledDate"
                  :value="formatDateForInput(formData.scheduledDate || new Date())"
                  @input="handleDateInput($event, 'scheduledDate')"
                  type="datetime-local"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Recipients -->
              <div>
                <label for="recipients" class="block text-sm font-medium text-gray-700 mb-1">
                  Recipients (comma-separated email addresses)
                </label>
                <input
                  id="recipients"
                  v-model="recipientsText"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter email addresses separated by commas"
                />
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isEditing ? 'Update' : 'Create' }} Report
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ReportType, ReportFormat, ReportFrequency, ReportCategory } from '../types'
import type { InventoryReport, ReportFormData } from '../types'

// Props
interface Props {
  item?: InventoryReport | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: ReportFormData]
}>()

// Reactive data
const formData = ref<ReportFormData>({
  reportName: '',
  reportType: ReportType.INVENTORY_SUMMARY,
  category: ReportCategory.OPERATIONAL,
  description: '',
  format: ReportFormat.PDF,
  frequency: ReportFrequency.ONCE,
  dateRange: {
    startDate: new Date(),
    endDate: new Date(),
  },
  filters: {},
  isPublic: false,
  isScheduled: false,
  recipients: [],
})

const recipientsText = ref('')

// Computed
const isEditing = computed(() => !!props.item)

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.reportName &&
    formData.value.dateRange.startDate <= formData.value.dateRange.endDate
  )
})

// Methods
const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

const handleDateInput = (event: Event, field: 'startDate' | 'endDate' | 'scheduledDate') => {
  const target = event.target as HTMLInputElement
  if (field === 'startDate') {
    formData.value.dateRange.startDate = new Date(target.value)
  } else if (field === 'endDate') {
    formData.value.dateRange.endDate = new Date(target.value)
  } else if (field === 'scheduledDate') {
    formData.value.scheduledDate = new Date(target.value)
  }
}

const handleSubmit = () => {
  if (isFormValid.value) {
    // Convert recipients text to array
    formData.value.recipients = recipientsText.value
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    emit('submit', formData.value)
  }
}

// Watch for item changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formData.value = {
        reportName: newItem.reportName,
        reportType: newItem.reportType,
        category: newItem.category,
        description: newItem.description || '',
        format: newItem.format,
        frequency: newItem.frequency,
        dateRange: {
          startDate: newItem.dateRange.startDate,
          endDate: newItem.dateRange.endDate,
        },
        warehouseCode: newItem.warehouseCode,
        locationCode: newItem.locationCode,
        itemGroup: newItem.itemGroup,
        itemCategory: newItem.itemCategory,
        filters: newItem.filters,
        isPublic: newItem.isPublic,
        isScheduled: newItem.isScheduled,
        recipients: newItem.recipients,
        scheduledDate: newItem.scheduledDate,
      }
      recipientsText.value = newItem.recipients.join(', ')
    } else {
      // Reset form for new item
      formData.value = {
        reportName: '',
        reportType: ReportType.INVENTORY_SUMMARY,
        category: ReportCategory.OPERATIONAL,
        description: '',
        format: ReportFormat.PDF,
        frequency: ReportFrequency.ONCE,
        dateRange: {
          startDate: new Date(),
          endDate: new Date(),
        },
        filters: {},
        isPublic: false,
        isScheduled: false,
        recipients: [],
      }
      recipientsText.value = ''
    }
  },
  { immediate: true },
)
</script>
