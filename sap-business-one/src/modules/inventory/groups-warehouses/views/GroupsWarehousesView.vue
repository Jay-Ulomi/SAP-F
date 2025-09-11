<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Groups & Warehouses</h1>
        <p class="text-sm text-gray-600">Manage item groups, warehouses, and locations</p>
      </div>
      <div class="flex space-x-3">
        <select
          v-model="selectedType"
          @change="handleTypeChange"
          class="block rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="item_group">Item Groups</option>
          <option value="warehouse">Warehouses</option>
          <option value="location">Locations</option>
        </select>
        <button @click="openCreateModal" class="btn-primary">New {{ typeLabel }}</button>
      </div>
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Groups</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalGroups || 0 }}</p>
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
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Warehouses</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalWarehouses || 0 }}</p>
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Locations</p>
            <p class="text-xl font-bold text-gray-900">{{ stats?.totalLocations || 0 }}</p>
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Capacity</p>
            <p class="text-xl font-bold text-gray-900">
              {{ formatNumber(stats?.totalCapacity || 0) }}
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
          placeholder="Search..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @input="handleSearch"
        />
        <select
          v-model="selectedStatus"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="maintenance">Maintenance</option>
          <option value="closed">Closed</option>
        </select>
        <select
          v-if="selectedType === GroupType.WAREHOUSE"
          v-model="selectedWarehouseType"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Types</option>
          <option value="main">Main</option>
          <option value="secondary">Secondary</option>
          <option value="storage">Storage</option>
          <option value="retail">Retail</option>
          <option value="production">Production</option>
        </select>
        <select
          v-if="selectedType === GroupType.LOCATION"
          v-model="selectedWarehouse"
          @change="handleFilterChange"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Warehouses</option>
          <option v-for="warehouse in warehouses" :key="warehouse.id" :value="warehouse.id">
            {{ warehouse.warehouseCode }} - {{ warehouse.warehouseName }}
          </option>
        </select>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white shadow border border-gray-200 rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Code
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                v-if="selectedType !== GroupType.ITEM_GROUP"
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
                v-if="selectedType === GroupType.LOCATION"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Warehouse
              </th>
              <th
                v-if="selectedType === GroupType.ITEM_GROUP"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Item Count
              </th>
              <th
                v-if="selectedType !== GroupType.ITEM_GROUP"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Capacity
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
              <td :colspan="getColumnCount()" class="px-6 py-4 text-center text-gray-500">
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
                  Loading...
                </div>
              </td>
            </tr>
            <tr v-else-if="!hasItems">
              <td :colspan="getColumnCount()" class="px-6 py-4 text-center text-gray-500">
                No {{ typeLabel.toLowerCase() }} found
              </td>
            </tr>
            <tr v-else v-for="item in paginatedItems" :key="item.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ getItemCode(item) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                <div>
                  <div class="font-medium">{{ getItemName(item) }}</div>
                  <div
                    v-if="getItemDescription(item)"
                    class="text-gray-500 text-xs truncate max-w-xs"
                  >
                    {{ getItemDescription(item) }}
                  </div>
                </div>
              </td>
              <td
                v-if="selectedType !== GroupType.ITEM_GROUP"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ getItemType(item) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(item.status)"
                >
                  {{ formatStatus(item.status) }}
                </span>
              </td>
              <td
                v-if="selectedType === GroupType.LOCATION"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ getWarehouseCode(item) }}
              </td>
              <td
                v-if="selectedType === GroupType.ITEM_GROUP"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ getItemCount(item) }}
              </td>
              <td
                v-if="selectedType !== GroupType.ITEM_GROUP"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ getCapacityInfo(item) }}
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
    <GroupsWarehousesForm
      v-if="showFormModal"
      :item="selectedItem"
      :form-type="selectedType"
      :loading="loading"
      :warehouses="warehouses"
      @close="closeFormModal"
      @submit="handleFormSubmit"
    />

    <GroupsWarehousesView
      v-if="showViewModal"
      :item="selectedItem"
      :item-type="typeLabel"
      @close="closeViewModal"
      @edit="editItem"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGroupsWarehousesStore } from '../stores'
import { defineAsyncComponent } from 'vue'

const GroupsWarehousesForm = defineAsyncComponent(
  () => import('../components/GroupsWarehousesForm.vue'),
)
const GroupsWarehousesView = defineAsyncComponent(
  () => import('../components/GroupsWarehousesView.vue'),
)
import { GroupType } from '../types'
import type {
  ItemGroup,
  Warehouse,
  Location,
  Status,
  WarehouseType,
  GroupsWarehousesFilters,
  ItemGroupFormData,
  WarehouseFormData,
  LocationFormData,
} from '../types'

// Store
const groupsWarehousesStore = useGroupsWarehousesStore()

// Reactive data
const selectedType = ref<GroupType>(GroupType.ITEM_GROUP)
const searchQuery = ref('')
const selectedStatus = ref<Status | ''>('')
const selectedWarehouseType = ref('')
const selectedWarehouse = ref('')
const showFormModal = ref(false)
const showViewModal = ref(false)
const selectedItem = ref<ItemGroup | Warehouse | Location | null>(null)

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
  warehouses,
} = groupsWarehousesStore

const typeLabel = computed((): 'Item Group' | 'Warehouse' | 'Location' => {
  const typeMap: Record<GroupType, 'Item Group' | 'Warehouse' | 'Location'> = {
    [GroupType.ITEM_GROUP]: 'Item Group',
    [GroupType.WAREHOUSE]: 'Warehouse',
    [GroupType.LOCATION]: 'Location',
  }
  return typeMap[selectedType.value]
})

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
  return value.toLocaleString()
}

const formatStatus = (status: Status): string => {
  const statusMap = {
    active: 'Active',
    inactive: 'Inactive',
    maintenance: 'Maintenance',
    closed: 'Closed',
  }
  return statusMap[status] || status
}

const getStatusBadgeClass = (status: Status): string => {
  const classMap = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    maintenance: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}

const getColumnCount = (): number => {
  let count = 4 // Code, Name, Status, Actions
  if (selectedType.value !== GroupType.ITEM_GROUP) count++ // Type
  if (selectedType.value === GroupType.LOCATION) count++ // Warehouse
  if (selectedType.value === GroupType.ITEM_GROUP) count++ // Item Count
  if (selectedType.value !== GroupType.ITEM_GROUP) count++ // Capacity
  return count
}

const getItemCode = (item: ItemGroup | Warehouse | Location): string => {
  if ('groupCode' in item) return item.groupCode
  if ('warehouseCode' in item) return item.warehouseCode
  if ('locationCode' in item) return (item as Location).locationCode
  return ''
}

const getItemName = (item: ItemGroup | Warehouse | Location): string => {
  if ('groupName' in item) return item.groupName
  if ('warehouseName' in item) return item.warehouseName
  if ('locationName' in item) return item.locationName
  return ''
}

const getItemDescription = (item: ItemGroup | Warehouse | Location): string => {
  return item.description || ''
}

const getItemType = (item: ItemGroup | Warehouse | Location): string => {
  if ('type' in item) {
    const typeMap: Record<string, string> = {
      main: 'Main',
      secondary: 'Secondary',
      storage: 'Storage',
      retail: 'Retail',
      production: 'Production',
      aisle: 'Aisle',
      rack: 'Rack',
      shelf: 'Shelf',
      bin: 'Bin',
      zone: 'Zone',
    }
    return typeMap[item.type] || item.type
  }
  return ''
}

const getWarehouseCode = (item: ItemGroup | Warehouse | Location): string => {
  if ('warehouseCode' in item) return item.warehouseCode
  return ''
}

const getItemCount = (item: ItemGroup | Warehouse | Location): number => {
  if ('itemCount' in item) return item.itemCount
  return 0
}

const getCapacityInfo = (item: ItemGroup | Warehouse | Location): string => {
  if ('capacity' in item && item.capacity) {
    const used = item.capacity.usedCapacity || 0
    const total = item.capacity.totalCapacity || 0
    return `${used}/${total}`
  }
  return '0/0'
}

const handleTypeChange = () => {
  selectedStatus.value = ''
  selectedWarehouseType.value = ''
  selectedWarehouse.value = ''
  groupsWarehousesStore.setFilters({ type: selectedType.value })
  fetchData()
}

const handleSearch = () => {
  groupsWarehousesStore.setFilters({ search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Partial<GroupsWarehousesFilters> = {}
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedWarehouseType.value)
    filters.warehouseType = selectedWarehouseType.value as WarehouseType
  if (selectedWarehouse.value) filters.warehouseId = selectedWarehouse.value

  groupsWarehousesStore.setFilters(filters)
}

const setPage = (page: number) => {
  groupsWarehousesStore.setPage(page)
}

const openCreateModal = () => {
  selectedItem.value = null
  showFormModal.value = true
}

const editItem = (item: ItemGroup | Warehouse | Location) => {
  selectedItem.value = item
  showFormModal.value = true
  showViewModal.value = false
}

const viewItem = (item: ItemGroup | Warehouse | Location) => {
  selectedItem.value = item
  showViewModal.value = true
  showFormModal.value = false
}

const deleteItem = async (item: ItemGroup | Warehouse | Location) => {
  if (confirm(`Are you sure you want to delete this ${typeLabel.value.toLowerCase()}?`)) {
    try {
      if ('groupName' in item) {
        await groupsWarehousesStore.deleteItemGroup(item.id)
      } else if ('warehouseName' in item) {
        await groupsWarehousesStore.deleteWarehouse(item.id)
      } else if ('locationName' in item) {
        await groupsWarehousesStore.deleteLocation(item.id)
      }
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

const handleFormSubmit = async (data: ItemGroupFormData | WarehouseFormData | LocationFormData) => {
  try {
    if (selectedItem.value) {
      // Update
      if ('groupName' in selectedItem.value) {
        await groupsWarehousesStore.updateItemGroup(
          selectedItem.value.id,
          data as ItemGroupFormData,
        )
      } else if ('warehouseName' in selectedItem.value) {
        await groupsWarehousesStore.updateWarehouse(
          selectedItem.value.id,
          data as WarehouseFormData,
        )
      } else if ('locationName' in selectedItem.value) {
        await groupsWarehousesStore.updateLocation(selectedItem.value.id, data as LocationFormData)
      }
    } else {
      // Create
      if (selectedType.value === GroupType.ITEM_GROUP) {
        await groupsWarehousesStore.createItemGroup(data as ItemGroupFormData)
      } else if (selectedType.value === GroupType.WAREHOUSE) {
        await groupsWarehousesStore.createWarehouse(data as WarehouseFormData)
      } else if (selectedType.value === GroupType.LOCATION) {
        await groupsWarehousesStore.createLocation(data as LocationFormData)
      }
    }
    closeFormModal()
    fetchData()
  } catch (error) {
    console.error('Error saving item:', error)
  }
}

const fetchData = async () => {
  await groupsWarehousesStore.fetchGroupsWarehouses({
    filters: {
      type: selectedType.value,
      search: searchQuery.value,
      status: selectedStatus.value || undefined,
      warehouseType: (selectedWarehouseType.value as WarehouseType) || undefined,
      warehouseId: selectedWarehouse.value || undefined,
    },
  })
}

// Lifecycle
onMounted(() => {
  groupsWarehousesStore.fetchStats()
  groupsWarehousesStore.fetchWarehouses()
  fetchData()
})

// Watch for filter changes
watch(
  [searchQuery, selectedStatus, selectedWarehouseType, selectedWarehouse],
  () => {
    handleFilterChange()
  },
  { deep: true },
)
</script>
