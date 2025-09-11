import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { 
  Position, 
  PositionFormData, 
  PositionSearchParams,
  PositionStats,
  PositionStatus,
  PositionLevel,
  EmploymentType,
  Department,
  Employee
} from '../types'
import { positionAPI } from '../api'

export const usePositionStore = defineStore('position', () => {
  const positions = ref<Position[]>([])
  const departments = ref<Department[]>([])
  const employees = ref<Employee[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PositionStats | null>(null)
  const currentPosition = ref<Position | null>(null)

  // Actions
  async function fetchPositions(params?: PositionSearchParams) {
    loading.value = true
    error.value = null
    try {
      const response = await positionAPI.getPositions(params)
      positions.value = response.items
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch positions'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchPosition(id: string): Promise<Position> {
    loading.value = true
    error.value = null
    try {
      const position = await positionAPI.getPosition(id)
      currentPosition.value = position
      
      // Update the position in the list if it exists
      const index = positions.value.findIndex(p => p.id === id)
      if (index !== -1) {
        positions.value[index] = position
      }
      
      return position
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch position'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchStats(): Promise<PositionStats> {
    try {
      const positionStats = await positionAPI.getPositionStats()
      stats.value = positionStats
      return positionStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch statistics'
      throw err
    }
  }

  async function fetchDepartments(): Promise<Department[]> {
    try {
      const depts = await positionAPI.getDepartments()
      departments.value = depts
      return depts
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch departments'
      throw err
    }
  }

  async function fetchEmployees(params?: { search?: string; limit?: number }): Promise<Employee[]> {
    try {
      const emps = await positionAPI.getEmployees(params)
      employees.value = emps
      return emps
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch employees'
      throw err
    }
  }

  async function createPosition(data: PositionFormData): Promise<Position> {
    loading.value = true
    error.value = null
    try {
      const newPosition = await positionAPI.createPosition(data)
      positions.value.unshift(newPosition)
      return newPosition
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create position'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updatePosition(id: string, data: Partial<PositionFormData>): Promise<Position> {
    loading.value = true
    error.value = null
    try {
      const updatedPosition = await positionAPI.updatePosition(id, data)
      
      // Update in the list
      const index = positions.value.findIndex(p => p.id === id)
      if (index !== -1) {
        positions.value[index] = updatedPosition
      }
      
      // Update current position if it's the same
      if (currentPosition.value?.id === id) {
        currentPosition.value = updatedPosition
      }
      
      return updatedPosition
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update position'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deletePosition(id: string): Promise<void> {
    loading.value = true
    error.value = null
    try {
      await positionAPI.deletePosition(id)
      
      // Remove from the list
      const index = positions.value.findIndex(p => p.id === id)
      if (index !== -1) {
        positions.value.splice(index, 1)
      }
      
      // Clear current position if it's the deleted one
      if (currentPosition.value?.id === id) {
        currentPosition.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete position'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updatePositionStatus(id: string, status: 'active' | 'inactive'): Promise<Position> {
    loading.value = true
    error.value = null
    try {
      const updatedPosition = await positionAPI.updatePositionStatus(id, status)
      
      // Update in the list
      const index = positions.value.findIndex(p => p.id === id)
      if (index !== -1) {
        positions.value[index] = updatedPosition
      }
      
      // Update current position if it's the same
      if (currentPosition.value?.id === id) {
        currentPosition.value = updatedPosition
      }
      
      return updatedPosition
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update position status'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function clonePosition(id: string, data: { title: string; code: string }): Promise<Position> {
    loading.value = true
    error.value = null
    try {
      const clonedPosition = await positionAPI.clonePosition(id, data)
      positions.value.unshift(clonedPosition)
      return clonedPosition
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to clone position'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Getters
  function getPositionById(id: string): Position | undefined {
    return positions.value.find(p => p.id === id)
  }

  function getPositionsByStatus(status: PositionStatus): Position[] {
    return positions.value.filter(p => p.status === status)
  }

  function getPositionsByDepartment(departmentId: string): Position[] {
    return positions.value.filter(p => p.departmentId === departmentId)
  }

  function getPositionsByLevel(level: PositionLevel): Position[] {
    return positions.value.filter(p => p.level === level)
  }

  function getPositionsByEmploymentType(employmentType: EmploymentType): Position[] {
    return positions.value.filter(p => p.employmentType === employmentType)
  }

  function getActivePositions(): Position[] {
    return positions.value.filter(p => p.status === 'active')
  }

  function getOpenPositions(): Position[] {
    return positions.value.filter(p => p.openPositions > 0)
  }

  function getRemoteEligiblePositions(): Position[] {
    return positions.value.filter(p => p.isRemoteEligible)
  }

  function getTotalOpenPositions(): number {
    return positions.value.reduce((sum, p) => sum + p.openPositions, 0)
  }

  function getAverageSalary(): number {
    if (positions.value.length === 0) return 0
    const totalSalary = positions.value.reduce((sum, p) => {
      return sum + ((p.salaryRange.min + p.salaryRange.max) / 2)
    }, 0)
    return totalSalary / positions.value.length
  }

  function getPositionsByDateRange(dateFrom: string, dateTo: string): Position[] {
    const fromDate = new Date(dateFrom)
    const toDate = new Date(dateTo)
    
    return positions.value.filter(p => {
      const positionDate = new Date(p.createdAt)
      return positionDate >= fromDate && positionDate <= toDate
    })
  }

  function getDepartmentById(id: string): Department | undefined {
    return departments.value.find(d => d.id === id)
  }

  function getEmployeeById(id: string): Employee | undefined {
    return employees.value.find(e => e.id === id)
  }

  return {
    // State
    positions,
    departments,
    employees,
    loading,
    error,
    stats,
    currentPosition,
    
    // Actions
    fetchPositions,
    fetchPosition,
    fetchStats,
    fetchDepartments,
    fetchEmployees,
    createPosition,
    updatePosition,
    deletePosition,
    updatePositionStatus,
    clonePosition,
    
    // Getters
    getPositionById,
    getPositionsByStatus,
    getPositionsByDepartment,
    getPositionsByLevel,
    getPositionsByEmploymentType,
    getActivePositions,
    getOpenPositions,
    getRemoteEligiblePositions,
    getTotalOpenPositions,
    getAverageSalary,
    getPositionsByDateRange,
    getDepartmentById,
    getEmployeeById,
  }
})