// Timesheet Types

export interface TimesheetEntry {
  id: string
  employeeId: string
  employeeName: string
  date: string
  startTime?: string
  endTime?: string
  breakDuration?: number
  regularHours: number
  overtimeHours?: number
  project?: string
  task?: string
  workType?: string
  location?: string
  description?: string
  billable?: boolean
  billingRate?: number
  status: string
  submittedAt?: string
  approvedAt?: string
  approvedBy?: string
  rejectionReason?: string
  comments?: TimesheetComment[]
  createdAt?: string
  updatedAt?: string
}

export interface TimesheetFormData {
  employeeId: string
  employeeName: string
  date: string
  startTime?: string
  endTime?: string
  breakDuration?: number
  regularHours: number
  overtimeHours?: number
  project?: string
  task?: string
  workType?: string
  location?: string
  description?: string
  billable?: boolean
  billingRate?: number
  status: string
}

export interface TimesheetComment {
  id: string
  author: string
  text: string
  createdAt: string
}