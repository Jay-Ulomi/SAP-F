<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Sales Quotations</h1>
          <p class="text-sm text-gray-600 mt-1">Manage and track your sales quotations</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Quotation
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
            <p class="text-sm text-gray-600">Total Quotations</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.open }}</p>
            <p class="text-sm text-gray-600">Open Quotations</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.accepted }}</p>
            <p class="text-sm text-gray-600">Accepted</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.totalValue) }}</p>
            <p class="text-sm text-gray-600">Total Value</p>
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
            placeholder="Search quotations..."
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
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
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

    <!-- Quotations Table -->
    <div class="bg-white rounded-lg shadow border overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Quotations ({{ filteredQuotations.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quotation #
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valid Until
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="quotation in paginatedQuotations" :key="quotation.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-blue-600 cursor-pointer" @click="viewQuotation(quotation)">
                  {{ quotation.quotationNumber }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ quotation.customerName }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(quotation.quotationDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(quotation.validUntil) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': quotation.status === 'APPROVED',
                    'bg-yellow-100 text-yellow-800': quotation.status === 'PENDING',
                    'bg-blue-100 text-blue-800': quotation.status === 'DRAFT',
                    'bg-red-100 text-red-800': quotation.status === 'REJECTED',
                    'bg-gray-100 text-gray-800': quotation.status === 'EXPIRED'
                  }"
                >
                  {{ formatStatus(quotation.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(quotation.total) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1">
                  <button @click="viewQuotation(quotation)" class="text-blue-600 hover:text-blue-900 text-xs">
                    View
                  </button>
                  <button @click="editQuotation(quotation)" class="text-green-600 hover:text-green-900 text-xs">
                    Edit
                  </button>
                  <button @click="convertToOrder(quotation)" class="text-purple-600 hover:text-purple-900 text-xs" v-if="quotation.status === 'APPROVED'">
                    Convert
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredQuotations.length) }} of {{ filteredQuotations.length }} results
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
    <ResponsiveModal
      :isOpen="showViewModal && !!selectedQuotation"
      title="Quotation Details"
      @close="showViewModal = false"
    >
      <QuotationView
        v-if="selectedQuotation"
        :quotation="selectedQuotation"
        @edit="editQuotation(selectedQuotation)"
        @convert="convertToOrder(selectedQuotation)"
        @print="printQuotation(selectedQuotation)"
        @email="emailQuotation(selectedQuotation)"
        @duplicate="duplicateQuotation(selectedQuotation)"
      />
    </ResponsiveModal>

    <!-- Create/Edit Modal -->
    <ResponsiveModal
      :isOpen="showCreateModal || showEditModal"
      :title="showEditModal ? 'Edit Quotation' : 'Create Quotation'"
      @close="closeModals"
    >
      <QuotationForm
        :quotation="selectedQuotation"
        @save="handleSave"
        @cancel="closeModals"
      />
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { quotationsApi } from './api/quotationsApi'
import ResponsiveModal from '@/components/ResponsiveModal.vue'
import QuotationView from './components/QuotationView.vue'
import QuotationForm from './components/QuotationForm.vue'

// Import types from API
import type { Quotation, LineItem, ServiceItem } from './api/quotationsApi'

const quotations = ref<Quotation[]>([])
const loading = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const customerFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showViewModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedQuotation = ref<Quotation | null>(null)

const stats = computed(() => {
  const total = quotations.value.length
  const open = quotations.value.filter(q => q.status === 'PENDING').length
  const accepted = quotations.value.filter(q => q.status === 'APPROVED').length
  const totalValue = quotations.value.reduce((sum, q) => {
    const amount = q.total || 0
    return sum + (typeof amount === 'number' ? amount : 0)
  }, 0)

  return { total, open, accepted, totalValue }
})

const uniqueCustomers = computed(() => {
  return [...new Set(quotations.value.map(q => q.customerName))]
})

const filteredQuotations = computed(() => {
  let filtered = quotations.value

  if (searchTerm.value) {
    filtered = filtered.filter(q =>
      q.quotationNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      q.customerName.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(q => q.status === statusFilter.value)
  }

  if (customerFilter.value) {
    filtered = filtered.filter(q => q.customerName === customerFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredQuotations.value.length / itemsPerPage.value)
})

const paginatedQuotations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredQuotations.value.slice(start, end)
})

const loadQuotations = async () => {
  loading.value = true
  try {
    const data = await quotationsApi.getQuotations()
    console.log('Loaded quotations data:', data)
    quotations.value = data
  } catch (error) {
    console.error('Error loading quotations:', error)
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

const viewQuotation = (quotation: Quotation) => {
  selectedQuotation.value = quotation
  showViewModal.value = true
}

const editQuotation = (quotation: Quotation) => {
  selectedQuotation.value = quotation
  showEditModal.value = true
}

const convertToOrder = (quotation: Quotation) => {
  console.log('Converting to order:', quotation.quotationNumber)
  // TODO: Implement conversion logic
}

const printQuotation = (quotation: Quotation) => {
  console.log('Printing quotation:', quotation.quotationNumber)
  // TODO: Implement print logic
}

const emailQuotation = (quotation: Quotation) => {
  console.log('Emailing quotation:', quotation.quotationNumber)
  // TODO: Implement email logic
}

const duplicateQuotation = (quotation: Quotation) => {
  console.log('Duplicating quotation:', quotation.quotationNumber)
  // TODO: Implement duplicate logic
}

const handleSave = (quotation: Quotation) => {
  if (showEditModal.value) {
    // Update existing quotation
    const index = quotations.value.findIndex(q => q.id === quotation.id)
    if (index !== -1) {
      quotations.value[index] = quotation
    }
  } else {
    // Add new quotation
    quotations.value.unshift(quotation)
  }
  closeModals()
}

const closeModals = () => {
  showViewModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedQuotation.value = null
}

const formatCurrency = (amount: number | string | null | undefined): string => {
  // Debug logging to see what we're getting
  console.log('formatCurrency called with:', amount, 'Type:', typeof amount)

  // Handle all possible edge cases
  if (amount === null || amount === undefined || amount === '' || amount === 0) {
    return '$0.00'
  }

  // Convert to number - handle string numbers too
  let numericAmount: number
  if (typeof amount === 'string') {
    numericAmount = parseFloat(amount)
  } else {
    numericAmount = Number(amount)
  }

  // Check if conversion was successful
  if (isNaN(numericAmount) || !isFinite(numericAmount)) {
    console.warn('Invalid amount for currency formatting:', amount)
    return '$0.00'
  }

  // Format the currency with extra safety
  try {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    })
    const result = formatter.format(numericAmount)
    console.log('Formatted:', numericAmount, '->', result)
    return result
  } catch (error) {
    console.error('Currency formatting failed:', error, 'Amount:', amount, 'Numeric:', numericAmount)
    return `$${numericAmount.toFixed(2)}`
  }
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'DRAFT':
      return 'Draft'
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'REJECTED':
      return 'Rejected'
    case 'EXPIRED':
      return 'Expired'
    default:
      return status
  }
}

onMounted(() => {
  loadQuotations()
})
</script>