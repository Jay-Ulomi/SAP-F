<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? 'Edit Response Time Metric' : 'New Response Time Metric' }}
        </h2>
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

      <!-- Form Content -->
      <form @submit.prevent="handleSubmit" class="p-6">
        <div class="space-y-4">
          <!-- Service Call Selection -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Service Call *</label>
            <select
              v-model="formData.serviceCallId"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Service Call</option>
              <option value="call-001">#SC-2024-001 - Server Maintenance</option>
              <option value="call-002">#SC-2024-002 - Network Issue</option>
              <option value="call-003">#SC-2024-003 - Software Installation</option>
            </select>
          </div>

          <!-- Metric Type -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Metric Type *</label>
            <select
              v-model="formData.metricType"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Metric Type</option>
              <option value="response_time">Response Time</option>
              <option value="resolution_time">Resolution Time</option>
              <option value="first_response">First Response</option>
              <option value="customer_satisfaction">Customer Satisfaction</option>
              <option value="sla_compliance">SLA Compliance</option>
            </select>
          </div>

          <!-- Value and Unit -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Value *</label>
              <input
                v-model.number="formData.value"
                type="number"
                step="0.01"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter value"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
              <select
                v-model="formData.unit"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Unit</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </div>

          <!-- Target Values -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Target Value</label>
              <input
                v-model.number="formData.targetValue"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Target value"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">SLA Target</label>
              <input
                v-model.number="formData.slaTarget"
                type="number"
                step="0.01"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="SLA target"
              />
            </div>
          </div>

          <!-- Measurement Date -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Measured At *</label>
            <input
              v-model="formData.measuredAt"
              type="datetime-local"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes about this metric"
            />
          </div>

          <!-- Performance Indicator -->
          <div v-if="formData.value && formData.targetValue" class="p-4 bg-gray-50 rounded-lg">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Performance Analysis</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span class="text-gray-600">Variance:</span>
                <span :class="varianceClass">{{ varianceText }}</span>
              </div>
              <div>
                <span class="text-gray-600">Variance %:</span>
                <span :class="varianceClass">{{ variancePercentageText }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ loading ? 'Saving...' : isEditing ? 'Update' : 'Create' }} Metric
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ResponseTimeMetric, ResponseTimeFormData, MetricType, TimeUnit } from '../types'

interface Props {
  metric?: ResponseTimeMetric | null
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', data: ResponseTimeFormData): void
}

const props = withDefaults(defineProps<Props>(), {
  metric: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const formData = ref<ResponseTimeFormData>({
  serviceCallId: '',
  metricType: 'response_time' as MetricType,
  value: 0,
  unit: 'minutes' as TimeUnit,
  targetValue: 0,
  slaTarget: 0,
  measuredAt: '',
  notes: '',
})

const isEditing = computed(() => !!props.metric)

const variance = computed(() => {
  if (!formData.value.value || !formData.value.targetValue) return 0
  return formData.value.value - formData.value.targetValue
})

const variancePercentage = computed(() => {
  if (!formData.value.value || !formData.value.targetValue) return 0
  return (variance.value / formData.value.targetValue) * 100
})

const varianceClass = computed(() => {
  if (variance.value <= 0) return 'text-green-600 font-medium'
  if (variance.value <= formData.value.targetValue * 0.1) return 'text-yellow-600 font-medium'
  return 'text-red-600 font-medium'
})

const varianceText = computed(() => {
  const absVariance = Math.abs(variance.value)
  return `${variance.value >= 0 ? '+' : '-'}${absVariance.toFixed(2)} ${formData.value.unit}`
})

const variancePercentageText = computed(() => {
  const absPercentage = Math.abs(variancePercentage.value)
  return `${variancePercentage.value >= 0 ? '+' : '-'}${absPercentage.toFixed(1)}%`
})

watch(
  () => props.metric,
  (newMetric) => {
    if (newMetric) {
      formData.value = {
        serviceCallId: newMetric.serviceCallId,
        metricType: newMetric.metricType,
        value: newMetric.value,
        unit: newMetric.unit,
        targetValue: newMetric.targetValue,
        slaTarget: newMetric.slaTarget,
        measuredAt: newMetric.measuredAt,
        notes: newMetric.notes || '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>
