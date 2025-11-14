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
      <div class="flex space-x-3">
        <button
          @click="showCreateModal = true"
          class="btn-primary flex items-center justify-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Return
        </button>
        <button @click="loadReturnStats" class="btn-secondary flex items-center justify-center">
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

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Returns</h3>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="filters.search"
              @input="applyFilters"
              type="text"
              placeholder="Search by document, customer, or code..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="selectedType"
              @change="applyFilters"
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
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option v-for="status in returnStatuses" :key="status" :value="status">
                {{ formatReturnStatus(status) }}
              </option>
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
            <tr
              v-for="returnItem in returns"
              :key="returnItem.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewReturn(returnItem)"
            >
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
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewReturn(returnItem)"
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
                    v-if="returnItem.status === 'DRAFT'"
                    @click.stop="editReturn(returnItem)"
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
                    v-if="returnItem.status === 'OPEN'"
                    @click.stop="approveReturn(returnItem)"
                    class="p-2 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md transition-colors"
                    title="Approve"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="returnItem.status === 'OPEN'"
                    @click.stop="rejectReturn(returnItem)"
                    class="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Reject"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="returnItem.status === 'APPROVED'"
                    @click.stop="processReturn(returnItem)"
                    class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                    title="Process"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="['DRAFT', 'OPEN'].includes(returnItem.status)"
                    @click.stop="deleteReturn(returnItem)"
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

// Filters
const selectedStatuses = ref<ReturnStatus[]>([])
const selectedTypes = ref<ReturnType[]>([])
const selectedStatus = ref<ReturnStatus | ''>('')
const selectedType = ref<ReturnType | ''>('')

// Additional filter variables
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
    selectedStatus.value ||
    selectedType.value ||
    filters.value.search ||
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

// Methods
const fetchData = async () => {
  await store.fetchReturns()
  await store.fetchStats()
}

const loadReturnStats = async () => {
  await store.fetchStats()
}

const applyFilters = () => {
  // Convert selectedStatus and selectedType to arrays
  selectedStatuses.value = selectedStatus.value ? [selectedStatus.value as ReturnStatus] : []
  selectedTypes.value = selectedType.value ? [selectedType.value as ReturnType] : []
  store.updateFilters({
    status: selectedStatuses.value,
    type: selectedTypes.value,
    customerCode: filters.value.customerCode,
    search: filters.value.search,
  })
  fetchData()
}

const clearFilters = () => {
  selectedStatus.value = ''
  selectedType.value = ''
  selectedStatuses.value = []
  selectedTypes.value = []
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
