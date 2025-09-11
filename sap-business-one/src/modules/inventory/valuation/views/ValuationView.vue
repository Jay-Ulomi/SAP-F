<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Inventory Valuation</h1>
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
        Run Valuation
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Inventory Value</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">${{ stats?.totalValue?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
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
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Items</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalItems?.toLocaleString() || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Negative Stock Items</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.negativeStockItems || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Last Valuation</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.lastValuation || 'Never' }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <svg
            class="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
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
            placeholder="Search items..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.warehouse"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Warehouses</option>
            <option value="main">Main Warehouse</option>
            <option value="secondary">Secondary Warehouse</option>
            <option value="retail">Retail Store</option>
          </select>
          <select
            v-model="searchParams.category"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="raw_materials">Raw Materials</option>
            <option value="finished_goods">Finished Goods</option>
            <option value="wip">Work in Progress</option>
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

    <!-- Valuation Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading valuation data...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button
          @click="loadValuation"
          class="mt-2 text-blue-600 hover:text-blue-800"
        >
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
                  Item
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Warehouse
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unit Cost
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Valuation Method
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in valuationItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                  <div class="text-sm text-gray-500">{{ item.itemName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.warehouseName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.quantity.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ item.unitCost.toFixed(2) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${{ item.totalValue.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ formatValuationMethod(item.valuationMethod) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewItem(item)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="adjustValue(item)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Adjust
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

    <!-- Run Valuation Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Run Inventory Valuation</h2>
        <ValuationForm
          :loading="submitting"
          @submit="runValuation"
          @cancel="closeModal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import ValuationForm from '../components/ValuationForm.vue'

// State
const showCreateModal = ref(false)
const submitting = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)

// Mock data
const valuationItems = ref([])
const stats = ref({
  totalValue: 2850000,
  totalItems: 1247,
  negativeStockItems: 3,
  lastValuation: '2024-12-01'
})
const pagination = ref({
  page: 1,
  totalPages: 1,
  total: 0
})

// Search parameters
const searchParams = reactive({
  search: '',
  warehouse: '',
  category: ''
})

// Methods
const handleSearch = () => {
  loadValuation()
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    warehouse: '',
    category: ''
  })
  loadValuation()
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    loadValuation()
  }
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    loadValuation()
  }
}

const viewItem = (item: any) => {
  console.log('Viewing item:', item)
}

const adjustValue = (item: any) => {
  console.log('Adjusting value for:', item)
}

const runValuation = async (data: any) => {
  submitting.value = true
  try {
    console.log('Running valuation:', data)
    closeModal()
    await loadValuation()
  } catch (err) {
    console.error('Error running valuation:', err)
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
}

const loadValuation = async () => {
  loading.value = true
  try {
    // Mock implementation
    await new Promise(resolve => setTimeout(resolve, 1000))
    valuationItems.value = [
      {
        id: '1',
        itemCode: 'ITEM-001',
        itemName: 'Widget Component',
        warehouseName: 'Main Warehouse',
        quantity: 150,
        unitCost: 25.50,
        totalValue: 3825,
        valuationMethod: 'FIFO'
      }
    ]
    pagination.value.total = 1
    error.value = null
  } catch (err) {
    error.value = 'Failed to load valuation data'
  } finally {
    loading.value = false
  }
}

// Utility functions
const formatValuationMethod = (method: string) => {
  const methods = {
    FIFO: 'FIFO',
    LIFO: 'LIFO',
    AVERAGE: 'Moving Average',
    STANDARD: 'Standard Cost'
  }
  return methods[method] || method
}

// Lifecycle
onMounted(() => {
  loadValuation()
})
</script>
