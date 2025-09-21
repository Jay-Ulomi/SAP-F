<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Approval History</h1>
        <p class="mt-2 text-sm text-gray-700">
          Complete audit trail of all approval activities across the organization.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
        <button
          @click="exportHistory"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          Export
        </button>
        <button
          @click="refreshHistory"
          :disabled="loading"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <ArrowPathIcon v-if="!loading" class="w-4 h-4 mr-2" />
          <div v-else class="w-4 h-4 mr-2 animate-spin border-2 border-gray-300 border-t-gray-700 rounded-full"></div>
          Refresh
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="mt-8">
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <DocumentTextIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Records
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ totalRecords }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Approved
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ approvedCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Rejected
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ rejectedCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-yellow-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Avg. Time
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ averageApprovalTime }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CalendarDaysIcon class="h-6 w-6 text-purple-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    This Month
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ thisMonthCount }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Advanced Filters -->
    <div class="mt-8 bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Advanced Filters</h3>
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label for="dateRange" class="block text-sm font-medium text-gray-700">Date Range</label>
            <select
              id="dateRange"
              v-model="filters.dateRange"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          <div v-if="filters.dateRange === 'custom'">
            <label for="startDate" class="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              id="startDate"
              type="date"
              v-model="filters.startDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div v-if="filters.dateRange === 'custom'">
            <label for="endDate" class="block text-sm font-medium text-gray-700">End Date</label>
            <input
              id="endDate"
              type="date"
              v-model="filters.endDate"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="action" class="block text-sm font-medium text-gray-700">Action</label>
            <select
              id="action"
              v-model="filters.action"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Actions</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div>
            <label for="documentType" class="block text-sm font-medium text-gray-700">Document Type</label>
            <select
              id="documentType"
              v-model="filters.documentType"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Document Types</option>
              <option value="PURCHASE_REQUEST">Purchase Request</option>
              <option value="PURCHASE_ORDER">Purchase Order</option>
              <option value="AP_INVOICE">AP Invoice</option>
              <option value="AR_INVOICE">AR Invoice</option>
              <option value="DELIVERY">Delivery</option>
              <option value="RETURN">Return</option>
            </select>
          </div>

          <div>
            <label for="approver" class="block text-sm font-medium text-gray-700">Approver</label>
            <select
              id="approver"
              v-model="filters.approver"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Approvers</option>
              <option v-for="user in users" :key="user.id" :value="user.name">
                {{ user.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
            <select
              id="department"
              v-model="filters.department"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="">All Departments</option>
              <option value="SALES">Sales</option>
              <option value="OPERATIONS">Operations</option>
              <option value="HUMAN_RESOURCE">Human Resource</option>
              <option value="FINANCE">Finance</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
            </select>
          </div>

          <div>
            <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
            <input
              id="search"
              type="text"
              v-model="filters.search"
              placeholder="Document ID, comments..."
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
        </div>

        <div class="mt-4 flex justify-end space-x-3">
          <button
            @click="clearFilters"
            class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear Filters
          </button>
          <button
            @click="applyFilters"
            class="inline-flex items-center px-3 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>

    <!-- History Timeline -->
    <div class="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Approval Timeline</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Chronological history of all approval activities.
        </p>
      </div>

      <div v-if="loading" class="px-4 py-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-sm text-gray-500">Loading approval history...</p>
      </div>

      <div v-else-if="filteredHistory.length === 0" class="px-4 py-8 text-center">
        <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
        <h3 class="mt-2 text-sm font-medium text-gray-900">No history found</h3>
        <p class="mt-1 text-sm text-gray-500">No approval history matches your current filters.</p>
      </div>

      <div v-else class="px-4 py-6 sm:px-6">
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="(history, index) in paginatedHistory" :key="history.id">
              <div class="relative pb-8">
                <span
                  v-if="index !== paginatedHistory.length - 1"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div class="relative flex space-x-3">
                  <div>
                    <span
                      :class="[
                        'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                        getActionColor(history.action)
                      ]"
                    >
                      <component :is="getActionIcon(history.action)" class="h-4 w-4 text-white" />
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div>
                      <div class="text-sm">
                        <span class="font-medium text-gray-900">{{ history.approverName }}</span>
                        <span class="text-gray-500">
                          {{ getActionDescription(history.action) }}
                        </span>
                        <span class="font-medium text-gray-900">{{ history.documentId }}</span>
                        <span class="text-gray-500">
                          ({{ formatDocumentType(history.documentType) }})
                        </span>
                      </div>
                      <p class="mt-0.5 text-sm text-gray-500">
                        {{ formatDate(history.timestamp) }}
                      </p>
                    </div>
                    <div v-if="history.comments" class="mt-2 text-sm text-gray-700">
                      <div class="bg-gray-50 rounded-lg p-3">
                        <p class="italic">"{{ history.comments }}"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <p class="text-sm text-gray-700">
              Showing {{ ((currentPage - 1) * pageSize) + 1 }} to
              {{ Math.min(currentPage * pageSize, filteredHistory.length) }} of
              {{ filteredHistory.length }} results
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="currentPage = currentPage - 1"
              :disabled="currentPage <= 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button
              @click="currentPage = currentPage + 1"
              :disabled="currentPage >= totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import type { ApprovalHistory } from '../types'
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  CalendarDaysIcon,
  CheckIcon,
  XMarkIcon,
  DocumentIcon,
  PaperAirplaneIcon
} from '@heroicons/vue/24/outline'

// Store
const approvalsStore = useApprovalsStore()

// Reactive state
const currentPage = ref(1)
const pageSize = ref(20)

const filters = ref({
  dateRange: 'month',
  startDate: '',
  endDate: '',
  action: '',
  documentType: '',
  approver: '',
  department: '',
  search: ''
})

// Computed
const loading = computed(() => approvalsStore.loading)
const approvalHistory = computed(() => approvalsStore.approvalHistory)
const users = computed(() => approvalsStore.users)

const filteredHistory = computed(() => {
  let history = approvalHistory.value

  // Apply filters
  if (filters.value.action) {
    history = history.filter(h => h.action === filters.value.action)
  }

  if (filters.value.documentType) {
    history = history.filter(h => h.documentType === filters.value.documentType)
  }

  if (filters.value.approver) {
    history = history.filter(h => h.approverName === filters.value.approver)
  }

  if (filters.value.search) {
    const search = filters.value.search.toLowerCase()
    history = history.filter(h =>
      h.documentId.toLowerCase().includes(search) ||
      h.comments?.toLowerCase().includes(search) ||
      h.approverName.toLowerCase().includes(search)
    )
  }

  // Apply date filtering
  if (filters.value.dateRange !== 'all') {
    const now = new Date()
    let startDate: Date

    switch (filters.value.dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        break
      case 'yesterday':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        break
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1)
        break
      case 'quarter':
        const quarterStart = Math.floor(now.getMonth() / 3) * 3
        startDate = new Date(now.getFullYear(), quarterStart, 1)
        break
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1)
        break
      case 'custom':
        if (filters.value.startDate) {
          startDate = new Date(filters.value.startDate)
        } else {
          return history
        }
        break
      default:
        return history
    }

    history = history.filter(h => {
      const historyDate = new Date(h.timestamp)
      if (filters.value.dateRange === 'custom' && filters.value.endDate) {
        const endDate = new Date(filters.value.endDate)
        return historyDate >= startDate && historyDate <= endDate
      }
      return historyDate >= startDate
    })
  }

  return history.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
})

const paginatedHistory = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredHistory.value.slice(start, end)
})

const totalPages = computed(() => Math.ceil(filteredHistory.value.length / pageSize.value))

const totalRecords = computed(() => approvalHistory.value.length)
const approvedCount = computed(() => approvalHistory.value.filter(h => h.action === 'APPROVED').length)
const rejectedCount = computed(() => approvalHistory.value.filter(h => h.action === 'REJECTED').length)

const averageApprovalTime = computed(() => {
  // Mock calculation - in real app, calculate based on submission and approval timestamps
  return '2.5 hours'
})

const thisMonthCount = computed(() => {
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()

  return approvalHistory.value.filter(history => {
    const historyDate = new Date(history.timestamp)
    return historyDate.getMonth() === thisMonth && historyDate.getFullYear() === thisYear
  }).length
})

// Methods
const refreshHistory = async () => {
  try {
    await approvalsStore.fetchApprovalHistory('all')
  } catch (error) {
    console.error('Error refreshing history:', error)
  }
}

const clearFilters = () => {
  filters.value = {
    dateRange: 'month',
    startDate: '',
    endDate: '',
    action: '',
    documentType: '',
    approver: '',
    department: '',
    search: ''
  }
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const exportHistory = () => {
  // Implement export functionality
  console.log('Export history:', filteredHistory.value)
}

const getActionColor = (action: string): string => {
  switch (action) {
    case 'SUBMITTED':
      return 'bg-blue-500'
    case 'APPROVED':
      return 'bg-green-500'
    case 'REJECTED':
      return 'bg-red-500'
    case 'CANCELLED':
      return 'bg-gray-500'
    default:
      return 'bg-gray-500'
  }
}

const getActionIcon = (action: string) => {
  switch (action) {
    case 'SUBMITTED':
      return PaperAirplaneIcon
    case 'APPROVED':
      return CheckIcon
    case 'REJECTED':
      return XMarkIcon
    case 'CANCELLED':
      return XCircleIcon
    default:
      return DocumentIcon
  }
}

const getActionDescription = (action: string): string => {
  switch (action) {
    case 'SUBMITTED':
      return ' submitted '
    case 'APPROVED':
      return ' approved '
    case 'REJECTED':
      return ' rejected '
    case 'CANCELLED':
      return ' cancelled '
    default:
      return ' processed '
  }
}

const formatDocumentType = (type: string): string => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp)
  return date.toLocaleString()
}

// Watchers
watch(() => filters.value, () => {
  currentPage.value = 1
}, { deep: true })

// Lifecycle
onMounted(async () => {
  await Promise.all([
    approvalsStore.fetchUsers(),
    refreshHistory()
  ])
})
</script>