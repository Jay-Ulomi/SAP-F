<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label for="returnNumber" class="block text-sm font-medium text-gray-700"
          >Return Number</label
        >
        <input
          id="returnNumber"
          v-model="formData.returnNumber"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="returnDate" class="block text-sm font-medium text-gray-700">Return Date</label>
        <input
          id="returnDate"
          v-model="formData.returnDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="postingDate" class="block text-sm font-medium text-gray-700"
          >Posting Date</label
        >
        <input
          id="postingDate"
          v-model="formData.postingDate"
          type="date"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Return Type</label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Type</option>
          <option v-for="type in returnTypes" :key="type" :value="type">
            {{ formatReturnType(type) }}
          </option>
        </select>
      </div>

      <div>
        <label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
        <select
          id="currency"
          v-model="formData.currency"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Currency</option>
          <option v-for="currency in currencies" :key="currency" :value="currency">
            {{ currency }}
          </option>
        </select>
      </div>

      <div>
        <label for="vendorCode" class="block text-sm font-medium text-gray-700">Vendor Code</label>
        <input
          id="vendorCode"
          v-model="formData.vendorCode"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="goodsReceiptId" class="block text-sm font-medium text-gray-700"
          >Goods Receipt ID</label
        >
        <input
          id="goodsReceiptId"
          v-model="formData.goodsReceiptId"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="warehouseCode" class="block text-sm font-medium text-gray-700"
          >Warehouse Code</label
        >
        <input
          id="warehouseCode"
          v-model="formData.warehouseCode"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="department" class="block text-sm font-medium text-gray-700">Department</label>
        <input
          id="department"
          v-model="formData.department"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="costCenter" class="block text-sm font-medium text-gray-700">Cost Center</label>
        <input
          id="costCenter"
          v-model="formData.costCenter"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="projectCode" class="block text-sm font-medium text-gray-700"
          >Project Code</label
        >
        <input
          id="projectCode"
          v-model="formData.projectCode"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="returnReason" class="block text-sm font-medium text-gray-700"
          >Return Reason</label
        >
        <select
          id="returnReason"
          v-model="formData.returnReason"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Reason</option>
          <option v-for="reason in returnReasons" :key="reason" :value="reason">
            {{ formatReturnReason(reason) }}
          </option>
        </select>
      </div>
    </div>

    <!-- Notes -->
    <div>
      <label for="notes" class="block text-sm font-medium text-gray-700">Notes</label>
      <textarea
        id="notes"
        v-model="formData.notes"
        rows="3"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      ></textarea>
    </div>

    <!-- Line Items -->
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium text-gray-900">Line Items</h3>
        <button
          type="button"
          @click="addLineItem"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Item
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Original Qty
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Qty
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.lineItems" :key="index">
              <td class="px-3 py-2">
                <input
                  v-model="item.itemCode"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Item Code"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.description"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Description"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.originalQuantity"
                  type="number"
                  min="0"
                  step="1"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.returnQuantity"
                  type="number"
                  min="0"
                  step="1"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0.00"
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <div class="flex space-x-2">
                  <select
                    v-model="item.taxCode"
                    @change="updateTaxRate(index)"
                    class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="VAT">VAT</option>
                    <option value="GST">GST</option>
                    <option value="SALES_TAX">ST</option>
                  </select>
                  <input
                    v-model.number="item.taxPercent"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    class="block w-16 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="0"
                    @input="calculateLineTotal(index)"
                  />
                </div>
              </td>
              <td class="px-3 py-2">
                <span class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(getLineTotal(index)) }}
                </span>
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-900"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals -->
    <div v-if="formData.lineItems.length > 0" class="flex justify-end">
      <div class="w-64 border-t pt-4">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Subtotal:</span>
          <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="flex justify-between text-sm mt-1">
          <span class="text-gray-600">Tax Total:</span>
          <span class="font-medium">{{ formatCurrency(totalTax) }}</span>
        </div>
        <div class="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
          <span>Total:</span>
          <span>{{ formatCurrency(total) }}</span>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-4 border-t">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ initialData ? 'Update' : 'Create' }} Return
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ReturnType, ReturnReason, Currency } from '../types'
import type { PurchaseReturnFormData } from '../types'

interface Props {
  initialData?: PurchaseReturnFormData
}

interface Emits {
  (e: 'submit', data: PurchaseReturnFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<PurchaseReturnFormData>({
  returnNumber: '',
  returnDate: '',
  postingDate: '',
  type: ReturnType.STANDARD,
  currency: Currency.USD,
  vendorCode: '',
  goodsReceiptId: '',
  warehouseCode: '',
  department: '',
  costCenter: '',
  projectCode: '',
  returnReason: ReturnReason.DEFECTIVE,
  notes: '',
  lineItems: [],
})

// Supporting data
const returnTypes = Object.values(ReturnType)
const returnReasons = Object.values(ReturnReason)
const currencies = Object.values(Currency)

// Mock tax codes
const taxCodes = ref([
  { code: 'VAT', rate: 10 },
  { code: 'GST', rate: 5 },
  { code: 'SALES_TAX', rate: 8.5 },
])

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = { ...newData }
    }
  },
  { immediate: true },
)

// Set default dates on mount
onMounted(() => {
  if (!formData.value.returnDate) {
    formData.value.returnDate = new Date().toISOString().split('T')[0]
  }
  if (!formData.value.postingDate) {
    formData.value.postingDate = new Date().toISOString().split('T')[0]
  }
})

// Line item management
const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    itemName: '',
    description: '',
    originalQuantity: 0,
    returnQuantity: 0,
    unitPrice: 0,
    taxCode: 'VAT',
    taxPercent: 10,
    accountCode: '',
    costCenter: '',
    projectCode: '',
    warehouseCode: '',
    binLocation: '',
    batchNumber: '',
    serialNumber: '',
    returnReason: ReturnReason.DEFECTIVE,
    notes: '',
    goodsReceiptId: '',
    goodsReceiptLineId: '',
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tc) => tc.code === item.taxCode)
  if (taxCode) {
    item.taxPercent = taxCode.rate
    calculateLineTotal(index)
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.returnQuantity > 0 && item.unitPrice > 0) {
    const subtotal = item.returnQuantity * item.unitPrice
    const taxAmount = subtotal * (item.taxPercent / 100)
    // Note: We don't update the item directly as it's readonly in the form data
  }
}

const getLineTotal = (index: number): number => {
  const item = formData.value.lineItems[index]
  if (item.returnQuantity > 0 && item.unitPrice > 0) {
    const subtotal = item.returnQuantity * item.unitPrice
    const taxAmount = subtotal * (item.taxPercent / 100)
    return subtotal + taxAmount
  }
  return 0
}

// Computed properties
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.returnQuantity * item.unitPrice
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineSubtotal = item.returnQuantity * item.unitPrice
    return sum + lineSubtotal * (item.taxPercent / 100)
  }, 0)
})

const total = computed(() => {
  return subtotal.value + totalTax.value
})

const isFormValid = computed(() => {
  return (
    formData.value.returnNumber &&
    formData.value.returnDate &&
    formData.value.postingDate &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.vendorCode &&
    formData.value.warehouseCode &&
    formData.value.department &&
    formData.value.costCenter &&
    formData.value.returnReason &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) =>
        item.itemCode &&
        item.description &&
        item.returnQuantity > 0 &&
        item.returnQuantity <= item.originalQuantity &&
        item.unitPrice >= 0,
    )
  )
})

// Form submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatReturnType = (type: ReturnType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: ReturnReason): string => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
