import {
  qs,
  qsa,
  on,
  validateElements,
  logError,
  PROGRESS_BAR_CIRC,
  formatTime,
} from "../helpers.js";

export default class TimerView {
  #playPauseTimer;
  #restartTimer;
  #timer;
  #progressBar;
  #timerModes;
  #audio;
  #messages;

  constructor() {
    this.#playPauseTimer = qs(".js-play-pause-timer");
    this.#restartTimer = qs(".js-restart-timer");
    this.#timer = qs(".js-timer");
    this.#progressBar = qs(".js-progress-bar circle");
    this.#timerModes = qsa(".js-timer-mode");
    this.#audio = new Audio("./assets/audio/alarm.mp3");
    this.#audio.loop = true;

    this.#messages = [
      {
        mode: "Pomodoro",
        started:
          "Time to dive in! Let's make the most of this Pomodoro session. You've got this!",
        finished:
          "Congratulations! Pomodoro complete. You've made great progress!",
      },
      {
        mode: "Short break",
        started:
          "Time for a breather! You're rocking it, take a well-deserved break.",
        finished:
          "Break time's over—back to it! You're doing amazing, keep up the great work!",
      },
      {
        mode: "Long break",
        started:
          "Enjoy your extended break! You've earned this time to recharge and refresh.",
        finished:
          "Welcome back! Hope you're recharged. Let's dive back in and conquer those tasks!",
      },
    ];

    this.#validateElements();
  }

  #validateElements() {
    try {
      const elements = [
        { name: "playPauseTimer", el: this.#playPauseTimer },
        { name: "restartTimer", el: this.#restartTimer },
        { name: "timer", el: this.#timer },
        { name: "progressBar", el: this.#progressBar },
        { name: "timerModes", el: this.#timerModes },
      ];

      validateElements(elements);
    } catch (error) {
      logError(error);
    }
  }

  sendNotification(mode, status) {
    const indices = {
      "pomodoro": 0,
      "shortBreak": 1,
      "longBreak": 2
    };

    const msg = this.#messages[indices[mode]];
    
    if (Notification.permission === "granted") {
      const notification = new Notification(`${msg.mode} ${status}`, {
        body: msg[status],
        tag: "time status"
      });
    }
  }

  setTimerAndProgressBarValue(timeRemaining, targetTime) {
    const timeRemainingPercentage = 1 - timeRemaining / targetTime;
    const progressBarOffset = timeRemainingPercentage * PROGRESS_BAR_CIRC;
    this.#timer.innerHTML = formatTime(timeRemaining);
    this.#progressBar.style.strokeDashoffset = progressBarOffset;
  }

  setPlayPauseButtonLabel(label) {
    this.#playPauseTimer.innerHTML = label;
  }

  setPlayPauseButtonDisable(disabled) {
    this.#playPauseTimer.disabled = disabled;
  }

  checkTimerModeButton(timerModeName) {
    let radioButton = qs(`.js-timer-mode[value="${timerModeName}"]`);
    radioButton.checked = true;
    radioButton.dispatchEvent(new Event("change"));
  }

  activateTimerFinishedEffect() {
    this.#audio.currentTime = 0;
    this.#audio.play();
    this.#timer.classList.add("timer-finished");
  }

  deactivateTimerFinishedEffect() {
    this.#audio.pause();
    this.#timer.classList.remove("timer-finished");
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindPlayPauseTimer(handler) {
    on(this.#playPauseTimer, "click", handler);
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindRestartTimer(handler) {
    on(this.#restartTimer, "click", handler);
  }

  /**
   * @param {Function} handler Function called on synthetic event.
   */
  bindSelectedTimerMode(handler) {
    this.#timerModes.forEach((timerMode) => {
      on(timerMode, "change", function () {
        if (this.checked) handler(this.value);
      });
    });
  }
}
