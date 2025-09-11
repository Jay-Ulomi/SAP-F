<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">System Utilities</h1>
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
        Add Utility Task
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Active Tasks</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeTasks || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Scheduled Tasks</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.scheduledTasks || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Database Size</p>
          <p class="text-2xl font-semibold text-gray-900">{{ formatFileSize(stats?.databaseSize || 0) }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Last Backup</p>
          <p class="text-2xl font-semibold text-gray-900">{{ formatTimeAgo(stats?.lastBackup) || 'Never' }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Utility Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-sap-blue hover:text-sap-dark-blue"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Tasks</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search utility tasks..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
          <select
            v-model="selectedType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="BACKUP">Backup</option>
            <option value="CLEANUP">Cleanup</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="ARCHIVE">Archive</option>
            <option value="OPTIMIZATION">Optimization</option>
            <option value="REPAIR">Repair</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="COMPLETED">Completed</option>
            <option value="RUNNING">Running</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="FAILED">Failed</option>
            <option value="PAUSED">Paused</option>
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

    <!-- Quick Actions Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          @click="executeQuickAction('backup')"
          :disabled="quickActionLoading"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-sap-blue hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 text-blue-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
            </svg>
            <span class="text-sm font-medium text-gray-900">Run Backup</span>
          </div>
        </button>
        
        <button
          @click="executeQuickAction('cleanup')"
          :disabled="quickActionLoading"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-sap-blue hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span class="text-sm font-medium text-gray-900">Cleanup Files</span>
          </div>
        </button>
        
        <button
          @click="executeQuickAction('optimize')"
          :disabled="quickActionLoading"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-sap-blue hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 text-purple-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span class="text-sm font-medium text-gray-900">Optimize DB</span>
          </div>
        </button>
        
        <button
          @click="executeQuickAction('maintenance')"
          :disabled="quickActionLoading"
          class="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-sap-blue hover:bg-blue-50 transition-colors disabled:opacity-50"
        >
          <div class="flex flex-col items-center">
            <svg class="w-8 h-8 text-orange-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="text-sm font-medium text-gray-900">Maintenance</span>
          </div>
        </button>
      </div>
    </div>

    <!-- Utility Tasks Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Utility Tasks</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading utility tasks...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Utility Tasks</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadTasks" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredTasks.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Utility Tasks Found</p>
        <p class="text-sm text-gray-600 mb-4">Create your first utility task to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Create Utility Task</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Task
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Progress
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Next Run
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="task in filteredTasks" :key="task.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-green-100': task.status === 'COMPLETED',
                        'bg-blue-100': task.status === 'RUNNING',
                        'bg-yellow-100': task.status === 'SCHEDULED',
                        'bg-red-100': task.status === 'FAILED',
                        'bg-gray-100': task.status === 'PAUSED'
                      }"
                    >
                      <svg 
                        class="w-5 h-5"
                        :class="{
                          'text-green-600': task.status === 'COMPLETED',
                          'text-blue-600': task.status === 'RUNNING',
                          'text-yellow-600': task.status === 'SCHEDULED',
                          'text-red-600': task.status === 'FAILED',
                          'text-gray-600': task.status === 'PAUSED'
                        }"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ task.name }}</div>
                    <div class="text-sm text-gray-500">{{ task.description || 'No description' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatType(task.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': task.status === 'COMPLETED',
                    'bg-blue-100 text-blue-800': task.status === 'RUNNING',
                    'bg-yellow-100 text-yellow-800': task.status === 'SCHEDULED',
                    'bg-red-100 text-red-800': task.status === 'FAILED',
                    'bg-gray-100 text-gray-800': task.status === 'PAUSED'
                  }"
                >
                  {{ formatStatus(task.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="bg-sap-blue h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${task.progress || 0}%` }"
                  ></div>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ task.progress || 0 }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ task.nextRun ? formatDate(task.nextRun) : 'Manual' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ task.duration || 'N/A' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewTask(task)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button @click="editTask(task)" class="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </button>
                  <button 
                    v-if="task.status === 'SCHEDULED' || task.status === 'PAUSED'"
                    @click="runTask(task.id)" 
                    class="text-green-600 hover:text-green-900"
                  >
                    Run
                  </button>
                  <button 
                    v-if="task.status === 'RUNNING'"
                    @click="pauseTask(task.id)" 
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Pause
                  </button>
                  <button @click="deleteTask(task.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredTasks.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredTasks.length) }}</span>
              of
              <span class="font-medium">{{ filteredTasks.length }}</span>
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

    <!-- Create/Edit Task Modal -->
    <div v-if="isCreateModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {{ taskToEdit ? 'Edit Utility Task' : 'Create New Utility Task' }}
            </h3>
            <button @click="closeCreateModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmitTask" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Task Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter task name"
                />
              </div>
              
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Task Type</label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Type</option>
                  <option value="BACKUP">Backup</option>
                  <option value="CLEANUP">Cleanup</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="ARCHIVE">Archive</option>
                  <option value="OPTIMIZATION">Optimization</option>
                  <option value="REPAIR">Repair</option>
                </select>
              </div>
              
              <div>
                <label for="priority" class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  id="priority"
                  v-model="formData.priority"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Priority</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
              
              <div>
                <label for="schedule" class="block text-sm font-medium text-gray-700 mb-2">Schedule (Cron)</label>
                <input
                  id="schedule"
                  v-model="formData.schedule"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="0 2 * * * (Daily at 2 AM)"
                />
              </div>
              
              <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter task description"
                ></textarea>
              </div>
              
              <div class="md:col-span-2">
                <label for="settings" class="block text-sm font-medium text-gray-700 mb-2">Task Settings (JSON)</label>
                <textarea
                  id="settings"
                  v-model="formData.settings"
                  rows="5"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm font-mono"
                  placeholder='{"timeout": 3600, "retries": 3}'
                ></textarea>
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
                {{ formLoading ? 'Saving...' : (taskToEdit ? 'Update Task' : 'Create Task') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Task Modal -->
    <div v-if="isViewModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Task Details</h3>
            <button @click="closeViewModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedTask" class="bg-white">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Task Name</dt>
                <dd class="text-sm font-semibold text-gray-900">{{ selectedTask.name }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Type</dt>
                <dd class="text-sm text-gray-900">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ formatType(selectedTask.type) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Status</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': selectedTask.status === 'COMPLETED',
                      'bg-blue-100 text-blue-800': selectedTask.status === 'RUNNING',
                      'bg-yellow-100 text-yellow-800': selectedTask.status === 'SCHEDULED',
                      'bg-red-100 text-red-800': selectedTask.status === 'FAILED',
                      'bg-gray-100 text-gray-800': selectedTask.status === 'PAUSED'
                    }"
                  >
                    {{ formatStatus(selectedTask.status) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Priority</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': selectedTask.priority === 'CRITICAL',
                      'bg-orange-100 text-orange-800': selectedTask.priority === 'HIGH',
                      'bg-yellow-100 text-yellow-800': selectedTask.priority === 'MEDIUM',
                      'bg-gray-100 text-gray-800': selectedTask.priority === 'LOW'
                    }"
                  >
                    {{ formatPriority(selectedTask.priority) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Progress</dt>
                <dd class="text-sm text-gray-900">{{ selectedTask.progress || 0 }}%</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Duration</dt>
                <dd class="text-sm text-gray-900">{{ selectedTask.duration || 'N/A' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Schedule</dt>
                <dd class="text-sm text-gray-900">{{ selectedTask.schedule || 'Manual' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Next Run</dt>
                <dd class="text-sm text-gray-900">{{ selectedTask.nextRun ? formatDate(selectedTask.nextRun) : 'Manual' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Last Run</dt>
                <dd class="text-sm text-gray-900">{{ selectedTask.lastRun ? formatDate(selectedTask.lastRun) : 'Never' }}</dd>
              </div>
            </div>
            
            <div v-if="selectedTask.description" class="mb-6">
              <h4 class="text-md font-medium text-gray-900 mb-2">Description</h4>
              <p class="text-sm text-gray-600">{{ selectedTask.description }}</p>
            </div>
            
            <div v-if="selectedTask.settings" class="mb-6">
              <h4 class="text-md font-medium text-gray-900 mb-2">Task Settings</h4>
              <pre class="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{{ JSON.stringify(JSON.parse(selectedTask.settings || '{}'), null, 2) }}</code></pre>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                @click="editTask(selectedTask)"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Edit Task
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
interface UtilityTask {
  id: string
  name: string
  description?: string
  type: string
  status: string
  priority: string
  progress?: number
  schedule?: string
  nextRun?: string
  lastRun?: string
  duration?: string
  settings?: string
  createdAt: string
}

interface UtilityStats {
  activeTasks: number
  scheduledTasks: number
  databaseSize: number
  lastBackup?: string
}

// Mock data
const mockTasks: UtilityTask[] = [
  {
    id: '1',
    name: 'Database Backup',
    description: 'Full database backup with compression',
    type: 'BACKUP',
    status: 'SCHEDULED',
    priority: 'CRITICAL',
    progress: 0,
    schedule: '0 2 * * *',
    nextRun: '2024-01-16T02:00:00Z',
    lastRun: '2024-01-15T02:00:00Z',
    duration: '1h 23m',
    settings: '{"compression": true, "verify": true}',
    createdAt: '2023-12-01T09:00:00Z'
  },
  {
    id: '2',
    name: 'Log Cleanup',
    description: 'Clean up old log files and archives',
    type: 'CLEANUP',
    status: 'RUNNING',
    priority: 'MEDIUM',
    progress: 65,
    schedule: '0 1 * * 0',
    lastRun: '2024-01-15T10:00:00Z',
    duration: '45m',
    settings: '{"retention_days": 30, "compress_old": true}',
    createdAt: '2023-11-15T08:30:00Z'
  },
  {
    id: '3',
    name: 'Index Optimization',
    description: 'Optimize database indexes for better performance',
    type: 'OPTIMIZATION',
    status: 'COMPLETED',
    priority: 'HIGH',
    progress: 100,
    lastRun: '2024-01-14T03:00:00Z',
    duration: '2h 15m',
    settings: '{"analyze_stats": true, "rebuild_fragmented": true}',
    createdAt: '2023-10-20T11:15:00Z'
  },
  {
    id: '4',
    name: 'Data Archive',
    description: 'Archive old transaction data',
    type: 'ARCHIVE',
    status: 'FAILED',
    priority: 'MEDIUM',
    progress: 25,
    schedule: '0 0 1 * *',
    lastRun: '2024-01-13T05:00:00Z',
    settings: '{"archive_age_months": 12, "compression": true}',
    createdAt: '2023-09-10T13:45:00Z'
  },
  {
    id: '5',
    name: 'System Health Check',
    description: 'Comprehensive system health and performance check',
    type: 'MAINTENANCE',
    status: 'PAUSED',
    priority: 'LOW',
    progress: 0,
    schedule: '0 6 * * 1',
    settings: '{"check_disk_space": true, "check_connections": true}',
    createdAt: '2023-08-15T10:00:00Z'
  }
]

const mockStats: UtilityStats = {
  activeTasks: 12,
  scheduledTasks: 8,
  databaseSize: 2.5 * 1024 * 1024 * 1024, // 2.5 GB in bytes
  lastBackup: '2024-01-15T02:00:00Z'
}

// Local state
const tasks = ref<UtilityTask[]>([...mockTasks])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<UtilityStats>({ ...mockStats })
const formLoading = ref(false)
const quickActionLoading = ref(false)

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const taskToEdit = ref<UtilityTask | null>(null)
const selectedTask = ref<UtilityTask | null>(null)
const formData = ref<Partial<UtilityTask>>({})

// Filter state
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredTasks = computed(() => {
  let filtered = tasks.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(task =>
      task.name.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query) ||
      task.type.toLowerCase().includes(query)
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(task => task.type === selectedType.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(task => task.status === selectedStatus.value)
  }

  if (selectedPriority.value) {
    filtered = filtered.filter(task => task.priority === selectedPriority.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTasks.value.length / pageSize.value))

// Methods
const loadTasks = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load utility tasks'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  taskToEdit.value = null
  formData.value = {
    name: '',
    description: '',
    type: '',
    priority: '',
    schedule: '',
    settings: ''
  }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  taskToEdit.value = null
  formData.value = {}
}

const viewTask = (task: UtilityTask) => {
  selectedTask.value = task
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedTask.value = null
}

const editTask = (task: UtilityTask) => {
  taskToEdit.value = task
  formData.value = { ...task }
  isCreateModalOpen.value = true
}

const runTask = async (id: string) => {
  try {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = 'RUNNING'
      task.progress = 0
      task.lastRun = new Date().toISOString()
      // Simulate task execution
      const interval = setInterval(() => {
        task.progress = Math.min((task.progress || 0) + 10, 100)
        if (task.progress >= 100) {
          task.status = 'COMPLETED'
          clearInterval(interval)
        }
      }, 1000)
    }
  } catch (err) {
    console.error('Failed to run task:', err)
  }
}

const pauseTask = async (id: string) => {
  try {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.status = 'PAUSED'
    }
  } catch (err) {
    console.error('Failed to pause task:', err)
  }
}

const deleteTask = async (id: string) => {
  if (confirm('Are you sure you want to delete this utility task?')) {
    try {
      tasks.value = tasks.value.filter(t => t.id !== id)
      stats.value.activeTasks--
    } catch (err) {
      console.error('Failed to delete task:', err)
    }
  }
}

const executeQuickAction = async (action: string) => {
  try {
    quickActionLoading.value = true
    
    const actionNames = {
      backup: 'Quick Database Backup',
      cleanup: 'System Cleanup',
      optimize: 'Database Optimization',
      maintenance: 'System Maintenance'
    }
    
    const newTask: UtilityTask = {
      id: Date.now().toString(),
      name: actionNames[action as keyof typeof actionNames],
      description: `Quick ${action} task`,
      type: action.toUpperCase(),
      status: 'RUNNING',
      priority: 'HIGH',
      progress: 0,
      createdAt: new Date().toISOString(),
      lastRun: new Date().toISOString()
    }
    
    tasks.value.unshift(newTask)
    stats.value.activeTasks++
    
    // Simulate quick action execution
    const interval = setInterval(() => {
      newTask.progress = Math.min((newTask.progress || 0) + 20, 100)
      if (newTask.progress >= 100) {
        newTask.status = 'COMPLETED'
        newTask.duration = '2m 30s'
        clearInterval(interval)
      }
    }, 500)
    
  } catch (error) {
    console.error('Failed to execute quick action:', error)
  } finally {
    quickActionLoading.value = false
  }
}

const handleSubmitTask = async () => {
  try {
    formLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (taskToEdit.value) {
      // Update existing task
      const index = tasks.value.findIndex(t => t.id === taskToEdit.value!.id)
      if (index !== -1) {
        tasks.value[index] = {
          ...tasks.value[index],
          ...formData.value
        }
      }
    } else {
      // Create new task
      const newTask: UtilityTask = {
        id: Date.now().toString(),
        name: formData.value.name || '',
        description: formData.value.description,
        type: formData.value.type || '',
        status: 'SCHEDULED',
        priority: formData.value.priority || '',
        progress: 0,
        schedule: formData.value.schedule,
        settings: formData.value.settings,
        createdAt: new Date().toISOString()
      }
      tasks.value.unshift(newTask)
      stats.value.activeTasks++
      if (newTask.schedule) {
        stats.value.scheduledTasks++
      }
    }
    
    closeCreateModal()
  } catch (error) {
    console.error('Failed to save task:', error)
  } finally {
    formLoading.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
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

const formatTimeAgo = (dateString?: string): string => {
  if (!dateString) return 'Never'
  
  const now = new Date()
  const date = new Date(dateString)
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
  
  if (diffInHours < 1) return 'Just now'
  if (diffInHours < 24) return `${diffInHours}h ago`
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

const formatType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'BACKUP': 'Backup',
    'CLEANUP': 'Cleanup',
    'MAINTENANCE': 'Maintenance',
    'ARCHIVE': 'Archive',
    'OPTIMIZATION': 'Optimization',
    'REPAIR': 'Repair'
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'COMPLETED': 'Completed',
    'RUNNING': 'Running',
    'SCHEDULED': 'Scheduled',
    'FAILED': 'Failed',
    'PAUSED': 'Paused'
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
  loadTasks()
})
</script>