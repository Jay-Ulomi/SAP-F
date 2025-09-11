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
            Price List Details - {{ props.item.priceListCode }}
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

        <!-- Content -->
        <div class="mt-6 space-y-6">
          <!-- Price List Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Price List Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Price List Code</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.priceListCode }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Price List Name</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.priceListName }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Type</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.type) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Status</label>
                <span
                  :class="getStatusBadgeClass(props.item.status)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ formatEnum(props.item.status) }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Currency</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.currency }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Scope</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.scope) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Priority</label>
                <span
                  :class="getPriorityBadgeClass(props.item.priority)"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {{ formatEnum(props.item.priority) }}
                </span>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Update Frequency</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.updateFrequency) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Rounding</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.rounding) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Effective Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.effectiveDate) }}</p>
              </div>

              <div v-if="props.item.expiryDate">
                <label class="block text-sm font-medium text-gray-500">Expiry Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.expiryDate) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Default Price List</label>
                <p class="mt-1 text-sm text-gray-900">
                  <span
                    :class="props.item.isDefault ? 'text-green-600' : 'text-gray-500'"
                    class="font-medium"
                  >
                    {{ props.item.isDefault ? 'Yes' : 'No' }}
                  </span>
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">System Price List</label>
                <p class="mt-1 text-sm text-gray-900">
                  <span
                    :class="props.item.isSystem ? 'text-blue-600' : 'text-gray-500'"
                    class="font-medium"
                  >
                    {{ props.item.isSystem ? 'Yes' : 'No' }}
                  </span>
                </p>
              </div>

              <div v-if="props.item.description">
                <label class="block text-sm font-medium text-gray-500">Description</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.description }}</p>
              </div>
            </div>
          </div>

          <!-- Scope Information -->
          <div v-if="props.item.scope !== 'global'" class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Scope Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="props.item.warehouseCode">
                <label class="block text-sm font-medium text-gray-500">Warehouse</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.warehouseCode }} - {{ props.item.warehouseName }}
                </p>
              </div>

              <div v-if="props.item.customerCode">
                <label class="block text-sm font-medium text-gray-500">Customer</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.customerCode }} - {{ props.item.customerName }}
                </p>
              </div>

              <div v-if="props.item.vendorCode">
                <label class="block text-sm font-medium text-gray-500">Vendor</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.vendorCode }} - {{ props.item.vendorName }}
                </p>
              </div>

              <div v-if="props.item.itemGroup">
                <label class="block text-sm font-medium text-gray-500">Item Group</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.itemGroup }}</p>
              </div>

              <div v-if="props.item.itemCategory">
                <label class="block text-sm font-medium text-gray-500">Item Category</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.itemCategory }}</p>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Summary</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Total Items</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">{{ props.item.totalItems }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Active Items</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">{{ props.item.activeItems }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Inactive Items</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">{{ props.item.inactiveItems }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Average Price</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">
                  {{ formatCurrency(props.item.averagePrice) }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Total Value</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">
                  {{ formatCurrency(props.item.totalValue) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Price List Items -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Price List Items</h3>

            <div v-if="props.item.items.length === 0" class="text-center py-8 text-gray-500">
              No items in this price list.
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Name
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Base Price
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Discount
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Final Price
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Min Qty
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in props.item.items" :key="item.id" class="hover:bg-gray-50">
                    <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ item.itemCode }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.itemName }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.basePrice) }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.unitPrice) }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">
                      <span v-if="item.discountPercentage && item.discountPercentage > 0">
                        {{ item.discountPercentage }}%
                      </span>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.finalPrice) }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.minimumQuantity || '-' }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">
                      <span
                        :class="item.isActive ? 'text-green-600' : 'text-red-600'"
                        class="font-medium"
                      >
                        {{ item.isActive ? 'Active' : 'Inactive' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Audit Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Audit Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Created By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.createdBy }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Created Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.createdDate) }}</p>
              </div>

              <div v-if="props.item.modifiedBy">
                <label class="block text-sm font-medium text-gray-500">Modified By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.modifiedBy }}</p>
              </div>

              <div v-if="props.item.modifiedDate">
                <label class="block text-sm font-medium text-gray-500">Modified Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDateTime(props.item.modifiedDate) }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex justify-end">
          <button
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PriceListStatus, PriceListPriority } from '../types'
import type { PriceList } from '../types'

// Props
interface Props {
  item: PriceList
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  close: []
}>()

// Methods
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

const formatDateTime = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: props.item.currency,
  }).format(amount)
}

const formatEnum = (value: string): string => {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const getStatusBadgeClass = (status: PriceListStatus): string => {
  switch (status) {
    case PriceListStatus.ACTIVE:
      return 'bg-green-100 text-green-800'
    case PriceListStatus.INACTIVE:
      return 'bg-gray-100 text-gray-800'
    case PriceListStatus.DRAFT:
      return 'bg-yellow-100 text-yellow-800'
    case PriceListStatus.EXPIRED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityBadgeClass = (priority: PriceListPriority): string => {
  switch (priority) {
    case PriceListPriority.LOW:
      return 'bg-gray-100 text-gray-800'
    case PriceListPriority.MEDIUM:
      return 'bg-blue-100 text-blue-800'
    case PriceListPriority.HIGH:
      return 'bg-yellow-100 text-yellow-800'
    case PriceListPriority.CRITICAL:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
