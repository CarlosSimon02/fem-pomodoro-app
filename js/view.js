import { PROGRESS_BAR_CIRC, qs, qsa, on, formatTime } from "./helpers.js";

export default class View {
  #playPauseTimer;
  #restartTimer;
  #timer;
  #progressBar;
  #timerModes;
  #openSettings;
  #closeSettings;
  #settings;

  constructor() {
    this.#playPauseTimer = qs(".js-play-pause-timer");
    this.#restartTimer = qs(".js-restart-timer");
    this.#timer = qs(".js-timer");
    this.#progressBar = qs(".js-progress-bar circle");
    this.#timerModes = qsa(".js-timer-mode");
    this.#openSettings = qs(".js-open-settings");
    this.#closeSettings = qs(".js-close-settings");
    this.#settings = qs(".js-settings");

    try {
      this.#validateElements();
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      notifyUserOfError(error);
      reportErrorToService(error);
    }
  }

  #validateElements() {
    const elements = [
      { name: "playPauseTimer", el: this.#playPauseTimer },
      { name: "restartTimer", el: this.#restartTimer },
      { name: "timer", el: this.#timer },
      { name: "progressBar", el: this.#progressBar },
      { name: "timerModes", el: this.#timerModes },
      { name: "openSettings", el: this.#openSettings },
      { name: "closeSettings", el: this.#closeSettings },
      { name: "settings", el: this.#settings },
    ];

    const nullElements = elements.filter(({ el }) => el === null);

    if (nullElements.length > 0) {
      const nullElementNames = nullElements.map(({ name }) => name).join(", ");
      throw new Error(
        `The following element(s) were not found on the page: ${nullElementNames}`
      );
    }
  }

  /**
   * Updates the timer display with the provided time.
   *
   * @param {number} timeInSeconds The time to be displayed in seconds
   */
  updateTimerDisplay(timeInSeconds) {
    this.#timer.innerHTML = formatTime(timeInSeconds);
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

  renderTimerModeSelection(modeIndex) {
    let radioButton = qs(`.js-timer-mode[value="${modeIndex}"]`);
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event("change"));
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindOpenSettings(handler) {
    on(this.#openSettings, "click", handler);
  }

  bindCloseSettings(handler) {
    on(this.#closeSettings, "click", handler);
  }

  showSettingsModal() {
    this.#settings.showModal();
  }

  closeSettingsModal() {
    this.#settings.close();
  }
}
