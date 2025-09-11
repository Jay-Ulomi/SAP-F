<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ isEditMode ? 'Edit Capacity Plan' : 'Create New Capacity Plan' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Resource Selection -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="resourceId" class="block text-sm font-medium text-gray-700">
              Resource *
            </label>
            <select
              id="resourceId"
              v-model="formData.resourceId"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Resource</option>
              <option value="RES001">CNC Machine 1</option>
              <option value="RES002">Assembly Line A</option>
              <option value="RES003">Quality Station</option>
            </select>
          </div>

          <div>
            <label for="capacityType" class="block text-sm font-medium text-gray-700">
              Capacity Type *
            </label>
            <select
              id="capacityType"
              v-model="formData.capacityType"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div>
            <label for="periodStart" class="block text-sm font-medium text-gray-700">
              Period Start *
            </label>
            <input
              type="date"
              id="periodStart"
              v-model="formData.periodStart"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label for="periodEnd" class="block text-sm font-medium text-gray-700">
              Period End *
            </label>
            <input
              type="date"
              id="periodEnd"
              v-model="formData.periodEnd"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <!-- Capacity Information -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Capacity Information</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="totalCapacity" class="block text-sm font-medium text-gray-700">
                Total Capacity *
              </label>
              <input
                type="number"
                id="totalCapacity"
                v-model="formData.totalCapacity"
                required
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="720"
              />
            </div>

            <div>
              <label for="capacityUnit" class="block text-sm font-medium text-gray-700">
                Capacity Unit *
              </label>
              <select
                id="capacityUnit"
                v-model="formData.capacityUnit"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="hours">Hours</option>
                <option value="pieces">Pieces</option>
                <option value="units">Units</option>
                <option value="tons">Tons</option>
                <option value="cycles">Cycles</option>
              </select>
            </div>

            <div>
              <label for="efficiency" class="block text-sm font-medium text-gray-700">
                Efficiency (%) *
              </label>
              <input
                type="number"
                id="efficiency"
                v-model="formData.efficiency"
                required
                min="0"
                max="100"
                step="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="95"
              />
            </div>

            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700">
                Priority *
              </label>
              <select
                id="priority"
                v-model="formData.priority"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="1">High (1)</option>
                <option value="2">Medium (2)</option>
                <option value="3">Low (3)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Working Schedule -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Working Schedule</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="workingHoursPerDay" class="block text-sm font-medium text-gray-700">
                Working Hours per Day *
              </label>
              <input
                type="number"
                id="workingHoursPerDay"
                v-model="formData.workingHoursPerDay"
                required
                min="0"
                max="24"
                step="0.5"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="8"
              />
            </div>

            <div>
              <label for="shiftPattern" class="block text-sm font-medium text-gray-700">
                Shift Pattern
              </label>
              <input
                type="text"
                id="shiftPattern"
                v-model="formData.shiftPattern"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="2 Shifts"
              />
            </div>

            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
              <div class="grid grid-cols-2 gap-2">
                <label
                  v-for="day in daysOfWeek"
                  :key="day.value"
                  class="flex items-center"
                >
                  <input
                    type="checkbox"
                    :value="day.value"
                    v-model="formData.workingDays"
                    class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <span class="ml-2 text-sm text-gray-900">{{ day.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Over-capacity Settings -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Over-capacity Settings</h4>
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="overCapacityAllowed"
                v-model="formData.overCapacityAllowed"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="overCapacityAllowed" class="ml-2 text-sm text-gray-900">
                Allow Over-capacity
              </label>
            </div>

            <div v-if="formData.overCapacityAllowed">
              <label for="maxOverCapacity" class="block text-sm font-medium text-gray-700">
                Maximum Over-capacity (%)
              </label>
              <input
                type="number"
                id="maxOverCapacity"
                v-model="formData.maxOverCapacity"
                min="0"
                max="100"
                step="1"
                class="mt-1 block w-full sm:w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="10"
              />
            </div>
          </div>
        </div>

        <!-- Status and Notes -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Status and Notes</h4>
          <div class="space-y-4">
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700">Status *</label>
              <select
                id="status"
                v-model="formData.status"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                id="notes"
                v-model="formData.notes"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter any additional notes..."
              />
            </div>
          </div>
        </div>

        <!-- Form Actions -->
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="handleCancel"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Saving...' : isEditMode ? 'Update Capacity' : 'Create Capacity' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type {
  ResourceCapacityFormData,
  ResourceCapacity,
  CapacityType,
  CapacityUnit,
  PlanningStatus,
} from '../types'

const props = defineProps<{
  capacity?: ResourceCapacity
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ResourceCapacityFormData]
  cancel: []
}>()

const isEditMode = computed(() => !!props.capacity)

const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

const formData = ref<ResourceCapacityFormData>({
  resourceId: '',
  periodStart: '',
  periodEnd: '',
  capacityType: 'monthly' as CapacityType,
  totalCapacity: 0,
  capacityUnit: 'hours' as CapacityUnit,
  workingDays: [],
  workingHoursPerDay: 8,
  shiftPattern: '',
  efficiency: 100,
  overCapacityAllowed: false,
  maxOverCapacity: undefined,
  priority: 2,
  status: 'draft' as PlanningStatus,
  notes: '',
  restrictions: [],
})

onMounted(() => {
  if (props.capacity) {
    formData.value = {
      resourceId: props.capacity.resourceId,
      periodStart: props.capacity.periodStart,
      periodEnd: props.capacity.periodEnd,
      capacityType: props.capacity.capacityType,
      totalCapacity: props.capacity.totalCapacity,
      capacityUnit: props.capacity.capacityUnit,
      workingDays: props.capacity.workingDays,
      workingHoursPerDay: props.capacity.workingHoursPerDay,
      shiftPattern: props.capacity.shiftPattern,
      efficiency: props.capacity.efficiency,
      overCapacityAllowed: props.capacity.overCapacityAllowed,
      maxOverCapacity: props.capacity.maxOverCapacity,
      priority: props.capacity.priority,
      status: props.capacity.status,
      notes: props.capacity.notes,
      restrictions: props.capacity.restrictions || [],
    }
  }
})

function handleSubmit() {
  emit('submit', formData.value)
}

function handleCancel() {
  emit('cancel')
}
</script>