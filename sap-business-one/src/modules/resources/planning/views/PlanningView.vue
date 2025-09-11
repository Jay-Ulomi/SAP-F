<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Resource Planning</h1>
        <p class="text-sm text-gray-600">Advanced resource planning and scheduling</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Plan</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-indigo-100">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Plans</p>
            <p class="text-xl font-bold text-gray-900">{{ activePlansCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Plans</p>
            <p class="text-xl font-bold text-gray-900">{{ totalPlansCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Utilization</p>
            <p class="text-xl font-bold text-gray-900">{{ averageUtilization }}%</p>
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
            placeholder="Search plans..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterPlanType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Plan Types</option>
            <option value="capacity">Capacity Planning</option>
            <option value="production">Production Planning</option>
            <option value="maintenance">Maintenance Planning</option>
            <option value="utilization">Utilization Planning</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="review">Under Review</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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

    <!-- Plans Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Resource Plans</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Plan Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target Capacity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Utilization
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="plan in filteredPlans" :key="plan.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ plan.resourceName }}</div>
                <div class="text-sm text-gray-500">{{ plan.resourceCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ plan.planType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(plan.planStart).toLocaleDateString() }} - 
                {{ new Date(plan.planEnd).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ plan.targetCapacity }} {{ plan.planningUnit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ plan.targetUtilization }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    plan.status === 'active' || plan.status === 'approved'
                      ? 'bg-green-100 text-green-800'
                      : plan.status === 'draft'
                        ? 'bg-gray-100 text-gray-800'
                        : plan.status === 'review'
                          ? 'bg-yellow-100 text-yellow-800'
                          : plan.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ plan.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewPlan(plan)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editPlan(plan)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deletePlan(plan.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredPlans.length === 0" class="text-center py-8">
          <p class="text-gray-500">No resource plans found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <PlanningForm
          :loading="loading"
          @submit="handleCreate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedPlan" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <PlanningForm
          :plan="selectedPlan"
          :loading="loading"
          @submit="handleUpdate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedPlan" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-end mb-4">
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <PlanningView :plan="selectedPlan" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useResourcePlanStore } from '../stores/resourcePlanStore'
import PlanningForm from '../components/PlanningForm.vue'
import PlanningView from '../components/PlanningView.vue'
import type { ResourcePlan, ResourcePlanFormData } from '../types'

const planStore = useResourcePlanStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedPlan = ref<ResourcePlan | null>(null)

// Filters
const searchQuery = ref('')
const filterPlanType = ref('')
const filterStatus = ref('')

const filteredPlans = computed(() => {
  let filtered = planStore.plans

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      plan =>
        plan.resourceName.toLowerCase().includes(query) ||
        plan.resourceCode.toLowerCase().includes(query) ||
        plan.planType.toLowerCase().includes(query)
    )
  }

  if (filterPlanType.value) {
    filtered = filtered.filter(plan => plan.planType === filterPlanType.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(plan => plan.status === filterStatus.value)
  }

  return filtered
})

// Statistics
const activePlansCount = computed(() => {
  return planStore.plans.filter(plan => plan.status === 'active' || plan.status === 'approved').length
})

const totalPlansCount = computed(() => {
  return planStore.plans.length
})

const averageUtilization = computed(() => {
  if (planStore.plans.length === 0) return 0
  const totalUtilization = planStore.plans.reduce((sum, plan) => sum + plan.targetUtilization, 0)
  return Math.round(totalUtilization / planStore.plans.length)
})

const resourcesCount = computed(() => {
  const uniqueResources = new Set(planStore.plans.map(plan => plan.resourceId))
  return uniqueResources.size
})

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewPlan(plan: ResourcePlan) {
  selectedPlan.value = plan
  showViewModal.value = true
}

function editPlan(plan: ResourcePlan) {
  selectedPlan.value = plan
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedPlan.value = null
}

// CRUD operations
async function handleCreate(data: ResourcePlanFormData) {
  loading.value = true
  try {
    await planStore.createPlan(data)
    closeModals()
  } catch (error) {
    console.error('Error creating plan:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdate(data: ResourcePlanFormData) {
  if (!selectedPlan.value) return

  loading.value = true
  try {
    await planStore.updatePlan(selectedPlan.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating plan:', error)
  } finally {
    loading.value = false
  }
}

async function deletePlan(id: string) {
  if (confirm('Are you sure you want to delete this resource plan?')) {
    try {
      await planStore.deletePlan(id)
    } catch (error) {
      console.error('Error deleting plan:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterPlanType.value = ''
  filterStatus.value = ''
}

onMounted(() => {
  planStore.fetchPlans()
})
</script>