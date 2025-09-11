<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Response Time Tracking</h1>
      <div class="flex space-x-2">
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
          Add Metric
        </button>
        <select
          v-model="selectedPeriod"
          @change="loadMetrics"
          class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
        <button
          @click="refreshData"
          class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Metrics</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalMetrics || 0 }}</p>
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg Response Time</p>
            <p class="text-2xl font-bold text-green-600">
              {{ formatTime(stats?.averageResponseTime || 0) }}
            </p>
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">SLA Compliance</p>
            <p class="text-2xl font-bold text-purple-600">{{ stats?.slaComplianceRate || 0 }}%</p>
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Excellent Metrics</p>
            <p class="text-2xl font-bold text-emerald-600">{{ stats?.excellentMetrics || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-emerald-100">
            <svg
              class="w-6 h-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
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
            placeholder="Search metrics..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filters.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="critical">Critical</option>
          </select>
          <select
            v-model="filters.metricType"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="response_time">Response Time</option>
            <option value="resolution_time">Resolution Time</option>
            <option value="first_response">First Response</option>
            <option value="customer_satisfaction">Customer Satisfaction</option>
            <option value="sla_compliance">SLA Compliance</option>
          </select>
          <select
            v-model="filters.technicianId"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Technicians</option>
            <option value="tech-001">John Smith</option>
            <option value="tech-002">Jane Doe</option>
            <option value="tech-003">Mike Johnson</option>
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

    <!-- Metrics Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading metrics...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadMetrics" class="mt-2 text-blue-600 hover:text-blue-800">
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
                  Service Call
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Metric Details
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Performance
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Measured At
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="metric in paginatedMetrics" :key="metric.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">
                      {{ metric.serviceCallNumber }}
                    </div>
                    <div class="text-sm text-gray-500">{{ metric.customerName }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900 capitalize">
                    {{ metric.metricType.replace('_', ' ') }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ metric.actualValue }} {{ metric.unit }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Target: {{ metric.targetValue }} {{ metric.unit }}
                  </div>
                  <div :class="varianceClass(metric.variance)" class="text-sm">
                    {{ metric.variance >= 0 ? '+' : '' }}{{ metric.variance.toFixed(1) }}%
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusBadgeClass(metric.status),
                    ]"
                  >
                    {{ getStatusText(metric.status) }}
                  </span>
                  <div v-if="metric.slaCompliance" class="mt-1">
                    <span class="text-xs text-green-600">SLA Compliant</span>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDateTime(metric.measuredAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button @click="viewMetric(metric)" class="text-blue-600 hover:text-blue-900">
                      View
                    </button>
                    <button
                      @click="editMetric(metric)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
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
    <ResponseTimeForm
      v-if="showCreateModal || showEditModal"
      :metric="selectedMetric"
      :loading="loading"
      @close="closeModals"
      @save="handleSave"
    />

    <ResponseTimeView
      v-if="showViewModal && selectedMetric"
      :metric="selectedMetric"
      @close="closeModals"
      @edit="editMetric"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useResponseTimeStore } from '../stores'
import type { ResponseTimeMetric, ResponseTimeFilters, ResponseTimeFormData } from '../types'

// Async components
const ResponseTimeForm = defineAsyncComponent(() => import('../components/ResponseTimeForm.vue'))
const ResponseTimeView = defineAsyncComponent(() => import('../components/ResponseTimeView.vue'))

// Store
const responseTimeStore = useResponseTimeStore()

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedMetric = ref<ResponseTimeMetric | null>(null)
const selectedPeriod = ref('daily')

// Filters
const filters = ref<ResponseTimeFilters>({
  search: '',
  status: undefined,
  metricType: undefined,
  technicianId: undefined,
})

// Computed
const loading = computed(() => responseTimeStore.loading)
const error = computed(() => responseTimeStore.error)
const metrics = computed(() => responseTimeStore.metrics)
const pagination = computed(() => responseTimeStore.pagination)
const stats = computed(() => responseTimeStore.stats)

const paginatedMetrics = computed(() => metrics.value)

// Methods
const loadMetrics = async () => {
  await responseTimeStore.fetchMetrics(filters.value)
}

const handleSearch = () => {
  loadMetrics()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    status: undefined,
    metricType: undefined,
    technicianId: undefined,
  }
  loadMetrics()
}

const viewMetric = (metric: ResponseTimeMetric) => {
  selectedMetric.value = metric
  showViewModal.value = true
}

const editMetric = (metric: ResponseTimeMetric) => {
  selectedMetric.value = metric
  showEditModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedMetric.value = null
}

const handleSave = async (formData: ResponseTimeFormData) => {
  if (selectedMetric.value) {
    await responseTimeStore.updateMetric(selectedMetric.value.id, formData)
  } else {
    await responseTimeStore.createMetric(formData)
  }
  closeModals()
  loadMetrics()
}

const refreshData = async () => {
  await loadMetrics()
}

const previousPage = () => {
  if (pagination.value.hasPrev) {
    responseTimeStore.setPage(pagination.value.page - 1)
    loadMetrics()
  }
}

const nextPage = () => {
  if (pagination.value.hasNext) {
    responseTimeStore.setPage(pagination.value.page + 1)
    loadMetrics()
  }
}

const getStatusBadgeClass = (status: string) => {
  const statusClasses = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const varianceClass = (variance: number) => {
  if (variance <= 0) return 'text-green-600 font-medium'
  if (variance <= 10) return 'text-yellow-600 font-medium'
  return 'text-red-600 font-medium'
}

const formatTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes.toFixed(0)}m`
  } else {
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes.toFixed(0)}m`
  }
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

// Lifecycle
onMounted(() => {
  loadMetrics()
})
</script>
