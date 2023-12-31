import TimerMode from "./timerMode.js";

export default class Store {
  #timerModes;
  #isTimerRunning;
  #timerIntervalId;
  #currentTimerModeIndex;
  #font;
  #theme;

  constructor() {
    this.#timerModes = [
      new TimerMode("pomodoro", 25 * 60), // 25 minutes in seconds
      new TimerMode("shortBreak", 5 * 60), // 5 minutes in seconds
      new TimerMode("longBreak", 15 * 60), // 15 minutes in seconds
    ];
    this.#isTimerRunning = false;
    this.#timerIntervalId = null;
    this.#currentTimerModeIndex = 0;
    this.#font = "kumbh-sans";
    this.#theme = "robins-egg";
  }

  #retrieveCurrentTimerMode() {
    return this.#timerModes[this.#currentTimerModeIndex];
  }

  retrieveIsTimerRunning() {
    return this.#isTimerRunning;
  }

  saveIsTimerRunning(value) {
    this.#isTimerRunning = value;
  }

  retrieveCurrentTimerModeName() {
    const currentTimerMode = this.#retrieveCurrentTimerMode();
    return currentTimerMode.getName();
  }

  retrieveTargetTime() {
    const currentTimerMode = this.#retrieveCurrentTimerMode();
    return currentTimerMode.getTargetTime();
  }

  retrieveTimeRemaining() {
    const currentTimerMode = this.#retrieveCurrentTimerMode();
    return currentTimerMode.getTimeRemaining();
  }

  decreaseTimeRemainingBy(decrementor) {
    const currentTimerMode = this.#retrieveCurrentTimerMode();
    return currentTimerMode.decreaseTimeRemainingBy(decrementor);
  }

  saveCurrentTimerMode(modeIndex) {
    this.#currentTimerModeIndex = modeIndex;
  }

  saveTimerIntervalId(intervalId) {
    this.#timerIntervalId = intervalId;
  }

  clearTimerInterval() {
    clearInterval(this.#timerIntervalId);
  }

  saveSettingsValues(
    pomodoroTargetTime,
    shortBreakTargetTime,
    longBreakTargetTime,
    font,
    theme
  ) {
    this.#timerModes[0].setTargetTime(pomodoroTargetTime);
    this.#timerModes[1].setTargetTime(shortBreakTargetTime);
    this.#timerModes[2].setTargetTime(longBreakTargetTime);
    this.#font = font;
    this.theme = theme;
  }

  retrieveSettingsValues() {
    return {
      pomodoroTargetTime: this.#timerModes[0].getTargetTime(),
      shortBreakTargetTime: this.#timerModes[1].getTargetTime(),
      longBreakTargetTime: this.#timerModes[2].getTargetTime(),
      font: this.#font,
      theme: this.#theme,
    };
  }
}
