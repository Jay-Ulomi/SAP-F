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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ invoice.invoiceNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ invoice.docNum }} | Entry: {{ invoice.docEntry }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section: Status and Total -->
        <div class="flex flex-col items-end space-y-2">
          <span
            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': invoice.status === 'DRAFT',
              'bg-blue-100 text-blue-800': invoice.status === 'PENDING',
              'bg-green-100 text-green-800': invoice.status === 'APPROVED',
              'bg-purple-100 text-purple-800': invoice.status === 'PAID',
              'bg-red-100 text-red-800': invoice.status === 'CANCELLED',
              'bg-gray-100 text-gray-800': invoice.status === 'REJECTED',
              'bg-orange-100 text-orange-800': invoice.status === 'OVERDUE',
            }"
          >
            {{ formatStatus(invoice.status) }}
          </span>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(invoice.totalAmount) }}
            </p>
            <p class="text-sm text-gray-600">{{ invoice.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Invoice Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(invoice.invoiceDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Vendor</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ invoice.vendorName }}</p>
          <p class="text-xs text-gray-600">{{ invoice.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ invoice.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Exchange Rate</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ invoice.exchangeRate }}</p>
        </div>

        <!-- Row 2 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Posting Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(invoice.postingDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Due Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(invoice.dueDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Payment Terms</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatPaymentTerms(invoice.paymentTerms) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Invoice Type</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatInvoiceType(invoice.type) }}
          </p>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="
          invoice.purchaseOrderNumber ||
          invoice.goodsReceiptNumber ||
          invoice.projectCode ||
          invoice.costCenter
        "
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-if="invoice.purchaseOrderNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Purchase Order</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ invoice.purchaseOrderNumber }}</p>
          </div>
          <div v-if="invoice.goodsReceiptNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Goods Receipt</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ invoice.goodsReceiptNumber }}</p>
          </div>
          <div v-if="invoice.projectCode">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Project Code</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ invoice.projectCode }}</p>
          </div>
          <div v-if="invoice.costCenter">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Cost Center</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ invoice.costCenter }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Line Items -->
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
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          ></path>
        </svg>
        Line Items
      </h4>

      <div v-if="invoice.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items found for this invoice.
      </div>

      <div v-else class="overflow-x-auto">
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
                Discount
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Line Total
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in invoice.lineItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                <div class="text-sm text-gray-500">{{ item.itemName }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.quantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.unitPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ item.discountPercent }}%</div>
                <div class="text-gray-500">{{ formatCurrency(item.discountAmount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ item.taxPercent }}%</div>
                <div class="text-gray-500">{{ formatCurrency(item.taxAmount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(item.lineTotal) }}
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
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{ formatCurrency(invoice.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Discount:</span>
            <span class="font-medium">{{ formatCurrency(invoice.discountTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(invoice.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total Amount:</span>
            <span>{{ formatCurrency(invoice.totalAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Information -->
    <div
      v-if="invoice.paidAmount !== undefined || invoice.remainingAmount !== undefined"
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
            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
          ></path>
        </svg>
        Payment Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-if="invoice.paidAmount !== undefined">
          <label class="block text-sm font-medium text-gray-700">Paid Amount</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(invoice.paidAmount) }}</p>
        </div>
        <div v-if="invoice.remainingAmount !== undefined">
          <label class="block text-sm font-medium text-gray-700">Remaining Amount</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatCurrency(invoice.remainingAmount) }}</p>
        </div>
      </div>
    </div>

    <!-- Approval Information -->
    <div
      v-if="invoice.approvalNotes || invoice.approvedDate || invoice.approvedBy"
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
        <div v-if="invoice.approvedDate">
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(invoice.approvedDate) }}</p>
        </div>
        <div v-if="invoice.approvedBy">
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ invoice.approvedBy }}</p>
        </div>
        <div v-if="invoice.approvalNotes">
          <label class="block text-sm font-medium text-gray-700">Approval Notes</label>
          <p class="mt-1 text-sm text-gray-900">{{ invoice.approvalNotes }}</p>
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

      <div v-if="invoice.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ invoice.notes }}</p>
      </div>

      <!-- Timestamps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(invoice.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(invoice.updatedAt) }}
        </div>
        <div>
          <span class="font-medium">Last Updated:</span>
          {{ formatDate(invoice.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApInvoice } from '../types'

interface Props {
  invoice: ApInvoice
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
    case 'DRAFT':
      return 'Draft'
    case 'PENDING_APPROVAL':
      return 'Pending Approval'
    case 'APPROVED':
      return 'Approved'
    case 'POSTED':
      return 'Posted'
    case 'CANCELLED':
      return 'Cancelled'
    case 'CLOSED':
      return 'Closed'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatPaymentTerms = (terms: string): string => {
  switch (terms) {
    case 'IMMEDIATE':
      return 'Immediate'
    case 'NET_15':
      return 'Net 15'
    case 'NET_30':
      return 'Net 30'
    case 'NET_45':
      return 'Net 45'
    case 'NET_60':
      return 'Net 60'
    case 'NET_90':
      return 'Net 90'
    case 'END_OF_MONTH':
      return 'End of Month'
    case 'END_OF_QUARTER':
      return 'End of Quarter'
    default:
      return terms
  }
}

const formatInvoiceType = (type: string): string => {
  switch (type) {
    case 'STANDARD':
      return 'Standard'
    case 'CREDIT_MEMO':
      return 'Credit Memo'
    case 'DEBIT_MEMO':
      return 'Debit Memo'
    case 'ADJUSTMENT':
      return 'Adjustment'
    case 'PREPAYMENT':
      return 'Prepayment'
    default:
      return type
  }
}
</script>
