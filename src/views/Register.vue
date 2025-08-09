<template>
  <div class="register-container">
    <div class="register-box">
      <div class="register-header">
        <h2>OPAF 文件管理系统</h2>
        <p>创建新账户</p>
      </div>
      
      <el-form 
        ref="registerFormRef" 
        :model="registerForm" 
        :rules="registerRules" 
        class="register-form"
        @submit.prevent="handleRegister"
      >
        <el-form-item prop="username">
          <el-input
            v-model="registerForm.username"
            placeholder="用户名"
            prefix-icon="User"
            size="large"
          />
        </el-form-item>
        
        <el-form-item prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="确认密码"
            prefix-icon="Lock"
            size="large"
            show-password
          />
        </el-form-item>
        
        <el-form-item prop="inviteCode">
          <el-input
            v-model="registerForm.inviteCode"
            placeholder="邀请码"
            prefix-icon="Key"
            size="large"
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
            class="register-button"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
        
        <div class="register-footer">
          <span>已有账户？</span>
          <el-link type="primary" @click="$router.push('/login')">
            立即登录
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
import { register } from '@/api/auth'
import CloudflareTurnstile from '@/components/CloudflareTurnstile.vue'
import config from '../../config.js'

const router = useRouter()
const userStore = useUserStore()

// 表单引用
const registerFormRef = ref<FormInstance>()

// 加载状态
const loading = ref(false)

// 人机验证token
const authToken = ref('')

// Cloudflare Turnstile站点密钥
const turnstileSiteKey = config.turnstile.siteKey

// 注册表单
const registerForm = reactive({
  username: '',
  password: '',
  confirmPassword: '',
  inviteCode: ''
})

// 表单验证规则
const registerRules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在3到20个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ],
  inviteCode: [
    { required: true, message: '请输入邀请码', trigger: 'blur' }
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

// 处理注册
const handleRegister = async () => {
  if (!authToken.value) {
    ElMessage.error('请完成人机验证')
    return
  }
  
  try {
    await registerFormRef.value?.validate()
    
    loading.value = true
    
    const response = await register({
      username: registerForm.username,
      password: registerForm.password,
      authToken: authToken.value,
      inviteCode: registerForm.inviteCode
    })
    
    if (response.status === '0') {
      ElMessage.success('注册成功')
      if (response.token) {
        userStore.setToken(response.token)
        router.push('/dashboard')
      } else {
        router.push('/login')
      }
    } else {
      ElMessage.error(response.reason || '注册失败')
    }
  } catch (error: any) {
    ElMessage.error(error.message || '注册失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-box {
  width: 400px;
  padding: 40px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
}

.register-header {
  text-align: center;
  margin-bottom: 30px;
}

.register-header h2 {
  color: #333;
  margin-bottom: 10px;
}

.register-header p {
  color: #666;
  font-size: 14px;
}

.register-form {
  width: 100%;
}

.register-button {
  width: 100%;
}

.register-footer {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.register-footer span {
  margin-right: 5px;
}
</style>
