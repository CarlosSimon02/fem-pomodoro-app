(()=>{"use strict";function e(e,t){return(t||document).querySelector(e)}function t(e,t){const i=(t||document).querySelectorAll(e);return Array.from(i)}function i(e,t,i,s){e.addEventListener(t,i,!!s)}function s(e){console.error(e),alert(e)}function r(e){return 60*e}function n(e){return e/60}function o(e){const t=e.filter((({el:e})=>Array.isArray(e)?0===e.length:null===e));if(t.length>0){const e=t.map((({name:e})=>e)).join(", ");throw new Error(`The following element(s) were not found on the page: ${e}`)}}class a{#e;#t;#i;constructor(e,t,i){this.#e=e,this.#t=t,this.#i=i,t.bindOpenSettings(this.openSettings.bind(this)),t.bindCloseSettings(this.closeSettings.bind(this)),t.bindApplySettings(this.applySettings.bind(this)),t.bindProcessFontSelection(this.processFontSelection.bind(this)),t.bindProcessThemeSelection(this.processThemeSelection.bind(this))}openSettings(){const e=this.#e.retrieveSettingsValues();this.#t.setSettingsValues(e),this.#t.showSettingsModal()}closeSettings(){const e=this.#e.retrieveSettingsValues();this.#t.setFontAndTheme(e.font,e.theme),this.#t.closeSettingsModal()}applySettings(t){if(function(t){for(const i of t)if(i.hasAttribute("required"))if("radio"===i.type||"checkbox"===i.type){if(!e(`input[name="${i.name}"]:checked`))return i.setCustomValidity("Please select an option."),i.reportValidity(),!1;i.setCustomValidity("")}else if("text"===i.type){if(""===i.value.trim())return i.setCustomValidity("This field is required."),i.reportValidity(),!1;i.setCustomValidity("")}return!0}(t)){const e=this.#t.getSettingsValues();this.#e.saveSettingsValues(e),this.#i.restartTimer(),this.#t.closeSettingsModal()}}processFontSelection(e){this.#t.setFont(e)}processThemeSelection(e){this.#t.setTheme(e)}}class m{#e;#t;constructor(e,t){this.#e=e,this.#t=t,t.bindPlayPauseTimer(this.playPauseTimer.bind(this)),t.bindRestartTimer(this.restartTimer.bind(this)),t.bindSelectedTimerMode(this.setAndRenderTimerMode.bind(this))}#s(e){if(["started","finished"].includes(e)){const t=this.#e.retrieveCurrentTimerModeName();this.#t.sendNotification(t,e)}}#r(){const e=this.#e.retrieveTimeRemaining(),t=this.#e.retrieveTargetTime();let i=Date.now();this.#t.setPlayPauseButtonLabel("Pause"),e===t&&this.#s("started");const s=setInterval((()=>{const e=Date.now(),t=(e-i)/1e3;this.#e.decreaseTimeRemainingBy(t),this.#n(),i=e,0===this.#e.retrieveTimeRemaining()&&(this.#o(),this.#s("finished"),this.#t.setPlayPauseButtonDisable(!0),this.#t.activateTimerFinishedEffect())}),10);this.#e.saveTimerIntervalId(s)}#o(){this.#e.clearTimerInterval(),this.#t.setPlayPauseButtonLabel("Play"),this.#t.deactivateTimerFinishedEffect()}#n(){this.#t.setTimerAndProgressBarValue(this.#e.retrieveTimeRemaining(),this.#e.retrieveTargetTime())}playPauseTimer(){this.#e.isTimerRunning()?this.#o():this.#r()}restartTimer(){this.#t.setPlayPauseButtonDisable(!1),this.#o(),this.#e.restartTimeRemaining(),this.#n()}setAndRenderTimerMode(e){this.#o(),this.#e.saveCurrentTimerMode(e);const t=0===this.#e.retrieveTimeRemaining();this.#t.setPlayPauseButtonDisable(t),this.#n()}}class h{#a;#m;#h;constructor(e,t,i=t){this.#a=e,this.#m=t,this.#h=i}decreaseTimeRemainingBy(e){this.#h=Math.max(this.#h-e,0)}restartTimeRemaining(){this.#h=this.#m}getName(){return this.#a}getTargetTime(){return this.#m}setTargetTime(e){this.#m=e,this.restartTimeRemaining()}getTimeRemaining(){return this.#h}setTimeRemaining(e){this.#h=e}}class l{#l;#u;#d;#c;#g;#T;#p;#v;#b;constructor(){this.#l=e(".js-open-settings"),this.#u=e(".js-close-settings"),this.#d=e(".js-apply-settings"),this.#c=e(".js-settings"),this.#g=e(".js-pomodoro-target-time"),this.#T=e(".js-short-break-target-time"),this.#p=e(".js-long-break-target-time"),this.#v=t(".js-font-type"),this.#b=t(".js-theme-type"),this.#y()}#y(){try{o([{name:"openSettings",el:this.#l},{name:"closeSettings",el:this.#u},{name:"applySettings",el:this.#d},{name:"settings",el:this.#c},{name:"pomodoroTargetTime",el:this.#g},{name:"shortBreakTargetTime",el:this.#T},{name:"longBreakTargetTime",el:this.#p},{name:"fontTypes",el:this.#v},{name:"themeTypes",el:this.#b}])}catch(e){s(e)}}setSettingsValues(e){this.#g.value=n(e.pomodoroTargetTime),this.#T.value=n(e.shortBreakTargetTime),this.#p.value=n(e.longBreakTargetTime),this.setFontAndTheme(e.font,e.theme)}setFontAndTheme(t,i){let s=e(`.js-font-type[value="${t}"]`),r=e(`.js-theme-type[value="${i}"]`);s.checked=!0,r.checked=!0,s.dispatchEvent(new Event("change")),r.dispatchEvent(new Event("change"))}getSettingsValues(){return{pomodoroTargetTime:r(this.#g.value),shortBreakTargetTime:r(this.#T.value),longBreakTargetTime:r(this.#p.value),font:e(".js-font-type:checked").value,theme:e(".js-theme-type:checked").value}}showSettingsModal(){this.#c.showModal()}closeSettingsModal(){this.#c.close()}setFont(e){document.documentElement.style.setProperty("--body-font-family",`var(--${e})`)}setTheme(e){document.documentElement.style.setProperty("--accent-color-1",`var(--${e})`)}setNumInputValue(e,t){e.value=t,e.dispatchEvent(new Event("change"))}bindProcessFontSelection(e){this.#v.forEach((t=>{i(t,"change",(function(){this.checked&&e(this.value)}))}))}bindProcessThemeSelection(e){this.#b.forEach((t=>{i(t,"change",(function(){this.checked&&e(this.value)}))}))}bindOpenSettings(e){i(this.#l,"click",e)}bindCloseSettings(e){i(this.#u,"click",e)}bindApplySettings(e){const s=t(".js-settings input");i(this.#d,"click",(function(){e(s)}))}}class u{#f;#S;#w;#k;#I;#M;#B;constructor(){this.#f=e(".js-play-pause-timer"),this.#S=e(".js-restart-timer"),this.#w=e(".js-timer"),this.#k=e(".js-progress-bar circle"),this.#I=t(".js-timer-mode"),this.#M=new Audio("./assets/audio/alarm.mp3"),this.#M.loop=!0,this.#B=[{mode:"Pomodoro",started:"Time to dive in! Let's make the most of this Pomodoro session. You've got this!",finished:"Congratulations! You've made great progress!"},{mode:"Short break",started:"Time for a breather! You're rocking it, take a well-deserved break.",finished:"Break time's over—back to it! You're doing amazing, keep up the great work!"},{mode:"Long break",started:"Enjoy your extended break! You've earned this time to recharge and refresh.",finished:"Welcome back! Hope you're recharged. Let's dive back in and conquer those tasks!"}],this.#y()}#y(){try{o([{name:"playPauseTimer",el:this.#f},{name:"restartTimer",el:this.#S},{name:"timer",el:this.#w},{name:"progressBar",el:this.#k},{name:"timerModes",el:this.#I}])}catch(e){s(e)}}sendNotification(e,t){const i=this.#B[{pomodoro:0,shortBreak:1,longBreak:2}[e]];"serviceWorker"in navigator&&navigator.serviceWorker.controller&&"granted"===Notification.permission&&navigator.serviceWorker.ready.then((function(e){e.showNotification(`${i.mode} ${t}`,{body:i[t],icon:"./favicons/favicon.ico"})}))}setTimerAndProgressBarValue(e,t){const i=753.98*(1-e/t);var s;this.#w.innerHTML=(s=e,`${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}`),this.#k.style.strokeDashoffset=i}setPlayPauseButtonLabel(e){this.#f.innerHTML=e}setPlayPauseButtonDisable(e){this.#f.disabled=e}checkTimerModeButton(t){let i=e(`.js-timer-mode[value="${t}"]`);i.checked=!0,i.dispatchEvent(new Event("change"))}activateTimerFinishedEffect(){this.#M.currentTime=0,this.#M.play(),this.#w.classList.add("timer-finished")}deactivateTimerFinishedEffect(){this.#M.pause(),this.#w.classList.remove("timer-finished")}bindPlayPauseTimer(e){i(this.#f,"click",e)}bindRestartTimer(e){i(this.#S,"click",e)}bindSelectedTimerMode(e){this.#I.forEach((t=>{i(t,"change",(function(){this.checked&&e(this.value)}))}))}}new class{#P;#N;#R;constructor(){this.#P=t(".js-number-input"),this.#N=t(".js-num-input-incrementor"),this.#R=t(".js-num-input-decrementor"),this.#y(),this.bindValidateNumInput(this.validateNumInput.bind(this)),this.bindIncrementNumInput(this.incrementNumInput.bind(this)),this.bindDecrementNumInput(this.decrementNumInput.bind(this))}#y(){try{o([{name:"numInputs",el:this.#P},{name:"inputIncrementors",el:this.#N},{name:"inputDecrementors",el:this.#R}])}catch(e){s(e)}}#E(e){const t=/^\d*$/.test(e),i=Number(e)>=1&&Number(e)<=99;return t&&i||""===e}#V(e,t){e.forEach(((e,s)=>{const r=this.#P[s];i(e,"click",(function(){t(r)}))}))}incrementNumInput(e){let t=Number(e.value);t++,e.value=t,this.validateNumInput(e,"change")}decrementNumInput(e){let t=Number(e.value);t--,e.value=t,this.validateNumInput(e,"change")}validateNumInput(e,t){this.#E(e.value)?(["keydown","mousedown","focusout"].includes(t.type)&&e.setCustomValidity(""),e.oldValue=e.value,e.oldSelectionStart=e.selectionStart,e.oldSelectionEnd=e.selectionEnd):e.hasOwnProperty("oldValue")?(e.setCustomValidity("Please enter a number between 1 and 99 inclusive"),e.reportValidity(),e.value=e.oldValue,e.setSelectionRange(e.oldSelectionStart,e.oldSelectionEnd)):e.value=""}bindIncrementNumInput(e){const t=this.#N;this.#V(t,e)}bindDecrementNumInput(e){const t=this.#R;this.#V(t,e)}bindValidateNumInput(e){["input","keydown","keyup","mousedown","mouseup","select","contextmenu","drop","focusout","change"].forEach((t=>{this.#P.forEach((s=>{i(s,t,(function(){e(s,t)}))}))}))}},new class{#C;#A;constructor(){this.#C=e(".js-open-attribution"),this.#A=e(".js-attribution"),this.#y(),this.bindOpenAttribution(this.openAttribution.bind(this))}#y(){try{o([{name:"openAttribution",el:this.#C},{name:"attribution",el:this.#A}])}catch(e){s(e)}}hideAttribution(){this.#A.style.bottom="-5rem",this.#C.disabled=!1,setTimeout((()=>{this.#A.style.visibility="hidden"}),800)}openAttribution(){this.#A.style.visibility="visible",this.#A.style.bottom=0,this.#C.disabled=!0,setTimeout((()=>this.hideAttribution()),3e3)}bindOpenAttribution(e){i(this.#C,"click",e)}};const d=new class{#I;#j;#D;#L;#F;constructor(){const e=this.#x();e?(this.#I=[new h("pomodoro",e.timerModes[0].targetTime,e.timerModes[0].timeRemaining),new h("shortBreak",e.timerModes[1].targetTime,e.timerModes[1].timeRemaining),new h("longBreak",e.timerModes[2].targetTime,e.timerModes[2].timeRemaining)],this.#D=e.currentTimerModeIndex,this.#L=e.font,this.#F=e.theme):(this.#I=[new h("pomodoro",1500),new h("shortBreak",300),new h("longBreak",900)],this.#D=0,this.#L="kumbh-sans",this.#F="robins-egg")}#$(){return this.#I[this.#D]}saveDataToLocalStorage(){const e={timerModes:this.#I.map((e=>({targetTime:e.getTargetTime(),timeRemaining:e.getTimeRemaining()}))),currentTimerModeIndex:this.#D,font:this.#L,theme:this.#F};localStorage.setItem("timerData",JSON.stringify(e))}#x(){return JSON.parse(localStorage.getItem("timerData"))}isTimerRunning(){return void 0!==this.#j}retrieveCurrentTimerModeName(){return this.#$().getName()}retrieveTargetTime(){return this.#$().getTargetTime()}retrieveTimeRemaining(){return this.#$().getTimeRemaining()}decreaseTimeRemainingBy(e){return this.#$().decreaseTimeRemainingBy(e)}restartTimeRemaining(){return this.#$().restartTimeRemaining()}saveCurrentTimerMode(e){const t=this.#I.findIndex((t=>t.getName()===e));this.#D=t}saveTimerIntervalId(e){this.#j=e}clearTimerInterval(){clearInterval(this.#j),this.#j=void 0}saveSettingsValues(e){this.#I[0].setTargetTime(e.pomodoroTargetTime),this.#I[1].setTargetTime(e.shortBreakTargetTime),this.#I[2].setTargetTime(e.longBreakTargetTime),this.#L=e.font,this.#F=e.theme}retrieveSettingsValues(){return{pomodoroTargetTime:this.#I[0].getTargetTime(),shortBreakTargetTime:this.#I[1].getTargetTime(),longBreakTargetTime:this.#I[2].getTargetTime(),font:this.#L,theme:this.#F}}},c=new class{#w;#c;constructor(){this.#w=new u,this.#c=new l}timer(){return this.#w}settings(){return this.#c}},g=new class{#e;#t;#O;#i;constructor(e,t){this.#e=e,this.#t=t,this.#i=new m(e,t.timer()),this.#O=new a(e,t.settings(),this.#i)}setView(){const e=this.#e.retrieveCurrentTimerModeName(),t=this.#e.retrieveSettingsValues();this.#t.timer().checkTimerModeButton(e),this.#t.settings().setSettingsValues(t)}triggerLocalStorageSave(){this.#e.saveDataToLocalStorage()}}(d,c),T=g.setView.bind(g),p=g.triggerLocalStorageSave.bind(g);i(window,"load",T),i(window,"beforeunload",p),i(document,"click",(function(){"Notification"in window&&"granted"!==Notification.permission&&Notification.requestPermission()}))})();