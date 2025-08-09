// 全局配置文件
export default {
  // API配置
  api: {
    baseURL: '/api',
    timeout: 10000
  },
  
  // Cloudflare Turnstile配置
  turnstile: {
    siteKey: '0x4AAAAAABp1nO6DkYADuZXf'
  },
  
  // 文件上传配置
  upload: {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['image/*', 'video/*', 'application/pdf', 'text/*']
  },
  
  // 分页配置
  pagination: {
    defaultPageSize: 20,
    pageSizeOptions: [10, 20, 50, 100]
  }
}
