<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Sales Orders</h1>
        <p class="text-sm text-gray-600">Manage customer sales orders</p>
      </div>
      <div class="flex space-x-3">
        <button @click="showFormModal = true" class="btn-primary flex items-center justify-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Order
        </button>
        <button @click="loadOrderStats" class="btn-secondary flex items-center justify-center">
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
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
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
            <p class="text-sm font-medium text-gray-600">Open Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.open || 0 }}</p>
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
                d="M13 10V3L4 14h7v7l9-11h-7z"
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Delivery Rate</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ (stats?.deliveryRate || 0).toFixed(1) }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Sales Orders</h3>
        </div>
        <!-- Search and Filters Row -->
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex-1 min-w-[250px]">
            <label class="block text-xs font-medium text-gray-700 mb-1">Search</label>
            <input
              v-model="searchTerm"
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
              <option v-for="status in orderStatuses" :key="status" :value="status">
                {{ status.replace('_', ' ') }}
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
        <p class="mt-2 text-sm text-gray-600">Loading orders...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center">
        <div class="text-red-600 mb-2">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <p class="text-red-600 font-medium">{{ error }}</p>
        <button
          @click="loadData"
          class="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>

      <div v-else-if="salesOrders.length === 0" class="p-8 text-center text-gray-500">
        <svg
          class="w-12 h-12 mx-auto text-gray-400"
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
        <h3 class="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
        <p class="mt-1 text-sm text-gray-500">Get started by creating a new sales order.</p>
      </div>

      <div v-else class="overflow-auto max-h-[calc(100vh-400px)]">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Order
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Customer
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <!-- Item Type Columns -->
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
              <!-- Service Type Columns -->
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
                Total
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
              v-for="order in salesOrders"
              :key="order.id"
              class="hover:bg-gray-50 cursor-pointer transition-colors"
              @click="viewOrder(order)"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ order.docNum }}</div>
                  <div class="text-sm text-gray-500">#{{ order.docEntry }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ order.customerName }}</div>
                  <div class="text-sm text-gray-500">{{ order.customerCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatDate(order.orderDate) }}</div>
                <div class="text-sm text-gray-500">Due: {{ formatDate(order.deliveryDate) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="getStatusBadgeClass(order.status)"
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ order.status.replace('_', ' ') }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <span
                    :class="
                      order.type === 'Item'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-green-100 text-green-800'
                    "
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  >
                    {{ order.type.replace('_', ' ') }}
                  </span>
                </div>
              </td>

              <!-- Item Type Columns -->
              <template v-if="order.type === 'Item'">
                <td
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">
                    {{ getItemsSummary(order) }}
                  </div>
                  <div class="text-sm text-gray-500">{{ getItemCount(order) }} item(s)</div>
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Item'"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">
                    {{ getPrimaryWarehouse(order) }}
                  </div>
                </td>
              </template>

              <!-- Service Type Columns -->
              <template v-if="order.type === 'Service'">
                <td
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">
                    {{ getServicesSummary(order) }}
                  </div>
                  <div class="text-sm text-gray-500">{{ getServiceCount(order) }} service(s)</div>
                </td>
                <td
                  v-if="!selectedType || selectedType === 'Service'"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  <div class="text-sm text-gray-900">
                    {{ getServiceDescription(order) }}
                  </div>
                </td>
              </template>

              <!-- Empty columns for opposite type when no filter is applied -->
              <template
                v-if="order.type === 'Item' && (!selectedType || selectedType === 'Service')"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-gray-400">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-gray-400">-</span>
                </td>
              </template>
              <template
                v-if="order.type === 'Service' && (!selectedType || selectedType === 'Item')"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-gray-400">-</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="text-gray-400">-</span>
                </td>
              </template>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(order.totalAmount) }}
                </div>
                <div class="text-sm text-gray-500">{{ order.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium" @click.stop>
                <div class="flex space-x-2">
                  <button
                    @click.stop="viewOrder(order)"
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
                    @click.stop="editOrder(order)"
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
                    @click.stop="deleteOrder(order)"
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
      <div v-if="pagination.total > pagination.limit" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page * pagination.limit >= pagination.total"
              class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Modal -->
    <div
      v-if="showFormModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click="showFormModal = false"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <SalesOrderForm
          :initial-data="editingOrder ? orderToEdit : undefined"
          :is-editing="!!editingOrder"
          @close="closeFormModal"
          @saved="handleOrderSaved"
        />
      </div>
    </div>

    <!-- View Order Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click="showViewModal = false"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">View Sales Order</h3>
          <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
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
        <SalesOrderView v-if="selectedOrder" :sales-order="selectedOrder" />
      </div>
    </div>

    <!-- Duplicate Order Modal -->
    <div
      v-if="showDuplicateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click="showDuplicateModal = false"
    >
      <div class="relative mx-auto p-6 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-lg font-medium text-gray-900">Duplicate Order</h3>
          <button @click="showDuplicateModal = false" class="text-gray-400 hover:text-gray-600">
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
        <p class="text-sm text-gray-600 mb-4">
          Are you sure you want to duplicate order #{{ selectedOrder?.docNum }}? This will create a
          new draft order with the same line items.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showDuplicateModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="duplicateOrder"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue"
          >
            Duplicate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useSalesOrdersStore } from '../stores/salesOrdersStore'
import SalesOrderForm from '../components/SalesOrderForm.vue'
import SalesOrderView from '../components/SalesOrderView.vue'
import type { SalesOrder, SalesOrderFormData } from '../types'
import { OrderStatus, OrderType } from '../types'

const store = useSalesOrdersStore()

// State
const showFormModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const editingOrder = ref(false)
const orderToEdit = ref<SalesOrder | null>(null)
const selectedOrder = ref<SalesOrder | null>(null)

// Filters
const selectedStatus = ref('')
const selectedType = ref('')
const searchTerm = ref('')
const salesPersonFilter = ref('')
const priorityFilter = ref('')
const dateFromFilter = ref('')
const dateToFilter = ref('')
const deliveryDateFromFilter = ref('')
const deliveryDateToFilter = ref('')
const currencyFilter = ref('')
const minAmountFilter = ref('')
const maxAmountFilter = ref('')

// Computed properties
const salesOrders = computed(() => store.salesOrders)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const stats = computed(() => store.stats)
const pagination = computed(() => store.pagination)

const orderStatuses = computed(() => Object.values(OrderStatus))
const orderTypes = computed(() => Object.values(OrderType))
const formTypes = ['Item', 'Service']

const hasActiveFilters = computed(() => {
  return (
    selectedStatus.value ||
    selectedType.value ||
    searchTerm.value ||
    salesPersonFilter.value ||
    priorityFilter.value ||
    dateFromFilter.value ||
    dateToFilter.value ||
    deliveryDateFromFilter.value ||
    deliveryDateToFilter.value ||
    currencyFilter.value ||
    minAmountFilter.value ||
    maxAmountFilter.value
  )
})

// Methods
const loadData = async () => {
  await store.fetchStats()
  await store.fetchSalesOrders()
}

const loadOrderStats = async () => {
  await store.fetchStats()
}

const applyFilters = () => {
  const filters: Record<string, any> = {}

  if (selectedStatus.value) {
    filters.status = [selectedStatus.value]
  }

  if (selectedType.value) {
    filters.type = [selectedType.value]
  }

  if (searchTerm.value) {
    filters.search = searchTerm.value
  }

  store.updateFilters(filters)
  store.fetchSalesOrders()
}

const clearFilters = () => {
  selectedStatus.value = ''
  selectedType.value = ''
  searchTerm.value = ''
  salesPersonFilter.value = ''
  priorityFilter.value = ''
  dateFromFilter.value = ''
  dateToFilter.value = ''
  deliveryDateFromFilter.value = ''
  deliveryDateToFilter.value = ''
  currencyFilter.value = ''
  minAmountFilter.value = ''
  maxAmountFilter.value = ''
  store.clearFilters()
  store.fetchSalesOrders()
}

const changePage = (page: number) => {
  store.fetchSalesOrders(page, pagination.value.limit)
}

const viewOrder = (order: SalesOrder) => {
  selectedOrder.value = order
  showViewModal.value = true
}

const editOrder = (order: SalesOrder) => {
  orderToEdit.value = order
  editingOrder.value = true
  showFormModal.value = true
}

const deleteOrder = async (order: SalesOrder) => {
  if (confirm(`Are you sure you want to delete order ${order.docNum}?`)) {
    const result = await store.deleteSalesOrder(order.id)
    if (result.success) {
      await loadData()
    }
  }
}

const duplicateOrder = async () => {
  if (selectedOrder.value) {
    // In a real application, you would call the store to duplicate the order
    console.log('Duplicating order:', selectedOrder.value.docNum)
    showDuplicateModal.value = false
    // await store.duplicateSalesOrder(selectedOrder.value.id)
    // await loadData()
  }
}

const closeFormModal = () => {
  showFormModal.value = false
  editingOrder.value = false
  orderToEdit.value = null
}

const handleOrderSaved = async (data: SalesOrderFormData) => {
  closeFormModal()
  await loadData()
}

const getStatusBadgeClass = (status: string) => {
  const statusClasses: Record<string, string> = {
    [OrderStatus.DRAFT]: 'bg-gray-100 text-gray-800',
    [OrderStatus.OPEN]: 'bg-blue-100 text-blue-800',
    [OrderStatus.RELEASED]: 'bg-yellow-100 text-yellow-800',
    [OrderStatus.PARTIALLY_DELIVERED]: 'bg-orange-100 text-orange-800',
    [OrderStatus.FULLY_DELIVERED]: 'bg-green-100 text-green-800',
    [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [OrderStatus.CLOSED]: 'bg-purple-100 text-purple-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Helper functions for extracting data based on order type
const getItemsSummary = (order: SalesOrder) => {
  if (!order.lineItems || order.lineItems.length === 0) return 'No items'

  const firstItem = order.lineItems[0]
  if (order.lineItems.length === 1) {
    return firstItem.itemCode || firstItem.description || 'Item'
  }

  return `${firstItem.itemCode || firstItem.description || 'Item'} +${order.lineItems.length - 1} more`
}

const getItemCount = (order: SalesOrder) => {
  return order.lineItems?.length || 0
}

const getPrimaryWarehouse = (order: SalesOrder) => {
  if (!order.lineItems || order.lineItems.length === 0) return '-'

  const warehouses = [...new Set(order.lineItems.map((item) => item.warehouseCode).filter(Boolean))]
  if (warehouses.length === 0) return '-'
  if (warehouses.length === 1) return warehouses[0]

  return `${warehouses[0]} +${warehouses.length - 1} more`
}

const getServicesSummary = (order: SalesOrder) => {
  if (!order.serviceItems || order.serviceItems.length === 0) return 'No services'

  const firstService = order.serviceItems[0]
  if (order.serviceItems.length === 1) {
    return firstService.description || 'Service'
  }

  return `${firstService.description || 'Service'} +${order.serviceItems.length - 1} more`
}

const getServiceCount = (order: SalesOrder) => {
  return order.serviceItems?.length || 0
}

const getServiceDescription = (order: SalesOrder) => {
  if (!order.serviceItems || order.serviceItems.length === 0) return '-'

  const descriptions = order.serviceItems
    .map((service) => service.description)
    .filter(Boolean)
    .slice(0, 2)

  if (descriptions.length === 0) return '-'
  if (descriptions.length === 1) return descriptions[0]

  return descriptions.join(', ') + (order.serviceItems.length > 2 ? '...' : '')
}

// Lifecycle
onMounted(() => {
  loadData()
})
</script>
