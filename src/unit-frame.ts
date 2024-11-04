import { BitmapText, Container, Graphics, PointData, TextStyle } from "pixi.js";

const FrameColors = {
  default: "#822114",
  interrupt: "#0083ae",
  stun: "#0000ae",
  priority: "#ae00ae",
  tanky: "#654d96",
  agro: "#984c00",
};

type FrameType = keyof typeof FrameColors;

const defaultTextStyle = new TextStyle({
  fontFamily: "Comic Sans MS",
  fontSize: 18,
  fill: {
    color: "white",
  },
  stroke: {
    color: "black",
  },
});

interface UnitFrameOptions {
  name: string;
  target?: Container | PointData;
  textStyle?: TextStyle;
  frameStyle?: Graphics | FrameType;
  strokeStyle?: Graphics;
  currentHealth?: number;
  maxHealth?: number;
}

class UnitFrame extends Container {
  private maxHealth: number = 0;
  private currentHealth: number = 0;

  private background: Graphics;
  private stroke: Graphics;
  private healthMask: Graphics | null = null;

  private nameText: BitmapText;
  private healthText: BitmapText | null = null;

  constructor({
    name,
    textStyle = defaultTextStyle,
    frameStyle = "priority",
    strokeStyle,
    ...options
  }: UnitFrameOptions) {
    super();

    const w = 160;
    const h = 32;

    if (frameStyle instanceof Graphics) {
      this.background = frameStyle;
    } else {
      this.background = new Graphics()
        .rect(0, 0, w, h)
        .fill(FrameColors[frameStyle]);
    }

    if (strokeStyle) {
      this.stroke = strokeStyle;
    } else {
      this.stroke = new Graphics().rect(0, 0, w, h).stroke("#aaa");
    }

    this.addChild(this.background, this.stroke);

    this.nameText = new BitmapText({ text: name, style: textStyle });
    this.addChild(this.nameText);

    if (options.currentHealth) {
      this.currentHealth = options.currentHealth;
    }

    if (options.maxHealth) {
      if (!options.currentHealth) {
        this.currentHealth = options.maxHealth;
      }

      this.maxHealth = options.maxHealth;
      const percent = this.currentHealth / this.maxHealth;
      this.healthText = new BitmapText({
        text: `${(percent * 100).toFixed(1)}%`,
        style: textStyle,
      });
      this.healthText.x = this.width - this.healthText.width;

      this.healthMask = new Graphics().rect(0, 0, w * percent, h).fill("white");
      this.background.mask = this.healthMask;
      this.addChild(this.healthText, this.healthMask);
    }
  }

  public setName(name: string) {
    this.nameText.text = name;
  }
}

export { UnitFrame, type UnitFrameOptions, type FrameType };
