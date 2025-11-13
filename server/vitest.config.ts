import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      // this env variable ensures that the tests never alter our "real" database, only our test database
      NODE_ENV: 'test',
      // providing a different port for the server during testing ensures that the tests remain reliable even if the server is currently running in development
      PORT: '3001',
    },
    setupFiles: './__tests__/setup.ts',
    // set the environment to jsdom here
    environment: 'jsdom',
  },
});
