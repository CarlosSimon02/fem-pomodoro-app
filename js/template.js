import { SECONDS_PER_MINUTE } from "./helpers.js";

export default class Template {
  /**
   * Formats time in seconds to a string representation (e.g., 17:59).
   *
   * @param {number} timeInSeconds The time in seconds to be converted
   * @returns {string} The formatted time string
   */
  formatTime(timeInSeconds) {
    const minutes = String(
      Math.floor(timeInSeconds / SECONDS_PER_MINUTE)
    ).padStart(2, "0");
    const seconds = String(
      Math.floor(timeInSeconds % SECONDS_PER_MINUTE)
    ).padStart(2, "0");
    return `${minutes}:${seconds}`;
  }
}
