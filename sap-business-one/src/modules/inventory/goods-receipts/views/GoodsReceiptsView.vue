<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Goods Receipts & Issues</h1>
        <p class="text-sm text-gray-600">Manage inventory movements and transactions</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Transaction</button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Receipts</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalReceipts || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-red-100">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Issues</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalIssues || 0 }}</p>
          </div>
        </div>
      </div>

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
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Approvals</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.pendingApprovals || 0 }}</p>
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
          <option value="receipt">Goods Receipt</option>
          <option value="issue">Goods Issue</option>
          <option value="transfer">Transfer</option>
          <option value="adjustment">Adjustment</option>
          <option value="return">Return</option>
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
          <option value="posted">Posted</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          v-model="selectedTransactionType"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Transaction Types</option>
          <option value="inbound">Inbound</option>
          <option value="outbound">Outbound</option>
          <option value="internal">Internal</option>
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
                Document
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Warehouse
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
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
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                No goods receipts found
              </td>
            </tr>
            <tr v-else v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.documentNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatType(item.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(item.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.warehouseCode }} - {{ item.warehouseName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.referenceNumber || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(item.status)"
                >
                  {{ formatStatus(item.status) }}
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
    <GoodsReceiptForm
      v-if="showFormModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <GoodsReceiptView
      v-if="showViewModal && selectedItem"
      :item="selectedItem"
      @close="closeViewModal"
      @edit="editItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGoodsReceiptsStore } from '../stores'
import { defineAsyncComponent } from 'vue'
import type {
  GoodsReceipt,
  GoodsReceiptFormData,
  GoodsReceiptType,
  GoodsReceiptStatus,
  TransactionType,
  GoodsReceiptFilters,
} from '../types'

const GoodsReceiptForm = defineAsyncComponent(() => import('../components/GoodsReceiptForm.vue'))
const GoodsReceiptView = defineAsyncComponent(() => import('../components/GoodsReceiptView.vue'))

// Store
const goodsReceiptsStore = useGoodsReceiptsStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref<GoodsReceiptType | ''>('')
const selectedStatus = ref<GoodsReceiptStatus | ''>('')
const selectedTransactionType = ref<TransactionType | ''>('')
const showFormModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<GoodsReceipt | null>(null)

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
} = goodsReceiptsStore

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
    receipt: 'Goods Receipt',
    issue: 'Goods Issue',
    transfer: 'Transfer',
    adjustment: 'Adjustment',
    return: 'Return',
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    posted: 'Posted',
    cancelled: 'Cancelled',
  }
  return statusMap[status] || status
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
    posted: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const handleSearch = () => {
  goodsReceiptsStore.setFilters({ search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Partial<GoodsReceiptFilters> = {}
  if (selectedType.value) filters.type = selectedType.value
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedTransactionType.value) filters.transactionType = selectedTransactionType.value

  goodsReceiptsStore.setFilters(filters)
}

const setPage = (page: number) => {
  goodsReceiptsStore.setPage(page)
}

const openCreateModal = () => {
  selectedItem.value = null
  showFormModal.value = true
}

const editItem = (item: GoodsReceipt) => {
  selectedItem.value = item
  showFormModal.value = true
  showViewModal.value = false
}

const viewItem = (item: GoodsReceipt) => {
  selectedItem.value = item
  showViewModal.value = true
  showFormModal.value = false
}

const deleteItem = async (item: GoodsReceipt) => {
  if (confirm(`Are you sure you want to delete this goods receipt?`)) {
    try {
      await goodsReceiptsStore.deleteGoodsReceipt(item.id)
    } catch (error) {
      console.error('Error deleting goods receipt:', error)
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

const handleFormSubmit = async (data: GoodsReceiptFormData) => {
  try {
    if (selectedItem.value) {
      await goodsReceiptsStore.updateGoodsReceipt(selectedItem.value.id, data)
    } else {
      await goodsReceiptsStore.createGoodsReceipt(data)
    }
    closeFormModal()
  } catch (error) {
    console.error('Error saving goods receipt:', error)
  }
}

// Lifecycle
onMounted(() => {
  goodsReceiptsStore.fetchStats()
  goodsReceiptsStore.fetchGoodsReceipts()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedTransactionType],
  () => {
    handleFilterChange()
  },
  { deep: true },
)
</script>
