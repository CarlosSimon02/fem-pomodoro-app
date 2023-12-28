import TimerMode from "./timerMode.js";

export default class Store {
  #timerModes;
  #isTimerRunning;
  #timerIntervalId;
  #currentTimerModeIndex;

  constructor() {
    this.#timerModes = [
      new TimerMode("pomodoro", 25 * 60), // 25 minutes in seconds
      new TimerMode("shortBreak", 5 * 60), // 5 minutes in seconds
      new TimerMode("longBreak", 15 * 60) // 15 minutes in seconds
    ];
    this.#isTimerRunning = false;
    this.#timerIntervalId = null;
    this.#currentTimerModeIndex = 0;
  }

  getIsTimerRunning() {
    return this.#isTimerRunning;
  }

  setIsTimerRunning(value) {
    this.#isTimerRunning = value;
  }

  getCurrentMode() {
    return this.#timerModes[this.#currentTimerModeIndex];
  }

  getCurrentModeIndex() {
    return this.#currentTimerModeIndex;
  }

  setCurrentMode(modeIndex) {
    this.#currentTimerModeIndex = modeIndex;
  }

  setTimerIntervalId(intervalId) {
    this.#timerIntervalId = intervalId;
  }

  clearTimerInterval() {
    clearInterval(this.#timerIntervalId);
  }
}
