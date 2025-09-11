<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ isEditMode ? 'Edit Resource Group' : 'Create New Resource Group' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="groupCode" class="block text-sm font-medium text-gray-700">
              Group Code *
            </label>
            <input
              type="text"
              id="groupCode"
              v-model="formData.groupCode"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="GRP001"
            />
          </div>

          <div>
            <label for="groupName" class="block text-sm font-medium text-gray-700">
              Group Name *
            </label>
            <input
              type="text"
              id="groupName"
              v-model="formData.groupName"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Machining Center"
            />
          </div>

          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">
              Group Type *
            </label>
            <select
              id="type"
              v-model="formData.type"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="production">Production</option>
              <option value="maintenance">Maintenance</option>
              <option value="quality">Quality</option>
              <option value="logistics">Logistics</option>
              <option value="support">Support</option>
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="planning">Planning</option>
            </select>
          </div>

          <div class="sm:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter group description..."
            />
          </div>
        </div>

        <!-- Cost Information -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Cost Information</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="standardCostPerHour" class="block text-sm font-medium text-gray-700">
                Standard Cost per Hour *
              </label>
              <input
                type="number"
                id="standardCostPerHour"
                v-model="formData.standardCostPerHour"
                required
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="1200.00"
              />
            </div>

            <div>
              <label for="overtimeCostPerHour" class="block text-sm font-medium text-gray-700">
                Overtime Cost per Hour
              </label>
              <input
                type="number"
                id="overtimeCostPerHour"
                v-model="formData.overtimeCostPerHour"
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="1800.00"
              />
            </div>
          </div>
        </div>

        <!-- Work Schedule -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Work Schedule</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="shiftPattern" class="block text-sm font-medium text-gray-700">
                Shift Pattern
              </label>
              <input
                type="text"
                id="shiftPattern"
                v-model="formData.shiftPattern"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="3 Shifts - 24/7"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Working Days</label>
              <div class="space-y-2">
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

          <div class="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="operatingStart" class="block text-sm font-medium text-gray-700">
                Operating Hours Start
              </label>
              <input
                type="time"
                id="operatingStart"
                v-model="formData.operatingHours.start"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="operatingEnd" class="block text-sm font-medium text-gray-700">
                Operating Hours End
              </label>
              <input
                type="time"
                id="operatingEnd"
                v-model="formData.operatingHours.end"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Organizational Assignment -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Organizational Assignment</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="parentGroupId" class="block text-sm font-medium text-gray-700">
                Parent Group
              </label>
              <input
                type="text"
                id="parentGroupId"
                v-model="formData.parentGroupId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="PARENT001"
              />
            </div>

            <div>
              <label for="departmentId" class="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                id="departmentId"
                v-model="formData.departmentId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="DEPT001"
              />
            </div>

            <div>
              <label for="costCenterId" class="block text-sm font-medium text-gray-700">
                Cost Center
              </label>
              <input
                type="text"
                id="costCenterId"
                v-model="formData.costCenterId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="CC001"
              />
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Additional Information</h4>
          <div class="space-y-4">
            <div>
              <label for="restrictions" class="block text-sm font-medium text-gray-700">
                Restrictions
              </label>
              <textarea
                id="restrictions"
                v-model="restrictionsText"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter restrictions separated by commas"
              />
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
            {{ loading ? 'Saving...' : isEditMode ? 'Update Group' : 'Create Group' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type {
  ResourceGroupFormData,
  ResourceGroup,
  GroupType,
  GroupStatus,
} from '../types'

const props = defineProps<{
  group?: ResourceGroup
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ResourceGroupFormData]
  cancel: []
}>()

const isEditMode = computed(() => !!props.group)

const daysOfWeek = [
  { value: 'monday', label: 'Monday' },
  { value: 'tuesday', label: 'Tuesday' },
  { value: 'wednesday', label: 'Wednesday' },
  { value: 'thursday', label: 'Thursday' },
  { value: 'friday', label: 'Friday' },
  { value: 'saturday', label: 'Saturday' },
  { value: 'sunday', label: 'Sunday' },
]

const formData = ref<ResourceGroupFormData>({
  groupCode: '',
  groupName: '',
  description: '',
  type: 'production' as GroupType,
  status: 'active' as GroupStatus,
  standardCostPerHour: 0,
  overtimeCostPerHour: undefined,
  shiftPattern: '',
  workingDays: [],
  operatingHours: {
    start: '',
    end: '',
  },
  parentGroupId: '',
  departmentId: '',
  costCenterId: '',
  restrictions: [],
  notes: '',
})

// Helper ref for restrictions text field
const restrictionsText = ref('')

// Watch for changes in restrictions text field and update array
watch(restrictionsText, (value) => {
  formData.value.restrictions = value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)
})

onMounted(() => {
  if (props.group) {
    formData.value = {
      groupCode: props.group.groupCode,
      groupName: props.group.groupName,
      description: props.group.description,
      type: props.group.type,
      status: props.group.status,
      standardCostPerHour: props.group.standardCostPerHour,
      overtimeCostPerHour: props.group.overtimeCostPerHour,
      shiftPattern: props.group.shiftPattern,
      workingDays: props.group.workingDays || [],
      operatingHours: props.group.operatingHours || {
        start: '',
        end: '',
      },
      parentGroupId: props.group.parentGroupId,
      departmentId: props.group.departmentId,
      costCenterId: props.group.costCenterId,
      restrictions: props.group.restrictions || [],
      notes: props.group.notes,
    }

    // Set restrictions text field
    restrictionsText.value = props.group.restrictions?.join(', ') || ''
  }
})

function handleSubmit() {
  emit('submit', formData.value)
}

function handleCancel() {
  emit('cancel')
}
</script>