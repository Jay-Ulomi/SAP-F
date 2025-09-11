<template>
  <div class="space-y-6">
    <!-- License Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">{{ license.name }}</h2>
        <div class="flex items-center space-x-2">
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
          >
            {{ formatLicenseType(license.type) }}
          </span>
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': license.status === 'ACTIVE',
              'bg-red-100 text-red-800': license.status === 'EXPIRED',
              'bg-yellow-100 text-yellow-800': license.status === 'SUSPENDED',
              'bg-gray-100 text-gray-800': license.status === 'PENDING'
            }"
          >
            {{ formatStatus(license.status) }}
          </span>
          <span
            v-if="getDaysUntilExpiry(license.expiryDate) <= 30"
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800"
          >
            {{ getDaysUntilExpiryText(license.expiryDate) }}
          </span>
        </div>
      </div>
      <p class="text-gray-600">{{ license.description || 'No description provided' }}</p>
    </div>

    <!-- License Details -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">License Details</h3>
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">License Key</dt>
          <dd class="mt-1 text-sm text-gray-900 font-mono bg-gray-50 p-2 rounded">{{ license.licenseKey }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">License ID</dt>
          <dd class="mt-1 text-sm text-gray-900 font-mono">{{ license.id }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Vendor</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ license.vendor || 'Not specified' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Version</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ license.version || 'Not specified' }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Cost</dt>
          <dd class="mt-1 text-sm text-gray-900 font-semibold">{{ formatCurrency(license.cost) }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Expiry Date</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ formatDate(license.expiryDate) }}</dd>
        </div>
      </dl>
    </div>

    <!-- User Allocation -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">User Allocation</h3>
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-gray-700">Usage</span>
          <span class="text-sm text-gray-900">{{ license.assignedUsers || 0 }} / {{ license.maxUsers }} users</span>
        </div>
        <div class="w-full">
          <div class="w-full bg-gray-200 rounded-full h-3">
            <div 
              class="h-3 rounded-full transition-all duration-300"
              :class="{
                'bg-green-500': usagePercentage <= 70,
                'bg-yellow-500': usagePercentage > 70 && usagePercentage <= 90,
                'bg-red-500': usagePercentage > 90
              }"
              :style="{ width: usagePercentage + '%' }"
            ></div>
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-500">0%</span>
            <span class="text-xs text-gray-500">{{ Math.round(usagePercentage) }}% used</span>
            <span class="text-xs text-gray-500">100%</span>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4 pt-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-2xl font-semibold text-gray-900">{{ license.assignedUsers || 0 }}</div>
            <div class="text-sm text-gray-500">Assigned Users</div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-2xl font-semibold text-gray-900">{{ license.maxUsers - (license.assignedUsers || 0) }}</div>
            <div class="text-sm text-gray-500">Available Slots</div>
          </div>
        </div>
      </div>
    </div>

    <!-- License Settings -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">License Settings</h3>
      <dl class="space-y-4">
        <div class="flex items-center justify-between">
          <dt class="text-sm font-medium text-gray-500">Auto-Renewal</dt>
          <dd class="text-sm text-gray-900">
            <span v-if="license.autoRenewal" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Enabled
            </span>
            <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              Disabled
            </span>
          </dd>
        </div>
        <div class="flex items-center justify-between">
          <dt class="text-sm font-medium text-gray-500">Email Notifications</dt>
          <dd class="text-sm text-gray-900">
            <span v-if="license.sendNotifications !== false" class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              Enabled
            </span>
            <span v-else class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              Disabled
            </span>
          </dd>
        </div>
      </dl>
    </div>

    <!-- Additional Information -->
    <div v-if="license.notes" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Notes</h3>
      <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ license.notes }}</p>
    </div>

    <!-- License History (Mock) -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
      <div class="flow-root">
        <ul class="-mb-8">
          <li v-for="(activity, index) in licenseHistory" :key="activity.id">
            <div class="relative pb-8">
              <span
                v-if="index !== licenseHistory.length - 1"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    :class="{
                      'bg-green-500': activity.type === 'renewed',
                      'bg-blue-500': activity.type === 'created',
                      'bg-yellow-500': activity.type === 'updated',
                      'bg-red-500': activity.type === 'expired'
                    }"
                  >
                    <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="activity.type === 'renewed'" fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
                      <path v-else-if="activity.type === 'created'" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                      <path v-else-if="activity.type === 'updated'" fill-rule="evenodd" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" clip-rule="evenodd" />
                      <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-900">{{ activity.description }}</p>
                    <p class="text-xs text-gray-500">by {{ activity.user }}</p>
                  </div>
                  <div class="text-right text-sm whitespace-nowrap text-gray-500">
                    {{ formatRelativeTime(activity.timestamp) }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface License {
  id: string
  name: string
  licenseKey: string
  type: string
  status: string
  expiryDate: string
  assignedUsers: number
  maxUsers: number
  cost: number
  vendor?: string
  version?: string
  description?: string
  notes?: string
  autoRenewal?: boolean
  sendNotifications?: boolean
}

interface Props {
  license: License
}

defineProps<Props>()

// Mock license history
const licenseHistory = computed(() => [
  {
    id: '1',
    type: 'updated',
    description: 'License details updated',
    user: 'admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '2',
    type: 'renewed',
    description: 'License renewed for 1 year',
    user: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 30 days ago
  },
  {
    id: '3',
    type: 'created',
    description: 'License created',
    user: 'admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365), // 1 year ago
  },
])

// Computed properties
const usagePercentage = computed(() => {
  const props = defineProps<Props>()
  if (!props.license.maxUsers) return 0
  return Math.min(((props.license.assignedUsers || 0) / props.license.maxUsers) * 100, 100)
})

// Utility functions
const formatLicenseType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'USER': 'User License',
    'SERVER': 'Server License',
    'MODULE': 'Module License',
    'ADDON': 'Add-on License',
    'DEVELOPER': 'Developer License'
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'ACTIVE': 'Active',
    'EXPIRED': 'Expired',
    'SUSPENDED': 'Suspended',
    'PENDING': 'Pending'
  }
  return statusMap[status] || status
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const getDaysUntilExpiryText = (expiryDate: string): string => {
  const days = getDaysUntilExpiry(expiryDate)
  if (days < 0) return `Expired ${Math.abs(days)} days ago`
  if (days === 0) return 'Expires today'
  if (days === 1) return 'Expires tomorrow'
  if (days <= 30) return `Expires in ${days} days`
  return ''
}

const formatRelativeTime = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  
  return formatDate(date.toISOString().split('T')[0])
}
</script>