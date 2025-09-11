import type {
  ReportDashboard,
  DashboardFormData,
  WidgetFormData,
  DashboardSearchParams,
  ReportSearchParams,
  DashboardResponse,
  DashboardListResponse,
  WidgetDataResponse,
  DashboardStatsResponse,
  ReportMetricsResponse,
  ChartData,
  DateRange,
  DataSourceType
} from '../types'

const API_BASE_URL = '/api/reports/dashboard'

// Development mode check
const isDevelopment = import.meta.env.DEV

// Dashboard CRUD Operations
export const dashboardApi = {
  // Get all dashboards
  async getDashboards(params?: DashboardSearchParams): Promise<DashboardListResponse> {
    if (isDevelopment) {
      // Return mock data in development
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            data: [mockDataApi.generateMockDashboard()],
            total: 1,
            page: 1,
            limit: 10
          })
        }, 500)
      })
    }

    try {
      const queryString = params ? new URLSearchParams(params as any).toString() : ''
      const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      // Check if response is HTML (error page)
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error)
      // Fallback to mock data
      return {
        success: true,
        data: [mockDataApi.generateMockDashboard()],
        total: 1,
        page: 1,
        limit: 10
      }
    }
  },

  // Get dashboard by ID
  async getDashboard(id: string): Promise<DashboardResponse> {
    if (isDevelopment) {
      // Return mock data in development
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            data: mockDataApi.generateMockDashboard()
          })
        }, 300)
      })
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error)
      return {
        success: true,
        data: mockDataApi.generateMockDashboard()
      }
    }
  },

  // Create new dashboard
  async createDashboard(data: DashboardFormData): Promise<DashboardResponse> {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Update dashboard
  async updateDashboard(id: string, data: Partial<DashboardFormData>): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Delete dashboard
  async deleteDashboard(id: string): Promise<{ success: boolean; message?: string }> {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Clone dashboard
  async cloneDashboard(id: string, name: string): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}/clone`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Set default dashboard
  async setDefaultDashboard(id: string): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${id}/set-default`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

// Widget Operations
export const widgetApi = {
  // Add widget to dashboard
  async addWidget(dashboardId: string, widget: WidgetFormData): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/widgets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widget),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Update widget
  async updateWidget(dashboardId: string, widgetId: string, widget: Partial<WidgetFormData>): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/widgets/${widgetId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(widget),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Remove widget from dashboard
  async removeWidget(dashboardId: string, widgetId: string): Promise<DashboardResponse> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/widgets/${widgetId}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Get widget data
  async getWidgetData(dashboardId: string, widgetId: string, filters?: Record<string, any>): Promise<WidgetDataResponse> {
    if (isDevelopment) {
      // Return mock widget data based on widget type
      return new Promise(resolve => {
        setTimeout(() => {
          const mockData = widgetId === 'widget-2' 
            ? mockDataApi.generateMockChartData()
            : { value: Math.floor(Math.random() * 100000), change: Math.random() * 20 - 10 }
          
          resolve({
            success: true,
            data: mockData
          })
        }, 200)
      })
    }

    try {
      const queryString = filters ? new URLSearchParams(filters).toString() : ''
      const url = queryString 
        ? `${API_BASE_URL}/${dashboardId}/widgets/${widgetId}/data?${queryString}`
        : `${API_BASE_URL}/${dashboardId}/widgets/${widgetId}/data`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.warn(`Widget data API call failed for ${widgetId}, falling back to mock data:`, error)
      const mockData = widgetId === 'widget-2' 
        ? mockDataApi.generateMockChartData()
        : { value: Math.floor(Math.random() * 100000), change: Math.random() * 20 - 10 }
      
      return {
        success: true,
        data: mockData
      }
    }
  },

  // Refresh widget data
  async refreshWidget(dashboardId: string, widgetId: string): Promise<WidgetDataResponse> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/widgets/${widgetId}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

// Dashboard Statistics
export const dashboardStatsApi = {
  // Get dashboard statistics
  async getDashboardStats(dashboardId: string): Promise<DashboardStatsResponse> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Get report metrics
  async getReportMetrics(dateRange?: DateRange, filters?: Record<string, any>): Promise<ReportMetricsResponse> {
    if (isDevelopment) {
      // Return mock metrics data in development
      return new Promise(resolve => {
        setTimeout(() => {
          resolve({
            success: true,
            data: {
              totalRevenue: 125000,
              totalExpenses: 87500,
              netProfit: 37500,
              profitMargin: 30.0,
              totalOrders: 245,
              activeCustomers: 89,
              inventoryValue: 45000,
              cashFlow: 12500,
              accountsReceivable: 25000,
              accountsPayable: 18500
            }
          })
        }, 400)
      })
    }

    try {
      const params = {
        ...(dateRange && { dateFrom: dateRange.from, dateTo: dateRange.to }),
        ...(filters || {})
      }
      const queryString = new URLSearchParams(params).toString()
      const url = queryString ? `/api/reports/metrics?${queryString}` : '/api/reports/metrics'
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`API returned non-JSON response: ${response.status} ${response.statusText}`)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return response.json()
    } catch (error) {
      console.warn('API call failed, falling back to mock data:', error)
      return {
        success: true,
        data: {
          totalRevenue: 125000,
          totalExpenses: 87500,
          netProfit: 37500,
          profitMargin: 30.0,
          totalOrders: 245,
          activeCustomers: 89,
          inventoryValue: 45000,
          cashFlow: 12500,
          accountsReceivable: 25000,
          accountsPayable: 18500
        }
      }
    }
  }
}

// Data Source APIs
export const dataSourceApi = {
  // Get available data sources
  async getDataSources(): Promise<{ success: boolean; data: { type: DataSourceType; name: string; endpoint: string }[] }> {
    const response = await fetch('/api/reports/data-sources', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Test data source connection
  async testDataSource(endpoint: string, method: string, parameters?: Record<string, any>): Promise<{ success: boolean; data?: any; error?: string }> {
    const response = await fetch('/api/reports/data-sources/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint, method, parameters }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  },

  // Get data source schema
  async getDataSourceSchema(type: DataSourceType): Promise<{ success: boolean; data: any }> {
    const response = await fetch(`/api/reports/data-sources/${type}/schema`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }
}

// Report Export APIs
export const exportApi = {
  // Export dashboard as PDF
  async exportDashboardPDF(dashboardId: string, options?: { title?: string; includeData?: boolean }): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/export/pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options || {}),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  },

  // Export dashboard data as Excel
  async exportDashboardExcel(dashboardId: string, options?: { includeCharts?: boolean }): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/export/excel`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options || {}),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  },

  // Export widget data as CSV
  async exportWidgetCSV(dashboardId: string, widgetId: string): Promise<Blob> {
    const response = await fetch(`${API_BASE_URL}/${dashboardId}/widgets/${widgetId}/export/csv`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.blob()
  }
}

// Utility function for handling file downloads
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

// Mock data generators for development
export const mockDataApi = {
  // Generate mock dashboard data
  generateMockDashboard(): ReportDashboard {
    return {
      id: '1',
      name: 'Executive Dashboard',
      description: 'High-level business metrics and KPIs',
      userId: 'user-1',
      isDefault: true,
      layout: {
        columns: 12,
        rows: 8,
        gridSize: 'md'
      },
      widgets: [
        {
          id: 'widget-1',
          type: 'KPI' as any,
          title: 'Total Revenue',
          position: { x: 0, y: 0 },
          size: { width: 3, height: 2 },
          config: {
            dataSource: {
              type: 'SALES' as any,
              endpoint: '/api/sales/revenue',
              method: 'GET'
            },
            displayOptions: {
              numberFormat: 'CURRENCY' as any,
              unit: 'USD'
            }
          },
          data: { value: 125000, change: 12.5 },
          isLoading: false,
          lastRefresh: new Date().toISOString()
        },
        {
          id: 'widget-2',
          type: 'CHART' as any,
          title: 'Sales Trend',
          position: { x: 3, y: 0 },
          size: { width: 6, height: 4 },
          config: {
            chartType: 'LINE' as any,
            dataSource: {
              type: 'SALES' as any,
              endpoint: '/api/sales/trend',
              method: 'GET'
            },
            displayOptions: {
              showLegend: true,
              showGrid: true
            }
          },
          data: this.generateMockChartData(),
          isLoading: false,
          lastRefresh: new Date().toISOString()
        },
        {
          id: 'widget-3',
          type: 'KPI' as any,
          title: 'Active Customers',
          position: { x: 9, y: 0 },
          size: { width: 3, height: 2 },
          config: {
            dataSource: {
              type: 'CRM' as any,
              endpoint: '/api/customers/active',
              method: 'GET'
            },
            displayOptions: {
              numberFormat: 'INTEGER' as any
            }
          },
          data: { value: 89, change: 5.2 },
          isLoading: false,
          lastRefresh: new Date().toISOString()
        }
      ],
      filters: {
        dateRange: {
          from: '2024-01-01',
          to: '2024-12-31',
          preset: 'THIS_YEAR' as any
        }
      },
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-15T00:00:00Z'
    }
  },

  // Generate mock chart data
  generateMockChartData(): ChartData {
    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Revenue',
        data: [10000, 15000, 12000, 18000, 22000, 25000],
        backgroundColor: '#3b82f6',
        borderColor: '#1d4ed8',
        borderWidth: 2
      }],
      metadata: {
        totalValue: 102000,
        averageValue: 17000,
        currency: 'USD',
        unit: 'dollars'
      }
    }
  }
}