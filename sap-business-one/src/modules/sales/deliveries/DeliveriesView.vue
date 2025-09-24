<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Deliveries</h1>
          <p class="text-sm text-gray-600 mt-1">Track and manage deliveries</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Delivery
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
            <p class="text-sm text-gray-600">Total Deliveries</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.inTransit }}</p>
            <p class="text-sm text-gray-600">In Transit</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.delivered }}</p>
            <p class="text-sm text-gray-600">Delivered</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L5.232 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.delayed }}</p>
            <p class="text-sm text-gray-600">Delayed</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="searchTerm"
            type="text"
            placeholder="Search deliveries..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="statusFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="IN_TRANSIT">In Transit</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
          <select
            v-model="customerFilter"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Customers</option>
            <option v-for="customer in uniqueCustomers" :key="customer" :value="customer">
              {{ customer }}
            </option>
          </select>
        </div>
        <div class="flex items-end">
          <button @click="resetFilters" class="w-full btn-secondary">
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Deliveries Table -->
    <div class="bg-white rounded-lg shadow border overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Deliveries ({{ filteredDeliveries.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery #
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales Order
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Delivery Date
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tracking
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="delivery in paginatedDeliveries" :key="delivery.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-blue-600 cursor-pointer" @click="viewDelivery(delivery)">
                  {{ delivery.deliveryNumber }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ delivery.customerName }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ delivery.salesOrderNumber }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(delivery.deliveryDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': delivery.status === 'DELIVERED',
                    'bg-blue-100 text-blue-800': delivery.status === 'IN_TRANSIT',
                    'bg-yellow-100 text-yellow-800': delivery.status === 'PROCESSING',
                    'bg-gray-100 text-gray-800': delivery.status === 'PENDING',
                    'bg-red-100 text-red-800': delivery.status === 'CANCELLED'
                  }"
                >
                  {{ formatStatus(delivery.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span v-if="delivery.trackingNumber" class="text-blue-600 cursor-pointer" @click="trackDelivery(delivery)">
                  {{ delivery.trackingNumber }}
                </span>
                <span v-else class="text-gray-400">Not assigned</span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1">
                  <button @click="viewDelivery(delivery)" class="text-blue-600 hover:text-blue-900 text-xs">
                    View
                  </button>
                  <button @click="editDelivery(delivery)" class="text-green-600 hover:text-green-900 text-xs">
                    Edit
                  </button>
                  <button @click="createInvoice(delivery)" class="text-purple-600 hover:text-purple-900 text-xs" v-if="delivery.status === 'DELIVERED'">
                    Invoice
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-200">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="text-sm text-gray-700">
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredDeliveries.length) }} of {{ filteredDeliveries.length }} results
          </div>
          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <ResponsiveModal v-if="showViewModal && selectedDelivery" @close="showViewModal = false">
      <DeliveryView
        :delivery="selectedDelivery"
        @edit="editDelivery(selectedDelivery)"
        @invoice="createInvoice(selectedDelivery)"
        @print="printDelivery(selectedDelivery)"
        @track="trackDelivery(selectedDelivery)"
        @return="createReturn(selectedDelivery)"
      />
    </ResponsiveModal>

    <!-- Create/Edit Modal -->
    <ResponsiveModal v-if="showCreateModal || showEditModal" @close="closeModals">
      <DeliveryForm
        :delivery="selectedDelivery"
        @save="handleSave"
        @cancel="closeModals"
      />
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { deliveriesApi } from './api/deliveriesApi'
import ResponsiveModal from '@/components/ResponsiveModal.vue'
import DeliveryView from './components/DeliveryView.vue'
import DeliveryForm from './components/DeliveryForm.vue'

interface Delivery {
  id: string
  deliveryNumber: string
  customerName: string
  salesOrderNumber: string
  deliveryDate: string
  status: 'PENDING' | 'PROCESSING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'
  trackingNumber?: string
  items: any[]
}

const deliveries = ref<Delivery[]>([])
const loading = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const customerFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showViewModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedDelivery = ref<Delivery | null>(null)

const stats = computed(() => {
  const total = deliveries.value.length
  const inTransit = deliveries.value.filter(d => d.status === 'IN_TRANSIT').length
  const delivered = deliveries.value.filter(d => d.status === 'DELIVERED').length

  // Calculate delayed deliveries (example logic: deliveries past their date that aren't delivered)
  const today = new Date()
  const delayed = deliveries.value.filter(d => {
    const deliveryDate = new Date(d.deliveryDate)
    return deliveryDate < today && d.status !== 'DELIVERED'
  }).length

  return { total, inTransit, delivered, delayed }
})

const uniqueCustomers = computed(() => {
  return [...new Set(deliveries.value.map(d => d.customerName))]
})

const filteredDeliveries = computed(() => {
  let filtered = deliveries.value

  if (searchTerm.value) {
    filtered = filtered.filter(d =>
      d.deliveryNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      d.customerName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      d.salesOrderNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(d => d.status === statusFilter.value)
  }

  if (customerFilter.value) {
    filtered = filtered.filter(d => d.customerName === customerFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredDeliveries.value.length / itemsPerPage.value)
})

const paginatedDeliveries = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredDeliveries.value.slice(start, end)
})

const loadDeliveries = async () => {
  loading.value = true
  try {
    deliveries.value = await deliveriesApi.getDeliveries()
  } catch (error) {
    console.error('Error loading deliveries:', error)
  } finally {
    loading.value = false
  }
}

const resetFilters = () => {
  searchTerm.value = ''
  statusFilter.value = ''
  customerFilter.value = ''
  currentPage.value = 1
}

const viewDelivery = (delivery: Delivery) => {
  selectedDelivery.value = delivery
  showViewModal.value = true
}

const editDelivery = (delivery: Delivery) => {
  selectedDelivery.value = delivery
  showEditModal.value = true
}

const createInvoice = (delivery: Delivery) => {
  console.log('Creating invoice for delivery:', delivery.deliveryNumber)
  // TODO: Implement invoice creation logic
}

const printDelivery = (delivery: Delivery) => {
  console.log('Printing delivery:', delivery.deliveryNumber)
  // TODO: Implement print logic
}

const trackDelivery = (delivery: Delivery) => {
  console.log('Tracking delivery:', delivery.trackingNumber)
  // TODO: Implement tracking logic
}

const createReturn = (delivery: Delivery) => {
  console.log('Creating return for delivery:', delivery.deliveryNumber)
  // TODO: Implement return creation logic
}

const handleSave = (delivery: Delivery) => {
  if (showEditModal.value) {
    // Update existing delivery
    const index = deliveries.value.findIndex(d => d.id === delivery.id)
    if (index !== -1) {
      deliveries.value[index] = delivery
    }
  } else {
    // Add new delivery
    deliveries.value.unshift(delivery)
  }
  closeModals()
}

const closeModals = () => {
  showViewModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedDelivery.value = null
}

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'PROCESSING':
      return 'Processing'
    case 'IN_TRANSIT':
      return 'In Transit'
    case 'DELIVERED':
      return 'Delivered'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

onMounted(() => {
  loadDeliveries()
})
</script>