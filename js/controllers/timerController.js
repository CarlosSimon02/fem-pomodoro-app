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

  #notifyTimeStatus(status) {
    const statuses = ["started", "finished"];

    if (statuses.includes(status)) {
      const mode = this.#store.retrieveCurrentTimerModeName();
      this.#view.sendNotification(mode, status);
    }
  }

  #playTimer() {
    const timeRemaining = this.#store.retrieveTimeRemaining();
    const targetTime = this.#store.retrieveTargetTime();
    let startTime = Date.now();

    this.#view.setPlayPauseButtonLabel("Pause");

    if (timeRemaining === targetTime) {
      this.#notifyTimeStatus("started");
    }

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = calculateElapsedTime(startTime, currentTime);

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#repaintTimer();

      startTime = currentTime; // Update start time for next interval

      if (this.#store.retrieveTimeRemaining() === 0) {
        this.#view.setPlayPauseButtonDisable(true);
        this.#view.activateTimerFinishedEffect();
        this.#pauseTimer();
        this.#notifyTimeStatus("finished");
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
