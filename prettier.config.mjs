/** @type {import("prettier").Config} */

export default {
  useTabs: false,
  tabWidth: 4,
  trailingComma: "es5",
  printWidth: 128,
  semi: true,
  singleQuote: false,
  bracketSpacing: true,
  tailwindAttributes: ["class", "class:list", ":class", "x-bind:class"],
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss",
  ],
  overrides: [
    {
      files: ".astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
