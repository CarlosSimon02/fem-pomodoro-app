import {
  PROGRESS_BAR_CIRC,
  qs,
  qsa,
  on,
  formatTime,
  toMinutes,
  toSeconds,
} from "./helpers.js";

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
  #pomodoroTargetTime;
  #shortBreakTargetTime;
  #longBreakTargetTime;
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
    this.#pomodoroTargetTime = qs(".js-pomodoro-target-time");
    this.#shortBreakTargetTime = qs(".js-short-break-target-time");
    this.#longBreakTargetTime = qs(".js-long-break-target-time");
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
      { name: "pomodoroTargetTime", el: this.#pomodoroTargetTime },
      { name: "shortBreakTargetTime", el: this.#shortBreakTargetTime },
      { name: "longBreakTargetTime", el: this.#longBreakTargetTime },
      { name: "fontTypes", el: this.#fontTypes },
      { name: "themeTypes", el: this.#themeTypes },
    ];

    const nullElements = elements.filter(({ el }) => {
      if (Array.isArray(el)) {
        return el.length === 0;
      }
      return el === null;
    });

    if (nullElements.length > 0) {
      const nullElementNames = nullElements.map(({ name }) => name).join(", ");
      throw new Error(
        `The following element(s) were not found on the page: ${nullElementNames}`
      );
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

  setSettingsValues(settings) {
    this.#pomodoroTargetTime.value = toMinutes(settings.pomodoroTargetTime);
    this.#shortBreakTargetTime.value = toMinutes(settings.shortBreakTargetTime);
    this.#longBreakTargetTime.value = toMinutes(settings.longBreakTargetTime);

    let fontButton = qs(`.js-font-type[value="${settings.font}"]`);
    let themeButton = qs(`.js-theme-type[value="${settings.theme}"]`);
    fontButton.checked = true;
    themeButton.checked = true;
    fontButton.dispatchEvent(new Event("change"));
    themeButton.dispatchEvent(new Event("change"));
  }

  getSettingsValues() {
    return {
      pomodoroTargetTime: toSeconds(this.#pomodoroTargetTime.value),
      shortBreakTargetTime: toSeconds(this.#shortBreakTargetTime.value),
      longBreakTargetTime: toSeconds(this.#shortBreakTargetTime.value),
      font: qs(`.js-font-type:checked`).value,
      theme: qs(`.js-theme-type:checked`).value,
    };
  }

  showSettingsModal() {
    this.#settings.showModal();
  }

  closeSettingsModal() {
    this.#settings.close();
  }

  setFont(font) {
    document.documentElement.style.setProperty(
      `--body-font-family`,
      `var(--${font})`
    );
  }

  setTheme(theme) {
    document.documentElement.style.setProperty(
      `--accent-color-1`,
      `var(--${theme})`
    );
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
  bindProcessFontSelection(handler) {
    this.#fontTypes.forEach((timerMode) => {
      on(timerMode, "change", function () {
        if (this.checked) handler(this.value);
      });
    });
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindProcessThemeSelection(handler) {
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
