<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ transfer.documentNo }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ transfer.sourceWarehouse }} → {{ transfer.targetWarehouse }}</p>
          <p class="text-sm text-gray-500 mt-1">Posting Date: {{ formatDate(transfer.postingDate) }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': transfer.status === 'Completed',
              'bg-yellow-100 text-yellow-800': transfer.status === 'Pending',
              'bg-gray-100 text-gray-800': transfer.status === 'Draft',
              'bg-red-100 text-red-800': transfer.status === 'Cancelled'
            }"
          >
            {{ transfer.status }}
          </span>
          <span class="text-lg font-semibold text-gray-900">
            {{ formatCurrency(transfer.totalAmount) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Transfer Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Basic Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Transfer Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Document No:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.documentNo }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Series:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.series }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Posting Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ formatDate(transfer.postingDate) }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Document Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ formatDate(transfer.documentDate) }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Source Warehouse:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.sourceWarehouse }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Target Warehouse:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.targetWarehouse }}</span>
              </div>
              <div v-if="transfer.reference">
                <span class="text-xs text-gray-500">Reference:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.reference }}</span>
              </div>
              <div v-if="transfer.requestedBy">
                <span class="text-xs text-gray-500">Requested By:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ transfer.requestedBy }}</span>
              </div>
            </div>
          </div>

          <!-- Line Items -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Transfer Items</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      UoM
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      From Warehouse
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      To Warehouse
                    </th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Line Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in transfer.lineItems" :key="item.itemCode">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ item.itemCode }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ item.description }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.quantity }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                      {{ formatCurrency(item.unitPrice) }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.uomCode }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ item.fromWarehouse }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ item.toWarehouse }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-right">
                      {{ formatCurrency(item.lineTotal) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Dimensions Information -->
          <div class="bg-gray-50 rounded-lg p-4" v-if="hasAccountingDimensions">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Accounting Dimensions</h3>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Item Code
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Name
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimension 1
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimension 2
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimension 3
                    </th>
                    <th class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dimension 4
                    </th>
                    <th class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in transfer.lineItems" :key="`dim-${item.itemCode}`">
                    <td class="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ item.itemCode }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ item.accountName }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.dimension1 || '-' }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.dimension2 || '-' }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.dimension3 || '-' }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500 text-center">
                      {{ item.dimension4 || '-' }}
                    </td>
                    <td class="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {{ item.project || '-' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Comments/Remarks -->
          <div class="bg-gray-50 rounded-lg p-4" v-if="transfer.remarks">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Remarks</h3>
            <p class="text-sm text-gray-700">{{ transfer.remarks }}</p>
          </div>
        </div>

        <!-- Right Column - Summary -->
        <div class="space-y-6">
          <!-- Transfer Summary -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Transfer Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Items Count:</span>
                <span class="text-sm font-medium text-gray-900">{{ transfer.itemsCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between border-t border-gray-200 pt-2">
                <span class="text-base font-medium text-gray-900">Total Amount:</span>
                <span class="text-base font-semibold text-gray-900">{{ formatCurrency(transfer.totalAmount) }}</span>
              </div>
            </div>
          </div>

          <!-- Warehouse Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Warehouse Details</h3>
            <div class="space-y-3">
              <div class="border rounded-lg p-3 bg-white">
                <div class="text-xs text-gray-500 uppercase">From</div>
                <div class="text-sm font-medium text-gray-900">{{ transfer.sourceWarehouse }}</div>
              </div>
              <div class="flex justify-center">
                <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div class="border rounded-lg p-3 bg-white">
                <div class="text-xs text-gray-500 uppercase">To</div>
                <div class="text-sm font-medium text-gray-900">{{ transfer.targetWarehouse }}</div>
              </div>
            </div>
          </div>

          <!-- Status Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Status Information</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Current Status:</span>
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': transfer.status === 'Completed',
                    'bg-yellow-100 text-yellow-800': transfer.status === 'Pending',
                    'bg-gray-100 text-gray-800': transfer.status === 'Draft',
                    'bg-red-100 text-red-800': transfer.status === 'Cancelled'
                  }"
                >
                  {{ transfer.status }}
                </span>
              </div>
              <div class="flex justify-between" v-if="transfer.requestedBy">
                <span class="text-sm text-gray-600">Requested By:</span>
                <span class="text-sm font-medium text-gray-900">{{ transfer.requestedBy }}</span>
              </div>
              <div class="flex justify-between" v-if="transfer.createdAt">
                <span class="text-sm text-gray-600">Created:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDateTime(transfer.createdAt) }}</span>
              </div>
              <div class="flex justify-between" v-if="transfer.updatedAt">
                <span class="text-sm text-gray-600">Last Updated:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDateTime(transfer.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Actions</h3>
            <div class="space-y-2">
              <button
                @click="$emit('edit', transfer)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Transfer
              </button>

              <button
                v-if="transfer.status === 'Pending' || transfer.status === 'Draft'"
                @click="$emit('complete', transfer)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Transfer
              </button>

              <button
                v-if="transfer.status !== 'Completed' && transfer.status !== 'Cancelled'"
                @click="$emit('cancel', transfer)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Transfer
              </button>

              <button
                @click="$emit('print', transfer)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { InventoryTransfer } from '../types'

// Props
const props = defineProps<{
  transfer: InventoryTransfer
}>()

// Emits
const emit = defineEmits<{
  edit: [transfer: InventoryTransfer]
  complete: [transfer: InventoryTransfer]
  cancel: [transfer: InventoryTransfer]
  print: [transfer: InventoryTransfer]
}>()

// Computed
const subtotal = computed(() => {
  return props.transfer.lineItems.reduce((sum, item) => sum + item.lineTotal, 0)
})

const hasAccountingDimensions = computed(() => {
  return props.transfer.lineItems.some(item =>
    item.accountName || item.dimension1 || item.dimension2 ||
    item.dimension3 || item.dimension4 || item.project
  )
})

// Utilities
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}
</script>