chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.includes('http')) {
        setTimeout(function () {
            chrome.scripting.executeScript({
                target: {tabId}, files: ['./inject_script.js', './custom_button.bundle.js']
            });
        }, 300)
    }
});

chrome.runtime.onInstalled.addListener(function (object) {
    let internalUrl = chrome.runtime.getURL('options.html');

    if (object.reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({url: internalUrl}, function (tab) {
        });
    }
});
