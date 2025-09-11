<template>
  <div class="space-y-6">
    <!-- Header Information - Quotation Style -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <!-- Left Section: Document Info -->
        <div class="flex-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-green-100 rounded-lg">
              <svg
                class="w-8 h-8 text-green-600"
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
              <h2 class="text-2xl font-bold text-gray-900">{{ quotation.quotationNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ quotation.docNum }} | Entry: {{ quotation.docEntry }}
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
                'bg-yellow-100 text-yellow-800': quotation.status === 'DRAFT',
                'bg-blue-100 text-blue-800': quotation.status === 'SENT',
                'bg-purple-100 text-purple-800': quotation.status === 'RECEIVED',
                'bg-indigo-100 text-indigo-800': quotation.status === 'EVALUATED',
                'bg-green-100 text-green-800': quotation.status === 'APPROVED',
                'bg-red-100 text-red-800': quotation.status === 'REJECTED',
                'bg-orange-100 text-orange-800': quotation.status === 'EXPIRED',
                'bg-emerald-100 text-emerald-800': quotation.status === 'CONVERTED',
                'bg-gray-100 text-gray-800': quotation.status === 'CANCELLED',
              }"
            >
              {{ formatStatus(quotation.status) }}
            </span>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-gray-100 text-gray-800': quotation.priority === 'LOW',
                'bg-blue-100 text-blue-800': quotation.priority === 'MEDIUM',
                'bg-orange-100 text-orange-800': quotation.priority === 'HIGH',
                'bg-red-100 text-red-800': quotation.priority === 'URGENT',
              }"
            >
              {{ formatPriority(quotation.priority) }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(quotation.totalAmount) }}
            </p>
            <p class="text-sm text-gray-600">{{ quotation.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Quotation Date</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatDate(quotation.quotationDate) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Vendor</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ quotation.vendorName }}</p>
          <p class="text-xs text-gray-600">{{ quotation.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ quotation.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Quotation Type</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatQuotationType(quotation.type) }}
          </p>
        </div>

        <!-- Row 2 -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Valid Until</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(quotation.validUntil) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Department</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ quotation.department }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Cost Center</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ quotation.costCenter }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Project Code</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ quotation.projectCode || '-' }}</p>
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
        Quotation Line Items
      </h4>

      <div v-if="quotation.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items found for this quotation.
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
                Delivery Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in quotation.lineItems" :key="item.id" class="hover:bg-gray-50">
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
                {{ formatDate(item.deliveryDate) }}
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
            <span class="font-medium">{{ formatCurrency(quotation.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(quotation.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total Amount:</span>
            <span>{{ formatCurrency(quotation.totalAmount) }}</span>
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
          <p class="mt-1 text-sm text-gray-900">{{ quotation.vendorName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Vendor Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.vendorCode }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Person</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.vendorContact }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.vendorEmail }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.vendorPhone }}</p>
        </div>
      </div>
    </div>

    <!-- Evaluation & Approval Information -->
    <div
      v-if="
        quotation.evaluationNotes ||
        quotation.evaluatedBy ||
        quotation.evaluatedDate ||
        quotation.approvedBy ||
        quotation.approvedDate ||
        quotation.convertedToOrder ||
        quotation.convertedDate
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
        Evaluation & Approval Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="quotation.evaluatedBy">
          <label class="block text-sm font-medium text-gray-700">Evaluated By</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.evaluatedBy }}</p>
        </div>
        <div v-if="quotation.evaluatedDate">
          <label class="block text-sm font-medium text-gray-700">Evaluation Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation.evaluatedDate) }}</p>
        </div>
        <div v-if="quotation.approvedBy">
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.approvedBy }}</p>
        </div>
        <div v-if="quotation.approvedDate">
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation.approvedDate) }}</p>
        </div>
        <div v-if="quotation.convertedToOrder">
          <label class="block text-sm font-medium text-gray-700">Converted To Order</label>
          <p class="mt-1 text-sm text-gray-900">{{ quotation.convertedToOrder }}</p>
        </div>
        <div v-if="quotation.convertedDate">
          <label class="block text-sm font-medium text-gray-700">Conversion Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(quotation.convertedDate) }}</p>
        </div>
      </div>

      <div v-if="quotation.evaluationNotes" class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Evaluation Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ quotation.evaluationNotes }}</p>
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

      <div v-if="quotation.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ quotation.notes }}</p>
      </div>

      <!-- Timestamps -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(quotation.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(quotation.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PurchaseQuotation } from '../types'

interface Props {
  quotation: PurchaseQuotation
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
    case 'SENT':
      return 'Sent'
    case 'RECEIVED':
      return 'Received'
    case 'EVALUATED':
      return 'Evaluated'
    case 'APPROVED':
      return 'Approved'
    case 'REJECTED':
      return 'Rejected'
    case 'EXPIRED':
      return 'Expired'
    case 'CONVERTED':
      return 'Converted'
    case 'CANCELLED':
      return 'Cancelled'
    default:
      return status
  }
}

const formatQuotationType = (type: string): string => {
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
