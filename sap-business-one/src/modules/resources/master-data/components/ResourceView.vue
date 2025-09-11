<template>
  <div v-if="resource" class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ resource.resourceName }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ resource.resourceCode }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="[
              'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
              resource.status === 'available'
                ? 'bg-green-100 text-green-800'
                : resource.status === 'in_use'
                  ? 'bg-blue-100 text-blue-800'
                  : resource.status === 'maintenance'
                    ? 'bg-yellow-100 text-yellow-800'
                    : resource.status === 'unavailable'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800',
            ]"
          >
            {{ resource.status.replace('_', ' ') }}
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
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ resource.type }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Category</dt>
            <dd class="mt-1 text-sm text-gray-900 capitalize">{{ resource.category }}</dd>
          </div>
          <div v-if="resource.description" class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.description }}</dd>
          </div>
        </dl>
      </div>

      <!-- Capacity & Cost -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Capacity & Cost</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Capacity per Day</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ resource.capacityPerDay }} {{ resource.capacityUnit }}
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Standard Cost per Hour</dt>
            <dd class="mt-1 text-sm text-gray-900">${{ resource.standardCostPerHour.toFixed(2) }}</dd>
          </div>
          <div v-if="resource.overtimeCostPerHour">
            <dt class="text-sm font-medium text-gray-500">Overtime Cost per Hour</dt>
            <dd class="mt-1 text-sm text-gray-900">${{ resource.overtimeCostPerHour.toFixed(2) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Efficiency</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.efficiency }}%</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Utilization Rate</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.utilizationRate }}%</dd>
          </div>
        </dl>
      </div>

      <!-- Organizational Assignment -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Organizational Assignment</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-if="resource.groupName">
            <dt class="text-sm font-medium text-gray-500">Resource Group</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.groupName }}</dd>
          </div>
          <div v-if="resource.costCenterName">
            <dt class="text-sm font-medium text-gray-500">Cost Center</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.costCenterName }}</dd>
          </div>
          <div v-if="resource.departmentName">
            <dt class="text-sm font-medium text-gray-500">Department</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.departmentName }}</dd>
          </div>
          <div v-if="resource.locationName">
            <dt class="text-sm font-medium text-gray-500">Location</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.locationName }}</dd>
          </div>
        </dl>
      </div>

      <!-- Specifications (for machines/equipment) -->
      <div
        v-if="
          resource.specifications &&
          (resource.type === 'machine' || resource.type === 'equipment')
        "
        class="border-t pt-6"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-if="resource.specifications.model">
            <dt class="text-sm font-medium text-gray-500">Model</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.specifications.model }}</dd>
          </div>
          <div v-if="resource.specifications.manufacturer">
            <dt class="text-sm font-medium text-gray-500">Manufacturer</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.specifications.manufacturer }}</dd>
          </div>
          <div v-if="resource.specifications.serialNumber">
            <dt class="text-sm font-medium text-gray-500">Serial Number</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.specifications.serialNumber }}</dd>
          </div>
          <div v-if="resource.specifications.purchaseDate">
            <dt class="text-sm font-medium text-gray-500">Purchase Date</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(resource.specifications.purchaseDate).toLocaleDateString() }}
            </dd>
          </div>
          <div v-if="resource.specifications.warrantyExpiry">
            <dt class="text-sm font-medium text-gray-500">Warranty Expiry</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(resource.specifications.warrantyExpiry).toLocaleDateString() }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Skills & Certifications (for labor) -->
      <div
        v-if="resource.type === 'labor' && (resource.skills?.length || resource.certifications?.length)"
        class="border-t pt-6"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-4">Skills & Certifications</h3>
        <div class="space-y-4">
          <div v-if="resource.skills?.length">
            <dt class="text-sm font-medium text-gray-500 mb-2">Skills</dt>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="skill in resource.skills"
                :key="skill"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {{ skill }}
              </span>
            </div>
          </div>
          <div v-if="resource.certifications?.length">
            <dt class="text-sm font-medium text-gray-500 mb-2">Certifications</dt>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="cert in resource.certifications"
                :key="cert"
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {{ cert }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Maintenance Information -->
      <div
        v-if="resource.maintenanceSchedule || resource.nextMaintenanceDate"
        class="border-t pt-6"
      >
        <h3 class="text-lg font-medium text-gray-900 mb-4">Maintenance</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-if="resource.maintenanceSchedule">
            <dt class="text-sm font-medium text-gray-500">Schedule</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.maintenanceSchedule }}</dd>
          </div>
          <div v-if="resource.nextMaintenanceDate">
            <dt class="text-sm font-medium text-gray-500">Next Maintenance</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(resource.nextMaintenanceDate).toLocaleDateString() }}
            </dd>
          </div>
        </dl>
      </div>

      <!-- Additional Information -->
      <div v-if="resource.restrictions?.length || resource.notes" class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
        <div class="space-y-4">
          <div v-if="resource.restrictions?.length">
            <dt class="text-sm font-medium text-gray-500 mb-2">Restrictions</dt>
            <ul class="list-disc list-inside text-sm text-gray-900">
              <li v-for="restriction in resource.restrictions" :key="restriction">
                {{ restriction }}
              </li>
            </ul>
          </div>
          <div v-if="resource.notes">
            <dt class="text-sm font-medium text-gray-500 mb-2">Notes</dt>
            <dd class="text-sm text-gray-900">{{ resource.notes }}</dd>
          </div>
        </div>
      </div>

      <!-- System Information -->
      <div class="border-t pt-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
        <dl class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(resource.createdAt).toLocaleString() }}
            </dd>
          </div>
          <div v-if="resource.updatedBy">
            <dt class="text-sm font-medium text-gray-500">Updated By</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ resource.updatedBy }}</dd>
          </div>
          <div v-if="resource.updatedAt">
            <dt class="text-sm font-medium text-gray-500">Updated At</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ new Date(resource.updatedAt).toLocaleString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Resource } from '../types'

defineProps<{
  resource: Resource | null
}>()
</script>