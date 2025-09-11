<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Opportunity Management</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Opportunity
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Pipeline</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ formatCurrency(stats?.totalPipelineValue || 0, 'USD') }}
          </p>
        </div>
        <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Open Opportunities</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ stats?.openOpportunities || 0 }}
          </p>
        </div>
        <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Win Rate</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.winRate || 0 }}%</p>
        </div>
        <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Avg Deal Size</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ formatCurrency(stats?.averageDealSize || 0, 'USD') }}
          </p>
        </div>
        <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search opportunities..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @keyup.enter="applyFilters"
        />
        <select
          v-model="filters.status"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Statuses</option>
          <option value="LEAD">Lead</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="PROPOSAL">Proposal</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="CLOSED_WON">Closed Won</option>
          <option value="CLOSED_LOST">Closed Lost</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
        <select
          v-model="filters.stage"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Stages</option>
          <option value="DISCOVERY">Discovery</option>
          <option value="QUALIFICATION">Qualification</option>
          <option value="PROPOSAL">Proposal</option>
          <option value="NEGOTIATION">Negotiation</option>
          <option value="CLOSING">Closing</option>
          <option value="CLOSED">Closed</option>
        </select>
        <select
          v-model="filters.type"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Types</option>
          <option value="NEW_BUSINESS">New Business</option>
          <option value="EXISTING_BUSINESS">Existing Business</option>
          <option value="UPSELL">Upsell</option>
          <option value="CROSS_SELL">Cross Sell</option>
          <option value="RENEWAL">Renewal</option>
          <option value="PARTNERSHIP">Partnership</option>
        </select>
        <select
          v-model="filters.priority"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Opportunity Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Opportunities</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Opportunity
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stage
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Probability
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                Loading opportunities...
              </td>
            </tr>
            <tr v-else-if="opportunities.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">
                No opportunities found.
              </td>
            </tr>
            <tr v-for="opportunity in opportunities" :key="opportunity.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">
                        {{ opportunity.title.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ opportunity.title }}</div>
                    <div class="text-sm text-gray-500">{{ opportunity.opportunityCode }}</div>
                    <div
                      v-if="opportunity.description"
                      class="text-sm text-gray-500 truncate max-w-xs"
                    >
                      {{ opportunity.description }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ formatOpportunityStage(opportunity.stage) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': opportunity.status === 'LEAD',
                    'bg-green-100 text-green-800': opportunity.status === 'QUALIFIED',
                    'bg-yellow-100 text-yellow-800': opportunity.status === 'PROPOSAL',
                    'bg-orange-100 text-orange-800': opportunity.status === 'NEGOTIATION',
                    'bg-emerald-100 text-emerald-800': opportunity.status === 'CLOSED_WON',
                    'bg-red-100 text-red-800': opportunity.status === 'CLOSED_LOST',
                    'bg-gray-100 text-gray-800': opportunity.status === 'ON_HOLD',
                  }"
                >
                  {{ formatOpportunityStatus(opportunity.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ opportunity.customerName }}</div>
                <div class="text-sm text-gray-500">
                  {{ formatCustomerType(opportunity.customerType) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{
                  formatCurrency(opportunity.financial.totalValue, opportunity.financial.currency)
                }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ opportunity.financial.probability }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ opportunity.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="openViewModal(opportunity)"
                    class="text-sap-blue hover:text-sap-blue-dark"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    @click="openEditModal(opportunity)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="openDuplicateModal(opportunity)"
                    class="text-yellow-600 hover:text-yellow-900"
                    title="Duplicate"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2m0-4h5m-5 0h.01"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteOpportunity(opportunity.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="!pagination.hasPrev"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!pagination.hasNext"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
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
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                @click="goToPage(p)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  pagination.page === p
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <!-- Create/Edit Opportunity Modal -->
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
            {{ editingOpportunity ? 'Edit Opportunity' : 'Create New Opportunity' }}
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

        <OpportunityForm
          :opportunity="editingOpportunity"
          @submit="handleSubmitOpportunity"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Opportunity Modal -->
    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Opportunity Details</h3>
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

        <OpportunityView v-if="viewingOpportunity" :opportunity="viewingOpportunity" />
      </div>
    </div>

    <!-- Duplicate Opportunity Modal -->
    <div
      v-if="isDuplicateModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeDuplicateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-md shadow-lg rounded-md bg-white"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Duplicate Opportunity</h3>
          <button @click="closeDuplicateModal" class="text-gray-400 hover:text-gray-600">
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

        <form @submit.prevent="handleDuplicateOpportunity" class="space-y-4">
          <div>
            <label
              for="duplicateOpportunityCode"
              class="block text-sm font-medium text-gray-700 mb-1"
              >New Opportunity Code *</label
            >
            <input
              type="text"
              id="duplicateOpportunityCode"
              v-model="duplicateForm.opportunityCode"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >New Opportunity Title *</label
            >
            <input
              type="text"
              id="duplicateOpportunityTitle"
              v-model="duplicateForm.title"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Customer Name *</label>
            <input
              type="text"
              id="duplicateCustomerName"
              v-model="duplicateForm.customerName"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeDuplicateModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md shadow-sm hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Duplicate
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOpportunityStore } from '../stores'
import OpportunityForm from '../components/OpportunityForm.vue'
import OpportunityView from '../components/OpportunityView.vue'
import type { Opportunity, OpportunityFormData, OpportunityFilters } from '../types'
import {
  OpportunityStatus,
  OpportunityStage,
  OpportunityType,
  OpportunityPriority,
  OpportunitySource,
} from '../types'

const opportunityStore = useOpportunityStore()

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isDuplicateModalOpen = ref(false)
const editingOpportunity = ref<Opportunity | null>(null)
const viewingOpportunity = ref<Opportunity | null>(null)

const searchQuery = ref('')
const filters = ref<OpportunityFilters>({
  status: '',
  stage: '',
  type: '',
  priority: '',
})

const opportunities = computed(() => opportunityStore.opportunities)
const loading = computed(() => opportunityStore.loading)
const stats = computed(() => opportunityStore.stats)
const pagination = computed(() => opportunityStore.pagination)

const openCreateModal = () => {
  editingOpportunity.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (opportunity: Opportunity) => {
  editingOpportunity.value = { ...opportunity }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editingOpportunity.value = null
}

const openViewModal = (opportunity: Opportunity) => {
  viewingOpportunity.value = opportunity
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  viewingOpportunity.value = null
}

const duplicateForm = ref({
  opportunityCode: '',
  title: '',
  customerName: '',
})

const openDuplicateModal = (opportunity: Opportunity) => {
  editingOpportunity.value = opportunity
  duplicateForm.value.opportunityCode = ''
  duplicateForm.value.title = ''
  duplicateForm.value.customerName = ''
  isDuplicateModalOpen.value = true
}

const closeDuplicateModal = () => {
  isDuplicateModalOpen.value = false
  editingOpportunity.value = null
  duplicateForm.value = { opportunityCode: '', title: '', customerName: '' }
}

const handleSubmitOpportunity = async (formData: OpportunityFormData) => {
  try {
    if (editingOpportunity.value) {
      await opportunityStore.updateOpportunity(editingOpportunity.value.id, formData)
    } else {
      await opportunityStore.createOpportunity(formData)
    }
    closeCreateModal()
    await opportunityStore.loadOpportunities()
    await opportunityStore.loadOpportunityStats()
  } catch (err) {
    console.error('Error submitting opportunity:', err)
  }
}

const handleDuplicateOpportunity = async () => {
  if (!editingOpportunity.value) return

  try {
    await opportunityStore.duplicateOpportunity(
      editingOpportunity.value.id,
      duplicateForm.value.opportunityCode,
      duplicateForm.value.title,
      duplicateForm.value.customerName,
    )
    closeDuplicateModal()
    await opportunityStore.loadOpportunities()
    await opportunityStore.loadOpportunityStats()
  } catch (err) {
    console.error('Error duplicating opportunity:', err)
  }
}

const deleteOpportunity = async (id: string) => {
  if (confirm('Are you sure you want to delete this opportunity?')) {
    try {
      await opportunityStore.deleteOpportunity(id)
      await opportunityStore.loadOpportunities()
      await opportunityStore.loadOpportunityStats()
    } catch (err) {
      console.error('Error deleting opportunity:', err)
    }
  }
}

const applyFilters = () => {
  const newFilters: OpportunityFilters = {}

  if (searchQuery.value.trim()) {
    newFilters.search = searchQuery.value.trim()
  }

  if (filters.value.status) {
    newFilters.status = filters.value.status
  }

  if (filters.value.stage) {
    newFilters.stage = filters.value.stage
  }

  if (filters.value.type) {
    newFilters.type = filters.value.type
  }

  if (filters.value.priority) {
    newFilters.priority = filters.value.priority
  }

  opportunityStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    status: '',
    stage: '',
    type: '',
    priority: '',
  }
  opportunityStore.clearFilters()
}

const nextPage = () => opportunityStore.nextPage()
const previousPage = () => opportunityStore.previousPage()
const goToPage = (page: number) => opportunityStore.goToPage(page)

// Utility functions for display
const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatOpportunityStatus = (status: OpportunityStatus) => {
  const statusMap: Record<OpportunityStatus, string> = {
    LEAD: 'Lead',
    QUALIFIED: 'Qualified',
    PROPOSAL: 'Proposal',
    NEGOTIATION: 'Negotiation',
    CLOSED_WON: 'Closed Won',
    CLOSED_LOST: 'Closed Lost',
    ON_HOLD: 'On Hold',
  }
  return statusMap[status] || status
}

const formatOpportunityStage = (stage: OpportunityStage) => {
  const stageMap: Record<OpportunityStage, string> = {
    DISCOVERY: 'Discovery',
    QUALIFICATION: 'Qualification',
    PROPOSAL: 'Proposal',
    NEGOTIATION: 'Negotiation',
    CLOSING: 'Closing',
    CLOSED: 'Closed',
  }
  return stageMap[stage] || stage
}

const formatOpportunityType = (type: OpportunityType) => {
  const typeMap: Record<OpportunityType, string> = {
    NEW_BUSINESS: 'New Business',
    EXISTING_BUSINESS: 'Existing Business',
    UPSELL: 'Upsell',
    CROSS_SELL: 'Cross Sell',
    RENEWAL: 'Renewal',
    PARTNERSHIP: 'Partnership',
  }
  return typeMap[type] || type
}

const formatCustomerType = (type: string) => {
  const typeMap: Record<string, string> = {
    EXISTING: 'Existing',
    PROSPECT: 'Prospect',
    PARTNER: 'Partner',
  }
  return typeMap[type] || type
}

onMounted(() => {
  opportunityStore.loadOpportunities()
  opportunityStore.loadOpportunityStats()
})
</script>
