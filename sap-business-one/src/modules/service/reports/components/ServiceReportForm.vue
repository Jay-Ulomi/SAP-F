<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? 'Edit Report' : 'New Report' }}
        </h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
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

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Report Name *</label>
              <input
                v-model="formData.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter report name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="formData.description"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter report description"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Report Type *</label>
              <select
                v-model="formData.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="service_calls">Service Calls</option>
                <option value="contracts">Contracts</option>
                <option value="equipment">Equipment</option>
                <option value="response_time">Response Time</option>
                <option value="customer_satisfaction">Customer Satisfaction</option>
                <option value="maintenance">Maintenance</option>
                <option value="warranty">Warranty</option>
                <option value="financial">Financial</option>
                <option value="performance">Performance</option>
                <option value="custom">Custom</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                v-model="formData.category"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                <option value="operational">Operational</option>
                <option value="financial">Financial</option>
                <option value="analytical">Analytical</option>
                <option value="compliance">Compliance</option>
                <option value="customer">Customer</option>
                <option value="technical">Technical</option>
              </select>
            </div>
          </div>

          <!-- Output Settings -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Output Settings
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Output Format *</label>
              <select
                v-model="formData.format"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Format</option>
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="csv">CSV</option>
                <option value="html">HTML</option>
                <option value="json">JSON</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
              <select
                v-model="formData.frequency"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Frequency</option>
                <option value="once">Once</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div class="flex items-center">
              <input
                v-model="formData.isPublic"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label class="ml-2 block text-sm text-gray-900"> Make this report public </label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <input
                v-model="tagsInput"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter tags separated by commas"
                @keyup.enter="addTags"
              />
              <div v-if="formData.tags.length > 0" class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="(tag, index) in formData.tags"
                  :key="index"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ tag }}
                  <button
                    type="button"
                    @click="removeTag(index)"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Date Range -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Date Range
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
              <input
                v-model="formData.parameters.dateRange.startDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
              <input
                v-model="formData.parameters.dateRange.endDate"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Schedule Settings -->
        <div v-if="formData.frequency !== 'once'" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Schedule Settings
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                v-model="formData.schedule.time"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                v-model="formData.schedule.timezone"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="UTC">UTC</option>
                <option value="America/New_York">Eastern Time</option>
                <option value="America/Chicago">Central Time</option>
                <option value="America/Denver">Mountain Time</option>
                <option value="America/Los_Angeles">Pacific Time</option>
              </select>
            </div>
            <div v-if="formData.frequency === 'weekly'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Day of Week</label>
              <select
                v-model="formData.schedule.dayOfWeek"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="0">Sunday</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
                <option value="6">Saturday</option>
              </select>
            </div>
            <div v-if="formData.frequency === 'monthly'">
              <label class="block text-sm font-medium text-gray-700 mb-1">Day of Month</label>
              <input
                v-model="formData.schedule.dayOfMonth"
                type="number"
                min="1"
                max="31"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div class="flex items-center">
            <input
              v-model="formData.schedule.enabled"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900"> Enable scheduled execution </label>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : isEditing ? 'Update' : 'Create' }} Report
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type {
  ServiceReport,
  ServiceReportFormData,
  ReportType,
  ReportCategory,
  ReportFormat,
  ReportFrequency,
} from '../types'

interface Props {
  report?: ServiceReport | null
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', data: ServiceReportFormData): void
}

const props = withDefaults(defineProps<Props>(), {
  report: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const formData = ref<ServiceReportFormData>({
  name: '',
  description: '',
  type: 'service_calls' as ReportType,
  category: 'operational' as ReportCategory,
  format: 'pdf' as ReportFormat,
  frequency: 'once' as ReportFrequency,
  parameters: {
    dateRange: {
      startDate: '',
      endDate: '',
    },
  },
  schedule: {
    frequency: 'once' as ReportFrequency,
    time: '09:00',
    timezone: 'UTC',
    enabled: false,
  },
  filters: {},
  permissions: {
    view: [],
    edit: [],
    delete: [],
    run: [],
    schedule: [],
  },
  isPublic: false,
  tags: [],
})

const tagsInput = ref('')

const isEditing = computed(() => !!props.report)

watch(
  () => props.report,
  (newReport) => {
    if (newReport) {
      formData.value = {
        name: newReport.name,
        description: newReport.description,
        type: newReport.type,
        category: newReport.category,
        format: newReport.format,
        frequency: newReport.frequency,
        parameters: newReport.parameters,
        schedule: newReport.schedule || {
          frequency: 'once' as ReportFrequency,
          time: '09:00',
          timezone: 'UTC',
          enabled: false,
        },
        filters: newReport.filters,
        permissions: newReport.permissions,
        isPublic: newReport.isPublic,
        tags: newReport.tags,
      }
    }
  },
  { immediate: true },
)

const addTags = () => {
  if (tagsInput.value.trim()) {
    const newTags = tagsInput.value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)
    formData.value.tags = [...formData.value.tags, ...newTags]
    tagsInput.value = ''
  }
}

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1)
}

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>
