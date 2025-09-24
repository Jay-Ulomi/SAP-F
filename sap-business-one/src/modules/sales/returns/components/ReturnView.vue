<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Sales Return Details</h2>
          <p class="text-sm text-gray-600 mt-1">Return #{{ returnItem?.returnNumber }}</p>
        </div>
        <div class="flex flex-col sm:flex-row gap-2">
          <button
            @click="$emit('edit')"
            class="btn-primary flex items-center justify-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit
          </button>
          <button
            @click="$emit('creditMemo')"
            class="btn-secondary flex items-center justify-center"
            v-if="returnItem?.status === 'APPROVED'"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Create Credit Memo
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Basic Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Return Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Return Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ returnItem?.customerName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Original Invoice</label>
              <p class="mt-1 text-sm text-gray-900">{{ returnItem?.originalInvoiceNumber }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Return Reason</label>
              <p class="mt-1 text-sm text-gray-900">{{ returnItem?.returnReason }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">RMA Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ returnItem?.rmaNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Returned Items -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Returned Items</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returned Qty</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Restockable</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in returnItem?.items" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.itemName }}</div>
                    <div class="text-sm text-gray-500">{{ item.itemCode }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.returnedQuantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': item.condition === 'GOOD',
                        'bg-yellow-100 text-yellow-800': item.condition === 'DAMAGED',
                        'bg-red-100 text-red-800': item.condition === 'DEFECTIVE'
                      }"
                    >
                      {{ formatCondition(item.condition) }}
                    </span>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': item.restockable,
                        'bg-red-100 text-red-800': !item.restockable
                      }"
                    >
                      {{ item.restockable ? 'Yes' : 'No' }}
                    </span>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.creditAmount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Return Details & Notes -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Return Details</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Return Reason</h4>
              <p class="text-sm text-gray-700">{{ returnItem?.returnReason }}</p>
            </div>
            <div v-if="returnItem?.customerNotes">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Customer Notes</h4>
              <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ returnItem.customerNotes }}</p>
            </div>
            <div v-if="returnItem?.inspectionNotes">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Inspection Notes</h4>
              <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ returnItem.inspectionNotes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Information -->
      <div class="space-y-6">
        <!-- Return Status -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Return Status</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                :class="{
                  'bg-green-100 text-green-800': returnItem?.status === 'APPROVED',
                  'bg-blue-100 text-blue-800': returnItem?.status === 'RECEIVED',
                  'bg-yellow-100 text-yellow-800': returnItem?.status === 'PENDING',
                  'bg-purple-100 text-purple-800': returnItem?.status === 'INSPECTING',
                  'bg-red-100 text-red-800': returnItem?.status === 'REJECTED',
                  'bg-gray-100 text-gray-800': returnItem?.status === 'CANCELLED'
                }"
              >
                {{ formatStatus(returnItem?.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Return Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(returnItem?.returnDate) }}</p>
            </div>
            <div v-if="returnItem?.receivedDate">
              <label class="block text-sm font-medium text-gray-700">Received Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(returnItem.receivedDate) }}</p>
            </div>
            <div v-if="returnItem?.processedBy">
              <label class="block text-sm font-medium text-gray-700">Processed By</label>
              <p class="mt-1 text-sm text-gray-900">{{ returnItem.processedBy }}</p>
            </div>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Return Summary</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Items Returned:</span>
              <span class="text-sm font-medium text-gray-900">{{ returnItem?.items?.length || 0 }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Total Credit:</span>
              <span class="text-sm font-medium text-green-600">{{ formatCurrency(returnItem?.totalCreditAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Restocking Fee:</span>
              <span class="text-sm font-medium text-red-600">-{{ formatCurrency(returnItem?.restockingFee) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between">
                <span class="text-base font-semibold text-gray-900">Net Credit:</span>
                <span class="text-base font-semibold text-green-600">{{ formatCurrency((returnItem?.totalCreditAmount || 0) - (returnItem?.restockingFee || 0)) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div class="space-y-2">
            <button @click="$emit('print')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
              </svg>
              Print Return Label
            </button>
            <button @click="$emit('approve')" class="w-full btn-secondary text-left" v-if="returnItem?.status === 'PENDING'">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Approve Return
            </button>
            <button @click="$emit('restock')" class="w-full btn-secondary text-left" v-if="returnItem?.status === 'APPROVED'">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.79 4 8.5 4s8.5-1.79 8.5-4V7M4 7c0 2.21 3.79 4 8.5 4s8.5-1.79 8.5-4M4 7c0-2.21 3.79-4 8.5-4s8.5 1.79 8.5 4"></path>
              </svg>
              Restock Items
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ReturnItem {
  id: string
  itemCode: string
  itemName: string
  returnedQuantity: number
  condition: 'GOOD' | 'DAMAGED' | 'DEFECTIVE'
  restockable: boolean
  creditAmount: number
}

interface Return {
  id: string
  returnNumber: string
  customerName: string
  originalInvoiceNumber: string
  rmaNumber: string
  returnDate: string
  receivedDate?: string
  status: 'PENDING' | 'APPROVED' | 'RECEIVED' | 'INSPECTING' | 'REJECTED' | 'CANCELLED'
  returnReason: string
  items: ReturnItem[]
  totalCreditAmount: number
  restockingFee: number
  customerNotes?: string
  inspectionNotes?: string
  processedBy?: string
}

interface Props {
  returnItem: Return | null
}

defineProps<Props>()

defineEmits<{
  edit: []
  creditMemo: []
  print: []
  approve: []
  restock: []
}>()

const formatCurrency = (amount: number | undefined): string => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '$0.00'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'RECEIVED':
      return 'Received'
    case 'INSPECTING':
      return 'Inspecting'
    case 'REJECTED':
      return 'Rejected'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

const formatCondition = (condition: string): string => {
  switch (condition) {
    case 'GOOD':
      return 'Good'
    case 'DAMAGED':
      return 'Damaged'
    case 'DEFECTIVE':
      return 'Defective'
    default:
      return condition
  }
}
</script>