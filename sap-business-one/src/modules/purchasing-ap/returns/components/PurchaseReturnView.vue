<template>
  <div class="space-y-6">
    <!-- Header Information - Return Style -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <!-- Left Section: Document Info -->
        <div class="flex-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-red-100 rounded-lg">
              <svg
                class="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4m8-8v16m-8-8l8 8m0-16l-8 8"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ purchaseReturn.returnNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ purchaseReturn.docNum }} | Entry: {{ purchaseReturn.docEntry }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section: Status and Total -->
        <div class="flex flex-col items-end space-y-2">
          <span
            class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
            :class="{
              'bg-yellow-100 text-yellow-800': purchaseReturn.status === 'DRAFT',
              'bg-blue-100 text-blue-800': purchaseReturn.status === 'OPEN',
              'bg-green-100 text-green-800': purchaseReturn.status === 'POSTED',
              'bg-red-100 text-red-800': purchaseReturn.status === 'CANCELLED',
              'bg-orange-100 text-orange-800': purchaseReturn.status === 'ON_HOLD',
            }"
          >
            {{ formatStatus(purchaseReturn.status) }}
          </span>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(purchaseReturn.totalAmount) }}
            </p>
            <p class="text-sm text-gray-600">{{ purchaseReturn.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Return Date</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatDate(purchaseReturn.returnDate) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Vendor</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.vendorName }}</p>
          <p class="text-xs text-gray-600">{{ purchaseReturn.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Return Type</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatReturnType(purchaseReturn.type) }}
          </p>
        </div>

        <!-- Row 2 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Posting Date</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatDate(purchaseReturn.postingDate) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Warehouse</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.warehouseName }}</p>
          <p class="text-xs text-gray-600">{{ purchaseReturn.warehouseCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Department</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.department }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Cost Center</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.costCenter }}</p>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="
          purchaseReturn.goodsReceiptNumber ||
          purchaseReturn.projectCode ||
          purchaseReturn.returnReason
        "
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-if="purchaseReturn.goodsReceiptNumber">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Goods Receipt</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ purchaseReturn.goodsReceiptNumber }}
            </p>
          </div>
          <div v-if="purchaseReturn.projectCode">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Project Code</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ purchaseReturn.projectCode }}</p>
          </div>
          <div v-if="purchaseReturn.returnReason">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Return Reason</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatReturnReason(purchaseReturn.returnReason) }}
            </p>
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
        Return Line Items
      </h4>

      <div v-if="purchaseReturn.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items found for this return.
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
                Original Qty
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Qty
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
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
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Return Reason
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in purchaseReturn.lineItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                <div class="text-sm text-gray-500">{{ item.itemName }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.originalQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.returnQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(item.unitPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ item.taxPercent }}%</div>
                <div class="text-gray-500">{{ formatCurrency(item.taxAmount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(item.lineTotal) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatReturnReason(item.returnReason) }}
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
            <span class="font-medium">{{ formatCurrency(purchaseReturn.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(purchaseReturn.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total Amount:</span>
            <span>{{ formatCurrency(purchaseReturn.totalAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vendor Information -->
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
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
        Vendor Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Vendor Name</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.vendorName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Vendor Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Person</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.vendorContact }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.vendorEmail }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.vendorPhone }}</p>
        </div>
      </div>
    </div>

    <!-- Warehouse Information -->
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
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          ></path>
        </svg>
        Warehouse Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Warehouse Name</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.warehouseName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Warehouse Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.warehouseCode }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Department</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.department }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Cost Center</label>
          <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.costCenter }}</p>
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

      <div v-if="purchaseReturn.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ purchaseReturn.notes }}</p>
      </div>

      <!-- Timestamps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span class="font-medium">Created:</span> {{ formatDate(purchaseReturn.createdAt) }}
        </div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(purchaseReturn.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PurchaseReturn } from '../types'

interface Props {
  purchaseReturn: PurchaseReturn
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
    case 'OPEN':
      return 'Open'
    case 'POSTED':
      return 'Posted'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatReturnType = (type: string): string => {
  switch (type) {
    case 'STANDARD':
      return 'Standard'
    case 'QUALITY_ISSUE':
      return 'Quality Issue'
    case 'DAMAGED':
      return 'Damaged'
    case 'OVERAGE':
      return 'Overage'
    case 'EXPIRED':
      return 'Expired'
    default:
      return type
  }
}

const formatReturnReason = (reason: string): string => {
  switch (reason) {
    case 'DEFECTIVE':
      return 'Defective'
    case 'WRONG_ITEM':
      return 'Wrong Item'
    case 'DAMAGED_IN_TRANSIT':
      return 'Damaged in Transit'
    case 'QUALITY_ISSUE':
      return 'Quality Issue'
    case 'OVERDELIVERY':
      return 'Overdelivery'
    case 'CUSTOMER_REQUEST':
      return 'Customer Request'
    case 'EXPIRED':
      return 'Expired'
    case 'OTHER':
      return 'Other'
    default:
      return reason
  }
}
</script>
