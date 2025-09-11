<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Bank Reconciliation</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        New Reconciliation
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Reconciliations</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.totalReconciliations || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.completedReconciliations || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.pendingReconciliations || 0 }}
            </p>
          </div>
        </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-red-100">
            <svg
              class="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">With Discrepancies</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.reconciliationsWithDiscrepancies || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search reconciliations..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        />
        <select
          v-model="filters.status"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="DRAFT">Draft</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="DISCREPANCY">Discrepancy</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select
          v-model="filters.bankAccountId"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Accounts</option>
          <option value="BA-1">Main Business Checking</option>
          <option value="BA-2">Business Savings</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Reconciliations Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Reconciliations</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reconciliation
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bank Account
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statement Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Bank Balance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Book Balance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Difference
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                Loading reconciliations...
              </td>
            </tr>
            <tr v-else-if="reconciliations.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                No reconciliations found.
              </td>
            </tr>
            <tr v-for="reconciliation in reconciliations" :key="reconciliation.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ reconciliation.reconciliationNumber }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatDate(reconciliation.reconciliationDate) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ reconciliation.bankAccountName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(reconciliation.statementDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ formatNumber(reconciliation.bankBalance) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ formatNumber(reconciliation.bookBalance) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  class="font-medium"
                  :class="reconciliation.difference >= 0 ? 'text-green-600' : 'text-red-600'"
                >
                  ${{ formatNumber(reconciliation.difference) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusClass(reconciliation.status)"
                >
                  {{ formatStatus(reconciliation.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewReconciliation(reconciliation)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    @click="editReconciliation(reconciliation)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteReconciliation(reconciliation.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingReconciliation ? 'Edit Reconciliation' : 'Create New Reconciliation' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
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
        <ReconciliationForm
          :reconciliation="editingReconciliation"
          :loading="loading"
          @submit="handleSubmitReconciliation"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Reconciliation Modal -->
    <div
      v-if="viewingReconciliation"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">View Reconciliation Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
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
        <ReconciliationView :reconciliation="viewingReconciliation" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useReconciliationStore } from '../stores'
import type { Reconciliation, ReconciliationFormData } from '../types'
const ReconciliationForm = defineAsyncComponent(
  () => import('../components/ReconciliationForm.vue'),
)
const ReconciliationView = defineAsyncComponent(
  () => import('../components/ReconciliationView.vue'),
)

const reconciliationStore = useReconciliationStore()

const showCreateModal = ref(false)
const editingReconciliation = ref<Reconciliation | null>(null)
const viewingReconciliation = ref<Reconciliation | null>(null)
const searchQuery = ref('')
const filters = ref({
  status: '',
  bankAccountId: '',
})

const reconciliations = computed(() => reconciliationStore.reconciliations)
const loading = computed(() => reconciliationStore.loading)
const stats = computed(() => reconciliationStore.stats)

const openCreateModal = () => {
  editingReconciliation.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingReconciliation.value = null
}

const closeViewModal = () => {
  viewingReconciliation.value = null
}

const viewReconciliation = (reconciliation: Reconciliation) => {
  viewingReconciliation.value = reconciliation
}

const editReconciliation = (reconciliation: Reconciliation) => {
  editingReconciliation.value = reconciliation
  showCreateModal.value = true
}

const handleSubmitReconciliation = async (data: ReconciliationFormData) => {
  try {
    if (editingReconciliation.value) {
      await reconciliationStore.updateReconciliation(editingReconciliation.value.id, data)
    } else {
      await reconciliationStore.createReconciliation(data)
    }
    closeCreateModal()
    await reconciliationStore.loadReconciliations()
    await reconciliationStore.loadStats()
  } catch (error) {
    console.error('Failed to save reconciliation:', error)
  }
}

const deleteReconciliation = async (id: string) => {
  if (!confirm('Delete this reconciliation?')) return
  try {
    await reconciliationStore.deleteReconciliation(id)
    await reconciliationStore.loadReconciliations()
    await reconciliationStore.loadStats()
  } catch (error) {
    console.error('Failed to delete reconciliation:', error)
  }
}

const applyFilters = () => {
  // Implementation for applying filters
  console.log('Apply filters:', filters.value)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = { status: '', bankAccountId: '' }
}

const formatNumber = (num: number) => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusClass = (status: string) => {
  const classes = {
    DRAFT: 'bg-gray-100 text-gray-800',
    IN_PROGRESS: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    DISCREPANCY: 'bg-red-100 text-red-800',
    APPROVED: 'bg-purple-100 text-purple-800',
    REJECTED: 'bg-red-100 text-red-800',
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

onMounted(() => {
  // Load initial data
  reconciliationStore.loadReconciliations()
  reconciliationStore.loadStats()
})
</script>
