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
            {{ isEditing ? 'Edit Price List' : 'Create Price List' }}
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
          <!-- Price List Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Price List Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Price List Name -->
              <div>
                <label for="priceListName" class="block text-sm font-medium text-gray-700 mb-1">
                  Price List Name *
                </label>
                <input
                  id="priceListName"
                  v-model="formData.priceListName"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter price list name"
                />
              </div>

              <!-- Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
                  Type *
                </label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="sales">Sales</option>
                  <option value="purchase">Purchase</option>
                  <option value="inventory">Inventory</option>
                  <option value="special">Special</option>
                  <option value="promotional">Promotional</option>
                </select>
              </div>

              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select
                  id="status"
                  v-model="formData.status"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                  <option value="expired">Expired</option>
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
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
              </div>

              <!-- Scope -->
              <div>
                <label for="scope" class="block text-sm font-medium text-gray-700 mb-1">
                  Scope *
                </label>
                <select
                  id="scope"
                  v-model="formData.scope"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="global">Global</option>
                  <option value="warehouse">Warehouse</option>
                  <option value="customer">Customer</option>
                  <option value="vendor">Vendor</option>
                  <option value="item_group">Item Group</option>
                  <option value="item_category">Item Category</option>
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
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>

              <!-- Update Frequency -->
              <div>
                <label for="updateFrequency" class="block text-sm font-medium text-gray-700 mb-1">
                  Update Frequency *
                </label>
                <select
                  id="updateFrequency"
                  v-model="formData.updateFrequency"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="manual">Manual</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <!-- Rounding -->
              <div>
                <label for="rounding" class="block text-sm font-medium text-gray-700 mb-1">
                  Rounding *
                </label>
                <select
                  id="rounding"
                  v-model="formData.rounding"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="none">None</option>
                  <option value="round_up">Round Up</option>
                  <option value="round_down">Round Down</option>
                  <option value="round_nearest">Round Nearest</option>
                </select>
              </div>

              <!-- Effective Date -->
              <div>
                <label for="effectiveDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Effective Date *
                </label>
                <input
                  id="effectiveDate"
                  :value="formatDateForInput(formData.effectiveDate)"
                  @input="handleDateInput($event, 'effectiveDate')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Expiry Date -->
              <div>
                <label for="expiryDate" class="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  :value="formatDateForInput(formData.expiryDate)"
                  @input="handleDateInput($event, 'expiryDate')"
                  type="date"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Is Default -->
              <div class="flex items-center">
                <input
                  id="isDefault"
                  v-model="formData.isDefault"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label for="isDefault" class="ml-2 block text-sm text-gray-900">
                  Default Price List
                </label>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-4">
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="formData.description"
                rows="3"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Enter description"
              />
            </div>
          </div>

          <!-- Scope Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Scope Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Warehouse Code -->
              <div v-if="formData.scope === 'warehouse'">
                <label for="warehouseCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Warehouse Code
                </label>
                <input
                  id="warehouseCode"
                  v-model="formData.warehouseCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter warehouse code"
                />
              </div>

              <!-- Customer Code -->
              <div v-if="formData.scope === 'customer'">
                <label for="customerCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Customer Code
                </label>
                <input
                  id="customerCode"
                  v-model="formData.customerCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter customer code"
                />
              </div>

              <!-- Vendor Code -->
              <div v-if="formData.scope === 'vendor'">
                <label for="vendorCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Vendor Code
                </label>
                <input
                  id="vendorCode"
                  v-model="formData.vendorCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter vendor code"
                />
              </div>

              <!-- Item Group -->
              <div v-if="formData.scope === 'item_group'">
                <label for="itemGroup" class="block text-sm font-medium text-gray-700 mb-1">
                  Item Group
                </label>
                <input
                  id="itemGroup"
                  v-model="formData.itemGroup"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter item group"
                />
              </div>

              <!-- Item Category -->
              <div v-if="formData.scope === 'item_category'">
                <label for="itemCategory" class="block text-sm font-medium text-gray-700 mb-1">
                  Item Category
                </label>
                <input
                  id="itemCategory"
                  v-model="formData.itemCategory"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter item category"
                />
              </div>
            </div>
          </div>

          <!-- Price List Items -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-medium text-gray-900">Price List Items</h3>
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
              No items added yet. Click "Add Item" to add items to this price list.
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item Code
                    </th>
                    <th
                      class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Item Name
                    </th>
                    <th
                      class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Base Price
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
                      Min Qty
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
                        v-model.number="item.basePrice"
                        type="number"
                        step="0.01"
                        min="0"
                        class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
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
                    <td class="px-3 py-2">
                      <input
                        v-model.number="item.discountPercentage"
                        type="number"
                        step="0.01"
                        min="0"
                        max="100"
                        class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                      />
                    </td>
                    <td class="px-3 py-2">
                      <input
                        v-model.number="item.minimumQuantity"
                        type="number"
                        step="1"
                        min="0"
                        class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                      />
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
              {{ isEditing ? 'Update' : 'Create' }} Price List
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  PriceListType,
  PriceListStatus,
  PriceListCurrency,
  PriceListScope,
  PriceListPriority,
  PriceListUpdateFrequency,
  PriceListRounding,
} from '../types'
import type { PriceList, PriceListFormData } from '../types'

// Props
interface Props {
  item?: PriceList | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: PriceListFormData]
}>()

// Reactive data
const formData = ref<PriceListFormData>({
  priceListName: '',
  type: PriceListType.SALES,
  status: PriceListStatus.ACTIVE,
  currency: PriceListCurrency.USD,
  scope: PriceListScope.GLOBAL,
  priority: PriceListPriority.MEDIUM,
  updateFrequency: PriceListUpdateFrequency.MONTHLY,
  rounding: PriceListRounding.ROUND_NEAREST,
  effectiveDate: new Date(),
  isDefault: false,
  items: [],
})

// Computed
const isEditing = computed(() => !!props.item)

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.priceListName &&
    formData.value.items.length > 0 &&
    formData.value.items.every(
      (item) => item.itemCode && item.itemName && item.basePrice >= 0 && item.unitPrice >= 0,
    )
  )
})

// Methods
const addItem = () => {
  formData.value.items.push({
    itemCode: '',
    itemName: '',
    description: '',
    unitOfMeasure: 'EA',
    basePrice: 0,
    unitPrice: 0,
    discountPercentage: 0,
    discountAmount: 0,
    minimumQuantity: 1,
    maximumQuantity: undefined,
    effectiveDate: new Date(),
    expiryDate: undefined,
  })
}

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1)
}

const formatDateForInput = (date: Date | undefined): string => {
  if (!date) return ''
  return date.toISOString().split('T')[0]
}

const handleDateInput = (event: Event, field: 'effectiveDate' | 'expiryDate') => {
  const target = event.target as HTMLInputElement
  if (field === 'effectiveDate') {
    formData.value.effectiveDate = new Date(target.value)
  } else if (field === 'expiryDate') {
    formData.value.expiryDate = target.value ? new Date(target.value) : undefined
  }
}

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
        priceListName: newItem.priceListName,
        description: newItem.description,
        type: newItem.type,
        status: newItem.status,
        currency: newItem.currency,
        scope: newItem.scope,
        priority: newItem.priority,
        updateFrequency: newItem.updateFrequency,
        rounding: newItem.rounding,
        effectiveDate: newItem.effectiveDate,
        expiryDate: newItem.expiryDate,
        warehouseCode: newItem.warehouseCode,
        customerCode: newItem.customerCode,
        vendorCode: newItem.vendorCode,
        itemGroup: newItem.itemGroup,
        itemCategory: newItem.itemCategory,
        isDefault: newItem.isDefault,
        items: newItem.items.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          description: item.description,
          unitOfMeasure: item.unitOfMeasure,
          basePrice: item.basePrice,
          unitPrice: item.unitPrice,
          discountPercentage: item.discountPercentage,
          discountAmount: item.discountAmount,
          minimumQuantity: item.minimumQuantity,
          maximumQuantity: item.maximumQuantity,
          effectiveDate: item.effectiveDate,
          expiryDate: item.expiryDate,
        })),
      }
    } else {
      // Reset form for new item
      formData.value = {
        priceListName: '',
        type: PriceListType.SALES,
        status: PriceListStatus.ACTIVE,
        currency: PriceListCurrency.USD,
        scope: PriceListScope.GLOBAL,
        priority: PriceListPriority.MEDIUM,
        updateFrequency: PriceListUpdateFrequency.MONTHLY,
        rounding: PriceListRounding.ROUND_NEAREST,
        effectiveDate: new Date(),
        isDefault: false,
        items: [],
      }
    }
  },
  { immediate: true },
)
</script>
