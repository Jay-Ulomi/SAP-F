<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Material Issues</h1>
        <p class="text-sm text-gray-600">Manage material issuing for production orders</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Issue</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Open Issues</p>
            <p class="text-xl font-bold text-gray-900">{{ materialIssueStore.getOpenIssues().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-orange-100">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Overdue</p>
            <p class="text-xl font-bold text-gray-900">{{ materialIssueStore.getOverdueIssues().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completion</p>
            <p class="text-xl font-bold text-gray-900">{{ materialIssueStore.getIssueCompletionRate() }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-xl font-bold text-gray-900">{{ formatCurrency(materialIssueStore.getTotalIssueValue()) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search issues..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="partially_issued">Partially Issued</option>
            <option value="fully_issued">Fully Issued</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="production">Production</option>
            <option value="manual">Manual</option>
            <option value="backflush">Backflush</option>
            <option value="consumption">Consumption</option>
          </select>
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Issues Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Material Issues</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue #
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="issue in filteredIssues" :key="issue.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ issue.issueNumber }}</div>
                <div v-if="issue.productionOrderNumber" class="text-sm text-gray-500">PO: {{ issue.productionOrderNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 capitalize">
                  {{ issue.type.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ issue.itemName }}</div>
                <div class="text-sm text-gray-500">{{ issue.itemCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ issue.issuedQuantity }} / {{ issue.plannedQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      class="bg-blue-600 h-2 rounded-full" 
                      :style="{ width: getProgressPercentage(issue) + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ getProgressPercentage(issue) }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(issue.status),
                  ]"
                >
                  {{ issue.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div :class="{ 'text-red-600': isOverdue(issue) }">
                  {{ new Date(issue.dueDate).toLocaleDateString() }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewIssue(issue)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button
                    v-if="canEdit(issue)"
                    @click="editIssue(issue)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="canIssueItems(issue)"
                    @click="showIssueModal(issue)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Issue
                  </button>
                  <button
                    v-if="canClose(issue)"
                    @click="handleCloseIssue(issue.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Close
                  </button>
                  <button
                    v-if="canCancel(issue)"
                    @click="handleCancelIssue(issue.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredIssues.length === 0" class="text-center py-8">
          <p class="text-gray-500">No material issues found.</p>
        </div>
      </div>
    </div>

    <!-- Issue Items Modal -->
    <div v-if="showItemsModal && selectedIssue" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Issue Items - {{ selectedIssue.issueNumber }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Issue Quantity (Max: {{ selectedIssue.remainingQuantity }})
          </label>
          <input
            type="number"
            v-model.number="issueQuantity"
            :max="selectedIssue.remainingQuantity"
            min="0"
            step="0.01"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleIssueItems"
            :disabled="loading || issueQuantity <= 0 || issueQuantity > selectedIssue.remainingQuantity"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Issue Items' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <MaterialIssueForm
          :loading="loading"
          @submit="handleCreateIssue"
          @cancel="closeModals"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal && selectedIssue" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <MaterialIssueForm
          :issue="selectedIssue"
          :loading="loading"
          @submit="handleUpdateIssue"
          @cancel="closeModals"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useMaterialIssueStore } from '../stores/materialIssueStore'
import MaterialIssueForm from '../components/MaterialIssueForm.vue'
import type { MaterialIssue, MaterialIssueFormData, IssueStatus } from '../types'

const materialIssueStore = useMaterialIssueStore()

const loading = ref(false)
const showItemsModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedIssue = ref<MaterialIssue | null>(null)
const issueQuantity = ref(0)

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')

const filteredIssues = computed(() => {
  let filtered = materialIssueStore.issues

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      issue =>
        issue.issueNumber.toLowerCase().includes(query) ||
        issue.itemName.toLowerCase().includes(query) ||
        issue.itemCode.toLowerCase().includes(query) ||
        (issue.productionOrderNumber && issue.productionOrderNumber.toLowerCase().includes(query))
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(issue => issue.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(issue => issue.type === filterType.value)
  }

  return filtered
})

// Utility functions
function getProgressPercentage(issue: MaterialIssue): number {
  if (issue.plannedQuantity === 0) return 0
  return Math.round((issue.issuedQuantity / issue.plannedQuantity) * 100)
}

function getStatusClass(status: IssueStatus): string {
  const statusClasses = {
    draft: 'bg-gray-100 text-gray-800',
    open: 'bg-blue-100 text-blue-800',
    partially_issued: 'bg-yellow-100 text-yellow-800',
    fully_issued: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

function isOverdue(issue: MaterialIssue): boolean {
  const now = new Date()
  return new Date(issue.dueDate) < now && !['fully_issued', 'closed', 'cancelled'].includes(issue.status)
}

// Permission checks
function canEdit(issue: MaterialIssue): boolean {
  return ['draft', 'open'].includes(issue.status)
}

function canIssueItems(issue: MaterialIssue): boolean {
  return ['open', 'partially_issued'].includes(issue.status) && issue.remainingQuantity > 0
}

function canClose(issue: MaterialIssue): boolean {
  return ['fully_issued'].includes(issue.status)
}

function canCancel(issue: MaterialIssue): boolean {
  return !['closed', 'cancelled'].includes(issue.status)
}

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewIssue(issue: MaterialIssue) {
  // Implementation for viewing issue details
  console.log('Viewing issue:', issue)
}

function editIssue(issue: MaterialIssue) {
  selectedIssue.value = issue
  showEditModal.value = true
}

function showIssueModal(issue: MaterialIssue) {
  selectedIssue.value = issue
  issueQuantity.value = issue.remainingQuantity
  showItemsModal.value = true
}

function closeModals() {
  showItemsModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedIssue.value = null
  issueQuantity.value = 0
}

// CRUD handlers
async function handleCreateIssue(data: MaterialIssueFormData) {
  loading.value = true
  try {
    await materialIssueStore.createIssue(data)
    closeModals()
  } catch (error) {
    console.error('Error creating issue:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateIssue(data: MaterialIssueFormData) {
  if (!selectedIssue.value) return

  loading.value = true
  try {
    await materialIssueStore.updateIssue(selectedIssue.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating issue:', error)
  } finally {
    loading.value = false
  }
}

// Actions
async function handleIssueItems() {
  if (!selectedIssue.value) return

  loading.value = true
  try {
    await materialIssueStore.issueItems(selectedIssue.value.id, issueQuantity.value)
    closeModals()
  } catch (error) {
    console.error('Error issuing items:', error)
  } finally {
    loading.value = false
  }
}

async function handleCloseIssue(id: string) {
  if (confirm('Are you sure you want to close this issue?')) {
    try {
      await materialIssueStore.closeIssue(id)
    } catch (error) {
      console.error('Error closing issue:', error)
    }
  }
}

async function handleCancelIssue(id: string) {
  if (confirm('Are you sure you want to cancel this issue?')) {
    try {
      await materialIssueStore.cancelIssue(id)
    } catch (error) {
      console.error('Error cancelling issue:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterStatus.value = ''
  filterType.value = ''
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

onMounted(() => {
  materialIssueStore.fetchIssues()
  materialIssueStore.fetchStats()
})
</script>
