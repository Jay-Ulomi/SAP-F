<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ opportunity.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ opportunity.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ opportunity.opportunityCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-blue-100 text-blue-800': opportunity.status === 'LEAD',
              'bg-green-100 text-green-800': opportunity.status === 'QUALIFIED',
              'bg-yellow-100 text-yellow-800': opportunity.status === 'PROPOSAL',
              'bg-orange-100 text-orange-800': opportunity.status === 'NEGOTIATION',
              'bg-emerald-100 text-emerald-800': opportunity.status === 'CLOSED_WON',
              'bg-red-100 text-red-800': opportunity.status === 'CLOSED_LOST',
              'bg-gray-100 text-gray-800': opportunity.status === 'ON_HOLD',
            }"
          >
            {{ formatOpportunityStatus(opportunity.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': opportunity.priority === 'LOW',
              'bg-blue-100 text-blue-800': opportunity.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': opportunity.priority === 'HIGH',
              'bg-red-100 text-red-800': opportunity.priority === 'CRITICAL',
            }"
          >
            {{ formatOpportunityPriority(opportunity.priority) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatOpportunityType(opportunity.type) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Opportunity Details -->
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
                  {{ formatOpportunityStatus(opportunity.status) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Stage:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatOpportunityStage(opportunity.stage) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Type:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatOpportunityType(opportunity.type) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Source:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatOpportunitySource(opportunity.source) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Customer Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.customerName }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Customer Type:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCustomerType(opportunity.customerType) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.assignedTo }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Created:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.createdAt) }}
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
              <div v-if="opportunity.description">
                <span class="text-xs text-gray-500">Description:</span>
                <p class="mt-1 text-sm text-gray-700">{{ opportunity.description }}</p>
              </div>
              <div v-if="opportunity.notes">
                <span class="text-xs text-gray-500">Notes:</span>
                <p class="mt-1 text-sm text-gray-700">{{ opportunity.notes }}</p>
              </div>
              <div v-if="!opportunity.description && !opportunity.notes">
                <p class="text-sm text-gray-400">No description or notes provided</p>
              </div>
            </div>
          </div>

          <!-- Tags -->
          <div v-if="opportunity.tags.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in opportunity.tags"
                :key="tag"
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Timeline Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Timeline</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-if="opportunity.timeline.discoveryDate">
                <span class="text-xs text-gray-500">Discovery Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.discoveryDate) }}
                </span>
              </div>
              <div v-if="opportunity.timeline.qualificationDate">
                <span class="text-xs text-gray-500">Qualification Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.qualificationDate) }}
                </span>
              </div>
              <div v-if="opportunity.timeline.proposalDate">
                <span class="text-xs text-gray-500">Proposal Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.proposalDate) }}
                </span>
              </div>
              <div v-if="opportunity.timeline.negotiationStartDate">
                <span class="text-xs text-gray-500">Negotiation Start:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.negotiationStartDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Expected Close:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.expectedCloseDate) }}
                </span>
              </div>
              <div v-if="opportunity.timeline.actualCloseDate">
                <span class="text-xs text-gray-500">Actual Close:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDateTime(opportunity.timeline.actualCloseDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Estimated Duration:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.timeline.estimatedDuration }} days
                </span>
              </div>
              <div v-if="opportunity.timeline.actualDuration">
                <span class="text-xs text-gray-500">Actual Duration:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.timeline.actualDuration }} days
                </span>
              </div>
            </div>
          </div>

          <!-- Products -->
          <div v-if="opportunity.products.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Products</h3>
            <div class="space-y-3">
              <div
                v-for="product in opportunity.products"
                :key="product.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ product.productName }}</h4>
                  <span class="text-sm text-gray-500">{{ product.productCode }}</span>
                </div>
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span class="text-gray-500">Qty:</span>
                    <span class="ml-1 text-gray-900">{{ product.quantity }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Price:</span>
                    <span class="ml-1 text-gray-900">{{
                      formatCurrency(product.unitPrice, product.currency)
                    }}</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Discount:</span>
                    <span class="ml-1 text-gray-900">{{ product.discount }}%</span>
                  </div>
                  <div>
                    <span class="text-gray-500">Total:</span>
                    <span class="ml-1 text-gray-900">{{
                      formatCurrency(product.totalPrice, product.currency)
                    }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activities -->
          <div v-if="opportunity.activities.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Activities
            </h3>
            <div class="space-y-3">
              <div
                v-for="activity in opportunity.activities"
                :key="activity.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ activity.subject }}</h4>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">{{
                      formatActivityType(activity.type)
                    }}</span>
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': activity.outcome === 'POSITIVE',
                        'bg-gray-100 text-gray-800': activity.outcome === 'NEUTRAL',
                        'bg-red-100 text-red-800': activity.outcome === 'NEGATIVE',
                      }"
                    >
                      {{ formatActivityOutcome(activity.outcome) }}
                    </span>
                  </div>
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

        <!-- Right Column - Financial, Contacts, Related -->
        <div class="space-y-4 sm:space-y-6">
          <!-- Financial Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Financial
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Total Value:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(opportunity.financial.totalValue, opportunity.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Probability:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.financial.probability }}%
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Expected Revenue:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(
                      opportunity.financial.expectedRevenue,
                      opportunity.financial.currency,
                    )
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Actual Revenue:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(
                      opportunity.financial.actualRevenue,
                      opportunity.financial.currency,
                    )
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Cost of Sale:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(opportunity.financial.costOfSale, opportunity.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Gross Profit:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(
                      opportunity.financial.grossProfit,
                      opportunity.financial.currency,
                    )
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Net Profit:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{
                    formatCurrency(opportunity.financial.netProfit, opportunity.financial.currency)
                  }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Discount:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ opportunity.financial.discount }}%
                </span>
              </div>
            </div>
          </div>

          <!-- Contacts -->
          <div v-if="opportunity.contacts.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Contacts</h3>
            <div class="space-y-3">
              <div
                v-for="contact in opportunity.contacts"
                :key="contact.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">{{ contact.contactName }}</h4>
                  <div class="flex items-center space-x-1">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {{ formatContactRole(contact.role) }}
                    </span>
                    <span
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                      :class="{
                        'bg-green-100 text-green-800': contact.influence === 'HIGH',
                        'bg-blue-100 text-blue-800': contact.influence === 'MEDIUM',
                        'bg-gray-100 text-gray-800': contact.influence === 'LOW',
                      }"
                    >
                      {{ formatContactInfluence(contact.influence) }}
                    </span>
                  </div>
                </div>
                <div class="text-xs text-gray-600 space-y-1">
                  <div>{{ contact.contactEmail }}</div>
                  <div v-if="contact.contactPhone">{{ contact.contactPhone }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Related Opportunities -->
          <div v-if="opportunity.relatedOpportunities.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Related Opportunities
            </h3>
            <div class="space-y-2">
              <div
                v-for="relatedOpportunityId in opportunity.relatedOpportunities"
                :key="relatedOpportunityId"
                class="text-sm text-gray-700 bg-white border border-gray-200 rounded p-2"
              >
                ID: {{ relatedOpportunityId }}
              </div>
            </div>
          </div>

          <!-- Attachments -->
          <div v-if="opportunity.attachments.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Attachments
            </h3>
            <div class="space-y-2">
              <div
                v-for="attachment in opportunity.attachments"
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
import type { Opportunity } from '../types'
import {
  OpportunityStatus,
  OpportunityType,
  OpportunityStage,
  OpportunityPriority,
  OpportunitySource,
  Currency,
} from '../types'

// Props
interface Props {
  opportunity: Opportunity
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

const formatOpportunityStatus = (status: OpportunityStatus) => {
  const statusMap: Record<OpportunityStatus, string> = {
    LEAD: 'Lead',
    QUALIFIED: 'Qualified',
    PROPOSAL: 'Proposal',
    NEGOTIATION: 'Negotiation',
    CLOSED_WON: 'Closed Won',
    CLOSED_LOST: 'Closed Lost',
    ON_HOLD: 'On Hold',
  }
  return statusMap[status] || status
}

const formatOpportunityStage = (stage: OpportunityStage) => {
  const stageMap: Record<OpportunityStage, string> = {
    DISCOVERY: 'Discovery',
    QUALIFICATION: 'Qualification',
    PROPOSAL: 'Proposal',
    NEGOTIATION: 'Negotiation',
    CLOSING: 'Closing',
    CLOSED: 'Closed',
  }
  return stageMap[stage] || stage
}

const formatOpportunityType = (type: OpportunityType) => {
  const typeMap: Record<OpportunityType, string> = {
    NEW_BUSINESS: 'New Business',
    EXISTING_BUSINESS: 'Existing Business',
    UPSELL: 'Upsell',
    CROSS_SELL: 'Cross Sell',
    RENEWAL: 'Renewal',
    PARTNERSHIP: 'Partnership',
  }
  return typeMap[type] || type
}

const formatOpportunityPriority = (priority: OpportunityPriority) => {
  const priorityMap: Record<OpportunityPriority, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatOpportunitySource = (source: OpportunitySource) => {
  const sourceMap: Record<OpportunitySource, string> = {
    WEBSITE: 'Website',
    REFERRAL: 'Referral',
    COLD_CALL: 'Cold Call',
    TRADE_SHOW: 'Trade Show',
    SOCIAL_MEDIA: 'Social Media',
    EMAIL_CAMPAIGN: 'Email Campaign',
    PARTNER: 'Partner',
    EXISTING_CUSTOMER: 'Existing Customer',
    OTHER: 'Other',
  }
  return sourceMap[source] || source
}

const formatCustomerType = (type: string) => {
  const typeMap: Record<string, string> = {
    EXISTING: 'Existing',
    PROSPECT: 'Prospect',
    PARTNER: 'Partner',
  }
  return typeMap[type] || type
}

const formatContactRole = (role: string) => {
  const roleMap: Record<string, string> = {
    DECISION_MAKER: 'Decision Maker',
    INFLUENCER: 'Influencer',
    END_USER: 'End User',
    TECHNICAL_EVALUATOR: 'Technical Evaluator',
    ECONOMIC_BUYER: 'Economic Buyer',
  }
  return roleMap[role] || role
}

const formatContactInfluence = (influence: string) => {
  const influenceMap: Record<string, string> = {
    HIGH: 'High',
    MEDIUM: 'Medium',
    LOW: 'Low',
  }
  return influenceMap[influence] || influence
}

const formatActivityType = (type: string) => {
  const typeMap: Record<string, string> = {
    CALL: 'Call',
    EMAIL: 'Email',
    MEETING: 'Meeting',
    DEMO: 'Demo',
    PROPOSAL: 'Proposal',
    FOLLOW_UP: 'Follow-up',
  }
  return typeMap[type] || type
}

const formatActivityOutcome = (outcome: string) => {
  const outcomeMap: Record<string, string> = {
    POSITIVE: 'Positive',
    NEUTRAL: 'Neutral',
    NEGATIVE: 'Negative',
  }
  return outcomeMap[outcome] || outcome
}

const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount)
}
</script>
