export enum AddressType {
  BILLING = 'BILLING',
  SHIPPING = 'SHIPPING',
  BUSINESS = 'BUSINESS',
  RESIDENTIAL = 'RESIDENTIAL',
  WAREHOUSE = 'WAREHOUSE',
  BRANCH = 'BRANCH',
  HEADQUARTERS = 'HEADQUARTERS',
  OTHER = 'OTHER',
}

export enum AddressStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  DEFAULT = 'DEFAULT',
  VERIFIED = 'VERIFIED',
  UNVERIFIED = 'UNVERIFIED',
}

export enum Country {
  US = 'US',
  CA = 'CA',
  UK = 'UK',
  DE = 'DE',
  FR = 'FR',
  IT = 'IT',
  ES = 'ES',
  NL = 'NL',
  BE = 'BE',
  CH = 'CH',
  AT = 'AT',
  AU = 'AU',
  NZ = 'NZ',
  JP = 'JP',
  CN = 'CN',
  IN = 'IN',
  BR = 'BR',
  MX = 'MX',
  AR = 'AR',
  CL = 'CL',
}

export interface Address {
  id: string
  name: string
  description?: string
  addressType: AddressType[]
  status: AddressStatus
  isDefault: boolean
  isVerified: boolean

  // Address Details
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: Country

  // Contact Information
  contactPerson?: string
  phone?: string
  email?: string

  // Business Information
  companyId?: string
  companyName?: string
  taxId?: string
  businessLicense?: string

  // Geographic Information
  latitude?: number
  longitude?: number
  timezone?: string

  // Additional Information
  notes?: string
  tags: string[]

  // Audit Fields
  createdAt: string
  updatedAt: string
  createdBy?: string
  updatedBy?: string

  // Verification
  verifiedAt?: string
  verifiedBy?: string
  verificationMethod?: string
}

export interface AddressFormData {
  name: string
  description?: string
  addressType: AddressType[]
  status: AddressStatus
  isDefault: boolean
  isVerified: boolean

  // Address Details
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: Country

  // Contact Information
  contactPerson?: string
  phone?: string
  email?: string

  // Business Information
  companyId?: string
  companyName?: string
  taxId?: string
  businessLicense?: string

  // Geographic Information
  latitude?: number
  longitude?: number
  timezone?: string

  // Additional Information
  notes?: string
  tags: string[]
}

export interface AddressFilters {
  search?: string
  addressType?: AddressType[]
  status?: AddressStatus
  country?: Country
  city?: string
  state?: string
  companyId?: string
  isDefault?: boolean
  isVerified?: boolean
}

export interface AddressStats {
  totalAddresses: number
  activeAddresses: number
  defaultAddresses: number
  verifiedAddresses: number
  addressesByType: Record<AddressType, number>
  addressesByCountry: Record<Country, number>
  addressesByStatus: Record<AddressStatus, number>
}

export interface AddressPagination {
  page: number
  limit: number
  total: number
  totalPages: number
}
