<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Budget Management</h1>
        <p class="text-gray-600 mt-1">Create, manage, and track budgets across your organization</p>
      </div>
      <div class="flex space-x-3">
        <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Create Budget
        </button>
        <button @click="showTemplateModal = true" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
          Templates
        </button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Budgets</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalBudgets }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Budgets</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.activeBudgets }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
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
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Budget Amount</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats.totalBudgetAmount) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Variance</p>
            <p
              class="text-2xl font-semibold text-gray-900"
              :class="stats.totalVariance >= 0 ? 'text-red-600' : 'text-green-600'"
            >
              {{ formatCurrency(Math.abs(stats.totalVariance)) }}
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
            placeholder="Search budgets by code, name, or description..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            @input="handleSearch"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedType"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option v-for="type in budgetTypes" :key="type" :value="type">
              {{ formatBudgetType(type) }}
            </option>
          </select>
          <select
            v-model="selectedStatus"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option v-for="status in budgetStatuses" :key="status" :value="status">
              {{ formatBudgetStatus(status) }}
            </option>
          </select>
          <select
            v-model="selectedFiscalYear"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Years</option>
            <option v-for="year in fiscalYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Budgets List -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Budget Management</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Budget Code
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Budget Name
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Fiscal Year
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Budget
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Variance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="budget in budgets" :key="budget.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ budget.code }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ budget.name }}</div>
                <div v-if="budget.description" class="text-sm text-gray-500 truncate max-w-xs">
                  {{ budget.description }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ formatBudgetType(budget.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ budget.fiscalYear }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(budget.status)"
                >
                  {{ formatBudgetStatus(budget.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(budget.totalBudget) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="text-sm font-medium"
                  :class="budget.totalVariance >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  {{ formatCurrency(Math.abs(budget.totalVariance)) }}
                  <span class="text-gray-500">({{ budget.variancePercentage.toFixed(1) }}%)</span>
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="openViewModal(budget)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    v-if="budget.status === 'DRAFT'"
                    @click="openEditModal(budget)"
                    class="text-green-600 hover:text-green-800"
                    title="Edit Budget"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    v-if="budget.status === 'DRAFT'"
                    @click="activateBudget(budget.id)"
                    class="text-blue-600 hover:text-blue-800"
                    title="Activate Budget"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    v-if="budget.status === 'ACTIVE'"
                    @click="closeBudget(budget.id)"
                    class="text-orange-600 hover:text-orange-800"
                    title="Close Budget"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteBudget(budget.id)"
                    class="text-red-600 hover:text-red-800"
                    title="Delete Budget"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div
        v-if="pagination.totalPages > 1"
        class="px-6 py-3 border-t border-gray-200"
      >
        <div class="flex items-center justify-between">
        <div class="flex items-center text-sm text-gray-700">
          <span>
            Showing {{ (pagination.page - 1) * pagination.pageSize + 1 }} to
            {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} of
            {{ pagination.total }} results
          </span>
        </div>
        <div class="flex space-x-2">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page <= 1"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page >= pagination.totalPages"
            class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
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
            {{ editingItem ? 'Edit Budget' : 'Create New Budget' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <BudgetForm
          :initial-data="editingItem"
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
          <h3 class="text-lg font-medium text-gray-900">Budget Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div v-if="selectedItem" class="space-y-6">
          <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex justify-between items-start mb-6">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ selectedItem.name }}</h2>
                <p class="text-gray-600">{{ selectedItem.code }} • {{ selectedItem.fiscalYear }}</p>
              </div>
            </div>

            <!-- Budget Summary -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-600">Total Budget</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ formatCurrency(selectedItem.totalBudget) }}
                </p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-600">Actual Amount</p>
                <p class="text-2xl font-bold text-gray-900">
                  {{ formatCurrency(selectedItem.totalActual) }}
                </p>
              </div>
              <div class="text-center p-4 bg-gray-50 rounded-lg">
                <p class="text-sm font-medium text-gray-600">Variance</p>
                <p
                  class="text-2xl font-bold"
                  :class="selectedItem.totalVariance >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  {{ formatCurrency(Math.abs(selectedItem.totalVariance)) }}
                </p>
                <p class="text-sm text-gray-500">{{ selectedItem.variancePercentage.toFixed(1) }}%</p>
              </div>
            </div>

            <!-- Budget Details -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">Budget Information</h3>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Type:</dt>
                    <dd class="text-sm text-gray-900">{{ formatBudgetType(selectedItem.type) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Status:</dt>
                    <dd class="text-sm text-gray-900">
                      <span
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="getStatusBadgeClass(selectedItem.status)"
                      >
                        {{ formatBudgetStatus(selectedItem.status) }}
                      </span>
                    </dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Currency:</dt>
                    <dd class="text-sm text-gray-900">{{ selectedItem.currency }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Start Date:</dt>
                    <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.startDate) }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">End Date:</dt>
                    <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.endDate) }}</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h3 class="text-lg font-medium text-gray-900 mb-3">Additional Information</h3>
                <dl class="space-y-2">
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Created By:</dt>
                    <dd class="text-sm text-gray-900">{{ selectedItem.createdBy }}</dd>
                  </div>
                  <div class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Created:</dt>
                    <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.createdAt) }}</dd>
                  </div>
                  <div v-if="selectedItem.approvedBy" class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Approved By:</dt>
                    <dd class="text-sm text-gray-900">{{ selectedItem.approvedBy }}</dd>
                  </div>
                  <div v-if="selectedItem.approvedAt" class="flex justify-between">
                    <dt class="text-sm font-medium text-gray-600">Approved:</dt>
                    <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.approvedAt) }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Budget Lines -->
            <div class="mt-6">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-medium text-gray-900">Budget Lines</h3>
                <button @click="showBudgetLines = true" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">View Budget Lines</button>
              </div>
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
        <span class="ml-3 text-gray-600">Loading budgets...</span>
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Budgets</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useBudgetManagementStore } from '../stores/budgetManagementStore'
import BudgetForm from '../components/BudgetForm.vue'
import type { Budget, BudgetFormData } from '../types'
import { BudgetType, BudgetStatus } from '../types'

// Store
const store = useBudgetManagementStore()

// Local state
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<Budget | null>(null)
const selectedItem = ref<Budget | null>(null)
const showTemplateModal = ref(false)
const showBudgetLines = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedFiscalYear = ref('')

// Computed
const budgets = computed(() => store.budgets)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)
const stats = computed(() => store.stats)
const budgetTypes = computed(() => Object.values(BudgetType))
const budgetStatuses = computed(() => Object.values(BudgetStatus))
const fiscalYears = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = currentYear + 2; i >= currentYear - 2; i--) {
    years.push(i)
  }
  return years
})

// Methods
const loadBudgets = () => {
  store.fetchBudgets()
  store.fetchBudgetStats()
}

const handleSearch = () => {
  store.fetchBudgets(1, pagination.value.pageSize, { search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Record<string, string | number> = {}
  if (selectedType.value) filters.type = selectedType.value
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedFiscalYear.value) filters.fiscalYear = parseInt(selectedFiscalYear.value)
  if (searchQuery.value) filters.search = searchQuery.value

  store.fetchBudgets(1, pagination.value.pageSize, filters)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
  selectedFiscalYear.value = ''
  store.resetFilters()
  store.fetchBudgets()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    store.fetchBudgets(page)
  }
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: Budget) => {
  closeViewModal()
  editingItem.value = item
  isCreateModalOpen.value = true
}

const openViewModal = (item: Budget) => {
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

const handleSubmit = async (data: BudgetFormData) => {
  try {
    if (editingItem.value) {
      await store.updateBudget(editingItem.value.id, data)
    } else {
      await store.createBudget(data)
    }
    closeCreateModal()
    // Refresh the list
    store.fetchBudgets()
    store.fetchBudgetStats()
  } catch (error) {
    console.error('Failed to save budget:', error)
  }
}

const deleteBudget = async (id: string) => {
  if (!confirm('Are you sure you want to delete this budget? This action cannot be undone.')) {
    return
  }

  try {
    await store.deleteBudget(id)
    if (selectedItem.value?.id === id) {
      selectedItem.value = null
    }
    // Refresh the list
    store.fetchBudgets()
    store.fetchBudgetStats()
  } catch (error) {
    console.error('Failed to delete budget:', error)
  }
}

const activateBudget = async (id: string) => {
  try {
    await store.activateBudget(id)
    // Refresh the list
    store.fetchBudgets()
    store.fetchBudgetStats()
  } catch (error) {
    console.error('Failed to activate budget:', error)
  }
}

const closeBudget = async (id: string) => {
  try {
    await store.closeBudget(id)
    // Refresh the list
    store.fetchBudgets()
    store.fetchBudgetStats()
  } catch (error) {
    console.error('Failed to close budget:', error)
  }
}

const retryLoad = () => {
  store.clearError()
  loadBudgets()
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatBudgetType = (type: BudgetType): string => {
  switch (type) {
    case BudgetType.ANNUAL:
      return 'Annual'
    case BudgetType.QUARTERLY:
      return 'Quarterly'
    case BudgetType.MONTHLY:
      return 'Monthly'
    case BudgetType.PROJECT:
      return 'Project'
    case BudgetType.DEPARTMENT:
      return 'Department'
    case BudgetType.COST_CENTER:
      return 'Cost Center'
    default:
      return type
  }
}

const formatBudgetStatus = (status: BudgetStatus): string => {
  switch (status) {
    case BudgetStatus.DRAFT:
      return 'Draft'
    case BudgetStatus.ACTIVE:
      return 'Active'
    case BudgetStatus.CLOSED:
      return 'Closed'
    case BudgetStatus.ARCHIVED:
      return 'Archived'
    default:
      return status
  }
}

const getStatusBadgeClass = (status: BudgetStatus): string => {
  switch (status) {
    case BudgetStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case BudgetStatus.ACTIVE:
      return 'bg-green-100 text-green-800'
    case BudgetStatus.CLOSED:
      return 'bg-orange-100 text-orange-800'
    case BudgetStatus.ARCHIVED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Lifecycle
onMounted(() => {
  loadBudgets()
})

// Watch for store changes
watch(
  () => store.currentBudget,
  (budget) => {
    if (budget) {
      selectedItem.value = budget
    }
  },
)
</script>
