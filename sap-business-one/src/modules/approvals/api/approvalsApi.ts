import type {
  ApprovalRule,
  ApprovalRuleFormData,
  ApprovalInstance,
  ApprovalAction,
  ApprovalFilters,
  ApprovalStats,
  ApprovalPagination,
  ApprovalHistory,
  User,
  ApprovableDocument
} from '../types'
import {
  ApprovalType,
  ApprovalStatus,
  ApprovalDocumentType,
  Department,
  DocumentApprovalStatus
} from '../types'

// Mock API functions - replace with actual API calls

export const approvalsApi = {
  // Approval Rules CRUD
  async getApprovalRules(filters?: ApprovalFilters, pagination?: { page: number; limit: number }) {
    // Mock data for development
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockRules: ApprovalRule[] = [
      {
        id: '1',
        type: ApprovalType.OPEX,
        department: Department.SALES,
        documentType: ApprovalDocumentType.PURCHASE_REQUEST,
        initiator: 'Glory Mushi',
        amountFrom: 0,
        amountTo: 1000000,
        approver1: 'Joseph Nzumbi',
        approver2: 'N/A',
        approver3: 'N/A',
        approver4: 'N/A',
        approver5: 'N/A',
        status: ApprovalStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      },
      {
        id: '2',
        type: ApprovalType.OPEX,
        department: Department.SALES,
        documentType: ApprovalDocumentType.PURCHASE_ORDER,
        initiator: 'Glory Mushi',
        amountFrom: 1000001,
        amountTo: 5000000,
        approver1: 'Joseph Nzumbi',
        approver2: 'Aman Khan',
        approver3: 'N/A',
        approver4: 'N/A',
        approver5: 'N/A',
        status: ApprovalStatus.ACTIVE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'admin',
        updatedBy: 'admin'
      }
    ]

    return {
      data: mockRules,
      pagination: {
        page: pagination?.page || 1,
        limit: pagination?.limit || 10,
        total: mockRules.length,
        totalPages: Math.ceil(mockRules.length / (pagination?.limit || 10)),
        hasMore: false
      }
    }
  },

  async getApprovalRule(id: string): Promise<ApprovalRule> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      id,
      type: ApprovalType.OPEX,
      department: Department.SALES,
      documentType: ApprovalDocumentType.PURCHASE_REQUEST,
      initiator: 'Glory Mushi',
      amountFrom: 0,
      amountTo: 1000000,
      approver1: 'Joseph Nzumbi',
      status: ApprovalStatus.ACTIVE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'admin'
    }
  },

  async createApprovalRule(data: ApprovalRuleFormData): Promise<ApprovalRule> {
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'current-user',
      updatedBy: 'current-user'
    }
  },

  async updateApprovalRule(id: string, data: ApprovalRuleFormData): Promise<ApprovalRule> {
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      id,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'admin',
      updatedBy: 'current-user'
    }
  },

  async deleteApprovalRule(id: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 300))
  },

  // Approval Instances
  async getApprovalInstances(filters?: { status?: string; department?: string }) {
    await new Promise(resolve => setTimeout(resolve, 500))

    const mockInstances: ApprovalInstance[] = [
      {
        id: '1',
        ruleId: '1',
        documentId: 'PR-001',
        documentType: ApprovalDocumentType.PURCHASE_REQUEST,
        initiatorId: 'user1',
        initiatorName: 'Glory Mushi',
        amount: 500000,
        department: Department.SALES,
        currentLevel: 1,
        maxLevel: 1,
        status: DocumentApprovalStatus.PENDING_APPROVAL,
        approvals: [
          {
            level: 1,
            approverId: 'approver1',
            approverName: 'Joseph Nzumbi',
            status: 'PENDING'
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    return mockInstances
  },

  async getApprovalInstance(id: string): Promise<ApprovalInstance> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      id,
      ruleId: '1',
      documentId: 'PR-001',
      documentType: ApprovalDocumentType.PURCHASE_REQUEST,
      initiatorId: 'user1',
      initiatorName: 'Glory Mushi',
      amount: 500000,
      department: Department.SALES,
      currentLevel: 1,
      maxLevel: 1,
      status: DocumentApprovalStatus.PENDING_APPROVAL,
      approvals: [
        {
          level: 1,
          approverId: 'approver1',
          approverName: 'Joseph Nzumbi',
          status: 'PENDING'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  async createApprovalInstance(document: ApprovableDocument): Promise<ApprovalInstance> {
    await new Promise(resolve => setTimeout(resolve, 500))

    // This would typically find the matching approval rule and create an instance
    return {
      id: Date.now().toString(),
      ruleId: '1',
      documentId: document.id,
      documentType: document.type,
      initiatorId: document.initiatorId,
      initiatorName: 'Current User',
      amount: document.amount,
      department: document.department,
      currentLevel: 1,
      maxLevel: 1,
      status: DocumentApprovalStatus.PENDING_APPROVAL,
      approvals: [
        {
          level: 1,
          approverId: 'approver1',
          approverName: 'Joseph Nzumbi',
          status: 'PENDING'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  async processApproval(instanceId: string, action: ApprovalAction): Promise<ApprovalInstance> {
    await new Promise(resolve => setTimeout(resolve, 500))

    // Process the approval action and update the instance
    return {
      id: instanceId,
      ruleId: '1',
      documentId: 'PR-001',
      documentType: ApprovalDocumentType.PURCHASE_REQUEST,
      initiatorId: 'user1',
      initiatorName: 'Glory Mushi',
      amount: 500000,
      department: Department.SALES,
      currentLevel: 1,
      maxLevel: 1,
      status: action.action === 'APPROVE' ? DocumentApprovalStatus.APPROVED : DocumentApprovalStatus.REJECTED,
      approvals: [
        {
          level: 1,
          approverId: action.approverId,
          approverName: action.approverName,
          status: action.action === 'APPROVE' ? DocumentApprovalStatus.APPROVED : DocumentApprovalStatus.REJECTED,
          comments: action.comments,
          ...(action.action === 'APPROVE' ? { approvedAt: new Date().toISOString() } : { rejectedAt: new Date().toISOString() })
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  },

  // Approval History
  async getApprovalHistory(documentId: string): Promise<ApprovalHistory[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return [
      {
        id: '1',
        documentId,
        documentType: ApprovalDocumentType.PURCHASE_REQUEST,
        action: 'SUBMITTED',
        approverId: 'user1',
        approverName: 'Glory Mushi',
        comments: 'Purchase request submitted for approval',
        timestamp: new Date().toISOString()
      }
    ]
  },

  // Statistics
  async getApprovalStats(): Promise<ApprovalStats> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return {
      totalRules: 15,
      activeRules: 12,
      inactiveRules: 3,
      rulesByType: [
        { type: ApprovalType.OPEX, count: 8 },
        { type: ApprovalType.FUEL_STAFF, count: 3 },
        { type: ApprovalType.FUEL_BULK, count: 2 },
        { type: ApprovalType.CAPEX, count: 2 }
      ],
      rulesByDepartment: [
        { department: Department.SALES, count: 5 },
        { department: Department.OPERATIONS, count: 4 },
        { department: Department.HUMAN_RESOURCE, count: 3 },
        { department: Department.FINANCE, count: 3 }
      ],
      pendingApprovals: 24,
      approvedToday: 12,
      rejectedToday: 2
    }
  },

  // Users for approver selection
  async getUsers(department?: string): Promise<User[]> {
    await new Promise(resolve => setTimeout(resolve, 300))

    return [
      {
        id: 'user1',
        name: 'Joseph Nzumbi',
        email: 'joseph.nzumbi@company.com',
        department: Department.SALES,
        role: 'Manager',
        active: true
      },
      {
        id: 'user2',
        name: 'Aman Khan',
        email: 'aman.khan@company.com',
        department: Department.SALES,
        role: 'Director',
        active: true
      },
      {
        id: 'user3',
        name: 'Stella Lyimo',
        email: 'stella.lyimo@company.com',
        department: Department.HUMAN_RESOURCE,
        role: 'Manager',
        active: true
      },
      {
        id: 'user4',
        name: 'Stephano Pietro',
        email: 'stephano.pietro@company.com',
        department: Department.OPERATIONS,
        role: 'Manager',
        active: true
      },
      {
        id: 'user5',
        name: 'Devis Degratius',
        email: 'devis.degratius@company.com',
        department: Department.FINANCE,
        role: 'Manager',
        active: true
      }
    ]
  },

  // Find applicable approval rule for a document
  async findApprovalRule(document: ApprovableDocument): Promise<ApprovalRule | null> {
    await new Promise(resolve => setTimeout(resolve, 300))

    // This would find the matching rule based on department, document type, and amount
    const rules = await this.getApprovalRules()

    return rules.data.find(rule =>
      rule.department === document.department &&
      rule.documentType === document.type &&
      rule.status === ApprovalStatus.ACTIVE &&
      document.amount >= rule.amountFrom &&
      document.amount <= rule.amountTo
    ) || null
  }
}