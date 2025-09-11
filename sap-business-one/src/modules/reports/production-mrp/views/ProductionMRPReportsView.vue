<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Production & MRP Reports</h1>
          <p class="text-gray-600">
            Generate production orders, MRP recommendations, and capacity planning reports
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Report
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingReport ? 'Edit Report' : 'New Production Report' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
          :loading="submitting"
          @submit="submitReport"
          @cancel="closeModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white max-h-screen overflow-y-auto">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Production Report</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
        <ReportView :report="selectedReport" :loading="loading" />
      </div>
    </div>

    <!-- Reports List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Production Reports</h3>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        </div>

        <div v-else-if="reports.length === 0" class="text-center py-8 text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No reports</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by generating your first production report.</p>
        </div>

        <div v-else class="grid gap-4">
          <div
            v-for="report in reports"
            :key="report.id"
            class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-900">{{ report.name }}</h4>
                <p v-if="report.description" class="text-gray-600 mt-1">{{ report.description }}</p>
                <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ formatReportType(report.type) }}</span>
                  <span>{{ formatDateRange(report.dateFrom, report.dateTo) }}</span>
                  <span>Generated: {{ formatDate(report.createdAt) }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="viewReport(report)"
                  class="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue"
                >
                  View
                </button>
                <button
                  @click="editReport(report)"
                  class="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ReportForm from '../components/ReportForm.vue'
import ReportView from '../components/ReportView.vue'

// State
const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingReport = ref(null)
const selectedReport = ref(null)
const submitting = ref(false)
const loading = ref(false)
const reports = ref([])

// Methods
const openCreateModal = () => {
  editingReport.value = null
  showCreateModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showViewModal.value = false
  editingReport.value = null
  selectedReport.value = null
}

const submitReport = async (data) => {
  submitting.value = true
  try {
    console.log('Submitting report:', data)
    closeModal()
    await loadReports()
  } catch (err) {
    console.error('Error saving report:', err)
  } finally {
    submitting.value = false
  }
}

const viewReport = async (report) => {
  loading.value = true
  try {
    console.log('Viewing report:', report)
    selectedReport.value = report
    showViewModal.value = true
  } catch (err) {
    console.error('Error loading report:', err)
  } finally {
    loading.value = false
  }
}

const editReport = (report) => {
  editingReport.value = report
  showCreateModal.value = true
}

const formatReportType = (type) => {
  const types = {
    'PRODUCTION_ORDERS': 'Production Orders',
    'MRP_RECOMMENDATIONS': 'MRP Recommendations',
    'CAPACITY_PLANNING': 'Capacity Planning',
    'MATERIAL_REQUIREMENTS': 'Material Requirements',
    'PRODUCTION_SCHEDULE': 'Production Schedule',
    'WORK_CENTER_UTILIZATION': 'Work Center Utilization',
    'BOM_ANALYSIS': 'BOM Analysis',
    'SHORTAGE_REPORT': 'Material Shortage'
  }
  return types[type] || type
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateRange = (from, to) => {
  return `${formatDate(from)} - ${formatDate(to)}`
}

const loadReports = async () => {
  loading.value = true
  try {
    // Mock data
    reports.value = [
      {
        id: '1',
        name: 'Weekly Production Orders',
        description: 'Production orders scheduled for this week',
        type: 'PRODUCTION_ORDERS',
        dateFrom: '2024-12-01',
        dateTo: '2024-12-07',
        createdAt: '2024-12-01'
      },
      {
        id: '2',
        name: 'MRP Analysis Report',
        description: 'Material requirements planning recommendations',
        type: 'MRP_RECOMMENDATIONS',
        dateFrom: '2024-12-01',
        dateTo: '2024-12-31',
        createdAt: '2024-12-02'
      }
    ]
  } catch (err) {
    console.error('Error loading reports:', err)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadReports()
})
</script>
