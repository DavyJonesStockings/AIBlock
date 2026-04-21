function removeOverview() {

    const style = document.createElement("style");
    style.textContent = ".bzXtMb.M8OgIe.dRpWwb { display: none; }"; // these are the classes assigned to the whole overview segment
    // since we're firing this script off before loading the DOM, we can't add a hidden attribute.
    // this preemptively targets the div and defaults it to hidden
    document.documentElement.appendChild(style);
}

removeOverview();
