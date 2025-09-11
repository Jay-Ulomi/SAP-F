export enum ContactType {
  PRIMARY = 'PRIMARY',
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
  TECHNICAL = 'TECHNICAL',
  DECISION_MAKER = 'DECISION_MAKER',
  ACCOUNTS_PAYABLE = 'ACCOUNTS_PAYABLE',
  ACCOUNTS_RECEIVABLE = 'ACCOUNTS_RECEIVABLE',
  SALES = 'SALES',
  SUPPORT = 'SUPPORT',
  OTHER = 'OTHER',
}

export enum ContactStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FORMER_EMPLOYEE = 'FORMER_EMPLOYEE',
  ON_LEAVE = 'ON_LEAVE',
}

export enum ContactCategory {
  CUSTOMER = 'CUSTOMER',
  VENDOR = 'VENDOR',
  PARTNER = 'PARTNER',
  INTERNAL = 'INTERNAL',
  PROSPECT = 'PROSPECT',
}

export enum PreferredContactMethod {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
  MOBILE = 'MOBILE',
  FAX = 'FAX',
  MAIL = 'MAIL',
  IN_PERSON = 'IN_PERSON',
}

export interface ContactPerson {
  id: string
  firstName: string
  lastName: string
  title?: string
  position?: string
  department?: string
  companyId?: string
  companyName?: string
  contactType: ContactType[]
  status: ContactStatus
  category: ContactCategory
  isPrimary: boolean
  preferredContactMethod: PreferredContactMethod

  // Contact Information
  email: string
  phone?: string
  mobile?: string
  fax?: string

  // Address Information
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string

  // Additional Information
  notes?: string
  tags: string[]
  birthday?: string
  anniversary?: string

  // Business Information
  businessCard?: string
  linkedIn?: string
  website?: string
  skype?: string

  // Preferences
  language?: string
  timezone?: string
  doNotContact: boolean
  marketingOptIn: boolean

  // Timestamps
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string

  // Related Entities
  relatedCustomerIds?: string[]
  relatedVendorIds?: string[]
  relatedLeadIds?: string[]
}

export interface ContactPersonFormData {
  firstName: string
  lastName: string
  title?: string
  position?: string
  department?: string
  companyId?: string
  companyName?: string
  contactType: ContactType[]
  status: ContactStatus
  category: ContactCategory
  isPrimary: boolean
  preferredContactMethod: PreferredContactMethod

  // Contact Information
  email: string
  phone?: string
  mobile?: string
  fax?: string

  // Address Information
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  postalCode?: string
  country?: string

  // Additional Information
  notes?: string
  tags: string[]
  birthday?: string
  anniversary?: string

  // Business Information
  businessCard?: string
  linkedIn?: string
  website?: string
  skype?: string

  // Preferences
  language?: string
  timezone?: string
  doNotContact: boolean
  marketingOptIn: boolean

  // Related Entities
  relatedCustomerIds?: string[]
  relatedVendorIds?: string[]
  relatedLeadIds?: string[]
}

export interface ContactPersonFilters {
  search?: string
  contactType?: ContactType[]
  status?: ContactStatus[]
  category?: ContactCategory[]
  companyId?: string
  isPrimary?: boolean
  preferredContactMethod?: PreferredContactMethod[]
  hasEmail?: boolean
  hasPhone?: boolean
  tags?: string[]
  department?: string[]
  doNotContact?: boolean
  marketingOptIn?: boolean
  createdDateRange?: {
    start: string
    end: string
  }
}

export interface ContactPersonStats {
  totalContacts: number
  activeContacts: number
  primaryContacts: number
  customerContacts: number
  vendorContacts: number
  partnerContacts: number
  internalContacts: number
  prospectContacts: number
  contactsByType: Record<ContactType, number>
  contactsByStatus: Record<ContactStatus, number>
  contactsByCategory: Record<ContactCategory, number>
  contactsByPreferredMethod: Record<PreferredContactMethod, number>
  contactsWithEmail: number
  contactsWithPhone: number
  contactsWithAddress: number
  newContactsThisMonth: number
  newContactsThisQuarter: number
  newContactsThisYear: number
}

export interface ContactPersonPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
