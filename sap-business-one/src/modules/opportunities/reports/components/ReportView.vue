<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Report Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ reportData.name }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            Generated on {{ formatDate(reportData.generatedAt) }}
          </p>
          <p class="text-sm text-gray-500 mt-1">
            Period: {{ formatDate(reportData.period.startDate) }} -
            {{ formatDate(reportData.period.endDate) }}
          </p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatReportType(reportData.type) }}
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 py-4">
      <!-- Summary Section -->
      <div v-if="reportData.summary" class="mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Executive Summary</h3>

        <!-- Key Insights -->
        <div class="mb-6">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
            Key Insights
          </h4>
          <ul class="space-y-2">
            <li
              v-for="insight in reportData.summary.keyInsights"
              :key="insight"
              class="flex items-start"
            >
              <svg
                class="h-5 w-5 text-green-500 mt-0.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-700">{{ insight }}</span>
            </li>
          </ul>
        </div>

        <!-- Trends -->
        <div v-if="reportData.summary.trends.length" class="mb-6">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Trends</h4>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              v-for="trend in reportData.summary.trends"
              :key="trend.metric"
              class="bg-gray-50 p-3 rounded-lg"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-gray-900">{{ trend.metric }}</span>
                <div class="flex items-center">
                  <svg
                    v-if="trend.trend === 'UP'"
                    class="h-4 w-4 text-green-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else-if="trend.trend === 'DOWN'"
                    class="h-4 w-4 text-red-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M14.707 12.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V3a1 1 0 112 0v11.586l2.293-2.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else
                    class="h-4 w-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span
                    class="text-sm font-medium"
                    :class="{
                      'text-green-600': trend.trend === 'UP',
                      'text-red-600': trend.trend === 'DOWN',
                      'text-gray-600': trend.trend === 'STABLE',
                    }"
                  >
                    {{ Math.abs(trend.changePercentage) }}%
                  </span>
                </div>
              </div>
              <p class="text-xs text-gray-600 mt-1">{{ trend.description }}</p>
            </div>
          </div>
        </div>

        <!-- Alerts -->
        <div v-if="reportData.summary.alerts.length" class="mb-6">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Alerts</h4>
          <div class="space-y-2">
            <div
              v-for="alert in reportData.summary.alerts"
              :key="alert.metric"
              class="p-3 rounded-lg border-l-4"
              :class="{
                'bg-yellow-50 border-yellow-400': alert.type === 'WARNING',
                'bg-red-50 border-red-400': alert.type === 'CRITICAL',
                'bg-blue-50 border-blue-400': alert.type === 'INFO',
              }"
            >
              <div class="flex">
                <div class="flex-shrink-0">
                  <svg
                    v-if="alert.type === 'WARNING'"
                    class="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    v-else-if="alert.type === 'CRITICAL'"
                    class="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <div class="ml-3">
                  <p
                    class="text-sm font-medium"
                    :class="{
                      'text-yellow-800': alert.type === 'WARNING',
                      'text-red-800': alert.type === 'CRITICAL',
                      'text-blue-800': alert.type === 'INFO',
                    }"
                  >
                    {{ alert.message }}
                  </p>
                  <p
                    class="text-xs mt-1"
                    :class="{
                      'text-yellow-700': alert.type === 'WARNING',
                      'text-red-700': alert.type === 'CRITICAL',
                      'text-blue-700': alert.type === 'INFO',
                    }"
                  >
                    Current: {{ alert.value }} | Target: {{ alert.threshold }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommendations -->
        <div v-if="reportData.summary.recommendations.length">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
            Recommendations
          </h4>
          <ul class="space-y-2">
            <li
              v-for="recommendation in reportData.summary.recommendations"
              :key="recommendation"
              class="flex items-start"
            >
              <svg
                class="h-5 w-5 text-blue-500 mt-0.5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.94l1-4H9.03z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm text-gray-700">{{ recommendation }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Charts Section -->
      <div v-if="reportData.charts.length" class="mb-8">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Charts & Visualizations</h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="chart in reportData.charts" :key="chart.id" class="bg-gray-50 rounded-lg p-4">
            <h4 class="text-md font-medium text-gray-900 mb-3">{{ chart.title }}</h4>
            <div
              class="h-64 flex items-center justify-center border border-gray-200 rounded bg-white"
            >
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-400"
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
                <p class="mt-2 text-sm text-gray-500">{{ chart.type }} Chart</p>
                <p class="text-xs text-gray-400 mt-1">Chart rendering placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tables Section -->
      <div v-if="reportData.tables.length">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Data Tables</h3>
        <div class="space-y-6">
          <div
            v-for="table in reportData.tables"
            :key="table.id"
            class="bg-white shadow rounded-lg overflow-hidden"
          >
            <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h4 class="text-md font-medium text-gray-900">{{ table.title }}</h4>
            </div>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      v-for="header in table.headers"
                      :key="header.key"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {{ header.label }}
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="(row, index) in table.rows" :key="index">
                    <td
                      v-for="header in table.headers"
                      :key="header.key"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span v-if="header.type === 'currency'"
                        >${{ formatNumber(Number(row[header.key])) }}</span
                      >
                      <span v-else-if="header.type === 'percentage'">{{ row[header.key] }}%</span>
                      <span v-else-if="header.type === 'number'">{{
                        formatNumber(Number(row[header.key]))
                      }}</span>
                      <span v-else>{{ row[header.key] }}</span>
                    </td>
                  </tr>
                  <tr v-if="table.totals" class="bg-gray-50 font-medium">
                    <td
                      v-for="header in table.headers"
                      :key="header.key"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <span v-if="header.type === 'currency'"
                        >${{ formatNumber(Number(table.totals[header.key])) }}</span
                      >
                      <span v-else-if="header.type === 'percentage'"
                        >{{ table.totals[header.key] }}%</span
                      >
                      <span v-else-if="header.type === 'number'">{{
                        formatNumber(Number(table.totals[header.key]))
                      }}</span>
                      <span v-else>{{ table.totals[header.key] }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ReportData } from '../types'

interface Props {
  reportData: ReportData
}

const props = defineProps<Props>()

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return num.toLocaleString()
}

const formatReportType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
