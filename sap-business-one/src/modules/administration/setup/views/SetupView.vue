<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">System Administration</h1>
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
        Add Configuration
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Configuration Items</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalConfigurations || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Active Settings</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeSettings || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Pending Setup</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.pendingSetup || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <h3 class="text-lg font-medium text-gray-900">Configuration Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-sap-blue hover:text-sap-dark-blue"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Settings</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search configurations..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            v-model="selectedCategory"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="SYSTEM">System</option>
            <option value="COMPANY">Company</option>
            <option value="USER_INTERFACE">User Interface</option>
            <option value="DATABASE">Database</option>
            <option value="INTEGRATION">Integration</option>
            <option value="SECURITY">Security</option>
            <option value="WORKFLOW">Workflow</option>
            <option value="REPORTING">Reporting</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="CONFIGURED">Configured</option>
            <option value="PENDING">Pending</option>
            <option value="DISABLED">Disabled</option>
            <option value="ERROR">Error</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
          <select
            v-model="selectedPriority"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Priorities</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Setup Configuration Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">System Configuration</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading configurations...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Configurations</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadConfigurations" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredConfigurations.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Configuration Items Found</p>
        <p class="text-sm text-gray-600 mb-4">Create your first system configuration to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Create Configuration</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Configuration
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated By
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="config in filteredConfigurations" :key="config.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-green-100': config.status === 'CONFIGURED',
                        'bg-yellow-100': config.status === 'PENDING',
                        'bg-gray-100': config.status === 'DISABLED',
                        'bg-red-100': config.status === 'ERROR'
                      }"
                    >
                      <svg 
                        class="w-5 h-5"
                        :class="{
                          'text-green-600': config.status === 'CONFIGURED',
                          'text-yellow-600': config.status === 'PENDING',
                          'text-gray-600': config.status === 'DISABLED',
                          'text-red-600': config.status === 'ERROR'
                        }"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ config.name }}</div>
                    <div class="text-sm text-gray-500">{{ config.description || 'No description' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatCategory(config.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': config.status === 'CONFIGURED',
                    'bg-yellow-100 text-yellow-800': config.status === 'PENDING',
                    'bg-gray-100 text-gray-800': config.status === 'DISABLED',
                    'bg-red-100 text-red-800': config.status === 'ERROR'
                  }"
                >
                  {{ formatStatus(config.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-red-100 text-red-800': config.priority === 'CRITICAL',
                    'bg-orange-100 text-orange-800': config.priority === 'HIGH',
                    'bg-yellow-100 text-yellow-800': config.priority === 'MEDIUM',
                    'bg-gray-100 text-gray-800': config.priority === 'LOW'
                  }"
                >
                  {{ formatPriority(config.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatDate(config.lastUpdated) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ config.updatedBy || 'System' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewConfiguration(config)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editConfiguration(config)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button 
                    v-if="config.status === 'DISABLED'"
                    @click="enableConfiguration(config.id)" 
                    class="text-green-600 hover:text-green-900"
                  >
                    Enable
                  </button>
                  <button 
                    v-else
                    @click="disableConfiguration(config.id)" 
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Disable
                  </button>
                  <button @click="deleteConfiguration(config.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredConfigurations.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredConfigurations.length) }}</span>
              of
              <span class="font-medium">{{ filteredConfigurations.length }}</span>
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

    <!-- Create/Edit Configuration Modal -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                {{ configToEdit ? 'Edit Configuration' : 'Create New Configuration' }}
              </h3>
              <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <ConfigurationForm
              :configuration="configToEdit"
              :loading="formLoading"
              @submit="handleSubmitConfiguration"
              @cancel="closeCreateModal"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- View Configuration Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Configuration Details</h3>
              <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <ConfigurationView v-if="selectedConfiguration" :configuration="selectedConfiguration" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ConfigurationForm from '../components/ConfigurationForm.vue'
import ConfigurationView from '../components/ConfigurationView.vue'

// Interfaces
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

interface SetupStats {
  totalConfigurations: number
  activeSettings: number
  pendingSetup: number
  securityPolicies: number
}

// Mock data
const mockConfigurations: SystemConfiguration[] = [
  {
    id: '1',
    name: 'System Database Connection',
    description: 'Main database connection configuration',
    category: 'DATABASE',
    status: 'CONFIGURED',
    priority: 'CRITICAL',
    value: 'SAPDB01',
    defaultValue: 'localhost',
    dataType: 'string',
    lastUpdated: '2024-01-15T10:30:00Z',
    updatedBy: 'admin',
    isRequired: true,
    validationRules: { required: true, minLength: 3 }
  },
  {
    id: '2',
    name: 'Company Information',
    description: 'Basic company setup and information',
    category: 'COMPANY',
    status: 'CONFIGURED',
    priority: 'HIGH',
    value: 'Acme Corporation',
    defaultValue: 'Your Company Name',
    dataType: 'string',
    lastUpdated: '2024-01-14T09:15:00Z',
    updatedBy: 'setup_wizard',
    isRequired: true
  },
  {
    id: '3',
    name: 'User Session Timeout',
    description: 'Automatic user session timeout in minutes',
    category: 'SECURITY',
    status: 'PENDING',
    priority: 'MEDIUM',
    value: null,
    defaultValue: 30,
    dataType: 'number',
    lastUpdated: '2024-01-13T08:45:00Z',
    isRequired: false,
    validationRules: { min: 5, max: 480 }
  },
  {
    id: '4',
    name: 'Default Currency',
    description: 'System default currency for financial transactions',
    category: 'SYSTEM',
    status: 'CONFIGURED',
    priority: 'HIGH',
    value: 'USD',
    defaultValue: 'USD',
    dataType: 'string',
    lastUpdated: '2024-01-12T14:20:00Z',
    updatedBy: 'admin',
    isRequired: true
  },
  {
    id: '5',
    name: 'Email Integration',
    description: 'SMTP settings for email notifications',
    category: 'INTEGRATION',
    status: 'ERROR',
    priority: 'MEDIUM',
    value: null,
    defaultValue: null,
    dataType: 'object',
    lastUpdated: '2024-01-11T16:45:00Z',
    updatedBy: 'system_admin',
    isRequired: false
  }
]

const mockStats: SetupStats = {
  totalConfigurations: 48,
  activeSettings: 35,
  pendingSetup: 8,
  securityPolicies: 12
}

// Local state
const configurations = ref<SystemConfiguration[]>([...mockConfigurations])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<SetupStats>({ ...mockStats })
const formLoading = ref(false)

const showCreateModal = ref(false)
const showViewModal = ref(false)
const configToEdit = ref<SystemConfiguration | null>(null)
const selectedConfiguration = ref<SystemConfiguration | null>(null)

// Filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredConfigurations = computed(() => {
  let filtered = configurations.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(config =>
      config.name.toLowerCase().includes(query) ||
      config.description?.toLowerCase().includes(query) ||
      config.category.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(config => config.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(config => config.status === selectedStatus.value)
  }

  if (selectedPriority.value) {
    filtered = filtered.filter(config => config.priority === selectedPriority.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredConfigurations.value.length / pageSize.value))

// Methods
const loadConfigurations = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load configurations'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  configToEdit.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  configToEdit.value = null
}

const viewConfiguration = (config: SystemConfiguration) => {
  selectedConfiguration.value = config
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedConfiguration.value = null
}

const editConfiguration = (config: SystemConfiguration) => {
  configToEdit.value = config
  showCreateModal.value = true
}

const enableConfiguration = async (id: string) => {
  try {
    const config = configurations.value.find(c => c.id === id)
    if (config) {
      config.status = 'CONFIGURED'
      config.lastUpdated = new Date().toISOString()
      config.updatedBy = 'current_user'
      stats.value.activeSettings++
      stats.value.pendingSetup--
    }
  } catch (err) {
    console.error('Failed to enable configuration:', err)
  }
}

const disableConfiguration = async (id: string) => {
  if (confirm('Are you sure you want to disable this configuration?')) {
    try {
      const config = configurations.value.find(c => c.id === id)
      if (config) {
        config.status = 'DISABLED'
        config.lastUpdated = new Date().toISOString()
        config.updatedBy = 'current_user'
        stats.value.activeSettings--
      }
    } catch (err) {
      console.error('Failed to disable configuration:', err)
    }
  }
}

const deleteConfiguration = async (id: string) => {
  if (confirm('Are you sure you want to delete this configuration?')) {
    try {
      configurations.value = configurations.value.filter(c => c.id !== id)
      stats.value.totalConfigurations--
    } catch (err) {
      console.error('Failed to delete configuration:', err)
    }
  }
}

const handleSubmitConfiguration = async (configData: any) => {
  try {
    formLoading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (configToEdit.value) {
      // Update existing configuration
      const index = configurations.value.findIndex(c => c.id === configToEdit.value!.id)
      if (index !== -1) {
        configurations.value[index] = {
          ...configurations.value[index],
          ...configData,
          lastUpdated: new Date().toISOString(),
          updatedBy: 'current_user'
        }
      }
    } else {
      // Create new configuration
      const newConfig: SystemConfiguration = {
        id: Date.now().toString(),
        ...configData,
        status: 'PENDING',
        lastUpdated: new Date().toISOString(),
        updatedBy: 'current_user',
        isRequired: configData.isRequired || false
      }
      configurations.value.unshift(newConfig)
      stats.value.totalConfigurations++
      stats.value.pendingSetup++
    }
    
    closeCreateModal()
  } catch (err) {
    console.error('Failed to save configuration:', err)
  } finally {
    formLoading.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  selectedPriority.value = ''
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

// Lifecycle
onMounted(() => {
  loadConfigurations()
})
</script>