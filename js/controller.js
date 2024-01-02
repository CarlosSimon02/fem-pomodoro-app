import { MILLISECONDS_PER_SECOND, isInputsValid } from "./helpers.js";

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
    view.bindIncrementNumInput(this.incrementNumInput.bind(this));
    view.bindDecrementNumInput(this.decrementNumInput.bind(this));
    view.bindValidateNumInput(this.validateNumInput.bind(this));
    view.bindOpenAttribution(this.openAttribution.bind(this));
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

    this.#view.checkTimerModeButton(currentTimerModeName);
    this.#view.setSettingsValues(settingsValues);
  }

  openSettings() {
    const settingsValues = this.#store.retrieveSettingsValues();

    this.#view.setSettingsValues(settingsValues);
    this.#view.showSettingsModal();
  }

  closeSettings() {
    const settings = this.#store.retrieveSettingsValues();
    this.#view.setFontAndTheme(settings.font, settings.theme);
    this.#view.closeSettingsModal();
  }

  applySettings(settingsInputs) {
    const isSettingsInputsValid = isInputsValid(settingsInputs);

    if (isSettingsInputsValid) {
      const settingsValues = this.#view.getSettingsValues();

      this.#pauseTimer();
      this.#store.saveSettingsValues(settingsValues);
      this.#view.setTimerAndProgressBarValue(
        this.#store.retrieveTimeRemaining(),
        this.#store.retrieveTargetTime()
      );
      this.#view.closeSettingsModal();
    }
  }

  processFontSelection(font) {
    this.#view.setFont(font);
  }

  processThemeSelection(theme) {
    this.#view.setTheme(theme);
  }

  incrementNumInput(numInput) {
    let value = parseFloat(numInput.value === "" ? "0" : numInput.value);

    if (!isNaN(value) && isFinite(value)) {
      value++;
      this.#view.setNumInputValue(numInput, value);
    }
  }

  decrementNumInput(numInput) {
    let value = parseFloat(numInput.value === "" ? "0" : numInput.value);

    if (!isNaN(value) && isFinite(value)) {
      value--;
      this.#view.setNumInputValue(numInput, value);
    }
  }

  validateNumInput(numInput, event) {
    const isValidInput =
      /^\d*$/.test(numInput.value) &&
      ((parseInt(numInput.value) >= 1 && parseInt(numInput.value) <= 99) ||
        numInput.value === "");

    if (isValidInput) {
      // Accepted value
      if (["keydown", "mousedown", "focusout"].includes(event.type)) {
        numInput.setCustomValidity("");
      }
      numInput.oldValue = numInput.value;
      numInput.oldSelectionStart = numInput.selectionStart;
      numInput.oldSelectionEnd = numInput.selectionEnd;
    } else if (numInput.hasOwnProperty("oldValue")) {
      // Rejected value - restore the previous one
      numInput.setCustomValidity(
        "Please enter a number between 1 and 99 inclusive"
      );
      numInput.reportValidity();
      numInput.value = numInput.oldValue;
      numInput.setSelectionRange(
        numInput.oldSelectionStart,
        numInput.oldSelectionEnd
      );
    } else {
      // Rejected value - nothing to restore
      numInput.value = "";
    }
  }

  hideAttribution(attribution, openAttribution) {
    attribution.style.bottom = "-5rem";
    openAttribution.disabled = false;
    setTimeout(() => {
      attribution.style.visibility = "hidden";
    }, 800);
  }

  openAttribution(attribution, openAttribution) {
    attribution.style.visibility = "visible";
    attribution.style.bottom = 0;
    openAttribution.disabled = true;
    setTimeout(() => this.hideAttribution(attribution, openAttribution), 3000);
  }
}
