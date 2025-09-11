<template>
  <div class="production-mrp-report-view">
    <!-- Report Header -->
    <div class="report-header mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ report.name }}</h2>
          <p v-if="report.description" class="text-gray-600 mt-1">{{ report.description }}</p>
        </div>
        <div class="flex space-x-2">
          <button
            @click="exportReport('PDF')"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Export PDF
          </button>
          <button
            @click="exportReport('EXCEL')"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Export Excel
          </button>
        </div>
      </div>

      <!-- Report Info -->
      <div class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <div class="text-xs font-medium text-blue-600 uppercase tracking-wide">Report Type</div>
          <div class="text-sm font-semibold text-blue-900">{{ formatReportType(report.type) }}</div>
        </div>
        <div class="bg-green-50 rounded-lg p-3">
          <div class="text-xs font-medium text-green-600 uppercase tracking-wide">Period</div>
          <div class="text-sm font-semibold text-green-900">{{ formatDateRange(report.dateFrom, report.dateTo) }}</div>
        </div>
        <div class="bg-purple-50 rounded-lg p-3">
          <div class="text-xs font-medium text-purple-600 uppercase tracking-wide">Currency</div>
          <div class="text-sm font-semibold text-purple-900">{{ report.currency || 'USD' }}</div>
        </div>
        <div class="bg-orange-50 rounded-lg p-3">
          <div class="text-xs font-medium text-orange-600 uppercase tracking-wide">Generated</div>
          <div class="text-sm font-semibold text-orange-900">{{ formatDate(report.createdAt) }}</div>
        </div>
      </div>
    </div>

    <!-- Report Summary -->
    <div v-if="reportData.summary" class="report-summary mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Total Orders</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.totalOrders || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Completed</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.completedOrders || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">In Progress</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.inProgressOrders || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Delayed</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.delayedOrders || 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Report Data Table -->
    <div class="report-data bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Report Details</h3>
        
        <div v-if="loading" class="flex justify-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        </div>

        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-600">
            <p>{{ error }}</p>
            <button @click="$emit('retry')" class="mt-2 text-sap-blue hover:underline">
              Try Again
            </button>
          </div>
        </div>

        <div v-else-if="reportData.items?.length > 0" class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order No
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item Code
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Work Center
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Planned Qty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produced Qty
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in reportData.items" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.orderNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.itemCode }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.productName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.workCenter }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.plannedQuantity?.toLocaleString() || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.producedQuantity?.toLocaleString() || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(item.dueDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(item.status)">
                    {{ formatStatus(item.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        class="bg-sap-blue h-2 rounded-full" 
                        :style="{ width: `${item.progress}%` }"
                      ></div>
                    </div>
                    <span class="text-sm text-gray-900">{{ item.progress }}%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
          </svg>
          <p>No data available for this report</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface ProductionMRPReportItem {
  id: string
  orderNumber: string
  itemCode: string
  productName: string
  workCenter: string
  plannedQuantity: number
  producedQuantity: number
  dueDate: string
  status: string
  progress: number
}

interface ReportData {
  summary?: {
    totalOrders: number
    completedOrders: number
    inProgressOrders: number
    delayedOrders: number
  }
  items: ProductionMRPReportItem[]
}

interface Props {
  report: any
  loading?: boolean
  error?: string
}

interface Emits {
  (e: 'export', format: string): void
  (e: 'retry'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

// Mock report data for demonstration
const reportData = ref<ReportData>({
  summary: {
    totalOrders: 23,
    completedOrders: 15,
    inProgressOrders: 6,
    delayedOrders: 2
  },
  items: [
    {
      id: '1',
      orderNumber: 'PO-2024-001',
      itemCode: 'PROD001',
      productName: 'Widget Assembly A',
      workCenter: 'Assembly Line 1',
      plannedQuantity: 100,
      producedQuantity: 85,
      dueDate: '2024-02-15',
      status: 'IN_PROGRESS',
      progress: 85
    },
    {
      id: '2',
      orderNumber: 'PO-2024-002',
      itemCode: 'PROD002',
      productName: 'Component B Set',
      workCenter: 'Assembly Line 2',
      plannedQuantity: 250,
      producedQuantity: 250,
      dueDate: '2024-01-30',
      status: 'COMPLETED',
      progress: 100
    },
    {
      id: '3',
      orderNumber: 'PO-2024-003',
      itemCode: 'PROD003',
      productName: 'Circuit Board Alpha',
      workCenter: 'Quality Control',
      plannedQuantity: 75,
      producedQuantity: 45,
      dueDate: '2024-01-25',
      status: 'DELAYED',
      progress: 60
    }
  ]
})

// Methods
const formatReportType = (type: string): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateRange = (from: string, to: string): string => {
  return `${formatDate(from)} - ${formatDate(to)}`
}

const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusBadgeClass = (status: string): string => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'COMPLETED':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'IN_PROGRESS':
      return `${baseClasses} bg-blue-100 text-blue-800`
    case 'PLANNED':
      return `${baseClasses} bg-gray-100 text-gray-800`
    case 'DELAYED':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'RELEASED':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const exportReport = (format: string) => {
  emit('export', format)
}

// Lifecycle
onMounted(() => {
  // Load report data based on report configuration
  console.log('Loading report data for:', props.report)
})
</script>

<style scoped>
.production-mrp-report-view {
  max-width: 100%;
}

.report-header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
}

.report-summary {
  margin-bottom: 2rem;
}

.report-data {
  min-height: 400px;
}
</style>