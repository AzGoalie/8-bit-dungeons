const config = {
  stories: ["../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)"],
  staticDirs: ["../assets"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  core: {
    channelOptions: { allowFunction: false, maxDepth: 10 },
    disableTelemetry: true,
  },
  framework: {
    name: "@pixi/storybook-vite",
    options: {},
  },
};
export default config;
