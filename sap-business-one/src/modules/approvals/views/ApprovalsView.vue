<template>
  <div class="px-6 py-6">
    <!-- Header -->
    <div class="mb-6">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-xl font-semibold text-gray-900">Approval Workflow</h1>
          <p class="mt-1 text-sm text-gray-500">Manage approval rules and monitor approval processes</p>
        </div>
        <button
          @click="openCreateModal"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add
        </button>
      </div>
    </div>

    <!-- Stats Cards -->
    <div v-if="stats" class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
      <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-500">Total Rules</p>
              <p class="text-lg font-semibold text-gray-900">{{ stats.totalRules }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-500">Active Rules</p>
              <p class="text-lg font-semibold text-gray-900">{{ stats.activeRules }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-500">Pending Approvals</p>
              <p class="text-lg font-semibold text-gray-900">{{ stats.pendingApprovals }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
        <div class="p-4">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-3 flex-1">
              <p class="text-sm font-medium text-gray-500">Approved Today</p>
              <p class="text-lg font-semibold text-gray-900">{{ stats.approvedToday }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Rules Table -->
    <div class="bg-white shadow-sm rounded-lg border border-gray-200">
      <div class="px-4 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-base font-medium text-gray-900">Approval Rules</h3>
            <p class="mt-1 text-sm text-gray-500">Configure approval workflows for different document types and amounts.</p>
          </div>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="filters.initiator"
              @input="applyFilters"
              type="text"
              placeholder="Search initiator..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-900 bg-white"
            />
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Type</label>
            <select
              v-model="filters.type"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-900 bg-white"
            >
              <option value="">All Types</option>
              <option value="OPEX">OPEX</option>
              <option value="FUEL_STAFF">Fuel-Staff</option>
              <option value="FUEL_BULK">Fuel-Bulk</option>
              <option value="OPEX_UNCONTRACTED">OPEX Uncontracted</option>
              <option value="CAPEX">CAPEX</option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Department</label>
            <select
              v-model="filters.department"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-900 bg-white"
            >
              <option value="">All Departments</option>
              <option value="SALES">Sales</option>
              <option value="OPERATIONS">Operations</option>
              <option value="HUMAN_RESOURCE">Human Resource</option>
              <option value="FINANCE">Finance</option>
              <option value="IT">IT</option>
              <option value="MARKETING">Marketing</option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Document Type</label>
            <select
              v-model="filters.documentType"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-900 bg-white"
            >
              <option value="">All Document Types</option>
              <option value="PURCHASE_REQUEST">Purchase Request</option>
              <option value="PURCHASE_ORDER">Purchase Order</option>
              <option value="GOODS_RECEIPT">Goods Receipt</option>
              <option value="AP_INVOICE">AP Invoice</option>
              <option value="AR_INVOICE">AR Invoice</option>
            </select>
          </div>
          <div class="flex-1 min-w-[150px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
            <select
              v-model="filters.status"
              @change="applyFilters"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm text-gray-900 bg-white"
            >
              <option value="">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          <div class="flex-shrink-0">
            <button
              v-if="hasActiveFilters"
              @click="clearFilters"
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 h-[38px]"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="p-4 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading approval rules...
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="p-4 text-center text-red-600">
        {{ error }}
      </div>

      <!-- Table -->
      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Document Type
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Initiator
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount From
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount To
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approver 1
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approver 2
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Approver 3
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="rule in approvalRules"
              :key="rule.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewRule(rule)"
            >
              <td class="px-3 py-3 whitespace-nowrap text-sm">
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                      :class="getTypeColor(rule.type)">
                  {{ formatType(rule.type) }}
                </span>
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatDepartment(rule.department) }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatDocumentType(rule.documentType) }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ rule.initiator }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(rule.amountFrom) }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(rule.amountTo) }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ rule.approver1 || 'N/A' }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ rule.approver2 || 'N/A' }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm text-gray-900">
                {{ rule.approver3 || 'N/A' }}
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-sm">
                <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                      :class="rule.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ rule.status }}
                </span>
              </td>
              <td class="px-3 py-3 whitespace-nowrap text-right text-sm font-medium" @click.stop>
                <div class="flex items-center space-x-2">
                  <button
                    @click.stop="viewRule(rule)"
                    class="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors"
                    title="View"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click.stop="editRule(rule)"
                    class="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-md transition-colors"
                    title="Edit"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click.stop="deleteRule(rule)"
                    class="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete"
                  >
                    <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr v-if="approvalRules.length === 0">
              <td colspan="11" class="px-6 py-8 text-center text-gray-500">
                No approval rules found. Create your first approval rule to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
            :disabled="pagination.page === pagination.totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <span class="font-medium">{{ Math.min(pagination.page * pagination.limit, pagination.total) }}</span>
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
                :disabled="pagination.page === pagination.totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="closeModal"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        >
          <ApprovalRuleForm
            :rule="selectedRule"
            @close="closeModal"
            @success="handleRuleSaved"
          />
        </div>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal && selectedRule" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          @click="showViewModal = false"
        ></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-6 py-6">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900">View Approval Rule</h3>
              <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div class="space-y-6">
              <!-- Basic Information -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-base font-medium text-gray-900 mb-4">Basic Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Type</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatType(selectedRule.type) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Department</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatDepartment(selectedRule.department) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Document Type</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatDocumentType(selectedRule.documentType) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Initiator</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.initiator }}</p>
                  </div>
                </div>
              </div>

              <!-- Amount Range -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-base font-medium text-gray-900 mb-4">Amount Range</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">From</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(selectedRule.amountFrom) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">To</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(selectedRule.amountTo) }}</p>
                  </div>
                </div>
              </div>

              <!-- Approval Chain -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-base font-medium text-gray-900 mb-4">Approval Chain</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div v-if="selectedRule.approver1">
                    <label class="block text-sm font-medium text-gray-700">Primary Approver</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.approver1 }}</p>
                  </div>
                  <div v-if="selectedRule.approver2">
                    <label class="block text-sm font-medium text-gray-700">Secondary Approver</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.approver2 }}</p>
                  </div>
                  <div v-if="selectedRule.approver3">
                    <label class="block text-sm font-medium text-gray-700">Third Approver</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.approver3 }}</p>
                  </div>
                  <div v-if="selectedRule.approver4">
                    <label class="block text-sm font-medium text-gray-700">Fourth Approver</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.approver4 }}</p>
                  </div>
                  <div v-if="selectedRule.approver5">
                    <label class="block text-sm font-medium text-gray-700">Fifth Approver</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.approver5 }}</p>
                  </div>
                </div>
              </div>

              <!-- Status & Metadata -->
              <div class="bg-gray-50 rounded-lg p-4">
                <h4 class="text-base font-medium text-gray-900 mb-4">Rule Status & Information</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Status</label>
                    <p class="mt-1">
                      <span class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                            :class="selectedRule.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                        {{ selectedRule.status }}
                      </span>
                    </p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Created By</label>
                    <p class="mt-1 text-sm text-gray-900">{{ selectedRule.createdBy }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Created At</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedRule.createdAt) }}</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Last Updated</label>
                    <p class="mt-1 text-sm text-gray-900">{{ formatDate(selectedRule.updatedAt) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Actions -->
            <div class="mt-6 flex justify-end space-x-3">
              <button
                @click="showViewModal = false"
                class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                @click="editRule(selectedRule); showViewModal = false"
                class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Rule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import ApprovalRuleForm from '../components/ApprovalRuleForm.vue'
import type { ApprovalRule, ApprovalFilters } from '../types'

const approvalsStore = useApprovalsStore()

// State
const showModal = ref(false)
const showViewModal = ref(false)
const selectedRule = ref<ApprovalRule | null>(null)
const isEditing = ref(false)

const filters = ref<ApprovalFilters>({
  type: undefined,
  department: undefined,
  documentType: undefined,
  status: undefined,
  initiator: '',
  search: ''
})

// Computed
const approvalRules = computed(() => approvalsStore.approvalRules)
const loading = computed(() => approvalsStore.loading)
const error = computed(() => approvalsStore.error)
const stats = computed(() => approvalsStore.stats)
const pagination = computed(() => approvalsStore.pagination)

const hasActiveFilters = computed(() => {
  return !!(
    filters.value.type ||
    filters.value.department ||
    filters.value.documentType ||
    filters.value.status ||
    filters.value.initiator ||
    filters.value.search
  )
})

// Methods
const loadData = async () => {
  await Promise.all([
    approvalsStore.fetchApprovalRules(filters.value),
    approvalsStore.fetchStats(),
    approvalsStore.fetchUsers()
  ])
}

const applyFilters = () => {
  approvalsStore.fetchApprovalRules(filters.value)
}

const clearFilters = () => {
  filters.value = {
    type: undefined,
    department: undefined,
    documentType: undefined,
    status: undefined,
    initiator: '',
    search: ''
  }
  applyFilters()
}

const openCreateModal = () => {
  selectedRule.value = null
  isEditing.value = false
  showModal.value = true
}

const viewRule = (rule: ApprovalRule) => {
  selectedRule.value = rule
  showViewModal.value = true
}

const editRule = (rule: ApprovalRule) => {
  selectedRule.value = rule
  isEditing.value = true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedRule.value = null
  isEditing.value = false
}

const handleRuleSaved = () => {
  closeModal()
  loadData()
}

const deleteRule = async (rule: ApprovalRule) => {
  if (confirm(`Are you sure you want to delete the approval rule for ${rule.type} - ${rule.department}?`)) {
    try {
      await approvalsStore.deleteApprovalRule(rule.id)
    } catch (error) {
      console.error('Error deleting rule:', error)
    }
  }
}

const previousPage = () => {
  if (pagination.value.page > 1) {
    const newPage = pagination.value.page - 1
    approvalsStore.fetchApprovalRules(filters.value, { page: newPage, limit: pagination.value.limit })
  }
}

const nextPage = () => {
  if (pagination.value.page < pagination.value.totalPages) {
    const newPage = pagination.value.page + 1
    approvalsStore.fetchApprovalRules(filters.value, { page: newPage, limit: pagination.value.limit })
  }
}

// Formatting functions
const formatType = (type: string) => {
  const typeMap: Record<string, string> = {
    'OPEX': 'Opex',
    'FUEL_STAFF': 'Fuel-Staff',
    'FUEL_BULK': 'Fuel-Bulk',
    'OPEX_UNCONTRACTED': 'Opex Uncontracted',
    'CAPEX': 'Capex'
  }
  return typeMap[type] || type
}

const formatDepartment = (department: string) => {
  const deptMap: Record<string, string> = {
    'SALES': 'Sales',
    'OPERATIONS': 'Operations',
    'HUMAN_RESOURCE': 'Human Resource',
    'FINANCE': 'Finance',
    'IT': 'IT',
    'MARKETING': 'Marketing'
  }
  return deptMap[department] || department
}

const formatDocumentType = (docType: string) => {
  const docMap: Record<string, string> = {
    'PURCHASE_REQUEST': 'Purchase Request',
    'PURCHASE_ORDER': 'Purchase Order',
    'GOODS_RECEIPT': 'Goods Receipt',
    'GOODS_ISSUE': 'Goods Issue',
    'AP_INVOICE': 'AP Invoice',
    'AP_CREDIT_MEMO': 'AP Credit Memo',
    'AR_INVOICE': 'AR Invoice',
    'AR_CREDIT_MEMO': 'AR Credit Memo',
    'DELIVERY': 'Delivery',
    'RETURN': 'Return'
  }
  return docMap[docType] || docType
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getTypeColor = (type: string) => {
  const colorMap: Record<string, string> = {
    'OPEX': 'bg-blue-100 text-blue-800',
    'FUEL_STAFF': 'bg-green-100 text-green-800',
    'FUEL_BULK': 'bg-yellow-100 text-yellow-800',
    'OPEX_UNCONTRACTED': 'bg-purple-100 text-purple-800',
    'CAPEX': 'bg-red-100 text-red-800'
  }
  return colorMap[type] || 'bg-gray-100 text-gray-800'
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>