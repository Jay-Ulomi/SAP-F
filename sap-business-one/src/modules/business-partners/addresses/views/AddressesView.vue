<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Address Management</h1>
          <p class="text-gray-600">Manage business addresses, locations, and contact information</p>
        </div>
        <div class="mt-4 lg:mt-0">
          <button
            @click="openCreateForm"
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
            Add Address
          </button>
        </div>
      </div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <svg
              class="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Addresses</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.totalAddresses || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <svg
              class="w-6 h-6 text-green-600"
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
            <p class="text-sm font-medium text-gray-600">Active Addresses</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.activeAddresses || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-sap-blue rounded-lg">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Default Addresses</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.defaultAddresses || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white border border-gray-200 rounded-lg p-6">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <svg
              class="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              ></path>
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Verified Addresses</p>
            <p class="text-2xl font-bold text-gray-900">{{ stats?.verifiedAddresses || 0 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="bg-white border border-gray-200 rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search addresses..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
          <select
            v-model="selectedAddressType"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option value="BILLING">Billing</option>
            <option value="SHIPPING">Shipping</option>
            <option value="BUSINESS">Business</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="WAREHOUSE">Warehouse</option>
            <option value="BRANCH">Branch</option>
            <option value="HEADQUARTERS">Headquarters</option>
            <option value="OTHER">Other</option>
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
            <option value="DEFAULT">Default</option>
            <option value="VERIFIED">Verified</option>
            <option value="UNVERIFIED">Unverified</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <select
            v-model="selectedCountry"
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Countries</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="DE">Germany</option>
            <option value="FR">France</option>
            <option value="IT">Italy</option>
            <option value="ES">Spain</option>
            <option value="NL">Netherlands</option>
            <option value="BE">Belgium</option>
            <option value="CH">Switzerland</option>
            <option value="AT">Austria</option>
            <option value="AU">Australia</option>
            <option value="NZ">New Zealand</option>
            <option value="JP">Japan</option>
            <option value="CN">China</option>
            <option value="IN">India</option>
            <option value="BR">Brazil</option>
            <option value="MX">Mexico</option>
            <option value="AR">Argentina</option>
            <option value="CL">Chile</option>
          </select>
        </div>
      </div>
      <div class="mt-4 flex items-center space-x-4">
        <button
          @click="applyFilters"
          class="px-4 py-2 bg-sap-blue text-white text-sm font-medium rounded-md hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          Apply Filters
        </button>
        <button
          @click="clearFilters"
          class="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
        >
          Clear Filters
        </button>
      </div>
    </div>

    <!-- Addresses Table -->
    <div class="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Addresses</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Address
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Types
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Company
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Contact
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="address in addresses" :key="address.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div>
                  <div class="text-sm font-medium text-gray-900">{{ address.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ address.addressLine1 }}
                    <span v-if="address.addressLine2">, {{ address.addressLine2 }}</span>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ address.city }}, {{ address.state }} {{ address.postalCode }}
                  </div>
                  <div class="text-sm text-gray-500">{{ formatCountry(address.country) }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="type in address.addressType"
                    :key="type"
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-blue-100 text-blue-800': type === 'BUSINESS',
                      'bg-green-100 text-green-800': type === 'BILLING',
                      'bg-yellow-100 text-yellow-800': type === 'SHIPPING',
                      'bg-purple-100 text-purple-800': type === 'RESIDENTIAL',
                      'bg-indigo-100 text-indigo-800': type === 'WAREHOUSE',
                      'bg-pink-100 text-pink-800': type === 'BRANCH',
                      'bg-orange-100 text-orange-800': type === 'HEADQUARTERS',
                      'bg-gray-100 text-gray-800': type === 'OTHER',
                    }"
                  >
                    {{ formatAddressType(type) }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col space-y-1">
                  <span
                    class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': address.status === 'ACTIVE',
                      'bg-red-100 text-red-800': address.status === 'INACTIVE',
                      'bg-blue-100 text-blue-800': address.status === 'DEFAULT',
                      'bg-purple-100 text-purple-800': address.status === 'VERIFIED',
                      'bg-yellow-100 text-yellow-800': address.status === 'UNVERIFIED',
                    }"
                  >
                    {{ formatStatus(address.status) }}
                  </span>
                  <div class="flex space-x-1">
                    <span
                      v-if="address.isDefault"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-sap-blue text-white"
                    >
                      Default
                    </span>
                    <span
                      v-if="address.isVerified"
                      class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800"
                    >
                      Verified
                    </span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="address.companyName">
                  <div class="text-sm font-medium text-gray-900">{{ address.companyName }}</div>
                  <div v-if="address.companyId" class="text-sm text-gray-500">
                    {{ address.companyId }}
                  </div>
                </div>
                <span v-else class="text-sm text-gray-500">N/A</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="address.contactPerson">
                  <div class="text-sm font-medium text-gray-900">{{ address.contactPerson }}</div>
                  <div v-if="address.phone" class="text-sm text-gray-500">{{ address.phone }}</div>
                  <div v-if="address.email" class="text-sm text-gray-500">{{ address.email }}</div>
                </div>
                <span v-else class="text-sm text-gray-500">N/A</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewAddress(address)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    @click="editAddress(address)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    @click="duplicateAddress(address)"
                    class="text-green-600 hover:text-green-900"
                  >
                    Duplicate
                  </button>
                  <button
                    @click="deleteAddress(address.id)"
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
                <span class="font-medium">{{
                  Math.min(pagination.page * pagination.limit, pagination.total)
                }}</span>
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
  </div>

  <!-- Address Form Modal -->
  <div v-if="showFormModal" class="fixed inset-0 z-50 overflow-y-auto">
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
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  {{ addressToEdit ? 'Edit Address' : 'Create New Address' }}
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
              <AddressForm
                :address="addressToEdit"
                :loading="isFormLoading"
                @submit="handleSubmitAddress"
                @cancel="closeFormModal"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Address View Modal -->
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
                <h3 class="text-lg leading-6 font-medium text-gray-900">Address Details</h3>
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
              <AddressView v-if="selectedAddress" :address="selectedAddress" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Duplicate Address Modal -->
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
                <h3 class="text-lg leading-6 font-medium text-gray-900">Duplicate Address</h3>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >New Address Name *</label
                  >
                  <input
                    v-model="duplicateData.name"
                    type="text"
                    required
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter new address name"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    v-model="duplicateData.description"
                    type="text"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
                    placeholder="Enter new description"
                  />
                </div>
                <div class="flex justify-end space-x-3 pt-4">
                  <button
                    @click="closeDuplicateModal"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
                  >
                    Cancel
                  </button>
                  <button
                    @click="handleDuplicateAddress"
                    :disabled="!duplicateData.name.trim()"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Duplicate Address
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
import { useAddressStore } from '../stores'
import AddressForm from '../components/AddressForm.vue'
import AddressView from '../components/AddressView.vue'
import type { Address, AddressFormData } from '../types'
import { AddressType, AddressStatus, Country } from '../types'

const addressStore = useAddressStore()

// Computed properties
const addresses = computed(() => addressStore.addresses)
const stats = computed(() => addressStore.stats)
const pagination = computed(() => addressStore.pagination)

// Local state
const showFormModal = ref(false)
const showViewModal = ref(false)
const showDuplicateModal = ref(false)
const addressToEdit = ref<Address | null>(null)
const selectedAddress = ref<Address | null>(null)
const addressToDuplicate = ref<Address | null>(null)
const isFormLoading = ref(false)
const searchQuery = ref('')
const selectedAddressType = ref('')
const selectedStatus = ref('')
const selectedCountry = ref('')

// Duplicate modal data
const duplicateData = ref({
  name: '',
  description: '',
})

// Methods
const openCreateForm = () => {
  addressToEdit.value = null
  showFormModal.value = true
}

const viewAddress = (address: Address) => {
  selectedAddress.value = address
  showViewModal.value = true
}

const editAddress = (address: Address) => {
  addressToEdit.value = address
  showFormModal.value = true
}

const closeFormModal = () => {
  showFormModal.value = false
  addressToEdit.value = null
}

const closeViewModal = () => {
  showViewModal.value = false
  selectedAddress.value = null
}

const duplicateAddress = (address: Address) => {
  addressToDuplicate.value = address
  duplicateData.value.name = `${address.name} (Copy)`
  duplicateData.value.description = address.description || ''
  showDuplicateModal.value = true
}

const closeDuplicateModal = () => {
  showDuplicateModal.value = false
  addressToDuplicate.value = null
  duplicateData.value.name = ''
  duplicateData.value.description = ''
}

const handleSubmitAddress = async (data: AddressFormData) => {
  try {
    isFormLoading.value = true
    if (addressToEdit.value) {
      await addressStore.updateAddress(addressToEdit.value.id, data)
    } else {
      await addressStore.createAddress(data)
    }
    closeFormModal()
    await loadAddresses()
    await loadAddressStats()
  } catch (error) {
    console.error('Error saving address:', error)
  } finally {
    isFormLoading.value = false
  }
}

const handleDuplicateAddress = async () => {
  if (!addressToDuplicate.value) return

  try {
    isFormLoading.value = true
    await addressStore.duplicateAddress(
      addressToDuplicate.value.id,
      duplicateData.value.name,
      duplicateData.value.description,
    )
    closeDuplicateModal()
    await loadAddresses()
    await loadAddressStats()
  } catch (error) {
    console.error('Error duplicating address:', error)
  } finally {
    isFormLoading.value = false
  }
}

const deleteAddress = async (id: string) => {
  if (!confirm('Are you sure you want to delete this address?')) return

  try {
    await addressStore.deleteAddress(id)
    await loadAddresses()
    await loadAddressStats()
  } catch (error) {
    console.error('Error deleting address:', error)
  }
}

// Pagination methods
const nextPage = () => {
  addressStore.nextPage()
}

const previousPage = () => {
  addressStore.previousPage()
}

// Filter methods
const applyFilters = () => {
  const filters: any = {}
  if (searchQuery.value) filters.search = searchQuery.value
  if (selectedAddressType.value) filters.addressType = [selectedAddressType.value]
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedCountry.value) filters.country = selectedCountry.value

  addressStore.setFilters(filters)
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedAddressType.value = ''
  selectedStatus.value = ''
  selectedCountry.value = ''
  addressStore.clearFilters()
}

// Watch for filter changes
watch([searchQuery, selectedAddressType, selectedStatus, selectedCountry], () => {
  applyFilters()
})

// Load data
const loadAddresses = async () => {
  await addressStore.loadAddresses()
}

const loadAddressStats = async () => {
  await addressStore.loadAddressStats()
}

// Utility functions
const formatStatus = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'Active'
    case 'INACTIVE':
      return 'Inactive'
    case 'DEFAULT':
      return 'Default'
    case 'VERIFIED':
      return 'Verified'
    case 'UNVERIFIED':
      return 'Unverified'
    default:
      return status
  }
}

const formatAddressType = (type: string): string => {
  switch (type) {
    case 'BILLING':
      return 'Billing'
    case 'SHIPPING':
      return 'Shipping'
    case 'BUSINESS':
      return 'Business'
    case 'RESIDENTIAL':
      return 'Residential'
    case 'WAREHOUSE':
      return 'Warehouse'
    case 'BRANCH':
      return 'Branch'
    case 'HEADQUARTERS':
      return 'Headquarters'
    case 'OTHER':
      return 'Other'
    default:
      return type
  }
}

const formatCountry = (country: string): string => {
  switch (country) {
    case 'US':
      return 'United States'
    case 'CA':
      return 'Canada'
    case 'UK':
      return 'United Kingdom'
    case 'DE':
      return 'Germany'
    case 'FR':
      return 'France'
    case 'IT':
      return 'Italy'
    case 'ES':
      return 'Spain'
    case 'NL':
      return 'Netherlands'
    case 'BE':
      return 'Belgium'
    case 'CH':
      return 'Switzerland'
    case 'AT':
      return 'Austria'
    case 'AU':
      return 'Australia'
    case 'NZ':
      return 'New Zealand'
    case 'JP':
      return 'Japan'
    case 'CN':
      return 'China'
    case 'IN':
      return 'India'
    case 'BR':
      return 'Brazil'
    case 'MX':
      return 'Mexico'
    case 'AR':
      return 'Argentina'
    case 'CL':
      return 'Chile'
    default:
      return country
  }
}

// Initialize
onMounted(async () => {
  await loadAddresses()
  await loadAddressStats()
})
</script>
