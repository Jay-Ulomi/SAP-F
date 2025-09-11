<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Contact Management</h1>
          <p class="text-gray-600">
            Manage contact persons, their information, and relationships with companies
          </p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            New Contact
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div
            class="w-8 h-8 bg-sap-blue bg-opacity-20 rounded-md flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-sap-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Total Contacts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.totalContacts || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center">
            <svg
              class="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Active Contacts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.activeContacts || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
            <svg
              class="w-5 h-5 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">Primary Contacts</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.primaryContacts || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="w-8 h-8 bg-purple-100 rounded-md flex items-center justify-center">
            <svg
              class="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-500">With Email</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats?.contactsWithEmail || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search contacts..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="selectedCategory"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Categories</option>
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
            <option value="PARTNER">Partner</option>
            <option value="INTERNAL">Internal</option>
            <option value="PROSPECT">Prospect</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            v-model="selectedStatus"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="FORMER_EMPLOYEE">Former Employee</option>
            <option value="ON_LEAVE">On Leave</option>
          </select>
        </div>

        <div class="flex items-end">
          <button
            @click="clearFilters"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Contacts Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
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
                Company
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact Method
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
                        {{ contact.firstName.charAt(0) }}{{ contact.lastName.charAt(0) }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">
                      {{ contact.title }} {{ contact.firstName }} {{ contact.lastName }}
                    </div>
                    <div class="text-sm text-gray-500">{{ contact.position }}</div>
                    <div class="text-sm text-gray-500">{{ contact.email }}</div>
                  </div>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ contact.companyName || 'N/A' }}</div>
                <div class="text-sm text-gray-500">{{ contact.department || 'N/A' }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': contact.category === 'CUSTOMER',
                    'bg-green-100 text-green-800': contact.category === 'VENDOR',
                    'bg-purple-100 text-purple-800': contact.category === 'PARTNER',
                    'bg-gray-100 text-gray-800': contact.category === 'INTERNAL',
                    'bg-yellow-100 text-yellow-800': contact.category === 'PROSPECT',
                  }"
                >
                  {{ formatCategory(contact.category) }}
                </span>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="{
                    'bg-green-100 text-green-800': contact.status === 'ACTIVE',
                    'bg-red-100 text-red-800': contact.status === 'INACTIVE',
                    'bg-gray-100 text-gray-800': contact.status === 'FORMER_EMPLOYEE',
                    'bg-yellow-100 text-yellow-800': contact.status === 'ON_LEAVE',
                  }"
                >
                  {{ formatStatus(contact.status) }}
                </span>
                <div v-if="contact.isPrimary" class="mt-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-sap-blue text-white"
                  >
                    Primary
                  </span>
                </div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                  {{ formatContactMethod(contact.preferredContactMethod) }}
                </div>
                <div v-if="contact.phone" class="text-sm text-gray-500">{{ contact.phone }}</div>
              </td>

              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
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
                    v-if="!contact.isPrimary && contact.companyId"
                    @click="setPrimaryContact(contact.id, contact.companyId)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    Set Primary
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
      <div class="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div class="flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="previousPage"
              :disabled="pagination.page === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing
                <span class="font-medium">{{ (pagination.page - 1) * pagination.limit + 1 }}</span>
                to
                <span class="font-medium">
                  {{ Math.min(pagination.page * pagination.limit, pagination.total) }}
                </span>
                of
                <span class="font-medium">{{ pagination.total }}</span>
                results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="previousPage"
                  :disabled="pagination.page === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="setPage(page)"
                  :class="[
                    page === pagination.page
                      ? 'z-10 bg-sap-blue border-sap-blue text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact Form Modal -->
    <div v-if="showFormModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    {{ contactToEdit ? 'Edit Contact' : 'New Contact' }}
                  </h3>
                  <button @click="closeFormModal" class="text-gray-400 hover:text-gray-600">
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
                <ContactPersonForm
                  :contact="contactToEdit"
                  :loading="isFormLoading"
                  @submit="handleSubmitContact"
                  @cancel="closeFormModal"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact View Modal -->
    <div v-if="showViewModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-7xl sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Contact Details</h3>
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
                <ContactPersonView v-if="selectedContact" :contact="selectedContact" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Duplicate Contact Modal -->
    <div v-if="showDuplicateModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div
        class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">Duplicate Contact</h3>
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
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      v-model="duplicateData.firstName"
                      type="text"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      v-model="duplicateData.lastName"
                      type="text"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      v-model="duplicateData.email"
                      type="email"
                      required
                      class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div class="mt-6 flex justify-end space-x-3">
                  <button
                    @click="closeDuplicateModal"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleDuplicateContact"
                    :disabled="
                      !duplicateData.firstName || !duplicateData.lastName || !duplicateData.email
                    "
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Duplicate Contact
                  </button>
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
import { ref, computed, onMounted, watch } from 'vue'
import { useContactPersonStore } from '../stores'
import ContactPersonForm from '../components/ContactPersonForm.vue'
import ContactPersonView from '../components/ContactPersonView.vue'
import type { ContactPerson, ContactPersonFormData } from '../types'

const contactPersonStore = useContactPersonStore()

// Computed properties
const contacts = computed(() => contactPersonStore.contacts)
const stats = computed(() => contactPersonStore.stats)
const pagination = computed(() => contactPersonStore.pagination)

// Local state
const showFormModal = ref(false)
const showViewModal = ref(false)
const contactToEdit = ref<ContactPerson | null>(null)
const selectedContact = ref<ContactPerson | null>(null)
const isFormLoading = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')

// Duplicate modal data
const showDuplicateModal = ref(false)
const contactToDuplicate = ref<ContactPerson | null>(null)
const duplicateData = ref({
  firstName: '',
  lastName: '',
  email: '',
})

// Computed properties for pagination
const visiblePages = computed(() => {
  const pages = []
  const totalPages = pagination.value.totalPages
  const currentPage = pagination.value.page

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    } else if (currentPage >= totalPages - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(totalPages)
    }
  }

  return pages
})

// Methods
const openCreateForm = () => {
  contactToEdit.value = null
  showFormModal.value = true
}

const viewContact = (contact: ContactPerson) => {
  selectedContact.value = contact
  showViewModal.value = true
}

const editContact = (contact: ContactPerson) => {
  contactToEdit.value = contact
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  contactToEdit.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedContact.value = null
}

const duplicateContact = (contact: ContactPerson) => {
  contactToDuplicate.value = contact
  duplicateData.value.firstName = contact.firstName
  duplicateData.value.lastName = contact.lastName
  duplicateData.value.email = ''
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  contactToDuplicate.value = null
  duplicateData.value = { firstName: '', lastName: '', email: '' }
}

const handleSubmitContact = async (data: ContactPersonFormData) => {
  try {
    isFormLoading.value = true

    if (contactToEdit.value) {
      await contactPersonStore.updateContact(contactToEdit.value.id, data)
    } else {
      await contactPersonStore.createContact(data)
    }

    closeFormModal()
    await loadContacts()
    await loadContactStats()
  } catch (error) {
    console.error('Error submitting contact:', error)
  } finally {
    isFormLoading.value = false
  }
}

const handleDuplicateContact = async () => {
  try {
    if (!contactToDuplicate.value) return

    await contactPersonStore.duplicateContact(
      contactToDuplicate.value.id,
      duplicateData.value.firstName,
      duplicateData.value.lastName,
      duplicateData.value.email,
    )

    closeDuplicateModal()
    await loadContacts()
    await loadContactStats()
  } catch (error) {
    console.error('Error duplicating contact:', error)
  }
}

const deleteContact = async (id: string) => {
  if (confirm('Are you sure you want to delete this contact?')) {
    try {
      await contactPersonStore.deleteContact(id)
      await loadContacts()
      await loadContactStats()
    } catch (error) {
      console.error('Error deleting contact:', error)
    }
  }
}

const setPrimaryContact = async (contactId: string, companyId: string) => {
  try {
    await contactPersonStore.setPrimaryContact(contactId, companyId)
    await loadContacts()
    await loadContactStats()
  } catch (error) {
    console.error('Error setting primary contact:', error)
  }
}

// Pagination methods
const setPage = (page: number) => {
  if (typeof page === 'number') {
    contactPersonStore.setPage(page)
    loadContacts()
  }
}

const nextPage = () => {
  contactPersonStore.nextPage()
  loadContacts()
}

const previousPage = () => {
  contactPersonStore.previousPage()
  loadContacts()
}

// Filter methods
const clearFilters = () => {
  searchQuery.value = ''
  selectedCategory.value = ''
  selectedStatus.value = ''
  contactPersonStore.clearFilters()
  loadContacts()
}

// Watch for filter changes
watch([searchQuery, selectedCategory, selectedStatus], () => {
  const filters: any = {}

  if (searchQuery.value) {
    filters.search = searchQuery.value
  }

  if (selectedCategory.value) {
    filters.category = selectedCategory.value
  }

  if (selectedStatus.value) {
    filters.status = selectedStatus.value
  }

  contactPersonStore.setFilters(filters)
  loadContacts()
})

// Load data
const loadContacts = async () => {
  await contactPersonStore.loadContacts()
}

const loadContactStats = async () => {
  await contactPersonStore.loadContactStats()
}

// Utility functions
const formatCategory = (category: string): string => {
  switch (category) {
    case 'CUSTOMER':
      return 'Customer'
    case 'VENDOR':
      return 'Vendor'
    case 'PARTNER':
      return 'Partner'
    case 'INTERNAL':
      return 'Internal'
    case 'PROSPECT':
      return 'Prospect'
    default:
      return category
  }
}

const formatStatus = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'Active'
    case 'INACTIVE':
      return 'Inactive'
    case 'FORMER_EMPLOYEE':
      return 'Former Employee'
    case 'ON_LEAVE':
      return 'On Leave'
    default:
      return status
  }
}

const formatContactMethod = (method: string): string => {
  switch (method) {
    case 'EMAIL':
      return 'Email'
    case 'PHONE':
      return 'Phone'
    case 'MOBILE':
      return 'Mobile'
    case 'FAX':
      return 'Fax'
    case 'MAIL':
      return 'Mail'
    case 'IN_PERSON':
      return 'In Person'
    default:
      return method
  }
}

// Initialize
onMounted(async () => {
  await loadContacts()
  await loadContactStats()
})
</script>
