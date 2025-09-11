<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Add-Ons Management</h1>
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
        Install Add-On
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Installed Add-Ons</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.installedAddons || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Active Add-Ons</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeAddons || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Updates Available</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.updatesAvailable || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Total Cost</p>
          <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats?.totalCost || 0) }}</p>
        </div>
        <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters Section -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-medium text-gray-900">Add-On Filters</h3>
        <button
          @click="clearFilters"
          class="text-sm text-sap-blue hover:text-sap-dark-blue"
        >
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Add-Ons</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search add-ons..."
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
            <option value="INTEGRATION">Integration</option>
            <option value="REPORTING">Reporting</option>
            <option value="PRODUCTIVITY">Productivity</option>
            <option value="FINANCE">Finance</option>
            <option value="INVENTORY">Inventory</option>
            <option value="CRM">CRM</option>
            <option value="ANALYTICS">Analytics</option>
            <option value="UTILITIES">Utilities</option>
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
            <option value="INSTALLED">Installed</option>
            <option value="AVAILABLE">Available</option>
            <option value="ERROR">Error</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">License Type</label>
          <select
            v-model="selectedLicenseType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
            <option value="TRIAL">Trial</option>
            <option value="SUBSCRIPTION">Subscription</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Add-Ons Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Add-On Management</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading add-ons...
        </div>
      </div>

      <div v-else-if="error" class="p-6 text-center">
        <div class="text-red-600 mb-4">
          <svg class="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <p class="text-lg font-medium">Error Loading Add-Ons</p>
          <p class="text-sm text-gray-600 mt-2">{{ error }}</p>
        </div>
        <button @click="loadAddons" class="btn-primary">Try Again</button>
      </div>

      <div v-else-if="filteredAddons.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Add-Ons Found</p>
        <p class="text-sm text-gray-600 mb-4">Install your first add-on to enhance your SAP Business One experience.</p>
        <button @click="openCreateModal" class="btn-primary">Install Add-On</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Add-On
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Version
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                License
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="addon in filteredAddons" :key="addon.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-lg flex items-center justify-center text-white font-medium text-sm"
                      :style="{ backgroundColor: addon.iconColor || '#3B82F6' }"
                    >
                      {{ addon.name.charAt(0) }}{{ addon.name.split(' ')[1]?.charAt(0) || '' }}
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ addon.name }}</div>
                    <div class="text-sm text-gray-500">{{ addon.developer || 'Unknown Developer' }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatCategory(addon.category) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': addon.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': addon.status === 'INACTIVE',
                    'bg-blue-100 text-blue-800': addon.status === 'INSTALLED',
                    'bg-yellow-100 text-yellow-800': addon.status === 'AVAILABLE',
                    'bg-red-100 text-red-800': addon.status === 'ERROR'
                  }"
                >
                  {{ formatStatus(addon.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ addon.version || 'N/A' }}
                <div v-if="addon.updateAvailable" class="text-xs text-orange-600">
                  Update to {{ addon.latestVersion }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': addon.licenseType === 'FREE',
                    'bg-purple-100 text-purple-800': addon.licenseType === 'PAID',
                    'bg-yellow-100 text-yellow-800': addon.licenseType === 'TRIAL',
                    'bg-blue-100 text-blue-800': addon.licenseType === 'SUBSCRIPTION'
                  }"
                >
                  {{ formatLicenseType(addon.licenseType) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ addon.cost ? formatCurrency(addon.cost) : 'Free' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewAddon(addon)" class="text-sap-blue hover:text-sap-dark-blue">
                    View
                  </button>
                  <button 
                    v-if="addon.status === 'INACTIVE'"
                    @click="activateAddon(addon.id)" 
                    class="text-green-600 hover:text-green-900"
                  >
                    Activate
                  </button>
                  <button 
                    v-else-if="addon.status === 'ACTIVE'"
                    @click="deactivateAddon(addon.id)" 
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Deactivate
                  </button>
                  <button 
                    v-if="addon.status === 'AVAILABLE'"
                    @click="installAddon(addon.id)" 
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Install
                  </button>
                  <button 
                    v-if="addon.updateAvailable"
                    @click="updateAddon(addon.id)" 
                    class="text-orange-600 hover:text-orange-900"
                  >
                    Update
                  </button>
                  <button 
                    v-if="addon.status !== 'AVAILABLE'"
                    @click="uninstallAddon(addon.id)" 
                    class="text-red-600 hover:text-red-900"
                  >
                    Uninstall
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredAddons.length > 0" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
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
              <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredAddons.length) }}</span>
              of
              <span class="font-medium">{{ filteredAddons.length }}</span>
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

    <!-- Install Add-On Modal -->
    <div v-if="isCreateModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Install New Add-On
            </h3>
            <button @click="closeCreateModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <form @submit.prevent="handleInstallAddon" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Add-On Name</label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter add-on name"
                />
              </div>
              
              <div>
                <label for="developer" class="block text-sm font-medium text-gray-700 mb-2">Developer</label>
                <input
                  id="developer"
                  v-model="formData.developer"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter developer name"
                />
              </div>
              
              <div>
                <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  id="category"
                  v-model="formData.category"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select Category</option>
                  <option value="INTEGRATION">Integration</option>
                  <option value="REPORTING">Reporting</option>
                  <option value="PRODUCTIVITY">Productivity</option>
                  <option value="FINANCE">Finance</option>
                  <option value="INVENTORY">Inventory</option>
                  <option value="CRM">CRM</option>
                  <option value="ANALYTICS">Analytics</option>
                  <option value="UTILITIES">Utilities</option>
                </select>
              </div>
              
              <div>
                <label for="version" class="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  id="version"
                  v-model="formData.version"
                  type="text"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="e.g., 1.0.0"
                />
              </div>
              
              <div>
                <label for="licenseType" class="block text-sm font-medium text-gray-700 mb-2">License Type</label>
                <select
                  id="licenseType"
                  v-model="formData.licenseType"
                  required
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                >
                  <option value="">Select License Type</option>
                  <option value="FREE">Free</option>
                  <option value="PAID">Paid</option>
                  <option value="TRIAL">Trial</option>
                  <option value="SUBSCRIPTION">Subscription</option>
                </select>
              </div>
              
              <div>
                <label for="cost" class="block text-sm font-medium text-gray-700 mb-2">Cost ($)</label>
                <input
                  id="cost"
                  v-model.number="formData.cost"
                  type="number"
                  min="0"
                  step="0.01"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter cost (0 for free)"
                />
              </div>
              
              <div>
                <label for="iconColor" class="block text-sm font-medium text-gray-700 mb-2">Icon Color</label>
                <input
                  id="iconColor"
                  v-model="formData.iconColor"
                  type="color"
                  class="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue"
                />
              </div>
              
              <div class="md:col-span-2">
                <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  id="description"
                  v-model="formData.description"
                  rows="3"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                  placeholder="Enter add-on description"
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
                {{ formLoading ? 'Installing...' : 'Install Add-On' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- View Add-On Modal -->
    <div v-if="isViewModalOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full sm:p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900">Add-On Details</h3>
            <button @click="closeViewModal" type="button" class="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none">
              <span class="sr-only">Close</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div v-if="selectedAddon" class="bg-white">
            <div class="flex items-start space-x-6 mb-6">
              <div
                class="w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                :style="{ backgroundColor: selectedAddon.iconColor || '#3B82F6' }"
              >
                {{ selectedAddon.name.charAt(0) }}{{ selectedAddon.name.split(' ')[1]?.charAt(0) || '' }}
              </div>
              <div class="flex-1">
                <h4 class="text-2xl font-bold text-gray-900">{{ selectedAddon.name }}</h4>
                <p class="text-gray-600">by {{ selectedAddon.developer || 'Unknown Developer' }}</p>
                <div class="flex items-center space-x-4 mt-2">
                  <span
                    class="inline-flex px-3 py-1 text-sm font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': selectedAddon.status === 'ACTIVE',
                      'bg-gray-100 text-gray-800': selectedAddon.status === 'INACTIVE',
                      'bg-blue-100 text-blue-800': selectedAddon.status === 'INSTALLED',
                      'bg-yellow-100 text-yellow-800': selectedAddon.status === 'AVAILABLE',
                      'bg-red-100 text-red-800': selectedAddon.status === 'ERROR'
                    }"
                  >
                    {{ formatStatus(selectedAddon.status) }}
                  </span>
                  <span class="text-gray-500">Version {{ selectedAddon.version }}</span>
                </div>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Category</dt>
                <dd class="text-sm text-gray-900">
                  <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {{ formatCategory(selectedAddon.category) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">License Type</dt>
                <dd class="text-sm text-gray-900">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': selectedAddon.licenseType === 'FREE',
                      'bg-purple-100 text-purple-800': selectedAddon.licenseType === 'PAID',
                      'bg-yellow-100 text-yellow-800': selectedAddon.licenseType === 'TRIAL',
                      'bg-blue-100 text-blue-800': selectedAddon.licenseType === 'SUBSCRIPTION'
                    }"
                  >
                    {{ formatLicenseType(selectedAddon.licenseType) }}
                  </span>
                </dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Cost</dt>
                <dd class="text-sm font-semibold text-gray-900">{{ selectedAddon.cost ? formatCurrency(selectedAddon.cost) : 'Free' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Installation Date</dt>
                <dd class="text-sm text-gray-900">{{ selectedAddon.installDate ? formatDate(selectedAddon.installDate) : 'Not installed' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Last Updated</dt>
                <dd class="text-sm text-gray-900">{{ selectedAddon.lastUpdated ? formatDate(selectedAddon.lastUpdated) : 'Never' }}</dd>
              </div>
              
              <div class="bg-gray-50 p-4 rounded-lg">
                <dt class="text-sm font-medium text-gray-500 mb-1">Update Available</dt>
                <dd class="text-sm text-gray-900">
                  {{ selectedAddon.updateAvailable ? `Yes (${selectedAddon.latestVersion})` : 'No' }}
                </dd>
              </div>
            </div>
            
            <div v-if="selectedAddon.description" class="mb-6">
              <h5 class="text-md font-medium text-gray-900 mb-2">Description</h5>
              <p class="text-sm text-gray-600">{{ selectedAddon.description }}</p>
            </div>
            
            <div class="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
              <button
                v-if="selectedAddon.status === 'INACTIVE'"
                @click="activateAddon(selectedAddon.id)"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Activate Add-On
              </button>
              <button
                v-else-if="selectedAddon.status === 'ACTIVE'"
                @click="deactivateAddon(selectedAddon.id)"
                class="inline-flex justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Deactivate Add-On
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
interface Addon {
  id: string
  name: string
  developer?: string
  description?: string
  category: string
  status: string
  version?: string
  latestVersion?: string
  updateAvailable?: boolean
  licenseType: string
  cost?: number
  iconColor?: string
  installDate?: string
  lastUpdated?: string
  createdAt: string
}

interface AddonStats {
  installedAddons: number
  activeAddons: number
  updatesAvailable: number
  totalCost: number
}

// Mock data
const mockAddons: Addon[] = [
  {
    id: '1',
    name: 'Crystal Reports Integration',
    developer: 'SAP',
    description: 'Advanced reporting and analytics integration for SAP Business One',
    category: 'REPORTING',
    status: 'ACTIVE',
    version: '2.1.0',
    licenseType: 'PAID',
    cost: 2500,
    iconColor: '#8B5CF6',
    installDate: '2024-01-15T10:30:00Z',
    lastUpdated: '2024-01-10T14:20:00Z',
    createdAt: '2023-12-01T09:00:00Z'
  },
  {
    id: '2',
    name: 'Magento E-Commerce Connector',
    developer: 'Third Party Solutions',
    description: 'Seamless integration between SAP B1 and Magento e-commerce platform',
    category: 'INTEGRATION',
    status: 'ACTIVE',
    version: '1.8.3',
    latestVersion: '1.9.0',
    updateAvailable: true,
    licenseType: 'SUBSCRIPTION',
    cost: 199,
    iconColor: '#EF4444',
    installDate: '2024-01-12T08:15:00Z',
    lastUpdated: '2024-01-08T11:45:00Z',
    createdAt: '2023-11-20T15:30:00Z'
  },
  {
    id: '3',
    name: 'Advanced Inventory Analytics',
    developer: 'Analytics Pro',
    description: 'Comprehensive inventory analytics and forecasting tools',
    category: 'ANALYTICS',
    status: 'INACTIVE',
    version: '3.2.1',
    licenseType: 'TRIAL',
    cost: 0,
    iconColor: '#10B981',
    installDate: '2024-01-05T16:00:00Z',
    createdAt: '2023-10-15T10:20:00Z'
  },
  {
    id: '4',
    name: 'Document Management System',
    developer: 'DocuFlow',
    description: 'Complete document management and workflow automation',
    category: 'PRODUCTIVITY',
    status: 'INSTALLED',
    version: '2.5.0',
    latestVersion: '2.6.1',
    updateAvailable: true,
    licenseType: 'PAID',
    cost: 1500,
    iconColor: '#F59E0B',
    installDate: '2023-12-20T13:30:00Z',
    lastUpdated: '2023-12-18T09:15:00Z',
    createdAt: '2023-09-10T14:45:00Z'
  },
  {
    id: '5',
    name: 'CRM Enhancement Suite',
    developer: 'CRM Plus',
    description: 'Enhanced CRM features and customer relationship tools',
    category: 'CRM',
    status: 'ERROR',
    version: '1.4.2',
    licenseType: 'PAID',
    cost: 800,
    iconColor: '#3B82F6',
    installDate: '2023-11-15T11:00:00Z',
    createdAt: '2023-08-25T16:20:00Z'
  },
  {
    id: '6',
    name: 'Financial Dashboard Pro',
    developer: 'FinTech Solutions',
    description: 'Advanced financial dashboards and KPI monitoring',
    category: 'FINANCE',
    status: 'AVAILABLE',
    version: '1.0.0',
    licenseType: 'FREE',
    cost: 0,
    iconColor: '#6366F1',
    createdAt: '2024-01-01T00:00:00Z'
  }
]

const mockStats: AddonStats = {
  installedAddons: 18,
  activeAddons: 12,
  updatesAvailable: 5,
  totalCost: 8500
}

// Local state
const addons = ref<Addon[]>([...mockAddons])
const loading = ref(false)
const error = ref<string | null>(null)
const stats = ref<AddonStats>({ ...mockStats })
const formLoading = ref(false)

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const selectedAddon = ref<Addon | null>(null)
const formData = ref<Partial<Addon>>({})

// Filter state
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const selectedLicenseType = ref('')

// Pagination state
const currentPage = ref(1)
const pageSize = ref(10)

// Computed properties
const filteredAddons = computed(() => {
  let filtered = addons.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(addon =>
      addon.name.toLowerCase().includes(query) ||
      addon.developer?.toLowerCase().includes(query) ||
      addon.description?.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(addon => addon.category === selectedCategory.value)
  }

  if (selectedStatus.value) {
    filtered = filtered.filter(addon => addon.status === selectedStatus.value)
  }

  if (selectedLicenseType.value) {
    filtered = filtered.filter(addon => addon.licenseType === selectedLicenseType.value)
  }

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredAddons.value.length / pageSize.value))

// Methods
const loadAddons = async () => {
  try {
    loading.value = true
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // In real app, this would be an API call
  } catch (err) {
    error.value = 'Failed to load add-ons'
  } finally {
    loading.value = false
  }
}

const openCreateModal = () => {
  formData.value = {
    name: '',
    developer: '',
    description: '',
    category: '',
    version: '',
    licenseType: '',
    cost: 0,
    iconColor: '#3B82F6'
  }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  formData.value = {}
}

const viewAddon = (addon: Addon) => {
  selectedAddon.value = addon
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedAddon.value = null
}

const activateAddon = async (id: string) => {
  try {
    const addon = addons.value.find(a => a.id === id)
    if (addon) {
      addon.status = 'ACTIVE'
      addon.lastUpdated = new Date().toISOString()
      stats.value.activeAddons++
    }
  } catch (err) {
    console.error('Failed to activate add-on:', err)
  }
}

const deactivateAddon = async (id: string) => {
  if (confirm('Are you sure you want to deactivate this add-on?')) {
    try {
      const addon = addons.value.find(a => a.id === id)
      if (addon) {
        addon.status = 'INACTIVE'
        addon.lastUpdated = new Date().toISOString()
        stats.value.activeAddons--
      }
    } catch (err) {
      console.error('Failed to deactivate add-on:', err)
    }
  }
}

const installAddon = async (id: string) => {
  try {
    const addon = addons.value.find(a => a.id === id)
    if (addon) {
      addon.status = 'INSTALLED'
      addon.installDate = new Date().toISOString()
      stats.value.installedAddons++
      if (addon.cost) {
        stats.value.totalCost += addon.cost
      }
    }
  } catch (err) {
    console.error('Failed to install add-on:', err)
  }
}

const updateAddon = async (id: string) => {
  try {
    const addon = addons.value.find(a => a.id === id)
    if (addon && addon.latestVersion) {
      addon.version = addon.latestVersion
      addon.updateAvailable = false
      addon.lastUpdated = new Date().toISOString()
      stats.value.updatesAvailable--
    }
  } catch (err) {
    console.error('Failed to update add-on:', err)
  }
}

const uninstallAddon = async (id: string) => {
  if (confirm('Are you sure you want to uninstall this add-on? This action cannot be undone.')) {
    try {
      const addon = addons.value.find(a => a.id === id)
      if (addon) {
        addon.status = 'AVAILABLE'
        addon.installDate = undefined
        stats.value.installedAddons--
        if (addon.status === 'ACTIVE') {
          stats.value.activeAddons--
        }
        if (addon.cost) {
          stats.value.totalCost -= addon.cost
        }
      }
    } catch (err) {
      console.error('Failed to uninstall add-on:', err)
    }
  }
}

const handleInstallAddon = async () => {
  try {
    formLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Create new add-on
    const newAddon: Addon = {
      id: Date.now().toString(),
      name: formData.value.name || '',
      developer: formData.value.developer,
      description: formData.value.description,
      category: formData.value.category || '',
      status: 'INSTALLED',
      version: formData.value.version,
      licenseType: formData.value.licenseType || '',
      cost: formData.value.cost || 0,
      iconColor: formData.value.iconColor || '#3B82F6',
      installDate: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }
    
    addons.value.unshift(newAddon)
    stats.value.installedAddons++
    if (newAddon.cost) {
      stats.value.totalCost += newAddon.cost
    }
    
    closeCreateModal()
  } catch (error) {
    console.error('Failed to install add-on:', error)
  } finally {
    formLoading.value = false
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  selectedLicenseType.value = ''
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

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const formatCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'INTEGRATION': 'Integration',
    'REPORTING': 'Reporting',
    'PRODUCTIVITY': 'Productivity',
    'FINANCE': 'Finance',
    'INVENTORY': 'Inventory',
    'CRM': 'CRM',
    'ANALYTICS': 'Analytics',
    'UTILITIES': 'Utilities'
  }
  return categoryMap[category] || category
}

const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'ACTIVE': 'Active',
    'INACTIVE': 'Inactive',
    'INSTALLED': 'Installed',
    'AVAILABLE': 'Available',
    'ERROR': 'Error'
  }
  return statusMap[status] || status
}

const formatLicenseType = (type: string): string => {
  const typeMap: Record<string, string> = {
    'FREE': 'Free',
    'PAID': 'Paid',
    'TRIAL': 'Trial',
    'SUBSCRIPTION': 'Subscription'
  }
  return typeMap[type] || type
}

// Lifecycle
onMounted(() => {
  loadAddons()
})
</script>