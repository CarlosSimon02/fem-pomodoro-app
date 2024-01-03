import SettingsView from "./settingsView.js";
import TimerView from "./timerView.js";

export default class MainView {
  #timer;
  #settings;

  constructor() {
    this.#timer = new TimerView();
    this.#settings = new SettingsView();
  }

  timer() {
    return this.#timer;
  }

  settings() {
    return this.#settings;
  }
}
