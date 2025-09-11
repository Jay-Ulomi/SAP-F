<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Campaign Management</h1>
          <p class="text-gray-600">
            Manage marketing campaigns, track performance, and optimize ROI
          </p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create Campaign
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalCampaigns || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Campaigns</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.activeCampaigns || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-sap-blue rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Budget</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ formatCurrency(stats?.totalBudget || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg ROI</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ (stats?.averageROI || 0).toFixed(2) }}x
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search campaigns..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="ACTIVE">Active</option>
            <option value="PAUSED">Paused</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            v-model="selectedType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="EMAIL">Email</option>
            <option value="SMS">SMS</option>
            <option value="SOCIAL_MEDIA">Social Media</option>
            <option value="DIRECT_MAIL">Direct Mail</option>
            <option value="TELEMARKETING">Telemarketing</option>
            <option value="DIGITAL_ADS">Digital Ads</option>
            <option value="EVENT">Event</option>
            <option value="WEBINAR">Webinar</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Objective</label>
          <select
            v-model="selectedObjective"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Objectives</option>
            <option value="AWARENESS">Awareness</option>
            <option value="CONSIDERATION">Consideration</option>
            <option value="CONVERSION">Conversion</option>
            <option value="RETENTION">Retention</option>
            <option value="LOYALTY">Loyalty</option>
            <option value="LEAD_GENERATION">Lead Generation</option>
            <option value="SALES">Sales</option>
            <option value="BRAND_BUILDING">Brand Building</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex items-center space-x-4">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-sap-blue text-white text-sm font-medium rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          Apply Filters
        </button>
        <button
          @click="clearFilters"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Campaigns Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Campaigns</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Campaign
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type & Objective
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Budget & Performance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Schedule
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="campaign in campaigns" :key="campaign.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ campaign.name }}</div>
                  <div class="text-sm text-gray-500">{{ campaign.owner }}</div>
                  <div class="flex flex-wrap gap-1 mt-1">
                    <span
                      v-for="tag in campaign.tags.slice(0, 2)"
                      :key="tag"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                    >
                      {{ tag }}
                    </span>
                    <span v-if="campaign.tags.length > 2" class="text-xs text-gray-500">
                      +{{ campaign.tags.length - 2 }} more
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
                  >
                    {{ formatCampaignType(campaign.type) }}
                  </span>
                  <div class="text-sm text-gray-900">
                    {{ formatCampaignObjective(campaign.objective) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-gray-100 text-gray-800': campaign.status === 'DRAFT',
                      'bg-green-100 text-green-800': campaign.status === 'ACTIVE',
                      'bg-yellow-100 text-yellow-800': campaign.status === 'PAUSED',
                      'bg-blue-100 text-blue-800': campaign.status === 'COMPLETED',
                      'bg-red-100 text-red-800': campaign.status === 'CANCELLED',
                      'bg-purple-100 text-purple-800': campaign.status === 'SCHEDULED',
                    }"
                  >
                    {{ formatCampaignStatus(campaign.status) }}
                  </span>
                  <div v-if="campaign.requiresApproval" class="text-xs text-gray-500">
                    {{ formatApprovalStatus(campaign.approvalStatus) }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="space-y-1">
                  <div class="text-sm font-medium text-gray-900">
                    {{ formatCurrency(campaign.budget.totalBudget, campaign.budget.currency) }}
                  </div>
                  <div class="text-sm text-gray-500">
                    Spent:
                    {{ formatCurrency(campaign.budget.spentAmount, campaign.budget.currency) }}
                  </div>
                  <div v-if="campaign.metrics?.length" class="text-xs text-gray-500">
                    ROI: {{ (campaign.metrics[campaign.metrics.length - 1]?.roi || 0).toFixed(2) }}x
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatDate(campaign.schedule.startDate) }}
                </div>
                <div v-if="campaign.schedule.endDate" class="text-sm text-gray-500">
                  to {{ formatDate(campaign.schedule.endDate) }}
                </div>
                <div class="text-xs text-gray-500">
                  {{ formatFrequency(campaign.schedule.frequency) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewCampaign(campaign)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editCampaign(campaign)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="duplicateCampaign(campaign)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                  <button
                    @click="deleteCampaign(campaign.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
                to
                <span class="font-medium">{{
                  Math.min(pagination.page * pagination.limit, pagination.total)
                }}</span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Campaign Form Modal -->
  <div v-if="showFormModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ campaignToEdit ? 'Edit Campaign' : 'Create New Campaign' }}
                </h3>
                <button @click="closeFormModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <CampaignForm
                :campaign="campaignToEdit"
                :loading="isFormLoading"
                @submit="handleSubmitCampaign"
                @cancel="closeFormModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Campaign View Modal -->
  <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Campaign Details</h3>
                <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <CampaignView v-if="selectedCampaign" :campaign="selectedCampaign" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Duplicate Campaign Modal -->
  <div v-if="showDuplicateModal" class="fixed inset-0 z-50 overflow-y-auto">
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Duplicate Campaign</h3>
                <button @click="closeDuplicateModal" class="text-gray-400 hover:text-gray-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >New Campaign Name *</label
                  >
                  <input
                    v-model="duplicateData.name"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter new campaign name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    v-model="duplicateData.description"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter new description"
                  />
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                  <button
                    @click="closeDuplicateModal"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleDuplicateCampaign"
                    :disabled="!duplicateData.name.trim()"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Duplicate Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCampaignStore } from '../stores'
import CampaignForm from '../components/CampaignForm.vue'
import CampaignView from '../components/CampaignView.vue'
import type { Campaign, CampaignFormData } from '../types'

const campaignStore = useCampaignStore()

// Computed properties
const campaigns = computed(() => campaignStore.campaigns)
const stats = computed(() => campaignStore.stats)
const pagination = computed(() => campaignStore.pagination)

// Local state
const showFormModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const campaignToEdit = ref<Campaign | null>(null)
const selectedCampaign = ref<Campaign | null>(null)
const campaignToDuplicate = ref<Campaign | null>(null)
const isFormLoading = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('')
const selectedType = ref('')
const selectedObjective = ref('')

// Duplicate modal data
const duplicateData = ref({
  name: '',
  description: '',
})

// Methods
const openCreateForm = () => {
  campaignToEdit.value = null
  showFormModal.value = true
}

const viewCampaign = (campaign: Campaign) => {
  selectedCampaign.value = campaign
  showViewModal.value = true
}

const editCampaign = (campaign: Campaign) => {
  campaignToEdit.value = campaign
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  campaignToEdit.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedCampaign.value = null
}

const duplicateCampaign = (campaign: Campaign) => {
  campaignToDuplicate.value = campaign
  duplicateData.value.name = `${campaign.name} (Copy)`
  duplicateData.value.description = campaign.description || ''
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  campaignToDuplicate.value = null
  duplicateData.value.name = ''
  duplicateData.value.description = ''
}

const handleSubmitCampaign = async (data: CampaignFormData) => {
  try {
    isFormLoading.value = true
    if (campaignToEdit.value) {
      await campaignStore.updateCampaign(campaignToEdit.value.id, data)
    } else {
      await campaignStore.createCampaign(data)
    }
    closeFormModal()
    await loadCampaigns()
    await loadCampaignStats()
  } catch (error) {
    console.error('Error saving campaign:', error)
  } finally {
    isFormLoading.value = false
  }
}

const handleDuplicateCampaign = async () => {
  if (!campaignToDuplicate.value) return

  try {
    isFormLoading.value = true
    await campaignStore.duplicateCampaign(
      campaignToDuplicate.value.id,
      duplicateData.value.name,
      duplicateData.value.description,
    )
    closeDuplicateModal()
    await loadCampaigns()
    await loadCampaignStats()
  } catch (error) {
    console.error('Error duplicating campaign:', error)
  } finally {
    isFormLoading.value = false
  }
}

const deleteCampaign = async (id: string) => {
  if (!confirm('Are you sure you want to delete this campaign?')) return

  try {
    await campaignStore.deleteCampaign(id)
    await loadCampaigns()
    await loadCampaignStats()
  } catch (error) {
    console.error('Error deleting campaign:', error)
  }
}

// Pagination methods
const nextPage = () => {
  campaignStore.nextPage()
}

const previousPage = () => {
  campaignStore.previousPage()
}

// Filter methods
const applyFilters = () => {
  const filters: any = {}
  if (searchQuery.value) filters.search = searchQuery.value
  if (selectedStatus.value) filters.status = [selectedStatus.value]
  if (selectedType.value) filters.type = [selectedType.value]
  if (selectedObjective.value) filters.objective = [selectedObjective.value]

  campaignStore.setFilters(filters)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = ''
  selectedType.value = ''
  selectedObjective.value = ''
  campaignStore.clearFilters()
}

// Watch for filter changes
watch([searchQuery, selectedStatus, selectedType, selectedObjective], () => {
  applyFilters()
})

// Load data
const loadCampaigns = async () => {
  await campaignStore.loadCampaigns()
}

const loadCampaignStats = async () => {
  await campaignStore.loadCampaignStats()
}

// Utility functions
const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatCampaignStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    DRAFT: 'Draft',
    ACTIVE: 'Active',
    PAUSED: 'Paused',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    SCHEDULED: 'Scheduled',
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
    OTHER: 'Other',
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
    BRAND_BUILDING: 'Brand Building',
  }
  return objectiveMap[objective] || objective
}

const formatApprovalStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: 'Pending',
    APPROVED: 'Approved',
    REJECTED: 'Rejected',
  }
  return statusMap[status] || status
}

const formatFrequency = (frequency: string): string => {
  const frequencyMap: Record<string, string> = {
    ONCE: 'Once',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    CUSTOM: 'Custom',
  }
  return frequencyMap[frequency] || frequency
}

// Initialize
onMounted(async () => {
  await loadCampaigns()
  await loadCampaignStats()
})
</script>
