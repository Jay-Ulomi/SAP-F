<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Role Name *</label>
        <input
          v-model="form.name"
          type="text"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter role name"
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          v-model="form.description"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          placeholder="Enter role description"
        ></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select
          v-model="form.status"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Permissions</label>
        <div class="grid grid-cols-2 gap-4 mt-2">
          <div v-for="permission in availablePermissions" :key="permission.id" class="flex items-center">
            <input
              :id="`permission-${permission.id}`"
              v-model="form.permissions"
              :value="permission.id"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label :for="`permission-${permission.id}`" class="ml-2 block text-sm text-gray-900">
              {{ permission.name }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end space-x-3 pt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue disabled:opacity-50"
      >
        {{ loading ? 'Saving...' : (role ? 'Update Role' : 'Create Role') }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import type { Role, RoleFormData } from '../types'

interface Props {
  role?: Role | null
  loading?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  submit: [data: RoleFormData]
  cancel: []
}>()

const availablePermissions = [
  { id: 'users.view', name: 'View Users' },
  { id: 'users.create', name: 'Create Users' },
  { id: 'users.edit', name: 'Edit Users' },
  { id: 'users.delete', name: 'Delete Users' },
  { id: 'roles.view', name: 'View Roles' },
  { id: 'roles.manage', name: 'Manage Roles' },
  { id: 'settings.view', name: 'View Settings' },
  { id: 'settings.manage', name: 'Manage Settings' },
  { id: 'audit.view', name: 'View Audit Logs' },
  { id: 'reports.view', name: 'View Reports' },
  { id: 'reports.export', name: 'Export Reports' },
  { id: 'api.access', name: 'API Access' },
]

const form = reactive<RoleFormData>({
  name: '',
  description: '',
  permissions: [],
  status: 'ACTIVE',
})

const handleSubmit = () => {
  emit('submit', { ...form })
}

watch(
  () => props.role,
  (newRole) => {
    if (newRole) {
      Object.assign(form, {
        name: newRole.name,
        description: newRole.description,
        permissions: [...newRole.permissions],
        status: newRole.status,
      })
    } else {
      Object.assign(form, {
        name: '',
        description: '',
        permissions: [],
        status: 'ACTIVE',
      })
    }
  },
  { immediate: true }
)
</script>