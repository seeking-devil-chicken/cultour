// server/vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Set environment to 'node' for backend testing
    environment: 'node',

    // Optional: Define setup file for db mocks or globals
    // setupFiles: './__tests__/setup.ts',

    // Optional: Run tests serially if they access the same test db
    // singleThread: true,
  },
});
