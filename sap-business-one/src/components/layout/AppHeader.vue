<template>
  <header class="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left side: Menu and Search -->
        <div class="flex items-center">
          <button
            @click="$emit('toggle-sidebar')"
            class="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
          >
            <Bars3Icon class="h-6 w-6" />
          </button>
          
          <!-- Search Bar -->
          <div class="relative ml-4">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              @input="$emit('search', searchQuery)"
              type="text"
              placeholder="Search modules, transactions, reports..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue sm:text-sm"
            />
          </div>
        </div>

        <!-- Right side: Actions -->
        <div class="flex items-center space-x-3">
          <!-- Company Selector -->
          <slot name="company-selector" />
          
          <!-- Quick Actions -->
          <slot name="quick-actions" />
          
          <!-- Notifications -->
          <slot name="notifications" />
          
          <!-- Language Selector -->
          <slot name="language-selector" />
          
          <!-- Help -->
          <button
            @click="$emit('show-help')"
            class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            title="Help"
          >
            <QuestionMarkCircleIcon class="w-5 h-5" />
          </button>
          
          <!-- User Menu -->
          <slot name="user-menu" />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  Bars3Icon, 
  MagnifyingGlassIcon, 
  QuestionMarkCircleIcon 
} from '@heroicons/vue/24/outline'

const searchQuery = ref('')

defineEmits<{
  'toggle-sidebar': []
  'search': [query: string]
  'show-help': []
}>()
</script>