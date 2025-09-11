<template>
  <div class="space-y-6">
    <!-- Resource Utilization Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Overall Utilization</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.overallUtilization }}%</p>
            <p class="text-sm text-blue-600">+1.8% from last period</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Resources</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.activeResources }}</p>
            <p class="text-sm text-green-600">of {{ data.totalResources }} total</p>
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
            <p class="text-sm font-medium text-gray-500">Avg. Setup Time</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.averageSetupTime }}</p>
            <p class="text-sm text-yellow-600">minutes</p>
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
            <p class="text-sm font-medium text-gray-500">Idle Time</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.totalIdleTime }}</p>
            <p class="text-sm text-red-600">hours</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Utilization Trends Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Resource Utilization Trends</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Resource utilization trend chart would be rendered here</p>
      </div>
    </div>

    <!-- Resource Categories and Equipment Status -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Utilization by Resource Type</h3>
        <div class="space-y-4">
          <div v-for="category in data.utilizationByCategory" :key="category.category" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ category.category }}</p>
              <p class="text-sm text-gray-500">{{ category.resourceCount }} resources</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ category.utilization }}%</p>
              <div class="flex items-center space-x-2 mt-1">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full"
                    :class="category.utilization >= 80 ? 'bg-green-600' : category.utilization >= 60 ? 'bg-yellow-600' : 'bg-red-600'"
                    :style="{ width: `${Math.min(category.utilization, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Equipment Status</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-green-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Running</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ data.equipmentStatus.running }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Setup</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ data.equipmentStatus.setup }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Maintenance</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ data.equipmentStatus.maintenance }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Idle</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ data.equipmentStatus.idle }}</span>
          </div>
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div class="w-3 h-3 bg-red-500 rounded-full"></div>
              <span class="text-sm font-medium text-gray-700">Breakdown</span>
            </div>
            <span class="text-sm font-semibold text-gray-900">{{ data.equipmentStatus.breakdown }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Work Center Performance -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Work Center Utilization</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Center</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Hours</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Idle Hours</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="workCenter in data.workCenterUtilization" :key="workCenter.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ workCenter.name }}</div>
                  <div class="text-sm text-gray-500">{{ workCenter.code }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.capacity }}h/day
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">{{ workCenter.utilization }}%</div>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full"
                      :class="workCenter.utilization >= 80 ? 'bg-green-600' : workCenter.utilization >= 60 ? 'bg-yellow-600' : 'bg-red-600'"
                      :style="{ width: `${Math.min(workCenter.utilization, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.activeHours }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.idleHours }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(workCenter.status)
                  ]"
                >
                  {{ formatStatus(workCenter.status) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Resource Bottlenecks -->
    <div v-if="data.bottlenecks && data.bottlenecks.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Identified Bottlenecks</h3>
      <div class="space-y-4">
        <div v-for="bottleneck in data.bottlenecks" :key="bottleneck.id" class="border border-red-200 rounded-lg p-4 bg-red-50">
          <div class="flex items-start justify-between">
            <div>
              <h4 class="font-medium text-red-900">{{ bottleneck.resource }}</h4>
              <p class="text-sm text-red-700 mt-1">{{ bottleneck.department }} - {{ bottleneck.workCenter }}</p>
              <p class="text-sm text-red-600 mt-2">{{ bottleneck.description }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-red-900">{{ bottleneck.utilizationRate }}% utilized</p>
              <p class="text-sm text-red-700">{{ bottleneck.queueTime }}h queue time</p>
            </div>
          </div>
          <div class="mt-3">
            <h5 class="text-sm font-medium text-red-800">Impact:</h5>
            <p class="text-sm text-red-700 mt-1">{{ bottleneck.impact }}</p>
          </div>
          <div v-if="bottleneck.recommendations" class="mt-3">
            <h5 class="text-sm font-medium text-red-800">Recommendations:</h5>
            <ul class="list-disc list-inside text-sm text-red-700 mt-1">
              <li v-for="rec in bottleneck.recommendations" :key="rec">{{ rec }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ResourceUtilizationData {
  overallUtilization: number
  activeResources: number
  totalResources: number
  averageSetupTime: number
  totalIdleTime: number
  utilizationByCategory: Array<{
    category: string
    resourceCount: number
    utilization: number
  }>
  equipmentStatus: {
    running: number
    setup: number
    maintenance: number
    idle: number
    breakdown: number
  }
  workCenterUtilization: Array<{
    id: string
    name: string
    code: string
    department: string
    capacity: number
    utilization: number
    activeHours: number
    idleHours: number
    status: string
  }>
  bottlenecks: Array<{
    id: string
    resource: string
    department: string
    workCenter: string
    description: string
    utilizationRate: number
    queueTime: number
    impact: string
    recommendations: string[]
  }>
}

interface Props {
  data: ResourceUtilizationData
}

defineProps<Props>()

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'idle': return 'bg-gray-100 text-gray-800'
    case 'maintenance': return 'bg-blue-100 text-blue-800'
    case 'breakdown': return 'bg-red-100 text-red-800'
    case 'setup': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>