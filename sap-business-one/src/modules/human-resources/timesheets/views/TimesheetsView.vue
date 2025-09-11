<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Timesheets</h1>
        <p class="text-sm text-gray-600">Track and manage employee working hours and attendance</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Timesheet Entry</button>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Hours This Week</p>
            <p class="text-xl font-bold text-gray-900">{{ totalHoursThisWeek }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-green-100">
            <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Approved Entries</p>
            <p class="text-xl font-bold text-gray-900">{{ approvedEntries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Pending Review</p>
            <p class="text-xl font-bold text-gray-900">{{ pendingEntries }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Employees</p>
            <p class="text-xl font-bold text-gray-900">{{ activeEmployees }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters and Search -->
    <div class="bg-white shadow rounded-lg p-6">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search entries..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterEmployee"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Employees</option>
            <option v-for="employee in uniqueEmployees" :key="employee" :value="employee">
              {{ employee }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div>
          <input
            type="date"
            v-model="filterDate"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            @click="resetFilters"
            class="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>

    <!-- Timesheet Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Timesheet Entries</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project/Task
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hours
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Overtime
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="entry in filteredEntries" :key="entry.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-8 w-8">
                    <div class="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-xs font-medium text-gray-700">{{ getInitials(entry.employeeName) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ entry.employeeName }}</div>
                    <div class="text-sm text-gray-500">{{ entry.employeeId }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(entry.date).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ entry.project || 'General' }}</div>
                <div class="text-sm text-gray-500">{{ entry.task || entry.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.regularHours }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.overtimeHours || 0 }}h
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                    entry.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                    entry.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800',
                  ]"
                >
                  {{ formatStatus(entry.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ entry.submittedAt ? new Date(entry.submittedAt).toLocaleDateString() : '-' }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewEntry(entry)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    v-if="entry.status === 'draft'"
                    @click="editEntry(entry)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit Entry"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    v-if="entry.status === 'submitted'"
                    @click="approveEntry(entry.id)"
                    class="text-green-600 hover:text-green-900"
                    title="Approve Entry"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    v-if="entry.status === 'submitted'"
                    @click="rejectEntry(entry.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Reject Entry"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    @click="deleteEntry(entry.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete Entry"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredEntries.length === 0" class="text-center py-8">
          <p class="text-gray-500">No timesheet entries found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-3xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Timesheet Entry</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <TimesheetForm 
          :loading="loading"
          @submit="handleCreateEntry"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedEntry" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-3xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Edit Timesheet Entry</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <TimesheetForm 
          :entry="selectedEntry"
          :loading="loading"
          @submit="handleUpdateEntry"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedEntry" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Timesheet Entry Details</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <TimesheetDetails :entry="selectedEntry" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTimesheetStore } from '../stores/timesheetStore'
import type { TimesheetEntry, TimesheetFormData } from '../types'
import TimesheetForm from '../components/TimesheetForm.vue'
import TimesheetDetails from '../components/TimesheetDetails.vue'

const timesheetStore = useTimesheetStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedEntry = ref<TimesheetEntry | null>(null)

// Filters
const searchQuery = ref('')
const filterEmployee = ref('')
const filterStatus = ref('')
const filterDate = ref('')

const filteredEntries = computed(() => {
  let filtered = timesheetStore.entries

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      entry =>
        entry.employeeName.toLowerCase().includes(query) ||
        entry.employeeId.toLowerCase().includes(query) ||
        entry.project?.toLowerCase().includes(query) ||
        entry.task?.toLowerCase().includes(query) ||
        entry.description?.toLowerCase().includes(query)
    )
  }

  if (filterEmployee.value) {
    filtered = filtered.filter(entry => entry.employeeName === filterEmployee.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(entry => entry.status === filterStatus.value)
  }

  if (filterDate.value) {
    filtered = filtered.filter(entry => 
      entry.date.substring(0, 10) === filterDate.value
    )
  }

  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// Statistics computed properties
const totalHoursThisWeek = computed(() => {
  const now = new Date()
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()))
  return timesheetStore.entries
    .filter(e => new Date(e.date) >= startOfWeek)
    .reduce((sum, e) => sum + e.regularHours + (e.overtimeHours || 0), 0)
})

const approvedEntries = computed(() => 
  timesheetStore.entries.filter(e => e.status === 'approved').length
)

const pendingEntries = computed(() => 
  timesheetStore.entries.filter(e => e.status === 'submitted').length
)

const activeEmployees = computed(() => {
  const uniqueEmployees = [...new Set(timesheetStore.entries.map(e => e.employeeId))]
  return uniqueEmployees.length
})

const uniqueEmployees = computed(() => {
  return [...new Set(timesheetStore.entries.map(e => e.employeeName))].sort()
})

// Helper functions
function getInitials(name: string): string {
  return name.split(' ').map(n => n.charAt(0)).join('').toUpperCase().substring(0, 2)
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewEntry(entry: TimesheetEntry) {
  selectedEntry.value = entry
  showViewModal.value = true
}

function editEntry(entry: TimesheetEntry) {
  selectedEntry.value = entry
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedEntry.value = null
}

// Entry actions
async function handleCreateEntry(formData: TimesheetFormData) {
  try {
    loading.value = true
    await timesheetStore.createEntry(formData)
    closeModals()
  } catch (error) {
    console.error('Error creating timesheet entry:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateEntry(formData: TimesheetFormData) {
  if (!selectedEntry.value) return
  
  try {
    loading.value = true
    await timesheetStore.updateEntry(selectedEntry.value.id, formData)
    closeModals()
  } catch (error) {
    console.error('Error updating timesheet entry:', error)
  } finally {
    loading.value = false
  }
}

async function approveEntry(id: string) {
  if (confirm('Are you sure you want to approve this timesheet entry?')) {
    try {
      loading.value = true
      await timesheetStore.approveEntry(id)
    } catch (error) {
      console.error('Error approving entry:', error)
    } finally {
      loading.value = false
    }
  }
}

async function rejectEntry(id: string) {
  if (confirm('Are you sure you want to reject this timesheet entry?')) {
    try {
      loading.value = true
      await timesheetStore.rejectEntry(id)
    } catch (error) {
      console.error('Error rejecting entry:', error)
    } finally {
      loading.value = false
    }
  }
}

async function deleteEntry(id: string) {
  if (confirm('Are you sure you want to delete this timesheet entry?')) {
    try {
      loading.value = true
      await timesheetStore.deleteEntry(id)
    } catch (error) {
      console.error('Error deleting entry:', error)
    } finally {
      loading.value = false
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterEmployee.value = ''
  filterStatus.value = ''
  filterDate.value = ''
}

onMounted(async () => {
  try {
    await timesheetStore.fetchEntries()
  } catch (error) {
    console.error('Error loading timesheet entries:', error)
  }
})
</script>