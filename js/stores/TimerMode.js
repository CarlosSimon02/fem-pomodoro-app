export default class TimerMode {
  #name;
  #targetTime;
  #timeRemaining;

  constructor(name, targetTime) {
    this.#name = name;
    this.#targetTime = targetTime;
    this.#timeRemaining = targetTime;
  }

  /**
   * Reduces the time remaining by a specified value and ensures the time does not go below zero.
   * @param {number} decrementor - The value in secnnds by which to decrease the time remaining
   */
  decreaseTimeRemainingBy(decrementor) {
    this.#timeRemaining = Math.max(this.#timeRemaining - decrementor, 0);
  }

  resetTimeRemaining() {
    this.#timeRemaining = this.#targetTime;
  }

  getName() {
    return this.#name;
  }

  getTargetTime() {
    return this.#targetTime;
  }

  getTimeRemaining() {
    return this.#timeRemaining;
  }
}
