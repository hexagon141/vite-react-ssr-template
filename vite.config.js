import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: "src/app",
  plugins: [react()],
  build: {
    minify: false
  }
});
