import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This makes 'components/X' resolve to '/src/components/X'
      '@': path.resolve(__dirname, './src'),
      'components': path.resolve(__dirname, './src/components'),
      'layouts': path.resolve(__dirname, './src/layouts'),
      'views': path.resolve(__dirname, './src/views'),
      'constant': path.resolve(__dirname, './src/constant'),
      'stores': path.resolve(__dirname, './src/stores')
    }
  }
});