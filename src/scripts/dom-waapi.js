import Engine from "./engine";

const targetFps = 120;

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
      rect.style.transform = `translate(${x}px, ${y}px)`;

      // Animate the box via WAAPI
      rect.animate({
        transform: [ `translate(${x}px, ${y}px)`, `translate(${0 - size}px, ${y}px)`, `translate(${this.width + size}px, ${y}px)`, `translate(${x}px, ${y}px)`],
        offset: [0, x / this.width, x / this.width , 1],
      }, {
        duration: this.width / targetFps * speed * 1000,
        iterations: Infinity,
      });

      this.canvas.appendChild(rect);
      rects[i] = { x, y, size: size / 2, speed, el: rect };
    }
    this.rects = rects;

    this.request = requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const engine = new DomEngine();
  engine.render();
});
