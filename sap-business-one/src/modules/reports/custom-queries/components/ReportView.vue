<template>
  <div class="custom-query-report-view">
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900">{{ report.name }}</h2>
      <p v-if="report.description" class="text-gray-600 mt-1">{{ report.description }}</p>
      <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
        <span>Query Type: {{ formatQueryType(report.type) }}</span>
        <span>Executed: {{ formatDate(report.executedAt) }}</span>
      </div>
    </div>

    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <div v-if="loading" class="flex justify-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        </div>

        <div v-else-if="error" class="text-center py-8">
          <div class="text-red-600 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Query Execution Error</h3>
          <p class="text-gray-600">{{ error }}</p>
        </div>

        <div v-else-if="results && results.length > 0">
          <!-- Results Table -->
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="column in columns"
                    :key="column"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {{ formatColumnName(column) }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr
                  v-for="(row, index) in paginatedResults"
                  :key="index"
                  class="hover:bg-gray-50"
                >
                  <td
                    v-for="column in columns"
                    :key="column"
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {{ formatCellValue(row[column]) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-6 flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Showing {{ ((currentPage - 1) * pageSize) + 1 }} to {{ Math.min(currentPage * pageSize, results.length) }} 
              of {{ results.length }} results
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span class="text-sm text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <!-- Export Options -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="exportResults('csv')"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Export CSV
            </button>
            <button
              @click="exportResults('excel')"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Export Excel
            </button>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <div class="text-gray-400 mb-4">
            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No Results</h3>
          <p class="text-gray-600">The query returned no results.</p>
        </div>
      </div>
    </div>

    <!-- Query Details -->
    <div class="mt-6 bg-gray-50 rounded-lg p-4">
      <h4 class="text-sm font-medium text-gray-900 mb-2">SQL Query</h4>
      <pre class="text-sm text-gray-700 whitespace-pre-wrap font-mono bg-white p-3 rounded border">{{ report.sqlQuery }}</pre>
      
      <div class="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="font-medium text-gray-500">Execution Time:</span>
          <span class="ml-2 text-gray-900">{{ report.executionTime || 'N/A' }}ms</span>
        </div>
        <div>
          <span class="font-medium text-gray-500">Rows Returned:</span>
          <span class="ml-2 text-gray-900">{{ results ? results.length : 0 }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-500">Query Type:</span>
          <span class="ml-2 text-gray-900">{{ formatQueryType(report.type) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  report: any
  loading?: boolean
}

defineProps<Props>()

// State
const results = ref<any[]>([])
const error = ref<string>('')
const currentPage = ref(1)
const pageSize = ref(25)

// Computed
const columns = computed(() => {
  if (!results.value || results.value.length === 0) return []
  return Object.keys(results.value[0])
})

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return results.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(results.value.length / pageSize.value)
})

// Methods
const formatQueryType = (type: string): string => {
  const types = {
    'SQL_QUERY': 'SQL Query',
    'STORED_PROCEDURE': 'Stored Procedure',
    'SYSTEM_QUERY': 'System Query'
  }
  return types[type] || type
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}

const formatColumnName = (column: string): string => {
  return column.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatCellValue = (value: any): string => {
  if (value === null || value === undefined) return 'N/A'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'number') return value.toLocaleString()
  if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
    return new Date(value).toLocaleDateString()
  }
  return String(value)
}

const exportResults = (format: string): void => {
  console.log(`Exporting results as ${format}`)
  // Implementation would go here
}

// Mock data for demonstration
onMounted(() => {
  // Simulate results based on query type
  results.value = [
    {
      id: 1,
      customer_name: 'ABC Corporation',
      order_total: 15000,
      order_date: '2024-12-01',
      status: 'Completed'
    },
    {
      id: 2,
      customer_name: 'XYZ Industries',
      order_total: 8500,
      order_date: '2024-12-02',
      status: 'Pending'
    }
  ]
})
</script>

<style scoped>
.custom-query-report-view {
  max-width: 100%;
}

pre {
  max-height: 200px;
  overflow-y: auto;
}
</style>