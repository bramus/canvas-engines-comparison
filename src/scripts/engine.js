import "fpsmeter";

class Engine {
  constructor() {
    this.content = document.querySelector("main");
    this.meterContainer = this.content.querySelector(".meter");
    this.countLinks = this.content.querySelectorAll(".count-selector > a");
    this.fpsMeterControl = document.querySelector("#showFpsMeter");

    this.width = Math.min(this.content.clientWidth, 1000);
    this.height = this.content.clientHeight * 0.75;
    this.count;

    this.initSettings();
    this.initFpsmeter();

    this.initMenuLink();

    const cancelAnimationFrameObj = (
      window.cancelAnimationFrame ||
      window.webkitCancelRequestAnimationFrame ||
      window.mozCancelRequestAnimationFrame ||
      window.oCancelRequestAnimationFrame ||
      window.msCancelRequestAnimationFrame
    );

    this.cancelAnimationFrame = cancelAnimationFrameObj
      ? cancelAnimationFrameObj.bind(window) || clearTimeout
      : clearTimeout;
  }

  initFpsmeter() {
    if (!this.showFpsMeter) {
      return;
    };

    this.meter = new window.FPSMeter(this.meterContainer, {
      graph: 1,
      heat: 1,
      theme: "light",
      history: 25,
      top: 0,
      bottom: 40,
      left: `calc(${this.width}px + 2.5em)`,
      transform: "translateX(-100%)",
    });
  }

  initSettings() {
    const count = JSON.parse(localStorage.getItem("count"));
    const showFpsMeter = JSON.parse(localStorage.getItem("showFpsMeter"));

    this.count = count || { index: 1, value: 1000 };
    this.showFpsMeter = showFpsMeter ?? true;
    this.fpsMeterControl.checked = this.showFpsMeter;

    this.countLinks.forEach((link, index) => {
      this.countLinks[this.count.index].classList.toggle("selected", true);

      link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.countLinks[this.count.index].classList.toggle("selected", false);
        this.count = { index: index, value: parseInt(link.innerText) };
        this.countLinks[this.count.index].classList.toggle("selected", true);

        localStorage.setItem("count", JSON.stringify(this.count));

        this.render();
      });
    });

    this.fpsMeterControl.addEventListener('change', (e) => {
      this.showFpsMeter = this.fpsMeterControl.checked;
      localStorage.setItem("showFpsMeter", JSON.stringify(this.showFpsMeter));
      window.location.reload();
    });
  }

  initMenuLink() {
    const menuLinks = document.querySelectorAll("header > menu > a");
    const { href } = window.location;

    [...menuLinks].forEach((ml) => {
      if (ml.href === href) {
        ml.classList.add("disabled");
      }
    });
  }

  render() {}
}

export default Engine;
