<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Chart of Accounts</h1>
        <p class="text-gray-600 mt-1">Manage your company's chart of accounts structure</p>
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
        Add Account
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Accounts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ accounts.length }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Accounts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ accounts.filter(a => a.isActive).length }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p class="text-sm font-medium text-gray-600">Account Types</p>
            <p class="text-2xl font-semibold text-gray-900">{{ accountTypes.length }}</p>
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Inactive Accounts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ accounts.filter(a => !a.isActive).length }}</p>
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
            placeholder="Search accounts by code, name, or description..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            @input="handleSearch"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedAccountType"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option v-for="type in accountTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
          <select
            v-model="selectedStatus"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          <button
            @click="resetFilters"
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
        <h3 class="text-lg font-medium text-gray-900">Accounts</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Account Code
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Account Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Currency
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="account in accounts" :key="account.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ account.accountCode }}</div>
                <div class="text-sm text-gray-500">Level {{ account.level }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ account.accountName }}</div>
                <div v-if="account.description" class="text-sm text-gray-500 truncate max-w-xs">
                  {{ account.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getAccountTypeBadgeClass(account.accountType)"
                >
                  {{ account.accountType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ account.currency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="
                    account.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  "
                >
                  {{ account.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="openViewModal(account)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="openEditModal(account)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteAccount(account.id)"
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
            Showing {{ (pagination.page - 1) * pagination.pageSize + 1 }} to
            {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.totalPages"
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
      v-if="isCreateModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeCreateModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingItem ? 'Edit Account' : 'Create New Account' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ChartAccountForm
          :initial-data="editingItem"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Account Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <dl class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Account Code</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem?.accountCode }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Account Name</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem?.accountName }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Account Type</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem?.accountType }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Currency</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem?.currency }}</dd>
              </div>
              <div v-if="selectedItem?.description">
                <dt class="text-sm font-medium text-gray-500">Description</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.description }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Settings & Status</h3>
            <dl class="space-y-3">
              <div>
                <dt class="text-sm font-medium text-gray-500">Status</dt>
                <dd class="text-sm">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="
                      selectedItem?.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ selectedItem?.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Reconciliation Account</dt>
                <dd class="text-sm text-gray-900">
                  {{ selectedItem?.reconciliationAccount ? 'Yes' : 'No' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Blocked for Manual Entry</dt>
                <dd class="text-sm text-gray-900">
                  {{ selectedItem?.blockedForManualEntry ? 'Yes' : 'No' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Allow Reconciliation</dt>
                <dd class="text-sm text-gray-900">
                  {{ selectedItem?.allowReconciliation ? 'Yes' : 'No' }}
                </dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Created</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(selectedItem?.createdDate || '') }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Modified</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(selectedItem?.modifiedDate || '') }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-sap-blue" fill="none" viewBox="0 0 24 24">
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
        <span class="ml-3 text-gray-600">Loading accounts...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Accounts</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useChartAccountsStore } from '../stores/chartAccountsStore'
import ChartAccountForm from '../components/ChartAccountForm.vue'
import type { ChartAccount, ChartAccountFormData } from '../types'
import { AccountType } from '../types'

// Store
const store = useChartAccountsStore()

// Local state
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<ChartAccount | null>(null)
const selectedItem = ref<ChartAccount | null>(null)
const searchQuery = ref('')
const selectedAccountType = ref('')
const selectedStatus = ref('')

// Computed
const accounts = computed(() => store.accounts)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)
const accountTypes = computed(() => store.accountTypes)

// Methods
const loadAccounts = () => {
  store.fetchAccounts()
}

const handleSearch = () => {
  store.fetchAccounts(1, pagination.value.pageSize, { search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: any = {}
  if (selectedAccountType.value) filters.accountType = selectedAccountType.value
  if (selectedStatus.value !== '') filters.isActive = selectedStatus.value === 'true'
  if (searchQuery.value) filters.search = searchQuery.value

  store.fetchAccounts(1, pagination.value.pageSize, filters)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedAccountType.value = ''
  selectedStatus.value = ''
  store.resetFilters()
  store.fetchAccounts()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    store.fetchAccounts(page)
  }
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: ChartAccount) => {
  editingItem.value = item
  isCreateModalOpen.value = true
  closeViewModal()
}

const openViewModal = (item: ChartAccount) => {
  selectedItem.value = item
  isViewModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editingItem.value = null
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedItem.value = null
}

const handleSubmit = async (data: ChartAccountFormData) => {
  try {
    if (editingItem.value) {
      await store.updateAccount(editingItem.value.id, data)
    } else {
      await store.createAccount(data)
    }
    closeCreateModal()
    // Refresh the list
    store.fetchAccounts()
  } catch (error) {
    console.error('Failed to save account:', error)
  }
}

const deleteAccount = async (id: string) => {
  if (!confirm('Are you sure you want to delete this account? This action cannot be undone.')) {
    return
  }

  try {
    await store.deleteAccount(id)
    // Refresh the list
    store.fetchAccounts()
  } catch (error) {
    console.error('Failed to delete account:', error)
  }
}

const retryLoad = () => {
  store.clearError()
  loadAccounts()
}

const getAccountTypeBadgeClass = (type: AccountType) => {
  const classes = {
    [AccountType.ASSET]: 'bg-blue-100 text-blue-800',
    [AccountType.LIABILITY]: 'bg-red-100 text-red-800',
    [AccountType.EQUITY]: 'bg-green-100 text-green-800',
    [AccountType.REVENUE]: 'bg-yellow-100 text-yellow-800',
    [AccountType.EXPENSE]: 'bg-orange-100 text-orange-800',
    [AccountType.COST_OF_GOODS_SOLD]: 'bg-purple-100 text-purple-800',
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  loadAccounts()
})

// Watch for store changes
watch(
  () => store.error,
  (newError) => {
    if (newError) {
      console.error('Store error:', newError)
    }
  },
)
</script>
