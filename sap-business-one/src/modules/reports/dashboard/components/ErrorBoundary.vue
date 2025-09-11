<template>
  <div v-if="hasError" class="error-boundary">
    <div class="flex items-center justify-center min-h-64 bg-red-50 rounded-lg border border-red-200">
      <div class="text-center p-6">
        <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 class="text-lg font-medium text-red-900 mb-2">Something went wrong</h3>
        <p class="text-red-700 mb-4 max-w-md">
          {{ errorMessage || 'An unexpected error occurred while loading this component.' }}
        </p>
        <div class="space-x-3">
          <button
            @click="retry"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2" 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try Again
          </button>
          <button
            @click="showDetails = !showDetails"
            class="inline-flex items-center px-4 py-2 border border-red-300 rounded-md shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            {{ showDetails ? 'Hide' : 'Show' }} Details
          </button>
        </div>
        
        <!-- Error details -->
        <div v-if="showDetails && errorDetails" class="mt-4 p-3 bg-red-100 rounded-md text-left">
          <pre class="text-xs text-red-800 whitespace-pre-wrap">{{ errorDetails }}</pre>
        </div>
      </div>
    </div>
  </div>
  
  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'

interface Props {
  fallback?: string
}

interface Emits {
  (e: 'error', error: Error): void
  (e: 'retry'): void
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'Something went wrong'
})

const emit = defineEmits<Emits>()

const hasError = ref(false)
const errorMessage = ref('')
const errorDetails = ref('')
const showDetails = ref(false)

const retry = () => {
  hasError.value = false
  errorMessage.value = ''
  errorDetails.value = ''
  showDetails.value = false
  emit('retry')
}

const handleError = (error: Error) => {
  hasError.value = true
  errorMessage.value = error.message || props.fallback
  errorDetails.value = error.stack || error.toString()
  
  // Log error for debugging
  console.error('ErrorBoundary caught error:', error)
  
  emit('error', error)
}

// Catch errors in child components
onErrorCaptured((error: Error) => {
  handleError(error)
  return false // Prevent error from propagating
})

// Expose methods for manual error handling
defineExpose({
  captureError: handleError,
  retry,
  reset: retry
})
</script>

<style scoped>
.error-boundary {
  width: 100%;
  min-height: 200px;
}

pre {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  overflow-x: auto;
  max-height: 200px;
}
</style>