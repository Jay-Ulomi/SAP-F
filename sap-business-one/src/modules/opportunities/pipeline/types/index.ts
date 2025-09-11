// Pipeline Stage Interface
export interface PipelineStage {
  id: string
  name: string
  code: string
  description?: string
  order: number
  color: string
  probability: number // 0-100
  isActive: boolean
  isDefault: boolean
  requiresApproval: boolean
  autoAdvance: boolean
  estimatedDuration: number // days
  activities: StageActivity[]
  rules: StageRule[]
  createdAt: Date
  updatedAt: Date
}

// Stage Activity Interface
export interface StageActivity {
  id: string
  name: string
  type: 'TASK' | 'CALL' | 'EMAIL' | 'MEETING' | 'DEMO' | 'PROPOSAL' | 'APPROVAL'
  description?: string
  isRequired: boolean
  estimatedDuration: number // hours
  assignee?: string
  template?: string
}

// Stage Rule Interface
export interface StageRule {
  id: string
  name: string
  type: 'VALIDATION' | 'AUTOMATION' | 'NOTIFICATION'
  condition: string
  action: string
  isActive: boolean
  priority: number
}

// Pipeline Configuration Interface
export interface PipelineConfig {
  id: string
  name: string
  description?: string
  stages: PipelineStage[]
  isActive: boolean
  defaultStage: string
  maxStages: number
  workflowRules: WorkflowRule[]
  createdAt: Date
  updatedAt: Date
}

// Workflow Rule Interface
export interface WorkflowRule {
  id: string
  name: string
  description?: string
  trigger: 'STAGE_CHANGE' | 'FIELD_UPDATE' | 'TIME_BASED' | 'MANUAL'
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  isActive: boolean
  priority: number
}

// Workflow Condition Interface
export interface WorkflowCondition {
  field: string
  operator: 'EQUALS' | 'NOT_EQUALS' | 'GREATER_THAN' | 'LESS_THAN' | 'CONTAINS' | 'NOT_CONTAINS'
  value: string | number | boolean
  logicalOperator?: 'AND' | 'OR'
}

// Workflow Action Interface
export interface WorkflowAction {
  type:
    | 'SEND_EMAIL'
    | 'CREATE_TASK'
    | 'UPDATE_FIELD'
    | 'SEND_NOTIFICATION'
    | 'CHANGE_STAGE'
    | 'ASSIGN_USER'
  config: Record<string, string | number | boolean>
  delay?: number // minutes
}

// Pipeline Form Data Interface
export interface PipelineFormData {
  name: string
  description?: string
  stages: PipelineStage[]
  isActive: boolean
  defaultStage: string
  maxStages: number
}

// Stage Form Data Interface
export interface StageFormData {
  name: string
  code: string
  description?: string
  order: number
  color: string
  probability: number
  isActive: boolean
  isDefault: boolean
  requiresApproval: boolean
  autoAdvance: boolean
  estimatedDuration: number
  activities: StageActivity[]
  rules: StageRule[]
}

// Pipeline Filters Interface
export interface PipelineFilters {
  search?: string
  isActive?: boolean
  stageCount?: number
  dateFrom?: Date
  dateTo?: Date
}

// Pipeline Statistics Interface
export interface PipelineStats {
  totalPipelines: number
  activePipelines: number
  totalStages: number
  averageStagesPerPipeline: number
  mostUsedStages: Array<{ stage: string; count: number }>
}

// Pipeline Pagination Interface
export interface PipelinePagination {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}
