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
            {{ isEditing ? 'Edit Valuation' : 'Create Valuation' }}
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
          <!-- Valuation Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Valuation Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Valuation Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-1">
                  Valuation Type *
                </label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="periodic">Periodic</option>
                  <option value="continuous">Continuous</option>
                  <option value="manual">Manual</option>
                  <option value="automatic">Automatic</option>
                  <option value="adjustment">Adjustment</option>
                </select>
              </div>

              <!-- Valuation Method -->
              <div>
                <label for="method" class="block text-sm font-medium text-gray-700 mb-1">
                  Valuation Method *
                </label>
                <select
                  id="method"
                  v-model="formData.method"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="fifo">FIFO</option>
                  <option value="lifo">LIFO</option>
                  <option value="weighted_average">Weighted Average</option>
                  <option value="standard_cost">Standard Cost</option>
                  <option value="moving_average">Moving Average</option>
                  <option value="specific_identification">Specific Identification</option>
                </select>
              </div>

              <!-- Frequency -->
              <div>
                <label for="frequency" class="block text-sm font-medium text-gray-700 mb-1">
                  Frequency *
                </label>
                <select
                  id="frequency"
                  v-model="formData.frequency"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                  <option value="on_demand">On Demand</option>
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

              <!-- Period Start -->
              <div>
                <label for="periodStart" class="block text-sm font-medium text-gray-700 mb-1">
                  Period Start *
                </label>
                <input
                  id="periodStart"
                  :value="formatDateForInput(formData.periodStart)"
                  @input="handleDateInput($event, 'periodStart')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Period End -->
              <div>
                <label for="periodEnd" class="block text-sm font-medium text-gray-700 mb-1">
                  Period End *
                </label>
                <input
                  id="periodEnd"
                  :value="formatDateForInput(formData.periodEnd)"
                  @input="handleDateInput($event, 'periodEnd')"
                  type="date"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                />
              </div>

              <!-- Performed By -->
              <div>
                <label for="performedBy" class="block text-sm font-medium text-gray-700 mb-1">
                  Performed By *
                </label>
                <input
                  id="performedBy"
                  v-model="formData.performedBy"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter performer"
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
              <!-- Warehouse Code -->
              <div>
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

              <!-- Location Code -->
              <div>
                <label for="locationCode" class="block text-sm font-medium text-gray-700 mb-1">
                  Location Code
                </label>
                <input
                  id="locationCode"
                  v-model="formData.locationCode"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter location code"
                />
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

          <!-- Valuation Items -->
          <div class="bg-white rounded-lg shadow p-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-base font-medium text-gray-900">Valuation Items</h3>
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
              No items added yet. Click "Add Item" to add items to this valuation.
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
                      Unit Cost
                    </th>
                    <th
                      class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Value
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
                        v-model.number="item.quantityOnHand"
                        type="number"
                        step="0.01"
                        min="0"
                        class="block w-20 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                        required
                      />
                    </td>
                    <td class="px-3 py-2">
                      <input
                        v-model.number="item.unitCost"
                        type="number"
                        step="0.01"
                        min="0"
                        class="block w-24 text-sm border-gray-300 rounded-md focus:border-sap-blue focus:ring-sap-blue"
                        required
                      />
                    </td>
                    <td class="px-3 py-2 text-sm font-medium">
                      {{ formatCurrency(item.quantityOnHand * item.unitCost) }}
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
                  <span>Total Value:</span>
                  <span>{{ formatCurrency(totalValue) }}</span>
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
              {{ isEditing ? 'Update' : 'Create' }} Valuation
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ValuationType, ValuationMethod, ValuationFrequency } from '../types'
import type { InventoryValuation, ValuationFormData } from '../types'

// Props
interface Props {
  item?: InventoryValuation | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: ValuationFormData]
}>()

// Reactive data
const formData = ref<ValuationFormData>({
  type: ValuationType.PERIODIC,
  method: ValuationMethod.WEIGHTED_AVERAGE,
  frequency: ValuationFrequency.MONTHLY,
  date: new Date(),
  effectiveDate: new Date(),
  periodStart: new Date(),
  periodEnd: new Date(),
  currency: 'USD',
  exchangeRate: 1.0,
  performedBy: '',
  items: [],
})

// Computed
const isEditing = computed(() => !!props.item)

const totalValue = computed(() => {
  return formData.value.items.reduce((sum, item) => {
    return sum + item.quantityOnHand * item.unitCost
  }, 0)
})

// Validation
const isFormValid = computed(() => {
  return (
    formData.value.performedBy &&
    formData.value.items.length > 0 &&
    formData.value.items.every(
      (item) => item.itemCode && item.itemName && item.quantityOnHand > 0 && item.unitCost >= 0,
    )
  )
})

// Methods
const addItem = () => {
  formData.value.items.push({
    itemCode: '',
    itemName: '',
    description: '',
    warehouseCode: formData.value.warehouseCode || '',
    warehouseName: 'Main Warehouse',
    locationCode: formData.value.locationCode || '',
    quantityOnHand: 0,
    unitCost: 0,
    valuationMethod: formData.value.method,
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

const handleDateInput = (
  event: Event,
  field: 'date' | 'effectiveDate' | 'periodStart' | 'periodEnd',
) => {
  const target = event.target as HTMLInputElement
  if (field === 'date') {
    formData.value.date = new Date(target.value)
  } else if (field === 'effectiveDate') {
    formData.value.effectiveDate = new Date(target.value)
  } else if (field === 'periodStart') {
    formData.value.periodStart = new Date(target.value)
  } else if (field === 'periodEnd') {
    formData.value.periodEnd = new Date(target.value)
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
        type: newItem.type,
        method: newItem.method,
        frequency: newItem.frequency,
        date: newItem.date,
        effectiveDate: newItem.effectiveDate,
        periodStart: newItem.periodStart,
        periodEnd: newItem.periodEnd,
        warehouseCode: newItem.warehouseCode,
        locationCode: newItem.locationCode,
        currency: newItem.currency,
        exchangeRate: newItem.exchangeRate,
        performedBy: newItem.performedBy,
        department: newItem.department,
        project: newItem.project,
        remarks: newItem.remarks,
        items: newItem.items.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          description: item.description,
          warehouseCode: item.warehouseCode,
          warehouseName: item.warehouseName,
          locationCode: item.locationCode,
          locationName: item.locationName,
          quantityOnHand: item.quantityOnHand,
          unitCost: item.unitCost,
          valuationMethod: item.valuationMethod,
          lastValuationDate: item.lastValuationDate,
          previousUnitCost: item.previousUnitCost,
          previousTotalValue: item.previousTotalValue,
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
        type: ValuationType.PERIODIC,
        method: ValuationMethod.WEIGHTED_AVERAGE,
        frequency: ValuationFrequency.MONTHLY,
        date: new Date(),
        effectiveDate: new Date(),
        periodStart: new Date(),
        periodEnd: new Date(),
        currency: 'USD',
        exchangeRate: 1.0,
        performedBy: '',
        items: [],
      }
    }
  },
  { immediate: true },
)
</script>
