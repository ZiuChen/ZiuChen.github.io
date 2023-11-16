import { nextTick, watch } from 'vue'
import { useRoute } from 'vitepress'
import mediumZoom from 'medium-zoom'

export function setupMediumZoom() {
  if (import.meta.env.SSR) return

  const route = useRoute()
  watch(
    () => route.path,
    () => {
      nextTick(() => mediumZoom('.main img', { background: 'var(--vp-c-bg)' }))
    },
    { immediate: true }
  )
}
