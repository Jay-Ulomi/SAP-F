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
            {{ isEditing ? 'Edit Goods Receipt' : 'Create Goods Receipt' }}
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
        <form @submit.prevent="handleSubmit" class="mt-6">
          <!-- Tabs -->
          <div class="border-b border-gray-200 mb-6">
            <nav class="-mb-px flex space-x-8">
              <button
                type="button"
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-2 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-sap-blue text-sap-blue'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                ]"
              >
                {{ tab.name }}
              </button>
            </nav>
          </div>

          <!-- Tab Content -->
          <div class="space-y-6">
            <!-- Header Information Tab -->
            <div v-if="activeTab === 'header'" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                  <select
                    v-model="formData.type"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  >
                    <option value="receipt">Goods Receipt</option>
                    <option value="issue">Goods Issue</option>
                    <option value="transfer">Transfer</option>
                    <option value="adjustment">Adjustment</option>
                    <option value="return">Return</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Transaction Type *</label
                  >
                  <select
                    v-model="formData.transactionType"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  >
                    <option value="inbound">Inbound</option>
                    <option value="outbound">Outbound</option>
                    <option value="internal">Internal</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Document Type *</label
                  >
                  <select
                    v-model="formData.documentType"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  >
                    <option value="purchase_order">Purchase Order</option>
                    <option value="sales_order">Sales Order</option>
                    <option value="transfer_order">Transfer Order</option>
                    <option value="manual">Manual</option>
                    <option value="adjustment">Adjustment</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    :value="formatDateForInput(formData.date)"
                    @input="handleDateInput($event, 'date')"
                    type="date"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Posting Date</label>
                  <input
                    :value="formData.postingDate ? formatDateForInput(formData.postingDate) : ''"
                    @input="handleDateInput($event, 'postingDate')"
                    type="date"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Reference Document</label
                  >
                  <input
                    v-model="formData.referenceDocument"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Reference Number</label
                  >
                  <input
                    v-model="formData.referenceNumber"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Employee Code *</label
                  >
                  <input
                    v-model="formData.employeeCode"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Warehouse Information Tab -->
            <div v-if="activeTab === 'warehouse'" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Warehouse Code *</label
                  >
                  <input
                    v-model="formData.warehouseCode"
                    type="text"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Location Code</label>
                  <input
                    v-model="formData.locationCode"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Code</label>
                  <input
                    v-model="formData.supplierCode"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Customer Code</label>
                  <input
                    v-model="formData.customerCode"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <input
                    v-model="formData.department"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Project</label>
                  <input
                    v-model="formData.project"
                    type="text"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Financial Information Tab -->
            <div v-if="activeTab === 'financial'" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Currency *</label>
                  <select
                    v-model="formData.currency"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="JPY">JPY</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >Exchange Rate *</label
                  >
                  <input
                    v-model.number="formData.exchangeRate"
                    type="number"
                    step="0.0001"
                    min="0"
                    required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>

                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700 mb-1">Remarks</label>
                  <textarea
                    v-model="formData.remarks"
                    rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <!-- Items Tab -->
            <div v-if="activeTab === 'items'" class="space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="text-md font-medium text-gray-900">Items</h4>
                <button
                  type="button"
                  @click="addItem"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
                >
                  Add Item
                </button>
              </div>

              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Item
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Unit Price
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Total
                      </th>
                      <th
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(item, index) in formData.items" :key="index">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex flex-col space-y-1">
                          <input
                            v-model="item.itemCode"
                            type="text"
                            placeholder="Item Code"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                          />
                          <input
                            v-model="item.itemName"
                            type="text"
                            placeholder="Item Name"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <input
                          v-model.number="item.quantity"
                          type="number"
                          min="0"
                          step="0.01"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                        />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <input
                          v-model.number="item.unitPrice"
                          type="number"
                          min="0"
                          step="0.01"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
                        />
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ (item.quantity * item.unitPrice).toFixed(2) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          type="button"
                          @click="removeItem(index)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              @click="$emit('close')"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : isEditing ? 'Update Receipt' : 'Create Receipt' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { GoodsReceiptType, TransactionType, DocumentType } from '../types'
import type { GoodsReceipt, GoodsReceiptFormData } from '../types'

// Props
interface Props {
  item?: GoodsReceipt | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  loading: false,
})

// Emits
const emit = defineEmits<{
  close: []
  submit: [data: GoodsReceiptFormData]
}>()

// Reactive data
const activeTab = ref('header')

const tabs = [
  { id: 'header', name: 'Header Information' },
  { id: 'warehouse', name: 'Warehouse Information' },
  { id: 'financial', name: 'Financial Information' },
  { id: 'items', name: 'Items' },
]

const formData = ref<GoodsReceiptFormData>({
  type: GoodsReceiptType.RECEIPT,
  transactionType: TransactionType.INBOUND,
  documentType: DocumentType.PURCHASE_ORDER,
  date: new Date(),
  warehouseCode: '',
  employeeCode: '',
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
    warehouseCode: formData.value.warehouseCode,
    locationCode: formData.value.locationCode,
  })
}

const removeItem = (index: number) => {
  formData.value.items.splice(index, 1)
}

const formatDateForInput = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

const handleDateInput = (event: Event, field: 'date' | 'postingDate') => {
  const target = event.target as HTMLInputElement
  if (field === 'date') {
    formData.value.date = new Date(target.value)
  } else if (field === 'postingDate') {
    formData.value.postingDate = new Date(target.value)
  }
}

const handleSubmit = () => {
  emit('submit', formData.value)
}

// Watch for item changes
watch(
  () => props.item,
  (newItem) => {
    if (newItem) {
      formData.value = {
        type: newItem.type,
        transactionType: newItem.transactionType,
        documentType: newItem.documentType,
        referenceDocument: newItem.referenceDocument,
        referenceNumber: newItem.referenceNumber,
        date: newItem.date,
        postingDate: newItem.postingDate,
        warehouseCode: newItem.warehouseCode,
        locationCode: newItem.locationCode,
        supplierCode: newItem.supplierCode,
        customerCode: newItem.customerCode,
        employeeCode: newItem.employeeCode,
        department: newItem.department,
        project: newItem.project,
        currency: newItem.currency,
        exchangeRate: newItem.exchangeRate,
        remarks: newItem.remarks,
        items: newItem.items.map((item) => ({
          itemCode: item.itemCode,
          itemName: item.itemName,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          warehouseCode: item.warehouseCode,
          locationCode: item.locationCode,
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
        type: GoodsReceiptType.RECEIPT,
        transactionType: TransactionType.INBOUND,
        documentType: DocumentType.PURCHASE_ORDER,
        date: new Date(),
        warehouseCode: '',
        employeeCode: '',
        currency: 'USD',
        exchangeRate: 1.0,
        items: [],
      }
    }
  },
  { immediate: true },
)
</script>
