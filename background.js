// Luister naar wijzigingen in de opslag
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.isLocked) {
        checkLockStatus();
    }
});

// Functie om te controleren of de browser vergrendeld moet worden
function checkLockStatus() {
    chrome.storage.local.get(['isLocked'], function(result) {
        if (result.isLocked) {
            // Controleer alle tabbladen
            chrome.tabs.query({}, function(tabs) {
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                        chrome.tabs.remove(tabs[i].id);
                    }
                }
            });

            // Sluit nieuwe tabbladen die niet de juiste URL hebben
            chrome.tabs.onCreated.addListener(function(tab) {
                if (tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                    chrome.tabs.remove(tab.id);
                }
            });

            // Sluit bijgewerkte tabbladen die niet de juiste URL hebben
            chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
                if (changeInfo.status === 'complete' && tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                    chrome.tabs.remove(tabId);
                }
            });

            // Sluit geactiveerde tabbladen die niet de juiste URL hebben
            chrome.tabs.onActivated.addListener(function(activeInfo) {
                chrome.tabs.get(activeInfo.tabId, function(tab) {
                    if (tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                        chrome.tabs.remove(activeInfo.tabId);
                    }
                });
            });
        } else {
            // Verwijder alle event listeners als de browser niet vergrendeld is
            chrome.tabs.onCreated.removeListener(function(tab) {
                if (tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                    chrome.tabs.remove(tab.id);
                }
            });

            chrome.tabs.onUpdated.removeListener(function(tabId, changeInfo, tab) {
                if (changeInfo.status === 'complete' && tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                    chrome.tabs.remove(tabId);
                }
            });

            chrome.tabs.onActivated.removeListener(function(activeInfo) {
                chrome.tabs.get(activeInfo.tabId, function(tab) {
                    if (tab.url !== "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html") {
                        chrome.tabs.remove(activeInfo.tabId);
                    }
                });
            });
        }
    });
}

// Roep de checkLockStatus functie aan bij het opstarten van de extensie
checkLockStatus();