import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',          // so "@/styles/..." works
      '@styles': '/src/styles',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // prepended to EVERY scss file automatically
        additionalData: `@use "@styles/index" as *;`,
      },
    },
  },
});
