<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">A/R Invoices</h1>
          <p class="text-sm text-gray-600 mt-1">Manage accounts receivable invoices</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Invoice
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
            <p class="text-sm text-gray-600">Total Invoices</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.unpaid }}</p>
            <p class="text-sm text-gray-600">Unpaid</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.overdue }}</p>
            <p class="text-sm text-gray-600">Overdue</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.totalAmount) }}</p>
            <p class="text-sm text-gray-600">Total Amount</p>
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
            placeholder="Search invoices..."
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
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
            <option value="PARTIAL">Partially Paid</option>
            <option value="OVERDUE">Overdue</option>
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

    <!-- Invoices Table -->
    <div class="bg-white rounded-lg shadow border overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Invoices ({{ filteredInvoices.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice #
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice Date
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="invoice in paginatedInvoices" :key="invoice.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-blue-600 cursor-pointer" @click="viewInvoice(invoice)">
                  {{ invoice.invoiceNumber }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ invoice.customerName }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(invoice.invoiceDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(invoice.dueDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': invoice.status === 'PAID',
                    'bg-blue-100 text-blue-800': invoice.status === 'SENT',
                    'bg-yellow-100 text-yellow-800': invoice.status === 'PARTIAL',
                    'bg-red-100 text-red-800': invoice.status === 'OVERDUE',
                    'bg-gray-100 text-gray-800': invoice.status === 'DRAFT' || invoice.status === 'CANCELLED'
                  }"
                >
                  {{ formatStatus(invoice.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(invoice.totalAmount) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span :class="invoice.balanceDue > 0 ? 'text-red-600' : 'text-green-600'">
                  {{ formatCurrency(invoice.balanceDue) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1">
                  <button @click="viewInvoice(invoice)" class="text-blue-600 hover:text-blue-900 text-xs">
                    View
                  </button>
                  <button @click="editInvoice(invoice)" class="text-green-600 hover:text-green-900 text-xs">
                    Edit
                  </button>
                  <button @click="recordPayment(invoice)" class="text-purple-600 hover:text-purple-900 text-xs" v-if="invoice.balanceDue > 0">
                    Payment
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredInvoices.length) }} of {{ filteredInvoices.length }} results
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
    <ResponsiveModal v-if="showViewModal && selectedInvoice" @close="showViewModal = false">
      <ArInvoiceView
        :invoice="selectedInvoice"
        @edit="editInvoice(selectedInvoice)"
        @payment="recordPayment(selectedInvoice)"
        @print="printInvoice(selectedInvoice)"
        @email="emailInvoice(selectedInvoice)"
        @creditMemo="createCreditMemo(selectedInvoice)"
      />
    </ResponsiveModal>

    <!-- Create/Edit Modal -->
    <ResponsiveModal v-if="showCreateModal || showEditModal" @close="closeModals">
      <ArInvoiceForm
        :invoice="selectedInvoice"
        @save="handleSave"
        @cancel="closeModals"
      />
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { invoicesApi } from './api/invoicesApi'
import ResponsiveModal from '@/components/ResponsiveModal.vue'
import ArInvoiceView from './components/ArInvoiceView.vue'
import ArInvoiceForm from './components/ArInvoiceForm.vue'

interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  invoiceDate: string
  dueDate: string
  status: 'DRAFT' | 'SENT' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED'
  totalAmount: number
  balanceDue: number
  items: any[]
}

const invoices = ref<Invoice[]>([])
const loading = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const customerFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showViewModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedInvoice = ref<Invoice | null>(null)

const stats = computed(() => {
  const total = invoices.value.length
  const unpaid = invoices.value.filter(i => i.status === 'SENT' || i.status === 'PARTIAL').length
  const overdue = invoices.value.filter(i => i.status === 'OVERDUE').length
  const totalAmount = invoices.value.reduce((sum, i) => sum + i.totalAmount, 0)

  return { total, unpaid, overdue, totalAmount }
})

const uniqueCustomers = computed(() => {
  return [...new Set(invoices.value.map(i => i.customerName))]
})

const filteredInvoices = computed(() => {
  let filtered = invoices.value

  if (searchTerm.value) {
    filtered = filtered.filter(i =>
      i.invoiceNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      i.customerName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(i => i.status === statusFilter.value)
  }

  if (customerFilter.value) {
    filtered = filtered.filter(i => i.customerName === customerFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredInvoices.value.length / itemsPerPage.value)
})

const paginatedInvoices = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredInvoices.value.slice(start, end)
})

const loadInvoices = async () => {
  loading.value = true
  try {
    invoices.value = await invoicesApi.getArInvoices()
  } catch (error) {
    console.error('Error loading invoices:', error)
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

const viewInvoice = (invoice: Invoice) => {
  selectedInvoice.value = invoice
  showViewModal.value = true
}

const editInvoice = (invoice: Invoice) => {
  selectedInvoice.value = invoice
  showEditModal.value = true
}

const recordPayment = (invoice: Invoice) => {
  console.log('Recording payment for invoice:', invoice.invoiceNumber)
  // TODO: Implement payment recording logic
}

const printInvoice = (invoice: Invoice) => {
  console.log('Printing invoice:', invoice.invoiceNumber)
  // TODO: Implement print logic
}

const emailInvoice = (invoice: Invoice) => {
  console.log('Emailing invoice:', invoice.invoiceNumber)
  // TODO: Implement email logic
}

const createCreditMemo = (invoice: Invoice) => {
  console.log('Creating credit memo for invoice:', invoice.invoiceNumber)
  // TODO: Implement credit memo creation logic
}

const handleSave = (invoice: Invoice) => {
  if (showEditModal.value) {
    // Update existing invoice
    const index = invoices.value.findIndex(i => i.id === invoice.id)
    if (index !== -1) {
      invoices.value[index] = invoice
    }
  } else {
    // Add new invoice
    invoices.value.unshift(invoice)
  }
  closeModals()
}

const closeModals = () => {
  showViewModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedInvoice.value = null
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
    case 'DRAFT':
      return 'Draft'
    case 'SENT':
      return 'Sent'
    case 'PAID':
      return 'Paid'
    case 'PARTIAL':
      return 'Partially Paid'
    case 'OVERDUE':
      return 'Overdue'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

onMounted(() => {
  loadInvoices()
})
</script>