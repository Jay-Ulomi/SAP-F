<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Journal Entries</h1>
        <p class="text-gray-600 mt-1">
          Manage your company's journal entries and accounting transactions
        </p>
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
        New Journal Entry
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
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
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Entries</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalEntries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Posted</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.postedEntries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Draft</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.draftEntries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
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
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Amount</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats.totalDebit) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search entries by reference, memo, or account..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            @input="handleSearch"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedStatus"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option v-for="status in entryStatuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <select
            v-model="selectedType"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option v-for="type in entryTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
          <input
            v-model="dateFrom"
            type="date"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <input
            v-model="dateTo"
            type="date"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Journal Entries List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Journal Entries</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Reference
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
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
                Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="entry in entries" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ entry.entryNumber }}</div>
                <div class="text-sm text-gray-500">{{ entry.reference }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(entry.postingDate) }}</div>
                <div v-if="entry.dueDate" class="text-sm text-gray-500">
                  Due: {{ formatDate(entry.dueDate) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getEntryTypeBadgeClass(entry.type)"
                >
                  {{ entry.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(entry.status)"
                >
                  {{ entry.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatCurrency(entry.totalDebit) }}</div>
                <div class="text-xs text-gray-500">{{ entry.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewEntry(entry)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button
                    v-if="entry.status === 'Draft'"
                    @click="editEntry(entry)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="entry.status === 'Draft'"
                    @click="postEntry(entry.id)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Post
                  </button>
                  <button
                    v-if="entry.status === 'Draft'"
                    @click="copyEntry(entry.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Copy
                  </button>
                  <button
                    v-if="entry.status === 'Draft'"
                    @click="deleteEntry(entry.id)"
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
      <div v-if="pagination.totalPages > 1" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.pageSize + 1 }} to
            {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.totalPages"
              class="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
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
            {{ editingItem ? 'Edit Journal Entry' : 'Create New Journal Entry' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
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

        <JournalEntryForm
          :initial-data="editingItem || undefined"
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
          <h3 class="text-lg font-medium text-gray-900">Journal Entry Details</h3>
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

        <div v-if="selectedItem" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">Entry Information</h4>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Entry Number</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.entryNumber }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Reference</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.reference }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Posting Date</dt>
                  <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.postingDate) }}</dd>
                </div>
                <div v-if="selectedItem.dueDate">
                  <dt class="text-sm font-medium text-gray-500">Due Date</dt>
                  <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.dueDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Entry Type</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.type }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Currency</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.currency }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Exchange Rate</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.exchangeRate }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Memo</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.memo }}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 class="text-lg font-medium text-gray-900 mb-4">Status & Totals</h4>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Status</dt>
                  <dd class="text-sm">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusBadgeClass(selectedItem.status)"
                    >
                      {{ selectedItem.status }}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Total Debit</dt>
                  <dd class="text-sm text-gray-900">{{ formatCurrency(selectedItem.totalDebit) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Total Credit</dt>
                  <dd class="text-sm text-gray-900">{{ formatCurrency(selectedItem.totalCredit) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Balance</dt>
                  <dd class="text-sm text-gray-900">
                    <span :class="selectedItem.isBalanced ? 'text-green-600' : 'text-red-600'">
                      {{ formatCurrency(selectedItem.totalDebit - selectedItem.totalCredit) }}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Posted</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.isPosted ? 'Yes' : 'No' }}</dd>
                </div>
                <div v-if="selectedItem.postedDate">
                  <dt class="text-sm font-medium text-gray-500">Posted Date</dt>
                  <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.postedDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Created</dt>
                  <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.createdDate) }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Modified</dt>
                  <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.modifiedDate) }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-3">
            <button
              v-if="selectedItem.status === 'Draft'"
              @click="openEditModal(selectedItem)"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Edit
            </button>
            <button
              v-if="selectedItem.status === 'Draft'"
              @click="postEntry(selectedItem.id)"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Post Entry
            </button>
          </div>

          <!-- Line Items -->
          <div class="mt-8">
            <h4 class="text-lg font-medium text-gray-900 mb-4">Line Items</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Debit
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Credit
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Memo
                    </th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tax Code
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="line in selectedItem.lineItems" :key="line.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ line.accountCode }}</div>
                      <div class="text-sm text-gray-500">{{ line.accountName }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ line.debitAmount > 0 ? formatCurrency(line.debitAmount) : '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ line.creditAmount > 0 ? formatCurrency(line.creditAmount) : '-' }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">
                      {{ line.memo || '-' }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ line.taxCode || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
        <span class="ml-3 text-gray-600">Loading journal entries...</span>
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Journal Entries</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useJournalEntriesStore } from '../stores/journalEntriesStore'
import JournalEntryForm from '../components/JournalEntryForm.vue'
import type { JournalEntry, JournalEntryFormData } from '../types'
import { JournalEntryStatus, JournalEntryType } from '../types'

// Store
const store = useJournalEntriesStore()

// Local state
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<JournalEntry | null>(null)
const selectedItem = ref<JournalEntry | null>(null)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedType = ref('')
const dateFrom = ref('')
const dateTo = ref('')

// Computed
const entries = computed(() => store.entries)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)
const stats = computed(() => store.stats)
const entryTypes = computed(() => store.entryTypes)
const entryStatuses = computed(() => store.entryStatuses)

// Methods
const loadEntries = () => {
  store.fetchEntries()
  store.fetchStats()
}

const handleSearch = () => {
  store.fetchEntries(1, pagination.value.pageSize, { search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Record<string, string> = {}
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedType.value) filters.type = selectedType.value
  if (dateFrom.value) filters.dateFrom = dateFrom.value
  if (dateTo.value) filters.dateTo = dateTo.value
  if (searchQuery.value) filters.search = searchQuery.value

  store.fetchEntries(1, pagination.value.pageSize, filters)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  store.resetFilters()
  store.fetchEntries()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    store.fetchEntries(page)
  }
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: JournalEntry) => {
  editingItem.value = item
  isCreateModalOpen.value = true
  closeViewModal()
}

const openViewModal = (item: JournalEntry) => {
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

const handleSubmit = async (data: JournalEntryFormData) => {
  try {
    if (editingItem.value) {
      await store.updateEntry(editingItem.value.id, data)
    } else {
      await store.createEntry(data)
    }
    closeCreateModal()
    // Refresh the list
    store.fetchEntries()
    store.fetchStats()
  } catch (error) {
    console.error('Failed to save journal entry:', error)
  }
}

const deleteEntry = async (id: string) => {
  if (
    !confirm('Are you sure you want to delete this journal entry? This action cannot be undone.')
  ) {
    return
  }

  try {
    await store.deleteEntry(id)
    // Refresh the list
    store.fetchEntries()
    store.fetchStats()
  } catch (error) {
    console.error('Failed to delete journal entry:', error)
  }
}

const postEntry = async (id: string) => {
  if (!confirm('Are you sure you want to post this journal entry? This action cannot be undone.')) {
    return
  }

  try {
    await store.postEntry(id)
    // Refresh the list
    store.fetchEntries()
    store.fetchStats()
  } catch (error) {
    console.error('Failed to post journal entry:', error)
  }
}

const copyEntry = async (id: string) => {
  try {
    await store.copyEntry(id)
    // Refresh the list
    store.fetchEntries()
    store.fetchStats()
    // Show success message
    alert('Journal entry copied successfully!')
  } catch (error) {
    console.error('Failed to copy journal entry:', error)
  }
}

const retryLoad = () => {
  store.clearError()
  loadEntries()
}

const getStatusBadgeClass = (status: JournalEntryStatus) => {
  const classes = {
    [JournalEntryStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [JournalEntryStatus.PENDING_APPROVAL]: 'bg-yellow-100 text-yellow-800',
    [JournalEntryStatus.APPROVED]: 'bg-blue-100 text-blue-800',
    [JournalEntryStatus.POSTED]: 'bg-green-100 text-green-800',
    [JournalEntryStatus.VOIDED]: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getEntryTypeBadgeClass = (type: JournalEntryType) => {
  const classes = {
    [JournalEntryType.GENERAL]: 'bg-blue-100 text-blue-800',
    [JournalEntryType.ADJUSTING]: 'bg-purple-100 text-purple-800',
    [JournalEntryType.CLOSING]: 'bg-orange-100 text-orange-800',
    [JournalEntryType.OPENING]: 'bg-green-100 text-green-800',
    [JournalEntryType.RECURRING]: 'bg-indigo-100 text-indigo-800',
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Lifecycle
onMounted(() => {
  loadEntries()
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
