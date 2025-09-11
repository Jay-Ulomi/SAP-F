<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-sap-blue text-sap-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Basic Configuration -->
    <div v-if="activeTab === 'basic'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Report Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter report name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Report Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select report type</option>
            <option value="OPPORTUNITY_PERFORMANCE">Opportunity Performance</option>
            <option value="PIPELINE_ANALYSIS">Pipeline Analysis</option>
            <option value="LEAD_CONVERSION">Lead Conversion</option>
            <option value="SALES_FORECAST">Sales Forecast</option>
            <option value="TEAM_PERFORMANCE">Team Performance</option>
            <option value="STAGE_ANALYSIS">Stage Analysis</option>
            <option value="WIN_LOSS_ANALYSIS">Win/Loss Analysis</option>
            <option value="REVENUE_TRACKING">Revenue Tracking</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Period</label>
          <select
            v-model="formData.period"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="DAILY">Daily</option>
            <option value="WEEKLY">Weekly</option>
            <option value="MONTHLY">Monthly</option>
            <option value="QUARTERLY">Quarterly</option>
            <option value="YEARLY">Yearly</option>
            <option value="CUSTOM">Custom Range</option>
          </select>
        </div>
        <div v-if="formData.period === 'CUSTOM'" class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              v-model="customStartDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              v-model="customEndDate"
              type="date"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="formData.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter report description"
        />
      </div>
    </div>

    <!-- Filters & Metrics -->
    <div v-if="activeTab === 'filters'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Opportunity Status</label>
          <div class="space-y-2">
            <label v-for="status in opportunityStatuses" :key="status" class="flex items-center">
              <input
                v-model="formData.filters.opportunityStatus"
                :value="status"
                type="checkbox"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-900">{{ status }}</span>
            </label>
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Lead Status</label>
          <div class="space-y-2">
            <label v-for="status in leadStatuses" :key="status" class="flex items-center">
              <input
                v-model="formData.filters.leadStatus"
                :value="status"
                type="checkbox"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
              />
              <span class="ml-2 text-sm text-gray-900">{{ status }}</span>
            </label>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
          <div class="grid grid-cols-2 gap-3">
            <input
              v-model.number="amountMin"
              type="number"
              min="0"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Min amount"
            />
            <input
              v-model.number="amountMax"
              type="number"
              min="0"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Max amount"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
          <input
            v-model="assignedToInput"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter names (comma separated)"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-3">Metrics to Include</label>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          <label v-for="metric in availableMetrics" :key="metric.key" class="flex items-center">
            <input
              v-model="formData.metrics"
              :value="metric.key"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <span class="ml-2 text-sm text-gray-900">{{ metric.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Scheduling -->
    <div v-if="activeTab === 'schedule'" class="space-y-6">
      <div class="flex items-center">
        <input
          v-model="formData.isScheduled"
          type="checkbox"
          class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
        />
        <label class="ml-2 block text-sm text-gray-900">Enable Scheduled Reports</label>
      </div>

      <div v-if="formData.isScheduled" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
            <select
              v-model="scheduleFrequency"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="DAILY">Daily</option>
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </select>
          </div>
          <div v-if="scheduleFrequency === 'WEEKLY'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
            <select
              v-model="scheduleDayOfWeek"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="1">Monday</option>
              <option value="2">Tuesday</option>
              <option value="3">Wednesday</option>
              <option value="4">Thursday</option>
              <option value="5">Friday</option>
            </select>
          </div>
          <div v-if="scheduleFrequency === 'MONTHLY'">
            <label class="block text-sm font-medium text-gray-700 mb-1">Day of Month</label>
            <input
              v-model.number="scheduleDayOfMonth"
              type="number"
              min="1"
              max="31"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
            <input
              v-model="scheduleTime"
              type="time"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
            <input
              v-model="scheduleRecipients"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter email addresses (comma separated)"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Export Format</label>
            <select
              v-model="scheduleFormat"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="PDF">PDF</option>
              <option value="EXCEL">Excel</option>
              <option value="CSV">CSV</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
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
        <span v-if="loading">Saving...</span>
        <span v-else>{{ report ? 'Update Report' : 'Create Report' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ReportConfig, ReportFormData } from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

interface Props {
  report?: ReportConfig | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { report: null, loading: false })
const emit = defineEmits<{ submit: [data: ReportFormData]; cancel: [] }>()

const tabs = [
  { id: 'basic', name: 'Basic Configuration' },
  { id: 'filters', name: 'Filters & Metrics' },
  { id: 'schedule', name: 'Scheduling' },
]

const activeTab = ref('basic')

const formData = ref<ReportFormData>({
  name: '',
  type: ReportType.OPPORTUNITY_PERFORMANCE,
  description: '',
  period: ReportPeriod.MONTHLY,
  filters: {},
  metrics: [],
  groupBy: [],
  sortBy: 'createdAt',
  sortOrder: 'DESC',
  isScheduled: false,
})

// Form helper fields
const customStartDate = ref('')
const customEndDate = ref('')
const amountMin = ref<number>()
const amountMax = ref<number>()
const assignedToInput = ref('')
const scheduleFrequency = ref('MONTHLY')
const scheduleDayOfWeek = ref(1)
const scheduleDayOfMonth = ref(1)
const scheduleTime = ref('09:00')
const scheduleRecipients = ref('')
const scheduleFormat = ref('PDF')

const opportunityStatuses = ['OPEN', 'QUALIFIED', 'WON', 'LOST']
const leadStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'CONVERTED']

const availableMetrics = [
  { key: 'totalOpportunities', label: 'Total Opportunities' },
  { key: 'totalValue', label: 'Total Value' },
  { key: 'averageValue', label: 'Average Value' },
  { key: 'winRate', label: 'Win Rate' },
  { key: 'averageSalesCycle', label: 'Average Sales Cycle' },
  { key: 'conversionRate', label: 'Conversion Rate' },
  { key: 'pipelineVelocity', label: 'Pipeline Velocity' },
  { key: 'forecastAccuracy', label: 'Forecast Accuracy' },
]

const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.type &&
    formData.value.metrics.length > 0 &&
    (formData.value.period !== ReportPeriod.CUSTOM ||
      (customStartDate.value && customEndDate.value))
  )
})

const handleSubmit = () => {
  if (!isFormValid.value) return

  // Prepare form data
  const submitData = { ...formData.value }

  // Handle custom date range
  if (
    formData.value.period === ReportPeriod.CUSTOM &&
    customStartDate.value &&
    customEndDate.value
  ) {
    submitData.customDateRange = {
      startDate: new Date(customStartDate.value),
      endDate: new Date(customEndDate.value),
    }
  }

  // Handle amount range
  if (amountMin.value !== undefined || amountMax.value !== undefined) {
    submitData.filters.amountRange = {
      min: amountMin.value || 0,
      max: amountMax.value || Number.MAX_SAFE_INTEGER,
    }
  }

  // Handle assigned to
  if (assignedToInput.value.trim()) {
    submitData.filters.assignedTo = assignedToInput.value
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
  }

  // Handle schedule config
  if (formData.value.isScheduled) {
    submitData.scheduleConfig = {
      frequency: scheduleFrequency.value as 'DAILY' | 'WEEKLY' | 'MONTHLY',
      dayOfWeek: scheduleFrequency.value === 'WEEKLY' ? scheduleDayOfWeek.value : undefined,
      dayOfMonth: scheduleFrequency.value === 'MONTHLY' ? scheduleDayOfMonth.value : undefined,
      time: scheduleTime.value,
      recipients: scheduleRecipients.value
        .split(',')
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
      format: scheduleFormat.value as ReportFormat,
      isActive: true,
    }
  }

  emit('submit', submitData)
}

const initialize = () => {
  if (!props.report) return

  formData.value = {
    name: props.report.name,
    type: props.report.type,
    description: props.report.description || '',
    period: props.report.period,
    filters: { ...props.report.filters },
    metrics: [...props.report.metrics],
    groupBy: [...props.report.groupBy],
    sortBy: props.report.sortBy,
    sortOrder: props.report.sortOrder,
    isScheduled: props.report.isScheduled,
  }

  // Set helper fields
  if (props.report.customDateRange) {
    customStartDate.value = props.report.customDateRange.startDate.toISOString().split('T')[0]
    customEndDate.value = props.report.customDateRange.endDate.toISOString().split('T')[0]
  }

  if (props.report.filters.amountRange) {
    amountMin.value = props.report.filters.amountRange.min
    amountMax.value = props.report.filters.amountRange.max
  }

  if (props.report.filters.assignedTo) {
    assignedToInput.value = props.report.filters.assignedTo.join(', ')
  }

  if (props.report.scheduleConfig) {
    const config = props.report.scheduleConfig
    scheduleFrequency.value = config.frequency
    scheduleDayOfWeek.value = config.dayOfWeek || 1
    scheduleDayOfMonth.value = config.dayOfMonth || 1
    scheduleTime.value = config.time
    scheduleRecipients.value = config.recipients.join(', ')
    scheduleFormat.value = config.format
  }
}

watch(() => props.report, initialize, { immediate: true })
onMounted(initialize)
</script>
