import TimerMode from "./timerMode.js";

export default class Store {
  #timerModes;
  #timerIntervalId;
  #currentTimerModeIndex;
  #font;
  #theme;

  constructor() {
    const data = this.#retrieveDataFromLocalStorage();

    if (data) {
      this.#timerModes = [
        new TimerMode(
          "pomodoro",
          data.timerModes[0].targetTime,
          data.timerModes[0].timeRemaining
        ),
        new TimerMode(
          "shortBreak",
          data.timerModes[1].targetTime,
          data.timerModes[1].timeRemaining
        ),
        new TimerMode(
          "longBreak",
          data.timerModes[2].targetTime,
          data.timerModes[2].timeRemaining
        ),
      ];
      this.#currentTimerModeIndex = data.currentTimerModeIndex;
      this.#font = data.font;
      this.#theme = data.theme;
    } else {
      this.#timerModes = [
        new TimerMode("pomodoro", 25 * 60), // 25 minutes in seconds
        new TimerMode("shortBreak", 5 * 60), // 5 minutes in seconds
        new TimerMode("longBreak", 15 * 60), // 15 minutes in seconds
      ];
      this.#currentTimerModeIndex = 0;
      this.#font = "kumbh-sans";
      this.#theme = "robins-egg";
    }
  }

  #retrieveCurrentTimerMode() {
    return this.#timerModes[this.#currentTimerModeIndex];
  }

  saveDataToLocalStorage() {
    const data = {
      timerModes: this.#timerModes.map((mode) => ({
        targetTime: mode.getTargetTime(),
        timeRemaining: mode.getTimeRemaining()
      })),
      currentTimerModeIndex: this.#currentTimerModeIndex,
      font: this.#font,
      theme: this.#theme,
    };

    localStorage.setItem("timerData", JSON.stringify(data));
  }

  #retrieveDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("timerData"));
  }

  isTimerRunning() {
    return this.#timerIntervalId !== undefined;
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

  restartTimeRemaining() {
    const currentTimerMode = this.#retrieveCurrentTimerMode();
    return currentTimerMode.restartTimeRemaining();
  }

  saveCurrentTimerMode(timerModeName) {
    const index = this.#timerModes.findIndex(
      (timerMode) => timerMode.getName() === timerModeName
    );
    this.#currentTimerModeIndex = index;
  }

  saveTimerIntervalId(intervalId) {
    this.#timerIntervalId = intervalId;
  }

  clearTimerInterval() {
    clearInterval(this.#timerIntervalId);
    this.#timerIntervalId = undefined;
  }

  saveSettingsValues(settings) {
    this.#timerModes[0].setTargetTime(settings.pomodoroTargetTime);
    this.#timerModes[1].setTargetTime(settings.shortBreakTargetTime);
    this.#timerModes[2].setTargetTime(settings.longBreakTargetTime);
    this.#font = settings.font;
    this.#theme = settings.theme;
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
