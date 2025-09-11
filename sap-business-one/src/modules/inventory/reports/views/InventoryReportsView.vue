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
                <dt class="text-sm font-medium text-gray-500 truncate">Total Reports</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.totalReports || 0 }}
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
                  {{ stats?.completedReports || 0 }}
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
                <dt class="text-sm font-medium text-gray-500 truncate">Running</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.runningReports || 0 }}
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Scheduled</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.scheduledReports || 0 }}
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
              placeholder="Search reports..."
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
            <option value="inventory_summary">Inventory Summary</option>
            <option value="stock_movement">Stock Movement</option>
            <option value="valuation_report">Valuation Report</option>
            <option value="aging_analysis">Aging Analysis</option>
            <option value="abc_analysis">ABC Analysis</option>
            <option value="turnover_analysis">Turnover Analysis</option>
            <option value="cost_analysis">Cost Analysis</option>
            <option value="warehouse_utilization">Warehouse Utilization</option>
            <option value="item_performance">Item Performance</option>
            <option value="custom_report">Custom Report</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Categories</option>
            <option value="operational">Operational</option>
            <option value="financial">Financial</option>
            <option value="analytical">Analytical</option>
            <option value="compliance">Compliance</option>
            <option value="custom">Custom</option>
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
            Create Report
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

        <div v-else-if="!hasItems" class="text-center py-8 text-gray-500">No reports found</div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  @click="setSorting('reportName', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Report Name
                  <svg
                    v-if="sortBy === 'reportName'"
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
                  @click="setSorting('reportType', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Type
                  <svg
                    v-if="sortBy === 'reportType'"
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
                  @click="setSorting('format', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Format
                  <svg
                    v-if="sortBy === 'format'"
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
                  @click="setSorting('frequency', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Frequency
                  <svg
                    v-if="sortBy === 'frequency'"
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
                  @click="setSorting('generatedDate', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Generated Date
                  <svg
                    v-if="sortBy === 'generatedDate'"
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
                  @click="setSorting('generatedByName', sortOrder === 'asc' ? 'desc' : 'asc')"
                >
                  Generated By
                  <svg
                    v-if="sortBy === 'generatedByName'"
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
                  {{ item.reportName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.reportType) }}
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
                  {{ item.format.toUpperCase() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.frequency) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.generatedDate ? formatDate(item.generatedDate) : '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.generatedByName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewItem(item)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button
                    v-if="item.status === 'draft' || item.status === 'scheduled'"
                    @click="executeItem(item)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Execute
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
    <ReportForm
      v-if="showCreateModal || showEditModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeModals"
      @submit="handleFormSubmit"
    />

    <ReportView v-if="showViewModal && selectedItem" :item="selectedItem" @close="closeModals" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useReportsStore } from '../stores'
import { ReportStatus, ReportType, ReportCategory } from '../types'
import type { InventoryReport, ReportFormData } from '../types'

// Async components
const ReportForm = defineAsyncComponent(() => import('../components/ReportForm.vue'))
const ReportView = defineAsyncComponent(() => import('../components/ReportView.vue'))

// Store
const reportsStore = useReportsStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedCategory = ref('')

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<InventoryReport | null>(null)

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
} = reportsStore

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

const setPage = (page: number) => {
  reportsStore.setPage(page)
}

const setSorting = (field: string, order: 'asc' | 'desc') => {
  reportsStore.setSorting(field, order)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
  selectedCategory.value = ''
  reportsStore.clearFilters()
}

const viewItem = (item: InventoryReport) => {
  selectedItem.value = item
  showViewModal.value = true
}

const editItem = (item: InventoryReport) => {
  selectedItem.value = item
  showEditModal.value = true
}

const executeItem = async (item: InventoryReport) => {
  if (confirm(`Are you sure you want to execute report "${item.reportName}"?`)) {
    try {
      await reportsStore.executeReport(item.id)
    } catch (error) {
      console.error('Error executing report:', error)
    }
  }
}

const deleteItem = async (item: InventoryReport) => {
  if (confirm(`Are you sure you want to delete report "${item.reportName}"?`)) {
    try {
      await reportsStore.deleteReport(item.id)
    } catch (error) {
      console.error('Error deleting report:', error)
    }
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: ReportFormData) => {
  try {
    if (selectedItem.value) {
      await reportsStore.updateReport(selectedItem.value.id, data)
    } else {
      await reportsStore.createReport(data)
    }
    closeModals()
  } catch (error) {
    console.error('Error saving report:', error)
  }
}

// Lifecycle
onMounted(() => {
  reportsStore.fetchStats()
  reportsStore.fetchReports()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedCategory],
  () => {
    const filters: Partial<typeof reportsStore.filters> = {}

    if (searchQuery.value) filters.search = searchQuery.value
    if (selectedType.value) filters.reportType = selectedType.value as ReportType
    if (selectedStatus.value) filters.status = selectedStatus.value as ReportStatus
    if (selectedCategory.value) filters.category = selectedCategory.value as ReportCategory

    reportsStore.setFilters(filters)
  },
  { deep: true },
)
</script>
