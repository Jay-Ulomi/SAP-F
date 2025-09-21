<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Header -->
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold text-gray-900">Approval Statistics & Reports</h1>
        <p class="mt-2 text-sm text-gray-700">
          Comprehensive analytics and insights into approval workflow performance.
        </p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none space-x-3">
        <button
          @click="exportReport"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          Export Report
        </button>
        <button
          @click="refreshStats"
          :disabled="loading"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <ArrowPathIcon v-if="!loading" class="w-4 h-4 mr-2" />
          <div v-else class="w-4 h-4 mr-2 animate-spin border-2 border-gray-300 border-t-gray-700 rounded-full"></div>
          Refresh
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Key Performance Indicators</h2>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Cog6ToothIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Total Rules
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.totalRules || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CheckCircleIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Active Rules
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.activeRules || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-yellow-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Pending Approvals
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.pendingApprovals || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ChartBarIcon class="h-6 w-6 text-purple-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Approval Rate
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ approvalRate }}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- Rules by Type Chart -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Rules by Type</h3>
        <div class="space-y-4">
          <div v-for="item in stats?.rulesByType || []" :key="item.type" class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                :class="['w-4 h-4 rounded mr-3', getTypeColor(item.type)]"
              ></div>
              <span class="text-sm font-medium text-gray-900">{{ formatType(item.type) }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-500">{{ item.count }} rules</span>
              <div class="w-16 bg-gray-200 rounded-full h-2">
                <div
                  :class="['h-2 rounded-full', getTypeColor(item.type)]"
                  :style="{ width: `${(item.count / totalRulesCount) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Rules by Department Chart -->
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Rules by Department</h3>
        <div class="space-y-4">
          <div v-for="item in stats?.rulesByDepartment || []" :key="item.department" class="flex items-center justify-between">
            <div class="flex items-center">
              <div
                :class="['w-4 h-4 rounded mr-3', getDepartmentColor(item.department)]"
              ></div>
              <span class="text-sm font-medium text-gray-900">{{ formatDepartment(item.department) }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm text-gray-500">{{ item.count }} rules</span>
              <div class="w-16 bg-gray-200 rounded-full h-2">
                <div
                  :class="['h-2 rounded-full', getDepartmentColor(item.department)]"
                  :style="{ width: `${(item.count / totalRulesCount) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Performance Metrics</h2>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <CalendarDaysIcon class="h-6 w-6 text-green-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Approved Today
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.approvedToday || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <XCircleIcon class="h-6 w-6 text-red-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Rejected Today
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ stats?.rejectedToday || 0 }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ClockIcon class="h-6 w-6 text-blue-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    Avg. Response Time
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ averageResponseTime }}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ArrowTrendingUpIcon class="h-6 w-6 text-indigo-400" />
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    SLA Compliance
                  </dt>
                  <dd class="text-lg font-medium text-gray-900">
                    {{ slaCompliance }}%
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Approvers -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:px-6">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Top Approvers (This Month)</h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">
            Most active approvers in the current month.
          </p>
        </div>
        <div class="border-t border-gray-200">
          <dl>
            <div v-for="(approver, index) in topApprovers" :key="approver.name"
                 :class="['px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6',
                         index % 2 === 0 ? 'bg-gray-50' : 'bg-white']">
              <dt class="text-sm font-medium text-gray-500 flex items-center">
                <span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-3">
                  {{ index + 1 }}
                </span>
                {{ approver.name }}
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div class="flex items-center justify-between">
                  <span>{{ approver.count }} approvals</span>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-green-600">{{ approver.approved }} approved</span>
                    <span class="text-xs text-red-600">{{ approver.rejected }} rejected</span>
                  </div>
                </div>
                <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-600 h-2 rounded-full"
                    :style="{ width: `${(approver.count / topApprovers[0]?.count || 1) * 100}%` }"
                  ></div>
                </div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Workflow Efficiency -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Workflow Efficiency Insights</h3>
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Bottlenecks -->
          <div>
            <h4 class="text-base font-medium text-gray-900 mb-3">Potential Bottlenecks</h4>
            <div class="space-y-3">
              <div v-for="bottleneck in bottlenecks" :key="bottleneck.area"
                   class="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div class="flex items-center">
                  <ExclamationTriangleIcon class="h-5 w-5 text-yellow-400 mr-3" />
                  <span class="text-sm font-medium text-gray-900">{{ bottleneck.area }}</span>
                </div>
                <span class="text-sm text-yellow-800">{{ bottleneck.impact }}</span>
              </div>
            </div>
          </div>

          <!-- Recommendations -->
          <div>
            <h4 class="text-base font-medium text-gray-900 mb-3">Recommendations</h4>
            <div class="space-y-3">
              <div v-for="recommendation in recommendations" :key="recommendation.title"
                   class="flex items-start p-3 bg-blue-50 rounded-lg">
                <LightBulbIcon class="h-5 w-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ recommendation.title }}</p>
                  <p class="text-sm text-gray-600 mt-1">{{ recommendation.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Time Period Selector -->
    <div class="mt-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Historical Trends</h3>
        <div class="mb-4">
          <div class="flex space-x-4">
            <button
              v-for="period in timePeriods"
              :key="period.value"
              @click="selectedPeriod = period.value"
              :class="[
                'px-3 py-2 text-sm font-medium rounded-md',
                selectedPeriod === period.value
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ period.label }}
            </button>
          </div>
        </div>

        <!-- Mock trend data -->
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-900">Total Approvals</p>
              <p class="text-2xl font-bold text-gray-900">{{ getTrendData('approvals') }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-green-600">+12% vs previous period</p>
              <ArrowTrendingUpIcon class="h-5 w-5 text-green-500 inline" />
            </div>
          </div>

          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p class="text-sm font-medium text-gray-900">Average Resolution Time</p>
              <p class="text-2xl font-bold text-gray-900">{{ getTrendData('resolution') }}</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-red-600">+5% vs previous period</p>
              <ArrowTrendingDownIcon class="h-5 w-5 text-red-500 inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useApprovalsStore } from '../stores/approvalsStore'
import {
  ArrowPathIcon,
  DocumentArrowDownIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  ClockIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  LightBulbIcon
} from '@heroicons/vue/24/outline'

// Store
const approvalsStore = useApprovalsStore()

// Reactive state
const selectedPeriod = ref('month')

const timePeriods = [
  { label: 'Last 7 Days', value: 'week' },
  { label: 'Last 30 Days', value: 'month' },
  { label: 'Last 90 Days', value: 'quarter' },
  { label: 'Last Year', value: 'year' }
]

// Mock data for demonstrations
const topApprovers = ref([
  { name: 'Joseph Nzumbi', count: 45, approved: 42, rejected: 3 },
  { name: 'Aman Khan', count: 38, approved: 35, rejected: 3 },
  { name: 'Stella Lyimo', count: 32, approved: 30, rejected: 2 },
  { name: 'Stephano Pietro', count: 28, approved: 26, rejected: 2 },
  { name: 'Devis Degratius', count: 25, approved: 23, rejected: 2 }
])

const bottlenecks = ref([
  { area: 'High-value Purchase Orders', impact: 'Avg. delay: 2.3 days' },
  { area: 'Cross-department Approvals', impact: 'Avg. delay: 1.8 days' },
  { area: 'Month-end Approvals', impact: 'Queue backlog: 15 items' }
])

const recommendations = ref([
  {
    title: 'Implement Auto-approval for Low-value Items',
    description: 'Consider auto-approving purchase requests under $1,000 to improve efficiency.'
  },
  {
    title: 'Add Backup Approvers',
    description: 'Configure backup approvers for high-volume periods to prevent bottlenecks.'
  },
  {
    title: 'Set SLA Notifications',
    description: 'Implement automated reminders for approvals approaching SLA deadlines.'
  }
])

// Computed
const loading = computed(() => approvalsStore.loading)
const stats = computed(() => approvalsStore.stats)

const totalRulesCount = computed(() => {
  return stats.value?.rulesByType?.reduce((sum, item) => sum + item.count, 0) || 1
})

const approvalRate = computed(() => {
  const approved = stats.value?.approvedToday || 0
  const rejected = stats.value?.rejectedToday || 0
  const total = approved + rejected
  return total > 0 ? Math.round((approved / total) * 100) : 0
})

const averageResponseTime = computed(() => {
  // Mock calculation - in real app, calculate from actual data
  return '2.4 hours'
})

const slaCompliance = computed(() => {
  // Mock calculation - in real app, calculate based on SLA metrics
  return 94
})

// Methods
const refreshStats = async () => {
  try {
    await approvalsStore.fetchStats()
  } catch (error) {
    console.error('Error refreshing statistics:', error)
  }
}

const exportReport = () => {
  // Implement export functionality
  console.log('Export statistics report')
}

const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    'OPEX': 'bg-blue-500',
    'FUEL_STAFF': 'bg-green-500',
    'FUEL_BULK': 'bg-yellow-500',
    'OPEX_UNCONTRACTED': 'bg-purple-500',
    'CAPEX': 'bg-red-500'
  }
  return colors[type] || 'bg-gray-500'
}

const getDepartmentColor = (department: string): string => {
  const colors: Record<string, string> = {
    'SALES': 'bg-blue-500',
    'OPERATIONS': 'bg-green-500',
    'HUMAN_RESOURCE': 'bg-yellow-500',
    'FINANCE': 'bg-purple-500',
    'IT': 'bg-indigo-500',
    'MARKETING': 'bg-pink-500'
  }
  return colors[department] || 'bg-gray-500'
}

const formatType = (type: string): string => {
  return type.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const formatDepartment = (department: string): string => {
  return department.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
}

const getTrendData = (metric: string): string => {
  const data: Record<string, Record<string, string>> = {
    approvals: {
      week: '89',
      month: '342',
      quarter: '1,156',
      year: '4,672'
    },
    resolution: {
      week: '1.8 hrs',
      month: '2.4 hrs',
      quarter: '2.1 hrs',
      year: '2.6 hrs'
    }
  }
  return data[metric]?.[selectedPeriod.value] || '0'
}

// Lifecycle
onMounted(async () => {
  await refreshStats()
})
</script>