import { compilerOptions } from './tsconfig.json';

export default {
  roots: [
    'src',
  ],
  modulePaths: [compilerOptions.baseUrl],
  resetMocks: true,
  coverageProvider: 'v8',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  coverageReporters: ['text', 'lcov'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
  ],
  testMatch: [
    '**/__tests__/**/*.test.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/__tests__/**',
    '!src/index.ts',
    '!src/server.ts',
  ],
  testEnvironment: 'node',
};
