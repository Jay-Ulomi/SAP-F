<template>
  <footer class="bg-white border-t border-gray-200 mt-auto">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-4">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center space-x-6 text-sm text-gray-500">
            <span>&copy; {{ currentYear }} SAP Business One. All rights reserved.</span>
            <a href="#" class="hover:text-sap-blue">Privacy Policy</a>
            <a href="#" class="hover:text-sap-blue">Terms of Service</a>
            <a href="#" class="hover:text-sap-blue">Cookie Policy</a>
          </div>
          <div class="mt-4 md:mt-0 flex items-center space-x-4 text-sm text-gray-500">
            <span class="flex items-center">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              All systems operational
            </span>
            <span>Last sync: {{ lastSyncTime }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const lastSyncTime = ref('2 mins ago')
const currentYear = computed(() => new Date().getFullYear())

// Update last sync time periodically
let syncInterval: number

const updateSyncTime = () => {
  const now = new Date()
  lastSyncTime.value = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

onMounted(() => {
  updateSyncTime()
  syncInterval = setInterval(updateSyncTime, 60000) // Update every minute
})

onUnmounted(() => {
  if (syncInterval) {
    clearInterval(syncInterval)
  }
})
</script>