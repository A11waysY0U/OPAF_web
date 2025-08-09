<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>OPAF 文件管理系统</h2>
        <p>请登录您的账户</p>
      </div>
      
      <el-form 
        ref="loginFormRef" 
        :model="loginForm" 
        :rules="loginRules" 
        class="login-form"
        @submit.prevent="handleLogin"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <CloudflareTurnstile
            :site-key="turnstileSiteKey"
            @success="onTurnstileSuccess"
            @error="onTurnstileError"
            @expired="onTurnstileExpired"
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            :loading="loading"
            class="login-button"
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
        
        <div class="login-footer">
          <span>还没有账户？</span>
          <el-link type="primary" @click="$router.push('/register')">
            立即注册
          </el-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { login } from '@/api/auth'
import CloudflareTurnstile from '@/components/CloudflareTurnstile.vue'

const router = useRouter()
const userStore = useUserStore()

// 表单引用
const loginFormRef = ref<FormInstance>()

// 加载状态
const loading = ref(false)

// 人机验证token
const authToken = ref('')

// Cloudflare Turnstile站点密钥（需要替换为实际的密钥）
const turnstileSiteKey = '0x4AAAAAABp1nO6DkYADuZXf'

// 登录表单
const loginForm = reactive({
  username: '',
  password: ''
})

// 表单验证规则
const loginRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
}

// 人机验证成功
const onTurnstileSuccess = (token: string) => {
  authToken.value = token
}

// 人机验证错误
const onTurnstileError = () => {
  ElMessage.error('人机验证失败，请重试')
}

// 人机验证过期
const onTurnstileExpired = () => {
  ElMessage.warning('人机验证已过期，请重新验证')
  authToken.value = ''
}

// 处理登录
const handleLogin = async () => {
  if (!authToken.value) {
    ElMessage.error('请完成人机验证')
    return
  }
  
  try {
    await loginFormRef.value?.validate()
    
    loading.value = true
    
    const response = await login({
      username: loginForm.username,
      password: loginForm.password,
      authToken: authToken.value
    })
    
    if (response.token) {
      userStore.setToken(response.token)
      ElMessage.success('登录成功')
      router.push('/dashboard')
    } else {
      ElMessage.error(response.reason || '登录失败')
    }
  } catch (error: any) {
    ElMessage.error(error.message || '登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h2 {
  color: #333;
  margin-bottom: 10px;
}

.login-header p {
  color: #666;
  font-size: 14px;
}

.login-form {
  width: 100%;
}

.login-button {
  width: 100%;
}

.login-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.login-footer span {
  margin-right: 5px;
}
</style>
