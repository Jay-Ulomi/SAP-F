<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ activity.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ activity.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ activity.activityCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-blue-100 text-blue-800': activity.status === 'PLANNED',
              'bg-yellow-100 text-yellow-800': activity.status === 'IN_PROGRESS',
              'bg-green-100 text-green-800': activity.status === 'COMPLETED',
              'bg-red-100 text-red-800': activity.status === 'CANCELLED',
              'bg-gray-100 text-gray-800': activity.status === 'ON_HOLD',
              'bg-orange-100 text-orange-800': activity.status === 'OVERDUE',
            }"
          >
            {{ formatActivityStatus(activity.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': activity.priority === 'LOW',
              'bg-blue-100 text-blue-800': activity.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': activity.priority === 'HIGH',
              'bg-red-100 text-red-800': activity.priority === 'CRITICAL',
            }"
          >
            {{ formatActivityPriority(activity.priority) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatActivityType(activity.type) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Activity Details -->
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
                <span class="text-xs text-gray-500">Category:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatActivityCategory(activity.category) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  activity.assignedTo
                }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Start Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDateTime(activity.startDate)
                }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">End Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDateTime(activity.endDate)
                }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Due Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDateTime(activity.dueDate)
                }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Created:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDateTime(activity.createdAt)
                }}</span>
              </div>
              <div v-if="activity.outcome">
                <span class="text-xs text-gray-500">Outcome:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatActivityOutcome(activity.outcome) }}
                </span>
              </div>
              <div v-if="activity.metrics.duration">
                <span class="text-xs text-gray-500">Duration:</span>
                <span class="ml-2 text-sm font-medium text-gray-900"
                  >{{ activity.metrics.duration }} minutes</span
                >
              </div>
            </div>
            <div v-if="activity.tags.length > 0" class="mt-4">
              <span class="text-xs text-gray-500">Tags:</span>
              <div class="flex flex-wrap gap-1 mt-1">
                <span
                  v-for="tag in activity.tags"
                  :key="tag"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Description -->
          <div v-if="activity.description" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Description
            </h3>
            <p class="text-sm text-gray-700">{{ activity.description }}</p>
          </div>

          <!-- Notes -->
          <div v-if="activity.notes" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Notes</h3>
            <p class="text-sm text-gray-700">{{ activity.notes }}</p>
          </div>

          <!-- Participants -->
          <div
            v-if="activity.participants && activity.participants.length > 0"
            class="bg-gray-50 rounded-lg p-4"
          >
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Participants
            </h3>
            <div class="space-y-3">
              <div
                v-for="participant in activity.participants"
                :key="participant.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ participant.entityName }}</h4>
                  <div class="flex items-center space-x-2">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {{ formatParticipantType(participant.type) }}
                    </span>
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': participant.response === 'ACCEPTED',
                        'bg-red-100 text-red-800': participant.response === 'DECLINED',
                        'bg-yellow-100 text-yellow-800': participant.response === 'TENTATIVE',
                        'bg-gray-100 text-gray-800': participant.response === 'NO_RESPONSE',
                      }"
                    >
                      {{ formatParticipantResponse(participant.response) }}
                    </span>
                  </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  <div>
                    <span class="text-gray-500">Role:</span>
                    {{ formatParticipantRole(participant.role) }}
                  </div>
                  <div v-if="participant.notes">
                    <span class="text-gray-500">Notes:</span> {{ participant.notes }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div v-if="activity.location" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Location</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Type:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatLocationType(activity.location.type) }}
                </span>
              </div>
              <div v-if="activity.location.address" class="md:col-span-2">
                <span class="text-xs text-gray-500">Address:</span>
                <div class="ml-2 text-sm text-gray-700">
                  <div>{{ activity.location.address }}</div>
                  <div v-if="activity.location.city">
                    {{ activity.location.city
                    }}{{ activity.location.state ? ', ' + activity.location.state : '' }}
                    {{ activity.location.postalCode }}
                  </div>
                  <div v-if="activity.location.country">{{ activity.location.country }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Timeline, Statistics, Actions -->
        <div class="space-y-6">
          <!-- Timeline Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Timeline</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatActivityStatus(activity.status) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Priority:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatActivityPriority(activity.priority) }}
                </span>
              </div>
              <div v-if="activity.metrics.duration">
                <span class="text-xs text-gray-500">Duration:</span>
                <span class="ml-2 text-sm font-medium text-gray-900"
                  >{{ activity.metrics.duration }} minutes</span
                >
              </div>
              <div v-if="activity.metrics.participants">
                <span class="text-xs text-gray-500">Participants:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  activity.metrics.participants
                }}</span>
              </div>
            </div>
          </div>

          <!-- Next Actions -->
          <div v-if="activity.nextAction" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Next Action
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Action:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  activity.nextAction
                }}</span>
              </div>
              <div v-if="activity.nextActionDate">
                <span class="text-xs text-gray-500">Due Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDateTime(activity.nextActionDate)
                }}</span>
              </div>
            </div>
          </div>

          <!-- Financial Information -->
          <div v-if="activity.financial" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Financial
            </h3>
            <div class="space-y-3">
              <div v-if="activity.financial.budget">
                <span class="text-xs text-gray-500">Budget:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(activity.financial.budget, activity.financial.currency) }}
                </span>
              </div>
              <div v-if="activity.financial.actualCost">
                <span class="text-xs text-gray-500">Actual Cost:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(activity.financial.actualCost, activity.financial.currency) }}
                </span>
              </div>
              <div v-if="activity.financial.currency">
                <span class="text-xs text-gray-500">Currency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  activity.financial.currency
                }}</span>
              </div>
            </div>
          </div>

          <!-- Attachments -->
          <div
            v-if="activity.attachments && activity.attachments.length > 0"
            class="bg-gray-50 rounded-lg p-4"
          >
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Attachments
            </h3>
            <div class="space-y-2">
              <div
                v-for="attachment in activity.attachments"
                :key="attachment"
                class="flex items-center space-x-2 text-sm text-gray-700"
              >
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
                <span>{{ attachment }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '../types'
import {
  ActivityStatus,
  ActivityType,
  ActivityCategory,
  ActivityPriority,
  ActivityOutcome,
} from '../types'

// Props
interface Props {
  activity: Activity
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

const formatActivityStatus = (status: ActivityStatus) => {
  const statusMap: Record<ActivityStatus, string> = {
    PLANNED: 'Planned',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ON_HOLD: 'On Hold',
    OVERDUE: 'Overdue',
  }
  return statusMap[status] || status
}

const formatActivityType = (type: ActivityType) => {
  const typeMap: Record<ActivityType, string> = {
    CALL: 'Call',
    EMAIL: 'Email',
    MEETING: 'Meeting',
    VISIT: 'Visit',
    QUOTE: 'Quote',
    ORDER: 'Order',
    COMPLAINT: 'Complaint',
    SUPPORT: 'Support',
    FOLLOW_UP: 'Follow-up',
    PRESENTATION: 'Presentation',
    DEMO: 'Demo',
    TRAINING: 'Training',
  }
  return typeMap[type] || type
}

const formatActivityCategory = (category: ActivityCategory) => {
  const categoryMap: Record<ActivityCategory, string> = {
    SALES: 'Sales',
    MARKETING: 'Marketing',
    SUPPORT: 'Support',
    ADMINISTRATIVE: 'Administrative',
    TRAINING: 'Training',
    OTHER: 'Other',
  }
  return categoryMap[category] || category
}

const formatActivityPriority = (priority: ActivityPriority) => {
  const priorityMap: Record<ActivityPriority, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatActivityOutcome = (outcome: ActivityOutcome) => {
  const outcomeMap: Record<ActivityOutcome, string> = {
    SUCCESSFUL: 'Successful',
    PARTIALLY_SUCCESSFUL: 'Partially Successful',
    UNSUCCESSFUL: 'Unsuccessful',
    RESCHEDULED: 'Rescheduled',
    CANCELLED: 'Cancelled',
    NO_SHOW: 'No Show',
  }
  return outcomeMap[outcome] || outcome
}

const formatParticipantType = (type: string) => {
  const typeMap: Record<string, string> = {
    CUSTOMER: 'Customer',
    CONTACT: 'Contact',
    EMPLOYEE: 'Employee',
    PARTNER: 'Partner',
    VENDOR: 'Vendor',
  }
  return typeMap[type] || type
}

const formatParticipantResponse = (response: string) => {
  const responseMap: Record<string, string> = {
    ACCEPTED: 'Accepted',
    DECLINED: 'Declined',
    TENTATIVE: 'Tentative',
    NO_RESPONSE: 'No Response',
  }
  return responseMap[response] || response
}

const formatParticipantRole = (role: string) => {
  const roleMap: Record<string, string> = {
    ORGANIZER: 'Organizer',
    ATTENDEE: 'Attendee',
    REQUIRED: 'Required',
    OPTIONAL: 'Optional',
  }
  return roleMap[role] || role
}

const formatLocationType = (type: string) => {
  const typeMap: Record<string, string> = {
    OFFICE: 'Office',
    CONFERENCE_ROOM: 'Conference Room',
    CUSTOMER_SITE: 'Customer Site',
    VIRTUAL: 'Virtual',
    EXTERNAL: 'External Venue',
  }
  return typeMap[type] || type
}

const formatCurrency = (amount: number, currency: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
</script>
