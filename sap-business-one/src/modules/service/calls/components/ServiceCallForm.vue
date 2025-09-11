<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 class="text-xl font-semibold text-gray-900">
          {{ isEditing ? 'Edit Service Call' : 'New Service Call' }}
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
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Basic Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Basic Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Customer *</label>
              <select
                v-model="formData.customerId"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Customer</option>
                <option value="cust-001">ABC Company</option>
                <option value="cust-002">XYZ Corp</option>
                <option value="cust-003">Tech Solutions Inc</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contract</label>
              <select
                v-model="formData.contractId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Contract</option>
                <option value="contract-001">Contract #SC-2024-001</option>
                <option value="contract-002">Contract #SC-2024-002</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Equipment</label>
              <select
                v-model="formData.equipmentId"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Equipment</option>
                <option value="eq-001">Server Rack #SR-001</option>
                <option value="eq-002">Network Switch #NS-002</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Call Type *</label>
              <select
                v-model="formData.type"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="repair">Repair</option>
                <option value="maintenance">Maintenance</option>
                <option value="installation">Installation</option>
                <option value="inspection">Inspection</option>
                <option value="consultation">Consultation</option>
                <option value="warranty">Warranty</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
              <select
                v-model="formData.priority"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
              Contact Information
            </h3>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                v-model="formData.subject"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief description of the issue"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                v-model="formData.description"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Detailed description of the service call"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                v-model="formData.location"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Service location"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
              <input
                v-model="formData.contactPerson"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contact person name"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
              <input
                v-model="formData.contactPhone"
                type="tel"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
              <input
                v-model="formData.contactEmail"
                type="email"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
              />
            </div>
          </div>
        </div>

        <!-- Scheduling -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Scheduling
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <select
                v-model="formData.assignedTo"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Technician</option>
                <option value="tech-001">John Smith</option>
                <option value="tech-002">Sarah Johnson</option>
                <option value="tech-003">Mike Wilson</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
              <input
                v-model="formData.scheduledDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
              <input
                v-model="formData.scheduledTime"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <!-- Additional Information -->
        <div class="mt-6 space-y-4">
          <h3 class="text-lg font-medium text-gray-900 border-b border-gray-200 pb-2">
            Additional Information
          </h3>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Problem Description</label>
            <textarea
              v-model="formData.problemDescription"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detailed problem description"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              v-model="formData.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Additional notes"
            />
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
            {{ loading ? 'Saving...' : isEditing ? 'Update' : 'Create' }} Service Call
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type {
  ServiceCall,
  ServiceCallFormData,
  ServiceCallType,
  ServiceCallPriority,
} from '../types'

interface Props {
  serviceCall?: ServiceCall | null
  loading?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'save', data: ServiceCallFormData): void
}

const props = withDefaults(defineProps<Props>(), {
  serviceCall: null,
  loading: false,
})

const emit = defineEmits<Emits>()

const formData = ref<ServiceCallFormData>({
  customerId: '',
  contractId: '',
  equipmentId: '',
  type: 'repair' as ServiceCallType,
  priority: 'medium' as ServiceCallPriority,
  subject: '',
  description: '',
  problemDescription: '',
  location: '',
  contactPerson: '',
  contactPhone: '',
  contactEmail: '',
  assignedTo: '',
  scheduledDate: '',
  scheduledTime: '',
  notes: '',
})

const isEditing = computed(() => !!props.serviceCall)

watch(
  () => props.serviceCall,
  (newServiceCall) => {
    if (newServiceCall) {
      formData.value = {
        customerId: newServiceCall.customerId,
        contractId: newServiceCall.contractId || '',
        equipmentId: newServiceCall.equipmentId || '',
        type: newServiceCall.type,
        priority: newServiceCall.priority,
        subject: newServiceCall.subject,
        description: newServiceCall.description,
        problemDescription: newServiceCall.problemDescription || '',
        location: newServiceCall.location,
        contactPerson: newServiceCall.contactPerson,
        contactPhone: newServiceCall.contactPhone,
        contactEmail: newServiceCall.contactEmail,
        assignedTo: newServiceCall.assignedTo || '',
        scheduledDate: newServiceCall.scheduledDate || '',
        scheduledTime: newServiceCall.scheduledTime || '',
        notes: newServiceCall.notes || '',
      }
    }
  },
  { immediate: true },
)

const handleSubmit = () => {
  emit('save', formData.value)
}
</script>
