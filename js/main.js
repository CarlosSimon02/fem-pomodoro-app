let openSettingsBtn = document.querySelector(".js-open-settings-btn")
let settingsModal = document.querySelector(".js-settings-modal");

openSettingsBtn.addEventListener("click", function() {
    settingsModal.showModal();
})