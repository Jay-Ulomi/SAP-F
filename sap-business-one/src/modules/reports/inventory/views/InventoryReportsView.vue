<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Inventory Reports</h1>
          <p class="text-gray-600">
            Generate and analyze comprehensive inventory and stock reports
          </p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateModal"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Generate Report
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Reports</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalReports || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Items Tracked</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.itemsTracked || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Low Stock Items</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.lowStockItems || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Inventory Value</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats?.totalInventoryValue || 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Report Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-sap-blue hover:text-sap-dark-blue"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Reports</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by name or type..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
          <select
            v-model="selectedReportType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="STOCK_STATUS">Stock Status Report</option>
            <option value="VALUATION">Inventory Valuation</option>
            <option value="MOVEMENT">Stock Movement</option>
            <option value="AGING">Aging Report</option>
            <option value="CYCLE_COUNT">Cycle Count</option>
            <option value="LOW_STOCK">Low Stock Alert</option>
            <option value="REORDER">Reorder Report</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="GENERATED">Generated</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="RUNNING">Running</option>
            <option value="COMPLETED">Completed</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select
            v-model="selectedDateRange"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Dates</option>
            <option value="TODAY">Today</option>
            <option value="YESTERDAY">Yesterday</option>
            <option value="THIS_WEEK">This Week</option>
            <option value="LAST_WEEK">Last Week</option>
            <option value="THIS_MONTH">This Month</option>
            <option value="LAST_MONTH">Last Month</option>
            <option value="THIS_YEAR">This Year</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="bg-white border border-gray-200 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Inventory Reports</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading reports...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Reports</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadReports" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredReports.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Reports Found</p>
        <p class="text-sm text-gray-600 mb-4">Generate your first inventory report to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Generate Report</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items Count
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in filteredReports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                    <div class="text-sm text-gray-500">{{ report.description || 'No description' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatReportType(report.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': report.status === 'GENERATED',
                    'bg-yellow-100 text-yellow-800': report.status === 'SCHEDULED',
                    'bg-blue-100 text-blue-800': report.status === 'RUNNING',
                    'bg-green-100 text-green-800': report.status === 'COMPLETED',
                    'bg-red-100 text-red-800': report.status === 'FAILED'
                  }"
                >
                  {{ formatStatus(report.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(report.generatedDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ report.itemsCount || 0 }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewReport(report)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="downloadReport(report)" class="text-green-600 hover:text-green-900">
                    Download
                  </button>
                  <button @click="editReport(report)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteReport(report.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredReports.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredReports.length) }}</span>
              of
              <span class="font-medium">{{ filteredReports.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Generate Report Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ reportToEdit ? 'Edit Report' : 'Generate New Inventory Report' }}
              </h3>
              <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <ReportForm
              :report="reportToEdit"
              :loading="formLoading"
              @submit="handleSubmitReport"
              @cancel="closeCreateModal"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- View Report Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Report Details</h3>
              <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <ReportView v-if="selectedReport" :report="selectedReport" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ReportForm from '../components/ReportForm.vue'
import ReportView from '../components/ReportView.vue'

// Interfaces
interface InventoryReport {
  id: string
  name: string
  description?: string
  type: string
  status: string
  generatedDate: string
  itemsCount: number
  parameters: Record<string, any>
  filePath?: string
}

interface InventoryReportStats {
  totalReports: number
  itemsTracked: number
  lowStockItems: number
  totalInventoryValue: number
}

// Mock data
const mockReports: InventoryReport[] = [
  {
    id: '1',
    name: 'Monthly Stock Status Report',
    description: 'Complete inventory status for all items',
    type: 'STOCK_STATUS',
    status: 'COMPLETED',
    generatedDate: '2024-01-15T10:30:00Z',
    itemsCount: 1245,
    parameters: { includeZeroStock: true, warehouse: 'ALL' }
  },
  {
    id: '2',
    name: 'Inventory Valuation Report',
    description: 'Current valuation of all inventory items',
    type: 'VALUATION',
    status: 'COMPLETED',
    generatedDate: '2024-01-14T09:15:00Z',
    itemsCount: 987,
    parameters: { valuationMethod: 'FIFO' }
  },
  {
    id: '3',
    name: 'Low Stock Alert Report',
    description: 'Items below minimum stock levels',
    type: 'LOW_STOCK',
    status: 'SCHEDULED',
    generatedDate: '2024-01-13T08:45:00Z',
    itemsCount: 45,
    parameters: { criticalOnly: true }
  },
  {
    id: '4',
    name: 'Stock Movement Analysis',
    description: 'Detailed analysis of stock movements last month',
    type: 'MOVEMENT',
    status: 'RUNNING',
    generatedDate: '2024-01-12T14:20:00Z',
    itemsCount: 2345,
    parameters: { dateRange: 'LAST_MONTH' }
  }
]

const mockStats: InventoryReportStats = {
  totalReports: 24,
  itemsTracked: 1245,
  lowStockItems: 45,
  totalInventoryValue: 2847650.00
}

// Local state
const reports = ref<InventoryReport[]>([...mockReports])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<InventoryReportStats>({ ...mockStats })
const formLoading = ref(false)

const showCreateModal = ref(false)
const showViewModal = ref(false)
const reportToEdit = ref<InventoryReport | null>(null)
const selectedReport = ref<InventoryReport | null>(null)

// Filter state
const searchQuery = ref('')
const selectedReportType = ref('')
const selectedStatus = ref('')
const selectedDateRange = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredReports = computed(() => {
  let filtered = reports.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(report =>
      report.name.toLowerCase().includes(query) ||
      report.description?.toLowerCase().includes(query) ||
      report.type.toLowerCase().includes(query)
    )
  }

  if (selectedReportType.value) {
    filtered = filtered.filter(report => report.type === selectedReportType.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(report => report.status === selectedStatus.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredReports.value.length / pageSize.value))

// Methods
const loadReports = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load reports'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  reportToEdit.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  reportToEdit.value = null
}

const viewReport = (report: InventoryReport) => {
  selectedReport.value = report
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedReport.value = null
}

const editReport = (report: InventoryReport) => {
  reportToEdit.value = report
  showCreateModal.value = true
}

const downloadReport = (report: InventoryReport) => {
  // Simulate download
  const link = document.createElement('a')
  link.href = `#/reports/download/${report.id}`
  link.download = `${report.name.replace(/\s+/g, '_')}.pdf`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const deleteReport = async (id: string) => {
  if (confirm('Are you sure you want to delete this report?')) {
    try {
      reports.value = reports.value.filter(r => r.id !== id)
      stats.value.totalReports--
    } catch (err) {
      console.error('Failed to delete report:', err)
    }
  }
}

const handleSubmitReport = async (reportData: any) => {
  try {
    formLoading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (reportToEdit.value) {
      // Update existing report
      const index = reports.value.findIndex(r => r.id === reportToEdit.value!.id)
      if (index !== -1) {
        reports.value[index] = { ...reports.value[index], ...reportData }
      }
    } else {
      // Create new report
      const newReport: InventoryReport = {
        id: Date.now().toString(),
        ...reportData,
        status: 'GENERATED',
        generatedDate: new Date().toISOString(),
        itemsCount: Math.floor(Math.random() * 1000) + 100
      }
      reports.value.unshift(newReport)
      stats.value.totalReports++
    }
    
    closeCreateModal()
  } catch (err) {
    console.error('Failed to save report:', err)
  } finally {
    formLoading.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedReportType.value = ''
  selectedStatus.value = ''
  selectedDateRange.value = ''
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatReportType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'STOCK_STATUS': 'Stock Status',
    'VALUATION': 'Valuation',
    'MOVEMENT': 'Movement',
    'AGING': 'Aging',
    'CYCLE_COUNT': 'Cycle Count',
    'LOW_STOCK': 'Low Stock',
    'REORDER': 'Reorder'
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'GENERATED': 'Generated',
    'SCHEDULED': 'Scheduled',
    'RUNNING': 'Running',
    'COMPLETED': 'Completed',
    'FAILED': 'Failed'
  }
  return statusMap[status] || status
}

// Lifecycle
onMounted(() => {
  loadReports()
})
</script>