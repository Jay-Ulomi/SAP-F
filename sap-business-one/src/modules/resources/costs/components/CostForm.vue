<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ isEditMode ? 'Edit Resource Cost' : 'Create New Resource Cost' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Resource and Basic Information -->
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
            <label for="costType" class="block text-sm font-medium text-gray-700">
              Cost Type *
            </label>
            <select
              id="costType"
              v-model="formData.costType"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="standard">Standard</option>
              <option value="actual">Actual</option>
              <option value="planned">Planned</option>
              <option value="budgeted">Budgeted</option>
            </select>
          </div>

          <div>
            <label for="costPeriod" class="block text-sm font-medium text-gray-700">
              Cost Period *
            </label>
            <select
              id="costPeriod"
              v-model="formData.costPeriod"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <div>
            <label for="currency" class="block text-sm font-medium text-gray-700">
              Currency *
            </label>
            <select
              id="currency"
              v-model="formData.currency"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>
        </div>

        <!-- Cost Rates -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Cost Rates</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="standardRate" class="block text-sm font-medium text-gray-700">
                Standard Rate *
              </label>
              <input
                type="number"
                id="standardRate"
                v-model="formData.standardRate"
                required
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="150.00"
              />
            </div>

            <div>
              <label for="overtimeRate" class="block text-sm font-medium text-gray-700">
                Overtime Rate
              </label>
              <input
                type="number"
                id="overtimeRate"
                v-model="formData.overtimeRate"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="225.00"
              />
            </div>

            <div v-if="formData.costType === 'actual'">
              <label for="actualRate" class="block text-sm font-medium text-gray-700">
                Actual Rate
              </label>
              <input
                type="number"
                id="actualRate"
                v-model="formData.actualRate"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="156.00"
              />
            </div>
          </div>
        </div>

        <!-- Cost Breakdown -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Cost Breakdown</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="laborCost" class="block text-sm font-medium text-gray-700">
                Labor Cost
              </label>
              <input
                type="number"
                id="laborCost"
                v-model="formData.costBreakdown.labor"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="75.00"
              />
            </div>

            <div>
              <label for="materialsCost" class="block text-sm font-medium text-gray-700">
                Materials Cost
              </label>
              <input
                type="number"
                id="materialsCost"
                v-model="formData.costBreakdown.materials"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="25.00"
              />
            </div>

            <div>
              <label for="overheadCost" class="block text-sm font-medium text-gray-700">
                Overhead Cost
              </label>
              <input
                type="number"
                id="overheadCost"
                v-model="formData.costBreakdown.overhead"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="40.00"
              />
            </div>

            <div>
              <label for="otherCost" class="block text-sm font-medium text-gray-700">
                Other Cost
              </label>
              <input
                type="number"
                id="otherCost"
                v-model="formData.costBreakdown.other"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="10.00"
              />
            </div>
          </div>
        </div>

        <!-- Effective Period -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Effective Period</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="effectiveFrom" class="block text-sm font-medium text-gray-700">
                Effective From *
              </label>
              <input
                type="date"
                id="effectiveFrom"
                v-model="formData.effectiveFrom"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="effectiveTo" class="block text-sm font-medium text-gray-700">
                Effective To
              </label>
              <input
                type="date"
                id="effectiveTo"
                v-model="formData.effectiveTo"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Status -->
        <div class="border-t border-gray-200 pt-6">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              v-model="formData.isActive"
              class="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label for="isActive" class="ml-2 text-sm text-gray-900">
              Active Cost Rate
            </label>
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
            {{ loading ? 'Saving...' : isEditMode ? 'Update Cost' : 'Create Cost' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { ResourceCost, CostType, CostPeriod, ResourceCostFormData } from '../types'

const props = defineProps<{
  cost?: ResourceCost
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ResourceCostFormData]
  cancel: []
}>()

const isEditMode = computed(() => !!props.cost)

const formData = ref<ResourceCostFormData>({
  resourceId: '',
  costType: 'standard' as CostType,
  costPeriod: 'hourly' as CostPeriod,
  standardRate: 0,
  overtimeRate: undefined,
  actualRate: undefined,
  effectiveFrom: '',
  effectiveTo: undefined,
  currency: 'USD',
  isActive: true,
  costBreakdown: {
    labor: undefined,
    materials: undefined,
    overhead: undefined,
    other: undefined,
  },
})

onMounted(() => {
  if (props.cost) {
    formData.value = {
      resourceId: props.cost.resourceId,
      costType: props.cost.costType,
      costPeriod: props.cost.costPeriod,
      standardRate: props.cost.standardRate,
      overtimeRate: props.cost.overtimeRate,
      actualRate: props.cost.actualRate,
      effectiveFrom: props.cost.effectiveFrom,
      effectiveTo: props.cost.effectiveTo,
      currency: props.cost.currency,
      isActive: props.cost.isActive,
      costBreakdown: {
        labor: props.cost.costBreakdown?.labor,
        materials: props.cost.costBreakdown?.materials,
        overhead: props.cost.costBreakdown?.overhead,
        other: props.cost.costBreakdown?.other,
      },
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