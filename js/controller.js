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
    view.bindProcessFontSelection(this.processFontSelection.bind(this));
    view.bindProcessThemeSelection(this.processThemeSelection.bind(this));
  }

  #setIsTimerRunning(isRunning) {
    this.#store.saveIsTimerRunning(isRunning);
    this.#view.togglePlayPauseButtonLabel(isRunning);
  }

  #playTimer() {
    this.#setIsTimerRunning(true);
    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / MILLISECONDS_PER_SECOND;

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#view.setTimerAndProgressBarValue(
        this.#store.retrieveTimeRemaining(),
        this.#store.retrieveTargetTime()
      );

      startTime = currentTime; // Update start time for next interval
    }, 10);

    this.#store.saveTimerIntervalId(intervalId);
  }

  #pauseTimer() {
    this.#setIsTimerRunning(false);
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
    this.#view.setTimerAndProgressBarValue(
      this.#store.retrieveTimeRemaining(),
      this.#store.retrieveTargetTime()
    );
  }

  setAndRenderTimerMode(modeIndex) {
    this.#pauseTimer();
    this.#store.saveCurrentTimerMode(modeIndex);
    this.#view.setTimerAndProgressBarValue(
      this.#store.retrieveTimeRemaining(),
      this.#store.retrieveTargetTime()
    );
  }

  setView() {
    const currentTimerModeName = this.#store.retrieveCurrentTimerModeName();
    const settingsValues = this.#store.retrieveSettingsValues();
    console.log(this);
    this.#view.checkTimerModeButton(currentTimerModeName);
    this.#view.setSettingsValues(settingsValues);
  }

  openSettings() {
    this.#view.showSettingsModal();
  }

  closeSettings() {
    const settings = this.#store.retrieveSettingsValues();

    this.#view.setSettingsValues(settings);
    this.#view.closeSettingsModal();
  }

  applySettings(settings) {
    this.#store.saveSettingsValues(settings);

    this.#view.setSettingsValues(settings);
    this.#view.closeSettingsModal();
  }

  processFontSelection(font) {
    this.#view.setFont(font);
  }

  processThemeSelection(theme) {
    this.#view.setTheme(theme);
  }
}
