import { on } from "./helpers.js";
import Attribution from "./components/attribution.js";
import NumInput from "./components/numInput.js";
import Controller from "./controllers/controller.js";
import Store from "./stores/store.js";
import MainView from "./views/mainView.js";

//components
const numInput = new NumInput();
const attribution = new Attribution();

//MVC
const store = new Store();
const view = new MainView();
const controller = new Controller(store, view);

const setView = controller.setView.bind(controller);
on(window, "load", setView);
