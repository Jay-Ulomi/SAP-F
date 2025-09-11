<template>
  <div class="space-y-6">
    <!-- Welcome Section -->
    <div class="bg-gradient-to-r from-sap-blue to-sap-dark-blue rounded-lg p-6 text-white">
      <h1 class="text-2xl font-bold mb-2">Welcome to SAP Business One</h1>
      <p class="text-sap-light-blue">
        Manage your business operations efficiently with our comprehensive ERP solution
      </p>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-green-100 rounded-lg">
            <BanknotesIcon class="w-6 h-6 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-2xl font-semibold text-gray-900">$2.4M</p>
            <p class="text-sm text-green-600">+12% from last month</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-blue-100 rounded-lg">
            <ShoppingCartIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Open Orders</p>
            <p class="text-2xl font-semibold text-gray-900">156</p>
            <p class="text-sm text-blue-600">23 pending approval</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <CubeIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p class="text-2xl font-semibold text-gray-900">42</p>
            <p class="text-sm text-yellow-600">Need reorder</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center">
          <div class="p-3 bg-purple-100 rounded-lg">
            <UserGroupIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">Active Customers</p>
            <p class="text-2xl font-semibold text-gray-900">1,247</p>
            <p class="text-sm text-purple-600">+8 new this week</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
        <div class="space-y-4">
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="flex items-start space-x-3"
          >
            <div class="flex-shrink-0">
              <div
                :class="[
                  'w-2 h-2 rounded-full mt-2',
                  activity.type === 'order'
                    ? 'bg-blue-500'
                    : activity.type === 'payment'
                      ? 'bg-green-500'
                      : activity.type === 'alert'
                        ? 'bg-red-500'
                        : 'bg-gray-500',
                ]"
              ></div>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-900">{{ activity.description }}</p>
              <p class="text-xs text-gray-500">{{ activity.time }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4">
          <router-link
            to="/reports"
            class="text-sap-blue hover:text-sap-dark-blue text-sm font-medium"
          >
            View all activities →
          </router-link>
        </div>
      </div>

      <div class="card">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-3">
          <router-link
            to="/sales/orders"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <PlusIcon class="w-5 h-5 text-sap-blue mr-3" />
            <span class="text-sm font-medium text-gray-700">New Order</span>
          </router-link>

          <router-link
            to="/inventory/items"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CubeIcon class="w-5 h-5 text-sap-blue mr-3" />
            <span class="text-sm font-medium text-gray-700">Add Item</span>
          </router-link>

          <router-link
            to="/crm/customers"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <UserPlusIcon class="w-5 h-5 text-sap-blue mr-3" />
            <span class="text-sm font-medium text-gray-700">New Customer</span>
          </router-link>

          <router-link
            to="/financials/journal-entries"
            class="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <DocumentPlusIcon class="w-5 h-5 text-sap-blue mr-3" />
            <span class="text-sm font-medium text-gray-700">Journal Entry</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Module Overview -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Module Overview</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="module in moduleStats"
          :key="module.id"
          class="p-4 border border-gray-200 rounded-lg hover:border-sap-blue transition-colors cursor-pointer"
          @click="navigateToModule(module.route)"
        >
          <div class="flex items-center justify-between mb-3">
            <component :is="module.icon" class="w-6 h-6 text-sap-blue" />
            <span class="text-sm text-gray-500">{{ module.count }} items</span>
          </div>
          <h4 class="font-medium text-gray-900 mb-1">{{ module.name }}</h4>
          <p class="text-sm text-gray-600">{{ module.description }}</p>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="card">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">Database: Online</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">API Services: Active</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">Backup: Last 2 hours</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  BanknotesIcon,
  ShoppingCartIcon,
  CubeIcon,
  UserGroupIcon,
  PlusIcon,
  UserPlusIcon,
  DocumentPlusIcon,
  Cog6ToothIcon,
  BanknotesIcon as FinancialsIcon,
  UserGroupIcon as CRMIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  TruckIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon,
  UserIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()

// Recent activities data
const recentActivities = ref([
  {
    id: 1,
    type: 'order',
    description: 'New sales order #SO-2024-001 created',
    time: '2 minutes ago',
  },
  {
    id: 2,
    type: 'payment',
    description: 'Payment received for invoice #INV-2024-045',
    time: '15 minutes ago',
  },
  {
    id: 3,
    type: 'alert',
    description: 'Low stock alert for Item SKU-001',
    time: '1 hour ago',
  },
  {
    id: 4,
    type: 'order',
    description: 'Purchase order #PO-2024-023 approved',
    time: '2 hours ago',
  },
  {
    id: 5,
    type: 'payment',
    description: 'Outgoing payment processed for vendor ABC Corp',
    time: '3 hours ago',
  },
])

// Module statistics
const moduleStats = ref([
  {
    id: 'administration',
    name: 'Administration',
    description: 'System configuration and management',
    count: 6,
    route: '/administration',
    icon: Cog6ToothIcon,
  },
  {
    id: 'financials',
    name: 'Financials',
    description: 'Accounting and financial management',
    count: 8,
    route: '/financials',
    icon: FinancialsIcon,
  },
  {
    id: 'crm',
    name: 'CRM',
    description: 'Customer relationship management',
    count: 12,
    route: '/crm',
    icon: CRMIcon,
  },
  {
    id: 'sales',
    name: 'Sales',
    description: 'Sales operations and management',
    count: 15,
    route: '/sales',
    icon: ShoppingCartIcon,
  },
  {
    id: 'inventory',
    name: 'Inventory',
    description: 'Stock and warehouse management',
    count: 22,
    route: '/inventory',
    icon: CubeIcon,
  },
  {
    id: 'production',
    name: 'Production',
    description: 'Manufacturing and production planning',
    count: 9,
    route: '/production',
    icon: WrenchScrewdriverIcon,
  },
])

// Navigation method
const navigateToModule = (route: string) => {
  router.push(route)
}
</script>
