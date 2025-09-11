<template>
  <div class="space-y-6">
    <!-- Header Information - Request Style -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
        <!-- Left Section: Document Info -->
        <div class="flex-1">
          <div class="flex items-center space-x-4">
            <div class="p-3 bg-purple-100 rounded-lg">
              <svg
                class="w-8 h-8 text-purple-600"
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
              <h2 class="text-2xl font-bold text-gray-900">{{ request.requestNumber }}</h2>
              <p class="text-sm text-gray-600">
                Doc: {{ request.docNum }} | Entry: {{ request.docEntry }}
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
                'bg-yellow-100 text-yellow-800': request.status === 'DRAFT',
                'bg-blue-100 text-blue-800': request.status === 'PENDING',
                'bg-green-100 text-green-800': request.status === 'APPROVED',
                'bg-red-100 text-red-800': request.status === 'REJECTED',
                'bg-indigo-100 text-indigo-800': request.status === 'CONVERTED',
                'bg-gray-100 text-gray-800': request.status === 'CANCELLED',
                'bg-orange-100 text-orange-800': request.status === 'ON_HOLD',
              }"
            >
              {{ formatStatus(request.status) }}
            </span>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-gray-100 text-gray-800': request.priority === 'LOW',
                'bg-blue-100 text-blue-800': request.priority === 'MEDIUM',
                'bg-orange-100 text-orange-800': request.priority === 'HIGH',
                'bg-red-100 text-red-800': request.priority === 'URGENT',
              }"
            >
              {{ formatPriority(request.priority) }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-3xl font-bold text-gray-900">
              {{ formatCurrency(request.totalAmount) }}
            </p>
            <p class="text-sm text-gray-600">{{ request.currency }}</p>
          </div>
        </div>
      </div>

      <!-- Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Request Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(request.requestDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Requested By</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ request.requestedBy }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ request.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Request Type</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatRequestType(request.type) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Required Date</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatDate(request.requiredDate) }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Department</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ request.department }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Cost Center</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ request.costCenter }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Project Code</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ request.projectCode || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Line Items -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Request Line Items</h4>
      <div v-if="request.lineItems.length === 0" class="text-center py-8 text-gray-500">
        No line items found for this request.
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
                Priority
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="item in request.lineItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.itemCode }}</div>
                <div class="text-sm text-gray-500">{{ item.itemName }}</div>
              </td>
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ item.description || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.quantity }}</td>
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
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h4>
      <div class="flex justify-end">
        <div class="w-64 space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">{{ formatCurrency(request.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Total Tax:</span>
            <span class="font-medium">{{ formatCurrency(request.taxTotal) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Total Amount:</span>
            <span>{{ formatCurrency(request.totalAmount) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Approval Information -->
    <div
      v-if="
        request.approvalNotes ||
        request.approvedBy ||
        request.approvedDate ||
        request.convertedToOrder ||
        request.convertedDate
      "
      class="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Approval & Conversion Information</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="request.approvedBy">
          <label class="block text-sm font-medium text-gray-700">Approved By</label>
          <p class="mt-1 text-sm text-gray-900">{{ request.approvedBy }}</p>
        </div>
        <div v-if="request.approvedDate">
          <label class="block text-sm font-medium text-gray-700">Approval Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(request.approvedDate) }}</p>
        </div>
        <div v-if="request.convertedToOrder">
          <label class="block text-sm font-medium text-gray-700">Converted To Order</label>
          <p class="mt-1 text-sm text-gray-900">{{ request.convertedToOrder }}</p>
        </div>
        <div v-if="request.convertedDate">
          <label class="block text-sm font-medium text-gray-700">Conversion Date</label>
          <p class="mt-1 text-sm text-gray-900">{{ formatDate(request.convertedDate) }}</p>
        </div>
      </div>
      <div v-if="request.approvalNotes" class="mt-4">
        <label class="block text-sm font-medium text-gray-700">Approval Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ request.approvalNotes }}</p>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>
      <div v-if="request.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ request.notes }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(request.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(request.updatedAt) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PurchaseRequest } from '../types'

interface Props {
  request: PurchaseRequest
}

defineProps<Props>()

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
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
    case 'REJECTED':
      return 'Rejected'
    case 'CONVERTED':
      return 'Converted'
    case 'CANCELLED':
      return 'Cancelled'
    case 'ON_HOLD':
      return 'On Hold'
    default:
      return status
  }
}

const formatRequestType = (type: string): string => {
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
