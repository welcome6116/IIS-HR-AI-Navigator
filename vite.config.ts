
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  define: {
    // 這能讓程式碼中的 process.env.API_KEY 正常運作
    'process.env': process.env
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
