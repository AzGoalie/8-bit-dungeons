import { Container, Graphics, StrokeStyle } from "pixi.js";

interface FrameProps {
  width: number;
  height: number;
  fillStyle: StrokeStyle;
  strokeStyle: StrokeStyle;
}

class Frame extends Container {
  _background: Graphics;
  _stroke: Graphics;

  constructor({
    width,
    height,
    fillStyle = { color: "#333" },
    strokeStyle = { color: "#aaa" },
  }: FrameProps) {
    super();

    this._background = new Graphics().rect(0, 0, width, height).fill(fillStyle);
    this._stroke = new Graphics().rect(0, 0, width, height).stroke(strokeStyle);

    this.addChild(this._background, this._stroke);
  }
}

export { Frame as default, type FrameProps };
