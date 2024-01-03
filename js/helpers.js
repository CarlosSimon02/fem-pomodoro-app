export const SECONDS_PER_MINUTE = 60;
export const MILLISECONDS_PER_SECOND = 1000;
export const PROGRESS_BAR_CIRC = 753.98;

/**
 * querySelector wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function qs(selector, scope) {
  return (scope || document).querySelector(selector);
}

/**
 * querySelectorAll wrapper
 *
 * @param {string} selector Selector to query
 * @param {Element} [scope] Optional scope element for the selector
 */
export function qsa(selector, scope) {
  const elements = (scope || document).querySelectorAll(selector);
  return Array.from(elements); // Convert NodeList to Array for easier manipulation
}

/**
 * addEventListener wrapper
 *
 * @param {Element|Window} target Target Element
 * @param {string} type Event name to bind to
 * @param {Function} callback Event callback
 * @param {boolean} [capture] Capture the event
 */
export function on(target, type, callback, capture) {
  target.addEventListener(type, callback, !!capture);
}

/**
 * Formats time in seconds to a string representation (e.g., 17:59).
 *
 * @param {number} timeInSeconds The time in seconds to be converted
 * @returns {string} The formatted time string
 */
export function formatTime(timeInSeconds) {
  const minutes = String(
    Math.floor(timeInSeconds / SECONDS_PER_MINUTE)
  ).padStart(2, "0");
  const seconds = String(
    Math.floor(timeInSeconds % SECONDS_PER_MINUTE)
  ).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function logError(error) {
  console.error(error);
  alert(error);
}

export function toSeconds(timeInMinutes) {
  return timeInMinutes * SECONDS_PER_MINUTE;
}

export function toMinutes(timeInSeconds) {
  return timeInSeconds / SECONDS_PER_MINUTE;
}

export function isInputsValid(inputs) {
  for (const input of inputs) {
    if (input.hasAttribute("required")) {
      if (input.type === "radio" || input.type === "checkbox") {
        const checked = qs(`input[name="${input.name}"]:checked`);
        if (!checked) {
          input.setCustomValidity("Please select an option.");
          input.reportValidity();
          return false;
        } else {
          input.setCustomValidity("");
        }
      } else if (input.type === "text") {
        if (input.value.trim() === "") {
          input.setCustomValidity("This field is required.");
          input.reportValidity();
          return false;
        } else {
          input.setCustomValidity("");
        }
      }
    }
  }

  return true;
}

export function validateElements(elements) {
  const nullElements = elements.filter(({ el }) => {
    if (Array.isArray(el)) {
      return el.length === 0;
    }
    return el === null;
  });

  if (nullElements.length > 0) {
    const nullElementNames = nullElements.map(({ name }) => name).join(", ");
    throw new Error(
      `The following element(s) were not found on the page: ${nullElementNames}`
    );
  }
}
