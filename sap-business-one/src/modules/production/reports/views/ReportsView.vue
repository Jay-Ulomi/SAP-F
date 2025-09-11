<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Production Reports</h1>
        <p class="text-sm text-gray-600">Generate and manage production analytics and reports</p>
      </div>
      <button @click="openGenerateModal" class="btn-primary">Generate Report</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Reports</p>
            <p class="text-xl font-bold text-gray-900">{{ reportsStore.reports.length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Today</p>
            <p class="text-xl font-bold text-gray-900">{{ reportsStore.getReportsGeneratedToday() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">This Month</p>
            <p class="text-xl font-bold text-gray-900">{{ reportsStore.getReportsGeneratedThisMonth() }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Scheduled</p>
            <p class="text-xl font-bold text-gray-900">{{ reportsStore.getActiveSchedules().length }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Quick Generate</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          @click="quickGenerate('production_overview')"
          class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
        >
          <div class="text-sm font-medium text-gray-900">Production Overview</div>
          <div class="text-xs text-gray-500 mt-1">Current period summary</div>
        </button>
        <button
          @click="quickGenerate('efficiency_analysis')"
          class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
        >
          <div class="text-sm font-medium text-gray-900">Efficiency Analysis</div>
          <div class="text-xs text-gray-500 mt-1">OEE and performance metrics</div>
        </button>
        <button
          @click="quickGenerate('quality_report')"
          class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
        >
          <div class="text-sm font-medium text-gray-900">Quality Report</div>
          <div class="text-xs text-gray-500 mt-1">Quality metrics and trends</div>
        </button>
        <button
          @click="quickGenerate('cost_analysis')"
          class="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left"
        >
          <div class="text-sm font-medium text-gray-900">Cost Analysis</div>
          <div class="text-xs text-gray-500 mt-1">Cost breakdown and variance</div>
        </button>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search reports..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="production_overview">Production Overview</option>
            <option value="efficiency_analysis">Efficiency Analysis</option>
            <option value="cost_analysis">Cost Analysis</option>
            <option value="quality_report">Quality Report</option>
            <option value="resource_utilization">Resource Utilization</option>
            <option value="material_consumption">Material Consumption</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterPeriod"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Periods</option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="this_week">This Week</option>
            <option value="last_week">Last Week</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Reports Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Generated Reports</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Report Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Range
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Generated By
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="report in filteredReports" :key="report.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ report.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ formatReportType(report.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 capitalize">
                  {{ formatPeriod(report.period) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(report.dateFrom).toLocaleDateString() }} - {{ new Date(report.dateTo).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(report.generatedAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ report.generatedBy }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewReport(report)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button
                    @click="showExportModal(report)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Export
                  </button>
                  <button
                    @click="handleDeleteReport(report.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredReports.length === 0" class="text-center py-8">
          <p class="text-gray-500">No reports found.</p>
        </div>
      </div>
    </div>

    <!-- Generate Report Modal -->
    <div v-if="showGenerateReportModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Generate Report</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              v-model="generateForm.type"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="production_overview">Production Overview</option>
              <option value="efficiency_analysis">Efficiency Analysis</option>
              <option value="cost_analysis">Cost Analysis</option>
              <option value="quality_report">Quality Report</option>
              <option value="resource_utilization">Resource Utilization</option>
              <option value="material_consumption">Material Consumption</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Period</label>
            <select
              v-model="generateForm.period"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="this_week">This Week</option>
              <option value="last_week">Last Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div v-if="generateForm.period === 'custom'" class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input
                type="date"
                v-model="generateForm.dateFrom"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input
                type="date"
                v-model="generateForm.dateTo"
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleGenerateReport"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ loading ? 'Generating...' : 'Generate Report' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportReportModal && selectedReport" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Export Report</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
          <select
            v-model="selectedExportFormat"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pdf">PDF</option>
            <option value="excel">Excel</option>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleExportReport"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ loading ? 'Exporting...' : 'Export' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Report Viewer Modal -->
    <div v-if="reportsStore.showReportViewer && reportsStore.currentReport" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-4 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white min-h-[calc(100vh-2rem)]">
        <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h3 class="text-lg font-medium text-gray-900">{{ reportsStore.currentReport.name }}</h3>
          <button @click="reportsStore.closeReportViewer()" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <ReportViewer
            :report="reportsStore.currentReport"
            @export="handleReportExport"
            @print="handleReportPrint"
            @close="reportsStore.closeReportViewer()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductionReportsStore } from '../stores/productionReportsStore'
import ReportViewer from '../components/ReportViewer.vue'
import type { ProductionReport } from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'

const reportsStore = useProductionReportsStore()

const loading = ref(false)
const showGenerateReportModal = ref(false)
const showExportReportModal = ref(false)
const selectedReport = ref<ProductionReport | null>(null)
const selectedExportFormat = ref<ReportFormat>(ReportFormat.PDF)

// Generate form
const generateForm = ref({
  type: ReportType.PRODUCTION_OVERVIEW,
  period: ReportPeriod.THIS_WEEK,
  dateFrom: '',
  dateTo: ''
})

// Filters
const searchQuery = ref('')
const filterType = ref('')
const filterPeriod = ref('')

const filteredReports = computed(() => {
  let filtered = reportsStore.reports

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      report =>
        report.name.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.generatedBy.toLowerCase().includes(query)
    )
  }

  if (filterType.value) {
    filtered = filtered.filter(report => report.type === filterType.value)
  }

  if (filterPeriod.value) {
    filtered = filtered.filter(report => report.period === filterPeriod.value)
  }

  return filtered.sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
})

// Utility functions
function formatReportType(type: ReportType): string {
  return type.replace(/_/g, ' ')
}

function formatPeriod(period: ReportPeriod): string {
  return period.replace(/_/g, ' ')
}

function getDateRange(period: ReportPeriod): { dateFrom: string, dateTo: string } {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (period) {
    case 'today':
      return {
        dateFrom: today.toISOString(),
        dateTo: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1).toISOString()
      }
    case 'yesterday':
      const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
      return {
        dateFrom: yesterday.toISOString(),
        dateTo: new Date(yesterday.getTime() + 24 * 60 * 60 * 1000 - 1).toISOString()
      }
    case 'this_week':
      const weekStart = new Date(today.getTime() - today.getDay() * 24 * 60 * 60 * 1000)
      const weekEnd = new Date(weekStart.getTime() + 7 * 24 * 60 * 60 * 1000 - 1)
      return {
        dateFrom: weekStart.toISOString(),
        dateTo: weekEnd.toISOString()
      }
    case 'this_month':
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)
      return {
        dateFrom: monthStart.toISOString(),
        dateTo: monthEnd.toISOString()
      }
    default:
      return {
        dateFrom: today.toISOString(),
        dateTo: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1).toISOString()
      }
  }
}

// Modal controls
function openGenerateModal() {
  showGenerateReportModal.value = true
}

function showExportModal(report: ProductionReport) {
  selectedReport.value = report
  showExportReportModal.value = true
}

function closeModals() {
  showGenerateReportModal.value = false
  showExportReportModal.value = false
  selectedReport.value = null
  selectedExportFormat.value = ReportFormat.PDF
}

function viewReport(report: ProductionReport) {
  try {
    reportsStore.openReportViewer(report)
  } catch (error) {
    console.error('Error opening report viewer:', error)
  }
}

// Actions
async function quickGenerate(type: ReportType) {
  const { dateFrom, dateTo } = getDateRange(ReportPeriod.THIS_WEEK)
  
  loading.value = true
  try {
    await reportsStore.generateReport(type, ReportPeriod.THIS_WEEK, dateFrom, dateTo)
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    loading.value = false
  }
}

async function handleGenerateReport() {
  let dateFrom = generateForm.value.dateFrom
  let dateTo = generateForm.value.dateTo
  
  if (generateForm.value.period !== 'custom') {
    const range = getDateRange(generateForm.value.period)
    dateFrom = range.dateFrom
    dateTo = range.dateTo
  }
  
  loading.value = true
  try {
    await reportsStore.generateReport(
      generateForm.value.type,
      generateForm.value.period,
      dateFrom,
      dateTo
    )
    closeModals()
  } catch (error) {
    console.error('Error generating report:', error)
  } finally {
    loading.value = false
  }
}

async function handleExportReport() {
  if (!selectedReport.value) return
  
  loading.value = true
  try {
    const blob = await reportsStore.exportReport(selectedReport.value.id, selectedExportFormat.value)
    
    // Create download link
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = `${selectedReport.value.name}.${selectedExportFormat.value}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    
    closeModals()
  } catch (error) {
    console.error('Error exporting report:', error)
  } finally {
    loading.value = false
  }
}

async function handleDeleteReport(id: string) {
  if (confirm('Are you sure you want to delete this report?')) {
    try {
      await reportsStore.deleteReport(id)
    } catch (error) {
      console.error('Error deleting report:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterType.value = ''
  filterPeriod.value = ''
}

// Report Viewer Event Handlers
function handleReportExport(report: ProductionReport, format: string) {
  selectedReport.value = report
  selectedExportFormat.value = format as ReportFormat
  handleExportReport()
}

function handleReportPrint(report: ProductionReport) {
  // Trigger print dialog
  window.print()
}

onMounted(() => {
  reportsStore.fetchReports()
})
</script>
