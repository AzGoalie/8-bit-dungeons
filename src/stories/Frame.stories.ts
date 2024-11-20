import { Meta, StoryObj } from "@pixi/storybook-renderer";
import Frame, { FrameProps } from "../ui/Frame";
import { ComponentStory } from "./utils";

const meta: Meta<FrameProps> = {
  argTypes: {
    width: { control: { type: "range", min: 0, max: 1000, step: 1 } },
    height: { control: { type: "range", min: 0, max: 1000, step: 1 } },
  },
};

export default meta;

interface FrameStoryProps extends FrameProps {
  strokeColor: string;
  fillColor: string;
  strokeWidth: number;
}

const FrameStory = ComponentStory(Frame);

export const ExampleFrame: StoryObj<FrameStoryProps> = {
  render: ComponentStory(
    ({ strokeColor, strokeWidth, fillColor, ...options }) => {
      options.fillStyle = { color: fillColor };
      options.strokeStyle = { color: strokeColor, width: strokeWidth };
      return new Frame(options);
    }
  ),
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

export const TransparentFill: StoryObj<FrameStoryProps> = {
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
