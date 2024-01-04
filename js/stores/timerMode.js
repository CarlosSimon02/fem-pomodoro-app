export default class TimerMode {
  #name;
  #targetTime;
  #timeRemaining;

  constructor(name, targetTime, timeRemaining = targetTime) {
    this.#name = name;
    this.#targetTime = targetTime;
    this.#timeRemaining = timeRemaining;
  }

  /**
   * Reduces the time remaining by a specified value and ensures the time does not go below zero.
   *
   * @param {number} decrementor - The value in secnnds by which to decrease the time remaining
   */
  decreaseTimeRemainingBy(decrementor) {
    this.#timeRemaining = Math.max(this.#timeRemaining - decrementor, 0);
  }

  restartTimeRemaining() {
    this.#timeRemaining = this.#targetTime;
  }

  getName() {
    return this.#name;
  }

  getTargetTime() {
    return this.#targetTime;
  }

  setTargetTime(targetTime) {
    this.#targetTime = targetTime;
    this.restartTimeRemaining();
  }

  getTimeRemaining() {
    return this.#timeRemaining;
  }

  setTimeRemaining(timeRemaining) {
    this.#timeRemaining = timeRemaining;
  }
}
