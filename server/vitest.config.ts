import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Set environment to 'node' for backend testing
    environment: 'node',

    maxWorkers: 1,

    fileParallelism: false,

    maxConcurrency: 1,

    isolate: false,
  },
});
