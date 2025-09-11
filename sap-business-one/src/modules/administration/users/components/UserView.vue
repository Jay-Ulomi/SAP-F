<template>
  <div class="space-y-6">
    <!-- User Profile Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center space-x-4">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="h-20 w-20 rounded-full"
        />
        <div
          v-else
          class="h-20 w-20 rounded-full bg-sap-blue flex items-center justify-center"
        >
          <span class="text-2xl font-medium text-white">
            {{ user.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
          </span>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-bold text-gray-900">{{ user.name }}</h2>
          <p class="text-gray-600">@{{ user.username }}</p>
          <div class="flex items-center space-x-4 mt-2">
            <span
              class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-green-100 text-green-800': user.status === 'ACTIVE',
                'bg-gray-100 text-gray-800': user.status === 'INACTIVE',
                'bg-yellow-100 text-yellow-800': user.status === 'PENDING',
                'bg-orange-100 text-orange-800': user.status === 'SUSPENDED',
                'bg-red-100 text-red-800': user.status === 'LOCKED',
              }"
            >
              {{ formatStatus(user.status) }}
            </span>
            <span
              class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
              :class="{
                'bg-red-100 text-red-800': user.role === 'ADMIN',
                'bg-blue-100 text-blue-800': user.role === 'MANAGER',
                'bg-green-100 text-green-800': user.role === 'USER',
                'bg-gray-100 text-gray-800': user.role === 'VIEWER',
                'bg-purple-100 text-purple-800': user.role === 'SUPPORT',
              }"
            >
              {{ formatRole(user.role) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- User Information Tabs -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              activeTab === tab.id
                ? 'border-sap-blue text-sap-blue'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            ]"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>

      <div class="p-6">
        <!-- General Information Tab -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">Email Address</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user.email }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user.phone || 'Not provided' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Department</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDepartment(user.department) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Manager</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ user.managerName || 'No manager assigned' }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Account Information</h3>
            <dl class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt class="text-sm font-medium text-gray-500">User ID</dt>
                <dd class="mt-1 text-sm text-gray-900 font-mono">{{ user.id }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Created Date</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user.createdAt) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Last Modified</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user.updatedAt) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Last Login</dt>
                <dd class="mt-1 text-sm text-gray-900">{{ formatDate(user.lastLogin) }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <!-- Permissions Tab -->
        <div v-if="activeTab === 'permissions'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Assigned Permissions</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="permission in userPermissions" :key="permission.id" class="flex items-center">
                <svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-sm text-gray-900">{{ permission.name }}</span>
              </div>
            </div>
            <div v-if="userPermissions.length === 0" class="text-sm text-gray-500">
              No specific permissions assigned. User has default role permissions.
            </div>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Role Permissions</h3>
            <div class="bg-gray-50 rounded-lg p-4">
              <p class="text-sm text-gray-700 mb-2">
                As a <strong>{{ formatRole(user.role) }}</strong>, this user has the following default permissions:
              </p>
              <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li v-for="permission in getRolePermissions(user.role)" :key="permission">
                  {{ permission }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Activity Tab -->
        <div v-if="activeTab === 'activity'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div class="flow-root">
              <ul class="-mb-8">
                <li v-for="(activity, index) in recentActivities" :key="activity.id">
                  <div class="relative pb-8">
                    <span
                      v-if="index !== recentActivities.length - 1"
                      class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                    <div class="relative flex space-x-3">
                      <div>
                        <span
                          class="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white"
                          :class="{
                            'bg-green-500': activity.type === 'login',
                            'bg-blue-500': activity.type === 'update',
                            'bg-red-500': activity.type === 'delete',
                            'bg-yellow-500': activity.type === 'create',
                          }"
                        >
                          <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path v-if="activity.type === 'login'" fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
                            <path v-else-if="activity.type === 'update'" fill-rule="evenodd" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" clip-rule="evenodd" />
                            <path v-else-if="activity.type === 'delete'" fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            <path v-else fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                          </svg>
                        </span>
                      </div>
                      <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p class="text-sm text-gray-900">{{ activity.description }}</p>
                        </div>
                        <div class="text-right text-sm whitespace-nowrap text-gray-500">
                          {{ formatRelativeTime(activity.timestamp) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-gray-500">Two-Factor Authentication</dt>
                <dd class="text-sm text-gray-900">
                  <span v-if="user.twoFactorEnabled" class="text-green-600 font-medium">Enabled</span>
                  <span v-else class="text-gray-500">Disabled</span>
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-gray-500">Email Notifications</dt>
                <dd class="text-sm text-gray-900">
                  <span v-if="user.emailNotifications" class="text-green-600 font-medium">Enabled</span>
                  <span v-else class="text-gray-500">Disabled</span>
                </dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-gray-500">Password Last Changed</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(user.passwordChangedAt) }}</dd>
              </div>
              <div class="flex items-center justify-between">
                <dt class="text-sm font-medium text-gray-500">Failed Login Attempts</dt>
                <dd class="text-sm text-gray-900">{{ user.failedLoginAttempts || 0 }}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Login Sessions</h3>
            <div class="space-y-3">
              <div v-for="session in loginSessions" :key="session.id" class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ session.device }}</p>
                    <p class="text-sm text-gray-500">{{ session.location }}</p>
                    <p class="text-xs text-gray-400">{{ session.ip }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-sm text-gray-500">{{ formatDate(session.loginTime) }}</p>
                    <span v-if="session.current" class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      Current
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { User } from '../types'

interface Props {
  user: User
}

const props = defineProps<Props>()

// Reactive data
const activeTab = ref('general')

const tabs = [
  { id: 'general', name: 'General' },
  { id: 'permissions', name: 'Permissions' },
  { id: 'activity', name: 'Activity' },
  { id: 'security', name: 'Security' },
]

// Mock data
const userPermissions = computed(() => [
  { id: 'users.view', name: 'View Users' },
  { id: 'users.edit', name: 'Edit Users' },
  { id: 'reports.view', name: 'View Reports' },
  { id: 'api.access', name: 'API Access' },
])

const recentActivities = ref([
  { id: '1', type: 'login', description: 'User logged in', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { id: '2', type: 'update', description: 'Updated profile information', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  { id: '3', type: 'create', description: 'Created new report', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '4', type: 'update', description: 'Changed password', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
  { id: '5', type: 'login', description: 'User logged in', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7) },
])

const loginSessions = ref([
  { id: '1', device: 'Chrome on Windows', location: 'New York, USA', ip: '192.168.1.100', loginTime: new Date(), current: true },
  { id: '2', device: 'Safari on iPhone', location: 'Los Angeles, USA', ip: '192.168.1.101', loginTime: new Date(Date.now() - 1000 * 60 * 60 * 24) },
  { id: '3', device: 'Firefox on Mac', location: 'Chicago, USA', ip: '192.168.1.102', loginTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3) },
])

// Utility functions
const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
    SUSPENDED: 'Suspended',
    LOCKED: 'Locked',
  }
  return statusMap[status] || status
}

const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    ADMIN: 'Administrator',
    MANAGER: 'Manager',
    USER: 'User',
    VIEWER: 'Viewer',
    SUPPORT: 'Support',
  }
  return roleMap[role] || role
}

const formatDepartment = (department: string): string => {
  const deptMap: Record<string, string> = {
    IT: 'IT',
    SALES: 'Sales',
    MARKETING: 'Marketing',
    FINANCE: 'Finance',
    HR: 'Human Resources',
    OPERATIONS: 'Operations',
    SUPPORT: 'Support',
  }
  return deptMap[department] || department
}

const formatDate = (date: string | Date | null): string => {
  if (!date) return 'Never'
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

const getRolePermissions = (role: string): string[] => {
  const permissions: Record<string, string[]> = {
    ADMIN: [
      'Full system access',
      'Manage all users and roles',
      'Access all modules',
      'View audit logs',
      'System configuration',
    ],
    MANAGER: [
      'Manage team members',
      'View reports',
      'Approve requests',
      'Access assigned modules',
    ],
    USER: [
      'View assigned data',
      'Create and edit own records',
      'Submit requests',
    ],
    VIEWER: [
      'View-only access',
      'Generate basic reports',
    ],
    SUPPORT: [
      'View customer data',
      'Manage support tickets',
      'Access help documentation',
    ],
  }
  return permissions[role] || []
}
</script>