<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Position Management</h1>
        <p class="text-gray-600 mt-1">Manage organizational positions and job descriptions</p>
      </div>
      <button
        @click="showCreateModal = true"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        New Position
      </button>
    </div>

    <!-- Stats Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Positions</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalPositions || 0 }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Active Positions</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.activePositions || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg class="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Open Positions</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.openPositions || 0 }}</dd>
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
                <dt class="text-sm font-medium text-gray-500 truncate">Avg. Salary</dt>
                <dd class="text-lg font-medium text-gray-900">${{ (stats?.averageSalary?.overall || 0).toLocaleString() }}</dd>
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
            placeholder="Search positions..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            v-model="filters.departmentId"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Departments</option>
            <option v-for="dept in departments" :key="dept.id" :value="dept.id">
              {{ dept.name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            v-model="filters.level"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Levels</option>
            <option value="entry">Entry Level</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="manager">Manager</option>
            <option value="director">Director</option>
            <option value="executive">Executive</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            v-model="filters.employmentType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
          >
            <option value="">All Types</option>
            <option value="full_time">Full Time</option>
            <option value="part_time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="intern">Intern</option>
            <option value="consultant">Consultant</option>
          </select>
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
            <option value="draft">Draft</option>
          </select>
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

    <!-- Positions Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Positions ({{ positions.length }})</h3>
        <div class="flex space-x-2">
          <button
            @click="exportPositions"
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
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary Range</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Open/Total</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="position in positions" :key="position.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ position.title }}</div>
                  <div class="text-sm text-gray-500">{{ position.code }}</div>
                  <div v-if="position.isRemoteEligible" class="mt-1">
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Remote
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ position.departmentName }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getLevelColor(position.level)
                  ]"
                >
                  {{ formatLevel(position.level) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatEmploymentType(position.employmentType) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ position.salaryRange.currency }} {{ position.salaryRange.min.toLocaleString() }} - {{ position.salaryRange.max.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  <span class="font-medium text-green-600">{{ position.openPositions }}</span> /
                  <span class="text-gray-500">{{ position.totalPositions }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    getStatusColor(position.status)
                  ]"
                >
                  {{ formatStatus(position.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                <button
                  @click="viewPosition(position)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  View
                </button>
                <button
                  @click="editPosition(position)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  Edit
                </button>
                <button
                  @click="clonePosition(position)"
                  class="text-green-600 hover:text-green-900"
                >
                  Clone
                </button>
                <button
                  v-if="position.status === 'active'"
                  @click="deactivatePosition(position)"
                  class="text-red-600 hover:text-red-900"
                >
                  Deactivate
                </button>
                <button
                  v-else
                  @click="activatePosition(position)"
                  class="text-green-600 hover:text-green-900"
                >
                  Activate
                </button>
              </td>
            </tr>
            <tr v-if="positions.length === 0">
              <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 6V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
                </svg>
                No positions found. Create your first position to get started.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div v-if="showCreateModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <PositionForm
          :position="selectedPosition"
          :departments="departments"
          :employees="employees"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="closeModals"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-8 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <PositionDetails
          :position="selectedPosition!"
          @edit="editFromView"
          @clone="cloneFromView"
          @export="exportPosition"
          @print="printPosition"
        />
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

    <!-- Clone Modal -->
    <div v-if="showCloneModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Clone Position</h3>
        <form @submit.prevent="handleClone" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Position Title</label>
            <input
              type="text"
              v-model="cloneData.title"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :placeholder="selectedPosition?.title"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">New Position Code</label>
            <input
              type="text"
              v-model="cloneData.code"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              :placeholder="selectedPosition?.code"
            />
          </div>
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              @click="showCloneModal = false"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
            >
              {{ loading ? 'Cloning...' : 'Clone Position' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch, computed } from 'vue'
import { usePositionStore } from '../stores/positionStore'
import PositionForm from '../components/PositionForm.vue'
import PositionDetails from '../components/PositionDetails.vue'
import type { Position, PositionFormData, PositionSearchParams, PositionLevel, EmploymentType, PositionStatus } from '../types'

const positionStore = usePositionStore()

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const showCloneModal = ref(false)
const selectedPosition = ref<Position | null>(null)

const cloneData = reactive({
  title: '',
  code: ''
})

const filters = reactive<PositionSearchParams>({
  search: '',
  departmentId: '',
  level: '' as PositionLevel | '',
  employmentType: '' as EmploymentType | '',
  status: '' as PositionStatus | ''
})

const positions = computed(() => positionStore.positions)
const departments = computed(() => positionStore.departments)
const employees = computed(() => positionStore.employees)
const stats = computed(() => positionStore.stats)
const loading = computed(() => positionStore.loading)
const error = computed(() => positionStore.error)

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatLevel(level: string): string {
  return level.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatEmploymentType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'active': return 'bg-green-100 text-green-800'
    case 'inactive': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'entry': return 'bg-blue-100 text-blue-800'
    case 'junior': return 'bg-cyan-100 text-cyan-800'
    case 'senior': return 'bg-purple-100 text-purple-800'
    case 'lead': return 'bg-indigo-100 text-indigo-800'
    case 'manager': return 'bg-orange-100 text-orange-800'
    case 'director': return 'bg-red-100 text-red-800'
    case 'executive': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function resetFilters() {
  Object.assign(filters, {
    search: '',
    departmentId: '',
    level: '',
    employmentType: '',
    status: ''
  })
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  showCloneModal.value = false
  selectedPosition.value = null
}

function viewPosition(position: Position) {
  selectedPosition.value = position
  showViewModal.value = true
}

function editPosition(position: Position) {
  selectedPosition.value = position
  showEditModal.value = true
}

function editFromView() {
  showViewModal.value = false
  showEditModal.value = true
}

function clonePosition(position: Position) {
  selectedPosition.value = position
  cloneData.title = `${position.title} (Copy)`
  cloneData.code = `${position.code}-COPY`
  showCloneModal.value = true
}

function cloneFromView() {
  const position = selectedPosition.value
  if (position) {
    showViewModal.value = false
    cloneData.title = `${position.title} (Copy)`
    cloneData.code = `${position.code}-COPY`
    showCloneModal.value = true
  }
}

async function activatePosition(position: Position) {
  try {
    await positionStore.updatePositionStatus(position.id, 'active')
  } catch (error) {
    console.error('Failed to activate position:', error)
  }
}

async function deactivatePosition(position: Position) {
  if (confirm(`Are you sure you want to deactivate "${position.title}"?`)) {
    try {
      await positionStore.updatePositionStatus(position.id, 'inactive')
    } catch (error) {
      console.error('Failed to deactivate position:', error)
    }
  }
}

async function handleSubmit(data: PositionFormData) {
  try {
    if (selectedPosition.value) {
      await positionStore.updatePosition(selectedPosition.value.id, data)
    } else {
      await positionStore.createPosition(data)
    }
    closeModals()
    await loadPositions()
  } catch (error) {
    console.error('Failed to save position:', error)
  }
}

async function handleClone() {
  if (!selectedPosition.value) return
  
  try {
    await positionStore.clonePosition(selectedPosition.value.id, cloneData)
    showCloneModal.value = false
    await loadPositions()
  } catch (error) {
    console.error('Failed to clone position:', error)
  }
}

function exportPosition(position: Position) {
  console.log('Export position:', position)
}

function printPosition(position: Position) {
  console.log('Print position:', position)
}

function exportPositions() {
  console.log('Export all positions')
}

async function loadPositions() {
  const searchParams: PositionSearchParams = {
    ...filters,
    page: 1,
    limit: 50
  }
  
  // Remove empty filters
  Object.keys(searchParams).forEach(key => {
    if (searchParams[key as keyof PositionSearchParams] === '') {
      delete searchParams[key as keyof PositionSearchParams]
    }
  })
  
  try {
    await positionStore.fetchPositions(searchParams)
  } catch (error) {
    console.error('Failed to load positions:', error)
  }
}

async function loadInitialData() {
  try {
    await Promise.all([
      positionStore.fetchStats(),
      positionStore.fetchDepartments(),
      positionStore.fetchEmployees({ limit: 100 }),
      loadPositions()
    ])
  } catch (error) {
    console.error('Failed to load initial data:', error)
  }
}

watch(filters, () => {
  loadPositions()
}, { deep: true })

onMounted(() => {
  loadInitialData()
})
</script>
