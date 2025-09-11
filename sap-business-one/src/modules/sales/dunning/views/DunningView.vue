<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Dunning Letters</h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage dunning letters for overdue invoices and payment collections
        </p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Create Dunning Letter
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Dunning Letters</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.total }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.draft + stats.sent }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Collection Rate</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats.collectionRate }}%</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ formatCurrency(stats.totalAmount) }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Filters</h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.status"
              multiple
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option v-for="status in Object.values(DunningStatus)" :key="status" :value="status">
                {{ status }}
              </option>
            </select>
          </div>

          <!-- Level Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Level</label>
            <select
              v-model="filters.level"
              multiple
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Levels</option>
              <option v-for="level in Object.values(DunningLevel)" :key="level" :value="level">
                {{ level }}
              </option>
            </select>
          </div>

          <!-- Customer Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="filters.customerCode"
              type="text"
              placeholder="Customer code..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Date Range -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date From</label>
            <input
              v-model="filters.dateFrom"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Date To -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date To</label>
            <input
              v-model="filters.dateTo"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Search -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search dunning letters..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <!-- Actions -->
          <div class="flex items-end space-x-3">
            <button
              @click="applyFilters"
              class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
            <button
              @click="clearFilters"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Dunning Letters</h3>
          <div class="flex items-center space-x-3">
            <button
              @click="exportData"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Export
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
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
                Level
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Dunning Date
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
            <tr v-for="dunning in dunningLetters" :key="dunning.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ dunning.docNum }}</div>
                <div class="text-sm text-gray-500">{{ dunning.docEntry }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ dunning.customerName }}</div>
                <div class="text-sm text-gray-500">{{ dunning.customerCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getLevelBadgeClass(dunning.level)"
                >
                  {{ dunning.level }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(dunning.status)"
                >
                  {{ dunning.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(dunning.dunningDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(dunning.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button @click="viewDetails(dunning)" class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button
                    @click="editDunning(dunning)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteDunning(dunning.id)"
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
      <div
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage >= totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * pageSize, total) }}</span>
              of
              <span class="font-medium">{{ total }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                :class="[
                  page === currentPage
                    ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage >= totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <DunningForm
              :initial-data="editingDunning"
              :loading="loading"
              @submit="handleDunningSaved"
              @cancel="closeModal"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Details Modal -->
    <div v-if="showDetailsModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeDetailsModal"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-medium text-gray-900">Dunning Letter Details</h3>
              <button @click="closeDetailsModal" class="text-gray-400 hover:text-gray-600">
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
            <div v-if="selectedDunning" class="space-y-6">
              <!-- Basic Information -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Document Number</h4>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedDunning.docNum }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Customer</h4>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedDunning.customerName }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Level</h4>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedDunning.level }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Status</h4>
                  <p class="mt-1 text-sm text-gray-900">{{ selectedDunning.status }}</p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Dunning Date</h4>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatDate(selectedDunning.dunningDate) }}
                  </p>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500">Total Amount</h4>
                  <p class="mt-1 text-sm text-gray-900">
                    {{ formatCurrency(selectedDunning.totalAmount) }}
                  </p>
                </div>
              </div>

              <!-- Line Items -->
              <div>
                <h4 class="text-sm font-medium text-gray-500 mb-3">Overdue Invoices</h4>
                <div class="overflow-x-auto">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Invoice
                        </th>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Due Date
                        </th>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Original Amount
                        </th>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Outstanding
                        </th>
                        <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                          Dunning Fee
                        </th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                      <tr v-for="item in selectedDunning.lineItems" :key="item.id">
                        <td class="px-3 py-2 text-sm text-gray-900">{{ item.invoiceNumber }}</td>
                        <td class="px-3 py-2 text-sm text-gray-900">
                          {{ formatDate(item.dueDate) }}
                        </td>
                        <td class="px-3 py-2 text-sm text-gray-900">
                          {{ formatCurrency(item.originalAmount) }}
                        </td>
                        <td class="px-3 py-2 text-sm text-gray-900">
                          {{ formatCurrency(item.openAmount) }}
                        </td>
                        <td class="px-3 py-2 text-sm text-gray-900">
                          {{ formatCurrency(item.dunningFee) }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
import { ref, computed, onMounted } from 'vue'
import { DunningLevel, DunningStatus, DunningType, Currency } from '../types'
import type { Dunning, DunningFormData, DunningFilters } from '../types'
import DunningForm from '../components/DunningForm.vue'

// State
const dunningLetters = ref<Dunning[]>([])
const stats = ref({
  total: 0,
  draft: 0,
  sent: 0,
  acknowledged: 0,
  partialPayment: 0,
  fullPayment: 0,
  cancelled: 0,
  closed: 0,
  totalAmount: 0,
  averageAmount: 0,
  collectionRate: 0,
})

// Filters
const filters = ref<DunningFilters>({
  status: [],
  level: [],
  type: [],
  customerCode: '',
  salesPerson: '',
  dateFrom: '',
  dateTo: '',
  search: '',
})

// Pagination
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)

// Modals
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showDetailsModal = ref(false)
const editingDunning = ref<DunningFormData | undefined>()
const selectedDunning = ref<Dunning | null>(null)

// Loading state
const loading = ref(false)

// Computed properties
const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const fetchDunningLetters = async () => {
  loading.value = true
  try {
    // TODO: Implement actual API call
    const mockData: Dunning[] = [
      {
        id: 'DUN001',
        docNum: 'DUN-2024-001',
        docEntry: 1001,
        dunningDate: '2024-01-15',
        postingDate: '2024-01-15',
        level: DunningLevel.LEVEL_1,
        type: DunningType.OVERDUE_INVOICE,
        status: DunningStatus.SENT,
        customerCode: 'CUST001',
        customerName: 'Acme Corporation',
        customerAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
        },
        currency: Currency.USD,
        exchangeRate: 1,
        subtotal: 1500,
        dunningFees: 75,
        interestTotal: 0,
        totalAmount: 1575,
        lineItems: [
          {
            id: 'LI001',
            invoiceId: 'INV001',
            invoiceNumber: 'INV-2024-001',
            invoiceDate: '2024-01-01',
            dueDate: '2024-01-15',
            originalAmount: 1500,
            openAmount: 1500,
            overdueDays: 30,
            dunningFee: 75,
            interestAmount: 0,
            totalAmount: 1575,
          },
        ],
        createdBy: 'admin',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
    ]

    dunningLetters.value = mockData
    total.value = mockData.length
  } catch (error) {
    console.error('Error fetching dunning letters:', error)
  } finally {
    loading.value = false
  }
}

const fetchStats = async () => {
  try {
    // TODO: Implement actual API call
    stats.value = {
      total: 25,
      draft: 5,
      sent: 10,
      acknowledged: 3,
      partialPayment: 2,
      fullPayment: 3,
      cancelled: 1,
      closed: 1,
      totalAmount: 125000,
      averageAmount: 5000,
      collectionRate: 85,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
  }
}

const applyFilters = () => {
  currentPage.value = 1
  fetchDunningLetters()
}

const clearFilters = () => {
  filters.value = {
    status: [],
    level: [],
    type: [],
    customerCode: '',
    salesPerson: '',
    dateFrom: '',
    dateTo: '',
    search: '',
  }
  currentPage.value = 1
  fetchDunningLetters()
}

const exportData = () => {
  // TODO: Implement export functionality
  console.log('Export data:', filters.value)
}

const viewDetails = (dunning: Dunning) => {
  selectedDunning.value = dunning
  showDetailsModal.value = true
}

const editDunning = (dunning: Dunning) => {
  editingDunning.value = {
    customerCode: dunning.customerCode,
    dunningDate: dunning.dunningDate,
    postingDate: dunning.postingDate,
    level: dunning.level,
    type: dunning.type,
    currency: dunning.currency,
    exchangeRate: dunning.exchangeRate,
    reference: dunning.reference,
    remarks: dunning.remarks,
    lineItems: dunning.lineItems.map((item) => ({
      invoiceId: item.invoiceId,
      invoiceNumber: item.invoiceNumber,
      invoiceDate: item.invoiceDate,
      dueDate: item.dueDate,
      originalAmount: item.originalAmount,
      openAmount: item.openAmount,
      overdueDays: item.overdueDays,
      dunningFee: item.dunningFee,
      interestAmount: item.interestAmount,
      remarks: item.remarks,
    })),
  }
  showEditModal.value = true
}

const deleteDunning = async (id: string) => {
  if (!confirm('Are you sure you want to delete this dunning letter?')) return

  try {
    // TODO: Implement actual API call
    console.log('Deleting dunning letter:', id)
    await fetchDunningLetters()
  } catch (error) {
    console.error('Error deleting dunning letter:', error)
  }
}

const handleDunningSaved = async (data: DunningFormData) => {
  try {
    // TODO: Implement actual API call
    console.log('Saving dunning letter:', data)
    await fetchDunningLetters()
    closeModal()
  } catch (error) {
    console.error('Error saving dunning letter:', error)
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showEditModal.value = false
  editingDunning.value = undefined
}

const closeDetailsModal = () => {
  showDetailsModal.value = false
  selectedDunning.value = null
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchDunningLetters()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchDunningLetters()
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  fetchDunningLetters()
}

const getLevelBadgeClass = (level: DunningLevel) => {
  switch (level) {
    case DunningLevel.LEVEL_1:
      return 'bg-blue-100 text-blue-800'
    case DunningLevel.LEVEL_2:
      return 'bg-yellow-100 text-yellow-800'
    case DunningLevel.LEVEL_3:
      return 'bg-orange-100 text-orange-800'
    case DunningLevel.FINAL_NOTICE:
      return 'bg-red-100 text-red-800'
    case DunningLevel.LEGAL_ACTION:
      return 'bg-purple-100 text-purple-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getStatusBadgeClass = (status: DunningStatus) => {
  switch (status) {
    case DunningStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case DunningStatus.SENT:
      return 'bg-blue-100 text-blue-800'
    case DunningStatus.ACKNOWLEDGED:
      return 'bg-yellow-100 text-yellow-800'
    case DunningStatus.PARTIAL_PAYMENT:
      return 'bg-orange-100 text-orange-800'
    case DunningStatus.FULL_PAYMENT:
      return 'bg-green-100 text-green-800'
    case DunningStatus.CANCELLED:
      return 'bg-red-100 text-red-800'
    case DunningStatus.CLOSED:
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const formatDate = (date: string) => {
  if (!date) return ''
  return new Date(date).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount || 0)
}

// Lifecycle
onMounted(() => {
  fetchDunningLetters()
  fetchStats()
})
</script>
