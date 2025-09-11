<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Purchase Quotations</h1>
        <p class="text-sm text-gray-600">Manage vendor quotations and evaluation workflows</p>
      </div>
      <div class="flex space-x-3">
        <button @click="createQuotation" class="btn-primary">
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
        <button @click="loadQuotationStats" class="btn-secondary">
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Quotations</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalQuotations || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Draft</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.draftQuotations || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Approved</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.approvedQuotations || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Converted</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalAmount || 0 }}</p>
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
              <option v-for="status in quotationStatuses" :key="status" :value="status">
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
              <option v-for="type in quotationTypes" :key="type" :value="type">
                {{ formatQuotationType(type) }}
              </option>
            </select>
          </div>

          <!-- Priority Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <select
              v-model="selectedPriority"
              @change="handleFilterChange"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Priorities</option>
              <option v-for="priority in quotationPriorities" :key="priority" :value="priority">
                {{ formatPriority(priority) }}
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
              placeholder="Search quotations..."
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
            <!-- Quotation Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Quotation Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="quotationDateFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="quotationDateToFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Valid Until Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Valid Until Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="validUntilFromFilter"
                  @change="handleFilterChange"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="validUntilToFilter"
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
                  Type: {{ formatQuotationType(selectedType) }}
                  <button
                    @click="((selectedType = ''), handleFilterChange())"
                    class="ml-1 text-green-600 hover:text-green-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="selectedPriority"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full"
                >
                  Priority: {{ formatPriority(selectedPriority) }}
                  <button
                    @click="((selectedPriority = ''), handleFilterChange())"
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

    <!-- Purchase Quotations Table -->
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
          Loading purchase quotations...
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
          <p class="text-lg font-medium">Error Loading Purchase Quotations</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="retryLoad" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="quotations.length === 0" class="p-8 text-center">
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
        <p class="text-lg font-medium text-gray-900 mb-2">No Purchase Quotations Found</p>
        <p class="text-sm text-gray-600 mb-4">
          Get started by creating your first purchase quotation.
        </p>
        <button @click="createQuotation" class="btn-primary mt-4">Create Quotation</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quotation
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
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quotation Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Valid Until
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
            <tr v-for="quotation in quotations" :key="quotation.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ quotation.docNum }}</div>
                  <div class="text-sm text-gray-500">{{ quotation.quotationNumber }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ quotation.vendorName }}</div>
                  <div class="text-sm text-gray-500">{{ quotation.vendorCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatQuotationType(quotation.type) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getPriorityBadgeClass(quotation.priority)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatPriority(quotation.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(quotation.quotationDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(quotation.validUntil) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(quotation.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(quotation.status)"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                >
                  {{ formatStatus(quotation.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  @click="viewQuotation(quotation)"
                  class="text-blue-600 hover:text-blue-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editQuotation(quotation)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteQuotation(quotation.id)"
                  class="text-red-600 hover:text-red-900"
                >
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

    <!-- Create/Edit Quotation Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showCreateForm ? 'Create New Quotation' : 'Edit Quotation' }}
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
          <!-- Quotation Form Component -->
          <QuotationForm
            :initial-data="quotationToEdit ? convertToFormData(quotationToEdit) : undefined"
            @submit="handleSubmitQuotation"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- View Quotation Modal -->
    <div
      v-if="selectedQuotation"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Quotation Details</h3>
            <button @click="selectedQuotation = null" class="text-gray-400 hover:text-gray-600">
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
          <!-- Quotation Details Component -->
          <PurchaseQuotationViewComponent v-if="selectedQuotation" :quotation="selectedQuotation" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PurchaseQuotationStatus, PurchaseQuotationType, QuotationPriority } from '../types'
import type {
  PurchaseQuotation,
  PurchaseQuotationFormData,
  PurchaseQuotationStats,
  PurchaseQuotationPagination,
} from '../types'
import { usePurchaseQuotationsStore } from '../stores'
import QuotationForm from '../components/QuotationForm.vue'
import PurchaseQuotationViewComponent from '../components/PurchaseQuotationView.vue'

// Store
const store = usePurchaseQuotationsStore()

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const selectedQuotation = ref<PurchaseQuotation | null>(null)
const quotationToEdit = ref<PurchaseQuotation | null>(null)

// Temporary form data for testing
const tempFormData = ref<PurchaseQuotationFormData>({
  quotationNumber: '',
  vendorCode: '',
  quotationDate: new Date().toISOString().split('T')[0],
  validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  type: PurchaseQuotationType.MATERIAL,
  priority: QuotationPriority.MEDIUM,
  currency: 'USD' as any,
  department: '',
  costCenter: '',
  projectCode: '',
  notes: '',
  lineItems: [],
})
const searchQuery = ref('')
const selectedStatus = ref<PurchaseQuotationStatus | ''>('')
const selectedType = ref<PurchaseQuotationType | ''>('')
const selectedPriority = ref<QuotationPriority | ''>('')
const showAdvancedFilters = ref(false)

// Additional filter variables
const vendorFilter = ref('')
const departmentFilter = ref('')
const costCenterFilter = ref('')
const projectFilter = ref('')
const quotationDateFromFilter = ref('')
const quotationDateToFilter = ref('')
const validUntilFromFilter = ref('')
const validUntilToFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')

// Mock data for now
const quotations = ref<PurchaseQuotation[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<PurchaseQuotationStats | null>(null)
const pagination = ref<PurchaseQuotationPagination>({
  page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
  hasMore: false,
})

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    selectedPriority.value ||
    searchQuery.value ||
    vendorFilter.value ||
    departmentFilter.value ||
    costCenterFilter.value ||
    projectFilter.value ||
    quotationDateFromFilter.value ||
    quotationDateToFilter.value ||
    validUntilFromFilter.value ||
    validUntilToFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value
  )
})

// Constants
const quotationStatuses = Object.values(PurchaseQuotationStatus)
const quotationTypes = Object.values(PurchaseQuotationType)
const quotationPriorities = Object.values(QuotationPriority)

// Lifecycle
onMounted(async () => {
  await loadQuotations()
  await loadQuotationStats()
})

// Methods
const loadQuotations = async () => {
  try {
    await store.loadQuotations()
    quotations.value = store.quotations
    pagination.value = store.pagination
    loading.value = store.loading
    error.value = store.error
  } catch {
    error.value = 'Failed to load quotations'
    loading.value = false
  }
}

const loadQuotationStats = async () => {
  try {
    await store.loadQuotationStats()
    if (store.stats?.data) {
      stats.value = store.stats.data
    }
  } catch {
    console.error('Failed to load quotation stats')
  }
}

const createQuotation = () => {
  quotationToEdit.value = null
  showCreateForm.value = true
}

const handleSubmitQuotation = async (data: PurchaseQuotationFormData) => {
  try {
    if (showCreateForm.value) {
      await store.createQuotation(data)
    } else if (showEditForm.value && quotationToEdit.value) {
      await store.updateQuotation(quotationToEdit.value.id, data)
    }
    closeForms()
    await loadQuotations()
    await loadQuotationStats()
  } catch (error) {
    console.error('Error saving quotation:', error)
  }
}

const convertToFormData = (quotation: PurchaseQuotation): PurchaseQuotationFormData => {
  return {
    quotationNumber: quotation.quotationNumber,
    quotationDate: quotation.quotationDate,
    validUntil: quotation.validUntil,
    type: quotation.type,
    priority: quotation.priority,
    currency: quotation.currency,
    vendorCode: quotation.vendorCode,
    department: quotation.department,
    costCenter: quotation.costCenter,
    projectCode: quotation.projectCode || '',
    notes: quotation.notes || '',
    lineItems: quotation.lineItems.map((item) => ({
      itemCode: item.itemCode,
      itemName: item.itemName,
      description: item.description,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      taxCode: item.taxCode,
      taxPercent: item.taxPercent,
      accountCode: item.accountCode,
      costCenter: item.costCenter,
      projectCode: item.projectCode || '',
      warehouseCode: item.warehouseCode || '',
      deliveryDate: item.deliveryDate || '',
      priority: item.priority,
      vendorNotes: item.vendorNotes || '',
    })),
  }
}

const editQuotation = (quotation: PurchaseQuotation) => {
  quotationToEdit.value = quotation
  showEditForm.value = true
}

const viewQuotation = (quotation: PurchaseQuotation) => {
  selectedQuotation.value = quotation
}

const deleteQuotation = async (id: string) => {
  if (confirm('Are you sure you want to delete this quotation?')) {
    await store.deleteQuotation(id)
    await loadQuotationStats()
  }
}

const closeForms = () => {
  showCreateForm.value = false
  showEditForm.value = false
  quotationToEdit.value = null
}

const handleFilterChange = async () => {
  await loadQuotations()
  await loadQuotationStats()
}

const resetFilters = async () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  selectedPriority.value = ''
  vendorFilter.value = ''
  departmentFilter.value = ''
  costCenterFilter.value = ''
  projectFilter.value = ''
  quotationDateFromFilter.value = ''
  quotationDateToFilter.value = ''
  validUntilFromFilter.value = ''
  validUntilToFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  await handleFilterChange()
}

const retryLoad = async () => {
  await loadQuotations()
  await loadQuotationStats()
}

const previousPage = async () => {
  if (pagination.value.page > 1) {
    pagination.value.page--
    await loadQuotations()
  }
}

const nextPage = async () => {
  if (pagination.value.page < pagination.value.totalPages) {
    pagination.value.page++
    await loadQuotations()
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

const formatStatus = (status: PurchaseQuotationStatus): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatQuotationType = (type: PurchaseQuotationType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPriority = (priority: QuotationPriority): string => {
  return priority.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: PurchaseQuotationStatus): string => {
  const classes = {
    [PurchaseQuotationStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [PurchaseQuotationStatus.SENT]: 'bg-blue-100 text-blue-800',
    [PurchaseQuotationStatus.RECEIVED]: 'bg-yellow-100 text-yellow-800',
    [PurchaseQuotationStatus.EVALUATED]: 'bg-purple-100 text-purple-800',
    [PurchaseQuotationStatus.APPROVED]: 'bg-green-100 text-green-800',
    [PurchaseQuotationStatus.REJECTED]: 'bg-red-100 text-red-800',
    [PurchaseQuotationStatus.EXPIRED]: 'bg-orange-100 text-orange-800',
    [PurchaseQuotationStatus.CONVERTED]: 'bg-indigo-100 text-indigo-800',
    [PurchaseQuotationStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getPriorityBadgeClass = (priority: QuotationPriority): string => {
  const classes = {
    [QuotationPriority.LOW]: 'bg-gray-100 text-gray-800',
    [QuotationPriority.MEDIUM]: 'bg-blue-100 text-blue-800',
    [QuotationPriority.HIGH]: 'bg-orange-100 text-orange-800',
    [QuotationPriority.URGENT]: 'bg-red-100 text-red-800',
  }
  return classes[priority] || 'bg-gray-100 text-gray-800'
}
</script>
