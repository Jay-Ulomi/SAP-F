// Employee Types

export interface Employee {
  id: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  gender?: string
  maritalStatus?: string
  nationality?: string
  department: string
  position: string
  hireDate: string
  manager?: string
  employmentType?: string
  salary?: number
  status: string
  emergencyContactName?: string
  emergencyContactRelationship?: string
  emergencyContactPhone?: string
  notes?: string
  createdBy?: string
  createdAt?: string
  updatedBy?: string
  updatedAt?: string
}

export interface EmployeeFormData {
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string
  address?: string
  dateOfBirth?: string
  gender?: string
  maritalStatus?: string
  nationality?: string
  department: string
  position: string
  hireDate: string
  manager?: string
  employmentType?: string
  salary?: number
  status: string
  emergencyContactName?: string
  emergencyContactRelationship?: string
  emergencyContactPhone?: string
  notes?: string
}