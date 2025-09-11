<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Lead Management</h1>
          <p class="text-gray-600">
            Manage sales leads, track opportunities, and convert prospects to customers
          </p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Lead
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div
              class="w-8 h-8 bg-sap-blue bg-opacity-20 rounded-md flex items-center justify-center"
            >
              <svg
                class="w-5 h-5 text-sap-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Leads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalLeads || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-emerald-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-emerald-600"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Qualified Leads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.qualifiedLeads || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Value</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats?.totalEstimatedValue || 0) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
              <svg
                class="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">New This Month</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.newLeadsThisMonth || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Leads Table -->
    <div class="bg-white border border-gray-200 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 class="text-lg font-medium text-gray-900">Leads</h2>
          <div class="mt-4 sm:mt-0">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search leads..."
              class="block w-full sm:w-64 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            />
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Value
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Next Follow-up
              </th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="lead in leads" :key="lead.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ lead.companyName }}</div>
                  <div class="text-sm text-gray-500">{{ lead.leadName }}</div>
                  <div class="text-xs text-gray-400">{{ lead.leadCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': lead.status === 'NEW',
                    'bg-blue-100 text-blue-800': lead.status === 'CONTACTED',
                    'bg-green-100 text-green-800': lead.status === 'QUALIFIED',
                    'bg-yellow-100 text-yellow-800': lead.status === 'PROPOSAL_SENT',
                    'bg-orange-100 text-orange-800': lead.status === 'NEGOTIATION',
                    'bg-emerald-100 text-emerald-800': lead.status === 'WON',
                    'bg-red-100 text-red-800': lead.status === 'LOST',
                    'bg-slate-100 text-slate-800': lead.status === 'DISQUALIFIED',
                  }"
                >
                  {{ formatStatus(lead.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': lead.priority === 'LOW',
                    'bg-blue-100 text-blue-800': lead.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': lead.priority === 'HIGH',
                    'bg-red-100 text-red-800': lead.priority === 'URGENT',
                  }"
                >
                  {{ formatPriority(lead.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(lead.financial.estimatedValue) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ lead.assignedTo || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ lead.nextFollowUpDate ? formatDate(lead.nextFollowUpDate) : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button @click="viewLead(lead)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editLead(lead)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteLead(lead.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-6 py-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="nextPage"
              :disabled="pagination.page === pagination.totalPages"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lead Form Modal -->
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
                    {{ leadToEdit ? 'Edit Lead' : 'Create New Lead' }}
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
                <LeadForm
                  :lead="leadToEdit"
                  :loading="isFormLoading"
                  @submit="handleSubmitLead"
                  @cancel="closeFormModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Lead View Modal -->
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
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Lead Details</h3>
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
                <LeadView v-if="selectedLead" :lead="selectedLead" />
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
import { useLeadStore } from '../stores'
import LeadForm from '../components/LeadForm.vue'
import LeadView from '../components/LeadView.vue'
import type { Lead, LeadFormData } from '../types'

// Store
const leadStore = useLeadStore()

// Computed properties from store
const leads = computed(() => leadStore.leads)
const loading = computed(() => leadStore.loading)
const error = computed(() => leadStore.error)
const stats = computed(() => leadStore.stats)
const pagination = computed(() => leadStore.pagination)

// Local state
const showFormModal = ref(false)
const showViewModal = ref(false)
const leadToEdit = ref<Lead | null>(null)
const selectedLead = ref<Lead | null>(null)
const isFormLoading = ref(false)
const searchQuery = ref('')

// Methods
const loadLeads = () => {
  leadStore.loadLeads()
}

const loadLeadStats = () => {
  leadStore.loadLeadStats()
}

const handlePageSizeChange = () => {
  leadStore.setPageSize(pagination.value.limit)
}

const nextPage = () => {
  leadStore.nextPage()
}

const previousPage = () => {
  leadStore.previousPage()
}

const openCreateForm = () => {
  leadToEdit.value = null
  showFormModal.value = true
}

const editLead = (lead: Lead) => {
  leadToEdit.value = lead
  showFormModal.value = true
}

const viewLead = (lead: Lead) => {
  selectedLead.value = lead
  showViewModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  leadToEdit.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedLead.value = null
}

const handleSubmitLead = async (data: LeadFormData) => {
  try {
    isFormLoading.value = true
    if (leadToEdit.value) {
      await leadStore.updateLead(leadToEdit.value.id, data)
    } else {
      await leadStore.createLead(data)
    }
    closeFormModal()
    loadLeads()
  } catch (error) {
    console.error('Failed to save lead:', error)
  } finally {
    isFormLoading.value = false
  }
}

const deleteLead = async (id: string) => {
  if (confirm('Are you sure you want to delete this lead?')) {
    try {
      await leadStore.deleteLead(id)
    } catch (err) {
      console.error('Failed to delete lead:', err)
    }
  }
}

// Watch for search query changes
watch(searchQuery, (query) => {
  if (query.trim()) {
    leadStore.setFilters({ search: query })
  } else {
    leadStore.clearFilters()
  }
  leadStore.loadLeads()
})

// Utility functions
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'NEW':
      return 'New'
    case 'CONTACTED':
      return 'Contacted'
    case 'QUALIFIED':
      return 'Qualified'
    case 'PROPOSAL_SENT':
      return 'Proposal Sent'
    case 'NEGOTIATION':
      return 'Negotiation'
    case 'WON':
      return 'Won'
    case 'LOST':
      return 'Lost'
    case 'DISQUALIFIED':
      return 'Disqualified'
    default:
      return status
  }
}

const formatPriority = (priority: string): string => {
  switch (priority) {
    case 'LOW':
      return 'Low'
    case 'MEDIUM':
      return 'Medium'
    case 'HIGH':
      return 'High'
    case 'URGENT':
      return 'Urgent'
    default:
      return priority
  }
}

// Lifecycle
onMounted(() => {
  loadLeads()
  loadLeadStats()
})
</script>
