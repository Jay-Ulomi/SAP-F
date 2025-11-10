<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Inventory Transfer</h1>
        <p class="text-sm text-gray-600">Transfer items between warehouses and locations</p>
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
          New Transfer
        </button>
        <button @click="loadTransferStats" class="btn-secondary flex items-center justify-center">
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Transfers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalTransfers || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.completedTransfers || 0 }}</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingTransfers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Draft</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.draftTransfers || 0 }}</p>
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
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Warehouse Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Warehouse</label>
            <select
              v-model="selectedWarehouse"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Warehouses</option>
              <option value="Main Warehouse">Main Warehouse</option>
              <option value="Secondary Warehouse">Secondary Warehouse</option>
              <option value="Storage Warehouse">Storage Warehouse</option>
            </select>
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchTerm"
              @input="updateFilters"
              type="text"
              placeholder="Search transfers..."
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

    <!-- Transfer Form Modal -->
    <div v-if="showFormModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <InventoryTransferForm
          :initial-data="selectedTransfer || undefined"
          @submit="handleFormSubmit"
          @cancel="handleFormCancel"
        />
      </div>
    </div>

    <!-- Transfer List -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Transfer Records</h3>
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

        <!-- Transfers Table -->
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
                  From Warehouse
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To Warehouse
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
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
              <tr v-for="transfer in filteredTransfers" :key="transfer.id">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  IT-2024-{{ String(transfer.id).padStart(3, '0') }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transfer.postingDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transfer.sourceWarehouse }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transfer.destinationWarehouse }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ transfer.lineItems.length }} items
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                      transfer.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : transfer.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    ]"
                  >
                    {{ transfer.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-2">
                    <button
                      @click="handleEdit(transfer)"
                      class="text-sap-blue hover:text-sap-blue-dark"
                    >
                      Edit
                    </button>
                    <button
                      @click="handleView(transfer)"
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
        <div v-if="filteredTransfers.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m0 0V9a2 2 0 012-2h2m0 0V6a2 2 0 012-2h2.5"></path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No transfers found</h3>
          <p class="mt-1 text-sm text-gray-500">Try adjusting your search criteria or create a new transfer.</p>
          <div class="mt-6">
            <button @click="showFormModal = true" class="btn-primary">Create New Transfer</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Transfer Detail Modal -->
    <div v-if="showDetailModal && selectedTransfer" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Transfer Details</h3>
          <button
            @click="handleDetailClose"
            class="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <InventoryTransferDetail
          :transfer="selectedTransfer"
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
import InventoryTransferForm from '../components/InventoryTransferForm.vue'
import InventoryTransferDetail from '../components/InventoryTransferDetail.vue'
import { useInventoryTransferStore } from '../stores'
import type { InventoryTransfer, InventoryTransferFormData } from '../types'
import { TransferStatus } from '../types'

// Store
const transferStore = useInventoryTransferStore()

// State
const showFormModal = ref(false)
const showDetailModal = ref(false)
const selectedTransfer = ref<InventoryTransfer | null>(null)
const showAdvancedFilters = ref(false)

// Filter states
const selectedStatus = ref('')
const selectedWarehouse = ref('')
const searchTerm = ref('')
const dateRange = ref('')

// Computed properties from store
const transfers = computed(() => transferStore.transfers)
const loading = computed(() => transferStore.loading)
const error = computed(() => transferStore.error)
const pagination = computed(() => transferStore.pagination)
const stats = computed(() => transferStore.stats)

// Since filtering is handled by the store, we can use transfers directly
const filteredTransfers = computed(() => transfers.value)

// Watch for filter changes
watch([selectedStatus, selectedWarehouse, searchTerm], () => {
  updateFilters()
})

// Methods
const handleEdit = (transfer: InventoryTransfer) => {
  selectedTransfer.value = transfer
  showFormModal.value = true
}

const handleView = (transfer: InventoryTransfer) => {
  selectedTransfer.value = transfer
  showDetailModal.value = true
}

const handleFormSubmit = async (data: InventoryTransferFormData) => {
  try {
    if (selectedTransfer.value) {
      await transferStore.updateTransfer(selectedTransfer.value.id!.toString(), data)
    } else {
      await transferStore.createTransfer(data)
    }
    showFormModal.value = false
    selectedTransfer.value = null
  } catch (error) {
    console.error('Error saving transfer:', error)
  }
}

const handleFormCancel = () => {
  showFormModal.value = false
  selectedTransfer.value = null
}

const handleDetailEdit = (transfer: InventoryTransfer) => {
  showDetailModal.value = false
  handleEdit(transfer)
}

const handleDetailComplete = async (transfer: InventoryTransfer) => {
  try {
    if (transfer.id) {
      await transferStore.completeTransfer(transfer.id.toString())
      showDetailModal.value = false
      selectedTransfer.value = null
    }
  } catch (error) {
    console.error('Error completing transfer:', error)
  }
}

const handleDetailCancel = async (transfer: InventoryTransfer) => {
  try {
    if (transfer.id) {
      await transferStore.cancelTransfer(transfer.id.toString())
      showDetailModal.value = false
      selectedTransfer.value = null
    }
  } catch (error) {
    console.error('Error cancelling transfer:', error)
  }
}

const handleDetailPrint = (transfer: InventoryTransfer) => {
  console.log('Print transfer:', transfer)
  // Implement print logic
}

const handleDetailClose = () => {
  showDetailModal.value = false
  selectedTransfer.value = null
}

const updateFilters = () => {
  const filters = {
    search: searchTerm.value || undefined,
    status: selectedStatus.value ? [selectedStatus.value as TransferStatus] : undefined,
    sourceWarehouse: selectedWarehouse.value || undefined
  }
  transferStore.setFilters(filters)
}

const clearFilters = () => {
  selectedStatus.value = ''
  selectedWarehouse.value = ''
  searchTerm.value = ''
  dateRange.value = ''
  transferStore.clearFilters()
}

const exportData = () => {
  console.log('Export data')
  // Implement export logic
}

const refreshData = async () => {
  await transferStore.loadTransfers()
  await transferStore.loadTransferStats()
}

const loadTransferStats = async () => {
  await transferStore.loadTransferStats()
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  await transferStore.loadTransfers()
  await transferStore.loadTransferStats()
})
</script>