/**
 * Created by Akshay on 5/9/2017.
 */

window.onload = function () {
    checkCount();
    setInterval(checkCount, 10000); // Since search is limited to one per 10s

    chrome.runtime.onInstalled.addListener(function (object) {
        if(object.reason === 'install') {
            chrome.tabs.create({url: "https://akshaysadarangani.com/DCleaner/installed"}, function (tab) {
                console.log("New tab launched with DCleaner");
            });
        }
        if(object.reason === 'update') {
            chrome.tabs.create({url: "https://akshaysadarangani.com/DCleaner/updated"}, function (tab) {
                console.log("New tab launched with DCleaner");
            });
        }
    });

};

function checkCount() {
    var count = 0;
    chrome.downloads.search({
        "exists" : false
    } , function (downloadedItem) {
        if(downloadedItem.length > 0) {
            count = downloadedItem.length;
            chrome.browserAction.setBadgeBackgroundColor({color: "DimGray"});
            chrome.browserAction.setBadgeText({text: "" + count});
        }
        chrome.downloads.search({
            "state" : "interrupted"
        }, function (downloadedItem) {
            if(downloadedItem.length > 0) {
                chrome.browserAction.setBadgeBackgroundColor({color: "DimGray"});
                chrome.browserAction.setBadgeText({text: "" + Number(count + downloadedItem.length)});
            }
        });
    });
}