<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Credit Memos</h1>
        <p class="text-sm text-gray-600">Manage customer credit memos and returns</p>
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Credit Memos</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalCreditMemos || 0 }}</p>
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Applied Amount</p>
            <p class="text-xl font-bold text-gray-900">
              {{ formatCurrency(stats?.appliedAmount || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
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
            <p class="text-sm font-medium text-gray-600">Remaining Amount</p>
            <p class="text-xl font-bold text-gray-900">
              {{ formatCurrency(stats?.remainingAmount || 0) }}
            </p>
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg. Credit Memo Value</p>
            <p class="text-xl font-bold text-gray-900">
              {{ formatCurrency(stats?.averageCreditMemoValue || 0) }}
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
              <option v-for="type in formTypes" :key="type" :value="type">
                {{ type }}
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
              placeholder="Search credit memos..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Customer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="customerFilter"
              @input="handleFilterChange"
              type="text"
              placeholder="Customer code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Reason Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Credit Reason</label>
              <select
                v-model="creditReasonFilter"
                @change="handleFilterChange"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Reasons</option>
                <option value="RETURN">Return</option>
                <option value="PRICE_ADJUSTMENT">Price Adjustment</option>
                <option value="DISCOUNT">Discount</option>
                <option value="DAMAGED_GOODS">Damaged Goods</option>
                <option value="WRONG_ITEM">Wrong Item</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <!-- Sales Person Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Sales Person</label>
              <input
                v-model="salesPersonFilter"
                @input="handleFilterChange"
                type="text"
                placeholder="Sales person..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Currency Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
              <select
                v-model="currencyFilter"
                @change="handleFilterChange"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Currencies</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
              </select>
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
                    class="ml-1 text-green-600 hover:text-blue-800"
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
                    @click="((customerFilter = ''), handleFilterChange())"
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

    <!-- Credit Memos Table -->
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
          Loading credit memos...
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
          <p class="text-lg font-medium">Error Loading Credit Memos</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="retryLoad" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredCreditMemos.length === 0" class="p-8 text-center text-gray-500">
        <svg
          class="w-12 h-12 mx-auto mb-4 text-gray-400"
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
        <p class="text-lg font-medium">No Credit Memos Found</p>
        <p class="text-sm text-gray-600 mt-2">Get started by creating your first credit memo.</p>
        <button @click="createCreditMemo" class="btn-primary mt-4">Create Credit Memo</button>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doc No
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Items
                </th>
                <th
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Warehouse
                </th>
                <th
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Services
                </th>
                <th
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Description
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Applied
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Remaining
                </th>
                <th
                  class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="creditMemo in paginatedCreditMemos"
                :key="creditMemo.id"
                class="hover:bg-gray-50"
              >
                <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ creditMemo.docNum }}</td>
                <td class="px-4 py-3 text-sm text-gray-900">
                  <div>
                    <div class="font-medium">{{ creditMemo.customerName }}</div>
                    <div class="text-gray-500">{{ creditMemo.customerCode }}</div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">
                  {{ formatDate(creditMemo.creditMemoDate) }}
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-4 py-3 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">{{ getItemsSummary(creditMemo) }}</div>
                  <div class="text-xs text-gray-500">{{ getItemCount(creditMemo) }} item(s)</div>
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-4 py-3 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">{{ getPrimaryWarehouse(creditMemo) }}</div>
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-4 py-3 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">{{ getServicesSummary(creditMemo) }}</div>
                  <div class="text-xs text-gray-500">{{ getServiceCount(creditMemo) }} service(s)</div>
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-4 py-3 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">{{ getServiceDescription(creditMemo) }}</div>
                </td>
                <td class="px-4 py-3 text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="creditMemo.type === 'Item' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'"
                  >
                    {{ creditMemo.type || 'Item' }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm">
                  <span
                    :class="getStatusBadgeClass(creditMemo.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ formatStatus(creditMemo.status) }}
                  </span>
                </td>
                <td class="px-4 py-3 text-sm font-medium text-gray-900">
                  {{ formatCurrency(creditMemo.total) }}
                </td>
                <td class="px-4 py-3 text-sm font-medium text-green-600">
                  {{ formatCurrency(creditMemo.appliedAmount) }}
                </td>
                <td
                  class="px-4 py-3 text-sm font-medium"
                  :class="creditMemo.remainingAmount > 0 ? 'text-orange-600' : 'text-green-600'"
                >
                  {{ formatCurrency(creditMemo.remainingAmount) }}
                </td>
                <td class="px-4 py-3 text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewCreditMemo(creditMemo)"
                      class="text-sap-blue hover:text-sap-dark-blue"
                    >
                      View
                    </button>
                    <button
                      @click="editCreditMemo(creditMemo)"
                      class="text-yellow-600 hover:text-yellow-800"
                    >
                      Edit
                    </button>
                    <button
                      @click="deleteCreditMemo(creditMemo.id)"
                      class="text-red-600 hover:text-red-800"
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
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasMore"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
                {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
                {{ pagination.total }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="!pagination.hasMore"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Credit Memo Form Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ showCreateForm ? 'Create New Credit Memo' : 'Edit Credit Memo' }}
          </h3>
          <CreditMemoForm
            :initial-data="creditMemoToEdit"
            :loading="loading"
            @submit="handleSubmitCreditMemo"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- Credit Memo Detail Modal -->
    <div
      v-if="selectedCreditMemo"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Credit Memo Details</h3>
            <button @click="selectedCreditMemo = null" class="text-gray-400 hover:text-gray-600">
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

          <!-- Credit memo detail content here -->
          <div class="grid grid-cols-2 gap-6">
            <div>
              <h4 class="font-medium text-gray-900 mb-2">General Information</h4>
              <dl class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <dt class="text-gray-500">Document Number:</dt>
                  <dd class="font-medium">{{ selectedCreditMemo.docNum }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Customer:</dt>
                  <dd class="font-medium">{{ selectedCreditMemo.customerName }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Status:</dt>
                  <dd>
                    <span
                      :class="getStatusBadgeClass(selectedCreditMemo.status)"
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    >
                      {{ formatStatus(selectedCreditMemo.status) }}
                    </span>
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Total Amount:</dt>
                  <dd class="font-medium">{{ formatCurrency(selectedCreditMemo.total) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Applied Amount:</dt>
                  <dd class="font-medium">
                    {{ formatCurrency(selectedCreditMemo.appliedAmount) }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Remaining Amount:</dt>
                  <dd class="font-medium">
                    {{ formatCurrency(selectedCreditMemo.remainingAmount) }}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 class="font-medium text-gray-900 mb-2">Dates</h4>
              <dl class="space-y-1 text-sm">
                <div class="flex justify-between">
                  <dt class="text-gray-500">Credit Memo Date:</dt>
                  <dd class="font-medium">{{ formatDate(selectedCreditMemo.creditMemoDate) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-500">Posting Date:</dt>
                  <dd class="font-medium">{{ formatDate(selectedCreditMemo.postingDate) }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Line Items -->
          <div class="mt-6">
            <h4 class="font-medium text-gray-900 mb-2">Line Items</h4>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Item
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Price
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in selectedCreditMemo.lineItems" :key="item.id">
                    <td class="px-3 py-2 text-sm">
                      <div>
                        <div class="font-medium">{{ item.itemCode }}</div>
                        <div class="text-gray-500">{{ item.description }}</div>
                      </div>
                    </td>
                    <td class="px-3 py-2 text-sm">{{ item.quantity }}</td>
                    <td class="px-3 py-2 text-sm">{{ formatCurrency(item.unitPrice) }}</td>
                    <td class="px-3 py-2 text-sm font-medium">
                      {{ formatCurrency(item.lineTotal) }}
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
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useCreditMemosStore } from '../stores/creditMemosStore'
import CreditMemoForm from '../components/CreditMemoForm.vue'
import type { CreditMemo, CreditMemoFormData } from '../types'
import { CreditMemoStatus, CreditMemoType } from '../types'

// Store
const store = useCreditMemosStore()

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const selectedCreditMemo = ref<CreditMemo | null>(null)
const creditMemoToEdit = ref<CreditMemo | null>(null)
const searchQuery = ref('')
const selectedStatus = ref<CreditMemoStatus | ''>('')
const selectedType = ref<CreditMemoType | ''>('')
const showAdvancedFilters = ref(false)

// Additional filter variables
const customerFilter = ref('')
const creditReasonFilter = ref('')
const salesPersonFilter = ref('')
const currencyFilter = ref('')
const projectFilter = ref('')
const creditMemoDateFromFilter = ref('')
const creditMemoDateToFilter = ref('')
const postingDateFromFilter = ref('')
const postingDateToFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')

// Computed properties
const creditMemos = computed(() => store.creditMemos)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    searchQuery.value ||
    customerFilter.value ||
    creditReasonFilter.value ||
    salesPersonFilter.value ||
    currencyFilter.value ||
    projectFilter.value ||
    creditMemoDateFromFilter.value ||
    creditMemoDateToFilter.value ||
    postingDateFromFilter.value ||
    postingDateToFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value
  )
})

// Constants
const creditMemoStatuses = Object.values(CreditMemoStatus)
const creditMemoTypes = Object.values(CreditMemoType)
const formTypes = computed(() => ['Item', 'Service'])

// Filtered credit memos
const filteredCreditMemos = computed(() => {
  let filtered = creditMemos.value

  if (selectedStatus.value) {
    filtered = filtered.filter((creditMemo) => creditMemo.status === selectedStatus.value)
  }

  if (selectedType.value) {
    filtered = filtered.filter((creditMemo) => creditMemo.type === selectedType.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (creditMemo) =>
        creditMemo.customerName.toLowerCase().includes(query) ||
        creditMemo.customerCode.toLowerCase().includes(query) ||
        creditMemo.docNum.toLowerCase().includes(query),
    )
  }

  return filtered
})

const paginatedCreditMemos = computed(() => {
  return filteredCreditMemos.value
})

// Lifecycle
onMounted(async () => {
  await loadCreditMemos()
  await loadCreditMemoStats()
})

// Methods
const loadCreditMemos = async () => {
  const filters = {
    status: selectedStatus.value ? [selectedStatus.value] : undefined,
    type: selectedType.value ? [selectedType.value] : undefined,
    customerCode: searchQuery.value || undefined,
  }

  await store.loadCreditMemos({
    page: pagination.value.page,
    limit: pagination.value.limit,
    filters,
  })
}

const loadCreditMemoStats = async () => {
  const filters = {
    status: selectedStatus.value ? [selectedStatus.value] : undefined,
    type: selectedType.value ? [selectedType.value] : undefined,
  }

  await store.loadCreditMemoStats(filters)
}

const createCreditMemo = () => {
  creditMemoToEdit.value = null
  showCreateForm.value = true
}

const editCreditMemo = (creditMemo: CreditMemo) => {
  creditMemoToEdit.value = creditMemo
  showEditForm.value = true
}

const viewCreditMemo = (creditMemo: CreditMemo) => {
  selectedCreditMemo.value = creditMemo
}

const closeForms = () => {
  showCreateForm.value = false
  showEditForm.value = false
  creditMemoToEdit.value = null
}

const handleSubmitCreditMemo = async (data: CreditMemoFormData) => {
  try {
    if (showCreateForm.value) {
      await store.createCreditMemo(data)
    } else if (showEditForm.value && creditMemoToEdit.value) {
      await store.updateCreditMemo(creditMemoToEdit.value.id, data)
    }
    closeForms()
    await loadCreditMemos()
    await loadCreditMemoStats()
  } catch (error) {
    console.error('Error saving credit memo:', error)
  }
}

const deleteCreditMemo = async (id: string) => {
  if (confirm('Are you sure you want to delete this credit memo?')) {
    await store.deleteCreditMemo(id)
    await loadCreditMemoStats()
  }
}

const handleFilterChange = async () => {
  await loadCreditMemos()
  await loadCreditMemoStats()
}

const resetFilters = async () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  customerFilter.value = ''
  creditReasonFilter.value = ''
  salesPersonFilter.value = ''
  currencyFilter.value = ''
  projectFilter.value = ''
  creditMemoDateFromFilter.value = ''
  creditMemoDateToFilter.value = ''
  postingDateFromFilter.value = ''
  postingDateToFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  await handleFilterChange()
}

const retryLoad = async () => {
  await loadCreditMemos()
  await loadCreditMemoStats()
}

const previousPage = async () => {
  if (pagination.value.page > 1) {
    store.pagination.page--
    await loadCreditMemos()
  }
}

const nextPage = async () => {
  if (pagination.value.hasMore) {
    store.pagination.page++
    await loadCreditMemos()
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

const formatStatus = (status: CreditMemoStatus): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatCreditMemoType = (type: CreditMemoType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: CreditMemoStatus): string => {
  const classes = {
    [CreditMemoStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [CreditMemoStatus.OPEN]: 'bg-blue-100 text-blue-800',
    [CreditMemoStatus.APPLIED]: 'bg-green-100 text-green-800',
    [CreditMemoStatus.PARTIALLY_APPLIED]: 'bg-yellow-100 text-yellow-800',
    [CreditMemoStatus.CANCELLED]: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

// Helper functions for Item/Service display
const getItemsSummary = (record) => {
  if (!record.lineItems || record.lineItems.length === 0) return 'No items'
  const firstItem = record.lineItems[0]
  if (record.lineItems.length === 1) {
    return firstItem.itemCode || firstItem.description || 'Item'
  }
  return `${firstItem.itemCode || firstItem.description || 'Item'} +${record.lineItems.length - 1} more`
}

const getItemCount = (record) => {
  return record.lineItems?.length || 0
}

const getPrimaryWarehouse = (record) => {
  if (!record.lineItems || record.lineItems.length === 0) return '-'
  const warehouses = [...new Set(record.lineItems.map(item => item.warehouseCode).filter(Boolean))]
  if (warehouses.length === 0) return '-'
  if (warehouses.length === 1) return warehouses[0]
  return `${warehouses[0]} +${warehouses.length - 1} more`
}

const getServicesSummary = (record) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return 'No services'
  const firstService = record.serviceItems[0]
  if (record.serviceItems.length === 1) {
    return firstService.description || 'Service'
  }
  return `${firstService.description || 'Service'} +${record.serviceItems.length - 1} more`
}

const getServiceCount = (record) => {
  return record.serviceItems?.length || 0
}

const getServiceDescription = (record) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return '-'
  const descriptions = record.serviceItems
    .map(service => service.description)
    .filter(Boolean)
    .slice(0, 2)
  if (descriptions.length === 0) return '-'
  if (descriptions.length === 1) return descriptions[0]
  return descriptions.join(', ') + (record.serviceItems.length > 2 ? '...' : '')
}
</script>
