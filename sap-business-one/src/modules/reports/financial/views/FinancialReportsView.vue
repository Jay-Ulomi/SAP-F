<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Financial Reports</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.totalRevenue?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Expenses</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.totalExpenses?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
            />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Net Profit</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.netProfit?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Active Reports</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.activeReports || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchParams.search"
            type="text"
            placeholder="Search reports..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.reportType"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="BALANCE_SHEET">Balance Sheet</option>
            <option value="PROFIT_LOSS">Profit & Loss</option>
            <option value="CASH_FLOW">Cash Flow</option>
            <option value="BUDGET_VARIANCE">Budget Variance</option>
            <option value="GENERAL_LEDGER">General Ledger</option>
          </select>
          <input
            v-model="searchParams.dateFrom"
            type="date"
            placeholder="Date From"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <input
            v-model="searchParams.dateTo"
            type="date"
            placeholder="Date To"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
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

    <!-- Financial Reports Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading reports...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button
          @click="financialStore.loadReports"
          class="mt-2 text-blue-600 hover:text-blue-800"
        >
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
                  Report
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Period
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Created
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="report in reportsList" :key="report.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ report.description || 'No description' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatReportType(report.type) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDatePeriod(report.dateFrom, report.dateTo) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(report.status)">
                    {{ formatStatus(report.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(report.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ report.totalAmount?.toLocaleString() || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewReport(report)"
                      class="text-blue-600 hover:text-blue-900"
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
                      @click="exportReport(report)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Export
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (pagination.page - 1) * 10 + 1 }} to
                {{ Math.min(pagination.page * 10, pagination.total) }} of
                {{ pagination.total }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Financial Report Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingReport ? 'Edit Financial Report' : 'Create New Financial Report' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <FinancialReportForm
          :report="editingReport"
          :loading="submitting"
          @submit="submitReport"
          @cancel="closeModal"
        />
      </div>
    </div>

    <!-- View Financial Report Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Financial Report Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <FinancialReportView v-if="selectedReport" :report="selectedReport" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import FinancialReportForm from '../components/FinancialReportForm.vue'
import FinancialReportView from '../components/FinancialReportView.vue'
import type { FinancialReport, FinancialReportFormData, FinancialSearchParams } from '../types'
import { useFinancialReportsStore } from '../stores'

// Store
const financialStore = useFinancialReportsStore()

// State
const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingReport = ref<FinancialReport | null>(null)
const selectedReport = ref<FinancialReport | null>(null)
const submitting = ref(false)

// Computed from store
const reportsList = computed(() => financialStore.reports)
const loading = computed(() => financialStore.loading)
const error = computed(() => financialStore.error)
const pagination = computed(() => financialStore.pagination)
const stats = computed(() => financialStore.stats || {
  totalRevenue: 0,
  totalExpenses: 0,
  netProfit: 0,
  activeReports: 0
})

// Search parameters
const searchParams = reactive<FinancialSearchParams>({
  search: '',
  reportType: '',
  dateFrom: '',
  dateTo: ''
})

// Methods
const handleSearch = () => {
  financialStore.setFilters(searchParams)
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    reportType: '',
    dateFrom: '',
    dateTo: ''
  })
  financialStore.clearFilters()
}

const nextPage = () => {
  financialStore.nextPage()
}

const previousPage = () => {
  financialStore.previousPage()
}

const openCreateModal = () => {
  editingReport.value = null
  showCreateModal.value = true
}

const openEditModal = (report: FinancialReport) => {
  editingReport.value = { ...report }
  showCreateModal.value = true
}

const openViewModal = (report: FinancialReport) => {
  selectedReport.value = report
  showViewModal.value = true
}

const viewReport = (report: FinancialReport) => {
  openViewModal(report)
}

const editReport = (report: FinancialReport) => {
  openEditModal(report)
}

const exportReport = (report: FinancialReport) => {
  financialStore.exportReport(report.id)
}

const submitReport = async (data: FinancialReportFormData) => {
  submitting.value = true
  try {
    if (editingReport.value) {
      await financialStore.updateReport(editingReport.value.id, data)
    } else {
      await financialStore.createReport(data)
    }
    closeModal()
  } catch (err) {
    console.error('Error saving report:', err)
  } finally {
    submitting.value = false
  }
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingReport.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedReport.value = null
}

const closeModal = () => {
  closeCreateModal()
  closeViewModal()
}


// Utility functions
const formatReportType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'COMPLETED':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'PENDING':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'DRAFT':
      return `${baseClasses} bg-gray-100 text-gray-800`
    case 'FAILED':
      return `${baseClasses} bg-red-100 text-red-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDatePeriod = (from: string, to: string) => {
  return `${formatDate(from)} - ${formatDate(to)}`
}

// Lifecycle
onMounted(() => {
  financialStore.loadReports()
  financialStore.loadStats()
})
</script>
