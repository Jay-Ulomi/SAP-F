<template>
  <div class="space-y-6">
    <!-- Header Information - Invoice Style -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <!-- Left Section: Document Info -->
        <div class="flex-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-blue-100 rounded-lg">
              <svg
                class="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ payment.paymentNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ payment.docNum }} | Entry: {{ payment.docEntry }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section: Status and Total -->
        <div class="flex flex-col items-end space-y-2">
          <span
            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': payment.status === 'PENDING',
              'bg-blue-100 text-blue-800': payment.status === 'APPROVED',
              'bg-purple-100 text-purple-800': payment.status === 'PROCESSED',
              'bg-green-100 text-green-800': payment.status === 'COMPLETED',
              'bg-red-100 text-red-800': payment.status === 'FAILED',
              'bg-gray-100 text-gray-800': payment.status === 'CANCELLED',
              'bg-orange-100 text-orange-800': payment.status === 'ON_HOLD',
            }"
          >
            {{ formatStatus(payment.status) }}
          </span>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">{{ formatCurrency(payment.amount) }}</p>
            <p class="text-sm text-gray-600">{{ payment.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Payment Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(payment.paymentDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Vendor</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ payment.vendorName }}</p>
          <p class="text-xs text-gray-600">{{ payment.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ payment.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Exchange Rate</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ payment.exchangeRate }}</p>
        </div>

        <!-- Row 2 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Posting Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(payment.postingDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Due Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(payment.dueDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Payment Method</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatPaymentMethod(payment.paymentMethod) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Payment Type</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatPaymentType(payment.paymentType) }}
          </p>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="
          payment.referenceNumber || payment.checkNumber || payment.bankAccount || payment.bankName
        "
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-if="payment.referenceNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Reference Number</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ payment.referenceNumber }}</p>
          </div>
          <div v-if="payment.checkNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Check Number</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ payment.checkNumber }}</p>
          </div>
          <div v-if="payment.bankAccount">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Bank Account</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ payment.bankAccount }}</p>
          </div>
          <div v-if="payment.bankName">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Bank Name</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ payment.bankName }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Applied Invoices -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Applied Invoices
      </h4>

      <div v-if="payment.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No invoices applied to this payment.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Invoice Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Applied Amount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remaining Balance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in payment.lineItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.invoiceNumber }}</div>
                <div class="text-sm text-gray-500">{{ item.invoiceId }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.invoiceAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.appliedAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.remainingBalance) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.discountAmount) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.taxAmount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Financial Summary -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          ></path>
        </svg>
        Financial Summary
      </h4>

      <div class="flex justify-end">
        <div class="w-64 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Applied:</span>
            <span class="font-medium">{{ formatCurrency(payment.totalApplied) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Discount:</span>
            <span class="font-medium">{{ formatCurrency(payment.totalDiscount) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(payment.totalTax) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Net Amount:</span>
            <span>{{ formatCurrency(payment.netAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Information -->
    <div
      v-if="payment.approvalNotes || payment.approvalDate || payment.approvedBy"
      class="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Approval Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-if="payment.approvalDate">
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(payment.approvalDate) }}</p>
        </div>
        <div v-if="payment.approvedBy">
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ payment.approvedBy }}</p>
        </div>
        <div v-if="payment.approvalNotes">
          <label class="block text-sm font-medium text-gray-700">Approval Notes</label>
          <p class="mt-1 text-sm text-gray-900">{{ payment.approvalNotes }}</p>
        </div>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        Additional Information
      </h4>

      <div v-if="payment.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ payment.notes }}</p>
      </div>

      <!-- Timestamps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(payment.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(payment.updatedAt) }}
        </div>
        <div>
          <span class="font-medium">Last Activity:</span> {{ formatDate(payment.lastActivityDate) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Payment } from '../types'

interface Props {
  payment: Payment
}

defineProps<Props>()

// Utility functions
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
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'PROCESSED':
      return 'Processed'
    case 'COMPLETED':
      return 'Completed'
    case 'FAILED':
      return 'Failed'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatPaymentMethod = (method: string): string => {
  switch (method) {
    case 'BANK_TRANSFER':
      return 'Bank Transfer'
    case 'CHECK':
      return 'Check'
    case 'CASH':
      return 'Cash'
    case 'CREDIT_CARD':
      return 'Credit Card'
    case 'WIRE_TRANSFER':
      return 'Wire Transfer'
    case 'ACH':
      return 'ACH'
    case 'OTHER':
      return 'Other'
    default:
      return method
  }
}

const formatPaymentType = (type: string): string => {
  switch (type) {
    case 'INVOICE_PAYMENT':
      return 'Invoice Payment'
    case 'CREDIT_MEMO_APPLICATION':
      return 'Credit Memo Application'
    case 'ADVANCE_PAYMENT':
      return 'Advance Payment'
    case 'REFUND':
      return 'Refund'
    case 'ADJUSTMENT':
      return 'Adjustment'
    default:
      return type
  }
}
</script>
