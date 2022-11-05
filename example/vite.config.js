import { defineConfig } from 'vite';
import ReactPlugin from 'vite-preset-react';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
});
