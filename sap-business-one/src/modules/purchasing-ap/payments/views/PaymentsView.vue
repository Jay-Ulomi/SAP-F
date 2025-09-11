<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Purchase Payments</h1>
          <p class="text-gray-600">Manage vendor payments, approvals, and payment processing</p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced Filter System -->
    <div class="bg-white border border-gray-200 rounded-lg">
      <!-- Primary Filters -->
      <div class="p-6 border-b border-gray-200">
        <div
          class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
        >
          <!-- Search -->
          <div class="flex-1 max-w-lg">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="handleSearch"
                type="text"
                placeholder="Search payments..."
                class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Filter Toggle -->
          <div class="flex items-center space-x-3">
            <button
              @click="toggleAdvancedFilters"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L6.293 13H1a1 1 0 01-1-1V4z"
                ></path>
              </svg>
              Filters
              <svg
                class="w-4 h-4 ml-2 transition-transform"
                :class="{ 'rotate-180': showAdvancedFilters }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            <button
              @click="clearAllFilters"
              class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>

      <!-- Advanced Filters -->
      <div v-if="showAdvancedFilters" class="p-6 bg-gray-50 border-b border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.status"
              multiple
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="status in paymentStatuses" :key="status" :value="status">
                {{ formatStatus(status) }}
              </option>
            </select>
          </div>

          <!-- Payment Method Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <select
              v-model="filters.paymentMethod"
              multiple
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="method in paymentMethods" :key="method" :value="method">
                {{ formatPaymentMethod(method) }}
              </option>
            </select>
          </div>

          <!-- Payment Type Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
            <select
              v-model="filters.paymentType"
              multiple
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="type in paymentTypes" :key="type" :value="type">
                {{ formatPaymentType(type) }}
              </option>
            </select>
          </div>

          <!-- Currency Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Currency</label>
            <select
              v-model="filters.currency"
              multiple
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option v-for="currency in currencies" :key="currency" :value="currency">
                {{ currency }}
              </option>
            </select>
          </div>

          <!-- Vendor Code Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Code</label>
            <input
              v-model="filters.vendorCode"
              type="text"
              placeholder="Enter vendor code"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <!-- Vendor Name Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Vendor Name</label>
            <input
              v-model="filters.vendorName"
              type="text"
              placeholder="Enter vendor name"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <!-- Date Range Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Payment Date Range</label>
            <div class="grid grid-cols-2 gap-2">
              <input
                v-model="filters.dateRange.start"
                type="date"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                v-model="filters.dateRange.end"
                type="date"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <!-- Amount Range Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Amount Range</label>
            <div class="grid grid-cols-2 gap-2">
              <input
                v-model.number="filters.amountRange.min"
                type="number"
                placeholder="Min"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                v-model.number="filters.amountRange.max"
                type="number"
                placeholder="Max"
                class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Active Filter Summary -->
      <div v-if="hasActiveFilters" class="p-4 bg-blue-50 border-b border-blue-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-blue-800">Active Filters:</span>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(value, key) in activeFilters"
                :key="key"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ formatFilterLabel(key, value) }}
                <button
                  @click="removeFilter(key)"
                  class="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-500 focus:outline-none focus:bg-blue-500 focus:text-white"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </span>
            </div>
          </div>
          <button
            @click="clearAllFilters"
            class="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Payments</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalPayments || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-green-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Amount</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats?.totalAmount || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Pending Approval</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingPayments || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-purple-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Processed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.processedPayments || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Payments Table -->
    <div class="bg-white border border-gray-200 rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Payments</h3>
          <div class="flex items-center space-x-3">
            <select
              v-model="pagination.limit"
              @change="handlePageSizeChange"
              class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option :value="10">10 per page</option>
              <option :value="25">25 per page</option>
              <option :value="50">50 per page</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500">
          <svg
            class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
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
          Loading payments...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600">{{ error }}</div>
        <button
          @click="loadPayments"
          class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="payments.length === 0" class="p-6 text-center text-gray-500">
        No payments found.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Payment
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Vendor
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Method
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="payment in payments" :key="payment.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center"
                    >
                      <svg
                        class="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ payment.paymentNumber }}</div>
                    <div class="text-sm text-gray-500">{{ payment.docNum }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
                    'bg-blue-100 text-blue-800': payment.status === 'APPROVED',
                    'bg-purple-100 text-purple-800': payment.status === 'PROCESSED',
                    'bg-green-100 text-green-800': payment.status === 'COMPLETED',
                    'bg-red-100 text-red-800': payment.status === 'FAILED',
                    'bg-gray-100 text-gray-800': payment.status === 'CANCELLED',
                    'bg-orange-100 text-orange-800': payment.status === 'ON_HOLD',
                  }"
                >
                  {{ formatStatus(payment.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ payment.vendorName }}</div>
                <div class="text-sm text-gray-500">{{ payment.vendorCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatPaymentMethod(payment.paymentMethod) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(payment.amount) }}
                </div>
                <div class="text-sm text-gray-500">{{ payment.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(payment.paymentDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button @click="viewPayment(payment)" class="text-blue-600 hover:text-blue-900">
                    View
                  </button>
                  <button
                    @click="editPayment(payment)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="deletePayment(payment.id)"
                    class="text-red-600 hover:text-red-900"
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
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="pagination.page === pagination.totalPages"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Payment Details</h3>
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
                <PaymentView v-if="selectedPayment" :payment="selectedPayment" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { usePaymentStore } from '../stores'
import PaymentView from '../components/PaymentView.vue'
import type { Payment, PaymentFilters } from '../types'
import { PaymentStatus, PaymentMethod, PaymentType, Currency } from '../types'

// Store
const paymentStore = usePaymentStore()

// Computed properties from store
const payments = computed(() => paymentStore.payments)
const loading = computed(() => paymentStore.loading)
const error = computed(() => paymentStore.error)
const stats = computed(() => paymentStore.stats)
const pagination = computed(() => paymentStore.pagination)

// Local state
const showAdvancedFilters = ref(false)
const showViewModal = ref(false)
const selectedPayment = ref<Payment | null>(null)
const searchQuery = ref('')

// Filters
const filters = ref<PaymentFilters>({
  dateRange: { start: '', end: '' },
  amountRange: { min: 0, max: 0 },
})

// Computed properties
const hasActiveFilters = computed(() => {
  return Object.keys(filters.value).some((key) => {
    const value = filters.value[key as keyof PaymentFilters]
    if (Array.isArray(value)) return value.length > 0
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some((v) => v !== 0 && v !== '')
    }
    return value !== undefined && value !== '' && value !== false
  })
})

const activeFilters = computed(() => {
  const active: Record<string, any> = {}
  Object.entries(filters.value).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      active[key] = value
    } else if (typeof value === 'object' && value !== null) {
      if (Object.values(value).some((v) => v !== 0 && v !== '')) {
        active[key] = value
      }
    } else if (value !== undefined && value !== '' && value !== false) {
      active[key] = value
    }
  })
  return active
})

// Filter options
const paymentStatuses = computed(() => paymentStore.getPaymentStatuses?.() || [])
const paymentMethods = computed(() => paymentStore.getPaymentMethods?.() || [])
const paymentTypes = computed(() => paymentStore.getPaymentTypes?.() || [])
const currencies = computed(() => paymentStore.getCurrencies?.() || [])

// Methods
const loadPayments = () => {
  paymentStore.loadPayments(filters.value)
}

const loadPaymentStats = () => {
  paymentStore.loadPaymentStats()
}

const handleSearch = () => {
  filters.value.search = searchQuery.value
  loadPayments()
}

const toggleAdvancedFilters = () => {
  showAdvancedFilters.value = !showAdvancedFilters.value
}

const clearAllFilters = () => {
  filters.value = { dateRange: { start: '', end: '' }, amountRange: { min: 0, max: 0 } }
  searchQuery.value = ''
  loadPayments()
}

const removeFilter = (key: string) => {
  if (key === 'search') {
    searchQuery.value = ''
  }
  if (key === 'dateRange') {
    filters.value.dateRange = { start: '', end: '' }
  } else if (key === 'amountRange') {
    filters.value.amountRange = { min: 0, max: 0 }
  } else {
    delete filters.value[key as keyof PaymentFilters]
  }
  loadPayments()
}

const formatFilterLabel = (key: string, value: any): string => {
  switch (key) {
    case 'search':
      return `Search: "${value}"`
    case 'status':
      return `Status: ${value.map((v: string) => formatStatus(v)).join(', ')}`
    case 'paymentMethod':
      return `Method: ${value.map((v: string) => formatPaymentMethod(v)).join(', ')}`
    case 'paymentType':
      return `Type: ${value.map((v: string) => formatPaymentType(v)).join(', ')}`
    case 'currency':
      return `Currency: ${value.join(', ')}`
    case 'vendorCode':
      return `Vendor Code: ${value}`
    case 'vendorName':
      return `Vendor Name: ${value}`
    case 'dateRange':
      return `Date Range: ${value.start} - ${value.end}`
    case 'amountRange':
      return `Amount Range: $${value.min} - $${value.max}`
    default:
      return `${key}: ${value}`
  }
}

const handlePageSizeChange = () => {
  paymentStore.setPageSize(pagination.value.limit)
}

const nextPage = () => {
  paymentStore.nextPage()
}

const previousPage = () => {
  paymentStore.previousPage()
}

const openCreateForm = () => {
  // TODO: Implement payment form
  console.log('Open create form')
}

const editPayment = (payment: Payment) => {
  // TODO: Implement payment form
  console.log('Edit payment:', payment)
}

const viewPayment = (payment: Payment) => {
  selectedPayment.value = payment
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedPayment.value = null
}

const deletePayment = async (id: string) => {
  if (confirm('Are you sure you want to delete this payment?')) {
    try {
      await paymentStore.deletePayment(id)
    } catch (err) {
      console.error('Failed to delete payment:', err)
    }
  }
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'PROCESSED':
      return 'Processed'
    case 'COMPLETED':
      return 'Completed'
    case 'FAILED':
      return 'Failed'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'CHECK':
      return 'Check'
    case 'CASH':
      return 'Cash'
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'WIRE_TRANSFER':
      return 'Wire Transfer'
    case 'ACH':
      return 'ACH'
    case 'OTHER':
      return 'Other'
    default:
      return method
  }
}

const formatPaymentType = (type: string): string => {
  switch (type) {
    case 'INVOICE_PAYMENT':
      return 'Invoice Payment'
    case 'CREDIT_MEMO_APPLICATION':
      return 'Credit Memo Application'
    case 'ADVANCE_PAYMENT':
      return 'Advance Payment'
    case 'REFUND':
      return 'Refund'
    case 'ADJUSTMENT':
      return 'Adjustment'
    default:
      return type
  }
}

// Watchers
watch(
  filters,
  () => {
    loadPayments()
  },
  { deep: true },
)

// Lifecycle
onMounted(() => {
  loadPayments()
  loadPaymentStats()
})
</script>
