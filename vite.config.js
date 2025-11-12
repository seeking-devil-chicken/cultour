import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './client/src/setupTests.ts',
    include: ['client/src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },
});
