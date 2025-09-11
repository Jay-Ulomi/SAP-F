import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { activityApi } from '../api'
import type {
  Activity,
  ActivityFormData,
  ActivityFilters,
  ActivityStats,
  ActivityPagination
} from '../types'
import { ActivityStatus, ActivityType, ActivityCategory, ActivityPriority, ActivityOutcome } from '../types'

export const useActivityStore = defineStore('activity', () => {
  // State
  const activities = ref<Activity[]>([])
  const currentActivity = ref<Activity | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ActivityStats | null>(null)
  const pagination = ref<ActivityPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<ActivityFilters>({})

  // Computed properties
  const activitiesByStatus = computed(() => {
    const grouped: Record<ActivityStatus, Activity[]> = {
      [ActivityStatus.PLANNED]: [],
      [ActivityStatus.IN_PROGRESS]: [],
      [ActivityStatus.COMPLETED]: [],
      [ActivityStatus.CANCELLED]: [],
      [ActivityStatus.ON_HOLD]: [],
      [ActivityStatus.OVERDUE]: []
    }
    
    activities.value.forEach(activity => {
      grouped[activity.status].push(activity)
    })
    
    return grouped
  })

  const activitiesByType = computed(() => {
    const grouped: Record<ActivityType, Activity[]> = {
      [ActivityType.CALL]: [],
      [ActivityType.EMAIL]: [],
      [ActivityType.MEETING]: [],
      [ActivityType.VISIT]: [],
      [ActivityType.QUOTE]: [],
      [ActivityType.ORDER]: [],
      [ActivityType.COMPLAINT]: [],
      [ActivityType.SUPPORT]: [],
      [ActivityType.FOLLOW_UP]: [],
      [ActivityType.PRESENTATION]: [],
      [ActivityType.DEMO]: [],
      [ActivityType.TRAINING]: []
    }
    
    activities.value.forEach(activity => {
      grouped[activity.type].push(activity)
    })
    
    return grouped
  })

  const activitiesByCategory = computed(() => {
    const grouped: Record<ActivityCategory, Activity[]> = {
      [ActivityCategory.SALES]: [],
      [ActivityCategory.MARKETING]: [],
      [ActivityCategory.SUPPORT]: [],
      [ActivityCategory.ADMINISTRATIVE]: [],
      [ActivityCategory.TRAINING]: [],
      [ActivityCategory.OTHER]: []
    }
    
    activities.value.forEach(activity => {
      grouped[activity.category].push(activity)
    })
    
    return grouped
  })

  const plannedActivities = computed(() => 
    activities.value.filter(activity => activity.status === ActivityStatus.PLANNED)
  )

  const inProgressActivities = computed(() => 
    activities.value.filter(activity => activity.status === ActivityStatus.IN_PROGRESS)
  )

  const completedActivities = computed(() => 
    activities.value.filter(activity => activity.status === ActivityStatus.COMPLETED)
  )

  const overdueActivities = computed(() => 
    activities.value.filter(activity => 
      activity.status !== ActivityStatus.COMPLETED && 
      activity.status !== ActivityStatus.CANCELLED &&
      activity.dueDate < new Date()
    )
  )

  const highPriorityActivities = computed(() => 
    activities.value.filter(activity => 
      activity.priority === ActivityPriority.HIGH || activity.priority === ActivityPriority.CRITICAL
    )
  )

  const activitiesThisWeek = computed(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    return activities.value.filter(activity => activity.startDate >= oneWeekAgo)
  })

  const activitiesThisMonth = computed(() => {
    const now = new Date()
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
    return activities.value.filter(activity => activity.startDate >= oneMonthAgo)
  })

  // Actions
  const loadActivities = async () => {
    try {
      loading.value = true
      error.value = null
      
      const result = await activityApi.getActivities(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )
      
      activities.value = result.activities
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load activities'
      console.error('Error loading activities:', err)
    } finally {
      loading.value = false
    }
  }

  const createActivity = async (data: ActivityFormData) => {
    try {
      loading.value = true
      error.value = null
      
      const newActivity = await activityApi.createActivity(data)
      activities.value.unshift(newActivity)
      
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return newActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create activity'
      console.error('Error creating activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateActivity = async (id: string, data: Partial<ActivityFormData>) => {
    try {
      loading.value = true
      error.value = null
      
      const updatedActivity = await activityApi.updateActivity(id, data)
      
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value[index] = updatedActivity
      }
      
      if (currentActivity.value?.id === id) {
        currentActivity.value = updatedActivity
      }
      
      return updatedActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update activity'
      console.error('Error updating activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteActivity = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      await activityApi.deleteActivity(id)
      
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value.splice(index, 1)
      }
      
      if (currentActivity.value?.id === id) {
        currentActivity.value = null
      }
      
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      
      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete activity'
      console.error('Error deleting activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateActivity = async (
    id: string,
    newActivityCode: string,
    newTitle: string,
    newStartDate: Date
  ) => {
    try {
      loading.value = true
      error.value = null
      
      const duplicatedActivity = await activityApi.duplicateActivity(id, newActivityCode, newTitle, newStartDate)
      activities.value.unshift(duplicatedActivity)
      
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return duplicatedActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate activity'
      console.error('Error duplicating activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadActivityStats = async () => {
    try {
      loading.value = true
      error.value = null
      
      const activityStats = await activityApi.getActivityStats()
      stats.value = activityStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load activity statistics'
      console.error('Error loading activity statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Business logic actions
  const startActivity = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const startedActivity = await activityApi.startActivity(id)
      
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value[index] = startedActivity
      }
      
      if (currentActivity.value?.id === id) {
        currentActivity.value = startedActivity
      }
      
      return startedActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to start activity'
      console.error('Error starting activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const completeActivity = async (id: string, outcome: ActivityOutcome) => {
    try {
      loading.value = true
      error.value = null
      
      const completedActivity = await activityApi.completeActivity(id, outcome)
      
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value[index] = completedActivity
      }
      
      if (currentActivity.value?.id === id) {
        currentActivity.value = completedActivity
      }
      
      return completedActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to complete activity'
      console.error('Error completing activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const cancelActivity = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const cancelledActivity = await activityApi.cancelActivity(id)
      
      const index = activities.value.findIndex(a => a.id === id)
      if (index !== -1) {
        activities.value[index] = cancelledActivity
      }
      
      if (currentActivity.value?.id === id) {
        currentActivity.value = cancelledActivity
      }
      
      return cancelledActivity
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to cancel activity'
      console.error('Error cancelling activity:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadActivities()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadActivities()
    }
  }

  // Filter actions
  const setFilters = (newFilters: ActivityFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadActivities()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadActivities()
  }

  return {
    // State
    activities,
    currentActivity,
    loading,
    error,
    stats,
    pagination,
    filters,
    
    // Computed
    activitiesByStatus,
    activitiesByType,
    activitiesByCategory,
    plannedActivities,
    inProgressActivities,
    completedActivities,
    overdueActivities,
    highPriorityActivities,
    activitiesThisWeek,
    activitiesThisMonth,
    
    // Actions
    loadActivities,
    createActivity,
    updateActivity,
    deleteActivity,
    duplicateActivity,
    loadActivityStats,
    startActivity,
    completeActivity,
    cancelActivity,
    
    // Pagination
    nextPage,
    previousPage,
    
    // Filters
    setFilters,
    clearFilters
  }
})
