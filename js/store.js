// Note: Time units used throughout this script are in SECONDS.

export default class Store {
  #isTimerRunning = false;
  #targetTime = 60;
  #timeRemaining = this.#targetTime;
  #timerIntervalId = null;

  getIsTimerRunning() {
    return this.#isTimerRunning;
  }

  setIsTimerRunning(value) {
    this.#isTimerRunning = value;
  }

  getTargetTime() {
    return this.#targetTime;
  }

  getTimeRemaining() {
    return this.#timeRemaining;
  }

  /**
   * Reduces the time remaining by a specified value and ensures the time does not go below zero.
   * @param {number} decrementor - The value by which to decrease the time remaining
   */
  decreaseTimeRemainingBy(decrementor) {
    let result = this.#timeRemaining - decrementor;
    this.#timeRemaining = result >= 0 ? result : 0;
  }

  resetTimeRemaining() {
    this.#timeRemaining = this.#targetTime;
  }

  /**
   * Sets the interval ID for the timer.
   * @param {number} intervalId - The unique identifier for the timer interval
   */
  setTimerIntervalId(intervalId) {
    this.#timerIntervalId = intervalId;
  }

  clearTimerInterval() {
    clearInterval(this.#timerIntervalId);
  }
}
