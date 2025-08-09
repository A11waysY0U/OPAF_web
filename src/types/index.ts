// 用户相关类型
export interface User {
  id: number
  name: string
  password: string
  level: number
}

export interface LoginRequest {
  username: string
  password: string
  authToken: string
}

export interface RegisterRequest {
  username: string
  password: string
  authToken: string
  inviteCode: string
}

export interface AuthResponse {
  status?: string
  token?: string
  reason?: string
}

// 文件相关类型
export interface FileTag {
  id?: number
  name?: string
  time?: string
  belong?: string
  specialtag?: string
  objective?: string
  postscript?: string
  previewImg?: string
}

export interface FileUploadRequest {
  tag: FileTag
  md5: string
  path: string
}

export interface FileSearchRequest {
  tag: {
    id?: number
    name?: string
    path?: string
    time?: string
    rangeStartTime?: string
    rangeStopTime?: string
    belong?: string
    specialtag?: string
    objective?: string
    postscript?: string
  }
}

export interface FileListResponse {
  files: FileTag[]
  dictionaries: string[]
}

// 工作流相关类型
export interface WorkflowUser {
  id: number
  name: string
  password: string
  level: number
  role: string
}

export interface WorkflowTag {
  id?: number
  name?: string
  workDictionary?: string
  createTime?: string
  startTime?: string
  stopTime?: string
  typetag?: string
  postscript?: string
  previewImg?: string
  workUsers?: WorkflowUser[]
}

export interface WorkflowRequest {
  workflow?: WorkflowTag
  tags?: WorkflowTag
  id?: string
}

// 邀请码相关类型
export interface InviteCodeResponse {
  state: string
  inviteCode: string
}

// API响应类型
export interface ApiResponse<T = any> {
  status?: string
  token?: string
  reason?: string
  data?: T
}

// 分页类型
export interface Pagination {
  current: number
  pageSize: number
  total: number
}
