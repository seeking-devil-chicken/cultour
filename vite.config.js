// vite.config.js
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

    // Change this line:
    // The default was finding ALL test files
    include: ['__tests__/**/*.test.{js,ts,jsx,tsx}'],
  },
});
