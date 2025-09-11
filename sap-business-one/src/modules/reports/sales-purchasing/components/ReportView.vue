<template>
  <div class="sales-purchasing-report-view">
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
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Total Transactions</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.totalTransactions || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Total Amount</p>
              <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(reportData.summary.totalAmount || 0) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Average Transaction</p>
              <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(reportData.summary.averageTransaction || 0) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white border border-gray-200 rounded-lg p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
            </div>
            <div class="ml-3">
              <p class="text-sm font-medium text-gray-500">Business Partners</p>
              <p class="text-lg font-semibold text-gray-900">{{ reportData.summary.businessPartnerCount || 0 }}</p>
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
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document No
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Business Partner
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item/Service
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Discount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tax Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in reportData.items" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(item.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.documentNumber }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.businessPartner }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.itemName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.quantity?.toLocaleString() || 0 }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.unitPrice || 0) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.discount || 0) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.taxAmount || 0) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {{ formatCurrency(item.total || 0) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          <svg class="w-12 h-12 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p>No data available for this report</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface SalesPurchasingReportItem {
  id: string
  date: string
  documentNumber: string
  businessPartner: string
  itemName: string
  quantity: number
  unitPrice: number
  discount: number
  taxAmount: number
  total: number
}

interface ReportData {
  summary?: {
    totalTransactions: number
    totalAmount: number
    averageTransaction: number
    businessPartnerCount: number
  }
  items: SalesPurchasingReportItem[]
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
    totalTransactions: 45,
    totalAmount: 125750.00,
    averageTransaction: 2794.44,
    businessPartnerCount: 18
  },
  items: [
    {
      id: '1',
      date: '2024-01-15',
      documentNumber: 'SO-2024-001',
      businessPartner: 'ABC Corp',
      itemName: 'Widget A',
      quantity: 10,
      unitPrice: 25.50,
      discount: 12.75,
      taxAmount: 21.25,
      total: 263.75
    },
    {
      id: '2',
      date: '2024-01-16',
      documentNumber: 'SO-2024-002',
      businessPartner: 'XYZ Ltd',
      itemName: 'Service Package',
      quantity: 1,
      unitPrice: 1500.00,
      discount: 0.00,
      taxAmount: 150.00,
      total: 1650.00
    },
    {
      id: '3',
      date: '2024-01-17',
      documentNumber: 'SO-2024-003',
      businessPartner: 'Global Trade Inc',
      itemName: 'Component B',
      quantity: 25,
      unitPrice: 8.75,
      discount: 10.94,
      taxAmount: 18.03,
      total: 226.28
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

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.report.currency || 'USD'
  }).format(amount)
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
.sales-purchasing-report-view {
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