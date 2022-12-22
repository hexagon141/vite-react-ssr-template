import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  root: 'src/app',
  plugins: [react()],
  build: {
    minify: false
  },
  server: {
    host: true,
    hmr: {
      port: 2810,
    },
  }
});
