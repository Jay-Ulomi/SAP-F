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

    <!-- A/P Credit Memos Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">A/P Credit Memos</h3>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchQuery"
              @input="handleFilterChange"
              type="text"
              placeholder="Search by document, vendor, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="selectedType"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Types</option>
              <option v-for="type in creditMemoTypes" :key="type" :value="type">
                {{ formatCreditMemoType(type) }}
              </option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="selectedStatus"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option v-for="status in creditMemoStatuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </option>
            </select>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="hasActiveFilters"
              @click="resetFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue h-[38px]"
            >
              Clear Filters
            </button>
        </div>
      </div>
    </div>

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

      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
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
            <tr
              v-for="creditMemo in creditMemos"
              :key="creditMemo.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewCreditMemo(creditMemo)"
            >
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
              <td class="px-4 py-3 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewCreditMemo(creditMemo)"
                    class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                    title="View"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click.stop="editCreditMemo(creditMemo)"
                    class="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteCreditMemo(creditMemo.id)"
                    class="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
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
