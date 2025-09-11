import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, UserFormData, UserFilters, UserStats } from '../types'

// Mock data generator
const generateMockUsers = (): User[] => {
  return [
    {
      id: '1',
      name: 'John Admin',
      username: 'john.admin',
      email: 'john.admin@company.com',
      phone: '+1 (555) 123-4567',
      role: 'ADMIN',
      department: 'IT',
      status: 'ACTIVE',
      permissions: ['users.view', 'users.create', 'users.edit', 'users.delete'],
      twoFactorEnabled: true,
      emailNotifications: true,
      lastLogin: new Date(Date.now() - 1000 * 60 * 30),
      passwordChangedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      failedLoginAttempts: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: '2',
      name: 'Jane Manager',
      username: 'jane.manager',
      email: 'jane.manager@company.com',
      phone: '+1 (555) 234-5678',
      role: 'MANAGER',
      department: 'SALES',
      status: 'ACTIVE',
      managerId: '1',
      managerName: 'John Admin',
      permissions: ['users.view', 'reports.view', 'reports.export'],
      twoFactorEnabled: false,
      emailNotifications: true,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 2),
      passwordChangedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60),
      failedLoginAttempts: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 180),
      updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    },
    {
      id: '3',
      name: 'Bob User',
      username: 'bob.user',
      email: 'bob.user@company.com',
      role: 'USER',
      department: 'MARKETING',
      status: 'ACTIVE',
      managerId: '2',
      managerName: 'Jane Manager',
      permissions: ['reports.view'],
      twoFactorEnabled: false,
      emailNotifications: true,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24),
      passwordChangedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
      failedLoginAttempts: 1,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
    },
    {
      id: '4',
      name: 'Alice Viewer',
      username: 'alice.viewer',
      email: 'alice.viewer@company.com',
      role: 'VIEWER',
      department: 'FINANCE',
      status: 'PENDING',
      permissions: [],
      twoFactorEnabled: false,
      emailNotifications: false,
      lastLogin: null,
      passwordChangedAt: null,
      failedLoginAttempts: 0,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    },
    {
      id: '5',
      name: 'Charlie Support',
      username: 'charlie.support',
      email: 'charlie.support@company.com',
      phone: '+1 (555) 345-6789',
      role: 'SUPPORT',
      department: 'SUPPORT',
      status: 'SUSPENDED',
      managerId: '1',
      managerName: 'John Admin',
      permissions: ['users.view', 'audit.view'],
      twoFactorEnabled: true,
      emailNotifications: true,
      lastLogin: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      passwordChangedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45),
      failedLoginAttempts: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 270),
    },
  ]
}

export const useUserStore = defineStore('administration-users', () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<UserFilters>({})
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const stats = ref<UserStats | null>(null)

  // Computed
  const filteredUsers = computed(() => {
    let result = [...users.value]

    // Apply search filter
    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.username.toLowerCase().includes(search)
      )
    }

    // Apply status filter
    if (filters.value.status) {
      result = result.filter(user => user.status === filters.value.status)
    }

    // Apply role filter
    if (filters.value.role) {
      result = result.filter(user => user.role === filters.value.role)
    }

    // Apply department filter
    if (filters.value.department) {
      result = result.filter(user => user.department === filters.value.department)
    }

    // Apply manager filter
    if (filters.value.managerId) {
      result = result.filter(user => user.managerId === filters.value.managerId)
    }

    // Update pagination
    pagination.value.total = result.length
    pagination.value.totalPages = Math.ceil(result.length / pagination.value.limit)
    pagination.value.hasNext = pagination.value.page < pagination.value.totalPages
    pagination.value.hasPrev = pagination.value.page > 1

    // Apply pagination
    const start = (pagination.value.page - 1) * pagination.value.limit
    const end = start + pagination.value.limit

    return result.slice(start, end)
  })

  // Actions
  const loadUsers = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      users.value = generateMockUsers()
      pagination.value.total = users.value.length
      pagination.value.totalPages = Math.ceil(users.value.length / pagination.value.limit)
      pagination.value.hasNext = pagination.value.page < pagination.value.totalPages
      pagination.value.hasPrev = pagination.value.page > 1
    } catch (err) {
      error.value = 'Failed to load users'
      console.error('Error loading users:', err)
    } finally {
      loading.value = false
    }
  }

  const loadUserStats = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const activeUsers = users.value.filter(u => u.status === 'ACTIVE').length
      const pendingUsers = users.value.filter(u => u.status === 'PENDING').length
      
      stats.value = {
        totalUsers: users.value.length,
        activeUsers,
        pendingUsers,
        totalRoles: 5, // Fixed number of roles in our system
      }
    } catch (err) {
      console.error('Error loading user stats:', err)
    }
  }

  const createUser = async (data: UserFormData) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const newUser: User = {
        id: String(Date.now()),
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        role: data.role,
        department: data.department,
        status: data.status,
        managerId: data.managerId,
        permissions: data.permissions,
        twoFactorEnabled: data.twoFactorEnabled,
        emailNotifications: data.emailNotifications,
        lastLogin: null,
        passwordChangedAt: new Date(),
        failedLoginAttempts: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      users.value.unshift(newUser)
      await loadUserStats()
    } catch (err) {
      error.value = 'Failed to create user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (id: string, data: UserFormData) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index] = {
          ...users.value[index],
          ...data,
          updatedAt: new Date(),
        }
      }
      await loadUserStats()
    } catch (err) {
      error.value = 'Failed to update user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateUserStatus = async (id: string, status: string) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300))
      
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index].status = status as User['status']
        users.value[index].updatedAt = new Date()
      }
      await loadUserStats()
    } catch (err) {
      error.value = 'Failed to update user status'
      throw err
    } finally {
      loading.value = false
    }
  }

  const resetUserPassword = async (id: string, sendEmail: boolean) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value[index].passwordChangedAt = new Date()
        users.value[index].failedLoginAttempts = 0
        users.value[index].updatedAt = new Date()
      }
      
      // In a real app, this would send an email if sendEmail is true
      console.log(`Password reset for user ${id}, email sent: ${sendEmail}`)
    } catch (err) {
      error.value = 'Failed to reset password'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      const index = users.value.findIndex(u => u.id === id)
      if (index !== -1) {
        users.value.splice(index, 1)
      }
      await loadUserStats()
    } catch (err) {
      error.value = 'Failed to delete user'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: UserFilters) => {
    filters.value = newFilters
    pagination.value.page = 1 // Reset to first page when filtering
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page++
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page--
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= pagination.value.totalPages) {
      pagination.value.page = page
    }
  }

  return {
    // State
    users: filteredUsers,
    loading,
    error,
    filters,
    pagination,
    stats,

    // Actions
    loadUsers,
    loadUserStats,
    createUser,
    updateUser,
    updateUserStatus,
    resetUserPassword,
    deleteUser,
    setFilters,
    clearFilters,
    nextPage,
    previousPage,
    goToPage,
  }
})