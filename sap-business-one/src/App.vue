<template>
  <div class="min-h-screen bg-gray-100 flex relative">
    <!-- Mobile sidebar backdrop -->
    <div
      v-if="sidebarOpen"
      @click="sidebarOpen = false"
      class="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
    ></div>

    <!-- Sidebar -->
    <AppSidebar
      :is-open="sidebarOpen"
      :modules="modules"
      @close="sidebarOpen = false"
      @navigate="sidebarOpen = false"
    />

    <!-- Main content -->
    <div class="flex-1 flex flex-col lg:pl-64 min-w-0">
      <!-- Header -->
      <AppHeader
        @toggle-sidebar="sidebarOpen = !sidebarOpen"
        @search="handleSearch"
        @show-help="showHelp"
      >
        <template #company-selector>
          <AppCompanySelector />
        </template>
        <template #quick-actions>
          <AppQuickActions />
        </template>
        <template #notifications>
          <AppNotifications />
        </template>
        <template #language-selector>
          <AppLanguageSelector />
        </template>
        <template #user-menu>
          <AppUserMenu />
        </template>
      </AppHeader>

      <!-- Spacer for fixed header -->
      <div class="h-14 sm:h-16"></div>

      <!-- Breadcrumbs -->
      <AppBreadcrumbs :modules="modules" />

      <!-- Main content area -->
      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="py-2 sm:py-4 md:py-6">
          <div class="max-w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <router-view class="w-full" />
          </div>
        </div>
      </main>

      <!-- Footer -->
      <AppFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from './components/layout/AppHeader.vue'
import AppSidebar from './components/layout/AppSidebar.vue'
import AppBreadcrumbs from './components/layout/AppBreadcrumbs.vue'
import AppNotifications from './components/layout/AppNotifications.vue'
import AppUserMenu from './components/layout/AppUserMenu.vue'
import AppCompanySelector from './components/layout/AppCompanySelector.vue'
import AppQuickActions from './components/layout/AppQuickActions.vue'
import AppLanguageSelector from './components/layout/AppLanguageSelector.vue'
import AppFooter from './components/layout/AppFooter.vue'

// Import icons for modules
import {
  CurrencyDollarIcon,
  ShoppingCartIcon,
  TruckIcon,
  CubeIcon,
  UserGroupIcon,
  BanknotesIcon,
  WrenchScrewdriverIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ClipboardDocumentCheckIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
  CpuChipIcon,
  BuildingOffice2Icon,
  CheckCircleIcon
} from '@heroicons/vue/24/outline'
const sidebarOpen = ref(false)

// Define modules configuration in logical business flow order
const modules = ref([
  // 1. Dashboard - Overview and quick access
  {
    id: 'dashboard',
    name: 'Dashboard',
    icon: Squares2X2Icon,
    route: '/dashboard'
  },

  // 2. Business Partners - Foundation for all transactions
  // {
  //   id: 'business-partners',
  //   name: 'Business Partners',
  //   icon: UserGroupIcon,
  //   submodules: [
  //     { id: 'customers', name: 'Customers', route: '/business-partners/customers' },
  //     { id: 'vendors', name: 'Vendors', route: '/business-partners/vendors' },
  //     { id: 'leads', name: 'Leads', route: '/business-partners/leads' },
  //     { id: 'contacts', name: 'Contacts', route: '/business-partners/contacts' },
  //     { id: 'addresses', name: 'Addresses', route: '/business-partners/addresses' },
  //     { id: 'payment-terms', name: 'Payment Terms', route: '/business-partners/payment-terms' }
  //   ]
  // },

  // 3. CRM - Customer relationship management
  // {
  //   id: 'crm',
  //   name: 'CRM',
  //   icon: UserGroupIcon,
  //   submodules: [
  //     { id: 'campaigns', name: 'Campaign Management', route: '/crm/campaigns' },
  //     { id: 'customers', name: 'Customer Management', route: '/crm/customers' },
  //     { id: 'contacts', name: 'Contact Management', route: '/crm/contacts' },
  //     { id: 'activities', name: 'Activity Tracking', route: '/crm/activities' },
  //     { id: 'opportunities', name: 'Opportunity Tracking', route: '/crm/opportunities' },
  //     { id: 'service-calls', name: 'Service Calls', route: '/crm/service-calls' }
  //   ]
  // },

  // 4. Opportunities - Sales pipeline management
  // {
  //   id: 'opportunities',
  //   name: 'Opportunities',
  //   icon: PresentationChartLineIcon,
  //   submodules: [
  //     { id: 'sales', name: 'Sales Opportunities', route: '/opportunities/sales' },
  //     { id: 'pipeline', name: 'Pipeline Tracking', route: '/opportunities/pipeline' },
  //     { id: 'stages', name: 'Sales Stages & Forecasting', route: '/opportunities/stages' },
  //     { id: 'reports', name: 'Opportunity Reports', route: '/opportunities/reports' }
  //   ]
  // },

  // 5. Sales - A/R - Sales cycle
  {
    id: 'sales-ar',
    name: 'Sales - A/R',
    icon: ShoppingCartIcon,
    submodules: [
      { id: 'quotations', name: 'Sales Quotations', route: '/sales/quotations' },
      { id: 'orders', name: 'Sales Orders', route: '/sales/orders' },
      { id: 'deliveries', name: 'Deliveries', route: '/sales/deliveries' },
      { id: 'returns', name: 'Returns', route: '/sales/returns' },
      { id: 'ar-invoices', name: 'A/R Invoices', route: '/sales/ar-invoices' },
      { id: 'credit-memos', name: 'Credit Memos', route: '/sales/credit-memos' },
      { id: 'sales-reports', name: 'Sales Reports', route: '/sales/sales-reports' }
    ]
  },

  // 6. Purchasing - A/P - Procurement cycle (reorganized for better flow)
  {
    id: 'purchasing-ap',
    name: 'Purchasing - A/P',
    icon: TruckIcon,
    submodules: [
      { id: 'requests', name: 'Purchase Requests', route: '/purchasing/requests' },
      { id: 'quotations', name: 'Purchase Quotations', route: '/purchasing/quotations' },
      { id: 'orders', name: 'Purchase Orders', route: '/purchasing/orders' },
      { id: 'goods-receipt', name: 'Goods Receipt', route: '/purchasing/goods-receipt' },
      { id: 'returns', name: 'Returns', route: '/purchasing/returns' },
      { id: 'ap-invoices', name: 'A/P Invoices', route: '/purchasing/ap-invoices' },
      { id: 'ap-credit-memos', name: 'A/P Credit Memos', route: '/purchasing/ap-credit-memos' }
    ]
  },

  // 7. Inventory - Stock management
  {
    id: 'inventory',
    name: 'Inventory',
    icon: CubeIcon,
    submodules: [
      {
        id: 'transactions',
        name: 'Inventory Transactions',
        submodules: [
          { id: 'transfer', name: 'Inventory Transfer', route: '/inventory/transactions/transfer' },
          { id: 'goods-receipt', name: 'Goods Receipt', route: '/inventory/transactions/goods-receipt' },
          { id: 'goods-issue', name: 'Goods Issue', route: '/inventory/transactions/goods-issue' }
        ]
      },
      // { id: 'items', name: 'Items', route: '/inventory/items' },
      // { id: 'groups-warehouses', name: 'Groups & Warehouses', route: '/inventory/groups-warehouses' },
      // { id: 'price-lists', name: 'Price Lists', route: '/inventory/price-lists' },
      // { id: 'stock-counting', name: 'Stock Counting', route: '/inventory/stock-counting' },
      // { id: 'serial-batches', name: 'Serial/Batch Numbers', route: '/inventory/serial-batches' },
      // { id: 'valuation', name: 'Inventory Valuation', route: '/inventory/valuation' },
      // { id: 'reports', name: 'Inventory Reports', route: '/inventory/reports' }
    ]
  },

  // 8. Production - Manufacturing
  // {
  //   id: 'production',
  //   name: 'Production',
  //   icon: CpuChipIcon,
  //   submodules: [
  //     { id: 'bom', name: 'Bill of Materials', route: '/production/bom' },
  //     { id: 'orders', name: 'Production Orders', route: '/production/orders' },
  //     { id: 'issue', name: 'Issue for Production', route: '/production/issue' },
  //     { id: 'receipt', name: 'Receipt from Production', route: '/production/receipt' },
  //     { id: 'reports', name: 'Production Reports', route: '/production/reports' }
  //   ]
  // },

  // 9. MRP - Planning
  // {
  //   id: 'mrp',
  //   name: 'MRP',
  //   icon: ClipboardDocumentCheckIcon,
  //   submodules: [
  //     { id: 'planning', name: 'MRP Planning', route: '/mrp/planning' },
  //     { id: 'forecasts', name: 'Forecasts', route: '/mrp/forecasts' },
  //     { id: 'scenarios', name: 'Scenarios', route: '/mrp/scenarios' },
  //     { id: 'order-recommendations', name: 'Order Recommendations', route: '/mrp/order-recommendations' },
  //     { id: 'planning-wizard', name: 'Planning Wizard', route: '/mrp/planning-wizard' }
  //   ]
  // },

  // 10. Resources - Resource management
  // {
  //   id: 'resources',
  //   name: 'Resources',
  //   icon: BuildingOffice2Icon,
  //   submodules: [
  //     { id: 'master-data', name: 'Resource Master Data', route: '/resources/master-data' },
  //     { id: 'groups', name: 'Resource Groups', route: '/resources/groups' },
  //     { id: 'capacities', name: 'Capacities', route: '/resources/capacities' },
  //     { id: 'costs', name: 'Resource Costs', route: '/resources/costs' },
  //     { id: 'planning', name: 'Resource Planning', route: '/resources/planning' }
  //   ]
  // },

  // 11. Banking - Financial transactions
  // {
  //   id: 'banking',
  //   name: 'Banking',
  //   icon: BanknotesIcon,
  //   submodules: [
  //     { id: 'incoming', name: 'Incoming Payments', route: '/banking/incoming' },
  //     { id: 'outgoing', name: 'Outgoing Payments', route: '/banking/outgoing' },
  //     { id: 'deposits', name: 'Deposits', route: '/banking/deposits' },
  //     { id: 'checks', name: 'Checks', route: '/banking/checks' },
  //     { id: 'statements', name: 'Bank Statements', route: '/banking/statements' },
  //     { id: 'reconciliation', name: 'Reconciliation', route: '/banking/reconciliation' },
  //     { id: 'wizard', name: 'Payment Wizard', route: '/banking/wizard' }
  //   ]
  // },

  // 12. Financials - Accounting and financial management
  // {
  //   id: 'financials',
  //   name: 'Financials',
  //   icon: CurrencyDollarIcon,
  //   submodules: [
  //     { id: 'chart-accounts', name: 'Chart of Accounts', route: '/financials/chart-accounts' },
  //     { id: 'journal-entries', name: 'Journal Entries', route: '/financials/journal-entries' },
  //     { id: 'cost-accounting', name: 'Cost Accounting', route: '/financials/cost-accounting' },
  //     { id: 'budget-management', name: 'Budget Management', route: '/financials/budget-management' },
  //     { id: 'exchange-rates', name: 'Exchange Rate Differences', route: '/financials/exchange-rates' },
  //     { id: 'financial-reports', name: 'Financial Reports', route: '/financials/financial-reports' }
  //   ]
  // },

  // 13. Service - Customer service
  // {
  //   id: 'service',
  //   name: 'Service',
  //   icon: WrenchScrewdriverIcon,
  //   submodules: [
  //     { id: 'contracts', name: 'Service Contracts', route: '/service/contracts' },
  //     { id: 'equipment', name: 'Customer Equipment', route: '/service/equipment' },
  //     { id: 'calls', name: 'Service Calls', route: '/service/calls' },
  //     { id: 'reports', name: 'Service Reports', route: '/service/reports' },
  //     { id: 'response-time', name: 'Response Time', route: '/service/response-time' }
  //   ]
  // },

  // 14. Human Resources - Employee management
  // {
  //   id: 'human-resources',
  //   name: 'Human Resources',
  //   icon: UserGroupIcon,
  //   submodules: [
  //     { id: 'employees', name: 'Employee Information', route: '/hr/employees' },
  //     { id: 'positions', name: 'Employee Positions', route: '/hr/positions' },
  //     { id: 'timesheets', name: 'Timesheets', route: '/hr/timesheets' },
  //     { id: 'expenses', name: 'Employee Expenses', route: '/hr/expenses' }
  //   ]
  // },

  // 15. Reports - Analytics and reporting
  // {
  //   id: 'reports',
  //   name: 'Reports',
  //   icon: ChartBarIcon,
  //   submodules: [
  //     { id: 'dashboard', name: 'Reports Dashboard', route: '/reports/dashboard' },
  //     { id: 'financial', name: 'Financial Reports', route: '/reports/financial' },
  //     { id: 'sales-purchasing', name: 'Sales & Purchasing', route: '/reports/sales-purchasing' },
  //     { id: 'inventory', name: 'Inventory Reports', route: '/reports/inventory' },
  //     { id: 'production-mrp', name: 'Production & MRP', route: '/reports/production-mrp' },
  //     { id: 'service', name: 'Service Reports', route: '/reports/service' },
  //     { id: 'custom-queries', name: 'Custom Queries', route: '/reports/custom-queries' }
  //   ]
  // },

  // 16. Approvals - Workflow approval management
  {
    id: 'approvals',
    name: 'Approvals',
    icon: CheckCircleIcon,
    submodules: [
      { id: 'rules', name: 'Approval Rules', route: '/approvals/rules' },
      { id: 'instances', name: 'Pending Approvals', route: '/approvals/instances' },
      { id: 'my-approvals', name: 'My Approvals', route: '/approvals/my-approvals' },
      { id: 'history', name: 'Approval History', route: '/approvals/history' },
      { id: 'statistics', name: 'Statistics & Reports', route: '/approvals/statistics' },
      { id: 'settings', name: 'Approval Settings', route: '/approvals/settings' }
    ]
  },

  // 17. Administration - System settings (moved to bottom)
  // {
  //   id: 'administration',
  //   name: 'Administration',
  //   icon: Cog6ToothIcon,
  //   submodules: [
  //     { id: 'system-initialization', name: 'System Initialization', route: '/administration/system-initialization' },
  //     { id: 'authorizations-security', name: 'Authorizations & Security', route: '/administration/authorizations-security' },
  //     { id: 'setup', name: 'Setup', route: '/administration/setup' },
  //     { id: 'utilities', name: 'Utilities', route: '/administration/utilities' },
  //     { id: 'addons-management', name: 'Add-ons Management', route: '/administration/addons-management' },
  //     { id: 'license-administration', name: 'License Administration', route: '/administration/license-administration' }
  //   ]
  // }
])

const handleSearch = (query: string) => {
  console.log('Search query:', query)
  // Implement search functionality
}

const showHelp = () => {
  console.log('Show help')
  // Implement help functionality
}
</script>
