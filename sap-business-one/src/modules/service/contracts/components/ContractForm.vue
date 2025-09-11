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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <label class="block text-sm font-medium text-gray-700 mb-1">Contract Type *</label>
          <select
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select type</option>
            <option value="warranty">Warranty</option>
            <option value="service_agreement">Service Agreement</option>
            <option value="maintenance">Maintenance</option>
            <option value="support">Support</option>
            <option value="subscription">Subscription</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
          <select
            v-model="formData.status"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Start Date *</label>
          <input
            v-model="formData.startDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">End Date *</label>
          <input
            v-model="formData.endDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contract Value *</label>
          <input
            v-model.number="formData.value"
            type="number"
            step="0.01"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="0.00"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
          <input
            v-model="formData.currency"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="USD"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="formData.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter contract description"
        ></textarea>
      </div>
    </div>

    <!-- Coverage Details Tab -->
    <div v-if="activeTab === 'coverage'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Response Time *</label>
          <div class="flex space-x-2">
            <input
              v-model.number="formData.coverageDetails.responseTime"
              type="number"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
            <select
              v-model="formData.coverageDetails.responseTimeUnit"
              required
              class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            >
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Business Hours</label>
          <input
            v-model="formData.coverageDetails.businessHours"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="9AM-5PM"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="flex items-center">
          <input
            v-model="formData.coverageDetails.includesLabor"
            type="checkbox"
            class="rounded border-gray-300 text-sap-blue focus:ring-sap-blue h-4 w-4"
          />
          <label class="ml-2 block text-sm text-gray-700">Includes Labor</label>
        </div>

        <div class="flex items-center">
          <input
            v-model="formData.coverageDetails.includesParts"
            type="checkbox"
            class="rounded border-gray-300 text-sap-blue focus:ring-sap-blue h-4 w-4"
          />
          <label class="ml-2 block text-sm text-gray-700">Includes Parts</label>
        </div>

        <div class="flex items-center">
          <input
            v-model="formData.coverageDetails.includesTravel"
            type="checkbox"
            class="rounded border-gray-300 text-sap-blue focus:ring-sap-blue h-4 w-4"
          />
          <label class="ml-2 block text-sm text-gray-700">Includes Travel</label>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="flex items-center">
          <input
            v-model="formData.coverageDetails.weekends"
            type="checkbox"
            class="rounded border-gray-300 text-sap-blue focus:ring-sap-blue h-4 w-4"
          />
          <label class="ml-2 block text-sm text-gray-700">Weekend Coverage</label>
        </div>

        <div class="flex items-center">
          <input
            v-model="formData.coverageDetails.holidays"
            type="checkbox"
            class="rounded border-gray-300 text-sap-blue focus:ring-sap-blue h-4 w-4"
          />
          <label class="ml-2 block text-sm text-gray-700">Holiday Coverage</label>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Exclusions</label>
        <textarea
          v-model="exclusionsText"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter exclusions (one per line)"
        ></textarea>
      </div>
    </div>

    <!-- Contact Information Tab -->
    <div v-if="activeTab === 'contact'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
          <input
            v-model="formData.contactPerson"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter contact person name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
          <input
            v-model="formData.contactEmail"
            type="email"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="contact@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Contact Phone *</label>
          <input
            v-model="formData.contactPhone"
            type="tel"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="+1 (555) 123-4567"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          v-model="formData.notes"
          rows="4"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter additional notes"
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
        {{ loading ? 'Saving...' : (isEdit ? 'Update Contract' : 'Create Contract') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ServiceContractFormData, ContractType, ServiceContractStatus, ResponseTimeUnit } from '../../types'

interface Props {
  contract?: any
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: ServiceContractFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const emit = defineEmits<Emits>()

const activeTab = ref('basic')

const tabs = [
  { id: 'basic', name: 'Basic Information' },
  { id: 'coverage', name: 'Coverage Details' },
  { id: 'contact', name: 'Contact Information' }
]

const formData = ref<ServiceContractFormData>({
  customerId: '',
  type: 'warranty' as ContractType,
  status: 'draft' as ServiceContractStatus,
  startDate: '',
  endDate: '',
  value: 0,
  currency: 'USD',
  description: '',
  coverageDetails: {
    includesLabor: true,
    includesParts: true,
    includesTravel: false,
    responseTime: 4,
    responseTimeUnit: 'hours' as ResponseTimeUnit,
    businessHours: '9AM-5PM',
    holidays: false,
    weekends: false,
    exclusions: []
  },
  equipment: [],
  contactPerson: '',
  contactEmail: '',
  contactPhone: '',
  notes: ''
})

const exclusionsText = ref('')

// Watch exclusionsText and sync with formData
watch(exclusionsText, (newVal) => {
  formData.value.coverageDetails.exclusions = newVal
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
})

const isEdit = computed(() => !!props.contract)

// Initialize form data when contract prop changes
watch(() => props.contract, (contract) => {
  if (contract) {
    formData.value = {
      customerId: contract.customerId || '',
      type: contract.type || 'warranty',
      status: contract.status || 'draft',
      startDate: contract.startDate || '',
      endDate: contract.endDate || '',
      value: contract.value || 0,
      currency: contract.currency || 'USD',
      description: contract.description || '',
      coverageDetails: contract.coverageDetails || formData.value.coverageDetails,
      equipment: contract.equipment || [],
      contactPerson: contract.contactPerson || '',
      contactEmail: contract.contactEmail || '',
      contactPhone: contract.contactPhone || '',
      notes: contract.notes || ''
    }
    
    exclusionsText.value = contract.coverageDetails?.exclusions?.join('\n') || ''
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>