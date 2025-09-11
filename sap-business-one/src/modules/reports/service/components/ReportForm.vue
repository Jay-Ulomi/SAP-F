<template>
  <div class="service-report-form">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Report Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="reportName" class="block text-sm font-medium text-gray-700 mb-2">
            Report Name *
          </label>
          <input
            id="reportName"
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter report name"
          />
        </div>

        <div>
          <label for="reportType" class="block text-sm font-medium text-gray-700 mb-2">
            Report Type *
          </label>
          <select
            id="reportType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Report Type</option>
            <option value="SERVICE_CALLS">Service Calls Report</option>
            <option value="SERVICE_CONTRACTS">Service Contracts</option>
            <option value="TECHNICIAN_PERFORMANCE">Technician Performance</option>
            <option value="SLA_COMPLIANCE">SLA Compliance</option>
            <option value="EQUIPMENT_HISTORY">Equipment History</option>
            <option value="PREVENTIVE_MAINTENANCE">Preventive Maintenance</option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue"
        >
          Generate Report
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  type: ''
})

const loading = ref(false)

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>