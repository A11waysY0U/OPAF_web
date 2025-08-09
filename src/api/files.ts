import request from '@/utils/request'
import type { 
  FileUploadRequest, 
  FileSearchRequest, 
  FileListResponse, 
  FileTag 
} from '@/types'

// 上传文件
export const uploadFile = (data: FileUploadRequest): Promise<{ status: string }> => {
  return request.put('/files/upload', data)
}

// 删除文件
export const deleteFile = (data: { path: string }): Promise<{ status: string }> => {
  return request.post('/files/delete', data)
}

// 修改文件标签
export const modifyFileTag = (data: { tags: FileTag; path: string }): Promise<{ status: string }> => {
  return request.post('/files/modify', data)
}

// 搜索文件
export const searchFiles = (data: FileSearchRequest): Promise<FileTag[]> => {
  return request.post('/files/search', data)
}

// 获取文件列表
export const getFileList = (path?: string): Promise<FileListResponse> => {
  return request.get('/files/getlist', { params: { path } })
}

// 获取文件标签
export const getFileTag = (path: string): Promise<{ tag: FileTag }> => {
  return request.get('/files/getfile', { params: { path } })
}

// 下载文件
export const downloadFile = (path: string): Promise<{ md5: string }> => {
  return request.get('/files/download', { params: { path } })
}
