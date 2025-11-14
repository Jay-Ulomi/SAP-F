<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Sales Quotations</h1>
        <p class="text-sm text-gray-600">Create, manage, and track customer quotations</p>
      </div>
      <div class="flex space-x-3">
        <button @click="showFormModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Quotation
        </button>
        <button @click="loadQuotationStats" class="btn-secondary flex items-center justify-center">
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

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
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
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Quotations</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Accepted</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.accepted || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ (stats?.sent || 0) + (stats?.draft || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ (stats?.conversionRate || 0).toFixed(1) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Quotations</h3>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchTerm"
              @input="updateFilters"
              type="text"
              placeholder="Search by document, customer, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="selectedType"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Types</option>
              <option v-for="type in formTypes" :key="type" :value="type">
                {{ type }}
              </option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="selectedStatus"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="DRAFT">Draft</option>
              <option value="SENT">Sent</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
              <option value="EXPIRED">Expired</option>
              <option value="CONVERTED_TO_ORDER">Converted to Order</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue h-[38px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="quotationsStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
        <span class="ml-2 text-sm text-gray-500">Loading quotations...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="quotationsStore.error" class="text-center py-12">
        <div class="text-red-600 mb-2">
          <svg class="mx-auto h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-600">{{ quotationsStore.error }}</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Document
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Valid Until
              </th>
              <th
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
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
                Total Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="quotation in paginatedQuotations"
              :key="quotation.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewQuotation(quotation)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ quotation.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ quotation.docEntry || 'N/A' }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ quotation.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ quotation.customerCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(quotation.quotationDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(quotation.validUntil) }}</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getItemsSummary(quotation) }}</div>
                <div class="text-xs text-gray-500">{{ getItemCount(quotation) }} item(s)</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="
                    String(quotation.type) === 'Item'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  "
                >
                  {{ quotation.type || 'Item' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(quotation.status)"
                >
                  {{ formatStatus(quotation.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(quotation.totalAmount, quotation.currency) }}
                </div>
                <div class="text-sm text-gray-500">{{ quotation.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewQuotation(quotation)"
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
                    @click.stop="editQuotation(quotation)"
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
                    @click.stop="deleteQuotation(quotation)"
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

        <!-- Empty State -->
        <div v-if="paginatedQuotations.length === 0" class="text-center py-12">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
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
          <h3 class="mt-2 text-sm font-medium text-gray-900">No quotations found</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new quotation.</p>
          <div class="mt-6">
            <button @click="showFormModal = true" class="btn-primary">New Quotation</button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.total > pagination.limit" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page >= Math.ceil(pagination.total / pagination.limit)"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div
      v-if="showFormModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <QuotationForm
          :quotation="editingQuotation"
          :is-editing="!!editingQuotation"
          @close="closeFormModal"
          @saved="handleQuotationSaved"
        />
      </div>
    </div>

    <!-- Detail Modal -->
    <div
      v-if="showDetailModal && selectedQuotation"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Quotation Details</h3>
          <button
            @click="showDetailModal = false"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
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

        <!-- QuotationView Component -->
        <QuotationView
          :quotation="selectedQuotation"
          @edit="handleEditQuotation(selectedQuotation)"
          @convert="handleConvertToOrder(selectedQuotation)"
          @print="handlePrintQuotation(selectedQuotation)"
          @email="handleEmailQuotation(selectedQuotation)"
          @duplicate="handleDuplicateQuotation(selectedQuotation)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useQuotationsStore } from '../stores/quotationsStore'
// @ts-ignore - Vue SFC default export shim
import QuotationForm from '../components/QuotationForm.vue'
// @ts-ignore - Vue SFC default export shim
import QuotationView from '../components/QuotationView.vue'
import type { Quotation } from '../types'
import { QuotationStatus, QuotationType } from '../types'

// Store
const quotationsStore = useQuotationsStore()

// Local State
const showFormModal = ref(false)
const showDetailModal = ref(false)
const editingQuotation = ref<Quotation | null>(null)
const selectedQuotation = ref<Quotation | null>(null)
const selectedStatus = ref('')
const selectedType = ref('')
const searchTerm = ref('')
const salesPersonFilter = ref('')
const dateFromFilter = ref('')
const dateToFilter = ref('')
const currencyFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')
const priorityFilter = ref('')
const validUntilFromFilter = ref('')
const validUntilToFilter = ref('')

// Computed Properties
const quotations = computed(() => quotationsStore.quotations)
const stats = computed(() => quotationsStore.stats)
const pagination = computed(() => quotationsStore.pagination)
const formTypes = computed(() => ['Item', 'Service'])
// Loading state available from store if needed

const paginatedQuotations = computed(() => {
  return quotations.value
})

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    searchTerm.value ||
    salesPersonFilter.value ||
    priorityFilter.value ||
    dateFromFilter.value ||
    dateToFilter.value ||
    currencyFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value ||
    validUntilFromFilter.value ||
    validUntilToFilter.value
  )
})

// Methods
const updateFilters = () => {
  const filters: Record<string, any> = {}

  if (selectedStatus.value) {
    filters.status = [selectedStatus.value]
  }

  if (selectedType.value) {
    filters.type = [selectedType.value]
  }

  if (searchTerm.value.trim()) {
    filters.search = searchTerm.value.trim()
  }

  quotationsStore.updateFilters(filters)
  quotationsStore.fetchQuotations()
}

const clearFilters = () => {
  selectedStatus.value = ''
  selectedType.value = ''
  searchTerm.value = ''
  salesPersonFilter.value = ''
  dateFromFilter.value = ''
  dateToFilter.value = ''
  currencyFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  priorityFilter.value = ''
  validUntilFromFilter.value = ''
  validUntilToFilter.value = ''
  quotationsStore.clearFilters()
  quotationsStore.fetchQuotations()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= Math.ceil(pagination.value.total / pagination.value.limit)) {
    quotationsStore.fetchQuotations(page)
  }
}

const viewQuotation = (quotation: Quotation) => {
  selectedQuotation.value = quotation
  showDetailModal.value = true
}

const editQuotation = (quotation: Quotation) => {
  editingQuotation.value = quotation
  showFormModal.value = true
}

// Event handlers for QuotationView component
const handleEditQuotation = (quotation: any) => {
  editQuotation(quotation)
  showDetailModal.value = false
}

const handleConvertToOrder = (quotation: any) => {
  console.log('Convert to Order:', quotation)
  // TODO: Implement convert to order functionality
}

const handlePrintQuotation = (quotation: any) => {
  console.log('Print Quotation:', quotation)
  // TODO: Implement print functionality
}

const handleEmailQuotation = (quotation: any) => {
  console.log('Email Quotation:', quotation)
  // TODO: Implement email functionality
}

const handleDuplicateQuotation = (quotation: any) => {
  console.log('Duplicate Quotation:', quotation)
  // TODO: Implement duplicate functionality
}

const addQuotation = () => {
  editingQuotation.value = null
  showFormModal.value = true
}

const deleteQuotation = async (quotation: Quotation) => {
  if (confirm(`Are you sure you want to delete quotation ${quotation.docNum}?`)) {
    const result = await quotationsStore.deleteQuotation(quotation.id)
    if (result.success) {
      quotationsStore.fetchQuotations()
    }
  }
}

const closeFormModal = () => {
  showFormModal.value = false
  editingQuotation.value = null
}

const handleQuotationSaved = (_quotation: Quotation) => {
  closeFormModal()
  quotationsStore.fetchQuotations()
  quotationsStore.fetchStats()
}

const loadQuotationStats = async () => {
  await quotationsStore.fetchStats()
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number | string | null | undefined, currency?: string): string => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : Number(amount)
  if (!isFinite(numericAmount)) {
    return '—'
  }

  const currencyCode = (currency && currency.trim()) || 'USD'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(numericAmount)
  } catch (_err) {
    return `${currencyCode} ${numericAmount.toFixed(2)}`
  }
}

const formatStatus = (status: QuotationStatus): string => {
  const statusMap: Record<QuotationStatus, string> = {
    [QuotationStatus.DRAFT]: 'Draft',
    [QuotationStatus.SENT]: 'Sent',
    [QuotationStatus.ACCEPTED]: 'Accepted',
    [QuotationStatus.REJECTED]: 'Rejected',
    [QuotationStatus.EXPIRED]: 'Expired',
    [QuotationStatus.CONVERTED_TO_ORDER]: 'Converted to Order',
    [QuotationStatus.CANCELLED]: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatType = (type: QuotationType): string => {
  const typeMap: Record<QuotationType, string> = {
    [QuotationType.STANDARD]: 'Standard',
    [QuotationType.SPECIAL_PRICING]: 'Special Pricing',
    [QuotationType.VOLUME_DISCOUNT]: 'Volume Discount',
    [QuotationType.PROMOTIONAL]: 'Promotional',
  }
  return typeMap[type] || type
}

const getStatusBadgeClass = (status: QuotationStatus): string => {
  const classMap: Record<QuotationStatus, string> = {
    [QuotationStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [QuotationStatus.SENT]: 'bg-blue-100 text-blue-800',
    [QuotationStatus.ACCEPTED]: 'bg-green-100 text-green-800',
    [QuotationStatus.REJECTED]: 'bg-red-100 text-red-800',
    [QuotationStatus.EXPIRED]: 'bg-yellow-100 text-yellow-800',
    [QuotationStatus.CONVERTED_TO_ORDER]: 'bg-purple-100 text-purple-800',
    [QuotationStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getTypeBadgeClass = (type: QuotationType): string => {
  const classMap: Record<QuotationType, string> = {
    [QuotationType.STANDARD]: 'bg-blue-100 text-blue-800',
    [QuotationType.SPECIAL_PRICING]: 'bg-green-100 text-green-800',
    [QuotationType.VOLUME_DISCOUNT]: 'bg-purple-100 text-purple-800',
    [QuotationType.PROMOTIONAL]: 'bg-orange-100 text-orange-800',
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
}

// Helper functions for Item/Service display
const getItemsSummary = (record: any) => {
  if (!record.lineItems || record.lineItems.length === 0) return 'No items'
  const firstItem = record.lineItems[0]
  if (record.lineItems.length === 1) {
    return firstItem.itemCode || firstItem.description || 'Item'
  }
  return `${firstItem.itemCode || firstItem.description || 'Item'} +${record.lineItems.length - 1} more`
}

const getItemCount = (record: any) => {
  return record.lineItems?.length || 0
}

// Lifecycle
onMounted(async () => {
  await Promise.all([quotationsStore.fetchQuotations(), quotationsStore.fetchStats()])
})
</script>
