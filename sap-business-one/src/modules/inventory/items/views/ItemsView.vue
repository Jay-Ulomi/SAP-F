<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Item Master Data</h1>
        <p class="text-sm text-gray-600">Manage inventory items, codes, and specifications</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Item</button>
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Items</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalItems || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Items</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.activeItems || 0 }}</p>
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.lowStockItems || 0 }}</p>
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
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Value</p>
            <p class="text-xl font-bold text-gray-900">
              ${{ formatNumber(stats?.totalValue || 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search items..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @input="handleSearch"
        />
        <select
          v-model="selectedType"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="inventory">Inventory</option>
          <option value="service">Service</option>
          <option value="asset">Asset</option>
          <option value="consumable">Consumable</option>
        </select>
        <select
          v-model="selectedStatus"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="discontinued">Discontinued</option>
          <option value="planned">Planned</option>
        </select>
        <select
          v-model="selectedGroup"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Groups</option>
          <option value="raw_materials">Raw Materials</option>
          <option value="finished_goods">Finished Goods</option>
          <option value="semi_finished">Semi-Finished</option>
          <option value="spare_parts">Spare Parts</option>
          <option value="consumables">Consumables</option>
          <option value="services">Services</option>
        </select>
      </div>
    </div>

    <!-- Items Table -->
    <div class="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item Code
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item Name
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
                Group
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Unit Price
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">
                <div class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue"
                    xmlns="http://www.w3.org/2000/svg"
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
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Loading items...
                </div>
              </td>
            </tr>
            <tr v-else-if="!hasItems">
              <td colspan="7" class="px-6 py-4 text-center text-gray-500">No items found</td>
            </tr>
            <tr v-else v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ item.itemCode }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div class="font-medium">{{ item.itemName }}</div>
                  <div v-if="item.description" class="text-gray-500 text-xs truncate max-w-xs">
                    {{ item.description }}
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getTypeBadgeClass(item.type)"
                >
                  {{ formatItemType(item.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(item.status)"
                >
                  {{ formatItemStatus(item.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatItemGroup(item.group) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${{ formatNumber(item.baseUnitPrice) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewItem(item)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editItem(item)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button @click="deleteItem(item)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="setPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            @click="setPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, totalItems)
              }}</span>
              of
              <span class="font-medium">{{ totalItems }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="setPage(currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="setPage(page)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  page === currentPage
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="setPage(currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <ItemForm
      v-if="showFormModal"
      :item="selectedItem"
      :loading="loading"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <ItemView v-if="showViewModal" :item="selectedItem" @close="closeViewModal" @edit="editItem" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, defineAsyncComponent } from 'vue'
import { useItemsStore } from '../stores'
import type { Item, ItemFormData, ItemType, ItemStatus, ItemGroup } from '../types'

// Async components
const ItemForm = defineAsyncComponent(() => import('../components/ItemForm.vue'))
const ItemView = defineAsyncComponent(() => import('../components/ItemView.vue'))

// Store
const itemsStore = useItemsStore()

// Reactive data
const searchQuery = ref('')
const selectedType = ref<ItemType | ''>('')
const selectedStatus = ref<ItemStatus | ''>('')
const selectedGroup = ref<ItemGroup | ''>('')
const showFormModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<Item | null>(null)

// Computed
const {
  paginatedItems,
  stats,
  loading,
  hasItems,
  totalItems,
  currentPage,
  itemsPerPage,
  totalPages,
} = itemsStore

// Computed for pagination
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, currentPage + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const formatNumber = (value: number): string => {
  return value.toFixed(2)
}

const formatItemType = (type: ItemType): string => {
  const typeMap = {
    inventory: 'Inventory',
    service: 'Service',
    asset: 'Asset',
    consumable: 'Consumable',
  }
  return typeMap[type] || type
}

const formatItemStatus = (status: ItemStatus): string => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    discontinued: 'Discontinued',
    planned: 'Planned',
  }
  return statusMap[status] || status
}

const formatItemGroup = (group: ItemGroup): string => {
  const groupMap = {
    raw_materials: 'Raw Materials',
    finished_goods: 'Finished Goods',
    semi_finished: 'Semi-Finished',
    spare_parts: 'Spare Parts',
    consumables: 'Consumables',
    services: 'Services',
  }
  return groupMap[group] || group
}

const getTypeBadgeClass = (type: ItemType): string => {
  const classMap = {
    inventory: 'bg-blue-100 text-blue-800',
    service: 'bg-green-100 text-green-800',
    asset: 'bg-purple-100 text-purple-800',
    consumable: 'bg-yellow-100 text-yellow-800',
  }
  return classMap[type] || 'bg-gray-100 text-gray-800'
}

const getStatusBadgeClass = (status: ItemStatus): string => {
  const classMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    discontinued: 'bg-red-100 text-red-800',
    planned: 'bg-yellow-100 text-yellow-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const handleSearch = () => {
  itemsStore.setFilters({ search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Record<string, string> = {}
  if (selectedType.value) filters.type = selectedType.value
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedGroup.value) filters.group = selectedGroup.value

  itemsStore.setFilters(filters)
}

const setPage = (page: number) => {
  itemsStore.setPage(page)
}

const openCreateModal = () => {
  selectedItem.value = null
  showFormModal.value = true
}

const editItem = (item: Item) => {
  selectedItem.value = item
  showFormModal.value = true
  showViewModal.value = false
}

const viewItem = (item: Item) => {
  selectedItem.value = item
  showViewModal.value = true
  showFormModal.value = false
}

const deleteItem = async (item: Item) => {
  if (confirm(`Are you sure you want to delete item "${item.itemName}"?`)) {
    try {
      await itemsStore.deleteItem(item.id)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }
}

const closeFormModal = () => {
  showFormModal.value = false
  selectedItem.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedItem.value = null
}

const handleFormSubmit = async (data: ItemFormData) => {
  try {
    if (selectedItem.value) {
      await itemsStore.updateItem(selectedItem.value.id, data)
    } else {
      await itemsStore.createItem(data)
    }
    closeFormModal()
  } catch (error) {
    console.error('Error saving item:', error)
  }
}

// Lifecycle
onMounted(() => {
  itemsStore.fetchItems()
  itemsStore.fetchStats()
})

// Watch for filter changes
watch(
  [searchQuery, selectedType, selectedStatus, selectedGroup],
  () => {
    handleFilterChange()
  },
  { deep: true },
)
</script>
