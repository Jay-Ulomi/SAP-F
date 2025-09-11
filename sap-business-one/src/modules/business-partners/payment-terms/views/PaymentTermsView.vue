<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Payment Terms</h1>
          <p class="text-gray-600">
            Manage payment terms, discounts, and payment methods for invoices and transactions
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
            New Payment Term
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Terms</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalPaymentTerms || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-green-600"
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
            <p class="text-sm font-medium text-gray-500">Active Terms</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activePaymentTerms || 0 }}</p>
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">With Discount</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.termsWithDiscount || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Avg Net Days</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ Math.round(stats?.averageNetDays || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
      >
        <div class="flex-1 max-w-lg">
          <label for="search" class="sr-only">Search payment terms</label>
          <div class="relative">
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
                ></path>
              </svg>
            </div>
            <input
              id="search"
              v-model="searchQuery"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue text-sm"
              placeholder="Search payment terms..."
            />
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <select
            v-model="selectedType"
            class="rounded-md border-gray-300 text-sm focus:border-sap-blue focus:ring-sap-blue"
          >
            <option value="">All Types</option>
            <option value="NET_DAYS">Net Days</option>
            <option value="END_OF_MONTH">End of Month</option>
            <option value="FIXED_DATE">Fixed Date</option>
            <option value="IMMEDIATE">Immediate</option>
            <option value="CUSTOM">Custom</option>
          </select>

          <select
            v-model="selectedPaymentMethod"
            class="rounded-md border-gray-300 text-sm focus:border-sap-blue focus:ring-sap-blue"
          >
            <option value="">All Methods</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="CHECK">Check</option>
            <option value="CASH">Cash</option>
            <option value="CREDIT_CARD">Credit Card</option>
            <option value="ELECTRONIC_PAYMENT">Electronic Payment</option>
            <option value="WIRE_TRANSFER">Wire Transfer</option>
            <option value="OTHER">Other</option>
          </select>

          <button @click="clearFilters" class="px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Payment Terms Table -->
    <div class="bg-white border border-gray-200 rounded-lg shadow">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Term
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment Method
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
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="paymentTerm in paymentTerms" :key="paymentTerm.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ paymentTerm.name }}</div>
                  <div class="text-xs text-gray-400">{{ paymentTerm.code }}</div>
                  <div v-if="paymentTerm.description" class="text-xs text-gray-500 mt-1">
                    {{ paymentTerm.description }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': paymentTerm.type === 'NET_DAYS',
                    'bg-green-100 text-green-800': paymentTerm.type === 'END_OF_MONTH',
                    'bg-yellow-100 text-yellow-800': paymentTerm.type === 'FIXED_DATE',
                    'bg-red-100 text-red-800': paymentTerm.type === 'IMMEDIATE',
                    'bg-gray-100 text-gray-800': paymentTerm.type === 'CUSTOM',
                  }"
                >
                  {{ formatType(paymentTerm.type) }}
                </span>
                <div v-if="paymentTerm.type === 'NET_DAYS'" class="text-xs text-gray-500 mt-1">
                  {{ paymentTerm.netDays }} days
                </div>
                <div v-if="paymentTerm.discountPercent" class="text-xs text-green-600 mt-1">
                  {{ paymentTerm.discountPercent }}% discount
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPaymentMethod(paymentTerm.paymentMethod) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ paymentTerm.currency }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center space-x-2">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': paymentTerm.isActive,
                      'bg-red-100 text-red-800': !paymentTerm.isActive,
                    }"
                  >
                    {{ paymentTerm.isActive ? 'Active' : 'Inactive' }}
                  </span>
                  <span
                    v-if="paymentTerm.isDefault"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-sap-blue text-white"
                  >
                    Default
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewPaymentTerm(paymentTerm)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editPaymentTerm(paymentTerm)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="!paymentTerm.isDefault"
                    @click="setDefaultPaymentTerm(paymentTerm.id)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    Set Default
                  </button>
                  <button
                    @click="duplicatePaymentTerm(paymentTerm)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                  <button
                    @click="deletePaymentTerm(paymentTerm.id)"
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

    <!-- Payment Term Form Modal -->
    <div v-if="showFormModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ paymentTermToEdit ? 'Edit Payment Term' : 'Create New Payment Term' }}
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
                <PaymentTermForm
                  :payment-term="paymentTermToEdit"
                  :loading="isFormLoading"
                  @submit="handleSubmitPaymentTerm"
                  @cancel="closeFormModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Term View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
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
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Payment Term Details</h3>
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
                <PaymentTermView v-if="selectedPaymentTerm" :payment-term="selectedPaymentTerm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Duplicate Payment Term Modal -->
    <div v-if="showDuplicateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                  Duplicate Payment Term
                </h3>
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">New Code *</label>
                    <input
                      v-model="duplicateData.code"
                      type="text"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:border-sap-blue focus:ring-2 focus:ring-sap-blue text-sm"
                      placeholder="NET45"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">New Name *</label>
                    <input
                      v-model="duplicateData.name"
                      type="text"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm text-gray-900 placeholder-gray-400 focus:border-sap-blue focus:ring-2 focus:ring-sap-blue text-sm"
                      placeholder="Net 45 Days"
                    />
                  </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="closeDuplicateModal"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleDuplicatePaymentTerm"
                    :disabled="!duplicateData.code || !duplicateData.name"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Duplicate
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePaymentTermStore } from '../stores'
import PaymentTermForm from '../components/PaymentTermForm.vue'
import PaymentTermView from '../components/PaymentTermView.vue'
import type { PaymentTerm, PaymentTermFormData } from '../types'
import { PaymentTermType, PaymentMethod } from '../types'

const paymentTermStore = usePaymentTermStore()

// Computed properties
const paymentTerms = computed(() => paymentTermStore.paymentTerms)
const stats = computed(() => paymentTermStore.stats)
const pagination = computed(() => paymentTermStore.pagination)

// Local state
const showFormModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const paymentTermToEdit = ref<PaymentTerm | null>(null)
const selectedPaymentTerm = ref<PaymentTerm | null>(null)
const paymentTermToDuplicate = ref<PaymentTerm | null>(null)
const isFormLoading = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedPaymentMethod = ref('')

// Duplicate modal data
const duplicateData = ref({
  code: '',
  name: '',
})

// Methods
const openCreateForm = () => {
  paymentTermToEdit.value = null
  showFormModal.value = true
}

const viewPaymentTerm = (paymentTerm: PaymentTerm) => {
  selectedPaymentTerm.value = paymentTerm
  showViewModal.value = true
}

const editPaymentTerm = (paymentTerm: PaymentTerm) => {
  paymentTermToEdit.value = paymentTerm
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  paymentTermToEdit.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedPaymentTerm.value = null
}

const duplicatePaymentTerm = (paymentTerm: PaymentTerm) => {
  paymentTermToDuplicate.value = paymentTerm
  duplicateData.value.code = `${paymentTerm.code}_COPY`
  duplicateData.value.name = `${paymentTerm.name} (Copy)`
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  paymentTermToDuplicate.value = null
  duplicateData.value.code = ''
  duplicateData.value.name = ''
}

const handleSubmitPaymentTerm = async (data: PaymentTermFormData) => {
  try {
    isFormLoading.value = true

    if (paymentTermToEdit.value) {
      await paymentTermStore.updatePaymentTerm(paymentTermToEdit.value.id, data)
    } else {
      await paymentTermStore.createPaymentTerm(data)
    }

    closeFormModal()
    await loadPaymentTerms()
    await loadPaymentTermStats()
  } catch (error) {
    console.error('Error submitting payment term:', error)
  } finally {
    isFormLoading.value = false
  }
}

const handleDuplicatePaymentTerm = async () => {
  if (!paymentTermToDuplicate.value) return

  try {
    await paymentTermStore.duplicatePaymentTerm(
      paymentTermToDuplicate.value.id,
      duplicateData.value.code,
      duplicateData.value.name,
    )
    closeDuplicateModal()
    await loadPaymentTerms()
    await loadPaymentTermStats()
  } catch (error) {
    console.error('Error duplicating payment term:', error)
  }
}

const deletePaymentTerm = async (id: string) => {
  if (!confirm('Are you sure you want to delete this payment term?')) return

  try {
    await paymentTermStore.deletePaymentTerm(id)
    await loadPaymentTerms()
    await loadPaymentTermStats()
  } catch (error) {
    console.error('Error deleting payment term:', error)
  }
}

const setDefaultPaymentTerm = async (id: string) => {
  try {
    await paymentTermStore.setDefaultPaymentTerm(id)
    await loadPaymentTerms()
    await loadPaymentTermStats()
  } catch (error) {
    console.error('Error setting default payment term:', error)
  }
}

// Pagination methods
const nextPage = () => {
  paymentTermStore.nextPage()
  loadPaymentTerms()
}

const previousPage = () => {
  paymentTermStore.previousPage()
  loadPaymentTerms()
}

// Filter methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedPaymentMethod.value = ''
  paymentTermStore.clearFilters()
  loadPaymentTerms()
}

// Watch for filter changes
watch([searchQuery, selectedType, selectedPaymentMethod], () => {
  const filters: any = {}

  if (searchQuery.value.trim()) {
    filters.search = searchQuery.value.trim()
  }

  if (selectedType.value) {
    filters.type = [selectedType.value]
  }

  if (selectedPaymentMethod.value) {
    filters.paymentMethod = [selectedPaymentMethod.value]
  }

  paymentTermStore.setFilters(filters)
  loadPaymentTerms()
})

// Load data
const loadPaymentTerms = async () => {
  await paymentTermStore.loadPaymentTerms()
}

const loadPaymentTermStats = async () => {
  await paymentTermStore.loadPaymentTermStats()
}

// Utility functions
const formatType = (type: string): string => {
  switch (type) {
    case 'NET_DAYS':
      return 'Net Days'
    case 'END_OF_MONTH':
      return 'End of Month'
    case 'FIXED_DATE':
      return 'Fixed Date'
    case 'IMMEDIATE':
      return 'Immediate'
    case 'CUSTOM':
      return 'Custom'
    default:
      return type
  }
}

const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'CHECK':
      return 'Check'
    case 'CASH':
      return 'Cash'
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'ELECTRONIC_PAYMENT':
      return 'Electronic Payment'
    case 'WIRE_TRANSFER':
      return 'Wire Transfer'
    case 'OTHER':
      return 'Other'
    default:
      return method
  }
}

// Initialize
onMounted(async () => {
  await loadPaymentTerms()
  await loadPaymentTermStats()
})
</script>
