<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Custom Queries</h1>
          <p class="text-gray-600">
            Execute custom SQL queries and stored procedures to generate reports
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
            New Query
          </button>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingQuery ? 'Edit Query' : 'New Query' }}
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
          :report="editingQuery"
          :loading="submitting"
          @submit="submitQuery"
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
          <h3 class="text-lg font-medium text-gray-900">Query Results</h3>
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
        <ReportView :report="selectedQuery" :loading="loading" />
      </div>
    </div>

    <!-- Queries List -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Saved Queries</h3>
        
        <div v-if="loading" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        </div>

        <div v-else-if="queries.length === 0" class="text-center py-8 text-gray-500">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No queries</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new query.</p>
        </div>

        <div v-else class="grid gap-4">
          <div
            v-for="query in queries"
            :key="query.id"
            class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="text-lg font-medium text-gray-900">{{ query.name }}</h4>
                <p v-if="query.description" class="text-gray-600 mt-1">{{ query.description }}</p>
                <div class="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ formatQueryType(query.type) }}</span>
                  <span>Created: {{ formatDate(query.createdAt) }}</span>
                  <span v-if="query.lastExecuted">Last executed: {{ formatDate(query.lastExecuted) }}</span>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="executeQuery(query)"
                  class="px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue"
                >
                  Execute
                </button>
                <button
                  @click="editQuery(query)"
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
const editingQuery = ref(null)
const selectedQuery = ref(null)
const submitting = ref(false)
const loading = ref(false)
const queries = ref([])

// Methods
const openCreateModal = () => {
  editingQuery.value = null
  showCreateModal.value = true
}

const closeModal = () => {
  showCreateModal.value = false
  showViewModal.value = false
  editingQuery.value = null
  selectedQuery.value = null
}

const submitQuery = async (data) => {
  submitting.value = true
  try {
    console.log('Submitting query:', data)
    closeModal()
    await loadQueries()
  } catch (err) {
    console.error('Error saving query:', err)
  } finally {
    submitting.value = false
  }
}

const executeQuery = async (query) => {
  loading.value = true
  try {
    console.log('Executing query:', query)
    selectedQuery.value = {
      ...query,
      executedAt: new Date().toISOString(),
      executionTime: 150
    }
    showViewModal.value = true
  } catch (err) {
    console.error('Error executing query:', err)
  } finally {
    loading.value = false
  }
}

const editQuery = (query) => {
  editingQuery.value = query
  showCreateModal.value = true
}

const formatQueryType = (type) => {
  const types = {
    'SQL_QUERY': 'SQL Query',
    'STORED_PROCEDURE': 'Stored Procedure',
    'SYSTEM_QUERY': 'System Query'
  }
  return types[type] || type
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const loadQueries = async () => {
  loading.value = true
  try {
    // Mock data
    queries.value = [
      {
        id: '1',
        name: 'Customer Sales Summary',
        description: 'Monthly sales summary by customer',
        type: 'SQL_QUERY',
        sqlQuery: 'SELECT CustomerName, SUM(Total) as TotalSales FROM Orders GROUP BY CustomerName',
        createdAt: '2024-11-01',
        lastExecuted: '2024-12-01'
      },
      {
        id: '2',
        name: 'Inventory Status Report',
        description: 'Current inventory levels and status',
        type: 'STORED_PROCEDURE',
        sqlQuery: 'EXEC sp_InventoryStatus',
        createdAt: '2024-11-15',
        lastExecuted: '2024-12-08'
      }
    ]
  } catch (err) {
    console.error('Error loading queries:', err)
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadQueries()
})
</script>
