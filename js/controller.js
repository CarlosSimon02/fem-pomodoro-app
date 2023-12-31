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
    view.bindSelectedTimerMode(this.setAndRenderTimerMode.bind(this));
    view.bindOpenSettings(this.openSettings.bind(this));
    view.bindCloseSettings(this.closeSettings.bind(this));
    view.bindApplySettings(this.applySettings.bind(this));
    view.bindSelectedFont(this.setFont.bind(this));
    view.bindSelectedTheme(this.setTheme.bind(this));
  }

  #renderTimerAndProgressBar() {
    let timeRemaining = this.#store.retrieveTimeRemaining();
    let targetTime = this.#store.retrieveTargetTime();

    this.#view.updateTimerDisplay(timeRemaining);
    this.#view.updateProgressBar(1 - (timeRemaining / targetTime));
  }

  #setTimerStateAndButtonLabel(isRunning) {
    this.#store.saveIsTimerRunning(isRunning);
    this.#view.togglePlayPauseButtonLabel(isRunning);
  }

  #playTimer() {
    this.#setTimerStateAndButtonLabel(true);
    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / MILLISECONDS_PER_SECOND;

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#renderTimerAndProgressBar();

      startTime = currentTime; // Update start time for next interval
    }, 10);

    this.#store.saveTimerIntervalId(intervalId);
  }

  #pauseTimer() {
    this.#setTimerStateAndButtonLabel(false);
    this.#store.clearTimerInterval();
  }

  playPauseTimer() {
    const isTimerRunning = this.#store.retrieveIsTimerRunning();

    if (isTimerRunning) {
      this.#pauseTimer();
    } else {
      this.#playTimer();
    }
  }

  restartTimer() {
    this.#pauseTimer();
    this.#store.restartTimeRemaining();
    this.#renderTimerAndProgressBar();
  }

  setAndRenderTimerMode(modeIndex) {
    this.#pauseTimer();
    this.#store.saveCurrentTimerMode(modeIndex);
    this.#renderTimerAndProgressBar();
  }

  setView() {
    const currentTimerModeName = this.#store.retrieveCurrentTimerModeName();
    const font = this.#store.getFont();
    const theme = this.#store.getTheme();

    this.#view.renderTimerModeSelection(currentTimerModeName);
    this.#view.renderSettings(font,theme);
  }

  openSettings() {
    this.#view.showSettingsModal();
  }

  closeSettings() {
    const settingsValue = this.#view.
    // const font = this.#store.getFont();
    // const theme = this.#store.getTheme();
    
    this.#view.renderSettings(font,theme);
    this.#view.closeSettingsModal();
  }

  applySettings() {
    const font = this.#view.getFontChecked();
    const theme = this.#view.getThemeChecked();

    this.#store.setFont(font);
    this.#store.setTheme(theme);

    this.#view.renderSettings(font,theme);
    this.#view.closeSettingsModal();
  }

  setFont(font) {
    this.#view.setFont(font);
  }

  setTheme(theme) {
    this.#view.setTheme(theme);
  }
}
