<template>
  <div v-if="cost" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ cost.resourceName }} Cost Details</h2>
          <p class="text-sm text-gray-500 mt-1">{{ cost.resourceCode }} • {{ cost.costType.charAt(0).toUpperCase() + cost.costType.slice(1) }} Cost</p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              cost.isActive
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800',
            ]"
          >
            {{ cost.isActive ? 'Active' : 'Inactive' }}
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
            <dt class="text-sm font-medium text-gray-500">Cost Type</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ cost.costType }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Cost Period</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ cost.costPeriod }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Currency</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ cost.currency }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ cost.isActive ? 'Active' : 'Inactive' }}</dd>
          </div>
        </dl>
      </div>

      <!-- Cost Rates -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Cost Rates</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Standard Rate</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ cost.currency }} {{ cost.standardRate.toFixed(2) }} / {{ cost.costPeriod }}
            </dd>
          </div>
          <div v-if="cost.overtimeRate">
            <dt class="text-sm font-medium text-gray-500">Overtime Rate</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ cost.currency }} {{ cost.overtimeRate.toFixed(2) }} / {{ cost.costPeriod }}
            </dd>
          </div>
          <div v-if="cost.actualRate">
            <dt class="text-sm font-medium text-gray-500">Actual Rate</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ cost.currency }} {{ cost.actualRate.toFixed(2) }} / {{ cost.costPeriod }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Cost Breakdown -->
      <div v-if="hasCostBreakdown" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Cost Breakdown</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-if="cost.costBreakdown?.labor">
              <dt class="text-sm font-medium text-gray-500">Labor Cost</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ cost.currency }} {{ cost.costBreakdown.labor.toFixed(2) }}
              </dd>
            </div>
            <div v-if="cost.costBreakdown?.materials">
              <dt class="text-sm font-medium text-gray-500">Materials Cost</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ cost.currency }} {{ cost.costBreakdown.materials.toFixed(2) }}
              </dd>
            </div>
            <div v-if="cost.costBreakdown?.overhead">
              <dt class="text-sm font-medium text-gray-500">Overhead Cost</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ cost.currency }} {{ cost.costBreakdown.overhead.toFixed(2) }}
              </dd>
            </div>
            <div v-if="cost.costBreakdown?.other">
              <dt class="text-sm font-medium text-gray-500">Other Cost</dt>
              <dd class="mt-1 text-sm text-gray-900">
                {{ cost.currency }} {{ cost.costBreakdown.other.toFixed(2) }}
              </dd>
            </div>
          </dl>
          <div v-if="totalBreakdownCost > 0" class="mt-4 pt-4 border-t border-gray-200">
            <dl class="flex justify-between">
              <dt class="text-sm font-medium text-gray-900">Total Breakdown Cost</dt>
              <dd class="text-sm font-semibold text-gray-900">
                {{ cost.currency }} {{ totalBreakdownCost.toFixed(2) }}
              </dd>
            </dl>
          </div>
        </div>
      </div>

      <!-- Effective Period -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Effective Period</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Effective From</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(cost.effectiveFrom).toLocaleDateString() }}
            </dd>
          </div>
          <div v-if="cost.effectiveTo">
            <dt class="text-sm font-medium text-gray-500">Effective To</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(cost.effectiveTo).toLocaleDateString() }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Cost Analysis -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Cost Analysis</h3>
        <div class="bg-blue-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="text-center">
              <p class="text-sm text-gray-600">Daily Cost</p>
              <p class="text-lg font-semibold text-blue-600">
                {{ cost.currency }} {{ getDailyCost().toFixed(2) }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Weekly Cost</p>
              <p class="text-lg font-semibold text-blue-600">
                {{ cost.currency }} {{ getWeeklyCost().toFixed(2) }}
              </p>
            </div>
            <div class="text-center">
              <p class="text-sm text-gray-600">Monthly Cost</p>
              <p class="text-lg font-semibold text-blue-600">
                {{ cost.currency }} {{ getMonthlyCost().toFixed(2) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ cost.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(cost.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div v-if="cost.lastUpdated">
            <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(cost.lastUpdated).toLocaleString() }}
            </dd>
          </div>
          <div v-if="cost.lastUpdatedBy">
            <dt class="text-sm font-medium text-gray-500">Last Updated By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ cost.lastUpdatedBy }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ResourceCost } from '../types'

const props = defineProps<{
  cost: ResourceCost | null
}>()

const hasCostBreakdown = computed(() => {
  if (!props.cost?.costBreakdown) return false
  const breakdown = props.cost.costBreakdown
  return breakdown.labor || breakdown.materials || breakdown.overhead || breakdown.other
})

const totalBreakdownCost = computed(() => {
  if (!props.cost?.costBreakdown) return 0
  const breakdown = props.cost.costBreakdown
  return (breakdown.labor || 0) + (breakdown.materials || 0) + (breakdown.overhead || 0) + (breakdown.other || 0)
})

function getDailyCost(): number {
  if (!props.cost) return 0
  
  const rate = props.cost.standardRate
  switch (props.cost.costPeriod) {
    case 'hourly':
      return rate * 8 // Assuming 8 hours per day
    case 'daily':
      return rate
    case 'weekly':
      return rate / 7
    case 'monthly':
      return rate / 30
    default:
      return rate
  }
}

function getWeeklyCost(): number {
  return getDailyCost() * 7
}

function getMonthlyCost(): number {
  return getDailyCost() * 30
}
</script>