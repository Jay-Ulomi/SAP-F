<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Sales Order Header</h3>

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
            :class="{ 'border-red-500': errors.customerCode }"
          >
            <option value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.code" :value="customer.code">
              {{ customer.code }} - {{ customer.name }}
            </option>
          </select>
          <div v-if="errors.customerCode" class="mt-1 text-sm text-red-600">
            {{ errors.customerCode }}
          </div>
        </div>

        <!-- Order Date -->
        <div>
          <label for="orderDate" class="block text-sm font-medium text-gray-700 mb-1">
            Order Date *
          </label>
          <input
            id="orderDate"
            v-model="formData.orderDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.orderDate }"
          />
          <div v-if="errors.orderDate" class="mt-1 text-sm text-red-600">
            {{ errors.orderDate }}
          </div>
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
            :class="{ 'border-red-500': errors.deliveryDate }"
          />
          <div v-if="errors.deliveryDate" class="mt-1 text-sm text-red-600">
            {{ errors.deliveryDate }}
          </div>
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
            :class="{ 'border-red-500': errors.postingDate }"
          />
          <div v-if="errors.postingDate" class="mt-1 text-sm text-red-600">
            {{ errors.postingDate }}
          </div>
        </div>

        <!-- Order Type -->
        <div>
          <label for="orderType" class="block text-sm font-medium text-gray-700 mb-1">
            Order Type *
          </label>
          <select
            id="orderType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.type }"
          >
            <option value="">Select Type</option>
            <option v-for="type in orderTypes" :key="type" :value="type">
              {{ type.replace('_', ' ') }}
            </option>
          </select>
          <div v-if="errors.type" class="mt-1 text-sm text-red-600">
            {{ errors.type }}
          </div>
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
            :class="{ 'border-red-500': errors.currency }"
          >
            <option value="">Select Currency</option>
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
          <div v-if="errors.currency" class="mt-1 text-sm text-red-600">
            {{ errors.currency }}
          </div>
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
            step="0.0001"
            min="0"
            placeholder="1.0000"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            :class="{ 'border-red-500': errors.exchangeRate }"
          />
          <div v-if="errors.exchangeRate" class="mt-1 text-sm text-red-600">
            {{ errors.exchangeRate }}
          </div>
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

        <!-- Related Quotation -->
        <div>
          <label for="relatedQuotationId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Quotation
          </label>
          <input
            id="relatedQuotationId"
            v-model="formData.relatedQuotationId"
            type="text"
            placeholder="Enter quotation ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
      </div>

      <!-- Remarks -->
      <div class="col-span-full mt-4">
        <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1"> Remarks </label>
        <textarea
          id="remarks"
          v-model="formData.remarks"
          rows="3"
          placeholder="Enter any additional remarks"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        ></textarea>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-4">
          <h4 class="text-lg font-medium text-gray-900">Line Items</h4>
          <div class="flex items-center space-x-2">
            <label class="text-sm font-medium text-gray-700">Add:</label>
            <select
              v-model="newItemType"
              class="block text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
            >
              <option value="INVENTORY">Item</option>
              <option value="SERVICE">Service</option>
            </select>
          </div>
        </div>
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
        No line items added yet. Click "Add Line" to add items to this order.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item/Service
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
                {{ warehouseLocationHeader }}
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
                  :placeholder="item.itemType === 'SERVICE' ? 'Service Code' : 'Item Code'"
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
                  @input="updateLineTotal(index)"
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
                  @input="updateLineTotal(index)"
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
                    @input="updateLineTotal(index)"
                  />
                  <select
                    v-model="item.discountType"
                    class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                    @change="updateLineTotal(index)"
                  >
                    <option value="AMOUNT">$</option>
                    <option value="PERCENTAGE">%</option>
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
              <td class="px-3 py-2">
                <input
                  v-model="item.warehouseCode"
                  type="text"
                  :placeholder="item.itemType === 'SERVICE' ? 'Location' : 'Warehouse'"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2 text-sm font-medium">
                {{ formatCurrency(item.lineTotal) }}
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
          Saving...
        </span>
        <span v-else>{{ isEditing ? 'Update Order' : 'Create Order' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useSalesOrdersStore } from '../stores/salesOrdersStore'
import type { SalesOrderFormData, OrderLineItem } from '../types'
import { OrderType, Currency } from '../types'

// Local type for form data with calculated lineTotal
type FormLineItem = Omit<OrderLineItem, 'id' | 'deliveredQuantity' | 'remainingQuantity'> & {
  lineTotal: number
}
type ExtendedFormData = Omit<SalesOrderFormData, 'lineItems'> & { lineItems: FormLineItem[] }

interface Props {
  initialData?: SalesOrderFormData
  isEditing?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'saved', data: SalesOrderFormData): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

const store = useSalesOrdersStore()

// Supporting Data
const customers = computed(() => store.customers)

// Form data with extended line items for UI calculations
const formData = ref<ExtendedFormData>({
  customerCode: '',
  orderDate: '',
  deliveryDate: '',
  postingDate: '',
  type: OrderType.STANDARD,
  currency: Currency.USD,
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  relatedQuotationId: '',
  lineItems: [],
})

// Form validation errors
const errors = ref<Record<string, string>>({})

// UI state
const loading = ref(false)
const newItemType = ref<'INVENTORY' | 'SERVICE'>('INVENTORY')

// Computed properties
const orderTypes = computed(() => Object.values(OrderType))
const currencies = computed(() => Object.values(Currency))
const taxCodes = computed(() => store.taxCodes)

const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + item.lineTotal, 0)
})

const discountTotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    if (item.discountType === 'PERCENTAGE') {
      return sum + (item.quantity * item.unitPrice * item.discount) / 100
    }
    return sum + item.discount
  }, 0)
})

const taxTotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const taxableAmount =
      item.lineTotal -
      (item.discountType === 'PERCENTAGE'
        ? (item.quantity * item.unitPrice * item.discount) / 100
        : item.discount)
    return sum + (taxableAmount * item.taxRate) / 100
  }, 0)
})

const totalAmount = computed(() => {
  return subtotal.value - discountTotal.value + taxTotal.value
})

const warehouseLocationHeader = computed(() => {
  if (formData.value.lineItems.length === 0) {
    return 'Warehouse/Location'
  }
  
  const hasInventory = formData.value.lineItems.some(item => item.itemType === 'INVENTORY')
  const hasService = formData.value.lineItems.some(item => item.itemType === 'SERVICE')
  
  if (hasInventory && hasService) {
    return 'Warehouse/Location'
  } else if (hasService && !hasInventory) {
    return 'Location'
  } else if (hasInventory && !hasService) {
    return 'Warehouse'
  } else {
    return 'Warehouse/Location'
  }
})

// Methods
const initializeForm = () => {
  if (props.initialData) {
    formData.value = { ...props.initialData }
    // Initialize line items with lineTotal and itemType if missing
    formData.value.lineItems = formData.value.lineItems.map((item) => ({
      ...item,
      itemType: item.itemType || 'INVENTORY',
      lineTotal: calculateLineTotal(item),
    }))
  } else {
    // Set default dates
    const today = new Date().toISOString().split('T')[0]
    const deliveryDate = new Date()
    deliveryDate.setDate(deliveryDate.getDate() + 7)

    formData.value = {
      ...formData.value,
      orderDate: today,
      deliveryDate: deliveryDate.toISOString().split('T')[0],
      postingDate: today,
    }
  }
}

const calculateLineTotal = (
  item: Omit<OrderLineItem, 'id' | 'deliveredQuantity' | 'remainingQuantity'>,
) => {
  const baseAmount = item.quantity * item.unitPrice
  let discountAmount = 0

  if (item.discountType === 'PERCENTAGE') {
    discountAmount = (baseAmount * item.discount) / 100
  } else {
    discountAmount = item.discount
  }

  const taxableAmount = baseAmount - discountAmount
  const taxAmount = (taxableAmount * item.taxRate) / 100

  return taxableAmount + taxAmount
}

const updateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  item.lineTotal = calculateLineTotal(item)
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = store.taxCodes.find((tc) => tc.code === item.taxCode)
  if (taxCode) {
    item.taxRate = taxCode.rate
    updateLineTotal(index)
  }
}

const addLineItem = () => {
  const newItem: FormLineItem = {
    itemCode: '',
    itemType: newItemType.value,
    description: '',
    quantity: 1,
    unitPrice: 0,
    discount: 0,
    discountType: 'AMOUNT',
    taxCode: '',
    taxRate: 0,
    warehouseCode: newItemType.value === 'SERVICE' ? '' : '',
    remarks: '',
    lineTotal: 0,
  }

  formData.value.lineItems.push(newItem)
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

// Customer and item search functions removed - now using simple form controls

const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.customerCode) {
    errors.value.customerCode = 'Customer is required'
  }

  if (!formData.value.orderDate) {
    errors.value.orderDate = 'Order date is required'
  }

  if (!formData.value.deliveryDate) {
    errors.value.deliveryDate = 'Delivery date is required'
  }

  if (!formData.value.postingDate) {
    errors.value.postingDate = 'Posting date is required'
  }

  if (!formData.value.type) {
    errors.value.type = 'Order type is required'
  }

  if (!formData.value.currency) {
    errors.value.currency = 'Currency is required'
  }

  if (formData.value.exchangeRate <= 0) {
    errors.value.exchangeRate = 'Exchange rate must be greater than 0'
  }

  if (formData.value.lineItems.length === 0) {
    errors.value.lineItems = 'At least one line item is required'
  }

  // Validate line items
  formData.value.lineItems.forEach((item, index) => {
    if (!item.itemType) {
      errors.value[`lineItems.${index}.itemType`] = 'Item type is required'
    }
    if (!item.itemCode) {
      errors.value[`lineItems.${index}.itemCode`] = 'Item code is required'
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
    // Remove lineTotal from line items before sending
    const submitData = {
      ...formData.value,
      lineItems: formData.value.lineItems.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { lineTotal, ...itemWithoutTotal } = item
        return itemWithoutTotal
      }),
    }

    emit('saved', submitData)
  } catch (error) {
    console.error('Form submission error:', error)
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

// Lifecycle
onMounted(async () => {
  await store.fetchTaxCodes()
  await store.fetchCustomers()
  initializeForm()
})

// Watch for changes in line items to recalculate totals
watch(
  () => formData.value.lineItems,
  () => {
    formData.value.lineItems.forEach((_, index) => {
      updateLineTotal(index)
    })
  },
  { deep: true },
)
</script>
