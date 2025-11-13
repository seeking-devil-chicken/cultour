// server/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Set environment to 'node' for backend testing
    environment: 'node',

    // Add this line:
    // Only include test files inside the 'server' directory
    include: ['server/__tests__/**/*.test.ts'],

    // Your sequential settings are good
    maxWorkers: 1,
    fileParallelism: false,
    maxConcurrency: 1,
    isolate: false,
  },
});
