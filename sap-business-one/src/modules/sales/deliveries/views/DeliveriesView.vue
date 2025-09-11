<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Deliveries</h1>
        <p class="text-sm text-gray-600">Manage customer deliveries and shipping</p>
      </div>
      <div class="flex space-x-3">
        <button @click="showCreateModal = true" class="btn-primary">New Delivery</button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Deliveries</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Fully Delivered</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.fullyDelivered || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats?.partiallyDelivered || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatCurrency(stats?.totalValue || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Filters</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-sap-blue bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2"
                />
              </svg>
              {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced
            </button>
            <button
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <!-- Primary Filters - Always Visible -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Statuses</option>
              <option v-for="status in Object.values(DeliveryStatus)" :key="status" :value="status">
                {{ formatDeliveryStatus(status) }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              v-model="filters.type"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in Object.values(DeliveryType)" :key="type" :value="type">
                {{ formatDeliveryType(type) }}
              </option>
            </select>
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="filters.search"
              @input="applyFilters"
              type="text"
              placeholder="Search deliveries..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Customer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="filters.customerCode"
              @input="applyFilters"
              type="text"
              placeholder="Customer code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Sales Person Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Person</label>
              <input
                v-model="filters.salesPerson"
                @input="applyFilters"
                type="text"
                placeholder="Sales person..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Priority Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                v-model="priorityFilter"
                @change="applyFilters"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <!-- Carrier Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Carrier</label>
              <input
                v-model="carrierFilter"
                @input="applyFilters"
                type="text"
                placeholder="Carrier name..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Tracking Number -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
              <input
                v-model="trackingFilter"
                @input="applyFilters"
                type="text"
                placeholder="Tracking number..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Date Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Delivery Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Delivery Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="filters.dateFrom"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="filters.dateTo"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Estimated Delivery Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Estimated Delivery Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="estimatedDateFromFilter"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="estimatedDateToFilter"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-700">Active Filters:</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="filters.status"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  Status: {{ formatDeliveryStatus(filters.status) }}
                  <button
                    @click="((filters.status = ''), applyFilters())"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="filters.type"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                >
                  Type: {{ formatDeliveryType(filters.type) }}
                  <button
                    @click="((filters.type = ''), applyFilters())"
                    class="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="filters.customerCode"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                >
                  Customer: {{ filters.customerCode }}
                  <button
                    @click="((filters.customerCode = ''), applyFilters())"
                    class="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="filters.search"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                >
                  Search: {{ filters.search }}
                  <button
                    @click="((filters.search = ''), applyFilters())"
                    class="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
            <button
              @click="clearFilters"
              class="text-sm text-sap-blue hover:text-sap-dark-blue font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Deliveries List -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Deliveries</h3>
      </div>

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        <span class="ml-2 text-sm text-gray-500">Loading deliveries...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="text-center py-12">
        <div class="text-red-600 mb-2">
          <svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-600">{{ store.error }}</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delivery
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="delivery in filteredDeliveries" :key="delivery.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ delivery.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ delivery.docEntry }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ delivery.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ delivery.customerCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(delivery.deliveryDate) }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(delivery.postingDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(delivery.status)"
                >
                  {{ formatDeliveryStatus(delivery.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-900">{{ formatDeliveryType(delivery.type) }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(delivery.totalAmount) }}
                </div>
                <div class="text-sm text-gray-500">{{ delivery.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewDelivery(delivery)" class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button
                    @click="editDelivery(delivery)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteDelivery(delivery.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div v-if="filteredDeliveries.length === 0" class="text-center py-12">
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
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No deliveries found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new delivery.</p>
          <div class="mt-6">
            <button @click="showCreateModal = true" class="btn-primary">New Delivery</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > pagination.limit" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page * pagination.limit >= pagination.total"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        >
          <DeliveryForm
            :initial-data="editingDelivery"
            :loading="store.loading"
            @submit="handleDeliverySaved"
            @cancel="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDeliveriesStore } from '../stores/deliveriesStore'
import { DeliveryStatus, DeliveryType } from '../types'
import type { Delivery, DeliveryFormData } from '../types'
import DeliveryForm from '../components/DeliveryForm.vue'

// Store
const store = useDeliveriesStore()

// Local state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingDelivery = ref<DeliveryFormData | null>(null)
const showAdvancedFilters = ref(false)

// Additional filter variables
const priorityFilter = ref('')
const carrierFilter = ref('')
const trackingFilter = ref('')
const estimatedDateFromFilter = ref('')
const estimatedDateToFilter = ref('')

// Filters
const filters = ref({
  status: [] as DeliveryStatus[],
  type: [] as DeliveryType[],
  customerCode: '',
  salesPerson: '',
  dateFrom: '',
  dateTo: '',
  search: '',
})

// Computed properties
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)

const hasActiveFilters = computed(() => {
  return (
    filters.value.status.length > 0 ||
    filters.value.type.length > 0 ||
    filters.value.customerCode ||
    filters.value.salesPerson ||
    filters.value.dateFrom ||
    filters.value.dateTo ||
    filters.value.search ||
    priorityFilter.value ||
    carrierFilter.value ||
    trackingFilter.value ||
    estimatedDateFromFilter.value ||
    estimatedDateToFilter.value
  )
})

const filteredDeliveries = computed(() => {
  let filtered = store.deliveries

  // Apply status filter
  if (filters.value.status.length > 0) {
    filtered = filtered.filter((d) => filters.value.status.includes(d.status))
  }

  // Apply type filter
  if (filters.value.type.length > 0) {
    filtered = filtered.filter((d) => filters.value.type.includes(d.type))
  }

  // Apply customer filter
  if (filters.value.customerCode) {
    filtered = filtered.filter(
      (d) =>
        d.customerCode.toLowerCase().includes(filters.value.customerCode.toLowerCase()) ||
        d.customerName.toLowerCase().includes(filters.value.customerCode.toLowerCase()),
    )
  }

  // Apply sales person filter
  if (filters.value.salesPerson) {
    filtered = filtered.filter((d) =>
      d.salesPerson?.toLowerCase().includes(filters.value.salesPerson.toLowerCase()),
    )
  }

  // Apply date filters
  if (filters.value.dateFrom) {
    filtered = filtered.filter((d) => d.deliveryDate >= filters.value.dateFrom)
  }
  if (filters.value.dateTo) {
    filtered = filtered.filter((d) => d.deliveryDate <= filters.value.dateTo)
  }

  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    filtered = filtered.filter(
      (d) =>
        d.docNum.toLowerCase().includes(searchTerm) ||
        d.customerName.toLowerCase().includes(searchTerm) ||
        d.customerCode.toLowerCase().includes(searchTerm) ||
        d.reference?.toLowerCase().includes(searchTerm),
    )
  }

  return filtered
})

// Methods
const applyFilters = () => {
  store.updateFilters(filters.value)
  store.fetchDeliveries(1)
}

const clearFilters = () => {
  filters.value = {
    status: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  }
  priorityFilter.value = ''
  carrierFilter.value = ''
  trackingFilter.value = ''
  estimatedDateFromFilter.value = ''
  estimatedDateToFilter.value = ''
  store.clearFilters()
}

const viewDelivery = (delivery: Delivery) => {
  // TODO: Implement view delivery detail page
  console.log('View delivery:', delivery)
}

const editDelivery = (delivery: Delivery) => {
  editingDelivery.value = {
    customerCode: delivery.customerCode,
    deliveryDate: delivery.deliveryDate,
    postingDate: delivery.postingDate,
    type: delivery.type,
    currency: delivery.currency,
    exchangeRate: delivery.exchangeRate,
    salesPerson: delivery.salesPerson || '',
    reference: delivery.reference || '',
    remarks: delivery.remarks || '',
    project: delivery.project || '',
    relatedOrderId: delivery.relatedOrderId || '',
    relatedQuotationId: delivery.relatedQuotationId || '',
    deliveryMethod: delivery.deliveryMethod || '',
    shippingAddress: delivery.shippingAddress,
    trackingNumber: delivery.trackingNumber || '',
    carrier: delivery.carrier || '',
    estimatedDeliveryDate: delivery.estimatedDeliveryDate || '',
    lineItems: delivery.lineItems.map((item) => ({
      itemCode: item.itemCode,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      discountType: item.discountType,
      taxCode: item.taxCode,
      taxRate: item.taxRate,
      warehouseCode: item.warehouseCode || '',
      batchNumber: item.batchNumber || '',
      serialNumber: item.serialNumber || '',
      remarks: item.remarks || '',
    })),
  }
  showEditModal.value = true
}

const deleteDelivery = async (id: string) => {
  if (confirm('Are you sure you want to delete this delivery?')) {
    try {
      await store.deleteDelivery(id)
    } catch (error) {
      console.error('Error deleting delivery:', error)
    }
  }
}

const handleDeliverySaved = async (data: DeliveryFormData) => {
  try {
    if (editingDelivery.value) {
      // For editing, we need to get the delivery ID from the store
      const currentDelivery = store.currentDelivery
      if (currentDelivery) {
        await store.updateDelivery(currentDelivery.id, data)
      }
    } else {
      await store.createDelivery(data)
    }
    closeModal()
    // Refresh the deliveries list
    await store.fetchDeliveries(1)
  } catch (error) {
    console.error('Error saving delivery:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingDelivery.value = null
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    store.fetchDeliveries(pagination.value.page - 1)
  }
}

const nextPage = () => {
  if (pagination.value.page * pagination.value.limit < pagination.value.total) {
    store.fetchDeliveries(pagination.value.page + 1)
  }
}

const formatDeliveryStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatDeliveryType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0)
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800'
    case 'OPEN':
      return 'bg-blue-100 text-blue-800'
    case 'RELEASED':
      return 'bg-yellow-100 text-yellow-800'
    case 'PARTIALLY_DELIVERED':
      return 'bg-orange-100 text-orange-800'
    case 'FULLY_DELIVERED':
      return 'bg-green-100 text-green-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    case 'CLOSED':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Lifecycle
onMounted(async () => {
  await store.fetchDeliveries()
  await store.fetchStats()
})

// Watch for filter changes
watch(
  filters,
  () => {
    // Debounce filter application
    clearTimeout((window as any).filterTimeout)
    ;(window as any).filterTimeout = setTimeout(() => {
      applyFilters()
    }, 500)
  },
  { deep: true },
)
</script>
