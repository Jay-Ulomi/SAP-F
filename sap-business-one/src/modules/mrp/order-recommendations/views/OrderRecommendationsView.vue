<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Order Recommendations</h1>
        <p class="text-gray-600 mt-1">Review and approve MRP-generated order recommendations</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="bulkApprove"
          :disabled="selectedRecommendations.length === 0"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 disabled:opacity-50"
        >
          Bulk Approve ({{ selectedRecommendations.length }})
        </button>
        <button
          @click="bulkReject"
          :disabled="selectedRecommendations.length === 0"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
        >
          Bulk Reject ({{ selectedRecommendations.length }})
        </button>
      </div>
    </div>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total</dt>
                <dd class="text-lg font-medium text-gray-900">{{ recommendations.length }}</dd>
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
                <dd class="text-lg font-medium text-gray-900">{{ pendingCount }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Approved</dt>
                <dd class="text-lg font-medium text-gray-900">{{ approvedCount }}</dd>
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
                <dd class="text-lg font-medium text-gray-900">${{ totalValue.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            placeholder="Search items..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="implemented">Implemented</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            v-model="filters.type"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Types</option>
            <option value="purchase_order">Purchase Order</option>
            <option value="production_order">Production Order</option>
            <option value="transfer_order">Transfer Order</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            v-model="filters.priority"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Due Date From</label>
          <input
            type="date"
            v-model="filters.dateFrom"
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

    <!-- Recommendations Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="allSelected"
            @change="toggleSelectAll"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <h3 class="ml-3 text-lg font-medium text-gray-900">Recommendations ({{ recommendations.length }})</h3>
        </div>
        <div class="flex space-x-2">
          <button
            @click="exportRecommendations"
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  @change="toggleSelectAll"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="rec in recommendations" :key="rec.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="selectedRecommendations.includes(rec.id)"
                  @change="toggleSelection(rec.id)"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ rec.itemName }}</div>
                  <div class="text-sm text-gray-500">{{ rec.itemCode }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatOrderType(rec.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ rec.recommendedQuantity.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(rec.dueDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ rec.supplierName || '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ rec.totalCost.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getPriorityColor(rec.priority)
                  ]"
                >
                  {{ rec.priority.toUpperCase() }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(rec.status)
                  ]"
                >
                  {{ formatStatus(rec.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  v-if="rec.status === 'pending'"
                  @click="approveRecommendation(rec)"
                  class="text-green-600 hover:text-green-900"
                >
                  Approve
                </button>
                <button
                  v-if="rec.status === 'pending'"
                  @click="rejectRecommendation(rec)"
                  class="text-red-600 hover:text-red-900"
                >
                  Reject
                </button>
                <button
                  v-if="rec.status === 'approved'"
                  @click="implementRecommendation(rec)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Implement
                </button>
              </td>
            </tr>
            <tr v-if="recommendations.length === 0">
              <td colspan="10" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                No order recommendations found. Run an MRP plan to generate recommendations.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Bulk Action Modals -->
    <div v-if="showBulkApproveModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Bulk Approve Recommendations</h3>
        <form @submit.prevent="handleBulkApprove" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
            <textarea
              v-model="bulkActionNotes"
              rows="3"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add notes for this bulk approval..."
            ></textarea>
          </div>
          <div class="text-sm text-gray-500">
            {{ selectedRecommendations.length }} recommendations will be approved.
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showBulkApproveModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:opacity-50"
            >
              {{ loading ? 'Approving...' : 'Approve All' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showBulkRejectModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Bulk Reject Recommendations</h3>
        <form @submit.prevent="handleBulkReject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Rejection Reason *</label>
            <textarea
              v-model="bulkActionReason"
              rows="3"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Provide reason for rejection..."
            ></textarea>
          </div>
          <div class="text-sm text-gray-500">
            {{ selectedRecommendations.length }} recommendations will be rejected.
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showBulkRejectModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:opacity-50"
            >
              {{ loading ? 'Rejecting...' : 'Reject All' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { useMRPStore } from '../../stores/mrpStore'
import type { OrderRecommendation, MRPSearchParams, RecommendationStatus, OrderType } from '../../types'

const mrpStore = useMRPStore()

const selectedRecommendations = ref<string[]>([])
const showBulkApproveModal = ref(false)
const showBulkRejectModal = ref(false)
const bulkActionNotes = ref('')
const bulkActionReason = ref('')

const filters = reactive<MRPSearchParams>({
  search: '',
  status: '' as RecommendationStatus | '',
  type: '' as OrderType | '',
  priority: '',
  dateFrom: ''
})

const recommendations = computed(() => mrpStore.recommendations)
const loading = computed(() => mrpStore.loading)
const error = computed(() => mrpStore.error)

const pendingCount = computed(() => recommendations.value.filter(r => r.status === 'pending').length)
const approvedCount = computed(() => recommendations.value.filter(r => r.status === 'approved').length)
const totalValue = computed(() => recommendations.value.reduce((sum, r) => sum + r.totalCost, 0))

const allSelected = computed(() => 
  recommendations.value.length > 0 && selectedRecommendations.value.length === recommendations.value.length
)

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatOrderType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800'
    case 'approved': return 'bg-green-100 text-green-800'
    case 'rejected': return 'bg-red-100 text-red-800'
    case 'implemented': return 'bg-blue-100 text-blue-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800'
    case 'high': return 'bg-orange-100 text-orange-800'
    case 'medium': return 'bg-yellow-100 text-yellow-800'
    case 'low': return 'bg-green-100 text-green-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function toggleSelection(id: string) {
  const index = selectedRecommendations.value.indexOf(id)
  if (index === -1) {
    selectedRecommendations.value.push(id)
  } else {
    selectedRecommendations.value.splice(index, 1)
  }
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedRecommendations.value = []
  } else {
    selectedRecommendations.value = recommendations.value.map(r => r.id)
  }
}

function resetFilters() {
  Object.assign(filters, {
    search: '',
    status: '',
    type: '',
    priority: '',
    dateFrom: ''
  })
}

function bulkApprove() {
  if (selectedRecommendations.value.length > 0) {
    bulkActionNotes.value = ''
    showBulkApproveModal.value = true
  }
}

function bulkReject() {
  if (selectedRecommendations.value.length > 0) {
    bulkActionReason.value = ''
    showBulkRejectModal.value = true
  }
}

async function handleBulkApprove() {
  try {
    await mrpStore.bulkApproveRecommendations(selectedRecommendations.value, bulkActionNotes.value)
    showBulkApproveModal.value = false
    selectedRecommendations.value = []
    await loadRecommendations()
  } catch (error) {
    console.error('Failed to bulk approve recommendations:', error)
  }
}

async function handleBulkReject() {
  try {
    await mrpStore.bulkRejectRecommendations(selectedRecommendations.value, bulkActionReason.value)
    showBulkRejectModal.value = false
    selectedRecommendations.value = []
    await loadRecommendations()
  } catch (error) {
    console.error('Failed to bulk reject recommendations:', error)
  }
}

async function approveRecommendation(recommendation: OrderRecommendation) {
  try {
    await mrpStore.approveRecommendation(recommendation.id)
    await loadRecommendations()
  } catch (error) {
    console.error('Failed to approve recommendation:', error)
  }
}

async function rejectRecommendation(recommendation: OrderRecommendation) {
  const reason = prompt('Please provide a reason for rejection:')
  if (reason) {
    try {
      await mrpStore.rejectRecommendation(recommendation.id, reason)
      await loadRecommendations()
    } catch (error) {
      console.error('Failed to reject recommendation:', error)
    }
  }
}

function implementRecommendation(recommendation: OrderRecommendation) {
  console.log('Implement recommendation:', recommendation.id)
}

function exportRecommendations() {
  console.log('Export recommendations')
}

async function loadRecommendations() {
  const searchParams: MRPSearchParams = {
    ...filters,
    page: 1,
    limit: 100
  }
  
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key as keyof MRPSearchParams] === '') {
      delete searchParams[key as keyof MRPSearchParams]
    }
  })
  
  try {
    await mrpStore.fetchRecommendations(searchParams)
  } catch (error) {
    console.error('Failed to load recommendations:', error)
  }
}

watch(filters, () => {
  loadRecommendations()
}, { deep: true })

onMounted(() => {
  loadRecommendations()
})
</script>
