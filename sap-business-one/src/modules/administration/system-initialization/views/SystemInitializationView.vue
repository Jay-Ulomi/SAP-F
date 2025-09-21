<template>
  <div class="p-4 lg:p-6 bg-gray-50 min-h-screen max-w-full overflow-hidden">
    <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">System Initialization</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue w-full sm:w-auto"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
        Initialize Component
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-6">
      <div class="bg-white shadow rounded-lg p-4 sm:p-5 flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-medium text-gray-500">System Status</p>
          <p class="text-xl sm:text-2xl font-semibold text-gray-900 truncate">{{ stats?.systemStatus || 'Ready' }}</p>
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-md flex items-center justify-center flex-shrink-0 ml-3">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-4 sm:p-5 flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-medium text-gray-500">Database Status</p>
          <p class="text-xl sm:text-2xl font-semibold text-gray-900 truncate">{{ stats?.databaseStatus || 'Connected' }}</p>
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0 ml-3">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-4 sm:p-5 flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-medium text-gray-500">Initialized Components</p>
          <p class="text-xl sm:text-2xl font-semibold text-gray-900">{{ stats?.initializedComponents || 0 }}</p>
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-md flex items-center justify-center flex-shrink-0 ml-3">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-4 sm:p-5 flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <p class="text-xs sm:text-sm font-medium text-gray-500">Pending Setup</p>
          <p class="text-xl sm:text-2xl font-semibold text-gray-900">{{ stats?.pendingSetup || 0 }}</p>
        </div>
        <div class="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-md flex items-center justify-center flex-shrink-0 ml-3">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white shadow rounded-lg p-4 lg:p-6 mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h3 class="text-base sm:text-lg font-medium text-gray-900">Initialization Filters</h3>
        <button
          @click="clearFilters"
          class="text-xs sm:text-sm text-sap-blue hover:text-sap-dark-blue self-start sm:self-auto"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4">
        <div class="sm:col-span-2 xl:col-span-1">
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Search Components</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search components..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
          />
        </div>
        
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Component Type</label>
          <select
            v-model="selectedType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
          >
            <option value="">All Types</option>
            <option value="DATABASE">Database</option>
            <option value="SECURITY">Security</option>
            <option value="COMMUNICATION">Communication</option>
            <option value="INTEGRATION">Integration</option>
            <option value="MAINTENANCE">Maintenance</option>
            <option value="REPORTING">Reporting</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
          >
            <option value="">All Statuses</option>
            <option value="INITIALIZED">Initialized</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
            <option value="IN_PROGRESS">In Progress</option>
          </select>
        </div>
        
        <div>
          <label class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Priority</label>
          <select
            v-model="selectedPriority"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
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

    <!-- System Components Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden max-w-full">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">System Components</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading system components...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Components</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadComponents" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredComponents.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Components Found</p>
        <p class="text-sm text-gray-600 mb-4">Initialize your first system component to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Initialize Component</button>
      </div>

      <div v-else class="w-full overflow-x-auto">
        <table class="w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                Component
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden sm:table-cell">
                Type
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">
                Last Init
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">
                Version
              </th>
              <th class="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="component in filteredComponents" :key="component.id" class="hover:bg-gray-50">
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                    <div
                      class="h-8 w-8 sm:h-10 sm:w-10 rounded-full flex items-center justify-center"
                      :class="{
                        'bg-green-100': component.status === 'INITIALIZED',
                        'bg-yellow-100': component.status === 'PENDING',
                        'bg-red-100': component.status === 'FAILED',
                        'bg-blue-100': component.status === 'IN_PROGRESS'
                      }"
                    >
                      <svg 
                        class="w-5 h-5"
                        :class="{
                          'text-green-600': component.status === 'INITIALIZED',
                          'text-yellow-600': component.status === 'PENDING',
                          'text-red-600': component.status === 'FAILED',
                          'text-blue-600': component.status === 'IN_PROGRESS'
                        }"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-3">
                    <div class="text-xs sm:text-sm font-medium text-gray-900">{{ component.name }}</div>
                    <div class="text-xs text-gray-500 hidden lg:block">{{ component.description || 'No description' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap hidden sm:table-cell">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatType(component.type) }}
                </span>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': component.status === 'INITIALIZED',
                    'bg-yellow-100 text-yellow-800': component.status === 'PENDING',
                    'bg-red-100 text-red-800': component.status === 'FAILED',
                    'bg-blue-100 text-blue-800': component.status === 'IN_PROGRESS'
                  }"
                >
                  {{ formatStatus(component.status) }}
                </span>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-red-100 text-red-800': component.priority === 'CRITICAL',
                    'bg-orange-100 text-orange-800': component.priority === 'HIGH',
                    'bg-yellow-100 text-yellow-800': component.priority === 'MEDIUM',
                    'bg-gray-100 text-gray-800': component.priority === 'LOW'
                  }"
                >
                  {{ formatPriority(component.priority) }}
                </span>
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden lg:table-cell">
                {{ component.lastInitialized ? formatDate(component.lastInitialized) : 'Never' }}
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-xs sm:text-sm text-gray-900 hidden md:table-cell">
                {{ component.version || 'N/A' }}
              </td>
              <td class="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm font-medium">
                <div class="flex flex-wrap gap-1">
                  <button @click="viewComponent(component)" class="text-sap-blue hover:text-sap-dark-blue text-xs px-1">
                    View
                  </button>
                  <button @click="editComponent(component)" class="text-indigo-600 hover:text-indigo-900 text-xs px-1">
                    Edit
                  </button>
                  <button 
                    v-if="component.status !== 'INITIALIZED'"
                    @click="initializeComponent(component.id)" 
                    class="text-green-600 hover:text-green-900 text-xs px-1"
                  >
                    Initialize
                  </button>
                  <button 
                    v-if="component.status === 'INITIALIZED'"
                    @click="reinitializeComponent(component.id)" 
                    class="text-yellow-600 hover:text-yellow-900 text-xs px-1"
                  >
                    Reinitialize
                  </button>
                  <button @click="deleteComponent(component.id)" class="text-red-600 hover:text-red-900 text-xs px-1">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredComponents.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredComponents.length) }}</span>
              of
              <span class="font-medium">{{ filteredComponents.length }}</span>
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

    <!-- Create/Edit Component Modal -->
    <div v-if="isCreateModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-2 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-3 pt-4 pb-3 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 w-full max-w-full">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {{ componentToEdit ? 'Edit Component' : 'Create New Component' }}
            </h3>
            <button @click="closeCreateModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmitComponent" class="space-y-4 sm:space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label for="name" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Component Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
                  placeholder="Enter component name"
                />
              </div>
              
              <div>
                <label for="type" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Component Type</label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
                >
                  <option value="">Select Type</option>
                  <option value="DATABASE">Database</option>
                  <option value="SECURITY">Security</option>
                  <option value="COMMUNICATION">Communication</option>
                  <option value="INTEGRATION">Integration</option>
                  <option value="MAINTENANCE">Maintenance</option>
                  <option value="REPORTING">Reporting</option>
                </select>
              </div>
              
              <div>
                <label for="priority" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Priority</label>
                <select
                  id="priority"
                  v-model="formData.priority"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
                >
                  <option value="">Select Priority</option>
                  <option value="CRITICAL">Critical</option>
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>
              
              <div>
                <label for="version" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Version</label>
                <input
                  id="version"
                  v-model="formData.version"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
                  placeholder="Enter version"
                />
              </div>
              
              <div class="md:col-span-2">
                <label for="description" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm px-3 py-2"
                  placeholder="Enter component description"
                ></textarea>
              </div>
              
              <div class="md:col-span-2">
                <label for="configuration" class="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Configuration (JSON)</label>
                <textarea
                  id="configuration"
                  v-model="formData.configuration"
                  rows="5"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm font-mono"
                  placeholder='{"key": "value", "enabled": true}'
                ></textarea>
              </div>
            </div>
            
            <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-0 sm:space-x-3 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                type="button"
                @click="closeCreateModal"
                class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="formLoading"
                class="w-full sm:w-auto inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg v-if="formLoading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ formLoading ? 'Saving...' : (componentToEdit ? 'Update Component' : 'Create Component') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Component Modal -->
    <div v-if="isViewModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-2 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-3 pt-4 pb-3 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6 w-full max-w-full">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Component Details</h3>
            <button @click="closeViewModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedComponent" class="bg-white">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Component Name</dt>
                <dd class="text-sm font-semibold text-gray-900">{{ selectedComponent.name }}</dd>
              </div>
              
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Type</dt>
                <dd class="text-sm text-gray-900">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ formatType(selectedComponent.type) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Status</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': selectedComponent.status === 'INITIALIZED',
                      'bg-yellow-100 text-yellow-800': selectedComponent.status === 'PENDING',
                      'bg-red-100 text-red-800': selectedComponent.status === 'FAILED',
                      'bg-blue-100 text-blue-800': selectedComponent.status === 'IN_PROGRESS'
                    }"
                  >
                    {{ formatStatus(selectedComponent.status) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Priority</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-red-100 text-red-800': selectedComponent.priority === 'CRITICAL',
                      'bg-orange-100 text-orange-800': selectedComponent.priority === 'HIGH',
                      'bg-yellow-100 text-yellow-800': selectedComponent.priority === 'MEDIUM',
                      'bg-gray-100 text-gray-800': selectedComponent.priority === 'LOW'
                    }"
                  >
                    {{ formatPriority(selectedComponent.priority) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Version</dt>
                <dd class="text-sm text-gray-900">{{ selectedComponent.version || 'N/A' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Last Initialized</dt>
                <dd class="text-sm text-gray-900">{{ selectedComponent.lastInitialized ? formatDate(selectedComponent.lastInitialized) : 'Never' }}</dd>
              </div>
            </div>
            
            <div v-if="selectedComponent.description" class="mb-6">
              <h4 class="text-md font-medium text-gray-900 mb-2">Description</h4>
              <p class="text-sm text-gray-600">{{ selectedComponent.description }}</p>
            </div>
            
            <div v-if="selectedComponent.configuration" class="mb-6">
              <h4 class="text-md font-medium text-gray-900 mb-2">Configuration</h4>
              <pre class="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto"><code>{{ JSON.stringify(JSON.parse(selectedComponent.configuration || '{}'), null, 2) }}</code></pre>
            </div>
            
            <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-0 sm:space-x-3 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
              <button
                @click="editComponent(selectedComponent)"
                class="w-full sm:w-auto inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
              >
                Edit Component
              </button>
              <button
                @click="closeViewModal"
                class="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
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
interface SystemComponent {
  id: string
  name: string
  description?: string
  type: string
  status: string
  priority: string
  version?: string
  lastInitialized?: string
  configuration?: string
  createdAt: string
}

interface SystemStats {
  systemStatus: string
  databaseStatus: string
  initializedComponents: number
  pendingSetup: number
}

// Mock data
const mockComponents: SystemComponent[] = [
  {
    id: '1',
    name: 'Company Database',
    description: 'Main company database configuration and connection',
    type: 'DATABASE',
    status: 'INITIALIZED',
    priority: 'CRITICAL',
    version: '2.1.0',
    lastInitialized: '2024-01-15T10:30:00Z',
    createdAt: '2023-12-01T09:00:00Z',
    configuration: '{"server": "SAPDB01", "port": 1433, "timeout": 30000}'
  },
  {
    id: '2',
    name: 'User Authentication',
    description: 'User authentication and authorization system',
    type: 'SECURITY',
    status: 'INITIALIZED',
    priority: 'CRITICAL',
    version: '1.5.2',
    lastInitialized: '2024-01-14T14:20:00Z',
    createdAt: '2023-11-15T08:30:00Z',
    configuration: '{"ldap_enabled": true, "session_timeout": 3600}'
  },
  {
    id: '3',
    name: 'Email Notifications',
    description: 'SMTP server configuration for system notifications',
    type: 'COMMUNICATION',
    status: 'FAILED',
    priority: 'HIGH',
    version: '1.2.1',
    lastInitialized: '2024-01-10T16:45:00Z',
    createdAt: '2023-10-20T11:15:00Z',
    configuration: '{"smtp_server": "mail.company.com", "port": 587}'
  },
  {
    id: '4',
    name: 'Backup Scheduler',
    description: 'Automated backup and maintenance routines',
    type: 'MAINTENANCE',
    status: 'PENDING',
    priority: 'MEDIUM',
    version: '1.0.3',
    createdAt: '2023-09-10T13:45:00Z',
    configuration: '{"schedule": "0 2 * * *", "retention_days": 30}'
  },
  {
    id: '5',
    name: 'SAP Integration',
    description: 'Integration layer for SAP Business One API',
    type: 'INTEGRATION',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    version: '3.0.0',
    createdAt: '2023-08-15T10:00:00Z',
    configuration: '{"api_version": "10.0", "timeout": 60000}'
  }
]

const mockStats: SystemStats = {
  systemStatus: 'Operational',
  databaseStatus: 'Connected',
  initializedComponents: 15,
  pendingSetup: 3
}

// Local state
const components = ref<SystemComponent[]>([...mockComponents])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<SystemStats>({ ...mockStats })
const formLoading = ref(false)

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const componentToEdit = ref<SystemComponent | null>(null)
const selectedComponent = ref<SystemComponent | null>(null)
const formData = ref<Partial<SystemComponent>>({})

// Filter state
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedPriority = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredComponents = computed(() => {
  let filtered = components.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(component =>
      component.name.toLowerCase().includes(query) ||
      component.description?.toLowerCase().includes(query) ||
      component.type.toLowerCase().includes(query)
    )
  }

  if (selectedType.value) {
    filtered = filtered.filter(component => component.type === selectedType.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(component => component.status === selectedStatus.value)
  }

  if (selectedPriority.value) {
    filtered = filtered.filter(component => component.priority === selectedPriority.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredComponents.value.length / pageSize.value))

// Methods
const loadComponents = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load system components'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  componentToEdit.value = null
  formData.value = {
    name: '',
    description: '',
    type: '',
    priority: '',
    version: '',
    configuration: ''
  }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  componentToEdit.value = null
  formData.value = {}
}

const viewComponent = (component: SystemComponent) => {
  selectedComponent.value = component
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedComponent.value = null
}

const editComponent = (component: SystemComponent) => {
  componentToEdit.value = component
  formData.value = { ...component }
  isCreateModalOpen.value = true
}

const initializeComponent = async (id: string) => {
  try {
    const component = components.value.find(c => c.id === id)
    if (component) {
      component.status = 'IN_PROGRESS'
      // Simulate initialization
      setTimeout(() => {
        component.status = 'INITIALIZED'
        component.lastInitialized = new Date().toISOString()
        stats.value.initializedComponents++
        stats.value.pendingSetup--
      }, 2000)
    }
  } catch (err) {
    console.error('Failed to initialize component:', err)
  }
}

const reinitializeComponent = async (id: string) => {
  if (confirm('Are you sure you want to reinitialize this component?')) {
    try {
      const component = components.value.find(c => c.id === id)
      if (component) {
        component.status = 'IN_PROGRESS'
        // Simulate reinitialization
        setTimeout(() => {
          component.status = 'INITIALIZED'
          component.lastInitialized = new Date().toISOString()
        }, 2000)
      }
    } catch (err) {
      console.error('Failed to reinitialize component:', err)
    }
  }
}

const deleteComponent = async (id: string) => {
  if (confirm('Are you sure you want to delete this component?')) {
    try {
      components.value = components.value.filter(c => c.id !== id)
      stats.value.initializedComponents--
    } catch (err) {
      console.error('Failed to delete component:', err)
    }
  }
}

const handleSubmitComponent = async () => {
  try {
    formLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (componentToEdit.value) {
      // Update existing component
      const index = components.value.findIndex(c => c.id === componentToEdit.value!.id)
      if (index !== -1) {
        components.value[index] = {
          ...components.value[index],
          ...formData.value
        }
      }
    } else {
      // Create new component
      const newComponent: SystemComponent = {
        id: Date.now().toString(),
        name: formData.value.name || '',
        description: formData.value.description,
        type: formData.value.type || '',
        status: 'PENDING',
        priority: formData.value.priority || '',
        version: formData.value.version,
        configuration: formData.value.configuration,
        createdAt: new Date().toISOString()
      }
      components.value.unshift(newComponent)
      stats.value.pendingSetup++
    }
    
    closeCreateModal()
  } catch (error) {
    console.error('Failed to save component:', error)
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

const formatType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'DATABASE': 'Database',
    'SECURITY': 'Security',
    'COMMUNICATION': 'Communication',
    'INTEGRATION': 'Integration',
    'MAINTENANCE': 'Maintenance',
    'REPORTING': 'Reporting'
  }
  return typeMap[type] || type
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'INITIALIZED': 'Initialized',
    'PENDING': 'Pending',
    'FAILED': 'Failed',
    'IN_PROGRESS': 'In Progress'
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
  loadComponents()
})
</script>