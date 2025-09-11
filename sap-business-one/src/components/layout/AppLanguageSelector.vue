<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
      title="Language"
    >
      <GlobeAltIcon class="w-5 h-5" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div class="p-2">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="selectLanguage(lang)"
          :class="[
            'w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors',
            selectedLanguage.code === lang.code
              ? 'bg-sap-light-blue text-sap-blue font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
        >
          <div class="flex items-center space-x-2">
            <span class="text-lg">{{ lang.flag }}</span>
            <span>{{ lang.name }}</span>
          </div>
          <CheckIcon
            v-if="selectedLanguage.code === lang.code"
            class="w-4 h-4 text-sap-blue"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { GlobeAltIcon, CheckIcon } from '@heroicons/vue/24/outline'

const isOpen = ref(false)

const languages = ref([
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' }
])

const selectedLanguage = ref(languages.value[0])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (lang: any) => {
  selectedLanguage.value = lang
  isOpen.value = false
  // Handle language change
  console.log('Language selected:', lang)
}
</script>