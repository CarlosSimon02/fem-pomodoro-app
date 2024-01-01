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


export function handleErrors(fn) {
  return function (...args) {
    try {
      return fn.apply(this, args);
    } catch (error) {
      console.error(error); // Log the error for debugging purposes

      // Notify the user of the error
      notifyUserOfError(error);

      // Report the error to a service or backend
      reportErrorToService(error);

      // You can choose to throw the error again or handle it silently
      // throw error;
    }
  };
}

export function toSeconds(timeInMinutes) {
  return timeInMinutes * SECONDS_PER_MINUTE;
}

export function toMinutes(timeInSeconds) {
  return timeInSeconds / SECONDS_PER_MINUTE;
}

