<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ isEditMode ? 'Edit Resource Plan' : 'Create New Resource Plan' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
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
            <label for="planType" class="block text-sm font-medium text-gray-700">
              Plan Type *
            </label>
            <select
              id="planType"
              v-model="formData.planType"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="capacity">Capacity Planning</option>
              <option value="production">Production Planning</option>
              <option value="maintenance">Maintenance Planning</option>
              <option value="utilization">Utilization Planning</option>
            </select>
          </div>

          <div>
            <label for="planningHorizon" class="block text-sm font-medium text-gray-700">
              Planning Horizon *
            </label>
            <select
              id="planningHorizon"
              v-model="formData.planningHorizon"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="short">Short Term (1-3 months)</option>
              <option value="medium">Medium Term (3-12 months)</option>
              <option value="long">Long Term (1+ years)</option>
            </select>
          </div>

          <div>
            <label for="planningUnit" class="block text-sm font-medium text-gray-700">
              Planning Unit *
            </label>
            <select
              id="planningUnit"
              v-model="formData.planningUnit"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
              <option value="months">Months</option>
            </select>
          </div>
        </div>

        <!-- Planning Period -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Planning Period</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="planStart" class="block text-sm font-medium text-gray-700">
                Plan Start Date *
              </label>
              <input
                type="date"
                id="planStart"
                v-model="formData.planStart"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="planEnd" class="block text-sm font-medium text-gray-700">
                Plan End Date *
              </label>
              <input
                type="date"
                id="planEnd"
                v-model="formData.planEnd"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Planning Targets -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Planning Targets</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="targetCapacity" class="block text-sm font-medium text-gray-700">
                Target Capacity *
              </label>
              <input
                type="number"
                id="targetCapacity"
                v-model="formData.targetCapacity"
                required
                min="0"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="800"
              />
            </div>

            <div>
              <label for="targetUtilization" class="block text-sm font-medium text-gray-700">
                Target Utilization (%) *
              </label>
              <input
                type="number"
                id="targetUtilization"
                v-model="formData.targetUtilization"
                required
                min="0"
                max="100"
                step="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="85"
              />
            </div>

            <div>
              <label for="targetEfficiency" class="block text-sm font-medium text-gray-700">
                Target Efficiency (%) *
              </label>
              <input
                type="number"
                id="targetEfficiency"
                v-model="formData.targetEfficiency"
                required
                min="0"
                max="100"
                step="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="95"
              />
            </div>

            <div>
              <label for="bufferCapacity" class="block text-sm font-medium text-gray-700">
                Buffer Capacity (%)
              </label>
              <input
                type="number"
                id="bufferCapacity"
                v-model="formData.bufferCapacity"
                min="0"
                max="50"
                step="1"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="10"
              />
            </div>
          </div>
        </div>

        <!-- Constraints and Requirements -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Constraints and Requirements</h4>
          <div class="space-y-4">
            <div>
              <label for="constraints" class="block text-sm font-medium text-gray-700">Constraints</label>
              <textarea
                id="constraints"
                v-model="formData.constraints"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter any capacity, technical, or operational constraints..."
              />
            </div>

            <div>
              <label for="requirements" class="block text-sm font-medium text-gray-700">Special Requirements</label>
              <textarea
                id="requirements"
                v-model="formData.requirements"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter any special requirements or considerations..."
              />
            </div>
          </div>
        </div>

        <!-- Planning Options -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Planning Options</h4>
          <div class="space-y-4">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="allowOvercapacity"
                v-model="formData.allowOvercapacity"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="allowOvercapacity" class="ml-2 text-sm text-gray-900">
                Allow Over-capacity Planning
              </label>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="autoAdjust"
                v-model="formData.autoAdjust"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="autoAdjust" class="ml-2 text-sm text-gray-900">
                Auto-adjust for Holidays and Maintenance
              </label>
            </div>

            <div class="flex items-center">
              <input
                type="checkbox"
                id="considerSeasonality"
                v-model="formData.considerSeasonality"
                class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label for="considerSeasonality" class="ml-2 text-sm text-gray-900">
                Consider Seasonal Variations
              </label>
            </div>
          </div>
        </div>

        <!-- Priority and Status -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Priority and Status</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="priority" class="block text-sm font-medium text-gray-700">Priority *</label>
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
                <option value="review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="border-t border-gray-200 pt-6">
          <div>
            <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              id="notes"
              v-model="formData.notes"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter any additional notes or comments..."
            />
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
            {{ loading ? 'Saving...' : isEditMode ? 'Update Plan' : 'Create Plan' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ResourcePlan, PlanType, PlanningHorizon, PlanningUnit, PlanningStatus, ResourcePlanFormData } from '../types'

const props = defineProps<{
  plan?: ResourcePlan
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ResourcePlanFormData]
  cancel: []
}>()

const isEditMode = computed(() => !!props.plan)

const formData = ref<ResourcePlanFormData>({
  resourceId: '',
  planType: 'capacity' as PlanType,
  planningHorizon: 'medium' as PlanningHorizon,
  planningUnit: 'hours' as PlanningUnit,
  planStart: '',
  planEnd: '',
  targetCapacity: 0,
  targetUtilization: 85,
  targetEfficiency: 95,
  bufferCapacity: 10,
  constraints: '',
  requirements: '',
  allowOvercapacity: false,
  autoAdjust: true,
  considerSeasonality: false,
  priority: 2,
  status: 'draft' as PlanningStatus,
  notes: '',
})

onMounted(() => {
  if (props.plan) {
    formData.value = {
      resourceId: props.plan.resourceId,
      planType: props.plan.planType,
      planningHorizon: props.plan.planningHorizon,
      planningUnit: props.plan.planningUnit,
      planStart: props.plan.planStart,
      planEnd: props.plan.planEnd,
      targetCapacity: props.plan.targetCapacity,
      targetUtilization: props.plan.targetUtilization,
      targetEfficiency: props.plan.targetEfficiency,
      bufferCapacity: props.plan.bufferCapacity,
      constraints: props.plan.constraints || '',
      requirements: props.plan.requirements || '',
      allowOvercapacity: props.plan.allowOvercapacity,
      autoAdjust: props.plan.autoAdjust,
      considerSeasonality: props.plan.considerSeasonality,
      priority: props.plan.priority,
      status: props.plan.status,
      notes: props.plan.notes || '',
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