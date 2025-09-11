<template>
  <div class="space-y-6">
    <!-- Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Orders</p>
            <p class="text-2xl font-semibold text-gray-900">{{ reportData.summary?.totalOrders || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Completed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ reportData.summary.completedOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">In Progress</p>
            <p class="text-2xl font-semibold text-gray-900">{{ reportData.summary.inProgressOrders }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Quantity</p>
            <p class="text-2xl font-semibold text-gray-900">{{ reportData.summary.totalQuantity.toLocaleString() }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Production Trend Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Production Trend</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Production trend chart would be rendered here</p>
      </div>
    </div>

    <!-- Top Products -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Products by Volume</h3>
        <div class="space-y-4">
          <div v-for="product in reportData.topProductsByVolume" :key="product.itemCode" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ product.itemCode }}</p>
              <p class="text-sm text-gray-500">{{ product.itemName }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ product.totalQuantity.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">units</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Production Status Distribution</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Completed</span>
            <div class="flex items-center space-x-2">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div class="bg-green-600 h-2 rounded-full" :style="{ width: `${reportData.summary.totalOrders > 0 ? (reportData.summary.completedOrders / reportData.summary.totalOrders) * 100 : 0}%` }"></div>
              </div>
              <span class="text-sm text-gray-600">{{ reportData.summary.totalOrders > 0 ? Math.round((reportData.summary.completedOrders / reportData.summary.totalOrders) * 100) : 0 }}%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">In Progress</span>
            <div class="flex items-center space-x-2">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div class="bg-yellow-600 h-2 rounded-full" :style="{ width: `${reportData.summary.totalOrders > 0 ? (reportData.summary.inProgressOrders / reportData.summary.totalOrders) * 100 : 0}%` }"></div>
              </div>
              <span class="text-sm text-gray-600">{{ reportData.summary.totalOrders > 0 ? Math.round((reportData.summary.inProgressOrders / reportData.summary.totalOrders) * 100) : 0 }}%</span>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-700">Pending</span>
            <div class="flex items-center space-x-2">
              <div class="w-32 bg-gray-200 rounded-full h-2">
                <div class="bg-blue-600 h-2 rounded-full" :style="{ width: `${reportData.summary.totalOrders > 0 ? ((reportData.summary.totalOrders - reportData.summary.completedOrders - reportData.summary.inProgressOrders) / reportData.summary.totalOrders) * 100 : 0}%` }"></div>
              </div>
              <span class="text-sm text-gray-600">{{ reportData.summary.totalOrders > 0 ? Math.round(((reportData.summary.totalOrders - reportData.summary.completedOrders - reportData.summary.inProgressOrders) / reportData.summary.totalOrders) * 100) : 0 }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Production Orders -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Recent Production Orders</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order Number</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in reportData.recentOrders" :key="order.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ order.orderNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ order.itemCode }}</div>
                  <div class="text-sm text-gray-500">{{ order.itemName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ order.plannedQuantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(order.status)
                  ]"
                >
                  {{ formatStatus(order.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(order.dueDate).toLocaleDateString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ProductionOverviewData {
  summary: {
    totalOrders: number
    completedOrders: number
    inProgressOrders: number
    totalQuantity: number
  }
  topProductsByVolume: Array<{
    itemCode: string
    itemName: string
    totalQuantity: number
  }>
  recentOrders: Array<{
    id: string
    orderNumber: string
    itemCode: string
    itemName: string
    plannedQuantity: number
    status: string
    dueDate: string
  }>
}

interface Props {
  data: any // Accept any data structure and provide defaults
}

const props = defineProps<Props>()

// Provide safe access to report data with defaults
const reportData = computed(() => {
  const defaultData: ProductionOverviewData = {
    summary: {
      totalOrders: 0,
      completedOrders: 0,
      inProgressOrders: 0,
      totalQuantity: 0
    },
    topProductsByVolume: [],
    recentOrders: []
  }

  if (!props.data || typeof props.data !== 'object') {
    return defaultData
  }

  return {
    summary: {
      totalOrders: props.data.summary?.totalOrders || 0,
      completedOrders: props.data.summary?.completedOrders || 0,
      inProgressOrders: props.data.summary?.inProgressOrders || 0,
      totalQuantity: props.data.summary?.totalQuantity || 0
    },
    topProductsByVolume: Array.isArray(props.data.topProductsByVolume) ? props.data.topProductsByVolume : [],
    recentOrders: Array.isArray(props.data.recentOrders) ? props.data.recentOrders : []
  }
})

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'released': return 'bg-blue-100 text-blue-800'
    case 'in_progress': return 'bg-yellow-100 text-yellow-800'
    case 'completed': return 'bg-green-100 text-green-800'
    case 'closed': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>