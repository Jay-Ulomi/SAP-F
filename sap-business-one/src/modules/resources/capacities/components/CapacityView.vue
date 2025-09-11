<template>
  <div v-if="capacity" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ capacity.resourceName }} Capacity</h2>
          <p class="text-sm text-gray-500 mt-1">{{ capacity.resourceCode }} • {{ capacity.capacityType.charAt(0).toUpperCase() + capacity.capacityType.slice(1) }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              capacity.status === 'active'
                ? 'bg-green-100 text-green-800'
                : capacity.status === 'draft'
                  ? 'bg-gray-100 text-gray-800'
                  : capacity.status === 'paused'
                    ? 'bg-yellow-100 text-yellow-800'
                    : capacity.status === 'completed'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800',
            ]"
          >
            {{ capacity.status }}
          </span>
        </div>
      </div>
    </div>

    <div class="p-6 space-y-6">
      <!-- Period Information -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">Period Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Period Start</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(capacity.periodStart).toLocaleDateString() }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Period End</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(capacity.periodEnd).toLocaleDateString() }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Capacity Type</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ capacity.capacityType }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Priority</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ capacity.priority === 1 ? 'High' : capacity.priority === 2 ? 'Medium' : 'Low' }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Capacity Details -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Capacity Details</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ capacity.totalCapacity }} {{ capacity.capacityUnit }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Available Capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ capacity.availableCapacity }} {{ capacity.capacityUnit }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Allocated Capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ capacity.allocatedCapacity }} {{ capacity.capacityUnit }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Utilization Rate</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.utilizationRate }}%</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Efficiency</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.efficiency }}%</dd>
          </div>
        </dl>
      </div>

      <!-- Working Schedule -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Working Schedule</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Working Hours per Day</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.workingHoursPerDay }} hours</dd>
          </div>
          <div v-if="capacity.shiftPattern">
            <dt class="text-sm font-medium text-gray-500">Shift Pattern</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.shiftPattern }}</dd>
          </div>
          <div v-if="capacity.workingDays?.length" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Working Days</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ capacity.workingDays.map((day) => day.charAt(0).toUpperCase() + day.slice(1)).join(', ') }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Over-capacity Settings -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Over-capacity Settings</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Over-capacity Allowed</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  capacity.overCapacityAllowed
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800',
                ]"
              >
                {{ capacity.overCapacityAllowed ? 'Yes' : 'No' }}
              </span>
            </dd>
          </div>
          <div v-if="capacity.overCapacityAllowed && capacity.maxOverCapacity">
            <dt class="text-sm font-medium text-gray-500">Maximum Over-capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.maxOverCapacity }}%</dd>
          </div>
        </dl>
      </div>

      <!-- Allocations -->
      <div v-if="capacity.allocations?.length" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Current Allocations</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="space-y-3">
            <div
              v-for="allocation in capacity.allocations"
              :key="allocation.id"
              class="flex items-center justify-between bg-white p-3 rounded border"
            >
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ allocation.orderNumber }}</p>
                <p class="text-xs text-gray-500">{{ allocation.orderType }}</p>
              </div>
              <div class="flex-shrink-0 text-right">
                <p class="text-sm text-gray-900">{{ allocation.allocatedCapacity }} {{ capacity.capacityUnit }}</p>
                <p class="text-xs text-gray-500">
                  {{ new Date(allocation.plannedStart).toLocaleDateString() }} - 
                  {{ new Date(allocation.plannedEnd).toLocaleDateString() }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div v-if="capacity.restrictions?.length || capacity.notes" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div class="space-y-4">
          <div v-if="capacity.restrictions?.length">
            <dt class="text-sm font-medium text-gray-500 mb-2">Restrictions</dt>
            <ul class="list-disc list-inside text-sm text-gray-900">
              <li v-for="restriction in capacity.restrictions" :key="restriction">
                {{ restriction }}
              </li>
            </ul>
          </div>
          <div v-if="capacity.notes">
            <dt class="text-sm font-medium text-gray-500 mb-2">Notes</dt>
            <dd class="text-sm text-gray-900">{{ capacity.notes }}</dd>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ capacity.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(capacity.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div v-if="capacity.lastCalculated">
            <dt class="text-sm font-medium text-gray-500">Last Calculated</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(capacity.lastCalculated).toLocaleString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResourceCapacity } from '../types'

defineProps<{
  capacity: ResourceCapacity | null
}>()
</script>