export interface User {
  id: string
  name: string
  username: string
  email: string
  phone?: string
  avatar?: string
  role: UserRole
  department: Department
  status: UserStatus
  managerId?: string
  managerName?: string
  permissions?: string[]
  twoFactorEnabled?: boolean
  emailNotifications?: boolean
  lastLogin?: Date | string | null
  passwordChangedAt?: Date | string | null
  failedLoginAttempts?: number
  createdAt: Date | string
  updatedAt?: Date | string
}

export interface UserFormData {
  name: string
  username: string
  email: string
  phone?: string
  password?: string
  confirmPassword?: string
  role: UserRole
  department: Department
  status: UserStatus
  managerId?: string
  permissions?: string[]
  twoFactorEnabled?: boolean
  emailNotifications?: boolean
  forcePasswordChange?: boolean
}

export interface UserFilters {
  search?: string
  status?: UserStatus
  role?: UserRole
  department?: Department
  managerId?: string
}

export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED' | 'LOCKED'
export type UserRole = 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER' | 'SUPPORT'
export type Department = 'IT' | 'SALES' | 'MARKETING' | 'FINANCE' | 'HR' | 'OPERATIONS' | 'SUPPORT'

export interface UserStats {
  totalUsers: number
  activeUsers: number
  pendingUsers: number
  totalRoles: number
}