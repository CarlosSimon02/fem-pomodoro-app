import { MILLISECONDS_PER_SECOND, isInputsValid } from "../helpers.js";

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

    view.timer().bindPlayPauseTimer(this.playPauseTimer.bind(this));
    view.timer().bindRestartTimer(this.restartTimer.bind(this));
    view.timer().bindSelectedTimerMode(this.setAndRenderTimerMode.bind(this));
    view.settings().bindOpenSettings(this.openSettings.bind(this));
    view.settings().bindCloseSettings(this.closeSettings.bind(this));
    view.settings().bindApplySettings(this.applySettings.bind(this));
    view
      .settings()
      .bindProcessFontSelection(this.processFontSelection.bind(this));
    view
      .settings()
      .bindProcessThemeSelection(this.processThemeSelection.bind(this));
  }

  #setIsTimerRunning(isRunning) {
    this.#store.saveIsTimerRunning(isRunning);
    this.#view.timer().togglePlayPauseButtonLabel(isRunning);
  }

  #playTimer() {
    this.#setIsTimerRunning(true);
    let startTime = Date.now();

    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsedTime = (currentTime - startTime) / MILLISECONDS_PER_SECOND;

      this.#store.decreaseTimeRemainingBy(elapsedTime);
      this.#view.timer().setTimerAndProgressBarValue(
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
    this.#view.timer().setTimerAndProgressBarValue(
      this.#store.retrieveTimeRemaining(),
      this.#store.retrieveTargetTime()
    );
  }

  setAndRenderTimerMode(modeIndex) {
    this.#pauseTimer();
    this.#store.saveCurrentTimerMode(modeIndex);
    this.#view.timer().setTimerAndProgressBarValue(
      this.#store.retrieveTimeRemaining(),
      this.#store.retrieveTargetTime()
    );
  }

  setView() {
    const currentTimerModeName = this.#store.retrieveCurrentTimerModeName();
    const settingsValues = this.#store.retrieveSettingsValues();

    this.#view.timer().checkTimerModeButton(currentTimerModeName);
    this.#view.settings().setSettingsValues(settingsValues);
  }

  openSettings() {
    const settingsValues = this.#store.retrieveSettingsValues();

    this.#view.settings().setSettingsValues(settingsValues);
    this.#view.settings().showSettingsModal();
  }

  closeSettings() {
    const settings = this.#store.retrieveSettingsValues();
    this.#view.settings().setFontAndTheme(settings.font, settings.theme);
    this.#view.settings().closeSettingsModal();
  }

  applySettings(settingsInputs) {
    const isSettingsInputsValid = isInputsValid(settingsInputs);

    if (isSettingsInputsValid) {
      const settingsValues = this.#view.settings().getSettingsValues();

      this.#pauseTimer();
      this.#store.saveSettingsValues(settingsValues);
      this.#view.timer().setTimerAndProgressBarValue(
        this.#store.retrieveTimeRemaining(),
        this.#store.retrieveTargetTime()
      );
      this.#view.settings().closeSettingsModal();
    }
  }

  processFontSelection(font) {
    this.#view.settings().setFont(font);
  }

  processThemeSelection(theme) {
    this.#view.settings().setTheme(theme);
  }
}
