import {
  qs,
  qsa,
  on,
  validateElements,
  logError,
  toSeconds,
  toMinutes,
} from "../helpers.js";

export default class SettingsView {
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
    this.#openSettings = qs(".js-open-settings");
    this.#closeSettings = qs(".js-close-settings");
    this.#applySettings = qs(".js-apply-settings");
    this.#settings = qs(".js-settings");
    this.#pomodoroTargetTime = qs(".js-pomodoro-target-time");
    this.#shortBreakTargetTime = qs(".js-short-break-target-time");
    this.#longBreakTargetTime = qs(".js-long-break-target-time");
    this.#fontTypes = qsa(".js-font-type");
    this.#themeTypes = qsa(".js-theme-type");

    this.#validateElements();
  }

  #validateElements() {
    try {
      const elements = [
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

      validateElements(elements);
    } catch (error) {
      logError(error);
    }
  }

  setSettingsValues(settings) {
    this.#pomodoroTargetTime.value = toMinutes(settings.pomodoroTargetTime);
    this.#shortBreakTargetTime.value = toMinutes(settings.shortBreakTargetTime);
    this.#longBreakTargetTime.value = toMinutes(settings.longBreakTargetTime);

    this.setFontAndTheme(settings.font, settings.theme);
  }

  setFontAndTheme(font, theme) {
    let fontButton = qs(`.js-font-type[value="${font}"]`);
    let themeButton = qs(`.js-theme-type[value="${theme}"]`);
    fontButton.checked = true;
    themeButton.checked = true;
    fontButton.dispatchEvent(new Event("change"));
    themeButton.dispatchEvent(new Event("change"));
  }

  getSettingsValues() {
    return {
      pomodoroTargetTime: toSeconds(this.#pomodoroTargetTime.value),
      shortBreakTargetTime: toSeconds(this.#shortBreakTargetTime.value),
      longBreakTargetTime: toSeconds(this.#longBreakTargetTime.value),
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

  setNumInputValue(numInput, value) {
    numInput.value = value;
    numInput.dispatchEvent(new Event("change"));
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
    const settingsInputs = qsa(".js-settings input");

    on(this.#applySettings, "click", function () {
      handler(settingsInputs);
    });
  }
}
