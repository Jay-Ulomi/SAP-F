<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Credit Memo Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Customer -->
        <div>
          <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-1">
            Customer *
          </label>
          <select
            id="customerCode"
            v-model="formData.customerCode"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.code" :value="customer.code">
              {{ customer.code }} - {{ customer.name }}
            </option>
          </select>
        </div>

        <!-- Credit Memo Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Credit Memo Type *
          </label>
          <select
            id="type"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="type in creditMemoTypes" :key="type" :value="type">
              {{ formatCreditMemoType(type) }}
            </option>
          </select>
        </div>

        <!-- Currency -->
        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
            Currency *
          </label>
          <select
            id="currency"
            v-model="formData.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
        </div>

        <!-- Credit Memo Date -->
        <div>
          <label for="creditMemoDate" class="block text-sm font-medium text-gray-700 mb-1">
            Credit Memo Date *
          </label>
          <input
            id="creditMemoDate"
            v-model="formData.creditMemoDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Posting Date -->
        <div>
          <label for="postingDate" class="block text-sm font-medium text-gray-700 mb-1">
            Posting Date *
          </label>
          <input
            id="postingDate"
            v-model="formData.postingDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Exchange Rate -->
        <div>
          <label for="exchangeRate" class="block text-sm font-medium text-gray-700 mb-1">
            Exchange Rate
          </label>
          <input
            id="exchangeRate"
            v-model.number="formData.exchangeRate"
            type="number"
            step="0.000001"
            min="0"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Sales Person -->
        <div>
          <label for="salesPerson" class="block text-sm font-medium text-gray-700 mb-1">
            Sales Person
          </label>
          <input
            id="salesPerson"
            v-model="formData.salesPerson"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Return Authorization -->
        <div>
          <label for="returnAuthorization" class="block text-sm font-medium text-gray-700 mb-1">
            Return Authorization
          </label>
          <input
            id="returnAuthorization"
            v-model="formData.returnAuthorization"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Related Invoice -->
        <div>
          <label for="relatedInvoiceId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Invoice
          </label>
          <input
            id="relatedInvoiceId"
            v-model="formData.relatedInvoiceId"
            type="text"
            placeholder="Invoice ID or Number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <!-- Additional Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <!-- Reference -->
        <div>
          <label for="reference" class="block text-sm font-medium text-gray-700 mb-1">
            Reference
          </label>
          <input
            id="reference"
            v-model="formData.reference"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Project -->
        <div>
          <label for="project" class="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <input
            id="project"
            v-model="formData.project"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <!-- Remarks -->
      <div class="mt-4">
        <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1"> Remarks </label>
        <textarea
          id="remarks"
          v-model="formData.remarks"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        ></textarea>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-medium text-gray-900">Line Items</h3>
        <button
          type="button"
          @click="addLineItem"
          class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          Add Line
        </button>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Line" to add items to this credit memo.
      </div>

      <div v-else class="overflow-x-auto">
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
                Qty
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount
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
                  placeholder="Item Code"
                  class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.description"
                  type="text"
                  placeholder="Description"
                  class="block w-full text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.quantity"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model.number="item.unitPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  required
                  @input="calculateLineTotal(index)"
                />
              </td>
              <td class="px-3 py-2">
                <div class="flex space-x-1">
                  <input
                    v-model.number="item.discount"
                    type="number"
                    step="0.01"
                    min="0"
                    class="block w-16 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    @input="calculateLineTotal(index)"
                  />
                  <select
                    v-model="item.discountType"
                    class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    @change="calculateLineTotal(index)"
                  >
                    <option value="PERCENTAGE">%</option>
                    <option value="AMOUNT">$</option>
                  </select>
                </div>
              </td>
              <td class="px-3 py-2">
                <select
                  v-model="item.taxCode"
                  class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                  @change="updateTaxRate(index)"
                >
                  <option value="">No Tax</option>
                  <option v-for="tax in taxCodes" :key="tax.code" :value="tax.code">
                    {{ tax.code }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-2">
                <select
                  v-model="item.returnReason"
                  class="block w-32 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                >
                  <option value="">Select Reason</option>
                  <option v-for="reason in returnReasons" :key="reason" :value="reason">
                    {{ formatReturnReason(reason) }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-2 text-sm font-medium">
                {{ formatCurrency(getLineTotal(item)) }}
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Totals Summary -->
      <div v-if="formData.lineItems.length > 0" class="mt-6 border-t pt-4">
        <div class="flex justify-end">
          <div class="w-64 space-y-2">
            <div class="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span class="font-medium">{{ formatCurrency(subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Total Discount:</span>
              <span class="font-medium">{{ formatCurrency(totalDiscount) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Total Tax:</span>
              <span class="font-medium">{{ formatCurrency(totalTax) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span>Total:</span>
              <span>{{ formatCurrency(total) }}</span>
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
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading" class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Saving...
        </span>
        <span v-else>Save Credit Memo</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCreditMemosStore } from '../stores/creditMemosStore'
import type { CreditMemo, CreditMemoFormData } from '../types'
import { CreditMemoType, CreditMemoReason, Currency } from '../types'

// Props and Events
interface Props {
  initialData?: CreditMemo | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: null,
  loading: false,
})

const emit = defineEmits<{
  submit: [data: CreditMemoFormData]
  cancel: []
}>()

// Store
const store = useCreditMemosStore()

// Form Data
const formData = ref<CreditMemoFormData>({
  customerCode: '',
  creditMemoDate: '',
  postingDate: '',
  type: CreditMemoType.CUSTOMER_RETURN,
  currency: Currency.USD,
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  returnAuthorization: '',
  relatedInvoiceId: '',
  lineItems: [],
})

// Supporting Data
const customers = computed(() => store.customers)
const taxCodes = computed(() => store.taxCodes)

// Constants
const creditMemoTypes = Object.values(CreditMemoType)
const returnReasons = Object.values(CreditMemoReason)
const currencies = Object.values(Currency)

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        customerCode: newData.customerCode,
        creditMemoDate: newData.creditMemoDate,
        postingDate: newData.postingDate,
        type: newData.type,
        currency: newData.currency,
        exchangeRate: newData.exchangeRate,
        salesPerson: newData.salesPerson || '',
        reference: newData.reference || '',
        remarks: newData.remarks || '',
        project: newData.project || '',
        returnAuthorization: newData.returnAuthorization || '',
        relatedInvoiceId: newData.relatedInvoiceId || '',
        lineItems: newData.lineItems.map((item) => ({
          itemCode: item.itemCode,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount,
          discountType: item.discountType,
          taxCode: item.taxCode,
          taxRate: item.taxRate,
          returnReason: item.returnReason,
          originalInvoiceId: item.originalInvoiceId,
          originalInvoiceLineId: item.originalInvoiceLineId,
          warehouseCode: item.warehouseCode,
          serialNumbers: item.serialNumbers,
          batchNumbers: item.batchNumbers,
        })),
      }
    }
  },
  { immediate: true },
)

// Set default dates
onMounted(() => {
  if (!props.initialData) {
    const today = new Date()
    formData.value.creditMemoDate = today.toISOString().split('T')[0]
    formData.value.postingDate = today.toISOString().split('T')[0]
  }

  // Load supporting data
  store.loadCustomers({ limit: 100 })
  store.loadTaxCodes()
})

// Line Items Management
const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    discountType: 'PERCENTAGE',
    taxCode: '',
    taxRate: 0,
    returnReason: undefined,
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tax) => tax.code === item.taxCode)
  if (taxCode) {
    item.taxRate = taxCode.rate
  } else {
    item.taxRate = 0
  }
  calculateLineTotal(index)
}

const calculateLineTotal = (index: number) => {
  // Trigger reactivity by updating the line item
  const item = formData.value.lineItems[index]
  formData.value.lineItems[index] = { ...item }
}

const getLineTotal = (item: {
  quantity: number
  unitPrice: number
  discount: number
  discountType: string
  taxRate: number
}): number => {
  const subtotal = item.quantity * item.unitPrice
  let discountAmount = 0

  if (item.discountType === 'PERCENTAGE') {
    discountAmount = subtotal * (item.discount / 100)
  } else {
    discountAmount = item.discount
  }

  const afterDiscount = subtotal - discountAmount
  const taxAmount = afterDiscount * (item.taxRate / 100)

  return afterDiscount + taxAmount
}

// Calculations
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    if (item.discountType === 'PERCENTAGE') {
      return sum + itemSubtotal * (item.discount / 100)
    } else {
      return sum + item.discount
    }
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    let discountAmount = 0

    if (item.discountType === 'PERCENTAGE') {
      discountAmount = itemSubtotal * (item.discount / 100)
    } else {
      discountAmount = item.discount
    }

    const afterDiscount = itemSubtotal - discountAmount
    return sum + afterDiscount * (item.taxRate / 100)
  }, 0)
})

const total = computed(() => {
  return subtotal.value - totalDiscount.value + totalTax.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.creditMemoDate &&
    formData.value.postingDate &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every(
      (item) => item.itemCode && item.description && item.quantity > 0 && item.unitPrice >= 0,
    )
  )
})

// Form Submission
const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Utility Functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatCreditMemoType = (type: CreditMemoType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: CreditMemoReason): string => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
