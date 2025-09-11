import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { contactApi } from '../api'
import type {
  Contact,
  ContactFormData,
  ContactFilters,
  ContactStats,
  ContactPagination
} from '../types'
import { ContactStatus, ContactType, ContactCategory, ContactSource, ContactPriority } from '../types'

export const useContactStore = defineStore('contact', () => {
  // State
  const contacts = ref<Contact[]>([])
  const currentContact = ref<Contact | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<ContactStats | null>(null)
  const pagination = ref<ContactPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false
  })
  const filters = ref<ContactFilters>({})

  // Computed properties
  const contactsByStatus = computed(() => {
    const grouped: Record<ContactStatus, Contact[]> = {
      [ContactStatus.ACTIVE]: [],
      [ContactStatus.INACTIVE]: [],
      [ContactStatus.SUSPENDED]: [],
      [ContactStatus.PROSPECT]: [],
      [ContactStatus.LEAD]: [],
      [ContactStatus.CANCELLED]: []
    }
    
    contacts.value.forEach(contact => {
      grouped[contact.status].push(contact)
    })
    
    return grouped
  })

  const contactsByType = computed(() => {
    const grouped: Record<ContactType, Contact[]> = {
      [ContactType.INDIVIDUAL]: [],
      [ContactType.CORPORATE]: [],
      [ContactType.PARTNER]: [],
      [ContactType.VENDOR]: [],
      [ContactType.CUSTOMER]: [],
      [ContactType.SUPPLIER]: []
    }
    
    contacts.value.forEach(contact => {
      grouped[contact.type].push(contact)
    })
    
    return grouped
  })

  const contactsByCategory = computed(() => {
    const grouped: Record<ContactCategory, Contact[]> = {
      [ContactCategory.SALES]: [],
      [ContactCategory.MARKETING]: [],
      [ContactCategory.SUPPORT]: [],
      [ContactCategory.PARTNER]: [],
      [ContactCategory.VENDOR]: [],
      [ContactCategory.CUSTOMER]: [],
      [ContactCategory.OTHER]: []
    }
    
    contacts.value.forEach(contact => {
      grouped[contact.category].push(contact)
    })
    
    return grouped
  })

  const activeContacts = computed(() => 
    contacts.value.filter(contact => contact.status === ContactStatus.ACTIVE)
  )

  const prospectContacts = computed(() => 
    contacts.value.filter(contact => contact.status === ContactStatus.PROSPECT)
  )

  const leadContacts = computed(() => 
    contacts.value.filter(contact => contact.status === ContactStatus.LEAD)
  )

  const highPriorityContacts = computed(() => 
    contacts.value.filter(contact => 
      contact.priority === ContactPriority.HIGH || contact.priority === ContactPriority.CRITICAL
    )
  )

  const contactsNeedingFollowUp = computed(() => 
    contacts.value.filter(contact => 
      contact.nextFollowUpDate && contact.nextFollowUpDate <= new Date()
    )
  )

  // Actions
  const loadContacts = async () => {
    try {
      loading.value = true
      error.value = null
      
      const result = await contactApi.getContacts(
        pagination.value.page,
        pagination.value.limit,
        filters.value
      )
      
      contacts.value = result.contacts
      pagination.value = result.pagination
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contacts'
      console.error('Error loading contacts:', err)
    } finally {
      loading.value = false
    }
  }

  const createContact = async (data: ContactFormData) => {
    try {
      loading.value = true
      error.value = null
      
      const newContact = await contactApi.createContact(data)
      contacts.value.unshift(newContact)
      
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return newContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create contact'
      console.error('Error creating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const updateContact = async (id: string, data: Partial<ContactFormData>) => {
    try {
      loading.value = true
      error.value = null
      
      const updatedContact = await contactApi.updateContact(id, data)
      
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = updatedContact
      }
      
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
      
      await contactApi.deleteContact(id)
      
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value.splice(index, 1)
      }
      
      if (currentContact.value?.id === id) {
        currentContact.value = null
      }
      
      pagination.value.total -= 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      
      if (pagination.value.page > pagination.value.totalPages && pagination.value.totalPages > 0) {
        pagination.value.page = pagination.value.totalPages
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to delete contact'
      console.error('Error deleting contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const duplicateContact = async (
    id: string,
    newContactCode: string,
    newFirstName: string,
    newLastName: string
  ) => {
    try {
      loading.value = true
      error.value = null
      
      const duplicatedContact = await contactApi.duplicateContact(id, newContactCode, newFirstName, newLastName)
      contacts.value.unshift(duplicatedContact)
      
      pagination.value.total += 1
      if (pagination.value.total > pagination.value.limit) {
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      }
      
      return duplicatedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to duplicate contact'
      console.error('Error duplicating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const loadContactStats = async () => {
    try {
      loading.value = true
      error.value = null
      
      const contactStats = await contactApi.getContactStats()
      stats.value = contactStats
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load contact statistics'
      console.error('Error loading contact statistics:', err)
    } finally {
      loading.value = false
    }
  }

  // Business logic actions
  const activateContact = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const activatedContact = await contactApi.activateContact(id)
      
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = activatedContact
      }
      
      if (currentContact.value?.id === id) {
        currentContact.value = activatedContact
      }
      
      return activatedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to activate contact'
      console.error('Error activating contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const suspendContact = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const suspendedContact = await contactApi.suspendContact(id)
      
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = suspendedContact
      }
      
      if (currentContact.value?.id === id) {
        currentContact.value = suspendedContact
      }
      
      return suspendedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to suspend contact'
      console.error('Error suspending contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const convertLeadToContact = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      
      const convertedContact = await contactApi.convertLeadToContact(id)
      
      const index = contacts.value.findIndex(c => c.id === id)
      if (index !== -1) {
        contacts.value[index] = convertedContact
      }
      
      if (currentContact.value?.id === id) {
        currentContact.value = convertedContact
      }
      
      return convertedContact
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to convert lead to contact'
      console.error('Error converting lead to contact:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  // Pagination actions
  const nextPage = () => {
    if (pagination.value.hasNext) {
      pagination.value.page += 1
      loadContacts()
    }
  }

  const previousPage = () => {
    if (pagination.value.hasPrev) {
      pagination.value.page -= 1
      loadContacts()
    }
  }

  // Filter actions
  const setFilters = (newFilters: ContactFilters) => {
    filters.value = { ...filters.value, ...newFilters }
    pagination.value.page = 1
    loadContacts()
  }

  const clearFilters = () => {
    filters.value = {}
    pagination.value.page = 1
    loadContacts()
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
    contactsByStatus,
    contactsByType,
    contactsByCategory,
    activeContacts,
    prospectContacts,
    leadContacts,
    highPriorityContacts,
    contactsNeedingFollowUp,
    
    // Actions
    loadContacts,
    createContact,
    updateContact,
    deleteContact,
    duplicateContact,
    loadContactStats,
    activateContact,
    suspendContact,
    convertLeadToContact,
    
    // Pagination
    nextPage,
    previousPage,
    
    // Filters
    setFilters,
    clearFilters
  }
})
