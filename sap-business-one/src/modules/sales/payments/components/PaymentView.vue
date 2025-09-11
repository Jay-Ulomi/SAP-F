<template>
  <div class="payment-view">
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Payment {{ payment.paymentNumber }}
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Payment details and information
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <span :class="getStatusBadgeClass(payment.status)">
              {{ formatStatus(payment.status) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="px-4 py-5 sm:p-6">
        <dl class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <!-- Payment Information -->
          <div class="md:col-span-2">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Payment Information</h4>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Payment Number</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ payment.paymentNumber }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Payment Date</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatDate(payment.paymentDate) }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Amount</dt>
            <dd class="mt-1 text-sm text-gray-900 font-semibold">${{ formatAmount(payment.amount) }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Payment Method</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ formatPaymentMethod(payment.paymentMethod) }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Reference Number</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ payment.reference || 'N/A' }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Status</dt>
            <dd class="mt-1">
              <span :class="getStatusBadgeClass(payment.status)">
                {{ formatStatus(payment.status) }}
              </span>
            </dd>
          </div>

          <!-- Customer Information -->
          <div class="md:col-span-2 mt-6">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Customer Information</h4>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Customer Code</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ payment.customerCode }}</dd>
          </div>

          <div>
            <dt class="text-sm font-medium text-gray-500">Customer Name</dt>
            <dd class="mt-1 text-sm text-gray-900">{{ payment.customerName }}</dd>
          </div>

          <!-- Bank Details (if bank transfer) -->
          <div v-if="payment.paymentMethod === 'bank_transfer' && payment.bankDetails" class="md:col-span-2 mt-6">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Bank Transfer Details</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Bank Name</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ payment.bankDetails.bankName || 'N/A' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Account Number</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ payment.bankDetails.accountNumber || 'N/A' }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Check Details (if check) -->
          <div v-if="payment.paymentMethod === 'check' && payment.checkDetails" class="md:col-span-2 mt-6">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">Check Details</h4>
            <div class="bg-gray-50 rounded-lg p-4">
              <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Check Number</dt>
                  <dd class="mt-1 text-sm text-gray-900">{{ payment.checkDetails.checkNumber || 'N/A' }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Check Date</dt>
                  <dd class="mt-1 text-sm text-gray-900">
                    {{ payment.checkDetails.checkDate ? formatDate(payment.checkDetails.checkDate) : 'N/A' }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="payment.notes" class="md:col-span-2 mt-6">
            <dt class="text-sm font-medium text-gray-500 mb-2">Notes</dt>
            <dd class="text-sm text-gray-900 bg-gray-50 rounded-lg p-4">
              {{ payment.notes }}
            </dd>
          </div>

          <!-- Timestamps -->
          <div class="md:col-span-2 mt-6 pt-4 border-t border-gray-200">
            <h4 class="text-sm font-semibold text-gray-900 mb-3">System Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="payment.createdAt">
                <dt class="text-sm font-medium text-gray-500">Created</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.createdAt) }}</dd>
              </div>
              <div v-if="payment.updatedAt">
                <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDateTime(payment.updatedAt) }}</dd>
              </div>
              <div v-if="payment.createdBy">
                <dt class="text-sm font-medium text-gray-500">Created By</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ payment.createdBy }}</dd>
              </div>
              <div v-if="payment.updatedBy">
                <dt class="text-sm font-medium text-gray-500">Updated By</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ payment.updatedBy }}</dd>
              </div>
            </div>
          </div>
        </dl>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex justify-center space-x-3">
      <button
        type="button"
        @click="printPayment"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        Print
      </button>

      <button
        type="button"
        @click="downloadReceipt"
        class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        Download Receipt
      </button>

      <button
        v-if="payment.status !== 'completed' && payment.status !== 'cancelled'"
        type="button"
        @click="processPayment"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
        {{ payment.status === 'pending' ? 'Process Payment' : 'Complete Payment' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  payment: any
}

defineProps<Props>()

// Methods
const formatStatus = (status: string): string => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatPaymentMethod = (method: string): string => {
  const methods = {
    cash: 'Cash',
    check: 'Check',
    credit_card: 'Credit Card',
    bank_transfer: 'Bank Transfer',
    online: 'Online Payment'
  }
  return methods[method] || method
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatAmount = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const getStatusBadgeClass = (status: string): string => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'completed':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'failed':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'cancelled':
      return `${baseClasses} bg-gray-100 text-gray-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const printPayment = (): void => {
  window.print()
}

const downloadReceipt = (): void => {
  console.log('Downloading receipt for payment')
}

const processPayment = (): void => {
  console.log('Processing payment')
}
</script>

<style scoped>
.payment-view {
  max-width: 100%;
}

@media print {
  .payment-view button {
    display: none;
  }
}
</style>