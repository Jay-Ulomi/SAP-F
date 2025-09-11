<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Service Contracts</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        New Contract
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Contracts</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalContracts || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
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
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Contracts</p>
            <p class="text-2xl font-bold text-green-600">{{ stats?.activeContracts || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-green-100">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Expiring Soon</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats?.expiringSoon || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-yellow-100">
            <svg
              class="w-6 h-6 text-yellow-600"
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
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-purple-600">
              ${{ stats?.totalValue?.toLocaleString() || 0 }}
            </p>
          </div>
          <div class="p-3 rounded-full bg-purple-100">
            <svg
              class="w-6 h-6 text-purple-600"
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
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchParams.search"
            type="text"
            placeholder="Search contracts..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            v-model="searchParams.type"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="warranty">Warranty</option>
            <option value="service_agreement">Service Agreement</option>
            <option value="maintenance">Maintenance</option>
            <option value="support">Support</option>
          </select>
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

    <!-- Contracts Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading contracts...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button @click="loadContracts" class="mt-2 text-blue-600 hover:text-blue-800">
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
                  Contract
                </th>
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
                  Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  End Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="contract in contracts" :key="contract.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ contract.contractNumber }}</div>
                  <div class="text-sm text-gray-500">{{ contract.description }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ contract.customerName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {{ formatType(contract.type) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(contract.status)">
                    {{ formatStatus(contract.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(contract.value, contract.currency) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(contract.endDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewContract(contract)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editContract(contract)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      v-if="contract.status === 'expired'"
                      @click="renewContract(contract)"
                      class="text-green-600 hover:text-green-900"
                    >
                      Renew
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
        <h2 class="text-xl font-bold mb-4">
          {{ editingContract ? 'Edit' : 'Create' }} Service Contract
        </h2>

        <ContractForm
          :contract="editingContract"
          :loading="submitting"
          @submit="submitContract"
          @cancel="closeModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal && selectedContract"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-6xl max-h-screen overflow-y-auto m-4">
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-xl font-bold">Contract Details</h2>
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

        <ContractView :contract="selectedContract" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useServiceContractsStore } from '../stores'
import ContractForm from '../components/ContractForm.vue'
import ContractView from '../components/ContractView.vue'
import type {
  ServiceContract,
  ServiceContractFormData,
  ServiceSearchParams,
  ContractType,
  ServiceContractStatus,
  ResponseTimeUnit,
} from '../../types'

// Store
const contractsStore = useServiceContractsStore()

// State
const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingContract = ref<ServiceContract | null>(null)
const selectedContract = ref<ServiceContract | null>(null)
const submitting = ref(false)

// Computed from store
const contracts = computed(() => contractsStore.contracts)
const loading = computed(() => contractsStore.loading)
const error = computed(() => contractsStore.error)
const pagination = computed(() => contractsStore.pagination)
const stats = computed(() => contractsStore.stats)

// Search parameters
const searchParams = reactive<ServiceSearchParams>({
  search: '',
  status: undefined,
  type: undefined,
})

// Methods
const handleSearch = () => {
  contractsStore.setFilters(searchParams)
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    status: undefined,
    type: undefined,
  })
  contractsStore.clearFilters()
}

const nextPage = () => {
  contractsStore.nextPage()
}

const previousPage = () => {
  contractsStore.previousPage()
}

const viewContract = (contract: ServiceContract) => {
  selectedContract.value = contract
  showViewModal.value = true
}

const editContract = (contract: ServiceContract) => {
  editingContract.value = contract
  showCreateModal.value = true
}

const renewContract = async (contract: ServiceContract) => {
  try {
    await contractsStore.renewContract(contract.id)
  } catch (err) {
    console.error('Error renewing contract:', err)
  }
}

const submitContract = async (data: ServiceContractFormData) => {
  submitting.value = true
  try {
    if (editingContract.value) {
      await contractsStore.updateContract(editingContract.value.id, data)
    } else {
      await contractsStore.createContract(data)
    }
    closeModal()
  } catch (err) {
    console.error('Error saving contract:', err)
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showViewModal.value = false
  editingContract.value = null
  selectedContract.value = null
}

// Utility functions
const formatType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'active':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'expired':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'cancelled':
      return `${baseClasses} bg-gray-100 text-gray-800`
    case 'suspended':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  contractsStore.loadContracts()
})
</script>
