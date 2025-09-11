<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Goods Receipt POs</h1>
        <p class="text-sm text-gray-600">Receive goods against purchase orders</p>
      </div>
      <div class="flex space-x-3">
        <button @click="createReceipt" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Receipt
        </button>
        <button @click="loadReceiptStats" class="btn-secondary">
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Receipts</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalReceipts || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Draft Receipts</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.draftReceipts || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Posted Receipts</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.postedReceipts || 0 }}</p>
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
              <option v-for="status in receiptStatuses" :key="status" :value="status">
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
              <option v-for="type in receiptTypes" :key="type" :value="type">
                {{ formatReceiptType(type) }}
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
              placeholder="Search receipts..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
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

            <!-- Project Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project</label>
              <input
                v-model="projectFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Project code..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Date and Amount Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Receipt Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Date Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="receiptDateFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="receiptDateToFilter"
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
                  Type: {{ formatReceiptType(selectedType) }}
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

    <!-- Goods Receipts Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
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
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading goods receipts...
        </div>
      </div>

      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Goods Receipts</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="retryLoad" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="receipts.length === 0" class="p-8 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            ></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Goods Receipts Found</p>
        <p class="text-sm text-gray-600 mb-4">Get started by creating your first goods receipt.</p>
        <button @click="createReceipt" class="btn-primary mt-4">Create Receipt</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Receipt
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                PO Number
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Receipt Date
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
            <tr v-for="receipt in receipts" :key="receipt.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ receipt.docNum }}</div>
                  <div class="text-sm text-gray-500">{{ receipt.receiptNumber }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ receipt.vendorName }}</div>
                  <div class="text-sm text-gray-500">{{ receipt.vendorCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ receipt.purchaseOrderNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getReceiptTypeBadgeClass(receipt.type)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatReceiptType(receipt.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(receipt.receiptDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ receipt.warehouseName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(receipt.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(receipt.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStatus(receipt.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewReceipt(receipt)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editReceipt(receipt)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button @click="deleteReceipt(receipt.id)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="pagination.totalPages > 1"
        class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasMore"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
                to
                <span class="font-medium">{{
                  Math.min(pagination.page * pagination.limit, pagination.total)
                }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
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
                  @click="nextPage"
                  :disabled="!pagination.hasMore"
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
    </div>

    <!-- Create/Edit Receipt Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showCreateForm ? 'Create New Receipt' : 'Edit Receipt' }}
          </h3>
          <!-- Receipt Form Component -->
          <GoodsReceiptForm
            :initial-data="receiptToEdit ? convertToFormData(receiptToEdit) : undefined"
            @submit="handleSubmitReceipt"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- View Receipt Modal -->
    <div
      v-if="selectedReceipt"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Receipt Details</h3>
            <button @click="selectedReceipt = null" class="text-gray-400 hover:text-gray-600">
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
          <!-- Receipt Details Component -->
          <GoodsReceiptViewComponent v-if="selectedReceipt" :receipt="selectedReceipt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useGoodsReceiptStore } from '../stores'
import GoodsReceiptForm from '../components/GoodsReceiptForm.vue'
import GoodsReceiptViewComponent from '../components/GoodsReceiptView.vue'
import { GoodsReceiptStatus, ReceiptType } from '../types'
import type { GoodsReceipt, GoodsReceiptFormData } from '../types'

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const selectedReceipt = ref<GoodsReceipt | null>(null)
const receiptToEdit = ref<GoodsReceipt | null>(null)
const searchQuery = ref('')
const selectedStatus = ref<GoodsReceiptStatus | ''>('')
const selectedType = ref<ReceiptType | ''>('')
const showAdvancedFilters = ref(false)

// Additional filter variables
const vendorFilter = ref('')
const warehouseFilter = ref('')
const departmentFilter = ref('')
const costCenterFilter = ref('')
const projectFilter = ref('')
const receiptDateFromFilter = ref('')
const receiptDateToFilter = ref('')
const postingDateFromFilter = ref('')
const postingDateToFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')

// Store integration
const store = useGoodsReceiptStore()

// Computed properties from store
const receipts = computed(() => store.receipts)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats?.data || null)
const pagination = computed(() => store.pagination)

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    searchQuery.value ||
    vendorFilter.value ||
    warehouseFilter.value ||
    departmentFilter.value ||
    costCenterFilter.value ||
    projectFilter.value ||
    receiptDateFromFilter.value ||
    receiptDateToFilter.value ||
    postingDateFromFilter.value ||
    postingDateToFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value
  )
})

// Constants
const receiptStatuses = Object.values(GoodsReceiptStatus)
const receiptTypes = Object.values(ReceiptType)

// Lifecycle
onMounted(async () => {
  await loadReceipts()
  await loadReceiptStats()
})

// Methods
const loadReceipts = async () => {
  try {
    await store.loadReceipts()
  } catch (err) {
    console.error('Failed to load receipts:', err)
  }
}

const loadReceiptStats = async () => {
  try {
    await store.loadReceiptStats()
  } catch (err) {
    console.error('Failed to load statistics:', err)
  }
}

const createReceipt = () => {
  receiptToEdit.value = null
  showCreateForm.value = true
}

const editReceipt = (receipt: GoodsReceipt) => {
  receiptToEdit.value = receipt
  showEditForm.value = true
}

const viewReceipt = (receipt: GoodsReceipt) => {
  selectedReceipt.value = receipt
}

const deleteReceipt = async (id: string) => {
  if (confirm('Are you sure you want to delete this receipt?')) {
    try {
      await store.deleteReceipt(id)
      await loadReceipts()
      await loadReceiptStats()
    } catch (err) {
      console.error('Failed to delete receipt:', err)
    }
  }
}

const handleSubmitReceipt = async (data: GoodsReceiptFormData) => {
  try {
    if (receiptToEdit.value) {
      await store.updateReceipt(receiptToEdit.value.id, data)
    } else {
      await store.createReceipt(data)
    }
    closeForms()
    await loadReceipts()
    await loadReceiptStats()
  } catch (err) {
    console.error('Error saving receipt:', err)
  }
}

const convertToFormData = (receipt: GoodsReceipt): GoodsReceiptFormData => {
  return {
    receiptNumber: receipt.receiptNumber,
    receiptDate: receipt.receiptDate,
    postingDate: receipt.postingDate,
    type: receipt.type,
    currency: receipt.currency,
    vendorCode: receipt.vendorCode,
    purchaseOrderId: receipt.purchaseOrderId,
    warehouseCode: receipt.warehouseCode,
    department: receipt.department,
    costCenter: receipt.costCenter,
    projectCode: receipt.projectCode || '',
    notes: receipt.notes || '',
    lineItems: receipt.lineItems.map((item) => ({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      orderedQuantity: item.orderedQuantity,
      receivedQuantity: item.receivedQuantity,
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
      qualityStatus: item.qualityStatus,
      qualityNotes: item.qualityNotes || '',
      vendorNotes: item.vendorNotes || '',
    })),
  }
}

const closeForms = () => {
  showCreateForm.value = false
  showEditForm.value = false
  receiptToEdit.value = null
}

const handleFilterChange = async () => {
  await loadReceipts()
  await loadReceiptStats()
}

const resetFilters = async () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  vendorFilter.value = ''
  warehouseFilter.value = ''
  departmentFilter.value = ''
  costCenterFilter.value = ''
  projectFilter.value = ''
  receiptDateFromFilter.value = ''
  receiptDateToFilter.value = ''
  postingDateFromFilter.value = ''
  postingDateToFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  await handleFilterChange()
}

const retryLoad = async () => {
  await loadReceipts()
  await loadReceiptStats()
}

const previousPage = async () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    await loadReceipts()
  }
}

const nextPage = async () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    await loadReceipts()
  }
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

const formatStatus = (status: GoodsReceiptStatus): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReceiptType = (type: ReceiptType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: GoodsReceiptStatus): string => {
  const classes = {
    [GoodsReceiptStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [GoodsReceiptStatus.POSTED]: 'bg-green-100 text-green-800',
    [GoodsReceiptStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [GoodsReceiptStatus.ON_HOLD]: 'bg-orange-100 text-orange-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getReceiptTypeBadgeClass = (type: ReceiptType): string => {
  const classes = {
    [ReceiptType.FULL]: 'bg-blue-100 text-blue-800',
    [ReceiptType.PARTIAL]: 'bg-yellow-100 text-yellow-800',
    [ReceiptType.OVER_RECEIPT]: 'bg-purple-100 text-purple-800',
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}
</script>
