import TimerController from "./controllers/TimerController.js";
import TimerStore from "./stores/TimerStore.js";
import TimerView from "./views/TimerView.js";

const store = new TimerStore();
const view = new TimerView();
const controller = new TimerController(store, view);

// const setView = () => controller.setView(document.location.hash);
// $on(window, 'load', setView);
// $on(window, 'hashchange', setView);
