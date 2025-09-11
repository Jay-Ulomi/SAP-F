<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Fields -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
        <label for="vendorName" class="block text-sm font-medium text-gray-700">Vendor Name</label>
        <input
          id="vendorName"
          v-model="formData.vendorName"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="creditMemoNumber" class="block text-sm font-medium text-gray-700"
          >Credit Memo Number</label
        >
        <input
          id="creditMemoNumber"
          v-model="formData.creditMemoNumber"
          type="text"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="creditMemoDate" class="block text-sm font-medium text-gray-700"
          >Credit Memo Date</label
        >
        <input
          id="creditMemoDate"
          v-model="formData.creditMemoDate"
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
        <label for="type" class="block text-sm font-medium text-gray-700">Credit Memo Type</label>
        <select
          id="type"
          v-model="formData.type"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Type</option>
          <option v-for="type in creditMemoTypes" :key="type" :value="type">
            {{ formatCreditMemoType(type) }}
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
        <label for="exchangeRate" class="block text-sm font-medium text-gray-700"
          >Exchange Rate</label
        >
        <input
          id="exchangeRate"
          v-model.number="formData.exchangeRate"
          type="number"
          min="0"
          step="0.01"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="paymentTerms" class="block text-sm font-medium text-gray-700"
          >Payment Terms</label
        >
        <select
          id="paymentTerms"
          v-model="formData.paymentTerms"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">Select Terms</option>
          <option v-for="terms in paymentTerms" :key="terms" :value="terms">
            {{ formatPaymentTerms(terms) }}
          </option>
        </select>
      </div>

      <div>
        <label for="originalInvoiceNumber" class="block text-sm font-medium text-gray-700"
          >Original Invoice Number</label
        >
        <input
          id="originalInvoiceNumber"
          v-model="formData.originalInvoiceNumber"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="purchaseOrderNumber" class="block text-sm font-medium text-gray-700"
          >Purchase Order Number</label
        >
        <input
          id="purchaseOrderNumber"
          v-model="formData.purchaseOrderNumber"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label for="goodsReceiptNumber" class="block text-sm font-medium text-gray-700"
          >Goods Receipt Number</label
        >
        <input
          id="goodsReceiptNumber"
          v-model="formData.goodsReceiptNumber"
          type="text"
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
        <label for="costCenter" class="block text-sm font-medium text-gray-700">Cost Center</label>
        <input
          id="costCenter"
          v-model="formData.costCenter"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
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
                Quantity
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount %
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Reason
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
                  v-model.number="item.quantity"
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
                <input
                  v-model.number="item.discountPercent"
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="0"
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
                <input
                  v-model="item.returnReason"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Return reason"
                />
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
          <span class="text-gray-600">Discount Total:</span>
          <span class="font-medium">{{ formatCurrency(discountTotal) }}</span>
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
        {{ initialData ? 'Update' : 'Create' }} Credit Memo
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { ApCreditMemoType, PaymentTerms, Currency } from '../types'
import type { ApCreditMemoFormData } from '../types'

interface Props {
  initialData?: ApCreditMemoFormData
}

interface Emits {
  (e: 'submit', data: ApCreditMemoFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form data
const formData = ref<ApCreditMemoFormData>({
  vendorCode: '',
  vendorName: '',
  creditMemoNumber: '',
  creditMemoDate: '',
  postingDate: '',
  type: ApCreditMemoType.VENDOR_RETURN,
  currency: Currency.USD,
  exchangeRate: 1.0,
  paymentTerms: PaymentTerms.NET_30,
  originalInvoiceNumber: '',
  purchaseOrderNumber: '',
  goodsReceiptNumber: '',
  projectCode: '',
  costCenter: '',
  notes: '',
  lineItems: [],
})

// Supporting data
const creditMemoTypes = Object.values(ApCreditMemoType)
const paymentTerms = Object.values(PaymentTerms)
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
  if (!formData.value.creditMemoDate) {
    formData.value.creditMemoDate = new Date().toISOString().split('T')[0]
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
    quantity: 0,
    unitPrice: 0,
    discountPercent: 0,
    discountAmount: 0,
    taxCode: 'VAT',
    taxPercent: 10,
    accountCode: '',
    costCenter: '',
    projectCode: '',
    originalInvoiceNumber: '',
    returnReason: '',
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
  if (item.quantity > 0 && item.unitPrice > 0) {
    const subtotal = item.quantity * item.unitPrice
    const discount = subtotal * (item.discountPercent / 100)
    const netAmount = subtotal - discount
    const taxAmount = netAmount * (item.taxPercent / 100)
    // Note: We don't update the item directly as it's readonly in the form data
  }
}

const getLineTotal = (index: number): number => {
  const item = formData.value.lineItems[index]
  if (item.quantity > 0 && item.unitPrice > 0) {
    const subtotal = item.quantity * item.unitPrice
    const discount = subtotal * (item.discountPercent / 100)
    const netAmount = subtotal - discount
    const taxAmount = netAmount * (item.taxPercent / 100)
    return netAmount + taxAmount
  }
  return 0
}

// Computed properties
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

const discountTotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineSubtotal = item.quantity * item.unitPrice
    return sum + lineSubtotal * (item.discountPercent / 100)
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineSubtotal = item.quantity * item.unitPrice
    const lineDiscount = lineSubtotal * (item.discountPercent / 100)
    const lineNetAmount = lineSubtotal - lineDiscount
    return sum + lineNetAmount * (item.taxPercent / 100)
  }, 0)
})

const total = computed(() => {
  return subtotal.value - discountTotal.value + totalTax.value
})

const isFormValid = computed(() => {
  return (
    formData.value.vendorCode &&
    formData.value.vendorName &&
    formData.value.creditMemoNumber &&
    formData.value.creditMemoDate &&
    formData.value.postingDate &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.exchangeRate > 0 &&
    formData.value.paymentTerms &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) =>
        item.itemCode &&
        item.description &&
        item.quantity > 0 &&
        item.unitPrice >= 0 &&
        item.discountPercent >= 0 &&
        item.discountPercent <= 100 &&
        item.taxPercent >= 0,
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

const formatCreditMemoType = (type: ApCreditMemoType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPaymentTerms = (terms: PaymentTerms): string => {
  return terms.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
