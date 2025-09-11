<template>
  <div class="space-y-6">
    <!-- Header Information - Compact and Organized -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <!-- Main Header Row -->
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <!-- Left Side - Address Info -->
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
            <h2 class="text-2xl font-bold text-gray-900">{{ address.name }}</h2>
            <p v-if="address.description" class="text-sm text-gray-600">
              {{ address.description }}
            </p>
            <p v-if="address.companyName" class="text-sm text-gray-600">
              {{ address.companyName }}
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
              'bg-green-100 text-green-800': address.status === 'ACTIVE',
              'bg-red-100 text-red-800': address.status === 'INACTIVE',
              'bg-blue-100 text-blue-800': address.status === 'DEFAULT',
              'bg-purple-100 text-purple-800': address.status === 'VERIFIED',
              'bg-yellow-100 text-yellow-800': address.status === 'UNVERIFIED',
            }"
          >
            {{ formatStatus(address.status) }}
          </span>
          <span
            v-if="address.isDefault"
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm bg-sap-blue text-white"
          >
            Default Address
          </span>
          <span
            v-if="address.isVerified"
            class="inline-flex px-4 py-2 text-sm font-semibold rounded-full shadow-sm bg-green-100 text-green-800"
          >
            Verified
          </span>
        </div>
      </div>

      <!-- Information Grid - 2 Rows -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Row 1: Basic Info -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Address</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.addressLine1 }}</p>
            <p v-if="address.addressLine2" class="text-xs text-gray-600">
              {{ address.addressLine2 }}
            </p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Location</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ address.city }}, {{ address.state }} {{ address.postalCode }}
            </p>
            <p class="text-xs text-gray-600">{{ formatCountry(address.country) }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Contact Person</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.contactPerson || 'N/A' }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Phone</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.phone || 'N/A' }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Email</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.email || 'N/A' }}</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Timezone</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.timezone || 'N/A' }}</p>
          </div>
        </div>

        <!-- Row 2: Additional Info -->
        <div class="space-y-3">
          <div v-if="address.companyId">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Company ID</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.companyId }}</p>
          </div>
          <div v-if="address.taxId">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Tax ID</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.taxId }}</p>
          </div>
        </div>
      </div>

      <!-- Additional Reference Info - Compact Row -->
      <div
        v-if="address.latitude || address.longitude || address.businessLicense"
        class="mt-4 pt-4 border-t border-gray-200"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-if="address.latitude && address.longitude">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Coordinates</label
            >
            <p class="text-sm font-semibold text-gray-900">
              {{ address.latitude }}, {{ address.longitude }}
            </p>
          </div>
          <div v-if="address.businessLicense">
            <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide"
              >Business License</label
            >
            <p class="text-sm font-semibold text-gray-900">{{ address.businessLicense }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Address Types and Classification -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Address Types & Classification</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Address Types -->
        <div>
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Address Types</label
          >
          <div class="space-y-2">
            <span
              v-for="type in address.addressType"
              :key="type"
              class="inline-flex px-3 py-1 text-sm font-medium rounded-full mr-2 mb-2"
              :class="{
                'bg-blue-100 text-blue-800': type === 'BUSINESS',
                'bg-green-100 text-green-800': type === 'BILLING',
                'bg-yellow-100 text-yellow-800': type === 'SHIPPING',
                'bg-purple-100 text-purple-800': type === 'RESIDENTIAL',
                'bg-indigo-100 text-indigo-800': type === 'WAREHOUSE',
                'bg-pink-100 text-pink-800': type === 'BRANCH',
                'bg-orange-100 text-orange-800': type === 'HEADQUARTERS',
                'bg-teal-100 text-teal-800': type === 'OTHER',
              }"
            >
              {{ formatAddressType(type) }}
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
                {{ formatStatus(address.status) }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Default Address:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ address.isDefault ? 'Yes' : 'No' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Verified:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ address.isVerified ? 'Yes' : 'No' }}
              </span>
            </div>
          </div>
        </div>

        <!-- Verification Details -->
        <div v-if="address.isVerified">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Verification Details</label
          >
          <div class="space-y-2">
            <div>
              <span class="text-xs text-gray-500">Verified By:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ address.verifiedBy || 'System' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Verified At:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ address.verifiedAt ? formatDate(address.verifiedAt) : 'N/A' }}
              </span>
            </div>
            <div>
              <span class="text-xs text-gray-500">Method:</span>
              <span class="ml-2 text-sm font-medium text-gray-900">
                {{ address.verificationMethod || 'N/A' }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Geographic Information -->
    <div
      v-if="address.latitude || address.longitude || address.timezone"
      class="bg-white border border-gray-200 rounded-lg p-6"
    >
      <h4 class="text-sm font-medium text-gray-900 mb-3">Geographic Information</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-if="address.latitude && address.longitude">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Coordinates</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">
              <strong>Latitude:</strong> {{ address.latitude }}°<br />
              <strong>Longitude:</strong> {{ address.longitude }}°
            </p>
          </div>
        </div>

        <div v-if="address.timezone">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Timezone</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">{{ address.timezone }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tags and Notes -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <h4 class="text-sm font-medium text-gray-900 mb-3">Tags and Notes</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Tags -->
        <div v-if="address.tags.length > 0">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Tags</label
          >
          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in address.tags"
              :key="tag"
              class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
            >
              {{ tag }}
            </span>
          </div>
        </div>

        <!-- Notes -->
        <div v-if="address.notes">
          <label class="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2"
            >Notes</label
          >
          <div class="p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p class="text-sm text-gray-900">{{ address.notes }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Timestamps -->
    <div class="border-t pt-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
        <div><span class="font-medium">Created:</span> {{ formatDate(address.createdAt) }}</div>
        <div>
          <span class="font-medium">Last Updated:</span> {{ formatDate(address.updatedAt) }}
        </div>
        <div><span class="font-medium">Created By:</span> {{ address.createdBy || 'System' }}</div>
        <div><span class="font-medium">Updated By:</span> {{ address.updatedBy || 'System' }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Address } from '../types'

interface Props {
  address: Address
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
    case 'DEFAULT':
      return 'Default'
    case 'VERIFIED':
      return 'Verified'
    case 'UNVERIFIED':
      return 'Unverified'
    default:
      return status
  }
}

const formatCountry = (country: string): string => {
  switch (country) {
    case 'US':
      return 'United States'
    case 'CA':
      return 'Canada'
    case 'UK':
      return 'United Kingdom'
    case 'DE':
      return 'Germany'
    case 'FR':
      return 'France'
    case 'IT':
      return 'Italy'
    case 'ES':
      return 'Spain'
    case 'NL':
      return 'Netherlands'
    case 'BE':
      return 'Belgium'
    case 'CH':
      return 'Switzerland'
    case 'AT':
      return 'Austria'
    case 'AU':
      return 'Australia'
    case 'NZ':
      return 'New Zealand'
    case 'JP':
      return 'Japan'
    case 'CN':
      return 'China'
    case 'IN':
      return 'India'
    case 'BR':
      return 'Brazil'
    case 'MX':
      return 'Mexico'
    case 'AR':
      return 'Argentina'
    case 'CL':
      return 'Chile'
    default:
      return country
  }
}

const formatAddressType = (type: string): string => {
  switch (type) {
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'BUSINESS':
      return 'Business'
    case 'RESIDENTIAL':
      return 'Residential'
    case 'WAREHOUSE':
      return 'Warehouse'
    case 'BRANCH':
      return 'Branch'
    case 'HEADQUARTERS':
      return 'Headquarters'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}
</script>
