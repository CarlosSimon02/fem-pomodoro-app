import Controller from './controller.js';
// import {$on} from './helpers';
import Template from './template.js';
import Store from './store.js';
import View from './view.js';

const store = new Store();

const template = new Template();
const view = new View(template);

/**
 * @type {Controller}
 */
const controller = new Controller(store, view);

// const setView = () => controller.setView(document.location.hash);
// $on(window, 'load', setView);
// $on(window, 'hashchange', setView);
