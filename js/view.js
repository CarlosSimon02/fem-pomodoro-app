import { PROGRESS_BAR_CIRC, qs, qsa, on, formatTime } from "./helpers.js";

export default class View {
  #playPauseTimer;
  #restartTimer;
  #timer;
  #progressBar;
  #timerModes;
  #openSettings;
  #closeSettings;
  #applySettings;
  #settings;
  #fontTypes;
  #themeTypes;

  constructor() {
    this.#playPauseTimer = qs(".js-play-pause-timer");
    this.#restartTimer = qs(".js-restart-timer");
    this.#timer = qs(".js-timer");
    this.#progressBar = qs(".js-progress-bar circle");
    this.#timerModes = qsa(".js-timer-mode");
    this.#openSettings = qs(".js-open-settings");
    this.#closeSettings = qs(".js-close-settings");
    this.#applySettings = qs(".js-apply-settings");
    this.#settings = qs(".js-settings");
    this.#fontTypes = qsa(".js-font-type");
    this.#themeTypes = qsa(".js-theme-type");

    try {
      this.#validateElements();
    } catch (error) {
      console.error(error); // Log the error for debugging purposes
      alert(error);
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
      { name: "applySettings", el: this.#applySettings },
      { name: "settings", el: this.#settings },
      { name: "fontTypes", el: this.#fontTypes },
      { name: "themeTypes", el: this.#themeTypes }
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

  togglePlayPauseButtonLabel(isTimerRunning) {
    this.#playPauseTimer.innerHTML = isTimerRunning ? "Pause" : "Play";
  }
  
  renderTimerModeSelection(modeIndex) {
    let radioButton = qs(`.js-timer-mode[value="${modeIndex}"]`);
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event("change"));
  }

  renderSettings(font, theme) {
    let fontButton = qs(`.js-font-type[value="${font}"]`);
    let themeButton = qs(`.js-theme-type[value="${theme}"]`);
    fontButton.checked = true;
    themeButton.checked = true;
    fontButton.dispatchEvent(new Event("change"));
    themeButton.dispatchEvent(new Event("change"));
  }
  
  showSettingsModal() {
    this.#settings.showModal();
  }

  closeSettingsModal() {
    this.#settings.close();
  }

  setFont(font) {
    document.documentElement.style.setProperty(`--body-font-family`, `var(--${font})`);
  }

  setTheme(theme) {
    document.documentElement.style.setProperty(`--accent-color-1`, `var(--${theme})`);
  }

  getFontChecked() {
    return qs(`.js-font-type:checked`).value;
  }

  getThemeChecked() {
    return qs(`.js-theme-type:checked`).value;
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

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindSelectedFont(handler) {
    this.#fontTypes.forEach((timerMode) => {
      on(timerMode, "change", function () {
        if (this.checked) handler(this.value);
      });
    });
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindSelectedTheme(handler) {
    this.#themeTypes.forEach((timerMode) => {
      on(timerMode, "change", function () {
        if (this.checked) handler(this.value);
      });
    });
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

  bindApplySettings(handler) {
    on(this.#applySettings, "click", handler);
  }
}
