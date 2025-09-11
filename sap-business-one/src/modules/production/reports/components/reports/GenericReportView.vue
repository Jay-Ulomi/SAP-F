<template>
  <div class="space-y-6">
    <!-- Report Data Table -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200" v-if="reportTitle">
        <h3 class="text-lg font-semibold text-gray-900">{{ reportTitle }}</h3>
        <p v-if="reportDescription" class="text-sm text-gray-600 mt-1">{{ reportDescription }}</p>
      </div>
      
      <!-- Dynamic Table Rendering -->
      <div v-if="isTableData" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="column in tableColumns"
                :key="column.key"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ column.header }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(row, index) in tableRows" :key="index">
              <td
                v-for="column in tableColumns"
                :key="column.key"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                <span v-if="column.type === 'currency'">
                  ${{ formatNumber(getNestedValue(row, column.key)) }}
                </span>
                <span v-else-if="column.type === 'number'">
                  {{ formatNumber(getNestedValue(row, column.key)) }}
                </span>
                <span v-else-if="column.type === 'percentage'">
                  {{ getNestedValue(row, column.key) }}%
                </span>
                <span v-else-if="column.type === 'date'">
                  {{ formatDate(getNestedValue(row, column.key)) }}
                </span>
                <span v-else-if="column.type === 'status'">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      getStatusColor(getNestedValue(row, column.key))
                    ]"
                  >
                    {{ formatStatus(getNestedValue(row, column.key)) }}
                  </span>
                </span>
                <span v-else>
                  {{ getNestedValue(row, column.key) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Key-Value Pairs Display -->
      <div v-else-if="isKeyValueData" class="p-6">
        <dl class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="item in keyValueData" :key="item.key">
            <dt class="text-sm font-medium text-gray-500">{{ item.label }}</dt>
            <dd class="mt-1 text-lg font-semibold text-gray-900">
              <span v-if="item.type === 'currency'">
                ${{ formatNumber(item.value) }}
              </span>
              <span v-else-if="item.type === 'number'">
                {{ formatNumber(item.value) }}
              </span>
              <span v-else-if="item.type === 'percentage'">
                {{ item.value }}%
              </span>
              <span v-else-if="item.type === 'date'">
                {{ formatDate(item.value) }}
              </span>
              <span v-else>
                {{ item.value }}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Raw JSON Data Display (Fallback) -->
      <div v-else class="p-6">
        <div class="bg-gray-50 rounded-lg p-4">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Report Data</h4>
          <pre class="text-xs text-gray-600 whitespace-pre-wrap overflow-auto max-h-96">{{ JSON.stringify(data, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Summary Cards (if summary data exists) -->
    <div v-if="summaryData && summaryData.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="summary in summaryData" :key="summary.key" class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">{{ summary.label }}</p>
            <p class="text-2xl font-semibold text-gray-900">
              <span v-if="summary.type === 'currency'">
                ${{ formatNumber(summary.value) }}
              </span>
              <span v-else-if="summary.type === 'number'">
                {{ formatNumber(summary.value) }}
              </span>
              <span v-else-if="summary.type === 'percentage'">
                {{ summary.value }}%
              </span>
              <span v-else>
                {{ summary.value }}
              </span>
            </p>
            <p v-if="summary.subtitle" class="text-sm text-gray-600">{{ summary.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Placeholder -->
    <div v-if="hasChartData" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Data Visualization</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <div class="text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="text-gray-500">Chart visualization would be rendered here</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  data: any
  reportTitle?: string
  reportDescription?: string
}

const props = defineProps<Props>()

// Computed properties to determine data structure
const isTableData = computed(() => {
  return Array.isArray(props.data) && props.data.length > 0 && typeof props.data[0] === 'object'
})

const isKeyValueData = computed(() => {
  return !Array.isArray(props.data) && typeof props.data === 'object' && props.data !== null
})

const hasChartData = computed(() => {
  return Array.isArray(props.data) && props.data.length > 1
})

// Table data processing
const tableColumns = computed(() => {
  if (!isTableData.value) return []
  
  const firstRow = props.data[0]
  const columns: Array<{ key: string; header: string; type: string }> = []
  
  for (const key in firstRow) {
    const value = firstRow[key]
    let type = 'text'
    
    // Auto-detect column types
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('cost') || key.toLowerCase().includes('price') || key.toLowerCase().includes('value')) {
        type = 'currency'
      } else if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('rate')) {
        type = 'percentage'
      } else {
        type = 'number'
      }
    } else if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time')) {
      type = 'date'
    } else if (key.toLowerCase().includes('status') || key.toLowerCase().includes('state')) {
      type = 'status'
    }
    
    columns.push({
      key,
      header: formatHeader(key),
      type
    })
  }
  
  return columns
})

const tableRows = computed(() => {
  return isTableData.value ? props.data : []
})

const keyValueData = computed(() => {
  if (!isKeyValueData.value) return []
  
  const items: Array<{ key: string; label: string; value: any; type: string }> = []
  
  for (const key in props.data) {
    const value = props.data[key]
    let type = 'text'
    
    // Auto-detect value types
    if (typeof value === 'number') {
      if (key.toLowerCase().includes('cost') || key.toLowerCase().includes('price') || key.toLowerCase().includes('value')) {
        type = 'currency'
      } else if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('rate')) {
        type = 'percentage'
      } else {
        type = 'number'
      }
    } else if (key.toLowerCase().includes('date') || key.toLowerCase().includes('time')) {
      type = 'date'
    }
    
    items.push({
      key,
      label: formatHeader(key),
      value,
      type
    })
  }
  
  return items
})

const summaryData = computed(() => {
  if (!isKeyValueData.value) return []
  
  // Extract potential summary fields
  const summaryKeys = ['total', 'count', 'average', 'sum', 'maximum', 'minimum']
  const summaryItems: Array<{ key: string; label: string; value: any; type: string; subtitle?: string }> = []
  
  for (const key in props.data) {
    if (summaryKeys.some(sk => key.toLowerCase().includes(sk))) {
      const value = props.data[key]
      let type = 'text'
      
      if (typeof value === 'number') {
        if (key.toLowerCase().includes('cost') || key.toLowerCase().includes('price') || key.toLowerCase().includes('value')) {
          type = 'currency'
        } else if (key.toLowerCase().includes('percent') || key.toLowerCase().includes('rate')) {
          type = 'percentage'
        } else {
          type = 'number'
        }
      }
      
      summaryItems.push({
        key,
        label: formatHeader(key),
        value,
        type
      })
    }
  }
  
  return summaryItems.slice(0, 4) // Limit to 4 items for layout
})

// Helper functions
function formatHeader(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase())
}

function formatNumber(value: any): string {
  if (typeof value !== 'number') return String(value)
  return value.toLocaleString()
}

function formatDate(value: any): string {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString()
  } catch {
    return String(value)
  }
}

function formatStatus(status: string): string {
  if (typeof status !== 'string') return String(status)
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  if (typeof status !== 'string') return 'bg-gray-100 text-gray-800'
  
  const statusLower = status.toLowerCase()
  
  // Common status color mappings
  if (statusLower.includes('active') || statusLower.includes('completed') || statusLower.includes('success')) {
    return 'bg-green-100 text-green-800'
  } else if (statusLower.includes('pending') || statusLower.includes('warning') || statusLower.includes('partial')) {
    return 'bg-yellow-100 text-yellow-800'
  } else if (statusLower.includes('failed') || statusLower.includes('error') || statusLower.includes('rejected')) {
    return 'bg-red-100 text-red-800'
  } else if (statusLower.includes('in_progress') || statusLower.includes('processing')) {
    return 'bg-blue-100 text-blue-800'
  } else if (statusLower.includes('draft') || statusLower.includes('inactive')) {
    return 'bg-gray-100 text-gray-800'
  }
  
  return 'bg-gray-100 text-gray-800'
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}
</script>