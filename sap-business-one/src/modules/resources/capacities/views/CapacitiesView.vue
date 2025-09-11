<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Resource Capacities</h1>
        <p class="text-sm text-gray-600">Manage resource capacity planning and allocation</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Capacity Plan</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Capacity</p>
            <p class="text-xl font-bold text-gray-900">{{ totalCapacity }} {{ capacityUnit }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Allocated</p>
            <p class="text-xl font-bold text-gray-900">{{ totalAllocated }} {{ capacityUnit }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Available</p>
            <p class="text-xl font-bold text-gray-900">{{ totalAvailable }} {{ capacityUnit }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Utilization</p>
            <p class="text-xl font-bold text-gray-900">{{ averageUtilization }}%</p>
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
            placeholder="Search capacities..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterCapacityType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Capacity Types</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
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
            <option value="paused">Paused</option>
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

    <!-- Capacities Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Capacity Plans</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resource
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Period
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Capacity
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
            <tr v-for="capacity in filteredCapacities" :key="capacity.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ capacity.resourceName }}</div>
                <div class="text-sm text-gray-500">{{ capacity.resourceCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ capacity.capacityType }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(capacity.periodStart).toLocaleDateString() }} - 
                {{ new Date(capacity.periodEnd).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ capacity.totalCapacity }} {{ capacity.capacityUnit }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ capacity.utilizationRate }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    capacity.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : capacity.status === 'draft'
                        ? 'bg-gray-100 text-gray-800'
                        : capacity.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : capacity.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ capacity.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewCapacity(capacity)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editCapacity(capacity)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteCapacity(capacity.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredCapacities.length === 0" class="text-center py-8">
          <p class="text-gray-500">No capacity plans found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <CapacityForm
          :loading="loading"
          @submit="handleCreate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedCapacity" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <CapacityForm
          :capacity="selectedCapacity"
          :loading="loading"
          @submit="handleUpdate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedCapacity" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-end mb-4">
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <CapacityView :capacity="selectedCapacity" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useResourceCapacityStore } from '../stores/resourceCapacityStore'
import CapacityForm from '../components/CapacityForm.vue'
import CapacityView from '../components/CapacityView.vue'
import type { ResourceCapacity, ResourceCapacityFormData } from '../types'

const capacityStore = useResourceCapacityStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedCapacity = ref<ResourceCapacity | null>(null)

// Filters
const searchQuery = ref('')
const filterCapacityType = ref('')
const filterStatus = ref('')

const filteredCapacities = computed(() => {
  let filtered = capacityStore.capacities

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      capacity =>
        capacity.resourceName.toLowerCase().includes(query) ||
        capacity.resourceCode.toLowerCase().includes(query) ||
        capacity.capacityType.toLowerCase().includes(query)
    )
  }

  if (filterCapacityType.value) {
    filtered = filtered.filter(capacity => capacity.capacityType === filterCapacityType.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(capacity => capacity.status === filterStatus.value)
  }

  return filtered
})

// Statistics
const totalCapacity = computed(() => {
  return capacityStore.capacities
    .filter(capacity => capacity.status === 'active')
    .reduce((sum, capacity) => sum + capacity.totalCapacity, 0)
})

const totalAllocated = computed(() => {
  return capacityStore.capacities
    .filter(capacity => capacity.status === 'active')
    .reduce((sum, capacity) => sum + capacity.allocatedCapacity, 0)
})

const totalAvailable = computed(() => {
  return capacityStore.capacities
    .filter(capacity => capacity.status === 'active')
    .reduce((sum, capacity) => sum + capacity.availableCapacity, 0)
})

const averageUtilization = computed(() => {
  const activeCapacities = capacityStore.capacities.filter(capacity => capacity.status === 'active')
  if (activeCapacities.length === 0) return 0
  const totalUtilization = activeCapacities.reduce((sum, capacity) => sum + capacity.utilizationRate, 0)
  return Math.round(totalUtilization / activeCapacities.length)
})

const capacityUnit = computed(() => {
  const firstCapacity = capacityStore.capacities.find(capacity => capacity.status === 'active')
  return firstCapacity?.capacityUnit || 'hours'
})

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewCapacity(capacity: ResourceCapacity) {
  selectedCapacity.value = capacity
  showViewModal.value = true
}

function editCapacity(capacity: ResourceCapacity) {
  selectedCapacity.value = capacity
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedCapacity.value = null
}

// CRUD operations
async function handleCreate(data: ResourceCapacityFormData) {
  loading.value = true
  try {
    await capacityStore.createCapacity(data)
    closeModals()
  } catch (error) {
    console.error('Error creating capacity:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdate(data: ResourceCapacityFormData) {
  if (!selectedCapacity.value) return

  loading.value = true
  try {
    await capacityStore.updateCapacity(selectedCapacity.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating capacity:', error)
  } finally {
    loading.value = false
  }
}

async function deleteCapacity(id: string) {
  if (confirm('Are you sure you want to delete this capacity plan?')) {
    try {
      await capacityStore.deleteCapacity(id)
    } catch (error) {
      console.error('Error deleting capacity:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterCapacityType.value = ''
  filterStatus.value = ''
}

onMounted(() => {
  capacityStore.fetchCapacities()
})
</script>