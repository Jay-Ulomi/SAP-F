<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div
      class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
    >
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">{{ itemType }} Details</h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div v-if="item" class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ itemName }}</h2>
                <p class="text-sm text-gray-600 mt-1">
                  {{ itemDescription || 'No description provided' }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Code: {{ itemCode }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span
                  :class="getStatusBadgeClass(item.status)"
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
                >
                  {{ formatStatus(item.status) }}
                </span>
                <span
                  v-if="itemType !== 'Item Group'"
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
                >
                  {{ itemType }}
                </span>
                <button
                  @click="$emit('edit', item)"
                  class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white hover:bg-sap-dark-blue"
                >
                  Edit {{ itemType }}
                </button>
              </div>
            </div>
          </div>

          <!-- Item Details -->
          <div class="px-4 sm:px-6 py-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              <!-- Left Column - Basic Info -->
              <div class="xl:col-span-2 space-y-4 sm:space-y-6">
                <!-- Basic Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Basic Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">Code:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ itemCode }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Name:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ itemName }}</span>
                    </div>
                    <div v-if="itemType !== 'Item Group'">
                      <span class="text-xs text-gray-500">Type:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        itemTypeValue
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Status:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatStatus(item.status)
                      }}</span>
                    </div>
                    <div v-if="itemType === 'Location'">
                      <span class="text-xs text-gray-500">Warehouse:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseName
                      }}</span>
                    </div>
                    <div v-if="itemType === 'Item Group'">
                      <span class="text-xs text-gray-500">Item Count:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ itemCount }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Created:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatDateTime(item.createdAt)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Updated:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatDateTime(item.updatedAt || item.createdAt)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description -->
                <div v-if="itemDescription" class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Description
                  </h3>
                  <p class="text-sm text-gray-700">{{ itemDescription }}</p>
                </div>

                <!-- Address Information (Warehouse only) -->
                <div
                  v-if="itemType === 'Warehouse' && hasAddress"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Address Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-if="warehouseAddress.street">
                      <span class="text-xs text-gray-500">Street:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseAddress.street
                      }}</span>
                    </div>
                    <div v-if="warehouseAddress.city">
                      <span class="text-xs text-gray-500">City:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseAddress.city
                      }}</span>
                    </div>
                    <div v-if="warehouseAddress.state">
                      <span class="text-xs text-gray-500">State:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseAddress.state
                      }}</span>
                    </div>
                    <div v-if="warehouseAddress.zipCode">
                      <span class="text-xs text-gray-500">ZIP Code:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseAddress.zipCode
                      }}</span>
                    </div>
                    <div v-if="warehouseAddress.country">
                      <span class="text-xs text-gray-500">Country:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseAddress.country
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Contact Information (Warehouse only) -->
                <div
                  v-if="itemType === 'Warehouse' && hasContactInfo"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Contact Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-if="warehouseContactInfo.phone">
                      <span class="text-xs text-gray-500">Phone:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseContactInfo.phone
                      }}</span>
                    </div>
                    <div v-if="warehouseContactInfo.email">
                      <span class="text-xs text-gray-500">Email:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseContactInfo.email
                      }}</span>
                    </div>
                    <div v-if="warehouseContactInfo.manager">
                      <span class="text-xs text-gray-500">Manager:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        warehouseContactInfo.manager
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Capacity Information -->
                <div v-if="hasCapacity" class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Capacity Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">Total Capacity:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        totalCapacity
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Used Capacity:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ usedCapacity }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Available Capacity:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        availableCapacity
                      }}</span>
                    </div>
                  </div>
                  <!-- Capacity Progress Bar -->
                  <div class="mt-4">
                    <div class="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Capacity Usage</span>
                      <span>{{ capacityPercentage }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="bg-sap-blue h-2 rounded-full transition-all duration-300"
                        :style="{ width: `${capacityPercentage}%` }"
                      ></div>
                    </div>
                  </div>
                </div>

                <!-- Coordinates (Location only) -->
                <div
                  v-if="itemType === 'Location' && hasCoordinates"
                  class="bg-gray-50 rounded-lg p-4"
                >
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Coordinates
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">X Coordinate:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        coordinates.x
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Y Coordinate:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        coordinates.y
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Z Coordinate:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        coordinates.z
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Additional Info -->
              <div class="space-y-4 sm:space-y-6">
                <!-- Summary -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Summary
                  </h3>
                  <div class="space-y-3">
                    <div>
                      <span class="text-xs text-gray-500">Created By:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.createdBy
                      }}</span>
                    </div>
                    <div v-if="item.updatedBy">
                      <span class="text-xs text-gray-500">Updated By:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.updatedBy
                      }}</span>
                    </div>
                    <div v-if="itemType === 'Warehouse' && isDefaultWarehouse">
                      <span class="text-xs text-gray-500">Default:</span>
                      <span class="ml-2 text-sm font-medium text-green-600">Yes</span>
                    </div>
                    <div v-if="itemType === 'Item Group'">
                      <span class="text-xs text-gray-500">Level:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{ itemLevel }}</span>
                    </div>
                    <div v-if="itemType === 'Item Group'">
                      <span class="text-xs text-gray-500">Leaf Node:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        isLeafNode ? 'Yes' : 'No'
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Quick Actions
                  </h3>
                  <div class="space-y-2">
                    <button
                      v-if="itemType === 'Item Group'"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Items in Group
                    </button>
                    <button
                      v-if="itemType === 'Warehouse'"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Locations
                    </button>
                    <button
                      v-if="itemType === 'Warehouse'"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Stock Levels
                    </button>
                    <button
                      v-if="itemType === 'Location'"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Stock at Location
                    </button>
                    <button
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View History
                    </button>
                  </div>
                </div>

                <!-- Status Alert -->
                <div
                  v-if="item.status === 'maintenance'"
                  class="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
                >
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">Maintenance Mode</h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>This {{ itemType.toLowerCase() }} is currently under maintenance.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ItemGroup, Warehouse, Location, Status } from '../types'

interface Props {
  item: ItemGroup | Warehouse | Location | null
  itemType: 'Item Group' | 'Warehouse' | 'Location'
}

const props = defineProps<Props>()

defineEmits<{
  close: []
  edit: [item: ItemGroup | Warehouse | Location]
}>()

// Computed properties
const itemName = computed(() => {
  if (!props.item) return ''
  if ('groupName' in props.item) return props.item.groupName
  if ('warehouseName' in props.item) return props.item.warehouseName
  if ('locationName' in props.item) return props.item.locationName
  return ''
})

const itemCode = computed(() => {
  if (!props.item) return ''
  if ('groupCode' in props.item) return props.item.groupCode
  if ('warehouseCode' in props.item) return props.item.warehouseCode
  if ('locationCode' in props.item) return (props.item as Location).locationCode
  return ''
})

const itemDescription = computed(() => {
  if (!props.item) return ''
  return props.item.description || ''
})

const itemTypeValue = computed(() => {
  if (!props.item) return ''
  if ('type' in props.item) {
    const typeMap: Record<string, string> = {
      main: 'Main',
      secondary: 'Secondary',
      storage: 'Storage',
      retail: 'Retail',
      production: 'Production',
      aisle: 'Aisle',
      rack: 'Rack',
      shelf: 'Shelf',
      bin: 'Bin',
      zone: 'Zone',
    }
    return typeMap[props.item.type] || props.item.type
  }
  return ''
})

const warehouseName = computed(() => {
  if (props.itemType === 'Location' && props.item && 'warehouseCode' in props.item) {
    return (props.item as Location).warehouseCode
  }
  return ''
})

const itemCount = computed(() => {
  if (props.itemType === 'Item Group' && props.item && 'itemCount' in props.item) {
    return (props.item as ItemGroup).itemCount
  }
  return 0
})

const itemLevel = computed(() => {
  if (props.itemType === 'Item Group' && props.item && 'level' in props.item) {
    return (props.item as ItemGroup).level
  }
  return 0
})

const isLeafNode = computed(() => {
  if (props.itemType === 'Item Group' && props.item && 'isLeaf' in props.item) {
    return (props.item as ItemGroup).isLeaf
  }
  return false
})

const isDefaultWarehouse = computed(() => {
  if (props.itemType === 'Warehouse' && props.item && 'isDefault' in props.item) {
    return (props.item as Warehouse).isDefault
  }
  return false
})

const warehouseAddress = computed(() => {
  if (props.itemType === 'Warehouse' && props.item && 'address' in props.item) {
    return (props.item as Warehouse).address || {}
  }
  return {}
})

const hasAddress = computed(() => {
  const addr = warehouseAddress.value
  return addr.street || addr.city || addr.state || addr.zipCode || addr.country
})

const warehouseContactInfo = computed(() => {
  if (props.itemType === 'Warehouse' && props.item && 'contactInfo' in props.item) {
    return (props.item as Warehouse).contactInfo || {}
  }
  return {}
})

const hasContactInfo = computed(() => {
  const contact = warehouseContactInfo.value
  return contact.phone || contact.email || contact.manager
})

const totalCapacity = computed(() => {
  if (props.item && 'capacity' in props.item) {
    return props.item.capacity?.totalCapacity || 0
  }
  return 0
})

const usedCapacity = computed(() => {
  if (props.item && 'capacity' in props.item) {
    return props.item.capacity?.usedCapacity || 0
  }
  return 0
})

const availableCapacity = computed(() => {
  if (props.item && 'capacity' in props.item) {
    return props.item.capacity?.availableCapacity || 0
  }
  return 0
})

const hasCapacity = computed(() => {
  return totalCapacity.value > 0
})

const capacityPercentage = computed(() => {
  if (totalCapacity.value === 0) return 0
  return Math.round((usedCapacity.value / totalCapacity.value) * 100)
})

const coordinates = computed(() => {
  if (props.itemType === 'Location' && props.item && 'coordinates' in props.item) {
    return (props.item as Location).coordinates || { x: 0, y: 0, z: 0 }
  }
  return { x: 0, y: 0, z: 0 }
})

const hasCoordinates = computed(() => {
  const coord = coordinates.value
  return coord.x !== 0 || coord.y !== 0 || coord.z !== 0
})

// Methods
const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatStatus = (status: Status): string => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    maintenance: 'Maintenance',
    closed: 'Closed',
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status: Status): string => {
  const classMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}
</script>
