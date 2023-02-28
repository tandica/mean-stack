module.exports = {
  preset: "jest-preset-angular",
  roots: ["src"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  setupFilesAfterEnv: ["<rootDir>/src/setupJest.ts"],
  coverageReporters: ["html"],
  coverageDirectory: "coverage/my-app",
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!src/app/**/index.ts",
    "!src/app/**/*.module.ts",
    "!src/app/**/*.interface.ts",
    "!src/app/**/*.enum.ts",
  ],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json", "node", "mjs"],
};
