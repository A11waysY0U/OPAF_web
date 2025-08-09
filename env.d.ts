/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 扩展Window接口以支持Cloudflare Turnstile
declare global {
  interface Window {
    turnstile: {
      render: (container: HTMLElement, options: any) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}
