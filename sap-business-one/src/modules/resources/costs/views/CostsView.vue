<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Resource Costs</h1>
        <p class="text-sm text-gray-600">Manage resource cost rates and cost accounting</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Cost Rate</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Cost/Hour</p>
            <p class="text-xl font-bold text-gray-900">{{ formatCurrency(totalCostPerHour) }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Average Cost</p>
            <p class="text-xl font-bold text-gray-900">{{ formatCurrency(averageCost) }}/hr</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Costs</p>
            <p class="text-xl font-bold text-gray-900">{{ activeCostsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Resources</p>
            <p class="text-xl font-bold text-gray-900">{{ resourcesCount }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search costs..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterCostType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Cost Types</option>
            <option value="standard">Standard</option>
            <option value="actual">Actual</option>
            <option value="planned">Planned</option>
            <option value="budgeted">Budgeted</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Costs Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Cost Rates</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Standard Rate
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective Date
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="cost in filteredCosts" :key="cost.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ cost.resourceName }}</div>
                <div class="text-sm text-gray-500">{{ cost.resourceCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ cost.costType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ cost.currency }} {{ cost.standardRate.toFixed(2) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                {{ cost.costPeriod }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    cost.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ cost.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(cost.effectiveFrom).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewCost(cost)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editCost(cost)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteCost(cost.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredCosts.length === 0" class="text-center py-8">
          <p class="text-gray-500">No cost rates found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <CostForm
          :loading="loading"
          @submit="handleCreate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedCost" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <CostForm
          :cost="selectedCost"
          :loading="loading"
          @submit="handleUpdate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedCost" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-end mb-4">
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <CostView :cost="selectedCost" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useResourceCostStore } from '../stores/resourceCostStore'
import CostForm from '../components/CostForm.vue'
import CostView from '../components/CostView.vue'
import type { ResourceCost, ResourceCostFormData } from '../types'

const costStore = useResourceCostStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedCost = ref<ResourceCost | null>(null)

// Filters
const searchQuery = ref('')
const filterCostType = ref('')
const filterStatus = ref('')

const filteredCosts = computed(() => {
  let filtered = costStore.costs

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      cost =>
        cost.resourceName.toLowerCase().includes(query) ||
        cost.resourceCode.toLowerCase().includes(query) ||
        cost.costType.toLowerCase().includes(query)
    )
  }

  if (filterCostType.value) {
    filtered = filtered.filter(cost => cost.costType === filterCostType.value)
  }

  if (filterStatus.value) {
    const isActive = filterStatus.value === 'true'
    filtered = filtered.filter(cost => cost.isActive === isActive)
  }

  return filtered
})

// Statistics
const totalCostPerHour = computed(() => {
  return costStore.costs
    .filter(cost => cost.isActive && cost.costPeriod === 'hourly')
    .reduce((sum, cost) => sum + cost.standardRate, 0)
})

const averageCost = computed(() => {
  const hourlyCosts = costStore.costs.filter(cost => cost.isActive && cost.costPeriod === 'hourly')
  if (hourlyCosts.length === 0) return 0
  return totalCostPerHour.value / hourlyCosts.length
})

const activeCostsCount = computed(() => {
  return costStore.costs.filter(cost => cost.isActive).length
})

const resourcesCount = computed(() => {
  const uniqueResources = new Set(costStore.costs.map(cost => cost.resourceId))
  return uniqueResources.size
})

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewCost(cost: ResourceCost) {
  selectedCost.value = cost
  showViewModal.value = true
}

function editCost(cost: ResourceCost) {
  selectedCost.value = cost
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedCost.value = null
}

// CRUD operations
async function handleCreate(data: ResourceCostFormData) {
  loading.value = true
  try {
    await costStore.createCost(data)
    closeModals()
  } catch (error) {
    console.error('Error creating cost:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdate(data: ResourceCostFormData) {
  if (!selectedCost.value) return

  loading.value = true
  try {
    await costStore.updateCost(selectedCost.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating cost:', error)
  } finally {
    loading.value = false
  }
}

async function deleteCost(id: string) {
  if (confirm('Are you sure you want to delete this cost rate?')) {
    try {
      await costStore.deleteCost(id)
    } catch (error) {
      console.error('Error deleting cost:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterCostType.value = ''
  filterStatus.value = ''
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

onMounted(() => {
  costStore.fetchCosts()
})
</script>