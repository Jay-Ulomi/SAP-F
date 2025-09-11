<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-sap-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Price Lists</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.totalPriceLists || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.activePriceLists || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-yellow-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Draft</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.draftPriceLists || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-blue-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ formatCurrency(stats?.totalValue || 0) }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white shadow rounded-lg p-4">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <!-- Filters -->
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <!-- Search -->
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search price lists..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <!-- Type Filter -->
          <select
            v-model="selectedType"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Types</option>
            <option value="sales">Sales</option>
            <option value="purchase">Purchase</option>
            <option value="inventory">Inventory</option>
            <option value="special">Special</option>
            <option value="promotional">Promotional</option>
          </select>

          <!-- Status Filter -->
          <select
            v-model="selectedStatus"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
            <option value="expired">Expired</option>
          </select>

          <!-- Currency Filter -->
          <select
            v-model="selectedCurrency"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Currencies</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
          </select>
        </div>

        <!-- Actions -->
        <div class="flex space-x-3">
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear Filters
          </button>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create Price List
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:p-6">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue"
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
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </div>
        </div>

        <div v-else-if="!hasItems" class="text-center py-8 text-gray-500">No price lists found</div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price List Code
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
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
                  Currency
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Scope
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ item.priceListCode }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.priceListName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.type) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="getStatusBadgeClass(item.status)"
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ formatEnum(item.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.currency }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(item.scope) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.totalItems }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(item.totalValue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewItem(item)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <PriceListForm
      v-if="showCreateModal || showEditModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeModals"
      @submit="handleFormSubmit"
    />

    <PriceListView v-if="showViewModal && selectedItem" :item="selectedItem" @close="closeModals" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { usePriceListsStore } from '../stores'
import { PriceListStatus, PriceListType, PriceListCurrency } from '../types'
import type { PriceList, PriceListFormData } from '../types'

// Async components
const PriceListForm = defineAsyncComponent(() => import('../components/PriceListForm.vue'))
const PriceListView = defineAsyncComponent(() => import('../components/PriceListView.vue'))

// Store
const priceListsStore = usePriceListsStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedCurrency = ref('')

// Modal state
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<PriceList | null>(null)

// Computed
const {
  loading,
  stats,
  currentPage,
  itemsPerPage,
  totalItems,
  totalPages,
  hasItems,
  paginatedItems,
} = priceListsStore

// Methods
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatEnum = (value: string): string => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusBadgeClass = (status: PriceListStatus): string => {
  switch (status) {
    case PriceListStatus.ACTIVE:
      return 'bg-green-100 text-green-800'
    case PriceListStatus.INACTIVE:
      return 'bg-gray-100 text-gray-800'
    case PriceListStatus.DRAFT:
      return 'bg-yellow-100 text-yellow-800'
    case PriceListStatus.EXPIRED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const setPage = (page: number) => {
  priceListsStore.setPage(page)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
  selectedCurrency.value = ''
  priceListsStore.clearFilters()
}

const viewItem = (item: PriceList) => {
  selectedItem.value = item
  showViewModal.value = true
}

const editItem = (item: PriceList) => {
  selectedItem.value = item
  showEditModal.value = true
}

const deleteItem = async (item: PriceList) => {
  if (confirm(`Are you sure you want to delete price list "${item.priceListName}"?`)) {
    try {
      await priceListsStore.deletePriceList(item.id)
    } catch (error) {
      console.error('Error deleting price list:', error)
    }
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: PriceListFormData) => {
  try {
    if (selectedItem.value) {
      await priceListsStore.updatePriceList(selectedItem.value.id, data)
    } else {
      await priceListsStore.createPriceList(data)
    }
    closeModals()
  } catch (error) {
    console.error('Error saving price list:', error)
  }
}

// Lifecycle
onMounted(() => {
  priceListsStore.fetchStats()
  priceListsStore.fetchPriceLists()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedCurrency],
  () => {
    const filters: Partial<typeof priceListsStore.filters> = {}

    if (searchQuery.value) filters.search = searchQuery.value
    if (selectedType.value) filters.type = selectedType.value as PriceListType
    if (selectedStatus.value) filters.status = selectedStatus.value as PriceListStatus
    if (selectedCurrency.value) filters.currency = selectedCurrency.value as PriceListCurrency

    priceListsStore.setFilters(filters)
  },
  { deep: true },
)
</script>
