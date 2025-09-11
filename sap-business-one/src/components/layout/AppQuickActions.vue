<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
      title="Quick Actions"
    >
      <BoltIcon class="w-5 h-5" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
    >
      <div class="p-2">
        <div class="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Quick Actions
        </div>
        <div
          v-for="action in quickActions"
          :key="action.id"
          @click="executeAction(action)"
          class="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
        >
          <component :is="action.icon" class="w-4 h-4 text-gray-500 mr-3" />
          <span class="text-sm text-gray-700">{{ action.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BoltIcon,
  PlusIcon,
  DocumentPlusIcon,
  ShoppingCartIcon,
  CurrencyDollarIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const isOpen = ref(false)

const quickActions = ref([
  { id: '1', name: 'New Sales Order', icon: ShoppingCartIcon, route: '/sales/orders/new' },
  { id: '2', name: 'New Invoice', icon: DocumentPlusIcon, route: '/sales/invoices/new' },
  { id: '3', name: 'New Payment', icon: CurrencyDollarIcon, route: '/banking/payments/new' },
  { id: '4', name: 'New Customer', icon: UserPlusIcon, route: '/business-partners/customers/new' },
  { id: '5', name: 'New Item', icon: PlusIcon, route: '/inventory/items/new' }
])

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const executeAction = (action: any) => {
  router.push(action.route)
  isOpen.value = false
}
</script>