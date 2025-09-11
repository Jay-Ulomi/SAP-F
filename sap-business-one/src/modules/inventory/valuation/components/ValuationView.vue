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
            Valuation Details - {{ props.item.valuationNumber }}
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
          <!-- Valuation Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Valuation Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-500">Valuation Number</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.valuationNumber }}</p>
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
                <label class="block text-sm font-medium text-gray-500">Method</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.method) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Frequency</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatEnum(props.item.frequency) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.date) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Effective Date</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.effectiveDate) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Period Start</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.periodStart) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Period End</label>
                <p class="mt-1 text-sm text-gray-900">{{ formatDate(props.item.periodEnd) }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Performed By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.performedByName }}</p>
              </div>

              <div v-if="props.item.department">
                <label class="block text-sm font-medium text-gray-500">Department</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.department }}</p>
              </div>

              <div v-if="props.item.project">
                <label class="block text-sm font-medium text-gray-500">Project</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.project }}</p>
              </div>
            </div>
          </div>

          <!-- Warehouse Information -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Warehouse Information</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-if="props.item.warehouseCode">
                <label class="block text-sm font-medium text-gray-500">Warehouse</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.warehouseCode }} - {{ props.item.warehouseName }}
                </p>
              </div>

              <div v-if="props.item.locationCode">
                <label class="block text-sm font-medium text-gray-500">Location</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ props.item.locationCode }} - {{ props.item.locationName }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Currency</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.currency }}</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Exchange Rate</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.exchangeRate }}</p>
              </div>

              <div v-if="props.item.remarks">
                <label class="block text-sm font-medium text-gray-500">Remarks</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.remarks }}</p>
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
                <label class="block text-sm font-medium text-gray-500">Total Quantity</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">
                  {{ props.item.totalQuantity }}
                </p>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-500">Total Value</label>
                <p class="mt-1 text-lg font-semibold text-gray-900">
                  {{ formatCurrency(props.item.totalValue) }}
                </p>
              </div>

              <div v-if="props.item.variance !== undefined">
                <label class="block text-sm font-medium text-gray-500">Variance</label>
                <p
                  :class="props.item.variance >= 0 ? 'text-green-600' : 'text-red-600'"
                  class="mt-1 text-lg font-semibold"
                >
                  {{ formatCurrency(props.item.variance) }}
                  <span v-if="props.item.variancePercentage !== undefined" class="text-sm">
                    ({{ props.item.variancePercentage.toFixed(2) }}%)
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- Valuation Items -->
          <div class="bg-white rounded-lg shadow p-4">
            <h3 class="text-base font-medium text-gray-900 mb-4">Valuation Items</h3>

            <div v-if="props.item.items.length === 0" class="text-center py-8 text-gray-500">
              No items in this valuation.
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
                      Method
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in props.item.items" :key="item.id" class="hover:bg-gray-50">
                    <td class="px-3 py-2 text-sm font-medium text-gray-900">{{ item.itemCode }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.itemName }}</td>
                    <td class="px-3 py-2 text-sm text-gray-500">{{ item.description || '-' }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">{{ item.quantityOnHand }}</td>
                    <td class="px-3 py-2 text-sm text-gray-900">
                      {{ formatCurrency(item.unitCost) }}
                    </td>
                    <td class="px-3 py-2 text-sm font-medium text-gray-900">
                      {{ formatCurrency(item.totalValue) }}
                    </td>
                    <td class="px-3 py-2 text-sm text-gray-500">
                      {{ formatEnum(item.valuationMethod) }}
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
                <p class="mt-1 text-sm text-gray-900">
                  {{ formatDateTime(props.item.createdDate) }}
                </p>
              </div>

              <div v-if="props.item.modifiedBy">
                <label class="block text-sm font-medium text-gray-500">Modified By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.modifiedBy }}</p>
              </div>

              <div v-if="props.item.modifiedDate">
                <label class="block text-sm font-medium text-gray-500">Modified Date</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ formatDateTime(props.item.modifiedDate) }}
                </p>
              </div>

              <div v-if="props.item.approvedBy">
                <label class="block text-sm font-medium text-gray-500">Approved By</label>
                <p class="mt-1 text-sm text-gray-900">{{ props.item.approvedByName }}</p>
              </div>

              <div v-if="props.item.approvedDate">
                <label class="block text-sm font-medium text-gray-500">Approved Date</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ formatDateTime(props.item.approvedDate) }}
                </p>
              </div>

              <div v-if="props.item.completedDate">
                <label class="block text-sm font-medium text-gray-500">Completed Date</label>
                <p class="mt-1 text-sm text-gray-900">
                  {{ formatDateTime(props.item.completedDate) }}
                </p>
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
import { ValuationStatus } from '../types'
import type { InventoryValuation } from '../types'

// Props
interface Props {
  item: InventoryValuation
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

const getStatusBadgeClass = (status: ValuationStatus): string => {
  switch (status) {
    case ValuationStatus.DRAFT:
      return 'bg-gray-100 text-gray-800'
    case ValuationStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800'
    case ValuationStatus.IN_PROGRESS:
      return 'bg-blue-100 text-blue-800'
    case ValuationStatus.COMPLETED:
      return 'bg-green-100 text-green-800'
    case ValuationStatus.APPROVED:
      return 'bg-green-100 text-green-800'
    case ValuationStatus.CANCELLED:
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>
