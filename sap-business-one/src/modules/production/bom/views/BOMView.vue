<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Bill of Materials (BOM)</h1>
        <p class="text-sm text-gray-600">Manage product structures and component relationships</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New BOM</button>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-7 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total BOMs</p>
            <p class="text-xl font-bold text-gray-900">{{ totalBOMsCount }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active</p>
            <p class="text-xl font-bold text-gray-900">{{ activeBOMsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Draft</p>
            <p class="text-xl font-bold text-gray-900">{{ draftBOMsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-gray-100">
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18 12m-2.455 0L18 12m-2.455 0L15.545 12M12 2.455V8m0 8v5.545M2.455 12H8m8 0h5.545" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Obsolete</p>
            <p class="text-xl font-bold text-gray-900">{{ obsoleteBOMsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Components</p>
            <p class="text-xl font-bold text-gray-900">{{ totalComponentsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-indigo-100">
            <svg class="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Components</p>
            <p class="text-xl font-bold text-gray-900">{{ averageComponentsCount }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-teal-100">
            <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Avg Cost/Unit</p>
            <p class="text-xl font-bold text-gray-900">${{ averageCostPerUnit }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search BOMs..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
            <option value="obsolete">Obsolete</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterType"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Types</option>
            <option value="production">Production</option>
            <option value="template">Template</option>
            <option value="sales">Sales</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            v-model="filterItemCode"
            placeholder="Item code..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
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

    <!-- BOMs Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Bill of Materials</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                BOM Code
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Components
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Cost
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Effective From
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="bom in filteredBOMs" :key="bom.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ bom.bomCode }}</div>
                <div class="text-sm text-gray-500">{{ bom.id }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ bom.itemName }}</div>
                <div class="text-sm text-gray-500">{{ bom.itemCode }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ bom.version }}</div>
                <div class="text-sm text-gray-500">Rev. {{ bom.revision }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                  {{ bom.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="flex items-center">
                  <span class="font-medium">{{ bom.components.length }}</span>
                  <span class="ml-1 text-gray-500">items</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="font-medium">${{ bom.costing.totalCost.toFixed(2) }}</div>
                <div class="text-xs text-gray-500">per unit</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    bom.status === 'active' ? 'bg-green-100 text-green-800' :
                    bom.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    bom.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800',
                  ]"
                >
                  {{ bom.status.charAt(0).toUpperCase() + bom.status.slice(1) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(bom.effectiveFrom).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewBOM(bom)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editBOM(bom)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit BOM"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  
                  <button
                    @click="copyBOM(bom)"
                    class="text-green-600 hover:text-green-900"
                    title="Copy BOM"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </button>
                  
                  <button
                    v-if="bom.status === 'draft'"
                    @click="approveBOM(bom.id)"
                    class="text-purple-600 hover:text-purple-900"
                    title="Approve BOM"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button
                    @click="deleteBOM(bom.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete BOM"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredBOMs.length === 0" class="text-center py-8">
          <p class="text-gray-500">No BOMs found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <BOMForm
          :loading="loading"
          @submit="handleCreateBOM"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedBOM" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <BOMForm
          :bom="selectedBOM"
          :loading="loading"
          @submit="handleUpdateBOM"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedBOM" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">BOM Details - {{ selectedBOM.bomCode }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="text-center py-8 text-gray-500">BOM Details Component</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useBOMStore } from '../stores/bomStore'
import BOMForm from '../components/BOMForm.vue'
import type { BOM, BOMFormData } from '../types'

const bomStore = useBOMStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedBOM = ref<BOM | null>(null)

// Filters
const searchQuery = ref('')
const filterStatus = ref('')
const filterType = ref('')
const filterItemCode = ref('')

const filteredBOMs = computed(() => {
  let filtered = bomStore.boms

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      bom =>
        bom.bomCode.toLowerCase().includes(query) ||
        bom.itemName.toLowerCase().includes(query) ||
        bom.itemCode.toLowerCase().includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(bom => bom.status === filterStatus.value)
  }

  if (filterType.value) {
    filtered = filtered.filter(bom => bom.type === filterType.value)
  }

  if (filterItemCode.value) {
    filtered = filtered.filter(bom => 
      bom.itemCode.toLowerCase().includes(filterItemCode.value.toLowerCase())
    )
  }

  return filtered
})

// Statistics computed properties
const totalBOMsCount = computed(() => bomStore.boms.length)
const activeBOMsCount = computed(() => bomStore.boms.filter(b => b.status === 'active').length)
const draftBOMsCount = computed(() => bomStore.boms.filter(b => b.status === 'draft').length)
const obsoleteBOMsCount = computed(() => bomStore.boms.filter(b => b.status === 'obsolete').length)
const totalComponentsCount = computed(() => bomStore.boms.reduce((sum, b) => sum + b.components.length, 0))
const averageComponentsCount = computed(() => {
  if (bomStore.boms.length === 0) return 0
  return Math.round(totalComponentsCount.value / bomStore.boms.length)
})
const averageCostPerUnit = computed(() => {
  if (bomStore.boms.length === 0) return '0.00'
  const totalCosts = bomStore.boms.reduce((sum, b) => sum + b.costing.costPerUnit, 0)
  return (totalCosts / bomStore.boms.length).toFixed(2)
})

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewBOM(bom: BOM) {
  selectedBOM.value = bom
  showViewModal.value = true
}

function editBOM(bom: BOM) {
  selectedBOM.value = bom
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedBOM.value = null
}

// CRUD handlers
async function handleCreateBOM(data: BOMFormData) {
  loading.value = true
  try {
    await bomStore.createBOM(data)
    closeModals()
  } catch (error) {
    console.error('Error creating BOM:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateBOM(data: BOMFormData) {
  if (!selectedBOM.value) return
  
  loading.value = true
  try {
    await bomStore.updateBOM(selectedBOM.value.id, data)
    closeModals()
  } catch (error) {
    console.error('Error updating BOM:', error)
  } finally {
    loading.value = false
  }
}

// BOM actions
async function copyBOM(bom: BOM) {
  const newVersion = prompt('Enter new version number:', 
    (parseFloat(bom.version) + 0.1).toFixed(1))
  
  if (newVersion && newVersion.trim()) {
    try {
      loading.value = true
      await bomStore.copyBOM(bom.id, newVersion.trim())
    } catch (error) {
      console.error('Error copying BOM:', error)
    } finally {
      loading.value = false
    }
  }
}

async function approveBOM(id: string) {
  if (confirm('Are you sure you want to approve this BOM?')) {
    try {
      loading.value = true
      await bomStore.approveBOM(id)
    } catch (error) {
      console.error('Error approving BOM:', error)
    } finally {
      loading.value = false
    }
  }
}

async function deleteBOM(id: string) {
  if (confirm('Are you sure you want to delete this BOM?')) {
    try {
      loading.value = true
      await bomStore.deleteBOM(id)
    } catch (error) {
      console.error('Error deleting BOM:', error)
    } finally {
      loading.value = false
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterStatus.value = ''
  filterType.value = ''
  filterItemCode.value = ''
}

onMounted(async () => {
  try {
    await Promise.all([
      bomStore.fetchBOMs(),
      bomStore.fetchStats()
    ])
  } catch (error) {
    console.error('Error loading BOMs:', error)
  }
})
</script>
