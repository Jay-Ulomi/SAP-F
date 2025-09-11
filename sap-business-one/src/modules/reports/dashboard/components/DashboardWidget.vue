<template>
  <div
    :class="[
      'dashboard-widget',
      'bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden',
      'hover:shadow-md transition-shadow duration-200',
      { 'opacity-75': isLoading }
    ]"
    :style="widgetStyle"
  >
    <!-- Widget Header -->
    <div class="widget-header px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <h3 class="text-sm font-semibold text-gray-900 truncate">
        {{ widget.title }}
      </h3>
      <div class="flex items-center space-x-2">
        <!-- Refresh Button -->
        <button
          v-if="!hideControls"
          @click="refreshWidget"
          :disabled="isLoading"
          class="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors disabled:opacity-50"
          title="Refresh widget"
        >
          <svg 
            :class="['w-4 h-4', { 'animate-spin': isLoading }]" 
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
        </button>

        <!-- Options Menu -->
        <div v-if="!hideControls" class="relative">
          <button
            @click="showMenu = !showMenu"
            class="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
            title="Widget options"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div
            v-if="showMenu"
            v-click-outside="() => showMenu = false"
            class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50"
          >
            <div class="py-1">
              <button
                @click="editWidget"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Edit Widget
              </button>
              <button
                @click="duplicateWidget"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Duplicate
              </button>
              <button
                @click="exportData"
                class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Export Data
              </button>
              <hr class="my-1">
              <button
                @click="removeWidget"
                class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Remove Widget
              </button>
            </div>
          </div>
        </div>

        <!-- Last Refresh Time -->
        <span 
          v-if="widget.lastRefresh && !hideControls"
          class="text-xs text-gray-500"
          :title="`Last refreshed: ${formatDateTime(widget.lastRefresh)}`"
        >
          {{ formatRelativeTime(widget.lastRefresh) }}
        </span>
      </div>
    </div>

    <!-- Widget Content -->
    <div class="widget-content p-4 min-h-[200px] relative">
      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10"
      >
        <div class="flex items-center space-x-2">
          <svg class="animate-spin w-5 h-5 text-sap-blue" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span class="text-sm text-gray-600">Loading...</span>
        </div>
      </div>

      <!-- Error State -->
      <div
        v-else-if="widget.error"
        class="flex items-center justify-center h-32 text-center"
      >
        <div class="space-y-2">
          <svg class="w-8 h-8 text-red-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-sm text-red-600">{{ widget.error }}</p>
          <button
            @click="refreshWidget"
            class="text-xs text-sap-blue hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>

      <!-- Widget Content by Type -->
      <div v-else class="h-full">
        <!-- Chart Widget -->
        <div v-if="widget.type === 'CHART'" class="h-full">
          <canvas 
            ref="chartCanvas"
            class="w-full h-full max-h-64"
          ></canvas>
        </div>

        <!-- KPI Widget -->
        <div v-else-if="widget.type === 'KPI'" class="h-full flex flex-col justify-center">
          <div class="text-center space-y-2">
            <div class="text-3xl font-bold text-gray-900">
              {{ formatNumber(kpiValue) }}
            </div>
            <div class="text-sm text-gray-500">
              {{ widget.config.displayOptions?.unit || '' }}
            </div>
            <div 
              v-if="kpiChange !== null"
              :class="[
                'text-sm font-medium flex items-center justify-center space-x-1',
                kpiChange >= 0 ? 'text-green-600' : 'text-red-600'
              ]"
            >
              <svg 
                :class="['w-3 h-3', kpiChange >= 0 ? 'rotate-0' : 'rotate-180']"
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>{{ Math.abs(kpiChange) }}%</span>
            </div>
          </div>
        </div>

        <!-- Table Widget -->
        <div v-else-if="widget.type === 'TABLE'" class="h-full overflow-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200">
                <th
                  v-for="column in tableColumns"
                  :key="column.key"
                  class="text-left py-2 px-3 font-medium text-gray-700"
                >
                  {{ column.label }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in tableRows"
                :key="index"
                class="border-b border-gray-100 hover:bg-gray-50"
              >
                <td
                  v-for="column in tableColumns"
                  :key="column.key"
                  class="py-2 px-3 text-gray-900"
                >
                  {{ formatCellValue(row[column.key], column.type) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- List Widget -->
        <div v-else-if="widget.type === 'LIST'" class="h-full">
          <div class="space-y-2">
            <div
              v-for="(item, index) in listItems"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-50 rounded-md"
            >
              <span class="text-sm text-gray-900">{{ item.label }}</span>
              <span class="text-sm font-medium text-gray-700">{{ formatNumber(item.value) }}</span>
            </div>
          </div>
        </div>

        <!-- Text Widget -->
        <div v-else-if="widget.type === 'TEXT'" class="h-full">
          <div class="prose prose-sm max-w-none" v-html="textContent"></div>
        </div>

        <!-- Fallback for unsupported widget types -->
        <div v-else class="flex items-center justify-center h-32 text-gray-500">
          <div class="text-center">
            <p class="text-sm">Widget type "{{ widget.type }}" not supported</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import { useDashboardStore } from '../stores'
import type { DashboardWidget, ChartData, ChartType } from '../types'

// Register Chart.js components
Chart.register(...registerables)

interface Props {
  widget: DashboardWidget
  dashboardId: string
  hideControls?: boolean
  autoRefresh?: boolean
}

interface Emits {
  (e: 'edit'): void
  (e: 'duplicate'): void
  (e: 'remove'): void
}

const props = withDefaults(defineProps<Props>(), {
  hideControls: false,
  autoRefresh: true
})

const emit = defineEmits<Emits>()

// Store
const dashboardStore = useDashboardStore()

// Refs
const chartCanvas = ref<HTMLCanvasElement | null>(null)
const showMenu = ref(false)
const chartInstance = ref<Chart | null>(null)

// Computed
const isLoading = computed(() => 
  dashboardStore.isWidgetLoading(props.widget.id)
)

const widgetData = computed(() => 
  dashboardStore.getWidgetData(props.widget.id) || props.widget.data
)

const widgetStyle = computed(() => ({
  gridColumn: `span ${props.widget.size.width}`,
  gridRow: `span ${props.widget.size.height}`
}))

// KPI specific computed
const kpiValue = computed(() => {
  if (props.widget.type !== 'KPI' || !widgetData.value) return 0
  return widgetData.value.value || 0
})

const kpiChange = computed(() => {
  if (props.widget.type !== 'KPI' || !widgetData.value) return null
  return widgetData.value.change || null
})

// Table specific computed
const tableColumns = computed(() => {
  if (props.widget.type !== 'TABLE' || !widgetData.value?.columns) return []
  return widgetData.value.columns
})

const tableRows = computed(() => {
  if (props.widget.type !== 'TABLE' || !widgetData.value?.rows) return []
  return widgetData.value.rows
})

// List specific computed
const listItems = computed(() => {
  if (props.widget.type !== 'LIST' || !widgetData.value?.items) return []
  return widgetData.value.items
})

// Text specific computed
const textContent = computed(() => {
  if (props.widget.type !== 'TEXT' || !widgetData.value?.content) return ''
  return widgetData.value.content
})

// Methods
const refreshWidget = async () => {
  try {
    await dashboardStore.fetchWidgetData(props.dashboardId, props.widget.id)
  } catch (error) {
    console.error('Failed to refresh widget:', error)
  }
}

const editWidget = () => {
  showMenu.value = false
  emit('edit')
}

const duplicateWidget = () => {
  showMenu.value = false
  emit('duplicate')
}

const removeWidget = () => {
  showMenu.value = false
  emit('remove')
}

const exportData = async () => {
  showMenu.value = false
  // Implementation would depend on the export API
  console.log('Export widget data:', widgetData.value)
}

// Chart methods
const initializeChart = async () => {
  if (!chartCanvas.value || props.widget.type !== 'CHART' || !widgetData.value) {
    return
  }

  await nextTick()

  // Destroy existing chart
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  const chartData = widgetData.value as ChartData
  const chartType = props.widget.config.chartType?.toLowerCase() || 'bar'

  chartInstance.value = new Chart(ctx, {
    type: chartType as any,
    data: {
      labels: chartData.labels,
      datasets: chartData.datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: props.widget.config.displayOptions?.showLegend !== false
        },
        tooltip: {
          enabled: props.widget.config.displayOptions?.showTooltips !== false
        }
      },
      scales: chartType !== 'pie' && chartType !== 'doughnut' ? {
        x: {
          grid: {
            display: props.widget.config.displayOptions?.showGrid !== false
          }
        },
        y: {
          grid: {
            display: props.widget.config.displayOptions?.showGrid !== false
          }
        }
      } : undefined
    }
  })
}

// Utility methods
const formatNumber = (value: number): string => {
  const format = props.widget.config.displayOptions?.numberFormat || 'DECIMAL'
  
  switch (format) {
    case 'CURRENCY':
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value)
    case 'PERCENTAGE':
      return new Intl.NumberFormat('en-US', { 
        style: 'percent', 
        minimumFractionDigits: 1 
      }).format(value / 100)
    case 'ABBREVIATED':
      if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B'
      if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M'
      if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K'
      return value.toString()
    default:
      return new Intl.NumberFormat('en-US').format(value)
  }
}

const formatCellValue = (value: any, type?: string): string => {
  if (value === null || value === undefined) return '-'
  
  switch (type) {
    case 'currency':
      return formatNumber(value)
    case 'date':
      return new Date(value).toLocaleDateString()
    case 'datetime':
      return new Date(value).toLocaleString()
    default:
      return value.toString()
  }
}

const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString()
}

const formatRelativeTime = (dateString: string): string => {
  const now = new Date()
  const date = new Date(dateString)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / (1000 * 60))
  
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  
  const diffDays = Math.floor(diffHours / 24)
  return `${diffDays}d ago`
}

// Auto-refresh setup
let refreshInterval: NodeJS.Timeout | null = null

const setupAutoRefresh = () => {
  if (props.autoRefresh && props.widget.refreshInterval && props.widget.refreshInterval > 0) {
    refreshInterval = setInterval(() => {
      refreshWidget()
    }, props.widget.refreshInterval * 1000)
  }
}

const clearAutoRefresh = () => {
  if (refreshInterval) {
    clearInterval(refreshInterval)
    refreshInterval = null
  }
}

// Watchers
watch(() => widgetData.value, () => {
  if (props.widget.type === 'CHART') {
    initializeChart()
  }
}, { immediate: true })

watch(() => props.widget.refreshInterval, () => {
  clearAutoRefresh()
  setupAutoRefresh()
})

// Lifecycle
onMounted(() => {
  setupAutoRefresh()
})

onUnmounted(() => {
  clearAutoRefresh()
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})

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
</script>

<style scoped>
.dashboard-widget {
  min-height: 200px;
}

.widget-content {
  position: relative;
}

.prose h1,
.prose h2,
.prose h3 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose p {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
</style>