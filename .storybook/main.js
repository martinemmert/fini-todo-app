const path = require("path");

module.exports = {
  stories: [
    "../components/**/*.stories.tsx",
    "../pages/**/*.stories.tsx",
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-viewport/register",
    "@storybook/addon-backgrounds/register",
    "@storybook/addon-knobs/register",
    // disabled until the react props table is not a book anymore
    // "@storybook/addon-docs",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: {
            configFile: path.resolve("__dirname", "..", "tsconfig.storybook.json")
          }
        },
        // disabled until the react props table is not a book anymore
        // {
        //   loader: require.resolve("react-docgen-typescript-loader"),
        // },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
