<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Authorizations & Security</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Add Authorization
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Active Users</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeUsers || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Security Roles</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.securityRoles || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.5-1.5a2.5 2.5 0 10-5 0l-7 7a4.5 4.5 0 006.364 6.364l7-7a2.5 2.5 0 000-3.536z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Failed Logins</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.failedLogins || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-red-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Security Policies</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.securityPolicies || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Authorization Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-sap-blue hover:text-sap-dark-blue"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users or roles..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">User Role</label>
          <select
            v-model="selectedRole"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Administrator</option>
            <option value="MANAGER">Manager</option>
            <option value="SUPERVISOR">Supervisor</option>
            <option value="USER">User</option>
            <option value="VIEWER">Viewer</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="LOCKED">Locked</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Department</label>
          <select
            v-model="selectedDepartment"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Departments</option>
            <option value="IT">IT</option>
            <option value="FINANCE">Finance</option>
            <option value="SALES">Sales</option>
            <option value="PURCHASING">Purchasing</option>
            <option value="HR">Human Resources</option>
            <option value="WAREHOUSE">Warehouse</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Authorizations Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">User Authorizations</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading authorizations...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Authorizations</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadAuthorizations" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredAuthorizations.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Authorizations Found</p>
        <p class="text-sm text-gray-600 mb-4">Create your first user authorization to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Create Authorization</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Login
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Permissions
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="auth in filteredAuthorizations" :key="auth.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
                      :class="{
                        'bg-green-500': auth.status === 'ACTIVE',
                        'bg-gray-500': auth.status === 'INACTIVE',
                        'bg-red-500': auth.status === 'LOCKED',
                        'bg-yellow-500': auth.status === 'SUSPENDED'
                      }"
                    >
                      {{ auth.firstName.charAt(0) }}{{ auth.lastName.charAt(0) }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ auth.firstName }} {{ auth.lastName }}</div>
                    <div class="text-sm text-gray-500">{{ auth.username }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatRole(auth.role) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ auth.department || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': auth.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': auth.status === 'INACTIVE',
                    'bg-red-100 text-red-800': auth.status === 'LOCKED',
                    'bg-yellow-100 text-yellow-800': auth.status === 'SUSPENDED'
                  }"
                >
                  {{ formatStatus(auth.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ auth.lastLogin ? formatDate(auth.lastLogin) : 'Never' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ auth.permissions?.length || 0 }} permissions
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewAuthorization(auth)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editAuthorization(auth)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button 
                    v-if="auth.status === 'LOCKED'"
                    @click="unlockUser(auth.id)" 
                    class="text-green-600 hover:text-green-900"
                  >
                    Unlock
                  </button>
                  <button 
                    v-else-if="auth.status === 'ACTIVE'"
                    @click="lockUser(auth.id)" 
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Lock
                  </button>
                  <button @click="deleteAuthorization(auth.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredAuthorizations.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span>
              to
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredAuthorizations.length) }}</span>
              of
              <span class="font-medium">{{ filteredAuthorizations.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Create/Edit Authorization Modal -->
    <div v-if="isCreateModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {{ authToEdit ? 'Edit Authorization' : 'Create New Authorization' }}
            </h3>
            <button @click="closeCreateModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmitAuthorization" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="firstName" class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  id="firstName"
                  v-model="formData.firstName"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter first name"
                />
              </div>
              
              <div>
                <label for="lastName" class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  id="lastName"
                  v-model="formData.lastName"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter last name"
                />
              </div>
              
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  id="username"
                  v-model="formData.username"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter username"
                />
              </div>
              
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter email address"
                />
              </div>
              
              <div>
                <label for="role" class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <select
                  id="role"
                  v-model="formData.role"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Role</option>
                  <option value="ADMIN">Administrator</option>
                  <option value="MANAGER">Manager</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="USER">User</option>
                  <option value="VIEWER">Viewer</option>
                </select>
              </div>
              
              <div>
                <label for="department" class="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  id="department"
                  v-model="formData.department"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Department</option>
                  <option value="IT">IT</option>
                  <option value="FINANCE">Finance</option>
                  <option value="SALES">Sales</option>
                  <option value="PURCHASING">Purchasing</option>
                  <option value="HR">Human Resources</option>
                  <option value="WAREHOUSE">Warehouse</option>
                </select>
              </div>
              
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  id="status"
                  v-model="formData.status"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="INACTIVE">Inactive</option>
                  <option value="LOCKED">Locked</option>
                  <option value="SUSPENDED">Suspended</option>
                </select>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="closeCreateModal"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="formLoading"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="formLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ formLoading ? 'Saving...' : (authToEdit ? 'Update Authorization' : 'Create Authorization') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Authorization Modal -->
    <div v-if="isViewModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Authorization Details</h3>
            <button @click="closeViewModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedAuthorization" class="bg-white">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Full Name</dt>
                <dd class="text-sm font-semibold text-gray-900">{{ selectedAuthorization.firstName }} {{ selectedAuthorization.lastName }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Username</dt>
                <dd class="text-sm font-mono text-gray-900">{{ selectedAuthorization.username }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Email</dt>
                <dd class="text-sm text-gray-900">{{ selectedAuthorization.email }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Role</dt>
                <dd class="text-sm text-gray-900">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ formatRole(selectedAuthorization.role) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Department</dt>
                <dd class="text-sm text-gray-900">{{ selectedAuthorization.department || 'N/A' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Status</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': selectedAuthorization.status === 'ACTIVE',
                      'bg-gray-100 text-gray-800': selectedAuthorization.status === 'INACTIVE',
                      'bg-red-100 text-red-800': selectedAuthorization.status === 'LOCKED',
                      'bg-yellow-100 text-yellow-800': selectedAuthorization.status === 'SUSPENDED'
                    }"
                  >
                    {{ formatStatus(selectedAuthorization.status) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Last Login</dt>
                <dd class="text-sm text-gray-900">{{ selectedAuthorization.lastLogin ? formatDate(selectedAuthorization.lastLogin) : 'Never' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Created Date</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(selectedAuthorization.createdAt) }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Permissions</dt>
                <dd class="text-sm text-gray-900">{{ selectedAuthorization.permissions?.length || 0 }} assigned</dd>
              </div>
            </div>
            
            <div v-if="selectedAuthorization.permissions && selectedAuthorization.permissions.length > 0" class="mt-6">
              <h4 class="text-md font-medium text-gray-900 mb-3">Assigned Permissions</h4>
              <div class="flex flex-wrap gap-2">
                <span 
                  v-for="permission in selectedAuthorization.permissions" 
                  :key="permission"
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800"
                >
                  {{ permission }}
                </span>
              </div>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                @click="editAuthorization(selectedAuthorization)"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Edit Authorization
              </button>
              <button
                @click="closeViewModal"
                class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Interfaces
interface Authorization {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  role: string
  department?: string
  status: string
  lastLogin?: string
  createdAt: string
  permissions?: string[]
}

interface AuthStats {
  activeUsers: number
  securityRoles: number
  failedLogins: number
  securityPolicies: number
}

// Mock data
const mockAuthorizations: Authorization[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    username: 'jsmith',
    email: 'john.smith@company.com',
    role: 'ADMIN',
    department: 'IT',
    status: 'ACTIVE',
    lastLogin: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T09:00:00Z',
    permissions: ['USER_MANAGEMENT', 'SYSTEM_CONFIG', 'REPORTS_VIEW', 'DATA_EXPORT']
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    username: 'sjohnson',
    email: 'sarah.johnson@company.com',
    role: 'MANAGER',
    department: 'FINANCE',
    status: 'ACTIVE',
    lastLogin: '2024-01-14T14:20:00Z',
    createdAt: '2023-11-15T08:30:00Z',
    permissions: ['FINANCE_VIEW', 'REPORTS_VIEW', 'APPROVE_PURCHASES']
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    username: 'mbrown',
    email: 'michael.brown@company.com',
    role: 'USER',
    department: 'SALES',
    status: 'LOCKED',
    lastLogin: '2024-01-10T16:45:00Z',
    createdAt: '2023-10-20T11:15:00Z',
    permissions: ['SALES_VIEW', 'CUSTOMER_MANAGEMENT']
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    username: 'edavis',
    email: 'emily.davis@company.com',
    role: 'SUPERVISOR',
    department: 'WAREHOUSE',
    status: 'ACTIVE',
    lastLogin: '2024-01-13T08:15:00Z',
    createdAt: '2023-09-10T13:45:00Z',
    permissions: ['INVENTORY_MANAGEMENT', 'WAREHOUSE_OPERATIONS']
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    username: 'dwilson',
    email: 'david.wilson@company.com',
    role: 'VIEWER',
    department: 'HR',
    status: 'SUSPENDED',
    createdAt: '2023-08-15T10:00:00Z',
    permissions: ['HR_VIEW']
  }
]

const mockStats: AuthStats = {
  activeUsers: 156,
  securityRoles: 8,
  failedLogins: 12,
  securityPolicies: 15
}

// Local state
const authorizations = ref<Authorization[]>([...mockAuthorizations])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<AuthStats>({ ...mockStats })
const formLoading = ref(false)

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const authToEdit = ref<Authorization | null>(null)
const selectedAuthorization = ref<Authorization | null>(null)
const formData = ref<Partial<Authorization>>({})

// Filter state
const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const selectedDepartment = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredAuthorizations = computed(() => {
  let filtered = authorizations.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(auth =>
      auth.firstName.toLowerCase().includes(query) ||
      auth.lastName.toLowerCase().includes(query) ||
      auth.username.toLowerCase().includes(query) ||
      auth.email.toLowerCase().includes(query)
    )
  }

  if (selectedRole.value) {
    filtered = filtered.filter(auth => auth.role === selectedRole.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(auth => auth.status === selectedStatus.value)
  }

  if (selectedDepartment.value) {
    filtered = filtered.filter(auth => auth.department === selectedDepartment.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredAuthorizations.value.length / pageSize.value))

// Methods
const loadAuthorizations = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load authorizations'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  authToEdit.value = null
  formData.value = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    role: '',
    department: '',
    status: '',
    permissions: []
  }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  authToEdit.value = null
  formData.value = {}
}

const viewAuthorization = (auth: Authorization) => {
  selectedAuthorization.value = auth
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedAuthorization.value = null
}

const editAuthorization = (auth: Authorization) => {
  authToEdit.value = auth
  formData.value = { ...auth }
  isCreateModalOpen.value = true
}

const lockUser = async (id: string) => {
  if (confirm('Are you sure you want to lock this user?')) {
    try {
      const auth = authorizations.value.find(a => a.id === id)
      if (auth) {
        auth.status = 'LOCKED'
        stats.value.activeUsers--
      }
    } catch (err) {
      console.error('Failed to lock user:', err)
    }
  }
}

const unlockUser = async (id: string) => {
  try {
    const auth = authorizations.value.find(a => a.id === id)
    if (auth) {
      auth.status = 'ACTIVE'
      stats.value.activeUsers++
    }
  } catch (err) {
    console.error('Failed to unlock user:', err)
  }
}

const deleteAuthorization = async (id: string) => {
  if (confirm('Are you sure you want to delete this authorization?')) {
    try {
      authorizations.value = authorizations.value.filter(a => a.id !== id)
      stats.value.activeUsers--
    } catch (err) {
      console.error('Failed to delete authorization:', err)
    }
  }
}

const handleSubmitAuthorization = async () => {
  try {
    formLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (authToEdit.value) {
      // Update existing authorization
      const index = authorizations.value.findIndex(a => a.id === authToEdit.value!.id)
      if (index !== -1) {
        authorizations.value[index] = {
          ...authorizations.value[index],
          ...formData.value
        }
      }
    } else {
      // Create new authorization
      const newAuth: Authorization = {
        id: Date.now().toString(),
        firstName: formData.value.firstName || '',
        lastName: formData.value.lastName || '',
        username: formData.value.username || '',
        email: formData.value.email || '',
        role: formData.value.role || '',
        department: formData.value.department,
        status: formData.value.status || '',
        createdAt: new Date().toISOString(),
        permissions: formData.value.permissions || []
      }
      authorizations.value.unshift(newAuth)
      if (newAuth.status === 'ACTIVE') {
        stats.value.activeUsers++
      }
    }
    
    closeCreateModal()
  } catch (error) {
    console.error('Failed to save authorization:', error)
  } finally {
    formLoading.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedRole.value = ''
  selectedStatus.value = ''
  selectedDepartment.value = ''
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Utility functions
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString()
}

const formatRole = (role: string): string => {
  const roleMap: Record<string, string> = {
    'ADMIN': 'Administrator',
    'MANAGER': 'Manager',
    'SUPERVISOR': 'Supervisor',
    'USER': 'User',
    'VIEWER': 'Viewer'
  }
  return roleMap[role] || role
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'ACTIVE': 'Active',
    'INACTIVE': 'Inactive',
    'LOCKED': 'Locked',
    'SUSPENDED': 'Suspended'
  }
  return statusMap[status] || status
}

// Lifecycle
onMounted(() => {
  loadAuthorizations()
})
</script>