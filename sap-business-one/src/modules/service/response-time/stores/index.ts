import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { serviceAPI } from '../../api'
import type {
  ResponseTimeMetric,
  ResponseTimeFormData,
  ResponseTimeSearchParams,
  ResponseTimeStats,
  ResponseTimeFilters,
  ServiceCallPriority,
  ServiceCallType,
} from '../types'

export const useResponseTimeStore = defineStore('responseTime', () => {
  // State
  const metrics = ref<ResponseTimeMetric[]>([])
  const currentMetric = ref<ResponseTimeMetric | null>(null)
  const stats = ref<ResponseTimeStats | null>(null)
  const selectedPeriod = ref('monthly')
  const loading = ref(false)
  const error = ref<string | null>(null)
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<ResponseTimeFilters>({})

  // Computed properties
  const slaCompliance = computed(() => {
    if (!metrics.value) return 0
    return metrics.value.slaPercentage
  })

  const slaStatus = computed(() => {
    const compliance = slaCompliance.value
    if (compliance >= 95) return 'excellent'
    if (compliance >= 85) return 'good'
    if (compliance >= 75) return 'fair'
    return 'poor'
  })

  const averageResponseTimeFormatted = computed(() => {
    if (!metrics.value) return '0m'
    return formatTime(metrics.value.averageResponseTime)
  })

  const medianResponseTimeFormatted = computed(() => {
    if (!metrics.value) return '0m'
    return formatTime(metrics.value.medianResponseTime)
  })

  const priorityPerformance = computed(() => {
    if (!metrics.value?.byPriority) return []
    return metrics.value.byPriority.map((priority) => ({
      ...priority,
      performanceStatus: getSLAStatus(priority.slaPercentage),
      formattedTime: formatTime(priority.averageTime),
    }))
  })

  const typePerformance = computed(() => {
    if (!metrics.value?.byType) return []
    return metrics.value.byType.map((type) => ({
      ...type,
      performanceStatus: getSLAStatus(type.slaPercentage),
      formattedTime: formatTime(type.averageTime),
    }))
  })

  // Stats calculation
  const calculateStats = () => {
    const metricsList = metrics.value
    const totalMetrics = metricsList.length
    const averageResponseTime =
      metricsList.reduce((sum, metric) => sum + metric.actualValue, 0) / totalMetrics || 0
    const averageResolutionTime = 0 // Would be calculated from actual data
    const averageFirstResponse = 0 // Would be calculated from actual data
    const slaCompliantMetrics = metricsList.filter((metric) => metric.slaCompliance).length
    const slaComplianceRate = totalMetrics > 0 ? (slaCompliantMetrics / totalMetrics) * 100 : 0

    const excellentMetrics = metricsList.filter((metric) => metric.status === 'excellent').length
    const goodMetrics = metricsList.filter((metric) => metric.status === 'good').length
    const fairMetrics = metricsList.filter((metric) => metric.status === 'fair').length
    const poorMetrics = metricsList.filter((metric) => metric.status === 'poor').length
    const criticalMetrics = metricsList.filter((metric) => metric.status === 'critical').length

    const metricsByStatus = {
      excellent: excellentMetrics,
      good: goodMetrics,
      fair: fairMetrics,
      poor: poorMetrics,
      critical: criticalMetrics,
    }

    const metricsByType = {
      response_time: metricsList.filter((m) => m.metricType === 'response_time').length,
      resolution_time: metricsList.filter((m) => m.metricType === 'resolution_time').length,
      first_response: metricsList.filter((m) => m.metricType === 'first_response').length,
      customer_satisfaction: metricsList.filter((m) => m.metricType === 'customer_satisfaction')
        .length,
      sla_compliance: metricsList.filter((m) => m.metricType === 'sla_compliance').length,
    }

    // Mock top performers
    const topPerformers = [
      { technicianId: 'tech-001', technicianName: 'John Smith', averageTime: 45, metricCount: 25 },
      { technicianId: 'tech-002', technicianName: 'Jane Doe', averageTime: 52, metricCount: 20 },
      {
        technicianId: 'tech-003',
        technicianName: 'Mike Johnson',
        averageTime: 58,
        metricCount: 18,
      },
    ]

    // Mock trends
    const trends = [
      { period: '2024-01', averageTime: 45, metricCount: 25, slaCompliance: 95 },
      { period: '2024-02', averageTime: 48, metricCount: 30, slaCompliance: 92 },
      { period: '2024-03', averageTime: 42, metricCount: 28, slaCompliance: 98 },
    ]

    stats.value = {
      totalMetrics,
      averageResponseTime,
      averageResolutionTime,
      averageFirstResponse,
      slaComplianceRate,
      excellentMetrics,
      goodMetrics,
      fairMetrics,
      poorMetrics,
      criticalMetrics,
      metricsByStatus,
      metricsByType,
      topPerformers,
      trends,
    }
  }

  const technicianPerformance = computed(() => {
    if (!metrics.value?.byTechnician) return []
    return metrics.value.byTechnician.map((tech) => ({
      ...tech,
      overallPerformance: calculateOverallPerformance(
        tech.slaPercentage,
        tech.customerSatisfaction,
      ),
      formattedResponseTime: formatTime(tech.averageResponseTime),
      formattedResolutionTime: formatTime(tech.averageResolutionTime),
    }))
  })

  const topPerformingTechnicians = computed(() => {
    return technicianPerformance.value
      .filter((tech) => tech.callsHandled >= 5) // Minimum calls for consideration
      .sort((a, b) => {
        const scoreA = (a.slaPercentage / 100 + a.customerSatisfaction / 5) / 2
        const scoreB = (b.slaPercentage / 100 + b.customerSatisfaction / 5) / 2
        return scoreB - scoreA
      })
      .slice(0, 5)
  })

  const worstPerformingTechnicians = computed(() => {
    return technicianPerformance.value
      .filter((tech) => tech.callsHandled >= 5)
      .sort((a, b) => {
        const scoreA = (a.slaPercentage / 100 + a.customerSatisfaction / 5) / 2
        const scoreB = (b.slaPercentage / 100 + b.customerSatisfaction / 5) / 2
        return scoreA - scoreB
      })
      .slice(0, 3)
  })

  // Utility functions
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes.toFixed(0)}m`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return `${hours}h ${remainingMinutes.toFixed(0)}m`
  }

  const getSLAStatus = (percentage: number) => {
    if (percentage >= 95) return 'excellent'
    if (percentage >= 85) return 'good'
    if (percentage >= 75) return 'fair'
    return 'poor'
  }

  const calculateOverallPerformance = (slaPercentage: number, customerSatisfaction: number) => {
    const avgScore = (slaPercentage / 100 + customerSatisfaction / 5) / 2
    if (avgScore >= 0.9) return 'excellent'
    if (avgScore >= 0.8) return 'good'
    if (avgScore >= 0.7) return 'fair'
    return 'poor'
  }

  // Actions
  const loadMetrics = async (period?: string) => {
    try {
      loading.value = true
      error.value = null

      const periodToUse = period || selectedPeriod.value
      const responseMetrics = await serviceAPI.getResponseTimeMetrics(periodToUse)
      metrics.value = responseMetrics
      selectedPeriod.value = periodToUse
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load response time metrics'
      console.error('Error loading response time metrics:', err)
    } finally {
      loading.value = false
    }
  }

  // Metrics CRUD operations
  const fetchMetrics = async (params?: ResponseTimeSearchParams) => {
    loading.value = true
    error.value = null
    try {
      // Mock API call - in real app, this would call the actual API
      const mockMetrics: ResponseTimeMetric[] = [
        {
          id: '1',
          serviceCallId: 'call-001',
          serviceCallNumber: '#SC-2024-001',
          customerId: 'cust-001',
          customerName: 'ABC Company',
          technicianId: 'tech-001',
          technicianName: 'John Smith',
          metricType: 'response_time',
          value: 45,
          unit: 'minutes',
          status: 'excellent',
          targetValue: 60,
          actualValue: 45,
          variance: -15,
          variancePercentage: -25,
          slaTarget: 60,
          slaCompliance: true,
          measuredAt: '2024-01-15T10:30:00Z',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
          notes: 'Excellent response time',
        },
      ]

      metrics.value = mockMetrics
      pagination.value = {
        page: 1,
        limit: 10,
        total: mockMetrics.length,
        totalPages: 1,
        hasNext: false,
        hasPrev: false,
      }
      calculateStats()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch metrics'
    } finally {
      loading.value = false
    }
  }

  const createMetric = async (data: ResponseTimeFormData) => {
    // Mock implementation
    console.log('Creating metric:', data)
  }

  const updateMetric = async (id: string, data: ResponseTimeFormData) => {
    // Mock implementation
    console.log('Updating metric:', id, data)
  }

  const deleteMetric = async (id: string) => {
    // Mock implementation
    console.log('Deleting metric:', id)
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const refreshMetrics = () => {
    loadMetrics()
  }

  const setPeriod = (period: string) => {
    selectedPeriod.value = period
    loadMetrics(period)
  }

  return {
    // State
    metrics,
    currentMetric,
    stats,
    selectedPeriod,
    loading,
    error,
    pagination,
    filters,

    // Computed
    slaCompliance,
    slaStatus,
    averageResponseTimeFormatted,
    medianResponseTimeFormatted,
    priorityPerformance,
    typePerformance,
    technicianPerformance,
    topPerformingTechnicians,
    worstPerformingTechnicians,

    // Actions
    loadMetrics,
    refreshMetrics,
    setPeriod,
    fetchMetrics,
    createMetric,
    updateMetric,
    deleteMetric,
    setPage,

    // Utilities
    formatTime,
    getSLAStatus,
    calculateOverallPerformance,
  }
})
