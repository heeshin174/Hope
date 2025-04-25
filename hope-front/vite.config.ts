import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This makes 'components/X' resolve to '/src/components/X'
      '@': path.resolve(__dirname, './src'), // 앞에 'import { ... } from @/apis/...'
      'apis': path.resolve(__dirname, './src/apis'), 
      'components': path.resolve(__dirname, './src/components'),
      'constant': path.resolve(__dirname, './src/constant'),
      'layouts': path.resolve(__dirname, './src/layouts'),
      'mocks': path.resolve(__dirname, './src/mocks'),
      'stores': path.resolve(__dirname, './src/stores'),
      'utils': path.resolve(__dirname, './src/utils'),
      'views': path.resolve(__dirname, './src/views')
    }
  }
});