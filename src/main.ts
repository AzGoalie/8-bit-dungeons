import { Application, Container } from "pixi.js";

import "./style.css";
import { FrameType, UnitFrame } from "./unit-frame";

const app = new Application();
await app.init({
  background: 0x21f4b,
  resizeTo: window,
  autoDensity: true,
  resolution: 1,
});
document.body.appendChild(app.canvas);

const frames = new Container();
let y = 5;

const types: FrameType[] = [
  "default",
  "interrupt",
  "stun",
  "priority",
  "tanky",
  "agro",
];
types.forEach((t) => {
  const unitFrame = new UnitFrame({
    name: t,
    currentHealth: Math.random() * 100,
    maxHealth: 100,
    frameStyle: t,
  });
  unitFrame.y = y;
  y += unitFrame.height + 5;
  frames.addChild(unitFrame);
});

frames.x = 10;
frames.y = 10;
app.stage.addChild(frames);

app.stage.eventMode = "static";
app.stage.onclick = () => {
  const unitFrame = frames.getChildAt(0) as UnitFrame;
  console.log("aaa");
  unitFrame.setName("asldkfjklasdjf");
};
