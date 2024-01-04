import { calculateElapsedTime } from "../helpers.js";

export default class TimerController {
  #store;
  #view;

  constructor(store, view) {
    this.#store = store;
    this.#view = view;

    view.bindPlayPauseTimer(this.playPauseTimer.bind(this));
    view.bindRestartTimer(this.restartTimer.bind(this));
    view.bindSelectedTimerMode(this.setAndRenderTimerMode.bind(this));
  }

  #playTimer() {
    this.#view.setPlayPauseButtonLabel("Pause");
    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = calculateElapsedTime(startTime, currentTime);

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#repaintTimer();

      startTime = currentTime; // Update start time for next interval

      if (this.#store.retrieveTimeRemaining() === 0) {
        this.#view.setPlayPauseButtonDisable(true);
        this.#pauseTimer();
        this.#view.activateTimerFinishedEffect();
      }
    }, 10);

    this.#store.saveTimerIntervalId(intervalId);
  }

  #pauseTimer() {
    this.#store.clearTimerInterval();
    this.#view.setPlayPauseButtonLabel("Play");
    this.#view.deactivateTimerFinishedEffect();
  }

  #repaintTimer() {
    this.#view.setTimerAndProgressBarValue(
      this.#store.retrieveTimeRemaining(),
      this.#store.retrieveTargetTime()
    );
  }

  playPauseTimer() {
    const isTimerRunning = this.#store.isTimerRunning();

    if (isTimerRunning) {
      this.#pauseTimer();
    } else {
      this.#playTimer();
    }
  }

  restartTimer() {
    this.#view.setPlayPauseButtonDisable(false);
    this.#pauseTimer();
    this.#store.restartTimeRemaining();
    this.#repaintTimer();
  }

  setAndRenderTimerMode(modeIndex) {
    this.#pauseTimer();
    this.#store.saveCurrentTimerMode(modeIndex);

    const isTimerFinished = this.#store.retrieveTimeRemaining() === 0;
    this.#view.setPlayPauseButtonDisable(isTimerFinished);
    this.#repaintTimer();
  }
}
