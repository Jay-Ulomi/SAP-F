<template>
  <div class="space-y-6">
    <!-- Header Information - Professional Layout -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Main Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <!-- Left Side - Lead Info -->
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
            <h2 class="text-2xl font-bold text-gray-900">{{ lead.companyName }}</h2>
            <p class="text-sm text-gray-600">{{ lead.leadCode }}</p>
            <p class="text-sm text-gray-600">{{ lead.leadName }}</p>
          </div>
        </div>

        <!-- Right Side - Status and Actions -->
        <div
          class="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4"
        >
          <span
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            :class="{
              'bg-gray-100 text-gray-800': lead.status === 'NEW',
              'bg-blue-100 text-blue-800': lead.status === 'CONTACTED',
              'bg-green-100 text-green-800': lead.status === 'QUALIFIED',
              'bg-yellow-100 text-yellow-800': lead.status === 'PROPOSAL_SENT',
              'bg-orange-100 text-orange-800': lead.status === 'NEGOTIATION',
              'bg-emerald-100 text-emerald-800': lead.status === 'WON',
              'bg-red-100 text-red-800': lead.status === 'LOST',
              'bg-slate-100 text-slate-800': lead.status === 'DISQUALIFIED',
            }"
          >
            {{ formatStatus(lead.status) }}
          </span>
          <span
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            :class="{
              'bg-gray-100 text-gray-800': lead.priority === 'LOW',
              'bg-blue-100 text-blue-800': lead.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': lead.priority === 'HIGH',
              'bg-red-100 text-red-800': lead.priority === 'URGENT',
            }"
          >
            {{ formatPriority(lead.priority) }}
          </span>
        </div>
      </div>

      <!-- Financial Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 border-t border-gray-200">
        <!-- Estimated Value -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{ formatCurrency(lead.financial.estimatedValue) }}
          </p>
          <p class="text-sm text-gray-600">Estimated Value</p>
        </div>

        <!-- Probability -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">{{ lead.financial.probability }}%</p>
          <p class="text-sm text-gray-600">Probability</p>
        </div>

        <!-- Expected Close Date -->
        <div class="text-center">
          <p class="text-2xl font-bold text-gray-900">
            {{
              lead.financial.expectedCloseDate
                ? formatDate(lead.financial.expectedCloseDate)
                : 'N/A'
            }}
          </p>
          <p class="text-sm text-gray-600">Expected Close</p>
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
            {{ formatLeadType(lead.type) }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Source</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ formatSource(lead.source) }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Industry</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.industry || '-' }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Website</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.website || '-' }}</p>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Currency</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.financial.currency }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Budget</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ lead.financial.budget ? formatCurrency(lead.financial.budget) : '-' }}
          </p>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Decision Maker</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ lead.financial.decisionMaker || '-' }}
          </p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Campaign</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.campaign || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Additional Financial Info - Compact Row -->
    <div class="mt-4 pt-4 border-t border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Assigned Sales Rep</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.assignedSalesRep || '-' }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Assigned To</label
          >
          <p class="text-sm font-semibold text-gray-900">{{ lead.assignedTo || '-' }}</p>
        </div>
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
            >Next Follow-up</label
          >
          <p class="text-sm font-semibold text-gray-900">
            {{ lead.nextFollowUpDate ? formatDate(lead.nextFollowUpDate) : '-' }}
          </p>
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
          v-for="contact in lead.contacts"
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
          v-for="address in lead.addresses"
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

    <!-- Activities -->
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
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          ></path>
        </svg>
        Activities
      </h4>

      <div v-if="lead.activities.length === 0" class="text-center py-8 text-gray-500">
        No activities recorded yet.
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="activity in lead.activities"
          :key="activity.id"
          class="p-4 bg-gray-50 rounded-lg border border-gray-200"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center space-x-3">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 class="text-sm font-semibold text-gray-900">{{ activity.subject }}</h5>
                <p class="text-xs text-gray-600">{{ formatActivityType(activity.type) }}</p>
              </div>
            </div>
            <span
              class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-green-100 text-green-800': activity.status === 'COMPLETED',
                'bg-yellow-100 text-yellow-800': activity.status === 'PENDING',
                'bg-red-100 text-red-800': activity.status === 'CANCELLED',
              }"
            >
              {{ activity.status }}
            </span>
          </div>

          <div class="ml-11 space-y-2">
            <p class="text-sm text-gray-700">{{ activity.description }}</p>
            <div class="flex items-center space-x-4 text-xs text-gray-500">
              <span>{{ formatDate(activity.date) }}</span>
              <span>Assigned to: {{ activity.assignedTo }}</span>
            </div>
            <div v-if="activity.notes" class="pt-2 border-t border-gray-200">
              <label class="block text-xs font-medium text-gray-500">Notes</label>
              <p class="text-sm text-gray-700">{{ activity.notes }}</p>
            </div>
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
            <p class="text-sm text-gray-900">{{ lead.notes || 'No notes available' }}</p>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in lead.tags"
              :key="tag"
              class="inline-flex px-2 py-1 text-xs font-medium bg-sap-blue text-white rounded-full"
            >
              {{ tag }}
            </span>
            <span v-if="lead.tags.length === 0" class="text-sm text-gray-500">No tags</span>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Created</label>
            <p class="text-sm text-gray-900">{{ formatDate(lead.createdAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
            <p class="text-sm text-gray-900">{{ formatDate(lead.updatedAt) }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Activity</label>
            <p class="text-sm text-gray-900">
              {{ lead.lastActivityDate ? formatDate(lead.lastActivityDate) : 'N/A' }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <p class="text-sm text-gray-900">{{ lead.phone }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <p class="text-sm text-gray-900">{{ lead.email }}</p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Fax</label>
            <p class="text-sm text-gray-900">{{ lead.fax || 'N/A' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Lead } from '../types'

interface Props {
  lead: Lead
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
    case 'NEW':
      return 'New'
    case 'CONTACTED':
      return 'Contacted'
    case 'QUALIFIED':
      return 'Qualified'
    case 'PROPOSAL_SENT':
      return 'Proposal Sent'
    case 'NEGOTIATION':
      return 'Negotiation'
    case 'WON':
      return 'Won'
    case 'LOST':
      return 'Lost'
    case 'DISQUALIFIED':
      return 'Disqualified'
    default:
      return status
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

const formatLeadType = (type: string): string => {
  switch (type) {
    case 'PROSPECT':
      return 'Prospect'
    case 'POTENTIAL_CUSTOMER':
      return 'Potential Customer'
    case 'EXISTING_CUSTOMER':
      return 'Existing Customer'
    case 'PARTNER':
      return 'Partner'
    default:
      return type
  }
}

const formatSource = (source: string): string => {
  switch (source) {
    case 'WEBSITE':
      return 'Website'
    case 'REFERRAL':
      return 'Referral'
    case 'TRADE_SHOW':
      return 'Trade Show'
    case 'SOCIAL_MEDIA':
      return 'Social Media'
    case 'EMAIL_CAMPAIGN':
      return 'Email Campaign'
    case 'COLD_CALL':
      return 'Cold Call'
    case 'PARTNER':
      return 'Partner'
    case 'ADVERTISING':
      return 'Advertising'
    case 'OTHER':
      return 'Other'
    default:
      return source
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

const formatActivityType = (type: string): string => {
  switch (type) {
    case 'CALL':
      return 'Phone Call'
    case 'EMAIL':
      return 'Email'
    case 'MEETING':
      return 'Meeting'
    case 'PROPOSAL':
      return 'Proposal'
    case 'FOLLOW_UP':
      return 'Follow-up'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}
</script>
