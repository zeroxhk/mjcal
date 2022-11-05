import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import { copyFileWithinBundle } from '../../vite-plugin-copy-file-within-bundle';
import { injectGa } from '../../vite-plugin-inject-ga';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
  },
  plugins: [
    react(), //
    injectGa('G-8BRGZ1YGE1'),
    copyFileWithinBundle('index.html', '404.html'),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/*.test.{ts,tsx}'],
    setupFiles: 'test/setup.ts',
  },
});
