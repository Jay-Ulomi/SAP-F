<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-4">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ report.name }}
          </h2>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', statusBadgeClass]">
            {{ statusText }}
          </span>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', categoryBadgeClass]">
            {{ categoryText }}
          </span>
        </div>
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

      <!-- Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Report Type</label>
                <p class="text-sm text-gray-900 capitalize">{{ report.type.replace('_', ' ') }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Category</label>
                <p class="text-sm text-gray-900 capitalize">{{ report.category }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Format</label>
                <p class="text-sm text-gray-900 uppercase">{{ report.format }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Frequency</label>
                <p class="text-sm text-gray-900 capitalize">{{ report.frequency }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500">Description</label>
              <p class="text-sm text-gray-900">
                {{ report.description || 'No description provided' }}
              </p>
            </div>

            <div v-if="report.tags.length > 0">
              <label class="block text-sm font-medium text-gray-500 mb-2">Tags</label>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in report.tags"
                  :key="tag"
                  class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Output Settings -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Output Settings
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Status</label>
                <p class="text-sm text-gray-900">{{ statusText }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Total Runs</label>
                <p class="text-sm text-gray-900">{{ report.totalRuns }}</p>
              </div>
              <div v-if="report.lastRunAt">
                <label class="block text-sm font-medium text-gray-500">Last Run</label>
                <p class="text-sm text-gray-900">{{ formatDateTime(report.lastRunAt) }}</p>
              </div>
              <div v-if="report.nextRunAt">
                <label class="block text-sm font-medium text-gray-500">Next Run</label>
                <p class="text-sm text-gray-900">{{ formatDateTime(report.nextRunAt) }}</p>
              </div>
            </div>

            <div class="flex items-center space-x-4">
              <div class="flex items-center">
                <input
                  :checked="report.isPublic"
                  type="checkbox"
                  disabled
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900"> Public Report </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Date Range -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Date Range
          </h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500">Start Date</label>
              <p class="text-sm text-gray-900">
                {{ formatDate(report.parameters.dateRange.startDate) }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">End Date</label>
              <p class="text-sm text-gray-900">
                {{ formatDate(report.parameters.dateRange.endDate) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Schedule Information -->
        <div v-if="report.schedule" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Schedule Information
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500">Frequency</label>
              <p class="text-sm text-gray-900 capitalize">{{ report.schedule.frequency }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Time</label>
              <p class="text-sm text-gray-900">{{ report.schedule.time }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Timezone</label>
              <p class="text-sm text-gray-900">{{ report.schedule.timezone }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-500">Enabled</label>
              <p class="text-sm text-gray-900">{{ report.schedule.enabled ? 'Yes' : 'No' }}</p>
            </div>
            <div v-if="report.schedule.dayOfWeek !== undefined">
              <label class="block text-sm font-medium text-gray-500">Day of Week</label>
              <p class="text-sm text-gray-900">{{ getDayOfWeek(report.schedule.dayOfWeek) }}</p>
            </div>
            <div v-if="report.schedule.dayOfMonth !== undefined">
              <label class="block text-sm font-medium text-gray-500">Day of Month</label>
              <p class="text-sm text-gray-900">{{ report.schedule.dayOfMonth }}</p>
            </div>
          </div>
        </div>

        <!-- Recent Executions -->
        <div v-if="report.totalRuns > 0" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Recent Executions
          </h3>

          <div class="space-y-3">
            <div
              v-for="execution in recentExecutions"
              :key="execution.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded"
            >
              <div class="flex items-center space-x-3">
                <div
                  :class="['w-2 h-2 rounded-full', getExecutionStatusClass(execution.status)]"
                ></div>
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ execution.reportName }}</p>
                  <p class="text-xs text-gray-600">
                    {{ formatDateTime(execution.startedAt) }} by {{ execution.executedByName }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-900">{{ getExecutionStatusText(execution.status) }}</p>
                <p v-if="execution.duration" class="text-xs text-gray-600">
                  {{ execution.duration }}ms
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Output Files -->
        <div v-if="report.output" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Output Files
          </h3>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded">
            <div>
              <p class="text-sm font-medium text-gray-900">{{ report.output.fileName }}</p>
              <p class="text-xs text-gray-600">
                {{ formatFileSize(report.output.fileSize) }} • Generated
                {{ formatDateTime(report.output.generatedAt) }}
              </p>
            </div>
            <button
              @click="downloadFile"
              class="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50"
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
        <button
          @click="$emit('edit')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Report
        </button>
        <button
          @click="$emit('run')"
          class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Run Report
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ServiceReport, ReportExecution } from '../types'

interface Props {
  report: ServiceReport
}

interface Emits {
  (e: 'close'): void
  (e: 'edit'): void
  (e: 'run'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusBadgeClass = computed(() => {
  const statusClasses = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    running: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-orange-100 text-orange-800',
  }
  return statusClasses[props.report.status] || 'bg-gray-100 text-gray-800'
})

const categoryBadgeClass = computed(() => {
  const categoryClasses = {
    operational: 'bg-blue-100 text-blue-800',
    financial: 'bg-green-100 text-green-800',
    analytical: 'bg-purple-100 text-purple-800',
    compliance: 'bg-yellow-100 text-yellow-800',
    customer: 'bg-pink-100 text-pink-800',
    technical: 'bg-indigo-100 text-indigo-800',
  }
  return categoryClasses[props.report.category] || 'bg-gray-100 text-gray-800'
})

const statusText = computed(() => {
  return props.report.status.charAt(0).toUpperCase() + props.report.status.slice(1)
})

const categoryText = computed(() => {
  return props.report.category.charAt(0).toUpperCase() + props.report.category.slice(1)
})

// Mock recent executions - in real app, this would come from props or API
const recentExecutions = computed((): ReportExecution[] => [
  {
    id: '1',
    reportId: props.report.id,
    reportName: props.report.name,
    status: 'completed',
    startedAt: new Date(Date.now() - 3600000).toISOString(),
    completedAt: new Date(Date.now() - 3000000).toISOString(),
    duration: 600000,
    parameters: props.report.parameters,
    executedBy: 'user1',
    executedByName: 'John Doe',
  },
  {
    id: '2',
    reportId: props.report.id,
    reportName: props.report.name,
    status: 'failed',
    startedAt: new Date(Date.now() - 7200000).toISOString(),
    error: 'Data source unavailable',
    parameters: props.report.parameters,
    executedBy: 'user1',
    executedByName: 'John Doe',
  },
])

const getExecutionStatusClass = (status: string) => {
  const statusClasses = {
    completed: 'bg-green-500',
    running: 'bg-yellow-500',
    failed: 'bg-red-500',
    cancelled: 'bg-orange-500',
  }
  return statusClasses[status] || 'bg-gray-500'
}

const getExecutionStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getDayOfWeek = (day: number) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[day] || 'Unknown'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const downloadFile = () => {
  // In real app, this would trigger actual download
  console.log('Downloading file:', props.report.output?.fileName)
}
</script>
