<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Production Orders</h1>
        <p class="text-sm text-gray-600">Manage production orders and track manufacturing progress</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Production Order</button>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-8 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Orders</p>
            <p class="text-xl font-bold text-gray-900">{{ totalOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Planned</p>
            <p class="text-xl font-bold text-gray-900">{{ plannedOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Released</p>
            <p class="text-xl font-bold text-gray-900">{{ releasedOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">In Progress</p>
            <p class="text-xl font-bold text-gray-900">{{ inProgressOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-indigo-100">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Completed</p>
            <p class="text-xl font-bold text-gray-900">{{ completedOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-red-100">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Overdue</p>
            <p class="text-xl font-bold text-gray-900">{{ overdueOrdersCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-teal-100">
            <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Completion</p>
            <p class="text-xl font-bold text-gray-900">{{ averageCompletionRate }}%</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-orange-100">
            <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Planned</p>
            <p class="text-xl font-bold text-gray-900">{{ totalPlannedQuantity }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search orders..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="planned">Planned</option>
            <option value="released">Released</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="standard">Standard</option>
            <option value="special">Special</option>
            <option value="disassembly">Disassembly</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterPriority"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            v-model="filterDueDate"
            placeholder="Due date..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Orders Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Production Orders</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Number
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.orderNumber }}</div>
                <div class="text-sm text-gray-500">{{ order.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ order.itemName }}</div>
                <div class="text-sm text-gray-500">{{ order.itemCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ order.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ order.completedQuantity }}/{{ order.plannedQuantity }} {{ order.unit }}</div>
                <div class="text-xs text-gray-500">{{ order.remainingQuantity }} remaining</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full"
                      :class="{
                        'bg-green-600': getProgressPercentage(order) === 100,
                        'bg-blue-600': getProgressPercentage(order) > 0 && getProgressPercentage(order) < 100,
                        'bg-gray-300': getProgressPercentage(order) === 0
                      }"
                      :style="{ width: `${getProgressPercentage(order)}%` }"
                    ></div>
                  </div>
                  <span class="ml-2 text-sm text-gray-600">{{ getProgressPercentage(order) }}%</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'released' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'planned' ? 'bg-gray-100 text-gray-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800',
                  ]"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full capitalize',
                    order.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    order.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    order.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800',
                  ]"
                >
                  {{ order.priority }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ new Date(order.dueDate).toLocaleDateString() }}</div>
                <div class="text-xs" :class="{
                  'text-red-600': isOverdue(order),
                  'text-gray-500': !isOverdue(order)
                }">
                  {{ isOverdue(order) ? 'Overdue' : 'On time' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewOrder(order)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editOrder(order)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit Order"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <!-- Status-specific action buttons -->
                  <button
                    v-if="order.status === 'planned'"
                    @click="releaseOrder(order.id)"
                    class="text-green-600 hover:text-green-900"
                    title="Release Order"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  
                  <button
                    v-if="order.status === 'released'"
                    @click="startOrder(order.id)"
                    class="text-blue-600 hover:text-blue-900"
                    title="Start Production"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4a1 1 0 001 1h4M9 10V9a1 1 0 011-1h4a1 1 0 011 1v1" />
                    </svg>
                  </button>
                  
                  <button
                    v-if="order.status === 'in_progress'"
                    @click="completeOrder(order.id)"
                    class="text-purple-600 hover:text-purple-900"
                    title="Complete Order"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button
                    @click="deleteOrder(order.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete Order"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredOrders.length === 0" class="text-center py-8">
          <p class="text-gray-500">No production orders found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Production Order</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ProductionOrderForm 
          :loading="loading"
          @submit="handleCreateOrder"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedOrder" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Edit Production Order</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ProductionOrderForm 
          :order="selectedOrder"
          :loading="loading"
          @submit="handleUpdateOrder"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedOrder" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Production Order Details - {{ selectedOrder.orderNumber }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- Order Details would go here -->
        <div class="text-center py-8 text-gray-500">Production Order Details Component</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductionOrderStore } from '../stores/productionOrderStore'
import type { ProductionOrder, ProductionOrderFormData } from '../types'
import ProductionOrderForm from '../components/ProductionOrderForm.vue'

const orderStore = useProductionOrderStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedOrder = ref<ProductionOrder | null>(null)

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')
const filterPriority = ref('')
const filterDueDate = ref('')

const filteredOrders = computed(() => {
  let filtered = orderStore.orders

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      order =>
        order.orderNumber.toLowerCase().includes(query) ||
        order.itemName.toLowerCase().includes(query) ||
        order.itemCode.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(order => order.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(order => order.type === filterType.value)
  }

  if (filterPriority.value) {
    filtered = filtered.filter(order => order.priority === filterPriority.value)
  }

  if (filterDueDate.value) {
    filtered = filtered.filter(order => 
      order.dueDate.substring(0, 10) === filterDueDate.value
    )
  }

  return filtered
})

// Statistics computed properties
const totalOrdersCount = computed(() => orderStore.orders.length)
const plannedOrdersCount = computed(() => orderStore.orders.filter(o => o.status === 'planned').length)
const releasedOrdersCount = computed(() => orderStore.orders.filter(o => o.status === 'released').length)
const inProgressOrdersCount = computed(() => orderStore.orders.filter(o => o.status === 'in_progress').length)
const completedOrdersCount = computed(() => orderStore.orders.filter(o => o.status === 'completed').length)
const overdueOrdersCount = computed(() => {
  const now = new Date()
  return orderStore.orders.filter(o => 
    new Date(o.dueDate) < now && 
    !['completed', 'cancelled'].includes(o.status)
  ).length
})

const averageCompletionRate = computed(() => {
  if (orderStore.orders.length === 0) return 0
  const totalPlanned = orderStore.orders.reduce((sum, o) => sum + o.plannedQuantity, 0)
  const totalCompleted = orderStore.orders.reduce((sum, o) => sum + o.completedQuantity, 0)
  return totalPlanned > 0 ? Math.round((totalCompleted / totalPlanned) * 100) : 0
})

const totalPlannedQuantity = computed(() => {
  return orderStore.orders.reduce((sum, o) => sum + o.plannedQuantity, 0)
})

// Helper functions
function getProgressPercentage(order: ProductionOrder): number {
  if (order.plannedQuantity === 0) return 0
  return Math.round((order.completedQuantity / order.plannedQuantity) * 100)
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function isOverdue(order: ProductionOrder): boolean {
  const now = new Date()
  return new Date(order.dueDate) < now && !['completed', 'cancelled'].includes(order.status)
}

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewOrder(order: ProductionOrder) {
  selectedOrder.value = order
  showViewModal.value = true
}

function editOrder(order: ProductionOrder) {
  selectedOrder.value = order
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedOrder.value = null
}

// Production order actions
async function releaseOrder(id: string) {
  if (confirm('Are you sure you want to release this production order?')) {
    try {
      loading.value = true
      await orderStore.releaseOrder(id)
    } catch (error) {
      console.error('Error releasing order:', error)
    } finally {
      loading.value = false
    }
  }
}

async function startOrder(id: string) {
  if (confirm('Are you sure you want to start this production order?')) {
    try {
      loading.value = true
      await orderStore.startOrder(id)
    } catch (error) {
      console.error('Error starting order:', error)
    } finally {
      loading.value = false
    }
  }
}

async function completeOrder(id: string) {
  if (confirm('Are you sure you want to complete this production order?')) {
    try {
      loading.value = true
      await orderStore.completeOrder(id)
    } catch (error) {
      console.error('Error completing order:', error)
    } finally {
      loading.value = false
    }
  }
}

async function deleteOrder(id: string) {
  if (confirm('Are you sure you want to delete this production order?')) {
    try {
      loading.value = true
      await orderStore.deleteOrder(id)
    } catch (error) {
      console.error('Error deleting order:', error)
    } finally {
      loading.value = false
    }
  }
}

async function handleCreateOrder(formData: ProductionOrderFormData) {
  try {
    loading.value = true
    await orderStore.createOrder(formData)
    closeModals()
  } catch (error) {
    console.error('Error creating production order:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateOrder(formData: ProductionOrderFormData) {
  if (!selectedOrder.value) return
  
  try {
    loading.value = true
    await orderStore.updateOrder(selectedOrder.value.id, formData)
    closeModals()
  } catch (error) {
    console.error('Error updating production order:', error)
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterStatus.value = ''
  filterType.value = ''
  filterPriority.value = ''
  filterDueDate.value = ''
}

onMounted(async () => {
  try {
    await Promise.all([
      orderStore.fetchOrders(),
      orderStore.fetchStats()
    ])
  } catch (error) {
    console.error('Error loading production orders:', error)
  }
})
</script>
