module.exports = {
  preset: "ts-jest/presets/js-with-ts",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.js"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.jest.json",
    },
  },
  transform: {
    '^.+\\.stories\\.[tj]sx?$': '@storybook/addon-storyshots/injectFileName',
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
