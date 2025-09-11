<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div class="flex items-center space-x-4">
          <h2 class="text-xl font-semibold text-gray-900">
            Service Call #{{ serviceCall.callNumber }}
          </h2>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', statusBadgeClass]">
            {{ statusText }}
          </span>
          <span :class="['px-2 py-1 text-xs font-medium rounded-full', priorityBadgeClass]">
            {{ priorityText }}
          </span>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
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

      <!-- Content -->
      <div class="p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Customer</label>
                <p class="text-sm text-gray-900">{{ serviceCall.customerName }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Call Type</label>
                <p class="text-sm text-gray-900 capitalize">
                  {{ serviceCall.type.replace('_', ' ') }}
                </p>
              </div>
              <div v-if="serviceCall.contractNumber">
                <label class="block text-sm font-medium text-gray-500">Contract</label>
                <p class="text-sm text-gray-900">{{ serviceCall.contractNumber }}</p>
              </div>
              <div v-if="serviceCall.equipmentSerial">
                <label class="block text-sm font-medium text-gray-500">Equipment</label>
                <p class="text-sm text-gray-900">{{ serviceCall.equipmentSerial }}</p>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500">Subject</label>
              <p class="text-sm text-gray-900">{{ serviceCall.subject }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-500">Description</label>
              <p class="text-sm text-gray-900">{{ serviceCall.description }}</p>
            </div>

            <div v-if="serviceCall.problemDescription">
              <label class="block text-sm font-medium text-gray-500">Problem Description</label>
              <p class="text-sm text-gray-900">{{ serviceCall.problemDescription }}</p>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Contact Information
            </h3>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Location</label>
                <p class="text-sm text-gray-900">{{ serviceCall.location }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Contact Person</label>
                <p class="text-sm text-gray-900">{{ serviceCall.contactPerson }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Phone</label>
                <p class="text-sm text-gray-900">{{ serviceCall.contactPhone }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-500">Email</label>
                <p class="text-sm text-gray-900">{{ serviceCall.contactEmail }}</p>
              </div>
            </div>

            <div v-if="serviceCall.assignedToName">
              <label class="block text-sm font-medium text-gray-500">Assigned To</label>
              <p class="text-sm text-gray-900">{{ serviceCall.assignedToName }}</p>
            </div>

            <div v-if="serviceCall.scheduledDate">
              <label class="block text-sm font-medium text-gray-500">Scheduled Date</label>
              <p class="text-sm text-gray-900">
                {{ formatDate(serviceCall.scheduledDate) }}
                {{ serviceCall.scheduledTime ? `at ${serviceCall.scheduledTime}` : '' }}
              </p>
            </div>
          </div>
        </div>

        <!-- Timing Information -->
        <div
          v-if="
            serviceCall.actualStartTime ||
            serviceCall.actualEndTime ||
            serviceCall.responseTime ||
            serviceCall.resolutionTime
          "
          class="mt-6 space-y-4"
        >
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Timing Information
          </h3>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-if="serviceCall.actualStartTime">
              <label class="block text-sm font-medium text-gray-500">Actual Start</label>
              <p class="text-sm text-gray-900">{{ formatDateTime(serviceCall.actualStartTime) }}</p>
            </div>
            <div v-if="serviceCall.actualEndTime">
              <label class="block text-sm font-medium text-gray-500">Actual End</label>
              <p class="text-sm text-gray-900">{{ formatDateTime(serviceCall.actualEndTime) }}</p>
            </div>
            <div v-if="serviceCall.responseTime">
              <label class="block text-sm font-medium text-gray-500">Response Time</label>
              <p class="text-sm text-gray-900">{{ serviceCall.responseTime }} minutes</p>
            </div>
            <div v-if="serviceCall.resolutionTime">
              <label class="block text-sm font-medium text-gray-500">Resolution Time</label>
              <p class="text-sm text-gray-900">{{ serviceCall.resolutionTime }} minutes</p>
            </div>
          </div>
        </div>

        <!-- SLA Status -->
        <div v-if="serviceCall.slaStatus" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            SLA Status
          </h3>

          <div class="flex items-center space-x-4">
            <span :class="['px-3 py-1 text-sm font-medium rounded-full', slaBadgeClass]">
              {{ slaStatusText }}
            </span>
            <div v-if="serviceCall.laborHours" class="text-sm text-gray-600">
              Labor Hours: {{ serviceCall.laborHours }}
            </div>
            <div v-if="serviceCall.travelTime" class="text-sm text-gray-600">
              Travel Time: {{ serviceCall.travelTime }} min
            </div>
          </div>
        </div>

        <!-- Financial Information -->
        <div
          v-if="serviceCall.totalCost > 0 || serviceCall.partsUsed.length > 0"
          class="mt-6 space-y-4"
        >
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Financial Information
          </h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-500">Total Cost</label>
              <p class="text-sm text-gray-900">${{ serviceCall.totalCost.toFixed(2) }}</p>
            </div>
            <div v-if="serviceCall.customerSatisfaction">
              <label class="block text-sm font-medium text-gray-500">Customer Satisfaction</label>
              <p class="text-sm text-gray-900">{{ serviceCall.customerSatisfaction }}/5</p>
            </div>
          </div>

          <div v-if="serviceCall.partsUsed.length > 0">
            <label class="block text-sm font-medium text-gray-500 mb-2">Parts Used</label>
            <div class="space-y-2">
              <div
                v-for="part in serviceCall.partsUsed"
                :key="part.id"
                class="flex justify-between items-center p-2 bg-gray-50 rounded"
              >
                <div>
                  <p class="text-sm font-medium text-gray-900">{{ part.partNumber }}</p>
                  <p class="text-xs text-gray-600">{{ part.description }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm text-gray-900">
                    {{ part.quantity }} × ${{ part.unitCost.toFixed(2) }}
                  </p>
                  <p class="text-sm font-medium text-gray-900">${{ part.totalCost.toFixed(2) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activities -->
        <div v-if="serviceCall.activities.length > 0" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Activity History
          </h3>

          <div class="space-y-3">
            <div
              v-for="activity in serviceCall.activities"
              :key="activity.id"
              class="flex space-x-3 p-3 bg-gray-50 rounded"
            >
              <div class="flex-shrink-0">
                <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900">{{ activity.activity }}</p>
                <p class="text-xs text-gray-600">{{ activity.description }}</p>
                <p class="text-xs text-gray-500 mt-1">
                  {{ formatDateTime(activity.timestamp) }} by {{ activity.performedByName }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="serviceCall.notes" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">Notes</h3>
          <p class="text-sm text-gray-900">{{ serviceCall.notes }}</p>
        </div>

        <!-- Resolution -->
        <div v-if="serviceCall.resolution" class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Resolution
          </h3>
          <p class="text-sm text-gray-900">{{ serviceCall.resolution }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200">
        <button
          @click="$emit('close')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Close
        </button>
        <button
          @click="$emit('edit')"
          class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Edit Service Call
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ServiceCall } from '../types'

interface Props {
  serviceCall: ServiceCall
}

interface Emits {
  (e: 'close'): void
  (e: 'edit'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const statusBadgeClass = computed(() => {
  const statusClasses = {
    open: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    in_progress: 'bg-purple-100 text-purple-800',
    on_hold: 'bg-orange-100 text-orange-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return statusClasses[props.serviceCall.status] || 'bg-gray-100 text-gray-800'
})

const priorityBadgeClass = computed(() => {
  const priorityClasses = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  }
  return priorityClasses[props.serviceCall.priority] || 'bg-gray-100 text-gray-800'
})

const slaBadgeClass = computed(() => {
  const slaClasses = {
    within_sla: 'bg-green-100 text-green-800',
    sla_warning: 'bg-yellow-100 text-yellow-800',
    sla_breach: 'bg-red-100 text-red-800',
  }
  return slaClasses[props.serviceCall.slaStatus] || 'bg-gray-100 text-gray-800'
})

const statusText = computed(() => {
  return props.serviceCall.status.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
})

const priorityText = computed(() => {
  return props.serviceCall.priority.charAt(0).toUpperCase() + props.serviceCall.priority.slice(1)
})

const slaStatusText = computed(() => {
  return props.serviceCall.slaStatus.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>
