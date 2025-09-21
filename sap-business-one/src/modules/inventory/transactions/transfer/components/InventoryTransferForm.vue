<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Inventory Transfer</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
            Posting Date *
          </label>
          <input
            id="postingDate"
            v-model="formData.postingDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="documentDate" class="block text-sm font-medium text-gray-700 mb-1">
            Document Date *
          </label>
          <input
            id="documentDate"
            v-model="formData.documentDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="series" class="block text-sm font-medium text-gray-700 mb-1">
            Series
          </label>
          <input
            id="series"
            v-model="formData.series"
            type="text"
            placeholder="Primary"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="businessPartnerCode" class="block text-sm font-medium text-gray-700 mb-1">
            Business Partner Code
          </label>
          <input
            id="businessPartnerCode"
            v-model="formData.businessPartnerCode"
            type="text"
            placeholder="Enter business partner code"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="businessPartnerName" class="block text-sm font-medium text-gray-700 mb-1">
            Business Partner Name
          </label>
          <input
            id="businessPartnerName"
            v-model="formData.businessPartnerName"
            type="text"
            placeholder="Enter business partner name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="sourceWarehouse" class="block text-sm font-medium text-gray-700 mb-1">
            Source Warehouse
          </label>
          <select
            id="sourceWarehouse"
            v-model="formData.sourceWarehouse"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          >
            <option value="">Select source warehouse</option>
            <option value="WH01">Main Warehouse</option>
            <option value="WH02">Secondary Warehouse</option>
            <option value="WH03">Storage Warehouse</option>
          </select>
        </div>

        <div>
          <label for="targetWarehouse" class="block text-sm font-medium text-gray-700 mb-1">
            Target Warehouse
          </label>
          <select
            id="targetWarehouse"
            v-model="formData.targetWarehouse"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          >
            <option value="">Select target warehouse</option>
            <option value="WH01">Main Warehouse</option>
            <option value="WH02">Secondary Warehouse</option>
            <option value="WH03">Storage Warehouse</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900">Transfer Items</h4>
        <div class="flex items-center space-x-2">
          <button
            type="button"
            @click="addLineItem"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Line
          </button>
        </div>
      </div>

      <div class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="w-24 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item No.
              </th>
              <th class="w-48 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item Description
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th class="w-16 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                UoM
              </th>
              <th class="w-24 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Unit Price
              </th>
              <th class="w-28 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                From Warehouse
              </th>
              <th class="w-28 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                To Warehouse
              </th>
              <th class="w-12 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-2 py-1">
                <input
                  v-model="item.itemCode"
                  type="text"
                  placeholder="Code"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.description"
                  type="text"
                  placeholder="Item Description"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.quantity"
                  type="number"
                  step="1"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.uom"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleLineItemInput(index)"
                >
                  <option value="pcs">pcs</option>
                  <option value="kg">kg</option>
                  <option value="box">box</option>
                  <option value="ltr">ltr</option>
                </select>
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.fromWarehouse"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleLineItemInput(index)"
                >
                  <option value="">Select</option>
                  <option value="WH01">WH01</option>
                  <option value="WH02">WH02</option>
                  <option value="WH03">WH03</option>
                </select>
              </td>
              <td class="px-2 py-1">
                <select
                  v-model="item.toWarehouse"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @change="handleLineItemInput(index)"
                >
                  <option value="">Select</option>
                  <option value="WH01">WH01</option>
                  <option value="WH02">WH02</option>
                  <option value="WH03">WH03</option>
                </select>
              </td>
              <td class="px-2 py-1">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-900 text-xs"
                >
                  ✕
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Save Transfer
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { InventoryTransfer, InventoryTransferFormData, InventoryTransferLineItem } from '../types'

// Props and Emits
const props = defineProps<{
  initialData?: InventoryTransfer
}>()

const emit = defineEmits<{
  submit: [data: InventoryTransferFormData]
  cancel: []
}>()

// Form Data
const formData = ref<InventoryTransferFormData>({
  postingDate: '',
  documentDate: '',
  series: 'IT-2024',
  businessPartnerCode: '',
  businessPartnerName: '',
  sourceWarehouse: '',
  targetWarehouse: '',
  lineItems: [
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', fromWarehouse: '', toWarehouse: '', project: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', fromWarehouse: '', toWarehouse: '', project: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', fromWarehouse: '', toWarehouse: '', project: '', lineTotal: 0 }
  ]
})

// Calculations
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

// Watch for initial data changes
watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      postingDate: newData.postingDate || '',
      documentDate: newData.documentDate || '',
      series: newData.series || 'IT-2024',
      businessPartnerCode: newData.businessPartnerCode || '',
      businessPartnerName: newData.businessPartnerName || '',
      sourceWarehouse: newData.sourceWarehouse || '',
      targetWarehouse: newData.targetWarehouse || '',
      lineItems: newData.lineItems?.length ? newData.lineItems.map(item => ({ ...item })) : [
        { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', fromWarehouse: '', toWarehouse: '', project: '', lineTotal: 0 }
      ]
    }
  }
}, { immediate: true })

// Set default dates
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    formData.value.postingDate = today.toISOString().split('T')[0]
    formData.value.documentDate = today.toISOString().split('T')[0]
  }
})

// Line Items Management
const addLineItem = () => {
  const newItem: InventoryTransferLineItem = {
    itemCode: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    uomCode: '',
    accountName: '',
    dimension1: '',
    dimension2: '',
    dimension3: '',
    dimension4: '',
    fromWarehouse: '',
    toWarehouse: '',
    project: '',
    lineTotal: 0
  }
  formData.value.lineItems.push(newItem)
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]
  if (!hasLineItemData(item) && index === formData.value.lineItems.length - 1) {
    addLineItem()
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  item.lineTotal = item.quantity * item.unitPrice
}

const hasLineItemData = (item: InventoryTransferLineItem): boolean => {
  return item.itemCode.trim() !== '' ||
         item.description.trim() !== '' ||
         item.quantity > 0 ||
         item.unitPrice > 0 ||
         item.fromWarehouse.trim() !== '' ||
         item.toWarehouse.trim() !== ''
}

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.postingDate &&
    formData.value.documentDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.some(
      (item) => item.itemCode && item.description && item.quantity > 0 && item.fromWarehouse && item.toWarehouse
    )
  )
})

// Utilities
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

// Form Submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}
</script>