import { qs, on, validateElements, logError } from "../helpers.js";

export default class Attribution {
  #openAttribution;
  #attribution;

  constructor() {
    this.#openAttribution = qs(".js-open-attribution");
    this.#attribution = qs(".js-attribution");

    this.#validateElements();

    this.bindOpenAttribution(this.openAttribution.bind(this));
  }

  #validateElements() {
    try {
      const elements = [
        { name: "openAttribution", el: this.#openAttribution },
        { name: "attribution", el: this.#attribution },
      ];

      validateElements(elements);
    } catch (error) {
      logError(error);
    }
  }

  hideAttribution() {
    this.#attribution.style.bottom = "-5rem";
    this.#openAttribution.disabled = false;
    setTimeout(() => {
      this.#attribution.style.visibility = "hidden";
    }, 800);
  }

  openAttribution() {
    this.#attribution.style.visibility = "visible";
    this.#attribution.style.bottom = 0;
    this.#openAttribution.disabled = true;
    setTimeout(() => this.hideAttribution(), 3000);
  }

  bindOpenAttribution(handler) {
    on(this.#openAttribution, "click", handler);
  }
}
