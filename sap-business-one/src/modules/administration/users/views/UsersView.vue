<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">User Management</h1>
        <p class="text-gray-600 mt-1">Manage system users, roles, and permissions</p>
      </div>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add User
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalUsers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Users</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeUsers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Approval</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingUsers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Roles</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalRoles || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users by name, email, or username..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="filters.status"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="PENDING">Pending</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="LOCKED">Locked</option>
          </select>
          <select
            v-model="filters.role"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Administrator</option>
            <option value="MANAGER">Manager</option>
            <option value="USER">User</option>
            <option value="VIEWER">Viewer</option>
            <option value="SUPPORT">Support</option>
          </select>
          <select
            v-model="filters.department"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="FINANCE">Finance</option>
            <option value="HR">Human Resources</option>
            <option value="OPERATIONS">Operations</option>
            <option value="SUPPORT">Support</option>
          </select>
          <button
            @click="applyFilters"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply
          </button>
          <button
            @click="clearFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Users</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                User
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Login
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
            <tr v-for="user in users" :key="user.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      :alt="user.name"
                      class="h-10 w-10 rounded-full"
                    />
                    <div
                      v-else
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">
                        {{ user.name.split(' ').map(n => n[0]).join('').toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                    <div class="text-sm text-gray-500">@{{ user.username }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
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
                  {{ formatUserRole(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDepartment(user.department) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
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
                  {{ formatUserStatus(user.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.lastLogin) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewUser(user)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editUser(user)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="resetPassword(user)"
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Reset
                  </button>
                  <button
                    v-if="user.status === 'ACTIVE'"
                    @click="toggleUserStatus(user)"
                    class="text-orange-600 hover:text-orange-900"
                  >
                    Suspend
                  </button>
                  <button
                    v-else
                    @click="toggleUserStatus(user)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Activate
                  </button>
                  <button
                    @click="deleteUser(user.id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
            {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="!pagination.hasPrev"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="!pagination.hasNext"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Modal -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeCreateModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingUser ? 'Edit User' : 'Create New User' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <UserForm
          :user="editingUser"
          :loading="loading"
          @submit="handleSubmitUser"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="showViewModal"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">User Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <UserView v-if="viewingUser" :user="viewingUser" />
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div
      v-if="showResetModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeResetModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Reset Password</h3>
          <button @click="closeResetModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleResetPassword" class="space-y-4">
          <div>
            <p class="text-sm text-gray-600 mb-4">
              Are you sure you want to reset the password for <strong>{{ resettingUser?.name }}</strong>?
              A temporary password will be generated and sent to their email.
            </p>
          </div>

          <div class="flex items-center">
            <input
              id="send-email"
              v-model="resetForm.sendEmail"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label for="send-email" class="ml-2 block text-sm text-gray-900">
              Send password reset email to user
            </label>
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeResetModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Resetting...</span>
              <span v-else>Reset Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useUserStore } from '../stores'
import UserForm from '../components/UserForm.vue'
import UserView from '../components/UserView.vue'
import type { User, UserFormData, UserFilters } from '../types'

// Store
const userStore = useUserStore()

// Reactive data
const searchQuery = ref('')
const filters = ref<UserFilters>({})
const showCreateModal = ref(false)
const showViewModal = ref(false)
const showResetModal = ref(false)
const editingUser = ref<User | null>(null)
const viewingUser = ref<User | null>(null)
const resettingUser = ref<User | null>(null)
const resetForm = ref({
  sendEmail: true,
})

// Computed properties
const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
const error = computed(() => userStore.error)
const stats = computed(() => userStore.stats)
const pagination = computed(() => userStore.pagination)

// Methods
const openCreateModal = () => {
  editingUser.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingUser.value = null
}

const editUser = (user: User) => {
  editingUser.value = user
  showCreateModal.value = true
}

const viewUser = (user: User) => {
  viewingUser.value = user
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingUser.value = null
}

const resetPassword = (user: User) => {
  resettingUser.value = user
  showResetModal.value = true
}

const closeResetModal = () => {
  showResetModal.value = false
  resettingUser.value = null
  resetForm.value.sendEmail = true
}

const handleSubmitUser = async (data: UserFormData) => {
  try {
    if (editingUser.value) {
      await userStore.updateUser(editingUser.value.id, data)
    } else {
      await userStore.createUser(data)
    }
    closeCreateModal()
  } catch (err) {
    console.error('Error saving user:', err)
  }
}

const handleResetPassword = async () => {
  if (!resettingUser.value) return

  try {
    await userStore.resetUserPassword(resettingUser.value.id, resetForm.value.sendEmail)
    closeResetModal()
  } catch (err) {
    console.error('Error resetting password:', err)
  }
}

const toggleUserStatus = async (user: User) => {
  const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE'
  try {
    await userStore.updateUserStatus(user.id, newStatus)
  } catch (err) {
    console.error('Error updating user status:', err)
  }
}

const deleteUser = async (id: string) => {
  if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
    try {
      await userStore.deleteUser(id)
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }
}

const applyFilters = () => {
  const newFilters: UserFilters = {}

  if (searchQuery.value.trim()) {
    newFilters.search = searchQuery.value.trim()
  }

  if (filters.value.status) {
    newFilters.status = filters.value.status
  }

  if (filters.value.role) {
    newFilters.role = filters.value.role
  }

  if (filters.value.department) {
    newFilters.department = filters.value.department
  }

  userStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {}
  userStore.clearFilters()
}

const nextPage = () => {
  userStore.nextPage()
}

const previousPage = () => {
  userStore.previousPage()
}

// Utility functions
const formatUserStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    PENDING: 'Pending',
    SUSPENDED: 'Suspended',
    LOCKED: 'Locked',
  }
  return statusMap[status] || status
}

const formatUserRole = (role: string): string => {
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

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === '') {
    userStore.clearFilters()
  }
})

// Initialize
onMounted(async () => {
  await userStore.loadUsers()
  await userStore.loadUserStats()
})
</script>