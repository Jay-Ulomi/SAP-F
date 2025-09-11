<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Lead Management</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Lead
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Total Leads</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalLeads || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Qualified</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.qualifiedLeads || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Converted</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.convertedLeads || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Conversion Rate</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.conversionRate || 0 }}%</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          v-model="searchQuery"
          @keyup.enter="applyFilters"
          type="text"
          placeholder="Search leads..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        />
        <select
          v-model="filters.status"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="CONTACTED">Contacted</option>
          <option value="QUALIFIED">Qualified</option>
          <option value="DISQUALIFIED">Disqualified</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
        <select
          v-model="filters.priority"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Leads</h3>
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
                Company
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading leads...</td>
            </tr>
            <tr v-else-if="leads.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">No leads found.</td>
            </tr>
            <tr v-for="lead in leads" :key="lead.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ lead.title }}</div>
                <div class="text-sm text-gray-500">{{ lead.leadCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': lead.status === 'NEW',
                    'bg-yellow-100 text-yellow-800': lead.status === 'CONTACTED',
                    'bg-green-100 text-green-800': lead.status === 'QUALIFIED',
                    'bg-red-100 text-red-800': lead.status === 'DISQUALIFIED',
                    'bg-slate-100 text-slate-800': lead.status === 'ON_HOLD',
                  }"
                  >{{ formatLeadStatus(lead.status) }}</span
                >
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ lead.company.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ lead.contact.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ lead.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewLead(lead)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="editLead(lead)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deleteLead(lead.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="!pagination.hasPrev"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!pagination.hasNext"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
              {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span
                ><svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                @click="goToPage(p)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  pagination.page === p
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span
                ><svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeCreateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingLead ? 'Edit Lead' : 'Create New Lead' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <LeadForm
          :lead="editingLead"
          :loading="loading"
          @submit="handleSubmitLead"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeViewModal"
    >
      <div
        class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Lead Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <LeadView v-if="selectedLead" :lead="selectedLead" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { useLeadStore } from '../stores'
const LeadForm = defineAsyncComponent(() => import('../components/LeadForm.vue'))
const LeadView = defineAsyncComponent(() => import('../components/LeadView.vue'))
import type { Lead, LeadFormData, LeadFilters } from '../types'
import { LeadStatus, LeadPriority } from '../types'

const leadStore = useLeadStore()

const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingLead = ref<Lead | null>(null)
const selectedLead = ref<Lead | null>(null)

const searchQuery = ref('')
const filters = ref<LeadFilters>({ status: undefined, priority: undefined })

const leads = computed(() => leadStore.leads)
const loading = computed(() => leadStore.loading)
const stats = computed(() => leadStore.stats)
const pagination = computed(() => leadStore.pagination)

const openCreateModal = () => {
  editingLead.value = null
  showCreateModal.value = true
}
const editLead = (lead: Lead) => {
  editingLead.value = { ...lead }
  showCreateModal.value = true
}
const closeCreateModal = () => {
  showCreateModal.value = false
  editingLead.value = null
}
const viewLead = (lead: Lead) => {
  selectedLead.value = lead
  showViewModal.value = true
}
const closeViewModal = () => {
  showViewModal.value = false
  selectedLead.value = null
}

const handleSubmitLead = async (data: LeadFormData) => {
  if (editingLead.value) await leadStore.updateLead(editingLead.value.id, data)
  else await leadStore.createLead(data)
  closeCreateModal()
  await loadData()
}

const deleteLead = async (id: string) => {
  if (!confirm('Delete this lead?')) return
  await leadStore.deleteLead(id)
  await loadData()
}

const applyFilters = async () => {
  const newFilters: LeadFilters = {}
  if (searchQuery.value.trim()) newFilters.search = searchQuery.value.trim()
  if (filters.value.status) newFilters.status = filters.value.status as LeadStatus
  if (filters.value.priority) newFilters.priority = filters.value.priority as LeadPriority
  leadStore.setFilters(newFilters)
  await leadStore.loadLeads(1, 10, newFilters)
}

const clearFilters = async () => {
  searchQuery.value = ''
  filters.value = { status: undefined, priority: undefined }
  leadStore.setFilters({})
  await leadStore.loadLeads()
}

const nextPage = async () => {
  if (pagination.value.hasNext) await leadStore.loadLeads(pagination.value.page + 1)
}
const previousPage = async () => {
  if (pagination.value.hasPrev) await leadStore.loadLeads(pagination.value.page - 1)
}
const goToPage = async (p: number) => {
  await leadStore.loadLeads(p)
}

const formatLeadStatus = (s: string) =>
  ({
    NEW: 'New',
    CONTACTED: 'Contacted',
    QUALIFIED: 'Qualified',
    DISQUALIFIED: 'Disqualified',
    ON_HOLD: 'On Hold',
  })[s] || s

const loadData = async () => {
  await leadStore.loadLeads()
  await leadStore.loadStats()
}

onMounted(loadData)
</script>
