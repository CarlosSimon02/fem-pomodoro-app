import Controller from "./controller.js";
import Store from "./store.js";
import View from "./view.js";

const store = new Store();
const view = new View();
const controller = new Controller(store, view);

// const setView = () => controller.setView(document.location.hash);
// $on(window, 'load', setView);
// $on(window, 'hashchange', setView);
