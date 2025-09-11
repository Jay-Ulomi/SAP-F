<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Sales Quotations</h1>
        <p class="text-sm text-gray-600">Create, manage, and track customer quotations</p>
      </div>
      <button @click="showFormModal = true" class="btn-primary">New Quotation</button>
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
              @click="clearFilters"
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
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
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

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              v-model="selectedType"
              @change="updateFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option value="STANDARD">Standard</option>
              <option value="SPECIAL_PRICING">Special Pricing</option>
              <option value="VOLUME_DISCOUNT">Volume Discount</option>
              <option value="PROMOTIONAL">Promotional</option>
            </select>
          </div>

          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchTerm"
              @input="updateFilters"
              type="text"
              placeholder="Search quotations..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Customer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="customerFilter"
              @input="updateFilters"
              type="text"
              placeholder="Customer code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Sales Person Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Person</label>
              <input
                v-model="salesPersonFilter"
                @input="updateFilters"
                type="text"
                placeholder="Sales person..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Priority Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                v-model="priorityFilter"
                @change="updateFilters"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <!-- Currency Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                v-model="currencyFilter"
                @change="updateFilters"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Currencies</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            <!-- Amount Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="minAmountFilter"
                  @input="updateFilters"
                  type="number"
                  placeholder="Min"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="maxAmountFilter"
                  @input="updateFilters"
                  type="number"
                  placeholder="Max"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>
          </div>

          <!-- Date Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Quotation Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Quotation Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="dateFromFilter"
                  @change="updateFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="dateToFilter"
                  @change="updateFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Valid Until Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Valid Until Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="validUntilFromFilter"
                  @change="updateFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="validUntilToFilter"
                  @change="updateFilters"
                  type="date"
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
                  Status: {{ selectedStatus.replace('_', ' ') }}
                  <button
                    @click="selectedStatus = ''"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="selectedType"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                >
                  Type: {{ selectedType.replace('_', ' ') }}
                  <button
                    @click="selectedType = ''"
                    class="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="customerFilter"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full"
                >
                  Customer: {{ customerFilter }}
                  <button
                    @click="customerFilter = ''"
                    class="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="searchTerm"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                >
                  Search: {{ searchTerm }}
                  <button
                    @click="searchTerm = ''"
                    class="ml-1 text-yellow-600 hover:text-yellow-800"
                  >
                    ×
                  </button>
                </span>
              </div>
            </div>
            <button
              @click="clearFilters"
              class="text-sm text-sap-blue hover:text-sap-dark-blue font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Quotations</h3>
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
      <div v-else class="overflow-x-auto">
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
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Valid Until
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
              class="hover:bg-gray-50"
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
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getTypeBadgeClass(quotation.type)"
                >
                  {{ formatType(quotation.type) }}
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
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewQuotation(quotation)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    View
                  </button>
                  <button
                    @click="editQuotation(quotation)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteQuotation(quotation)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
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

        <div class="space-y-6">
          <!-- Basic Information -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Document Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedQuotation.docNum }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <p class="mt-1">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="getStatusBadgeClass(selectedQuotation.status)"
                >
                  {{ formatStatus(selectedQuotation.status) }}
                </span>
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ selectedQuotation.customerName }}</p>
              <p class="text-xs text-gray-500">{{ selectedQuotation.customerCode }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Quotation Date</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ formatDate(selectedQuotation.quotationDate) }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Valid Until</label>
              <p class="mt-1 text-sm text-gray-900">
                {{ formatDate(selectedQuotation.validUntil) }}
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Total Amount</label>
              <p class="mt-1 text-lg font-semibold text-sap-blue">
                {{ formatCurrency(selectedQuotation.totalAmount, selectedQuotation.currency) }}
              </p>
            </div>
          </div>

          <!-- Line Items -->
          <div>
            <h4 class="text-md font-medium text-gray-900 mb-3">Line Items</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Item
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Description
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Unit Price
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Line Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in selectedQuotation.lineItems" :key="item.id">
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.itemCode }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.description }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.quantity }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">
                      {{ formatCurrency(item.unitPrice, selectedQuotation.currency) }}
                    </td>
                    <td class="px-3 py-2 text-sm font-medium text-gray-900">
                      {{ formatCurrency(item.lineTotal, selectedQuotation.currency) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Totals -->
          <div class="bg-gray-50 p-4 rounded-lg">
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal:</span>
                <span class="font-medium">{{
                  formatCurrency(selectedQuotation.subtotal, selectedQuotation.currency)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Discount Total:</span>
                <span class="font-medium">{{
                  formatCurrency(selectedQuotation.discountTotal, selectedQuotation.currency)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Tax Total:</span>
                <span class="font-medium">{{
                  formatCurrency(selectedQuotation.taxTotal, selectedQuotation.currency)
                }}</span>
              </div>
              <div class="border-t pt-2">
                <div class="flex justify-between">
                  <span class="text-lg font-semibold text-gray-900">Total Amount:</span>
                  <span class="text-lg font-semibold text-sap-blue">
                    {{ formatCurrency(selectedQuotation.totalAmount, selectedQuotation.currency) }}
                  </span>
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
import { useQuotationsStore } from '../stores/quotationsStore'
import QuotationForm from '../components/QuotationForm.vue'
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
const customerFilter = ref('')
const salesPersonFilter = ref('')
const dateFromFilter = ref('')
const dateToFilter = ref('')
const currencyFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')
const priorityFilter = ref('')
const validUntilFromFilter = ref('')
const validUntilToFilter = ref('')
const showAdvancedFilters = ref(false)

// Computed Properties
const quotations = computed(() => quotationsStore.quotations)
const stats = computed(() => quotationsStore.stats)
const pagination = computed(() => quotationsStore.pagination)
// Loading state available from store if needed

const paginatedQuotations = computed(() => {
  return quotations.value
})

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    searchTerm.value ||
    customerFilter.value ||
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
  customerFilter.value = ''
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

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
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

// Lifecycle
onMounted(async () => {
  await Promise.all([quotationsStore.fetchQuotations(), quotationsStore.fetchStats()])
})
</script>
