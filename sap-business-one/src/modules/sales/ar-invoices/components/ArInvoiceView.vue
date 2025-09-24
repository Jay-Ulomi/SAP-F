<template>
  <div class="space-y-6 p-4 sm:p-6">
    <!-- Header -->
    <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold text-gray-900">A/R Invoice Details</h2>
          <p class="text-sm text-gray-600 mt-1">Invoice #{{ invoice?.invoiceNumber }}</p>
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
            @click="$emit('payment')"
            class="btn-secondary flex items-center justify-center"
            :disabled="invoice?.status === 'PAID'"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            Record Payment
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Basic Information -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Customer Information -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Customer Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer</label>
              <p class="mt-1 text-sm text-gray-900">{{ invoice?.customerName }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer Code</label>
              <p class="mt-1 text-sm text-gray-900">{{ invoice?.customerCode }}</p>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700">Billing Address</label>
              <p class="mt-1 text-sm text-gray-900">{{ invoice?.billingAddress }}</p>
            </div>
            <div v-if="invoice?.deliveryNumber">
              <label class="block text-sm font-medium text-gray-700">Related Delivery</label>
              <p class="mt-1 text-sm text-gray-900">{{ invoice.deliveryNumber }}</p>
            </div>
            <div v-if="invoice?.poNumber">
              <label class="block text-sm font-medium text-gray-700">Customer PO</label>
              <p class="mt-1 text-sm text-gray-900">{{ invoice.poNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Invoice Items -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Invoice Items</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="item in invoice?.items" :key="item.id" class="hover:bg-gray-50">
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
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.taxAmount) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(item.lineTotal) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Payment History -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6" v-if="invoice?.payments?.length">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="payment in invoice.payments" :key="payment.id" class="hover:bg-gray-50">
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatDate(payment.paymentDate) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ payment.paymentMethod }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {{ formatCurrency(payment.amount) }}
                  </td>
                  <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ payment.reference }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Terms and Notes -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6" v-if="invoice?.terms || invoice?.notes">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Terms & Notes</h3>
          <div v-if="invoice?.terms" class="mb-4">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Payment Terms</h4>
            <p class="text-sm text-gray-700">{{ invoice.terms }}</p>
          </div>
          <div v-if="invoice?.notes">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Notes</h4>
            <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ invoice.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar Information -->
      <div class="space-y-6">
        <!-- Invoice Status -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Invoice Status</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700">Status</label>
              <span
                class="inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1"
                :class="{
                  'bg-green-100 text-green-800': invoice?.status === 'PAID',
                  'bg-yellow-100 text-yellow-800': invoice?.status === 'PARTIAL',
                  'bg-red-100 text-red-800': invoice?.status === 'OVERDUE',
                  'bg-blue-100 text-blue-800': invoice?.status === 'OPEN',
                  'bg-gray-100 text-gray-800': invoice?.status === 'CANCELLED'
                }"
              >
                {{ formatStatus(invoice?.status) }}
              </span>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(invoice?.invoiceDate) }}</p>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Due Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(invoice?.dueDate) }}</p>
            </div>
            <div v-if="invoice?.paidDate">
              <label class="block text-sm font-medium text-gray-700">Paid Date</label>
              <p class="mt-1 text-sm text-gray-900">{{ formatDate(invoice.paidDate) }}</p>
            </div>
          </div>
        </div>

        <!-- Financial Summary -->
        <div class="bg-white rounded-lg shadow border p-4 sm:p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h3>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Subtotal:</span>
              <span class="text-sm font-medium text-gray-900">{{ formatCurrency(invoice?.subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Tax Amount:</span>
              <span class="text-sm font-medium text-gray-900">{{ formatCurrency(invoice?.taxAmount) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Discount:</span>
              <span class="text-sm font-medium text-gray-900">-{{ formatCurrency(invoice?.discountAmount) }}</span>
            </div>
            <div class="border-t border-gray-200 pt-3">
              <div class="flex justify-between">
                <span class="text-base font-semibold text-gray-900">Total:</span>
                <span class="text-base font-semibold text-gray-900">{{ formatCurrency(invoice?.total) }}</span>
              </div>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-600">Paid Amount:</span>
              <span class="text-sm font-medium text-green-600">{{ formatCurrency(invoice?.paidAmount) }}</span>
            </div>
            <div class="flex justify-between border-t border-gray-200 pt-2">
              <span class="text-sm font-medium text-gray-700">Outstanding:</span>
              <span class="text-sm font-medium text-red-600">{{ formatCurrency((invoice?.total || 0) - (invoice?.paidAmount || 0)) }}</span>
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
              Print Invoice
            </button>
            <button @click="$emit('email')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email Invoice
            </button>
            <button @click="$emit('creditMemo')" class="w-full btn-secondary text-left">
              <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
              Create Credit Memo
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface InvoiceItem {
  id: string
  itemCode: string
  itemName: string
  quantity: number
  unitPrice: number
  taxAmount: number
  lineTotal: number
}

interface Payment {
  id: string
  paymentDate: string
  paymentMethod: string
  amount: number
  reference: string
}

interface Invoice {
  id: string
  invoiceNumber: string
  customerName: string
  customerCode: string
  billingAddress: string
  invoiceDate: string
  dueDate: string
  paidDate?: string
  status: 'OPEN' | 'PARTIAL' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  items: InvoiceItem[]
  payments?: Payment[]
  subtotal: number
  taxAmount: number
  discountAmount: number
  total: number
  paidAmount: number
  deliveryNumber?: string
  poNumber?: string
  terms?: string
  notes?: string
}

interface Props {
  invoice: Invoice | null
}

defineProps<Props>()

defineEmits<{
  edit: []
  payment: []
  print: []
  email: []
  creditMemo: []
}>()

const formatCurrency = (amount: number): string => {
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
    case 'OPEN':
      return 'Open'
    case 'PARTIAL':
      return 'Partially Paid'
    case 'PAID':
      return 'Paid'
    case 'OVERDUE':
      return 'Overdue'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}
</script>