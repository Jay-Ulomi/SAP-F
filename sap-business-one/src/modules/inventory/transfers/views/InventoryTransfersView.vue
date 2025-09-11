<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Inventory Transfers</h1>
        <p class="text-sm text-gray-600">
          Manage inventory movements between warehouses and locations
        </p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Transfer</button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Transfers</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalTransfers || 0 }}</p>
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.pendingTransfers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">In Transit</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.inTransitTransfers || 0 }}</p>
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
            <p class="text-xl font-bold text-gray-900">{{ stats?.completedTransfers || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @input="handleSearch"
        />
        <select
          v-model="selectedType"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="warehouse_to_warehouse">Warehouse to Warehouse</option>
          <option value="location_to_location">Location to Location</option>
          <option value="branch_to_branch">Branch to Branch</option>
          <option value="internal">Internal</option>
          <option value="external">External</option>
        </select>
        <select
          v-model="selectedStatus"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Status</option>
          <option value="draft">Draft</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="in_transit">In Transit</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          v-model="selectedPriority"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Transfer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                From → To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Amount
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
                <div class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading...
                </div>
              </td>
            </tr>
            <tr v-else-if="!hasItems">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">No transfers found</td>
            </tr>
            <tr v-else v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.transferNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatType(item.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="text-xs">
                  <div>{{ item.fromWarehouseCode }} → {{ item.toWarehouseCode }}</div>
                  <div v-if="item.fromLocationCode || item.toLocationCode" class="text-gray-500">
                    {{ item.fromLocationCode || '-' }} → {{ item.toLocationCode || '-' }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(item.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(item.status)"
                >
                  {{ formatStatus(item.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getPriorityBadgeClass(item.priority)"
                >
                  {{ formatPriority(item.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.totalAmount, item.currency) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewItem(item)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="setPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="setPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, totalItems)
              }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="setPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="setPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="setPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <TransferForm
      v-if="showFormModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <TransferView
      v-if="showViewModal && selectedItem"
      :item="selectedItem"
      @close="closeViewModal"
      @edit="editItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useTransfersStore } from '../stores'
import { defineAsyncComponent } from 'vue'
import type {
  InventoryTransfer,
  TransferFormData,
  TransferType,
  TransferStatus,
  TransferPriority,
  TransferFilters,
} from '../types'

const TransferForm = defineAsyncComponent(() => import('../components/TransferForm.vue'))
const TransferView = defineAsyncComponent(() => import('../components/TransferView.vue'))

// Store
const transfersStore = useTransfersStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref<TransferType | ''>('')
const selectedStatus = ref<TransferStatus | ''>('')
const selectedPriority = ref<TransferPriority | ''>('')
const showFormModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<InventoryTransfer | null>(null)

// Computed
const {
  paginatedItems,
  stats,
  loading,
  hasItems,
  totalItems,
  currentPage,
  itemsPerPage,
  totalPages,
} = transfersStore

// Computed for pagination
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const formatType = (type: string): string => {
  const typeMap: Record<string, string> = {
    warehouse_to_warehouse: 'Warehouse to Warehouse',
    location_to_location: 'Location to Location',
    branch_to_branch: 'Branch to Branch',
    internal: 'Internal',
    external: 'External',
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    in_transit: 'In Transit',
    completed: 'Completed',
    cancelled: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    urgent: 'Urgent',
  }
  return priorityMap[priority] || priority
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const getStatusBadgeClass = (status: string): string => {
  const classMap: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    in_transit: 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityBadgeClass = (priority: string): string => {
  const classMap: Record<string, string> = {
    low: 'bg-gray-100 text-gray-800',
    normal: 'bg-blue-100 text-blue-800',
    high: 'bg-orange-100 text-orange-800',
    urgent: 'bg-red-100 text-red-800',
  }
  return classMap[priority] || 'bg-gray-100 text-gray-800'
}

const handleSearch = () => {
  transfersStore.setFilters({ search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Partial<TransferFilters> = {}
  if (selectedType.value) filters.type = selectedType.value
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedPriority.value) filters.priority = selectedPriority.value

  transfersStore.setFilters(filters)
}

const setPage = (page: number) => {
  transfersStore.setPage(page)
}

const openCreateModal = () => {
  selectedItem.value = null
  showFormModal.value = true
}

const editItem = (item: InventoryTransfer) => {
  selectedItem.value = item
  showFormModal.value = true
  showViewModal.value = false
}

const viewItem = (item: InventoryTransfer) => {
  selectedItem.value = item
  showViewModal.value = true
  showFormModal.value = false
}

const deleteItem = async (item: InventoryTransfer) => {
  if (confirm(`Are you sure you want to delete this transfer?`)) {
    try {
      await transfersStore.deleteTransfer(item.id)
    } catch (error) {
      console.error('Error deleting transfer:', error)
    }
  }
}

const closeFormModal = () => {
  showFormModal.value = false
  selectedItem.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: TransferFormData) => {
  try {
    if (selectedItem.value) {
      await transfersStore.updateTransfer(selectedItem.value.id, data)
    } else {
      await transfersStore.createTransfer(data)
    }
    closeFormModal()
  } catch (error) {
    console.error('Error saving transfer:', error)
  }
}

// Lifecycle
onMounted(() => {
  transfersStore.fetchStats()
  transfersStore.fetchTransfers()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedPriority],
  () => {
    handleFilterChange()
  },
  { deep: true },
)
</script>
