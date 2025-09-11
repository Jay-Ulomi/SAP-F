<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Sales Reports</h1>
        <p class="mt-1 text-sm text-gray-500">Generate and manage comprehensive sales reports</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
    </div>

    <!-- Report Types Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="reportType in reportTypes"
        :key="reportType.type"
        class="bg-white p-6 rounded-lg shadow border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
        @click="selectReportType(reportType.type)"
      >
        <div class="flex items-center mb-4">
          <div class="p-3 rounded-lg bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <h3 class="text-lg font-medium text-gray-900">{{ reportType.name }}</h3>
            <p class="text-sm text-gray-600">{{ reportType.description }}</p>
          </div>
        </div>
        <p class="text-sm text-gray-500">{{ reportType.details }}</p>
      </div>
    </div>

    <!-- Recent Reports -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Recent Reports</h3>
      </div>
      <div class="p-6">
        <div class="text-center text-gray-500 py-8">
          <svg
            class="w-12 h-12 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          <p class="text-lg font-medium">No Reports Generated Yet</p>
          <p class="text-sm text-gray-600 mt-2">Generate your first report to get started.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ReportType } from '../types'

// Local state
const selectedReportType = ref<ReportType | null>(null)
const showCreateModal = ref(false)

// Report types configuration
const reportTypes = [
  {
    type: ReportType.SALES_ANALYSIS,
    name: 'Sales Analysis',
    description: 'Comprehensive sales performance overview',
    details:
      'Analyze sales trends, revenue patterns, and performance metrics across different time periods.',
  },
  {
    type: ReportType.CUSTOMER_PERFORMANCE,
    name: 'Customer Performance',
    description: 'Customer profitability and behavior analysis',
    details: 'Track customer value, purchase patterns, and identify high-value customers.',
  },
  {
    type: ReportType.PRODUCT_PERFORMANCE,
    name: 'Product Performance',
    description: 'Product sales and profitability analysis',
    details: 'Analyze product performance, identify top sellers, and optimize product mix.',
  },
  {
    type: ReportType.SALES_PERSON_PERFORMANCE,
    name: 'Sales Person Performance',
    description: 'Individual sales team performance metrics',
    details: 'Track sales quotas, performance rankings, and commission calculations.',
  },
  {
    type: ReportType.REGIONAL_ANALYSIS,
    name: 'Regional Analysis',
    description: 'Geographic sales performance insights',
    details: 'Analyze sales performance by region, territory, and market segments.',
  },
  {
    type: ReportType.TREND_ANALYSIS,
    name: 'Trend Analysis',
    description: 'Historical sales trend analysis',
    details: 'Identify seasonal patterns, growth trends, and forecast future performance.',
  },
]

// Methods
const selectReportType = (type: ReportType) => {
  selectedReportType.value = type
  showCreateModal.value = true
  console.log('Selected report type:', type)
}
</script>
