const preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "dark",
    },
    pixi: {
      applicationOptions: {
        backgroundAlpha: 0,
        autoDensity: true,
        resolution: devicePixelRatio,
      },
    },
  },
};

export default preview;
