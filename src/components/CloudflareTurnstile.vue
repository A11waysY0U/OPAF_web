<template>
  <div class="turnstile-container">
    <div 
      ref="turnstileRef" 
      class="cf-turnstile"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  siteKey: string
}

interface Emits {
  (e: 'success', token: string): void
  (e: 'error'): void
  (e: 'expired'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const turnstileRef = ref<HTMLElement>()
let widgetId: string | null = null

// 成功回调
const onSuccess = (token: string) => {
  emit('success', token)
}

// 错误回调
const onError = () => {
  emit('error')
}

// 过期回调
const onExpired = () => {
  emit('expired')
}

// 重置验证
const reset = () => {
  if ((window as any).turnstile && widgetId) {
    (window as any).turnstile.reset(widgetId)
  }
}

// 渲染验证组件
const render = () => {
  if ((window as any).turnstile && turnstileRef.value) {
    widgetId = (window as any).turnstile.render(turnstileRef.value, {
      sitekey: props.siteKey,
      callback: onSuccess,
      'error-callback': onError,
      'expired-callback': onExpired,
      theme: 'light'
    })
  }
}

onMounted(() => {
  // 检查是否已经加载了脚本
  const existingScript = document.querySelector('script[src*="turnstile"]')
  
  if (!(window as any).turnstile && !existingScript) {
    // 动态加载Cloudflare Turnstile脚本
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = render
    document.head.appendChild(script)
  } else if ((window as any).turnstile) {
    // 脚本已加载，直接渲染
    render()
  } else if (existingScript) {
    // 脚本正在加载中，等待加载完成
    existingScript.addEventListener('load', render)
  }
})

onUnmounted(() => {
  if ((window as any).turnstile && widgetId) {
    (window as any).turnstile.remove(widgetId)
  }
})

// 暴露方法给父组件
defineExpose({
  reset
})
</script>

<style scoped>
.turnstile-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.cf-turnstile {
  margin: 0 auto;
}
</style>


