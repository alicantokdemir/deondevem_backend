module.exports = {
    preset: 'ts-jest',
    moduleDirectories: ['node_modules', 'src'],
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
