<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Purchase Returns</h1>
        <p class="text-sm text-gray-600">Manage returns of purchased goods</p>
      </div>
      <div class="flex space-x-3">
        <button @click="createReturn" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Return
        </button>
        <button @click="loadReturnStats" class="btn-secondary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          Refresh Stats
        </button>
      </div>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
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
                d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m5 3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Returns</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalReturns || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Draft Returns</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.draftReturns || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
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
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Posted Returns</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.postedReturns || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Amount</p>
            <p class="text-xl font-bold text-gray-900">
              {{ formatCurrency(stats?.totalAmount || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Filters</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="showAdvancedFilters = !showAdvancedFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-sap-blue bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2"
                />
              </svg>
              {{ showAdvancedFilters ? 'Hide' : 'Show' }} Advanced
            </button>
            <button
              @click="resetFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
      <div class="p-6">
        <!-- Primary Filters - Always Visible -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Statuses</option>
              <option v-for="status in returnStatuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              v-model="selectedType"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in returnTypes" :key="type" :value="type">
                {{ formatReturnType(type) }}
              </option>
            </select>
          </div>

          <!-- Return Reason Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Return Reason</label>
            <select
              v-model="selectedReason"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Reasons</option>
              <option v-for="reason in returnReasons" :key="reason" :value="reason">
                {{ formatReturnReason(reason) }}
              </option>
            </select>
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchQuery"
              @input="handleFilterChange"
              type="text"
              placeholder="Search returns..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Vendor Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
              <input
                v-model="vendorFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Vendor code..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Warehouse Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
              <input
                v-model="warehouseFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Warehouse code..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Department Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                v-model="departmentFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Department..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Cost Center Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cost Center</label>
              <input
                v-model="costCenterFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Cost center..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Date and Amount Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Return Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Return Date Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="returnDateFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="returnDateToFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Posting Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Posting Date Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="postingDateFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="postingDateToFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Amount Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="minAmountFilter"
                  @input="handleFilterChange"
                  type="number"
                  placeholder="Min amount"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="maxAmountFilter"
                  @input="handleFilterChange"
                  type="number"
                  placeholder="Max amount"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm font-medium text-gray-700">Active Filters:</span>
              <div class="flex flex-wrap gap-2">
                <span
                  v-if="selectedStatus"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  Status: {{ formatStatus(selectedStatus) }}
                  <button
                    @click="((selectedStatus = ''), handleFilterChange())"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="selectedType"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                >
                  Type: {{ formatReturnType(selectedType) }}
                  <button
                    @click="((selectedType = ''), handleFilterChange())"
                    class="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="selectedReason"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
                >
                  Reason: {{ formatReturnReason(selectedReason) }}
                  <button
                    @click="((selectedReason = ''), handleFilterChange())"
                    class="ml-1 text-orange-600 hover:text-orange-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="searchQuery"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                >
                  Search: {{ searchQuery }}
                  <button
                    @click="((searchQuery = ''), handleFilterChange())"
                    class="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
            <button
              @click="resetFilters"
              class="text-sm text-sap-blue hover:text-sap-dark-blue font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Purchase Returns Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="returns.length === 0" class="p-8 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m5 3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Purchase Returns Found</p>
        <p class="text-sm text-gray-600 mb-4">
          Get started by creating your first purchase return.
        </p>
        <button @click="createReturn" class="btn-primary mt-4">Create Return</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reason
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Warehouse
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
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
            <tr v-for="returnItem in returns" :key="returnItem.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ returnItem.docNum }}</div>
                  <div class="text-sm text-gray-500">{{ returnItem.returnNumber }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ returnItem.vendorName }}</div>
                  <div class="text-sm text-gray-500">{{ returnItem.vendorCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                >
                  {{ formatReturnType(returnItem.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800"
                >
                  {{ formatReturnReason(returnItem.returnReason) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(returnItem.returnDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ returnItem.warehouseName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(returnItem.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ formatStatus(returnItem.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewReturn(returnItem)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editReturn(returnItem)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteReturn(returnItem.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Return Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showCreateForm ? 'Create New Return' : 'Edit Return' }}
          </h3>
          <!-- Return Form Component -->
          <ReturnForm
            :initial-data="returnToEdit ? convertToFormData(returnToEdit) : undefined"
            @submit="handleSubmitReturn"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- View Return Modal -->
    <div
      v-if="selectedReturn"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Return Details</h3>
            <button @click="selectedReturn = null" class="text-gray-400 hover:text-gray-600">
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
          <!-- Return Details Component -->
          <PurchaseReturnView v-if="selectedReturn" :purchase-return="selectedReturn" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePurchaseReturnStore } from '../stores'
import ReturnForm from '../components/ReturnForm.vue'
import PurchaseReturnView from '../components/PurchaseReturnView.vue'
import { PurchaseReturnStatus, ReturnType, ReturnReason } from '../types'
import type { PurchaseReturn, PurchaseReturnFormData } from '../types'

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const selectedReturn = ref<PurchaseReturn | null>(null)
const returnToEdit = ref<PurchaseReturn | null>(null)
const searchQuery = ref('')
const selectedStatus = ref<PurchaseReturnStatus | ''>('')
const selectedType = ref<ReturnType | ''>('')
const selectedReason = ref<ReturnReason | ''>('')
const showAdvancedFilters = ref(false)

// Additional filter variables
const vendorFilter = ref('')
const warehouseFilter = ref('')
const departmentFilter = ref('')
const costCenterFilter = ref('')
const projectFilter = ref('')
const returnDateFromFilter = ref('')
const returnDateToFilter = ref('')
const postingDateFromFilter = ref('')
const postingDateToFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')

// Store integration
const store = usePurchaseReturnStore()

// Computed properties from store
const returns = computed(() => store.returns)
const stats = computed(() => store.stats?.data || null)
const pagination = computed(() => store.pagination)

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    selectedReason.value ||
    searchQuery.value ||
    vendorFilter.value ||
    warehouseFilter.value ||
    departmentFilter.value ||
    costCenterFilter.value ||
    projectFilter.value ||
    returnDateFromFilter.value ||
    returnDateToFilter.value ||
    postingDateFromFilter.value ||
    postingDateToFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value
  )
})

// Constants
const returnStatuses = Object.values(PurchaseReturnStatus)
const returnTypes = Object.values(ReturnType)
const returnReasons = Object.values(ReturnReason)

// Lifecycle
onMounted(async () => {
  await loadReturnStats()
})

// Methods
const loadReturnStats = async () => {
  try {
    await store.loadReturnStats()
  } catch (err) {
    console.error('Failed to load statistics:', err)
  }
}

const createReturn = () => {
  returnToEdit.value = null
  showCreateForm.value = true
}

const editReturn = (returnItem: PurchaseReturn) => {
  returnToEdit.value = returnItem
  showEditForm.value = true
}

const viewReturn = (returnItem: PurchaseReturn) => {
  selectedReturn.value = returnItem
}

const deleteReturn = async (id: string) => {
  if (confirm('Are you sure you want to delete this return?')) {
    try {
      await store.deleteReturn(id)
      await loadReturns()
      await loadReturnStats()
    } catch (err) {
      console.error('Failed to delete return:', err)
    }
  }
}

const handleSubmitReturn = async (data: PurchaseReturnFormData) => {
  try {
    if (returnToEdit.value) {
      await store.updateReturn(returnToEdit.value.id, data)
    } else {
      await store.createReturn(data)
    }
    closeForms()
    await loadReturns()
    await loadReturnStats()
  } catch (err) {
    console.error('Error saving return:', err)
  }
}

const convertToFormData = (returnItem: PurchaseReturn): PurchaseReturnFormData => {
  return {
    returnNumber: returnItem.returnNumber,
    returnDate: returnItem.returnDate,
    postingDate: returnItem.postingDate,
    type: returnItem.type,
    currency: returnItem.currency,
    vendorCode: returnItem.vendorCode,
    goodsReceiptId: returnItem.goodsReceiptId || '',
    warehouseCode: returnItem.warehouseCode,
    department: returnItem.department,
    costCenter: returnItem.costCenter,
    projectCode: returnItem.projectCode || '',
    returnReason: returnItem.returnReason,
    notes: returnItem.notes || '',
    lineItems: returnItem.lineItems.map((item) => ({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      originalQuantity: item.originalQuantity,
      returnQuantity: item.returnQuantity,
      unitPrice: item.unitPrice,
      taxCode: item.taxCode,
      taxPercent: item.taxPercent,
      accountCode: item.accountCode,
      costCenter: item.costCenter,
      projectCode: item.projectCode || '',
      warehouseCode: item.warehouseCode,
      binLocation: item.binLocation || '',
      batchNumber: item.batchNumber || '',
      serialNumber: item.serialNumber || '',
      returnReason: item.returnReason,
      notes: item.notes || '',
      goodsReceiptId: item.goodsReceiptId || '',
      goodsReceiptLineId: item.goodsReceiptLineId || '',
    })),
  }
}

const closeForms = () => {
  showCreateForm.value = false
  showEditForm.value = false
  returnToEdit.value = null
}

const handleFilterChange = async () => {
  await loadReturns()
  await loadReturnStats()
}

const resetFilters = async () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  selectedReason.value = ''
  vendorFilter.value = ''
  warehouseFilter.value = ''
  departmentFilter.value = ''
  costCenterFilter.value = ''
  projectFilter.value = ''
  returnDateFromFilter.value = ''
  returnDateToFilter.value = ''
  postingDateFromFilter.value = ''
  postingDateToFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  await handleFilterChange()
}

const loadReturns = async () => {
  // Mock API call - replace with actual API
  await new Promise((resolve) => setTimeout(resolve, 500))
  returns.value = []
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString()
}

const formatStatus = (status: PurchaseReturnStatus): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnType = (type: ReturnType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: ReturnReason): string => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
