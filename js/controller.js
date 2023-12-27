import { MILLISECONDS_PER_SECOND } from "./helpers.js";

export default class Controller {
  #store = null;
  #view = null;

  /**
   * @param  {!Store} store A Store instance
   * @param  {!View} view A View instance
   */
  constructor(store, view) {
    this.#store = store;
    this.#view = view;

    view.bindPlayPauseTimer(this.playPauseTimer.bind(this));
    view.bindRestartTimer(this.restartTimer.bind(this));
  }

  #setTimerStateAndButtonLabel(isRunning) {
    this.#store.setIsTimerRunning(isRunning);
    this.#view.togglePlayPauseButtonLabel(isRunning);
  }

  #playTimer() {
    this.#setTimerStateAndButtonLabel(true);
    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / MILLISECONDS_PER_SECOND;

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#view.setTimer(this.#store.getTimeRemaining());

      startTime = currentTime; // Update start time for next interval
    }, 10);

    this.#store.setTimerIntervalId(intervalId);
  }

  #pauseTimer() {
    this.#setTimerStateAndButtonLabel(false);
    this.#store.clearTimerInterval();
  }

  playPauseTimer() {
    const isTimerRunning = this.#store.getIsTimerRunning();

    if (isTimerRunning) {
      this.#pauseTimer();
    } else {
      this.#playTimer();
    }
  }

  restartTimer() {
    this.#pauseTimer();
    this.#store.resetTimeRemaining();
  }
}
