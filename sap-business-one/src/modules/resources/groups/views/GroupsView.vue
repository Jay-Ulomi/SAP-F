<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Resource Groups</h1>
        <p class="text-sm text-gray-600">Organize resources into logical groups for better management</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Resource Group</button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-indigo-100">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Groups</p>
            <p class="text-xl font-bold text-gray-900">{{ totalGroupsCount }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Groups</p>
            <p class="text-xl font-bold text-gray-900">{{ activeGroupsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Resources</p>
            <p class="text-xl font-bold text-gray-900">{{ totalResourcesCount }}</p>
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
            <p class="text-sm font-medium text-gray-600">Avg Efficiency</p>
            <p class="text-xl font-bold text-gray-900">{{ averageEfficiency }}%</p>
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
            placeholder="Search groups..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="production">Production</option>
            <option value="maintenance">Maintenance</option>
            <option value="quality">Quality</option>
            <option value="logistics">Logistics</option>
            <option value="support">Support</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="planning">Planning</option>
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

    <!-- Groups Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Resource Groups</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Resources
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Efficiency
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
            <tr v-for="group in filteredGroups" :key="group.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ group.groupName }}</div>
                <div class="text-sm text-gray-500">{{ group.groupCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ group.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ group.totalResources }} total / {{ group.availableResources }} available
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ group.usedCapacity }}/{{ group.totalCapacity }} hrs
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ group.efficiency }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    group.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : group.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800',
                  ]"
                >
                  {{ group.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="viewGroup(group)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  View
                </button>
                <button
                  @click="editGroup(group)"
                  class="text-indigo-600 hover:text-indigo-900 mr-3"
                >
                  Edit
                </button>
                <button
                  @click="deleteGroup(group.id)"
                  class="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredGroups.length === 0" class="text-center py-8">
          <p class="text-gray-500">No resource groups found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <ResourceGroupForm
          :loading="loading"
          @submit="handleCreate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedGroup" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <ResourceGroupForm
          :group="selectedGroup"
          :loading="loading"
          @submit="handleUpdate"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedGroup" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-end mb-4">
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ResourceGroupView :group="selectedGroup" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useResourceGroupStore } from '../stores/resourceGroupStore'
import ResourceGroupForm from '../components/ResourceGroupForm.vue'
import ResourceGroupView from '../components/ResourceGroupView.vue'
import type { ResourceGroup, ResourceGroupFormData } from '../types'

const groupStore = useResourceGroupStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedGroup = ref<ResourceGroup | null>(null)

// Filters
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

const filteredGroups = computed(() => {
  let filtered = groupStore.groups

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      group =>
        group.groupName.toLowerCase().includes(query) ||
        group.groupCode.toLowerCase().includes(query) ||
        group.type.toLowerCase().includes(query)
    )
  }

  if (filterType.value) {
    filtered = filtered.filter(group => group.type === filterType.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(group => group.status === filterStatus.value)
  }

  return filtered
})

// Statistics
const totalGroupsCount = computed(() => {
  return groupStore.groups.length
})

const activeGroupsCount = computed(() => {
  return groupStore.groups.filter(group => group.status === 'active').length
})

const totalResourcesCount = computed(() => {
  return groupStore.groups.reduce((sum, group) => sum + group.totalResources, 0)
})

const averageEfficiency = computed(() => {
  if (groupStore.groups.length === 0) return 0
  const totalEfficiency = groupStore.groups.reduce((sum, group) => sum + group.efficiency, 0)
  return Math.round(totalEfficiency / groupStore.groups.length)
})

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewGroup(group: ResourceGroup) {
  selectedGroup.value = group
  showViewModal.value = true
}

function editGroup(group: ResourceGroup) {
  selectedGroup.value = group
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedGroup.value = null
}

// CRUD operations
async function handleCreate(data: ResourceGroupFormData) {
  loading.value = true
  try {
    await groupStore.createGroup(data)
    closeModals()
  } catch (error) {
    console.error('Error creating group:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdate(data: ResourceGroupFormData) {
  if (!selectedGroup.value) return

  loading.value = true
  try {
    await groupStore.updateGroup(selectedGroup.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating group:', error)
  } finally {
    loading.value = false
  }
}

async function deleteGroup(id: string) {
  if (confirm('Are you sure you want to delete this resource group?')) {
    try {
      await groupStore.deleteGroup(id)
    } catch (error) {
      console.error('Error deleting group:', error)
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterType.value = ''
  filterStatus.value = ''
}

onMounted(() => {
  groupStore.fetchGroups()
})
</script>