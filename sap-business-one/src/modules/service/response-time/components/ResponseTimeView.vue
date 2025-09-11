<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-4">
          <h2 class="text-xl font-semibold text-gray-900">Response Time Metrics</h2>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', statusBadgeClass]">
            {{ statusText }}
          </span>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
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

      <!-- Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Metric Details
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Service Call</label>
                <p class="text-sm text-gray-900">{{ metric.serviceCallNumber }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Metric Type</label>
                <p class="text-sm text-gray-900 capitalize">
                  {{ metric.metricType.replace('_', ' ') }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Customer</label>
                <p class="text-sm text-gray-900">{{ metric.customerName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Technician</label>
                <p class="text-sm text-gray-900">{{ metric.technicianName }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Value</label>
                <p class="text-sm text-gray-900">{{ metric.actualValue }} {{ metric.unit }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Target Value</label>
                <p class="text-sm text-gray-900">{{ metric.targetValue }} {{ metric.unit }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500">Measured At</label>
              <p class="text-sm text-gray-900">{{ formatDateTime(metric.measuredAt) }}</p>
            </div>
          </div>

          <!-- Performance Analysis -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Performance Analysis
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Variance</label>
                <p :class="varianceClass">{{ varianceText }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Variance %</label>
                <p :class="varianceClass">{{ variancePercentageText }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">SLA Target</label>
                <p class="text-sm text-gray-900">{{ metric.slaTarget }} {{ metric.unit }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">SLA Compliance</label>
                <span
                  :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    metric.slaCompliance
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ metric.slaCompliance ? 'Compliant' : 'Non-compliant' }}
                </span>
              </div>
            </div>

            <!-- Performance Chart Placeholder -->
            <div class="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 class="text-sm font-medium text-gray-900 mb-2">Performance Trend</h4>
              <div class="h-32 bg-white rounded border flex items-center justify-center">
                <p class="text-sm text-gray-500">Chart would be displayed here</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Historical Data -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Historical Data
          </h3>

          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Value
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Target
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Variance
                  </th>
                  <th
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in historicalData" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(item.date) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.value }} {{ metric.unit }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.target }} {{ metric.unit }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="getVarianceClass(item.variance)">
                      {{ item.variance >= 0 ? '+' : '' }}{{ item.variance.toFixed(1) }}%
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      :class="[
                        'px-2 py-1 text-xs font-medium rounded-full',
                        getStatusClass(item.status),
                      ]"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="metric.notes" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Notes</h3>
          <p class="text-sm text-gray-900">{{ metric.notes }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
        <button
          @click="$emit('edit')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Metric
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResponseTimeMetric } from '../types'

interface Props {
  metric: ResponseTimeMetric
}

interface Emits {
  (e: 'close'): void
  (e: 'edit'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusBadgeClass = computed(() => {
  const statusClasses = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }
  return statusClasses[props.metric.status] || 'bg-gray-100 text-gray-800'
})

const statusText = computed(() => {
  return props.metric.status.charAt(0).toUpperCase() + props.metric.status.slice(1)
})

const variance = computed(() => {
  return props.metric.variance
})

const variancePercentage = computed(() => {
  return props.metric.variancePercentage
})

const varianceClass = computed(() => {
  if (variance.value <= 0) return 'text-green-600 font-medium'
  if (variance.value <= props.metric.targetValue * 0.1) return 'text-yellow-600 font-medium'
  return 'text-red-600 font-medium'
})

const varianceText = computed(() => {
  const absVariance = Math.abs(variance.value)
  return `${variance.value >= 0 ? '+' : '-'}${absVariance.toFixed(2)} ${props.metric.unit}`
})

const variancePercentageText = computed(() => {
  const absPercentage = Math.abs(variancePercentage.value)
  return `${variancePercentage.value >= 0 ? '+' : '-'}${absPercentage.toFixed(1)}%`
})

// Mock historical data
const historicalData = computed(() => [
  {
    date: '2024-01-15',
    value: 45,
    target: 60,
    variance: -25,
    status: 'excellent',
  },
  {
    date: '2024-01-14',
    value: 55,
    target: 60,
    variance: -8.3,
    status: 'good',
  },
  {
    date: '2024-01-13',
    value: 65,
    target: 60,
    variance: 8.3,
    status: 'fair',
  },
  {
    date: '2024-01-12',
    value: 75,
    target: 60,
    variance: 25,
    status: 'poor',
  },
])

const getVarianceClass = (variance: number) => {
  if (variance <= 0) return 'text-green-600 font-medium'
  if (variance <= 10) return 'text-yellow-600 font-medium'
  return 'text-red-600 font-medium'
}

const getStatusClass = (status: string) => {
  const statusClasses = {
    excellent: 'bg-green-100 text-green-800',
    good: 'bg-blue-100 text-blue-800',
    fair: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
