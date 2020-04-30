const tailwind = require("tailwindcss");
const purgecss = require("@fullhuman/postcss-purgecss");
const presetEnv = require("postcss-preset-env");

const purge = purgecss({
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const plugins =
  process.env.NODE_ENV === "production"
    ? [tailwind, purge, presetEnv]
    : [tailwind, presetEnv];

module.exports = {
  plugins,
};
