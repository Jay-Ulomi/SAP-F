<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">
        {{ isEditMode ? 'Edit Resource' : 'Create New Resource' }}
      </h3>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="resourceCode" class="block text-sm font-medium text-gray-700">
              Resource Code *
            </label>
            <input
              type="text"
              id="resourceCode"
              v-model="formData.resourceCode"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="RES001"
            />
          </div>

          <div>
            <label for="resourceName" class="block text-sm font-medium text-gray-700">
              Resource Name *
            </label>
            <input
              type="text"
              id="resourceName"
              v-model="formData.resourceName"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="CNC Machine 1"
            />
          </div>

          <div>
            <label for="type" class="block text-sm font-medium text-gray-700">
              Resource Type *
            </label>
            <select
              id="type"
              v-model="formData.type"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="machine">Machine</option>
              <option value="labor">Labor</option>
              <option value="tool">Tool</option>
              <option value="facility">Facility</option>
              <option value="equipment">Equipment</option>
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
              <option value="available">Available</option>
              <option value="in_use">In Use</option>
              <option value="maintenance">Maintenance</option>
              <option value="unavailable">Unavailable</option>
              <option value="retired">Retired</option>
            </select>
          </div>

          <div>
            <label for="category" class="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="category"
              v-model="formData.category"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="production">Production</option>
              <option value="assembly">Assembly</option>
              <option value="quality">Quality</option>
              <option value="packaging">Packaging</option>
              <option value="maintenance">Maintenance</option>
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
              placeholder="Enter resource description..."
            />
          </div>
        </div>

        <!-- Capacity & Cost Information -->
        <div class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Capacity & Cost</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="capacityPerDay" class="block text-sm font-medium text-gray-700">
                Capacity per Day *
              </label>
              <input
                type="number"
                id="capacityPerDay"
                v-model="formData.capacityPerDay"
                required
                min="0"
                step="0.01"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="8"
              />
            </div>

            <div>
              <label for="capacityUnit" class="block text-sm font-medium text-gray-700">
                Capacity Unit *
              </label>
              <input
                type="text"
                id="capacityUnit"
                v-model="formData.capacityUnit"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="hours"
              />
            </div>

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
                placeholder="150.00"
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
                placeholder="225.00"
              />
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
              <label for="maintenanceSchedule" class="block text-sm font-medium text-gray-700">
                Maintenance Schedule
              </label>
              <input
                type="text"
                id="maintenanceSchedule"
                v-model="formData.maintenanceSchedule"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Monthly"
              />
            </div>

            <div>
              <label for="nextMaintenanceDate" class="block text-sm font-medium text-gray-700">
                Next Maintenance Date
              </label>
              <input
                type="date"
                id="nextMaintenanceDate"
                v-model="formData.nextMaintenanceDate"
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
              <label for="groupId" class="block text-sm font-medium text-gray-700">
                Resource Group
              </label>
              <input
                type="text"
                id="groupId"
                v-model="formData.groupId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="GRP001"
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
              <label for="locationId" class="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="locationId"
                v-model="formData.locationId"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="LOC001"
              />
            </div>
          </div>
        </div>

        <!-- Specifications (for machines/equipment) -->
        <div
          v-if="formData.type === 'machine' || formData.type === 'equipment'"
          class="border-t border-gray-200 pt-6"
        >
          <h4 class="text-sm font-medium text-gray-900 mb-4">Specifications</h4>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="model" class="block text-sm font-medium text-gray-700">Model</label>
              <input
                type="text"
                id="model"
                v-model="formData.specifications.model"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="DMG MORI NLX 2500"
              />
            </div>

            <div>
              <label for="manufacturer" class="block text-sm font-medium text-gray-700">
                Manufacturer
              </label>
              <input
                type="text"
                id="manufacturer"
                v-model="formData.specifications.manufacturer"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="DMG MORI"
              />
            </div>

            <div>
              <label for="serialNumber" class="block text-sm font-medium text-gray-700">
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                v-model="formData.specifications.serialNumber"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="NLX2500-2023-001"
              />
            </div>

            <div>
              <label for="purchaseDate" class="block text-sm font-medium text-gray-700">
                Purchase Date
              </label>
              <input
                type="date"
                id="purchaseDate"
                v-model="formData.specifications.purchaseDate"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label for="warrantyExpiry" class="block text-sm font-medium text-gray-700">
                Warranty Expiry
              </label>
              <input
                type="date"
                id="warrantyExpiry"
                v-model="formData.specifications.warrantyExpiry"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <!-- Skills & Certifications (for labor) -->
        <div v-if="formData.type === 'labor'" class="border-t border-gray-200 pt-6">
          <h4 class="text-sm font-medium text-gray-900 mb-4">Skills & Certifications</h4>
          <div class="space-y-4">
            <div>
              <label for="skills" class="block text-sm font-medium text-gray-700">Skills</label>
              <textarea
                id="skills"
                v-model="skillsText"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter skills separated by commas (e.g., CNC Operation, Welding, CAD/CAM)"
              />
            </div>

            <div>
              <label for="certifications" class="block text-sm font-medium text-gray-700">
                Certifications
              </label>
              <textarea
                id="certifications"
                v-model="certificationsText"
                rows="3"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter certifications separated by commas (e.g., ISO 9001, Six Sigma)"
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
                placeholder="Enter restrictions separated by commas (e.g., Requires certified operator)"
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
            {{ loading ? 'Saving...' : isEditMode ? 'Update Resource' : 'Create Resource' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { ResourceFormData, Resource, ResourceType, ResourceStatus, ResourceCategory } from '../types'

const props = defineProps<{
  resource?: Resource
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [data: ResourceFormData]
  cancel: []
}>()

const isEditMode = computed(() => !!props.resource)

const formData = ref<ResourceFormData>({
  resourceCode: '',
  resourceName: '',
  description: '',
  type: 'machine' as ResourceType,
  status: 'available' as ResourceStatus,
  category: 'production' as ResourceCategory,
  capacityPerDay: 8,
  capacityUnit: 'hours',
  standardCostPerHour: 0,
  overtimeCostPerHour: undefined,
  efficiency: 100,
  maintenanceSchedule: '',
  nextMaintenanceDate: '',
  specifications: {
    model: '',
    manufacturer: '',
    serialNumber: '',
    purchaseDate: '',
    warrantyExpiry: '',
  },
  skills: [],
  certifications: [],
  restrictions: [],
  notes: '',
})

// Helper refs for array fields
const skillsText = ref('')
const certificationsText = ref('')
const restrictionsText = ref('')

// Watch for changes in text fields and update arrays
watch(skillsText, (value) => {
  formData.value.skills = value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)
})

watch(certificationsText, (value) => {
  formData.value.certifications = value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)
})

watch(restrictionsText, (value) => {
  formData.value.restrictions = value
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s)
})

onMounted(() => {
  if (props.resource) {
    formData.value = {
      resourceCode: props.resource.resourceCode,
      resourceName: props.resource.resourceName,
      description: props.resource.description,
      type: props.resource.type,
      status: props.resource.status,
      category: props.resource.category,
      groupId: props.resource.groupId,
      costCenterId: props.resource.costCenterId,
      departmentId: props.resource.departmentId,
      locationId: props.resource.locationId,
      capacityPerDay: props.resource.capacityPerDay,
      capacityUnit: props.resource.capacityUnit,
      standardCostPerHour: props.resource.standardCostPerHour,
      overtimeCostPerHour: props.resource.overtimeCostPerHour,
      efficiency: props.resource.efficiency,
      maintenanceSchedule: props.resource.maintenanceSchedule,
      nextMaintenanceDate: props.resource.nextMaintenanceDate,
      specifications: props.resource.specifications || {
        model: '',
        manufacturer: '',
        serialNumber: '',
        purchaseDate: '',
        warrantyExpiry: '',
      },
      skills: props.resource.skills || [],
      certifications: props.resource.certifications || [],
      restrictions: props.resource.restrictions || [],
      notes: props.resource.notes,
    }

    // Set text fields for arrays
    skillsText.value = props.resource.skills?.join(', ') || ''
    certificationsText.value = props.resource.certifications?.join(', ') || ''
    restrictionsText.value = props.resource.restrictions?.join(', ') || ''
  }
})

function handleSubmit() {
  emit('submit', formData.value)
}

function handleCancel() {
  emit('cancel')
}
</script>