<template>
  <div class="space-y-6">
    <!-- Header with receipt summary -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ receipt.receiptNumber }}</h2>
          <p class="text-sm text-gray-600 mt-1">Receipt ID: {{ receipt.id }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <span
              :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                getStatusColor(receipt.status)
              ]"
            >
              {{ formatStatus(receipt.status) }}
            </span>
            <span
              :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                getQualityStatusColor(receipt.qualityStatus)
              ]"
            >
              {{ formatQualityStatus(receipt.qualityStatus) }}
            </span>
            <span class="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-800">
              {{ formatType(receipt.type) }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-indigo-600">{{ receipt.receivedQuantity }}/{{ receipt.plannedQuantity }}</p>
          <p class="text-sm text-gray-500">Units Received</p>
          <p class="text-lg font-semibold text-gray-900 mt-2">{{ receipt.yieldPercentage }}% Yield</p>
        </div>
      </div>
    </div>

    <!-- Key Information Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Production Information -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Production Information</h3>
        <dl class="space-y-3">
          <div v-if="receipt.productionOrderNumber">
            <dt class="text-sm font-medium text-gray-500">Production Order</dt>
            <dd class="text-sm text-gray-900">{{ receipt.productionOrderNumber }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Item Code</dt>
            <dd class="text-sm text-gray-900 font-medium">{{ receipt.itemCode }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Item Name</dt>
            <dd class="text-sm text-gray-900">{{ receipt.itemName }}</dd>
          </div>
          <div v-if="receipt.bomCode">
            <dt class="text-sm font-medium text-gray-500">BOM Reference</dt>
            <dd class="text-sm text-gray-900">{{ receipt.bomCode }} {{ receipt.bomVersion ? `(${receipt.bomVersion})` : '' }}</dd>
          </div>
        </dl>
      </div>

      <!-- Receipt Information -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Receipt Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Receipt Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(receipt.receiptDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="receipt.plannedReceiptDate">
            <dt class="text-sm font-medium text-gray-500">Planned Receipt Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(receipt.plannedReceiptDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="receipt.completionDate">
            <dt class="text-sm font-medium text-gray-500">Completion Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(receipt.completionDate).toLocaleDateString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Warehouse</dt>
            <dd class="text-sm text-gray-900">{{ receipt.warehouseName || receipt.warehouseCode }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Quantity and Cost Information -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quantities</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Planned Quantity</dt>
            <dd class="text-lg font-semibold text-gray-900">{{ receipt.plannedQuantity }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Received Quantity</dt>
            <dd class="text-lg font-semibold text-green-600">{{ receipt.receivedQuantity }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Remaining Quantity</dt>
            <dd class="text-lg font-semibold text-orange-600">{{ receipt.remainingQuantity }}</dd>
          </div>
          <div v-if="receipt.scrapQuantity">
            <dt class="text-sm font-medium text-gray-500">Scrap Quantity</dt>
            <dd class="text-lg font-semibold text-red-600">{{ receipt.scrapQuantity }}</dd>
          </div>
        </dl>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Cost Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Cost</dt>
            <dd class="text-lg font-semibold text-gray-900">${{ receipt.totalCost?.toLocaleString() || '0' }}</dd>
          </div>
          <div v-if="receipt.receivedQuantity > 0">
            <dt class="text-sm font-medium text-gray-500">Unit Cost</dt>
            <dd class="text-lg font-semibold text-gray-900">
              ${{ (receipt.totalCost / receipt.receivedQuantity).toFixed(2) }}
            </dd>
          </div>
        </dl>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Approval Information</h3>
        <dl class="space-y-3">
          <div v-if="receipt.receivedBy">
            <dt class="text-sm font-medium text-gray-500">Received By</dt>
            <dd class="text-sm text-gray-900">{{ receipt.receivedBy }}</dd>
          </div>
          <div v-if="receipt.receivedAt">
            <dt class="text-sm font-medium text-gray-500">Received At</dt>
            <dd class="text-sm text-gray-900">{{ new Date(receipt.receivedAt).toLocaleString() }}</dd>
          </div>
          <div v-if="receipt.approvedBy">
            <dt class="text-sm font-medium text-gray-500">Approved By</dt>
            <dd class="text-sm text-gray-900">{{ receipt.approvedBy }}</dd>
          </div>
          <div v-if="receipt.approvedAt">
            <dt class="text-sm font-medium text-gray-500">Approved At</dt>
            <dd class="text-sm text-gray-900">{{ new Date(receipt.approvedAt).toLocaleString() }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Items Table -->
    <div v-if="receipt.items && receipt.items.length > 0" class="bg-white rounded-lg border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Receipt Items</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Planned</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Received</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quality</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in receipt.items" :key="item.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                  <div class="text-sm text-gray-500">{{ item.itemName }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.plannedQuantity }} {{ item.unit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.receivedQuantity }} {{ item.unit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ item.unitCost?.toFixed(2) || '0.00' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ item.totalCost?.toLocaleString() || '0' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getQualityStatusColor(item.qualityStatus)
                  ]"
                >
                  {{ formatQualityStatus(item.qualityStatus) }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Remarks Section -->
    <div v-if="receipt.remarks || receipt.scrapReason" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
      <div class="space-y-4">
        <div v-if="receipt.remarks">
          <h4 class="text-sm font-medium text-gray-700">Remarks</h4>
          <p class="text-sm text-gray-900 mt-1 whitespace-pre-wrap">{{ receipt.remarks }}</p>
        </div>
        <div v-if="receipt.scrapReason">
          <h4 class="text-sm font-medium text-gray-700">Scrap Reason</h4>
          <p class="text-sm text-red-600 mt-1">{{ receipt.scrapReason }}</p>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex justify-end space-x-3 pt-4">
      <button
        @click="printReceipt"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Print Receipt
      </button>
      <button
        @click="exportReceipt"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Export
      </button>
      <button
        v-if="receipt.status !== 'closed'"
        @click="editReceipt"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Edit Receipt
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductionReceipt } from '../types'

interface Props {
  receipt: ProductionReceipt
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [receipt: ProductionReceipt]
  export: [receipt: ProductionReceipt]
  print: [receipt: ProductionReceipt]
}>()

// Helper functions
function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatQualityStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'open': return 'bg-blue-100 text-blue-800'
    case 'partially_received': return 'bg-yellow-100 text-yellow-800'
    case 'fully_received': return 'bg-green-100 text-green-800'
    case 'closed': return 'bg-purple-100 text-purple-800'
    case 'cancelled': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getQualityStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'approved': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    case 'on_hold': return 'bg-orange-100 text-orange-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function editReceipt() {
  emit('edit', props.receipt)
}

function exportReceipt() {
  emit('export', props.receipt)
}

function printReceipt() {
  emit('print', props.receipt)
  window.print()
}
</script>