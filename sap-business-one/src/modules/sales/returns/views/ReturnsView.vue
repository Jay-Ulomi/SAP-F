<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Returns</h1>
        <p class="text-sm text-gray-600">
          Manage customer returns, quality issues, and warranty claims
        </p>
      </div>
      <button @click="showCreateModal = true" class="btn-primary">New Return</button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
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
            <p class="text-sm font-medium text-gray-600">Total Returns</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.total || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
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
            <p class="text-sm font-medium text-gray-600">Approved</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.approved || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.open || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow p-4">
        <div class="flex items-center">
          <div class="p-2 bg-purple-100 rounded-lg">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatCurrency(stats?.totalValue || 0) }}
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
              v-model="selectedStatuses"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Statuses</option>
              <option v-for="status in returnStatuses" :key="status" :value="status">
                {{ formatReturnStatus(status) }}
              </option>
            </select>
          </div>

          <!-- Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              v-model="selectedTypes"
              @change="applyFilters"
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
              v-model="filters.search"
              @input="applyFilters"
              type="text"
              placeholder="Search returns..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>

          <!-- Customer Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Customer</label>
            <input
              v-model="customerFilter"
              @input="applyFilters"
              type="text"
              placeholder="Customer code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>

        <!-- Advanced Filters - Collapsible -->
        <div v-show="showAdvancedFilters" class="border-t border-gray-200 pt-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <!-- Return Reason Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Return Reason</label>
              <select
                v-model="returnReasonFilter"
                @change="applyFilters"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Reasons</option>
                <option value="DEFECTIVE">Defective</option>
                <option value="DAMAGED">Damaged</option>
                <option value="WRONG_ITEM">Wrong Item</option>
                <option value="CUSTOMER_CHANGE">Customer Change</option>
                <option value="WARRANTY">Warranty</option>
              </select>
            </div>

            <!-- Priority Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                v-model="priorityFilter"
                @change="applyFilters"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              >
                <option value="">All Priorities</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
            </div>

            <!-- Original Order Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Original Order</label>
              <input
                v-model="originalOrderFilter"
                @input="applyFilters"
                type="text"
                placeholder="Order number..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>

            <!-- Invoice Filter -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Original Invoice</label>
              <input
                v-model="originalInvoiceFilter"
                @input="applyFilters"
                type="text"
                placeholder="Invoice number..."
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              />
            </div>
          </div>

          <!-- Date Filters Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- Return Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Return Date Range</label>
              <div class="flex space-x-2">
                <input
                  v-model="returnDateFromFilter"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="returnDateToFilter"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>
            </div>

            <!-- Approval Date Range -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Approval Date Range</label
              >
              <div class="flex space-x-2">
                <input
                  v-model="approvalDateFromFilter"
                  @change="applyFilters"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
                <input
                  v-model="approvalDateToFilter"
                  @change="applyFilters"
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
                  v-if="selectedStatuses.length > 0"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
                >
                  Status: {{ selectedStatuses.map((s) => formatReturnStatus(s)).join(', ') }}
                  <button
                    @click="((selectedStatuses = []), applyFilters())"
                    class="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="selectedTypes.length > 0"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
                >
                  Type: {{ selectedTypes.map((t) => formatReturnType(t)).join(', ') }}
                  <button
                    @click="((selectedTypes = []), applyFilters())"
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
                    @click="((customerFilter = ''), applyFilters())"
                    class="ml-1 text-purple-600 hover:text-purple-800"
                  >
                    ×
                  </button>
                </span>
                <span
                  v-if="filters.search"
                  class="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full"
                >
                  Search: {{ filters.search }}
                  <button
                    @click="((filters.search = ''), applyFilters())"
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
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-4 py-3 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Returns</h3>
      </div>

      <div v-if="loading" class="p-8 text-center">
        <div class="flex justify-center">
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
        </div>
        <p class="mt-2 text-sm text-gray-600">Loading returns...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 mb-2">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-600">{{ error }}</p>
      </div>

      <div v-else-if="returns.length === 0" class="p-8 text-center">
        <div class="text-gray-400 mb-2">
          <svg class="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p class="text-sm text-gray-600">No returns found</p>
      </div>

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
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Items
              </th>
              <th
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Warehouse
              </th>
              <th
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Services
              </th>
              <th
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
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
                Return Date
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
            <tr v-for="returnItem in returns" :key="returnItem.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ returnItem.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ returnItem.docEntry }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ returnItem.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ returnItem.customerCode }}</div>
                </div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getItemsSummary(returnItem) }}</div>
                <div class="text-xs text-gray-500">{{ getItemCount(returnItem) }} item(s)</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Item'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getPrimaryWarehouse(returnItem) }}</div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getServicesSummary(returnItem) }}</div>
                <div class="text-xs text-gray-500">
                  {{ getServiceCount(returnItem) }} service(s)
                </div>
              </td>
              <td
                v-if="!selectedType || selectedType === 'Service'"
                class="px-6 py-4 whitespace-nowrap"
              >
                <div class="text-sm text-gray-900">{{ getServiceDescription(returnItem) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="
                    returnItem.formType === 'Item'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  "
                >
                  {{ returnItem.type || 'Item' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(returnItem.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ formatReturnStatus(returnItem.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(returnItem.returnDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(returnItem.totalAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewReturn(returnItem)"
                    class="text-sap-blue hover:text-sap-blue-dark"
                  >
                    View
                  </button>
                  <button
                    v-if="returnItem.status === 'DRAFT'"
                    @click="editReturn(returnItem)"
                    class="text-green-600 hover:text-green-800"
                  >
                    Edit
                  </button>
                  <button
                    v-if="returnItem.status === 'OPEN'"
                    @click="approveReturn(returnItem)"
                    class="text-green-600 hover:text-green-800"
                  >
                    Approve
                  </button>
                  <button
                    v-if="returnItem.status === 'OPEN'"
                    @click="rejectReturn(returnItem)"
                    class="text-red-600 hover:text-red-800"
                  >
                    Reject
                  </button>
                  <button
                    v-if="returnItem.status === 'APPROVED'"
                    @click="processReturn(returnItem)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    Process
                  </button>
                  <button
                    v-if="['DRAFT', 'OPEN'].includes(returnItem.status)"
                    @click="deleteReturn(returnItem)"
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
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
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
              :disabled="pagination.page * pagination.limit >= pagination.total"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{
                  pagination.page * pagination.limit - pagination.limit + 1
                }}</span>
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
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page * pagination.limit >= pagination.total"
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

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal || showEditModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeModals"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <ReturnForm
            :initial-data="editingReturn"
            :is-editing="showEditModal"
            @saved="handleReturnSaved"
            @cancel="closeModals"
          />
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeModals"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">Return Details</h3>
            <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
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

          <div v-if="viewingReturn" class="space-y-6">
            <!-- Basic Information -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Document Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ viewingReturn.docNum }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Status</label>
                <p class="mt-1">
                  <span
                    :class="getStatusBadgeClass(viewingReturn.status)"
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ formatReturnStatus(viewingReturn.status) }}
                  </span>
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Customer</label>
                <p class="mt-1 text-sm text-gray-900">{{ viewingReturn.customerName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Return Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(viewingReturn.returnDate) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatReturnType(viewingReturn.type) }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Total Amount</label>
                <p class="mt-1 text-sm font-medium text-gray-900">
                  {{ formatCurrency(viewingReturn.totalAmount) }}
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
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Description
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Qty
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unit Price
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="item in viewingReturn.lineItems" :key="item.id">
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.itemCode }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.description }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">{{ item.quantity }}</td>
                      <td class="px-3 py-2 text-sm text-gray-900">
                        {{ formatCurrency(item.unitPrice) }}
                      </td>
                      <td class="px-3 py-2 text-sm text-gray-900">
                        {{ formatCurrency(item.lineTotal) }}
                      </td>
                      <td class="px-3 py-2 text-sm text-gray-900">
                        {{ formatReturnReason(item.returnReason) }}
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
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useReturnsStore } from '../stores/returnsStore'
import ReturnForm from '../components/ReturnForm.vue'
import type { Return } from '../types'
import { ReturnStatus, ReturnType, ReturnReason } from '../types'

const store = useReturnsStore()

// State
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const editingReturn = ref<Return | null>(null)
const viewingReturn = ref<Return | null>(null)
const showAdvancedFilters = ref(false)

// Filters
const selectedStatuses = ref<ReturnStatus[]>([])
const selectedTypes = ref<ReturnType[]>([])

// Additional filter variables
const customerFilter = ref('')
const returnReasonFilter = ref('')
const priorityFilter = ref('')
const originalOrderFilter = ref('')
const originalInvoiceFilter = ref('')
const returnDateFromFilter = ref('')
const returnDateToFilter = ref('')
const approvalDateFromFilter = ref('')
const approvalDateToFilter = ref('')

// Computed
const returns = computed(() => store.returns)
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)
const filters = computed(() => store.filters)
const loading = computed(() => store.loading)
const error = computed(() => store.error)

const hasActiveFilters = computed(() => {
  return (
    selectedStatuses.value.length > 0 ||
    selectedTypes.value.length > 0 ||
    filters.value.search ||
    customerFilter.value ||
    returnReasonFilter.value ||
    priorityFilter.value ||
    originalOrderFilter.value ||
    originalInvoiceFilter.value ||
    returnDateFromFilter.value ||
    returnDateToFilter.value ||
    approvalDateFromFilter.value ||
    approvalDateToFilter.value
  )
})

const returnStatuses = Object.values(ReturnStatus)
const returnTypes = Object.values(ReturnType)
const formTypes = computed(() => ['Item', 'Service'])
const selectedType = ref('')

// Methods
const fetchData = async () => {
  await store.fetchReturns()
  await store.fetchStats()
}

const applyFilters = () => {
  store.updateFilters({
    status: selectedStatuses.value,
    type: selectedTypes.value,
    customerCode: filters.value.customerCode,
    search: filters.value.search,
  })
  fetchData()
}

const clearFilters = () => {
  selectedStatuses.value = []
  selectedTypes.value = []
  customerFilter.value = ''
  returnReasonFilter.value = ''
  priorityFilter.value = ''
  originalOrderFilter.value = ''
  originalInvoiceFilter.value = ''
  returnDateFromFilter.value = ''
  returnDateToFilter.value = ''
  approvalDateFromFilter.value = ''
  approvalDateToFilter.value = ''
  store.clearFilters()
  fetchData()
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    store.fetchReturns(pagination.value.page - 1, pagination.value.limit)
  }
}

const nextPage = () => {
  if (pagination.value.page * pagination.value.limit < pagination.value.total) {
    store.fetchReturns(pagination.value.page + 1, pagination.value.limit)
  }
}

const createReturn = () => {
  showCreateModal.value = true
}

const editReturn = (returnItem: Return) => {
  editingReturn.value = returnItem
  showEditModal.value = true
}

const viewReturn = (returnItem: Return) => {
  viewingReturn.value = returnItem
  showViewModal.value = true
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  editingReturn.value = null
  viewingReturn.value = null
}

const handleReturnSaved = (returnItem: Return) => {
  closeModals()
  fetchData()
}

const approveReturn = async (returnItem: Return) => {
  if (confirm('Are you sure you want to approve this return?')) {
    await store.approveReturn(returnItem.id, { approvedBy: 'current-user' })
    fetchData()
  }
}

const rejectReturn = async (returnItem: Return) => {
  const reason = prompt('Please provide a reason for rejection:')
  if (reason) {
    await store.rejectReturn(returnItem.id, { rejectedBy: 'current-user', reason })
    fetchData()
  }
}

const processReturn = async (returnItem: Return) => {
  if (confirm('Are you sure you want to process this return?')) {
    await store.processReturn(returnItem.id, { processedBy: 'current-user' })
    fetchData()
  }
}

const deleteReturn = async (returnItem: Return) => {
  if (confirm('Are you sure you want to delete this return?')) {
    await store.deleteReturn(returnItem.id)
    fetchData()
  }
}

const exportData = () => {
  store.exportReturns(filters.value)
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatReturnStatus = (status: ReturnStatus) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnType = (type: ReturnType) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: ReturnReason) => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: ReturnStatus) => {
  switch (status) {
    case ReturnStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case ReturnStatus.OPEN:
      return 'bg-blue-100 text-blue-800'
    case ReturnStatus.APPROVED:
      return 'bg-green-100 text-green-800'
    case ReturnStatus.REJECTED:
      return 'bg-red-100 text-red-800'
    case ReturnStatus.PROCESSED:
      return 'bg-purple-100 text-purple-800'
    case ReturnStatus.CANCELLED:
      return 'bg-red-100 text-red-800'
    case ReturnStatus.CLOSED:
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Helper functions for Item/Service display
const getItemsSummary = (record: Return) => {
  if (!record.lineItems || record.lineItems.length === 0) return 'No items'
  const firstItem = record.lineItems[0]
  if (record.lineItems.length === 1) {
    return firstItem.itemCode || firstItem.description || 'Item'
  }
  return `${firstItem.itemCode || firstItem.description || 'Item'} +${record.lineItems.length - 1} more`
}

const getItemCount = (record: Return) => {
  return record.lineItems?.length || 0
}

const getPrimaryWarehouse = (record: Return) => {
  if (!record.lineItems || record.lineItems.length === 0) return '-'
  const warehouses = [
    ...new Set(record.lineItems.map((item) => item.warehouseCode).filter(Boolean)),
  ]
  if (warehouses.length === 0) return '-'
  if (warehouses.length === 1) return warehouses[0]
  return `${warehouses[0]} +${warehouses.length - 1} more`
}

const getServicesSummary = (record: Return) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return 'No services'
  const firstService = record.serviceItems[0]
  if (record.serviceItems.length === 1) {
    return firstService.description || 'Service'
  }
  return `${firstService.description || 'Service'} +${record.serviceItems.length - 1} more`
}

const getServiceCount = (record: Return) => {
  return record.serviceItems?.length || 0
}

const getServiceDescription = (record: Return) => {
  if (!record.serviceItems || record.serviceItems.length === 0) return '-'
  const descriptions = record.serviceItems
    .map((service) => service.description)
    .filter(Boolean)
    .slice(0, 2)
  if (descriptions.length === 0) return '-'
  if (descriptions.length === 1) return descriptions[0]
  return descriptions.join(', ') + (record.serviceItems.length > 2 ? '...' : '')
}

// Watch for filter changes
watch([selectedStatuses, selectedTypes], () => {
  if (selectedStatuses.value.length > 0 || selectedTypes.value.length > 0) {
    applyFilters()
  }
})

// Lifecycle
onMounted(() => {
  fetchData()
})
</script>
