<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Production Receipts</h1>
        <p class="text-sm text-gray-600">Manage production goods receipt and quality inspection</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Receipt</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Open Receipts</p>
            <p class="text-xl font-bold text-gray-900">{{ productionReceiptStore.getOpenReceipts().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-orange-100">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Quality</p>
            <p class="text-xl font-bold text-gray-900">{{ productionReceiptStore.getPendingQualityReceipts().length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Yield</p>
            <p class="text-xl font-bold text-gray-900">{{ productionReceiptStore.getAverageYield() }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-xl font-bold text-gray-900">{{ formatCurrency(productionReceiptStore.getTotalReceivedValue()) }}</p>
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
            placeholder="Search receipts..."
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
            <option value="partially_received">Partially Received</option>
            <option value="fully_received">Fully Received</option>
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
            <option value="byproduct">Byproduct</option>
            <option value="rework">Rework</option>
            <option value="scrap">Scrap</option>
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

    <!-- Receipts Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Production Receipts</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt #
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
                Yield
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quality
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receipt Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="receipt in filteredReceipts" :key="receipt.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ receipt.receiptNumber }}</div>
                <div v-if="receipt.productionOrderNumber" class="text-sm text-gray-500">PO: {{ receipt.productionOrderNumber }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 capitalize">
                  {{ receipt.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ receipt.itemName }}</div>
                <div class="text-sm text-gray-500">{{ receipt.itemCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ receipt.receivedQuantity }} / {{ receipt.plannedQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      class="h-2 rounded-full" 
                      :class="getYieldColorClass(receipt.yieldPercentage)"
                      :style="{ width: receipt.yieldPercentage + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600">{{ receipt.yieldPercentage }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusClass(receipt.status),
                  ]"
                >
                  {{ receipt.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getQualityStatusClass(receipt.qualityStatus),
                  ]"
                >
                  {{ receipt.qualityStatus.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(receipt.receiptDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewReceipt(receipt)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    View
                  </button>
                  <button
                    v-if="canEdit(receipt)"
                    @click="editReceipt(receipt)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="canReceiveItems(receipt)"
                    @click="showReceiveModal(receipt)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Receive
                  </button>
                  <button
                    v-if="canUpdateQuality(receipt)"
                    @click="showQualityModal(receipt)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Quality
                  </button>
                  <button
                    v-if="canClose(receipt)"
                    @click="handleCloseReceipt(receipt.id)"
                    class="text-purple-600 hover:text-purple-900"
                  >
                    Close
                  </button>
                  <button
                    v-if="canCancel(receipt)"
                    @click="handleCancelReceipt(receipt.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredReceipts.length === 0" class="text-center py-8">
          <p class="text-gray-500">No production receipts found.</p>
        </div>
      </div>
    </div>

    <!-- Receive Items Modal -->
    <div v-if="showReceiveItemsModal && selectedReceipt" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Receive Items - {{ selectedReceipt.receiptNumber }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Receive Quantity (Max: {{ selectedReceipt.remainingQuantity }})
          </label>
          <input
            type="number"
            v-model.number="receiveQuantity"
            :max="selectedReceipt.remainingQuantity"
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
            @click="handleReceiveItems"
            :disabled="loading || receiveQuantity <= 0 || receiveQuantity > selectedReceipt.remainingQuantity"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ loading ? 'Processing...' : 'Receive Items' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Quality Status Modal -->
    <div v-if="showQualityStatusModal && selectedReceipt" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Update Quality Status - {{ selectedReceipt.receiptNumber }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Quality Status</label>
          <select
            v-model="selectedQualityStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeModals"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="handleUpdateQualityStatus"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {{ loading ? 'Updating...' : 'Update Status' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <ProductionReceiptForm
          :loading="loading"
          @submit="handleCreateReceipt"
          @cancel="closeModals"
        />
      </div>
    </div>

    <!-- Edit Modal -->
    <div v-if="showEditModal && selectedReceipt" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <ProductionReceiptForm
          :receipt="selectedReceipt"
          :loading="loading"
          @submit="handleUpdateReceipt"
          @cancel="closeModals"
        />
      </div>
    </div>

    <!-- View Receipt Details Modal -->
    <div v-if="showViewModal && selectedReceipt" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-4 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white min-h-[calc(100vh-2rem)]">
        <div class="flex justify-between items-center mb-4 border-b border-gray-200 pb-4">
          <h3 class="text-lg font-medium text-gray-900">Production Receipt Details</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="max-h-[calc(100vh-8rem)] overflow-y-auto">
          <ProductionReceiptDetails
            :receipt="selectedReceipt"
            @edit="handleEditFromDetails"
            @export="handleExportFromDetails"
            @print="handlePrintFromDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductionReceiptStore } from '../stores/productionReceiptStore'
import ProductionReceiptForm from '../components/ProductionReceiptForm.vue'
import ProductionReceiptDetails from '../components/ProductionReceiptDetails.vue'
import type { ProductionReceipt, ProductionReceiptFormData } from '../types'
import { ReceiptStatus, QualityStatus } from '../types'

const productionReceiptStore = useProductionReceiptStore()

const loading = ref(false)
const showReceiveItemsModal = ref(false)
const showQualityStatusModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedReceipt = ref<ProductionReceipt | null>(null)
const receiveQuantity = ref(0)
const selectedQualityStatus = ref<QualityStatus>(QualityStatus.PENDING)

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')

const filteredReceipts = computed(() => {
  let filtered = productionReceiptStore.receipts

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      receipt =>
        receipt.receiptNumber.toLowerCase().includes(query) ||
        receipt.itemName.toLowerCase().includes(query) ||
        receipt.itemCode.toLowerCase().includes(query) ||
        (receipt.productionOrderNumber && receipt.productionOrderNumber.toLowerCase().includes(query))
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(receipt => receipt.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(receipt => receipt.type === filterType.value)
  }

  return filtered
})

// Utility functions
function getStatusClass(status: ReceiptStatus): string {
  const statusClasses = {
    draft: 'bg-gray-100 text-gray-800',
    open: 'bg-blue-100 text-blue-800',
    partially_received: 'bg-yellow-100 text-yellow-800',
    fully_received: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

function getQualityStatusClass(qualityStatus: QualityStatus): string {
  const statusClasses = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    on_hold: 'bg-orange-100 text-orange-800',
  }
  return statusClasses[qualityStatus] || 'bg-gray-100 text-gray-800'
}

function getYieldColorClass(yieldPercentage: number): string {
  if (yieldPercentage >= 95) return 'bg-green-600'
  if (yieldPercentage >= 85) return 'bg-blue-600'
  if (yieldPercentage >= 70) return 'bg-yellow-500'
  return 'bg-red-600'
}

// Permission checks
function canEdit(receipt: ProductionReceipt): boolean {
  return ['draft', 'open'].includes(receipt.status)
}

function canReceiveItems(receipt: ProductionReceipt): boolean {
  return ['open', 'partially_received'].includes(receipt.status) && receipt.remainingQuantity > 0
}

function canUpdateQuality(receipt: ProductionReceipt): boolean {
  return receipt.receivedQuantity > 0
}

function canClose(receipt: ProductionReceipt): boolean {
  return ['fully_received'].includes(receipt.status)
}

function canCancel(receipt: ProductionReceipt): boolean {
  return !['closed', 'cancelled'].includes(receipt.status)
}

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewReceipt(receipt: ProductionReceipt) {
  selectedReceipt.value = receipt
  showViewModal.value = true
}

function editReceipt(receipt: ProductionReceipt) {
  selectedReceipt.value = receipt
  showEditModal.value = true
}

function showReceiveModal(receipt: ProductionReceipt) {
  selectedReceipt.value = receipt
  receiveQuantity.value = receipt.remainingQuantity
  showReceiveItemsModal.value = true
}

function showQualityModal(receipt: ProductionReceipt) {
  selectedReceipt.value = receipt
  selectedQualityStatus.value = receipt.qualityStatus
  showQualityStatusModal.value = true
}

function closeModals() {
  showReceiveItemsModal.value = false
  showQualityStatusModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedReceipt.value = null
  receiveQuantity.value = 0
  selectedQualityStatus.value = QualityStatus.PENDING
}

// Receipt Details Event Handlers
function handleEditFromDetails(receipt: ProductionReceipt) {
  closeModals()
  editReceipt(receipt)
}

function handleExportFromDetails(receipt: ProductionReceipt) {
  // Export functionality - could integrate with reporting system
  console.log('Exporting receipt:', receipt.receiptNumber)
  // TODO: Implement export functionality
}

function handlePrintFromDetails(receipt: ProductionReceipt) {
  // Print functionality
  console.log('Printing receipt:', receipt.receiptNumber)
  window.print()
}

// CRUD handlers
async function handleCreateReceipt(data: ProductionReceiptFormData) {
  loading.value = true
  try {
    await productionReceiptStore.createReceipt(data)
    closeModals()
  } catch (error) {
    console.error('Error creating receipt:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateReceipt(data: ProductionReceiptFormData) {
  if (!selectedReceipt.value) return

  loading.value = true
  try {
    await productionReceiptStore.updateReceipt(selectedReceipt.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating receipt:', error)
  } finally {
    loading.value = false
  }
}

// Actions
async function handleReceiveItems() {
  if (!selectedReceipt.value) return

  loading.value = true
  try {
    await productionReceiptStore.receiveItems(selectedReceipt.value.id, receiveQuantity.value)
    closeModals()
  } catch (error) {
    console.error('Error receiving items:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateQualityStatus() {
  if (!selectedReceipt.value) return

  loading.value = true
  try {
    await productionReceiptStore.updateQualityStatus(selectedReceipt.value.id, selectedQualityStatus.value)
    closeModals()
  } catch (error) {
    console.error('Error updating quality status:', error)
  } finally {
    loading.value = false
  }
}

async function handleCloseReceipt(id: string) {
  if (confirm('Are you sure you want to close this receipt?')) {
    try {
      await productionReceiptStore.closeReceipt(id)
    } catch (error) {
      console.error('Error closing receipt:', error)
    }
  }
}

async function handleCancelReceipt(id: string) {
  if (confirm('Are you sure you want to cancel this receipt?')) {
    try {
      await productionReceiptStore.cancelReceipt(id)
    } catch (error) {
      console.error('Error cancelling receipt:', error)
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
  productionReceiptStore.fetchReceipts()
  productionReceiptStore.fetchStats()
})
</script>
