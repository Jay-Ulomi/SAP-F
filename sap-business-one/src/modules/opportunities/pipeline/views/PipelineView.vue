<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Sales Pipeline Management</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Pipeline
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Total Pipelines</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalPipelines || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Active Pipelines</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.activePipelines || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Total Stages</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalStages || 0 }}</p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Avg Stages/Pipeline</h3>
        <p class="mt-1 text-3xl font-semibold text-gray-900">
          {{ stats?.averageStagesPerPipeline || 0 }}
        </p>
      </div>
      <div class="bg-white shadow rounded-lg p-5">
        <h3 class="text-sm font-medium text-gray-500">Most Used Stage</h3>
        <p class="mt-1 text-lg font-semibold text-gray-900">
          {{ stats?.mostUsedStages?.[0]?.stage || 'N/A' }}
        </p>
        <p class="text-sm text-gray-500">{{ stats?.mostUsedStages?.[0]?.count || 0 }} uses</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          v-model="searchQuery"
          @keyup.enter="applyFilters"
          type="text"
          placeholder="Search pipelines..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        />
        <select
          v-model="filters.isActive"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Statuses</option>
          <option :value="true">Active</option>
          <option :value="false">Inactive</option>
        </select>
        <select
          v-model="filters.stageCount"
          @change="applyFilters"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
        >
          <option value="">All Stage Counts</option>
          <option :value="3">3 Stages</option>
          <option :value="4">4 Stages</option>
          <option :value="5">5 Stages</option>
          <option :value="6">6+ Stages</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Pipelines</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pipeline
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Stages
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Default Stage
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created
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
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">Loading pipelines...</td>
            </tr>
            <tr v-else-if="pipelines.length === 0">
              <td colspan="6" class="px-6 py-4 text-center text-gray-500">No pipelines found.</td>
            </tr>
            <tr v-for="pipeline in pipelines" :key="pipeline.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ pipeline.name }}</div>
                <div class="text-sm text-gray-500">
                  {{ pipeline.description || 'No description' }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="
                    pipeline.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  "
                >
                  {{ pipeline.isActive ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ pipeline.stages.length }} stages
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ getDefaultStageName(pipeline) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(pipeline.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="viewPipeline(pipeline)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="editPipeline(pipeline)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button
                    @click="deletePipeline(pipeline.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="!pagination.hasPrev"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!pagination.hasNext"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
              {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                @click="goToPage(p)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  pagination.page === p
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeCreateModal"
    >
      <div
        class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingPipeline ? 'Edit Pipeline' : 'Create New Pipeline' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
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
        <PipelineForm
          :pipeline="editingPipeline"
          :loading="loading"
          @submit="handleSubmitPipeline"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start"
      @click.self="closeViewModal"
    >
      <div
        class="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Pipeline Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
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
        <PipelineView v-if="selectedPipeline" :pipeline="selectedPipeline" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, defineAsyncComponent } from 'vue'
import { usePipelineStore } from '../stores'
const PipelineForm = defineAsyncComponent(() => import('../components/PipelineForm.vue'))
const PipelineView = defineAsyncComponent(() => import('../components/PipelineView.vue'))
import type { PipelineConfig, PipelineFormData, PipelineFilters } from '../types'

const pipelineStore = usePipelineStore()

const showCreateModal = ref(false)
const showViewModal = ref(false)
const editingPipeline = ref<PipelineConfig | null>(null)
const selectedPipeline = ref<PipelineConfig | null>(null)

const searchQuery = ref('')
const filters = ref<PipelineFilters>({ isActive: undefined, stageCount: undefined })

const pipelines = computed(() => pipelineStore.pipelines)
const loading = computed(() => pipelineStore.loading)
const stats = computed(() => pipelineStore.stats)
const pagination = computed(() => pipelineStore.pagination)

const openCreateModal = () => {
  editingPipeline.value = null
  showCreateModal.value = true
}
const editPipeline = (pipeline: PipelineConfig) => {
  editingPipeline.value = { ...pipeline }
  showCreateModal.value = true
}
const closeCreateModal = () => {
  showCreateModal.value = false
  editingPipeline.value = null
}
const viewPipeline = (pipeline: PipelineConfig) => {
  selectedPipeline.value = pipeline
  showViewModal.value = true
}
const closeViewModal = () => {
  showViewModal.value = false
  selectedPipeline.value = null
}

const handleSubmitPipeline = async (data: PipelineFormData) => {
  if (editingPipeline.value) await pipelineStore.updatePipeline(editingPipeline.value.id, data)
  else await pipelineStore.createPipeline(data)
  closeCreateModal()
  await loadData()
}

const deletePipeline = async (id: string) => {
  if (!confirm('Delete this pipeline?')) return
  await pipelineStore.deletePipeline(id)
  await loadData()
}

const applyFilters = async () => {
  const newFilters: PipelineFilters = {}
  if (searchQuery.value.trim()) newFilters.search = searchQuery.value.trim()
  if (filters.value.isActive !== undefined) newFilters.isActive = filters.value.isActive
  if (filters.value.stageCount) newFilters.stageCount = filters.value.stageCount
  pipelineStore.setFilters(newFilters)
  await pipelineStore.loadPipelines(1, 10, newFilters)
}

const clearFilters = async () => {
  searchQuery.value = ''
  filters.value = { isActive: undefined, stageCount: undefined }
  pipelineStore.setFilters({})
  await pipelineStore.loadPipelines()
}

const nextPage = async () => {
  if (pagination.value.hasNext) await pipelineStore.loadPipelines(pagination.value.page + 1)
}
const previousPage = async () => {
  if (pagination.value.hasPrev) await pipelineStore.loadPipelines(pagination.value.page - 1)
}
const goToPage = async (p: number) => {
  await pipelineStore.loadPipelines(p)
}

const getDefaultStageName = (pipeline: PipelineConfig) => {
  const defaultStage = pipeline.stages.find((s) => s.id === pipeline.defaultStage)
  return defaultStage ? defaultStage.name : 'Not set'
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(date),
  )

const loadData = async () => {
  await pipelineStore.loadPipelines()
  await pipelineStore.loadStats()
}

onMounted(loadData)
</script>
