import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Employee, EmployeeFormData } from '../types'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<Employee[]>([])
  const loading = ref(false)

  async function fetchEmployees() {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      employees.value = [
        {
          id: '1',
          employeeId: 'EMP001',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@company.com',
          phoneNumber: '+1-234-567-8900',
          department: 'IT',
          position: 'Software Developer',
          hireDate: '2022-01-15',
          status: 'active'
        },
        {
          id: '2',
          employeeId: 'EMP002',
          firstName: 'Jane',
          lastName: 'Smith',
          email: 'jane.smith@company.com',
          phoneNumber: '+1-234-567-8901',
          department: 'HR',
          position: 'HR Manager',
          hireDate: '2021-03-10',
          status: 'active'
        }
      ]
    } catch (error) {
      console.error('Error fetching employees:', error)
    } finally {
      loading.value = false
    }
  }

  async function createEmployee(formData: EmployeeFormData) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const newEmployee: Employee = {
        id: Date.now().toString(),
        ...formData
      }
      employees.value.push(newEmployee)
      return newEmployee
    } catch (error) {
      console.error('Error creating employee:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateEmployee(id: string, formData: EmployeeFormData) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = employees.value.findIndex(emp => emp.id === id)
      if (index !== -1) {
        employees.value[index] = { ...employees.value[index], ...formData }
        return employees.value[index]
      }
      throw new Error('Employee not found')
    } catch (error) {
      console.error('Error updating employee:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteEmployee(id: string) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = employees.value.findIndex(emp => emp.id === id)
      if (index !== -1) {
        employees.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Error deleting employee:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    employees,
    loading,
    fetchEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee
  }
})