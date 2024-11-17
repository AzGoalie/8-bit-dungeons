import { Meta, PixiStory, StoryObj, StoryFn } from "@pixi/storybook-renderer";
import Frame, { FrameProps } from "../ui/Frame";

const meta: Meta<FrameProps> = {
  argTypes: {
    width: { control: { type: "range", min: 0, max: 1000, step: 1 } },
    height: { control: { type: "range", min: 0, max: 1000, step: 1 } },
  },
};

export default meta;

const FrameStory: StoryFn<FrameProps> = (options, context) =>
  new PixiStory({
    context,
    init: (view) => {
      const frame = new Frame(options);
      view.addChild(frame);
    },
    resize: (view, width, height) => {
      const frame = view.children[0];
      frame.x = width / 2 - frame.width / 2;
      frame.y = height / 2 - frame.height / 2;
    },
  });

interface FrameStoryProps extends FrameProps {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
}
export const ExampleFrame: StoryObj<FrameStoryProps> = {
  render: ({ strokeColor, strokeWidth, fillColor, ...options }, context) => {
    options.fillStyle = { color: fillColor };
    options.strokeStyle = { color: strokeColor, width: strokeWidth };
    return FrameStory(options, context);
  },
  args: {
    width: 224,
    height: 64,
    strokeColor: "#000",
    strokeWidth: 4,
    fillColor: "#aaa",
  },
  argTypes: {
    fillColor: { control: "color" },
    strokeColor: { control: "color" },
    strokeWidth: { control: "range", min: 0, max: 1000 },
  },
};

export const TransparentFill: StoryObj<FrameProps> = {
  render: FrameStory,
  args: {
    width: 224,
    height: 64,
    fillStyle: {
      color: "transparent",
    },
    strokeStyle: {
      color: "#000",
      width: 4,
    },
  },
};

export const TransparentStroke: StoryObj<FrameStoryProps> = {
  render: FrameStory,
  args: {
    width: 224,
    height: 64,
    fillStyle: { color: "#aaa" },
    strokeStyle: { color: "transparent" },
  },
};
