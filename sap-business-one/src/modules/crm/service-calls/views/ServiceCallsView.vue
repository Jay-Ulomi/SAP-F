<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Service Call Management</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Service Call
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Service Calls</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.totalServiceCalls || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Open Service Calls</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.openServiceCalls || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Resolved Service Calls</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.resolvedServiceCalls || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Avg Resolution Time</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.averageResolutionTime || 0 }}h
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search service calls..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <select
            v-model="filters.status"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="RESOLVED">Resolved</option>
            <option value="CLOSED">Closed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        <div>
          <select
            v-model="filters.priority"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div>
          <select
            v-model="filters.type"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="TECHNICAL_SUPPORT">Technical Support</option>
            <option value="BUG_REPORT">Bug Report</option>
            <option value="FEATURE_REQUEST">Feature Request</option>
            <option value="TRAINING">Training</option>
            <option value="CONSULTATION">Consultation</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="INSTALLATION">Installation</option>
            <option value="UPGRADE">Upgrade</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <select
            v-model="filters.category"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="SOFTWARE">Software</option>
            <option value="HARDWARE">Hardware</option>
            <option value="NETWORK">Network</option>
            <option value="DATABASE">Database</option>
            <option value="SECURITY">Security</option>
            <option value="USER_ACCESS">User Access</option>
            <option value="INTEGRATION">Integration</option>
            <option value="REPORTING">Reporting</option>
            <option value="WORKFLOW">Workflow</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="clearFilters"
            class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>

      <!-- Active Filters -->
      <div v-if="hasActiveFilters" class="mt-4 flex flex-wrap gap-2">
        <span class="text-sm text-gray-500">Active filters:</span>
        <span
          v-for="(value, key) in activeFilters"
          :key="key"
          class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-sap-blue text-white"
        >
          {{ key }}: {{ value }}
          <button
            @click="removeFilter(key)"
            class="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full text-sap-blue bg-white hover:bg-gray-100"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </span>
      </div>
    </div>

    <!-- Service Call Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
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
                Type
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
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="serviceCall in serviceCalls" :key="serviceCall.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ serviceCall.title }}</div>
                  <div class="text-sm text-gray-500">{{ serviceCall.serviceCallCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ serviceCall.customerName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': serviceCall.status === 'OPEN',
                    'bg-yellow-100 text-yellow-800': serviceCall.status === 'IN_PROGRESS',
                    'bg-orange-100 text-orange-800': serviceCall.status === 'ON_HOLD',
                    'bg-green-100 text-green-800': serviceCall.status === 'RESOLVED',
                    'bg-gray-100 text-gray-800': serviceCall.status === 'CLOSED',
                    'bg-red-100 text-red-800': serviceCall.status === 'CANCELLED',
                  }"
                >
                  {{ formatServiceCallStatus(serviceCall.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': serviceCall.priority === 'LOW',
                    'bg-blue-100 text-blue-800': serviceCall.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': serviceCall.priority === 'HIGH',
                    'bg-red-100 text-red-800': serviceCall.priority === 'CRITICAL',
                  }"
                >
                  {{ formatServiceCallPriority(serviceCall.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatServiceCallType(serviceCall.type) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ serviceCall.assignedTo }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDateTime(serviceCall.createdAt) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="openViewModal(serviceCall)"
                    class="text-sap-blue hover:text-sap-blue-dark"
                  >
                    View
                  </button>
                  <button
                    @click="openEditModal(serviceCall)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="openDuplicateModal(serviceCall)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                  <button
                    @click="deleteServiceCall(serviceCall.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-if="serviceCalls.length === 0" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">No service calls</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new service call.</p>
        <div class="mt-6">
          <button
            @click="openCreateModal"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Add Service Call
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination.totalPages > 1"
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="previousPage"
          :disabled="!pagination.hasPrev"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="!pagination.hasNext"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
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
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="[
                page === pagination.page
                  ? 'z-10 bg-sap-blue border-sap-blue text-white'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNext"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Create/Edit Service Call Modal -->
    <div
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeCreateModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showEditModal ? 'Edit Service Call' : 'Create New Service Call' }}
            </h3>
            <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ServiceCallForm
            :service-call="editingServiceCall"
            @submit="handleSubmit"
            @cancel="closeCreateModal"
          />
        </div>
      </div>
    </div>

    <!-- View Service Call Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Service Call Details</h3>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ServiceCallView v-if="viewingServiceCall" :service-call="viewingServiceCall" />
        </div>
      </div>
    </div>

    <!-- Duplicate Service Call Modal -->
    <div
      v-if="showDuplicateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeDuplicateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Duplicate Service Call</h3>
            <button @click="closeDuplicateModal" class="text-gray-400 hover:text-gray-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <ServiceCallForm
            :service-call="duplicatingServiceCall"
            @submit="handleDuplicate"
            @cancel="closeDuplicateModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useServiceCallStore } from '../stores'
import ServiceCallForm from '../components/ServiceCallForm.vue'
import ServiceCallView from '../components/ServiceCallView.vue'
import type { ServiceCall, ServiceCallFormData, ServiceCallFilters } from '../types'
import {
  ServiceCallStatus,
  ServiceCallType,
  ServiceCallCategory,
  ServiceCallPriority,
} from '../types'

const serviceCallStore = useServiceCallStore()

// Refs for modals
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)

// Refs for data
const editingServiceCall = ref<ServiceCall | null>(null)
const viewingServiceCall = ref<ServiceCall | null>(null)
const duplicatingServiceCall = ref<ServiceCall | null>(null)

// Refs for search and filters
const searchQuery = ref('')
const filters = ref<ServiceCallFilters>({})

// Computed properties
const serviceCalls = computed(() => serviceCallStore.serviceCalls)
const stats = computed(() => serviceCallStore.stats)
const pagination = computed(() => serviceCallStore.pagination)
const loading = computed(() => serviceCallStore.loading)

const hasActiveFilters = computed(() => {
  return Object.keys(filters.value).some((key) => filters.value[key as keyof ServiceCallFilters])
})

const activeFilters = computed(() => {
  const active: Record<string, string> = {}
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value) {
      active[key] = value
    }
  })
  return active
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, pagination.value.page - 2)
  const end = Math.min(pagination.value.totalPages, pagination.value.page + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const openCreateModal = () => {
  editingServiceCall.value = null
  showCreateModal.value = true
}

const openEditModal = (serviceCall: ServiceCall) => {
  editingServiceCall.value = serviceCall
  showEditModal.value = true
}

const openViewModal = (serviceCall: ServiceCall) => {
  viewingServiceCall.value = serviceCall
  showViewModal.value = true
}

const openDuplicateModal = (serviceCall: ServiceCall) => {
  duplicatingServiceCall.value = serviceCall
  showDuplicateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingServiceCall.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingServiceCall.value = null
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  duplicatingServiceCall.value = null
}

const handleSubmit = async (data: ServiceCallFormData) => {
  try {
    if (editingServiceCall.value) {
      await serviceCallStore.updateServiceCall(editingServiceCall.value.id, data)
    } else {
      await serviceCallStore.createServiceCall(data)
    }
    closeCreateModal()
  } catch (error) {
    console.error('Error saving service call:', error)
  }
}

const handleDuplicate = async (data: ServiceCallFormData) => {
  try {
    await serviceCallStore.duplicateServiceCall(duplicatingServiceCall.value!.id, data)
    closeDuplicateModal()
  } catch (error) {
    console.error('Error duplicating service call:', error)
  }
}

const deleteServiceCall = async (id: string) => {
  if (confirm('Are you sure you want to delete this service call?')) {
    try {
      await serviceCallStore.deleteServiceCall(id)
    } catch (error) {
      console.error('Error deleting service call:', error)
    }
  }
}

const applyFilters = () => {
  const newFilters: ServiceCallFilters = {}
  if (searchQuery.value) newFilters.search = searchQuery.value
  if (filters.value.status) newFilters.status = filters.value.status
  if (filters.value.priority) newFilters.priority = filters.value.priority
  if (filters.value.type) newFilters.type = filters.value.type
  if (filters.value.category) newFilters.category = filters.value.category

  serviceCallStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {}
  serviceCallStore.clearFilters()
}

const removeFilter = (key: string) => {
  if (key === 'search') {
    searchQuery.value = ''
  } else {
    filters.value[key as keyof ServiceCallFilters] = undefined
  }
  applyFilters()
}

// Pagination methods
const nextPage = () => serviceCallStore.nextPage()
const previousPage = () => serviceCallStore.previousPage()
const goToPage = (page: number) => serviceCallStore.goToPage(page)

// Utility functions
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatServiceCallStatus = (status: ServiceCallStatus) => {
  const statusMap: Record<ServiceCallStatus, string> = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed',
    CANCELLED: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatServiceCallPriority = (priority: ServiceCallPriority) => {
  const priorityMap: Record<ServiceCallPriority, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatServiceCallType = (type: ServiceCallType) => {
  const typeMap: Record<ServiceCallType, string> = {
    TECHNICAL_SUPPORT: 'Technical Support',
    BUG_REPORT: 'Bug Report',
    FEATURE_REQUEST: 'Feature Request',
    TRAINING: 'Training',
    CONSULTATION: 'Consultation',
    MAINTENANCE: 'Maintenance',
    INSTALLATION: 'Installation',
    UPGRADE: 'Upgrade',
    OTHER: 'Other',
  }
  return typeMap[type] || type
}

const formatServiceCallCategory = (category: ServiceCallCategory) => {
  const categoryMap: Record<ServiceCallCategory, string> = {
    SOFTWARE: 'Software',
    HARDWARE: 'Hardware',
    NETWORK: 'Network',
    DATABASE: 'Database',
    SECURITY: 'Security',
    USER_ACCESS: 'User Access',
    INTEGRATION: 'Integration',
    REPORTING: 'Reporting',
    WORKFLOW: 'Workflow',
    OTHER: 'Other',
  }
  return categoryMap[category] || category
}

// Lifecycle
onMounted(() => {
  serviceCallStore.loadServiceCalls()
  serviceCallStore.loadServiceCallStats()
})
</script>
