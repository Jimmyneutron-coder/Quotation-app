import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          // Keep the heavy PDF-generation libraries in their own chunk,
          // separate from the main app bundle.
          pdf: ['jspdf', 'html2canvas'],
        },
      },
    },
  },
})
