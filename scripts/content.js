const STYLE_ID = "element-hider-style";
const CSS = ".bzXtMb.M8OgIe.dRpWwb { display: none; }"; // these are the classes assigned to the whole overview segment
// since we're firing this script off before loading the DOM, we can't add a hidden attribute.
// this preemptively targets the div and defaults it to hidden

function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.documentElement.appendChild(style);
}

function removeStyle() {
    document.getElementById(STYLE_ID)?.remove();
}

chrome.storage.sync.get({ hideEnabled: true }, ({ hideEnabled }) => {
    if (hideEnabled) injectStyle();
});

// listen for toggle msg
chrome.runtime.onMessage.addListener(({ action, enabled }) => {
    if (action === "setHide") {
        enabled ? injectStyle() : removeStyle();
    }
});