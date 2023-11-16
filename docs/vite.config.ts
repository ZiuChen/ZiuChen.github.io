import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig(() => ({
  server: {
    proxy: {
      '/hashmap.json': {
        target: 'https://ziuchen.github.io',
        changeOrigin: true
      }
    }
  },
  plugins: [vueJsx()]
}))
