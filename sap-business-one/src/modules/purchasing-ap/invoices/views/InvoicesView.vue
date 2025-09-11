<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Purchase Invoices</h1>
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
        New Invoice
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Invoices</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalInvoices || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Amount</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.totalAmount?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Pending Approval</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.pendingApproval || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">This Month</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.thisMonth?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
            placeholder="Search invoices..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="paid">Paid</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            v-model="searchParams.vendor"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Vendors</option>
            <option value="vendor1">Vendor 1</option>
            <option value="vendor2">Vendor 2</option>
          </select>
          <button
            @click="handleSearch"
            class="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue"
          >
            Apply
          </button>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p class="mt-2 text-gray-600">Loading invoices...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadInvoices" class="mt-2 text-blue-600 hover:text-blue-800">Try Again</button>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="invoice in invoicesList" :key="invoice.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ invoice.invoiceNumber }}</div>
                  <div class="text-sm text-gray-500">{{ formatDate(invoice.invoiceDate) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ invoice.vendorName }}</div>
                  <div class="text-sm text-gray-500">{{ invoice.vendorCode }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                  ${{ invoice.totalAmount.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(invoice.status)">
                    {{ formatStatus(invoice.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(invoice.dueDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button @click="viewInvoice(invoice)" class="text-blue-600 hover:text-blue-900">View</button>
                    <button @click="editInvoice(invoice)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                    <button @click="approveInvoice(invoice)" class="text-green-600 hover:text-green-900">Approve</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-6xl max-h-screen overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ editingInvoice ? 'Edit' : 'Create' }} Purchase Invoice</h2>
        <InvoiceForm
          :invoice="editingInvoice"
          :loading="submitting"
          @submit="submitInvoice"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import InvoiceForm from '../components/InvoiceForm.vue'

// State
const showCreateModal = ref(false)
const editingInvoice = ref(null)
const submitting = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

// Mock data
const invoicesList = ref([])
const stats = ref({
  totalInvoices: 245,
  totalAmount: 1850000,
  pendingApproval: 18,
  thisMonth: 285000
})

// Search parameters
const searchParams = reactive({
  search: '',
  status: '',
  vendor: ''
})

// Methods
const handleSearch = () => {
  loadInvoices()
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    status: '',
    vendor: ''
  })
  loadInvoices()
}

const viewInvoice = (invoice: any) => {
  console.log('Viewing invoice:', invoice)
}

const editInvoice = (invoice: any) => {
  editingInvoice.value = invoice
  showCreateModal.value = true
}

const approveInvoice = async (invoice: any) => {
  console.log('Approving invoice:', invoice)
}

const submitInvoice = async (data: any) => {
  submitting.value = true
  try {
    console.log('Submitting invoice:', data)
    closeModal()
    await loadInvoices()
  } catch (err) {
    console.error('Error saving invoice:', err)
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  editingInvoice.value = null
}

const loadInvoices = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    invoicesList.value = [
      {
        id: '1',
        invoiceNumber: 'INV-2024-001',
        vendorName: 'ABC Suppliers',
        vendorCode: 'V001',
        totalAmount: 15000,
        status: 'pending',
        invoiceDate: '2024-12-01',
        dueDate: '2024-12-31'
      }
    ]
    error.value = null
  } catch (err) {
    error.value = 'Failed to load invoices'
  } finally {
    loading.value = false
  }
}

// Utility functions
const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'approved': return `${baseClasses} bg-green-100 text-green-800`
    case 'pending': return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'paid': return `${baseClasses} bg-blue-100 text-blue-800`
    case 'cancelled': return `${baseClasses} bg-red-100 text-red-800`
    default: return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  loadInvoices()
})
</script>
