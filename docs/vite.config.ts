import { defineConfig } from 'vite'

export default defineConfig(() => ({
  server: {
    proxy: {
      '/hashmap.json': {
        target: 'https://ziuchen.github.io',
        changeOrigin: true
      }
    }
  }
}))
