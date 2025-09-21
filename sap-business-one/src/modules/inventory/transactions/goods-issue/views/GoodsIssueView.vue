<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Goods Issue</h1>
        <p class="text-sm text-gray-600">Issue goods from inventory</p>
      </div>
      <button @click="showFormModal = true" class="btn-primary">New Issue</button>
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

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Filters</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-sap-blue bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2" />
              </svg>
              {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced
            </button>
            <button
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Statuses</option>
              <option value="Issued">Issued</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Customer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="customerFilter"
              @input="updateFilters"
              type="text"
              placeholder="Filter by customer..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchTerm"
              @input="updateFilters"
              type="text"
              placeholder="Search issues..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Date Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              v-model="dateRange"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
            </select>
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
        <div class="flex items-center justify-between">
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
      </div>
      <div class="px-6 py-4">
        <!-- Issues Table -->
        <div class="overflow-x-auto">
          <table class="w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
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
              <tr v-for="issue in filteredIssues" :key="issue.id">
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
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="handleEdit(issue)"
                      class="text-sap-blue hover:text-sap-blue-dark"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleView(issue)"
                      class="text-gray-600 hover:text-gray-900"
                    >
                      View
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