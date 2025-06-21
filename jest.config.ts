import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/index.ts',
        '!src/server.ts',
        '!src/**/*.d.ts',
    ],
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                useESM: true,
            },
        ],
    },
    moduleNameMapper: {
        '^@src/(.*)$': '<rootDir>/src/$1',
        '^@/application/(.*)$': '<rootDir>/src/application/$1',
        '^@/domain/(.*)$': '<rootDir>/src/domain/$1',
        '^@/infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
        '^@/presentation/(.*)$': '<rootDir>/src/presentation/$1',
        '^@/config/(.*)$': '<rootDir>/src/config/$1',
    },
    // setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
};

export default config;