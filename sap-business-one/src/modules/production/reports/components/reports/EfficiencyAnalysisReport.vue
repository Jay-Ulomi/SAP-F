<template>
  <div class="space-y-6">
    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Overall Efficiency</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.overallEfficiency }}%</p>
            <p class="text-sm text-green-600">+2.5% from last period</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Avg. Cycle Time</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.averageCycleTime }}</p>
            <p class="text-sm text-blue-600">hours</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <svg class="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Utilization Rate</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.utilizationRate }}%</p>
            <p class="text-sm text-yellow-600">capacity used</p>
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
            <p class="text-sm font-medium text-gray-500">Downtime Hours</p>
            <p class="text-2xl font-semibold text-gray-900">{{ data.downtimeHours }}</p>
            <p class="text-sm text-red-600">total hours</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Efficiency Trends Chart -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Efficiency Trends</h3>
      <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
        <p class="text-gray-500">Efficiency trend chart would be rendered here</p>
      </div>
    </div>

    <!-- Department Efficiency -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Department Efficiency</h3>
        <div class="space-y-4">
          <div v-for="dept in data.departmentEfficiency" :key="dept.department" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ dept.department }}</p>
              <p class="text-sm text-gray-500">{{ dept.workCenterCount }} work centers</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ dept.efficiency }}%</p>
              <div class="flex items-center space-x-2 mt-1">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full"
                    :class="dept.efficiency >= 85 ? 'bg-green-600' : dept.efficiency >= 70 ? 'bg-yellow-600' : 'bg-red-600'"
                    :style="{ width: `${dept.efficiency}%` }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Downtime Analysis</h3>
        <div class="space-y-4">
          <div v-for="reason in data.downtimeReasons" :key="reason.reason" class="flex items-center justify-between">
            <div>
              <p class="font-medium text-gray-900">{{ reason.reason }}</p>
              <p class="text-sm text-gray-500">{{ reason.occurrences }} occurrences</p>
            </div>
            <div class="text-right">
              <p class="font-semibold text-gray-900">{{ reason.hours }}h</p>
              <p class="text-sm text-gray-500">{{ Math.round((reason.hours / data.downtimeHours) * 100) }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance by Work Center -->
    <div class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Work Center Performance</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Work Center</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Efficiency</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilization</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cycle Time</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downtime</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="workCenter in data.workCenterPerformance" :key="workCenter.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ workCenter.name }}</div>
                  <div class="text-sm text-gray-500">{{ workCenter.code }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="text-sm font-medium text-gray-900">{{ workCenter.efficiency }}%</div>
                  <div class="ml-2 w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      class="h-2 rounded-full"
                      :class="workCenter.efficiency >= 85 ? 'bg-green-600' : workCenter.efficiency >= 70 ? 'bg-yellow-600' : 'bg-red-600'"
                      :style="{ width: `${Math.min(workCenter.efficiency, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.utilization }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.cycleTime }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ workCenter.downtime }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getPerformanceColor(workCenter.efficiency)
                  ]"
                >
                  {{ getPerformanceStatus(workCenter.efficiency) }}
                </span>
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

interface EfficiencyAnalysisData {
  overallEfficiency: number
  averageCycleTime: number
  utilizationRate: number
  downtimeHours: number
  departmentEfficiency: Array<{
    department: string
    efficiency: number
    workCenterCount: number
  }>
  downtimeReasons: Array<{
    reason: string
    hours: number
    occurrences: number
  }>
  workCenterPerformance: Array<{
    id: string
    name: string
    code: string
    efficiency: number
    utilization: number
    cycleTime: number
    downtime: number
  }>
}

interface Props {
  data: EfficiencyAnalysisData
}

defineProps<Props>()

function getPerformanceStatus(efficiency: number): string {
  if (efficiency >= 90) return 'Excellent'
  if (efficiency >= 85) return 'Good'
  if (efficiency >= 70) return 'Average'
  return 'Poor'
}

function getPerformanceColor(efficiency: number): string {
  if (efficiency >= 90) return 'bg-green-100 text-green-800'
  if (efficiency >= 85) return 'bg-blue-100 text-blue-800'
  if (efficiency >= 70) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}
</script>