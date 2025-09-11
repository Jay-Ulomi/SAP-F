<template>
  <div v-if="group" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ group.groupName }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ group.groupCode }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              group.status === 'active'
                ? 'bg-green-100 text-green-800'
                : group.status === 'inactive'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800',
            ]"
          >
            {{ group.status }}
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
            <dt class="text-sm font-medium text-gray-500">Type</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ group.type }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Resources</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.totalResources }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Available Resources</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.availableResources }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Efficiency</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.efficiency }}%</dd>
          </div>
          <div v-if="group.description" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.description }}</dd>
          </div>
        </dl>
      </div>

      <!-- Capacity & Cost -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Capacity & Cost</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.totalCapacity }} hours</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Used Capacity</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.usedCapacity }} hours</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Standard Cost per Hour</dt>
            <dd class="mt-1 text-sm text-gray-900">${{ group.standardCostPerHour.toFixed(2) }}</dd>
          </div>
          <div v-if="group.overtimeCostPerHour">
            <dt class="text-sm font-medium text-gray-500">Overtime Cost per Hour</dt>
            <dd class="mt-1 text-sm text-gray-900">${{ group.overtimeCostPerHour.toFixed(2) }}</dd>
          </div>
        </dl>
      </div>

      <!-- Work Schedule -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Work Schedule</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-if="group.shiftPattern">
            <dt class="text-sm font-medium text-gray-500">Shift Pattern</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.shiftPattern }}</dd>
          </div>
          <div v-if="group.workingDays?.length">
            <dt class="text-sm font-medium text-gray-500">Working Days</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ group.workingDays.map((day) => day.charAt(0).toUpperCase() + day.slice(1)).join(', ') }}
            </dd>
          </div>
          <div v-if="group.operatingHours?.start && group.operatingHours?.end">
            <dt class="text-sm font-medium text-gray-500">Operating Hours</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ group.operatingHours.start }} - {{ group.operatingHours.end }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Organizational Assignment -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Organizational Assignment</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-if="group.parentGroupName">
            <dt class="text-sm font-medium text-gray-500">Parent Group</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.parentGroupName }}</dd>
          </div>
          <div v-if="group.departmentName">
            <dt class="text-sm font-medium text-gray-500">Department</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.departmentName }}</dd>
          </div>
          <div v-if="group.costCenterName">
            <dt class="text-sm font-medium text-gray-500">Cost Center</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.costCenterName }}</dd>
          </div>
        </dl>
      </div>

      <!-- Resources -->
      <div v-if="group.resources?.length" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Associated Resources</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div
              v-for="resource in group.resources"
              :key="resource.id"
              class="flex items-center space-x-3 bg-white p-3 rounded border"
            >
              <div class="flex-shrink-0">
                <span
                  :class="[
                    'w-2 h-2 rounded-full',
                    resource.status === 'available'
                      ? 'bg-green-400'
                      : resource.status === 'in_use'
                        ? 'bg-blue-400'
                        : 'bg-yellow-400',
                  ]"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-medium text-gray-900 truncate">{{ resource.name }}</p>
                <p class="text-xs text-gray-500">{{ resource.code }} • {{ resource.type }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div v-if="group.restrictions?.length || group.notes" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div class="space-y-4">
          <div v-if="group.restrictions?.length">
            <dt class="text-sm font-medium text-gray-500 mb-2">Restrictions</dt>
            <ul class="list-disc list-inside text-sm text-gray-900">
              <li v-for="restriction in group.restrictions" :key="restriction">
                {{ restriction }}
              </li>
            </ul>
          </div>
          <div v-if="group.notes">
            <dt class="text-sm font-medium text-gray-500 mb-2">Notes</dt>
            <dd class="text-sm text-gray-900">{{ group.notes }}</dd>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(group.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div v-if="group.updatedBy">
            <dt class="text-sm font-medium text-gray-500">Updated By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ group.updatedBy }}</dd>
          </div>
          <div v-if="group.updatedAt">
            <dt class="text-sm font-medium text-gray-500">Updated At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(group.updatedAt).toLocaleString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ResourceGroup } from '../types'

defineProps<{
  group: ResourceGroup | null
}>()
</script>