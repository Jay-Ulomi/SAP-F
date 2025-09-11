<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900">{{ pipeline.name }}</h2>
          <p class="text-sm text-gray-600 mt-1">
            {{ pipeline.description || 'No description provided' }}
          </p>
          <p class="text-sm text-gray-500 mt-1">ID: {{ pipeline.id }}</p>
        </div>
        <div class="flex items-center space-x-3">
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full"
            :class="pipeline.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
          >
            {{ pipeline.isActive ? 'Active' : 'Inactive' }}
          </span>
          <span
            class="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-sap-blue text-white"
          >
            {{ pipeline.stages.length }} Stages
          </span>
        </div>
      </div>
    </div>

    <div class="px-4 sm:px-6 py-4">
      <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        <div class="xl:col-span-2 space-y-4 sm:space-y-6">
          <!-- Pipeline Stages -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Pipeline Stages
            </h3>
            <div class="space-y-3">
              <div
                v-for="stage in sortedStages"
                :key="stage.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center space-x-2">
                    <div
                      class="w-4 h-4 rounded-full"
                      :style="{ backgroundColor: stage.color }"
                    ></div>
                    <h4 class="text-sm font-medium text-gray-900">{{ stage.name }}</h4>
                    <span class="text-xs text-gray-500">({{ stage.code }})</span>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">Order: {{ stage.order }}</span>
                    <span class="text-xs text-gray-500">{{ stage.probability }}%</span>
                  </div>
                </div>
                <div v-if="stage.description" class="text-sm text-gray-600 mb-2">
                  {{ stage.description }}
                </div>
                <div class="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Duration: {{ stage.estimatedDuration }} days</span>
                  <span v-if="stage.requiresApproval" class="text-orange-600"
                    >Requires Approval</span
                  >
                  <span v-if="stage.isDefault" class="text-sap-blue">Default</span>
                  <span v-if="stage.autoAdvance" class="text-green-600">Auto Advance</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Workflow Rules -->
          <div v-if="pipeline.workflowRules.length" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Workflow Rules
            </h3>
            <div class="space-y-3">
              <div
                v-for="rule in pipeline.workflowRules"
                :key="rule.id"
                class="border border-gray-200 rounded-lg p-3 bg-white"
              >
                <div class="flex items-center justify-between mb-1">
                  <h4 class="text-sm font-medium text-gray-900">{{ rule.name }}</h4>
                  <span class="text-xs text-gray-500">{{ rule.trigger }}</span>
                </div>
                <div v-if="rule.description" class="text-sm text-gray-600 mb-2">
                  {{ rule.description }}
                </div>
                <div class="text-xs text-gray-500">Priority: {{ rule.priority }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-4 sm:space-y-6">
          <!-- Pipeline Details -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">Details</h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="text-gray-500">Default Stage:</span>
                <span class="ml-2 text-gray-900">{{ getDefaultStageName() }}</span>
              </div>
              <div>
                <span class="text-gray-500">Max Stages:</span>
                <span class="ml-2 text-gray-900">{{ pipeline.maxStages }}</span>
              </div>
              <div>
                <span class="text-gray-500">Created:</span>
                <span class="ml-2 text-gray-900">{{ formatDate(pipeline.createdAt) }}</span>
              </div>
              <div>
                <span class="text-gray-500">Updated:</span>
                <span class="ml-2 text-gray-900">{{ formatDate(pipeline.updatedAt) }}</span>
              </div>
            </div>
          </div>

          <!-- Stage Statistics -->
          <div class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
              Stage Statistics
            </h3>
            <div class="space-y-2 text-sm">
              <div>
                <span class="text-gray-500">Total Stages:</span>
                <span class="ml-2 text-gray-900">{{ pipeline.stages.length }}</span>
              </div>
              <div>
                <span class="text-gray-500">Active Stages:</span>
                <span class="ml-2 text-gray-900">{{ activeStagesCount }}</span>
              </div>
              <div>
                <span class="text-gray-500">Avg Duration:</span>
                <span class="ml-2 text-gray-900">{{ averageDuration }} days</span>
              </div>
              <div>
                <span class="text-gray-500">Avg Probability:</span>
                <span class="ml-2 text-gray-900">{{ averageProbability }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PipelineConfig } from '../types'

interface Props {
  pipeline: PipelineConfig
}

const props = defineProps<Props>()

const sortedStages = computed(() => {
  return [...props.pipeline.stages].sort((a, b) => a.order - b.order)
})

const activeStagesCount = computed(() => {
  return props.pipeline.stages.filter((s) => s.isActive).length
})

const averageDuration = computed(() => {
  if (props.pipeline.stages.length === 0) return 0
  const total = props.pipeline.stages.reduce((sum, s) => sum + s.estimatedDuration, 0)
  return Math.round(total / props.pipeline.stages.length)
})

const averageProbability = computed(() => {
  if (props.pipeline.stages.length === 0) return 0
  const total = props.pipeline.stages.reduce((sum, s) => sum + s.probability, 0)
  return Math.round(total / props.pipeline.stages.length)
})

const getDefaultStageName = () => {
  const defaultStage = props.pipeline.stages.find((s) => s.id === props.pipeline.defaultStage)
  return defaultStage ? defaultStage.name : 'Not set'
}

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(
    new Date(date),
  )
</script>
