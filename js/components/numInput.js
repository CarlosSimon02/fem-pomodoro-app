import { qsa, on, validateElements, logError } from "../helpers.js";

const MIN_VALUE = 1;
const MAX_VALUE = 99;

export default class NumInput {
  #numInputs;
  #inputIncrementors;
  #inputDecrementors;

  constructor() {
    this.#numInputs = qsa(".js-number-input");
    this.#inputIncrementors = qsa(".js-num-input-incrementor");
    this.#inputDecrementors = qsa(".js-num-input-decrementor");

    this.#validateElements();

    this.bindValidateNumInput(this.validateNumInput.bind(this));
    this.bindIncrementNumInput(this.incrementNumInput.bind(this));
    this.bindDecrementNumInput(this.decrementNumInput.bind(this));
  }

  #validateElements() {
    try {
      const elements = [
        { name: "numInputs", el: this.#numInputs },
        { name: "inputIncrementors", el: this.#inputIncrementors },
        { name: "inputDecrementors", el: this.#inputDecrementors },
      ];
  
      validateElements(elements);
    } catch(error) {
      logError(error);
    }
  }

  #isValidValue(value) {
    const isUInt = /^\d*$/.test(value);
    const isInRange = Number(value) >= MIN_VALUE && Number(value) <= MAX_VALUE;
    const isBlank = value === "";

    return (isUInt && isInRange) || isBlank;
  }

  #bindNumInputControls(controls, handler) {
    controls.forEach((control, index) => {
      const numInput = this.#numInputs[index];

      on(control, "click", function () {
        handler(numInput);
      });
    });
  }

  incrementNumInput(numInput) {
    let value = Number(numInput.value);
    value++;
    numInput.value = value;
    this.validateNumInput(numInput, "change");
  }

  decrementNumInput(numInput) {
    let value = Number(numInput.value);
    value--;
    numInput.value = value;
    this.validateNumInput(numInput, "change");
  }

  validateNumInput(numInput, event) {
    const isValidInput = this.#isValidValue(numInput.value);

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

  bindIncrementNumInput(handler) {
    const inputIncrementors = this.#inputIncrementors;
    this.#bindNumInputControls(inputIncrementors, handler);
  }

  bindDecrementNumInput(handler) {
    const inputDecrementors = this.#inputDecrementors;
    this.#bindNumInputControls(inputDecrementors, handler);
  }

  bindValidateNumInput(handler) {
    const events = [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
      "focusout",
      "change",
    ];

    events.forEach((event) => {
      this.#numInputs.forEach((numInput) => {
        on(numInput, event, function () {
          handler(numInput, event);
        });
      });
    });
  }
}
