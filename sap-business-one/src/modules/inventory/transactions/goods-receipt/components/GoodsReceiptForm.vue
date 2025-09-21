<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Goods Receipt</h3>

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
            placeholder="Enter supplier code"
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
            placeholder="Enter supplier name"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="supplier" class="block text-sm font-medium text-gray-700 mb-1">
            Supplier
          </label>
          <input
            id="supplier"
            v-model="formData.supplier"
            type="text"
            placeholder="Enter supplier"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          />
        </div>

        <div>
          <label for="warehouse" class="block text-sm font-medium text-gray-700 mb-1">
            Warehouse
          </label>
          <select
            id="warehouse"
            v-model="formData.warehouse"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900"
          >
            <option value="">Select warehouse</option>
            <option value="WH01">Main Warehouse</option>
            <option value="WH02">Secondary Warehouse</option>
            <option value="WH03">Storage Warehouse</option>
          </select>
        </div>

        <!-- Remarks -->
        <div class="col-span-full mt-4">
          <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            id="remarks"
            v-model="formData.remarks"
            rows="2"
            placeholder="Enter remarks (max 254 characters)"
            maxlength="254"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-400 text-sm text-gray-900 placeholder-gray-700"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900">Receipt Items</h4>
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
              <th class="w-20 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item No.
              </th>
              <th class="w-32 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Item Description
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Quantity
              </th>
              <th class="w-20 px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase">
                Unit Price
              </th>
              <th class="w-20 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                UoM Code
              </th>
              <th class="w-32 px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Account Name
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 1
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 2
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 3
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Dimension 4
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Warehouse
              </th>
              <th class="w-16 px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                Project
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
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full text-xs py-1 px-1 text-right border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900"
                  @input="calculateLineTotal(index); handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.uomCode"
                  type="text"
                  placeholder="UoM"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.accountName"
                  type="text"
                  placeholder="Account Name"
                  class="w-full text-xs py-1 px-1 border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension1"
                  type="text"
                  placeholder="Dim1"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension2"
                  type="text"
                  placeholder="Dim2"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension3"
                  type="text"
                  placeholder="Dim3"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.dimension4"
                  type="text"
                  placeholder="Dim4"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.warehouse"
                  type="text"
                  placeholder="WH"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
              </td>
              <td class="px-2 py-1">
                <input
                  v-model="item.project"
                  type="text"
                  placeholder="Project"
                  class="w-full text-xs py-1 px-1 text-center border-gray-300 rounded focus:border-gray-400 focus:ring-0 text-gray-900 placeholder-gray-700"
                  @input="handleLineItemInput(index)"
                />
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

      <!-- Totals Summary -->
      <div class="mt-6 border-t border-gray-200 pt-4">
        <div class="flex justify-end">
          <div class="w-64 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal:</span>
              <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
              <span>Total:</span>
              <span>{{ formatCurrency(subtotal) }}</span>
            </div>
          </div>
        </div>
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
        Save Receipt
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { GoodsReceipt, GoodsReceiptFormData, GoodsReceiptLineItem } from '../types'

// Props and Emits
const props = defineProps<{
  initialData?: GoodsReceipt
}>()

const emit = defineEmits<{
  submit: [data: GoodsReceiptFormData]
  cancel: []
}>()

// Form Data
const formData = ref<GoodsReceiptFormData>({
  postingDate: '',
  documentDate: '',
  series: 'Primary',
  businessPartnerCode: '',
  businessPartnerName: '',
  supplier: '',
  warehouse: '',
  lineItems: [
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', project: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', project: '', lineTotal: 0 },
    { itemCode: '', description: '', quantity: 0, unitPrice: 0, uomCode: '', accountName: '', dimension1: '', dimension2: '', dimension3: '', dimension4: '', warehouse: '', project: '', lineTotal: 0 }
  ]
})

// Calculations
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

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
  const newItem: GoodsReceiptLineItem = {
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
    warehouse: '',
    project: '',
    lineTotal: 0
  }
  formData.value.lineItems.push(newItem)
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  item.lineTotal = item.quantity * item.unitPrice
}

const handleLineItemInput = (index: number) => {
  const item = formData.value.lineItems[index]
  if (!hasLineItemData(item) && index === formData.value.lineItems.length - 1) {
    addLineItem()
  }
}

const hasLineItemData = (item: GoodsReceiptLineItem): boolean => {
  return item.itemCode.trim() !== '' ||
         item.description.trim() !== '' ||
         item.quantity > 0 ||
         item.unitPrice > 0 ||
         item.uomCode.trim() !== '' ||
         item.accountName.trim() !== '' ||
         item.dimension1.trim() !== '' ||
         item.dimension2.trim() !== '' ||
         item.dimension3.trim() !== '' ||
         item.dimension4.trim() !== '' ||
         item.warehouse.trim() !== '' ||
         item.project.trim() !== ''
}

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.postingDate &&
    formData.value.documentDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.some(
      (item) => item.itemCode && item.description && item.quantity > 0 && item.warehouse
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