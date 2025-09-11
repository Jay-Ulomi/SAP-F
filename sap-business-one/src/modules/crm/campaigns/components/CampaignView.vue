<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ campaign.name }}</h2>
          <p class="text-sm text-gray-600 mt-1">{{ campaign.description }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': campaign.status === 'DRAFT',
              'bg-green-100 text-green-800': campaign.status === 'ACTIVE',
              'bg-yellow-100 text-yellow-800': campaign.status === 'PAUSED',
              'bg-blue-100 text-blue-800': campaign.status === 'COMPLETED',
              'bg-red-100 text-red-800': campaign.status === 'CANCELLED',
              'bg-purple-100 text-purple-800': campaign.status === 'SCHEDULED'
            }"
          >
            {{ formatCampaignStatus(campaign.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatCampaignType(campaign.type) }}
          </span>
        </div>
      </div>
    </div>

    <!-- Campaign Details -->
    <div class="px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Basic Info -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Basic Information -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Basic Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Objective:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCampaignObjective(campaign.objective) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Owner:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ campaign.owner }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Channels:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="channel in campaign.channels"
                    :key="channel"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ formatCampaignChannel(channel) }}
                  </span>
                </div>
              </div>
              <div>
                <span class="text-xs text-gray-500">Tags:</span>
                <div class="flex flex-wrap gap-1 mt-1">
                  <span
                    v-for="tag in campaign.tags"
                    :key="tag"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Target Audience -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Target Audience</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ campaign.targetAudience.name }}</span>
              </div>
              <div v-if="campaign.targetAudience.description">
                <span class="text-xs text-gray-500">Description:</span>
                <span class="ml-2 text-sm text-gray-900">{{ campaign.targetAudience.description }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Estimated Size:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ campaign.targetAudience.estimatedSize.toLocaleString() }}
                </span>
              </div>
              
              <!-- Criteria -->
              <div v-if="hasCriteria">
                <span class="text-xs text-gray-500">Criteria:</span>
                <div class="mt-2 space-y-2">
                  <div v-if="campaign.targetAudience.criteria.ageRange?.min || campaign.targetAudience.criteria.ageRange?.max">
                    <span class="text-xs text-gray-500">Age Range:</span>
                    <span class="ml-2 text-sm text-gray-900">
                      {{ campaign.targetAudience.criteria.ageRange.min || 0 }} - {{ campaign.targetAudience.criteria.ageRange.max || 'Any' }}
                    </span>
                  </div>
                  <div v-if="campaign.targetAudience.criteria.demographics?.length">
                    <span class="text-xs text-gray-500">Demographics:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="demo in campaign.targetAudience.criteria.demographics"
                        :key="demo"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                      >
                        {{ demo }}
                      </span>
                    </div>
                  </div>
                  <div v-if="campaign.targetAudience.criteria.interests?.length">
                    <span class="text-xs text-gray-500">Interests:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="interest in campaign.targetAudience.criteria.interests"
                        :key="interest"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                      >
                        {{ interest }}
                      </span>
                    </div>
                  </div>
                  <div v-if="campaign.targetAudience.criteria.behavior?.length">
                    <span class="text-xs text-gray-500">Behavior:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="behavior in campaign.targetAudience.criteria.behavior"
                        :key="behavior"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800"
                      >
                        {{ behavior }}
                      </span>
                    </div>
                  </div>
                  <div v-if="campaign.targetAudience.criteria.location?.length">
                    <span class="text-xs text-gray-500">Location:</span>
                    <div class="flex flex-wrap gap-1 mt-1">
                      <span
                        v-for="location in campaign.targetAudience.criteria.location"
                        :key="location"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800"
                      >
                        {{ location }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Content</h3>
            <div class="space-y-4">
              <div
                v-for="(content, index) in campaign.content"
                :key="content.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <h4 class="text-sm font-medium text-gray-900">
                    {{ formatContentType(content.type) }} - {{ content.title }}
                  </h4>
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="content.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                  >
                    {{ content.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </div>
                <p class="text-sm text-gray-700 mb-2">{{ content.content }}</p>
                <div v-if="content.callToAction" class="text-sm text-gray-600">
                  <span class="text-gray-500">CTA:</span> {{ content.callToAction }}
                </div>
                <div v-if="content.mediaUrls?.length" class="mt-2">
                  <span class="text-xs text-gray-500">Media:</span>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="url in content.mediaUrls"
                      :key="url"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {{ url }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Schedule, Budget, Performance -->
        <div class="space-y-6">
          <!-- Schedule -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Schedule</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Start Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(campaign.schedule.startDate) }}
                </span>
              </div>
              <div v-if="campaign.schedule.endDate">
                <span class="text-xs text-gray-500">End Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(campaign.schedule.endDate) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Frequency:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatFrequency(campaign.schedule.frequency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Time Zone:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ campaign.schedule.timeZone }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span
                  class="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="campaign.schedule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
                >
                  {{ campaign.schedule.isActive ? 'Active' : 'Inactive' }}
                </span>
              </div>
            </div>
          </div>

          <!-- Budget -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Budget</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Total Budget:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(campaign.budget.totalBudget, campaign.budget.currency) }}
                </span>
              </div>
              <div v-if="campaign.budget.dailyBudget">
                <span class="text-xs text-gray-500">Daily Budget:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(campaign.budget.dailyBudget, campaign.budget.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Spent:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(campaign.budget.spentAmount, campaign.budget.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Remaining:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatCurrency(campaign.budget.remainingAmount, campaign.budget.currency) }}
                </span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Type:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatBudgetType(campaign.budget.budgetType) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Performance Metrics -->
          <div v-if="campaign.metrics?.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Performance</h3>
            <div class="space-y-3">
              <div v-for="metric in latestMetrics" :key="metric.id">
                <div class="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span class="text-xs text-gray-500">Impressions:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ metric.impressions.toLocaleString() }}</span>
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">Clicks:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ metric.clicks.toLocaleString() }}</span>
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">CTR:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ metric.ctr.toFixed(2) }}%</span>
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">CPC:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ formatCurrency(metric.cpc, campaign.budget.currency) }}</span>
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">Conversions:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ metric.conversions.toLocaleString() }}</span>
                  </div>
                  <div>
                    <span class="text-xs text-gray-500">ROI:</span>
                    <span class="ml-2 font-medium text-gray-900">{{ metric.roi.toFixed(2) }}x</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team -->
          <div v-if="campaign.team?.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Team</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="member in campaign.team"
                :key="member"
                class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
              >
                {{ member }}
              </span>
            </div>
          </div>

          <!-- Approval Status -->
          <div v-if="campaign.requiresApproval" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Approval</h3>
            <div class="space-y-3">
              <div>
                <span class="text-xs text-gray-500">Status:</span>
                <span
                  class="ml-2 inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-yellow-100 text-yellow-800': campaign.approvalStatus === 'PENDING',
                    'bg-green-100 text-green-800': campaign.approvalStatus === 'APPROVED',
                    'bg-red-100 text-red-800': campaign.approvalStatus === 'REJECTED'
                  }"
                >
                  {{ formatApprovalStatus(campaign.approvalStatus) }}
                </span>
              </div>
              <div v-if="campaign.approvalDate">
                <span class="text-xs text-gray-500">Approved Date:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">
                  {{ formatDate(campaign.approvalDate) }}
                </span>
              </div>
              <div v-if="campaign.approvedBy">
                <span class="text-xs text-gray-500">Approved By:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ campaign.approvedBy }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Timestamps -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span class="text-xs text-gray-500">Created:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(campaign.createdAt) }}</span>
          </div>
          <div>
            <span class="text-xs text-gray-500">Updated:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(campaign.updatedAt) }}</span>
          </div>
          <div v-if="campaign.launchedAt">
            <span class="text-xs text-gray-500">Launched:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(campaign.launchedAt) }}</span>
          </div>
          <div v-if="campaign.completedAt">
            <span class="text-xs text-gray-500">Completed:</span>
            <span class="ml-2 font-medium text-gray-900">{{ formatDate(campaign.completedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Campaign } from '../types'

// Props
interface Props {
  campaign: Campaign
}

const props = defineProps<Props>()

// Computed properties
const hasCriteria = computed(() => {
  const criteria = props.campaign.targetAudience.criteria
  return (
    (criteria.ageRange?.min || criteria.ageRange?.max) ||
    criteria.demographics?.length ||
    criteria.interests?.length ||
    criteria.behavior?.length ||
    criteria.location?.length
  )
})

const latestMetrics = computed(() => {
  if (!props.campaign.metrics?.length) return []
  return [props.campaign.metrics[props.campaign.metrics.length - 1]]
})

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

const formatCampaignStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    PAUSED: 'Paused',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    SCHEDULED: 'Scheduled'
  }
  return statusMap[status] || status
}

const formatCampaignType = (type: string): string => {
  const typeMap: Record<string, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    SOCIAL_MEDIA: 'Social Media',
    DIRECT_MAIL: 'Direct Mail',
    TELEMARKETING: 'Telemarketing',
    DIGITAL_ADS: 'Digital Ads',
    EVENT: 'Event',
    WEBINAR: 'Webinar',
    OTHER: 'Other'
  }
  return typeMap[type] || type
}

const formatCampaignObjective = (objective: string): string => {
  const objectiveMap: Record<string, string> = {
    AWARENESS: 'Awareness',
    CONSIDERATION: 'Consideration',
    CONVERSION: 'Conversion',
    RETENTION: 'Retention',
    LOYALTY: 'Loyalty',
    LEAD_GENERATION: 'Lead Generation',
    SALES: 'Sales',
    BRAND_BUILDING: 'Brand Building'
  }
  return objectiveMap[objective] || objective
}

const formatCampaignChannel = (channel: string): string => {
  const channelMap: Record<string, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    FACEBOOK: 'Facebook',
    INSTAGRAM: 'Instagram',
    LINKEDIN: 'LinkedIn',
    TWITTER: 'Twitter',
    GOOGLE_ADS: 'Google Ads',
    DIRECT_MAIL: 'Direct Mail',
    TELEPHONE: 'Telephone',
    WEBSITE: 'Website',
    MOBILE_APP: 'Mobile App'
  }
  return channelMap[channel] || channel
}

const formatContentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    EMAIL: 'Email',
    SMS: 'SMS',
    SOCIAL_POST: 'Social Post',
    LANDING_PAGE: 'Landing Page',
    BANNER: 'Banner'
  }
  return typeMap[type] || type
}

const formatFrequency = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    ONCE: 'Once',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    CUSTOM: 'Custom'
  }
  return frequencyMap[frequency] || frequency
}

const formatBudgetType = (type: string): string => {
  const typeMap: Record<string, string> = {
    TOTAL: 'Total Budget',
    DAILY: 'Daily Budget',
    LIFETIME: 'Lifetime Budget'
  }
  return typeMap[type] || type
}

const formatApprovalStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected'
  }
  return statusMap[status] || status
}
</script>
