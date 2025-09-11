<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-sap-blue text-sap-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
          ]"
          type="button"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Basic Information Tab -->
    <div v-if="activeTab === 'basic'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
          <input
            v-model="formData.serialNumber"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter serial number"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Equipment Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter equipment name"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
          <input
            v-model="formData.manufacturer"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter manufacturer"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Model *</label>
          <input
            v-model="formData.model"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter model"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <input
            v-model="formData.category"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter category"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="in_service">In Service</option>
            <option value="out_of_service">Out of Service</option>
            <option value="under_repair">Under Repair</option>
            <option value="decommissioned">Decommissioned</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Customer ID *</label>
          <input
            v-model="formData.customerId"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter customer ID"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
          <input
            v-model="formData.location"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter location"
          />
        </div>
      </div>
    </div>

    <!-- Technical Details Tab -->
    <div v-if="activeTab === 'technical'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Installation Date *</label>
          <input
            v-model="formData.installationDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Warranty Expiration</label>
          <input
            v-model="formData.warrantyExpiration"
            type="date"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contract ID</label>
          <input
            v-model="formData.contractId"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter contract ID"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Equipment Value *</label>
          <input
            v-model.number="formData.value"
            type="number"
            step="0.01"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
        <div class="space-y-3">
          <div v-for="(spec, index) in specifications" :key="index" class="flex space-x-3">
            <input
              v-model="spec.key"
              type="text"
              placeholder="Specification name"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
            <input
              v-model="spec.value"
              type="text"
              placeholder="Value"
              class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
            <button
              type="button"
              @click="removeSpecification(index)"
              class="px-3 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
            >
              Remove
            </button>
          </div>
          <button
            type="button"
            @click="addSpecification"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Specification
          </button>
        </div>
      </div>
    </div>

    <!-- Notes Tab -->
    <div v-if="activeTab === 'notes'" class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          v-model="formData.notes"
          rows="6"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter additional notes about this equipment"
        ></textarea>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50"
      >
        <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        {{ loading ? 'Saving...' : (isEdit ? 'Update Equipment' : 'Add Equipment') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { EquipmentFormData, EquipmentStatus } from '../../types'

interface Props {
  equipment?: any
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: EquipmentFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const activeTab = ref('basic')

const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'technical', name: 'Technical Details' },
  { id: 'notes', name: 'Notes' }
]

const formData = ref<EquipmentFormData>({
  serialNumber: '',
  name: '',
  model: '',
  manufacturer: '',
  category: '',
  status: 'active' as EquipmentStatus,
  customerId: '',
  location: '',
  installationDate: '',
  warrantyExpiration: '',
  contractId: '',
  specifications: {},
  notes: '',
  value: 0
})

const specifications = ref<Array<{key: string, value: string}>>([])

const isEdit = computed(() => !!props.equipment)

// Watch specifications array and sync with formData
watch(specifications, (newSpecs) => {
  formData.value.specifications = {}
  newSpecs.forEach(spec => {
    if (spec.key && spec.value) {
      formData.value.specifications[spec.key] = spec.value
    }
  })
}, { deep: true })

// Initialize form data when equipment prop changes
watch(() => props.equipment, (equipment) => {
  if (equipment) {
    formData.value = {
      serialNumber: equipment.serialNumber || '',
      name: equipment.name || '',
      model: equipment.model || '',
      manufacturer: equipment.manufacturer || '',
      category: equipment.category || '',
      status: equipment.status || 'active',
      customerId: equipment.customerId || '',
      location: equipment.location || '',
      installationDate: equipment.installationDate || '',
      warrantyExpiration: equipment.warrantyExpiration || '',
      contractId: equipment.contractId || '',
      specifications: equipment.specifications || {},
      notes: equipment.notes || '',
      value: equipment.value || 0
    }
    
    // Convert specifications object to array for editing
    specifications.value = Object.entries(equipment.specifications || {}).map(([key, value]) => ({
      key,
      value: String(value)
    }))
  }
}, { immediate: true })

const addSpecification = () => {
  specifications.value.push({ key: '', value: '' })
}

const removeSpecification = (index: number) => {
  specifications.value.splice(index, 1)
}

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>