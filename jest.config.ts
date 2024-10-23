import type { Config } from 'jest';

const config: Config = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  transform: {
    '^.+\\.(ts|js|html)$': ['jest-preset-angular', {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$"
    }]
  },
  collectCoverageFrom: [
    'src/app/**/*.ts', // Restringe a coleta de cobertura apenas para a pasta app
    '!**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!src/app/**/*.module.ts', // Exclui arquivos de módulo
    '!src/app/**/*.array.ts', // Exclui arquivos de array
    '!src/app/**/*.model.ts', // Exclui arquivos de modelo
    '!src/app/**/*.enum.ts', // Exclui arquivos de enum
    '!src/app/**/*.interface.ts' // Exclui arquivos de interface
  ],
  globalSetup: 'jest-preset-angular/global-setup',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  coverageReporters: ['html', 'lcov', 'text-summary'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/',
  reporters: [
    'default',
    ['jest-junit',
      {
        outputDirectory: '<rootDir>/coverage/junit',
        outputName: 'junit.xml'
      }
    ],
    ['jest-html-reporter', {
      pageTitle: 'Test Report',
      outputPath: '<rootDir>/coverage/html/test-report.html',
      includeFailureMsg: true,
      includeConsoleLog: true
    }]
  ],
};

export default config;    
