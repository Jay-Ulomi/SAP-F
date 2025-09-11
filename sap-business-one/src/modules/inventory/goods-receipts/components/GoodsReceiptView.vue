<template>
  <div
    class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
    @click.self="$emit('close')"
  >
    <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
      <div class="mt-3">
        <!-- Header -->
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ item.documentNumber }}</h3>
            <p class="text-sm text-gray-600">
              {{ formatType(item.type) }} - {{ formatStatus(item.status) }}
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              :class="getStatusBadgeClass(item.status)"
            >
              {{ formatStatus(item.status) }}
            </span>
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
        </div>

        <!-- Content -->
        <div class="mt-6">
          <!-- Header Information -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Basic Information -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-900 mb-3">Basic Information</h4>
              <dl class="grid grid-cols-1 gap-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Document Number:</dt>
                  <dd class="font-medium text-gray-900">{{ item.documentNumber }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Type:</dt>
                  <dd class="font-medium text-gray-900">{{ formatType(item.type) }}</dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Transaction Type:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ formatTransactionType(item.transactionType) }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Document Type:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ formatDocumentType(item.documentType) }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Date:</dt>
                  <dd class="font-medium text-gray-900">{{ formatDate(item.date) }}</dd>
                </div>
                <div v-if="item.postingDate" class="flex justify-between">
                  <dt class="text-gray-600">Posting Date:</dt>
                  <dd class="font-medium text-gray-900">{{ formatDate(item.postingDate) }}</dd>
                </div>
                <div v-if="item.referenceDocument" class="flex justify-between">
                  <dt class="text-gray-600">Reference Document:</dt>
                  <dd class="font-medium text-gray-900">{{ item.referenceDocument }}</dd>
                </div>
                <div v-if="item.referenceNumber" class="flex justify-between">
                  <dt class="text-gray-600">Reference Number:</dt>
                  <dd class="font-medium text-gray-900">{{ item.referenceNumber }}</dd>
                </div>
              </dl>
            </div>

            <!-- Warehouse Information -->
            <div class="bg-gray-50 p-4 rounded-lg">
              <h4 class="text-md font-medium text-gray-900 mb-3">Warehouse Information</h4>
              <dl class="grid grid-cols-1 gap-2 text-sm">
                <div class="flex justify-between">
                  <dt class="text-gray-600">Warehouse:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ item.warehouseCode }} - {{ item.warehouseName }}
                  </dd>
                </div>
                <div v-if="item.locationCode" class="flex justify-between">
                  <dt class="text-gray-600">Location:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ item.locationCode }} - {{ item.locationName }}
                  </dd>
                </div>
                <div v-if="item.supplierCode" class="flex justify-between">
                  <dt class="text-gray-600">Supplier:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ item.supplierCode }} - {{ item.supplierName }}
                  </dd>
                </div>
                <div v-if="item.customerCode" class="flex justify-between">
                  <dt class="text-gray-600">Customer:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ item.customerCode }} - {{ item.customerName }}
                  </dd>
                </div>
                <div class="flex justify-between">
                  <dt class="text-gray-600">Employee:</dt>
                  <dd class="font-medium text-gray-900">
                    {{ item.employeeCode }} - {{ item.employeeName }}
                  </dd>
                </div>
                <div v-if="item.department" class="flex justify-between">
                  <dt class="text-gray-600">Department:</dt>
                  <dd class="font-medium text-gray-900">{{ item.department }}</dd>
                </div>
                <div v-if="item.project" class="flex justify-between">
                  <dt class="text-gray-600">Project:</dt>
                  <dd class="font-medium text-gray-900">{{ item.project }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Financial Information -->
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 class="text-md font-medium text-gray-900 mb-3">Financial Information</h4>
            <dl class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-600">Total Quantity:</dt>
                <dd class="font-medium text-gray-900">{{ item.totalQuantity }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Total Amount:</dt>
                <dd class="font-medium text-gray-900">
                  {{ formatCurrency(item.totalAmount, props.item.currency) }}
                </dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Exchange Rate:</dt>
                <dd class="font-medium text-gray-900">{{ item.exchangeRate }}</dd>
              </div>
            </dl>
          </div>

          <!-- Items -->
          <div class="mt-6">
            <h4 class="text-md font-medium text-gray-900 mb-3">Items</h4>
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
                      Description
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
                      Warehouse
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Batch/Lot
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="item in item.items" :key="item.id">
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                      <div class="text-sm text-gray-500">{{ item.itemName }}</div>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-900">{{ item.description || '-' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.quantity }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatCurrency(item.unitPrice, props.item.currency) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ formatCurrency(item.totalAmount, props.item.currency) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {{ item.warehouseCode }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div v-if="item.batchNumber" class="text-xs">
                        <div>Batch: {{ item.batchNumber }}</div>
                        <div v-if="item.lotNumber">Lot: {{ item.lotNumber }}</div>
                      </div>
                      <span v-else class="text-gray-400">-</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Remarks -->
          <div v-if="item.remarks" class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 class="text-md font-medium text-gray-900 mb-2">Remarks</h4>
            <p class="text-sm text-gray-700">{{ item.remarks }}</p>
          </div>

          <!-- Audit Information -->
          <div class="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 class="text-md font-medium text-gray-900 mb-3">Audit Information</h4>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div class="flex justify-between">
                <dt class="text-gray-600">Created By:</dt>
                <dd class="font-medium text-gray-900">{{ item.createdBy }}</dd>
              </div>
              <div class="flex justify-between">
                <dt class="text-gray-600">Created Date:</dt>
                <dd class="font-medium text-gray-900">{{ formatDateTime(item.createdDate) }}</dd>
              </div>
              <div v-if="item.modifiedBy" class="flex justify-between">
                <dt class="text-gray-600">Modified By:</dt>
                <dd class="font-medium text-gray-900">{{ item.modifiedBy }}</dd>
              </div>
              <div v-if="item.modifiedDate" class="flex justify-between">
                <dt class="text-gray-600">Modified Date:</dt>
                <dd class="font-medium text-gray-900">{{ formatDateTime(item.modifiedDate) }}</dd>
              </div>
              <div v-if="item.approvedBy" class="flex justify-between">
                <dt class="text-gray-600">Approved By:</dt>
                <dd class="font-medium text-gray-900">{{ item.approvedBy }}</dd>
              </div>
              <div v-if="item.approvedDate" class="flex justify-between">
                <dt class="text-gray-600">Approved Date:</dt>
                <dd class="font-medium text-gray-900">{{ formatDateTime(item.approvedDate) }}</dd>
              </div>
              <div v-if="item.postedBy" class="flex justify-between">
                <dt class="text-gray-600">Posted By:</dt>
                <dd class="font-medium text-gray-900">{{ item.postedBy }}</dd>
              </div>
              <div v-if="item.postedDate" class="flex justify-between">
                <dt class="text-gray-600">Posted Date:</dt>
                <dd class="font-medium text-gray-900">{{ formatDateTime(item.postedDate) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 pt-4 border-t border-gray-200 flex justify-end space-x-3">
          <button
            @click="$emit('close')"
            class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Close
          </button>
          <button
            @click="$emit('edit', item)"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GoodsReceipt } from '../types'

// Props
interface Props {
  item: GoodsReceipt
}

const props = defineProps<Props>()

// Emits
defineEmits<{
  close: []
  edit: [item: GoodsReceipt]
}>()

// Computed
const item = computed(() => props.item)

// Methods
const formatType = (type: string): string => {
  const typeMap: Record<string, string> = {
    receipt: 'Goods Receipt',
    issue: 'Goods Issue',
    transfer: 'Transfer',
    adjustment: 'Adjustment',
    return: 'Return',
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    draft: 'Draft',
    pending: 'Pending',
    approved: 'Approved',
    posted: 'Posted',
    cancelled: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatTransactionType = (type: string): string => {
  const typeMap: Record<string, string> = {
    inbound: 'Inbound',
    outbound: 'Outbound',
    internal: 'Internal',
  }
  return typeMap[type] || type
}

const formatDocumentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    purchase_order: 'Purchase Order',
    sales_order: 'Sales Order',
    transfer_order: 'Transfer Order',
    manual: 'Manual',
    adjustment: 'Adjustment',
  }
  return typeMap[type] || type
}

const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString()
}

const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString()
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const getStatusBadgeClass = (status: string): string => {
  const classMap: Record<string, string> = {
    draft: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    posted: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}
</script>
