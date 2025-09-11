<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ issue ? 'Edit Material Issue' : 'Create New Material Issue' }}
      </h3>
      <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Issue Number</label>
          <input
            type="text"
            v-model="formData.issueNumber"
            :disabled="!!issue"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Auto-generated if empty"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Production Order</label>
          <input
            type="text"
            v-model="formData.productionOrderId"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Link to production order"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
          <select
            v-model="formData.type"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="production">Production</option>
            <option value="manual">Manual</option>
            <option value="backflush">Backflush</option>
            <option value="consumption">Consumption</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="formData.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="open">Open</option>
            <option value="partially_issued">Partially Issued</option>
            <option value="fully_issued">Fully Issued</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <!-- Item Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Item Details</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Item Code *</label>
            <input
              type="text"
              v-model="formData.itemCode"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Planned Quantity *</label>
            <input
              type="number"
              v-model.number="formData.plannedQuantity"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse Code *</label>
            <select
              v-model="formData.warehouseCode"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Warehouse</option>
              <option value="WH-RM">Raw Materials</option>
              <option value="WH-FG">Finished Goods</option>
              <option value="WH-WIP">Work in Progress</option>
              <option value="WH-QA">Quality Assurance</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">BOM Code</label>
            <input
              type="text"
              v-model="formData.bomCode"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Optional BOM reference"
            />
          </div>
        </div>
      </div>

      <!-- Dates -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Schedule</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
            <input
              type="date"
              v-model="formData.issueDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Planned Issue Date</label>
            <input
              type="date"
              v-model="formData.plannedIssueDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
            <input
              type="date"
              v-model="formData.dueDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <!-- BOM Information -->
      <div v-if="formData.bomCode" class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">BOM Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">BOM Version</label>
            <input
              type="text"
              v-model="formData.bomVersion"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., v1.0"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Additional Information</h4>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
          <textarea
            v-model="formData.remarks"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Additional notes or instructions..."
          ></textarea>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : (issue ? 'Update Issue' : 'Create Issue') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { MaterialIssue, MaterialIssueFormData } from '../types'
import { IssueType, IssueStatus } from '../types'

interface Props {
  issue?: MaterialIssue
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: MaterialIssueFormData]
  cancel: []
}>()

const formData = ref<MaterialIssueFormData>({
  issueNumber: '',
  type: IssueType.PRODUCTION,
  status: IssueStatus.DRAFT,
  productionOrderId: '',
  itemCode: '',
  plannedQuantity: 0,
  warehouseCode: '',
  bomCode: '',
  bomVersion: '',
  issueDate: new Date().toISOString().split('T')[0],
  plannedIssueDate: '',
  dueDate: '',
  remarks: ''
})

function handleSubmit() {
  // Validate required fields
  if (!formData.value.itemCode || !formData.value.plannedQuantity || !formData.value.warehouseCode) {
    alert('Please fill in all required fields')
    return
  }

  if (!formData.value.dueDate) {
    alert('Due date is required')
    return
  }

  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.issue) {
    // Pre-fill form with existing issue data
    formData.value = {
      issueNumber: props.issue.issueNumber,
      type: props.issue.type,
      status: props.issue.status,
      productionOrderId: props.issue.productionOrderId || '',
      itemCode: props.issue.itemCode,
      plannedQuantity: props.issue.plannedQuantity,
      warehouseCode: props.issue.warehouseCode,
      bomCode: props.issue.bomCode || '',
      bomVersion: props.issue.bomVersion || '',
      issueDate: props.issue.issueDate.split('T')[0],
      plannedIssueDate: props.issue.plannedIssueDate ? props.issue.plannedIssueDate.split('T')[0] : '',
      dueDate: props.issue.dueDate.split('T')[0],
      remarks: props.issue.remarks || ''
    }
  } else {
    // Set default due date to 7 days from now
    const defaultDueDate = new Date()
    defaultDueDate.setDate(defaultDueDate.getDate() + 7)
    formData.value.dueDate = defaultDueDate.toISOString().split('T')[0]
  }
})
</script>