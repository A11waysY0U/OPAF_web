import request from '@/utils/request'
import type { WorkflowTag, WorkflowRequest } from '@/types'

// 新增工作流
export const addWorkflow = (data: { workflow: WorkflowTag }): Promise<{ status: string }> => {
  return request.post('/workflow/add', data)
}

// 删除工作流
export const deleteWorkflow = (data: { id: string }): Promise<{ status: string }> => {
  return request.post('/workflow/delete', data)
}

// 修改工作流
export const modifyWorkflow = (data: { tags: WorkflowTag }): Promise<{ status: string }> => {
  return request.post('/workflow/modify', data)
}

// 获取工作流列表
export const getWorkflowList = (): Promise<WorkflowTag[]> => {
  return request.get('/workflow/getlist')
}

// 获取工作流信息
export const getWorkflow = (id: string): Promise<{ tag: WorkflowTag }> => {
  return request.get('/workflow/getworkflow', { params: { id } })
}

// 搜索工作流
export const searchWorkflow = (data: { tags: WorkflowTag }): Promise<WorkflowTag[]> => {
  return request.post('/workflow/search', data)
}
