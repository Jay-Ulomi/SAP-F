<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Purchase Payments</h1>
          <p class="text-gray-600">Manage vendor payments, approvals, and payment processing</p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Payments</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalPayments || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Amount</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats?.totalAmount || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Approval</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingPayments || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Processed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.processedPayments || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white border border-gray-200 rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Payments</h3>
          <div class="flex items-center space-x-3">
            <select
              v-model="pagination.limit"
              @change="handlePageSizeChange"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option :value="10">10 per page</option>
              <option :value="25">25 per page</option>
              <option :value="50">50 per page</option>
            </select>
          </div>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search by document, vendor, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="filters.status"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option v-for="status in paymentStatuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              v-model="filters.paymentMethod"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Methods</option>
              <option v-for="method in paymentMethods" :key="method" :value="method">
                {{ formatPaymentMethod(method) }}
              </option>
            </select>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="hasActiveFilters"
              @click="clearAllFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue h-[38px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
          Loading payments...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600">{{ error }}</div>
        <button
          @click="loadPayments"
          class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="payments.length === 0" class="p-6 text-center text-gray-500">
        No payments found.
      </div>

      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Method
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
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
              v-for="payment in payments"
              :key="payment.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewPayment(payment)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ payment.paymentNumber }}</div>
                    <div class="text-sm text-gray-500">{{ payment.docNum }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                    'bg-blue-100 text-blue-800': payment.status === 'APPROVED',
                    'bg-purple-100 text-purple-800': payment.status === 'PROCESSED',
                    'bg-green-100 text-green-800': payment.status === 'COMPLETED',
                    'bg-red-100 text-red-800': payment.status === 'FAILED',
                    'bg-gray-100 text-gray-800': payment.status === 'CANCELLED',
                    'bg-orange-100 text-orange-800': payment.status === 'ON_HOLD',
                  }"
                >
                  {{ formatStatus(payment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ payment.vendorName }}</div>
                <div class="text-sm text-gray-500">{{ payment.vendorCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPaymentMethod(payment.paymentMethod) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(payment.amount) }}
                </div>
                <div class="text-sm text-gray-500">{{ payment.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.paymentDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewPayment(payment)"
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
                    @click.stop="editPayment(payment)"
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
                    @click.stop="deletePayment(payment.id)"
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
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="pagination.page === pagination.totalPages"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Payment Details</h3>
                  <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
                <PaymentView v-if="selectedPayment" :payment="selectedPayment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePaymentStore } from '../stores'
import PaymentView from '../components/PaymentView.vue'
import type { Payment, PaymentFilters } from '../types'
import { PaymentStatus, PaymentMethod, PaymentType, Currency } from '../types'

// Store
const paymentStore = usePaymentStore()

// Computed properties from store
const payments = computed(() => paymentStore.payments)
const loading = computed(() => paymentStore.loading)
const error = computed(() => paymentStore.error)
const stats = computed(() => paymentStore.stats)
const pagination = computed(() => paymentStore.pagination)

// Local state
const showAdvancedFilters = ref(false)
const showViewModal = ref(false)
const selectedPayment = ref<Payment | null>(null)
const searchQuery = ref('')

// Filters
const filters = ref<PaymentFilters>({
  dateRange: { start: '', end: '' },
  amountRange: { min: 0, max: 0 },
})

// Computed properties
const hasActiveFilters = computed(() => {
  return Object.keys(filters.value).some((key) => {
    const value = filters.value[key as keyof PaymentFilters]
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some((v) => v !== 0 && v !== '')
    }
    return value !== undefined && value !== '' && value !== false
  })
})

const activeFilters = computed(() => {
  const active: Record<string, any> = {}
  Object.entries(filters.value).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      active[key] = value
    } else if (typeof value === 'object' && value !== null) {
      if (Object.values(value).some((v) => v !== 0 && v !== '')) {
        active[key] = value
      }
    } else if (value !== undefined && value !== '' && value !== false) {
      active[key] = value
    }
  })
  return active
})

// Filter options
const paymentStatuses = computed(() => paymentStore.getPaymentStatuses?.() || [])
const paymentMethods = computed(() => paymentStore.getPaymentMethods?.() || [])
const paymentTypes = computed(() => paymentStore.getPaymentTypes?.() || [])
const currencies = computed(() => paymentStore.getCurrencies?.() || [])

// Methods
const loadPayments = () => {
  paymentStore.loadPayments(filters.value)
}

const loadPaymentStats = () => {
  paymentStore.loadPaymentStats()
}

const handleSearch = () => {
  filters.value.search = searchQuery.value
  loadPayments()
}

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
}

const clearAllFilters = () => {
  filters.value = { dateRange: { start: '', end: '' }, amountRange: { min: 0, max: 0 } }
  searchQuery.value = ''
  loadPayments()
}

const removeFilter = (key: string) => {
  if (key === 'search') {
    searchQuery.value = ''
  }
  if (key === 'dateRange') {
    filters.value.dateRange = { start: '', end: '' }
  } else if (key === 'amountRange') {
    filters.value.amountRange = { min: 0, max: 0 }
  } else {
    delete filters.value[key as keyof PaymentFilters]
  }
  loadPayments()
}

const formatFilterLabel = (key: string, value: any): string => {
  switch (key) {
    case 'search':
      return `Search: "${value}"`
    case 'status':
      return `Status: ${value.map((v: string) => formatStatus(v)).join(', ')}`
    case 'paymentMethod':
      return `Method: ${value.map((v: string) => formatPaymentMethod(v)).join(', ')}`
    case 'paymentType':
      return `Type: ${value.map((v: string) => formatPaymentType(v)).join(', ')}`
    case 'currency':
      return `Currency: ${value.join(', ')}`
    case 'vendorCode':
      return `Vendor Code: ${value}`
    case 'vendorName':
      return `Vendor Name: ${value}`
    case 'dateRange':
      return `Date Range: ${value.start} - ${value.end}`
    case 'amountRange':
      return `Amount Range: $${value.min} - $${value.max}`
    default:
      return `${key}: ${value}`
  }
}

const handlePageSizeChange = () => {
  paymentStore.setPageSize(pagination.value.limit)
}

const nextPage = () => {
  paymentStore.nextPage()
}

const previousPage = () => {
  paymentStore.previousPage()
}

const openCreateForm = () => {
  // TODO: Implement payment form
  console.log('Open create form')
}

const editPayment = (payment: Payment) => {
  // TODO: Implement payment form
  console.log('Edit payment:', payment)
}

const viewPayment = (payment: Payment) => {
  selectedPayment.value = payment
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedPayment.value = null
}

const deletePayment = async (id: string) => {
  if (confirm('Are you sure you want to delete this payment?')) {
    try {
      await paymentStore.deletePayment(id)
    } catch (err) {
      console.error('Failed to delete payment:', err)
    }
  }
}

// Utility functions
const formatCurrency = (amount: number): string => {
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
    case 'APPROVED':
      return 'Approved'
    case 'PROCESSED':
      return 'Processed'
    case 'COMPLETED':
      return 'Completed'
    case 'FAILED':
      return 'Failed'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'CHECK':
      return 'Check'
    case 'CASH':
      return 'Cash'
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'WIRE_TRANSFER':
      return 'Wire Transfer'
    case 'ACH':
      return 'ACH'
    case 'OTHER':
      return 'Other'
    default:
      return method
  }
}

const formatPaymentType = (type: string): string => {
  switch (type) {
    case 'INVOICE_PAYMENT':
      return 'Invoice Payment'
    case 'CREDIT_MEMO_APPLICATION':
      return 'Credit Memo Application'
    case 'ADVANCE_PAYMENT':
      return 'Advance Payment'
    case 'REFUND':
      return 'Refund'
    case 'ADJUSTMENT':
      return 'Adjustment'
    default:
      return type
  }
}

// Watchers
watch(
  filters,
  () => {
    loadPayments()
  },
  { deep: true },
)

// Lifecycle
onMounted(() => {
  loadPayments()
  loadPaymentStats()
})
</script>
