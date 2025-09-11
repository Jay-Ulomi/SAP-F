<template>
  <div class="space-y-6">
    <!-- Header Information - Compact and Organized -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Main Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <!-- Left Side - Document Info -->
        <div class="flex items-center space-x-4 mb-4 lg:mb-0">
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
            <h2 class="text-2xl font-bold text-gray-900">{{ creditMemo.creditMemoNumber }}</h2>
            <p class="text-sm text-gray-600">{{ formatCreditMemoType(creditMemo.type) }}</p>
          </div>
        </div>

        <!-- Right Side - Status and Amount -->
        <div class="flex items-center space-x-6">
          <!-- Status Badge -->
          <div class="text-center">
            <span
              class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
              :class="{
                'bg-gray-100 text-gray-800': creditMemo.status === 'DRAFT',
                'bg-yellow-100 text-yellow-800': creditMemo.status === 'PENDING',
                'bg-blue-100 text-blue-800': creditMemo.status === 'APPROVED',
                'bg-green-100 text-green-800': creditMemo.status === 'APPLIED',
                'bg-orange-100 text-orange-800': creditMemo.status === 'PARTIALLY_APPLIED',
                'bg-red-100 text-red-800':
                  creditMemo.status === 'CANCELLED' || creditMemo.status === 'REJECTED',
              }"
            >
              {{ formatStatus(creditMemo.status) }}
            </span>
          </div>

          <!-- Total Amount -->
          <div class="text-center">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(creditMemo.totalAmount) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1: Basic Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Date</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatDate(creditMemo.creditMemoDate) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Vendor</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.vendorName }}</p>
            <p class="text-xs text-gray-600">{{ creditMemo.vendorCode }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Currency</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.currency }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Exchange Rate</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.exchangeRate }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Payment Terms</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatPaymentTerms(creditMemo.paymentTerms) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Posting Date</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatDate(creditMemo.postingDate) }}
            </p>
          </div>
        </div>

        <!-- Row 2: Reference Info -->
        <div class="space-y-3">
          <div v-if="creditMemo.originalInvoiceNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Original Invoice</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ creditMemo.originalInvoiceNumber }}
            </p>
          </div>
          <div v-if="creditMemo.purchaseOrderNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Purchase Order</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.purchaseOrderNumber }}</p>
          </div>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="creditMemo.goodsReceiptNumber || creditMemo.projectCode || creditMemo.costCenter"
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-if="creditMemo.goodsReceiptNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Goods Receipt</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.goodsReceiptNumber }}</p>
          </div>
          <div v-if="creditMemo.projectCode">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Project Code</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.projectCode }}</p>
          </div>
          <div v-if="creditMemo.costCenter">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Cost Center</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ creditMemo.costCenter }}</p>
          </div>
        </div>
      </div>
    </div>



    <!-- Line Items -->
    <div class="border-t pt-4">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Line Items</h4>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Discount %
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tax %
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Line Total
              </th>
              <th
                class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Reason
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in creditMemo.lineItems" :key="item.id">
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.itemCode }}</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.description }}</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.quantity }}</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.unitPrice) }}</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.discountPercent }}%</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.taxPercent }}%</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ formatCurrency(item.lineTotal) }}</td>
              <td class="px-3 py-2 text-sm text-gray-900">{{ item.returnReason || '-' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals Summary -->
    <div class="border-t pt-4">
      <div class="flex justify-end">
        <div class="w-64 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{ formatCurrency(creditMemo.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Discount Total:</span>
            <span class="font-medium">{{ formatCurrency(creditMemo.discountTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Tax Total:</span>
            <span class="font-medium">{{ formatCurrency(creditMemo.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Applied Amount:</span>
            <span class="font-medium">{{ formatCurrency(creditMemo.appliedAmount) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total:</span>
            <span>{{ formatCurrency(creditMemo.totalAmount) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Remaining:</span>
            <span class="font-medium">{{ formatCurrency(creditMemo.remainingAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes and Approval Information -->
    <div class="border-t pt-4 space-y-4">
      <div v-if="creditMemo.notes">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ creditMemo.notes }}</p>
      </div>
      <div v-if="creditMemo.approvalNotes">
        <label class="block text-sm font-medium text-gray-700">Approval Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ creditMemo.approvalNotes }}</p>
      </div>
      <div v-if="creditMemo.approvedBy" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ creditMemo.approvedBy }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ creditMemo.approvedDate ? formatDate(creditMemo.approvedDate) : '-' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Timestamps -->
    <div class="border-t pt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(creditMemo.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(creditMemo.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ApCreditMemo } from '../types'

interface Props {
  creditMemo: ApCreditMemo
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
    case 'PENDING':
      return 'Pending'
    case 'APPROVED':
      return 'Approved'
    case 'APPLIED':
      return 'Applied'
    case 'PARTIALLY_APPLIED':
      return 'Partially Applied'
    case 'CANCELLED':
      return 'Cancelled'
    case 'REJECTED':
      return 'Rejected'
    default:
      return status
  }
}

const formatCreditMemoType = (type: string): string => {
  switch (type) {
    case 'VENDOR_RETURN':
      return 'Vendor Return'
    case 'PRICE_ADJUSTMENT':
      return 'Price Adjustment'
    case 'DISCOUNT':
      return 'Discount'
    case 'DAMAGED_GOODS':
      return 'Damaged Goods'
    case 'WRONG_ITEM':
      return 'Wrong Item'
    case 'QUALITY_ISSUE':
      return 'Quality Issue'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}

const formatPaymentTerms = (terms: string): string => {
  return terms.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}
</script>
