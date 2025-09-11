<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ bom ? 'Edit BOM' : 'Create New BOM' }}
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
          <label class="block text-sm font-medium text-gray-700 mb-2">BOM Code *</label>
          <input
            type="text"
            v-model="formData.bomCode"
            :disabled="!!bom"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Version</label>
          <input
            type="text"
            v-model="formData.version"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Code *</label>
          <input
            type="text"
            v-model="formData.productCode"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
          <input
            type="text"
            v-model="formData.productName"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            v-model="formData.type"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="production">Production</option>
            <option value="phantom">Phantom</option>
            <option value="template">Template</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="formData.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="obsolete">Obsolete</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Base Quantity</label>
          <input
            type="number"
            v-model.number="formData.baseQuantity"
            min="0"
            step="0.01"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Effective From</label>
          <input
            type="date"
            v-model="formData.effectiveFrom"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Effective To</label>
          <input
            type="date"
            v-model="formData.effectiveTo"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <!-- Components Section -->
      <div class="border-t pt-6">
        <div class="flex justify-between items-center mb-4">
          <h4 class="text-md font-medium text-gray-900">Components</h4>
          <button
            type="button"
            @click="addComponent"
            class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Component
          </button>
        </div>

        <div v-if="formData.components.length > 0" class="space-y-3">
          <div 
            v-for="(component, index) in formData.components" 
            :key="index"
            class="border border-gray-200 rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-3">
              <h5 class="text-sm font-medium text-gray-800">Component {{ index + 1 }}</h5>
              <button
                type="button"
                @click="removeComponent(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Item Code</label>
                <input
                  type="text"
                  v-model="component.itemCode"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Item Name</label>
                <input
                  type="text"
                  v-model="component.itemName"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Quantity</label>
                <input
                  type="number"
                  v-model.number="component.quantity"
                  min="0"
                  step="0.01"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                  required
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Unit</label>
                <select
                  v-model="component.unit"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                  <option value="PC">PC</option>
                  <option value="KG">KG</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Type</label>
                <select
                  v-model="component.type"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                >
                  <option value="material">Material</option>
                  <option value="resource">Resource</option>
                  <option value="text">Text</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Scrap %</label>
                <input
                  type="number"
                  v-model.number="component.scrapPercentage"
                  min="0"
                  max="100"
                  step="0.1"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-600 mb-1">Warehouse</label>
                <input
                  type="text"
                  v-model="component.warehouseCode"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-8 text-gray-500">
          <p>No components added yet. Click "Add Component" to start building your BOM.</p>
        </div>
      </div>

      <!-- Notes -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          v-model="formData.notes"
          rows="3"
          class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        ></textarea>
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
          {{ loading ? 'Saving...' : (bom ? 'Update BOM' : 'Create BOM') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BOM, BOMFormData, BOMComponent, BOMType, BOMStatus } from '../types'

interface Props {
  bom?: BOM
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: BOMFormData]
  cancel: []
}>()

const formData = ref<BOMFormData>({
  bomCode: '',
  version: 'v1.0',
  productCode: '',
  productName: '',
  type: 'production' as BOMType,
  status: 'draft' as BOMStatus,
  baseQuantity: 1,
  effectiveFrom: new Date().toISOString().split('T')[0],
  effectiveTo: '',
  components: [],
  notes: ''
})

function addComponent() {
  const newComponent: BOMComponent = {
    id: `comp-${Date.now()}`,
    itemCode: '',
    itemName: '',
    type: 'material',
    quantity: 1,
    unit: 'PC',
    scrapPercentage: 0,
    warehouseCode: '',
    position: formData.value.components.length + 1,
    notes: ''
  }
  
  formData.value.components.push(newComponent)
}

function removeComponent(index: number) {
  formData.value.components.splice(index, 1)
  // Update positions
  formData.value.components.forEach((comp, idx) => {
    comp.position = idx + 1
  })
}

function handleSubmit() {
  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.bom) {
    // Pre-fill form with existing BOM data
    formData.value = {
      bomCode: props.bom.bomCode,
      version: props.bom.version,
      productCode: props.bom.productCode,
      productName: props.bom.productName,
      type: props.bom.type,
      status: props.bom.status,
      baseQuantity: props.bom.baseQuantity,
      effectiveFrom: props.bom.effectiveFrom.split('T')[0],
      effectiveTo: props.bom.effectiveTo ? props.bom.effectiveTo.split('T')[0] : '',
      components: [...props.bom.components],
      notes: props.bom.notes || ''
    }
  }
})
</script>