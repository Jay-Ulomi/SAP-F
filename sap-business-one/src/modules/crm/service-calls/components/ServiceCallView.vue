<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ serviceCall.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ serviceCall.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ serviceCall.serviceCallCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-blue-100 text-blue-800': serviceCall.status === 'OPEN',
              'bg-yellow-100 text-yellow-800': serviceCall.status === 'IN_PROGRESS',
              'bg-orange-100 text-orange-800': serviceCall.status === 'ON_HOLD',
              'bg-green-100 text-green-800': serviceCall.status === 'RESOLVED',
              'bg-gray-100 text-gray-800': serviceCall.status === 'CLOSED',
              'bg-red-100 text-red-800': serviceCall.status === 'CANCELLED',
            }"
          >
            {{ formatServiceCallStatus(serviceCall.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': serviceCall.priority === 'LOW',
              'bg-blue-100 text-blue-800': serviceCall.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': serviceCall.priority === 'HIGH',
              'bg-red-100 text-red-800': serviceCall.priority === 'CRITICAL',
            }"
          >
            {{ formatServiceCallPriority(serviceCall.priority) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatServiceCallType(serviceCall.type) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Service Call Details -->
    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <!-- Left Column - Basic Info -->
        <div class="xl:col-span-2 space-y-4 sm:space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Basic Information
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatServiceCallStatus(serviceCall.status) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Priority:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatServiceCallPriority(serviceCall.priority) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Type:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatServiceCallType(serviceCall.type) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Category:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatServiceCallCategory(serviceCall.category) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Source:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatServiceCallSource(serviceCall.source) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Customer Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ serviceCall.customerName }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ serviceCall.assignedTo }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Created:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.createdAt) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description & Notes -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Description & Notes
            </h3>
            <div class="space-y-3">
              <div v-if="serviceCall.description">
                <span class="text-xs text-gray-500">Description:</span>
                <p class="mt-1 text-sm text-gray-700">{{ serviceCall.description }}</p>
              </div>
              <div v-if="serviceCall.notes">
                <span class="text-xs text-gray-500">Notes:</span>
                <p class="mt-1 text-sm text-gray-700">{{ serviceCall.notes }}</p>
              </div>
              <div v-if="!serviceCall.description && !serviceCall.notes">
                <p class="text-sm text-gray-400">No description or notes provided</p>
              </div>
            </div>
          </div>

          <!-- Timeline Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Timeline</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="serviceCall.openedAt">
                <span class="text-xs text-gray-500">Opened:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.openedAt) }}
                </span>
              </div>
              <div v-if="serviceCall.acknowledgedAt">
                <span class="text-xs text-gray-500">Acknowledged:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.acknowledgedAt) }}
                </span>
              </div>
              <div v-if="serviceCall.inProgressAt">
                <span class="text-xs text-gray-500">In Progress:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.inProgressAt) }}
                </span>
              </div>
              <div v-if="serviceCall.resolvedAt">
                <span class="text-xs text-gray-500">Resolved:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.resolvedAt) }}
                </span>
              </div>
              <div v-if="serviceCall.closedAt">
                <span class="text-xs text-gray-500">Closed:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.closedAt) }}
                </span>
              </div>
              <div v-if="serviceCall.slaDueDate">
                <span class="text-xs text-gray-500">SLA Due:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(serviceCall.slaDueDate) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Contacts -->
          <div v-if="serviceCall.contacts.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Contacts</h3>
            <div class="space-y-3">
              <div
                v-for="contact in serviceCall.contacts"
                :key="contact.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ contact.contactName }}</h4>
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ formatContactRole(contact.role) }}
                  </span>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                  <div>{{ contact.contactEmail }}</div>
                  <div v-if="contact.contactPhone">{{ contact.contactPhone }}</div>
                  <div v-if="contact.notes" class="mt-2 text-gray-700">{{ contact.notes }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activities -->
          <div v-if="serviceCall.activities.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Activities
            </h3>
            <div class="space-y-3">
              <div
                v-for="activity in serviceCall.activities"
                :key="activity.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ activity.subject }}</h4>
                  <span class="text-xs text-gray-500">{{ formatActivityType(activity.type) }}</span>
                </div>
                <div class="text-xs text-gray-600">
                  {{ formatDateTime(activity.date) }} • {{ activity.duration }} minutes
                </div>
                <div v-if="activity.description" class="mt-2 text-sm text-gray-700">
                  {{ activity.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - SLA, Financial, Related -->
        <div class="space-y-4 sm:space-y-6">
          <!-- SLA Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">SLA</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Response Time:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ serviceCall.sla.responseTime }} hours
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Resolution Time:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ serviceCall.sla.resolutionTime }} hours
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span
                  class="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': serviceCall.sla.status === 'ON_TIME',
                    'bg-yellow-100 text-yellow-800': serviceCall.sla.status === 'AT_RISK',
                    'bg-red-100 text-red-800': serviceCall.sla.status === 'BREACHED',
                  }"
                >
                  {{ formatSLAStatus(serviceCall.sla.status) }}
                </span>
              </div>
              <div v-if="serviceCall.sla.notes">
                <span class="text-xs text-gray-500">Notes:</span>
                <p class="mt-1 text-sm text-gray-700">{{ serviceCall.sla.notes }}</p>
              </div>
            </div>
          </div>

          <!-- Financial Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Financial
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Total Cost:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(serviceCall.financial.totalCost, serviceCall.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Labor Cost:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(serviceCall.financial.laborCost, serviceCall.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Material Cost:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(
                      serviceCall.financial.materialCost,
                      serviceCall.financial.currency,
                    )
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Travel Cost:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(serviceCall.financial.travelCost, serviceCall.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Currency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ serviceCall.financial.currency }}
                </span>
              </div>
            </div>
          </div>

          <!-- Related Service Calls -->
          <div v-if="serviceCall.relatedServiceCalls.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Related Service Calls
            </h3>
            <div class="space-y-2">
              <div
                v-for="relatedId in serviceCall.relatedServiceCalls"
                :key="relatedId"
                class="text-sm text-gray-700 bg-white border border-gray-200 rounded p-2"
              >
                ID: {{ relatedId }}
              </div>
            </div>
          </div>

          <!-- Attachments -->
          <div v-if="serviceCall.attachments.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Attachments
            </h3>
            <div class="space-y-2">
              <div
                v-for="attachment in serviceCall.attachments"
                :key="attachment"
                class="flex items-center justify-between bg-white border border-gray-200 rounded p-2"
              >
                <div class="flex items-center space-x-2">
                  <svg
                    class="w-4 h-4 text-gray-400"
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
                  <span class="text-sm text-gray-900 truncate">{{ attachment }}</span>
                </div>
                <button class="text-sap-blue hover:text-sap-dark-blue text-xs font-medium">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ServiceCall } from '../types'
import {
  ServiceCallStatus,
  ServiceCallType,
  ServiceCallCategory,
  ServiceCallPriority,
  ServiceCallSource,
} from '../types'

// Props
interface Props {
  serviceCall: ServiceCall
}

const props = defineProps<Props>()

// Utility functions
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatServiceCallStatus = (status: ServiceCallStatus) => {
  const statusMap: Record<ServiceCallStatus, string> = {
    OPEN: 'Open',
    IN_PROGRESS: 'In Progress',
    ON_HOLD: 'On Hold',
    RESOLVED: 'Resolved',
    CLOSED: 'Closed',
    CANCELLED: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatServiceCallType = (type: ServiceCallType) => {
  const typeMap: Record<ServiceCallType, string> = {
    TECHNICAL_SUPPORT: 'Technical Support',
    BUG_REPORT: 'Bug Report',
    FEATURE_REQUEST: 'Feature Request',
    TRAINING: 'Training',
    CONSULTATION: 'Consultation',
    MAINTENANCE: 'Maintenance',
    INSTALLATION: 'Installation',
    UPGRADE: 'Upgrade',
    OTHER: 'Other',
  }
  return typeMap[type] || type
}

const formatServiceCallCategory = (category: ServiceCallCategory) => {
  const categoryMap: Record<ServiceCallCategory, string> = {
    SOFTWARE: 'Software',
    HARDWARE: 'Hardware',
    NETWORK: 'Network',
    DATABASE: 'Database',
    SECURITY: 'Security',
    USER_ACCESS: 'User Access',
    INTEGRATION: 'Integration',
    REPORTING: 'Reporting',
    WORKFLOW: 'Workflow',
    OTHER: 'Other',
  }
  return categoryMap[category] || category
}

const formatServiceCallPriority = (priority: ServiceCallPriority) => {
  const priorityMap: Record<ServiceCallPriority, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatServiceCallSource = (source: ServiceCallSource) => {
  const sourceMap: Record<ServiceCallSource, string> = {
    PHONE: 'Phone',
    EMAIL: 'Email',
    WEB_FORM: 'Web Form',
    SELF_SERVICE: 'Self Service',
    WALK_IN: 'Walk In',
    REFERRAL: 'Referral',
    OTHER: 'Other',
  }
  return sourceMap[source] || source
}

const formatContactRole = (role: string) => {
  const roleMap: Record<string, string> = {
    PRIMARY: 'Primary',
    SECONDARY: 'Secondary',
    TECHNICAL: 'Technical',
    BILLING: 'Billing',
    DECISION_MAKER: 'Decision Maker',
  }
  return roleMap[role] || role
}

const formatActivityType = (type: string) => {
  const typeMap: Record<string, string> = {
    CALL: 'Call',
    EMAIL: 'Email',
    MEETING: 'Meeting',
    VISIT: 'Site Visit',
    UPDATE: 'Update',
    FOLLOW_UP: 'Follow-up',
  }
  return typeMap[type] || type
}

const formatSLAStatus = (status: string) => {
  const statusMap: Record<string, string> = {
    ON_TIME: 'On Time',
    AT_RISK: 'At Risk',
    BREACHED: 'Breached',
  }
  return statusMap[status] || status
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
</script>
