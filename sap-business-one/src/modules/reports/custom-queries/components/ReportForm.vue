<template>
  <div class="custom-queries-report-form">
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Report Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="reportName" class="block text-sm font-medium text-gray-700 mb-2">
            Query Name *
          </label>
          <input
            id="reportName"
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter query name"
          />
        </div>

        <div>
          <label for="reportType" class="block text-sm font-medium text-gray-700 mb-2">
            Query Type *
          </label>
          <select
            id="reportType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Query Type</option>
            <option value="SQL_QUERY">SQL Query</option>
            <option value="STORED_PROCEDURE">Stored Procedure</option>
            <option value="SYSTEM_QUERY">System Query</option>
          </select>
        </div>
      </div>

      <!-- SQL Query -->
      <div>
        <label for="sqlQuery" class="block text-sm font-medium text-gray-700 mb-2">
          SQL Query *
        </label>
        <textarea
          id="sqlQuery"
          v-model="formData.sqlQuery"
          rows="8"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm font-mono"
          placeholder="Enter your SQL query here..."
        ></textarea>
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
          Execute Query
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const formData = ref({
  name: '',
  type: '',
  sqlQuery: ''
})

const loading = ref(false)

const emit = defineEmits(['submit', 'cancel'])

const handleSubmit = () => {
  emit('submit', formData.value)
}
</script>