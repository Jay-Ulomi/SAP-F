<template>
  <div class="card">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-900">
        {{ isEdit ? 'Edit' : 'Create' }} {{ title }}
      </h2>
      <button @click="$emit('cancel')" class="btn-secondary">Cancel</button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="field in fields"
          :key="field.name"
          :class="field.fullWidth ? 'md:col-span-2' : ''"
        >
          <label :for="field.name" class="block text-sm font-medium text-gray-700 mb-2">
            {{ field.label }}
            <span v-if="field.required" class="text-red-500">*</span>
          </label>

          <!-- Text Input -->
          <input
            v-if="field.type === 'text' || field.type === 'email' || field.type === 'number'"
            :id="field.name"
            v-model="formData[field.name]"
            :type="field.type"
            :required="field.required"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            :class="{ 'border-red-500': errors[field.name] }"
          />

          <!-- Textarea -->
          <textarea
            v-else-if="field.type === 'textarea'"
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            :placeholder="field.placeholder"
            :rows="field.rows || 3"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent resize-vertical"
            :class="{ 'border-red-500': errors[field.name] }"
          />

          <!-- Select -->
          <select
            v-else-if="field.type === 'select'"
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
            :class="{ 'border-red-500': errors[field.name] }"
          >
            <option value="">Select {{ field.label }}</option>
            <option v-for="option in field.options" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>

          <!-- Date Input -->
          <input
            v-else-if="field.type === 'date'"
            :id="field.name"
            v-model="formData[field.name]"
            :required="field.required"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sap-blue focus:border-transparent"
            :class="{ 'border-red-500': errors[field.name] }"
          />

          <!-- Checkbox -->
          <div v-else-if="field.type === 'checkbox'" class="flex items-center">
            <input
              :id="field.name"
              v-model="formData[field.name]"
              :required="field.required"
              type="checkbox"
              class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300 rounded"
            />
            <label :for="field.name" class="ml-2 block text-sm text-gray-900">
              {{ field.description }}
            </label>
          </div>

          <!-- Radio Group -->
          <div v-else-if="field.type === 'radio'" class="space-y-2">
            <div v-for="option in field.options" :key="option.value" class="flex items-center">
              <input
                :id="`${field.name}-${option.value}`"
                v-model="formData[field.name]"
                :value="option.value"
                :required="field.required"
                type="radio"
                class="h-4 w-4 text-sap-blue focus:ring-sap-blue border-gray-300"
              />
              <label
                :for="`${field.name}-${option.value}`"
                class="ml-2 block text-sm text-gray-900"
              >
                {{ option.label }}
              </label>
            </div>
          </div>

          <!-- Error Message -->
          <p v-if="errors[field.name]" class="mt-1 text-sm text-red-600">
            {{ errors[field.name] }}
          </p>

          <!-- Help Text -->
          <p v-if="field.helpText" class="mt-1 text-sm text-gray-500">
            {{ field.helpText }}
          </p>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="flex justify-end gap-4 pt-6 border-t border-gray-200">
        <button type="button" @click="$emit('cancel')" class="btn-secondary">Cancel</button>
        <button
          type="submit"
          :disabled="loading || !isValid"
          class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            v-if="loading"
            class="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"
          ></div>
          {{ isEdit ? 'Update' : 'Create' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

interface FieldOption {
  value: string | number
  label: string
}

interface Field {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio'
  required?: boolean
  placeholder?: string
  helpText?: string
  disabled?: boolean
  fullWidth?: boolean
  rows?: number
  options?: FieldOption[]
  validation?: (value: any) => string | null
}

interface Props {
  title: string
  fields: Field[]
  initialData?: Record<string, any>
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialData: () => ({}),
  loading: false,
})

const emit = defineEmits<{
  submit: [data: Record<string, any>]
  cancel: []
}>()

// Form data and validation
const formData = ref<Record<string, any>>({})
const errors = ref<Record<string, any>>({})

// Computed properties
const isEdit = computed(() => Object.keys(props.initialData).length > 0)
const isValid = computed(() => {
  return props.fields.every((field) => {
    if (!field.required) return true
    const value = formData.value[field.name]
    return value !== null && value !== undefined && value !== ''
  })
})

// Initialize form data
const initializeForm = () => {
  const data: Record<string, any> = {}

  props.fields.forEach((field) => {
    if (props.initialData[field.name] !== undefined) {
      data[field.name] = props.initialData[field.name]
    } else {
      // Set default values based on field type
      switch (field.type) {
        case 'checkbox':
          data[field.name] = false
          break
        case 'select':
        case 'radio':
          data[field.name] = ''
          break
        default:
          data[field.name] = ''
      }
    }
  })

  formData.value = data
}

// Validation
const validateField = (fieldName: string) => {
  const field = props.fields.find((f) => f.name === fieldName)
  if (!field) return

  const value = formData.value[fieldName]

  // Required validation
  if (field.required && (value === null || value === undefined || value === '')) {
    errors.value[fieldName] = `${field.label} is required`
    return
  }

  // Custom validation
  if (field.validation) {
    const validationError = field.validation(value)
    if (validationError) {
      errors.value[fieldName] = validationError
      return
    }
  }

  // Clear error
  delete errors.value[fieldName]
}

const validateForm = () => {
  props.fields.forEach((field) => {
    validateField(field.name)
  })

  return Object.keys(errors.value).length === 0
}

// Form submission
const handleSubmit = () => {
  if (!validateForm()) return

  emit('submit', { ...formData.value })
}

// Watch for field changes to validate
watch(
  formData,
  () => {
    validateForm()
  },
  { deep: true },
)

// Initialize form on mount
onMounted(() => {
  initializeForm()
})
</script>
