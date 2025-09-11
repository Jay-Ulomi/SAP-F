<template>
  <div class="space-y-6">
    <!-- Header Information - Compact and Organized -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Main Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <!-- Left Side - Contact Info -->
        <div class="flex items-center space-x-4 mb-4 lg:mb-0">
          <div class="p-3 bg-sap-blue bg-opacity-20 rounded-lg">
            <svg
              class="w-8 h-8 text-sap-blue"
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
            <h2 class="text-2xl font-bold text-gray-900">
              {{ contact.title }} {{ contact.firstName }} {{ contact.lastName }}
            </h2>
            <p v-if="contact.position" class="text-sm text-gray-600">{{ contact.position }}</p>
            <p v-if="contact.department" class="text-sm text-gray-600">{{ contact.department }}</p>
            <p v-if="contact.companyName" class="text-sm text-gray-600">
              {{ contact.companyName }}
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
              'bg-green-100 text-green-800': contact.status === 'ACTIVE',
              'bg-red-100 text-red-800': contact.status === 'INACTIVE',
              'bg-gray-100 text-gray-800': contact.status === 'FORMER_EMPLOYEE',
              'bg-yellow-100 text-yellow-800': contact.status === 'ON_LEAVE',
            }"
          >
            {{ formatStatus(contact.status) }}
          </span>
          <span
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm"
            :class="{
              'bg-blue-100 text-blue-800': contact.category === 'CUSTOMER',
              'bg-green-100 text-green-800': contact.category === 'VENDOR',
              'bg-purple-100 text-purple-800': contact.category === 'PARTNER',
              'bg-gray-100 text-gray-800': contact.category === 'INTERNAL',
              'bg-yellow-100 text-yellow-800': contact.category === 'PROSPECT',
            }"
          >
            {{ formatCategory(contact.category) }}
          </span>
          <span
            v-if="contact.isPrimary"
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm bg-sap-blue text-white"
          >
            Primary Contact
          </span>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1: Basic Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Email</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.email }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Phone</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.phone || 'N/A' }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Mobile</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.mobile || 'N/A' }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Fax</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.fax || 'N/A' }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Preferred Method</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ formatContactMethod(contact.preferredContactMethod) }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Skype</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.skype || 'N/A' }}</p>
          </div>
        </div>

        <!-- Row 2: Additional Info -->
        <div class="space-y-3">
          <div v-if="contact.businessCard">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Business Card</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.businessCard }}</p>
          </div>
          <div v-if="contact.linkedIn || contact.website">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Online Profiles</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ contact.linkedIn ? 'LinkedIn' : ''
              }}{{ contact.linkedIn && contact.website ? ', ' : ''
              }}{{ contact.website ? 'Website' : '' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="
          contact.addressLine1 ||
          contact.city ||
          contact.state ||
          contact.birthday ||
          contact.anniversary
        "
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-if="contact.addressLine1">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Address</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ contact.addressLine1 }}</p>
            <p v-if="contact.addressLine2" class="text-xs text-gray-600">
              {{ contact.addressLine2 }}
            </p>
            <p
              v-if="contact.city || contact.state || contact.postalCode"
              class="text-xs text-gray-600"
            >
              {{ [contact.city, contact.state, contact.postalCode].filter(Boolean).join(', ') }}
            </p>
            <p v-if="contact.country" class="text-xs text-gray-600">{{ contact.country }}</p>
          </div>
          <div v-if="contact.birthday || contact.anniversary">
            <div v-if="contact.birthday">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                >Birthday</label
              >
              <p class="text-sm font-semibold text-gray-900">{{ formatDate(contact.birthday) }}</p>
            </div>
            <div v-if="contact.anniversary" class="mt-2">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                >Anniversary</label
              >
              <p class="text-sm font-semibold text-gray-900">
                {{ formatDate(contact.anniversary) }}
              </p>
            </div>
          </div>
          <div v-if="contact.language || contact.timezone">
            <div v-if="contact.language">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                >Language</label
              >
              <p class="text-sm font-semibold text-gray-900">{{ contact.language }}</p>
            </div>
            <div v-if="contact.timezone" class="mt-2">
              <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
                >Timezone</label
              >
              <p class="text-sm font-semibold text-gray-900">{{ contact.timezone }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Types and Classification -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Contact Types & Classification</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Contact Types -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Contact Types</label
          >
          <div class="space-y-2">
            <span
              v-for="type in contact.contactType"
              :key="type"
              class="inline-flex px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2"
              :class="{
                'bg-blue-100 text-blue-800': type === 'PRIMARY',
                'bg-green-100 text-green-800': type === 'BILLING',
                'bg-yellow-100 text-yellow-800': type === 'SHIPPING',
                'bg-purple-100 text-purple-800': type === 'TECHNICAL',
                'bg-indigo-100 text-indigo-800': type === 'DECISION_MAKER',
                'bg-pink-100 text-pink-800': type === 'ACCOUNTS_PAYABLE',
                'bg-orange-100 text-orange-800': type === 'ACCOUNTS_RECEIVABLE',
                'bg-teal-100 text-teal-800': type === 'SALES',
                'bg-cyan-100 text-cyan-800': type === 'SUPPORT',
                'bg-gray-100 text-gray-800': type === 'OTHER',
              }"
            >
              {{ formatContactType(type) }}
            </span>
          </div>
        </div>

        <!-- Status Information -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Status Information</label
          >
          <div class="space-y-2">
            <div>
              <span class="text-xs text-gray-500">Status:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ formatStatus(contact.status) }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Category:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ formatCategory(contact.category) }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Primary Contact:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ contact.isPrimary ? 'Yes' : 'No' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Preferences</label
          >
          <div class="space-y-2">
            <div>
              <span class="text-xs text-gray-500">Do Not Contact:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ contact.doNotContact ? 'Yes' : 'No' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Marketing Opt-in:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ contact.marketingOptIn ? 'Yes' : 'No' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Preferred Method:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ formatContactMethod(contact.preferredContactMethod) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Business Information -->
    <div
      v-if="contact.linkedIn || contact.website"
      class="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h4 class="text-sm font-medium text-gray-900 mb-3">Business Information</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="contact.linkedIn">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >LinkedIn Profile</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <a
              :href="
                contact.linkedIn.startsWith('http')
                  ? contact.linkedIn
                  : `https://${contact.linkedIn}`
              "
              target="_blank"
              class="text-sap-blue hover:text-sap-dark-blue text-sm"
            >
              {{ contact.linkedIn }}
            </a>
          </div>
        </div>

        <div v-if="contact.website">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Website</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <a
              :href="
                contact.website.startsWith('http') ? contact.website : `https://${contact.website}`
              "
              target="_blank"
              class="text-sap-blue hover:text-sap-dark-blue text-sm"
            >
              {{ contact.website }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Tags and Notes -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Tags and Notes</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Tags -->
        <div v-if="contact.tags.length > 0">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Tags</label
          >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in contact.tags"
              :key="tag"
              class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="contact.notes">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Notes</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">{{ contact.notes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timestamps -->
    <div class="border-t pt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(contact.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(contact.updatedAt) }}
        </div>
        <div><span class="font-medium">Created By:</span> {{ contact.createdBy || 'System' }}</div>
        <div><span class="font-medium">Updated By:</span> {{ contact.updatedBy || 'System' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactPerson } from '../types'

interface Props {
  contact: ContactPerson
}

defineProps<Props>()

// Utility functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'Active'
    case 'INACTIVE':
      return 'Inactive'
    case 'FORMER_EMPLOYEE':
      return 'Former Employee'
    case 'ON_LEAVE':
      return 'On Leave'
    default:
      return status
  }
}

const formatCategory = (category: string): string => {
  switch (category) {
    case 'CUSTOMER':
      return 'Customer'
    case 'VENDOR':
      return 'Vendor'
    case 'PARTNER':
      return 'Partner'
    case 'INTERNAL':
      return 'Internal'
    case 'PROSPECT':
      return 'Prospect'
    default:
      return category
  }
}

const formatContactMethod = (method: string): string => {
  switch (method) {
    case 'EMAIL':
      return 'Email'
    case 'PHONE':
      return 'Phone'
    case 'MOBILE':
      return 'Mobile'
    case 'FAX':
      return 'Fax'
    case 'MAIL':
      return 'Mail'
    case 'IN_PERSON':
      return 'In Person'
    default:
      return method
  }
}

const formatContactType = (type: string): string => {
  switch (type) {
    case 'PRIMARY':
      return 'Primary'
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'TECHNICAL':
      return 'Technical'
    case 'DECISION_MAKER':
      return 'Decision Maker'
    case 'ACCOUNTS_PAYABLE':
      return 'Accounts Payable'
    case 'ACCOUNTS_RECEIVABLE':
      return 'Accounts Receivable'
    case 'SALES':
      return 'Sales'
    case 'SUPPORT':
      return 'Support'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}
</script>
