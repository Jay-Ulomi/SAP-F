import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Role, RoleFormData, RoleFilters, RoleStats } from '../types'

const generateMockRoles = (): Role[] => [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    type: 'SYSTEM',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'roles.view', 'roles.manage', 'settings.view', 'settings.manage', 'audit.view', 'reports.view', 'reports.export', 'api.access'],
    userCount: 3,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365),
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Management level access with team oversight',
    type: 'SYSTEM',
    permissions: ['users.view', 'users.edit', 'reports.view', 'reports.export'],
    userCount: 8,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 300),
  },
  {
    id: '3',
    name: 'User',
    description: 'Standard user access',
    type: 'SYSTEM',
    permissions: ['reports.view'],
    userCount: 25,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 200),
  },
  {
    id: '4',
    name: 'Sales Team Lead',
    description: 'Custom role for sales team management',
    type: 'CUSTOM',
    permissions: ['users.view', 'reports.view', 'reports.export', 'api.access'],
    userCount: 5,
    status: 'ACTIVE',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90),
  },
]

export const useRoleStore = defineStore('administration-roles', () => {
  const roles = ref<Role[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<RoleFilters>({})
  const pagination = ref({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const stats = ref<RoleStats | null>(null)

  const filteredRoles = computed(() => {
    let result = [...roles.value]

    if (filters.value.search) {
      const search = filters.value.search.toLowerCase()
      result = result.filter(role =>
        role.name.toLowerCase().includes(search) ||
        role.description.toLowerCase().includes(search)
      )
    }

    if (filters.value.type) {
      result = result.filter(role => role.type === filters.value.type)
    }

    if (filters.value.status) {
      result = result.filter(role => role.status === filters.value.status)
    }

    pagination.value.total = result.length
    pagination.value.totalPages = Math.ceil(result.length / pagination.value.limit)
    pagination.value.hasNext = pagination.value.page < pagination.value.totalPages
    pagination.value.hasPrev = pagination.value.page > 1

    const start = (pagination.value.page - 1) * pagination.value.limit
    const end = start + pagination.value.limit
    return result.slice(start, end)
  })

  const loadRoles = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      roles.value = generateMockRoles()
    } catch (err) {
      error.value = 'Failed to load roles'
    } finally {
      loading.value = false
    }
  }

  const loadRoleStats = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
      const activeRoles = roles.value.filter(r => r.status === 'ACTIVE').length
      const customRoles = roles.value.filter(r => r.type === 'CUSTOM').length
      const totalUsers = roles.value.reduce((sum, role) => sum + role.userCount, 0)

      stats.value = {
        totalRoles: roles.value.length,
        activeRoles,
        customRoles,
        totalUsers,
      }
    } catch (err) {
      console.error('Error loading role stats:', err)
    }
  }

  const createRole = async (data: RoleFormData) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newRole: Role = {
        id: String(Date.now()),
        name: data.name,
        description: data.description,
        type: 'CUSTOM',
        permissions: data.permissions,
        userCount: 0,
        status: data.status,
        createdAt: new Date(),
      }
      roles.value.unshift(newRole)
      await loadRoleStats()
    } catch (err) {
      error.value = 'Failed to create role'
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateRole = async (id: string, data: RoleFormData) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = roles.value.findIndex(r => r.id === id)
      if (index !== -1) {
        roles.value[index] = {
          ...roles.value[index],
          ...data,
          updatedAt: new Date(),
        }
      }
      await loadRoleStats()
    } catch (err) {
      error.value = 'Failed to update role'
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteRole = async (id: string) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = roles.value.findIndex(r => r.id === id)
      if (index !== -1) {
        roles.value.splice(index, 1)
      }
      await loadRoleStats()
    } catch (err) {
      error.value = 'Failed to delete role'
      throw err
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: RoleFilters) => {
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
    roles: filteredRoles,
    loading,
    error,
    pagination,
    stats,
    loadRoles,
    loadRoleStats,
    createRole,
    updateRole,
    deleteRole,
    setFilters,
    clearFilters,
    nextPage,
    previousPage,
  }
})