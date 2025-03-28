module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    forceExit: true,
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!dist/src/tests/*.js' // Exclude .js files
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/dist/' // Ignore all files within the dist folder
    ]
  }