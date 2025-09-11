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
            Report Details - {{ props.item.reportName }}
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

        <!-- Content -->
        <div class="mt-6 space-y-6">
          <!-- Report Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Report Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Report Name</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.reportName }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Type</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.reportType) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Category</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.category) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Status</label>
                <span
                  :class="getStatusBadgeClass(props.item.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ formatEnum(props.item.status) }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Format</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.format.toUpperCase() }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Frequency</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.frequency) }}</p>
              </div>

              <div v-if="props.item.description">
                <label class="block text-sm font-medium text-gray-500">Description</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Date Range -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Date Range</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Start Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.dateRange.startDate) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">End Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.dateRange.endDate) }}</p>
              </div>
            </div>
          </div>

          <!-- Filters -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Filters</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="props.item.warehouseCode">
                <label class="block text-sm font-medium text-gray-500">Warehouse</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.warehouseCode }} - {{ props.item.warehouseName }}
                </p>
              </div>

              <div v-if="props.item.locationCode">
                <label class="block text-sm font-medium text-gray-500">Location</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.locationCode }} - {{ props.item.locationName }}
                </p>
              </div>

              <div v-if="props.item.itemGroup">
                <label class="block text-sm font-medium text-gray-500">Item Group</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.itemGroup }}</p>
              </div>

              <div v-if="props.item.itemCategory">
                <label class="block text-sm font-medium text-gray-500">Item Category</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.itemCategory }}</p>
              </div>
            </div>
          </div>

          <!-- Execution Information -->
          <div v-if="props.item.generatedDate" class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Execution Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Generated By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.generatedByName }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Generated Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.generatedDate) }}</p>
              </div>

              <div v-if="props.item.executionTime">
                <label class="block text-sm font-medium text-gray-500">Execution Time</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.executionTime }} seconds</p>
              </div>

              <div v-if="props.item.recordCount">
                <label class="block text-sm font-medium text-gray-500">Record Count</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.recordCount }}</p>
              </div>

              <div v-if="props.item.fileSize">
                <label class="block text-sm font-medium text-gray-500">File Size</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatFileSize(props.item.fileSize) }}</p>
              </div>

              <div v-if="props.item.filePath">
                <label class="block text-sm font-medium text-gray-500">File Path</label>
                <p class="mt-1 text-sm text-gray-900 font-mono text-xs">{{ props.item.filePath }}</p>
              </div>
            </div>
          </div>

          <!-- Schedule Information -->
          <div v-if="props.item.isScheduled" class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Schedule Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="props.item.scheduledDate">
                <label class="block text-sm font-medium text-gray-500">Scheduled Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.scheduledDate) }}</p>
              </div>

              <div v-if="props.item.lastRunDate">
                <label class="block text-sm font-medium text-gray-500">Last Run Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.lastRunDate) }}</p>
              </div>

              <div v-if="props.item.nextRunDate">
                <label class="block text-sm font-medium text-gray-500">Next Run Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.nextRunDate) }}</p>
              </div>
            </div>
          </div>

          <!-- Recipients -->
          <div v-if="props.item.recipients.length > 0" class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Recipients</h3>

            <div class="space-y-2">
              <div
                v-for="recipient in props.item.recipients"
                :key="recipient"
                class="flex items-center space-x-2"
              >
                <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <span class="text-sm text-gray-900">{{ recipient }}</span>
              </div>
            </div>
          </div>

          <!-- Error Information -->
          <div v-if="props.item.errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 class="text-base font-medium text-red-800 mb-2">Error Information</h3>
            <p class="text-sm text-red-700">{{ props.item.errorMessage }}</p>
          </div>

          <!-- Audit Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Audit Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Created By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.createdBy }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Created Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.createdDate) }}</p>
              </div>

              <div v-if="props.item.modifiedBy">
                <label class="block text-sm font-medium text-gray-500">Modified By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.modifiedBy }}</p>
              </div>

              <div v-if="props.item.modifiedDate">
                <label class="block text-sm font-medium text-gray-500">Modified Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.modifiedDate) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end space-x-3">
          <button
            v-if="props.item.filePath"
            @click="downloadReport"
            class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Download
          </button>
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ReportStatus } from '../types'
import type { InventoryReport } from '../types'

// Props
interface Props {
  item: InventoryReport
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  close: []
}>()

// Methods
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const formatEnum = (value: string): string => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusBadgeClass = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case ReportStatus.SCHEDULED:
      return 'bg-blue-100 text-blue-800'
    case ReportStatus.RUNNING:
      return 'bg-yellow-100 text-yellow-800'
    case ReportStatus.COMPLETED:
      return 'bg-green-100 text-green-800'
    case ReportStatus.FAILED:
      return 'bg-red-100 text-red-800'
    case ReportStatus.CANCELLED:
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const downloadReport = () => {
  if (props.item.filePath) {
    // In a real application, this would trigger a download
    window.open(props.item.filePath, '_blank')
  }
}
</script>
