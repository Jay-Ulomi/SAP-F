<template>
  <div class="relative">
    <button
      @click="toggleNotifications"
      class="relative p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sap-blue focus:ring-offset-2"
      title="Notifications"
    >
      <BellIcon class="w-5 h-5" />
      <!-- Notification Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-semibold border-2 border-white"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- Enhanced Notifications Dropdown -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 animate-in slide-in-from-top-2 overflow-hidden"
    >
      <!-- Header -->
      <div class="bg-gradient-to-r from-sap-blue to-blue-600 px-4 py-3 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <BellIcon class="w-5 h-5" />
            <h3 class="font-semibold">Notifications</h3>
            <span v-if="unreadCount > 0" 
                  class="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
              {{ unreadCount }} new
            </span>
          </div>
          <div class="flex items-center space-x-1">
            <button
              @click="markAllAsRead"
              class="text-xs text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors"
              v-if="unreadCount > 0"
              title="Mark all as read"
            >
              Mark all read
            </button>
            <button
              @click="clearAll"
              class="text-xs text-white/80 hover:text-white hover:bg-white/10 px-2 py-1 rounded transition-colors"
              title="Clear all notifications"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      <!-- Notification List -->
      <div class="max-h-[500px] overflow-y-auto">
        <div v-if="notifications.length === 0" class="p-8 text-center text-gray-500">
          <BellIcon class="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p class="text-sm">No notifications</p>
        </div>

        <div v-else class="divide-y divide-gray-100">
          <div
            v-for="notification in notifications"
            :key="notification.id"
            class="relative p-4 hover:bg-gray-50 transition-all duration-200 cursor-pointer"
            @click="handleAction(notification)"
            :class="{
              'bg-blue-50/50': !notification.read && notification.type === 'info',
              'bg-yellow-50/50': !notification.read && notification.type === 'warning',
              'bg-green-50/50': !notification.read && notification.type === 'success',
              'bg-red-50/50': !notification.read && notification.type === 'error',
            }"
          >
            <!-- Priority Indicator -->
            <div
              class="absolute left-0 top-0 bottom-0 w-1 transition-all duration-200"
              :class="getPriorityIndicator(notification.priority)"
            ></div>

            <div class="flex items-start space-x-3 ml-3">
              <!-- Icon -->
              <div class="flex-shrink-0 mt-0.5">
                <div
                  class="w-8 h-8 rounded-full flex items-center justify-center"
                  :class="{
                    'bg-blue-100': notification.type === 'info',
                    'bg-yellow-100': notification.type === 'warning',
                    'bg-green-100': notification.type === 'success',
                    'bg-red-100': notification.type === 'error',
                  }"
                >
                  <component
                    :is="getNotificationIcon(notification.type)"
                    class="w-4 h-4"
                    :class="getNotificationIconColor(notification.type)"
                  />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <!-- Category Badge -->
                    <div class="flex items-center space-x-2 mb-1">
                      <span class="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {{ notification.category }}
                      </span>
                      <span
                        v-if="!notification.read"
                        class="w-2 h-2 bg-sap-blue rounded-full animate-pulse"
                      ></span>
                    </div>

                    <!-- Title -->
                    <h4 class="text-sm font-semibold text-gray-900 leading-tight">
                      {{ notification.title }}
                    </h4>

                    <!-- Message -->
                    <p class="text-sm text-gray-700 mt-1 leading-relaxed">
                      {{ notification.message }}
                    </p>

                    <!-- Details -->
                    <p v-if="notification.detail" class="text-xs text-gray-500 mt-2 bg-gray-50 px-2 py-1 rounded">
                      {{ notification.detail }}
                    </p>
                  </div>

                  <!-- Dismiss Button -->
                  <button
                    @click.stop="dismiss(notification.id)"
                    class="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon class="w-4 h-4" />
                  </button>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between mt-3">
                  <div class="flex items-center space-x-1 text-xs text-gray-400">
                    <ClockIcon class="w-3 h-3" />
                    <span>{{ formatRelativeTime(notification.timestamp) }}</span>
                  </div>

                  <button
                    v-if="notification.actionUrl"
                    class="text-xs font-medium text-sap-blue hover:text-sap-dark-blue transition-colors duration-200"
                    @click.stop="handleAction(notification)"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  BellIcon, 
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'

interface Notification {
  id: number
  title: string
  message: string
  detail?: string
  time: string
  timestamp: Date
  read: boolean
  type: 'info' | 'warning' | 'success' | 'error'
  category: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  actionUrl?: string
}

const router = useRouter()
const isOpen = ref(false)

const notifications = ref<Notification[]>([
  {
    id: 1,
    title: 'Sales Order Approval Required',
    message: 'Sales Order #SO-2024-001 from ABC Corporation needs manager approval',
    detail: 'Order Amount: $12,350.00 • Customer: ABC Corp',
    time: '5 minutes ago',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    type: 'info',
    category: 'Sales',
    priority: 'high',
    actionUrl: '/sales/orders'
  },
  {
    id: 2,
    title: 'Low Inventory Alert',
    message: 'Stock level for Item #10234 is below minimum threshold',
    detail: 'Current Stock: 15 units • Min Level: 50 units',
    time: '15 minutes ago',
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    read: false,
    type: 'warning',
    category: 'Inventory',
    priority: 'medium',
    actionUrl: '/inventory/items'
  },
  {
    id: 3,
    title: 'Payment Received',
    message: 'Payment of $5,420.00 received from XYZ Company',
    detail: 'Invoice #INV-2024-0342 • Check #4521',
    time: '1 hour ago',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: true,
    type: 'success',
    category: 'Finance',
    priority: 'low',
    actionUrl: '/banking/payments'
  }
])

const unreadCount = computed(() => 
  notifications.value.filter(n => !n.read).length
)

const toggleNotifications = () => {
  isOpen.value = !isOpen.value
}

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true)
}

const clearAll = () => {
  notifications.value = []
  isOpen.value = false
}

const dismiss = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

const handleAction = (notification: Notification) => {
  notification.read = true
  if (notification.actionUrl) {
    router.push(notification.actionUrl)
    isOpen.value = false
  }
}

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'info': return InformationCircleIcon
    case 'warning': return ExclamationTriangleIcon
    case 'success': return CheckCircleIcon
    case 'error': return ExclamationTriangleIcon
    default: return InformationCircleIcon
  }
}

const getNotificationIconColor = (type: string) => {
  switch (type) {
    case 'info': return 'text-blue-600'
    case 'warning': return 'text-yellow-600'
    case 'success': return 'text-green-600'
    case 'error': return 'text-red-600'
    default: return 'text-gray-600'
  }
}

const getPriorityIndicator = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-500'
    case 'high': return 'bg-orange-500'
    case 'medium': return 'bg-yellow-500'
    case 'low': return 'bg-blue-500'
    default: return 'bg-gray-400'
  }
}

const formatRelativeTime = (timestamp: Date) => {
  const now = new Date()
  const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60))
  
  if (diffInMinutes < 1) return 'Just now'
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) return `${diffInHours}h ago`
  
  const diffInDays = Math.floor(diffInHours / 24)
  return `${diffInDays}d ago`
}
</script>