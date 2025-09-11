<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Delivery Header</h3>

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

        <!-- Delivery Date -->
        <div>
          <label for="deliveryDate" class="block text-sm font-medium text-gray-700 mb-1">
            Delivery Date *
          </label>
          <input
            id="deliveryDate"
            v-model="formData.deliveryDate"
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

        <!-- Delivery Type -->
        <div>
          <label for="deliveryType" class="block text-sm font-medium text-gray-700 mb-1">
            Delivery Type *
          </label>
          <select
            id="deliveryType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Type</option>
            <option v-for="type in Object.values(DeliveryType)" :key="type" :value="type">
              {{ formatDeliveryType(type) }}
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
            <option value="">Select Currency</option>
            <option v-for="currency in Object.values(Currency)" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
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
            min="0"
            step="0.0001"
            placeholder="1.0000"
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
            placeholder="Enter sales person"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Reference -->
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

        <!-- Project -->
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

        <!-- Related Order ID -->
        <div>
          <label for="relatedOrderId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Order ID
          </label>
          <input
            id="relatedOrderId"
            v-model="formData.relatedOrderId"
            type="text"
            placeholder="Enter order ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Related Quotation ID -->
        <div>
          <label for="relatedQuotationId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Quotation ID
          </label>
          <input
            id="relatedQuotationId"
            v-model="formData.relatedQuotationId"
            type="text"
            placeholder="Enter quotation ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Delivery Method -->
        <div>
          <label for="deliveryMethod" class="block text-sm font-medium text-gray-700 mb-1">
            Delivery Method
          </label>
          <input
            id="deliveryMethod"
            v-model="formData.deliveryMethod"
            type="text"
            placeholder="Enter delivery method"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Tracking Number -->
        <div>
          <label for="trackingNumber" class="block text-sm font-medium text-gray-700 mb-1">
            Tracking Number
          </label>
          <input
            id="trackingNumber"
            v-model="formData.trackingNumber"
            type="text"
            placeholder="Enter tracking number"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Carrier -->
        <div>
          <label for="carrier" class="block text-sm font-medium text-gray-700 mb-1">
            Carrier
          </label>
          <input
            id="carrier"
            v-model="formData.carrier"
            type="text"
            placeholder="Enter carrier"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Estimated Delivery Date -->
        <div>
          <label for="estimatedDeliveryDate" class="block text-sm font-medium text-gray-700 mb-1">
            Estimated Delivery Date
          </label>
          <input
            id="estimatedDeliveryDate"
            v-model="formData.estimatedDeliveryDate"
            type="date"
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
        No line items added yet. Click "Add Line" to add items to this delivery.
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
                    placeholder="0.00"
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
                >
                  <option value="">No Tax</option>
                  <option v-for="tax in taxCodes" :key="tax.code" :value="tax.code">
                    {{ tax.code }}
                  </option>
                </select>
              </td>
              <td class="px-3 py-2 text-sm font-medium">
                {{ formatCurrency(item.lineTotal || 0) }}
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
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isValid"
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
        <span v-else>{{ isEditing ? 'Update Delivery' : 'Create Delivery' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useDeliveriesStore } from '../stores/deliveriesStore'
import { DeliveryType, Currency } from '../types'
import type { DeliveryFormData, DeliveryLineItem } from '../types'

interface Props {
  initialData?: DeliveryFormData
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: DeliveryFormData): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
})

const emit = defineEmits<Emits>()

// Store
const store = useDeliveriesStore()

// Supporting Data
const customers = computed(() => store.customers)

// Form data
const formData = ref<
  DeliveryFormData & {
    lineItems: Array<
      Omit<DeliveryLineItem, 'id' | 'lineTotal' | 'deliveredQuantity' | 'remainingQuantity'> & {
        lineTotal?: number
      }
    >
  }
>({
  customerCode: '',
  deliveryDate: '',
  postingDate: '',
  type: DeliveryType.STANDARD,
  currency: Currency.USD,
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  relatedOrderId: '',
  relatedQuotationId: '',
  deliveryMethod: '',
  shippingAddress: undefined,
  trackingNumber: '',
  carrier: '',
  estimatedDeliveryDate: '',
  lineItems: [],
})

// Local state
// Customer search functionality removed - now using simple dropdown

const showItemDropdowns = ref<boolean[]>([])
const filteredItems = ref<Record<number, Array<{ code: string; name: string; price: number }>>>({})

const taxCodes = ref<Array<{ code: string; name: string; rate: number; type: string }>>([])

// Computed properties
const isEditing = computed(() => !!props.initialData)

const subtotal = computed(() =>
  formData.value.lineItems.reduce((sum, item) => {
    const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
    return sum + lineTotal
  }, 0),
)

const discountTotal = computed(() =>
  formData.value.lineItems.reduce((sum, item) => {
    const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
    let discount = 0
    if (item.discountType === 'PERCENTAGE') {
      discount = lineTotal * ((item.discount || 0) / 100)
    } else {
      discount = item.discount || 0
    }
    return sum + discount
  }, 0),
)

const taxTotal = computed(() =>
  formData.value.lineItems.reduce((sum, item) => {
    const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
    const discount =
      item.discountType === 'PERCENTAGE'
        ? lineTotal * ((item.discount || 0) / 100)
        : item.discount || 0
    const taxableAmount = lineTotal - discount
    const taxRate = getTaxRate(item.taxCode)
    return sum + taxableAmount * (taxRate / 100)
  }, 0),
)

const totalAmount = computed(() => subtotal.value - discountTotal.value + taxTotal.value)

const isValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.deliveryDate &&
    formData.value.postingDate &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.lineItems.length > 0
  )
})

// Methods
const handleSubmit = () => {
  if (!isValid.value) return

  const submitData: DeliveryFormData = {
    ...formData.value,
    lineItems: formData.value.lineItems.map((item) => ({
      ...item,
      lineTotal: calculateItemTotal(item),
    })),
  }

  emit('submit', submitData)
}

// Item search functions removed - now using simple input fields

const addLineItem = () => {
  const newItem: Omit<
    DeliveryLineItem,
    'id' | 'lineTotal' | 'deliveredQuantity' | 'remainingQuantity'
  > & { lineTotal?: number } = {
    itemCode: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    discountType: 'AMOUNT',
    taxCode: '',
    taxRate: 0,
    warehouseCode: '',
    batchNumber: '',
    serialNumber: '',
    remarks: '',
    lineTotal: 0,
  }
  formData.value.lineItems.push(newItem)
  showItemDropdowns.value.push(false)
  filteredItems.value[formData.value.lineItems.length - 1] = []
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
  showItemDropdowns.value.splice(index, 1)
  // Reindex filteredItems
  const newFilteredItems: Record<number, Array<{ code: string; name: string; price: number }>> = {}
  Object.keys(filteredItems.value).forEach((key) => {
    const numKey = parseInt(key)
    if (numKey < index) {
      newFilteredItems[numKey] = filteredItems.value[numKey]
    } else if (numKey > index) {
      newFilteredItems[numKey - 1] = filteredItems.value[numKey]
    }
  })
  filteredItems.value = newFilteredItems
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const discount =
    item.discountType === 'PERCENTAGE'
      ? lineTotal * ((item.discount || 0) / 100)
      : item.discount || 0
  item.lineTotal = lineTotal - discount
}

const calculateItemTotal = (
  item: Omit<DeliveryLineItem, 'id' | 'lineTotal' | 'deliveredQuantity' | 'remainingQuantity'>,
) => {
  const lineTotal = (item.quantity || 0) * (item.unitPrice || 0)
  const discount =
    item.discountType === 'PERCENTAGE'
      ? lineTotal * ((item.discount || 0) / 100)
      : item.discount || 0
  return lineTotal - discount
}

const getTaxRate = (taxCode: string) => {
  const tax = taxCodes.value.find((t) => t.code === taxCode)
  return tax ? tax.rate : 0
}

const formatDeliveryType = (type: string) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount || 0)
}

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

// Initialize form
onMounted(() => {
  if (!props.initialData) {
    // Set default dates
    const today = new Date()
    formData.value.deliveryDate = today.toISOString().split('T')[0]
    formData.value.postingDate = today.toISOString().split('T')[0]

    // Add first line item
    addLineItem()
  }

  // Load supporting data
  store.fetchCustomers()

  // Load tax codes
  // TODO: Implement actual API call
  taxCodes.value = [
    { code: 'TAX001', name: 'Sales Tax', rate: 8.5, type: 'SALES_TAX' },
    { code: 'TAX002', name: 'VAT', rate: 20, type: 'VAT' },
    { code: 'TAX003', name: 'GST', rate: 10, type: 'GST' },
  ]
})
</script>
