<template>
  <div v-if="plan" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ plan.resourceName }} Planning Details</h2>
          <p class="text-sm text-gray-500 mt-1">{{ plan.resourceCode }} • {{ plan.planType.charAt(0).toUpperCase() + plan.planType.slice(1) }} Planning</p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              plan.status === 'active' || plan.status === 'approved'
                ? 'bg-green-100 text-green-800'
                : plan.status === 'draft'
                  ? 'bg-gray-100 text-gray-800'
                  : plan.status === 'review'
                    ? 'bg-yellow-100 text-yellow-800'
                    : plan.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800',
            ]"
          >
            {{ plan.status }}
          </span>
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              plan.priority === 1
                ? 'bg-red-100 text-red-800'
                : plan.priority === 2
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800',
            ]"
          >
            Priority {{ plan.priority }}
          </span>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Basic Information -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Plan Type</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ plan.planType }} Planning</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Planning Horizon</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">
              {{ plan.planningHorizon === 'short' ? 'Short Term (1-3 months)' 
                : plan.planningHorizon === 'medium' ? 'Medium Term (3-12 months)'
                : 'Long Term (1+ years)' }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Planning Unit</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ plan.planningUnit }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ plan.status }}</dd>
          </div>
        </dl>
      </div>

      <!-- Planning Period -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Planning Period</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Plan Start Date</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(plan.planStart).toLocaleDateString() }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Plan End Date</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(plan.planEnd).toLocaleDateString() }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Duration</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ getPlanDuration() }} days</dd>
          </div>
        </dl>
      </div>

      <!-- Planning Targets -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Planning Targets</h3>
        <div class="bg-blue-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="text-center">
              <p class="text-sm text-gray-600">Target Capacity</p>
              <p class="text-xl font-semibold text-blue-600">
                {{ plan.targetCapacity }} {{ plan.planningUnit }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Target Utilization</p>
              <p class="text-xl font-semibold text-blue-600">{{ plan.targetUtilization }}%</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Target Efficiency</p>
              <p class="text-xl font-semibold text-blue-600">{{ plan.targetEfficiency }}%</p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Buffer Capacity</p>
              <p class="text-xl font-semibold text-blue-600">{{ plan.bufferCapacity || 0 }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Planning Options -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Planning Options</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Allow Over-capacity</dt>
            <dd class="mt-1">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  plan.allowOvercapacity
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ plan.allowOvercapacity ? 'Yes' : 'No' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Auto-adjust</dt>
            <dd class="mt-1">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  plan.autoAdjust
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ plan.autoAdjust ? 'Enabled' : 'Disabled' }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Consider Seasonality</dt>
            <dd class="mt-1">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  plan.considerSeasonality
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ plan.considerSeasonality ? 'Yes' : 'No' }}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <!-- Constraints and Requirements -->
      <div v-if="plan.constraints || plan.requirements" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Constraints and Requirements</h3>
        <div class="space-y-4">
          <div v-if="plan.constraints">
            <dt class="text-sm font-medium text-gray-500 mb-2">Constraints</dt>
            <dd class="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">{{ plan.constraints }}</dd>
          </div>
          <div v-if="plan.requirements">
            <dt class="text-sm font-medium text-gray-500 mb-2">Special Requirements</dt>
            <dd class="text-sm text-gray-900 bg-gray-50 rounded-lg p-3">{{ plan.requirements }}</dd>
          </div>
        </div>
      </div>

      <!-- Performance Metrics -->
      <div v-if="plan.actualCapacity !== undefined || plan.actualUtilization !== undefined" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Performance vs. Targets</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-if="plan.actualCapacity !== undefined" class="text-center">
              <p class="text-sm text-gray-600">Actual vs Target Capacity</p>
              <p class="text-lg font-semibold" :class="getPerformanceColor('capacity')">
                {{ plan.actualCapacity }} / {{ plan.targetCapacity }} {{ plan.planningUnit }}
              </p>
              <p class="text-xs text-gray-500">{{ getCapacityPerformance() }}%</p>
            </div>
            <div v-if="plan.actualUtilization !== undefined" class="text-center">
              <p class="text-sm text-gray-600">Actual vs Target Utilization</p>
              <p class="text-lg font-semibold" :class="getPerformanceColor('utilization')">
                {{ plan.actualUtilization }}% / {{ plan.targetUtilization }}%
              </p>
              <p class="text-xs text-gray-500">{{ getUtilizationPerformance() }}%</p>
            </div>
            <div v-if="plan.actualEfficiency !== undefined" class="text-center">
              <p class="text-sm text-gray-600">Actual vs Target Efficiency</p>
              <p class="text-lg font-semibold" :class="getPerformanceColor('efficiency')">
                {{ plan.actualEfficiency }}% / {{ plan.targetEfficiency }}%
              </p>
              <p class="text-xs text-gray-500">{{ getEfficiencyPerformance() }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Plan Progress -->
      <div v-if="plan.progress !== undefined" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Plan Progress</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-600">Overall Progress</span>
            <span class="text-sm font-semibold text-gray-900">{{ plan.progress }}%</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div 
              class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: plan.progress + '%' }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Additional Notes -->
      <div v-if="plan.notes" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Notes</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-900">{{ plan.notes }}</p>
        </div>
      </div>

      <!-- System Information -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ plan.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(plan.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div v-if="plan.lastCalculated">
            <dt class="text-sm font-medium text-gray-500">Last Calculated</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(plan.lastCalculated).toLocaleString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResourcePlan } from '../types'

const props = defineProps<{
  plan: ResourcePlan | null
}>()

function getPlanDuration(): number {
  if (!props.plan) return 0
  const start = new Date(props.plan.planStart)
  const end = new Date(props.plan.planEnd)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function getCapacityPerformance(): number {
  if (!props.plan || props.plan.actualCapacity === undefined) return 0
  return Math.round((props.plan.actualCapacity / props.plan.targetCapacity) * 100)
}

function getUtilizationPerformance(): number {
  if (!props.plan || props.plan.actualUtilization === undefined) return 0
  return Math.round((props.plan.actualUtilization / props.plan.targetUtilization) * 100)
}

function getEfficiencyPerformance(): number {
  if (!props.plan || props.plan.actualEfficiency === undefined) return 0
  return Math.round((props.plan.actualEfficiency / props.plan.targetEfficiency) * 100)
}

function getPerformanceColor(type: 'capacity' | 'utilization' | 'efficiency'): string {
  let performance = 0
  switch (type) {
    case 'capacity':
      performance = getCapacityPerformance()
      break
    case 'utilization':
      performance = getUtilizationPerformance()
      break
    case 'efficiency':
      performance = getEfficiencyPerformance()
      break
  }

  if (performance >= 95) return 'text-green-600'
  if (performance >= 85) return 'text-yellow-600'
  return 'text-red-600'
}
</script>