<template>
  <div class="dashboard">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <h2>OPAF 文件管理系统</h2>
        </div>
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-icon><User /></el-icon>
              {{ userStore.user?.name || '用户' }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      
      <el-container>
        <el-aside width="200px" class="sidebar">
          <el-menu
            :default-active="activeMenu"
            class="sidebar-menu"
            @select="handleMenuSelect"
          >
            <el-menu-item index="/dashboard">
              <el-icon><DataBoard /></el-icon>
              <span>仪表板</span>
            </el-menu-item>
            <el-menu-item index="/files">
              <el-icon><Folder /></el-icon>
              <span>文件管理</span>
            </el-menu-item>
            <el-menu-item index="/workflows">
              <el-icon><Connection /></el-icon>
              <span>工作流</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <el-main class="main-content">
          <div class="dashboard-content">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-content">
                    <div class="stat-icon">
                      <el-icon><Folder /></el-icon>
                    </div>
                    <div class="stat-info">
                      <div class="stat-number">{{ stats.fileCount }}</div>
                      <div class="stat-label">文件总数</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-content">
                    <div class="stat-icon">
                      <el-icon><Connection /></el-icon>
                    </div>
                    <div class="stat-info">
                      <div class="stat-number">{{ stats.workflowCount }}</div>
                      <div class="stat-label">工作流总数</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
              
              <el-col :span="8">
                <el-card class="stat-card">
                  <div class="stat-content">
                    <div class="stat-icon">
                      <el-icon><User /></el-icon>
                    </div>
                    <div class="stat-info">
                      <div class="stat-number">{{ stats.userCount }}</div>
                      <div class="stat-label">用户总数</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            
            <el-row :gutter="20" style="margin-top: 20px;">
              <el-col :span="12">
                <el-card>
                  <template #header>
                    <span>最近文件</span>
                  </template>
                  <el-table :data="recentFiles" style="width: 100%">
                    <el-table-column prop="name" label="文件名" />
                    <el-table-column prop="time" label="时间" width="180">
                      <template #default="scope">
                        {{ formatTime(scope.row.time) }}
                      </template>
                    </el-table-column>
                  </el-table>
                </el-card>
              </el-col>
              
              <el-col :span="12">
                <el-card>
                  <template #header>
                    <span>活跃工作流</span>
                  </template>
                  <el-table :data="activeWorkflows" style="width: 100%">
                    <el-table-column prop="name" label="工作流名称" />
                    <el-table-column prop="typetag" label="类型" width="100" />
                  </el-table>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/user'
import { getFileList } from '@/api/files'
import { getWorkflowList } from '@/api/workflow'
import dayjs from 'dayjs'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 统计数据
const stats = reactive({
  fileCount: 0,
  workflowCount: 0,
  userCount: 0
})

// 最近文件
const recentFiles = ref([])

// 活跃工作流
const activeWorkflows = ref([])

// 处理菜单选择
const handleMenuSelect = (index: string) => {
  router.push(index)
}

// 处理用户命令
const handleCommand = async (command: string) => {
  if (command === 'logout') {
    try {
      await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      
      userStore.clearUser()
      ElMessage.success('已退出登录')
      router.push('/login')
    } catch {
      // 用户取消
    }
  }
}

// 格式化时间
const formatTime = (time: string) => {
  if (!time) return '-'
  return dayjs(parseInt(time) * 1000).format('YYYY-MM-DD HH:mm')
}

// 加载数据
const loadData = async () => {
  try {
    // 加载文件列表
    const fileResponse = await getFileList()
    stats.fileCount = fileResponse.files?.length || 0
    recentFiles.value = fileResponse.files?.slice(0, 5) || []
    
    // 加载工作流列表
    const workflowResponse = await getWorkflowList()
    stats.workflowCount = workflowResponse?.length || 0
    activeWorkflows.value = workflowResponse?.slice(0, 5) || []
    
  } catch (error) {
    console.error('加载数据失败:', error)
  }
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.dashboard {
  height: 100vh;
}

.header {
  background: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.header-left h2 {
  margin: 0;
  color: #333;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #f5f5f5;
}

.user-info .el-icon {
  margin: 0 4px;
}

.sidebar {
  background: #fff;
  border-right: 1px solid #e6e6e6;
}

.sidebar-menu {
  border-right: none;
}

.main-content {
  background: #f5f5f5;
  padding: 20px;
}

.dashboard-content {
  max-width: 1200px;
  margin: 0 auto;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 48px;
  color: #409eff;
  margin-right: 20px;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 32px;
  font-weight: bold;
  color: #333;
  line-height: 1;
}

.stat-label {
  font-size: 14px;
  color: #666;
  margin-top: 8px;
}
</style>
