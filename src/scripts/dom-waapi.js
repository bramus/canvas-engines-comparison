import Engine from "./engine";

const targetFps = 120;

class DomEngine extends Engine {
  constructor() {
    super();
    this.canvas = document.createElement("div");
    this.canvas.className = "canvas";
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.content.appendChild(this.canvas);
  }

  animate() {
    this.meter?.tick();
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
      rect.style.left = `0px`;
      rect.style.top = `${y}px`;

      // Animate the box via WAAPI
      const duration = this.width / targetFps * speed;
      const delay = (duration * (x / this.width)) - duration;
      rect.animate({
        transform: [`translate(${this.width}px, 0px)`, `translate(-100%, 0px)` ],
      }, {
        duration: duration.toFixed(3) * 1000,
        delay: delay.toFixed(3) * 1000,
        iterations: Infinity,
      });

      this.canvas.appendChild(rect);
      rects[i] = { x, y, size: size / 2, speed, el: rect };
    }
    this.rects = rects;

    if (this.meter) {
      this.request = requestAnimationFrame(() => this.animate());
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new DomEngine();
  engine.render();
});
