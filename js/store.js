import TimerMode from "./timerMode.js";

export default class Store {
  #timerModes;
  #uiModes;
  #isTimerRunning;
  #timerIntervalId;
  #currentTimerModeIndex;
  #currentUIModeIndex;
  #font;
  #theme;

  constructor() {
    this.#timerModes = [
      new TimerMode("pomodoro", 25 * 60), // 25 minutes in seconds
      new TimerMode("shortBreak", 5 * 60), // 5 minutes in seconds
      new TimerMode("longBreak", 15 * 60) // 15 minutes in seconds
    ];
    this.#isTimerRunning = false;
    this.#timerIntervalId = null;
    this.#currentTimerModeIndex = 0;
    this.#currentUIModeIndex = 0;
    this.#font = "kumbh-sans";
    this.#theme = "robins-egg";
  }

  getIsTimerRunning() {
    return this.#isTimerRunning;
  }

  setIsTimerRunning(value) {
    this.#isTimerRunning = value;
  }

  getCurrentTimerMode() {
    return this.#timerModes[this.#currentTimerModeIndex];
  }

  getCurrentTimerModeIndex() {
    return this.#currentTimerModeIndex;
  }

  getCurrentUIModeIndex() {
    return this.#currentUIModeIndex;
  }

  setCurrentTimerMode(modeIndex) {
    this.#currentTimerModeIndex = modeIndex;
  }

  setTimerIntervalId(intervalId) {
    this.#timerIntervalId = intervalId;
  }

  clearTimerInterval() {
    clearInterval(this.#timerIntervalId);
  }

  setFont(font) {
    this.#font = font;
  }

  setTheme(theme) {
    this.#theme = theme;
  }

  getFont() {
    return this.#font;
  }

  getTheme() {
    return this.#theme;
  }
}
