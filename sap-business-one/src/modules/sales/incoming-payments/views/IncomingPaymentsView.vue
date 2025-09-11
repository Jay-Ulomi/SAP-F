<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Incoming Payments Management</h1>
        <p class="text-gray-600">Manage customer payments, receipts, and cash collections</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="showCreateModal = true"
          class="px-4 py-2 bg-sap-blue text-white rounded-lg hover:bg-sap-blue-dark transition-colors duration-200"
        >
          Create Payment
        </button>
        <button
          @click="exportData"
          class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
        >
          Export
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Payments</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Posted</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.posted || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-2xl font-bold text-gray-900">{{ stats?.open || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Amount</p>
            <p class="text-2xl font-bold text-gray-900">{{ formatCurrency(stats?.totalAmount || 0) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="selectedStatuses"
            multiple
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          >
            <option v-for="status in paymentStatuses" :key="status" :value="status">
              {{ formatPaymentStatus(status) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Method</label>
          <select
            v-model="selectedMethods"
            multiple
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          >
            <option v-for="method in paymentMethods" :key="method" :value="method">
              {{ formatPaymentMethod(method) }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer</label>
          <input
            v-model="filters.customerCode"
            type="text"
            placeholder="Search customer..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search payments..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="px-4 py-2 bg-sap-blue text-white rounded-lg hover:bg-sap-blue-dark transition-colors duration-200"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Clear
          </button>
        </div>

        <div class="text-sm text-gray-600">
          Showing {{ pagination.page * pagination.limit - pagination.limit + 1 }} to
          {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
          {{ pagination.total }} results
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in incomingPayments" :key="payment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ payment.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ payment.docEntry }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ payment.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ payment.customerCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatPaymentMethod(payment.method) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(payment.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ formatPaymentStatus(payment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(payment.paymentDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(payment.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewPayment(payment)"
                    class="text-sap-blue hover:text-sap-blue-dark"
                  >
                    View
                  </button>
                  <button
                    v-if="payment.status === 'DRAFT'"
                    @click="editPayment(payment)"
                    class="text-green-600 hover:text-green-800"
                  >
                    Edit
                  </button>
                  <button
                    v-if="payment.status === 'OPEN'"
                    @click="postPayment(payment)"
                    class="text-green-600 hover:text-green-800"
                  >
                    Post
                  </button>
                  <button
                    v-if="['DRAFT', 'OPEN'].includes(payment.status)"
                    @click="cancelPayment(payment)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Cancel
                  </button>
                  <button
                    v-if="payment.status === 'POSTED'"
                    @click="closePayment(payment)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    Close
                  </button>
                  <button
                    v-if="['DRAFT', 'OPEN'].includes(payment.status)"
                    @click="deletePayment(payment)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page * pagination.limit >= pagination.total"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ pagination.page * pagination.limit - pagination.limit + 1 }}</span>
                to
                <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page * pagination.limit >= pagination.total"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeModals"
    >
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <IncomingPaymentForm
            :initial-data="editingPayment"
            :is-editing="showEditModal"
            @saved="handlePaymentSaved"
            @cancel="closeModals"
          />
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeModals"
    >
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Payment Details</h3>
            <button
              @click="closeModals"
              class="text-gray-400 hover:text-gray-600"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="viewingPayment" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Document Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ viewingPayment.docNum }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <p class="mt-1">
                  <span
                    :class="getStatusBadgeClass(viewingPayment.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ formatPaymentStatus(viewingPayment.status) }}
                  </span>
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Customer</label>
                <p class="mt-1 text-sm text-gray-900">{{ viewingPayment.customerName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Payment Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(viewingPayment.paymentDate) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Method</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatPaymentMethod(viewingPayment.method) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Total Amount</label>
                <p class="mt-1 text-sm font-medium text-gray-900">{{ formatCurrency(viewingPayment.totalAmount) }}</p>
              </div>
            </div>

            <!-- Line Items -->
            <div>
              <h4 class="text-md font-medium text-gray-900 mb-3">Payment Line Items</h4>
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Amount</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Amount</th>
                      <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in viewingPayment.lineItems" :key="item.id">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.invoiceNumber }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ formatDate(item.invoiceDate) }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ formatDate(item.dueDate) }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.originalAmount) }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.paymentAmount) }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.discountAmount) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useIncomingPaymentsStore } from '../stores/incomingPaymentsStore'
import IncomingPaymentForm from '../components/IncomingPaymentForm.vue'
import type { IncomingPayment } from '../types'
import { PaymentStatus, PaymentMethod, PaymentType } from '../types'

const store = useIncomingPaymentsStore()

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const editingPayment = ref<IncomingPayment | null>(null)
const viewingPayment = ref<IncomingPayment | null>(null)

// Filters
const selectedStatuses = ref<PaymentStatus[]>([])
const selectedMethods = ref<PaymentMethod[]>([])

// Computed
const incomingPayments = computed(() => store.incomingPayments)
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)
const filters = computed(() => store.filters)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const paymentStatuses = Object.values(PaymentStatus)
const paymentMethods = Object.values(PaymentMethod)

// Methods
const fetchData = async () => {
  await store.fetchIncomingPayments()
  await store.fetchStats()
}

const applyFilters = () => {
  store.updateFilters({
    status: selectedStatuses.value,
    method: selectedMethods.value,
    customerCode: filters.value.customerCode,
    search: filters.value.search,
  })
  fetchData()
}

const clearFilters = () => {
  selectedStatuses.value = []
  selectedMethods.value = []
  store.clearFilters()
  fetchData()
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    store.fetchIncomingPayments(pagination.value.page - 1, pagination.value.limit)
  }
}

const nextPage = () => {
  if (pagination.value.page * pagination.value.limit < pagination.value.total) {
    store.fetchIncomingPayments(pagination.value.page + 1, pagination.value.limit)
  }
}

const createPayment = () => {
  showCreateModal.value = true
}

const editPayment = (payment: IncomingPayment) => {
  editingPayment.value = payment
  showEditModal.value = true
}

const viewPayment = (payment: IncomingPayment) => {
  viewingPayment.value = payment
  showViewModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  editingPayment.value = null
  viewingPayment.value = null
}

const handlePaymentSaved = (payment: IncomingPayment) => {
  closeModals()
  fetchData()
}

const postPayment = async (payment: IncomingPayment) => {
  if (confirm('Are you sure you want to post this payment?')) {
    await store.postPayment(payment.id, { postedBy: 'current-user' })
    fetchData()
  }
}

const cancelPayment = async (payment: IncomingPayment) => {
  const reason = prompt('Please provide a reason for cancellation:')
  if (reason) {
    await store.cancelPayment(payment.id, { cancelledBy: 'current-user', reason })
    fetchData()
  }
}

const closePayment = async (payment: IncomingPayment) => {
  if (confirm('Are you sure you want to close this payment?')) {
    await store.closePayment(payment.id, { closedBy: 'current-user' })
    fetchData()
  }
}

const deletePayment = async (payment: IncomingPayment) => {
  if (confirm('Are you sure you want to delete this payment?')) {
    await store.deleteIncomingPayment(payment.id)
    fetchData()
  }
}

const exportData = () => {
  // TODO: Implement export functionality
  console.log('Export data:', filters.value)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatPaymentStatus = (status: PaymentStatus) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPaymentMethod = (method: PaymentMethod) => {
  return method.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case PaymentStatus.OPEN:
      return 'bg-blue-100 text-blue-800'
    case PaymentStatus.POSTED:
      return 'bg-green-100 text-green-800'
    case PaymentStatus.CANCELLED:
      return 'bg-red-100 text-red-800'
    case PaymentStatus.CLOSED:
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Watch for filter changes
watch(
  [selectedStatuses, selectedMethods],
  () => {
    if (selectedStatuses.value.length > 0 || selectedMethods.value.length > 0) {
      applyFilters()
    }
  },
)

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>
