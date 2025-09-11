<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Service Calls</h1>
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
        New Service Call
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Calls</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalCalls || 0 }}</p>
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Open Calls</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats?.openCalls || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-2xl font-bold text-purple-600">{{ stats?.inProgressCalls || 0 }}</p>
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

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Avg Response Time</p>
            <p class="text-2xl font-bold text-green-600">{{ stats?.averageResponseTime || 0 }}m</p>
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
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search calls..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filters.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="on_hold">On Hold</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            v-model="filters.priority"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <select
            v-model="filters.type"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="repair">Repair</option>
            <option value="maintenance">Maintenance</option>
            <option value="installation">Installation</option>
            <option value="inspection">Inspection</option>
            <option value="consultation">Consultation</option>
            <option value="warranty">Warranty</option>
            <option value="other">Other</option>
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

    <!-- Service Calls Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading service calls...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadServiceCalls" class="mt-2 text-blue-600 hover:text-blue-800">
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
                  Call Details
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Assigned To
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created
                </th>
                <th
                  class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="call in paginatedCalls" :key="call.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div class="text-sm font-medium text-gray-900">#{{ call.callNumber }}</div>
                    <div class="text-sm text-gray-500">{{ call.subject }}</div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ call.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ call.location }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getStatusBadgeClass(call.status),
                    ]"
                  >
                    {{ getStatusText(call.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 py-1 text-xs font-medium rounded-full',
                      getPriorityBadgeClass(call.priority),
                    ]"
                  >
                    {{ getPriorityText(call.priority) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ call.assignedToName || 'Unassigned' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(call.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="viewServiceCall(call)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editServiceCall(call)"
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
        <div v-if="pagination.totalPages > 1" class="px-6 py-3 border-t border-gray-200">
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
    <ServiceCallForm
      v-if="showCreateModal || showEditModal"
      :service-call="selectedServiceCall"
      :loading="loading"
      @close="closeModals"
      @save="handleSave"
    />

    <ServiceCallView
      v-if="showViewModal && selectedServiceCall"
      :service-call="selectedServiceCall"
      @close="closeModals"
      @edit="editServiceCall"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useServiceCallsStore } from '../stores'
import type { ServiceCall, ServiceCallFilters, ServiceCallStats } from '../types'

// Async components
const ServiceCallForm = defineAsyncComponent(() => import('../components/ServiceCallForm.vue'))
const ServiceCallView = defineAsyncComponent(() => import('../components/ServiceCallView.vue'))

// Store
const serviceCallsStore = useServiceCallsStore()

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedServiceCall = ref<ServiceCall | null>(null)

// Filters
const filters = ref<ServiceCallFilters>({
  search: '',
  status: undefined,
  priority: undefined,
  type: undefined,
})

// Computed
const loading = computed(() => serviceCallsStore.loading)
const error = computed(() => serviceCallsStore.error)
const serviceCalls = computed(() => serviceCallsStore.serviceCalls)
const pagination = computed(() => serviceCallsStore.pagination)
const stats = computed(() => serviceCallsStore.stats)

const paginatedCalls = computed(() => serviceCalls.value)

// Methods
const loadServiceCalls = async () => {
  serviceCallsStore.setFilters(filters.value)
}

const handleSearch = () => {
  loadServiceCalls()
}

const resetFilters = () => {
  filters.value = {
    search: '',
    status: undefined,
    priority: undefined,
    type: undefined,
  }
  serviceCallsStore.clearFilters()
}

const viewServiceCall = (call: ServiceCall) => {
  selectedServiceCall.value = call
  showViewModal.value = true
}

const editServiceCall = (call: ServiceCall) => {
  selectedServiceCall.value = call
  showEditModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedServiceCall.value = null
}

const handleSave = async (formData: any) => {
  if (selectedServiceCall.value) {
    await serviceCallsStore.updateServiceCall(selectedServiceCall.value.id, formData)
  } else {
    await serviceCallsStore.createServiceCall(formData)
  }
  closeModals()
  loadServiceCalls()
}

const previousPage = () => {
  if (pagination.value.hasPrev) {
    serviceCallsStore.setPage(pagination.value.page - 1)
    loadServiceCalls()
  }
}

const nextPage = () => {
  if (pagination.value.hasNext) {
    serviceCallsStore.setPage(pagination.value.page + 1)
    loadServiceCalls()
  }
}

const getStatusBadgeClass = (status: string) => {
  const statusClasses = {
    open: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    on_hold: 'bg-orange-100 text-orange-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityBadgeClass = (priority: string) => {
  const priorityClasses = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }
  return priorityClasses[priority] || 'bg-gray-100 text-gray-800'
}

const getStatusText = (status: string) => {
  return status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getPriorityText = (priority: string) => {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  loadServiceCalls()
})
</script>
