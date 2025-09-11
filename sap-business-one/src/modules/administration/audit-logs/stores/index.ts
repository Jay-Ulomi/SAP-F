import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuditLog, AuditLogFilters, AuditLogStats } from '../types'

const generateMockAuditLogs = (): AuditLog[] => [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    level: 'INFO',
    userId: '1',
    userName: 'John Admin',
    userEmail: 'john.admin@company.com',
    module: 'USER',
    action: 'CREATE_USER',
    description: 'Created new user: Jane Smith',
    ipAddress: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    metadata: { newUserId: '123', role: 'USER' },
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    level: 'WARNING',
    userId: '2',
    userName: 'Jane Manager',
    userEmail: 'jane.manager@company.com',
    module: 'AUTH',
    action: 'FAILED_LOGIN',
    description: 'Failed login attempt with incorrect password',
    ipAddress: '192.168.1.101',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    metadata: { attempts: 3 },
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    level: 'INFO',
    userId: '1',
    userName: 'John Admin',
    userEmail: 'john.admin@company.com',
    module: 'SETTINGS',
    action: 'UPDATE_SETTINGS',
    description: 'Updated system security settings',
    ipAddress: '192.168.1.100',
    metadata: { changedFields: ['maxLoginAttempts', 'sessionTimeout'] },
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    level: 'ERROR',
    module: 'SYSTEM',
    action: 'DATABASE_ERROR',
    description: 'Database connection timeout during backup process',
    ipAddress: 'system',
    metadata: { error: 'Connection timeout after 30s', operation: 'backup' },
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    level: 'INFO',
    userId: '3',
    userName: 'Bob User',
    userEmail: 'bob.user@company.com',
    module: 'API',
    action: 'API_ACCESS',
    description: 'Generated new API key',
    ipAddress: '192.168.1.102',
    metadata: { keyId: 'key_abc123', permissions: ['read', 'write'] },
  },
]

export const useAuditLogStore = defineStore('administration-audit-logs', () => {
  const auditLogs = ref<AuditLog[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<AuditLogFilters>({})
  const pagination = ref({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const stats = ref<AuditLogStats | null>(null)

  const filteredLogs = computed(() => {
    let result = [...auditLogs.value]

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(log =>
        (log.userName && log.userName.toLowerCase().includes(search)) ||
        (log.userEmail && log.userEmail.toLowerCase().includes(search)) ||
        log.action.toLowerCase().includes(search) ||
        log.description.toLowerCase().includes(search)
      )
    }

    if (filters.value.level) {
      result = result.filter(log => log.level === filters.value.level)
    }

    if (filters.value.module) {
      result = result.filter(log => log.module === filters.value.module)
    }

    if (filters.value.dateFrom) {
      const fromDate = new Date(filters.value.dateFrom)
      result = result.filter(log => new Date(log.timestamp) >= fromDate)
    }

    if (filters.value.dateTo) {
      const toDate = new Date(filters.value.dateTo)
      toDate.setHours(23, 59, 59, 999)
      result = result.filter(log => new Date(log.timestamp) <= toDate)
    }

    pagination.value.total = result.length
    pagination.value.totalPages = Math.ceil(result.length / pagination.value.limit)
    pagination.value.hasNext = pagination.value.page < pagination.value.totalPages
    pagination.value.hasPrev = pagination.value.page > 1

    const start = (pagination.value.page - 1) * pagination.value.limit
    const end = start + pagination.value.limit
    return result.slice(start, end)
  })

  const loadAuditLogs = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      auditLogs.value = generateMockAuditLogs()
    } catch (err) {
      error.value = 'Failed to load audit logs'
    } finally {
      loading.value = false
    }
  }

  const loadAuditStats = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const todayLogs = auditLogs.value.filter(log => 
        new Date(log.timestamp) >= today
      ).length
      
      const warningLogs = auditLogs.value.filter(log => 
        log.level === 'WARNING'
      ).length
      
      const errorLogs = auditLogs.value.filter(log => 
        log.level === 'ERROR' || log.level === 'CRITICAL'
      ).length

      stats.value = {
        totalLogs: auditLogs.value.length,
        todayLogs,
        warningLogs,
        errorLogs,
      }
    } catch (err) {
      console.error('Error loading audit stats:', err)
    }
  }

  const exportLogs = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real implementation, this would generate and download a CSV/Excel file
      const csvContent = [
        ['Timestamp', 'Level', 'User', 'Module', 'Action', 'Description', 'IP Address'].join(','),
        ...auditLogs.value.map(log => [
          new Date(log.timestamp).toISOString(),
          log.level,
          log.userName || 'System',
          log.module,
          log.action,
          `"${log.description}"`,
          log.ipAddress
        ].join(','))
      ].join('\n')
      
      const blob = new Blob([csvContent], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      
    } catch (err) {
      error.value = 'Failed to export logs'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: AuditLogFilters) => {
    filters.value = newFilters
    pagination.value.page = 1
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  const nextPage = () => {
    if (pagination.value.hasNext) pagination.value.page++
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) pagination.value.page--
  }

  return {
    auditLogs: filteredLogs,
    loading,
    error,
    pagination,
    stats,
    loadAuditLogs,
    loadAuditStats,
    exportLogs,
    setFilters,
    clearFilters,
    nextPage,
    previousPage,
  }
})