<template>
  <div class="turnstile-container">
    <div 
      ref="turnstileRef" 
      class="cf-turnstile"
      :data-sitekey="siteKey"
      :data-callback="onSuccess"
      :data-error-callback="onError"
      :data-expired-callback="onExpired"
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
  if (window.turnstile && widgetId) {
    window.turnstile.reset(widgetId)
  }
}

// 渲染验证组件
const render = () => {
  if (window.turnstile && turnstileRef.value) {
    widgetId = window.turnstile.render(turnstileRef.value, {
      sitekey: props.siteKey,
      callback: onSuccess,
      'error-callback': onError,
      'expired-callback': onExpired,
      theme: 'light'
    })
  }
}

onMounted(() => {
  // 动态加载Cloudflare Turnstile脚本
  if (!window.turnstile) {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = render
    document.head.appendChild(script)
  } else {
    render()
  }
})

onUnmounted(() => {
  if (window.turnstile && widgetId) {
    window.turnstile.remove(widgetId)
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


