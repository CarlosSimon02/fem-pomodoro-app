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
    let timeRemaining = this.#store.getCurrentTimerMode().getTimeRemaining();
    let targetTime = this.#store.getCurrentTimerMode().getTargetTime();

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

      this.#store.getCurrentTimerMode().decreaseTimeRemainingBy(elapsedTime);
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
    this.#store.getCurrentTimerMode().resetTimeRemaining();
    this.#renderTimerAndProgressBar();
  }

  setAndRenderTimerMode(modeIndex) {
    this.#pauseTimer();
    this.#store.setCurrentTimerMode(modeIndex);
    this.#renderTimerAndProgressBar();
  }

  setView() {
    const currentModeIndex = this.#store.getCurrentTimerModeIndex();
    const font = this.#store.getFont();
    const theme = this.#store.getTheme();

    this.#view.renderTimerModeSelection(currentModeIndex);
    this.#view.renderSettings(font,theme);
  }

  openSettings() {
    this.#view.showSettingsModal();
  }

  closeSettings() {
    const font = this.#store.getFont();
    const theme = this.#store.getTheme();
    
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
