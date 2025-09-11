<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Quotation Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-1">
            Customer *
          </label>
          <select
            id="customerCode"
            v-model="formData.customerCode"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.customerCode }"
          >
            <option value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.code" :value="customer.code">
              {{ customer.code }} - {{ customer.name }}
            </option>
          </select>
          <p v-if="errors.customerCode" class="mt-1 text-sm text-red-600">
            {{ errors.customerCode }}
          </p>
        </div>

        <div>
          <label for="quotationDate" class="block text-sm font-medium text-gray-700 mb-1">
            Quotation Date *
          </label>
          <input
            id="quotationDate"
            v-model="formData.quotationDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.quotationDate }"
          />
          <p v-if="errors.quotationDate" class="mt-1 text-sm text-red-600">
            {{ errors.quotationDate }}
          </p>
        </div>

        <div>
          <label for="validUntil" class="block text-sm font-medium text-gray-700 mb-1">
            Valid Until *
          </label>
          <input
            id="validUntil"
            v-model="formData.validUntil"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.validUntil }"
          />
          <p v-if="errors.validUntil" class="mt-1 text-sm text-red-600">{{ errors.validUntil }}</p>
        </div>

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
            :class="{ 'border-red-500': errors.postingDate }"
          />
          <p v-if="errors.postingDate" class="mt-1 text-sm text-red-600">
            {{ errors.postingDate }}
          </p>
        </div>

        <div>
          <label for="quotationType" class="block text-sm font-medium text-gray-700 mb-1">
            Type *
          </label>
          <select
            id="quotationType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.type }"
          >
            <option value="">Select Type</option>
            <option value="STANDARD">Standard</option>
            <option value="SPECIAL_PRICING">Special Pricing</option>
            <option value="VOLUME_DISCOUNT">Volume Discount</option>
            <option value="PROMOTIONAL">Promotional</option>
          </select>
          <p v-if="errors.type" class="mt-1 text-sm text-red-600">{{ errors.type }}</p>
        </div>

        <div>
          <label for="currency" class="block text-sm font-medium text-gray-700 mb-1">
            Currency *
          </label>
          <select
            id="currency"
            v-model="formData.currency"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.currency }"
          >
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="JPY">JPY</option>
            <option value="CAD">CAD</option>
            <option value="AUD">AUD</option>
            <option value="CHF">CHF</option>
            <option value="CNY">CNY</option>
          </select>
          <p v-if="errors.currency" class="mt-1 text-sm text-red-600">{{ errors.currency }}</p>
        </div>

        <div>
          <label for="exchangeRate" class="block text-sm font-medium text-gray-700 mb-1">
            Exchange Rate
          </label>
          <input
            id="exchangeRate"
            v-model.number="formData.exchangeRate"
            type="number"
            step="0.0001"
            min="0"
            placeholder="1.0000"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.exchangeRate }"
          />
          <p v-if="errors.exchangeRate" class="mt-1 text-sm text-red-600">
            {{ errors.exchangeRate }}
          </p>
        </div>

        <div>
          <label for="salesPerson" class="block text-sm font-medium text-gray-700 mb-1">
            Sales Person
          </label>
          <input
            id="salesPerson"
            v-model="formData.salesPerson"
            type="text"
            placeholder="Enter sales person"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="reference" class="block text-sm font-medium text-gray-700 mb-1">
            Reference
          </label>
          <input
            id="reference"
            v-model="formData.reference"
            type="text"
            placeholder="Enter reference"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="project" class="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <input
            id="project"
            v-model="formData.project"
            type="text"
            placeholder="Enter project"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="relatedOpportunityId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Opportunity
          </label>
          <input
            id="relatedOpportunityId"
            v-model="formData.relatedOpportunityId"
            type="text"
            placeholder="Enter opportunity ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Remarks -->
        <div class="col-span-full mt-4">
          <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">
            Remarks
          </label>
          <textarea
            id="remarks"
            v-model="formData.remarks"
            rows="3"
            placeholder="Enter any additional remarks"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          ></textarea>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <h4 class="text-lg font-medium text-gray-900">Line Items</h4>
        <button
          @click="addLineItem"
          type="button"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-sap-blue bg-sap-blue-50 hover:bg-sap-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Line
        </button>
      </div>

      <div v-if="formData.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items added yet. Click "Add Line" to add items to this quotation.
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
                  <option v-for="taxCode in taxCodes" :key="taxCode.code" :value="taxCode.code">
                    {{ taxCode.code }}
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
                  :disabled="formData.lineItems.length === 1"
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
              <span class="font-medium">{{ formatCurrency(discountTotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span>Total Tax:</span>
              <span class="font-medium">{{ formatCurrency(taxTotal) }}</span>
            </div>
            <div class="flex justify-between text-base font-bold border-t pt-2">
              <span>Total:</span>
              <span>{{ formatCurrency(totalAmount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3">
      <button
        type="button"
        @click="$emit('close')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
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
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          {{ isEditing ? 'Updating...' : 'Creating...' }}
        </span>
        <span v-else>{{ isEditing ? 'Update Quotation' : 'Create Quotation' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useQuotationsStore } from '../stores/quotationsStore'
import type { Quotation, QuotationFormData } from '../types'
import { QuotationType, Currency } from '../types'

// Props
interface Props {
  quotation?: Quotation | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  quotation: null,
  isEditing: false,
})

// Emits
const emit = defineEmits<{
  close: []
  saved: [Quotation]
}>()

// Store
const quotationsStore = useQuotationsStore()

// Form Data
const formData = ref<QuotationFormData>({
  customerCode: '',
  quotationDate: '',
  validUntil: '',
  postingDate: '',
  type: QuotationType.STANDARD,
  currency: Currency.USD,
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  relatedOpportunityId: '',
  lineItems: [
    {
      itemCode: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      discount: 0,
      discountType: 'PERCENTAGE',
      taxCode: '',
      taxRate: 0,
      remarks: '',
    },
  ],
})

// Local State
const loading = ref(false)
const errors = ref<Record<string, string>>({})

// Computed Properties
const customers = computed(() => quotationsStore.customers)
const taxCodes = computed(() => quotationsStore.taxCodes)

const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

const discountTotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    if (item.discountType === 'PERCENTAGE') {
      return sum + item.quantity * item.unitPrice * (item.discount / 100)
    } else {
      return sum + item.discount
    }
  }, 0)
})

const taxTotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineSubtotal = item.quantity * item.unitPrice
    let lineDiscount = 0
    if (item.discountType === 'PERCENTAGE') {
      lineDiscount = lineSubtotal * (item.discount / 100)
    } else {
      lineDiscount = item.discount
    }
    const taxableAmount = lineSubtotal - lineDiscount
    return sum + taxableAmount * (item.taxRate / 100)
  }, 0)
})

const totalAmount = computed(() => {
  return subtotal.value - discountTotal.value + taxTotal.value
})

// Customer and item search functions removed - now using simple form controls

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tc) => tc.code === item.taxCode)
  if (taxCode) {
    item.taxRate = taxCode.rate
    calculateLineTotal(index)
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  const lineSubtotal = item.quantity * item.unitPrice
  let lineDiscount = 0

  if (item.discountType === 'PERCENTAGE') {
    lineDiscount = lineSubtotal * (item.discount / 100)
  } else {
    lineDiscount = item.discount
  }

  // Note: We don't update lineTotal here as it's not part of the form data
  // It will be calculated on the backend
}

const getLineTotal = (item: {
  quantity: number
  unitPrice: number
  discount: number
  discountType: string
  taxRate: number
}): number => {
  const lineSubtotal = item.quantity * item.unitPrice
  let lineDiscount = 0

  if (item.discountType === 'PERCENTAGE') {
    lineDiscount = lineSubtotal * (item.discount / 100)
  } else {
    lineDiscount = item.discount
  }

  const taxableAmount = lineSubtotal - lineDiscount

  return lineSubtotal - lineDiscount + taxableAmount * (item.taxRate / 100)
}

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
    remarks: '',
  })
}

const removeLineItem = (index: number) => {
  if (formData.value.lineItems.length > 1) {
    formData.value.lineItems.splice(index, 1)
  }
}

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.customerCode) {
    errors.value.customerCode = 'Customer is required'
  }

  if (!formData.value.quotationDate) {
    errors.value.quotationDate = 'Quotation date is required'
  }

  if (!formData.value.validUntil) {
    errors.value.validUntil = 'Valid until date is required'
  }

  if (!formData.value.postingDate) {
    errors.value.postingDate = 'Posting date is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Type is required'
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
  }

  if (formData.value.exchangeRate <= 0) {
    errors.value.exchangeRate = 'Exchange rate must be greater than 0'
  }

  // Validate line items
  formData.value.lineItems.forEach((item, index) => {
    if (!item.itemCode) {
      errors.value[`lineItems.${index}.itemCode`] = 'Item code is required'
    }
    if (!item.description) {
      errors.value[`lineItems.${index}.description`] = 'Description is required'
    }
    if (item.quantity <= 0) {
      errors.value[`lineItems.${index}.quantity`] = 'Quantity must be greater than 0'
    }
    if (item.unitPrice < 0) {
      errors.value[`lineItems.${index}.unitPrice`] = 'Unit price cannot be negative'
    }
  })

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    let result
    if (props.isEditing && props.quotation) {
      result = await quotationsStore.updateQuotation(props.quotation.id, formData.value)
    } else {
      result = await quotationsStore.createQuotation(formData.value)
    }

    if (result.success) {
      emit('saved', result.data)
    }
  } catch (error) {
    console.error('Error saving quotation:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

// Initialize form data when editing
watch(
  () => props.quotation,
  (newQuotation) => {
    if (newQuotation && props.isEditing) {
      formData.value = {
        customerCode: newQuotation.customerCode,
        quotationDate: newQuotation.quotationDate,
        validUntil: newQuotation.validUntil,
        postingDate: newQuotation.postingDate,
        type: newQuotation.type,
        currency: newQuotation.currency,
        exchangeRate: newQuotation.exchangeRate,
        salesPerson: newQuotation.salesPerson || '',
        reference: newQuotation.reference || '',
        remarks: newQuotation.remarks || '',
        project: newQuotation.project || '',
        relatedOpportunityId: newQuotation.relatedOpportunityId || '',
        lineItems: newQuotation.lineItems.map((item) => ({
          itemCode: item.itemCode,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          discount: item.discount,
          discountType: item.discountType,
          taxCode: item.taxCode,
          taxRate: item.taxRate,
          remarks: item.remarks || '',
        })),
      }

      // Form data initialized for editing
    }
  },
  { immediate: true },
)

// Lifecycle
onMounted(async () => {
  await Promise.all([quotationsStore.fetchCustomers(), quotationsStore.fetchTaxCodes()])
})
</script>
