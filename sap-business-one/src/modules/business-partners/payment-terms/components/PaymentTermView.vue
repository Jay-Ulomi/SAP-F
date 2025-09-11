<template>
  <div class="space-y-6">
    <!-- Header Information - Professional Layout -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Main Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <!-- Left Side - Payment Term Info -->
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
            <h2 class="text-2xl font-bold text-gray-900">{{ paymentTerm.name }}</h2>
            <p class="text-sm text-gray-600">{{ paymentTerm.code }}</p>
            <p v-if="paymentTerm.description" class="text-sm text-gray-600">
              {{ paymentTerm.description }}
            </p>
          </div>
        </div>

        <!-- Right Side - Status and Actions -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
        >
          <span
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            :class="{
              'bg-blue-100 text-blue-800': paymentTerm.type === 'NET_DAYS',
              'bg-green-100 text-green-800': paymentTerm.type === 'END_OF_MONTH',
              'bg-yellow-100 text-yellow-800': paymentTerm.type === 'FIXED_DATE',
              'bg-red-100 text-red-800': paymentTerm.type === 'IMMEDIATE',
              'bg-gray-100 text-gray-800': paymentTerm.type === 'CUSTOM',
            }"
          >
            {{ formatType(paymentTerm.type) }}
          </span>
          <span
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            :class="{
              'bg-green-100 text-green-800': paymentTerm.isActive,
              'bg-red-100 text-red-800': !paymentTerm.isActive,
            }"
          >
            {{ paymentTerm.isActive ? 'Active' : 'Inactive' }}
          </span>
          <span
            v-if="paymentTerm.isDefault"
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm bg-sap-blue text-white"
          >
            Default
          </span>
        </div>
      </div>

      <!-- Payment Details Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-gray-200">
        <!-- Payment Method -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{ formatPaymentMethod(paymentTerm.paymentMethod) }}
          </p>
          <p class="text-sm text-gray-600">Payment Method</p>
        </div>

        <!-- Currency -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ paymentTerm.currency }}</p>
          <p class="text-sm text-gray-600">Currency</p>
        </div>

        <!-- Sort Order -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ paymentTerm.sortOrder }}</p>
          <p class="text-sm text-gray-600">Sort Order</p>
        </div>
      </div>
    </div>

    <!-- Payment Term Details -->
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
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        Payment Term Details
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Type-Specific Information -->
        <div v-if="paymentTerm.type === 'NET_DAYS'" class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Net Days
            </label>
            <p class="text-sm font-semibold text-gray-900">{{ paymentTerm.netDays }} days</p>
          </div>
          <div v-if="paymentTerm.discountDays">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Discount Days
            </label>
            <p class="text-sm font-semibold text-gray-900">{{ paymentTerm.discountDays }} days</p>
          </div>
          <div v-if="paymentTerm.discountPercent">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Discount Percent
            </label>
            <p class="text-sm font-semibold text-green-600">{{ paymentTerm.discountPercent }}%</p>
          </div>
        </div>

        <div v-if="paymentTerm.type === 'FIXED_DATE'" class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Due Date
            </label>
            <p class="text-sm font-semibold text-gray-900">
              {{ formatDate(paymentTerm.dueDate) }}
            </p>
          </div>
        </div>

        <div v-if="paymentTerm.type === 'END_OF_MONTH'" class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Payment Due
            </label>
            <p class="text-sm font-semibold text-gray-900">End of Month</p>
          </div>
        </div>

        <div v-if="paymentTerm.type === 'IMMEDIATE'" class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Payment Due
            </label>
            <p class="text-sm font-semibold text-gray-900">Immediately</p>
          </div>
        </div>

        <div v-if="paymentTerm.type === 'CUSTOM'" class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Custom Type
            </label>
            <p class="text-sm font-semibold text-gray-900">Custom Payment Term</p>
          </div>
        </div>

        <!-- Payment Method Details -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Payment Method
            </label>
            <p class="text-sm font-semibold text-gray-900">
              {{ formatPaymentMethod(paymentTerm.paymentMethod) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Currency
            </label>
            <p class="text-sm font-semibold text-gray-900">{{ paymentTerm.currency }}</p>
          </div>
        </div>

        <!-- Status and Settings -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Status
            </label>
            <p class="text-sm font-semibold text-gray-900">
              {{ paymentTerm.isActive ? 'Active' : 'Inactive' }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Default Term
            </label>
            <p class="text-sm font-semibold text-gray-900">
              {{ paymentTerm.isDefault ? 'Yes' : 'No' }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide">
              Sort Order
            </label>
            <p class="text-sm font-semibold text-gray-900">{{ paymentTerm.sortOrder }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Early Payment Discount Section -->
    <div
      v-if="
        paymentTerm.type === 'NET_DAYS' && (paymentTerm.discountDays || paymentTerm.discountPercent)
      "
      class="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h4 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <svg
          class="w-5 h-5 mr-2 text-green-600"
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
        Early Payment Discount
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg
                class="w-5 h-5 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h5 class="text-sm font-semibold text-green-900">Discount Period</h5>
              <p class="text-sm text-green-700">
                {{ paymentTerm.discountDays }} days from invoice date
              </p>
            </div>
          </div>
        </div>

        <div class="p-4 bg-green-50 rounded-lg border border-green-200">
          <div class="flex items-center space-x-3">
            <div class="p-2 bg-green-100 rounded-lg">
              <svg
                class="w-5 h-5 text-green-600"
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
            </div>
            <div>
              <h5 class="text-sm font-semibold text-green-900">Discount Amount</h5>
              <p class="text-sm text-green-700">
                {{ paymentTerm.discountPercent }}% off total amount
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <div class="flex items-start space-x-3">
          <div class="p-2 bg-blue-100 rounded-lg mt-1">
            <svg
              class="w-4 h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h5 class="text-sm font-semibold text-blue-900">How It Works</h5>
            <p class="text-sm text-blue-700">
              If payment is received within {{ paymentTerm.discountDays }} days, the customer
              receives a {{ paymentTerm.discountPercent }}% discount. Otherwise, full payment is due
              within {{ paymentTerm.netDays }} days.
            </p>
          </div>
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">
              {{ paymentTerm.notes || 'No notes available' }}
            </p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">
              {{ paymentTerm.description || 'No description available' }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Created</label>
            <p class="text-sm text-gray-900">{{ formatDate(paymentTerm.createdAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <p class="text-sm text-gray-900">{{ formatDate(paymentTerm.updatedAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Created By</label>
            <p class="text-sm text-gray-900">{{ paymentTerm.createdBy || 'System' }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Updated By</label>
            <p class="text-sm text-gray-900">{{ paymentTerm.updatedBy || 'System' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PaymentTerm } from '../types'

interface Props {
  paymentTerm: PaymentTerm
}

defineProps<Props>()

// Utility functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatType = (type: string): string => {
  switch (type) {
    case 'NET_DAYS':
      return 'Net Days'
    case 'END_OF_MONTH':
      return 'End of Month'
    case 'FIXED_DATE':
      return 'Fixed Date'
    case 'IMMEDIATE':
      return 'Immediate'
    case 'CUSTOM':
      return 'Custom'
    default:
      return type
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
    case 'ELECTRONIC_PAYMENT':
      return 'Electronic Payment'
    case 'WIRE_TRANSFER':
      return 'Wire Transfer'
    case 'OTHER':
      return 'Other'
    default:
      return method
  }
}
</script>
