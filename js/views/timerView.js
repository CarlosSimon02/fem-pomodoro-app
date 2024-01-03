import {
  qs,
  qsa,
  on,
  validateElements,
  logError,
  PROGRESS_BAR_CIRC,
  formatTime,
} from "../helpers.js";

export default class TimerView {
  #playPauseTimer;
  #restartTimer;
  #timer;
  #progressBar;
  #timerModes;

  constructor() {
    this.#playPauseTimer = qs(".js-play-pause-timer");
    this.#restartTimer = qs(".js-restart-timer");
    this.#timer = qs(".js-timer");
    this.#progressBar = qs(".js-progress-bar circle");
    this.#timerModes = qsa(".js-timer-mode");

    this.#validateElements();
  }

  #validateElements() {
    try {
      const elements = [
        { name: "playPauseTimer", el: this.#playPauseTimer },
        { name: "restartTimer", el: this.#restartTimer },
        { name: "timer", el: this.#timer },
        { name: "progressBar", el: this.#progressBar },
        { name: "timerModes", el: this.#timerModes },
      ];

      validateElements(elements);
    } catch (error) {
      logError(error);
    }
  }

  setTimerAndProgressBarValue(timeRemaining, targetTime) {
    const timeRemainingPercentage = 1 - timeRemaining / targetTime;
    const progressBarOffset = timeRemainingPercentage * PROGRESS_BAR_CIRC;
    this.#timer.innerHTML = formatTime(timeRemaining);
    this.#progressBar.style.strokeDashoffset = progressBarOffset;
  }

  togglePlayPauseButtonLabel(isTimerRunning) {
    this.#playPauseTimer.innerHTML = isTimerRunning ? "Pause" : "Play";
  }

  checkTimerModeButton(timerModeName) {
    let radioButton = qs(`.js-timer-mode[value="${timerModeName}"]`);
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event("change"));
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

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindSelectedTimerMode(handler) {
    this.#timerModes.forEach((timerMode) => {
      on(timerMode, "change", function () {
        if (this.checked) handler(this.value);
      });
    });
  }
}
