<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Opportunity Reports & Analytics</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Create Report
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Total Reports</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalReports || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Scheduled Reports</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.scheduledReports || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">This Month</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.reportsThisMonth || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Most Used Type</h3>
        <p class="mt-1 text-sm font-semibold text-gray-900">
          {{ formatReportType(stats?.mostUsedType || '') }}
        </p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Avg Generation Time</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stats?.averageGenerationTime || 0 }}s
        </p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          @keyup.enter="applyFilters"
          type="text"
          placeholder="Search reports..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        />
        <select
          v-model="filters.type"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="OPPORTUNITY_PERFORMANCE">Opportunity Performance</option>
          <option value="PIPELINE_ANALYSIS">Pipeline Analysis</option>
          <option value="LEAD_CONVERSION">Lead Conversion</option>
          <option value="SALES_FORECAST">Sales Forecast</option>
          <option value="TEAM_PERFORMANCE">Team Performance</option>
          <option value="STAGE_ANALYSIS">Stage Analysis</option>
          <option value="WIN_LOSS_ANALYSIS">Win/Loss Analysis</option>
          <option value="REVENUE_TRACKING">Revenue Tracking</option>
        </select>
        <select
          v-model="filters.period"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Periods</option>
          <option value="DAILY">Daily</option>
          <option value="WEEKLY">Weekly</option>
          <option value="MONTHLY">Monthly</option>
          <option value="QUARTERLY">Quarterly</option>
          <option value="YEARLY">Yearly</option>
          <option value="CUSTOM">Custom</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Reports</h3>
      </div>
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
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading reports...</td>
            </tr>
            <tr v-else-if="reports.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">No reports found.</td>
            </tr>
            <tr v-for="report in reports" :key="report.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ report.description || 'No description' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatReportType(report.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatReportPeriod(report.period) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="
                    report.isScheduled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  "
                >
                  {{ report.isScheduled ? 'Scheduled' : 'Manual' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(report.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="generateReport(report)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="Generate"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="editReport(report)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="exportReport(report.id)"
                    class="text-green-600 hover:text-green-900"
                    title="Export"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteReport(report.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="!pagination.hasPrev"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!pagination.hasNext"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
              {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                @click="goToPage(p)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  pagination.page === p
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeCreateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingReport ? 'Edit Report' : 'Create New Report' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ReportForm
          :report="editingReport"
          :loading="loading"
          @submit="handleSubmitReport"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- Report View Modal -->
    <div
      v-if="showViewModal && currentReportData"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeViewModal"
    >
      <div
        class="relative top-10 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Report Results</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="exportCurrentReport"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Export
            </button>
            <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <ReportView :report-data="currentReportData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useReportsStore } from '../stores'
const ReportForm = defineAsyncComponent(() => import('../components/ReportForm.vue'))
const ReportView = defineAsyncComponent(() => import('../components/ReportView.vue'))
import type { ReportConfig, ReportFormData, ReportListFilters } from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

const reportsStore = useReportsStore()

const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingReport = ref<ReportConfig | null>(null)

const searchQuery = ref('')
const filters = ref<ReportListFilters>({ type: undefined, period: undefined })

const reports = computed(() => reportsStore.reports)
const loading = computed(() => reportsStore.loading)
const stats = computed(() => reportsStore.stats)
const pagination = computed(() => reportsStore.pagination)
const currentReportData = computed(() => reportsStore.currentReportData)

const openCreateModal = () => {
  editingReport.value = null
  showCreateModal.value = true
}

const editReport = (report: ReportConfig) => {
  editingReport.value = { ...report }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingReport.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  reportsStore.clearCurrentReportData()
}

const handleSubmitReport = async (data: ReportFormData) => {
  if (editingReport.value) {
    await reportsStore.updateReport(editingReport.value.id, data)
  } else {
    await reportsStore.createReport(data)
  }
  closeCreateModal()
  await loadData()
}

const generateReport = async (report: ReportConfig) => {
  const reportData = await reportsStore.generateReport(report.id)
  if (reportData) {
    showViewModal.value = true
  }
}

const exportReport = async (reportId: string) => {
  await reportsStore.exportReport(reportId, ReportFormat.PDF)
}

const exportCurrentReport = async () => {
  if (currentReportData.value) {
    await reportsStore.exportReport(currentReportData.value.id, ReportFormat.PDF)
  }
}

const deleteReport = async (id: string) => {
  if (!confirm('Delete this report configuration?')) return
  await reportsStore.deleteReport(id)
  await loadData()
}

const applyFilters = async () => {
  const newFilters: ReportListFilters = {}
  if (searchQuery.value.trim()) newFilters.search = searchQuery.value.trim()
  if (filters.value.type) newFilters.type = filters.value.type as ReportType
  if (filters.value.period) newFilters.period = filters.value.period as ReportPeriod
  reportsStore.setFilters(newFilters)
  await reportsStore.loadReports(1, 10, newFilters)
}

const clearFilters = async () => {
  searchQuery.value = ''
  filters.value = { type: undefined, period: undefined }
  reportsStore.setFilters({})
  await reportsStore.loadReports()
}

const nextPage = async () => {
  if (pagination.value.hasNext) await reportsStore.loadReports(pagination.value.page + 1)
}

const previousPage = async () => {
  if (pagination.value.hasPrev) await reportsStore.loadReports(pagination.value.page - 1)
}

const goToPage = async (p: number) => {
  await reportsStore.loadReports(p)
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))

const formatReportType = (type: string) => {
  if (!type) return ''
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReportPeriod = (period: string) => {
  return period.charAt(0) + period.slice(1).toLowerCase()
}

const loadData = async () => {
  await reportsStore.loadReports()
  await reportsStore.loadStats()
}

onMounted(loadData)
</script>
