<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ receipt ? 'Edit Production Receipt' : 'Create New Production Receipt' }}
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Number</label>
          <input
            type="text"
            v-model="formData.receiptNumber"
            :disabled="!!receipt"
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
            <option value="byproduct">Byproduct</option>
            <option value="rework">Rework</option>
            <option value="scrap">Scrap</option>
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
            <option value="partially_received">Partially Received</option>
            <option value="fully_received">Fully Received</option>
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
              <option value="WH-FG">Finished Goods</option>
              <option value="WH-WIP">Work in Progress</option>
              <option value="WH-BP">Byproduct</option>
              <option value="WH-SCRAP">Scrap</option>
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
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Receipt Date *</label>
            <input
              type="date"
              v-model="formData.receiptDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Planned Receipt Date</label>
            <input
              type="date"
              v-model="formData.plannedReceiptDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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

      <!-- Quality Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Quality Control</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quality Status *</label>
            <select
              v-model="formData.qualityStatus"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="on_hold">On Hold</option>
            </select>
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
          {{ loading ? 'Saving...' : (receipt ? 'Update Receipt' : 'Create Receipt') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProductionReceipt, ProductionReceiptFormData } from '../types'
import { ReceiptType, ReceiptStatus, QualityStatus } from '../types'

interface Props {
  receipt?: ProductionReceipt
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: ProductionReceiptFormData]
  cancel: []
}>()

const formData = ref<ProductionReceiptFormData>({
  receiptNumber: '',
  type: ReceiptType.PRODUCTION,
  status: ReceiptStatus.DRAFT,
  productionOrderId: '',
  itemCode: '',
  plannedQuantity: 0,
  warehouseCode: '',
  bomCode: '',
  bomVersion: '',
  receiptDate: new Date().toISOString().split('T')[0],
  plannedReceiptDate: '',
  qualityStatus: QualityStatus.PENDING,
  remarks: ''
})

function handleSubmit() {
  // Validate required fields
  if (!formData.value.itemCode || !formData.value.plannedQuantity || !formData.value.warehouseCode) {
    alert('Please fill in all required fields')
    return
  }

  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.receipt) {
    // Pre-fill form with existing receipt data
    formData.value = {
      receiptNumber: props.receipt.receiptNumber,
      type: props.receipt.type,
      status: props.receipt.status,
      productionOrderId: props.receipt.productionOrderId || '',
      itemCode: props.receipt.itemCode,
      plannedQuantity: props.receipt.plannedQuantity,
      warehouseCode: props.receipt.warehouseCode,
      bomCode: props.receipt.bomCode || '',
      bomVersion: props.receipt.bomVersion || '',
      receiptDate: props.receipt.receiptDate.split('T')[0],
      plannedReceiptDate: props.receipt.plannedReceiptDate ? props.receipt.plannedReceiptDate.split('T')[0] : '',
      qualityStatus: props.receipt.qualityStatus,
      remarks: props.receipt.remarks || ''
    }
  }
})
</script>