import { PROGRESS_BAR_CIRC, qs, on } from "./helpers.js";
import Template from "./template.js";

export default class View {
  #template = null;
  #playPauseTimer = qs(".js-play-pause-timer");
  #restartTimer = qs(".js-restart-timer");
  #timer = qs(".js-timer");
  #progressBar = qs(".js-progress-bar circle");

  /**
   * @param {!Template} template A Template instance
   */
  constructor(template) {
    this.#template = template;
  }

  /**
   * Updates the timer display with the provided time.
   *
   * @param {number} timeInSeconds The time to be displayed in seconds
   */
  updateTimerDisplay(timeInSeconds) {
    this.#timer.innerHTML = this.#template.formatTime(timeInSeconds);
  }

  /**
   * Update the progress bar with a value between 0 and 1.
   *
   * @param {number} value The value representing progress (0 to 1)
   */
  updateProgressBar(value) {
    const progressBarOffset = value * PROGRESS_BAR_CIRC;
    this.#progressBar.style.strokeDashoffset = progressBarOffset;
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
