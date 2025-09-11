<template>
  <div class="space-y-6">
    <!-- Configuration Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-2xl font-bold text-gray-900">{{ configuration.name }}</h2>
        <div class="flex items-center space-x-2">
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800"
          >
            {{ formatCategory(configuration.category) }}
          </span>
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': configuration.status === 'CONFIGURED',
              'bg-yellow-100 text-yellow-800': configuration.status === 'PENDING',
              'bg-gray-100 text-gray-800': configuration.status === 'DISABLED',
              'bg-red-100 text-red-800': configuration.status === 'ERROR'
            }"
          >
            {{ formatStatus(configuration.status) }}
          </span>
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-red-100 text-red-800': configuration.priority === 'CRITICAL',
              'bg-orange-100 text-orange-800': configuration.priority === 'HIGH',
              'bg-yellow-100 text-yellow-800': configuration.priority === 'MEDIUM',
              'bg-gray-100 text-gray-800': configuration.priority === 'LOW'
            }"
          >
            {{ formatPriority(configuration.priority) }}
          </span>
        </div>
      </div>
      <p class="text-gray-600">{{ configuration.description || 'No description provided' }}</p>
    </div>

    <!-- Configuration Details -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Configuration Details</h3>
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">Configuration ID</dt>
          <dd class="mt-1 text-sm text-gray-900 font-mono">{{ configuration.id }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Data Type</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ formatDataType(configuration.dataType) }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Required</dt>
          <dd class="mt-1 text-sm text-gray-900">
            <span v-if="configuration.isRequired" class="text-green-600 font-medium">Yes</span>
            <span v-else class="text-gray-500">No</span>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ formatDate(configuration.lastUpdated) }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Updated By</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ configuration.updatedBy || 'System' }}</dd>
        </div>
      </dl>
    </div>

    <!-- Values Section -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Values</h3>
      <dl class="space-y-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">Current Value</dt>
          <dd class="mt-1">
            <div v-if="configuration.value !== null && configuration.value !== undefined" class="bg-gray-50 rounded p-3">
              <code class="text-sm text-gray-900">{{ formatValue(configuration.value) }}</code>
            </div>
            <div v-else class="text-sm text-gray-500 italic">No value set</div>
          </dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Default Value</dt>
          <dd class="mt-1">
            <div v-if="configuration.defaultValue !== null && configuration.defaultValue !== undefined" class="bg-blue-50 rounded p-3">
              <code class="text-sm text-blue-900">{{ formatValue(configuration.defaultValue) }}</code>
            </div>
            <div v-else class="text-sm text-gray-500 italic">No default value</div>
          </dd>
        </div>
      </dl>
    </div>

    <!-- Validation Rules Section -->
    <div v-if="configuration.validationRules && Object.keys(configuration.validationRules).length > 0" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Validation Rules</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(value, key) in configuration.validationRules" :key="key">
          <dt class="text-sm font-medium text-gray-500">{{ formatValidationRule(key) }}</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ value }}</dd>
        </div>
      </div>
    </div>

    <!-- Configuration History (Mock) -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Changes</h3>
      <div class="flow-root">
        <ul class="-mb-8">
          <li v-for="(change, index) in configurationHistory" :key="change.id">
            <div class="relative pb-8">
              <span
                v-if="index !== configurationHistory.length - 1"
                class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
              <div class="relative flex space-x-3">
                <div>
                  <span
                    class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                    :class="{
                      'bg-green-500': change.type === 'updated',
                      'bg-blue-500': change.type === 'created',
                      'bg-yellow-500': change.type === 'disabled',
                      'bg-red-500': change.type === 'error'
                    }"
                  >
                    <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path v-if="change.type === 'updated'" fill-rule="evenodd" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" clip-rule="evenodd" />
                      <path v-else-if="change.type === 'created'" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                      <path v-else fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p class="text-sm text-gray-900">{{ change.description }}</p>
                    <p class="text-xs text-gray-500">by {{ change.user }}</p>
                  </div>
                  <div class="text-right text-sm whitespace-nowrap text-gray-500">
                    {{ formatRelativeTime(change.timestamp) }}
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface SystemConfiguration {
  id: string
  name: string
  description?: string
  category: string
  status: string
  priority: string
  value: any
  defaultValue: any
  dataType: string
  lastUpdated: string
  updatedBy?: string
  isRequired: boolean
  validationRules?: Record<string, any>
}

interface Props {
  configuration: SystemConfiguration
}

defineProps<Props>()

// Mock configuration history
const configurationHistory = computed(() => [
  {
    id: '1',
    type: 'updated',
    description: 'Configuration value updated',
    user: 'admin',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: '2',
    type: 'created',
    description: 'Configuration created',
    user: 'setup_wizard',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
  },
])

// Utility functions
const formatCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'SYSTEM': 'System',
    'COMPANY': 'Company',
    'USER_INTERFACE': 'UI',
    'DATABASE': 'Database',
    'INTEGRATION': 'Integration',
    'SECURITY': 'Security',
    'WORKFLOW': 'Workflow',
    'REPORTING': 'Reporting'
  }
  return categoryMap[category] || category
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'CONFIGURED': 'Configured',
    'PENDING': 'Pending',
    'DISABLED': 'Disabled',
    'ERROR': 'Error'
  }
  return statusMap[status] || status
}

const formatPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'CRITICAL': 'Critical',
    'HIGH': 'High',
    'MEDIUM': 'Medium',
    'LOW': 'Low'
  }
  return priorityMap[priority] || priority
}

const formatDataType = (dataType: string): string => {
  const typeMap: Record<string, string> = {
    'string': 'String',
    'number': 'Number',
    'boolean': 'Boolean',
    'object': 'Object',
    'array': 'Array'
  }
  return typeMap[dataType] || dataType
}

const formatValue = (value: any): string => {
  if (value === null || value === undefined) {
    return 'null'
  }
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

const formatValidationRule = (key: string): string => {
  const ruleMap: Record<string, string> = {
    'required': 'Required',
    'minLength': 'Minimum Length',
    'maxLength': 'Maximum Length',
    'min': 'Minimum Value',
    'max': 'Maximum Value',
    'pattern': 'Pattern'
  }
  return ruleMap[key] || key
}

const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}

const formatRelativeTime = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  
  return formatDate(date)
}
</script>