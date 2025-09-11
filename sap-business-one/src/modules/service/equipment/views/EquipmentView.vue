<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Equipment Management</h1>
      <button
        @click="showCreateModal = true"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Equipment
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Equipment</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalEquipment || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-blue-100">
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
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Equipment</p>
            <p class="text-2xl font-bold text-green-600">{{ stats?.activeEquipment || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-green-100">
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
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Maintenance Due</p>
            <p class="text-2xl font-bold text-yellow-600">{{ stats?.maintenanceDue || 0 }}</p>
          </div>
          <div class="p-3 rounded-full bg-yellow-100">
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
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-2xl font-bold text-purple-600">
              ${{ stats?.totalValue?.toLocaleString() || 0 }}
            </p>
          </div>
          <div class="p-3 rounded-full bg-purple-100">
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchParams.search"
            type="text"
            placeholder="Search equipment..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="searchParams.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="in_service">In Service</option>
            <option value="out_of_service">Out of Service</option>
            <option value="under_repair">Under Repair</option>
          </select>
          <input
            v-model="searchParams.customerId"
            type="text"
            placeholder="Customer ID"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
          <button
            @click="handleSearch"
            class="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
          
        </div>
      </div>
    </div>

    <!-- Equipment Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div v-if="loading" class="p-8 text-center">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="mt-2 text-gray-600">Loading equipment...</p>
      </div>

      <div v-else-if="error" class="p-8 text-center text-red-600">
        <p>{{ error }}</p>
        <button
          @click="equipmentStore.loadEquipment"
          class="mt-2 text-blue-600 hover:text-blue-800"
        >
          Try Again
        </button>
      </div>

      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Equipment
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Last Service
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="equipment in equipmentList" :key="equipment.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ equipment.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ equipment.serialNumber }} • {{ equipment.manufacturer }}
                    {{ equipment.model }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ equipment.customerName }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ equipment.location }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusBadgeClass(equipment.status)">
                    {{ formatStatus(equipment.status) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ equipment.lastServiceDate ? formatDate(equipment.lastServiceDate) : 'Never' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${{ equipment.value.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="viewEquipment(equipment)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      View
                    </button>
                    <button
                      @click="editEquipment(equipment)"
                      class="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      @click="viewMaintenanceHistory(equipment)"
                      class="text-green-600 hover:text-green-900"
                    >
                      History
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing {{ (pagination.page - 1) * 10 + 1 }} to
                {{ Math.min(pagination.page * 10, pagination.total) }} of
                {{ pagination.total }} results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">{{ editingEquipment ? 'Edit' : 'Create' }} Equipment</h2>

        <EquipmentForm
          :equipment="editingEquipment"
          :loading="submitting"
          @submit="submitEquipment"
          @cancel="closeModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal && selectedEquipment"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg w-full max-w-6xl max-h-screen overflow-y-auto m-4">
        <div class="flex justify-between items-center px-6 py-4 border-b">
          <h2 class="text-xl font-bold">Equipment Details</h2>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
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

        <EquipmentViewComponent :equipment="selectedEquipment" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useEquipmentStore } from '../stores'
import EquipmentForm from '../components/EquipmentForm.vue'
import EquipmentViewComponent from '../components/EquipmentView.vue'
import type { Equipment, EquipmentFormData, ServiceSearchParams } from '../../types'

// Store
const equipmentStore = useEquipmentStore()

// State
const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingEquipment = ref<Equipment | null>(null)
const selectedEquipment = ref<Equipment | null>(null)
const submitting = ref(false)

// Computed from store
const equipmentList = computed(() => equipmentStore.equipment)
const loading = computed(() => equipmentStore.loading)
const error = computed(() => equipmentStore.error)
const pagination = computed(() => equipmentStore.pagination)
const stats = computed(() => equipmentStore.stats)

// Search parameters
const searchParams = reactive<ServiceSearchParams>({
  search: '',
  status: undefined,
  customerId: '',
})

// Methods
const handleSearch = () => {
  equipmentStore.setFilters(searchParams)
}

const resetFilters = () => {
  Object.assign(searchParams, {
    search: '',
    status: undefined,
    customerId: '',
  })
  equipmentStore.clearFilters()
}

const nextPage = () => {
  equipmentStore.nextPage()
}

const previousPage = () => {
  equipmentStore.previousPage()
}

const viewEquipment = (equipment: Equipment) => {
  selectedEquipment.value = equipment
  showViewModal.value = true
}

const editEquipment = (equipment: Equipment) => {
  editingEquipment.value = equipment
  showCreateModal.value = true
}

const viewMaintenanceHistory = (equipment: Equipment) => {
  selectedEquipment.value = equipment
  showViewModal.value = true
}

const submitEquipment = async (data: EquipmentFormData) => {
  submitting.value = true
  try {
    if (editingEquipment.value) {
      await equipmentStore.updateEquipment(editingEquipment.value.id, data)
    } else {
      await equipmentStore.createEquipment(data)
    }
    closeModal()
  } catch (err) {
    console.error('Error saving equipment:', err)
  } finally {
    submitting.value = false
  }
}

const closeModal = () => {
  showCreateModal.value = false
  showViewModal.value = false
  editingEquipment.value = null
  selectedEquipment.value = null
}

// Utility functions
const formatStatus = (status: string) => {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

const getStatusBadgeClass = (status: string) => {
  const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium'
  switch (status) {
    case 'active':
    case 'in_service':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'out_of_service':
    case 'decommissioned':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'under_repair':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle
onMounted(() => {
  equipmentStore.loadEquipment()
})
</script>
