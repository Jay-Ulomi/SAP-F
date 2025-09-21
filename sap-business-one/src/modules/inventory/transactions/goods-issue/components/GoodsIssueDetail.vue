<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ issue.documentNo }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ issue.customer }}</p>
          <p class="text-sm text-gray-500 mt-1">Posting Date: {{ formatDate(issue.postingDate) }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': issue.status === 'Issued',
              'bg-yellow-100 text-yellow-800': issue.status === 'Pending',
              'bg-gray-100 text-gray-800': issue.status === 'Draft',
              'bg-red-100 text-red-800': issue.status === 'Cancelled'
            }"
          >
            {{ issue.status }}
          </span>
          <span class="text-lg font-semibold text-gray-900">
            {{ formatCurrency(issue.totalAmount) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Issue Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Basic Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Issue Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Document No:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.documentNo }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Series:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.series }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Posting Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ formatDate(issue.postingDate) }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Document Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ formatDate(issue.documentDate) }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Business Partner Code:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.businessPartnerCode }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Business Partner Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.businessPartnerName }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Customer:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.customer }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Warehouse:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ issue.warehouse }}</span>
              </div>
            </div>
          </div>

          <!-- Line Items -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Issue Items</h3>
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
                      Warehouse
                    </th>
                    <th class="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Line Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in issue.lineItems" :key="item.itemCode">
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
                      {{ item.warehouse }}
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
                  <tr v-for="item in issue.lineItems" :key="`dim-${item.itemCode}`">
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
        </div>

        <!-- Right Column - Summary -->
        <div class="space-y-6">
          <!-- Financial Summary -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Financial Summary</h3>
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Items Count:</span>
                <span class="text-sm font-medium text-gray-900">{{ issue.itemsCount }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Subtotal:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatCurrency(subtotal) }}</span>
              </div>
              <div class="flex justify-between border-t border-gray-200 pt-2">
                <span class="text-base font-medium text-gray-900">Total Amount:</span>
                <span class="text-base font-semibold text-gray-900">{{ formatCurrency(issue.totalAmount) }}</span>
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
                    'bg-green-100 text-green-800': issue.status === 'Issued',
                    'bg-yellow-100 text-yellow-800': issue.status === 'Pending',
                    'bg-gray-100 text-gray-800': issue.status === 'Draft',
                    'bg-red-100 text-red-800': issue.status === 'Cancelled'
                  }"
                >
                  {{ issue.status }}
                </span>
              </div>
              <div class="flex justify-between" v-if="issue.createdAt">
                <span class="text-sm text-gray-600">Created:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDateTime(issue.createdAt) }}</span>
              </div>
              <div class="flex justify-between" v-if="issue.updatedAt">
                <span class="text-sm text-gray-600">Last Updated:</span>
                <span class="text-sm font-medium text-gray-900">{{ formatDateTime(issue.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Actions</h3>
            <div class="space-y-2">
              <button
                @click="$emit('edit', issue)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Issue
              </button>

              <button
                v-if="issue.status === 'Pending' || issue.status === 'Draft'"
                @click="$emit('complete', issue)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Complete Issue
              </button>

              <button
                v-if="issue.status !== 'Issued' && issue.status !== 'Cancelled'"
                @click="$emit('cancel', issue)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel Issue
              </button>

              <button
                @click="$emit('print', issue)"
                class="w-full inline-flex justify-center items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Issue
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
import type { GoodsIssue } from '../types'

// Props
const props = defineProps<{
  issue: GoodsIssue
}>()

// Emits
const emit = defineEmits<{
  edit: [issue: GoodsIssue]
  complete: [issue: GoodsIssue]
  cancel: [issue: GoodsIssue]
  print: [issue: GoodsIssue]
}>()

// Computed
const subtotal = computed(() => {
  return props.issue.lineItems.reduce((sum, item) => sum + item.lineTotal, 0)
})

const hasAccountingDimensions = computed(() => {
  return props.issue.lineItems.some(item =>
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