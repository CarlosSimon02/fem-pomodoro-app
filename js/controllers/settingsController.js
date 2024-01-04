import { isInputsValid } from "../helpers.js";

export default class SettingsController {
  #store;
  #view;
  #timerController;

  constructor(store, view, timerController) {
    this.#store = store;
    this.#view = view;
    this.#timerController = timerController;

    view.bindOpenSettings(this.openSettings.bind(this));
    view.bindCloseSettings(this.closeSettings.bind(this));
    view.bindApplySettings(this.applySettings.bind(this));
    view.bindProcessFontSelection(this.processFontSelection.bind(this));
    view.bindProcessThemeSelection(this.processThemeSelection.bind(this));
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

      this.#store.saveSettingsValues(settingsValues);
      this.#timerController.restartTimer();
      this.#view.closeSettingsModal();
    }
  }

  processFontSelection(font) {
    this.#view.setFont(font);
  }

  processThemeSelection(theme) {
    this.#view.setTheme(theme);
  }
}
