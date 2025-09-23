<template>
  <div class="card">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
      <h2 class="text-lg sm:text-xl font-semibold text-gray-900">{{ title }}</h2>
      <button v-if="showAddButton" @click="$emit('add')" class="btn-primary w-full sm:w-auto">
        <PlusIcon class="w-4 h-4 mr-2" />
        <span class="text-sm sm:text-base">Add New</span>
      </button>
    </div>

    <!-- Search and Filters -->
    <div class="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4">
      <div class="flex-1">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
        />
      </div>
      <button v-if="showFilters" @click="showFilterModal = true" class="btn-secondary w-full sm:w-auto">
        <FunnelIcon class="w-4 h-4 mr-2" />
        <span class="text-sm sm:text-base">Filters</span>
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-sap-blue"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-12">
      <ExclamationTriangleIcon class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p class="text-red-600">{{ error }}</p>
      <button @click="$emit('retry')" class="btn-primary mt-4">Retry</button>
    </div>

    <!-- Data Table -->
    <div v-else-if="data.length > 0" class="overflow-x-auto -mx-4 sm:mx-0">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden shadow-sm sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="column in columns"
              :key="column.key"
              class="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              @click="sortBy(column.key)"
            >
              <div class="flex items-center">
                {{ column.label }}
                <ChevronUpIcon
                  v-if="sortKey === column.key && sortOrder === 'asc'"
                  class="w-4 h-4 ml-1"
                />
                <ChevronDownIcon
                  v-if="sortKey === column.key && sortOrder === 'desc'"
                  class="w-4 h-4 ml-1"
                />
              </div>
            </th>
            <th
              class="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              <span class="hidden sm:inline">Actions</span>
              <span class="sm:hidden">Act</span>
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="item in paginatedData" :key="item.id" class="hover:bg-gray-50">
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900"
            >
              <slot :name="column.key" :item="item" :value="item[column.key]">
                {{ formatValue(item[column.key], column.type) }}
              </slot>
            </td>
            <td class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end gap-1 sm:gap-2">
                <button @click="$emit('view', item)" class="text-sap-blue hover:text-sap-dark-blue">
                  <EyeIcon class="w-4 h-4" />
                </button>
                <button @click="$emit('edit', item)" class="text-green-600 hover:text-green-800">
                  <PencilIcon class="w-4 h-4" />
                </button>
                <button @click="$emit('delete', item)" class="text-red-600 hover:text-red-800">
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 sm:mt-6 gap-4">
        <div class="text-xs sm:text-sm text-gray-700 text-center sm:text-left">
          Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ data.length }} results
        </div>
        <div class="flex justify-center sm:justify-end gap-1 sm:gap-2">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span class="hidden sm:inline">Previous</span>
            <span class="sm:hidden">Prev</span>
          </button>
          <button
            v-for="page in visiblePages"
            :key="page"
            @click="currentPage = page"
            :class="[
              'px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-lg',
              currentPage === page
                ? 'bg-sap-blue text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="btn-secondary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <DocumentIcon class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <p class="text-gray-500">No data found</p>
      <p v-if="showAddButton" class="text-gray-400 text-sm mt-2">
        Get started by adding your first item
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  PlusIcon,
  FunnelIcon,
  ExclamationTriangleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  DocumentIcon,
} from '@heroicons/vue/24/outline'

interface Column {
  key: string
  label: string
  type?: 'text' | 'number' | 'date' | 'currency' | 'status'
  sortable?: boolean
}

interface Props {
  title: string
  data: any[]
  columns: Column[]
  loading?: boolean
  error?: string
  showAddButton?: boolean
  showFilters?: boolean
  itemsPerPage?: number
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  error: '',
  showAddButton: true,
  showFilters: true,
  itemsPerPage: 10,
})

const emit = defineEmits<{
  add: []
  view: [item: any]
  edit: [item: any]
  delete: [item: any]
  retry: []
}>()

// Search and filtering
const searchQuery = ref('')
const showFilterModal = ref(false)

// Sorting
const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

// Pagination
const currentPage = ref(1)

// Computed properties
const filteredData = computed(() => {
  if (!searchQuery.value) return props.data

  return props.data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchQuery.value.toLowerCase()),
    ),
  )
})

const sortedData = computed(() => {
  if (!sortKey.value) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const aVal = a[sortKey.value]
    const bVal = b[sortKey.value]

    if (aVal < bVal) return sortOrder.value === 'asc' ? -1 : 1
    if (aVal > bVal) return sortOrder.value === 'asc' ? 1 : -1
    return 0
  })
})

const totalPages = computed(() => Math.ceil(sortedData.value.length / props.itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * props.itemsPerPage)
const endIndex = computed(() =>
  Math.min(startIndex.value + props.itemsPerPage, sortedData.value.length),
)

const paginatedData = computed(() => {
  return sortedData.value.slice(startIndex.value, endIndex.value)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

// Methods
const sortBy = (key: string) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  currentPage.value = 1
}

const formatValue = (value: any, type?: string) => {
  if (value === null || value === undefined) return '-'

  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString()
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    case 'status':
      return value
    default:
      return String(value)
  }
}

// Watch for data changes to reset pagination
watch(
  () => props.data,
  () => {
    currentPage.value = 1
  },
)
</script>
