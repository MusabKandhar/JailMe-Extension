document.getElementById('openPage').addEventListener('click', function() {
    chrome.tabs.create({ url: "file:///C:/Users/Lucas/Documents/lock-browser-extension/index.html" }, function(tab) {
        console.log("Tab opened with id:", tab.id);
    });
});

document.getElementById('lockButton').addEventListener('click', function() {
    chrome.storage.local.set({ isLocked: true }, function() {
        alert('Browser locked!');
    });
});