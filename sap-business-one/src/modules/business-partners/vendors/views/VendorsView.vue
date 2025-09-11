<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Vendor Management</h1>
        <p class="text-sm text-gray-600">Manage vendor master data and relationships</p>
      </div>
      <div class="flex space-x-3">
        <button @click="createVendor" class="btn-primary">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Add Vendor
        </button>
        <button @click="loadVendorStats" class="btn-secondary">
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Vendors</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalVendors || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Vendors</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.activeVendors || 0 }}</p>
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Suspended Vendors</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.suspendedVendors || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-red-100">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Blocked Vendors</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.blockedVendors || 0 }}</p>
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
              @click="clearAllFilters"
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
          <!-- Search Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search vendors..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="selectedStatus"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Statuses</option>
              <option v-for="status in vendorStatuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              v-model="selectedType"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in vendorTypes" :key="type" :value="type">
                {{ formatVendorType(type) }}
              </option>
            </select>
          </div>

          <!-- Currency Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              v-model="selectedCurrency"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Currencies</option>
              <option v-for="currency in currencies" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-if="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <!-- Country Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <input
                v-model="countryFilter"
                type="text"
                placeholder="Filter by country"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- State Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
              <input
                v-model="stateFilter"
                type="text"
                placeholder="Filter by state"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- City Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                v-model="cityFilter"
                type="text"
                placeholder="Filter by city"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Payment Terms Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Payment Terms</label>
              <input
                v-model="paymentTermsFilter"
                type="text"
                placeholder="Filter by payment terms"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Credit Limit Min -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Credit Limit Min</label>
              <input
                v-model="creditLimitMinFilter"
                type="number"
                placeholder="Min amount"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Credit Limit Max -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Credit Limit Max</label>
              <input
                v-model="creditLimitMaxFilter"
                type="number"
                placeholder="Max amount"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Apply Filters Button -->
          <div class="mt-6 flex justify-end">
            <button @click="applyFilters" class="btn-primary">Apply Filters</button>
          </div>
        </div>

        <!-- Active Filters Summary -->
        <div v-if="hasActiveFilters" class="border-t border-gray-200 pt-6">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-medium text-gray-700">Active Filters:</h4>
            <button @click="clearAllFilters" class="text-sm text-sap-blue hover:text-sap-dark-blue">
              Clear All Filters
            </button>
          </div>
          <div class="mt-3 flex flex-wrap gap-2">
            <span
              v-if="searchQuery"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              Search: {{ searchQuery }}
              <button @click="searchQuery = ''" class="ml-1 text-blue-600 hover:text-blue-800">
                ×
              </button>
            </span>
            <span
              v-if="selectedStatus"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
            >
              Status: {{ formatStatus(selectedStatus) }}
              <button @click="selectedStatus = ''" class="ml-1 text-green-600 hover:text-green-800">
                ×
              </button>
            </span>
            <span
              v-if="selectedType"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
            >
              Type: {{ formatVendorType(selectedType) }}
              <button @click="selectedType = ''" class="ml-1 text-purple-600 hover:text-purple-800">
                ×
              </button>
            </span>
            <span
              v-if="selectedCurrency"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
            >
              Currency: {{ selectedCurrency }}
              <button
                @click="selectedCurrency = ''"
                class="ml-1 text-yellow-600 hover:text-yellow-800"
              >
                ×
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vendors Table -->
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
          Loading vendors...
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
          <p class="text-lg font-medium">Error Loading Vendors</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="retryLoad" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="vendors.length === 0" class="p-8 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Vendors Found</p>
        <p class="text-sm text-gray-600 mb-4">Get started by creating your first vendor.</p>
        <button @click="createVendor" class="btn-primary mt-4">Create Vendor</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
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
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Currency
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Credit Limit
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Current Balance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="vendor in vendors" :key="vendor.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">{{
                        vendor.name.charAt(0)
                      }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ vendor.name }}</div>
                    <div class="text-sm text-gray-500">{{ vendor.code }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800"
                >
                  {{ formatVendorType(vendor.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': vendor.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': vendor.status === 'INACTIVE',
                    'bg-orange-100 text-orange-800': vendor.status === 'SUSPENDED',
                    'bg-red-100 text-red-800': vendor.status === 'BLOCKED',
                  }"
                >
                  {{ formatStatus(vendor.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ vendor.financial?.currency || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(vendor.financial?.creditLimit || 0) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(vendor.financial?.currentBalance || 0) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewVendor(vendor)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button @click="editVendor(vendor)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteVendor(vendor.id)" class="text-red-600 hover:text-red-900">
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
        v-if="vendors.length > 0"
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="store?.pagination?.page === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!store?.pagination?.hasMore"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{
                (store?.pagination?.page || 1 - 1) * (store?.pagination?.limit || 10) + 1
              }}</span>
              to
              <span class="font-medium">{{
                Math.min(
                  (store?.pagination?.page || 1) * (store?.pagination?.limit || 10),
                  store?.pagination?.total || 0,
                )
              }}</span>
              of
              <span class="font-medium">{{ store?.pagination?.total || 0 }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="previousPage"
                :disabled="store?.pagination?.page === 1"
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
                :disabled="!store?.pagination?.hasMore"
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

    <!-- Create/Edit Vendor Modal -->
    <div
      v-if="showCreateForm || showEditForm"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-8 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showCreateForm ? 'Create New Vendor' : 'Edit Vendor' }}
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
          <!-- Vendor Form Component -->
          <VendorForm
            :vendor="showCreateForm ? undefined : vendorToEdit"
            @submit="handleSubmitVendor"
            @cancel="closeForms"
          />
        </div>
      </div>
    </div>

    <!-- View Vendor Modal -->
    <div
      v-if="selectedVendor"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    >
      <div
        class="relative top-8 mx-auto p-5 border w-11/12 md:w-3/4 lg:max-w-6xl shadow-lg rounded-md bg-white"
      >
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Vendor Details</h3>
            <button @click="selectedVendor = null" class="text-gray-400 hover:text-gray-600">
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
          <VendorView v-if="selectedVendor" :vendor="selectedVendor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useVendorStore } from '../stores'
import VendorForm from '../components/VendorForm.vue'
import VendorView from '../components/VendorView.vue'
import { VendorStatus, VendorType, Currency } from '../types'
import type { Vendor, VendorFormData } from '../types'

// Store
const store = useVendorStore()

// Local state
const showCreateForm = ref(false)
const showEditForm = ref(false)
const selectedVendor = ref<Vendor | null>(null)
const vendorToEdit = ref<Vendor | null>(null)
const showAdvancedFilters = ref(false)

// Filter variables
const searchQuery = ref('')
const selectedStatus = ref<VendorStatus | ''>('')
const selectedType = ref<VendorType | ''>('')
const selectedCurrency = ref<Currency | ''>('')
const countryFilter = ref('')
const stateFilter = ref('')
const cityFilter = ref('')
const paymentTermsFilter = ref('')
const creditLimitMinFilter = ref<number | ''>('')
const creditLimitMaxFilter = ref<number | ''>('')

// Computed properties from store
const vendors = computed(() => store.vendors)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats)
const hasActiveFilters = computed(() => store.hasActiveFilters)

// Constants
const vendorStatuses = Object.values(VendorStatus)
const vendorTypes = Object.values(VendorType)
const currencies = Object.values(Currency)

// Lifecycle
onMounted(async () => {
  await loadVendors()
  await loadVendorStats()
})

// Methods
const loadVendors = async () => {
  try {
    await store.loadVendors()
  } catch (err) {
    console.error('Failed to load vendors:', err)
  }
}

const loadVendorStats = async () => {
  try {
    await store.loadVendorStats()
  } catch (err) {
    console.error('Failed to load vendor stats:', err)
  }
}

const applyFilters = async () => {
  const filters = {
    search: searchQuery.value || undefined,
    status: selectedStatus.value || undefined,
    type: selectedType.value || undefined,
    currency: selectedCurrency.value || undefined,
    country: countryFilter.value || undefined,
    state: stateFilter.value || undefined,
    city: cityFilter.value || undefined,
    paymentTerms: paymentTermsFilter.value || undefined,
    creditLimitMin: creditLimitMinFilter.value || undefined,
    creditLimitMax: creditLimitMaxFilter.value || undefined,
  }

  try {
    await store.loadVendors(filters)
  } catch (err) {
    console.error('Failed to apply filters:', err)
  }
}

const clearAllFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  selectedCurrency.value = ''
  countryFilter.value = ''
  stateFilter.value = ''
  cityFilter.value = ''
  paymentTermsFilter.value = ''
  creditLimitMinFilter.value = ''
  creditLimitMaxFilter.value = ''

  // Clear filters in store
  store.clearFilters()

  // Reload vendors without filters
  loadVendors()
}

const viewVendor = (vendor: Vendor) => {
  selectedVendor.value = vendor
}

const createVendor = () => {
  showCreateForm.value = true
  showEditForm.value = false
  vendorToEdit.value = null
}

const editVendor = (vendor: Vendor) => {
  vendorToEdit.value = vendor
  showEditForm.value = true
  showCreateForm.value = false
}

const deleteVendor = async (id: string) => {
  if (confirm('Are you sure you want to delete this vendor?')) {
    try {
      await store.deleteVendor(id)
      await loadVendors()
    } catch (err) {
      console.error('Failed to delete vendor:', err)
    }
  }
}

const handleSubmitVendor = async (formData: VendorFormData) => {
  try {
    if (showEditForm.value && vendorToEdit.value) {
      await store.updateVendor(vendorToEdit.value.id, formData)
    } else {
      await store.createVendor(formData)
    }

    await loadVendors()
    closeForms()
  } catch (err) {
    console.error('Failed to submit vendor:', err)
  }
}

const closeForms = () => {
  showCreateForm.value = false
  showEditForm.value = false
  vendorToEdit.value = null
}

const retryLoad = () => {
  loadVendors()
  loadVendorStats()
}

const previousPage = () => {
  if (store.pagination.page > 1) {
    store.pagination.page--
    loadVendors()
  }
}

const nextPage = () => {
  if (store.pagination.hasMore) {
    store.pagination.page++
    loadVendors()
  }
}

// Utility functions
const formatStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended',
    BLOCKED: 'Blocked',
  }
  return statusMap[status] || status
}

const formatVendorType = (type: string) => {
  const typeMap: Record<string, string> = {
    SUPPLIER: 'Supplier',
    SERVICE_PROVIDER: 'Service Provider',
    CONTRACTOR: 'Contractor',
    DISTRIBUTOR: 'Distributor',
    MANUFACTURER: 'Manufacturer',
    WHOLESALER: 'Wholesaler',
  }
  return typeMap[type] || type
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}
</script>
