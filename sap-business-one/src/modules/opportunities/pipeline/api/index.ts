import type {
  PipelineConfig,
  PipelineFormData,
  PipelineFilters,
  PipelineStats,
  PipelinePagination,
  PipelineStage,
  StageFormData,
} from '../types'

// Mock data
const mockPipelines: PipelineConfig[] = [
  {
    id: 'P-1',
    name: 'Standard Sales Pipeline',
    description: 'Default pipeline for B2B sales',
    stages: [
      {
        id: 'S-1',
        name: 'Lead Qualification',
        code: 'LEAD_QUAL',
        description: 'Initial lead assessment',
        order: 1,
        color: '#3B82F6',
        probability: 10,
        isActive: true,
        isDefault: true,
        requiresApproval: false,
        autoAdvance: false,
        estimatedDuration: 3,
        activities: [
          {
            id: 'A-1',
            name: 'Initial Contact',
            type: 'CALL',
            description: 'First contact with lead',
            isRequired: true,
            estimatedDuration: 1,
            assignee: 'Sales Team',
          },
        ],
        rules: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'S-2',
        name: 'Discovery',
        code: 'DISCOVERY',
        description: 'Understanding customer needs',
        order: 2,
        color: '#10B981',
        probability: 25,
        isActive: true,
        isDefault: false,
        requiresApproval: false,
        autoAdvance: false,
        estimatedDuration: 5,
        activities: [
          {
            id: 'A-2',
            name: 'Needs Assessment',
            type: 'MEETING',
            description: 'Deep dive into requirements',
            isRequired: true,
            estimatedDuration: 2,
            assignee: 'Sales Team',
          },
        ],
        rules: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'S-3',
        name: 'Proposal',
        code: 'PROPOSAL',
        description: 'Solution presentation',
        order: 3,
        color: '#F59E0B',
        probability: 50,
        isActive: true,
        isDefault: false,
        requiresApproval: true,
        autoAdvance: false,
        estimatedDuration: 7,
        activities: [
          {
            id: 'A-3',
            name: 'Solution Design',
            type: 'TASK',
            description: 'Create custom solution',
            isRequired: true,
            estimatedDuration: 8,
            assignee: 'Solution Team',
          },
        ],
        rules: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'S-4',
        name: 'Negotiation',
        code: 'NEGOTIATION',
        description: 'Contract and pricing discussion',
        order: 4,
        color: '#EF4444',
        probability: 75,
        isActive: true,
        isDefault: false,
        requiresApproval: true,
        autoAdvance: false,
        estimatedDuration: 10,
        activities: [
          {
            id: 'A-4',
            name: 'Contract Review',
            type: 'TASK',
            description: 'Legal review and approval',
            isRequired: true,
            estimatedDuration: 4,
            assignee: 'Legal Team',
          },
        ],
        rules: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 'S-5',
        name: 'Closed Won',
        code: 'CLOSED_WON',
        description: 'Deal completed successfully',
        order: 5,
        color: '#059669',
        probability: 100,
        isActive: true,
        isDefault: false,
        requiresApproval: false,
        autoAdvance: false,
        estimatedDuration: 1,
        activities: [
          {
            id: 'A-5',
            name: 'Contract Signing',
            type: 'TASK',
            description: 'Final contract execution',
            isRequired: true,
            estimatedDuration: 1,
            assignee: 'Sales Team',
          },
        ],
        rules: [],
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
    ],
    isActive: true,
    defaultStage: 'S-1',
    maxStages: 5,
    workflowRules: [],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
]

export const pipelineApi = {
  async getPipelines(
    page: number = 1,
    limit: number = 10,
    filters?: PipelineFilters,
  ): Promise<{ pipelines: PipelineConfig[]; pagination: PipelinePagination }> {
    await new Promise((r) => setTimeout(r, 200))

    let pipelines = [...mockPipelines]

    // Filters
    if (filters) {
      if (filters.search) {
        const s = filters.search.toLowerCase()
        pipelines = pipelines.filter(
          (p) =>
            p.name.toLowerCase().includes(s) ||
            p.description?.toLowerCase().includes(s),
        )
      }
      if (filters.isActive !== undefined) pipelines = pipelines.filter((p) => p.isActive === filters.isActive)
      if (filters.stageCount) pipelines = pipelines.filter((p) => p.stages.length === filters.stageCount)
      if (filters.dateFrom) pipelines = pipelines.filter((p) => p.createdAt >= filters.dateFrom!)
      if (filters.dateTo) pipelines = pipelines.filter((p) => p.createdAt <= filters.dateTo!)
    }

    const total = pipelines.length
    const totalPages = Math.ceil(total / limit) || 1
    const start = (page - 1) * limit
    const slice = pipelines.slice(start, start + limit)

    return {
      pipelines: slice,
      pagination: { page, limit, total, totalPages, hasNext: page < totalPages, hasPrev: page > 1 },
    }
  },

  async getPipelineById(id: string): Promise<PipelineConfig | null> {
    await new Promise((r) => setTimeout(r, 120))
    return mockPipelines.find((p) => p.id === id) || null
  },

  async createPipeline(data: PipelineFormData): Promise<PipelineConfig> {
    await new Promise((r) => setTimeout(r, 200))
    const pipeline: PipelineConfig = {
      id: `P-${Date.now()}`,
      ...data,
      workflowRules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    mockPipelines.unshift(pipeline)
    return pipeline
  },

  async updatePipeline(id: string, data: Partial<PipelineFormData>): Promise<PipelineConfig | null> {
    await new Promise((r) => setTimeout(r, 200))
    const idx = mockPipelines.findIndex((p) => p.id === id)
    if (idx === -1) return null
    const updated: PipelineConfig = { ...mockPipelines[idx], ...data, updatedAt: new Date() }
    mockPipelines[idx] = updated
    return updated
  },

  async deletePipeline(id: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 120))
    const idx = mockPipelines.findIndex((p) => p.id === id)
    if (idx === -1) return false
    mockPipelines.splice(idx, 1)
    return true
  },

  async getPipelineStats(): Promise<PipelineStats> {
    await new Promise((r) => setTimeout(r, 120))
    const totalPipelines = mockPipelines.length
    const activePipelines = mockPipelines.filter((p) => p.isActive).length
    const totalStages = mockPipelines.reduce((sum, p) => sum + p.stages.length, 0)
    const averageStagesPerPipeline = totalPipelines ? Math.round(totalStages / totalPipelines) : 0
    
    // Count stage usage across all pipelines
    const stageCounts: Record<string, number> = {}
    mockPipelines.forEach((p) => {
      p.stages.forEach((s) => {
        stageCounts[s.name] = (stageCounts[s.name] || 0) + 1
      })
    })
    
    const mostUsedStages = Object.entries(stageCounts)
      .map(([stage, count]) => ({ stage, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    return {
      totalPipelines,
      activePipelines,
      totalStages,
      averageStagesPerPipeline,
      mostUsedStages,
    }
  },

  async createStage(pipelineId: string, data: StageFormData): Promise<PipelineStage | null> {
    await new Promise((r) => setTimeout(r, 200))
    const pipeline = mockPipelines.find((p) => p.id === pipelineId)
    if (!pipeline) return null

    const stage: PipelineStage = {
      id: `S-${Date.now()}`,
      ...data,
      rules: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    pipeline.stages.push(stage)
    pipeline.stages.sort((a, b) => a.order - b.order)
    pipeline.updatedAt = new Date()
    
    return stage
  },

  async updateStage(pipelineId: string, stageId: string, data: Partial<StageFormData>): Promise<PipelineStage | null> {
    await new Promise((r) => setTimeout(r, 200))
    const pipeline = mockPipelines.find((p) => p.id === pipelineId)
    if (!pipeline) return null

    const stageIdx = pipeline.stages.findIndex((s) => s.id === stageId)
    if (stageIdx === -1) return null

    const updated: PipelineStage = { ...pipeline.stages[stageIdx], ...data, updatedAt: new Date() }
    pipeline.stages[stageIdx] = updated
    pipeline.stages.sort((a, b) => a.order - b.order)
    pipeline.updatedAt = new Date()

    return updated
  },

  async deleteStage(pipelineId: string, stageId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 120))
    const pipeline = mockPipelines.find((p) => p.id === pipelineId)
    if (!pipeline) return false

    const stageIdx = pipeline.stages.findIndex((s) => s.id === stageId)
    if (stageIdx === -1) return false

    pipeline.stages.splice(stageIdx, 1)
    pipeline.updatedAt = new Date()
    
    // Reorder remaining stages
    pipeline.stages.forEach((s, idx) => {
      s.order = idx + 1
    })

    return true
  },

  validatePipeline(data: PipelineFormData): string[] {
    const errors: string[] = []
    if (!data.name?.trim()) errors.push('Pipeline name is required')
    if (!data.stages?.length) errors.push('At least one stage is required')
    if (data.stages && data.stages.length > data.maxStages) errors.push(`Maximum ${data.maxStages} stages allowed`)
    if (!data.defaultStage) errors.push('Default stage is required')
    return errors
  },

  validateStage(data: StageFormData): string[] {
    const errors: string[] = []
    if (!data.name?.trim()) errors.push('Stage name is required')
    if (!data.code?.trim()) errors.push('Stage code is required')
    if (data.probability < 0 || data.probability > 100) errors.push('Probability must be between 0 and 100')
    if (data.estimatedDuration < 0) errors.push('Estimated duration must be positive')
    return errors
  },
}
