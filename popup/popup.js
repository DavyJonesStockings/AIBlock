document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("toggle");
    const badge = document.getElementById("badge");

    function applyState(enabled) {
        toggle.setAttribute("aria-pressed", String(enabled));
        badge.textContent = enabled ? "ON" : "OFF";
        badge.classList.toggle("off", !enabled);
    }

    // Load saved state
    chrome.storage.sync.get({ hideEnabled: true }, ({ hideEnabled }) => {
        applyState(hideEnabled);
    });

    toggle.addEventListener("click", () => {
        const next = toggle.getAttribute("aria-pressed") !== "true";
        applyState(next);
        chrome.storage.sync.set({ hideEnabled: next });

        // Tell the active tab's content script
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (tab?.id) {
                chrome.tabs.sendMessage(tab.id, { action: "setHide", enabled: next });
            }
        });
    });

});