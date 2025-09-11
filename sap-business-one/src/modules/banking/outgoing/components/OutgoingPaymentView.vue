<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Payment {{ payment.paymentNumber }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(payment.paymentDate) }} • {{ payment.vendorName }}
          </p>
        </div>
        <div class="flex items-center space-x-2">
          <span
            :class="getStatusClasses(payment.status)"
            class="px-3 py-1 text-xs font-medium rounded-full"
          >
            {{ formatStatus(payment.status) }}
          </span>
        </div>
      </div>
    </div>
    <!-- Payment Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Payment Information
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Payment Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(payment.paymentDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Due Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(payment.dueDate) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Amount:</span>
              <span class="text-sm font-bold text-red-600">
                {{ formatCurrency(payment.amount, payment.currency) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Payment Type:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatPaymentType(payment.paymentType) }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Purpose:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatPaymentPurpose(payment.paymentPurpose) }}
              </span>
            </div>
          </div>
        </div>
        <!-- Vendor & Bank Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Vendor & Bank Details
          </h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Vendor:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.vendorName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Vendor ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.vendorId }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Bank Account:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.bankAccountName }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Reference:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.referenceNumber || 'N/A' }}
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Currency:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.currency }}
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- Applied Purchase Orders -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Applied Purchase Orders
        </h4>
        <div v-if="payment.appliedPurchaseOrders.length > 0" class="space-y-3">
          <div
            v-for="po in payment.appliedPurchaseOrders"
            :key="po.poId"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ po.poNumber }}
                </p>
                <p class="text-xs text-gray-500">PO Date: {{ formatDate(po.poDate) }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(po.appliedAmount, payment.currency) }}
                </p>
                <p class="text-xs text-gray-500">
                  Applied: {{ formatCurrency(po.appliedAmount, payment.currency) }}
                </p>
              </div>
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-500">
              <span>Original: {{ formatCurrency(po.originalAmount, payment.currency) }}</span>
              <span v-if="po.discountAmount > 0">
                Discount: {{ formatCurrency(po.discountAmount, payment.currency) }}
              </span>
              <span v-if="po.writeOffAmount > 0">
                Write-off: {{ formatCurrency(po.writeOffAmount, payment.currency) }}
              </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-6 text-gray-500">
          <p class="text-sm">No purchase orders applied to this payment</p>
        </div>
      </div>
      <!-- Fees -->
      <div v-if="payment.fees.length > 0" class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">Payment Fees</h4>
        <div class="space-y-3">
          <div
            v-for="fee in payment.fees"
            :key="fee.id"
            class="flex justify-between items-center bg-red-50 rounded-lg p-3"
          >
            <div>
              <p class="text-sm font-medium text-gray-900">{{ fee.description }}</p>
              <p class="text-xs text-gray-500">{{ fee.feeType }}</p>
            </div>
            <span class="text-sm font-medium text-red-600">
              {{ formatCurrency(fee.amount, payment.currency) }}
            </span>
          </div>
        </div>
      </div>
      <!-- Notes & Metadata -->
      <div class="mt-8 space-y-4">
        <div v-if="payment.description">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">
            Description
          </h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ payment.description }}
          </p>
        </div>
        <div v-if="payment.notes">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-2">Notes</h4>
          <p class="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {{ payment.notes }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-500">
          <div><span class="font-medium">Created by:</span> {{ payment.createdBy }}</div>
          <div>
            <span class="font-medium">Created at:</span> {{ formatDate(payment.createdAt) }}
          </div>
          <div>
            <span class="font-medium">Updated at:</span> {{ formatDate(payment.updatedAt) }}
          </div>
          <div v-if="payment.processedDate">
            <span class="font-medium">Processed at:</span> {{ formatDate(payment.processedDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OutgoingPayment } from '../types'
import { OutgoingPaymentType, OutgoingPaymentStatus, OutgoingPaymentPurpose } from '../types'

interface Props {
  payment: OutgoingPayment
}

defineProps<Props>()

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

const formatStatus = (status: OutgoingPaymentStatus) => {
  const statusMap = {
    [OutgoingPaymentStatus.PENDING]: 'Pending',
    [OutgoingPaymentStatus.AUTHORIZED]: 'Authorized',
    [OutgoingPaymentStatus.PROCESSING]: 'Processing',
    [OutgoingPaymentStatus.COMPLETED]: 'Completed',
    [OutgoingPaymentStatus.FAILED]: 'Failed',
    [OutgoingPaymentStatus.CANCELLED]: 'Cancelled',
    [OutgoingPaymentStatus.REJECTED]: 'Rejected',
    [OutgoingPaymentStatus.ON_HOLD]: 'On Hold',
  }
  return statusMap[status] || status
}

const formatPaymentType = (type: OutgoingPaymentType) => {
  const typeMap = {
    [OutgoingPaymentType.BANK_TRANSFER]: 'Bank Transfer',
    [OutgoingPaymentType.CHECK]: 'Check',
    [OutgoingPaymentType.CASH]: 'Cash',
    [OutgoingPaymentType.WIRE_TRANSFER]: 'Wire Transfer',
    [OutgoingPaymentType.ACH]: 'ACH',
    [OutgoingPaymentType.CREDIT_CARD]: 'Credit Card',
    [OutgoingPaymentType.DEBIT_CARD]: 'Debit Card',
    [OutgoingPaymentType.PAYPAL]: 'PayPal',
    [OutgoingPaymentType.OTHER]: 'Other',
  }
  return typeMap[type] || type
}

const formatPaymentPurpose = (purpose: OutgoingPaymentPurpose) => {
  const purposeMap = {
    [OutgoingPaymentPurpose.VENDOR_PAYMENT]: 'Vendor Payment',
    [OutgoingPaymentPurpose.SUPPLIER_PAYMENT]: 'Supplier Payment',
    [OutgoingPaymentPurpose.EXPENSE_REIMBURSEMENT]: 'Expense Reimbursement',
    [OutgoingPaymentPurpose.LOAN_PAYMENT]: 'Loan Payment',
    [OutgoingPaymentPurpose.TAX_PAYMENT]: 'Tax Payment',
    [OutgoingPaymentPurpose.INSURANCE_PAYMENT]: 'Insurance Payment',
    [OutgoingPaymentPurpose.UTILITY_PAYMENT]: 'Utility Payment',
    [OutgoingPaymentPurpose.RENT_PAYMENT]: 'Rent Payment',
    [OutgoingPaymentPurpose.SALARY_PAYMENT]: 'Salary Payment',
    [OutgoingPaymentPurpose.OTHER]: 'Other',
  }
  return purposeMap[purpose] || purpose
}

const getStatusClasses = (status: OutgoingPaymentStatus) => {
  const statusClasses = {
    [OutgoingPaymentStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [OutgoingPaymentStatus.AUTHORIZED]: 'bg-blue-100 text-blue-800',
    [OutgoingPaymentStatus.PROCESSING]: 'bg-orange-100 text-orange-800',
    [OutgoingPaymentStatus.COMPLETED]: 'bg-green-100 text-green-800',
    [OutgoingPaymentStatus.FAILED]: 'bg-red-100 text-red-800',
    [OutgoingPaymentStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [OutgoingPaymentStatus.REJECTED]: 'bg-red-100 text-red-800',
    [OutgoingPaymentStatus.ON_HOLD]: 'bg-yellow-100 text-yellow-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
