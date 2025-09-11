<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Contact Management</h1>
        <p class="text-gray-600 mt-1">Manage your CRM contacts, prospects, and leads</p>
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
        Add Contact
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Contacts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalContacts || 0 }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active Contacts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeContacts || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Prospects</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.prospectContacts || 0 }}</p>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                ></path>
              </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Leads</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.leadContacts || 0 }}</p>
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
            placeholder="Search contacts..."
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
            <option value="SUSPENDED">Suspended</option>
            <option value="PROSPECT">Prospect</option>
            <option value="LEAD">Lead</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
          <select
            v-model="filters.type"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="INDIVIDUAL">Individual</option>
            <option value="CORPORATE">Corporate</option>
            <option value="PARTNER">Partner</option>
            <option value="VENDOR">Vendor</option>
            <option value="CUSTOMER">Customer</option>
            <option value="SUPPLIER">Supplier</option>
          </select>
          <select
            v-model="filters.category"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="SALES">Sales</option>
            <option value="MARKETING">Marketing</option>
            <option value="SUPPORT">Support</option>
            <option value="PARTNER">Partner</option>
            <option value="VENDOR">Vendor</option>
            <option value="CUSTOMER">Customer</option>
            <option value="OTHER">Other</option>
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
        <h3 class="text-lg font-medium text-gray-900">Contacts</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Type
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigned To
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Lead Score
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="contact in contacts" :key="contact.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">
                        {{ contact.firstName.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ contact.firstName }} {{ contact.lastName }}
                    </div>
                    <div class="text-sm text-gray-500">{{ contact.contactCode }}</div>
                    <div v-if="contact.companyName" class="text-sm text-gray-500">
                      {{ contact.companyName }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ formatContactType(contact.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': contact.status === 'ACTIVE',
                    'bg-gray-100 text-gray-800': contact.status === 'INACTIVE',
                    'bg-yellow-100 text-yellow-800': contact.status === 'SUSPENDED',
                    'bg-blue-100 text-blue-800': contact.status === 'PROSPECT',
                    'bg-purple-100 text-purple-800': contact.status === 'LEAD',
                    'bg-red-100 text-red-800': contact.status === 'CANCELLED',
                  }"
                >
                  {{ formatContactStatus(contact.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ formatContactCategory(contact.category) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': contact.priority === 'LOW',
                    'bg-blue-100 text-blue-800': contact.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': contact.priority === 'HIGH',
                    'bg-red-100 text-red-800': contact.priority === 'CRITICAL',
                  }"
                >
                  {{ formatContactPriority(contact.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ contact.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="w-16 bg-gray-200 rounded-full h-2 mr-2">
                    <div
                      class="bg-sap-blue h-2 rounded-full"
                      :style="{ width: contact.leadScore + '%' }"
                    ></div>
                  </div>
                  <span class="text-sm text-gray-900">{{ contact.leadScore }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="viewContact(contact)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editContact(contact)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="duplicateContact(contact)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                  <button
                    @click="deleteContact(contact.id)"
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
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingContact ? 'Edit Contact' : 'Create New Contact' }}
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

        <ContactForm
          :contact="editingContact"
          :loading="loading"
          @submit="handleSubmitContact"
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
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Contact Details</h3>
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

        <ContactView v-if="viewingContact" :contact="viewingContact" />
      </div>
    </div>

    <!-- Duplicate Modal -->
    <div
      v-if="showDuplicateModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50"
      @click.self="closeDuplicateModal"
    >
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Duplicate Contact</h3>
          <button @click="closeDuplicateModal" class="text-gray-400 hover:text-gray-600">
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

        <form @submit.prevent="handleDuplicateContact" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Contact Code *</label>
            <input
              v-model="duplicateForm.contactCode"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter new contact code"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New First Name *</label>
            <input
              v-model="duplicateForm.firstName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter new first name"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Last Name *</label>
            <input
              v-model="duplicateForm.lastName"
              type="text"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
              placeholder="Enter new last name"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeDuplicateModal"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="loading">Duplicating...</span>
              <span v-else>Duplicate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useContactStore } from '../stores'
import ContactForm from '../components/ContactForm.vue'
import ContactView from '../components/ContactView.vue'
import type { Contact, ContactFormData, ContactFilters } from '../types'

// Store
const contactStore = useContactStore()

// Reactive data
const searchQuery = ref('')
const filters = ref<ContactFilters>({})
const showCreateModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const editingContact = ref<Contact | null>(null)
const viewingContact = ref<Contact | null>(null)
const duplicateForm = ref({
  contactCode: '',
  firstName: '',
  lastName: '',
})

// Computed properties
const contacts = computed(() => contactStore.contacts)
const loading = computed(() => contactStore.loading)
const stats = computed(() => contactStore.stats)
const pagination = computed(() => contactStore.pagination)

// Methods
const openCreateModal = () => {
  editingContact.value = null
  showCreateModal.value = true
}

const closeCreateModal = () => {
  showCreateModal.value = false
  editingContact.value = null
}

const editContact = (contact: Contact) => {
  editingContact.value = contact
  showCreateModal.value = true
}

const viewContact = (contact: Contact) => {
  viewingContact.value = contact
  showViewModal.value = true
}

const closeViewModal = () => {
  showViewModal.value = false
  viewingContact.value = null
}

const openDuplicateModal = (contact: Contact) => {
  duplicateForm.value.contactCode = `${contact.contactCode}_COPY`
  duplicateForm.value.firstName = contact.firstName
  duplicateForm.value.lastName = contact.lastName
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  duplicateForm.value = { contactCode: '', firstName: '', lastName: '' }
}

const duplicateContact = (contact: Contact) => {
  openDuplicateModal(contact)
}

const handleSubmitContact = async (data: ContactFormData) => {
  try {
    if (editingContact.value) {
      await contactStore.updateContact(editingContact.value.id, data)
    } else {
      await contactStore.createContact(data)
    }
    closeCreateModal()
  } catch (err) {
    console.error('Error saving contact:', err)
  }
}

const handleDuplicateContact = async () => {
  if (!editingContact.value) return

  try {
    await contactStore.duplicateContact(
      editingContact.value.id,
      duplicateForm.value.contactCode,
      duplicateForm.value.firstName,
      duplicateForm.value.lastName,
    )
    closeDuplicateModal()
  } catch (err) {
    console.error('Error duplicating contact:', err)
  }
}

const deleteContact = async (id: string) => {
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      await contactStore.deleteContact(id)
    } catch (err) {
      console.error('Error deleting contact:', err)
    }
  }
}

const applyFilters = () => {
  const newFilters: ContactFilters = {}

  if (searchQuery.value.trim()) {
    newFilters.search = searchQuery.value.trim()
  }

  if (filters.value.status) {
    newFilters.status = filters.value.status
  }

  if (filters.value.type) {
    newFilters.type = filters.value.type
  }

  if (filters.value.category) {
    newFilters.category = filters.value.category
  }

  contactStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {}
  contactStore.clearFilters()
}

const nextPage = () => {
  contactStore.nextPage()
}

const previousPage = () => {
  contactStore.previousPage()
}

// Utility functions
const formatContactStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended',
    PROSPECT: 'Prospect',
    LEAD: 'Lead',
    CANCELLED: 'Cancelled',
  }
  return statusMap[status] || status
}

const formatContactType = (type: string): string => {
  const typeMap: Record<string, string> = {
    INDIVIDUAL: 'Individual',
    CORPORATE: 'Corporate',
    PARTNER: 'Partner',
    VENDOR: 'Vendor',
    CUSTOMER: 'Customer',
    SUPPLIER: 'Supplier',
  }
  return typeMap[type] || type
}

const formatContactPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

const formatContactCategory = (category: string): string => {
  const categoryMap: Record<string, string> = {
    SALES: 'Sales',
    MARKETING: 'Marketing',
    SUPPORT: 'Support',
    PARTNER: 'Partner',
    VENDOR: 'Vendor',
    CUSTOMER: 'Customer',
    OTHER: 'Other',
  }
  return categoryMap[category] || category
}

// Watch for search query changes
watch(searchQuery, (newQuery) => {
  if (newQuery.trim() === '') {
    contactStore.clearFilters()
  }
})

// Initialize
onMounted(async () => {
  await contactStore.loadContacts()
  await contactStore.loadContactStats()
})
</script>
