import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'soa145',
  downloadsFolder: './src/__e2e__/downloads',
  fixturesFolder: './src/__e2e__/fixtures',
  screenshotsFolder: './src/__e2e__/screenshots',
  video: false,
  videosFolder: './src/__e2e__/videos',
  e2e: {
    baseUrl: 'http://localhost:3001',
    specPattern: './src/**/__e2e__/*.spec.ts',
  },
});
