export interface Role {
  id: string
  name: string
  description: string
  type: 'SYSTEM' | 'CUSTOM'
  permissions: string[]
  userCount: number
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: Date | string
  updatedAt?: Date | string
}

export interface RoleFormData {
  name: string
  description: string
  permissions: string[]
  status: 'ACTIVE' | 'INACTIVE'
}

export interface RoleFilters {
  search?: string
  type?: 'SYSTEM' | 'CUSTOM'
  status?: 'ACTIVE' | 'INACTIVE'
}

export interface RoleStats {
  totalRoles: number
  activeRoles: number
  customRoles: number
  totalUsers: number
}