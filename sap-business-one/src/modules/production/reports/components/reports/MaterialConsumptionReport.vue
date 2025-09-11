<template>
  <div class="space-y-6">
    <!-- Material Consumption Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Materials Consumed</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.totalMaterialsConsumed.toLocaleString() }}</p>
            <p class="text-sm text-blue-600">units</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Value Consumed</p>
            <p class="text-2xl font-semibold text-gray-900">${{ data.totalValueConsumed.toLocaleString() }}</p>
            <p class="text-sm text-green-600">material costs</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Material Efficiency</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.materialEfficiency }}%</p>
            <p class="text-sm text-yellow-600">vs. planned</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Waste Generated</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.wasteGenerated.toLocaleString() }}</p>
            <p class="text-sm text-red-600">{{ (data.wasteGenerated / data.totalMaterialsConsumed * 100).toFixed(1) }}%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Consumption Trends Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Material Consumption Trends</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Material consumption trend chart would be rendered here</p>
      </div>
    </div>

    <!-- Top Consumed Materials and Categories -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Top Consumed Materials</h3>
        <div class="space-y-4">
          <div v-for="material in data.topConsumedMaterials" :key="material.itemCode" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ material.itemCode }}</p>
              <p class="text-sm text-gray-500">{{ material.itemName }}</p>
              <p class="text-xs text-gray-400">{{ material.unit }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ material.totalConsumed.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">${{ material.totalValue.toLocaleString() }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Consumption by Category</h3>
        <div class="space-y-4">
          <div v-for="category in data.consumptionByCategory" :key="category.category" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ category.category }}</p>
              <p class="text-sm text-gray-500">{{ category.itemCount }} items</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ category.totalConsumed.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">${{ category.totalValue.toLocaleString() }}</p>
              <div class="flex items-center space-x-2 mt-1">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${(category.totalValue / data.totalValueConsumed) * 100}%` }"
                  ></div>
                </div>
                <span class="text-xs text-gray-500">{{ Math.round((category.totalValue / data.totalValueConsumed) * 100) }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Material Issues -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Material Issues Detail</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Material</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="issue in data.materialIssues" :key="issue.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(issue.issueDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ issue.productionOrderNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ issue.itemCode }}</div>
                  <div class="text-sm text-gray-500">{{ issue.itemName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ issue.plannedQuantity.toLocaleString() }} {{ issue.unit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ issue.issuedQuantity.toLocaleString() }} {{ issue.unit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  :class="[
                    'font-medium',
                    issue.variance > 0 ? 'text-red-600' : issue.variance < 0 ? 'text-green-600' : 'text-gray-900'
                  ]"
                >
                  {{ issue.variance > 0 ? '+' : '' }}{{ issue.variance.toLocaleString() }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ issue.unitCost.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                ${{ issue.totalCost.toLocaleString() }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Material Variance Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Material Variances</h3>
        <div class="space-y-4">
          <div v-for="variance in data.materialVariances" :key="variance.itemCode" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ variance.itemCode }}</p>
              <p class="text-sm text-gray-500">{{ variance.itemName }}</p>
            </div>
            <div class="text-right">
              <p
                :class="[
                  'font-semibold',
                  variance.variancePercent > 5 ? 'text-red-600' : variance.variancePercent < -5 ? 'text-green-600' : 'text-gray-900'
                ]"
              >
                {{ variance.variancePercent > 0 ? '+' : '' }}{{ variance.variancePercent.toFixed(1) }}%
              </p>
              <p class="text-sm text-gray-500">{{ variance.variance.toLocaleString() }} {{ variance.unit }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Waste Analysis</h3>
        <div class="space-y-4">
          <div v-for="waste in data.wasteAnalysis" :key="waste.category" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ waste.category }}</p>
              <p class="text-sm text-gray-500">{{ waste.description }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-red-600">{{ waste.quantity.toLocaleString() }}</p>
              <p class="text-sm text-gray-500">${{ waste.value.toLocaleString() }} lost</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <div v-if="data.recommendations && data.recommendations.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Optimization Recommendations</h3>
      <div class="space-y-4">
        <div v-for="recommendation in data.recommendations" :key="recommendation.id" class="border border-blue-200 rounded-lg p-4 bg-blue-50">
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svg class="w-5 h-5 text-blue-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="font-medium text-blue-900">{{ recommendation.title }}</h4>
              <p class="text-sm text-blue-700 mt-1">{{ recommendation.description }}</p>
              <div v-if="recommendation.potentialSavings" class="mt-2">
                <p class="text-sm font-medium text-blue-800">Potential savings: ${{ recommendation.potentialSavings.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MaterialConsumptionData {
  totalMaterialsConsumed: number
  totalValueConsumed: number
  materialEfficiency: number
  wasteGenerated: number
  topConsumedMaterials: Array<{
    itemCode: string
    itemName: string
    unit: string
    totalConsumed: number
    totalValue: number
  }>
  consumptionByCategory: Array<{
    category: string
    itemCount: number
    totalConsumed: number
    totalValue: number
  }>
  materialIssues: Array<{
    id: string
    issueDate: string
    productionOrderNumber: string
    itemCode: string
    itemName: string
    plannedQuantity: number
    issuedQuantity: number
    variance: number
    unit: string
    unitCost: number
    totalCost: number
  }>
  materialVariances: Array<{
    itemCode: string
    itemName: string
    variance: number
    variancePercent: number
    unit: string
  }>
  wasteAnalysis: Array<{
    category: string
    description: string
    quantity: number
    value: number
  }>
  recommendations: Array<{
    id: string
    title: string
    description: string
    potentialSavings?: number
  }>
}

interface Props {
  data: MaterialConsumptionData
}

defineProps<Props>()
</script>