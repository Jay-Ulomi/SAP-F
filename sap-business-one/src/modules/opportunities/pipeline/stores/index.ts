import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { pipelineApi } from '../api'
import type {
  PipelineConfig,
  PipelineFormData,
  PipelineFilters,
  PipelineStats,
  PipelinePagination,
  PipelineStage,
  StageFormData,
} from '../types'

export const usePipelineStore = defineStore('pipeline', () => {
  const pipelines = ref<PipelineConfig[]>([])
  const currentPipeline = ref<PipelineConfig | null>(null)
  const currentStage = ref<PipelineStage | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const stats = ref<PipelineStats | null>(null)
  const pagination = ref<PipelinePagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  })
  const filters = ref<PipelineFilters>({})

  const activePipelines = computed(() => pipelines.value.filter((p) => p.isActive))
  const pipelinesByStageCount = computed(() => {
    const grouped: Record<number, PipelineConfig[]> = {}
    pipelines.value.forEach((p) => {
      const count = p.stages.length
      if (!grouped[count]) grouped[count] = []
      grouped[count].push(p)
    })
    return grouped
  })

  const loadPipelines = async (page = 1, limit = 10, newFilters?: PipelineFilters) => {
    try {
      loading.value = true
      error.value = null
      if (newFilters) filters.value = newFilters
      const res = await pipelineApi.getPipelines(page, limit, filters.value)
      pipelines.value = res.pipelines
      pagination.value = res.pagination
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load pipelines'
    } finally {
      loading.value = false
    }
  }

  const loadPipelineById = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      currentPipeline.value = await pipelineApi.getPipelineById(id)
      return currentPipeline.value
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load pipeline'
      return null
    } finally {
      loading.value = false
    }
  }

  const createPipeline = async (data: PipelineFormData) => {
    try {
      loading.value = true
      error.value = null
      const errs = pipelineApi.validatePipeline(data)
      if (errs.length) {
        error.value = errs.join(', ')
        return null
      }
      const pipeline = await pipelineApi.createPipeline(data)
      pipelines.value.unshift(pipeline)
      pagination.value.total += 1
      pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
      return pipeline
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create pipeline'
      return null
    } finally {
      loading.value = false
    }
  }

  const updatePipeline = async (id: string, data: Partial<PipelineFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updated = await pipelineApi.updatePipeline(id, data)
      if (updated) {
        const idx = pipelines.value.findIndex((p) => p.id === id)
        if (idx !== -1) pipelines.value[idx] = updated
        if (currentPipeline.value?.id === id) currentPipeline.value = updated
      }
      return updated
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update pipeline'
      return null
    } finally {
      loading.value = false
    }
  }

  const deletePipeline = async (id: string) => {
    try {
      loading.value = true
      error.value = null
      const ok = await pipelineApi.deletePipeline(id)
      if (ok) {
        pipelines.value = pipelines.value.filter((p) => p.id !== id)
        pagination.value.total -= 1
        pagination.value.totalPages = Math.ceil(pagination.value.total / pagination.value.limit)
        if (currentPipeline.value?.id === id) currentPipeline.value = null
      }
      return ok
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete pipeline'
      return false
    } finally {
      loading.value = false
    }
  }

  const loadStats = async () => {
    try {
      loading.value = true
      error.value = null
      stats.value = await pipelineApi.getPipelineStats()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load stats'
    } finally {
      loading.value = false
    }
  }

  const createStage = async (pipelineId: string, data: StageFormData) => {
    try {
      loading.value = true
      error.value = null
      const errs = pipelineApi.validateStage(data)
      if (errs.length) {
        error.value = errs.join(', ')
        return null
      }
      const stage = await pipelineApi.createStage(pipelineId, data)
      if (stage) {
        // Update local state
        const pipeline = pipelines.value.find((p) => p.id === pipelineId)
        if (pipeline) {
          pipeline.stages.push(stage)
          pipeline.stages.sort((a, b) => a.order - b.order)
          pipeline.updatedAt = new Date()
        }
        if (currentPipeline.value?.id === pipelineId) {
          currentPipeline.value.stages.push(stage)
          currentPipeline.value.stages.sort((a, b) => a.order - b.order)
          currentPipeline.value.updatedAt = new Date()
        }
      }
      return stage
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to create stage'
      return null
    } finally {
      loading.value = false
    }
  }

  const updateStage = async (pipelineId: string, stageId: string, data: Partial<StageFormData>) => {
    try {
      loading.value = true
      error.value = null
      const updated = await pipelineApi.updateStage(pipelineId, stageId, data)
      if (updated) {
        // Update local state
        const pipeline = pipelines.value.find((p) => p.id === pipelineId)
        if (pipeline) {
          const stageIdx = pipeline.stages.findIndex((s) => s.id === stageId)
          if (stageIdx !== -1) {
            pipeline.stages[stageIdx] = updated
            pipeline.stages.sort((a, b) => a.order - b.order)
            pipeline.updatedAt = new Date()
          }
        }
        if (currentPipeline.value?.id === pipelineId) {
          const stageIdx = currentPipeline.value.stages.findIndex((s) => s.id === stageId)
          if (stageIdx !== -1) {
            currentPipeline.value.stages[stageIdx] = updated
            currentPipeline.value.stages.sort((a, b) => a.order - b.order)
            currentPipeline.value.updatedAt = new Date()
          }
        }
      }
      return updated
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to update stage'
      return null
    } finally {
      loading.value = false
    }
  }

  const deleteStage = async (pipelineId: string, stageId: string) => {
    try {
      loading.value = true
      error.value = null
      const ok = await pipelineApi.deleteStage(pipelineId, stageId)
      if (ok) {
        // Update local state
        const pipeline = pipelines.value.find((p) => p.id === pipelineId)
        if (pipeline) {
          pipeline.stages = pipeline.stages.filter((s) => s.id !== stageId)
          pipeline.stages.forEach((s, idx) => {
            s.order = idx + 1
          })
          pipeline.updatedAt = new Date()
        }
        if (currentPipeline.value?.id === pipelineId) {
          currentPipeline.value.stages = currentPipeline.value.stages.filter(
            (s) => s.id !== stageId,
          )
          currentPipeline.value.stages.forEach((s, idx) => {
            s.order = idx + 1
          })
          currentPipeline.value.updatedAt = new Date()
        }
      }
      return ok
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete stage'
      return false
    } finally {
      loading.value = false
    }
  }

  const setFilters = (newFilters: PipelineFilters) => {
    filters.value = newFilters
  }

  const setPage = (page: number) => {
    pagination.value.page = page
  }

  const clearError = () => (error.value = null)

  return {
    pipelines,
    currentPipeline,
    currentStage,
    loading,
    error,
    stats,
    pagination,
    filters,
    activePipelines,
    pipelinesByStageCount,
    loadPipelines,
    loadPipelineById,
    createPipeline,
    updatePipeline,
    deletePipeline,
    loadStats,
    createStage,
    updateStage,
    deleteStage,
    setFilters,
    setPage,
    clearError,
  }
})
