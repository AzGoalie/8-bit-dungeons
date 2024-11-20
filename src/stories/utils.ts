import { PixiStory, StoryFn } from "@pixi/storybook-renderer";
import { Container } from "pixi.js";

type Constructor<T> = { new (...args: any[]): T };
function isConstructor<T>(value: unknown): value is Constructor<T> {
  return typeof value === "function" && !!value.prototype?.constructor;
}

type InitFn<C extends Constructor<any>, P extends ConstructorParameters<C>> = (
  args: P
) => InstanceType<C>;

export function ComponentStory<
  C extends Constructor<Container>,
  P extends ConstructorParameters<C>[0]
>(target: C | InitFn<C, P>): StoryFn<P> {
  return (options, context) =>
    new PixiStory({
      context,
      init: (view) => {
        const element = isConstructor(target)
          ? new target(options)
          : target(options);
        view.addChild(element);
      },
      resize: (view, width, height) => {
        view.x = width / 2 - view.width / 2;
        view.y = height / 2 - view.height / 2;
      },
    });
}
