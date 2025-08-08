/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
const config: Config = {
  // moduleNameMapper: {
  //   '^jose': require.resolve('jose'),
  // },
  // Stop running tests after `n` failures
  bail: 3,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,

  errorOnDeprecated: true,

  // The root directory that Jest should scan for tests and modules within
  rootDir: './',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  // The number of seconds after which a test is considered as slow and reported as such in the results.
  slowTestThreshold: 5,

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Indicates whether each individual test should be reported during the run
  // verbose: undefined,
};
module.exports = createJestConfig(config);
