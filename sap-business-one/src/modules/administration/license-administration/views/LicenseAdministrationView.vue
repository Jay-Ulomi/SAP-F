<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">License Administration</h1>
      <button
        @click="openCreateModal"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
      >
        <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add License
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Active Licenses</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeLicenses || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Expiring Soon</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.expiringSoon || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">Users Licensed</p>
          <p class="text-2xl font-semibold text-gray-900">{{ stats?.usersLicensed || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">License Cost</p>
          <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(stats?.totalLicenseCost || 0) }}</p>
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
        <h3 class="text-lg font-medium text-gray-900">License Filters</h3>
        <button @click="clearFilters" class="text-sm text-sap-blue hover:text-sap-dark-blue">
          Clear All Filters
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Search Licenses</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search licenses..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">License Type</label>
          <select
            v-model="selectedLicenseType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="USER">User License</option>
            <option value="SERVER">Server License</option>
            <option value="MODULE">Module License</option>
            <option value="ADDON">Add-on License</option>
            <option value="DEVELOPER">Developer License</option>
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
            <option value="EXPIRED">Expired</option>
            <option value="SUSPENDED">Suspended</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Expiry Status</label>
          <select
            v-model="selectedExpiryStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All</option>
            <option value="EXPIRES_SOON">Expires Soon</option>
            <option value="EXPIRED">Expired</option>
            <option value="VALID">Valid</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Licenses Table -->
    <div class="bg-white border border-gray-200 rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">License Management</h2>
      </div>
      
      <div v-if="loading" class="p-6 text-center">
        <div class="inline-flex items-center">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading licenses...
        </div>
      </div>

      <div v-else-if="filteredLicenses.length === 0" class="p-6 text-center">
        <div class="text-gray-400 mb-4">
          <svg class="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <p class="text-lg font-medium text-gray-900 mb-2">No Licenses Found</p>
        <p class="text-sm text-gray-600 mb-4">Add your first license to get started.</p>
        <button @click="openCreateModal" class="btn-primary">Add License</button>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="license in paginatedLicenses" :key="license.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center">
                      <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ license.name }}</div>
                    <div class="text-sm text-gray-500">{{ license.licenseKey }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {{ formatLicenseType(license.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': license.status === 'ACTIVE',
                    'bg-red-100 text-red-800': license.status === 'EXPIRED',
                    'bg-yellow-100 text-yellow-800': license.status === 'SUSPENDED',
                    'bg-gray-100 text-gray-800': license.status === 'PENDING'
                  }"
                >
                  {{ formatStatus(license.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div>{{ formatDate(license.expiryDate) }}</div>
                <div class="text-xs" :class="getDaysUntilExpiry(license.expiryDate) <= 30 ? 'text-red-500' : 'text-gray-500'">
                  {{ getDaysUntilExpiryText(license.expiryDate) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ license.assignedUsers || 0 }} / {{ license.maxUsers }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatCurrency(license.cost) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button @click="viewLicense(license)" class="text-sap-blue hover:text-sap-dark-blue">View</button>
                  <button @click="editLicense(license)" class="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button @click="renewLicense(license.id)" class="text-green-600 hover:text-green-900">Renew</button>
                  <button @click="deleteLicense(license.id)" class="text-red-600 hover:text-red-900">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Previous</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div><p class="text-sm text-gray-700">Showing <span class="font-medium">{{ (currentPage - 1) * pageSize + 1 }}</span> to <span class="font-medium">{{ Math.min(currentPage * pageSize, filteredLicenses.length) }}</span> of <span class="font-medium">{{ filteredLicenses.length }}</span> results</p></div>
          <div><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button @click="previousPage" :disabled="currentPage === 1" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"><span class="sr-only">Previous</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg></button>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"><span class="sr-only">Next</span><svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg></button>
          </nav></div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">{{ licenseToEdit ? 'Edit License' : 'Add New License' }}</h3>
              <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <LicenseForm
              :license="licenseToEdit"
              :loading="formLoading"
              @submit="handleSubmitLicense"
              @cancel="closeCreateModal"
            />
          </div>
        </div>
      </div>
    </div>

    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg leading-6 font-medium text-gray-900">License Details</h3>
              <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            <LicenseView v-if="selectedLicense" :license="selectedLicense" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import LicenseForm from '../components/LicenseForm.vue'
import LicenseView from '../components/LicenseView.vue'

interface License {
  id: string
  name: string
  licenseKey: string
  type: string
  status: string
  expiryDate: string
  assignedUsers: number
  maxUsers: number
  cost: number
  vendor?: string
  version?: string
  description?: string
  notes?: string
  autoRenewal?: boolean
  sendNotifications?: boolean
}

interface LicenseStats {
  activeLicenses: number
  expiringSoon: number
  usersLicensed: number
  totalLicenseCost: number
}

const mockLicenses: License[] = [
  { id: '1', name: 'SAP Business One Professional', licenseKey: 'SBO-PRO-001', type: 'USER', status: 'ACTIVE', expiryDate: '2024-12-31', assignedUsers: 25, maxUsers: 30, cost: 15000 },
  { id: '2', name: 'SAP B1 Server License', licenseKey: 'SBO-SRV-002', type: 'SERVER', status: 'ACTIVE', expiryDate: '2024-06-15', assignedUsers: 1, maxUsers: 1, cost: 5000 },
  { id: '3', name: 'Crystal Reports', licenseKey: 'CR-RPT-003', type: 'MODULE', status: 'EXPIRED', expiryDate: '2024-01-15', assignedUsers: 10, maxUsers: 10, cost: 2000 }
]

const mockStats: LicenseStats = { activeLicenses: 28, expiringSoon: 3, usersLicensed: 45, totalLicenseCost: 125000 }

const licenses = ref<License[]>([...mockLicenses])
const loading = ref(false)
const stats = ref<LicenseStats>({ ...mockStats })
const showCreateModal = ref(false)
const showViewModal = ref(false)
const formLoading = ref(false)
const formData = ref<Partial<License>>({})
const licenseToEdit = ref<License | null>(null)
const selectedLicense = ref<License | null>(null)
const searchQuery = ref('')
const selectedLicenseType = ref('')
const selectedStatus = ref('')
const selectedExpiryStatus = ref('')
const currentPage = ref(1)
const pageSize = ref(10)

const filteredLicenses = computed(() => {
  let filtered = licenses.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(license => license.name.toLowerCase().includes(query) || license.licenseKey.toLowerCase().includes(query))
  }
  if (selectedLicenseType.value) filtered = filtered.filter(license => license.type === selectedLicenseType.value)
  if (selectedStatus.value) filtered = filtered.filter(license => license.status === selectedStatus.value)
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredLicenses.value.length / pageSize.value))
const paginatedLicenses = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return filteredLicenses.value.slice(start, start + pageSize.value)
})

const openCreateModal = () => {
  licenseToEdit.value = null
  formData.value = {
    name: '',
    licenseKey: '',
    type: '',
    status: '',
    expiryDate: '',
    assignedUsers: 0,
    maxUsers: 1,
    cost: 0
  }
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  licenseToEdit.value = null
  formData.value = {}
}

const viewLicense = (license: License) => {
  selectedLicense.value = license
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedLicense.value = null
}

const editLicense = (license: License) => {
  licenseToEdit.value = license
  formData.value = { ...license }
  showCreateModal.value = true
}

const handleSubmitLicense = async (data: Partial<License>) => {
  try {
    formLoading.value = true
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (licenseToEdit.value) {
      // Update existing license
      const index = licenses.value.findIndex(l => l.id === licenseToEdit.value!.id)
      if (index !== -1) {
        licenses.value[index] = {
          ...licenses.value[index],
          ...data
        }
      }
    } else {
      // Create new license
      const newLicense: License = {
        id: Date.now().toString(),
        name: data.name || '',
        licenseKey: data.licenseKey || '',
        type: data.type || '',
        status: data.status || '',
        expiryDate: data.expiryDate || '',
        assignedUsers: data.assignedUsers || 0,
        maxUsers: data.maxUsers || 1,
        cost: data.cost || 0,
        vendor: data.vendor || '',
        version: data.version || '',
        description: data.description || '',
        notes: data.notes || '',
        autoRenewal: data.autoRenewal || false,
        sendNotifications: data.sendNotifications !== false
      }
      licenses.value.unshift(newLicense)
      stats.value.activeLicenses++
      stats.value.totalLicenseCost += newLicense.cost
    }
    
    closeCreateModal()
  } catch (error) {
    console.error('Failed to save license:', error)
  } finally {
    formLoading.value = false
  }
}

const renewLicense = (id: string) => {
  const license = licenses.value.find(l => l.id === id)
  if (license) {
    const newExpiryDate = new Date()
    newExpiryDate.setFullYear(newExpiryDate.getFullYear() + 1)
    license.expiryDate = newExpiryDate.toISOString().split('T')[0]
    license.status = 'ACTIVE'
  }
}

const deleteLicense = (id: string) => {
  if (confirm('Are you sure you want to delete this license?')) {
    licenses.value = licenses.value.filter(l => l.id !== id)
  }
}

const clearFilters = () => { searchQuery.value = ''; selectedLicenseType.value = ''; selectedStatus.value = ''; selectedExpiryStatus.value = '' }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const previousPage = () => { if (currentPage.value > 1) currentPage.value-- }

const formatCurrency = (amount: number): string => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)
const formatDate = (dateString: string): string => new Date(dateString).toLocaleDateString()
const formatLicenseType = (type: string): string => ({ 'USER': 'User', 'SERVER': 'Server', 'MODULE': 'Module', 'ADDON': 'Add-on', 'DEVELOPER': 'Developer' }[type] || type)
const formatStatus = (status: string): string => ({ 'ACTIVE': 'Active', 'EXPIRED': 'Expired', 'SUSPENDED': 'Suspended', 'PENDING': 'Pending' }[status] || status)

const getDaysUntilExpiry = (expiryDate: string): number => {
  const today = new Date()
  const expiry = new Date(expiryDate)
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const getDaysUntilExpiryText = (expiryDate: string): string => {
  const days = getDaysUntilExpiry(expiryDate)
  if (days < 0) return `Expired ${Math.abs(days)} days ago`
  if (days === 0) return 'Expires today'
  if (days === 1) return 'Expires tomorrow'
  return `Expires in ${days} days`
}

onMounted(() => {
  loading.value = true
  setTimeout(() => { loading.value = false }, 1000)
})
</script>