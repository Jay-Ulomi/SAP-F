import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { journalEntriesApi } from '../api/journalEntriesApi'
import type {
  JournalEntry,
  JournalEntryFormData,
  JournalEntryFilters,
  JournalEntryValidationResult,
  AccountBalance,
} from '../types'
import { JournalEntryStatus, JournalEntryType } from '../types'

export const useJournalEntriesStore = defineStore('journalEntries', () => {
  // State
  const entries = ref<JournalEntry[]>([])
  const currentEntry = ref<JournalEntry | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<JournalEntryFilters>({})
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })
  const stats = ref({
    totalEntries: 0,
    totalDebit: 0,
    totalCredit: 0,
    postedEntries: 0,
    draftEntries: 0,
    pendingApproval: 0,
  })

  // Computed
  const activeEntries = computed(() =>
    entries.value.filter((entry) => entry.status !== JournalEntryStatus.VOIDED),
  )
  const draftEntries = computed(() =>
    entries.value.filter((entry) => entry.status === JournalEntryStatus.DRAFT),
  )
  const postedEntries = computed(() =>
    entries.value.filter((entry) => entry.status === JournalEntryStatus.POSTED),
  )
  const pendingApproval = computed(() =>
    entries.value.filter((entry) => entry.status === JournalEntryStatus.PENDING_APPROVAL),
  )

  const entryTypes = computed(() => Object.values(JournalEntryType))
  const entryStatuses = computed(() => Object.values(JournalEntryStatus))

  const entriesByType = computed(() => {
    const grouped = entries.value.reduce(
      (acc, entry) => {
        if (!acc[entry.type]) {
          acc[entry.type] = []
        }
        acc[entry.type].push(entry)
        return acc
      },
      {} as Record<JournalEntryType, JournalEntry[]>,
    )

    return grouped
  })

  const entriesByStatus = computed(() => {
    const grouped = entries.value.reduce(
      (acc, entry) => {
        if (!acc[entry.status]) {
          acc[entry.status] = []
        }
        acc[entry.status].push(entry)
        return acc
      },
      {} as Record<JournalEntryStatus, JournalEntry[]>,
    )

    return grouped
  })

  // Actions
  const fetchEntries = async (
    page?: number,
    pageSize?: number,
    newFilters?: JournalEntryFilters,
  ) => {
    try {
      loading.value = true
      error.value = null

      if (page) pagination.value.page = page
      if (pageSize) pagination.value.pageSize = pageSize
      if (newFilters) filters.value = { ...filters.value, ...newFilters }

      const response = await journalEntriesApi.getJournalEntries(
        pagination.value.page,
        pagination.value.pageSize,
        filters.value,
      )

      entries.value = response.data
      pagination.value = {
        page: response.page,
        pageSize: response.pageSize,
        total: response.total,
        totalPages: response.totalPages,
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch journal entries'
      console.error('Error fetching journal entries:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchEntry = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const entry = await journalEntriesApi.getJournalEntry(id)
      currentEntry.value = entry
      return entry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch journal entry'
      console.error('Error fetching journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const createEntry = async (data: JournalEntryFormData) => {
    try {
      loading.value = true
      error.value = null

      const newEntry = await journalEntriesApi.createJournalEntry(data)
      entries.value.unshift(newEntry)
      pagination.value.total += 1

      return newEntry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create journal entry'
      console.error('Error creating journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateEntry = async (id: string, data: Partial<JournalEntryFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedEntry = await journalEntriesApi.updateJournalEntry(id, data)

      // Update in entries list
      const index = entries.value.findIndex((entry) => entry.id === id)
      if (index !== -1) {
        entries.value[index] = updatedEntry
      }

      // Update current entry if it's the one being edited
      if (currentEntry.value?.id === id) {
        currentEntry.value = updatedEntry
      }

      return updatedEntry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update journal entry'
      console.error('Error updating journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteEntry = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await journalEntriesApi.deleteJournalEntry(id)

      // Remove from entries list
      const index = entries.value.findIndex((entry) => entry.id === id)
      if (index !== -1) {
        entries.value.splice(index, 1)
        pagination.value.total -= 1
      }

      // Clear current entry if it's the one being deleted
      if (currentEntry.value?.id === id) {
        currentEntry.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete journal entry'
      console.error('Error deleting journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const postEntry = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const postedEntry = await journalEntriesApi.postJournalEntry(id)

      // Update in entries list
      const index = entries.value.findIndex((entry) => entry.id === id)
      if (index !== -1) {
        entries.value[index] = postedEntry
      }

      // Update current entry if it's the one being viewed
      if (currentEntry.value?.id === id) {
        currentEntry.value = postedEntry
      }

      return postedEntry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to post journal entry'
      console.error('Error posting journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const voidEntry = async (id: string, reason: string) => {
    try {
      loading.value = true
      error.value = null

      const voidedEntry = await journalEntriesApi.voidJournalEntry(id, reason)

      // Update in entries list
      const index = entries.value.findIndex((entry) => entry.id === id)
      if (index !== -1) {
        entries.value[index] = voidedEntry
      }

      // Update current entry if it's the one being viewed
      if (currentEntry.value?.id === id) {
        currentEntry.value = voidedEntry
      }

      return voidedEntry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to void journal entry'
      console.error('Error voiding journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const validateEntry = async (
    data: JournalEntryFormData,
  ): Promise<JournalEntryValidationResult> => {
    try {
      const result = await journalEntriesApi.validateJournalEntry(data)
      return result
    } catch (err) {
      console.error('Error validating journal entry:', err)
      return {
        isValid: false,
        errors: ['Validation failed'],
        warnings: [],
      }
    }
  }

  const fetchStats = async (newFilters?: JournalEntryFilters) => {
    try {
      const statsData = await journalEntriesApi.getJournalEntryStats(newFilters || filters.value)
      stats.value = statsData
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

  const copyEntry = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const copiedEntry = await journalEntriesApi.copyJournalEntry(id)
      entries.value.unshift(copiedEntry)
      pagination.value.total += 1

      return copiedEntry
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to copy journal entry'
      console.error('Error copying journal entry:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const resetCurrentEntry = () => {
    currentEntry.value = null
  }

  const resetFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  return {
    // State
    entries,
    currentEntry,
    loading,
    error,
    filters,
    pagination,
    stats,

    // Computed
    activeEntries,
    draftEntries,
    postedEntries,
    pendingApproval,
    entryTypes,
    entryStatuses,
    entriesByType,
    entriesByStatus,

    // Actions
    fetchEntries,
    fetchEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    postEntry,
    voidEntry,
    validateEntry,
    fetchStats,
    copyEntry,
    clearError,
    resetCurrentEntry,
    resetFilters,
  }
})
