<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">Credit Memo Details</h2>
          <p class="text-sm text-gray-600 mt-1">Credit Memo #{{ creditMemo?.creditMemoNumber }}</p>
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
            @click="$emit('refund')"
            class="btn-secondary flex items-center justify-center"
            v-if="creditMemo?.status === 'APPROVED'"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
            </svg>
            Process Refund
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Basic Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Customer & Reference Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Reference Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ creditMemo?.customerName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Original Invoice</label>
              <p class="mt-1 text-sm text-gray-900">{{ creditMemo?.originalInvoiceNumber }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Reason</label>
              <p class="mt-1 text-sm text-gray-900">{{ creditMemo?.reason }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Return/RMA Number</label>
              <p class="mt-1 text-sm text-gray-900">{{ creditMemo?.rmaNumber || 'N/A' }}</p>
            </div>
          </div>
        </div>

        <!-- Credit Memo Items -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Credit Memo Items</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit Amount</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in creditMemo?.items" :key="item.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4">
                    <div class="text-sm font-medium text-gray-900">{{ item.itemName }}</div>
                    <div class="text-sm text-gray-500">{{ item.itemCode }}</div>
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ item.quantity }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.unitPrice) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                    {{ formatCurrency(item.creditAmount) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Reason & Notes -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Reason & Notes</h3>
          <div class="space-y-4">
            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Credit Reason</h4>
              <p class="text-sm text-gray-700">{{ creditMemo?.reason }}</p>
            </div>
            <div v-if="creditMemo?.notes">
              <h4 class="text-sm font-medium text-gray-700 mb-2">Additional Notes</h4>
              <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ creditMemo.notes }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Information -->
      <div class="space-y-6">
        <!-- Credit Memo Status -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Credit Memo Status</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                :class="{
                  'bg-green-100 text-green-800': creditMemo?.status === 'APPROVED',
                  'bg-yellow-100 text-yellow-800': creditMemo?.status === 'PENDING',
                  'bg-blue-100 text-blue-800': creditMemo?.status === 'PROCESSED',
                  'bg-red-100 text-red-800': creditMemo?.status === 'REJECTED',
                  'bg-gray-100 text-gray-800': creditMemo?.status === 'DRAFT'
                }"
              >
                {{ formatStatus(creditMemo?.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Credit Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(creditMemo?.creditDate) }}</p>
            </div>
            <div v-if="creditMemo?.processedDate">
              <label class="block text-sm font-medium text-gray-700">Processed Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(creditMemo.processedDate) }}</p>
            </div>
            <div v-if="creditMemo?.approvedBy">
              <label class="block text-sm font-medium text-gray-700">Approved By</label>
              <p class="mt-1 text-sm text-gray-900">{{ creditMemo.approvedBy }}</p>
            </div>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Credit Summary</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Subtotal:</span>
              <span class="text-sm font-medium text-green-600">{{ formatCurrency(creditMemo?.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Tax Credit:</span>
              <span class="text-sm font-medium text-green-600">{{ formatCurrency(creditMemo?.taxCredit) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between">
                <span class="text-base font-semibold text-gray-900">Total Credit:</span>
                <span class="text-base font-semibold text-green-600">{{ formatCurrency(creditMemo?.totalCredit) }}</span>
              </div>
            </div>
            <div v-if="creditMemo?.refundAmount">
              <div class="flex justify-between">
                <span class="text-sm text-gray-600">Refund Processed:</span>
                <span class="text-sm font-medium text-blue-600">{{ formatCurrency(creditMemo.refundAmount) }}</span>
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
              Print Credit Memo
            </button>
            <button @click="$emit('email')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email to Customer
            </button>
            <button @click="$emit('apply')" class="w-full btn-secondary text-left" v-if="creditMemo?.status === 'APPROVED'">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Apply to Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface CreditMemoItem {
  id: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  creditAmount: number
}

interface CreditMemo {
  id: string
  creditMemoNumber: string
  customerName: string
  originalInvoiceNumber: string
  creditDate: string
  processedDate?: string
  status: 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'PROCESSED'
  reason: string
  rmaNumber?: string
  items: CreditMemoItem[]
  subtotal: number
  taxCredit: number
  totalCredit: number
  refundAmount?: number
  approvedBy?: string
  notes?: string
}

interface Props {
  creditMemo: CreditMemo | null
}

defineProps<Props>()

defineEmits<{
  edit: []
  refund: []
  print: []
  email: []
  apply: []
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
    case 'DRAFT':
      return 'Draft'
    case 'PENDING':
      return 'Pending Approval'
    case 'APPROVED':
      return 'Approved'
    case 'REJECTED':
      return 'Rejected'
    case 'PROCESSED':
      return 'Processed'
    default:
      return status
  }
}
</script>