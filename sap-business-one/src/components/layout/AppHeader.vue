<template>
  <header class="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
    <div class="px-2 sm:px-4 lg:px-8">
      <div class="flex justify-between items-center h-14 sm:h-16">
        <!-- Left side: Menu and Search -->
        <div class="flex items-center flex-1">
          <button
            @click="$emit('toggle-sidebar')"
            class="p-1.5 sm:p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-600 lg:hidden"
          >
            <Bars3Icon class="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <!-- Search Bar - Hidden on mobile, shown on tablet+ -->
          <div class="relative ml-2 sm:ml-4 hidden sm:block flex-1 max-w-md">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
            </div>
            <input
              v-model="searchQuery"
              @input="$emit('search', searchQuery)"
              type="text"
              placeholder="Search..."
              class="block w-full pl-8 sm:pl-10 pr-3 py-1.5 sm:py-2 text-sm border border-gray-300 rounded-lg leading-5 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:placeholder-gray-300 focus:ring-2 focus:ring-sap-blue focus:border-sap-blue"
            />
          </div>

          <!-- Mobile Search Button -->
          <button
            @click="showMobileSearch = !showMobileSearch"
            class="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 sm:hidden ml-2"
          >
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Right side: Actions -->
        <div class="flex items-center space-x-1 sm:space-x-3">
          <!-- Company Selector - Hidden on mobile -->
          <div class="hidden lg:block">
            <slot name="company-selector" />
          </div>

          <!-- Quick Actions - Hidden on mobile -->
          <div class="hidden md:block">
            <slot name="quick-actions" />
          </div>

          <!-- Notifications -->
          <slot name="notifications" />

          <!-- Language Selector - Hidden on mobile -->
          <div class="hidden sm:block">
            <slot name="language-selector" />
          </div>

          <!-- Help - Hidden on mobile -->
          <button
            @click="$emit('show-help')"
            class="hidden sm:block p-1.5 sm:p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            title="Help"
          >
            <QuestionMarkCircleIcon class="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <!-- User Menu -->
          <slot name="user-menu" />
        </div>
      </div>
    </div>

    <!-- Mobile Search Bar -->
    <div v-if="showMobileSearch" class="sm:hidden px-2 py-2 border-t border-gray-200">
      <div class="relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          @input="$emit('search', searchQuery)"
          type="text"
          placeholder="Search..."
          class="block w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sap-blue focus:border-sap-blue"
          autofocus
        />
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
const showMobileSearch = ref(false)

defineEmits<{
  'toggle-sidebar': []
  'search': [query: string]
  'show-help': []
}>()
</script>