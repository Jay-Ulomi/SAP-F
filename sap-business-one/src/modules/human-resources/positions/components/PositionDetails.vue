<template>
  <div class="space-y-6">
    <!-- Header with position summary -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ position.title }}</h2>
          <p class="text-sm text-gray-600 mt-1">Position Code: {{ position.code }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <span
              :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                getStatusColor(position.status)
              ]"
            >
              {{ formatStatus(position.status) }}
            </span>
            <span
              :class="[
                'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                getLevelColor(position.level)
              ]"
            >
              {{ formatLevel(position.level) }}
            </span>
            <span class="text-sm text-gray-500">
              {{ formatEmploymentType(position.employmentType) }}
            </span>
          </div>
        </div>
        <div class="text-right">
          <p class="text-3xl font-bold text-indigo-600">
            {{ position.salaryRange.currency }} {{ position.salaryRange.min.toLocaleString() }} - {{ position.salaryRange.max.toLocaleString() }}
          </p>
          <p class="text-sm text-gray-500">Salary Range</p>
          <div class="mt-2 space-x-4">
            <span class="text-lg font-semibold text-green-600">{{ position.openPositions }} Open</span>
            <span class="text-lg font-semibold text-blue-600">{{ position.filledPositions }} Filled</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Position Information -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Position Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Department</dt>
            <dd class="text-sm text-gray-900">{{ position.departmentName }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Reports To</dt>
            <dd class="text-sm text-gray-900">{{ position.reportingToName || 'Not specified' }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Location</dt>
            <dd class="text-sm text-gray-900">
              {{ position.location }}
              <span v-if="position.isRemoteEligible" class="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                Remote Eligible
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Total Positions</dt>
            <dd class="text-sm text-gray-900">{{ position.totalPositions }}</dd>
          </div>
        </dl>
      </div>

      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Timeline</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Created Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(position.createdAt).toLocaleDateString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Created By</dt>
            <dd class="text-sm text-gray-900">{{ position.createdBy }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
            <dd class="text-sm text-gray-900">{{ new Date(position.updatedAt).toLocaleDateString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Updated By</dt>
            <dd class="text-sm text-gray-900">{{ position.updatedBy }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Description -->
    <div v-if="position.description" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Description</h3>
      <p class="text-gray-700 whitespace-pre-wrap">{{ position.description }}</p>
    </div>

    <!-- Responsibilities -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Key Responsibilities</h3>
      <ul class="space-y-2">
        <li v-for="responsibility in position.responsibilities" :key="responsibility" class="flex items-start">
          <svg class="w-4 h-4 text-indigo-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-700">{{ responsibility }}</span>
        </li>
      </ul>
    </div>

    <!-- Requirements -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
      <ul class="space-y-2">
        <li v-for="requirement in position.requirements" :key="requirement" class="flex items-start">
          <svg class="w-4 h-4 text-red-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-700">{{ requirement }}</span>
        </li>
      </ul>
    </div>

    <!-- Qualifications -->
    <div v-if="position.qualifications.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Preferred Qualifications</h3>
      <ul class="space-y-2">
        <li v-for="qualification in position.qualifications" :key="qualification" class="flex items-start">
          <svg class="w-4 h-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-700">{{ qualification }}</span>
        </li>
      </ul>
    </div>

    <!-- Benefits -->
    <div v-if="position.benefits.length > 0" class="bg-white rounded-lg border border-gray-200 p-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Benefits & Perks</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div v-for="benefit in position.benefits" :key="benefit" class="flex items-center">
          <svg class="w-4 h-4 text-indigo-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-700">{{ benefit }}</span>
        </div>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex justify-end space-x-3 pt-4">
      <button
        @click="printPosition"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Print
      </button>
      <button
        @click="exportPosition"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Export
      </button>
      <button
        @click="clonePosition"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Clone Position
      </button>
      <button
        v-if="canEdit"
        @click="editPosition"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Edit Position
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Position } from '../types'

interface Props {
  position: Position
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [position: Position]
  clone: [position: Position]
  export: [position: Position]
  print: [position: Position]
}>()

const canEdit = computed(() => {
  return ['draft', 'active'].includes(props.position.status)
})

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatLevel(level: string): string {
  return level.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function formatEmploymentType(type: string): string {
  return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'draft': return 'bg-gray-100 text-gray-800'
    case 'active': return 'bg-green-100 text-green-800'
    case 'inactive': return 'bg-red-100 text-red-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function getLevelColor(level: string): string {
  switch (level) {
    case 'entry': return 'bg-blue-100 text-blue-800'
    case 'junior': return 'bg-cyan-100 text-cyan-800'
    case 'senior': return 'bg-purple-100 text-purple-800'
    case 'lead': return 'bg-indigo-100 text-indigo-800'
    case 'manager': return 'bg-orange-100 text-orange-800'
    case 'director': return 'bg-red-100 text-red-800'
    case 'executive': return 'bg-gray-100 text-gray-800'
    default: return 'bg-gray-100 text-gray-800'
  }
}

function editPosition() {
  emit('edit', props.position)
}

function clonePosition() {
  emit('clone', props.position)
}

function exportPosition() {
  emit('export', props.position)
}

function printPosition() {
  emit('print', props.position)
  window.print()
}
</script>