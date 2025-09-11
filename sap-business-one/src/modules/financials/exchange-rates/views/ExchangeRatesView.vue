<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Exchange Rate Differences</h1>
        <p class="text-gray-600 mt-1">Manage exchange rates and track currency differences</p>
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
          Add Rate
        </button>
        <button @click="showImportModal = true" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            ></path>
          </svg>
          Import Rates
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Rates</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.activeRates }}</p>
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Differences</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalDifferences }}</p>
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
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Difference Amount</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats.totalDifferenceAmount) }}
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
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Difference %</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ stats.averageDifferencePercentage.toFixed(2) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Currency Pairs Overview -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-medium text-gray-900">Currency Pairs</h2>
        <div class="flex space-x-2">
          <button @click="refreshRates" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Refresh
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="pair in currencyPairs"
          :key="`${pair.baseCurrency}-${pair.targetCurrency}`"
          class="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
        >
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium text-gray-900">
              {{ pair.baseCurrency }}/{{ pair.targetCurrency }}
            </h3>
            <span
              class="text-sm font-medium px-2 py-1 rounded-full"
              :class="pair.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
            >
              {{ pair.change >= 0 ? '+' : '' }}{{ pair.changePercentage.toFixed(2) }}%
            </span>
          </div>
          <div class="text-2xl font-bold text-gray-900 mb-2">
            {{ pair.currentRate.toFixed(4) }}
          </div>
          <div class="text-sm text-gray-600 space-y-1">
            <div class="flex justify-between">
              <span>Previous:</span>
              <span>{{ pair.previousRate.toFixed(4) }}</span>
            </div>
            <div class="flex justify-between">
              <span>Change:</span>
              <span :class="pair.change >= 0 ? 'text-green-600' : 'text-red-600'">
                {{ pair.change >= 0 ? '+' : '' }}{{ pair.change.toFixed(4) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span>Updated:</span>
              <span>{{ formatDate(pair.lastUpdated) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-2 px-1 border-b-2 font-medium text-sm"
            :class="
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            "
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <!-- Exchange Rates Tab -->
      <div v-if="activeTab === 'rates'" class="py-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Exchange Rates</h3>
          <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Add New Rate</button>
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="flex-1">
            <input
              v-model="rateSearchQuery"
              type="text"
              placeholder="Search rates..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="selectedBaseCurrency"
              @change="handleRateFilterChange"
              class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Base Currencies</option>
              <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
            <select
              v-model="selectedRateType"
              @change="handleRateFilterChange"
              class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option v-for="type in rateTypes" :key="type" :value="type">
                {{ formatRateType(type) }}
              </option>
            </select>
            <button
              @click="resetRateFilters"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Rates Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Currency Pair
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Rate
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Effective Date
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Source
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
              <tr v-for="rate in exchangeRates" :key="rate.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ rate.baseCurrency }}/{{ rate.targetCurrency }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ rate.rate.toFixed(4) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ formatRateType(rate.rateType) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(rate.effectiveDate) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ rate.source }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="
                      rate.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    "
                  >
                    {{ rate.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="openEditModal(rate)"
                      class="text-sap-blue hover:text-sap-dark-blue"
                      title="Edit Rate"
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
                      @click="deleteRate(rate.id)"
                      class="text-red-600 hover:text-red-800"
                      title="Delete Rate"
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
      </div>

      <!-- Exchange Rate Differences Tab -->
      <div v-if="activeTab === 'differences'" class="py-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Exchange Rate Differences</h3>
          <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Add Difference</button>
        </div>

        <!-- Filters -->
        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <div class="flex-1">
            <input
              v-model="differenceSearchQuery"
              type="text"
              placeholder="Search differences..."
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
          <div class="flex gap-2">
            <select
              v-model="selectedDifferenceType"
              @change="handleDifferenceFilterChange"
              class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Types</option>
              <option value="SALE">Sale</option>
              <option value="PURCHASE">Purchase</option>
              <option value="PAYMENT">Payment</option>
              <option value="RECEIPT">Receipt</option>
              <option value="ADJUSTMENT">Adjustment</option>
            </select>
            <select
              v-model="selectedPostedStatus"
              @change="handleDifferenceFilterChange"
              class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="">All Status</option>
              <option value="true">Posted</option>
              <option value="false">Unposted</option>
            </select>
            <button
              @click="resetDifferenceFilters"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Reset
            </button>
          </div>
        </div>

        <!-- Differences Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Currency Pair
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Transaction
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Original Amount
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Difference
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Document
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
              <tr
                v-for="difference in exchangeRateDifferences"
                :key="difference.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">
                    {{ difference.baseCurrency }}/{{ difference.targetCurrency }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ difference.transactionType }}</div>
                  <div class="text-sm text-gray-500">
                    {{ formatDate(difference.transactionDate) }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(difference.originalAmount) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="text-sm font-medium"
                    :class="difference.difference >= 0 ? 'text-red-600' : 'text-green-600'"
                  >
                    {{ formatCurrency(Math.abs(difference.difference)) }}
                    <span class="text-gray-500"
                      >({{ difference.differencePercentage.toFixed(2) }}%)</span
                    >
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ difference.documentNumber }}</div>
                  <div class="text-sm text-gray-500">{{ difference.documentType }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="
                      difference.isPosted
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    "
                  >
                    {{ difference.isPosted ? 'Posted' : 'Unposted' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="openViewModal(difference)"
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
                      v-if="!difference.isPosted"
                      @click="openEditModal(difference)"
                      class="text-green-600 hover:text-green-800"
                      title="Edit Difference"
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
                      @click="deleteDifference(difference.id)"
                      class="text-red-600 hover:text-red-800"
                      title="Delete Difference"
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
            {{ editingItem ? 'Edit Exchange Rate' : 'Create New Exchange Rate' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <ExchangeRateForm
          :initial-data="editingItem"
          :loading="loading"
          :currencies="currencies"
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
          <h3 class="text-lg font-medium text-gray-900">Exchange Rate Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div v-if="selectedItem">
          <dl class="space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Currency Pair</dt>
              <dd class="text-sm text-gray-900">{{ selectedItem.baseCurrency }}/{{ selectedItem.targetCurrency }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Rate</dt>
              <dd class="text-sm text-gray-900">{{ selectedItem.rate }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Type</dt>
              <dd class="text-sm text-gray-900">{{ selectedItem.rateType }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Effective Date</dt>
              <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.effectiveDate) }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Source</dt>
              <dd class="text-sm text-gray-900">{{ selectedItem.source }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Status</dt>
              <dd class="text-sm text-gray-900">{{ selectedItem.isActive ? 'Active' : 'Inactive' }}</dd>
            </div>
          </dl>
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
        <span class="ml-3 text-gray-600">Loading exchange rates...</span>
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
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Exchange Rates</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ExchangeRateForm from '../components/ExchangeRateForm.vue'
import ExchangeRateDifferenceForm from '../components/ExchangeRateDifferenceForm.vue'
import type {
  ExchangeRate,
  ExchangeRateDifference,
  Currency,
  ExchangeRateStats,
  CurrencyPair,
  ExchangeRateFormData,
  ExchangeRateDifferenceFormData,
} from '../types'
import { ExchangeRateType, CurrencyCode } from '../types'

// Local state
const activeTab = ref('rates')
const loading = ref(false)
const error = ref<string | null>(null)
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<ExchangeRate | null>(null)
const selectedItem = ref<ExchangeRate | null>(null)
const showImportModal = ref(false)

// Search and filters
const rateSearchQuery = ref('')
const differenceSearchQuery = ref('')
const selectedBaseCurrency = ref('')
const selectedRateType = ref('')
const selectedDifferenceType = ref('')
const selectedPostedStatus = ref('')

// Mock data for demonstration
const exchangeRates = ref<ExchangeRate[]>([])
const exchangeRateDifferences = ref<ExchangeRateDifference[]>([])
const currencyPairs = ref<CurrencyPair[]>([])
const stats = ref<ExchangeRateStats>({
  totalRates: 0,
  activeRates: 0,
  totalDifferences: 0,
  postedDifferences: 0,
  unpostedDifferences: 0,
  totalDifferenceAmount: 0,
  averageDifferencePercentage: 0,
  ratesByType: {} as Record<ExchangeRateType, number>,
  topCurrencies: [],
})

const currencies = ref<Currency[]>([])
const rateTypes = computed(() => Object.values(ExchangeRateType))

// Tabs configuration
const tabs = [
  { id: 'rates', name: 'Exchange Rates' },
  { id: 'differences', name: 'Rate Differences' },
]

// Methods
const loadData = async () => {
  try {
    loading.value = true
    error.value = null

    // Load mock data
    await loadMockData()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to load exchange rates'
  } finally {
    loading.value = false
  }
}

const loadMockData = async () => {
  // Mock exchange rates
  exchangeRates.value = [
    {
      id: '1',
      baseCurrency: CurrencyCode.USD,
      targetCurrency: CurrencyCode.EUR,
      rate: 0.85,
      rateType: ExchangeRateType.SPOT,
      effectiveDate: '2024-01-15',
      source: 'ECB',
      isActive: true,
      createdBy: 'System',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
    {
      id: '2',
      baseCurrency: CurrencyCode.USD,
      targetCurrency: CurrencyCode.GBP,
      rate: 0.73,
      rateType: ExchangeRateType.SPOT,
      effectiveDate: '2024-01-15',
      source: 'Bank of England',
      isActive: true,
      createdBy: 'System',
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z',
    },
  ]

  // Mock currency pairs
  currencyPairs.value = [
    {
      baseCurrency: CurrencyCode.USD,
      targetCurrency: CurrencyCode.EUR,
      currentRate: 0.85,
      previousRate: 0.84,
      change: 0.01,
      changePercentage: 1.19,
      lastUpdated: '2024-01-15T10:00:00Z',
      volume24h: 1000000,
      high24h: 0.86,
      low24h: 0.84,
    },
    {
      baseCurrency: CurrencyCode.USD,
      targetCurrency: CurrencyCode.GBP,
      currentRate: 0.73,
      previousRate: 0.74,
      change: -0.01,
      changePercentage: -1.35,
      lastUpdated: '2024-01-15T10:00:00Z',
      volume24h: 800000,
      high24h: 0.74,
      low24h: 0.72,
    },
  ]

  // Mock exchange rate differences
  exchangeRateDifferences.value = [
    {
      id: '1',
      baseCurrency: CurrencyCode.USD,
      targetCurrency: CurrencyCode.EUR,
      transactionDate: '2024-01-10',
      postingDate: '2024-01-15',
      originalAmount: 10000,
      originalRate: 0.84,
      currentRate: 0.85,
      difference: 100,
      differencePercentage: 1.19,
      transactionType: 'SALE',
      documentNumber: 'INV-001',
      documentType: 'Invoice',
      businessPartner: 'ABC Corp',
      account: 'Accounts Receivable',
      isPosted: false,
      createdBy: 'User',
      createdAt: '2024-01-15T00:00:00Z',
    },
  ]

  // Mock currencies
  currencies.value = [
    {
      code: CurrencyCode.USD,
      name: 'US Dollar',
      symbol: '$',
      isBaseCurrency: true,
      isActive: true,
      decimalPlaces: 2,
      exchangeRateSource: 'Federal Reserve',
    },
    {
      code: CurrencyCode.EUR,
      name: 'Euro',
      symbol: '€',
      isBaseCurrency: false,
      isActive: true,
      decimalPlaces: 2,
      exchangeRateSource: 'ECB',
    },
    {
      code: CurrencyCode.GBP,
      name: 'British Pound',
      symbol: '£',
      isBaseCurrency: false,
      isActive: true,
      decimalPlaces: 2,
      exchangeRateSource: 'Bank of England',
    },
  ]

  // Update stats
  stats.value = {
    totalRates: exchangeRates.value.length,
    activeRates: exchangeRates.value.filter((r) => r.isActive).length,
    totalDifferences: exchangeRateDifferences.value.length,
    postedDifferences: exchangeRateDifferences.value.filter((d) => d.isPosted).length,
    unpostedDifferences: exchangeRateDifferences.value.filter((d) => !d.isPosted).length,
    totalDifferenceAmount: exchangeRateDifferences.value.reduce(
      (sum, d) => sum + Math.abs(d.difference),
      0,
    ),
    averageDifferencePercentage:
      exchangeRateDifferences.value.reduce((sum, d) => sum + d.differencePercentage, 0) /
      exchangeRateDifferences.value.length,
    ratesByType: exchangeRates.value.reduce(
      (acc, rate) => {
        acc[rate.rateType] = (acc[rate.rateType] || 0) + 1
        return acc
      },
      {} as Record<ExchangeRateType, number>,
    ),
    topCurrencies: [],
  }
}

const refreshRates = () => {
  loadData()
}

const handleRateFilterChange = () => {
  // Implement rate filtering logic
}

const resetRateFilters = () => {
  rateSearchQuery.value = ''
  selectedBaseCurrency.value = ''
  selectedRateType.value = ''
}

const handleDifferenceFilterChange = () => {
  // Implement difference filtering logic
}

const resetDifferenceFilters = () => {
  differenceSearchQuery.value = ''
  selectedDifferenceType.value = ''
  selectedPostedStatus.value = ''
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: ExchangeRate) => {
  closeViewModal()
  editingItem.value = item
  isCreateModalOpen.value = true
}

const openViewModal = (item: ExchangeRate) => {
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

const handleSubmit = async (formData: ExchangeRateFormData) => {
  try {
    loading.value = true
    if (editingItem.value) {
      // Update existing rate
      const index = exchangeRates.value.findIndex((r) => r.id === editingItem.value?.id)
      if (index !== -1) {
        exchangeRates.value[index] = { ...exchangeRates.value[index], ...formData }
      }
    } else {
      // Create new rate
      const newRate: ExchangeRate = {
        id: Date.now().toString(),
        ...formData,
        isActive: true,
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      exchangeRates.value.push(newRate)
    }
    closeCreateModal()
    loadMockData() // Refresh stats
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save exchange rate'
  } finally {
    loading.value = false
  }
}

const deleteRate = (id: string) => {
  if (confirm('Are you sure you want to delete this exchange rate?')) {
    exchangeRates.value = exchangeRates.value.filter((r) => r.id !== id)
    loadMockData() // Refresh stats
  }
}


const handleSubmitDifference = async (formData: ExchangeRateDifferenceFormData) => {
  try {
    loading.value = true
    if (editingItem.value) {
      // Update existing difference
      const index = exchangeRateDifferences.value.findIndex(
        (d) => d.id === editingItem.value?.id,
      )
      if (index !== -1) {
        exchangeRateDifferences.value[index] = {
          ...exchangeRateDifferences.value[index],
          ...formData,
        }
      }
    } else {
      // Create new difference
      // Calculate difference and percentage
      const difference = (formData.currentRate - formData.originalRate) * formData.originalAmount
      const differencePercentage =
        formData.originalRate !== 0
          ? ((formData.currentRate - formData.originalRate) / formData.originalRate) * 100
          : 0

      const newDifference: ExchangeRateDifference = {
        id: Date.now().toString(),
        ...formData,
        difference,
        differencePercentage,
        isPosted: false,
        createdBy: 'Current User',
        createdAt: new Date().toISOString(),
      }
      exchangeRateDifferences.value.push(newDifference)
    }
    closeCreateModal()
    loadMockData() // Refresh stats
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to save exchange rate difference'
  } finally {
    loading.value = false
  }
}


const deleteDifference = (id: string) => {
  if (confirm('Are you sure you want to delete this exchange rate difference?')) {
    exchangeRateDifferences.value = exchangeRateDifferences.value.filter((d) => d.id !== id)
    loadMockData() // Refresh stats
  }
}

const retryLoad = () => {
  error.value = null
  loadData()
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

const formatRateType = (type: ExchangeRateType): string => {
  switch (type) {
    case ExchangeRateType.SPOT:
      return 'Spot'
    case ExchangeRateType.FORWARD:
      return 'Forward'
    case ExchangeRateType.HISTORICAL:
      return 'Historical'
    case ExchangeRateType.AVERAGE:
      return 'Average'
    default:
      return type
  }
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
