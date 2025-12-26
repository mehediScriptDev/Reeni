import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable code-splitting for better caching & async loading
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Firebase is the biggest culprit - isolate it
          if (id.includes('firebase')) return 'firebase';
          // React core
          if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
          if (id.includes('node_modules/react/')) return 'react-core';
          // Heavy vendor libs loaded on-demand
          if (id.includes('sweetalert2')) return 'swal';
          if (id.includes('react-icons')) return 'icons';
          if (id.includes('axios') || id.includes('react-tabs')) return 'vendor';
          if (id.includes('framer-motion')) return 'motion';
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2, // Multiple passes for better compression
      },
    },
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
    target: 'esnext', // Modern browsers only for smaller bundles
    modulePreload: {
      polyfill: false, // Skip polyfill for modern browsers
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/new-list': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
})
