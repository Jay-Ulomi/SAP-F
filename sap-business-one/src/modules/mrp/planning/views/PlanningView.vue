<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">MRP Planning</h1>
        <p class="text-gray-600 mt-1">Manage material requirements planning runs and analyze results</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New MRP Plan
      </button>
    </div>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Active Plans</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.activePlans || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Recommendations</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalRecommendations || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Pending</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.pendingRecommendations || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd class="text-lg font-medium text-gray-900">${{ (stats?.totalValue || 0).toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            placeholder="Search plans..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="running">Running</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date From</label>
          <input
            type="date"
            v-model="filters.dateFrom"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Date To</label>
          <input
            type="date"
            v-model="filters.dateTo"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          />
        </div>
        <div class="flex items-end">
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Plans Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">MRP Plans ({{ plans.length }})</h3>
        <div class="flex space-x-2">
          <button
            @click="exportPlans"
            class="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Export
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horizon</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="plan in plans" :key="plan.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ plan.name }}</div>
                  <div class="text-sm text-gray-500">{{ plan.description || 'No description' }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ new Date(plan.startDate).toLocaleDateString() }} -</div>
                <div>{{ new Date(plan.endDate).toLocaleDateString() }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ plan.planningHorizon }} days ({{ formatBucketSize(plan.bucketSize) }})
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(plan.status)
                  ]"
                >
                  {{ formatStatus(plan.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div v-if="plan.results">
                  <div>{{ plan.results.recommendationsGenerated }} recommendations</div>
                  <div class="text-xs text-gray-500">${{ plan.results.totalValue.toLocaleString() }}</div>
                </div>
                <div v-else class="text-gray-400">-</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ new Date(plan.createdAt).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="viewPlan(plan)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
                <button
                  v-if="plan.status === 'draft'"
                  @click="runPlan(plan)"
                  class="text-green-600 hover:text-green-900"
                >
                  Run
                </button>
                <button
                  v-if="plan.status === 'running'"
                  @click="cancelPlan(plan)"
                  class="text-red-600 hover:text-red-900"
                >
                  Cancel
                </button>
                <button
                  v-if="['draft', 'failed', 'cancelled'].includes(plan.status)"
                  @click="editPlan(plan)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  v-if="plan.status === 'completed'"
                  @click="viewResults(plan)"
                  class="text-purple-600 hover:text-purple-900"
                >
                  Results
                </button>
              </td>
            </tr>
            <tr v-if="plans.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                No MRP plans found. Create your first plan to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ selectedPlan ? 'Edit MRP Plan' : 'New MRP Plan' }}
          </h2>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Plan Name *</label>
              <input
                type="text"
                v-model="form.name"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., Weekly MRP Run"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Bucket Size *</label>
              <select
                v-model="form.bucketSize"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Brief description of the MRP plan"
            ></textarea>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                v-model="form.startDate"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                v-model="form.endDate"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Planning Horizon (days) *</label>
              <input
                type="number"
                v-model.number="form.planningHorizon"
                min="1"
                max="365"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div class="space-y-4">
            <h4 class="font-medium text-gray-900">Planning Options</h4>
            <div class="space-y-2">
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="form.includeForecasts"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">
                  Include demand forecasts in planning
                </label>
              </div>
              <div class="flex items-center">
                <input
                  type="checkbox"
                  v-model="form.includeSafetyStock"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">
                  Include safety stock requirements
                </label>
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="closeModals"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ loading ? 'Saving...' : selectedPlan ? 'Update Plan' : 'Create Plan' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">MRP Plan Details</h2>
          <button @click="showViewModal = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div v-if="selectedPlan" class="space-y-6">
          <!-- Plan Summary -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="font-medium text-gray-900 mb-3">{{ selectedPlan.name }}</h3>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="font-medium">Status:</span> {{ formatStatus(selectedPlan.status) }}</div>
              <div><span class="font-medium">Planning Horizon:</span> {{ selectedPlan.planningHorizon }} days</div>
              <div><span class="font-medium">Bucket Size:</span> {{ formatBucketSize(selectedPlan.bucketSize) }}</div>
              <div><span class="font-medium">Run By:</span> {{ selectedPlan.runBy }}</div>
            </div>
          </div>

          <!-- Results -->
          <div v-if="selectedPlan.results" class="bg-white border rounded-lg p-4">
            <h4 class="font-medium text-gray-900 mb-3">Results Summary</h4>
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div><span class="font-medium">Total Items:</span> {{ selectedPlan.results.totalItems }}</div>
              <div><span class="font-medium">Items with Shortage:</span> {{ selectedPlan.results.itemsWithShortage }}</div>
              <div><span class="font-medium">Recommendations:</span> {{ selectedPlan.results.recommendationsGenerated }}</div>
              <div><span class="font-medium">Total Value:</span> ${{ selectedPlan.results.totalValue.toLocaleString() }}</div>
            </div>
          </div>

          <!-- Requirements Table -->
          <div v-if="requirements.length > 0" class="bg-white border rounded-lg overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-200">
              <h4 class="font-medium text-gray-900">Requirements ({{ requirements.length }})</h4>
            </div>
            <div class="overflow-x-auto max-h-64">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="req in requirements.slice(0, 10)" :key="req.id" class="text-sm">
                    <td class="px-4 py-2">{{ req.itemName }}</td>
                    <td class="px-4 py-2">{{ formatRequirementType(req.type) }}</td>
                    <td class="px-4 py-2">{{ req.quantity.toLocaleString() }}</td>
                    <td class="px-4 py-2">{{ new Date(req.date).toLocaleDateString() }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div class="flex justify-end mt-6">
          <button
            @click="showViewModal = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useMRPStore } from '../../stores/mrpStore'
import type { MRPPlan, MRPPlanFormData, MRPSearchParams, PlanningStatus } from '../../types'

const mrpStore = useMRPStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedPlan = ref<MRPPlan | null>(null)

const form = ref<MRPPlanFormData>({
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  planningHorizon: 30,
  bucketSize: 'daily',
  includeForecasts: true,
  includeSafetyStock: true
})

const filters = reactive<MRPSearchParams>({
  search: '',
  status: '' as PlanningStatus | '',
  dateFrom: '',
  dateTo: ''
})

const plans = computed(() => mrpStore.plans)
const requirements = computed(() => mrpStore.requirements)
const stats = computed(() => mrpStore.stats)
const loading = computed(() => mrpStore.loading)
const error = computed(() => mrpStore.error)

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatBucketSize(bucketSize: string): string {
  return bucketSize.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatRequirementType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'running': return 'bg-blue-100 text-blue-800'
    case 'completed': return 'bg-green-100 text-green-800'
    case 'failed': return 'bg-red-100 text-red-800'
    case 'cancelled': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function resetFilters() {
  Object.assign(filters, {
    search: '',
    status: '',
    dateFrom: '',
    dateTo: ''
  })
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedPlan.value = null
  resetForm()
}

function resetForm() {
  Object.assign(form.value, {
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    planningHorizon: 30,
    bucketSize: 'daily',
    includeForecasts: true,
    includeSafetyStock: true
  })
}

function editPlan(plan: MRPPlan) {
  selectedPlan.value = plan
  Object.assign(form.value, {
    name: plan.name,
    description: plan.description || '',
    startDate: plan.startDate.split('T')[0],
    endDate: plan.endDate.split('T')[0],
    planningHorizon: plan.planningHorizon,
    bucketSize: plan.bucketSize,
    includeForecasts: plan.includeForecasts,
    includeSafetyStock: plan.includeSafetyStock
  })
  showEditModal.value = true
}

async function viewPlan(plan: MRPPlan) {
  selectedPlan.value = plan
  showViewModal.value = true
  
  // Load requirements if plan is completed
  if (plan.status === 'completed') {
    try {
      await mrpStore.fetchPlanRequirements(plan.id, { limit: 50 })
    } catch (error) {
      console.error('Failed to load requirements:', error)
    }
  }
}

async function runPlan(plan: MRPPlan) {
  if (confirm(`Are you sure you want to run the plan "${plan.name}"?`)) {
    try {
      await mrpStore.runPlan(plan.id)
      await loadPlans()
    } catch (error) {
      console.error('Failed to run plan:', error)
    }
  }
}

async function cancelPlan(plan: MRPPlan) {
  if (confirm(`Are you sure you want to cancel the running plan "${plan.name}"?`)) {
    try {
      await mrpStore.cancelPlan(plan.id)
      await loadPlans()
    } catch (error) {
      console.error('Failed to cancel plan:', error)
    }
  }
}

function viewResults(plan: MRPPlan) {
  // Navigate to recommendations view with plan filter
  console.log('View results for plan:', plan.id)
}

async function handleSubmit() {
  try {
    if (selectedPlan.value) {
      await mrpStore.updatePlan(selectedPlan.value.id, form.value)
    } else {
      await mrpStore.createPlan(form.value)
    }
    closeModals()
    await loadPlans()
  } catch (error) {
    console.error('Failed to save plan:', error)
  }
}

function exportPlans() {
  console.log('Export plans')
}

async function loadPlans() {
  const searchParams: MRPSearchParams = {
    ...filters,
    page: 1,
    limit: 50
  }
  
  // Remove empty filters
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key as keyof MRPSearchParams] === '') {
      delete searchParams[key as keyof MRPSearchParams]
    }
  })
  
  try {
    await mrpStore.fetchPlans(searchParams)
  } catch (error) {
    console.error('Failed to load plans:', error)
  }
}

async function loadInitialData() {
  try {
    await Promise.all([
      mrpStore.fetchStats(),
      mrpStore.fetchMasterData(),
      loadPlans()
    ])
  } catch (error) {
    console.error('Failed to load initial data:', error)
  }
}

watch(filters, () => {
  loadPlans()
}, { deep: true })

onMounted(() => {
  loadInitialData()
})
</script>
