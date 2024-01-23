import Engine from "./engine";

const targetFps = 60;

class DomEngine extends Engine {
  constructor() {
    super();
    this.canvas = document.createElement("div");
    this.canvas.className = "canvas";
    this.canvas.style.width = this.width;
    this.canvas.style.height = this.height;
    this.canvas.style.position = "relative";
    this.content.appendChild(this.canvas);
  }

  animate() {
    this.meter.tick();
    this.request = requestAnimationFrame(() => this.animate());
  }

  render() {
    // clear the canvas
    this.canvas.innerHTML = "";
    this.cancelAnimationFrame(this.request);

    // rectangle creation
    const rects = [];
    for (let i = 0; i < this.count.value; i++) {
      const x = Math.random() * this.width;
      const y = Math.random() * this.height;
      const size = 10 + Math.random() * 40;
      const speed = 1 + Math.random();

      let rect = document.createElement("div");
      rect.className = "rectangle";
      rect.style.width = size + "px";
      rect.style.height = size + "px";
      rect.style.position = "absolute";
      rect.style.transform = `translate(0, ${y}px)`; // 0, because we use translate further down. Both combine.

      // Animate the box via CSS Animations
      const duration = this.width / targetFps * speed;
      rect.style.setProperty('--duration', duration.toFixed(3));
      rect.style.setProperty('--delay', ((duration * (x / this.width)) - duration).toFixed(3));

      this.canvas.appendChild(rect);
      rects[i] = { x, y, size: size / 2, speed, el: rect };
    }
    this.rects = rects;

    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`@keyframes move {
  from { translate: ${this.width}px 0px; }
  to { translate: -100% 0px; }
}
.rectangle {
  animation: move calc(var(--duration, 0) * 1s) calc(var(--delay, 0) * 1s) linear both infinite;
}`);
    document.adoptedStyleSheets = [sheet];

    this.request = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new DomEngine();
  engine.render();
});
