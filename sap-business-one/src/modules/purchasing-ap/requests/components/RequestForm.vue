<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header Information -->
    <div class="bg-white rounded-lg shadow p-4">
      <h3 class="text-base font-medium text-gray-900 mb-4">Purchase Request Header</h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <!-- Request Type -->
        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
            Request Type *
          </label>
          <select
            id="type"
            v-model="formData.type"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option v-for="type in requestTypes" :key="type" :value="type">
              {{ formatRequestType(type) }}
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
            <option v-for="priority in requestPriorities" :key="priority" :value="priority">
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

        <!-- Request Date -->
        <div>
          <label for="requestDate" class="block text-sm font-medium text-gray-700 mb-1">
            Request Date *
          </label>
          <input
            id="requestDate"
            v-model="formData.requestDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <!-- Required Date -->
        <div>
          <label for="requiredDate" class="block text-sm font-medium text-gray-700 mb-1">
            Required Date *
          </label>
          <input
            id="requiredDate"
            v-model="formData.requiredDate"
            type="date"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
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
      </div>

      <!-- Additional Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
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

        <!-- Project -->
        <div>
          <label for="projectCode" class="block text-sm font-medium text-gray-700 mb-1">
            Project
          </label>
          <input
            id="projectCode"
            v-model="formData.projectCode"
            type="text"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter project code"
          />
        </div>
      </div>

      <!-- Notes -->
      <div class="mt-4">
        <label for="notes" class="block text-sm font-medium text-gray-700 mb-1">Notes</label>
        <textarea
          id="notes"
          v-model="formData.notes"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter additional notes"
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
        No line items added yet. Click "Add Line" to add items to this request.
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
                Requested Date
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
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
                <input
                  v-model="item.requestedDate"
                  type="date"
                  class="block w-32 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                />
              </td>
              <td class="px-3 py-2">
                <select
                  v-model="item.priority"
                  class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                >
                  <option v-for="priority in requestPriorities" :key="priority" :value="priority">
                    {{ formatPriority(priority) }}
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
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Remove
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
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Tax Total:</span>
              <span class="font-medium">{{ formatCurrency(totalTax) }}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold border-t border-gray-200 pt-2">
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
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="!isFormValid"
        class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ props.initialData ? 'Update' : 'Create' }} Request
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { PurchaseRequestType, PurchaseRequestPriority, Currency } from '../types'
import type { PurchaseRequestFormData, PurchaseRequestLineItem } from '../types'

// Props
interface Props {
  initialData?: PurchaseRequestFormData
}

const props = withDefaults(defineProps<Props>(), {
  initialData: undefined,
})

// Emits
const emit = defineEmits<{
  submit: [data: PurchaseRequestFormData]
  cancel: []
}>()

// Form Data
const formData = ref<PurchaseRequestFormData>({
  requestNumber: '',
  requestDate: '',
  requiredDate: '',
  type: PurchaseRequestType.MATERIAL,
  priority: PurchaseRequestPriority.MEDIUM,
  currency: Currency.USD,
  department: '',
  costCenter: '',
  projectCode: '',
  notes: '',
  lineItems: [],
})

// Supporting Data
const requestTypes = Object.values(PurchaseRequestType)
const requestPriorities = Object.values(PurchaseRequestPriority)
const currencies = Object.values(Currency)

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
          accountCode: '',
          costCenter: item.costCenter || '',
          projectCode: item.projectCode || '',
          warehouseCode: item.warehouseCode || '',
          requestedDate: item.requestedDate || '',
          priority: item.priority || PurchaseRequestPriority.MEDIUM,
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
    const requiredDate = new Date()
    requiredDate.setDate(today.getDate() + 30) // Default to 30 days from now

    formData.value.requestDate = today.toISOString().split('T')[0]
    formData.value.requiredDate = requiredDate.toISOString().split('T')[0]
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
    requestedDate: '',
    priority: PurchaseRequestPriority.MEDIUM,
  })
}

const removeLineItem = (index: number) => {
  formData.value.lineItems.splice(index, 1)
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
    formData.value.department &&
    formData.value.costCenter &&
    formData.value.requestDate &&
    formData.value.requiredDate &&
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

const formatRequestType = (type: PurchaseRequestType): string => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPriority = (priority: PurchaseRequestPriority): string => {
  return priority.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
