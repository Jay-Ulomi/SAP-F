import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { contactPersonApi } from '../api'
import type {
  ContactPerson,
  ContactPersonFormData,
  ContactPersonFilters,
  ContactPersonStats,
  ContactPersonPagination,
} from '../types'
import { ContactType, ContactStatus, ContactCategory, PreferredContactMethod } from '../types'

export const useContactPersonStore = defineStore('contactPersons', () => {
  // State
  const contacts = ref<ContactPerson[]>([])
  const currentContact = ref<ContactPerson | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ContactPersonStats | null>(null)

  // Pagination
  const pagination = ref<ContactPersonPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  })

  // Filters
  const filters = ref<ContactPersonFilters>({})

  // Computed Properties
  const contactsByType = computed(() => {
    const grouped: Record<ContactType, ContactPerson[]> = {
      [ContactType.PRIMARY]: [],
      [ContactType.BILLING]: [],
      [ContactType.SHIPPING]: [],
      [ContactType.TECHNICAL]: [],
      [ContactType.DECISION_MAKER]: [],
      [ContactType.ACCOUNTS_PAYABLE]: [],
      [ContactType.ACCOUNTS_RECEIVABLE]: [],
      [ContactType.SALES]: [],
      [ContactType.SUPPORT]: [],
      [ContactType.OTHER]: [],
    }

    contacts.value.forEach((contact) => {
      contact.contactType.forEach((type) => {
        if (grouped[type]) {
          grouped[type].push(contact)
        }
      })
    })

    return grouped
  })

  const contactsByStatus = computed(() => {
    const grouped: Record<ContactStatus, ContactPerson[]> = {
      [ContactStatus.ACTIVE]: [],
      [ContactStatus.INACTIVE]: [],
      [ContactStatus.FORMER_EMPLOYEE]: [],
      [ContactStatus.ON_LEAVE]: [],
    }

    contacts.value.forEach((contact) => {
      grouped[contact.status].push(contact)
    })

    return grouped
  })

  const contactsByCategory = computed(() => {
    const grouped: Record<ContactCategory, ContactPerson[]> = {
      [ContactCategory.CUSTOMER]: [],
      [ContactCategory.VENDOR]: [],
      [ContactCategory.PARTNER]: [],
      [ContactCategory.INTERNAL]: [],
      [ContactCategory.PROSPECT]: [],
    }

    contacts.value.forEach((contact) => {
      grouped[contact.category].push(contact)
    })

    return grouped
  })

  const contactsByPreferredMethod = computed(() => {
    const grouped: Record<PreferredContactMethod, ContactPerson[]> = {
      [PreferredContactMethod.EMAIL]: [],
      [PreferredContactMethod.PHONE]: [],
      [PreferredContactMethod.MOBILE]: [],
      [PreferredContactMethod.FAX]: [],
      [PreferredContactMethod.MAIL]: [],
      [PreferredContactMethod.IN_PERSON]: [],
    }

    contacts.value.forEach((contact) => {
      grouped[contact.preferredContactMethod].push(contact)
    })

    return grouped
  })

  const activeContacts = computed(() =>
    contacts.value.filter((contact) => contact.status === ContactStatus.ACTIVE),
  )

  const primaryContacts = computed(() => contacts.value.filter((contact) => contact.isPrimary))

  const contactsWithEmail = computed(() => contacts.value.filter((contact) => contact.email))

  const contactsWithPhone = computed(() => contacts.value.filter((contact) => contact.phone))

  const contactsWithAddress = computed(() =>
    contacts.value.filter((contact) => contact.addressLine1),
  )

  const customerContacts = computed(() =>
    contacts.value.filter((contact) => contact.category === ContactCategory.CUSTOMER),
  )

  const vendorContacts = computed(() =>
    contacts.value.filter((contact) => contact.category === ContactCategory.VENDOR),
  )

  const partnerContacts = computed(() =>
    contacts.value.filter((contact) => contact.category === ContactCategory.PARTNER),
  )

  const internalContacts = computed(() =>
    contacts.value.filter((contact) => contact.category === ContactCategory.INTERNAL),
  )

  const prospectContacts = computed(() =>
    contacts.value.filter((contact) => contact.category === ContactCategory.PROSPECT),
  )

  const sortedContacts = computed(() => {
    return [...contacts.value].sort((a, b) => {
      // Sort by last name, then first name
      const lastNameComparison = a.lastName.localeCompare(b.lastName)
      if (lastNameComparison !== 0) return lastNameComparison
      return a.firstName.localeCompare(b.firstName)
    })
  })

  // Actions
  const loadContacts = async (newFilters?: ContactPersonFilters) => {
    try {
      loading.value = true
      error.value = null

      if (newFilters) {
        filters.value = { ...filters.value, ...newFilters }
      }

      const response = await contactPersonApi.getContacts(filters.value, {
        page: pagination.value.page,
        limit: pagination.value.limit,
      })

      contacts.value = response.data
      pagination.value.total = response.total
      pagination.value.totalPages = Math.ceil(response.total / pagination.value.limit)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contacts'
      console.error('Error loading contacts:', err)
    } finally {
      loading.value = false
    }
  }

  const loadContact = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      const contact = await contactPersonApi.getContact(id)
      currentContact.value = contact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contact'
      console.error('Error loading contact:', err)
    } finally {
      loading.value = false
    }
  }

  const createContact = async (data: ContactPersonFormData) => {
    try {
      loading.value = true
      error.value = null

      const newContact = await contactPersonApi.createContact(data)
      contacts.value.unshift(newContact)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return newContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create contact'
      console.error('Error creating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateContact = async (id: string, data: Partial<ContactPersonFormData>) => {
    try {
      loading.value = true
      error.value = null

      const updatedContact = await contactPersonApi.updateContact(id, data)

      // Update in contacts array
      const index = contacts.value.findIndex((contact) => contact.id === id)
      if (index !== -1) {
        contacts.value[index] = updatedContact
      }

      // Update current contact if it's the one being edited
      if (currentContact.value?.id === id) {
        currentContact.value = updatedContact
      }

      return updatedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update contact'
      console.error('Error updating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const deleteContact = async (id: string) => {
    try {
      loading.value = true
      error.value = null

      await contactPersonApi.deleteContact(id)

      // Remove from contacts array
      const index = contacts.value.findIndex((contact) => contact.id === id)
      if (index !== -1) {
        contacts.value.splice(index, 1)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }

      // Clear current contact if it's the one being deleted
      if (currentContact.value?.id === id) {
        currentContact.value = null
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete contact'
      console.error('Error deleting contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadContactStats = async () => {
    try {
      const contactStats = await contactPersonApi.getContactStats()
      stats.value = contactStats
    } catch (err) {
      console.error('Error loading contact stats:', err)
    }
  }

  const setPrimaryContact = async (contactId: string, companyId: string) => {
    try {
      loading.value = true
      error.value = null

      const updatedContact = await contactPersonApi.setPrimaryContact(contactId, companyId)

      // Update in contacts array
      const index = contacts.value.findIndex((contact) => contact.id === contactId)
      if (index !== -1) {
        contacts.value[index] = updatedContact
      }

      // Update current contact if it's the one being updated
      if (currentContact.value?.id === contactId) {
        currentContact.value = updatedContact
      }

      // Update other contacts to remove primary flag
      contacts.value.forEach((contact) => {
        if (contact.companyId === companyId && contact.id !== contactId && contact.isPrimary) {
          contact.isPrimary = false
        }
      })

      return updatedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to set primary contact'
      console.error('Error setting primary contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateContact = async (
    id: string,
    newFirstName: string,
    newLastName: string,
    newEmail: string,
  ) => {
    try {
      loading.value = true
      error.value = null

      const duplicatedContact = await contactPersonApi.duplicateContact(
        id,
        newFirstName,
        newLastName,
        newEmail,
      )
      contacts.value.unshift(duplicatedContact)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)

      return duplicatedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate contact'
      console.error('Error duplicating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const setPageSize = (limit: number) => {
    pagination.value.limit = limit
    pagination.value.page = 1
    pagination.value.totalPages = Math.ceil(pagination.value.total / limit)
  }

  const nextPage = () => {
    if (pagination.value.page < pagination.value.totalPages) {
      pagination.value.page += 1
    }
  }

  const previousPage = () => {
    if (pagination.value.page > 1) {
      pagination.value.page -= 1
    }
  }

  // Filter actions
  const setFilters = (newFilters: ContactPersonFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
  }

  const resetPagination = () => {
    pagination.value.page = 1
  }

  // Utility actions
  const clearError = () => {
    error.value = null
  }

  const clearCurrentContact = () => {
    currentContact.value = null
  }

  return {
    // State
    contacts,
    currentContact,
    loading,
    error,
    stats,
    pagination,
    filters,

    // Computed
    contactsByType,
    contactsByStatus,
    contactsByCategory,
    contactsByPreferredMethod,
    activeContacts,
    primaryContacts,
    contactsWithEmail,
    contactsWithPhone,
    contactsWithAddress,
    customerContacts,
    vendorContacts,
    partnerContacts,
    internalContacts,
    prospectContacts,
    sortedContacts,

    // Actions
    loadContacts,
    loadContact,
    createContact,
    updateContact,
    deleteContact,
    loadContactStats,
    setPrimaryContact,
    duplicateContact,

    // Pagination
    setPage,
    setPageSize,
    nextPage,
    previousPage,

    // Filters
    setFilters,
    clearFilters,
    resetPagination,

    // Utility
    clearError,
    clearCurrentContact,
  }
})
