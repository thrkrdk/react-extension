chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('http')) {
        setTimeout(function () {
            chrome.tabs.executeScript(tabId, {file: './inject_script.js'}, function () {
                chrome.tabs.executeScript(tabId, {file: './custom_button.bundle.js'}, function () {
                    console.log('ALL-DONE');
                });
            });
        }, 300)
    }
});
