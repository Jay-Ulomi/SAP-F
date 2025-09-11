<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Configuration Details</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter configuration name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category *</label>
          <select
            v-model="form.category"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select category</option>
            <option value="SYSTEM">System</option>
            <option value="COMPANY">Company</option>
            <option value="USER_INTERFACE">User Interface</option>
            <option value="DATABASE">Database</option>
            <option value="INTEGRATION">Integration</option>
            <option value="SECURITY">Security</option>
            <option value="WORKFLOW">Workflow</option>
            <option value="REPORTING">Reporting</option>
          </select>
        </div>

        <div class="md:col-span-2">
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter configuration description"
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            v-model="form.priority"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="CRITICAL">Critical</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Data Type</label>
          <select
            v-model="form.dataType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="string">String</option>
            <option value="number">Number</option>
            <option value="boolean">Boolean</option>
            <option value="object">Object</option>
            <option value="array">Array</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Current Value</label>
          <input
            v-model="form.value"
            :type="form.dataType === 'number' ? 'number' : 'text'"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter current value"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Default Value</label>
          <input
            v-model="form.defaultValue"
            :type="form.dataType === 'number' ? 'number' : 'text'"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter default value"
          />
        </div>
      </div>

      <div class="mt-4 space-y-4">
        <div class="flex items-center">
          <input
            id="required"
            v-model="form.isRequired"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="required" class="ml-2 block text-sm text-gray-900">
            This configuration is required
          </label>
        </div>
      </div>
    </div>

    <!-- Validation Rules -->
    <div class="bg-gray-50 rounded-lg p-6" v-if="form.dataType === 'string' || form.dataType === 'number'">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Validation Rules</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="form.dataType === 'string'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Length</label>
          <input
            v-model="form.validationRules.minLength"
            type="number"
            min="0"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div v-if="form.dataType === 'string'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Maximum Length</label>
          <input
            v-model="form.validationRules.maxLength"
            type="number"
            min="0"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div v-if="form.dataType === 'number'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Minimum Value</label>
          <input
            v-model="form.validationRules.min"
            type="number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div v-if="form.dataType === 'number'">
          <label class="block text-sm font-medium text-gray-700 mb-1">Maximum Value</label>
          <input
            v-model="form.validationRules.max"
            type="number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6">
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
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">{{ configuration ? 'Updating...' : 'Creating...' }}</span>
        <span v-else>{{ configuration ? 'Update Configuration' : 'Create Configuration' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'

interface SystemConfiguration {
  id: string
  name: string
  description?: string
  category: string
  status: string
  priority: string
  value: any
  defaultValue: any
  dataType: string
  lastUpdated: string
  updatedBy?: string
  isRequired: boolean
  validationRules?: Record<string, any>
}

interface Props {
  configuration?: SystemConfiguration | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: Partial<SystemConfiguration>): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const form = reactive({
  name: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  dataType: 'string',
  value: '',
  defaultValue: '',
  isRequired: false,
  validationRules: {} as Record<string, any>
})

// Handle form submission
const handleSubmit = () => {
  const data = { ...form }
  
  // Clean up validation rules based on data type
  if (form.dataType !== 'string') {
    delete data.validationRules.minLength
    delete data.validationRules.maxLength
  }
  if (form.dataType !== 'number') {
    delete data.validationRules.min
    delete data.validationRules.max
  }

  emit('submit', data)
}

// Watch for configuration prop changes
watch(
  () => props.configuration,
  (newConfig) => {
    if (newConfig) {
      // Populate form with configuration data
      Object.assign(form, {
        name: newConfig.name,
        description: newConfig.description || '',
        category: newConfig.category,
        priority: newConfig.priority,
        dataType: newConfig.dataType,
        value: newConfig.value || '',
        defaultValue: newConfig.defaultValue || '',
        isRequired: newConfig.isRequired,
        validationRules: newConfig.validationRules || {}
      })
    } else {
      // Reset form for new configuration
      Object.assign(form, {
        name: '',
        description: '',
        category: '',
        priority: 'MEDIUM',
        dataType: 'string',
        value: '',
        defaultValue: '',
        isRequired: false,
        validationRules: {}
      })
    }
  },
  { immediate: true }
)
</script>