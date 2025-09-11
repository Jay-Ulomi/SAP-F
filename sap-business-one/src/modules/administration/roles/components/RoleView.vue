<template>
  <div class="space-y-6">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-semibold text-gray-900">{{ role.name }}</h2>
        <div class="flex items-center space-x-2">
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-purple-100 text-purple-800': role.type === 'SYSTEM',
              'bg-blue-100 text-blue-800': role.type === 'CUSTOM',
            }"
          >
            {{ role.type }}
          </span>
          <span
            class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
            :class="{
              'bg-green-100 text-green-800': role.status === 'ACTIVE',
              'bg-gray-100 text-gray-800': role.status === 'INACTIVE',
            }"
          >
            {{ role.status }}
          </span>
        </div>
      </div>
      <p class="text-gray-600">{{ role.description }}</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Role Information</h3>
      <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <dt class="text-sm font-medium text-gray-500">Role ID</dt>
          <dd class="mt-1 text-sm text-gray-900 font-mono">{{ role.id }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Users with this Role</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ role.userCount }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Created Date</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ formatDate(role.createdAt) }}</dd>
        </div>
        <div>
          <dt class="text-sm font-medium text-gray-500">Last Modified</dt>
          <dd class="mt-1 text-sm text-gray-900">{{ formatDate(role.updatedAt) }}</dd>
        </div>
      </dl>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Permissions ({{ role.permissions.length }})</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="permission in role.permissions" :key="permission" class="flex items-center">
          <svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm text-gray-900">{{ permission }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Role } from '../types'

interface Props {
  role: Role
}

defineProps<Props>()

const formatDate = (date: string | Date | null | undefined): string => {
  if (!date) return 'Never'
  const d = new Date(date)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString()
}
</script>