<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Username *</label>
          <input
            v-model="form.username"
            type="text"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="user@example.com"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            v-model="form.phone"
            type="tel"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div v-if="!user">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password *</label>
          <input
            v-model="form.password"
            type="password"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Enter password"
          />
        </div>

        <div v-if="!user">
          <label class="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
          <input
            v-model="form.confirmPassword"
            type="password"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            placeholder="Confirm password"
          />
        </div>
      </div>
    </div>

    <!-- Role & Access -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Role & Access</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Role *</label>
          <select
            v-model="form.role"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select role</option>
            <option value="ADMIN">Administrator</option>
            <option value="MANAGER">Manager</option>
            <option value="USER">User</option>
            <option value="VIEWER">Viewer</option>
            <option value="SUPPORT">Support</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Department *</label>
          <select
            v-model="form.department"
            required
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="FINANCE">Finance</option>
            <option value="HR">Human Resources</option>
            <option value="OPERATIONS">Operations</option>
            <option value="SUPPORT">Support</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="form.status"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Manager</label>
          <select
            v-model="form.managerId"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">No manager</option>
            <option v-for="manager in managers" :key="manager.id" :value="manager.id">
              {{ manager.name }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Permissions -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Permissions</h4>
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

    <!-- Additional Settings -->
    <div class="bg-gray-50 rounded-lg p-6">
      <h4 class="text-lg font-medium text-gray-900 mb-4">Additional Settings</h4>
      <div class="space-y-4">
        <div class="flex items-center">
          <input
            id="two-factor"
            v-model="form.twoFactorEnabled"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="two-factor" class="ml-2 block text-sm text-gray-900">
            Enable Two-Factor Authentication
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="email-notifications"
            v-model="form.emailNotifications"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="email-notifications" class="ml-2 block text-sm text-gray-900">
            Receive Email Notifications
          </label>
        </div>

        <div class="flex items-center">
          <input
            id="force-password-change"
            v-model="form.forcePasswordChange"
            type="checkbox"
            class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
          />
          <label for="force-password-change" class="ml-2 block text-sm text-gray-900">
            Force Password Change on Next Login
          </label>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-3 pt-6">
      <button
        type="button"
        @click="$emit('cancel')"
        class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        Cancel
      </button>
      <button
        type="submit"
        :disabled="loading"
        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span v-if="loading">{{ user ? 'Updating...' : 'Creating...' }}</span>
        <span v-else>{{ user ? 'Update User' : 'Create User' }}</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { User, UserFormData } from '../types'

interface Props {
  user?: User | null
  loading?: boolean
}

interface Emits {
  (e: 'submit', data: UserFormData): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Mock data for managers and permissions
const managers = ref([
  { id: '1', name: 'John Manager' },
  { id: '2', name: 'Jane Supervisor' },
  { id: '3', name: 'Bob Director' },
])

const availablePermissions = ref([
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
])

// Form data
const form = reactive<UserFormData>({
  name: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'USER',
  department: '',
  status: 'ACTIVE',
  managerId: '',
  permissions: [],
  twoFactorEnabled: false,
  emailNotifications: true,
  forcePasswordChange: false,
})

// Handle form submission
const handleSubmit = () => {
  // Validate passwords match for new users
  if (!props.user && form.password !== form.confirmPassword) {
    alert('Passwords do not match')
    return
  }

  // Prepare data for submission
  const data = { ...form }
  
  // Remove password fields if editing existing user
  if (props.user) {
    delete data.password
    delete data.confirmPassword
  }

  emit('submit', data)
}

// Watch for user prop changes
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      // Populate form with user data
      Object.assign(form, {
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone || '',
        role: newUser.role,
        department: newUser.department,
        status: newUser.status,
        managerId: newUser.managerId || '',
        permissions: newUser.permissions || [],
        twoFactorEnabled: newUser.twoFactorEnabled || false,
        emailNotifications: newUser.emailNotifications !== false,
        forcePasswordChange: false,
      })
    } else {
      // Reset form for new user
      Object.assign(form, {
        name: '',
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
        department: '',
        status: 'ACTIVE',
        managerId: '',
        permissions: [],
        twoFactorEnabled: false,
        emailNotifications: true,
        forcePasswordChange: false,
      })
    }
  },
  { immediate: true }
)
</script>