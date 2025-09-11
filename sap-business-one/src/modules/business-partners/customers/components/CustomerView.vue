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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ customer.customerName }}</h2>
            <p class="text-sm text-gray-600">{{ customer.customerCode }}</p>
          </div>
        </div>

        <!-- Right Side - Status and Financial -->
        <div class="flex items-center space-x-6">
          <!-- Status Badge -->
          <div class="text-center">
            <span
              class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
              :class="{
                'bg-green-100 text-green-800': customer.status === 'ACTIVE',
                'bg-gray-100 text-gray-800': customer.status === 'INACTIVE',
                'bg-yellow-100 text-yellow-800': customer.status === 'SUSPENDED',
                'bg-blue-100 text-blue-800': customer.status === 'PENDING_APPROVAL',
                'bg-red-100 text-red-800': customer.status === 'BLOCKED',
              }"
            >
              {{ formatStatus(customer.status) }}
            </span>
          </div>

          <!-- Credit Limit -->
          <div class="text-center">
            <p class="text-2xl font-bold text-gray-900">
              {{ formatCurrency(customer.financial.creditLimit) }}
            </p>
            <p class="text-sm text-gray-600">Credit Limit</p>
          </div>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1: Basic Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Type</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatCustomerType(customer.type) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Industry</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ customer.industry || '-' }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Company</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ customer.companyName || customer.customerName }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Website</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ customer.website || '-' }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Payment Terms</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatPaymentTerms(customer.financial.paymentTerms) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Currency</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ customer.financial.currency }}</p>
          </div>
        </div>

        <!-- Row 2: Financial Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Current Balance</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatCurrency(customer.financial.currentBalance) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Available Credit</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatCurrency(customer.financial.availableCredit) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Financial Info - Compact Row -->
      <div class="mt-4 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Tax Exemption</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatTaxExemption(customer.financial.taxExemption) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Discount %</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ customer.financial.discountPercent }}%
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Assigned Sales Rep</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ customer.assignedSalesRep || '-' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Information -->
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
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          ></path>
        </svg>
        Contact Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="contact in customer.contacts"
          :key="contact.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-center space-x-3 mb-3">
            <div class="p-2 bg-blue-50 rounded-lg">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">
                {{ contact.firstName }} {{ contact.lastName }}
              </p>
              <p class="text-xs text-gray-600">{{ contact.position }}</p>
            </div>
            <span
              v-if="contact.isPrimary"
              class="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full"
            >
              Primary
            </span>
          </div>

          <div class="space-y-2">
            <div>
              <label class="block text-xs font-medium text-gray-500">Email</label>
              <p class="text-sm text-gray-900">{{ contact.email }}</p>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-500">Phone</label>
              <p class="text-sm text-gray-900">{{ contact.phone }}</p>
            </div>
            <div v-if="contact.mobile">
              <label class="block text-xs font-medium text-gray-500">Mobile</label>
              <p class="text-sm text-gray-900">{{ contact.mobile }}</p>
            </div>
            <div v-if="contact.notes">
              <label class="block text-xs font-medium text-gray-500">Notes</label>
              <p class="text-sm text-gray-900">{{ contact.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Information -->
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          ></path>
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          ></path>
        </svg>
        Address Information
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="address in customer.addresses"
          :key="address.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-center space-x-3 mb-3">
            <div class="p-2 bg-green-50 rounded-lg">
              <svg
                class="w-4 h-4 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">
                {{ formatAddressType(address.type) }}
              </p>
              <span
                v-if="address.isDefault"
                class="inline-flex px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full"
              >
                Default
              </span>
            </div>
          </div>

          <div class="space-y-2">
            <div>
              <label class="block text-xs font-medium text-gray-500">Address</label>
              <p class="text-sm text-gray-900">{{ address.addressLine1 }}</p>
              <p v-if="address.addressLine2" class="text-sm text-gray-900">
                {{ address.addressLine2 }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-medium text-gray-500">City</label>
                <p class="text-sm text-gray-900">{{ address.city }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">State</label>
                <p class="text-sm text-gray-900">{{ address.state }}</p>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="block text-xs font-medium text-gray-500">Postal Code</label>
                <p class="text-sm text-gray-900">{{ address.postalCode }}</p>
              </div>
              <div>
                <label class="block text-xs font-medium text-gray-500">Country</label>
                <p class="text-sm text-gray-900">{{ address.country }}</p>
              </div>
            </div>
            <div v-if="address.phone || address.email" class="pt-2 border-t border-gray-200">
              <div v-if="address.phone" class="mb-1">
                <label class="block text-xs font-medium text-gray-500">Phone</label>
                <p class="text-sm text-gray-900">{{ address.phone }}</p>
              </div>
              <div v-if="address.email">
                <label class="block text-xs font-medium text-gray-500">Email</label>
                <p class="text-sm text-gray-900">{{ address.email }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Customer Statistics -->
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
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          ></path>
        </svg>
        Customer Statistics
      </h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ customer.statistics.totalOrders }}</p>
          <p class="text-sm text-gray-600">Total Orders</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(customer.statistics.totalRevenue) }}
          </p>
          <p class="text-sm text-gray-600">Total Revenue</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(customer.statistics.averageOrderValue) }}
          </p>
          <p class="text-sm text-gray-600">Average Order</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{ customer.statistics.customerLifetimeValue.toFixed(0) }}
          </p>
          <p class="text-sm text-gray-600">Lifetime Value</p>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Last Order Date</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{
              customer.statistics.lastOrderDate
                ? formatDate(customer.statistics.lastOrderDate)
                : 'No orders yet'
            }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Days Since Last Order</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{
              customer.statistics.daysSinceLastOrder > 0
                ? `${customer.statistics.daysSinceLastOrder} days`
                : 'N/A'
            }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Return Rate</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ customer.statistics.returnRate }}%</p>
        </div>
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
            <span class="text-gray-600">Credit Limit:</span>
            <span class="font-medium">{{ formatCurrency(customer.financial.creditLimit) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Current Balance:</span>
            <span class="font-medium">{{ formatCurrency(customer.financial.currentBalance) }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Available Credit:</span>
            <span class="font-medium">{{
              formatCurrency(customer.financial.availableCredit)
            }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Discount:</span>
            <span class="font-medium">{{ customer.financial.discountPercent }}%</span>
          </div>
          <div class="flex justify-between text-lg font-bold pt-2 border-t">
            <span>Credit Utilization:</span>
            <span
              >{{
                (
                  (customer.financial.currentBalance / customer.financial.creditLimit) *
                  100
                ).toFixed(1)
              }}%</span
            >
          </div>
        </div>
      </div>

      <div v-if="customer.financial.lastPaymentDate" class="mt-4 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Payment Date</label>
            <p class="mt-1 text-sm text-gray-900">
              {{ formatDate(customer.financial.lastPaymentDate) }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Payment Amount</label>
            <p class="mt-1 text-sm text-gray-900">
              {{ formatCurrency(customer.financial.lastPaymentAmount || 0) }}
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
          <label class="block text-sm font-medium text-gray-700">Source</label>
          <p class="mt-1 text-sm text-gray-900">{{ customer.source || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Tags</label>
          <div class="mt-1 flex flex-wrap gap-2">
            <span
              v-for="tag in customer.tags"
              :key="tag"
              class="inline-flex px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <div v-if="customer.notes" class="mt-4 pt-4 border-t border-gray-200">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ customer.notes }}</p>
      </div>
    </div>

    <!-- Timestamps -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(customer.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(customer.updatedAt) }}
        </div>
        <div>
          <span class="font-medium">Last Activity:</span>
          {{ customer.lastActivityDate ? formatDate(customer.lastActivityDate) : 'N/A' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '../types'

interface Props {
  customer: Customer
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
    case 'ACTIVE':
      return 'Active'
    case 'INACTIVE':
      return 'Inactive'
    case 'SUSPENDED':
      return 'Suspended'
    case 'PENDING_APPROVAL':
      return 'Pending Approval'
    case 'BLOCKED':
      return 'Blocked'
    default:
      return status
  }
}

const formatCustomerType = (type: string): string => {
  switch (type) {
    case 'REGULAR':
      return 'Regular'
    case 'PREMIUM':
      return 'Premium'
    case 'WHOLESALE':
      return 'Wholesale'
    case 'RETAIL':
      return 'Retail'
    case 'DISTRIBUTOR':
      return 'Distributor'
    case 'RESELLER':
      return 'Reseller'
    default:
      return type
  }
}

const formatPaymentTerms = (terms: string): string => {
  return terms.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const formatTaxExemption = (exemption: string): string => {
  switch (exemption) {
    case 'NONE':
      return 'None'
    case 'EXEMPT':
      return 'Exempt'
    case 'PARTIAL':
      return 'Partial'
    case 'RESELLER':
      return 'Reseller'
    case 'GOVERNMENT':
      return 'Government'
    default:
      return exemption
  }
}

const formatAddressType = (type: string): string => {
  switch (type) {
    case 'BILLING':
      return 'Billing Address'
    case 'SHIPPING':
      return 'Shipping Address'
    case 'BOTH':
      return 'Billing & Shipping'
    default:
      return type
  }
}
</script>
