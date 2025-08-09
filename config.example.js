// 配置文件示例
// 复制此文件为 config.js 并修改相应配置

export default {
  // 后端API地址
  apiBaseUrl: 'http://localhost:8080',
  
  // Cloudflare Turnstile 站点密钥
  turnstileSiteKey: 'your_turnstile_site_key_here',
  
  // 应用标题
  appTitle: 'OPAF 文件管理系统',
  
  // 上传文件大小限制 (MB)
  maxFileSize: 100,
  
  // 支持的文件类型
  allowedFileTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'application/pdf',
    'text/plain',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
}
