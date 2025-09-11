<template>
  <div class="space-y-6">
    <!-- Header Information - Vendor Style -->
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
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ vendor.name }}</h2>
              <p class="text-sm text-gray-600">
                Code: {{ vendor.code }} | Tax ID: {{ vendor.taxId }}
              </p>
            </div>
          </div>
        </div>

        <!-- Right Section: Status and Type -->
        <div class="flex flex-col items-end space-y-2">
          <div class="flex items-center space-x-2">
            <span
              class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
              :class="{
                'bg-green-100 text-green-800': vendor.status === 'ACTIVE',
                'bg-gray-100 text-gray-800': vendor.status === 'INACTIVE',
                'bg-orange-100 text-orange-800': vendor.status === 'SUSPENDED',
                'bg-red-100 text-red-800': vendor.status === 'BLOCKED',
              }"
            >
              {{ formatStatus(vendor.status) }}
            </span>
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800"
            >
              {{ formatVendorType(vendor.type) }}
            </span>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Credit Limit</p>
            <p class="text-lg font-semibold text-gray-900">
              {{ formatCurrency(vendor.financial.creditLimit) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Information Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Website</label
          >
          <p class="text-sm font-semibold text-gray-900">
            <a
              v-if="vendor.website"
              :href="vendor.website"
              target="_blank"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ vendor.website }}
            </a>
            <span v-else class="text-gray-500">-</span>
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ vendor.financial.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Payment Terms</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ vendor.financial.paymentTerms || '-' }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Current Balance</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ formatCurrency(vendor.financial.currentBalance) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Primary Contact Information -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Primary Contact Information</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Contact Person</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ vendor.primaryContact.firstName }} {{ vendor.primaryContact.lastName }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Position</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.primaryContact.position }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <p class="mt-1 text-sm text-gray-900">
            <a
              :href="`mailto:${vendor.primaryContact.email}`"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ vendor.primaryContact.email }}
            </a>
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Phone</label>
          <p class="mt-1 text-sm text-gray-900">
            <a
              :href="`tel:${vendor.primaryContact.phone}`"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ vendor.primaryContact.phone }}
            </a>
          </p>
        </div>
        <div v-if="vendor.primaryContact.mobile">
          <label class="block text-sm font-medium text-gray-700">Mobile</label>
          <p class="mt-1 text-sm text-gray-900">
            <a
              :href="`tel:${vendor.primaryContact.mobile}`"
              class="text-blue-600 hover:text-blue-800"
            >
              {{ vendor.primaryContact.mobile }}
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Addresses -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Addresses</h4>

      <div v-if="vendor.addresses.length === 0" class="text-center py-8 text-gray-500">
        No addresses found for this vendor.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="address in vendor.addresses"
          :key="address.id"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <span
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
              :class="{
                'bg-blue-100 text-blue-800': address.type === 'BILLING',
                'bg-green-100 text-green-800': address.type === 'SHIPPING',
                'bg-purple-100 text-purple-800': address.type === 'BOTH',
              }"
            >
              {{ formatAddressType(address.type) }}
            </span>
            <span
              v-if="address.isDefault"
              class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800"
            >
              Default
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <div><span class="font-medium">Street:</span> {{ address.street }}</div>
            <div><span class="font-medium">City:</span> {{ address.city }}</div>
            <div><span class="font-medium">State:</span> {{ address.state }}</div>
            <div><span class="font-medium">Country:</span> {{ address.country }}</div>
            <div><span class="font-medium">Postal Code:</span> {{ address.postalCode }}</div>
            <div v-if="address.phone">
              <span class="font-medium">Phone:</span> {{ address.phone }}
            </div>
            <div v-if="address.fax"><span class="font-medium">Fax:</span> {{ address.fax }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Financial Summary -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(vendor.financial.creditLimit) }}
          </div>
          <div class="text-sm text-gray-600">Credit Limit</div>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(vendor.financial.currentBalance) }}
          </div>
          <div class="text-sm text-gray-600">Current Balance</div>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">
            {{ vendor.financial.discountPercent }}%
          </div>
          <div class="text-sm text-gray-600">Discount</div>
        </div>
        <div class="text-center p-4 bg-gray-50 rounded-lg">
          <div class="text-2xl font-bold text-gray-900">{{ vendor.financial.taxPercent }}%</div>
          <div class="text-sm text-gray-600">Tax Rate</div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Tax Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.taxCode || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Bank Account</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.bankAccount || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Bank Name</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.bankName || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Bank Branch</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.bankBranch || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">SWIFT Code</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.swiftCode || '-' }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">IBAN</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.financial.iban || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Vendor Statistics -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Vendor Statistics</h4>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="text-center p-4 bg-blue-50 rounded-lg">
          <div class="text-2xl font-bold text-blue-900">{{ vendor.statistics.totalOrders }}</div>
          <div class="text-sm text-blue-600">Total Orders</div>
        </div>
        <div class="text-center p-4 bg-green-50 rounded-lg">
          <div class="text-2xl font-bold text-green-900">{{ vendor.statistics.totalInvoices }}</div>
          <div class="text-sm text-green-600">Total Invoices</div>
        </div>
        <div class="text-center p-4 bg-purple-50 rounded-lg">
          <div class="text-2xl font-bold text-purple-900">
            {{ vendor.statistics.totalPayments }}
          </div>
          <div class="text-sm text-purple-600">Total Payments</div>
        </div>
        <div class="text-center p-4 bg-orange-50 rounded-lg">
          <div class="text-2xl font-bold text-orange-900">
            {{ formatCurrency(vendor.statistics.averageOrderValue) }}
          </div>
          <div class="text-sm text-orange-600">Avg Order Value</div>
        </div>
      </div>

      <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">On-Time Delivery Rate</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.statistics.onTimeDeliveryRate }}%</p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Quality Rating</label>
          <p class="mt-1 text-sm text-gray-900">{{ vendor.statistics.qualityRating }}/5.0</p>
        </div>
        <div v-if="vendor.statistics.lastOrderDate">
          <label class="block text-sm font-medium text-gray-700">Last Order Date</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ formatDate(vendor.statistics.lastOrderDate) }}
          </p>
        </div>
        <div v-if="vendor.statistics.lastInvoiceDate">
          <label class="block text-sm font-medium text-gray-700">Last Invoice Date</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ formatDate(vendor.statistics.lastInvoiceDate) }}
          </p>
        </div>
        <div v-if="vendor.statistics.lastPaymentDate">
          <label class="block text-sm font-medium text-gray-700">Last Payment Date</label>
          <p class="mt-1 text-sm text-gray-900">
            {{ formatDate(vendor.statistics.lastPaymentDate) }}
          </p>
        </div>
      </div>
    </div>

    <!-- Additional Information -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h4>

      <div v-if="vendor.notes" class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Notes</label>
        <p class="mt-1 text-sm text-gray-900">{{ vendor.notes }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(vendor.createdAt) }}</div>
        <div><span class="font-medium">Last Updated:</span> {{ formatDate(vendor.updatedAt) }}</div>
        <div><span class="font-medium">Created By:</span> {{ vendor.createdBy }}</div>
        <div><span class="font-medium">Updated By:</span> {{ vendor.updatedBy }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Vendor } from '../types'

interface Props {
  vendor: Vendor
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
    case 'BLOCKED':
      return 'Blocked'
    default:
      return status
  }
}

const formatVendorType = (type: string): string => {
  switch (type) {
    case 'SUPPLIER':
      return 'Supplier'
    case 'SERVICE_PROVIDER':
      return 'Service Provider'
    case 'CONTRACTOR':
      return 'Contractor'
    case 'DISTRIBUTOR':
      return 'Distributor'
    case 'MANUFACTURER':
      return 'Manufacturer'
    case 'WHOLESALER':
      return 'Wholesaler'
    default:
      return type
  }
}

const formatAddressType = (type: string): string => {
  switch (type) {
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'BOTH':
      return 'Billing & Shipping'
    default:
      return type
  }
}
</script>
