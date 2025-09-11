<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Service Reports & Analytics</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Report
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Reports</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalReports || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Reports</p>
            <p class="text-2xl font-bold text-green-600">{{ stats?.activeReports || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-green-100">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Scheduled Reports</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats?.scheduledReports || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-yellow-100">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Runs</p>
            <p class="text-2xl font-bold text-purple-600">{{ stats?.totalRuns || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-purple-100">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search reports..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filters.type"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
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
          <select
            v-model="filters.category"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="operational">Operational</option>
            <option value="financial">Financial</option>
            <option value="analytical">Analytical</option>
            <option value="compliance">Compliance</option>
            <option value="customer">Customer</option>
            <option value="technical">Technical</option>
          </select>
          <select
            v-model="filters.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <button
            @click="handleSearch"
            class="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading reports...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadReports" class="mt-2 text-blue-600 hover:text-blue-800">
          Try Again
        </button>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Report Details
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type & Category
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Frequency
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Run
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="report in paginatedReports" :key="report.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                    <div class="text-sm text-gray-500">
                      {{ report.description || 'No description' }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 capitalize">
                    {{ report.type.replace('_', ' ') }}
                  </div>
                  <div class="text-sm text-gray-500 capitalize">{{ report.category }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusBadgeClass(report.status),
                    ]"
                  >
                    {{ getStatusText(report.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ getFrequencyText(report.frequency) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ report.lastRunAt ? formatDateTime(report.lastRunAt) : 'Never' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button @click="viewReport(report)" class="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button
                      @click="editReport(report)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button @click="runReport(report)" class="text-green-600 hover:text-green-900">
                      Run
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div
          v-if="pagination.totalPages > 1"
          class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
        >
          <div class="flex items-center justify-between">
            <div class="flex-1 flex justify-between sm:hidden">
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{
                    (pagination.page - 1) * pagination.limit + 1
                  }}</span>
                  to
                  <span class="font-medium">{{
                    Math.min(pagination.page * pagination.limit, pagination.total)
                  }}</span>
                  of
                  <span class="font-medium">{{ pagination.total }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    @click="previousPage"
                    :disabled="!pagination.hasPrev"
                    class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="!pagination.hasNext"
                    class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ServiceReportForm
      v-if="showCreateModal || showEditModal"
      :report="selectedReport"
      :loading="loading"
      @close="closeModals"
      @save="handleSave"
    />

    <ServiceReportView
      v-if="showViewModal && selectedReport"
      :report="selectedReport"
      @close="closeModals"
      @edit="editReport"
      @run="runReport"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useServiceReportsStore } from '../stores'
import type { ServiceReport, ServiceReportFilters, ServiceReportFormData } from '../types'

// Async components
const ServiceReportForm = defineAsyncComponent(() => import('../components/ServiceReportForm.vue'))
const ServiceReportView = defineAsyncComponent(() => import('../components/ServiceReportView.vue'))

// Store
const serviceReportsStore = useServiceReportsStore()

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedReport = ref<ServiceReport | null>(null)

// Filters
const filters = ref<ServiceReportFilters>({
  search: '',
  type: undefined,
  category: undefined,
  status: undefined,
})

// Computed
const loading = computed(() => serviceReportsStore.loading)
const error = computed(() => serviceReportsStore.error)
const reports = computed(() => serviceReportsStore.reports)
const pagination = computed(() => serviceReportsStore.pagination)
const stats = computed(() => serviceReportsStore.stats)

const paginatedReports = computed(() => reports.value)

// Methods
const loadReports = async () => {
  await serviceReportsStore.fetchReports(filters.value)
}

const handleSearch = () => {
  loadReports()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    type: undefined,
    category: undefined,
    status: undefined,
  }
  loadReports()
}

const viewReport = (report: ServiceReport) => {
  selectedReport.value = report
  showViewModal.value = true
}

const editReport = (report: ServiceReport) => {
  selectedReport.value = report
  showEditModal.value = true
}

const runReport = (report: ServiceReport) => {
  // In real app, this would trigger report execution
  console.log('Running report:', report.name)
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedReport.value = null
}

const handleSave = async (formData: ServiceReportFormData) => {
  if (selectedReport.value) {
    await serviceReportsStore.updateReport(selectedReport.value.id, formData)
  } else {
    await serviceReportsStore.createReport(formData)
  }
  closeModals()
  loadReports()
}

const previousPage = () => {
  if (pagination.value.hasPrev) {
    serviceReportsStore.setPage(pagination.value.page - 1)
    loadReports()
  }
}

const nextPage = () => {
  if (pagination.value.hasNext) {
    serviceReportsStore.setPage(pagination.value.page + 1)
    loadReports()
  }
}

const getStatusBadgeClass = (status: string) => {
  const statusClasses = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    running: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    cancelled: 'bg-orange-100 text-orange-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const getFrequencyText = (frequency: string) => {
  return frequency.charAt(0).toUpperCase() + frequency.slice(1)
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

// Lifecycle
onMounted(() => {
  loadReports()
})
</script>
