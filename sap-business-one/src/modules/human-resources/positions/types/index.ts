export enum PositionLevel {
  ENTRY = 'entry',
  JUNIOR = 'junior',
  SENIOR = 'senior',
  LEAD = 'lead',
  MANAGER = 'manager',
  DIRECTOR = 'director',
  EXECUTIVE = 'executive'
}

export enum PositionStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DRAFT = 'draft'
}

export enum EmploymentType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  INTERN = 'intern',
  CONSULTANT = 'consultant'
}

export interface Position {
  id: string
  title: string
  code: string
  departmentId: string
  departmentName: string
  level: PositionLevel
  employmentType: EmploymentType
  status: PositionStatus
  description?: string
  responsibilities: string[]
  requirements: string[]
  qualifications: string[]
  salaryRange: {
    min: number
    max: number
    currency: string
  }
  benefits: string[]
  reportingTo?: string
  reportingToName?: string
  location: string
  isRemoteEligible: boolean
  openPositions: number
  filledPositions: number
  totalPositions: number
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface PositionFormData {
  title: string
  code: string
  departmentId: string
  level: PositionLevel
  employmentType: EmploymentType
  status: PositionStatus
  description?: string
  responsibilities: string[]
  requirements: string[]
  qualifications: string[]
  salaryRange: {
    min: number
    max: number
    currency: string
  }
  benefits: string[]
  reportingTo?: string
  location: string
  isRemoteEligible: boolean
  totalPositions: number
}

export interface PositionSearchParams {
  page?: number
  limit?: number
  search?: string
  departmentId?: string
  level?: PositionLevel
  employmentType?: EmploymentType
  status?: PositionStatus
  isRemoteEligible?: boolean
  salaryMin?: number
  salaryMax?: number
}

export interface PositionSearchResponse {
  items: Position[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface PositionStats {
  totalPositions: number
  activePositions: number
  openPositions: number
  filledPositions: number
  positionsByDepartment: Array<{
    departmentId: string
    departmentName: string
    count: number
    openPositions: number
  }>
  positionsByLevel: Array<{
    level: PositionLevel
    count: number
    openPositions: number
  }>
  averageSalary: {
    overall: number
    byLevel: Array<{
      level: PositionLevel
      average: number
      min: number
      max: number
    }>
  }
}

export interface Department {
  id: string
  name: string
  code: string
}

export interface Employee {
  id: string
  name: string
  positionTitle?: string
}