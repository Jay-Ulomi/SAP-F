<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ equipment.name }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ equipment.manufacturer }} {{ equipment.model }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Serial: {{ equipment.serialNumber }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span :class="getStatusBadgeClass(equipment.status)">
            {{ formatStatus(equipment.status) }}
          </span>
          <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {{ equipment.category }}
          </span>
        </div>
      </div>
    </div>

    <!-- Equipment Details -->
    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <!-- Left Column - Basic Info -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Basic Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Customer</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ equipment.customerName }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Location</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ equipment.location }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Installation Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(equipment.installationDate) }}</dd>
              </div>
              <div v-if="equipment.warrantyExpiration">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Warranty Expires</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(equipment.warrantyExpiration) }}</dd>
              </div>
            </dl>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Financial</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Purchase Value</dt>
                <dd class="mt-1 text-sm text-gray-900">${{ equipment.value.toLocaleString() }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Depreciated Value</dt>
                <dd class="mt-1 text-sm text-gray-900">${{ equipment.depreciatedValue.toLocaleString() }}</dd>
              </div>
              <div v-if="equipment.contractId">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Service Contract</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ equipment.contractNumber || equipment.contractId }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Middle Column - Service Information -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Service Information</h3>
            <dl class="space-y-2">
              <div v-if="equipment.lastServiceDate">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Service</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(equipment.lastServiceDate) }}</dd>
              </div>
              <div v-if="equipment.nextServiceDate">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Next Service</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span :class="getServiceDateClass(equipment.nextServiceDate)">
                    {{ formatDate(equipment.nextServiceDate) }}
                  </span>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Maintenance Records</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ equipment.maintenanceHistory.length }}</dd>
              </div>
            </dl>
          </div>

          <div v-if="Object.keys(equipment.specifications).length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Specifications</h3>
            <dl class="space-y-2">
              <div v-for="(value, key) in equipment.specifications" :key="key">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">{{ key }}</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Right Column - Recent Maintenance -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Recent Maintenance</h3>
            <div v-if="recentMaintenance.length === 0" class="text-sm text-gray-500 text-center py-4">
              No maintenance records
            </div>
            <div v-else class="space-y-3">
              <div v-for="record in recentMaintenance" :key="record.id" class="bg-white p-3 rounded border">
                <div class="flex justify-between items-start mb-2">
                  <div class="text-sm font-medium text-gray-900">{{ record.description }}</div>
                  <span :class="getMaintenanceTypeBadgeClass(record.type)">
                    {{ formatMaintenanceType(record.type) }}
                  </span>
                </div>
                <div class="text-xs text-gray-600">
                  <div>Date: {{ formatDate(record.date) }}</div>
                  <div>Technician: {{ record.technician }}</div>
                  <div>Duration: {{ record.duration }}h • Cost: ${{ record.cost.toLocaleString() }}</div>
                </div>
              </div>
            </div>
            <div v-if="equipment.maintenanceHistory.length > 3" class="mt-3 text-center">
              <button
                @click="showAllMaintenance = true"
                class="text-sm text-sap-blue hover:text-sap-blue-dark"
              >
                View All {{ equipment.maintenanceHistory.length }} Records
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Attachments -->
      <div v-if="equipment.attachments && equipment.attachments.length > 0" class="mt-6">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Attachments</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div v-for="attachment in equipment.attachments" :key="attachment.id"
                 class="bg-white p-3 rounded border hover:border-sap-blue cursor-pointer">
              <div class="flex items-center">
                <svg class="w-8 h-8 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ attachment.name }}</p>
                  <p class="text-xs text-gray-500">{{ formatFileSize(attachment.size) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div v-if="equipment.notes" class="mt-6">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Notes</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ equipment.notes }}</p>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 text-xs text-gray-500 border-t pt-4">
        <div class="flex justify-between">
          <span>Created: {{ formatDateTime(equipment.createdAt) }}</span>
          <span>Last updated: {{ formatDateTime(equipment.updatedAt) }}</span>
        </div>
      </div>
    </div>

    <!-- All Maintenance Modal -->
    <div v-if="showAllMaintenance" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg w-full max-w-4xl max-h-screen overflow-y-auto m-4">
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-xl font-bold">Maintenance History - {{ equipment.name }}</h2>
          <button
            @click="showAllMaintenance = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="record in equipment.maintenanceHistory" :key="record.id" class="bg-gray-50 rounded-lg p-4">
              <div class="flex justify-between items-start mb-3">
                <div>
                  <h3 class="font-medium text-gray-900">{{ record.description }}</h3>
                  <p class="text-sm text-gray-600 mt-1">{{ formatDate(record.date) }} • {{ record.technician }}</p>
                </div>
                <span :class="getMaintenanceTypeBadgeClass(record.type)">
                  {{ formatMaintenanceType(record.type) }}
                </span>
              </div>
              <div class="text-sm text-gray-600 mb-3">
                <p>Duration: {{ record.duration }} hours • Cost: ${{ record.cost.toLocaleString() }}</p>
                <p v-if="record.nextMaintenanceDate">Next maintenance: {{ formatDate(record.nextMaintenanceDate) }}</p>
              </div>
              <div v-if="record.partsUsed.length > 0" class="mt-3">
                <p class="text-sm font-medium text-gray-900 mb-2">Parts Used:</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div v-for="part in record.partsUsed" :key="part.id" 
                       class="bg-white p-2 rounded border text-sm">
                    <div class="font-medium">{{ part.name }} ({{ part.code }})</div>
                    <div class="text-gray-600">Qty: {{ part.quantity }} @ ${{ part.unitCost }} = ${{ part.totalCost }}</div>
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
import { ref, computed } from 'vue'
import type { Equipment, EquipmentStatus } from '../../types'

interface Props {
  equipment: Equipment
}

const props = defineProps<Props>()

const showAllMaintenance = ref(false)

// Computed properties
const recentMaintenance = computed(() => {
  return props.equipment.maintenanceHistory
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)
})

// Utility functions
const formatStatus = (status: EquipmentStatus) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatMaintenanceType = (type: string) => {
  return type.replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusBadgeClass = (status: EquipmentStatus) => {
  const baseClasses = 'inline-flex px-3 py-1 text-sm font-medium rounded-full'
  switch (status) {
    case 'active':
    case 'in_service':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'out_of_service':
    case 'decommissioned':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'under_repair':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'lost':
      return `${baseClasses} bg-gray-100 text-gray-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getMaintenanceTypeBadgeClass = (type: string) => {
  const baseClasses = 'inline-flex px-2 py-1 text-xs font-medium rounded-full'
  switch (type) {
    case 'preventive':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'corrective':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'inspection':
      return `${baseClasses} bg-blue-100 text-blue-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getServiceDateClass = (dateString: string) => {
  const serviceDate = new Date(dateString)
  const now = new Date()
  const diffDays = Math.ceil((serviceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return 'text-red-600 font-medium' // Overdue
  if (diffDays <= 7) return 'text-yellow-600 font-medium' // Due soon
  return 'text-gray-900'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>