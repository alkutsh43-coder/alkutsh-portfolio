import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures assets load correctly from any subfolder or local path
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: false
  }
})
