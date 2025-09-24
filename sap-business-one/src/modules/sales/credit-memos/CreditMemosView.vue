<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Credit Memos</h1>
          <p class="text-sm text-gray-600 mt-1">Manage customer credit memos</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Credit Memo
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
            <p class="text-sm text-gray-600">Total Credit Memos</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.pending }}</p>
            <p class="text-sm text-gray-600">Pending Approval</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ stats.approved }}</p>
            <p class="text-sm text-gray-600">Approved</p>
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
            <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats.totalCredit) }}</p>
            <p class="text-sm text-gray-600">Total Credit</p>
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
            placeholder="Search credit memos..."
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
            <option value="PROCESSED">Processed</option>
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

    <!-- Credit Memos Table -->
    <div class="bg-white rounded-lg shadow border overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Credit Memos ({{ filteredCreditMemos.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Memo #
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Invoice
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Date
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Amount
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="creditMemo in paginatedCreditMemos" :key="creditMemo.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-blue-600 cursor-pointer" @click="viewCreditMemo(creditMemo)">
                  {{ creditMemo.creditMemoNumber }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ creditMemo.customerName }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ creditMemo.originalInvoiceNumber }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(creditMemo.creditDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': creditMemo.status === 'APPROVED',
                    'bg-yellow-100 text-yellow-800': creditMemo.status === 'PENDING',
                    'bg-blue-100 text-blue-800': creditMemo.status === 'PROCESSED',
                    'bg-red-100 text-red-800': creditMemo.status === 'REJECTED',
                    'bg-gray-100 text-gray-800': creditMemo.status === 'DRAFT'
                  }"
                >
                  {{ formatStatus(creditMemo.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                {{ formatCurrency(creditMemo.totalCredit) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1">
                  <button @click="viewCreditMemo(creditMemo)" class="text-blue-600 hover:text-blue-900 text-xs">
                    View
                  </button>
                  <button @click="editCreditMemo(creditMemo)" class="text-green-600 hover:text-green-900 text-xs">
                    Edit
                  </button>
                  <button @click="processRefund(creditMemo)" class="text-purple-600 hover:text-purple-900 text-xs" v-if="creditMemo.status === 'APPROVED'">
                    Refund
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredCreditMemos.length) }} of {{ filteredCreditMemos.length }} results
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
    <ResponsiveModal v-if="showViewModal && selectedCreditMemo" @close="showViewModal = false">
      <CreditMemoView
        :creditMemo="selectedCreditMemo"
        @edit="editCreditMemo(selectedCreditMemo)"
        @refund="processRefund(selectedCreditMemo)"
        @print="printCreditMemo(selectedCreditMemo)"
        @email="emailCreditMemo(selectedCreditMemo)"
        @apply="applyCreditMemo(selectedCreditMemo)"
      />
    </ResponsiveModal>

    <!-- Create/Edit Modal -->
    <ResponsiveModal v-if="showCreateModal || showEditModal" @close="closeModals">
      <CreditMemoForm
        :creditMemo="selectedCreditMemo"
        @save="handleSave"
        @cancel="closeModals"
      />
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { creditMemosApi } from './api/creditMemosApi'
import ResponsiveModal from '@/components/ResponsiveModal.vue'
import CreditMemoView from './components/CreditMemoView.vue'
import CreditMemoForm from './components/CreditMemoForm.vue'

interface CreditMemo {
  id: string
  creditMemoNumber: string
  customerName: string
  originalInvoiceNumber: string
  creditDate: string
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSED'
  totalCredit: number
  items: any[]
}

const creditMemos = ref<CreditMemo[]>([])
const loading = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const customerFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showViewModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedCreditMemo = ref<CreditMemo | null>(null)

const stats = computed(() => {
  const total = creditMemos.value.length
  const pending = creditMemos.value.filter(c => c.status === 'PENDING').length
  const approved = creditMemos.value.filter(c => c.status === 'APPROVED').length
  const totalCredit = creditMemos.value.reduce((sum, c) => sum + c.totalCredit, 0)

  return { total, pending, approved, totalCredit }
})

const uniqueCustomers = computed(() => {
  return [...new Set(creditMemos.value.map(c => c.customerName))]
})

const filteredCreditMemos = computed(() => {
  let filtered = creditMemos.value

  if (searchTerm.value) {
    filtered = filtered.filter(c =>
      c.creditMemoNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      c.originalInvoiceNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(c => c.status === statusFilter.value)
  }

  if (customerFilter.value) {
    filtered = filtered.filter(c => c.customerName === customerFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredCreditMemos.value.length / itemsPerPage.value)
})

const paginatedCreditMemos = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredCreditMemos.value.slice(start, end)
})

const loadCreditMemos = async () => {
  loading.value = true
  try {
    creditMemos.value = await creditMemosApi.getCreditMemos()
  } catch (error) {
    console.error('Error loading credit memos:', error)
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

const viewCreditMemo = (creditMemo: CreditMemo) => {
  selectedCreditMemo.value = creditMemo
  showViewModal.value = true
}

const editCreditMemo = (creditMemo: CreditMemo) => {
  selectedCreditMemo.value = creditMemo
  showEditModal.value = true
}

const processRefund = (creditMemo: CreditMemo) => {
  console.log('Processing refund for credit memo:', creditMemo.creditMemoNumber)
  // TODO: Implement refund processing logic
}

const printCreditMemo = (creditMemo: CreditMemo) => {
  console.log('Printing credit memo:', creditMemo.creditMemoNumber)
  // TODO: Implement print logic
}

const emailCreditMemo = (creditMemo: CreditMemo) => {
  console.log('Emailing credit memo:', creditMemo.creditMemoNumber)
  // TODO: Implement email logic
}

const applyCreditMemo = (creditMemo: CreditMemo) => {
  console.log('Applying credit memo to invoice:', creditMemo.creditMemoNumber)
  // TODO: Implement apply logic
}

const handleSave = (creditMemo: CreditMemo) => {
  if (showEditModal.value) {
    // Update existing credit memo
    const index = creditMemos.value.findIndex(c => c.id === creditMemo.id)
    if (index !== -1) {
      creditMemos.value[index] = creditMemo
    }
  } else {
    // Add new credit memo
    creditMemos.value.unshift(creditMemo)
  }
  closeModals()
}

const closeModals = () => {
  showViewModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedCreditMemo.value = null
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
    case 'PENDING':
      return 'Pending Approval'
    case 'APPROVED':
      return 'Approved'
    case 'REJECTED':
      return 'Rejected'
    case 'PROCESSED':
      return 'Processed'
    default:
      return status
  }
}

onMounted(() => {
  loadCreditMemos()
})
</script>