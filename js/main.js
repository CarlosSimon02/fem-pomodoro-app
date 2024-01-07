import { on } from "./helpers.js";
import Attribution from "./components/attribution.js";
import NumInput from "./components/numInput.js";
import MainController from "./controllers/mainController.js";
import Store from "./stores/store.js";
import MainView from "./views/mainView.js";

//components
const numInput = new NumInput();
const attribution = new Attribution();

//MVC
const store = new Store();
const view = new MainView();
const controller = new MainController(store, view);

const setView = controller.setView.bind(controller);
const triggerLocalStorageSave =
  controller.triggerLocalStorageSave.bind(controller);
on(window, "load", setView);
on(window, "beforeunload", triggerLocalStorageSave);

// ask notification permission
on(document, "click", function () {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission(); 
  }
});
