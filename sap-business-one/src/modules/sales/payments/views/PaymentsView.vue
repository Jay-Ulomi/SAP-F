<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Customer Payments</h1>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Payment
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Payments</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalPayments || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Amount</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.totalAmount?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Pending</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.pendingPayments || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">This Month</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.thisMonth?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchParams.search"
            type="text"
            placeholder="Search payments..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="failed">Failed</option>
          </select>
          <select
            v-model="searchParams.paymentMethod"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Methods</option>
            <option value="cash">Cash</option>
            <option value="check">Check</option>
            <option value="credit_card">Credit Card</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="online">Online Payment</option>
          </select>
          <input
            v-model="searchParams.dateFrom"
            type="date"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <input
            v-model="searchParams.dateTo"
            type="date"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <button
            @click="handleSearch"
            class="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading payments...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button
          @click="loadPayments"
          class="mt-2 text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Payment
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Method
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
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
              <tr v-for="payment in paymentsList" :key="payment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ payment.paymentNumber }}</div>
                  <div class="text-sm text-gray-500">
                    Ref: {{ payment.reference || 'No reference' }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ payment.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ payment.customerCode }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ${{ payment.amount.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatPaymentMethod(payment.paymentMethod) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(payment.status)">
                    {{ formatStatus(payment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(payment.paymentDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewPayment(payment)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editPayment(payment)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="printPayment(payment)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (pagination.page - 1) * 10 + 1 }} to
                {{ Math.min(pagination.page * 10, pagination.total) }} of
                {{ pagination.total }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
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
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ editingPayment ? 'Edit' : 'Create' }} Payment</h2>
        <PaymentForm
          :payment="editingPayment"
          :loading="submitting"
          @submit="submitPayment"
          @cancel="closeModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal && selectedPayment"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto m-4">
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-xl font-bold">Payment Details</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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
        <PaymentView :payment="selectedPayment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import PaymentForm from '../components/PaymentForm.vue'
import PaymentView from '../components/PaymentView.vue'

// State
const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingPayment = ref(null)
const selectedPayment = ref(null)
const submitting = ref(false)
const loading = ref(false)
const error = ref(null)

// Mock data
const paymentsList = ref([])
const stats = ref({
  totalPayments: 156,
  totalAmount: 485000,
  pendingPayments: 12,
  thisMonth: 125000
})
const pagination = ref({
  page: 1,
  totalPages: 1,
  total: 0
})

// Search parameters
const searchParams = reactive({
  search: '',
  status: '',
  paymentMethod: '',
  dateFrom: '',
  dateTo: ''
})

// Methods
const handleSearch = () => {
  loadPayments()
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    status: '',
    paymentMethod: '',
    dateFrom: '',
    dateTo: ''
  })
  loadPayments()
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    loadPayments()
  }
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    loadPayments()
  }
}

const viewPayment = (payment) => {
  selectedPayment.value = payment
  showViewModal.value = true
}

const editPayment = (payment) => {
  editingPayment.value = payment
  showCreateModal.value = true
}

const printPayment = (payment) => {
  console.log('Printing payment:', payment)
}

const submitPayment = async (data) => {
  submitting.value = true
  try {
    console.log('Submitting payment:', data)
    closeModal()
    await loadPayments()
  } catch (err) {
    console.error('Error saving payment:', err)
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showViewModal.value = false
  editingPayment.value = null
  selectedPayment.value = null
}

const loadPayments = async () => {
  loading.value = true
  try {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000))
    paymentsList.value = [
      {
        id: '1',
        paymentNumber: 'PAY-001',
        customerName: 'ABC Corporation',
        customerCode: 'C001',
        amount: 15000,
        paymentMethod: 'bank_transfer',
        status: 'completed',
        paymentDate: '2024-12-01',
        reference: 'REF-001'
      }
    ]
    pagination.value.total = 1
    error.value = null
  } catch (err) {
    error.value = 'Failed to load payments'
  } finally {
    loading.value = false
  }
}

// Utility functions
const formatPaymentMethod = (method) => {
  const methods = {
    cash: 'Cash',
    check: 'Check',
    credit_card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    online: 'Online Payment'
  }
  return methods[method] || method
}

const formatStatus = (status) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'failed':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'cancelled':
      return `${baseClasses} bg-gray-100 text-gray-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  loadPayments()
})
</script>
