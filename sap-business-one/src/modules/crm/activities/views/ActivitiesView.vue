<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Activity Management</h1>
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
        Add Activity
      </button>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Total Activities</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">{{ stats?.totalActivities || 0 }}</p>
        </div>
        <div class="w-8 h-8 bg-sap-blue rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0l-6 6m6-6l6 6m-6 0v6m0 0h6m-6 0H8"
            ></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">In Progress</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ stats?.inProgressActivities || 0 }}
          </p>
        </div>
        <div class="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Completed</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ stats?.completedActivities || 0 }}
          </p>
        </div>
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

      <div class="bg-white shadow rounded-lg p-5 flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium text-gray-500">Overdue</h3>
          <p class="mt-1 text-3xl font-semibold text-gray-900">
            {{ stats?.overdueActivities || 0 }}
          </p>
        </div>
        <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search activities..."
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @keyup.enter="applyFilters"
        />
        <select
          v-model="filters.status"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Statuses</option>
          <option value="PLANNED">Planned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="OVERDUE">Overdue</option>
        </select>
        <select
          v-model="filters.type"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Types</option>
          <option value="CALL">Call</option>
          <option value="EMAIL">Email</option>
          <option value="MEETING">Meeting</option>
          <option value="VISIT">Visit</option>
          <option value="QUOTE">Quote</option>
          <option value="ORDER">Order</option>
          <option value="COMPLAINT">Complaint</option>
          <option value="SUPPORT">Support</option>
          <option value="FOLLOW_UP">Follow-up</option>
          <option value="PRESENTATION">Presentation</option>
          <option value="DEMO">Demo</option>
          <option value="TRAINING">Training</option>
        </select>
        <select
          v-model="filters.category"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Categories</option>
          <option value="SALES">Sales</option>
          <option value="MARKETING">Marketing</option>
          <option value="SUPPORT">Support</option>
          <option value="ADMINISTRATIVE">Administrative</option>
          <option value="TRAINING">Training</option>
          <option value="OTHER">Other</option>
        </select>
        <select
          v-model="filters.priority"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
          @change="applyFilters"
        >
          <option value="">All Priorities</option>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
          <option value="CRITICAL">Critical</option>
        </select>
        <div class="flex space-x-2">
          <button
            @click="applyFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sap-blue hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Apply Filters
          </button>
          <button
            @click="clearFilters"
            class="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- Activity Table -->
    <div class="bg-white shadow rounded-lg overflow-hidden">
      <div class="px-6 py-4 flex items-center justify-between">
        <h3 class="text-lg font-medium text-gray-900">Activities</h3>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Activity
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
                Start Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="loading">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">Loading activities...</td>
            </tr>
            <tr v-else-if="activities.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-gray-500">No activities found.</td>
            </tr>
            <tr v-for="activity in activities" :key="activity.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div
                      class="h-10 w-10 rounded-full bg-sap-blue flex items-center justify-center"
                    >
                      <span class="text-sm font-medium text-white">
                        {{ activity.title.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ activity.title }}</div>
                    <div class="text-sm text-gray-500">{{ activity.activityCode }}</div>
                    <div
                      v-if="activity.description"
                      class="text-sm text-gray-500 truncate max-w-xs"
                    >
                      {{ activity.description }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800"
                >
                  {{ formatActivityType(activity.type) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-blue-100 text-blue-800': activity.status === 'PLANNED',
                    'bg-yellow-100 text-yellow-800': activity.status === 'IN_PROGRESS',
                    'bg-green-100 text-green-800': activity.status === 'COMPLETED',
                    'bg-red-100 text-red-800': activity.status === 'CANCELLED',
                    'bg-gray-100 text-gray-800': activity.status === 'ON_HOLD',
                    'bg-orange-100 text-orange-800': activity.status === 'OVERDUE',
                  }"
                >
                  {{ formatActivityStatus(activity.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatActivityCategory(activity.category) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="inline-flex px-2 py-1 text-xs font-medium rounded-full"
                  :class="{
                    'bg-gray-100 text-gray-800': activity.priority === 'LOW',
                    'bg-blue-100 text-blue-800': activity.priority === 'MEDIUM',
                    'bg-orange-100 text-orange-800': activity.priority === 'HIGH',
                    'bg-red-100 text-red-800': activity.priority === 'CRITICAL',
                  }"
                >
                  {{ formatActivityPriority(activity.priority) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ activity.assignedTo }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDateTime(activity.startDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button
                    @click="openViewModal(activity)"
                    class="text-sap-blue hover:text-sap-blue-dark"
                    title="View"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="openEditModal(activity)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="openDuplicateModal(activity)"
                    class="text-yellow-600 hover:text-yellow-900"
                    title="Duplicate"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-2m0-4h5m-5 0h.01"
                      ></path>
                    </svg>
                  </button>
                  <button
                    @click="deleteActivity(activity.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete"
                  >
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <nav
        class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="previousPage"
            :disabled="!pagination.hasPrev"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="!pagination.hasNext"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing {{ (pagination.page - 1) * pagination.limit + 1 }} to
              {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of
              {{ pagination.total }} results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="previousPage"
                :disabled="!pagination.hasPrev"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Previous</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                v-for="p in pagination.totalPages"
                :key="p"
                @click="goToPage(p)"
                :class="[
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                  pagination.page === p
                    ? 'z-10 bg-sap-blue border-sap-blue text-white'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50',
                ]"
              >
                {{ p }}
              </button>
              <button
                @click="nextPage"
                :disabled="!pagination.hasNext"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span class="sr-only">Next</span>
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </nav>
    </div>

    <!-- Create/Edit Activity Modal -->
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
            {{ editingActivity ? 'Edit Activity' : 'Create New Activity' }}
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

        <ActivityForm
          :activity="editingActivity"
          @submit="handleSubmitActivity"
          @cancel="closeCreateModal"
        />
      </div>
    </div>

    <!-- View Activity Modal -->
    <div
      v-if="isViewModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-start p-4"
      @click.self="closeViewModal"
    >
      <div
        class="relative mx-auto p-4 sm:p-6 border w-11/12 max-w-7xl shadow-lg rounded-md bg-white max-h-[90vh] overflow-y-auto"
      >
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Activity Details</h3>
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

        <ActivityView v-if="viewingActivity" :activity="viewingActivity" />
      </div>
    </div>

    <!-- Duplicate Activity Modal -->
    <div
      v-if="isDuplicateModalOpen"
      class="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 flex justify-center items-center"
      @click.self="closeDuplicateModal"
    >
      <div class="relative mx-auto p-6 border w-11/12 max-w-md shadow-lg rounded-md bg-white">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-gray-900">Duplicate Activity</h3>
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

        <form @submit.prevent="handleDuplicateActivity" class="space-y-4">
          <div>
            <label for="duplicateActivityCode" class="block text-sm font-medium text-gray-700 mb-1"
              >New Activity Code *</label
            >
            <input
              type="text"
              id="duplicateActivityCode"
              v-model="duplicateForm.activityCode"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Activity Title *</label>
            <input
              type="text"
              id="duplicateActivityTitle"
              v-model="duplicateForm.title"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">New Start Date *</label>
            <input
              type="datetime-local"
              id="duplicateStartDate"
              v-model="duplicateForm.startDate"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-sap-blue focus:ring-sap-blue sm:text-sm"
            />
          </div>

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="closeDuplicateModal"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm font-medium text-white bg-sap-blue border border-transparent rounded-md shadow-sm hover:bg-sap-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Duplicate
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useActivityStore } from '../stores'
import ActivityForm from '../components/ActivityForm.vue'
import ActivityView from '../components/ActivityView.vue'
import type { Activity, ActivityFormData, ActivityFilters } from '../types'
import { ActivityStatus, ActivityType, ActivityCategory, ActivityPriority } from '../types'

const activityStore = useActivityStore()

const isCreateModalOpen = ref(false)
const isViewModalOpen = ref(false)
const isDuplicateModalOpen = ref(false)
const editingActivity = ref<Activity | null>(null)
const viewingActivity = ref<Activity | null>(null)

const searchQuery = ref('')
const filters = ref<ActivityFilters>({
  status: '',
  type: '',
  category: '',
  priority: '',
})

const activities = computed(() => activityStore.activities)
const loading = computed(() => activityStore.loading)
const stats = computed(() => activityStore.stats)
const pagination = computed(() => activityStore.pagination)

const openCreateModal = () => {
  editingActivity.value = null
  isCreateModalOpen.value = true
}

const openEditModal = (activity: Activity) => {
  editingActivity.value = { ...activity }
  isCreateModalOpen.value = true
}

const closeCreateModal = () => {
  isCreateModalOpen.value = false
  editingActivity.value = null
}

const openViewModal = (activity: Activity) => {
  viewingActivity.value = activity
  isViewModalOpen.value = true
}

const closeViewModal = () => {
  isViewModalOpen.value = false
  viewingActivity.value = null
}

const duplicateForm = ref({
  activityCode: '',
  title: '',
  startDate: '',
})

const openDuplicateModal = (activity: Activity) => {
  editingActivity.value = activity
  duplicateForm.value.activityCode = ''
  duplicateForm.value.title = ''
  duplicateForm.value.startDate = ''
  isDuplicateModalOpen.value = true
}

const closeDuplicateModal = () => {
  isDuplicateModalOpen.value = false
  editingActivity.value = null
  duplicateForm.value = { activityCode: '', title: '', startDate: '' }
}

const handleSubmitActivity = async (formData: ActivityFormData) => {
  try {
    if (editingActivity.value) {
      await activityStore.updateActivity(editingActivity.value.id, formData)
    } else {
      await activityStore.createActivity(formData)
    }
    closeCreateModal()
    await activityStore.loadActivities()
    await activityStore.loadActivityStats()
  } catch (err) {
    console.error('Error submitting activity:', err)
  }
}

const handleDuplicateActivity = async () => {
  if (!editingActivity.value) return

  try {
    await activityStore.duplicateActivity(
      editingActivity.value.id,
      duplicateForm.value.activityCode,
      duplicateForm.value.title,
      new Date(duplicateForm.value.startDate),
    )
    closeDuplicateModal()
    await activityStore.loadActivities()
    await activityStore.loadActivityStats()
  } catch (err) {
    console.error('Error duplicating activity:', err)
  }
}

const deleteActivity = async (id: string) => {
  if (confirm('Are you sure you want to delete this activity?')) {
    try {
      await activityStore.deleteActivity(id)
      await activityStore.loadActivities()
      await activityStore.loadActivityStats()
    } catch (err) {
      console.error('Error deleting activity:', err)
    }
  }
}

const applyFilters = () => {
  const newFilters: ActivityFilters = {}

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

  if (filters.value.priority) {
    newFilters.priority = filters.value.priority
  }

  activityStore.setFilters(newFilters)
}

const clearFilters = () => {
  searchQuery.value = ''
  filters.value = {
    status: '',
    type: '',
    category: '',
    priority: '',
  }
  activityStore.clearFilters()
}

const nextPage = () => activityStore.nextPage()
const previousPage = () => activityStore.previousPage()
const goToPage = (page: number) => activityStore.goToPage(page)

// Utility functions for display
const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

const formatActivityStatus = (status: ActivityStatus) => {
  const statusMap: Record<ActivityStatus, string> = {
    PLANNED: 'Planned',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
    ON_HOLD: 'On Hold',
    OVERDUE: 'Overdue',
  }
  return statusMap[status] || status
}

const formatActivityType = (type: ActivityType) => {
  const typeMap: Record<ActivityType, string> = {
    CALL: 'Call',
    EMAIL: 'Email',
    MEETING: 'Meeting',
    VISIT: 'Visit',
    QUOTE: 'Quote',
    ORDER: 'Order',
    COMPLAINT: 'Complaint',
    SUPPORT: 'Support',
    FOLLOW_UP: 'Follow-up',
    PRESENTATION: 'Presentation',
    DEMO: 'Demo',
    TRAINING: 'Training',
  }
  return typeMap[type] || type
}

const formatActivityCategory = (category: ActivityCategory) => {
  const categoryMap: Record<ActivityCategory, string> = {
    SALES: 'Sales',
    MARKETING: 'Marketing',
    SUPPORT: 'Support',
    ADMINISTRATIVE: 'Administrative',
    TRAINING: 'Training',
    OTHER: 'Other',
  }
  return categoryMap[category] || category
}

const formatActivityPriority = (priority: ActivityPriority) => {
  const priorityMap: Record<ActivityPriority, string> = {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    CRITICAL: 'Critical',
  }
  return priorityMap[priority] || priority
}

onMounted(() => {
  activityStore.loadActivities()
  activityStore.loadActivityStats()
})
</script>
