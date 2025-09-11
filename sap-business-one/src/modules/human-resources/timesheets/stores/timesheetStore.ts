import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimesheetEntry, TimesheetFormData } from '../types'

export const useTimesheetStore = defineStore('timesheet', () => {
  const entries = ref<TimesheetEntry[]>([])
  const loading = ref(false)

  async function fetchEntries() {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      entries.value = [
        {
          id: '1',
          employeeId: 'EMP001',
          employeeName: 'John Doe',
          date: '2024-01-15',
          startTime: '09:00',
          endTime: '17:00',
          breakDuration: 60,
          regularHours: 8,
          overtimeHours: 0,
          project: 'Project Alpha',
          task: 'Development',
          workType: 'regular',
          location: 'office',
          description: 'Working on feature development',
          billable: true,
          billingRate: 75,
          status: 'approved'
        },
        {
          id: '2',
          employeeId: 'EMP002',
          employeeName: 'Jane Smith',
          date: '2024-01-15',
          startTime: '08:30',
          endTime: '17:30',
          breakDuration: 60,
          regularHours: 8,
          overtimeHours: 1,
          project: 'Project Beta',
          task: 'Planning',
          workType: 'regular',
          location: 'office',
          description: 'Sprint planning and requirements gathering',
          billable: false,
          status: 'submitted'
        }
      ]
    } catch (error) {
      console.error('Error fetching timesheet entries:', error)
    } finally {
      loading.value = false
    }
  }

  async function createEntry(formData: TimesheetFormData) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const newEntry: TimesheetEntry = {
        id: Date.now().toString(),
        ...formData
      }
      entries.value.push(newEntry)
      return newEntry
    } catch (error) {
      console.error('Error creating timesheet entry:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateEntry(id: string, formData: TimesheetFormData) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = entries.value.findIndex(entry => entry.id === id)
      if (index !== -1) {
        entries.value[index] = { ...entries.value[index], ...formData }
        return entries.value[index]
      }
      throw new Error('Timesheet entry not found')
    } catch (error) {
      console.error('Error updating timesheet entry:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteEntry(id: string) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = entries.value.findIndex(entry => entry.id === id)
      if (index !== -1) {
        entries.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Error deleting timesheet entry:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function approveEntry(id: string) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = entries.value.findIndex(entry => entry.id === id)
      if (index !== -1) {
        entries.value[index].status = 'approved'
        entries.value[index].approvedAt = new Date().toISOString()
        entries.value[index].approvedBy = 'Manager'
      }
    } catch (error) {
      console.error('Error approving timesheet entry:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function rejectEntry(id: string, reason?: string) {
    loading.value = true
    try {
      // Mock API call - replace with actual API
      const index = entries.value.findIndex(entry => entry.id === id)
      if (index !== -1) {
        entries.value[index].status = 'rejected'
        entries.value[index].rejectionReason = reason || 'Rejected by manager'
      }
    } catch (error) {
      console.error('Error rejecting timesheet entry:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    entries,
    loading,
    fetchEntries,
    createEntry,
    updateEntry,
    deleteEntry,
    approveEntry,
    rejectEntry
  }
})