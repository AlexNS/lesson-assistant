import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const { PORT = 3000 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
      '/p': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      input: {
        'frontend-admin': resolve(__dirname, 'frontend-admin.html'),
      },
    },
    assetsDir: '.',
    outDir: resolve(__dirname, 'public'),
  },
  plugins: [react()],
  preview: {
    appType: 'mpa',
    open: 'http://localhost:4173/src/frontend/admin/index.html'
  },
  publicDir: resolve(__dirname, 'src/static'),
})
