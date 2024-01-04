import SettingsController from "./settingsController.js";
import TimerController from "./timerController.js";

export default class Controller {
  #store;
  #view;
  #settingsController;
  #timerController;

  /**
   * @param  {!Store} store A Store instance
   * @param  {!MainView} view A MainView instance
   */
  constructor(store, view) {
    this.#store = store;
    this.#view = view;
    this.#timerController = new TimerController(store, view.timer());
    this.#settingsController = new SettingsController(
      store,
      view.settings(),
      this.#timerController
    );
  }

  setView() {
    const currentTimerModeName = this.#store.retrieveCurrentTimerModeName();
    const settingsValues = this.#store.retrieveSettingsValues();

    this.#view.timer().checkTimerModeButton(currentTimerModeName);
    this.#view.settings().setSettingsValues(settingsValues);
  }

  triggerLocalStorageSave() {
    this.#store.saveDataToLocalStorage();
  }
}
