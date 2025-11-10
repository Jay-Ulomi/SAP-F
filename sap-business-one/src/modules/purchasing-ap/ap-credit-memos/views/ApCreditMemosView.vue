<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">A/P Credit Memos</h1>
        <p class="text-sm text-gray-600">Manage vendor credit memos and returns</p>
      </div>
      <div class="flex space-x-3">
        <button @click="createCreditMemo" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Credit Memo
        </button>
        <button @click="loadCreditMemoStats" class="btn-secondary flex items-center justify-center">
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
      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Credit Memos</p>
            <p class="text-2xl font-bold text-gray-900">{{ creditMemos.length || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Applied Amount</p>
            <p class="text-2xl font-bold text-green-600">
              $0.00
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-orange-100">
            <svg
              class="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Outstanding</p>
            <p class="text-2xl font-bold text-orange-600">
              $770.00
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
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
            <p class="text-sm font-medium text-gray-600">Average Value</p>
            <p class="text-2xl font-bold text-purple-600">
              $385.00
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-medium text-gray-900">Filters</h3>
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
              <option v-for="status in creditMemoStatuses" :key="status" :value="status">
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
              <option v-for="type in creditMemoTypes" :key="type" :value="type">
                {{ formatCreditMemoType(type) }}
              </option>
            </select>
          </div>

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

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchQuery"
              @input="handleFilterChange"
              type="text"
              placeholder="Search credit memos..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

            <!-- Project Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project</label>
              <input
                v-model="projectFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Project..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Date and Amount Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Credit Memo Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Credit Memo Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="creditMemoDateFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="creditMemoDateToFilter"
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
                  Type: {{ formatCreditMemoType(selectedType) }}
                  <button
                    @click="((selectedType = ''), handleFilterChange())"
                    class="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="vendorFilter"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                >
                  Vendor: {{ vendorFilter }}
                  <button
                    @click="((vendorFilter = ''), handleFilterChange())"
                    class="ml-1 text-purple-600 hover:text-purple-800"
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

    <!-- A/P Credit Memos Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p class="mt-2 text-sm text-gray-500">Loading credit memos...</p>
      </div>
      <div v-else-if="creditMemos.length === 0" class="p-8 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No A/P Credit Memos Found</p>
        <p class="text-sm text-gray-600 mb-4">
          Get started by creating your first A/P credit memo.
        </p>
        <button @click="createCreditMemo" class="btn-primary mt-4">Create Credit Memo</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Credit Memo
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Credit Memo Date
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Posting Date
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                Cost Center
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="creditMemo in creditMemos" :key="creditMemo.id" class="hover:bg-gray-50 transition-colors duration-200">
              <td class="px-4 py-3 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ creditMemo.docNum }}</div>
                  <div class="text-xs text-gray-500">{{ creditMemo.creditMemoNumber }}</div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ creditMemo.vendorName }}</div>
                  <div class="text-xs text-gray-500">{{ creditMemo.vendorCode }}</div>
                </div>
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                  {{ formatCreditMemoType(creditMemo.type) }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(creditMemo.creditMemoDate) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(creditMemo.postingDate) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ creditMemo.costCenter || '-' }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(creditMemo.totalAmount) }}
              </td>
              <td class="px-4 py-3 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': creditMemo.status === 'Open',
                    'bg-blue-100 text-blue-800': creditMemo.status === 'Applied',
                    'bg-gray-100 text-gray-800': creditMemo.status === 'Closed'
                  }"
                >
                  {{ formatStatus(creditMemo.status) }}
                </span>
              </td>
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewCreditMemo(creditMemo)"
                    class="text-blue-600 hover:text-blue-900 transition-colors duration-200"
                  >
                    View
                  </button>
                  <button
                    @click="editCreditMemo(creditMemo)"
                    class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteCreditMemo(creditMemo.id)"
                    class="text-red-600 hover:text-red-900 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Credit Memo Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showCreateForm ? 'Create New A/P Credit Memo' : 'Edit A/P Credit Memo' }}
            </h3>
            <button @click="closeForms" class="text-gray-400 hover:text-gray-600">
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
          <ApCreditMemoForm
            :initial-data="creditMemoToEdit ? convertToFormData(creditMemoToEdit) : undefined"
            @submit="handleSubmitCreditMemo"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- View Credit Memo Modal -->
    <div
      v-if="selectedCreditMemo"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">A/P Credit Memo Details</h3>
            <button @click="selectedCreditMemo = null" class="text-gray-400 hover:text-gray-600">
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
          <ApCreditMemoView :credit-memo="selectedCreditMemo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApCreditMemoStore } from '../stores'
import ApCreditMemoForm from '../components/ApCreditMemoForm.vue'
import ApCreditMemoView from '../components/ApCreditMemoView.vue'
import type { ApCreditMemo, ApCreditMemoFormData } from '../types'

// Store
const store = useApCreditMemoStore()

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const creditMemoToEdit = ref<ApCreditMemo | null>(null)
const selectedCreditMemo = ref<ApCreditMemo | null>(null)

// Filter variables
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedType = ref('')
const vendorFilter = ref('')
const costCenterFilter = ref('')
const projectFilter = ref('')
const creditMemoDateFromFilter = ref('')
const creditMemoDateToFilter = ref('')
const postingDateFromFilter = ref('')
const postingDateToFilter = ref('')
const minAmountFilter = ref(0)
const maxAmountFilter = ref(0)
const showAdvancedFilters = ref(false)

// Store computed properties
const creditMemos = computed(() => store.creditMemos)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats?.data || null)
const pagination = computed(() => store.pagination)

// Lifecycle
onMounted(async () => {
  await loadCreditMemos()
  await loadCreditMemoStats()
})

// Methods
const loadCreditMemos = async () => {
  await store.loadCreditMemos()
}

const loadCreditMemoStats = async () => {
  await store.loadCreditMemoStats()
}

const createCreditMemo = () => {
  creditMemoToEdit.value = null
  showCreateForm.value = true
  showEditForm.value = false
}

const editCreditMemo = (creditMemo: ApCreditMemo) => {
  creditMemoToEdit.value = creditMemo
  showCreateForm.value = false
  showEditForm.value = true
}

const viewCreditMemo = (creditMemo: ApCreditMemo) => {
  selectedCreditMemo.value = creditMemo
}

const handleSubmitCreditMemo = async (data: ApCreditMemoFormData) => {
  try {
    if (showCreateForm.value) {
      await store.createCreditMemo(data)
    } else if (showEditForm.value && creditMemoToEdit.value) {
      await store.updateCreditMemo(creditMemoToEdit.value.id, data)
    }
    closeForms()
  } catch (error) {
    console.error('Failed to save credit memo:', error)
  }
}

const convertToFormData = (creditMemo: ApCreditMemo): ApCreditMemoFormData => {
  return {
    vendorCode: creditMemo.vendorCode,
    vendorName: creditMemo.vendorName,
    creditMemoNumber: creditMemo.creditMemoNumber,
    creditMemoDate: creditMemo.creditMemoDate,
    postingDate: creditMemo.postingDate,
    type: creditMemo.type,
    currency: creditMemo.currency,
    exchangeRate: creditMemo.exchangeRate,
    paymentTerms: creditMemo.paymentTerms,
    originalInvoiceNumber: creditMemo.originalInvoiceNumber,
    purchaseOrderNumber: creditMemo.purchaseOrderNumber,
    goodsReceiptNumber: creditMemo.goodsReceiptNumber,
    projectCode: creditMemo.projectCode,
    costCenter: creditMemo.costCenter,
    notes: creditMemo.notes,
    lineItems: creditMemo.lineItems.map((item) => ({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      discountPercent: item.discountPercent,
      discountAmount: item.discountAmount,
      taxCode: item.taxCode,
      taxPercent: item.taxPercent,
      accountCode: item.accountCode,
      costCenter: item.costCenter,
      projectCode: item.projectCode,
      originalInvoiceNumber: item.originalInvoiceNumber,
      returnReason: item.returnReason,
    })),
  }
}

const deleteCreditMemo = async (id: string) => {
  try {
    await store.deleteCreditMemo(id)
    closeForms()
  } catch (error) {
    console.error('Failed to delete credit memo:', error)
  }
}

const closeForms = () => {
  creditMemoToEdit.value = null
  showCreateForm.value = false
  showEditForm.value = false
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
    case 'Open':
      return 'Open'
    case 'Applied':
      return 'Applied'
    case 'Closed':
      return 'Closed'
    default:
      return status
  }
}

const formatCreditMemoType = (type: string): string => {
  switch (type) {
    case 'Credit Memo':
      return 'Credit Memo'
    case 'Return':
      return 'Return'
    default:
      return type
  }
}

const handleFilterChange = () => {
  // This function is now primarily for triggering re-fetching or re-rendering
  // The actual filtering logic is handled by the API call or re-fetching the data
  console.log('Filter changed:', {
    selectedStatus: selectedStatus.value,
    selectedType: selectedType.value,
    vendorFilter: vendorFilter.value,
    searchQuery: searchQuery.value,
    costCenterFilter: costCenterFilter.value,
    projectFilter: projectFilter.value,
    creditMemoDateFromFilter: creditMemoDateFromFilter.value,
    creditMemoDateToFilter: creditMemoDateToFilter.value,
    postingDateFromFilter: postingDateFromFilter.value,
    postingDateToFilter: postingDateToFilter.value,
    minAmountFilter: minAmountFilter.value,
    maxAmountFilter: maxAmountFilter.value,
  })
  // Re-fetch data with new filters
  loadCreditMemos()
}

const resetFilters = () => {
  selectedStatus.value = ''
  selectedType.value = ''
  vendorFilter.value = ''
  searchQuery.value = ''
  costCenterFilter.value = ''
  projectFilter.value = ''
  creditMemoDateFromFilter.value = ''
  creditMemoDateToFilter.value = ''
  postingDateFromFilter.value = ''
  postingDateToFilter.value = ''
  minAmountFilter.value = 0
  maxAmountFilter.value = 0
  handleFilterChange()
}

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    vendorFilter.value ||
    searchQuery.value ||
    costCenterFilter.value ||
    projectFilter.value ||
    creditMemoDateFromFilter.value ||
    creditMemoDateToFilter.value ||
    postingDateFromFilter.value ||
    postingDateToFilter.value ||
    minAmountFilter.value > 0 ||
    maxAmountFilter.value > 0
  )
})

// Mock data for filters
const creditMemoStatuses = ref(['Open', 'Applied', 'Closed'])
const creditMemoTypes = ref(['Credit Memo', 'Return'])

// Computed properties - Commented out for now as it's not being used
/*
const filteredCreditMemos = computed(() => {
  return creditMemos.value.filter((memo) => {
    const matchesStatus = selectedStatus.value ? memo.status === selectedStatus.value : true
    const matchesType = selectedType.value ? memo.type === selectedType.value : true
    const matchesVendor = vendorFilter.value ? memo.vendorCode.includes(vendorFilter.value) : true
    const matchesSearch = searchQuery.value
      ? memo.docNum.includes(searchQuery.value) || memo.creditMemoNumber.includes(searchQuery.value)
      : true
    const matchesCostCenter = costCenterFilter.value
      ? memo.costCenter?.includes(costCenterFilter.value)
      : true
    const matchesProject = projectFilter.value
      ? memo.projectCode?.includes(projectFilter.value)
      : true
    const matchesCreditMemoDateFrom = creditMemoDateFromFilter.value
      ? new Date(memo.creditMemoDate) >= new Date(creditMemoDateFromFilter.value)
      : true
    const matchesCreditMemoDateTo = creditMemoDateToFilter.value
      ? new Date(memo.creditMemoDate) <= new Date(creditMemoDateToFilter.value)
      : true
    const matchesPostingDateFrom = postingDateFromFilter.value
      ? new Date(memo.postingDate) >= new Date(postingDateFromFilter.value)
      : true
    const matchesPostingDateTo = postingDateToFilter.value
      ? new Date(memo.postingDate) <= new Date(postingDateToFilter.value)
      : true
    const matchesMinAmount =
      minAmountFilter.value > 0 ? memo.totalAmount >= minAmountFilter.value : true
    const matchesMaxAmount =
      maxAmountFilter.value > 0 ? memo.totalAmount <= maxAmountFilter.value : true

    return (
      matchesStatus &&
      matchesType &&
      matchesVendor &&
      matchesSearch &&
      matchesCostCenter &&
      matchesProject &&
      matchesCreditMemoDateFrom &&
      matchesCreditMemoDateTo &&
      matchesPostingDateFrom &&
      matchesPostingDateTo &&
      matchesMinAmount &&
      matchesMaxAmount
    )
  })
})
*/
</script>
