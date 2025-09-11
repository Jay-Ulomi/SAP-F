// Dashboard Module Exports

// Types
export type * from './types'

// Store
export { useDashboardStore } from './stores'

// API
export * as dashboardApi from './api'

// Components
export { default as DashboardWidget } from './components/DashboardWidget.vue'

// Views
export { default as DashboardView } from './views/DashboardView.vue'

// Re-export everything for convenience
export * from './types'
export * from './api'