import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- This line was missing!

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // This redirects any request starting with /api to your Java backend
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    // Traffic for Payment Service (Razorpay, Orders)
    '/payments': {
      target: 'http://localhost:8081',
      changeOrigin: true,
      secure: false,
      // Optional: If your Java controller uses /api/payment, 
      // this rewrites /payments/foo to /api/payment/foo
      rewrite: (path) => path.replace(/^\/payments/, '/api') 
    }
    }
  }
})