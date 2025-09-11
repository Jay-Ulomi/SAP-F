<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Cost Accounting</h1>
        <p class="text-gray-600 mt-1">
          Manage cost centers, allocations, and analyze cost performance across your organization
        </p>
      </div>
      <div class="flex space-x-3">
        <button @click="openCreateModal" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
          New Cost Center
        </button>
        <button @click="showAllocationForm = true" class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            ></path>
          </svg>
          New Allocation
        </button>
      </div>
    </div>

    <!-- Statistics Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Cost Centers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.totalCostCenters }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white"
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
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Centers</p>
            <p class="text-2xl font-semibold text-gray-900">{{ stats.activeCostCenters }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
              ></path>
            </svg>
            </div>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Budget</p>
            <p class="text-2xl font-semibold text-gray-900">
              {{ formatCurrency(stats.totalBudget) }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
              <svg class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            <p class="text-sm font-medium text-gray-600">Variance</p>
            <p
              class="text-2xl font-semibold text-gray-900"
              :class="stats.totalVariance >= 0 ? 'text-red-600' : 'text-green-600'"
            >
              {{ formatCurrency(Math.abs(stats.totalVariance)) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search cost centers by code, name, or manager..."
            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
            @input="handleSearch"
          />
        </div>
        <div class="flex gap-2">
          <select
            v-model="selectedType"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Types</option>
            <option v-for="type in costCenterTypes" :key="type" :value="type">
              {{ type }}
            </option>
          </select>
          <select
            v-model="selectedStatus"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Status</option>
            <option v-for="status in costCenterStatuses" :key="status" :value="status">
              {{ status }}
            </option>
          </select>
          <select
            v-model="selectedAllocationMethod"
            @change="handleFilterChange"
            class="rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue text-sm"
          >
            <option value="">All Methods</option>
            <option v-for="method in allocationMethods" :key="method" :value="method">
              {{ method }}
            </option>
          </select>
          <button
            @click="resetFilters"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Reset
          </button>
        </div>
      </div>
    </div>

    <!-- Cost Centers List -->
    <div
      v-if="!showAllocationForm"
      class="bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-medium text-gray-900">Cost Centers</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Cost Center
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
                Manager
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Budget
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actual
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Variance
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="center in costCenters" :key="center.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ center.code }}</div>
                <div class="text-sm text-gray-500">{{ center.name }}</div>
                <div v-if="center.parentName" class="text-xs text-gray-400">
                  Parent: {{ center.parentName }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getCostCenterTypeBadgeClass(center.type)"
                >
                  {{ center.type }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                  :class="getStatusBadgeClass(center.status)"
                >
                  {{ center.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ center.manager || '-' }}</div>
                <div class="text-sm text-gray-500">{{ center.department || '-' }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatCurrency(center.budgetAmount) }}</div>
                <div class="text-xs text-gray-500">{{ center.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ formatCurrency(center.actualAmount) }}</div>
                <div class="text-xs text-gray-500">{{ center.currency }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div
                  class="text-sm"
                  :class="center.varianceAmount >= 0 ? 'text-red-600' : 'text-green-600'"
                >
                  {{ formatCurrency(Math.abs(center.varianceAmount)) }}
                </div>
                <div class="text-xs text-gray-500">{{ center.variancePercentage.toFixed(1) }}%</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="openViewModal(center)"
                    class="text-sap-blue hover:text-sap-dark-blue"
                  >
                    View
                  </button>
                  <button
                    v-if="center.status === 'Active'"
                    @click="openEditModal(center)"
                    class="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                  <button
                    v-if="center.status === 'Active'"
                    @click="copyCostCenter(center.id)"
                    class="text-blue-600 hover:text-blue-900"
                  >
                    Copy
                  </button>
                  <button
                    v-if="center.status === 'Active'"
                    @click="toggleCostCenterStatus(center.id, 'Inactive')"
                    class="text-yellow-600 hover:text-yellow-900"
                  >
                    Deactivate
                  </button>
                  <button
                    v-else
                    @click="toggleCostCenterStatus(center.id, 'Active')"
                    class="text-green-600 hover:text-green-900"
                  >
                    Activate
                  </button>
                  <button
                    v-if="center.status === 'Inactive'"
                    @click="deleteCostCenter(center.id)"
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
      <div v-if="pagination.totalPages > 1" class="px-6 py-3 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Showing {{ (pagination.page - 1) * pagination.pageSize + 1 }} to
            {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} of
            {{ pagination.total }} results
          </div>
          <div class="flex space-x-2">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page === 1"
              class="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span class="px-3 py-1 text-sm text-gray-700">
              Page {{ pagination.page }} of {{ pagination.totalPages }}
            </span>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page === pagination.totalPages"
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
      v-if="isCreateModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeCreateModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">
            {{ editingItem ? 'Edit Cost Center' : 'Create New Cost Center' }}
          </h3>
          <button @click="closeCreateModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <CostCenterForm
          :initial-data="editingItem"
          :loading="loading"
          @submit="handleSubmit"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Modal -->
    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-6 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Cost Center Details</h3>
          <button @click="closeViewModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div v-if="selectedItem" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Code</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.code }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Name</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.name }}</dd>
                </div>
                <div v-if="selectedItem.description">
                  <dt class="text-sm font-medium text-gray-500">Description</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.description }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Type</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.type }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Status</dt>
                  <dd class="text-sm">
                    <span
                      class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                      :class="getStatusBadgeClass(selectedItem.status)"
                    >
                      {{ selectedItem.status }}
                    </span>
                  </dd>
                </div>
                <div v-if="selectedItem.parentName">
                  <dt class="text-sm font-medium text-gray-500">Parent Cost Center</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.parentName }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Level</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.level }}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h3 class="text-lg font-medium text-gray-900 mb-4">Financial Information</h3>
              <dl class="space-y-3">
                <div>
                  <dt class="text-sm font-medium text-gray-500">Currency</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.currency }}</dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Budget Amount</dt>
                  <dd class="text-sm text-gray-900">
                    {{ formatCurrency(selectedItem.budgetAmount) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Actual Amount</dt>
                  <dd class="text-sm text-gray-900">
                    {{ formatCurrency(selectedItem.actualAmount) }}
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Variance</dt>
                  <dd class="text-sm text-gray-900">
                    <span
                      :class="
                        selectedItem.varianceAmount >= 0 ? 'text-red-600' : 'text-green-600'
                      "
                    >
                      {{ formatCurrency(Math.abs(selectedItem.varianceAmount)) }}
                    </span>
                    ({{ selectedItem.variancePercentage.toFixed(1) }}%)
                  </dd>
                </div>
                <div>
                  <dt class="text-sm font-medium text-gray-500">Allocated</dt>
                  <dd class="text-sm text-gray-900">
                    {{ selectedItem.isAllocated ? 'Yes' : 'No' }}
                  </dd>
                </div>
                <div v-if="selectedItem.allocationMethod">
                  <dt class="text-sm font-medium text-gray-500">Allocation Method</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.allocationMethod }}</dd>
                </div>
                <div v-if="selectedItem.costDriver">
                  <dt class="text-sm font-medium text-gray-500">Cost Driver</dt>
                  <dd class="text-sm text-gray-900">{{ selectedItem.costDriver }}</dd>
                </div>
              </dl>
            </div>
          </div>

          <!-- Organizational Information -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Organizational Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <dt class="text-sm font-medium text-gray-500">Manager</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.manager || '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Department</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.department || '-' }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Location</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.location || '-' }}</dd>
              </div>
            </div>
          </div>

          <!-- Timestamps -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">System Information</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <dt class="text-sm font-medium text-gray-500">Created</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.createdDate) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Modified</dt>
                <dd class="text-sm text-gray-900">{{ formatDate(selectedItem.modifiedDate) }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Created By</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.createdBy }}</dd>
              </div>
              <div>
                <dt class="text-sm font-medium text-gray-500">Modified By</dt>
                <dd class="text-sm text-gray-900">{{ selectedItem.modifiedBy }}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && !showAllocationForm" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="flex items-center justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-sap-blue" fill="none" viewBox="0 0 24 24">
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="ml-3 text-gray-600">Loading cost centers...</span>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error && !showAllocationForm" class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div class="text-center py-12">
        <div class="text-red-600 mb-4">
          <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            ></path>
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Error Loading Cost Centers</h3>
        <p class="text-gray-600 mb-4">{{ error }}</p>
        <button @click="retryLoad" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue">Try Again</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useCostAccountingStore } from '../stores/costAccountingStore'
import CostCenterForm from '../components/CostCenterForm.vue'
import type { CostCenter, CostCenterFormData } from '../types'
import { CostCenterType, CostCenterStatus, AllocationMethod } from '../types'

// Store
const store = useCostAccountingStore()

// Local state  
const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const editingItem = ref<CostCenter | null>(null)
const selectedItem = ref<CostCenter | null>(null)
const showAllocationForm = ref(false)
const searchQuery = ref('')
const selectedType = ref('')
const selectedStatus = ref('')
const selectedAllocationMethod = ref('')

// Computed
const costCenters = computed(() => store.costCenters)
const loading = computed(() => store.loading)
const error = computed(() => store.error)
const pagination = computed(() => store.pagination)
const stats = computed(() => store.stats)
const costCenterTypes = computed(() => store.costCenterTypes)
const costCenterStatuses = computed(() => store.costCenterStatuses)
const allocationMethods = computed(() => store.allocationMethods)

// Methods
const loadCostCenters = () => {
  store.fetchCostCenters()
  store.fetchCostCenterStats()
}

const handleSearch = () => {
  store.fetchCostCenters(1, pagination.value.pageSize, { search: searchQuery.value })
}

const handleFilterChange = () => {
  const filters: Record<string, string> = {}
  if (selectedType.value) filters.type = selectedType.value
  if (selectedStatus.value) filters.status = selectedStatus.value
  if (selectedAllocationMethod.value) filters.allocationMethod = selectedAllocationMethod.value
  if (searchQuery.value) filters.search = searchQuery.value

  store.fetchCostCenters(1, pagination.value.pageSize, filters)
}

const resetFilters = () => {
  searchQuery.value = ''
  selectedType.value = ''
  selectedStatus.value = ''
  selectedAllocationMethod.value = ''
  store.resetFilters()
  store.fetchCostCenters()
}

const changePage = (page: number) => {
  if (page >= 1 && page <= pagination.value.totalPages) {
    store.fetchCostCenters(page)
  }
}

// Modal Methods
const openCreateModal = () => {
  editingItem.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (item: CostCenter) => {
  closeViewModal()
  editingItem.value = item
  isCreateModalOpen.value = true
}

const openViewModal = (item: CostCenter) => {
  selectedItem.value = item
  isViewModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editingItem.value = null
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  selectedItem.value = null
}

const handleSubmit = async (data: CostCenterFormData) => {
  try {
    if (editingItem.value) {
      await store.updateCostCenter(editingItem.value.id, data)
    } else {
      await store.createCostCenter(data)
    }
    closeCreateModal()
    // Refresh the list
    store.fetchCostCenters()
    store.fetchCostCenterStats()
  } catch (error) {
    console.error('Failed to save cost center:', error)
  }
}

const deleteCostCenter = async (id: string) => {
  if (!confirm('Are you sure you want to delete this cost center? This action cannot be undone.')) {
    return
  }

  try {
    await store.deleteCostCenter(id)
    // Refresh the list
    store.fetchCostCenters()
    store.fetchCostCenterStats()
  } catch (error) {
    console.error('Failed to delete cost center:', error)
  }
}

const copyCostCenter = async (id: string) => {
  try {
    await store.copyCostCenter(id)
    // Refresh the list
    store.fetchCostCenters()
    store.fetchCostCenterStats()
    // Show success message
    alert('Cost center copied successfully!')
  } catch (error) {
    console.error('Failed to copy cost center:', error)
  }
}

const toggleCostCenterStatus = async (id: string, status: string) => {
  try {
    await store.toggleCostCenterStatus(id, status)
    // Refresh the list
    store.fetchCostCenters()
    store.fetchCostCenterStats()
  } catch (error) {
    console.error('Failed to toggle cost center status:', error)
  }
}

const retryLoad = () => {
  store.clearError()
  loadCostCenters()
}

const getStatusBadgeClass = (status: CostCenterStatus) => {
  const classes = {
    [CostCenterStatus.ACTIVE]: 'bg-green-100 text-green-800',
    [CostCenterStatus.INACTIVE]: 'bg-gray-100 text-gray-800',
    [CostCenterStatus.SUSPENDED]: 'bg-yellow-100 text-yellow-800',
    [CostCenterStatus.CLOSED]: 'bg-red-100 text-red-800',
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getCostCenterTypeBadgeClass = (type: CostCenterType) => {
  const classes = {
    [CostCenterType.PRODUCTION]: 'bg-blue-100 text-blue-800',
    [CostCenterType.ADMINISTRATION]: 'bg-purple-100 text-purple-800',
    [CostCenterType.SALES]: 'bg-green-100 text-green-800',
    [CostCenterType.MARKETING]: 'bg-indigo-100 text-indigo-800',
    [CostCenterType.RESEARCH]: 'bg-orange-100 text-orange-800',
    [CostCenterType.MAINTENANCE]: 'bg-yellow-100 text-yellow-800',
    [CostCenterType.QUALITY]: 'bg-teal-100 text-teal-800',
    [CostCenterType.LOGISTICS]: 'bg-pink-100 text-pink-800',
    [CostCenterType.IT]: 'bg-cyan-100 text-cyan-800',
    [CostCenterType.HR]: 'bg-emerald-100 text-emerald-800',
    [CostCenterType.FINANCE]: 'bg-violet-100 text-violet-800',
    [CostCenterType.LEGAL]: 'bg-amber-100 text-amber-800',
    [CostCenterType.OTHER]: 'bg-gray-100 text-gray-800',
  }
  return classes[type] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

// Lifecycle
onMounted(() => {
  loadCostCenters()
})

// Watch for store changes
watch(
  () => store.error,
  (newError) => {
    if (newError) {
      console.error('Store error:', newError)
    }
  },
)
</script>
