<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Customer Management</h1>
          <p class="text-gray-600">
            Manage customer relationships, contacts, and financial information
          </p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Customer
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-sap-blue bg-opacity-20 rounded-md flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-sap-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalCustomers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-emerald-600"
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
            <p class="text-sm font-medium text-gray-500">Active Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeCustomers || 0 }}</p>
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
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats?.pendingApprovalCustomers || 0 }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Outstanding Balance</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats?.customersWithOutstandingBalance || 0 }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Customers Table -->
    <div class="bg-white border border-gray-200 rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Customers</h3>
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
          Loading customers...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600">{{ error }}</div>
        <button
          @click="loadCustomers"
          class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="customers.length === 0" class="p-6 text-center text-gray-500">
        No customers found.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
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
                Credit Limit
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Balance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Activity
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="customer in customers" :key="customer.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-blue-600">{{
                        customer.customerName.charAt(0)
                      }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.customerName }}</div>
                    <div class="text-sm text-gray-500">{{ customer.customerCode }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': customer.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': customer.status === 'INACTIVE',
                    'bg-yellow-100 text-yellow-800': customer.status === 'SUSPENDED',
                    'bg-blue-100 text-blue-800': customer.status === 'PENDING_APPROVAL',
                    'bg-red-100 text-red-800': customer.status === 'BLOCKED',
                  }"
                >
                  {{ formatStatus(customer.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCustomerType(customer.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(customer.financial.creditLimit) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatCurrency(customer.financial.currentBalance) }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ formatCurrency(customer.financial.availableCredit) }} available
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ customer.lastActivityDate ? formatDate(customer.lastActivityDate) : 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button @click="viewCustomer(customer)" class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button
                    @click="editCustomer(customer)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCustomer(customer.id)"
                    class="text-red-600 hover:text-red-900"
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

    <!-- Customer View Modal -->
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
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Customer Details</h3>
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
                <CustomerView v-if="selectedCustomer" :customer="selectedCustomer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Form Modal -->
    <div v-if="showFormModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ customerToEdit ? 'Edit Customer' : 'Create New Customer' }}
                  </h3>
                  <button @click="closeFormModal" class="text-gray-400 hover:text-gray-600">
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
                <CustomerForm
                  :customer="customerToEdit"
                  :loading="isFormLoading"
                  @submit="handleSubmitCustomer"
                  @cancel="closeFormModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCustomerStore } from '../stores'
import CustomerView from '../components/CustomerView.vue'
import CustomerForm from '../components/CustomerForm.vue'
import type { Customer, CustomerFormData } from '../types'

// Store
const customerStore = useCustomerStore()

// Computed properties from store
const customers = computed(() => customerStore.customers)
const loading = computed(() => customerStore.loading)
const error = computed(() => customerStore.error)
const stats = computed(() => customerStore.stats)
const pagination = computed(() => customerStore.pagination)

// Local state
const showViewModal = ref(false)
const selectedCustomer = ref<Customer | null>(null)
const showFormModal = ref(false)
const customerToEdit = ref<Customer | null>(null)
const isFormLoading = ref(false)

// Methods
const loadCustomers = () => {
  customerStore.loadCustomers()
}

const loadCustomerStats = () => {
  customerStore.loadCustomerStats()
}

const handlePageSizeChange = () => {
  customerStore.setPageSize(pagination.value.limit)
}

const nextPage = () => {
  customerStore.nextPage()
}

const previousPage = () => {
  customerStore.previousPage()
}

const openCreateForm = () => {
  customerToEdit.value = null
  showFormModal.value = true
}

const editCustomer = (customer: Customer) => {
  customerToEdit.value = customer
  showFormModal.value = true
}

const viewCustomer = (customer: Customer) => {
  selectedCustomer.value = customer
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedCustomer.value = null
}

const closeFormModal = () => {
  showFormModal.value = false
  customerToEdit.value = null
}

const handleSubmitCustomer = async (data: CustomerFormData) => {
  try {
    isFormLoading.value = true
    if (customerToEdit.value) {
      await customerStore.updateCustomer(customerToEdit.value.id, data)
    } else {
      await customerStore.createCustomer(data)
    }
    closeFormModal()
    loadCustomers()
  } catch (error) {
    console.error('Failed to save customer:', error)
  } finally {
    isFormLoading.value = false
  }
}

const deleteCustomer = async (id: string) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    try {
      await customerStore.deleteCustomer(id)
    } catch (err) {
      console.error('Failed to delete customer:', err)
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
    case 'ACTIVE':
      return 'Active'
    case 'INACTIVE':
      return 'Inactive'
    case 'SUSPENDED':
      return 'Suspended'
    case 'PENDING_APPROVAL':
      return 'Pending Approval'
    case 'BLOCKED':
      return 'Blocked'
    default:
      return status
  }
}

const formatCustomerType = (type: string): string => {
  switch (type) {
    case 'REGULAR':
      return 'Regular'
    case 'PREMIUM':
      return 'Premium'
    case 'WHOLESALE':
      return 'Wholesale'
    case 'RETAIL':
      return 'Retail'
    case 'DISTRIBUTOR':
      return 'Distributor'
    case 'RESELLER':
      return 'Reseller'
    default:
      return type
  }
}

// Lifecycle
onMounted(() => {
  loadCustomers()
  loadCustomerStats()
})
</script>
