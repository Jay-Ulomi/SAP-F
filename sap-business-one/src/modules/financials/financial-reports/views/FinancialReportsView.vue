<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Financial Reports</h1>
        <p class="text-gray-600 mt-1">Generate, manage, and schedule financial reports</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Create Report
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Reports</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalReports || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Generated</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.generatedReports || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Scheduled</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.scheduledReports || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Templates</p>
            <p class="text-2xl font-semibold text-gray-900">{{ templates.length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Report Cards -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Reports</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="border border-gray-200 rounded-lg p-4 hover:border-sap-blue cursor-pointer transition-colors" @click="generateQuickReport(ReportCategory.BALANCE_SHEET)">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-sap-blue mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            <span class="font-medium text-gray-900">Balance Sheet</span>
          </div>
          <p class="text-sm text-gray-600">Generate current balance sheet report</p>
        </div>

        <div class="border border-gray-200 rounded-lg p-4 hover:border-sap-blue cursor-pointer transition-colors" @click="generateQuickReport(ReportCategory.INCOME_STATEMENT)">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
            <span class="font-medium text-gray-900">Income Statement</span>
          </div>
          <p class="text-sm text-gray-600">Generate profit & loss statement</p>
        </div>

        <div class="border border-gray-200 rounded-lg p-4 hover:border-sap-blue cursor-pointer transition-colors" @click="generateQuickReport(ReportCategory.CASH_FLOW)">
          <div class="flex items-center mb-2">
            <svg class="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <span class="font-medium text-gray-900">Cash Flow</span>
          </div>
          <p class="text-sm text-gray-600">Generate cash flow statement</p>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search reports..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedCategory"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option v-for="category in reportCategories" :key="category" :value="category">
              {{ formatCategory(category) }}
            </option>
          </select>
          <select
            v-model="selectedStatus"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option v-for="status in reportStatuses" :key="status" :value="status">
              {{ formatStatus(status) }}
            </option>
          </select>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Reports</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Report Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Period
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Generated
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in filteredReports" :key="report.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                <div class="text-sm text-gray-500">{{ report.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatCategory(report.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusClass(report.status)"
                >
                  {{ formatStatus(report.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPeriod(report.period) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ report.generatedDate ? formatDate(report.generatedDate) : 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewReport(report)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editReport(report)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="generateReport(report.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Generate
                  </button>
                  <button
                    @click="deleteReport(report.id)"
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

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="!pagination.hasPrev"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNext"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>


    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-sap-blue" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span class="ml-3 text-gray-600">Loading reports...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Reports</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import FinancialReportForm from '../components/FinancialReportForm.vue'
import { useFinancialReportsStore } from '../stores/financialReportsStore'
import type { FinancialReport, FinancialReportFormData } from '../types'
import { ReportCategory, ReportStatus, ReportFormat, ReportPeriod } from '../types'

// Store
const store = useFinancialReportsStore()

// Local state - CRM Modal Pattern
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<FinancialReport | null>(null)
const selectedItem = ref<FinancialReport | null>(null)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

// Computed properties
const reports = computed(() => store.reports)
const templates = computed(() => store.templates)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)

const filteredReports = computed(() => {
  let filtered = reports.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(report =>
      report.name.toLowerCase().includes(query) ||
      report.description.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(report => report.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(report => report.status === selectedStatus.value)
  }

  return filtered
})

const reportCategories = computed(() => Object.values(ReportCategory))
const reportStatuses = computed(() => Object.values(ReportStatus))

// Methods
const loadReports = async (page = 1) => {
  try {
    await store.loadReports({ page, filters: {} })
  } catch (err) {
    console.error('Failed to load reports:', err)
  }
}

const loadTemplates = async () => {
  try {
    await store.loadTemplates()
  } catch (err) {
    console.error('Failed to load templates:', err)
  }
}

const loadStats = async () => {
  try {
    await store.loadReportStats()
  } catch (err) {
    console.error('Failed to load stats:', err)
  }
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: FinancialReport) => {
  editingItem.value = item
  isCreateModalOpen.value = true
  closeViewModal()
}

const viewReport = (report: FinancialReport) => {
  openViewModal(report)
}

const editReport = (report: FinancialReport) => {
  openEditModal(report)
}

const openViewModal = (item: FinancialReport) => {
  selectedItem.value = item
  isViewModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editingItem.value = null
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedItem.value = null
}

// Pagination methods
const nextPage = () => {
  if (pagination.value.hasMore) {
    loadReports(pagination.value.page + 1)
  }
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    loadReports(pagination.value.page - 1)
  }
}

const handleSubmit = async (data: FinancialReportFormData) => {
  try {
    if (editingItem.value) {
      await store.updateReport(editingItem.value.id, data)
    } else {
      await store.createReport(data)
    }
    closeCreateModal()
    await loadReports()
    await loadStats()
  } catch (err) {
    console.error('Failed to save report:', err)
  }
}


const generateReport = async (id: string) => {
  try {
    await store.generateReport(id)
    await loadReports()
    await loadStats()
  } catch (err) {
    console.error('Failed to generate report:', err)
  }
}

const deleteReport = async (id: string) => {
  if (confirm('Are you sure you want to delete this report?')) {
    try {
      await store.deleteReport(id)
      await loadReports()
      await loadStats()
    } catch (err) {
      console.error('Failed to delete report:', err)
    }
  }
}

const exportReport = async (id: string, format: string) => {
  try {
    await store.exportReport(id, format)
  } catch (err) {
    console.error('Failed to export report:', err)
  }
}

const generateQuickReport = async (category: ReportCategory) => {
  try {
    const quickReportData: FinancialReportFormData = {
      name: `${formatCategory(category)} - ${new Date().toLocaleDateString()}`,
      description: `Quick ${formatCategory(category).toLowerCase()} report`,
      category,
      format: ReportFormat.PDF,
      period: ReportPeriod.MONTHLY,
      fiscalYear: new Date().getFullYear().toString(),
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
      endDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0],
      parameters: {
        includeZeroBalances: false,
        includeClosedAccounts: false,
        includeAdjustments: false,
        showComparisons: true,
        comparisonPeriods: 1,
        includeCharts: true,
        includeNotes: false,
        pageBreak: false,
        orientation: 'PORTRAIT',
        paperSize: 'A4',
        margins: { top: 20, bottom: 20, left: 20, right: 20 }
      },
      filters: {},
      isRecurring: false,
      notes: 'Generated from quick report'
    }

    const newReport = await store.createReport(quickReportData)
    await store.generateReport(newReport.id)
    await loadReports()
    await loadStats()
  } catch (err) {
    console.error('Failed to generate quick report:', err)
  }
}

const handleFilterChange = () => {
  // Implement filter logic if needed
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
}

const retryLoad = () => {
  store.clearError()
  loadReports()
}

// Utility functions
const formatCategory = (category: ReportCategory): string => {
  return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatStatus = (status: ReportStatus): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatPeriod = (period: ReportPeriod): string => {
  return period.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const getStatusClass = (status: ReportStatus): string => {
  switch (status) {
    case ReportStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case ReportStatus.GENERATED:
      return 'bg-blue-100 text-blue-800'
    case ReportStatus.APPROVED:
      return 'bg-green-100 text-green-800'
    case ReportStatus.PUBLISHED:
      return 'bg-purple-100 text-purple-800'
    case ReportStatus.ARCHIVED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    loadReports(),
    loadTemplates(),
    loadStats()
  ])
})
</script>
