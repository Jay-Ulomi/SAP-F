<template>
  <div class="relative">
    <button
      @click="toggleMenu"
      class="flex items-center space-x-3 p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sap-blue focus:ring-offset-2"
    >
      <div class="w-8 h-8 rounded-full bg-gradient-to-br from-sap-blue to-blue-600 flex items-center justify-center text-white font-medium">
        {{ userInitials }}
      </div>
      <div class="hidden md:block text-left">
        <p class="text-sm font-medium text-gray-900">{{ user.name }}</p>
        <p class="text-xs text-gray-500">{{ user.role }}</p>
      </div>
      <ChevronDownIcon class="w-4 h-4 text-gray-400" />
    </button>

    <!-- Enhanced User Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
    >
      <!-- User Info Header -->
      <div class="bg-gradient-to-r from-sap-blue to-blue-600 p-4">
        <div class="flex items-center space-x-3">
          <div class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
            {{ userInitials }}
          </div>
          <div class="flex-1">
            <h3 class="text-white font-semibold">{{ user.name }}</h3>
            <p class="text-blue-100 text-sm">{{ user.email }}</p>
            <p class="text-blue-100 text-xs mt-1">{{ user.role }} • {{ user.company }}</p>
          </div>
        </div>
      </div>

      <!-- Session Info -->
      <div class="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center space-x-1 text-gray-500">
            <ClockIcon class="w-3 h-3" />
            <span>Session: {{ sessionDuration }}</span>
          </div>
          <div class="flex items-center space-x-1 text-gray-500">
            <GlobeAltIcon class="w-3 h-3" />
            <span>{{ user.branch }}</span>
          </div>
        </div>
      </div>

      <!-- Menu Items -->
      <div class="py-2">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.route"
          @click="closeMenu"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <component :is="item.icon" class="w-4 h-4 mr-3 text-gray-400" />
          <span>{{ item.name }}</span>
          <span v-if="item.badge" class="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {{ item.badge }}
          </span>
        </router-link>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200"></div>

      <!-- Actions -->
      <div class="py-2">
        <button
          @click="changePassword"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <KeyIcon class="w-4 h-4 mr-3 text-gray-400" />
          <span>Change Password</span>
        </button>
        <button
          @click="showSettings"
          class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Cog6ToothIcon class="w-4 h-4 mr-3 text-gray-400" />
          <span>Settings</span>
        </button>
        <button
          @click="logout"
          class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
        >
          <ArrowRightOnRectangleIcon class="w-4 h-4 mr-3" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChevronDownIcon,
  UserIcon,
  BellIcon,
  InboxIcon,
  ClockIcon,
  GlobeAltIcon,
  KeyIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const isOpen = ref(false)

const user = ref({
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'Senior Manager',
  company: 'ACME Corporation',
  branch: 'North America'
})

const menuItems = [
  { name: 'My Profile', route: '/profile', icon: UserIcon },
  { name: 'My Tasks', route: '/tasks', icon: InboxIcon, badge: '3' },
  { name: 'Preferences', route: '/preferences', icon: Cog6ToothIcon }
]

const sessionStart = ref(new Date())
const sessionDuration = ref('0m')

const userInitials = computed(() => {
  const names = user.value.name.split(' ')
  return names.map(n => n[0]).join('').toUpperCase()
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const changePassword = () => {
  closeMenu()
  router.push('/change-password')
}

const showSettings = () => {
  closeMenu()
  router.push('/settings')
}

const logout = () => {
  closeMenu()
  // Handle logout
  console.log('Logging out...')
}

const updateSessionDuration = () => {
  const now = new Date()
  const diff = Math.floor((now.getTime() - sessionStart.value.getTime()) / 1000)
  const hours = Math.floor(diff / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  
  if (hours > 0) {
    sessionDuration.value = `${hours}h ${minutes}m`
  } else {
    sessionDuration.value = `${minutes}m`
  }
}

let interval: any

onMounted(() => {
  updateSessionDuration()
  interval = setInterval(updateSessionDuration, 60000) // Update every minute
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
  }
})
</script>