<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 class="text-lg font-medium text-gray-900">
            {{ isEditing ? 'Edit Transfer' : 'Create Transfer' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="mt-6 space-y-6">
          <!-- Transfer Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Transfer Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Transfer Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
                  Transfer Type *
                </label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="warehouse_to_warehouse">Warehouse to Warehouse</option>
                  <option value="location_to_location">Location to Location</option>
                  <option value="branch_to_branch">Branch to Branch</option>
                  <option value="internal">Internal</option>
                  <option value="external">External</option>
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
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <!-- Reason -->
              <div>
                <label for="reason" class="block text-sm font-medium text-gray-700 mb-1">
                  Reason *
                </label>
                <select
                  id="reason"
                  v-model="formData.reason"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="stock_rebalancing">Stock Rebalancing</option>
                  <option value="customer_order">Customer Order</option>
                  <option value="production_need">Production Need</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="damage_replacement">Damage Replacement</option>
                  <option value="seasonal_adjustment">Seasonal Adjustment</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <!-- Date -->
              <div>
                <label for="date" class="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  id="date"
                  :value="formatDateForInput(formData.date)"
                  @input="handleDateInput($event, 'date')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Requested Date -->
              <div>
                <label for="requestedDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Requested Date
                </label>
                <input
                  id="requestedDate"
                  :value="formData.requestedDate ? formatDateForInput(formData.requestedDate) : ''"
                  @input="handleDateInput($event, 'requestedDate')"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Expected Date -->
              <div>
                <label for="expectedDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Expected Date
                </label>
                <input
                  id="expectedDate"
                  :value="formData.expectedDate ? formatDateForInput(formData.expectedDate) : ''"
                  @input="handleDateInput($event, 'expectedDate')"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Requested By -->
              <div>
                <label for="requestedBy" class="block text-sm font-medium text-gray-700 mb-1">
                  Requested By *
                </label>
                <input
                  id="requestedBy"
                  v-model="formData.requestedBy"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter requester"
                />
              </div>

              <!-- Department -->
              <div>
                <label for="department" class="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  id="department"
                  v-model="formData.department"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter department"
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
                  placeholder="Enter project"
                />
              </div>
            </div>
          </div>

          <!-- Warehouse Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Warehouse Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- From Warehouse -->
              <div>
                <label for="fromWarehouseCode" class="block text-sm font-medium text-gray-700 mb-1">
                  From Warehouse *
                </label>
                <input
                  id="fromWarehouseCode"
                  v-model="formData.fromWarehouseCode"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter warehouse code"
                />
              </div>

              <!-- From Location -->
              <div>
                <label for="fromLocationCode" class="block text-sm font-medium text-gray-700 mb-1">
                  From Location
                </label>
                <input
                  id="fromLocationCode"
                  v-model="formData.fromLocationCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter location code"
                />
              </div>

              <!-- To Warehouse -->
              <div>
                <label for="toWarehouseCode" class="block text-sm font-medium text-gray-700 mb-1">
                  To Warehouse *
                </label>
                <input
                  id="toWarehouseCode"
                  v-model="formData.toWarehouseCode"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter warehouse code"
                />
              </div>

              <!-- To Location -->
              <div>
                <label for="toLocationCode" class="block text-sm font-medium text-gray-700 mb-1">
                  To Location
                </label>
                <input
                  id="toLocationCode"
                  v-model="formData.toLocationCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter location code"
                />
              </div>

              <!-- Shipping Method -->
              <div>
                <label for="shippingMethod" class="block text-sm font-medium text-gray-700 mb-1">
                  Shipping Method
                </label>
                <select
                  id="shippingMethod"
                  v-model="formData.shippingMethod"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Method</option>
                  <option value="internal_transport">Internal Transport</option>
                  <option value="internal_movement">Internal Movement</option>
                  <option value="external_courier">External Courier</option>
                  <option value="company_vehicle">Company Vehicle</option>
                  <option value="third_party">Third Party</option>
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
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="JPY">JPY</option>
                </select>
              </div>

              <!-- Exchange Rate -->
              <div>
                <label for="exchangeRate" class="block text-sm font-medium text-gray-700 mb-1">
                  Exchange Rate *
                </label>
                <input
                  id="exchangeRate"
                  v-model.number="formData.exchangeRate"
                  type="number"
                  step="0.0001"
                  min="0"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Remarks -->
              <div class="md:col-span-2 lg:col-span-3">
                <label for="remarks" class="block text-sm font-medium text-gray-700 mb-1">
                  Remarks
                </label>
                <textarea
                  id="remarks"
                  v-model="formData.remarks"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter additional remarks"
                />
              </div>
            </div>
          </div>

          <!-- Line Items -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-medium text-gray-900">Transfer Items</h3>
              <button
                type="button"
                @click="addItem"
                class="px-3 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                <svg
                  class="w-4 h-4 mr-2 inline"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Item
              </button>
            </div>

            <div v-if="formData.items.length === 0" class="text-center py-8 text-gray-500">
              No items added yet. Click "Add Item" to add items to this transfer.
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
                  <tr v-for="(item, index) in formData.items" :key="index">
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
                        v-model="item.itemName"
                        type="text"
                        placeholder="Item Name"
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
                      />
                    </td>
                    <td class="px-3 py-2 text-sm font-medium">
                      {{ formatCurrency(item.quantity * item.unitPrice) }}
                    </td>
                    <td class="px-3 py-2">
                      <button
                        type="button"
                        @click="removeItem(index)"
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
          <div v-if="formData.items.length > 0" class="bg-white rounded-lg shadow p-4">
            <div class="flex justify-end">
              <div class="w-64 space-y-2">
                <div class="flex justify-between text-base font-bold border-t pt-2">
                  <span>Total Amount:</span>
                  <span>{{ formatCurrency(totalAmount) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="!isFormValid"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isEditing ? 'Update' : 'Create' }} Transfer
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { TransferType, TransferPriority, TransferReason } from '../types'
import type { InventoryTransfer, TransferFormData } from '../types'

// Props
interface Props {
  item?: InventoryTransfer | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: TransferFormData]
}>()

// Reactive data

const formData = ref<TransferFormData>({
  type: TransferType.WAREHOUSE_TO_WAREHOUSE,
  priority: TransferPriority.NORMAL,
  reason: TransferReason.STOCK_REBALANCING,
  date: new Date(),
  fromWarehouseCode: '',
  toWarehouseCode: '',
  requestedBy: '',
  currency: 'USD',
  exchangeRate: 1.0,
  items: [],
})

// Computed
const isEditing = computed(() => !!props.item)

// Methods
const addItem = () => {
  formData.value.items.push({
    itemCode: '',
    itemName: '',
    description: '',
    quantity: 0,
    unitPrice: 0,
    fromWarehouseCode: formData.value.fromWarehouseCode,
    toWarehouseCode: formData.value.toWarehouseCode,
  })
}

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1)
}

const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: formData.value.currency,
  }).format(amount)
}

const handleDateInput = (event: Event, field: 'date' | 'requestedDate' | 'expectedDate') => {
  const target = event.target as HTMLInputElement
  if (field === 'date') {
    formData.value.date = new Date(target.value)
  } else if (field === 'requestedDate') {
    formData.value.requestedDate = new Date(target.value)
  } else if (field === 'expectedDate') {
    formData.value.expectedDate = new Date(target.value)
  }
}

// Computed
const totalAmount = computed(() => {
  return formData.value.items.reduce((sum, item) => {
    return sum + item.quantity * item.unitPrice
  }, 0)
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.fromWarehouseCode &&
    formData.value.toWarehouseCode &&
    formData.value.requestedBy &&
    formData.value.items.length > 0 &&
    formData.value.items.every(
      (item) => item.itemCode && item.itemName && item.quantity > 0 && item.unitPrice >= 0,
    )
  )
})

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', formData.value)
  }
}

// Watch for item changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formData.value = {
        type: newItem.type,
        priority: newItem.priority,
        reason: newItem.reason,
        date: newItem.date,
        requestedDate: newItem.requestedDate,
        expectedDate: newItem.expectedDate,
        fromWarehouseCode: newItem.fromWarehouseCode,
        fromLocationCode: newItem.fromLocationCode,
        toWarehouseCode: newItem.toWarehouseCode,
        toLocationCode: newItem.toLocationCode,
        requestedBy: newItem.requestedBy,
        department: newItem.department,
        project: newItem.project,
        currency: newItem.currency,
        exchangeRate: newItem.exchangeRate,
        shippingMethod: newItem.shippingMethod,
        remarks: newItem.remarks,
        items: newItem.items.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          fromWarehouseCode: item.fromWarehouseCode,
          fromLocationCode: item.fromLocationCode,
          toWarehouseCode: item.toWarehouseCode,
          toLocationCode: item.toLocationCode,
          batchNumber: item.batchNumber,
          serialNumber: item.serialNumber,
          expiryDate: item.expiryDate,
          lotNumber: item.lotNumber,
          remarks: item.remarks,
        })),
      }
    } else {
      // Reset form for new item
      formData.value = {
        type: TransferType.WAREHOUSE_TO_WAREHOUSE,
        priority: TransferPriority.NORMAL,
        reason: TransferReason.STOCK_REBALANCING,
        date: new Date(),
        fromWarehouseCode: '',
        toWarehouseCode: '',
        requestedBy: '',
        currency: 'USD',
        exchangeRate: 1.0,
        items: [],
      }
    }
  },
  { immediate: true },
)
</script>
