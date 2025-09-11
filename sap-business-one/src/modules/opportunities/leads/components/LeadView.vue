<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ lead.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ lead.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">Code: {{ lead.leadCode }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-blue-100 text-blue-800': lead.status === 'NEW',
              'bg-yellow-100 text-yellow-800': lead.status === 'CONTACTED',
              'bg-green-100 text-green-800': lead.status === 'QUALIFIED',
              'bg-red-100 text-red-800': lead.status === 'DISQUALIFIED',
              'bg-emerald-100 text-emerald-800': lead.status === 'CONVERTED',
              'bg-slate-100 text-slate-800': lead.status === 'ON_HOLD',
            }"
          >
            {{ formatLeadStatus(lead.status) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="{
              'bg-gray-100 text-gray-800': lead.priority === 'LOW',
              'bg-blue-100 text-blue-800': lead.priority === 'MEDIUM',
              'bg-orange-100 text-orange-800': lead.priority === 'HIGH',
              'bg-red-100 text-red-800': lead.priority === 'CRITICAL',
            }"
          >
            {{ formatLeadPriority(lead.priority) }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ formatLeadSource(lead.source) }}
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <div class="xl:col-span-2 space-y-4 sm:space-y-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Details</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Assigned To:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ lead.assignedTo }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Created:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDate(lead.createdAt)
                }}</span>
              </div>
              <div>
                <span class="text-xs text-gray-500">Updated:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDate(lead.updatedAt)
                }}</span>
              </div>
              <div v-if="lead.convertedAt">
                <span class="text-xs text-gray-500">Converted:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  formatDate(lead.convertedAt)
                }}</span>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Company</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-xs text-gray-500">Name:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ lead.company.name }}</span>
              </div>
              <div v-if="lead.company.industry">
                <span class="text-xs text-gray-500">Industry:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  lead.company.industry
                }}</span>
              </div>
              <div v-if="lead.company.size">
                <span class="text-xs text-gray-500">Size:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{ lead.company.size }}</span>
              </div>
              <div v-if="lead.company.website">
                <span class="text-xs text-gray-500">Website:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  lead.company.website
                }}</span>
              </div>
              <div v-if="lead.company.country">
                <span class="text-xs text-gray-500">Country:</span>
                <span class="ml-2 text-sm font-medium text-gray-900">{{
                  lead.company.country
                }}</span>
              </div>
            </div>
          </div>

          <div v-if="lead.activities.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Activities
            </h3>
            <div class="space-y-3">
              <div
                v-for="a in lead.activities"
                :key="a.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-1">
                  <h4 class="text-sm font-medium text-gray-900">{{ a.subject }}</h4>
                  <span class="text-xs text-gray-500">{{ a.type }}</span>
                </div>
                <div class="text-xs text-gray-600">{{ formatDate(a.date) }}</div>
                <div v-if="a.notes" class="mt-1 text-sm text-gray-700">{{ a.notes }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Primary Contact
            </h3>
            <div class="space-y-2 text-sm">
              <div class="text-gray-900">{{ lead.contact.name }}</div>
              <div class="text-gray-600">{{ lead.contact.email }}</div>
              <div v-if="lead.contact.phone" class="text-gray-600">{{ lead.contact.phone }}</div>
              <div v-if="lead.contact.title" class="text-gray-600">{{ lead.contact.title }}</div>
            </div>
          </div>

          <div v-if="lead.tags.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Tags</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in lead.tags"
                :key="tag"
                class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
                >{{ tag }}</span
              >
            </div>
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
const props = defineProps<Props>()

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(date),
  )

const formatLeadStatus = (s: string) =>
  ({
    NEW: 'New',
    CONTACTED: 'Contacted',
    QUALIFIED: 'Qualified',
    DISQUALIFIED: 'Disqualified',
    CONVERTED: 'Converted',
    ON_HOLD: 'On Hold',
  })[s] || s
const formatLeadPriority = (p: string) =>
  ({ LOW: 'Low', MEDIUM: 'Medium', HIGH: 'High', CRITICAL: 'Critical' })[p] || p
const formatLeadSource = (src: string) =>
  ({
    WEBSITE: 'Website',
    REFERRAL: 'Referral',
    COLD_CALL: 'Cold Call',
    TRADE_SHOW: 'Trade Show',
    SOCIAL_MEDIA: 'Social Media',
    EMAIL_CAMPAIGN: 'Email Campaign',
    PARTNER: 'Partner',
    OTHER: 'Other',
  })[src] || src
</script>
