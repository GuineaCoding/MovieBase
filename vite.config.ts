import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    sourcemap: true, 
  },
  optimizeDeps: {
    exclude: [
      'chunk-ENK6PFG5.js?v=778a2817'
    ]
  }
})
