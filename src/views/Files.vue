<template>
  <div class="files-page">
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <h2>文件管理</h2>
        </div>
        <div class="header-right">
          <el-button type="primary" @click="showUploadDialog = true">
            <el-icon><Upload /></el-icon>
            上传文件
          </el-button>
        </div>
      </el-header>
      
      <el-main class="main-content">
        <!-- 搜索栏 -->
        <el-card class="search-card">
          <el-form :model="searchForm" inline>
            <el-form-item label="文件名">
              <el-input v-model="searchForm.name" placeholder="搜索文件名" />
            </el-form-item>
            <el-form-item label="特殊标签">
              <el-select v-model="searchForm.specialtag" placeholder="选择标签" clearable>
                <el-option label="星标" value="star" />
                <el-option label="待处理" value="pending" />
                <el-option label="已完成" value="completed" />
              </el-select>
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
        
        <!-- 文件列表 -->
        <el-card class="file-list-card">
          <template #header>
            <div class="card-header">
              <span>文件列表</span>
              <div class="header-actions">
                <el-button @click="refreshList">刷新</el-button>
              </div>
            </div>
          </template>
          
          <el-table :data="fileList" style="width: 100%" v-loading="loading">
            <el-table-column prop="name" label="文件名" />
            <el-table-column prop="time" label="时间" width="180">
              <template #default="scope">
                {{ formatTime(scope.row.time) }}
              </template>
            </el-table-column>
            <el-table-column prop="belong" label="所属工作流" width="120" />
            <el-table-column prop="specialtag" label="特殊标签" width="100">
              <template #default="scope">
                <el-tag v-if="scope.row.specialtag" :type="getTagType(scope.row.specialtag)">
                  {{ scope.row.specialtag }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="objective" label="拍摄对象" width="120" />
            <el-table-column label="操作" width="200" fixed="right">
              <template #default="scope">
                <el-button size="small" @click="viewFile(scope.row)">查看</el-button>
                <el-button size="small" @click="editFile(scope.row)">编辑</el-button>
                <el-button size="small" type="danger" @click="deleteFile(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-main>
    </el-container>
    
    <!-- 上传文件对话框 -->
    <el-dialog v-model="showUploadDialog" title="上传文件" width="500px">
      <el-form :model="uploadForm" label-width="100px">
        <el-form-item label="文件">
          <el-upload
            ref="uploadRef"
            :auto-upload="false"
            :on-change="handleFileChange"
            :limit="1"
          >
            <el-button type="primary">选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="文件名">
          <el-input v-model="uploadForm.tag.name" />
        </el-form-item>
        <el-form-item label="特殊标签">
          <el-select v-model="uploadForm.tag.specialtag" placeholder="选择标签">
            <el-option label="星标" value="star" />
            <el-option label="待处理" value="pending" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="拍摄对象">
          <el-input v-model="uploadForm.tag.objective" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="uploadForm.tag.postscript" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showUploadDialog = false">取消</el-button>
        <el-button type="primary" @click="handleUpload" :loading="uploading">上传</el-button>
      </template>
    </el-dialog>
    
    <!-- 编辑文件对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑文件" width="500px">
      <el-form :model="editForm" label-width="100px">
        <el-form-item label="文件名">
          <el-input v-model="editForm.tags.name" />
        </el-form-item>
        <el-form-item label="特殊标签">
          <el-select v-model="editForm.tags.specialtag" placeholder="选择标签">
            <el-option label="星标" value="star" />
            <el-option label="待处理" value="pending" />
            <el-option label="已完成" value="completed" />
          </el-select>
        </el-form-item>
        <el-form-item label="拍摄对象">
          <el-input v-model="editForm.tags.objective" />
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
import { getFileList, searchFiles, uploadFile, modifyFileTag, deleteFile as deleteFileApi } from '@/api/files'
import type { FileTag } from '@/types'
import dayjs from 'dayjs'

// 加载状态
const loading = ref(false)
const uploading = ref(false)
const editing = ref(false)

// 文件列表
const fileList = ref<FileTag[]>([])

// 搜索表单
const searchForm = reactive({
  name: '',
  specialtag: '',
  timeRange: [] as number[]
})

// 上传对话框
const showUploadDialog = ref(false)
const uploadRef = ref()
const uploadForm = reactive({
  tag: {
    name: '',
    specialtag: '',
    objective: '',
    postscript: ''
  },
  md5: '',
  path: ''
})

// 编辑对话框
const showEditDialog = ref(false)
const editForm = reactive({
  tags: {
    name: '',
    specialtag: '',
    objective: '',
    postscript: ''
  },
  path: ''
})

// 格式化时间
const formatTime = (time: string) => {
  if (!time) return '-'
  return dayjs(parseInt(time) * 1000).format('YYYY-MM-DD HH:mm')
}

// 获取标签类型
const getTagType = (tag: string) => {
  switch (tag) {
    case 'star': return 'warning'
    case 'pending': return 'info'
    case 'completed': return 'success'
    default: return ''
  }
}

// 加载文件列表
const loadFileList = async () => {
  loading.value = true
  try {
    const response = await getFileList()
    fileList.value = response.files || []
  } catch (error) {
    ElMessage.error('加载文件列表失败')
  } finally {
    loading.value = false
  }
}

// 搜索文件
const handleSearch = async () => {
  loading.value = true
  try {
    const searchData = {
      tag: {
        name: searchForm.name,
        specialtag: searchForm.specialtag,
        rangeStartTime: searchForm.timeRange[0]?.toString(),
        rangeStopTime: searchForm.timeRange[1]?.toString()
      }
    }
    const response = await searchFiles(searchData)
    fileList.value = response || []
  } catch (error) {
    ElMessage.error('搜索失败')
  } finally {
    loading.value = false
  }
}

// 重置搜索
const resetSearch = () => {
  searchForm.name = ''
  searchForm.specialtag = ''
  searchForm.timeRange = []
  loadFileList()
}

// 刷新列表
const refreshList = () => {
  loadFileList()
}

// 文件选择
const handleFileChange = (file: any) => {
  uploadForm.tag.name = file.name
  uploadForm.path = file.name
  // 这里应该计算文件的MD5，简化处理
  uploadForm.md5 = 'temp-md5'
}

// 上传文件
const handleUpload = async () => {
  if (!uploadForm.tag.name) {
    ElMessage.error('请选择文件')
    return
  }
  
  uploading.value = true
  try {
    await uploadFile(uploadForm)
    ElMessage.success('上传成功')
    showUploadDialog.value = false
    loadFileList()
  } catch (error) {
    ElMessage.error('上传失败')
  } finally {
    uploading.value = false
  }
}

// 查看文件
const viewFile = (file: FileTag) => {
  // 实现文件预览逻辑
  ElMessage.info('文件预览功能待实现')
}

// 编辑文件
const editFile = (file: FileTag) => {
  editForm.tags = { ...file }
  editForm.path = file.name || ''
  showEditDialog.value = true
}

// 保存编辑
const handleEdit = async () => {
  editing.value = true
  try {
    await modifyFileTag(editForm)
    ElMessage.success('保存成功')
    showEditDialog.value = false
    loadFileList()
  } catch (error) {
    ElMessage.error('保存失败')
  } finally {
    editing.value = false
  }
}

// 删除文件
const deleteFile = async (file: FileTag) => {
  try {
    await ElMessageBox.confirm('确定要删除这个文件吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    await deleteFileApi({ path: file.name || '' })
    ElMessage.success('删除成功')
    loadFileList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

onMounted(() => {
  loadFileList()
})
</script>

<style scoped>
.files-page {
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

.file-list-card {
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
