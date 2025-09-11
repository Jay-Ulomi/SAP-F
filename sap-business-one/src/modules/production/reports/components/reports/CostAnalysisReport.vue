<template>
  <div class="space-y-6">
    <!-- Cost Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Production Cost</p>
            <p class="text-2xl font-semibold text-gray-900">${{ data.totalCost.toLocaleString() }}</p>
            <p class="text-sm text-green-600">-5.2% from last period</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Material Costs</p>
            <p class="text-2xl font-semibold text-gray-900">${{ data.materialCosts.toLocaleString() }}</p>
            <p class="text-sm text-blue-600">{{ Math.round((data.materialCosts / data.totalCost) * 100) }}% of total</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Labor Costs</p>
            <p class="text-2xl font-semibold text-gray-900">${{ data.laborCosts.toLocaleString() }}</p>
            <p class="text-sm text-purple-600">{{ Math.round((data.laborCosts / data.totalCost) * 100) }}% of total</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Overhead Costs</p>
            <p class="text-2xl font-semibold text-gray-900">${{ data.overheadCosts.toLocaleString() }}</p>
            <p class="text-sm text-orange-600">{{ Math.round((data.overheadCosts / data.totalCost) * 100) }}% of total</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Cost Breakdown Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Cost Breakdown</h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p class="text-gray-500">Cost breakdown chart would be rendered here</p>
        </div>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-blue-500 rounded"></div>
              <span class="text-sm font-medium text-gray-700">Material Costs</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">${{ data.materialCosts.toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-purple-500 rounded"></div>
              <span class="text-sm font-medium text-gray-700">Labor Costs</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">${{ data.laborCosts.toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-4 h-4 bg-orange-500 rounded"></div>
              <span class="text-sm font-medium text-gray-700">Overhead Costs</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">${{ data.overheadCosts.toLocaleString() }}</span>
          </div>
          <div class="flex items-center justify-between border-t pt-2">
            <span class="text-sm font-semibold text-gray-900">Total Cost</span>
            <span class="text-sm font-bold text-gray-900">${{ data.totalCost.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cost by Product -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cost by Product</h3>
        <div class="space-y-4">
          <div v-for="product in data.costByProduct" :key="product.itemCode" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ product.itemCode }}</p>
              <p class="text-sm text-gray-500">{{ product.itemName }}</p>
              <p class="text-xs text-gray-400">{{ product.quantity }} units</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">${{ product.totalCost.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">${{ product.unitCost.toFixed(2) }}/unit</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cost Variance Analysis</h3>
        <div class="space-y-4">
          <div v-for="variance in data.costVariances" :key="variance.category" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ variance.category }}</p>
              <p class="text-sm text-gray-500">Budgeted: ${{ variance.budgeted.toLocaleString() }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">${{ variance.actual.toLocaleString() }}</p>
              <p
                :class="[
                  'text-sm font-medium',
                  variance.variance > 0 ? 'text-red-600' : 'text-green-600'
                ]"
              >
                {{ variance.variance > 0 ? '+' : '' }}${{ variance.variance.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Detailed Cost Table -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Detailed Cost Analysis</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Labor Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overhead Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in data.detailedCosts" :key="order.id">
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
                {{ order.quantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ order.materialCost.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ order.laborCost.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ order.overheadCost.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                ${{ order.totalCost.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ (order.totalCost / order.quantity).toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CostAnalysisData {
  totalCost: number
  materialCosts: number
  laborCosts: number
  overheadCosts: number
  costByProduct: Array<{
    itemCode: string
    itemName: string
    quantity: number
    totalCost: number
    unitCost: number
  }>
  costVariances: Array<{
    category: string
    budgeted: number
    actual: number
    variance: number
  }>
  detailedCosts: Array<{
    id: string
    orderNumber: string
    itemCode: string
    itemName: string
    quantity: number
    materialCost: number
    laborCost: number
    overheadCost: number
    totalCost: number
  }>
}

interface Props {
  data: CostAnalysisData
}

defineProps<Props>()
</script>