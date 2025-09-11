<template>
  <div class="space-y-6">
    <!-- Header Information - Order Style -->
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ order.orderNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ order.docNum }} | Entry: {{ order.docEntry }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section: Status and Total -->
        <div class="flex flex-col items-end space-y-2">
          <div class="flex items-center space-x-2">
            <span
              class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
              :class="{
                'bg-yellow-100 text-yellow-800': order.status === 'DRAFT',
                'bg-blue-100 text-blue-800': order.status === 'OPEN',
                'bg-green-100 text-green-800': order.status === 'RELEASED',
                'bg-purple-100 text-purple-800': order.status === 'PARTIALLY_RECEIVED',
                'bg-indigo-100 text-indigo-800': order.status === 'FULLY_RECEIVED',
                'bg-gray-100 text-gray-800': order.status === 'CLOSED',
                'bg-red-100 text-red-800': order.status === 'CANCELLED',
                'bg-orange-100 text-orange-800': order.status === 'ON_HOLD',
              }"
            >
              {{ formatStatus(order.status) }}
            </span>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-gray-100 text-gray-800': order.priority === 'LOW',
                'bg-blue-100 text-blue-800': order.priority === 'MEDIUM',
                'bg-orange-100 text-orange-800': order.priority === 'HIGH',
                'bg-red-100 text-red-800': order.priority === 'URGENT',
              }"
            >
              {{ formatPriority(order.priority) }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(order.totalAmount) }}
            </p>
            <p class="text-sm text-gray-600">{{ order.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Order Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(order.orderDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Vendor</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ order.vendorName }}</p>
          <p class="text-xs text-gray-600">{{ order.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ order.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Order Type</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatOrderType(order.type) }}
          </p>
        </div>

        <!-- Row 2 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Delivery Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(order.deliveryDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Department</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ order.department }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Cost Center</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ order.costCenter }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Project Code</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ order.projectCode || '-' }}</p>
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
        Order Line Items
      </h4>

      <div v-if="order.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items found for this order.
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
                Received
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remaining
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in order.lineItems" :key="item.id" class="hover:bg-gray-50">
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
                <div>{{ item.taxPercent }}%</div>
                <div class="text-gray-500">{{ formatCurrency(item.taxAmount) }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ formatCurrency(item.lineTotal) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.receivedQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ item.remainingQuantity }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': item.priority === 'LOW',
                    'bg-blue-100 text-blue-800': item.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': item.priority === 'HIGH',
                    'bg-red-100 text-red-800': item.priority === 'URGENT',
                  }"
                >
                  {{ formatPriority(item.priority) }}
                </span>
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
            <span class="font-medium">{{ formatCurrency(order.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(order.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total Amount:</span>
            <span>{{ formatCurrency(order.totalAmount) }}</span>
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
          <p class="mt-1 text-sm text-gray-900">{{ order.vendorName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Vendor Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Person</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.vendorContact }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.vendorEmail }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.vendorPhone }}</p>
        </div>
      </div>
    </div>

    <!-- Approval Information -->
    <div
      v-if="
        order.approvalNotes ||
        order.approvedBy ||
        order.approvedDate ||
        order.releasedBy ||
        order.releasedDate
      "
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
        Approval & Release Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="order.approvedBy">
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.approvedBy }}</p>
        </div>
        <div v-if="order.approvedDate">
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(order.approvedDate) }}</p>
        </div>
        <div v-if="order.releasedBy">
          <label class="block text-sm font-medium text-gray-700">Released By</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.releasedBy }}</p>
        </div>
        <div v-if="order.releasedDate">
          <label class="block text-sm font-medium text-gray-700">Release Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(order.releasedDate) }}</p>
        </div>
        <div v-if="order.closedBy">
          <label class="block text-sm font-medium text-gray-700">Closed By</label>
          <p class="mt-1 text-sm text-gray-900">{{ order.closedBy }}</p>
        </div>
        <div v-if="order.closedDate">
          <label class="block text-sm font-medium text-gray-700">Close Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(order.closedDate) }}</p>
        </div>
      </div>

      <div v-if="order.approvalNotes" class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Approval Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ order.approvalNotes }}</p>
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

      <div v-if="order.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ order.notes }}</p>
      </div>

      <!-- Timestamps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(order.createdAt) }}</div>
        <div><span class="font-medium">Last Updated:</span> {{ formatDate(order.updatedAt) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PurchaseOrder } from '../types'

interface Props {
  order: PurchaseOrder
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
    case 'RELEASED':
      return 'Released'
    case 'PARTIALLY_RECEIVED':
      return 'Partially Received'
    case 'FULLY_RECEIVED':
      return 'Fully Received'
    case 'CLOSED':
      return 'Closed'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatOrderType = (type: string): string => {
  switch (type) {
    case 'MATERIAL':
      return 'Material'
    case 'SERVICE':
      return 'Service'
    case 'ASSET':
      return 'Asset'
    case 'EXPENSE':
      return 'Expense'
    case 'CAPITAL':
      return 'Capital'
    default:
      return type
  }
}

const formatPriority = (priority: string): string => {
  switch (priority) {
    case 'LOW':
      return 'Low'
    case 'MEDIUM':
      return 'Medium'
    case 'HIGH':
      return 'High'
    case 'URGENT':
      return 'Urgent'
    default:
      return priority
  }
}
</script>
