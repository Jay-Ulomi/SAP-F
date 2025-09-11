<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ position ? 'Edit Position' : 'New Position' }}
      </h2>
      <button @click="$emit('cancel')" class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Basic Information -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 class="font-medium text-gray-900">Basic Information</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Position Title *</label>
            <input
              type="text"
              v-model="form.title"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., Senior Software Engineer"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Position Code *</label>
            <input
              type="text"
              v-model="form.code"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="e.g., SSE-001"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <select
              v-model="form.departmentId"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }}
              </option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Level *</label>
            <select
              v-model="form.level"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="entry">Entry Level</option>
              <option value="junior">Junior</option>
              <option value="senior">Senior</option>
              <option value="lead">Lead</option>
              <option value="manager">Manager</option>
              <option value="director">Director</option>
              <option value="executive">Executive</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Employment Type *</label>
            <select
              v-model="form.employmentType"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="intern">Intern</option>
              <option value="consultant">Consultant</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Brief description of the position"
          ></textarea>
        </div>
      </div>

      <!-- Job Details -->
      <div class="space-y-4">
        <h3 class="font-medium text-gray-900">Job Details</h3>
        
        <!-- Responsibilities -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Key Responsibilities</label>
          <div class="space-y-2">
            <div v-for="(responsibility, index) in form.responsibilities" :key="index" class="flex items-center space-x-2">
              <input
                type="text"
                v-model="form.responsibilities[index]"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter responsibility"
              />
              <button
                type="button"
                @click="removeResponsibility(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addResponsibility"
              class="w-full px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
            >
              Add Responsibility
            </button>
          </div>
        </div>

        <!-- Requirements -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Requirements</label>
          <div class="space-y-2">
            <div v-for="(requirement, index) in form.requirements" :key="index" class="flex items-center space-x-2">
              <input
                type="text"
                v-model="form.requirements[index]"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter requirement"
              />
              <button
                type="button"
                @click="removeRequirement(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addRequirement"
              class="w-full px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
            >
              Add Requirement
            </button>
          </div>
        </div>

        <!-- Qualifications -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Preferred Qualifications</label>
          <div class="space-y-2">
            <div v-for="(qualification, index) in form.qualifications" :key="index" class="flex items-center space-x-2">
              <input
                type="text"
                v-model="form.qualifications[index]"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter qualification"
              />
              <button
                type="button"
                @click="removeQualification(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addQualification"
              class="w-full px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
            >
              Add Qualification
            </button>
          </div>
        </div>
      </div>

      <!-- Compensation & Benefits -->
      <div class="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 class="font-medium text-gray-900">Compensation & Benefits</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Min Salary *</label>
            <input
              type="number"
              v-model.number="form.salaryRange.min"
              min="0"
              step="1000"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Max Salary *</label>
            <input
              type="number"
              v-model.number="form.salaryRange.max"
              min="0"
              step="1000"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Currency *</label>
            <select
              v-model="form.salaryRange.currency"
              required
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
            </select>
          </div>
        </div>

        <!-- Benefits -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
          <div class="space-y-2">
            <div v-for="(benefit, index) in form.benefits" :key="index" class="flex items-center space-x-2">
              <input
                type="text"
                v-model="form.benefits[index]"
                class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Enter benefit"
              />
              <button
                type="button"
                @click="removeBenefit(index)"
                class="text-red-600 hover:text-red-800"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              @click="addBenefit"
              class="w-full px-3 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-md hover:bg-indigo-100"
            >
              Add Benefit
            </button>
          </div>
        </div>
      </div>

      <!-- Additional Information -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Reports To</label>
          <select
            v-model="form.reportingTo"
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Select Manager</option>
            <option v-for="employee in employees" :key="employee.id" :value="employee.id">
              {{ employee.name }} {{ employee.positionTitle ? `(${employee.positionTitle})` : '' }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Total Positions *</label>
          <input
            type="number"
            v-model.number="form.totalPositions"
            min="1"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            v-model="form.location"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="e.g., New York, NY"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Status *</label>
          <select
            v-model="form.status"
            required
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          v-model="form.isRemoteEligible"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label class="ml-2 block text-sm text-gray-900">
          Remote work eligible
        </label>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
          {{ loading ? 'Saving...' : position ? 'Update Position' : 'Create Position' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { Position, PositionFormData, PositionLevel, EmploymentType, PositionStatus, Department, Employee } from '../types'

interface Props {
  position?: Position
  departments: Department[]
  employees: Employee[]
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [data: PositionFormData]
  cancel: []
}>()

const form = ref<PositionFormData>({
  title: '',
  code: '',
  departmentId: '',
  level: 'entry' as PositionLevel,
  employmentType: 'full_time' as EmploymentType,
  status: 'active' as PositionStatus,
  description: '',
  responsibilities: [''],
  requirements: [''],
  qualifications: [''],
  salaryRange: {
    min: 0,
    max: 0,
    currency: 'USD'
  },
  benefits: [''],
  reportingTo: '',
  location: '',
  isRemoteEligible: false,
  totalPositions: 1
})

function addResponsibility() {
  form.value.responsibilities.push('')
}

function removeResponsibility(index: number) {
  if (form.value.responsibilities.length > 1) {
    form.value.responsibilities.splice(index, 1)
  }
}

function addRequirement() {
  form.value.requirements.push('')
}

function removeRequirement(index: number) {
  if (form.value.requirements.length > 1) {
    form.value.requirements.splice(index, 1)
  }
}

function addQualification() {
  form.value.qualifications.push('')
}

function removeQualification(index: number) {
  if (form.value.qualifications.length > 1) {
    form.value.qualifications.splice(index, 1)
  }
}

function addBenefit() {
  form.value.benefits.push('')
}

function removeBenefit(index: number) {
  if (form.value.benefits.length > 1) {
    form.value.benefits.splice(index, 1)
  }
}

function handleSubmit() {
  // Clean up empty arrays
  const cleanedData = {
    ...form.value,
    responsibilities: form.value.responsibilities.filter(r => r.trim()),
    requirements: form.value.requirements.filter(r => r.trim()),
    qualifications: form.value.qualifications.filter(q => q.trim()),
    benefits: form.value.benefits.filter(b => b.trim()),
  }
  
  emit('submit', cleanedData)
}

onMounted(() => {
  if (props.position) {
    form.value = {
      title: props.position.title,
      code: props.position.code,
      departmentId: props.position.departmentId,
      level: props.position.level,
      employmentType: props.position.employmentType,
      status: props.position.status,
      description: props.position.description || '',
      responsibilities: props.position.responsibilities.length ? props.position.responsibilities : [''],
      requirements: props.position.requirements.length ? props.position.requirements : [''],
      qualifications: props.position.qualifications.length ? props.position.qualifications : [''],
      salaryRange: props.position.salaryRange,
      benefits: props.position.benefits.length ? props.position.benefits : [''],
      reportingTo: props.position.reportingTo || '',
      location: props.position.location,
      isRemoteEligible: props.position.isRemoteEligible,
      totalPositions: props.position.totalPositions
    }
  }
})
</script>