<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Page Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-xl sm:text-2xl font-bold text-gray-900">Sales Returns</h1>
          <p class="text-sm text-gray-600 mt-1">Track and manage customer returns</p>
        </div>
        <button @click="showCreateModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Return
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-2xl font-semibold text-gray-900">{{ stats.total }}</p>
            <p class="text-sm text-gray-600">Total Returns</p>
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
            <p class="text-sm text-gray-600">Pending</p>
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
            placeholder="Search returns..."
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
            <option value="APPROVED">Approved</option>
            <option value="RECEIVED">Received</option>
            <option value="INSPECTING">Inspecting</option>
            <option value="REJECTED">Rejected</option>
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

    <!-- Returns Table -->
    <div class="bg-white rounded-lg shadow border overflow-hidden">
      <div class="px-4 sm:px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Returns ({{ filteredReturns.length }})</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return #
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Invoice
              </th>
              <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Return Date
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
            <tr v-for="return_ in paginatedReturns" :key="return_.id" class="hover:bg-gray-50">
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-blue-600 cursor-pointer" @click="viewReturn(return_)">
                  {{ return_.returnNumber }}
                </div>
              </td>
              <td class="px-3 sm:px-6 py-4">
                <div class="text-sm font-medium text-gray-900">{{ return_.customerName }}</div>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ return_.originalInvoiceNumber }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(return_.returnDate) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': return_.status === 'APPROVED',
                    'bg-blue-100 text-blue-800': return_.status === 'RECEIVED',
                    'bg-yellow-100 text-yellow-800': return_.status === 'PENDING',
                    'bg-purple-100 text-purple-800': return_.status === 'INSPECTING',
                    'bg-red-100 text-red-800': return_.status === 'REJECTED',
                    'bg-gray-100 text-gray-800': return_.status === 'CANCELLED'
                  }"
                >
                  {{ formatStatus(return_.status) }}
                </span>
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                {{ formatCurrency(return_.totalCreditAmount) }}
              </td>
              <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-col sm:flex-row gap-1">
                  <button @click="viewReturn(return_)" class="text-blue-600 hover:text-blue-900 text-xs">
                    View
                  </button>
                  <button @click="editReturn(return_)" class="text-green-600 hover:text-green-900 text-xs">
                    Edit
                  </button>
                  <button @click="createCreditMemo(return_)" class="text-purple-600 hover:text-purple-900 text-xs" v-if="return_.status === 'APPROVED'">
                    Credit Memo
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
            Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredReturns.length) }} of {{ filteredReturns.length }} results
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
    <ResponsiveModal v-if="showViewModal && selectedReturn" @close="showViewModal = false">
      <ReturnView
        :returnItem="selectedReturn"
        @edit="editReturn(selectedReturn)"
        @creditMemo="createCreditMemo(selectedReturn)"
        @print="printReturn(selectedReturn)"
        @approve="approveReturn(selectedReturn)"
        @restock="restockReturn(selectedReturn)"
      />
    </ResponsiveModal>

    <!-- Create/Edit Modal -->
    <ResponsiveModal v-if="showCreateModal || showEditModal" @close="closeModals">
      <ReturnForm
        :return="selectedReturn"
        @save="handleSave"
        @cancel="closeModals"
      />
    </ResponsiveModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { returnsApi } from './api/returnsApi'
import ResponsiveModal from '@/components/ResponsiveModal.vue'
import ReturnView from './components/ReturnView.vue'
import ReturnForm from './components/ReturnForm.vue'

interface Return {
  id: string
  returnNumber: string
  customerName: string
  originalInvoiceNumber: string
  returnDate: string
  status: 'PENDING' | 'APPROVED' | 'RECEIVED' | 'INSPECTING' | 'REJECTED' | 'CANCELLED'
  totalCreditAmount: number
  items: any[]
}

const returns = ref<Return[]>([])
const loading = ref(false)
const searchTerm = ref('')
const statusFilter = ref('')
const customerFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const showViewModal = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedReturn = ref<Return | null>(null)

const stats = computed(() => {
  const total = returns.value.length
  const pending = returns.value.filter(r => r.status === 'PENDING').length
  const approved = returns.value.filter(r => r.status === 'APPROVED').length
  const totalCredit = returns.value.reduce((sum, r) => sum + r.totalCreditAmount, 0)

  return { total, pending, approved, totalCredit }
})

const uniqueCustomers = computed(() => {
  return [...new Set(returns.value.map(r => r.customerName))]
})

const filteredReturns = computed(() => {
  let filtered = returns.value

  if (searchTerm.value) {
    filtered = filtered.filter(r =>
      r.returnNumber.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      r.originalInvoiceNumber.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }

  if (statusFilter.value) {
    filtered = filtered.filter(r => r.status === statusFilter.value)
  }

  if (customerFilter.value) {
    filtered = filtered.filter(r => r.customerName === customerFilter.value)
  }

  return filtered
})

const totalPages = computed(() => {
  return Math.ceil(filteredReturns.value.length / itemsPerPage.value)
})

const paginatedReturns = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredReturns.value.slice(start, end)
})

const loadReturns = async () => {
  loading.value = true
  try {
    returns.value = await returnsApi.getReturns()
  } catch (error) {
    console.error('Error loading returns:', error)
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

const viewReturn = (return_: Return) => {
  selectedReturn.value = return_
  showViewModal.value = true
}

const editReturn = (return_: Return) => {
  selectedReturn.value = return_
  showEditModal.value = true
}

const createCreditMemo = (return_: Return) => {
  console.log('Creating credit memo for return:', return_.returnNumber)
  // TODO: Implement credit memo creation logic
}

const printReturn = (return_: Return) => {
  console.log('Printing return:', return_.returnNumber)
  // TODO: Implement print logic
}

const approveReturn = (return_: Return) => {
  console.log('Approving return:', return_.returnNumber)
  // TODO: Implement approval logic
}

const restockReturn = (return_: Return) => {
  console.log('Restocking return:', return_.returnNumber)
  // TODO: Implement restock logic
}

const handleSave = (return_: Return) => {
  if (showEditModal.value) {
    // Update existing return
    const index = returns.value.findIndex(r => r.id === return_.id)
    if (index !== -1) {
      returns.value[index] = return_
    }
  } else {
    // Add new return
    returns.value.unshift(return_)
  }
  closeModals()
}

const closeModals = () => {
  showViewModal.value = false
  showCreateModal.value = false
  showEditModal.value = false
  selectedReturn.value = null
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
    case 'APPROVED':
      return 'Approved'
    case 'RECEIVED':
      return 'Received'
    case 'INSPECTING':
      return 'Inspecting'
    case 'REJECTED':
      return 'Rejected'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

onMounted(() => {
  loadReturns()
})
</script>