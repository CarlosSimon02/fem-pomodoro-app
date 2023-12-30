import { MILLISECONDS_PER_SECOND } from "./helpers.js";

export default class Controller {
  #store = null;
  #view = null;

  /**
   * @param  {!TimerStore} store A Store instance
   * @param  {!TimerView} view A View instance
   */
  constructor(store, view) {
    this.#store = store;
    this.#view = view;

    view.bindPlayPauseTimer(this.playPauseTimer.bind(this));
    view.bindRestartTimer(this.restartTimer.bind(this));
    view.bindSelectedTimerMode(this.setAndRenderMode.bind(this));
    view.bindOpenSettings(this.openSettings.bind(this));
    view.bindCloseSettings(this.closeSettings.bind(this));
    view.bindSelectedFont(this.setFont.bind(this));
    view.bindSelectedTheme(this.setTheme.bind(this));
  }

  #renderTimerAndProgressBar() {
    let timeRemaining = this.#store.getCurrentMode().getTimeRemaining();
    let targetTime = this.#store.getCurrentMode().getTargetTime();

    this.#view.updateTimerDisplay(timeRemaining);
    this.#view.updateProgressBar(1 - (timeRemaining / targetTime));
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

      this.#store.getCurrentMode().decreaseTimeRemainingBy(elapsedTime);
      this.#renderTimerAndProgressBar();

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
    this.#store.getCurrentMode().resetTimeRemaining();
    this.#renderTimerAndProgressBar();
  }

  setAndRenderMode(modeIndex) {
    this.#pauseTimer();
    this.#store.setCurrentMode(modeIndex);
    this.#renderTimerAndProgressBar();
  }

  setView() {
    const currentModeIndex = this.#store.getCurrentModeIndex();
    const font = this.#store.getSelectedFont();
    const theme = this.#store.getSelectedTheme();

    this.#view.renderTimerModeSelection(currentModeIndex);
    this.#view.renderSettings(font,theme);
  }

  openSettings() {
    this.#view.showSettingsModal();
  }

  closeSettings() {
    this.#view.closeSettingsModal();
  }

  setFont(font) {
    this.#store.setFont(font);
    this.#view.setFont(font);
  }

  setTheme(theme) {
    this.#store.setTheme(theme);
    this.#view.setTheme(theme);
  }
}
