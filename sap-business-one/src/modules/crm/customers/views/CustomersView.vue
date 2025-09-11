<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Customer Management</h1>
        <p class="text-gray-600 mt-1">Manage your CRM customers, prospects, and leads</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Customer
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-sm font-medium text-gray-600">Total Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalCustomers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-sm font-medium text-gray-600">Active Customers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeCustomers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Prospects</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.prospectCustomers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-sm font-medium text-gray-600">Leads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.leadCustomers || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search customers..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filters.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PROSPECT">Prospect</option>
            <option value="LEAD">Lead</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select
            v-model="filters.type"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
            <option value="SME">SME</option>
            <option value="ENTERPRISE">Enterprise</option>
            <option value="PARTNER">Partner</option>
            <option value="DISTRIBUTOR">Distributor</option>
          </select>
          <select
            v-model="filters.industry"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Industries</option>
            <option value="TECHNOLOGY">Technology</option>
            <option value="HEALTHCARE">Healthcare</option>
            <option value="FINANCE">Finance</option>
            <option value="MANUFACTURING">Manufacturing</option>
            <option value="RETAIL">Retail</option>
            <option value="EDUCATION">Education</option>
            <option value="CONSTRUCTION">Construction</option>
            <option value="TRANSPORTATION">Transportation</option>
            <option value="ENERGY">Energy</option>
            <option value="TELECOMMUNICATIONS">Telecommunications</option>
            <option value="OTHER">Other</option>
          </select>
          <button
            @click="applyFilters"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="clearFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Customers</h3>
      </div>

      <div class="overflow-x-auto">
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
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Industry
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead Score
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
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">
                        {{ customer.name.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ customer.name }}</div>
                    <div class="text-sm text-gray-500">{{ customer.customerCode }}</div>
                    <div v-if="customer.companyName" class="text-sm text-gray-500">
                      {{ customer.companyName }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ formatCustomerType(customer.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': customer.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': customer.status === 'INACTIVE',
                    'bg-yellow-100 text-yellow-800': customer.status === 'SUSPENDED',
                    'bg-blue-100 text-blue-800': customer.status === 'PROSPECT',
                    'bg-purple-100 text-purple-800': customer.status === 'LEAD',
                    'bg-red-100 text-red-800': customer.status === 'CANCELLED',
                  }"
                >
                  {{ formatCustomerStatus(customer.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCustomerIndustry(customer.industry) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': customer.priority === 'LOW',
                    'bg-blue-100 text-blue-800': customer.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': customer.priority === 'HIGH',
                    'bg-red-100 text-red-800': customer.priority === 'CRITICAL',
                  }"
                >
                  {{ formatCustomerPriority(customer.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ customer.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      class="bg-sap-blue h-2 rounded-full"
                      :style="{ width: customer.leadScore + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-900">{{ customer.leadScore }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewCustomer(customer)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editCustomer(customer)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="duplicateCustomer(customer)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
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
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="!pagination.hasPrev"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNext"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeCreateModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingCustomer ? 'Edit Customer' : 'Create New Customer' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
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
          :customer="editingCustomer"
          :loading="loading"
          @submit="handleSubmitCustomer"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Customer Details</h3>
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

        <CustomerView v-if="viewingCustomer" :customer="viewingCustomer" />
      </div>
    </div>

    <!-- Duplicate Modal -->
    <div
      v-if="showDuplicateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeDuplicateModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Duplicate Customer</h3>
          <button @click="closeDuplicateModal" class="text-gray-400 hover:text-gray-600">
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

        <form @submit.prevent="handleDuplicateCustomer" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Customer Code *</label>
            <input
              v-model="duplicateForm.customerCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter new customer code"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Customer Name *</label>
            <input
              v-model="duplicateForm.name"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter new customer name"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeDuplicateModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Duplicating...</span>
              <span v-else>Duplicate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCustomerStore } from '../stores'
import CustomerForm from '../components/CustomerForm.vue'
import CustomerView from '../components/CustomerView.vue'
import type { Customer, CustomerFormData, CustomerFilters } from '../types'

// Store
const customerStore = useCustomerStore()

// Reactive data
const searchQuery = ref('')
const filters = ref<CustomerFilters>({})
const showCreateModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const editingCustomer = ref<Customer | null>(null)
const viewingCustomer = ref<Customer | null>(null)
const duplicateForm = ref({
  customerCode: '',
  name: '',
})

// Computed properties
const customers = computed(() => customerStore.customers)
const loading = computed(() => customerStore.loading)
const error = computed(() => customerStore.error)
const stats = computed(() => customerStore.stats)
const pagination = computed(() => customerStore.pagination)

// Methods
const openCreateModal = () => {
  editingCustomer.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingCustomer.value = null
}

const editCustomer = (customer: Customer) => {
  editingCustomer.value = customer
  showCreateModal.value = true
}

const viewCustomer = (customer: Customer) => {
  viewingCustomer.value = customer
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingCustomer.value = null
}

const openDuplicateModal = (customer: Customer) => {
  duplicateForm.value.customerCode = `${customer.customerCode}_COPY`
  duplicateForm.value.name = `${customer.name} (Copy)`
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  duplicateForm.value = { customerCode: '', name: '' }
}

const duplicateCustomer = (customer: Customer) => {
  openDuplicateModal(customer)
}

const handleSubmitCustomer = async (data: CustomerFormData) => {
  try {
    if (editingCustomer.value) {
      await customerStore.updateCustomer(editingCustomer.value.id, data)
    } else {
      await customerStore.createCustomer(data)
    }
    closeCreateModal()
  } catch (err) {
    console.error('Error saving customer:', err)
  }
}

const handleDuplicateCustomer = async () => {
  if (!editingCustomer.value) return

  try {
    await customerStore.duplicateCustomer(
      editingCustomer.value.id,
      duplicateForm.value.customerCode,
      duplicateForm.value.name,
    )
    closeDuplicateModal()
  } catch (err) {
    console.error('Error duplicating customer:', err)
  }
}

const deleteCustomer = async (id: string) => {
  if (confirm('Are you sure you want to delete this customer?')) {
    try {
      await customerStore.deleteCustomer(id)
    } catch (err) {
      console.error('Error deleting customer:', err)
    }
  }
}

const applyFilters = () => {
  const newFilters: CustomerFilters = {}

  if (searchQuery.value.trim()) {
    newFilters.search = searchQuery.value.trim()
  }

  if (filters.value.status) {
    newFilters.status = filters.value.status
  }

  if (filters.value.type) {
    newFilters.type = filters.value.type
  }

  if (filters.value.industry) {
    newFilters.industry = filters.value.industry
  }

  customerStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {}
  customerStore.clearFilters()
}

const nextPage = () => {
  customerStore.nextPage()
}

const previousPage = () => {
  customerStore.previousPage()
}

// Utility functions
const formatCustomerStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended',
    PROSPECT: 'Prospect',
    LEAD: 'Lead',
    CANCELLED: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatCustomerType = (type: string): string => {
  const typeMap: Record<string, string> = {
    INDIVIDUAL: 'Individual',
    CORPORATE: 'Corporate',
    SME: 'SME',
    ENTERPRISE: 'Enterprise',
    PARTNER: 'Partner',
    DISTRIBUTOR: 'Distributor',
  }
  return typeMap[type] || type
}

const formatCustomerPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatCustomerIndustry = (industry: string): string => {
  const industryMap: Record<string, string> = {
    TECHNOLOGY: 'Technology',
    HEALTHCARE: 'Healthcare',
    FINANCE: 'Finance',
    MANUFACTURING: 'Manufacturing',
    RETAIL: 'Retail',
    EDUCATION: 'Education',
    CONSTRUCTION: 'Construction',
    TRANSPORTATION: 'Transportation',
    ENERGY: 'Energy',
    TELECOMMUNICATIONS: 'Telecommunications',
    OTHER: 'Other',
  }
  return industryMap[industry] || industry
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === '') {
    customerStore.clearFilters()
  }
})

// Initialize
onMounted(async () => {
  await customerStore.loadCustomers()
  await customerStore.loadCustomerStats()
})
</script>
