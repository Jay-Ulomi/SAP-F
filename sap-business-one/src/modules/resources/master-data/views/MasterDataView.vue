<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Resource Master Data</h1>
        <p class="text-sm text-gray-600">Manage machines, labor, tools, and equipment resources</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Resource</button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Resources</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalResources || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg
              class="w-6 h-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Available</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.availableResources || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg
              class="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Utilization Rate</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.averageUtilization?.toFixed(1) || 0 }}%
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Efficiency</p>
            <p class="text-xl font-bold text-gray-900">
              {{ stats?.averageEfficiency?.toFixed(1) || 0 }}%
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label for="search" class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            id="search"
            v-model="filters.search"
            @input="debouncedSearch"
            placeholder="Search resources..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            id="type"
            v-model="filters.type"
            @change="applyFilters"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="machine">Machine</option>
            <option value="labor">Labor</option>
            <option value="tool">Tool</option>
            <option value="facility">Facility</option>
            <option value="equipment">Equipment</option>
          </select>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            id="status"
            v-model="filters.status"
            @change="applyFilters"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Statuses</option>
            <option value="available">Available</option>
            <option value="in_use">In Use</option>
            <option value="maintenance">Maintenance</option>
            <option value="unavailable">Unavailable</option>
            <option value="retired">Retired</option>
          </select>
        </div>

        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            v-model="filters.category"
            @change="applyFilters"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Categories</option>
            <option value="production">Production</option>
            <option value="assembly">Assembly</option>
            <option value="quality">Quality</option>
            <option value="packaging">Packaging</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </div>
      </div>

      <div class="flex justify-end mt-4 space-x-2">
        <button
          @click="clearFilters"
          class="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Resources Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="handleSort('resourceCode')"
            >
              <div class="flex items-center">
                Resource Code
                <svg
                  v-if="sortBy === 'resourceCode'"
                  class="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    v-if="sortOrder === 'asc'"
                    fill-rule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  />
                  <path
                    v-else
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="handleSort('resourceName')"
            >
              <div class="flex items-center">
                Name
                <svg
                  v-if="sortBy === 'resourceName'"
                  class="ml-1 w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    v-if="sortOrder === 'asc'"
                    fill-rule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  />
                  <path
                    v-else
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  />
                </svg>
              </div>
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Type
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Category
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Capacity
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Cost/Hour
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Utilization
            </th>
            <th class="relative px-6 py-3"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading" class="text-center">
            <td colspan="9" class="px-6 py-4 text-sm text-gray-500">Loading resources...</td>
          </tr>
          <tr v-else-if="!resources.length" class="text-center">
            <td colspan="9" class="px-6 py-4 text-sm text-gray-500">No resources found</td>
          </tr>
          <tr v-else v-for="resource in resources" :key="resource.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {{ resource.resourceCode }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ resource.resourceName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="capitalize">{{ resource.type }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                :class="[
                  'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                  resource.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : resource.status === 'in_use'
                      ? 'bg-blue-100 text-blue-800'
                      : resource.status === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : resource.status === 'unavailable'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800',
                ]"
              >
                {{ resource.status.replace('_', ' ') }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <span class="capitalize">{{ resource.category }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ resource.capacityPerDay }} {{ resource.capacityUnit }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${{ resource.standardCostPerHour.toFixed(2) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ resource.utilizationRate }}%
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button
                  @click="viewResource(resource)"
                  class="text-blue-600 hover:text-blue-900"
                >
                  View
                </button>
                <button
                  @click="editResource(resource)"
                  class="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button @click="deleteResource(resource)" class="text-red-600 hover:text-red-900">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6"
      >
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (currentPage - 1) * pageSize + 1 }} to
            {{ Math.min(currentPage * pageSize, totalResources) }} of
            {{ totalResources }} resources
          </div>
          <div class="flex space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showFormModal"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <ResourceForm
          :resource="selectedResource"
          :loading="formLoading"
          @submit="handleFormSubmit"
          @cancel="closeFormModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal && selectedResource"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-start mb-6">
            <h2 class="text-2xl font-bold text-gray-900">Resource Details</h2>
            <button
              @click="closeViewModal"
              class="text-gray-400 hover:text-gray-500"
            >
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <ResourceView :resource="selectedResource" />

          <div class="mt-6 flex justify-end space-x-3">
            <button
              @click="closeViewModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Close
            </button>
            <button
              @click="editFromView"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Edit Resource
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div
      v-if="showDeleteModal && selectedResource"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg max-w-md w-full p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Delete Resource</h3>
        <p class="text-sm text-gray-500 mb-4">
          Are you sure you want to delete "{{ selectedResource.resourceName }}"? This action
          cannot be undone.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="closeDeleteModal"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="confirmDelete"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useResourceStore } from '../stores/resourceStore'
import ResourceForm from '../components/ResourceForm.vue'
import ResourceView from '../components/ResourceView.vue'
import type { Resource, ResourceFormData, ResourceFilters } from '../types'

const store = useResourceStore()

// Data
const filters = ref<ResourceFilters>({
  search: '',
  type: undefined,
  status: undefined,
  category: undefined,
})

const showFormModal = ref(false)
const showViewModal = ref(false)
const showDeleteModal = ref(false)
const selectedResource = ref<Resource | null>(null)
const formLoading = ref(false)

let searchTimeout: NodeJS.Timeout | null = null

// Computed
const resources = computed(() => store.resources)
const loading = computed(() => store.loading)
const stats = computed(() => store.stats)
const totalResources = computed(() => store.totalResources)
const totalPages = computed(() => store.totalPages)
const currentPage = computed(() => store.searchParams.page || 1)
const pageSize = computed(() => store.searchParams.limit || 10)
const sortBy = computed(() => store.searchParams.sortBy)
const sortOrder = computed(() => store.searchParams.sortOrder)

// Methods
async function loadData() {
  await Promise.all([store.fetchResources(), store.fetchResourceStats()])
}

function openCreateModal() {
  selectedResource.value = null
  showFormModal.value = true
}

function editResource(resource: Resource) {
  selectedResource.value = resource
  showFormModal.value = true
}

function viewResource(resource: Resource) {
  selectedResource.value = resource
  showViewModal.value = true
}

function deleteResource(resource: Resource) {
  selectedResource.value = resource
  showDeleteModal.value = true
}

function closeFormModal() {
  showFormModal.value = false
  selectedResource.value = null
}

function closeViewModal() {
  showViewModal.value = false
  selectedResource.value = null
}

function closeDeleteModal() {
  showDeleteModal.value = false
  selectedResource.value = null
}

function editFromView() {
  showViewModal.value = false
  showFormModal.value = true
}

async function handleFormSubmit(data: ResourceFormData) {
  formLoading.value = true
  try {
    if (selectedResource.value) {
      await store.updateResource(selectedResource.value.id, data)
    } else {
      await store.createResource(data)
    }
    await store.fetchResourceStats()
    closeFormModal()
  } catch (error) {
    console.error('Failed to save resource:', error)
  } finally {
    formLoading.value = false
  }
}

async function confirmDelete() {
  if (!selectedResource.value) return
  
  try {
    await store.deleteResource(selectedResource.value.id)
    await store.fetchResourceStats()
    closeDeleteModal()
  } catch (error) {
    console.error('Failed to delete resource:', error)
  }
}

function debouncedSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    applyFilters()
  }, 300)
}

function applyFilters() {
  const cleanedFilters: ResourceFilters = {}
  if (filters.value.search) cleanedFilters.search = filters.value.search
  if (filters.value.type) cleanedFilters.type = filters.value.type
  if (filters.value.status) cleanedFilters.status = filters.value.status
  if (filters.value.category) cleanedFilters.category = filters.value.category
  
  store.setFilters(cleanedFilters)
}

function clearFilters() {
  filters.value = {
    search: '',
    type: undefined,
    status: undefined,
    category: undefined,
  }
  store.clearFilters()
}

function handleSort(field: string) {
  store.setSort(field)
}

function previousPage() {
  if (currentPage.value > 1) {
    store.setPage(currentPage.value - 1)
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    store.setPage(currentPage.value + 1)
  }
}

onMounted(() => {
  loadData()
})
</script>