export interface AuditLog {
  id: string
  timestamp: Date | string
  level: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
  userId?: string
  userName?: string
  userEmail?: string
  module: string
  action: string
  description: string
  ipAddress: string
  userAgent?: string
  metadata?: any
}

export interface AuditLogFilters {
  search?: string
  level?: 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL'
  module?: string
  dateFrom?: string
  dateTo?: string
  userId?: string
}

export interface AuditLogStats {
  totalLogs: number
  todayLogs: number
  warningLogs: number
  errorLogs: number
}