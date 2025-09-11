<template>
  <div class="space-y-6">
    <!-- Quality Metrics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Quality Score</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.qualityScore }}%</p>
            <p class="text-sm text-green-600">+3.2% from last period</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Defect Rate</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.defectRate }}%</p>
            <p class="text-sm text-red-600">{{ data.totalDefects }} total defects</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">First Pass Yield</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.firstPassYield }}%</p>
            <p class="text-sm text-blue-600">quality target: 95%</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Rework Rate</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.reworkRate }}%</p>
            <p class="text-sm text-yellow-600">{{ data.totalReworks }} reworks</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Quality Trends Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Quality Trends</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Quality trend chart would be rendered here</p>
      </div>
    </div>

    <!-- Quality by Product and Department -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quality by Product</h3>
        <div class="space-y-4">
          <div v-for="product in data.qualityByProduct" :key="product.itemCode" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ product.itemCode }}</p>
              <p class="text-sm text-gray-500">{{ product.itemName }}</p>
              <p class="text-xs text-gray-400">{{ product.totalProduced }} units produced</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ product.qualityScore }}%</p>
              <p class="text-sm text-gray-500">{{ product.defectCount }} defects</p>
              <div class="flex items-center space-x-2 mt-1">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full"
                    :class="product.qualityScore >= 95 ? 'bg-green-600' : product.qualityScore >= 85 ? 'bg-yellow-600' : 'bg-red-600'"
                    :style="{ width: `${product.qualityScore}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Defect Categories</h3>
        <div class="space-y-4">
          <div v-for="defect in data.defectCategories" :key="defect.category" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ defect.category }}</p>
              <p class="text-sm text-gray-500">{{ defect.description }}</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ defect.count }}</p>
              <p class="text-sm text-gray-500">{{ Math.round((defect.count / data.totalDefects) * 100) }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quality Control Inspections -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Recent Quality Control Inspections</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Order</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspected Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Passed Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed Qty</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="inspection in data.inspections" :key="inspection.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(inspection.inspectionDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ inspection.orderNumber }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ inspection.itemCode }}</div>
                  <div class="text-sm text-gray-500">{{ inspection.itemName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ inspection.inspectedQuantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                {{ inspection.passedQuantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                {{ inspection.failedQuantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ inspection.inspector }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getInspectionStatusColor(inspection.status)
                  ]"
                >
                  {{ formatStatus(inspection.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Quality Issues and Actions -->
    <div v-if="data.qualityIssues && data.qualityIssues.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Outstanding Quality Issues</h3>
      <div class="space-y-4">
        <div v-for="issue in data.qualityIssues" :key="issue.id" class="border border-gray-200 rounded-lg p-4">
          <div class="flex items-start justify-between">
            <div>
              <h4 class="font-medium text-gray-900">{{ issue.title }}</h4>
              <p class="text-sm text-gray-600 mt-1">{{ issue.description }}</p>
              <div class="flex items-center space-x-4 mt-2">
                <span class="text-sm text-gray-500">Order: {{ issue.orderNumber }}</span>
                <span class="text-sm text-gray-500">Item: {{ issue.itemCode }}</span>
                <span class="text-sm text-gray-500">Reported: {{ new Date(issue.reportedDate).toLocaleDateString() }}</span>
              </div>
            </div>
            <div class="text-right">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  getIssuePriorityColor(issue.priority)
                ]"
              >
                {{ issue.priority }}
              </span>
              <p class="text-sm text-gray-500 mt-2">{{ issue.assignedTo }}</p>
            </div>
          </div>
          <div v-if="issue.correctiveActions" class="mt-3">
            <h5 class="text-sm font-medium text-gray-700">Corrective Actions:</h5>
            <p class="text-sm text-gray-600 mt-1">{{ issue.correctiveActions }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface QualityReportData {
  qualityScore: number
  defectRate: number
  totalDefects: number
  firstPassYield: number
  reworkRate: number
  totalReworks: number
  qualityByProduct: Array<{
    itemCode: string
    itemName: string
    totalProduced: number
    qualityScore: number
    defectCount: number
  }>
  defectCategories: Array<{
    category: string
    description: string
    count: number
  }>
  inspections: Array<{
    id: string
    inspectionDate: string
    orderNumber: string
    itemCode: string
    itemName: string
    inspectedQuantity: number
    passedQuantity: number
    failedQuantity: number
    inspector: string
    status: string
  }>
  qualityIssues: Array<{
    id: string
    title: string
    description: string
    orderNumber: string
    itemCode: string
    reportedDate: string
    priority: string
    assignedTo: string
    correctiveActions?: string
  }>
}

interface Props {
  data: QualityReportData
}

defineProps<Props>()

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getInspectionStatusColor(status: string): string {
  switch (status) {
    case 'passed': return 'bg-green-100 text-green-800'
    case 'failed': return 'bg-red-100 text-red-800'
    case 'partial': return 'bg-yellow-100 text-yellow-800'
    case 'pending': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getIssuePriorityColor(priority: string): string {
  switch (priority.toLowerCase()) {
    case 'high': return 'bg-red-100 text-red-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>