<template>
  <div class="dashboard-view h-full flex flex-col bg-gray-50">
    <!-- Header -->
    <div class="dashboard-header bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <h1 class="text-2xl font-bold text-gray-900">
            {{ currentDashboard?.name || 'Dashboard' }}
          </h1>
          <div v-if="currentDashboard?.description" class="text-sm text-gray-500">
            {{ currentDashboard.description }}
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <!-- Dashboard Selector -->
          <div class="relative">
            <select
              v-model="selectedDashboardId"
              @change="loadDashboard"
              class="block w-48 pl-3 pr-10 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sap-blue focus:border-sap-blue"
            >
              <option value="">Select Dashboard</option>
              <option
                v-for="dashboard in dashboards"
                :key="dashboard.id"
                :value="dashboard.id"
              >
                {{ dashboard.name }}{{ dashboard.isDefault ? ' (Default)' : '' }}
              </option>
            </select>
          </div>

          <!-- Date Range Filter -->
          <div class="flex items-center space-x-2">
            <select
              v-model="selectedDatePreset"
              @change="updateDateRange"
              class="block pl-3 pr-8 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sap-blue focus:border-sap-blue"
            >
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="LAST_30_DAYS">Last 30 Days</option>
              <option value="LAST_90_DAYS">Last 90 Days</option>
              <option value="THIS_MONTH">This Month</option>
              <option value="LAST_MONTH">Last Month</option>
              <option value="THIS_QUARTER">This Quarter</option>
              <option value="THIS_YEAR">This Year</option>
              <option value="CUSTOM">Custom Range</option>
            </select>

            <!-- Custom Date Inputs -->
            <div v-if="selectedDatePreset === 'CUSTOM'" class="flex items-center space-x-2">
              <input
                v-model="customDateFrom"
                type="date"
                class="block px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sap-blue focus:border-sap-blue"
              />
              <span class="text-gray-500">to</span>
              <input
                v-model="customDateTo"
                type="date"
                class="block px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sap-blue focus:border-sap-blue"
              />
            </div>
          </div>

          <!-- Refresh All Button -->
          <button
            @click="refreshAllWidgets"
            :disabled="isRefreshing"
            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue disabled:opacity-50"
            title="Refresh all widgets"
          >
            <svg 
              :class="['w-4 h-4 mr-2', { 'animate-spin': isRefreshing }]" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>

          <!-- Actions Menu -->
          <div class="relative">
            <button
              @click="showActionsMenu = !showActionsMenu"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue"
            >
              Actions
              <svg class="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <!-- Actions Dropdown -->
            <div
              v-if="showActionsMenu"
              v-click-outside="() => showActionsMenu = false"
              class="absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 z-50"
            >
              <div class="py-1">
                <button
                  @click="addWidget"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  Add Widget
                </button>
                <button
                  @click="editDashboard"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                  Edit Dashboard
                </button>
                <button
                  @click="cloneDashboard"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                  </svg>
                  Clone Dashboard
                </button>
                <hr class="my-1">
                <button
                  @click="exportToPDF"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Export to PDF
                </button>
                <button
                  @click="exportToExcel"
                  class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  Export to Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dashboard Stats -->
      <div v-if="reportMetrics" class="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div class="bg-blue-50 rounded-lg p-3">
          <div class="text-xs font-medium text-blue-600 uppercase tracking-wide">Revenue</div>
          <div class="text-lg font-bold text-blue-900">{{ formatCurrency(reportMetrics.totalRevenue) }}</div>
        </div>
        <div class="bg-green-50 rounded-lg p-3">
          <div class="text-xs font-medium text-green-600 uppercase tracking-wide">Profit</div>
          <div class="text-lg font-bold text-green-900">{{ formatCurrency(reportMetrics.netProfit) }}</div>
        </div>
        <div class="bg-purple-50 rounded-lg p-3">
          <div class="text-xs font-medium text-purple-600 uppercase tracking-wide">Orders</div>
          <div class="text-lg font-bold text-purple-900">{{ reportMetrics.totalOrders.toLocaleString() }}</div>
        </div>
        <div class="bg-orange-50 rounded-lg p-3">
          <div class="text-xs font-medium text-orange-600 uppercase tracking-wide">Customers</div>
          <div class="text-lg font-bold text-orange-900">{{ reportMetrics.activeCustomers.toLocaleString() }}</div>
        </div>
        <div class="bg-teal-50 rounded-lg p-3">
          <div class="text-xs font-medium text-teal-600 uppercase tracking-wide">Inventory</div>
          <div class="text-lg font-bold text-teal-900">{{ formatCurrency(reportMetrics.inventoryValue) }}</div>
        </div>
        <div class="bg-red-50 rounded-lg p-3">
          <div class="text-xs font-medium text-red-600 uppercase tracking-wide">Cash Flow</div>
          <div class="text-lg font-bold text-red-900">{{ formatCurrency(reportMetrics.cashFlow) }}</div>
        </div>
      </div>
    </div>

    <!-- Dashboard Content -->
    <div class="dashboard-content flex-1 p-6">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex items-center justify-center h-64">
        <div class="text-center">
          <svg class="animate-spin w-8 h-8 text-sap-blue mx-auto mb-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <p class="text-gray-600">Loading dashboard...</p>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError" class="flex items-center justify-center h-64">
        <div class="text-center">
          <svg class="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Unable to load dashboard</h3>
          <p class="text-gray-600 mb-4">{{ errorMessage }}</p>
          <button
            @click="retryLoad"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="!currentDashboard || !currentDashboard.widgets.length" class="flex items-center justify-center h-64">
        <div class="text-center">
          <svg class="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2-2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No widgets found</h3>
          <p class="text-gray-600 mb-4">Add some widgets to start visualizing your data</p>
          <button
            @click="addWidget"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sap-blue hover:bg-sap-dark-blue"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Add Widget
          </button>
        </div>
      </div>

      <!-- Widgets Grid -->
      <ErrorBoundary v-else @retry="retryLoad">
        <div
          class="widgets-grid"
          :style="gridStyle"
        >
          <DashboardWidget
            v-for="widget in currentDashboard.widgets"
            :key="widget.id"
            :widget="widget"
            :dashboard-id="currentDashboard.id"
            @edit="editWidget(widget)"
            @duplicate="duplicateWidget(widget)"
            @remove="removeWidget(widget)"
          />
        </div>
      </ErrorBoundary>
    </div>
  </div>

  <!-- Widget Form Modal (placeholder) -->
  <div
    v-if="showWidgetForm"
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            {{ editingWidget ? 'Edit Widget' : 'Add Widget' }}
          </h3>
          <div class="mt-4">
            <p class="text-sm text-gray-500">
              Widget form implementation would go here...
            </p>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            @click="closeWidgetForm"
            type="button"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sap-blue sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useDashboardStore } from '../stores'
import { exportApi, downloadFile } from '../api'
import DashboardWidget from '../components/DashboardWidget.vue'
import ErrorBoundary from '../components/ErrorBoundary.vue'
import type { DashboardWidget as WidgetType, DatePreset, DateRange } from '../types'

// Store
const dashboardStore = useDashboardStore()

// Reactive state
const selectedDashboardId = ref<string>('')
const selectedDatePreset = ref<DatePreset>('LAST_30_DAYS')
const customDateFrom = ref<string>('')
const customDateTo = ref<string>('')
const showActionsMenu = ref(false)
const showWidgetForm = ref(false)
const editingWidget = ref<WidgetType | null>(null)
const isRefreshing = ref(false)

// Computed
const dashboards = computed(() => dashboardStore.dashboards)
const currentDashboard = computed(() => dashboardStore.currentDashboard)
const reportMetrics = computed(() => dashboardStore.reportMetrics)
const isLoading = computed(() => dashboardStore.loading.currentDashboard || dashboardStore.loading.dashboards)
const hasError = computed(() => !!dashboardStore.errors.currentDashboard || !!dashboardStore.errors.dashboards)
const errorMessage = computed(() => dashboardStore.errors.currentDashboard || dashboardStore.errors.dashboards)

const gridStyle = computed(() => {
  if (!currentDashboard.value) return {}
  
  const layout = currentDashboard.value.layout
  return {
    display: 'grid',
    gridTemplateColumns: `repeat(${layout.columns}, 1fr)`,
    gap: '1.5rem',
    minHeight: '500px'
  }
})

// Methods
const loadDashboard = async () => {
  if (!selectedDashboardId.value) return
  
  try {
    await dashboardStore.fetchDashboard(selectedDashboardId.value)
    await loadWidgetData()
  } catch (error) {
    console.error('Failed to load dashboard:', error)
  }
}

const loadWidgetData = async () => {
  if (!currentDashboard.value) return
  
  const promises = currentDashboard.value.widgets.map(widget =>
    dashboardStore.fetchWidgetData(currentDashboard.value!.id, widget.id)
      .catch(error => console.error(`Failed to load data for widget ${widget.id}:`, error))
  )
  
  await Promise.allSettled(promises)
}

const updateDateRange = () => {
  let dateRange: DateRange
  
  if (selectedDatePreset.value === 'CUSTOM') {
    dateRange = {
      from: customDateFrom.value,
      to: customDateTo.value,
      preset: selectedDatePreset.value,
      customRange: true
    }
  } else {
    const { from, to } = getDateRangeFromPreset(selectedDatePreset.value)
    dateRange = {
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0],
      preset: selectedDatePreset.value,
      customRange: false
    }
  }
  
  dashboardStore.updateGlobalFilters({ dateRange })
}

const getDateRangeFromPreset = (preset: DatePreset) => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  switch (preset) {
    case 'LAST_7_DAYS':
      return {
        from: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000),
        to: today
      }
    case 'LAST_30_DAYS':
      return {
        from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
        to: today
      }
    case 'LAST_90_DAYS':
      return {
        from: new Date(today.getTime() - 89 * 24 * 60 * 60 * 1000),
        to: today
      }
    case 'THIS_MONTH':
      return {
        from: new Date(now.getFullYear(), now.getMonth(), 1),
        to: today
      }
    case 'LAST_MONTH':
      return {
        from: new Date(now.getFullYear(), now.getMonth() - 1, 1),
        to: new Date(now.getFullYear(), now.getMonth(), 0)
      }
    case 'THIS_QUARTER':
      const quarterStart = Math.floor(now.getMonth() / 3) * 3
      return {
        from: new Date(now.getFullYear(), quarterStart, 1),
        to: today
      }
    case 'THIS_YEAR':
      return {
        from: new Date(now.getFullYear(), 0, 1),
        to: today
      }
    default:
      return {
        from: new Date(today.getTime() - 29 * 24 * 60 * 60 * 1000),
        to: today
      }
  }
}

const refreshAllWidgets = async () => {
  if (!currentDashboard.value) return
  
  isRefreshing.value = true
  try {
    await dashboardStore.refreshAllWidgets()
  } catch (error) {
    console.error('Failed to refresh widgets:', error)
  } finally {
    isRefreshing.value = false
  }
}

const addWidget = () => {
  editingWidget.value = null
  showWidgetForm.value = true
  showActionsMenu.value = false
}

const editWidget = (widget: WidgetType) => {
  editingWidget.value = widget
  showWidgetForm.value = true
}

const duplicateWidget = async (widget: WidgetType) => {
  if (!currentDashboard.value) return
  
  try {
    const widgetData = {
      ...widget,
      title: `${widget.title} (Copy)`,
      position: {
        x: widget.position.x + 1,
        y: widget.position.y
      }
    }
    
    // Remove fields that shouldn't be duplicated
    const { id, data, isLoading, error, lastRefresh, ...cleanWidget } = widgetData
    
    await dashboardStore.addWidget(currentDashboard.value.id, cleanWidget as any)
  } catch (error) {
    console.error('Failed to duplicate widget:', error)
  }
}

const removeWidget = async (widget: WidgetType) => {
  if (!currentDashboard.value) return
  
  if (confirm(`Are you sure you want to remove the "${widget.title}" widget?`)) {
    try {
      await dashboardStore.removeWidget(currentDashboard.value.id, widget.id)
    } catch (error) {
      console.error('Failed to remove widget:', error)
    }
  }
}

const editDashboard = () => {
  showActionsMenu.value = false
  // Implementation would navigate to dashboard edit page
  console.log('Edit dashboard:', currentDashboard.value)
}

const cloneDashboard = async () => {
  if (!currentDashboard.value) return
  
  showActionsMenu.value = false
  const name = prompt('Enter name for cloned dashboard:', `${currentDashboard.value.name} (Copy)`)
  
  if (name) {
    try {
      await dashboardStore.cloneDashboard(currentDashboard.value.id, name)
    } catch (error) {
      console.error('Failed to clone dashboard:', error)
    }
  }
}

const exportToPDF = async () => {
  if (!currentDashboard.value) return
  
  showActionsMenu.value = false
  try {
    const blob = await exportApi.exportDashboardPDF(currentDashboard.value.id, {
      title: currentDashboard.value.name,
      includeData: true
    })
    
    downloadFile(blob, `${currentDashboard.value.name}.pdf`)
  } catch (error) {
    console.error('Failed to export PDF:', error)
  }
}

const exportToExcel = async () => {
  if (!currentDashboard.value) return
  
  showActionsMenu.value = false
  try {
    const blob = await exportApi.exportDashboardExcel(currentDashboard.value.id, {
      includeCharts: false
    })
    
    downloadFile(blob, `${currentDashboard.value.name}.xlsx`)
  } catch (error) {
    console.error('Failed to export Excel:', error)
  }
}

const closeWidgetForm = () => {
  showWidgetForm.value = false
  editingWidget.value = null
}

const retryLoad = () => {
  if (selectedDashboardId.value) {
    loadDashboard()
  } else {
    initializeDashboard()
  }
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

const initializeDashboard = async () => {
  try {
    // Load all dashboards first
    await dashboardStore.fetchDashboards()
    
    // Load report metrics (don't fail initialization if this fails)
    try {
      await dashboardStore.fetchReportMetrics(dashboardStore.globalFilters.dateRange)
    } catch (metricsError) {
      console.warn('Failed to load report metrics:', metricsError)
    }
    
    // Select default dashboard
    if (dashboards.value.length > 0) {
      const defaultDash = dashboards.value.find(d => d.isDefault) || dashboards.value[0]
      selectedDashboardId.value = defaultDash.id
      await loadDashboard()
    }
  } catch (error) {
    console.error('Failed to initialize dashboard:', error)
    // Don't throw the error, let the component show the error state
  }
}

// Click outside directive
const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    el._clickOutside = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el._clickOutside)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el._clickOutside)
  }
}

// Lifecycle
onMounted(() => {
  initializeDashboard()
})

// Watch for date range changes
watch([selectedDatePreset, customDateFrom, customDateTo], () => {
  updateDateRange()
})
</script>

<style scoped>
.dashboard-view {
  min-height: 100vh;
}

.widgets-grid {
  grid-auto-rows: minmax(200px, auto);
}

.dashboard-widget {
  break-inside: avoid;
}
</style>