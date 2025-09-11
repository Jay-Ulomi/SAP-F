import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  ProductionReport, 
  ReportTemplate, 
  ReportSchedule,
  ReportSearchParams
} from '../types'
import { ReportType, ReportPeriod, ReportFormat } from '../types'
import { productionReportsAPI } from '../api'

export const useProductionReportsStore = defineStore('productionReports', () => {
  const reports = ref<ProductionReport[]>([])
  const templates = ref<ReportTemplate[]>([])
  const schedules = ref<ReportSchedule[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentReport = ref<ProductionReport | null>(null)
  const showReportViewer = ref(false)

  // Actions
  async function fetchReports(params?: ReportSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await productionReportsAPI.getReports(params)
      reports.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch reports'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchReport(id: string): Promise<ProductionReport> {
    loading.value = true
    error.value = null
    try {
      const report = await productionReportsAPI.getReport(id)
      currentReport.value = report
      
      // Update the report in the list if it exists
      const index = reports.value.findIndex(r => r.id === id)
      if (index !== -1) {
        reports.value[index] = report
      }
      
      return report
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function generateReport(
    type: ReportType, 
    period: ReportPeriod, 
    dateFrom: string, 
    dateTo: string, 
    filters?: Record<string, any>
  ): Promise<ProductionReport> {
    loading.value = true
    error.value = null
    try {
      const newReport = await productionReportsAPI.generateReport(type, period, dateFrom, dateTo, filters)
      reports.value.unshift(newReport)
      return newReport
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to generate report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function exportReport(id: string, format: ReportFormat): Promise<Blob> {
    loading.value = true
    error.value = null
    try {
      const blob = await productionReportsAPI.exportReport(id, format)
      return blob
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to export report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteReport(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await productionReportsAPI.deleteReport(id)
      
      // Remove from the list
      const index = reports.value.findIndex(r => r.id === id)
      if (index !== -1) {
        reports.value.splice(index, 1)
      }
      
      // Clear current report if it's the deleted one
      if (currentReport.value?.id === id) {
        currentReport.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete report'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchTemplates(): Promise<ReportTemplate[]> {
    loading.value = true
    error.value = null
    try {
      const reportTemplates = await productionReportsAPI.getTemplates()
      templates.value = reportTemplates
      return reportTemplates
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch templates'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchSchedules(): Promise<ReportSchedule[]> {
    loading.value = true
    error.value = null
    try {
      const reportSchedules = await productionReportsAPI.getSchedules()
      schedules.value = reportSchedules
      return reportSchedules
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch schedules'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createSchedule(data: Omit<ReportSchedule, 'id' | 'createdAt' | 'createdBy'>): Promise<ReportSchedule> {
    loading.value = true
    error.value = null
    try {
      const newSchedule = await productionReportsAPI.createSchedule(data)
      schedules.value.push(newSchedule)
      return newSchedule
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteSchedule(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await productionReportsAPI.deleteSchedule(id)
      
      // Remove from the list
      const index = schedules.value.findIndex(s => s.id === id)
      if (index !== -1) {
        schedules.value.splice(index, 1)
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete schedule'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getReportById(id: string): ProductionReport | undefined {
    return reports.value.find(r => r.id === id)
  }

  function getReportsByType(type: ReportType): ProductionReport[] {
    return reports.value.filter(r => r.type === type)
  }

  function getReportsByPeriod(period: ReportPeriod): ProductionReport[] {
    return reports.value.filter(r => r.period === period)
  }

  function getRecentReports(limit: number = 5): ProductionReport[] {
    return reports.value
      .sort((a, b) => new Date(b.generatedAt).getTime() - new Date(a.generatedAt).getTime())
      .slice(0, limit)
  }

  function getReportsByDateRange(dateFrom: string, dateTo: string): ProductionReport[] {
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo)
    
    return reports.value.filter(r => {
      const reportDate = new Date(r.generatedAt)
      return reportDate >= fromDate && reportDate <= toDate
    })
  }

  function getTemplateById(id: string): ReportTemplate | undefined {
    return templates.value.find(t => t.id === id)
  }

  function getActiveTemplates(): ReportTemplate[] {
    return templates.value.filter(t => t.isActive)
  }

  function getTemplatesByType(type: ReportType): ReportTemplate[] {
    return templates.value.filter(t => t.type === type)
  }

  function getScheduleById(id: string): ReportSchedule | undefined {
    return schedules.value.find(s => s.id === id)
  }

  function getActiveSchedules(): ReportSchedule[] {
    return schedules.value.filter(s => s.isActive)
  }

  function getSchedulesByType(type: ReportType): ReportSchedule[] {
    return schedules.value.filter(s => s.reportType === type)
  }

  function getOverdueSchedules(): ReportSchedule[] {
    const now = new Date()
    return schedules.value.filter(s => 
      s.isActive && s.nextRun && new Date(s.nextRun) < now
    )
  }

  // Statistics
  function getReportTypeDistribution(): Record<ReportType, number> {
    const distribution: Record<string, number> = {}
    
    reports.value.forEach(report => {
      distribution[report.type] = (distribution[report.type] || 0) + 1
    })
    
    return distribution as Record<ReportType, number>
  }

  function getMostUsedReportTypes(limit: number = 3): Array<{ type: ReportType; count: number }> {
    const distribution = getReportTypeDistribution()
    
    return Object.entries(distribution)
      .map(([type, count]) => ({ type: type as ReportType, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit)
  }

  function getReportsGeneratedToday(): number {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    return reports.value.filter(r => {
      const reportDate = new Date(r.generatedAt)
      reportDate.setHours(0, 0, 0, 0)
      return reportDate.getTime() === today.getTime()
    }).length
  }

  function getReportsGeneratedThisWeek(): number {
    const now = new Date()
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()))
    weekStart.setHours(0, 0, 0, 0)
    
    return reports.value.filter(r => 
      new Date(r.generatedAt) >= weekStart
    ).length
  }

  function getReportsGeneratedThisMonth(): number {
    const now = new Date()
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    return reports.value.filter(r => 
      new Date(r.generatedAt) >= monthStart
    ).length
  }

  // Report Viewer Management
  function openReportViewer(report: ProductionReport): void {
    currentReport.value = report
    showReportViewer.value = true
  }

  function closeReportViewer(): void {
    showReportViewer.value = false
    // Don't clear currentReport immediately to allow for smooth closing animation
    setTimeout(() => {
      if (!showReportViewer.value) {
        currentReport.value = null
      }
    }, 300)
  }

  return {
    // State
    reports,
    templates,
    schedules,
    loading,
    error,
    currentReport,
    showReportViewer,
    
    // Actions
    fetchReports,
    fetchReport,
    generateReport,
    exportReport,
    deleteReport,
    fetchTemplates,
    fetchSchedules,
    createSchedule,
    deleteSchedule,
    openReportViewer,
    closeReportViewer,
    
    // Getters
    getReportById,
    getReportsByType,
    getReportsByPeriod,
    getRecentReports,
    getReportsByDateRange,
    getTemplateById,
    getActiveTemplates,
    getTemplatesByType,
    getScheduleById,
    getActiveSchedules,
    getSchedulesByType,
    getOverdueSchedules,
    getReportTypeDistribution,
    getMostUsedReportTypes,
    getReportsGeneratedToday,
    getReportsGeneratedThisWeek,
    getReportsGeneratedThisMonth,
  }
})