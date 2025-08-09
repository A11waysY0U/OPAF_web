<template>
  <div class="workflows-page">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <h2>工作流管理</h2>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="showAddDialog = true">
            <el-icon><Plus /></el-icon>
            新建工作流
          </el-button>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <!-- 搜索栏 -->
        <el-card class="search-card">
          <el-form :model="searchForm" inline>
            <el-form-item label="工作流名称">
              <el-input v-model="searchForm.name" placeholder="搜索工作流名称" />
            </el-form-item>
            <el-form-item label="类型标签">
              <el-input v-model="searchForm.typetag" placeholder="搜索类型标签" />
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker
                v-model="searchForm.timeRange"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="X"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click="resetSearch">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        
        <!-- 工作流列表 -->
        <el-card class="workflow-list-card">
          <template #header>
            <div class="card-header">
              <span>工作流列表</span>
              <div class="header-actions">
                <el-button @click="refreshList">刷新</el-button>
              </div>
            </div>
          </template>
          
          <el-table :data="workflowList" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="工作流名称" />
            <el-table-column prop="typetag" label="类型标签" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="180">
              <template #default="scope">
                {{ formatTime(scope.row.createTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="startTime" label="开始时间" width="180">
              <template #default="scope">
                {{ formatTime(scope.row.startTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="stopTime" label="结束时间" width="180">
              <template #default="scope">
                {{ formatTime(scope.row.stopTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="workDictionary" label="关联路径" width="150" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="viewWorkflow(scope.row)">查看</el-button>
                <el-button size="small" @click="editWorkflow(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteWorkflow(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    
    <!-- 新建工作流对话框 -->
    <el-dialog v-model="showAddDialog" title="新建工作流" width="600px">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="工作流名称">
          <el-input v-model="addForm.workflow.name" />
        </el-form-item>
        <el-form-item label="类型标签">
          <el-input v-model="addForm.workflow.typetag" />
        </el-form-item>
        <el-form-item label="关联路径">
          <el-input v-model="addForm.workflow.workDictionary" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="addForm.workflow.startTime"
            type="datetime"
            placeholder="选择开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="addForm.workflow.stopTime"
            type="datetime"
            placeholder="选择结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="addForm.workflow.postscript" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleAdd" :loading="adding">创建</el-button>
      </template>
    </el-dialog>
    
    <!-- 编辑工作流对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑工作流" width="600px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="工作流名称">
          <el-input v-model="editForm.tags.name" />
        </el-form-item>
        <el-form-item label="类型标签">
          <el-input v-model="editForm.tags.typetag" />
        </el-form-item>
        <el-form-item label="关联路径">
          <el-input v-model="editForm.tags.workDictionary" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker
            v-model="editForm.tags.startTime"
            type="datetime"
            placeholder="选择开始时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
          />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker
            v-model="editForm.tags.stopTime"
            type="datetime"
            placeholder="选择结束时间"
            format="YYYY-MM-DD HH:mm:ss"
            value-format="X"
          />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="editForm.tags.postscript" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="handleEdit" :loading="editing">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getWorkflowList, searchWorkflow, addWorkflow, modifyWorkflow, deleteWorkflow as deleteWorkflowApi } from '@/api/workflow'
import type { WorkflowTag } from '@/types'
import dayjs from 'dayjs'

// 加载状态
const loading = ref(false)
const adding = ref(false)
const editing = ref(false)

// 工作流列表
const workflowList = ref<WorkflowTag[]>([])

// 搜索表单
const searchForm = reactive({
  name: '',
  typetag: '',
  timeRange: [] as number[]
})

// 新建对话框
const showAddDialog = ref(false)
const addForm = reactive({
  workflow: {
    name: '',
    typetag: '',
    workDictionary: '',
    startTime: '',
    stopTime: '',
    postscript: ''
  }
})

// 编辑对话框
const showEditDialog = ref(false)
const editForm = reactive({
  tags: {
    id: 0,
    name: '',
    typetag: '',
    workDictionary: '',
    startTime: '',
    stopTime: '',
    postscript: ''
  }
})

// 格式化时间
const formatTime = (time: string) => {
  if (!time) return '-'
  return dayjs(parseInt(time) * 1000).format('YYYY-MM-DD HH:mm')
}

// 加载工作流列表
const loadWorkflowList = async () => {
  loading.value = true
  try {
    const response = await getWorkflowList()
    workflowList.value = response || []
  } catch (error) {
    ElMessage.error('加载工作流列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索工作流
const handleSearch = async () => {
  loading.value = true
  try {
    const searchData = {
      tags: {
        name: searchForm.name,
        typetag: searchForm.typetag,
        startTime: searchForm.timeRange[0]?.toString(),
        stopTime: searchForm.timeRange[1]?.toString()
      }
    }
    const response = await searchWorkflow(searchData)
    workflowList.value = response || []
  } catch (error) {
    ElMessage.error('搜索失败')
  } finally {
    loading.value = false
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.typetag = ''
  searchForm.timeRange = []
  loadWorkflowList()
}

// 刷新列表
const refreshList = () => {
  loadWorkflowList()
}

// 新建工作流
const handleAdd = async () => {
  if (!addForm.workflow.name) {
    ElMessage.error('请输入工作流名称')
    return
  }
  
  adding.value = true
  try {
    await addWorkflow(addForm)
    ElMessage.success('创建工作流成功')
    showAddDialog.value = false
    loadWorkflowList()
  } catch (error) {
    ElMessage.error('创建工作流失败')
  } finally {
    adding.value = false
  }
}

// 查看工作流
const viewWorkflow = (workflow: WorkflowTag) => {
  // 实现工作流详情查看逻辑
  ElMessage.info('工作流详情查看功能待实现')
}

// 编辑工作流
const editWorkflow = (workflow: WorkflowTag) => {
  editForm.tags = { ...workflow }
  showEditDialog.value = true
}

// 保存编辑
const handleEdit = async () => {
  editing.value = true
  try {
    await modifyWorkflow(editForm)
    ElMessage.success('保存成功')
    showEditDialog.value = false
    loadWorkflowList()
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    editing.value = false
  }
}

// 删除工作流
const deleteWorkflow = async (workflow: WorkflowTag) => {
  try {
    await ElMessageBox.confirm('确定要删除这个工作流吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await deleteWorkflowApi({ id: workflow.id?.toString() || '' })
    ElMessage.success('删除成功')
    loadWorkflowList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

onMounted(() => {
  loadWorkflowList()
})
</script>

<style scoped>
.workflows-page {
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

.main-content {
  background: #f5f5f5;
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.workflow-list-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 10px;
}
</style>
