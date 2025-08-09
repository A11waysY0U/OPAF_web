import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/files',
      name: 'Files',
      component: () => import('@/views/Files.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/workflows',
      name: 'Workflows',
      component: () => import('@/views/Workflows.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  // 检查本地存储中的token来判断登录状态
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isLoggedIn) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router
