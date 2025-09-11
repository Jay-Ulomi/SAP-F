<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Purchase Order Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Order Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Order Type *
          </label>
          <select
            id="type"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="type in orderTypes" :key="type" :value="type">
              {{ formatOrderType(type) }}
            </option>
          </select>
        </div>

        <!-- Priority -->
        <div>
          <label for="priority" class="block text-sm font-medium text-gray-700 mb-1">
            Priority *
          </label>
          <select
            id="priority"
            v-model="formData.priority"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="priority in orderPriorities" :key="priority" :value="priority">
              {{ formatPriority(priority) }}
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
          />
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

        <!-- Vendor Code -->
        <div>
          <label for="vendorCode" class="block text-sm font-medium text-gray-700 mb-1">
            Vendor Code *
          </label>
          <input
            id="vendorCode"
            v-model="formData.vendorCode"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter vendor code"
          />
        </div>

        <!-- Department -->
        <div>
          <label for="department" class="block text-sm font-medium text-gray-700 mb-1">
            Department *
          </label>
          <input
            id="department"
            v-model="formData.department"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter department"
          />
        </div>

        <!-- Cost Center -->
        <div>
          <label for="costCenter" class="block text-sm font-medium text-gray-700 mb-1">
            Cost Center *
          </label>
          <input
            id="costCenter"
            v-model="formData.costCenter"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter cost center"
          />
        </div>

        <!-- Project Code -->
        <div>
          <label for="projectCode" class="block text-sm font-medium text-gray-700 mb-1">
            Project Code
          </label>
          <input
            id="projectCode"
            v-model="formData.projectCode"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter project code"
          />
        </div>

        <!-- Notes -->
        <div class="md:col-span-2 lg:col-span-3">
          <label for="notes" class="block text-sm font-medium text-gray-700 mb-1"> Notes </label>
          <textarea
            id="notes"
            v-model="formData.notes"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter additional notes"
          />
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-medium text-gray-900">Line Items</h3>
        <button
          type="button"
          @click="addLineItem"
          class="px-3 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
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
                Tax
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Account
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cost Center
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
                <input
                  v-model="item.accountCode"
                  type="text"
                  placeholder="Account"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2">
                <input
                  v-model="item.costCenter"
                  type="text"
                  placeholder="Cost Center"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2 text-sm font-medium">
                {{ formatCurrency(getLineTotal(item)) }}
              </td>
              <td class="px-3 py-2">
                <button
                  type="button"
                  @click="removeLineItem(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
        class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.initialData ? 'Update' : 'Create' }} Order
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { PurchaseOrderType, OrderPriority, Currency } from '../types'
import type { PurchaseOrderFormData } from '../types'

// Props
interface Props {
  initialData?: PurchaseOrderFormData
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
})

// Emits
const emit = defineEmits<{
  submit: [data: PurchaseOrderFormData]
  cancel: []
}>()

// Form Data
const formData = ref<PurchaseOrderFormData>({
  orderNumber: '',
  orderDate: '',
  deliveryDate: '',
  type: PurchaseOrderType.MATERIAL,
  priority: OrderPriority.MEDIUM,
  currency: Currency.USD,
  vendorCode: '',
  department: '',
  costCenter: '',
  projectCode: '',
  notes: '',
  lineItems: [],
})

// Supporting Data
const orderTypes = Object.values(PurchaseOrderType)
const orderPriorities = Object.values(OrderPriority)
const currencies = Object.values(Currency)

// Mock tax codes - replace with actual data from store/API
const taxCodes = ref([
  { code: 'VAT', rate: 20 },
  { code: 'GST', rate: 10 },
  { code: 'SALES_TAX', rate: 8.5 },
])

// Watch for initial data changes
watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      formData.value = {
        ...newData,
        lineItems: newData.lineItems.map((item) => ({
          ...item,
          itemName: item.description,
          taxCode: item.taxCode || '',
          taxPercent: 0,
          accountCode: item.accountCode || '',
          costCenter: item.costCenter || '',
          projectCode: item.projectCode || '',
          warehouseCode: item.warehouseCode || '',
          deliveryDate: item.deliveryDate || '',
          priority: item.priority || OrderPriority.MEDIUM,
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
    const deliveryDate = new Date()
    deliveryDate.setDate(today.getDate() + 30) // Default to 30 days from now

    formData.value.orderDate = today.toISOString().split('T')[0]
    formData.value.deliveryDate = deliveryDate.toISOString().split('T')[0]
  }
})

// Line Items Management
const addLineItem = () => {
  formData.value.lineItems.push({
    itemCode: '',
    itemName: '',
    description: '',
    quantity: 1,
    unitPrice: 0,
    taxCode: '',
    taxPercent: 0,
    accountCode: '',
    costCenter: '',
    projectCode: '',
    warehouseCode: '',
    deliveryDate: '',
    priority: OrderPriority.MEDIUM,
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
}

const updateTaxRate = (index: number) => {
  const item = formData.value.lineItems[index]
  const taxCode = taxCodes.value.find((tax) => tax.code === item.taxCode)
  if (taxCode) {
    item.taxPercent = taxCode.rate
  } else {
    item.taxPercent = 0
  }
  calculateLineTotal(index)
}

const calculateLineTotal = (index: number) => {
  // Trigger reactivity by updating the line item
  const item = formData.value.lineItems[index]
  formData.value.lineItems[index] = { ...item }
}

const getLineTotal = (item: { quantity: number; unitPrice: number }): number => {
  return item.quantity * item.unitPrice
}

// Calculations
const subtotal = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

const totalTax = computed(() => {
  return formData.value.lineItems.reduce((sum, item) => {
    const itemSubtotal = item.quantity * item.unitPrice
    return sum + itemSubtotal * (item.taxPercent / 100)
  }, 0)
})

const total = computed(() => {
  return subtotal.value + totalTax.value
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.vendorCode &&
    formData.value.department &&
    formData.value.costCenter &&
    formData.value.orderDate &&
    formData.value.deliveryDate &&
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

const formatOrderType = (type: PurchaseOrderType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPriority = (priority: OrderPriority): string => {
  return priority.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
