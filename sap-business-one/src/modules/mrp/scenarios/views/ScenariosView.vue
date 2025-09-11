<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">MRP Scenarios</h1>
        <p class="text-gray-600 mt-1">Create and compare different planning scenarios</p>
      </div>
      <div class="flex space-x-3">
        <button
          @click="compareSelected"
          :disabled="selectedScenarios.length < 2"
          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
        >
          Compare Selected ({{ selectedScenarios.length }})
        </button>
        <button
          @click="showCreateModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Scenario
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Scenarios</dt>
                <dd class="text-lg font-medium text-gray-900">{{ scenarios.length }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Active</dt>
                <dd class="text-lg font-medium text-gray-900">{{ activeScenarios }}</dd>
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
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Best Service Level</dt>
                <dd class="text-lg font-medium text-gray-900">{{ bestServiceLevel.toFixed(1) }}%</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Lowest Cost</dt>
                <dd class="text-lg font-medium text-gray-900">${{ lowestCost.toLocaleString() }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Filters</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            v-model="filters.search"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            placeholder="Search scenarios..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Created From</label>
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

    <!-- Scenarios Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div class="flex items-center">
          <input
            type="checkbox"
            :checked="allSelected"
            @change="toggleSelectAll"
            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <h3 class="ml-3 text-lg font-medium text-gray-900">Scenarios ({{ scenarios.length }})</h3>
        </div>
        <div class="flex space-x-2">
          <button
            @click="exportScenarios"
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Baseline</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="scenario in scenarios" :key="scenario.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="selectedScenarios.includes(scenario.id)"
                  @change="toggleSelection(scenario.id)"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ scenario.name }}</div>
                  <div class="text-sm text-gray-500">{{ scenario.description || 'No description' }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(scenario.status)
                  ]"
                >
                  {{ formatStatus(scenario.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(scenario.baselineDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div v-if="scenario.results">
                  <div>{{ scenario.results.totalOrders }} orders</div>
                  <div class="text-xs text-gray-500">${{ scenario.results.totalCost.toLocaleString() }}</div>
                </div>
                <div v-else class="text-gray-400">Not run</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="scenario.results" class="text-sm">
                  <div class="flex items-center">
                    <span class="text-green-600 font-medium">{{ scenario.results.serviceLevel.toFixed(1) }}%</span>
                    <span class="ml-2 text-gray-500">SL</span>
                  </div>
                  <div class="flex items-center mt-1">
                    <span class="text-blue-600 font-medium">{{ scenario.results.inventoryTurnover.toFixed(1) }}</span>
                    <span class="ml-2 text-gray-500">Turn</span>
                  </div>
                </div>
                <div v-else class="text-gray-400">-</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div>{{ new Date(scenario.createdAt).toLocaleDateString() }}</div>
                <div class="text-xs">{{ scenario.createdBy }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="viewScenario(scenario)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
                <button
                  @click="runScenario(scenario)"
                  class="text-green-600 hover:text-green-900"
                >
                  Run
                </button>
                <button
                  @click="editScenario(scenario)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  @click="cloneScenario(scenario)"
                  class="text-purple-600 hover:text-purple-900"
                >
                  Clone
                </button>
              </td>
            </tr>
            <tr v-if="scenarios.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                No scenarios found. Create your first planning scenario.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-3xl shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-900">
            {{ selectedScenario ? 'Edit Scenario' : 'New Scenario' }}
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
              <label class="block text-sm font-medium text-gray-700 mb-2">Scenario Name *</label>
              <input
                type="text"
                v-model="form.name"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="e.g., High Demand Scenario"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Baseline Date *</label>
              <input
                type="date"
                v-model="form.baselineDate"
                required
                class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="2"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Describe this scenario and its assumptions"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
            <select
              v-model="form.status"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div class="bg-gray-50 p-4 rounded-lg">
            <h4 class="font-medium text-gray-900 mb-4">Scenario Parameters</h4>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Planning Horizon (days)</label>
                <input
                  type="number"
                  v-model.number="form.parameters.planningHorizon"
                  min="1"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Safety Stock Multiplier</label>
                <input
                  type="number"
                  v-model.number="form.parameters.safetyStockMultiplier"
                  step="0.1"
                  min="0"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Lead Time Buffer (days)</label>
                <input
                  type="number"
                  v-model.number="form.parameters.leadTimeBuffer"
                  min="0"
                  class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
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
              {{ loading ? 'Saving...' : selectedScenario ? 'Update Scenario' : 'Create Scenario' }}
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
import type { MRPScenario, ScenarioFormData, MRPSearchParams, ScenarioStatus } from '../../types'

const mrpStore = useMRPStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const selectedScenario = ref<MRPScenario | null>(null)
const selectedScenarios = ref<string[]>([])

const form = ref<ScenarioFormData>({
  name: '',
  description: '',
  status: 'active',
  baselineDate: '',
  parameters: {
    planningHorizon: 30,
    safetyStockMultiplier: 1.0,
    leadTimeBuffer: 0,
    lotSizingRules: {},
    demandAdjustments: [],
    supplyAdjustments: []
  }
})

const filters = reactive<MRPSearchParams>({
  search: '',
  status: '' as ScenarioStatus | '',
  dateFrom: ''
})

const scenarios = computed(() => mrpStore.scenarios)
const loading = computed(() => mrpStore.loading)

const activeScenarios = computed(() => 
  scenarios.value.filter(s => s.status === 'active').length
)

const bestServiceLevel = computed(() => {
  if (scenarios.value.length === 0) return 0
  return Math.max(...scenarios.value.map(s => s.results?.serviceLevel || 0))
})

const lowestCost = computed(() => {
  if (scenarios.value.length === 0) return 0
  const costsWithResults = scenarios.value.filter(s => s.results?.totalCost).map(s => s.results!.totalCost)
  return costsWithResults.length > 0 ? Math.min(...costsWithResults) : 0
})

const allSelected = computed(() => 
  scenarios.value.length > 0 && selectedScenarios.value.length === scenarios.value.length
)

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800'
    case 'inactive': return 'bg-gray-100 text-gray-800'
    case 'archived': return 'bg-yellow-100 text-yellow-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function toggleSelection(id: string) {
  const index = selectedScenarios.value.indexOf(id)
  if (index === -1) {
    selectedScenarios.value.push(id)
  } else {
    selectedScenarios.value.splice(index, 1)
  }
}

function toggleSelectAll() {
  if (allSelected.value) {
    selectedScenarios.value = []
  } else {
    selectedScenarios.value = scenarios.value.map(s => s.id)
  }
}

function resetFilters() {
  Object.assign(filters, {
    search: '',
    status: '',
    dateFrom: ''
  })
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  selectedScenario.value = null
  resetForm()
}

function resetForm() {
  Object.assign(form.value, {
    name: '',
    description: '',
    status: 'active',
    baselineDate: '',
    parameters: {
      planningHorizon: 30,
      safetyStockMultiplier: 1.0,
      leadTimeBuffer: 0,
      lotSizingRules: {},
      demandAdjustments: [],
      supplyAdjustments: []
    }
  })
}

function editScenario(scenario: MRPScenario) {
  selectedScenario.value = scenario
  Object.assign(form.value, {
    name: scenario.name,
    description: scenario.description || '',
    status: scenario.status,
    baselineDate: scenario.baselineDate.split('T')[0],
    parameters: { ...scenario.parameters }
  })
  showEditModal.value = true
}

function viewScenario(scenario: MRPScenario) {
  console.log('View scenario:', scenario.id)
}

async function runScenario(scenario: MRPScenario) {
  if (confirm(`Run scenario "${scenario.name}"? This may take several minutes.`)) {
    try {
      await mrpStore.runScenario(scenario.id)
      await loadScenarios()
    } catch (error) {
      console.error('Failed to run scenario:', error)
    }
  }
}

function cloneScenario(scenario: MRPScenario) {
  selectedScenario.value = null
  Object.assign(form.value, {
    name: `${scenario.name} (Copy)`,
    description: scenario.description || '',
    status: 'active',
    baselineDate: scenario.baselineDate.split('T')[0],
    parameters: { ...scenario.parameters }
  })
  showCreateModal.value = true
}

function compareSelected() {
  if (selectedScenarios.value.length >= 2) {
    console.log('Compare scenarios:', selectedScenarios.value)
  }
}

async function handleSubmit() {
  try {
    if (selectedScenario.value) {
      console.log('Update scenario')
    } else {
      await mrpStore.createScenario(form.value)
    }
    closeModals()
    await loadScenarios()
  } catch (error) {
    console.error('Failed to save scenario:', error)
  }
}

function exportScenarios() {
  console.log('Export scenarios')
}

async function loadScenarios() {
  const searchParams: MRPSearchParams = {
    ...filters,
    page: 1,
    limit: 50
  }
  
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key as keyof MRPSearchParams] === '') {
      delete searchParams[key as keyof MRPSearchParams]
    }
  })
  
  try {
    await mrpStore.fetchScenarios(searchParams)
  } catch (error) {
    console.error('Failed to load scenarios:', error)
  }
}

watch(filters, () => {
  loadScenarios()
}, { deep: true })

onMounted(() => {
  loadScenarios()
})
</script>
