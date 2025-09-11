<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ order ? 'Edit Production Order' : 'Create New Production Order' }}
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
          <label class="block text-sm font-medium text-gray-700 mb-2">Order Number</label>
          <input
            type="text"
            v-model="formData.orderNumber"
            :disabled="!!order"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Auto-generated if empty"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Customer Order</label>
          <input
            type="text"
            v-model="formData.customerOrderNumber"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Reference customer order"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Type *</label>
          <select
            v-model="formData.type"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="standard">Standard</option>
            <option value="special">Special</option>
            <option value="rework">Rework</option>
            <option value="assembly">Assembly</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="formData.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="planned">Planned</option>
            <option value="released">Released</option>
            <option value="started">Started</option>
            <option value="completed">Completed</option>
            <option value="closed">Closed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            v-model="formData.priority"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>
      </div>

      <!-- Item Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Product Details</h4>
        
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
            <label class="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
            <input
              type="text"
              v-model="formData.itemName"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
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
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Unit</label>
            <select
              v-model="formData.unit"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="PC">PC</option>
              <option value="KG">KG</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Warehouse *</label>
            <select
              v-model="formData.warehouseCode"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Warehouse</option>
              <option value="WH-FG">Finished Goods</option>
              <option value="WH-WIP">Work in Progress</option>
              <option value="WH-RM">Raw Materials</option>
            </select>
          </div>
        </div>
      </div>

      <!-- BOM Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">BOM Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">BOM Code</label>
            <input
              type="text"
              v-model="formData.bomCode"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Bill of Materials reference"
            />
          </div>
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

      <!-- Schedule -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Schedule</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
            <input
              type="date"
              v-model="formData.startDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
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

      <!-- Costing (Optional) -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Cost Planning</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Material Cost</label>
            <input
              type="number"
              v-model.number="formData.materialCost"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Labor Cost</label>
            <input
              type="number"
              v-model.number="formData.laborCost"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Overhead Cost</label>
            <input
              type="number"
              v-model.number="formData.overheadCost"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Additional Information</h4>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Additional notes or special instructions..."
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
          {{ loading ? 'Saving...' : (order ? 'Update Order' : 'Create Order') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { ProductionOrder, ProductionOrderFormData } from '../types'
import { ProductionOrderType, ProductionOrderStatus, Priority } from '../types'

interface Props {
  order?: ProductionOrder
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: ProductionOrderFormData]
  cancel: []
}>()

const formData = ref<ProductionOrderFormData>({
  orderNumber: '',
  customerOrderNumber: '',
  type: ProductionOrderType.STANDARD,
  status: ProductionOrderStatus.PLANNED,
  priority: Priority.MEDIUM,
  itemCode: '',
  itemName: '',
  plannedQuantity: 0,
  unit: 'PC',
  warehouseCode: '',
  bomCode: '',
  bomVersion: '',
  startDate: new Date().toISOString().split('T')[0],
  dueDate: '',
  materialCost: 0,
  laborCost: 0,
  overheadCost: 0,
  notes: ''
})

function handleSubmit() {
  // Validate required fields
  if (!formData.value.itemCode || !formData.value.itemName || !formData.value.plannedQuantity || !formData.value.warehouseCode) {
    alert('Please fill in all required fields')
    return
  }

  if (!formData.value.dueDate) {
    alert('Due date is required')
    return
  }

  if (new Date(formData.value.dueDate) <= new Date(formData.value.startDate)) {
    alert('Due date must be after start date')
    return
  }

  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.order) {
    // Pre-fill form with existing order data
    formData.value = {
      orderNumber: props.order.orderNumber,
      customerOrderNumber: props.order.customerOrderNumber || '',
      type: props.order.type,
      status: props.order.status,
      priority: props.order.priority,
      itemCode: props.order.itemCode,
      itemName: props.order.itemName,
      plannedQuantity: props.order.plannedQuantity,
      unit: props.order.unit,
      warehouseCode: props.order.warehouseCode,
      bomCode: props.order.bomCode || '',
      bomVersion: props.order.bomVersion || '',
      startDate: props.order.startDate.split('T')[0],
      dueDate: props.order.dueDate.split('T')[0],
      materialCost: props.order.costing?.materialCost || 0,
      laborCost: props.order.costing?.laborCost || 0,
      overheadCost: props.order.costing?.overheadCost || 0,
      notes: props.order.notes || ''
    }
  } else {
    // Set default due date to 14 days from start date
    const defaultDueDate = new Date()
    defaultDueDate.setDate(defaultDueDate.getDate() + 14)
    formData.value.dueDate = defaultDueDate.toISOString().split('T')[0]
  }
})
</script>