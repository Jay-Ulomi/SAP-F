<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {{ employee ? 'Edit Employee' : 'Create New Employee' }}
      </h3>
      <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
          <input
            type="text"
            v-model="formData.employeeId"
            :disabled="!!employee"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            v-model="formData.status"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              v-model="formData.firstName"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              v-model="formData.lastName"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
            <input
              type="date"
              v-model="formData.dateOfBirth"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              v-model="formData.gender"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
            <select
              v-model="formData.maritalStatus"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Status</option>
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="divorced">Divorced</option>
              <option value="widowed">Widowed</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
            <input
              type="text"
              v-model="formData.nationality"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., American"
            />
          </div>
        </div>
      </div>

      <!-- Contact Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Contact Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              v-model="formData.email"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              v-model="formData.phoneNumber"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
          <textarea
            v-model="formData.address"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Street address, city, state, postal code"
          ></textarea>
        </div>
      </div>

      <!-- Employment Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Employment Information</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <select
              v-model="formData.department"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="">Select Department</option>
              <option value="HR">Human Resources</option>
              <option value="IT">Information Technology</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Marketing">Marketing</option>
              <option value="Operations">Operations</option>
              <option value="Production">Production</option>
              <option value="Quality">Quality</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Position *</label>
            <input
              type="text"
              v-model="formData.position"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Hire Date *</label>
            <input
              type="date"
              v-model="formData.hireDate"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Manager</label>
            <input
              type="text"
              v-model="formData.manager"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Manager's name"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
            <select
              v-model="formData.employmentType"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              v-model.number="formData.salary"
              min="0"
              step="0.01"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <!-- Emergency Contact -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Emergency Contact</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
            <input
              type="text"
              v-model="formData.emergencyContactName"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
            <input
              type="text"
              v-model="formData.emergencyContactRelationship"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Spouse, Parent"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
            <input
              type="tel"
              v-model="formData.emergencyContactPhone"
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="border-t pt-6">
        <h4 class="text-md font-medium text-gray-900 mb-4">Additional Information</h4>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            v-model="formData.notes"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Additional notes about the employee..."
          ></textarea>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-6 border-t">
        <button
          type="button"
          @click="$emit('cancel')"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {{ loading ? 'Saving...' : (employee ? 'Update Employee' : 'Create Employee') }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Employee, EmployeeFormData } from '../types'

interface Props {
  employee?: Employee
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: EmployeeFormData]
  cancel: []
}>()

const formData = ref<EmployeeFormData>({
  employeeId: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: '',
  dateOfBirth: '',
  gender: '',
  maritalStatus: '',
  nationality: '',
  department: '',
  position: '',
  hireDate: new Date().toISOString().split('T')[0],
  manager: '',
  employmentType: 'full_time',
  salary: 0,
  status: 'active',
  emergencyContactName: '',
  emergencyContactRelationship: '',
  emergencyContactPhone: '',
  notes: ''
})

function handleSubmit() {
  // Validate required fields
  if (!formData.value.employeeId || !formData.value.firstName || !formData.value.lastName || 
      !formData.value.email || !formData.value.department || !formData.value.position || 
      !formData.value.hireDate) {
    alert('Please fill in all required fields')
    return
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(formData.value.email)) {
    alert('Please enter a valid email address')
    return
  }

  emit('submit', { ...formData.value })
}

onMounted(() => {
  if (props.employee) {
    // Pre-fill form with existing employee data
    formData.value = {
      employeeId: props.employee.employeeId,
      firstName: props.employee.firstName,
      lastName: props.employee.lastName,
      email: props.employee.email,
      phoneNumber: props.employee.phoneNumber || '',
      address: props.employee.address || '',
      dateOfBirth: props.employee.dateOfBirth ? props.employee.dateOfBirth.split('T')[0] : '',
      gender: props.employee.gender || '',
      maritalStatus: props.employee.maritalStatus || '',
      nationality: props.employee.nationality || '',
      department: props.employee.department,
      position: props.employee.position,
      hireDate: props.employee.hireDate.split('T')[0],
      manager: props.employee.manager || '',
      employmentType: props.employee.employmentType || 'full_time',
      salary: props.employee.salary || 0,
      status: props.employee.status,
      emergencyContactName: props.employee.emergencyContactName || '',
      emergencyContactRelationship: props.employee.emergencyContactRelationship || '',
      emergencyContactPhone: props.employee.emergencyContactPhone || '',
      notes: props.employee.notes || ''
    }
  }
})
</script>