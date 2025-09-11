<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ contact.firstName }} {{ contact.lastName }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ contact.companyName || 'Individual Contact' }}</p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ contact.contactCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': contact.status === 'ACTIVE',
              'bg-gray-100 text-gray-800': contact.status === 'INACTIVE',
              'bg-yellow-100 text-yellow-800': contact.status === 'SUSPENDED',
              'bg-blue-100 text-blue-800': contact.status === 'PROSPECT',
              'bg-purple-100 text-purple-800': contact.status === 'LEAD',
              'bg-red-100 text-red-800': contact.status === 'CANCELLED'
            }"
          >
            {{ formatContactStatus(contact.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatContactType(contact.type) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': contact.priority === 'LOW',
              'bg-blue-100 text-blue-800': contact.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': contact.priority === 'HIGH',
              'bg-red-100 text-red-800': contact.priority === 'CRITICAL'
            }"
          >
            {{ formatContactPriority(contact.priority) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Contact Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Basic Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Job Title:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.jobTitle || 'N/A' }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Department:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.department || 'N/A' }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Category:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatContactCategory(contact.category) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Source:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatContactSource(contact.source) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ contact.assignedTo }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Lead Score:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ contact.leadScore }}/100</span>
              </div>
              <div v-if="contact.website">
                <span class="text-xs text-gray-500">Website:</span>
                <a :href="contact.website" target="_blank" class="ml-2 text-sm font-medium text-sap-blue hover:text-sap-dark-blue">
                  {{ contact.website }}
                </a>
              </div>
              <div v-if="contact.description">
                <span class="text-xs text-gray-500">Description:</span>
                <span class="ml-2 text-sm text-gray-900">{{ contact.description }}</span>
              </div>
            </div>
            <div v-if="contact.tags.length > 0" class="mt-4">
              <span class="text-xs text-gray-500">Tags:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="tag in contact.tags"
                  :key="tag"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Communications -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Communications</h3>
            <div class="space-y-3">
              <div
                v-for="communication in contact.communications"
                :key="communication.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ formatCommunicationType(communication.type) }}
                  </h4>
                  <div class="flex items-center space-x-2">
                    <span
                      v-if="communication.isPrimary"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
                    >
                      Primary
                    </span>
                    <span
                      v-if="communication.isVerified"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                    >
                      Verified
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  <div class="font-medium">{{ communication.value }}</div>
                  <div v-if="communication.notes" class="text-gray-600 mt-1">
                    {{ communication.notes }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Addresses -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Addresses</h3>
            <div class="space-y-4">
              <div
                v-for="address in contact.addresses"
                :key="address.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ formatAddressType(address.type) }}
                  </h4>
                  <div class="flex items-center space-x-2">
                    <span
                      v-if="address.isDefault"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
                    >
                      Default
                    </span>
                    <span
                      v-if="address.isVerified"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                    >
                      Verified
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  <div>{{ address.street }}</div>
                  <div>{{ address.city }}{{ address.state ? ', ' + address.state : '' }} {{ address.postalCode }}</div>
                  <div>{{ address.country }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Relationships -->
          <div v-if="contact.relationships.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Relationships</h3>
            <div class="space-y-3">
              <div
                v-for="relationship in contact.relationships"
                :key="relationship.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ formatRelationshipType(relationship.type) }}
                  </h4>
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': relationship.relationshipStrength === 'WEAK',
                      'bg-yellow-100 text-yellow-800': relationship.relationshipStrength === 'MODERATE',
                      'bg-green-100 text-green-800': relationship.relationshipStrength === 'STRONG'
                    }"
                  >
                    {{ formatRelationshipStrength(relationship.relationshipStrength) }}
                  </span>
                </div>
                <div class="text-sm text-gray-700">
                  <div><span class="font-medium">Entity:</span> {{ relationship.entityName }}</div>
                  <div><span class="font-medium">Type:</span> {{ relationship.entityType }}</div>
                  <div><span class="font-medium">Start Date:</span> {{ formatDate(relationship.startDate) }}</div>
                  <div v-if="relationship.endDate">
                    <span class="font-medium">End Date:</span> {{ formatDate(relationship.endDate) }}
                  </div>
                  <div v-if="relationship.notes">
                    <span class="font-medium">Notes:</span> {{ relationship.notes }}
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
                  {{ formatCurrency(contact.financial.creditLimit, contact.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Payment Terms:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ contact.financial.paymentTerms }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Currency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ contact.financial.currency }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Discount:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.financial.discountPercentage }}%
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Credit Rating:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.financial.creditRating }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Outstanding Balance:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(contact.financial.outstandingBalance, contact.financial.currency) }}
                </span>
              </div>
              <div v-if="contact.financial.lastPaymentDate">
                <span class="text-xs text-gray-500">Last Payment:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(contact.financial.lastPaymentDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Statistics -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Statistics</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Total Interactions:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.statistics.totalInteractions.toLocaleString() }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Total Value:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(contact.statistics.totalValue, contact.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Average Interaction:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(contact.statistics.averageInteractionValue, contact.financial.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Conversion Rate:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.statistics.conversionRate }}%
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Lifetime Value:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(contact.statistics.lifetimeValue, contact.financial.currency) }}
                </span>
              </div>
              <div v-if="contact.statistics.lastInteractionDate">
                <span class="text-xs text-gray-500">Last Interaction:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(contact.statistics.lastInteractionDate) }}
                </span>
              </div>
              <div v-if="contact.statistics.daysSinceLastInteraction !== undefined">
                <span class="text-xs text-gray-500">Days Since Last:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ contact.statistics.daysSinceLastInteraction }}
                </span>
              </div>
            </div>
          </div>

          <!-- Recent Activities -->
          <div v-if="contact.activities?.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Recent Activities</h3>
            <div class="space-y-3">
              <div v-for="activity in contact.activities.slice(0, 3)" :key="activity.id">
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
          <div v-if="contact.notes" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Notes</h3>
            <p class="text-sm text-gray-700">{{ contact.notes }}</p>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-xs text-gray-500">Created:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(contact.createdAt) }}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500">Updated:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(contact.updatedAt) }}</span>
          </div>
          <div v-if="contact.convertedAt">
            <span class="text-xs text-gray-500">Converted:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(contact.convertedAt) }}</span>
          </div>
          <div v-if="contact.lastContactDate">
            <span class="text-xs text-gray-500">Last Contact:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(contact.lastContactDate) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '../types'

// Props
interface Props {
  contact: Contact
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

const formatContactStatus = (status: string): string => {
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

const formatContactType = (type: string): string => {
  const typeMap: Record<string, string> = {
    INDIVIDUAL: 'Individual',
    CORPORATE: 'Corporate',
    PARTNER: 'Partner',
    VENDOR: 'Vendor',
    CUSTOMER: 'Customer',
    SUPPLIER: 'Supplier'
  }
  return typeMap[type] || type
}

const formatContactPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical'
  }
  return priorityMap[priority] || priority
}

const formatContactCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    SALES: 'Sales',
    MARKETING: 'Marketing',
    SUPPORT: 'Support',
    PARTNER: 'Partner',
    VENDOR: 'Vendor',
    CUSTOMER: 'Customer',
    OTHER: 'Other'
  }
  return categoryMap[category] || category
}

const formatContactSource = (source: string): string => {
  const sourceMap: Record<string, string> = {
    WEBSITE: 'Website',
    REFERRAL: 'Referral',
    COLD_CALL: 'Cold Call',
    TRADE_SHOW: 'Trade Show',
    SOCIAL_MEDIA: 'Social Media',
    ADVERTISING: 'Advertising',
    PARTNER: 'Partner',
    EXISTING_CONTACT: 'Existing Contact',
    OTHER: 'Other'
  }
  return sourceMap[source] || source
}

const formatCommunicationType = (type: string): string => {
  const typeMap: Record<string, string> = {
    EMAIL: 'Email',
    PHONE: 'Phone',
    MOBILE: 'Mobile',
    FAX: 'Fax',
    WEBSITE: 'Website',
    SOCIAL_MEDIA: 'Social Media'
  }
  return typeMap[type] || type
}

const formatAddressType = (type: string): string => {
  const typeMap: Record<string, string> = {
    BILLING: 'Billing Address',
    SHIPPING: 'Shipping Address',
    BOTH: 'Billing & Shipping Address'
  }
  return typeMap[type] || type
}

const formatRelationshipType = (type: string): string => {
  const typeMap: Record<string, string> = {
    CUSTOMER: 'Customer',
    VENDOR: 'Vendor',
    PARTNER: 'Partner',
    EMPLOYEE: 'Employee',
    CONTRACTOR: 'Contractor',
    OTHER: 'Other'
  }
  return typeMap[type] || type
}

const formatRelationshipStrength = (strength: string): string => {
  const strengthMap: Record<string, string> = {
    WEAK: 'Weak',
    MODERATE: 'Moderate',
    STRONG: 'Strong'
  }
  return strengthMap[strength] || strength
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
