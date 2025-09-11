<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-lg font-medium text-gray-900">Employee Management</h1>
        <p class="text-sm text-gray-600">Manage employee information and organizational structure</p>
      </div>
      <button @click="openCreateModal" class="btn-primary">New Employee</button>
    </div>

    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-blue-100">
            <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Employees</p>
            <p class="text-xl font-bold text-gray-900">{{ totalEmployees }}</p>
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
            <p class="text-sm font-medium text-gray-600">Active</p>
            <p class="text-xl font-bold text-gray-900">{{ activeEmployees }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-yellow-100">
            <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Departments</p>
            <p class="text-xl font-bold text-gray-900">{{ totalDepartments }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div class="flex items-center">
          <div class="p-2 rounded-lg bg-purple-100">
            <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">New This Month</p>
            <p class="text-xl font-bold text-gray-900">{{ newThisMonth }}</p>
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
            placeholder="Search employees..."
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <select
            v-model="filterDepartment"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Departments</option>
            <option value="HR">Human Resources</option>
            <option value="IT">Information Technology</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterStatus"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
        <div>
          <select
            v-model="filterPosition"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="">All Positions</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
            <option value="Analyst">Analyst</option>
            <option value="Coordinator">Coordinator</option>
          </select>
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

    <!-- Employee Table -->
    <div class="bg-white shadow rounded-lg">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">Employees</h2>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Position
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hire Date
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="employee in filteredEmployees" :key="employee.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span class="text-sm font-medium text-gray-700">{{ getInitials(employee.firstName, employee.lastName) }}</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="text-sm font-medium text-gray-900">{{ employee.firstName }} {{ employee.lastName }}</div>
                    <div class="text-sm text-gray-500">{{ employee.phoneNumber }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ employee.employeeId }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ employee.department }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ employee.position }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ employee.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ new Date(employee.hireDate).toLocaleDateString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                    employee.status === 'active' ? 'bg-green-100 text-green-800' :
                    employee.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    employee.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800',
                  ]"
                >
                  {{ formatStatus(employee.status) }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex justify-end space-x-2">
                  <button
                    @click="viewEmployee(employee)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="View Details"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    @click="editEmployee(employee)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit Employee"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    @click="deleteEmployee(employee.id)"
                    class="text-red-600 hover:text-red-900"
                    title="Delete Employee"
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

        <div v-if="filteredEmployees.length === 0" class="text-center py-8">
          <p class="text-gray-500">No employees found.</p>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <div v-if="showCreateModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Create New Employee</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <EmployeeForm 
          :loading="loading"
          @submit="handleCreateEmployee"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showEditModal && selectedEmployee" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Edit Employee</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <EmployeeForm 
          :employee="selectedEmployee"
          :loading="loading"
          @submit="handleUpdateEmployee"
          @cancel="closeModals"
        />
      </div>
    </div>

    <div v-if="showViewModal && selectedEmployee" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Employee Details - {{ selectedEmployee.firstName }} {{ selectedEmployee.lastName }}</h3>
          <button @click="closeModals" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <EmployeeDetails :employee="selectedEmployee" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useEmployeeStore } from '../stores/employeeStore'
import type { Employee, EmployeeFormData } from '../types'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeDetails from '../components/EmployeeDetails.vue'

const employeeStore = useEmployeeStore()

const loading = ref(false)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showViewModal = ref(false)
const selectedEmployee = ref<Employee | null>(null)

// Filters
const searchQuery = ref('')
const filterDepartment = ref('')
const filterStatus = ref('')
const filterPosition = ref('')

const filteredEmployees = computed(() => {
  let filtered = employeeStore.employees

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      emp =>
        emp.firstName.toLowerCase().includes(query) ||
        emp.lastName.toLowerCase().includes(query) ||
        emp.email.toLowerCase().includes(query) ||
        emp.employeeId.toLowerCase().includes(query)
    )
  }

  if (filterDepartment.value) {
    filtered = filtered.filter(emp => emp.department === filterDepartment.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(emp => emp.status === filterStatus.value)
  }

  if (filterPosition.value) {
    filtered = filtered.filter(emp => emp.position === filterPosition.value)
  }

  return filtered
})

// Statistics computed properties
const totalEmployees = computed(() => employeeStore.employees.length)
const activeEmployees = computed(() => employeeStore.employees.filter(e => e.status === 'active').length)
const totalDepartments = computed(() => {
  const departments = [...new Set(employeeStore.employees.map(e => e.department))]
  return departments.length
})
const newThisMonth = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  return employeeStore.employees.filter(e => new Date(e.hireDate) >= startOfMonth).length
})

// Helper functions
function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

// Modal controls
function openCreateModal() {
  showCreateModal.value = true
}

function viewEmployee(employee: Employee) {
  selectedEmployee.value = employee
  showViewModal.value = true
}

function editEmployee(employee: Employee) {
  selectedEmployee.value = employee
  showEditModal.value = true
}

function closeModals() {
  showCreateModal.value = false
  showEditModal.value = false
  showViewModal.value = false
  selectedEmployee.value = null
}

// Employee actions
async function handleCreateEmployee(formData: EmployeeFormData) {
  try {
    loading.value = true
    await employeeStore.createEmployee(formData)
    closeModals()
  } catch (error) {
    console.error('Error creating employee:', error)
  } finally {
    loading.value = false
  }
}

async function handleUpdateEmployee(formData: EmployeeFormData) {
  if (!selectedEmployee.value) return
  
  try {
    loading.value = true
    await employeeStore.updateEmployee(selectedEmployee.value.id, formData)
    closeModals()
  } catch (error) {
    console.error('Error updating employee:', error)
  } finally {
    loading.value = false
  }
}

async function deleteEmployee(id: string) {
  if (confirm('Are you sure you want to delete this employee?')) {
    try {
      loading.value = true
      await employeeStore.deleteEmployee(id)
    } catch (error) {
      console.error('Error deleting employee:', error)
    } finally {
      loading.value = false
    }
  }
}

function resetFilters() {
  searchQuery.value = ''
  filterDepartment.value = ''
  filterStatus.value = ''
  filterPosition.value = ''
}

onMounted(async () => {
  try {
    await employeeStore.fetchEmployees()
  } catch (error) {
    console.error('Error loading employees:', error)
  }
})
</script>