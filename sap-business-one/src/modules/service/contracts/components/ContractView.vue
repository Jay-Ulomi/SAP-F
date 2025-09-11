<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ contract.contractNumber }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ contract.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Customer: {{ contract.customerName }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span :class="getStatusBadgeClass(contract.status)">
            {{ formatStatus(contract.status) }}
          </span>
          <span class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {{ formatType(contract.type) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Contract Details -->
    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <!-- Left Column - Basic Info -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Contract Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Value</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(contract.value, contract.currency) }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Start Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.startDate) }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">End Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.endDate) }}</dd>
              </div>
              <div v-if="contract.renewalDate">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Renewal Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.renewalDate) }}</dd>
              </div>
            </dl>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Service Dates</h3>
            <dl class="space-y-2">
              <div v-if="contract.lastServiceDate">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Last Service</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.lastServiceDate) }}</dd>
              </div>
              <div v-if="contract.nextServiceDate">
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Next Service</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.nextServiceDate) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Middle Column - Coverage Details -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Coverage Details</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Response Time</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  {{ contract.coverageDetails.responseTime }} {{ contract.coverageDetails.responseTimeUnit }}
                </dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Business Hours</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ contract.coverageDetails.businessHours }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Coverage Includes</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <div class="flex flex-wrap gap-1">
                    <span v-if="contract.coverageDetails.includesLabor" 
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Labor
                    </span>
                    <span v-if="contract.coverageDetails.includesParts"
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Parts
                    </span>
                    <span v-if="contract.coverageDetails.includesTravel"
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Travel
                    </span>
                    <span v-if="contract.coverageDetails.weekends"
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Weekends
                    </span>
                    <span v-if="contract.coverageDetails.holidays"
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      Holidays
                    </span>
                  </div>
                </dd>
              </div>
            </dl>
          </div>

          <div v-if="contract.coverageDetails.exclusions && contract.coverageDetails.exclusions.length > 0" 
               class="bg-yellow-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Exclusions</h3>
            <ul class="text-sm text-gray-700 space-y-1">
              <li v-for="exclusion in contract.coverageDetails.exclusions" :key="exclusion" class="flex items-start">
                <span class="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                {{ exclusion }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column - Contact & Billing -->
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Contact Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Contact Person</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ contract.contactPerson }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a :href="`mailto:${contract.contactEmail}`" class="text-sap-blue hover:text-sap-blue-dark">
                    {{ contract.contactEmail }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Phone</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <a :href="`tel:${contract.contactPhone}`" class="text-sap-blue hover:text-sap-blue-dark">
                    {{ contract.contactPhone }}
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 mb-3">Billing Information</h3>
            <dl class="space-y-2">
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Frequency</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatBillingFrequency(contract.billingSchedule.frequency) }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Amount</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatCurrency(contract.billingSchedule.amount, contract.currency) }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Next Billing</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(contract.billingSchedule.nextBillingDate) }}</dd>
              </div>
              <div>
                <dt class="text-xs font-medium text-gray-500 uppercase tracking-wide">Auto Renewal</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <span :class="contract.billingSchedule.autoRenewal ? 'text-green-600' : 'text-red-600'">
                    {{ contract.billingSchedule.autoRenewal ? 'Enabled' : 'Disabled' }}
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <!-- Equipment List -->
      <div v-if="contract.equipment && contract.equipment.length > 0" class="mt-6">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Covered Equipment</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            <div v-for="equipmentId in contract.equipment" :key="equipmentId"
                 class="bg-white px-3 py-2 rounded border text-sm text-gray-700">
              Equipment ID: {{ equipmentId }}
            </div>
          </div>
        </div>
      </div>

      <!-- Service Levels -->
      <div v-if="contract.serviceLevels && contract.serviceLevels.length > 0" class="mt-6">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Service Levels</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <div class="space-y-3">
            <div v-for="level in contract.serviceLevels" :key="level.id"
                 class="bg-white p-3 rounded border">
              <div class="flex items-center justify-between">
                <h4 class="text-sm font-medium text-gray-900">{{ level.name }}</h4>
                <span :class="getPriorityBadgeClass(level.priority)">
                  {{ formatPriority(level.priority) }}
                </span>
              </div>
              <div class="mt-2 grid grid-cols-2 gap-4 text-xs text-gray-600">
                <div>Response: {{ level.responseTime }} {{ level.responseTimeUnit }}</div>
                <div>Resolution: {{ level.resolutionTime }} {{ level.resolutionTimeUnit }}</div>
              </div>
              <div class="mt-1 text-xs text-gray-600">Availability: {{ level.availability }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div v-if="contract.notes" class="mt-6">
        <h3 class="text-sm font-medium text-gray-900 mb-3">Notes</h3>
        <div class="bg-gray-50 rounded-lg p-4">
          <p class="text-sm text-gray-700 whitespace-pre-wrap">{{ contract.notes }}</p>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 text-xs text-gray-500 border-t pt-4">
        <div class="flex justify-between">
          <span>Created: {{ formatDateTime(contract.createdAt) }} by {{ contract.createdBy }}</span>
          <span>Last updated: {{ formatDateTime(contract.updatedAt) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceContract, ServiceContractStatus, ContractType, ServiceCallPriority } from '../../types'

interface Props {
  contract: ServiceContract
}

defineProps<Props>()

// Utility functions
const formatStatus = (status: ServiceContractStatus) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatType = (type: ContractType) => {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const formatPriority = (priority: ServiceCallPriority) => {
  return priority.replace(/\b\w/g, l => l.toUpperCase())
}

const formatBillingFrequency = (frequency: string) => {
  return frequency.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

const getStatusBadgeClass = (status: ServiceContractStatus) => {
  const baseClasses = 'inline-flex px-3 py-1 text-sm font-medium rounded-full'
  switch (status) {
    case 'active':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'expired':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'cancelled':
      return `${baseClasses} bg-gray-100 text-gray-800`
    case 'suspended':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'renewed':
      return `${baseClasses} bg-blue-100 text-blue-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const getPriorityBadgeClass = (priority: ServiceCallPriority) => {
  const baseClasses = 'inline-flex px-2 py-1 text-xs font-medium rounded-full'
  switch (priority) {
    case 'critical':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'high':
      return `${baseClasses} bg-orange-100 text-orange-800`
    case 'medium':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'low':
      return `${baseClasses} bg-green-100 text-green-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(amount)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}
</script>