<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-sap-blue"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Valuations</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.totalValuations || 0 }}
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
                class="h-6 w-6 text-yellow-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.pendingValuations || 0 }}
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
                class="h-6 w-6 text-green-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Completed</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.completedValuations || 0 }}
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
                class="h-6 w-6 text-blue-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ formatCurrency(stats?.totalInventoryValue || 0) }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white shadow rounded-lg p-4">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search valuations..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Type Filter -->
          <select
            v-model="selectedType"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Types</option>
            <option value="periodic">Periodic</option>
            <option value="continuous">Continuous</option>
            <option value="manual">Manual</option>
            <option value="automatic">Automatic</option>
            <option value="adjustment">Adjustment</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <!-- Method Filter -->
          <select
            v-model="selectedMethod"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Methods</option>
            <option value="fifo">FIFO</option>
            <option value="lifo">LIFO</option>
            <option value="weighted_average">Weighted Average</option>
            <option value="standard_cost">Standard Cost</option>
            <option value="moving_average">Moving Average</option>
            <option value="specific_identification">Specific Identification</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3">
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear Filters
          </button>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Valuation
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:p-6">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </div>
        </div>

        <div v-else-if="!hasItems" class="text-center py-8 text-gray-500">No valuations found</div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('valuationNumber', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Valuation Number
                  <svg
                    v-if="sortBy === 'valuationNumber'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('type', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Type
                  <svg
                    v-if="sortBy === 'type'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('status', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Status
                  <svg
                    v-if="sortBy === 'status'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('method', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Method
                  <svg
                    v-if="sortBy === 'method'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('date', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Date
                  <svg
                    v-if="sortBy === 'date'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('totalValue', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Total Value
                  <svg
                    v-if="sortBy === 'totalValue'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('performedByName', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Performed By
                  <svg
                    v-if="sortBy === 'performedByName'"
                    :class="sortOrder === 'asc' ? 'transform rotate-180' : ''"
                    class="w-4 h-4 inline ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.valuationNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.type) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusBadgeClass(item.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ formatEnum(item.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.method) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(item.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.totalValue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.performedByName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewItem(item)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
    >
      <div class="flex-1 flex justify-between sm:hidden">
        <button
          @click="setPage(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          @click="setPage(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p class="text-sm text-gray-700">
            Showing
            <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span>
            of
            <span class="font-medium">{{ totalItems }}</span>
            results
          </p>
        </div>
        <div>
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              @click="setPage(currentPage - 1)"
              :disabled="currentPage <= 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Previous</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="setPage(page)"
              :class="[
                page === currentPage
                  ? 'z-10 bg-sap-blue border-sap-blue text-white'
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
              ]"
            >
              {{ page }}
            </button>
            <button
              @click="setPage(currentPage + 1)"
              :disabled="currentPage >= totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Next</span>
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ValuationForm
      v-if="showCreateModal || showEditModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeModals"
      @submit="handleFormSubmit"
    />

    <ValuationView v-if="showViewModal && selectedItem" :item="selectedItem" @close="closeModals" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useValuationStore } from '../stores'
import { ValuationStatus, ValuationType, ValuationMethod } from '../types'
import type { InventoryValuation, ValuationFormData } from '../types'

// Async components
const ValuationForm = defineAsyncComponent(() => import('../components/ValuationForm.vue'))
const ValuationView = defineAsyncComponent(() => import('../components/ValuationView.vue'))

// Store
const valuationStore = useValuationStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedMethod = ref('')

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<InventoryValuation | null>(null)

// Computed
const {
  loading,
  stats,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  hasItems,
  paginatedItems,
  sortBy,
  sortOrder,
} = valuationStore

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatEnum = (value: string): string => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusBadgeClass = (status: ValuationStatus): string => {
  switch (status) {
    case ValuationStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case ValuationStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800'
    case ValuationStatus.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800'
    case ValuationStatus.COMPLETED:
      return 'bg-green-100 text-green-800'
    case ValuationStatus.APPROVED:
      return 'bg-green-100 text-green-800'
    case ValuationStatus.CANCELLED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const setPage = (page: number) => {
  valuationStore.setPage(page)
}

const setSorting = (field: string, order: 'asc' | 'desc') => {
  valuationStore.setSorting(field, order)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
  selectedMethod.value = ''
  valuationStore.clearFilters()
}

const viewItem = (item: InventoryValuation) => {
  selectedItem.value = item
  showViewModal.value = true
}

const editItem = (item: InventoryValuation) => {
  selectedItem.value = item
  showEditModal.value = true
}

const deleteItem = async (item: InventoryValuation) => {
  if (confirm(`Are you sure you want to delete valuation ${item.valuationNumber}?`)) {
    try {
      await valuationStore.deleteValuation(item.id)
    } catch (error) {
      console.error('Error deleting valuation:', error)
    }
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: ValuationFormData) => {
  try {
    if (selectedItem.value) {
      await valuationStore.updateValuation(selectedItem.value.id, data)
    } else {
      await valuationStore.createValuation(data)
    }
    closeModals()
  } catch (error) {
    console.error('Error saving valuation:', error)
  }
}

// Lifecycle
onMounted(() => {
  valuationStore.fetchStats()
  valuationStore.fetchValuations()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedMethod],
  () => {
    const filters: Partial<typeof valuationStore.filters> = {}

    if (searchQuery.value) filters.search = searchQuery.value
    if (selectedType.value) filters.type = selectedType.value as ValuationType
    if (selectedStatus.value) filters.status = selectedStatus.value as ValuationStatus
    if (selectedMethod.value) filters.method = selectedMethod.value as ValuationMethod

    valuationStore.setFilters(filters)
  },
  { deep: true },
)
</script>
