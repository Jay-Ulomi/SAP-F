<template>
  <div class="space-y-6">
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-sap-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h18M3 9h18M3 15h18M3 21h18"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Tracked</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ stats?.totalTrackedItems || 0 }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Serials</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.totalSerials || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-yellow-500"
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
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Expiring Soon</dt>
                <dd class="text-lg font-medium text-gray-900">{{ stats?.expiringSoon || 0 }}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white overflow-hidden shadow rounded-lg">
        <div class="p-5">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg
                class="h-6 w-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2"
                />
              </svg>
            </div>
            <div class="ml-5 w-0 flex-1">
              <dl>
                <dt class="text-sm font-medium text-gray-500 truncate">Total Value</dt>
                <dd class="text-lg font-medium text-gray-900">
                  {{ formatCurrency(stats?.totalValue || 0) }}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Actions -->
    <div class="bg-white shadow rounded-lg p-4">
      <div
        class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
      >
        <div class="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search serials/batches..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue text-sm"
            />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <select
            v-model="selectedTracking"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Types</option>
            <option value="serial">Serial</option>
            <option value="batch">Batch</option>
          </select>

          <select
            v-model="selectedQuality"
            class="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-sap-blue focus:border-sap-blue text-sm rounded-md"
          >
            <option value="">All Quality</option>
            <option value="released">Released</option>
            <option value="on_hold">On Hold</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div class="flex space-x-3">
          <button
            @click="clearFilters"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear Filters
          </button>
          <button
            @click="showCreateModal = true"
            class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <div class="px-4 py-5 sm:p-6">
        <div v-if="loading" class="text-center py-8">
          <div class="inline-flex items-center">
            <svg
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </div>
        </div>

        <div v-else-if="!hasItems" class="text-center py-8 text-gray-500">
          No serials/batches found
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Warehouse
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bin
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Qty
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Value
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="row in paginatedItems" :key="row.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatEnum(row.trackingType) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ row.itemCode }} - {{ row.itemName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ row.warehouseName }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ row.binName || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ row.quantity }} {{ row.unitOfMeasure }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(row.totalValue) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ row.serialNumber || row.batchNumber || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button @click="viewItem(row)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(row)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteItem(row)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <SerialBatchForm
      v-if="showCreateModal || showEditModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeModals"
      @submit="handleFormSubmit"
    />
    <SerialBatchView
      v-if="showViewModal && selectedItem"
      :item="selectedItem"
      @close="closeModals"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { defineAsyncComponent } from 'vue'
import { useSerialBatchesStore } from '../stores'
import { TrackingType, QualityStatus } from '../types'
import type { SerialBatchItem, SerialBatchFormData } from '../types'

const SerialBatchForm = defineAsyncComponent(() => import('../components/SerialBatchForm.vue'))
const SerialBatchView = defineAsyncComponent(() => import('../components/SerialBatchView.vue'))

const store = useSerialBatchesStore()

const searchQuery = ref('')
const selectedTracking = ref('')
const selectedQuality = ref('')

const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<SerialBatchItem | null>(null)

const { loading, stats, hasItems, paginatedItems } = store

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
const formatEnum = (v: string) =>
  v
    .split('_')
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')

const clearFilters = () => {
  searchQuery.value = ''
  selectedTracking.value = ''
  selectedQuality.value = ''
  store.clearFilters()
}

const viewItem = (row: SerialBatchItem) => {
  selectedItem.value = row
  showViewModal.value = true
}
const editItem = (row: SerialBatchItem) => {
  selectedItem.value = row
  showEditModal.value = true
}
const deleteItem = async (row: SerialBatchItem) => {
  if (
    confirm(`Delete record for ${row.itemCode} (${row.serialNumber || row.batchNumber || row.id})?`)
  ) {
    try {
      await store.deleteSerial(row.id)
    } catch (e) {
      console.error(e)
    }
  }
}

const closeModals = () => {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: SerialBatchFormData) => {
  try {
    if (selectedItem.value) {
      await store.updateSerial(selectedItem.value.id, data)
    } else {
      await store.createSerial(data)
    }
    closeModals()
  } catch (e) {
    console.error(e)
  }
}

onMounted(() => {
  store.fetchStats()
  store.fetchSerials()
})

watch(
  [searchQuery, selectedTracking, selectedQuality],
  () => {
    const filters: Partial<typeof store.filters> = {}
    if (searchQuery.value) filters.search = searchQuery.value
    if (selectedTracking.value) filters.trackingType = selectedTracking.value as TrackingType
    if (selectedQuality.value) filters.qualityStatus = selectedQuality.value as QualityStatus
    store.setFilters(filters)
  },
  { deep: true },
)
</script>
