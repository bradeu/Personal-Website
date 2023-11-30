import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
      origin: 'http://localhost:5173',
    },
    build: {
      outDir: '../static',
      emptyOutDir: true,
      manifest: true,
      rollupOptions: {
          input: './src/main.jsx',
          output: {
              assetFileNames: (file) => {
                  if (String(file.name).endsWith('.css')) {
                      return `assets/css/[name].min.css`
                  }
                  
                  return 'assets/content/[name].[ext]'
              },
              entryFileNames: () => {
                  return 'assets/js/[name].min.js'
              }
          },
      }
    }
})
