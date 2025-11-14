<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Deliveries</h1>
        <p class="text-sm text-gray-600">Manage customer deliveries and shipping</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="showCreateModal = true"
          class="btn-primary flex items-center justify-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Delivery
        </button>
        <button @click="loadDeliveryStats" class="btn-secondary flex items-center justify-center">
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

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Deliveries</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
            <p class="text-sm font-medium text-gray-600">Fully Delivered</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.fullyDelivered || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ stats?.partiallyDelivered || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatCurrency(stats?.totalValue || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Deliveries List -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Deliveries</h3>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="filters.search"
              @input="applyFilters"
              type="text"
              placeholder="Search by document, customer, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="selectedType"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Types</option>
              <option v-for="type in formTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
              <select
              v-model="selectedStatus"
                @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option v-for="status in Object.values(DeliveryStatus)" :key="status" :value="status">
                {{ formatDeliveryStatus(status) }}
              </option>
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

      <!-- Loading State -->
      <div v-if="store.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        <span class="ml-2 text-sm text-gray-500">Loading deliveries...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="store.error" class="text-center py-12">
        <div class="text-red-600 mb-2">
          <svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-600">{{ store.error }}</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delivery
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Warehouse
              </th>
              <th
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Services
              </th>
              <th
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="delivery in filteredDeliveries"
              :key="delivery.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewDelivery(delivery)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ delivery.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ delivery.docEntry }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ delivery.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ delivery.customerCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(delivery.deliveryDate) }}</div>
                <div class="text-sm text-gray-500">{{ formatDate(delivery.postingDate) }}</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getItemsSummary(delivery) }}</div>
                <div class="text-xs text-gray-500">{{ getItemCount(delivery) }} item(s)</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getPrimaryWarehouse(delivery) }}</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getServicesSummary(delivery) }}</div>
                <div class="text-xs text-gray-500">{{ getServiceCount(delivery) }} service(s)</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getServiceDescription(delivery) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(delivery.status)"
                >
                  {{ formatDeliveryStatus(delivery.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="
                    delivery.type === 'Item'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  "
                >
                  {{ delivery.type || 'Item' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(delivery.totalAmount) }}
                </div>
                <div class="text-sm text-gray-500">{{ delivery.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewDelivery(delivery)"
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
                    @click.stop="editDelivery(delivery)"
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
                  <button
                    @click.stop="deleteDelivery(delivery.id)"
                    class="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <!-- Empty State -->
        <div v-if="filteredDeliveries.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No deliveries found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new delivery.</p>
          <div class="mt-6">
            <button @click="showCreateModal = true" class="btn-primary">New Delivery</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > pagination.limit" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page * pagination.limit >= pagination.total"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        >
          <DeliveryForm
            :initial-data="editingDelivery"
            :loading="store.loading"
            @submit="handleDeliverySaved"
            @cancel="closeModal"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDeliveriesStore } from '../stores/deliveriesStore'
import { DeliveryStatus, DeliveryType } from '../types'
import type { Delivery, DeliveryFormData } from '../types'
import DeliveryForm from '../components/DeliveryForm.vue'

// Store
const store = useDeliveriesStore()

// Local state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const editingDelivery = ref<DeliveryFormData | null>(null)

// Additional filter variables
const priorityFilter = ref('')
const carrierFilter = ref('')
const trackingFilter = ref('')
const estimatedDateFromFilter = ref('')
const estimatedDateToFilter = ref('')

// Filters
const filters = ref({
  status: [] as DeliveryStatus[],
  type: [] as DeliveryType[],
  customerCode: '',
  salesPerson: '',
  dateFrom: '',
  dateTo: '',
  search: '',
})

const selectedType = ref('')
const selectedStatus = ref<DeliveryStatus | ''>('')

// Computed properties
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)
const formTypes = computed(() => ['Item', 'Service'])

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    filters.value.customerCode ||
    filters.value.salesPerson ||
    filters.value.dateFrom ||
    filters.value.dateTo ||
    filters.value.search ||
    priorityFilter.value ||
    carrierFilter.value ||
    trackingFilter.value ||
    estimatedDateFromFilter.value ||
    estimatedDateToFilter.value
  )
})

const filteredDeliveries = computed(() => {
  let filtered = store.deliveries

  // Apply status filter
  if (selectedStatus.value) {
    filtered = filtered.filter((d) => d.status === selectedStatus.value)
  }

  // Apply type filter
  if (selectedType.value) {
    filtered = filtered.filter((d) => d.type === selectedType.value)
  }

  // Apply customer filter
  if (filters.value.customerCode) {
    filtered = filtered.filter(
      (d) =>
        d.customerCode.toLowerCase().includes(filters.value.customerCode.toLowerCase()) ||
        d.customerName.toLowerCase().includes(filters.value.customerCode.toLowerCase()),
    )
  }

  // Apply sales person filter
  if (filters.value.salesPerson) {
    filtered = filtered.filter((d) =>
      d.salesPerson?.toLowerCase().includes(filters.value.salesPerson.toLowerCase()),
    )
  }

  // Apply date filters
  if (filters.value.dateFrom) {
    filtered = filtered.filter((d) => d.deliveryDate >= filters.value.dateFrom)
  }
  if (filters.value.dateTo) {
    filtered = filtered.filter((d) => d.deliveryDate <= filters.value.dateTo)
  }

  // Apply search filter
  if (filters.value.search) {
    const searchTerm = filters.value.search.toLowerCase()
    filtered = filtered.filter(
      (d) =>
        d.docNum.toLowerCase().includes(searchTerm) ||
        d.customerName.toLowerCase().includes(searchTerm) ||
        d.customerCode.toLowerCase().includes(searchTerm) ||
        d.reference?.toLowerCase().includes(searchTerm),
    )
  }

  return filtered
})

// Methods
const applyFilters = () => {
  // Convert selectedStatus and selectedType to filters format
  const updatedFilters = {
    ...filters.value,
    status: selectedStatus.value ? [selectedStatus.value as DeliveryStatus] : [],
    type: selectedType.value ? [selectedType.value as DeliveryType] : [],
  }
  store.updateFilters(updatedFilters)
  store.fetchDeliveries(1)
}

const clearFilters = () => {
  selectedStatus.value = ''
  selectedType.value = ''
  filters.value = {
    status: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  }
  priorityFilter.value = ''
  carrierFilter.value = ''
  trackingFilter.value = ''
  estimatedDateFromFilter.value = ''
  estimatedDateToFilter.value = ''
  store.clearFilters()
}

const viewDelivery = (delivery: Delivery) => {
  // TODO: Implement view delivery detail page
  console.log('View delivery:', delivery)
}

const editDelivery = (delivery: Delivery) => {
  editingDelivery.value = {
    customerCode: delivery.customerCode,
    deliveryDate: delivery.deliveryDate,
    postingDate: delivery.postingDate,
    type: delivery.type,
    currency: delivery.currency,
    exchangeRate: delivery.exchangeRate,
    salesPerson: delivery.salesPerson || '',
    reference: delivery.reference || '',
    remarks: delivery.remarks || '',
    project: delivery.project || '',
    relatedOrderId: delivery.relatedOrderId || '',
    relatedQuotationId: delivery.relatedQuotationId || '',
    deliveryMethod: delivery.deliveryMethod || '',
    shippingAddress: delivery.shippingAddress,
    trackingNumber: delivery.trackingNumber || '',
    carrier: delivery.carrier || '',
    estimatedDeliveryDate: delivery.estimatedDeliveryDate || '',
    lineItems: delivery.lineItems.map((item) => ({
      itemCode: item.itemCode,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discount: item.discount,
      discountType: item.discountType,
      taxCode: item.taxCode,
      taxRate: item.taxRate,
      warehouseCode: item.warehouseCode || '',
      batchNumber: item.batchNumber || '',
      serialNumber: item.serialNumber || '',
      remarks: item.remarks || '',
    })),
  }
  showEditModal.value = true
}

const deleteDelivery = async (id: string) => {
  if (confirm('Are you sure you want to delete this delivery?')) {
    try {
      await store.deleteDelivery(id)
    } catch (error) {
      console.error('Error deleting delivery:', error)
    }
  }
}

const handleDeliverySaved = async (data: DeliveryFormData) => {
  try {
    if (editingDelivery.value) {
      // For editing, we need to get the delivery ID from the store
      const currentDelivery = store.currentDelivery
      if (currentDelivery) {
        await store.updateDelivery(currentDelivery.id, data)
      }
    } else {
      await store.createDelivery(data)
    }
    closeModal()
    // Refresh the deliveries list
    await store.fetchDeliveries(1)
  } catch (error) {
    console.error('Error saving delivery:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingDelivery.value = null
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    store.fetchDeliveries(pagination.value.page - 1)
  }
}

const nextPage = () => {
  if (pagination.value.page * pagination.value.limit < pagination.value.total) {
    store.fetchDeliveries(pagination.value.page + 1)
  }
}

const formatDeliveryStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatDeliveryType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0)
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800'
    case 'OPEN':
      return 'bg-blue-100 text-blue-800'
    case 'RELEASED':
      return 'bg-yellow-100 text-yellow-800'
    case 'PARTIALLY_DELIVERED':
      return 'bg-orange-100 text-orange-800'
    case 'FULLY_DELIVERED':
      return 'bg-green-100 text-green-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    case 'CLOSED':
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper functions for Item/Service display
const getItemsSummary = (record) => {
  if (!record.lineItems || record.lineItems.length === 0) return 'No items'
  const firstItem = record.lineItems[0]
  if (record.lineItems.length === 1) {
    return firstItem.itemCode || firstItem.description || 'Item'
  }
  return `${firstItem.itemCode || firstItem.description || 'Item'} +${record.lineItems.length - 1} more`
}

const getItemCount = (record) => {
  return record.lineItems?.length || 0
}

const getPrimaryWarehouse = (record) => {
  if (!record.lineItems || record.lineItems.length === 0) return '-'
  const warehouses = [
    ...new Set(record.lineItems.map((item) => item.warehouseCode).filter(Boolean)),
  ]
  if (warehouses.length === 0) return '-'
  if (warehouses.length === 1) return warehouses[0]
  return `${warehouses[0]} +${warehouses.length - 1} more`
}

const getServicesSummary = (record) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return 'No services'
  const firstService = record.serviceItems[0]
  if (record.serviceItems.length === 1) {
    return firstService.description || 'Service'
  }
  return `${firstService.description || 'Service'} +${record.serviceItems.length - 1} more`
}

const getServiceCount = (record) => {
  return record.serviceItems?.length || 0
}

const getServiceDescription = (record) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return '-'
  const descriptions = record.serviceItems
    .map((service) => service.description)
    .filter(Boolean)
    .slice(0, 2)
  if (descriptions.length === 0) return '-'
  if (descriptions.length === 1) return descriptions[0]
  return descriptions.join(', ') + (record.serviceItems.length > 2 ? '...' : '')
}

// Methods
const loadDeliveryStats = async () => {
  await store.fetchStats()
}

// Lifecycle
onMounted(async () => {
  await store.fetchDeliveries()
  await store.fetchStats()
})

// Watch for filter changes
watch(
  filters,
  () => {
    // Debounce filter application
    clearTimeout((window as any).filterTimeout)
    ;(window as any).filterTimeout = setTimeout(() => {
      applyFilters()
    }, 500)
  },
  { deep: true },
)
</script>
