import request from '@/utils/request'
import type { LoginRequest, RegisterRequest, AuthResponse, InviteCodeResponse } from '@/types'

// 用户登录
export const login = (data: LoginRequest): Promise<AuthResponse> => {
  return request.post('/account/login', data)
}

// 用户注册
export const register = (data: RegisterRequest): Promise<AuthResponse> => {
  return request.put('/account/register', data)
}

// 创建邀请码
export const createInviteCode = (): Promise<InviteCodeResponse> => {
  return request.get('/account/newInvitecode')
}
