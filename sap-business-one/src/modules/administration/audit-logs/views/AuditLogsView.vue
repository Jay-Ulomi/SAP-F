<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Audit Logs</h1>
        <p class="text-gray-600 mt-1">Monitor system activity and user actions</p>
      </div>
      <button
        @click="exportLogs"
        :disabled="loading"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue disabled:opacity-50"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export Logs
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Logs</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalLogs || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Today's Activity</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.todayLogs || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Warning Events</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.warningLogs || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Error Events</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.errorLogs || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search logs by user, action, or description..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2 flex-wrap">
          <select
            v-model="filters.level"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Levels</option>
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
            <option value="CRITICAL">Critical</option>
          </select>
          <select
            v-model="filters.module"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Modules</option>
            <option value="AUTH">Authentication</option>
            <option value="USER">User Management</option>
            <option value="ROLE">Role Management</option>
            <option value="SETTINGS">Settings</option>
            <option value="API">API</option>
            <option value="SYSTEM">System</option>
          </select>
          <input
            v-model="filters.dateFrom"
            type="date"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <input
            v-model="filters.dateTo"
            type="date"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <button
            @click="applyFilters"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue"
          >
            Apply
          </button>
          <button
            @click="clearFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Logs Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Activity Logs</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="log in auditLogs" :key="log.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDateTime(log.timestamp) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': log.level === 'INFO',
                    'bg-yellow-100 text-yellow-800': log.level === 'WARNING',
                    'bg-red-100 text-red-800': log.level === 'ERROR',
                    'bg-red-200 text-red-900': log.level === 'CRITICAL',
                  }"
                >
                  {{ log.level }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ log.userName || 'System' }}</div>
                <div class="text-sm text-gray-500">{{ log.userEmail }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ log.module }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ log.action }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                <div class="max-w-xs truncate" :title="log.description">
                  {{ log.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ log.ipAddress }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewLogDetails(log)"
                  class="text-sap-blue hover:text-sap-dark-blue"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="!pagination.hasPrev"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNext"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Log Details Modal -->
    <div
      v-if="showDetailsModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeDetailsModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Log Details</h3>
          <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="selectedLog" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Timestamp</label>
              <p class="text-sm text-gray-900">{{ formatDateTime(selectedLog.timestamp) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Level</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                :class="{
                  'bg-blue-100 text-blue-800': selectedLog.level === 'INFO',
                  'bg-yellow-100 text-yellow-800': selectedLog.level === 'WARNING',
                  'bg-red-100 text-red-800': selectedLog.level === 'ERROR',
                  'bg-red-200 text-red-900': selectedLog.level === 'CRITICAL',
                }"
              >
                {{ selectedLog.level }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">User</label>
              <p class="text-sm text-gray-900">{{ selectedLog.userName || 'System' }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">IP Address</label>
              <p class="text-sm text-gray-900">{{ selectedLog.ipAddress }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Module</label>
              <p class="text-sm text-gray-900">{{ selectedLog.module }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Action</label>
              <p class="text-sm text-gray-900">{{ selectedLog.action }}</p>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <p class="text-sm text-gray-900 bg-gray-50 p-3 rounded">{{ selectedLog.description }}</p>
          </div>
          
          <div v-if="selectedLog.metadata">
            <label class="block text-sm font-medium text-gray-700">Additional Data</label>
            <pre class="text-xs text-gray-900 bg-gray-50 p-3 rounded overflow-x-auto">{{ JSON.stringify(selectedLog.metadata, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useAuditLogStore } from '../stores'
import type { AuditLog, AuditLogFilters } from '../types'

// Store
const auditLogStore = useAuditLogStore()

// Reactive data
const searchQuery = ref('')
const filters = ref<AuditLogFilters>({})
const showDetailsModal = ref(false)
const selectedLog = ref<AuditLog | null>(null)

// Computed properties
const auditLogs = computed(() => auditLogStore.auditLogs)
const loading = computed(() => auditLogStore.loading)
const stats = computed(() => auditLogStore.stats)
const pagination = computed(() => auditLogStore.pagination)

// Methods
const applyFilters = () => {
  const newFilters: AuditLogFilters = {}

  if (searchQuery.value.trim()) {
    newFilters.search = searchQuery.value.trim()
  }
  
  Object.keys(filters.value).forEach(key => {
    const value = filters.value[key as keyof AuditLogFilters]
    if (value) {
      newFilters[key as keyof AuditLogFilters] = value
    }
  })

  auditLogStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {}
  auditLogStore.clearFilters()
}

const viewLogDetails = (log: AuditLog) => {
  selectedLog.value = log
  showDetailsModal.value = true
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedLog.value = null
}

const exportLogs = async () => {
  try {
    await auditLogStore.exportLogs()
  } catch (error) {
    console.error('Error exporting logs:', error)
  }
}

const nextPage = () => auditLogStore.nextPage()
const previousPage = () => auditLogStore.previousPage()

// Utility functions
const formatDateTime = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === '') {
    auditLogStore.clearFilters()
  }
})

// Initialize
onMounted(async () => {
  await auditLogStore.loadAuditLogs()
  await auditLogStore.loadAuditStats()
})
</script>