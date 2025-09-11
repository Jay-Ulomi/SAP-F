<template>
  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div
      class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
    >
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium text-gray-900">Item Details</h3>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
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

        <div v-if="item" class="bg-white rounded-lg shadow-sm border border-gray-200">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-xl font-semibold text-gray-900">{{ item.itemName }}</h2>
                <p class="text-sm text-gray-600 mt-1">
                  {{ item.description || 'No description provided' }}
                </p>
                <p class="text-sm text-gray-500 mt-1">Code: {{ item.itemCode }}</p>
              </div>
              <div class="flex items-center space-x-3">
                <span
                  :class="getStatusBadgeClass(item.status)"
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
                >
                  {{ formatItemStatus(item.status) }}
                </span>
                <span
                  :class="getTypeBadgeClass(item.type)"
                  class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
                >
                  {{ formatItemType(item.type) }}
                </span>
                <button
                  @click="$emit('edit', item)"
                  class="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white hover:bg-sap-dark-blue"
                >
                  Edit Item
                </button>
              </div>
            </div>
          </div>

          <!-- Item Details -->
          <div class="px-4 sm:px-6 py-4">
            <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              <!-- Left Column - Basic Info -->
              <div class="xl:col-span-2 space-y-4 sm:space-y-6">
                <!-- Basic Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Basic Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">Item Code:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.itemCode
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Item Name:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.itemName
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Type:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatItemType(item.type)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Status:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatItemStatus(item.status)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Group:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatItemGroup(item.group)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Unit of Measure:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatUnitOfMeasure(item.unitOfMeasure)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Created:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatDateTime(item.createdAt)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Updated:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatDateTime(item.updatedAt || item.createdAt)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Description & Notes -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Description & Notes
                  </h3>
                  <div class="space-y-3">
                    <div v-if="item.description">
                      <span class="text-xs text-gray-500">Description:</span>
                      <p class="mt-1 text-sm text-gray-700">{{ item.description }}</p>
                    </div>
                    <div v-if="item.notes">
                      <span class="text-xs text-gray-500">Notes:</span>
                      <p class="mt-1 text-sm text-gray-700">{{ item.notes }}</p>
                    </div>
                    <div v-if="!item.description && !item.notes">
                      <p class="text-sm text-gray-400">No description or notes provided</p>
                    </div>
                  </div>
                </div>

                <!-- Inventory Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Inventory Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">Minimum Stock Level:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.minStockLevel || 0
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Maximum Stock Level:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.maxStockLevel || 0
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Reorder Point:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.reorderPoint || 0
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Reorder Quantity:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.reorderQuantity || 0
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Warehouse:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.warehouseCode || 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Location:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.location || 'Not specified'
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Additional Information -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Additional Information
                  </h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span class="text-xs text-gray-500">Barcode:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.barcode || 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Supplier:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.supplierCode || 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Weight:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.weight ? `${item.weight} kg` : 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Tax Code:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.taxCode || 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">GL Account:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.glAccount || 'Not specified'
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Created By:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.createdBy
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Stock Status Alert -->
                <div v-if="isLowStock" class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div class="flex">
                    <div class="flex-shrink-0">
                      <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <div class="ml-3">
                      <h3 class="text-sm font-medium text-yellow-800">Low Stock Alert</h3>
                      <div class="mt-2 text-sm text-yellow-700">
                        <p>
                          Stock level is below the minimum stock level ({{
                            item.minStockLevel || 0
                          }}). Consider reordering.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right Column - Financial, Pricing, Valuation -->
              <div class="space-y-4 sm:space-y-6">
                <!-- Pricing & Costing -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Pricing & Costing
                  </h3>
                  <div class="space-y-3">
                    <div>
                      <span class="text-xs text-gray-500">Base Unit Price:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatCurrency(item.baseUnitPrice)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Standard Cost:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatCurrency(item.standardCost || 0)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Valuation Method:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatValuationMethod(item.valuationMethod)
                      }}</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Tax Code:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        item.taxCode || 'Not specified'
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Stock Summary -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Stock Summary
                  </h3>
                  <div class="space-y-3">
                    <div>
                      <span class="text-xs text-gray-500">Current Stock:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">0</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Available Stock:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">0</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Reserved Stock:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">0</span>
                    </div>
                    <div>
                      <span class="text-xs text-gray-500">Stock Value:</span>
                      <span class="ml-2 text-sm font-medium text-gray-900">{{
                        formatCurrency(0)
                      }}</span>
                    </div>
                  </div>
                </div>

                <!-- Quick Actions -->
                <div class="bg-gray-50 rounded-lg p-4">
                  <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                    Quick Actions
                  </h3>
                  <div class="space-y-2">
                    <button
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Stock Movements
                    </button>
                    <button
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Purchase Orders
                    </button>
                    <button
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      View Sales Orders
                    </button>
                    <button
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Generate Barcode
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type {
  Item,
  ItemType,
  ItemStatus,
  ItemGroup,
  UnitOfMeasure,
  ValuationMethod,
} from '../types'

interface Props {
  item: Item | null
}

const props = defineProps<Props>()

defineEmits<{
  close: []
  edit: [item: Item]
}>()

// Computed
const isLowStock = computed(() => {
  if (!props.item) return false
  const minimumStock = props.item.minStockLevel || 0
  return minimumStock > 0
})

// Methods
const formatDateTime = (date: string) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

const formatItemType = (type: ItemType): string => {
  const typeMap = {
    inventory: 'Inventory',
    service: 'Service',
    asset: 'Asset',
    consumable: 'Consumable',
  }
  return typeMap[type] || type
}

const formatItemStatus = (status: ItemStatus): string => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    discontinued: 'Discontinued',
    planned: 'Planned',
  }
  return statusMap[status] || status
}

const formatItemGroup = (group: ItemGroup): string => {
  const groupMap = {
    raw_materials: 'Raw Materials',
    finished_goods: 'Finished Goods',
    semi_finished: 'Semi-Finished',
    spare_parts: 'Spare Parts',
    consumables: 'Consumables',
    services: 'Services',
  }
  return groupMap[group] || group
}

const formatUnitOfMeasure = (unit: UnitOfMeasure): string => {
  const unitMap = {
    piece: 'Piece',
    kilogram: 'Kilogram',
    liter: 'Liter',
    meter: 'Meter',
    hour: 'Hour',
    box: 'Box',
    pallet: 'Pallet',
  }
  return unitMap[unit] || unit
}

const formatValuationMethod = (method: ValuationMethod): string => {
  const methodMap = {
    fifo: 'FIFO',
    lifo: 'LIFO',
    average: 'Average',
    standard: 'Standard',
  }
  return methodMap[method] || method
}

const getTypeBadgeClass = (type: ItemType): string => {
  const classMap = {
    inventory: 'bg-blue-100 text-blue-800',
    service: 'bg-green-100 text-green-800',
    asset: 'bg-purple-100 text-purple-800',
    consumable: 'bg-yellow-100 text-yellow-800',
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
}

const getStatusBadgeClass = (status: ItemStatus): string => {
  const classMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    discontinued: 'bg-red-100 text-red-800',
    planned: 'bg-yellow-100 text-yellow-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}
</script>
