import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        // rewrite '/api/*' -> '/*' so backend without '/api' still works
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Also support backends without '/api' prefix
      '/new-list': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
