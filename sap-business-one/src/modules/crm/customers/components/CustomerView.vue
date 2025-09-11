<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ customer.name }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ customer.companyName || 'Individual Customer' }}</p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ customer.customerCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': customer.status === 'ACTIVE',
              'bg-gray-100 text-gray-800': customer.status === 'INACTIVE',
              'bg-yellow-100 text-yellow-800': customer.status === 'SUSPENDED',
              'bg-blue-100 text-blue-800': customer.status === 'PROSPECT',
              'bg-purple-100 text-purple-800': customer.status === 'LEAD',
              'bg-red-100 text-red-800': customer.status === 'CANCELLED'
            }"
          >
            {{ formatCustomerStatus(customer.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatCustomerType(customer.type) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': customer.priority === 'LOW',
              'bg-blue-100 text-blue-800': customer.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': customer.priority === 'HIGH',
              'bg-red-100 text-red-800': customer.priority === 'CRITICAL'
            }"
          >
            {{ formatCustomerPriority(customer.priority) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Customer Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Basic Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Industry:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCustomerIndustry(customer.industry) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Source:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCustomerSource(customer.source) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.assignedTo }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Lead Score:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.leadScore }}/100</span>
              </div>
              <div v-if="customer.website">
                <span class="text-xs text-gray-500">Website:</span>
                <a :href="customer.website" target="_blank" class="ml-2 text-sm font-medium text-sap-blue hover:text-sap-dark-blue">
                  {{ customer.website }}
                </a>
              </div>
              <div v-if="customer.description">
                <span class="text-xs text-gray-500">Description:</span>
                <span class="ml-2 text-sm text-gray-900">{{ customer.description }}</span>
              </div>
            </div>
            <div v-if="customer.tags.length > 0" class="mt-4">
              <span class="text-xs text-gray-500">Tags:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="tag in customer.tags"
                  :key="tag"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Primary Contact -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Primary Contact</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.primaryContact.firstName }} {{ customer.primaryContact.lastName }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Email:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.primaryContact.email }}</span>
              </div>
              <div v-if="customer.primaryContact.phone">
                <span class="text-xs text-gray-500">Phone:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.primaryContact.phone }}</span>
              </div>
              <div v-if="customer.primaryContact.mobile">
                <span class="text-xs text-gray-500">Mobile:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.primaryContact.mobile }}</span>
              </div>
              <div v-if="customer.primaryContact.position">
                <span class="text-xs text-gray-500">Position:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.primaryContact.position }}</span>
              </div>
              <div v-if="customer.primaryContact.department">
                <span class="text-xs text-gray-500">Department:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.primaryContact.department }}</span>
              </div>
            </div>
          </div>

          <!-- Addresses -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Addresses</h3>
            <div class="space-y-4">
              <div
                v-for="address in customer.addresses"
                :key="address.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ formatAddressType(address.type) }}
                  </h4>
                  <span
                    v-if="address.isDefault"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
                  >
                    Default
                  </span>
                </div>
                <div class="text-sm text-gray-700">
                  <div>{{ address.street }}</div>
                  <div>{{ address.city }}{{ address.state ? ', ' + address.state : '' }} {{ address.postalCode }}</div>
                  <div>{{ address.country }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Contacts -->
          <div v-if="customer.contacts.length > 1" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Additional Contacts</h3>
            <div class="space-y-3">
              <div
                v-for="contact in customer.contacts.filter(c => !c.isPrimary)"
                :key="contact.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ contact.firstName }} {{ contact.lastName }}
                  </h4>
                  <span
                    v-if="contact.position"
                    class="text-xs text-gray-500"
                  >
                    {{ contact.position }}
                  </span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    <span class="text-gray-500">Email:</span> {{ contact.email }}
                  </div>
                  <div v-if="contact.phone">
                    <span class="text-gray-500">Phone:</span> {{ contact.phone }}
                  </div>
                  <div v-if="contact.department">
                    <span class="text-gray-500">Dept:</span> {{ contact.department }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Financial, Statistics, Activities -->
        <div class="space-y-6">
          <!-- Financial Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Financial Information</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Credit Limit:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(customer.financial.creditLimit, customer.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Payment Terms:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.financial.paymentTerms }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Currency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ customer.financial.currency }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Discount:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.financial.discountPercentage }}%
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Credit Rating:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.financial.creditRating }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Tax Exempt:</span>
                <span
                  class="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="customer.financial.taxExemption ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ customer.financial.taxExemption ? 'Yes' : 'No' }}
                </span>
              </div>
              <div v-if="customer.financial.taxExemptionNumber">
                <span class="text-xs text-gray-500">Tax Exemption #:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.financial.taxExemptionNumber }}
                </span>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Statistics</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Total Orders:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.statistics.totalOrders.toLocaleString() }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Total Revenue:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(customer.statistics.totalRevenue, customer.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Average Order:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(customer.statistics.averageOrderValue, customer.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Outstanding Balance:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(customer.statistics.outstandingBalance, customer.financial.currency) }}
                </span>
              </div>
              <div v-if="customer.statistics.lastOrderDate">
                <span class="text-xs text-gray-500">Last Order:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(customer.statistics.lastOrderDate) }}
                </span>
              </div>
              <div v-if="customer.statistics.daysSinceLastOrder !== undefined">
                <span class="text-xs text-gray-500">Days Since Last Order:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ customer.statistics.daysSinceLastOrder }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div v-if="customer.activities?.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Recent Activities</h3>
            <div class="space-y-3">
              <div v-for="activity in customer.activities.slice(0, 3)" :key="activity.id">
                <div class="text-sm">
                  <div class="font-medium text-gray-900">{{ formatActivityType(activity.type) }}</div>
                  <div class="text-gray-700">{{ activity.description }}</div>
                  <div class="text-xs text-gray-500">
                    {{ formatDate(activity.date) }} - {{ activity.assignedTo }}
                  </div>
                  <div v-if="activity.outcome" class="text-xs text-gray-600 mt-1">
                    <span class="font-medium">Outcome:</span> {{ activity.outcome }}
                  </div>
                  <div v-if="activity.nextAction" class="text-xs text-gray-600">
                    <span class="font-medium">Next:</span> {{ activity.nextAction }}
                    <span v-if="activity.nextActionDate" class="ml-2">
                      ({{ formatDate(activity.nextActionDate) }})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notes -->
          <div v-if="customer.notes" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Notes</h3>
            <p class="text-sm text-gray-700">{{ customer.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-xs text-gray-500">Created:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(customer.createdAt) }}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500">Updated:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(customer.updatedAt) }}</span>
          </div>
          <div v-if="customer.convertedAt">
            <span class="text-xs text-gray-500">Converted:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(customer.convertedAt) }}</span>
          </div>
          <div v-if="customer.lastContactDate">
            <span class="text-xs text-gray-500">Last Contact:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(customer.lastContactDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Customer } from '../types'

// Props
interface Props {
  customer: Customer
}

const props = defineProps<Props>()

// Utility functions
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

const formatCustomerStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended',
    PROSPECT: 'Prospect',
    LEAD: 'Lead',
    CANCELLED: 'Cancelled'
  }
  return statusMap[status] || status
}

const formatCustomerType = (type: string): string => {
  const typeMap: Record<string, string> = {
    INDIVIDUAL: 'Individual',
    CORPORATE: 'Corporate',
    SME: 'SME',
    ENTERPRISE: 'Enterprise',
    PARTNER: 'Partner',
    DISTRIBUTOR: 'Distributor'
  }
  return typeMap[type] || type
}

const formatCustomerPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical'
  }
  return priorityMap[priority] || priority
}

const formatCustomerIndustry = (industry: string): string => {
  const industryMap: Record<string, string> = {
    TECHNOLOGY: 'Technology',
    HEALTHCARE: 'Healthcare',
    FINANCE: 'Finance',
    MANUFACTURING: 'Manufacturing',
    RETAIL: 'Retail',
    EDUCATION: 'Education',
    CONSTRUCTION: 'Construction',
    TRANSPORTATION: 'Transportation',
    ENERGY: 'Energy',
    TELECOMMUNICATIONS: 'Telecommunications',
    OTHER: 'Other'
  }
  return industryMap[industry] || industry
}

const formatCustomerSource = (source: string): string => {
  const sourceMap: Record<string, string> = {
    WEBSITE: 'Website',
    REFERRAL: 'Referral',
    COLD_CALL: 'Cold Call',
    TRADE_SHOW: 'Trade Show',
    SOCIAL_MEDIA: 'Social Media',
    ADVERTISING: 'Advertising',
    PARTNER: 'Partner',
    EXISTING_CUSTOMER: 'Existing Customer',
    OTHER: 'Other'
  }
  return sourceMap[source] || source
}

const formatAddressType = (type: string): string => {
  const typeMap: Record<string, string> = {
    BILLING: 'Billing Address',
    SHIPPING: 'Shipping Address',
    BOTH: 'Billing & Shipping Address'
  }
  return typeMap[type] || type
}

const formatActivityType = (type: string): string => {
  const typeMap: Record<string, string> = {
    CALL: 'Phone Call',
    EMAIL: 'Email',
    MEETING: 'Meeting',
    VISIT: 'Site Visit',
    QUOTE: 'Quote',
    ORDER: 'Order',
    COMPLAINT: 'Complaint',
    SUPPORT: 'Support'
  }
  return typeMap[type] || type
}
</script>
