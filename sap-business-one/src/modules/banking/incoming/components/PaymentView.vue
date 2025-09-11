<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">Payment {{ payment.paymentNumber }}</h3>
          <p class="text-sm text-gray-500">
            {{ formatDate(payment.paymentDate) }} • {{ payment.customerName }}
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
              <span class="text-sm text-gray-500">Received Date:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatDate(payment.receivedDate) }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Amount:</span>
              <span class="text-sm font-bold text-green-600">
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
              <span class="text-sm text-gray-500">Source:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ formatPaymentSource(payment.paymentSource) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Customer & Bank Information -->
        <div class="space-y-4">
          <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide">
            Customer & Bank Details
          </h4>

          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Customer:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.customerName }}
              </span>
            </div>

            <div class="flex justify-between">
              <span class="text-sm text-gray-500">Customer ID:</span>
              <span class="text-sm font-medium text-gray-900">
                {{ payment.customerId }}
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

      <!-- Applied Invoices -->
      <div class="mt-8">
        <h4 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-4">
          Applied Invoices
        </h4>

        <div v-if="payment.appliedInvoices.length > 0" class="space-y-3">
          <div
            v-for="invoice in payment.appliedInvoices"
            :key="invoice.invoiceId"
            class="bg-gray-50 rounded-lg p-4"
          >
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ invoice.invoiceNumber }}
                </p>
                <p class="text-xs text-gray-500">
                  Invoice Date: {{ formatDate(invoice.invoiceDate) }}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(invoice.appliedAmount, payment.currency) }}
                </p>
                <p class="text-xs text-gray-500">
                  Applied: {{ formatCurrency(invoice.appliedAmount, payment.currency) }}
                </p>
              </div>
            </div>

            <div class="mt-2 flex justify-between text-xs text-gray-500">
              <span>Original: {{ formatCurrency(invoice.originalAmount, payment.currency) }}</span>
              <span v-if="invoice.discountAmount > 0">
                Discount: {{ formatCurrency(invoice.discountAmount, payment.currency) }}
              </span>
              <span v-if="invoice.writeOffAmount > 0">
                Write-off: {{ formatCurrency(invoice.writeOffAmount, payment.currency) }}
              </span>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-6 text-gray-500">
          <p class="text-sm">No invoices applied to this payment</p>
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
          <div v-if="payment.clearedDate">
            <span class="font-medium">Cleared at:</span> {{ formatDate(payment.clearedDate) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IncomingPayment } from '../types'
import { PaymentType, PaymentStatus, PaymentSource } from '../types'

interface Props {
  payment: IncomingPayment
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

const formatStatus = (status: PaymentStatus) => {
  const statusMap = {
    [PaymentStatus.PENDING]: 'Pending',
    [PaymentStatus.RECEIVED]: 'Received',
    [PaymentStatus.PROCESSING]: 'Processing',
    [PaymentStatus.CLEARED]: 'Cleared',
    [PaymentStatus.BOUNCED]: 'Bounced',
    [PaymentStatus.RETURNED]: 'Returned',
    [PaymentStatus.CANCELLED]: 'Cancelled',
    [PaymentStatus.RECONCILED]: 'Reconciled',
  }
  return statusMap[status] || status
}

const formatPaymentType = (type: PaymentType) => {
  const typeMap = {
    [PaymentType.CASH]: 'Cash',
    [PaymentType.CHECK]: 'Check',
    [PaymentType.BANK_TRANSFER]: 'Bank Transfer',
    [PaymentType.CREDIT_CARD]: 'Credit Card',
    [PaymentType.DEBIT_CARD]: 'Debit Card',
    [PaymentType.WIRE_TRANSFER]: 'Wire Transfer',
    [PaymentType.ACH]: 'ACH',
    [PaymentType.PAYPAL]: 'PayPal',
    [PaymentType.OTHER]: 'Other',
  }
  return typeMap[type] || type
}

const formatPaymentSource = (source: PaymentSource) => {
  const sourceMap = {
    [PaymentSource.CUSTOMER_PAYMENT]: 'Customer Payment',
    [PaymentSource.REFUND]: 'Refund',
    [PaymentSource.INTEREST]: 'Interest',
    [PaymentSource.DIVIDEND]: 'Dividend',
    [PaymentSource.LOAN_REPAYMENT]: 'Loan Repayment',
    [PaymentSource.INVESTMENT_RETURN]: 'Investment Return',
    [PaymentSource.OTHER_INCOME]: 'Other Income',
  }
  return sourceMap[source] || source
}

const getStatusClasses = (status: PaymentStatus) => {
  const statusClasses = {
    [PaymentStatus.PENDING]: 'bg-gray-100 text-gray-800',
    [PaymentStatus.RECEIVED]: 'bg-blue-100 text-blue-800',
    [PaymentStatus.PROCESSING]: 'bg-yellow-100 text-yellow-800',
    [PaymentStatus.CLEARED]: 'bg-green-100 text-green-800',
    [PaymentStatus.BOUNCED]: 'bg-red-100 text-red-800',
    [PaymentStatus.RETURNED]: 'bg-orange-100 text-orange-800',
    [PaymentStatus.CANCELLED]: 'bg-red-100 text-red-800',
    [PaymentStatus.RECONCILED]: 'bg-purple-100 text-purple-800',
  }
  return statusClasses[status] || 'bg-gray-100 text-gray-800'
}
</script>
