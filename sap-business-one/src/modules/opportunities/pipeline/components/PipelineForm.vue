<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="border-b border-gray-200">
      <nav class="-mb-px flex space-x-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            activeTab === tab.id
              ? 'border-sap-blue text-sap-blue'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            'whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm',
          ]"
        >
          {{ tab.name }}
        </button>
      </nav>
    </div>

    <!-- Pipeline Configuration -->
    <div v-if="activeTab === 'pipeline'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Pipeline Name *</label>
          <input
            v-model="formData.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter pipeline name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Max Stages</label>
          <input
            v-model.number="formData.maxStages"
            type="number"
            min="1"
            max="20"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Maximum number of stages"
          />
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="formData.description"
            rows="3"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter pipeline description"
          />
        </div>
        <div class="space-y-4">
          <div class="flex items-center">
            <input
              v-model="formData.isActive"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label class="ml-2 block text-sm text-gray-900">Active Pipeline</label>
          </div>
          <div class="flex items-center">
            <input
              v-model="formData.defaultStage"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Default stage ID"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Stage Management -->
    <div v-if="activeTab === 'stages'" class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-medium text-gray-900">Pipeline Stages</h3>
        <button
          type="button"
          @click="addStage"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          <svg class="-ml-1 mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Stage
        </button>
      </div>

      <div class="space-y-4">
        <div
          v-for="(stage, index) in formData.stages"
          :key="stage.id"
          class="border border-gray-200 rounded-lg p-4 bg-gray-50"
        >
          <div class="flex justify-between items-start mb-4">
            <h4 class="text-md font-medium text-gray-900">Stage {{ index + 1 }}</h4>
            <button
              type="button"
              @click="removeStage(index)"
              class="text-red-600 hover:text-red-900"
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

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stage Name *</label>
              <input
                v-model="stage.name"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Stage name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Stage Code *</label>
              <input
                v-model="stage.code"
                type="text"
                required
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="STAGE_CODE"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <input
                v-model.number="stage.order"
                type="number"
                min="1"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Order"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                v-model="stage.color"
                type="color"
                class="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input
                v-model.number="stage.probability"
                type="number"
                min="0"
                max="100"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="0-100"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Duration (days)</label>
              <input
                v-model.number="stage.estimatedDuration"
                type="number"
                min="0"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Estimated days"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                v-model="stage.description"
                rows="2"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                placeholder="Stage description"
              />
            </div>
            <div class="space-y-3">
              <div class="flex items-center">
                <input
                  v-model="stage.isActive"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Active Stage</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="stage.isDefault"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Default Stage</label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="stage.requiresApproval"
                  type="checkbox"
                  class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
                />
                <label class="ml-2 block text-sm text-gray-900">Requires Approval</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading || !isFormValid"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">Saving...</span>
        <span v-else>{{ pipeline ? 'Update Pipeline' : 'Create Pipeline' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { PipelineConfig, PipelineFormData, PipelineStage } from '../types'

interface Props {
  pipeline?: PipelineConfig | null
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), { pipeline: null, loading: false })
const emit = defineEmits<{ submit: [data: PipelineFormData]; cancel: [] }>()

const tabs = [
  { id: 'pipeline', name: 'Pipeline Configuration' },
  { id: 'stages', name: 'Stage Management' },
]

const activeTab = ref('pipeline')

const formData = ref<PipelineFormData>({
  name: '',
  description: '',
  stages: [],
  isActive: true,
  defaultStage: '',
  maxStages: 10,
})

const isFormValid = computed(() => {
  return (
    formData.value.name.trim() !== '' &&
    formData.value.stages.length > 0 &&
    formData.value.stages.every((s) => s.name.trim() !== '' && s.code.trim() !== '') &&
    formData.value.stages.length <= formData.value.maxStages
  )
})

const addStage = () => {
  const newStage: PipelineStage = {
    id: `temp-${Date.now()}`,
    name: '',
    code: '',
    description: '',
    order: formData.value.stages.length + 1,
    color: '#3B82F6',
    probability: 0,
    isActive: true,
    isDefault: false,
    requiresApproval: false,
    autoAdvance: false,
    estimatedDuration: 1,
    activities: [],
    rules: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
  formData.value.stages.push(newStage)
}

const removeStage = (index: number) => {
  formData.value.stages.splice(index, 1)
  // Reorder remaining stages
  formData.value.stages.forEach((s, idx) => {
    s.order = idx + 1
  })
}

const handleSubmit = () => {
  if (isFormValid.value) {
    emit('submit', { ...formData.value })
  }
}

const initialize = () => {
  if (!props.pipeline) return
  formData.value = {
    name: props.pipeline.name,
    description: props.pipeline.description || '',
    stages: [...props.pipeline.stages],
    isActive: props.pipeline.isActive,
    defaultStage: props.pipeline.defaultStage,
    maxStages: props.pipeline.maxStages,
  }
}

watch(() => props.pipeline, initialize, { immediate: true })
onMounted(initialize)
</script>
