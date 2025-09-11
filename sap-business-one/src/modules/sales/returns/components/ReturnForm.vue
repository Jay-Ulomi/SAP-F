<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Return Header</h3>

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
          >
            <option value="">Select Customer</option>
            <option v-for="customer in customers" :key="customer.code" :value="customer.code">
              {{ customer.code }} - {{ customer.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="returnDate" class="block text-sm font-medium text-gray-700 mb-1">
            Return Date *
          </label>
          <input
            id="returnDate"
            v-model="formData.returnDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
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
          />
        </div>

        <div>
          <label for="returnType" class="block text-sm font-medium text-gray-700 mb-1">
            Return Type *
          </label>
          <select
            id="returnType"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select Type</option>
            <option v-for="type in returnTypes" :key="type" :value="type">
              {{ formatReturnType(type) }}
            </option>
          </select>
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
          >
            <option value="">Select Currency</option>
            <option v-for="currency in currencies" :key="currency" :value="currency">
              {{ currency }}
            </option>
          </select>
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
          />
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
          <label for="relatedInvoiceId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Invoice
          </label>
          <input
            id="relatedInvoiceId"
            v-model="formData.relatedInvoiceId"
            type="text"
            placeholder="Enter invoice ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="relatedOrderId" class="block text-sm font-medium text-gray-700 mb-1">
            Related Order
          </label>
          <input
            id="relatedOrderId"
            v-model="formData.relatedOrderId"
            type="text"
            placeholder="Enter order ID"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="returnMethod" class="block text-sm font-medium text-gray-700 mb-1">
            Return Method
          </label>
          <input
            id="returnMethod"
            v-model="formData.returnMethod"
            type="text"
            placeholder="e.g., UPS, FedEx, Pickup"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

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

        <div>
          <label for="carrier" class="block text-sm font-medium text-gray-700 mb-1">
            Carrier
          </label>
          <input
            id="carrier"
            v-model="formData.carrier"
            type="text"
            placeholder="e.g., UPS, FedEx, DHL"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label for="estimatedReturnDate" class="block text-sm font-medium text-gray-700 mb-1">
            Estimated Return Date
          </label>
          <input
            id="estimatedReturnDate"
            v-model="formData.estimatedReturnDate"
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

    <!-- Return Address -->
    <div v-if="showReturnAddress" class="border-t pt-4">
      <h4 class="text-md font-medium text-gray-900 mb-3">Return Address</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Street</label>
          <input
            v-model="formData.returnAddress.street"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            v-model="formData.returnAddress.city"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
          <input
            v-model="formData.returnAddress.state"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
          <input
            v-model="formData.returnAddress.postalCode"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <input
            v-model="formData.returnAddress.country"
            type="text"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
          />
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
        No line items added yet. Click "Add Line" to add items to this return.
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
                  required
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
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useReturnsStore } from '../stores/returnsStore'
import type { ReturnFormData, Return, Customer } from '../types'
import { ReturnStatus, ReturnType, ReturnReason, Currency } from '../types'

interface Props {
  initialData?: Return
  isEditing?: boolean
}

interface Emits {
  (e: 'saved', data: Return): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  isEditing: false,
})

const emit = defineEmits<Emits>()

const store = useReturnsStore()

// Supporting Data
const customers = computed(() => store.customers)

// Form data
const formData = ref<ReturnFormData>({
  customerCode: '',
  returnDate: '',
  postingDate: '',
  type: ReturnType.CUSTOMER_RETURN,
  currency: Currency.USD,
  exchangeRate: 1,
  salesPerson: '',
  reference: '',
  remarks: '',
  project: '',
  relatedInvoiceId: '',
  relatedOrderId: '',
  returnMethod: '',
  returnAddress: {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
  },
  trackingNumber: '',
  carrier: '',
  estimatedReturnDate: '',
  lineItems: [],
})

// UI state
const loading = ref(false)
const showCustomerDropdown = ref(false)
const showInvoiceDropdown = ref(false)
const showOrderDropdown = ref(false)
const showItemDropdowns = ref<boolean[]>([])
const filteredCustomers = ref<Customer[]>([])
const filteredInvoices = ref<Array<{ id: string; docNum: string; customerName: string }>>([])
const filteredOrders = ref<Array<{ id: string; docNum: string; customerName: string }>>([])
const filteredItems = ref<Array<Array<{ code: string; name: string; price: number }>>>([])

// Get tax codes from store
const taxCodes = computed(() => store.taxCodes)

// Computed properties
const isFormValid = computed(() => {
  return (
    formData.value.customerCode &&
    formData.value.returnDate &&
    formData.value.postingDate &&
    formData.value.type &&
    formData.value.currency &&
    formData.value.lineItems.length > 0 &&
    formData.value.lineItems.every((item) => item.itemCode && item.description && item.quantity > 0)
  )
})

const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => sum + getLineTotal(item), 0)
})

const totalDiscount = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    if (item.discountType === 'PERCENTAGE') {
      return sum + (item.quantity * item.unitPrice * item.discount) / 100
    }
    return sum + item.discount
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const lineTotal = getLineTotal(item)
    return sum + (lineTotal * item.taxRate) / 100
  }, 0)
})

const total = computed(() => subtotal.value - totalDiscount.value + totalTax.value)

const showReturnAddress = computed(() => {
  const address = formData.value.returnAddress
  if (!address) return false
  return address.street || address.city || address.state || address.postalCode || address.country
})

// Constants
const returnTypes = Object.values(ReturnType)
const returnReasons = Object.values(ReturnReason)
const currencies = Object.values(Currency)

// Methods
const initializeForm = () => {
  if (props.initialData) {
    formData.value = {
      customerCode: props.initialData.customerCode,
      returnDate: props.initialData.returnDate,
      postingDate: props.initialData.postingDate,
      type: props.initialData.type,
      currency: props.initialData.currency,
      exchangeRate: props.initialData.exchangeRate,
      salesPerson: props.initialData.salesPerson || '',
      reference: props.initialData.reference || '',
      remarks: props.initialData.remarks || '',
      project: props.initialData.project || '',
      relatedInvoiceId: props.initialData.relatedInvoiceId || '',
      relatedOrderId: props.initialData.relatedOrderId || '',
      returnMethod: props.initialData.returnMethod || '',
      returnAddress: props.initialData.returnAddress || {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
      },
      trackingNumber: props.initialData.trackingNumber || '',
      carrier: props.initialData.carrier || '',
      estimatedReturnDate: props.initialData.estimatedReturnDate || '',
      lineItems: props.initialData.lineItems.map((item) => ({
        itemCode: item.itemCode,
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        discountType: item.discountType,
        taxCode: item.taxCode,
        taxRate: item.taxRate,
        returnReason: item.returnReason,
        returnNotes: item.returnNotes || '',
        originalInvoiceId: item.originalInvoiceId || '',
        originalLineItemId: item.originalLineItemId || '',
        warehouseCode: item.warehouseCode || '',
        batchNumber: item.batchNumber || '',
        serialNumber: item.serialNumber || '',
        remarks: item.remarks || '',
      })),
    }
  } else {
    // Set default dates
    const today = new Date().toISOString().split('T')[0]
    formData.value.returnDate = today
    formData.value.postingDate = today
  }
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
    returnReason: ReturnReason.DEFECTIVE_PRODUCT,
    returnNotes: '',
    originalInvoiceId: '',
    originalLineItemId: '',
    warehouseCode: '',
    batchNumber: '',
    serialNumber: '',
    remarks: '',
  })
  showItemDropdowns.value.push(false)
  filteredItems.value.push([])
}

const removeLineItem = (index: number) => {
  if (formData.value.lineItems.length > 1) {
    formData.value.lineItems.splice(index, 1)
    showItemDropdowns.value.splice(index, 1)
    filteredItems.value.splice(index, 1)
  }
}

const calculateLineTotal = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.quantity && item.unitPrice) {
    let lineTotal = item.quantity * item.unitPrice

    // Apply discount
    if (item.discount > 0) {
      if (item.discountType === 'PERCENTAGE') {
        lineTotal -= (lineTotal * item.discount) / 100
      } else {
        lineTotal -= item.discount
      }
    }

    // Apply tax
    if (item.taxRate > 0) {
      lineTotal += (lineTotal * item.taxRate) / 100
    }

    // Update the item (this will trigger reactivity)
    formData.value.lineItems[index] = { ...item }
  }
}

const getLineTotal = (item: any) => {
  let lineTotal = item.quantity * item.unitPrice

  // Apply discount
  if (item.discount > 0) {
    if (item.discountType === 'PERCENTAGE') {
      lineTotal -= (lineTotal * item.discount) / 100
    } else {
      lineTotal -= item.discount
    }
  }

  // Apply tax
  if (item.taxRate > 0) {
    lineTotal += (lineTotal * item.taxRate) / 100
  }

  return lineTotal
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.taxCode) {
    const taxCode = store.taxCodes.find((t) => t.code === item.taxCode)
    if (taxCode) {
      item.taxRate = taxCode.rate
      calculateLineTotal(index)
    }
  } else {
    item.taxRate = 0
    calculateLineTotal(index)
  }
}

const handleCustomerSearch = async () => {
  if (formData.value.customerCode.length >= 2) {
    await store.fetchCustomers(formData.value.customerCode)
    filteredCustomers.value = store.customers
  } else {
    filteredCustomers.value = []
  }
}

const selectCustomer = (customer: Customer) => {
  formData.value.customerCode = customer.code
  filteredCustomers.value = []
}

const handleInvoiceSearch = async () => {
  if (formData.value.relatedInvoiceId.length >= 2) {
    const invoices = await store.fetchInvoices(formData.value.relatedInvoiceId)
    filteredInvoices.value = invoices
  } else {
    filteredInvoices.value = []
  }
}

const selectInvoice = (invoice: { id: string; docNum: string; customerName: string }) => {
  formData.value.relatedInvoiceId = invoice.id
  filteredInvoices.value = []
}

const handleOrderSearch = async () => {
  if (formData.value.relatedOrderId.length >= 2) {
    const orders = await store.fetchSalesOrders(formData.value.relatedOrderId)
    filteredOrders.value = orders
  } else {
    filteredOrders.value = []
  }
}

const selectOrder = (order: { id: string; docNum: string; customerName: string }) => {
  formData.value.relatedOrderId = order.id
  filteredOrders.value = []
}

const handleItemSearch = async (index: number) => {
  const item = formData.value.lineItems[index]
  if (item.itemCode.length >= 2) {
    const items = await store.fetchItems(item.itemCode)
    filteredItems.value[index] = items
  } else {
    filteredItems.value[index] = []
  }
}

const selectItem = (index: number, item: { code: string; name: string; price: number }) => {
  formData.value.lineItems[index].itemCode = item.code
  formData.value.lineItems[index].description = item.name
  formData.value.lineItems[index].unitPrice = item.price
  filteredItems.value[index] = []
  calculateLineTotal(index)
}

const handleSubmit = async () => {
  if (!isFormValid.value) return

  loading.value = true

  try {
    let result
    if (props.isEditing && props.initialData) {
      result = await store.updateReturn(props.initialData.id, formData.value)
    } else {
      result = await store.createReturn(formData.value)
    }

    if (result.success) {
      emit('saved', result.data)
    }
  } catch (error) {
    console.error('Error saving return:', error)
  } finally {
    loading.value = false
  }
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const formatReturnType = (type: ReturnType) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatReturnReason = (reason: ReturnReason) => {
  return reason.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

// Lifecycle
onMounted(async () => {
  await store.fetchTaxCodes()
  await store.fetchCustomers()
  initializeForm()
})

// Watch for changes
watch(
  () => formData.value.lineItems.length,
  (newLength) => {
    // Ensure showItemDropdowns and filteredItems arrays match lineItems length
    while (showItemDropdowns.value.length < newLength) {
      showItemDropdowns.value.push(false)
    }
    while (filteredItems.value.length < newLength) {
      filteredItems.value.push([])
    }
  },
)
</script>
