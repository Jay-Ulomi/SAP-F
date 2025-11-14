<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Goods Issue</h1>
        <p class="text-sm text-gray-600">Issue goods from inventory</p>
      </div>
      <div class="flex space-x-3">
        <button @click="showFormModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Issue
        </button>
        <button @click="loadIssueStats" class="btn-secondary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          Refresh Stats
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Issues</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalIssues || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Issued</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.issuedGoods || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-orange-100">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingIssues || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats?.totalValue || 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Goods Issue Form Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <GoodsIssueForm
          :initial-data="selectedIssue || undefined"
          @submit="handleFormSubmit"
          @cancel="handleFormCancel"
        />
      </div>
    </div>

    <!-- Issue List -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Issue Records</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="exportData"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Export
            </button>
            <button
              @click="refreshData"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-sap-blue bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchTerm"
              @input="updateFilters"
              type="text"
              placeholder="Search by document, customer, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="selectedStatus"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Date Range</label>
            <select
              v-model="dateRange"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue h-[38px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      <div class="px-6 py-4">
        <!-- Issues Table -->
        <div class="overflow-auto max-h-[calc(100vh-400px)]">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document No.
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Warehouse
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="issue in filteredIssues"
                :key="issue.id"
                class="hover:bg-gray-50 cursor-pointer transition-colors"
                @click="handleView(issue)"
              >
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ issue.documentNo }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(issue.postingDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ issue.customer }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ issue.warehouse }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ issue.itemsCount }} items
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(issue.totalAmount) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      issue.status === 'Issued'
                        ? 'bg-green-100 text-green-800'
                        : issue.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ issue.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium" @click.stop>
                  <div class="flex justify-end space-x-2">
                    <button
                      @click.stop="handleView(issue)"
                      class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                      title="View"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                    <button
                      @click.stop="handleEdit(issue)"
                      class="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredIssues.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.5"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No issues found</h3>
          <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria or create a new issue.</p>
          <div class="mt-6">
            <button @click="showFormModal = true" class="btn-primary">Create New Issue</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Goods Issue Detail Modal -->
    <div v-if="showDetailModal && selectedIssue" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Issue Details</h3>
          <button
            @click="handleDetailClose"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <GoodsIssueDetail
          :issue="selectedIssue"
          @edit="handleDetailEdit"
          @complete="handleDetailComplete"
          @cancel="handleDetailCancel"
          @print="handleDetailPrint"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGoodsIssueStore } from '../stores'
import type { GoodsIssue, GoodsIssueFormData } from '../types'
import { IssueStatus } from '../types'
import GoodsIssueForm from '../components/GoodsIssueForm.vue'
import GoodsIssueDetail from '../components/GoodsIssueDetail.vue'

// Store
const issueStore = useGoodsIssueStore()

// State
const showFormModal = ref(false)
const showDetailModal = ref(false)
const selectedIssue = ref<GoodsIssue | null>(null)
const showAdvancedFilters = ref(false)

// Filter states
const selectedStatus = ref<IssueStatus[]>([])
const customerFilter = ref('')
const searchTerm = ref('')
const dateRange = ref('')

// Store state
const issues = computed(() => issueStore.issues)
const loading = computed(() => issueStore.loading)
const error = computed(() => issueStore.error)
const pagination = computed(() => issueStore.pagination)
const stats = computed(() => issueStore.stats)

// Since filtering is handled by the store, we can use issues directly
const filteredIssues = computed(() => issues.value)

// Watch for filter changes
watch([selectedStatus, customerFilter, searchTerm], () => {
  updateFilters()
})

// Update filters method
const updateFilters = () => {
  issueStore.setFilters({
    search: searchTerm.value,
    status: selectedStatus.value,
    customer: customerFilter.value
  })
}
// Methods
const handleEdit = (issue: GoodsIssue) => {
  selectedIssue.value = issue
  showFormModal.value = true
}

const handleView = (issue: GoodsIssue) => {
  selectedIssue.value = issue
  showDetailModal.value = true
}

const handleFormSubmit = async (data: GoodsIssueFormData) => {
  try {
    if (selectedIssue.value) {
      await issueStore.updateIssue(selectedIssue.value.id!.toString(), data)
    } else {
      await issueStore.createIssue(data)
    }
    showFormModal.value = false
    selectedIssue.value = null
  } catch (err) {
    console.error('Error submitting issue:', err)
  }
}

const handleFormCancel = () => {
  showFormModal.value = false
  selectedIssue.value = null
}

const handleDetailEdit = (issue: GoodsIssue) => {
  showDetailModal.value = false
  handleEdit(issue)
}

const handleDetailComplete = async (issue: GoodsIssue) => {
  try {
    if (issue.id) {
      await issueStore.completeIssue(issue.id.toString())
      showDetailModal.value = false
      selectedIssue.value = null
    }
  } catch (error) {
    console.error('Error completing issue:', error)
  }
}

const handleDetailCancel = async (issue: GoodsIssue) => {
  try {
    if (issue.id) {
      await issueStore.cancelIssue(issue.id.toString())
      showDetailModal.value = false
      selectedIssue.value = null
    }
  } catch (error) {
    console.error('Error cancelling issue:', error)
  }
}

const handleDetailPrint = (issue: GoodsIssue) => {
  console.log('Print issue:', issue)
  // Implement print logic
}

const handleDetailClose = () => {
  showDetailModal.value = false
  selectedIssue.value = null
}

const clearFilters = () => {
  selectedStatus.value = []
  customerFilter.value = ''
  searchTerm.value = ''
  dateRange.value = ''
  issueStore.clearFilters()
}

const exportData = () => {
  console.log('Export data')
  // Implement export logic
}

const refreshData = () => {
  issueStore.loadIssues()
}

const loadIssueStats = async () => {
  await issueStore.loadIssueStats()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

onMounted(async () => {
  await issueStore.loadIssues()
  await issueStore.loadIssueStats()
})
</script>