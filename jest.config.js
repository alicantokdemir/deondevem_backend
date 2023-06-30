module.exports = {
    preset: 'ts-jest',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '^@db(.*)$': '<rootDir>/src/db$1',
        '^@errors(.*)$': '<rootDir>/src/errors$1',
        '^@middleware(.*)$': '<rootDir>/src/middleware$1',
        '^@features(.*)$': '<rootDir>/src/features$1',
        '^@test(.*)$': '<rootDir>/src/test$1',
        '^@server': '<rootDir>/src/server',
        '^@types': '<rootDir>/src/types',
    },
    verbose: true,
    setupFilesAfterEnv: ['./src/test/setup-env.ts'],
    testPathIgnorePatterns: ['node_modules', 'dist', '__tests__'],
    collectCoverageFrom: ['./src/**/*.ts'],
    coveragePathIgnorePatterns: [
        '__tests__',
        'test',
        'router.ts$',
        'Repository.ts$',
        'knexfile.ts$',
        'src/configurePassport.ts',
        'src/index.ts',
        'src/server.ts',
    ],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
