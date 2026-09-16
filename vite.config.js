import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages serves this repository as a project site.
  base: '/alkutsh-portfolio/',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    open: false,
  },
})
