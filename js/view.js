import { qs, on } from "./helpers.js";
import Template from "./template.js";

export default class View {
  #template = null;
  #playPauseTimer = qs(".js-play-pause-timer");
  #restartTimer = qs(".js-restart-timer");
  #timer = qs(".js-timer");

  /**
   * @param {!Template} template A Template instance
   */
  constructor(template) {
    this.#template = template;
  }

  /**
   * Set the timer display
   *
   * @param {number} time The time to display in seconds
   */
  setTimer(time) {
    this.#timer.innerHTML = this.#template.formatTime(time);
  }

  /**
   * @param {!boolean} isTimerRunning True if timer is running
   */
  togglePlayPauseButtonLabel(isTimerRunning) {
    this.#playPauseTimer.innerHTML = isTimerRunning ? "Pause" : "Play";
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindPlayPauseTimer(handler) {
    on(this.#playPauseTimer, "click", handler);
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindRestartTimer(handler) {
    on(this.#restartTimer, "click", handler);
  }
}
