import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string>('')

  // 设置用户信息
  const setUser = (userInfo: User) => {
    user.value = userInfo
  }

  // 设置token
  const setToken = (tokenValue: string) => {
    token.value = tokenValue
    localStorage.setItem('token', tokenValue)
  }

  // 获取token
  const getToken = (): string => {
    if (!token.value) {
      token.value = localStorage.getItem('token') || ''
    }
    return token.value
  }

  // 清除用户信息
  const clearUser = () => {
    user.value = null
    token.value = ''
    localStorage.removeItem('token')
  }

  // 检查是否已登录
  const isLoggedIn = (): boolean => {
    return !!getToken()
  }

  return {
    user,
    token,
    setUser,
    setToken,
    getToken,
    clearUser,
    isLoggedIn
  }
})
