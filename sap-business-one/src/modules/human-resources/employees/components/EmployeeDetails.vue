<template>
  <div class="space-y-6">
    <!-- Header with photo placeholder and basic info -->
    <div class="bg-white rounded-lg border border-gray-200 p-6">
      <div class="flex items-start space-x-6">
        <div class="flex-shrink-0">
          <div class="h-20 w-20 rounded-full bg-gray-300 flex items-center justify-center">
            <span class="text-2xl font-bold text-gray-700">{{ getInitials(employee.firstName, employee.lastName) }}</span>
          </div>
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-900">{{ employee.firstName }} {{ employee.lastName }}</h2>
              <p class="text-lg text-gray-600">{{ employee.position }}</p>
              <p class="text-sm text-gray-500">{{ employee.department }} Department</p>
            </div>
            <div class="text-right">
              <span
                :class="[
                  'inline-flex px-3 py-1 text-sm font-semibold rounded-full',
                  employee.status === 'active' ? 'bg-green-100 text-green-800' :
                  employee.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  employee.status === 'on_leave' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800',
                ]"
              >
                {{ formatStatus(employee.status) }}
              </span>
              <p class="text-sm text-gray-500 mt-2">ID: {{ employee.employeeId }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Information tabs or sections -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Personal Information -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <dl class="space-y-3">
          <div v-if="employee.email">
            <dt class="text-sm font-medium text-gray-500">Email</dt>
            <dd class="text-sm text-gray-900">{{ employee.email }}</dd>
          </div>
          <div v-if="employee.phoneNumber">
            <dt class="text-sm font-medium text-gray-500">Phone Number</dt>
            <dd class="text-sm text-gray-900">{{ employee.phoneNumber }}</dd>
          </div>
          <div v-if="employee.dateOfBirth">
            <dt class="text-sm font-medium text-gray-500">Date of Birth</dt>
            <dd class="text-sm text-gray-900">{{ new Date(employee.dateOfBirth).toLocaleDateString() }}</dd>
          </div>
          <div v-if="employee.gender">
            <dt class="text-sm font-medium text-gray-500">Gender</dt>
            <dd class="text-sm text-gray-900 capitalize">{{ employee.gender }}</dd>
          </div>
          <div v-if="employee.maritalStatus">
            <dt class="text-sm font-medium text-gray-500">Marital Status</dt>
            <dd class="text-sm text-gray-900 capitalize">{{ employee.maritalStatus }}</dd>
          </div>
          <div v-if="employee.nationality">
            <dt class="text-sm font-medium text-gray-500">Nationality</dt>
            <dd class="text-sm text-gray-900">{{ employee.nationality }}</dd>
          </div>
          <div v-if="employee.address">
            <dt class="text-sm font-medium text-gray-500">Address</dt>
            <dd class="text-sm text-gray-900">{{ employee.address }}</dd>
          </div>
        </dl>
      </div>

      <!-- Employment Information -->
      <div class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Employment Information</h3>
        <dl class="space-y-3">
          <div>
            <dt class="text-sm font-medium text-gray-500">Hire Date</dt>
            <dd class="text-sm text-gray-900">{{ new Date(employee.hireDate).toLocaleDateString() }}</dd>
          </div>
          <div v-if="employee.manager">
            <dt class="text-sm font-medium text-gray-500">Manager</dt>
            <dd class="text-sm text-gray-900">{{ employee.manager }}</dd>
          </div>
          <div v-if="employee.employmentType">
            <dt class="text-sm font-medium text-gray-500">Employment Type</dt>
            <dd class="text-sm text-gray-900 capitalize">{{ employee.employmentType.replace('_', ' ') }}</dd>
          </div>
          <div v-if="employee.salary">
            <dt class="text-sm font-medium text-gray-500">Salary</dt>
            <dd class="text-sm text-gray-900">${{ employee.salary.toLocaleString() }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Years of Service</dt>
            <dd class="text-sm text-gray-900">{{ getYearsOfService() }} years</dd>
          </div>
        </dl>
      </div>

      <!-- Emergency Contact -->
      <div v-if="hasEmergencyContact" class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
        <dl class="space-y-3">
          <div v-if="employee.emergencyContactName">
            <dt class="text-sm font-medium text-gray-500">Contact Name</dt>
            <dd class="text-sm text-gray-900">{{ employee.emergencyContactName }}</dd>
          </div>
          <div v-if="employee.emergencyContactRelationship">
            <dt class="text-sm font-medium text-gray-500">Relationship</dt>
            <dd class="text-sm text-gray-900">{{ employee.emergencyContactRelationship }}</dd>
          </div>
          <div v-if="employee.emergencyContactPhone">
            <dt class="text-sm font-medium text-gray-500">Contact Phone</dt>
            <dd class="text-sm text-gray-900">{{ employee.emergencyContactPhone }}</dd>
          </div>
        </dl>
      </div>

      <!-- Additional Information -->
      <div v-if="employee.notes" class="bg-white rounded-lg border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
        <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ employee.notes }}</p>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="flex justify-end space-x-3 pt-4 border-t">
      <button
        @click="generateReport"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Generate Report
      </button>
      <button
        @click="editEmployee"
        class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
      >
        Edit Employee
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Employee } from '../types'

interface Props {
  employee: Employee
}

const props = defineProps<Props>()

const emit = defineEmits<{
  edit: [employee: Employee]
  generateReport: [employee: Employee]
}>()

const hasEmergencyContact = computed(() => {
  return props.employee.emergencyContactName || 
         props.employee.emergencyContactRelationship || 
         props.employee.emergencyContactPhone
})

// Helper functions
function getInitials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()
}

function formatStatus(status: string): string {
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
}

function getYearsOfService(): number {
  const hireDate = new Date(props.employee.hireDate)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - hireDate.getTime())
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25))
  return diffYears
}

function editEmployee() {
  emit('edit', props.employee)
}

function generateReport() {
  emit('generateReport', props.employee)
}
</script>