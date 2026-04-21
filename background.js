const search_results = 'https://www.google.com/search*';

chrome.action.onClicked.addListener(async (tab) => {
    if (tab.url.startsWith(search_results)) {
        // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
        const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
        // Next state will always be the opposite
        const nextState = prevState === 'ON' ? 'OFF' : 'ON';

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            nextState,
        });
    }
});